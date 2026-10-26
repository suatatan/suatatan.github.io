// Deliberately no STUN, TURN, public candidates, or relay fallback.
export const RTC_CONFIG = Object.freeze({ iceServers: [], iceCandidatePoolSize: 0 });
export const MAX_FILES = 100;
export const MEMORY_LIMIT = 200 * 1024 * 1024;
const MAX_SIGNAL = 131072;

export function isLocalAddress(value) {
  if (typeof value !== 'string') return false;
  const address = value.toLowerCase();
  if (/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.local\.?$/.test(address)) return true;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(address)) {
    const p = address.split('.').map(Number);
    if (p.some(n => n > 255)) return false;
    return p[0] === 10 || p[0] === 127 || (p[0] === 172 && p[1] >= 16 && p[1] <= 31) ||
      (p[0] === 192 && p[1] === 168) || (p[0] === 169 && p[1] === 254);
  }
  // Validate IPv6 syntax with the platform parser before checking its prefix.
  if (!address.includes(':') || address.includes('%')) return false;
  try {
    const canonical = new URL(`http://[${address}]/`).hostname.slice(1, -1);
    if (canonical === '::1') return true;
    const first = parseInt(canonical.split(':')[0], 16);
    return (first & 0xfe00) === 0xfc00 || (first & 0xffc0) === 0xfe80;
  } catch { return false; }
}

export function allowedCandidate(line) {
  const p = line.replace(/^a=/, '').trim().split(/\s+/);
  return /^candidate:/.test(p[0]) && p.length >= 8 && p[2].toLowerCase() === 'udp' &&
    p[6] === 'typ' && p[7] === 'host' && isLocalAddress(p[4]) &&
    Number.isInteger(Number(p[5])) && Number(p[5]) > 0 && Number(p[5]) <= 65535;
}

export function localSDP(sdp, rejectUnsafe = false) {
  if (typeof sdp !== 'string' || sdp.length > MAX_SIGNAL || !sdp.includes('a=fingerprint:sha-256 '))
    throw new Error('Invalid connection description. Ask for a new invitation.');
  const lines = sdp.split(/\r?\n/);
  const media = lines.filter(line => line.startsWith('m='));
  if (media.length !== 1 || !media[0].startsWith('m=application '))
    throw new Error('Only file-sharing connections are accepted.');
  let count = 0;
  const safe = lines.filter(line => {
    if (line.startsWith('a=remote-candidates:')) {
      if (rejectUnsafe) throw new Error('Unsafe connection description.');
      return false;
    }
    if (!line.startsWith('a=candidate:')) return true;
    if (allowedCandidate(line)) { count++; return true; }
    if (rejectUnsafe) throw new Error('This connection contains a public or relay address. Only local connections are allowed.');
    return false;
  });
  if (!count) throw new Error('No local network address is available. Allow Local Network access, check your firewall, and try again.');
  return safe.join('\r\n');
}

export async function encodeSignal(data) {
  let bytes = new TextEncoder().encode(JSON.stringify(data));
  let prefix = 'LS1.';
  if (globalThis.CompressionStream && globalThis.DecompressionStream) {
    bytes = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate'))).arrayBuffer());
    prefix = 'LS1Z.';
  }
  return prefix + btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function decodeSignal(input, expected) {
  let code = input.trim();
  if (code.length > MAX_SIGNAL) throw new Error('The connection code is too long.');
  if (/^https?:\/\//i.test(code)) {
    try { code = new URL(code).hash.slice(1); } catch { throw new Error('Invalid invitation link.'); }
  }
  const match = /^(LS1Z|LS1)\.([A-Za-z0-9_-]+)$/.exec(code);
  if (!match) throw new Error('Paste the complete Local Share link or code.');
  let data;
  try {
    let bytes = Uint8Array.from(atob(match[2].replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
    if (match[1] === 'LS1Z') {
      if (!globalThis.DecompressionStream) throw new Error('This browser cannot read compressed connection codes. Please update it.');
      const reader = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate')).getReader();
      const chunks = []; let size = 0;
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        size += value.length;
        if (size > MAX_SIGNAL) { await reader.cancel(); throw new Error('Connection description is too large.'); }
        chunks.push(value);
      }
      bytes = new Uint8Array(size); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    }
    data = JSON.parse(new TextDecoder().decode(bytes));
  } catch (error) { throw new Error(error.message?.includes('browser') ? error.message : 'The connection code is damaged or incomplete.'); }
  if (data.v !== 1 || data.type !== expected || !/^[a-f0-9-]{36}$/.test(data.id) ||
      !Number.isSafeInteger(data.expires) || data.expires < Date.now() || data.expires > Date.now() + 21 * 60 * 1000)
    throw new Error('This code is expired or is for the wrong step. Create a new invitation.');
  data.sdp = localSDP(data.sdp, true);
  return data;
}

export function validateManifest(files) {
  if (!Array.isArray(files) || !files.length || files.length > MAX_FILES) throw new Error('Invalid file list.');
  const ids = new Set();
  return files.map(file => {
    if (!file || !Number.isSafeInteger(file.id) || file.id < 0 || ids.has(file.id) ||
        typeof file.name !== 'string' || !file.name.length || file.name.length > 255 ||
        !Number.isSafeInteger(file.size) || file.size < 0) throw new Error('Invalid file details.');
    ids.add(file.id);
    return { id: file.id, name: file.name.replace(/[\\/\x00-\x1f\x7f]/g, '_'), size: file.size };
  });
}

export async function verifyLocalPath(pc) {
  const transport = pc.sctp?.transport?.iceTransport;
  const pair = transport?.getSelectedCandidatePair?.();
  if (pair) {
    if ([pair.local, pair.remote].every(c => c?.type === 'host' && isLocalAddress(c.address))) return;
    throw new Error('The selected connection is not a verifiable local path.');
  }
  const stats = await pc.getStats();
  let chosen;
  for (const row of stats.values()) {
    if (row.type === 'transport' && row.selectedCandidatePairId) chosen = stats.get(row.selectedCandidatePairId);
  }
  if (!chosen) chosen = [...stats.values()].find(row => row.type === 'candidate-pair' && row.state === 'succeeded' && row.nominated);
  const candidates = chosen ? [stats.get(chosen.localCandidateId), stats.get(chosen.remoteCandidateId)] : [];
  if (candidates.length === 2 && candidates.every(c => c?.candidateType === 'host' && isLocalAddress(c.address || c.ip))) return;
  throw new Error('The browser could not verify a private local path. Try a current desktop browser on the same LAN.');
}
