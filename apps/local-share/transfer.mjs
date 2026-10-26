import { MEMORY_LIMIT, validateManifest } from './policy.mjs';
const CHUNK = 16384;
const WINDOW = 262144;

export class FileTransfer {
  constructor(peer, files, events) {
    this.peer = peer; this.events = events; this.files = files;
    this.manifest = files ? validateManifest(files.map((f, id) => ({ id, name: f.name, size: f.size }))) : null;
    this.current = null; this.nextToken = 0;
  }
  publish() { this.peer.send({ type: 'manifest', files: this.manifest }); }
  async receiveFile(id, sink = null) {
    if (this.current) throw new Error('Finish or cancel the current download first.');
    const file = this.manifest?.find(f => f.id === id);
    if (!file) throw new Error('This file is no longer available.');
    if (!sink && file.size > MEMORY_LIMIT) throw new Error('This browser buffers downloads in memory. Use a browser with direct-to-disk saving for files over 200 MiB.');
    const token = ++this.nextToken;
    this.current = { file, token, sink, chunks: [], bytes: 0, started: false, time: performance.now() };
    this.events.progress(file, 0, 'Requesting file…');
    try { await this.peer.guard(); if (this.current?.token === token) this.peer.send({ type: 'request', id, token }); }
    catch (error) { await this.cleanup(); throw error; }
  }
  async message(data) {
    if (data instanceof ArrayBuffer) return this.chunk(data);
    if (typeof data !== 'string' || data.length > 65536) throw new Error('Invalid transfer message.');
    let msg;
    try { msg = JSON.parse(data); } catch { throw new Error('Invalid transfer message.'); }
    if (!msg || typeof msg.type !== 'string') throw new Error('Invalid transfer message.');
    if (msg.type === 'manifest' && this.peer.role === 'receiver') {
      if (this.manifest) throw new Error('The file list changed unexpectedly.');
      this.manifest = validateManifest(msg.files); this.events.manifest(this.manifest); return;
    }
    if (msg.type === 'request' && this.peer.role === 'sender') {
      if (!Number.isSafeInteger(msg.token) || msg.token < 1 || msg.token > 0xffffffff) throw new Error('Invalid request identifier.');
      if (this.current) { this.peer.send({ type: 'busy', id: msg.id, token: msg.token }); return; }
      if (!this.manifest.some(f => f.id === msg.id)) throw new Error('An unavailable file was requested.');
      // Run outside the receive chain: acknowledgements must keep flowing.
      this.sendFile(msg.id, msg.token).catch(error => this.peer.fail(error.message)); return;
    }
    const current = this.current;
    if (msg.type === 'cancel') {
      if (!current || msg.id !== current.file.id || msg.token !== current.token) return;
      await this.cleanup(); this.events.cancel('Transfer cancelled. You can download the file again.'); return;
    }
    if (!current || msg.id !== current.file.id || msg.token !== current.token) {
      // Cancellation may leave a bounded number of chunks/control messages in flight.
      if (['ack', 'end', 'done', 'start', 'busy'].includes(msg.type)) return;
      throw new Error('Unexpected transfer message.');
    }
    if (msg.type === 'start' && this.peer.role === 'receiver') { current.started = true; return; }
    if (msg.type === 'busy' && this.peer.role === 'receiver') { await this.cleanup(); this.events.cancel('The sender is busy. Try again in a moment.'); return; }
    if (msg.type === 'ack' && this.peer.role === 'sender') {
      if (!Number.isSafeInteger(msg.bytes) || msg.bytes < current.acked || msg.bytes > current.bytes) throw new Error('Invalid download acknowledgement.');
      current.acked = msg.bytes; current.wake?.(); return;
    }
    if (msg.type === 'end' && this.peer.role === 'receiver') {
      if (!current.started || current.bytes !== current.file.size) throw new Error('The download was incomplete. Please restart it.');
      if (current.sink) await current.sink.close();
      else {
        const blob = new Blob(current.chunks, { type: 'application/octet-stream' });
        this.events.download(blob, current.file.name);
      }
      current.chunks = []; this.peer.send({ type: 'done', id: current.file.id, token: current.token });
      this.events.complete(current.file); this.current = null; return;
    }
    if (msg.type === 'done' && this.peer.role === 'sender') {
      if (current.acked !== current.file.size || !current.ended) throw new Error('Unexpected completion message.');
      clearTimeout(current.doneTimer); this.events.complete(current.file); this.current = null; return;
    }
    throw new Error('Unexpected transfer state.');
  }
  async sendFile(id, token) {
    const file = this.manifest.find(f => f.id === id);
    const current = { file, token, bytes: 0, acked: 0, time: performance.now() };
    this.current = current;
    await this.peer.guard();
    if (this.current !== current) return;
    this.peer.send({ type: 'start', id, token }); this.events.progress(file, 0, 'Sending…');
    while (current.bytes < file.size) {
      if (this.current !== current || !this.peer.active) return;
      const chunk = await this.files[id].slice(current.bytes, current.bytes + CHUNK).arrayBuffer();
      if (this.current !== current || !this.peer.active) return;
      if (!chunk.byteLength) throw new Error('The source file is no longer readable. Select it again in a new session.');
      const frame = new Uint8Array(chunk.byteLength + 4);
      new DataView(frame.buffer).setUint32(0, token); frame.set(new Uint8Array(chunk), 4);
      current.bytes += chunk.byteLength; this.peer.send(frame.buffer);
      if (current.bytes - current.acked >= WINDOW || current.bytes === file.size) await this.waitAck(current);
      if (this.current !== current || !this.peer.active) return;
      this.progress(current, current.acked, 'Sending');
    }
    if (this.current !== current || !this.peer.active) return;
    current.ended = true; this.peer.send({ type: 'end', id, token });
    current.doneTimer = setTimeout(() => this.peer.fail('The receiver did not confirm the download. Please reconnect.'), 60000);
  }
  waitAck(current) {
    if (current.acked === current.bytes || this.current !== current) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const finish = error => { clearTimeout(timeout); current.wake = null; error ? reject(error) : resolve(); };
      const timeout = setTimeout(() => finish(new Error('The transfer timed out. Keep both tabs open and start again.')), 45000);
      current.wake = () => { if (this.current !== current || current.acked === current.bytes) finish(); };
      current.wake();
    });
  }
  async chunk(data) {
    const current = this.current;
    if (!current || this.peer.role !== 'receiver') return;
    if (data.byteLength < 4) throw new Error('Invalid file frame.');
    if (new DataView(data).getUint32(0) !== current.token) return;
    data = data.slice(4);
    if (!current.started || !data.byteLength || data.byteLength > CHUNK || current.bytes + data.byteLength > current.file.size)
      throw new Error('Invalid file data received.');
    if (current.sink) await current.sink.write(data); else current.chunks.push(data);
    if (this.current !== current || !this.peer.active) return;
    current.bytes += data.byteLength;
    this.peer.send({ type: 'ack', id: current.file.id, token: current.token, bytes: current.bytes });
    this.progress(current, current.bytes, 'Receiving');
  }
  progress(current, bytes, verb) {
    const now = performance.now();
    if (now - (current.lastPaint || 0) < 100 && bytes !== current.file.size) return;
    current.lastPaint = now;
    const rate = bytes / Math.max((now - current.time) / 1000, .01);
    this.events.progress(current.file, bytes, `${verb} · ${(rate / 1048576).toFixed(1)} MiB/s`);
  }
  async cancel() {
    if (!this.current) return;
    try { this.peer.send({ type: 'cancel', id: this.current.file.id, token: this.current.token }); } catch { /* Connection already ended. */ }
    await this.cleanup(); this.events.cancel('Transfer cancelled. You can download the file again.');
  }
  async cleanup() {
    const current = this.current; this.current = null;
    if (!current) return;
    current.wake?.(); clearTimeout(current.doneTimer); current.chunks = [];
    if (current.sink) { try { await current.sink.abort(); } catch { /* Already closed or aborted. */ } }
  }
}
