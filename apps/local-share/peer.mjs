import { RTC_CONFIG, localSDP, encodeSignal, decodeSignal, verifyLocalPath } from './policy.mjs';

export class LocalPeer {
  constructor(role, events) {
    this.role = role; this.events = events; this.active = true; this.verified = false;
    this.pc = new RTCPeerConnection(RTC_CONFIG);
    this.pc.onconnectionstatechange = () => {
      if (['failed', 'closed', 'disconnected'].includes(this.pc.connectionState) && this.active)
        this.fail('Connection ended. Keep both devices awake and on the same network, then start a new session.');
    };
    if (role === 'sender') this.attach(this.pc.createDataChannel('local-share-v1', { ordered: true }));
    else this.pc.ondatachannel = event => {
      if (this.channel || event.channel.label !== 'local-share-v1') { event.channel.close(); return; }
      this.attach(event.channel);
    };
  }
  attach(channel) {
    this.channel = channel; channel.binaryType = 'arraybuffer'; channel.bufferedAmountLowThreshold = 65536;
    this.messages = Promise.resolve();
    channel.onmessage = event => {
      this.messages = this.messages.then(async () => {
        await this.opening;
        if (this.active && this.verified) await this.events.message(event.data);
      }).catch(error => this.fail(error.message));
    };
    channel.onopen = () => { this.opening = this.open().catch(error => this.fail(error.message)); };
    channel.onclose = () => { if (this.active) this.fail('The other device ended the session. Download access has stopped.'); };
    channel.onerror = () => this.fail('The transfer connection encountered an error. Please start a new session.');
  }
  async open() {
    await this.guard();
    if (!this.active) return;
    this.verified = true; clearTimeout(this.expiryTimer); clearTimeout(this.connectTimer);
    const fingerprints = [this.pc.localDescription.sdp, this.pc.remoteDescription.sdp].map(s => s.match(/a=fingerprint:sha-256 ([^\r\n]+)/)[1]).sort().join('|');
    const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(fingerprints)));
    const number = ((hash[0] << 16) | (hash[1] << 8) | hash[2]).toString().padStart(8, '0');
    if (!this.active) return;
    this.events.open(number.slice(0, 4) + ' ' + number.slice(4));
    this.monitor = setInterval(() => this.guard().catch(error => this.fail(error.message)), 1000);
  }
  async guard() {
    if (!this.active) throw new Error('This session has ended.');
    await verifyLocalPath(this.pc);
    if (!this.active) throw new Error('This session has ended.');
  }
  async description(type) {
    await this.pc.setLocalDescription(await (type === 'offer' ? this.pc.createOffer() : this.pc.createAnswer()));
    if (this.pc.iceGatheringState !== 'complete') await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => { cleanup(); reject(new Error('Local network discovery timed out. Check Local Network permission and try again.')); }, 12000);
      const check = () => { if (!this.active || this.pc.iceGatheringState === 'complete') { cleanup(); this.active ? resolve() : reject(new Error('Session ended.')); } };
      const cleanup = () => { clearTimeout(timeout); this.pc.removeEventListener('icegatheringstatechange', check); };
      this.pc.addEventListener('icegatheringstatechange', check); check();
    });
    return localSDP(this.pc.localDescription.sdp);
  }
  expireAt(time) {
    this.expiryTimer = setTimeout(() => this.fail('This invitation expired. Start a new session to reconnect.'), Math.max(0, time - Date.now()));
  }
  async invite() {
    this.id = crypto.randomUUID(); this.expires = Date.now() + 20 * 60 * 1000;
    const sdp = await this.description('offer'); this.expireAt(this.expires);
    return encodeSignal({ v: 1, type: 'offer', id: this.id, expires: this.expires, sdp });
  }
  async reply(input) {
    const offer = await decodeSignal(input, 'offer');
    this.id = offer.id; this.expires = offer.expires;
    await this.pc.setRemoteDescription({ type: 'offer', sdp: offer.sdp });
    const sdp = await this.description('answer'); this.expireAt(this.expires);
    this.connectTimer = setTimeout(() => this.fail('No connection yet. Ask the sender to paste your reply and connect. If that fails, check the local network and start again.'), 180000);
    return encodeSignal({ v: 1, type: 'answer', id: this.id, expires: this.expires, sdp });
  }
  async connect(input) {
    const answer = await decodeSignal(input, 'answer');
    if (answer.id !== this.id || answer.expires !== this.expires) throw new Error('This reply belongs to a different invitation.');
    await this.pc.setRemoteDescription({ type: 'answer', sdp: answer.sdp });
    this.connectTimer = setTimeout(() => this.fail('The devices could not connect locally. Check shared Wi-Fi, Local Network permission, guest-network isolation, and firewalls.'), 25000);
  }
  send(value) {
    if (!this.active || !this.verified || this.channel?.readyState !== 'open') throw new Error('The sender is offline or this session has ended.');
    this.channel.send(typeof value === 'object' && !(value instanceof ArrayBuffer) ? JSON.stringify(value) : value);
  }
  fail(message) { if (!this.active) return; this.close(); this.events.close(message); }
  close() {
    this.active = false; this.verified = false;
    clearTimeout(this.expiryTimer); clearTimeout(this.connectTimer); clearInterval(this.monitor);
    this.channel?.close(); this.pc.close();
  }
}
