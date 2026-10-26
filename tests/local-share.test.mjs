import test from 'node:test';
import assert from 'node:assert/strict';
import { isLocalAddress, localSDP, decodeSignal, encodeSignal, verifyLocalPath, validateManifest, RTC_CONFIG, MEMORY_LIMIT } from '../apps/local-share/policy.mjs';
import { FileTransfer } from '../apps/local-share/transfer.mjs';
const candidate = (address, type = 'host') => `a=candidate:1 1 udp 2122260223 ${address} 50000 typ ${type}`;
const sdp = address => `v=0\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\na=fingerprint:sha-256 AA:BB\r\n${candidate(address)}\r\n`;
const signal = () => ({ v: 1, type: 'offer', id: crypto.randomUUID(), expires: Date.now() + 120000, sdp: sdp('192.168.1.2') });

test('local-address policy rejects public, global IPv6, mapped public IPs, DNS names and malformed addresses', () => {
  for (const ip of ['10.0.0.2', '172.16.1.2', '172.31.255.254', '192.168.1.2', '169.254.2.1', '::1', 'fd12::1', 'fe80::abcd', 'abc-123.local']) assert.equal(isLocalAddress(ip), true, ip);
  for (const ip of ['8.8.8.8', '172.15.1.2', '172.32.1.2', '100.64.0.1', '192.168.999.1', '192.168.1.2.evil.com', 'device.example.com', '2001:db8::1', '::ffff:8.8.8.8', 'fczz::1', 'fc00:bad', '', null]) assert.equal(isLocalAddress(ip), false, String(ip));
  assert.deepEqual(RTC_CONFIG.iceServers, []);
});
test('public / relay / server-reflexive SDP cannot be accepted, even if a safe candidate is also present', () => {
  for (const unsafe of [candidate('8.8.8.8'), candidate('10.0.0.3', 'relay'), candidate('10.0.0.3', 'srflx')]) {
    const mixed = sdp('192.168.1.2') + unsafe + '\r\n';
    assert.throws(() => localSDP(mixed, true), /public or relay/);
    assert.ok(!localSDP(mixed).includes(unsafe));
  }
  assert.throws(() => localSDP(sdp('8.8.8.8')), /No local/);
  assert.throws(() => localSDP(sdp('192.168.1.2') + 'm=audio 9 UDP/TLS/RTP/SAVPF 111\r\n'), /Only file-sharing/);
});
test('connection codes round-trip and reject expired, wrong-step and unsafe offers', async () => {
  const data = signal(); const code = await encodeSignal(data);
  assert.deepEqual(await decodeSignal(`https://suatatan.com/apps/local-share/#${code}`, 'offer'), data);
  await assert.rejects(decodeSignal(code, 'answer'), /expired|wrong step/);
  await assert.rejects(decodeSignal(await encodeSignal({ ...data, expires: Date.now() - 1 }), 'offer'), /expired/);
  await assert.rejects(decodeSignal(await encodeSignal({ ...data, sdp: sdp('8.8.8.8') }), 'offer'), /public or relay/);
  await assert.rejects(decodeSignal('LS1.garbage', 'offer'), /damaged/);
});
test('selected route must be verifiably local on both ends; missing stats fail closed', async () => {
  const pc = (local, remote) => ({ sctp: { transport: { iceTransport: { getSelectedCandidatePair: () => ({ local, remote }) } } } });
  const safe = { type: 'host', address: '192.168.1.2' };
  await verifyLocalPath(pc(safe, { type: 'host', address: 'abc.local' }));
  await assert.rejects(verifyLocalPath(pc(safe, { type: 'host', address: '8.8.8.8' })), /not a verifiable/);
  await assert.rejects(verifyLocalPath(pc(safe, { type: 'relay', address: '192.168.1.3' })), /not a verifiable/);
  await assert.rejects(verifyLocalPath({ getStats: async () => new Map() }), /could not verify/);
});
test('untrusted manifests reject impossible sizes/duplicates and strip path separators', () => {
  assert.equal(validateManifest([{ id: 0, name: '../x\\y.txt', size: 4 }])[0].name, '.._x_y.txt');
  assert.throws(() => validateManifest([{ id: 0, name: 'x', size: -1 }]), /Invalid/);
  assert.throws(() => validateManifest([{ id: 0, name: 'x', size: 1 }, { id: 0, name: 'y', size: 1 }]), /Invalid/);
});

function harness(files, extra = {}) {
  const received = []; let failures = []; let resolveDone;
  const done = new Promise(resolve => { resolveDone = resolve; });
  const sender = { role: 'sender', active: true, guard: async () => {}, fail: message => failures.push(message) };
  const receiver = { role: 'receiver', active: true, guard: async () => { if (!sender.active) throw new Error('offline'); }, fail: message => failures.push(message) };
  let senderQueue = Promise.resolve(), receiverQueue = Promise.resolve();
  const baseEvents = { manifest() {}, progress() {}, cancel() {}, download() {}, complete() {} };
  const tx = new FileTransfer(sender, files, { ...baseEvents, ...extra.sender });
  const rx = new FileTransfer(receiver, null, { ...baseEvents, download: blob => received.push(blob), complete: resolveDone, ...extra.receiver });
  sender.send = value => {
    if (!sender.active) throw new Error('offline');
    const wire = value instanceof ArrayBuffer ? value.slice(0) : JSON.stringify(value);
    receiverQueue = receiverQueue.then(() => rx.message(wire)).catch(error => { failures.push(error.message); });
  };
  receiver.send = value => {
    if (!sender.active) throw new Error('offline');
    senderQueue = senderQueue.then(() => tx.message(JSON.stringify(value))).catch(error => { failures.push(error.message); });
  };
  async function flush() { await senderQueue; await receiverQueue; }
  return { tx, rx, sender, receiver, received, done, failures, flush };
}
const timeout = (promise, ms = 5000) => Promise.race([promise, new Promise((_, reject) => { const timer = setTimeout(() => reject(new Error('test timeout')), ms); timer.unref(); })]);
test('multi-window transfer preserves exact bytes, Unicode filename and zero-byte files', async () => {
  const bytes = new Uint8Array(1024 * 1024 + 137); for (let i = 0; i < bytes.length; i++) bytes[i] = i % 251;
  const h = harness([new File([bytes], 'été-İstanbul.bin'), new File([], 'empty.txt')]);
  h.tx.publish(); await h.flush();
  assert.equal(h.rx.manifest[0].name, 'été-İstanbul.bin');
  await h.rx.receiveFile(0); await timeout(h.done); await h.flush();
  assert.deepEqual(new Uint8Array(await h.received[0].arrayBuffer()), bytes);
  assert.equal(h.tx.current, null);
  await h.rx.receiveFile(1);
  for (let i = 0; i < 20 && h.rx.current; i++) await h.flush();
  assert.equal(h.received[1].size, 0); assert.deepEqual(h.failures, []);
});
test('disk sink receives ordered bytes and memory fallback enforces its size limit', async () => {
  const h = harness([new File(['hello direct disk'], 'disk.txt')]); h.tx.publish(); await h.flush();
  const chunks = []; let closed = false;
  await h.rx.receiveFile(0, { write: async bytes => chunks.push(bytes), close: async () => { closed = true; }, abort: async () => {} });
  await timeout(h.done); await h.flush();
  assert.equal(closed, true); assert.equal(await new Blob(chunks).text(), 'hello direct disk'); assert.equal(h.received.length, 0);
  h.rx.manifest = [{ id: 0, name: 'huge.bin', size: MEMORY_LIMIT + 1 }];
  await assert.rejects(h.rx.receiveFile(0), /200 MiB/);
});
test('offline sender cannot supply a new file and a partial transfer is never marked complete', async () => {
  const h = harness([new File(['abc'], 'x.txt')]); h.tx.publish(); await h.flush(); h.sender.active = false;
  await assert.rejects(h.rx.receiveFile(0), /offline/); assert.equal(h.rx.current, null); assert.equal(h.received.length, 0);
  h.rx.current = { file: { id: 0, size: 10 }, token: 2, bytes: 3, started: true, chunks: [] };
  await assert.rejects(h.rx.message(JSON.stringify({ type: 'end', id: 0, token: 2 })), /incomplete/);
});
test('cancel aborts disk writing and stale frames cannot contaminate a later download', async () => {
  const h = harness([new File(['new content'], 'x.txt')]); h.tx.publish(); await h.flush();
  let aborted = false;
  h.rx.current = { file: h.rx.manifest[0], token: 1, chunks: [], sink: { abort: async () => { aborted = true; } } };
  await h.rx.cancel(); assert.equal(aborted, true); assert.equal(h.rx.current, null);
  h.rx.current = { file: h.rx.manifest[0], token: 2, bytes: 0, started: false, chunks: [] };
  const oldFrame = new Uint8Array(8); new DataView(oldFrame.buffer).setUint32(0, 1);
  await h.rx.message(oldFrame.buffer); assert.equal(h.rx.current.bytes, 0); assert.deepEqual(h.rx.current.chunks, []);
  await h.rx.message(JSON.stringify({ type: 'end', id: 0, token: 1 })); assert.notEqual(h.rx.current, null);
  await h.rx.cleanup();
});
