import { LocalPeer } from './peer.mjs';
import { FileTransfer } from './transfer.mjs';
import { MAX_FILES, MEMORY_LIMIT } from './policy.mjs';

const $ = id => document.getElementById(id);
let selected = [], peer = null, transfer = null, busy = false, picking = false;
const urls = new Set();
const formatSize = bytes => bytes < 1024 ? `${bytes} B` : bytes < 1048576 ? `${(bytes / 1024).toFixed(1)} KiB` : bytes < 1073741824 ? `${(bytes / 1048576).toFixed(1)} MiB` : `${(bytes / 1073741824).toFixed(2)} GiB`;
function notice(message, error = false) { $('notice').textContent = message; $('notice').classList.toggle('error', error); }
function status(title, detail, state = '') {
  $('status').textContent = title; $('status-detail').textContent = detail; $('status-dot').className = `dot ${state}`;
}
function role(value) {
  if (peer) return;
  const send = value === 'sender';
  $('send-panel').hidden = !send; $('receive-panel').hidden = send;
  for (const [id, on] of [['send-tab', send], ['receive-tab', !send]]) { $(id).setAttribute('aria-selected', String(on)); $(id).tabIndex = on ? 0 : -1; }
}
$('send-tab').onclick = () => role('sender');
$('receive-tab').onclick = () => role('receiver');
for (const id of ['send-tab', 'receive-tab']) $(id).onkeydown = event => {
  if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) && !peer) {
    event.preventDefault(); const send = event.key === 'Home' || (event.key !== 'End' && id === 'receive-tab');
    role(send ? 'sender' : 'receiver'); $(send ? 'send-tab' : 'receive-tab').focus();
  }
};
function row(file, action, label) {
  const li = document.createElement('li'), info = document.createElement('div'), name = document.createElement('strong'), size = document.createElement('small');
  info.className = 'file-info'; name.textContent = file.name; size.textContent = formatSize(file.size); info.append(name, size); li.append(info);
  if (action) {
    const button = document.createElement('button'); button.textContent = label;
    button.setAttribute('aria-label', `${label} ${file.name}`); button.onclick = action; li.append(button);
  }
  return li;
}
function renderSelected() {
  $('selected-files').replaceChildren(...selected.map((file, index) => row(file, peer ? null : () => { selected.splice(index, 1); renderSelected(); }, 'Remove')));
  $('create-invite').disabled = !selected.length || !!peer || busy;
}
function chooseFiles(list) {
  if (peer || busy) { notice('End the current session before changing files.', true); return; }
  const files = [...list];
  if (!files.length) return;
  if (selected.length + files.length > MAX_FILES) { notice(`Select at most ${MAX_FILES} files per session.`, true); return; }
  if (files.some(f => f.name.length > 255 || !Number.isSafeInteger(f.size))) { notice('A file has an unsupported name or size.', true); return; }
  selected.push(...files); renderSelected();
  notice(`${selected.length} file${selected.length === 1 ? '' : 's'} selected. Create an invitation when ready.`);
}
$('files').onchange = event => { chooseFiles(event.target.files); event.target.value = ''; };
for (const type of ['dragenter', 'dragover']) $('dropzone').addEventListener(type, event => { event.preventDefault(); $('dropzone').classList.add('drag'); });
for (const type of ['dragleave', 'drop']) $('dropzone').addEventListener(type, event => { event.preventDefault(); $('dropzone').classList.remove('drag'); });
$('dropzone').addEventListener('drop', event => chooseFiles(event.dataTransfer.files));
window.addEventListener('dragover', event => event.preventDefault());
window.addEventListener('drop', event => event.preventDefault());

function renderAvailable(files) {
  $('available-files').replaceChildren(...files.map(file => {
    const li = row(file, () => downloadFile(file), 'Download');
    li.querySelector('button').disabled = !!transfer?.current || picking || !peer?.verified;
    return li;
  }));
}
function progress(file, bytes, detail) {
  $('transfer').hidden = false; $('transfer-name').textContent = file.name;
  const percent = file.size ? Math.min(100, bytes / file.size * 100) : 0;
  $('progress').value = percent; $('transfer-percent').textContent = `${Math.floor(percent)}%`;
  $('transfer-detail').textContent = `${formatSize(bytes)} / ${formatSize(file.size)} · ${detail}`;
  $('cancel-transfer').hidden = false;
  if (peer?.role === 'receiver') renderAvailable(transfer.manifest || []);
}
async function downloadFile(file) {
  if (!peer?.verified || transfer.current || picking) return;
  const activePeer = peer, activeTransfer = transfer; let sink;
  picking = true; renderAvailable(transfer.manifest);
  try {
    if (typeof window.showSaveFilePicker === 'function') {
      const handle = await window.showSaveFilePicker({ suggestedName: file.name });
      sink = await handle.createWritable();
    } else if (file.size > MEMORY_LIMIT) throw new Error('Files over 200 MiB need direct-to-disk saving. Try current desktop Chrome or Edge.');
    if (peer !== activePeer || !activePeer.active) { await sink?.abort(); throw new Error('The sender went offline while you chose a destination.'); }
    await activeTransfer.receiveFile(file.id, sink);
  } catch (error) {
    if (sink) { try { await sink.abort(); } catch { /* Already aborted. */ } }
    if (error.name !== 'AbortError') notice(error.message, true);
  } finally { picking = false; if (transfer?.manifest && peer?.role === 'receiver') renderAvailable(transfer.manifest); }
}
function makePeer(value) {
  const created = new LocalPeer(value, {
    open(code) {
      if (peer !== created) return;
      busy = false;
      status('Connected locally', value === 'sender' ? 'The other device can now request your selected files.' : 'The sender is online. Choose a file to download.', 'connected');
      $('verify-code').textContent = code; $('verification').hidden = false; $('route').textContent = 'Verified local';
      $('invite-area').hidden = true; $('reply-area').hidden = true; $('receive-setup').hidden = true;
      $('reply-input').value = ''; $('reply-code').value = ''; $('invite-link').value = ''; $('offer-input').value = '';
      notice('Connected. Compare the verification numbers on both devices before downloading.');
      if (value === 'sender') transfer.publish();
    },
    message(data) { if (peer === created) return transfer.message(data); },
    close(message) { if (peer === created) { resetSession(); status('Session ended', 'No more files can be requested. Start a new session to reconnect.', 'error'); notice(message, true); } }
  });
  peer = created;
  transfer = new FileTransfer(created, value === 'sender' ? selected.slice() : null, {
    manifest(files) { $('available-area').hidden = false; renderAvailable(files); notice(`${files.length} file${files.length === 1 ? '' : 's'} available from the sender.`); },
    progress,
    complete(file) {
      $('progress').value = 100; $('transfer-percent').textContent = '100%'; $('transfer-detail').textContent = 'Transfer complete'; $('cancel-transfer').hidden = true;
      notice(`${file.name} — ${value === 'sender' ? 'download confirmed by the receiver.' : 'transfer complete. Check your saved file or browser downloads.'}`);
      // Completion is reported before FileTransfer clears its current operation.
      queueMicrotask(() => { if (peer === created && value === 'receiver') renderAvailable(transfer.manifest); });
    },
    cancel(message) { $('transfer').hidden = true; notice(message); if (value === 'receiver' && transfer?.manifest) renderAvailable(transfer.manifest); },
    download(blob, name) {
      const url = URL.createObjectURL(blob); urls.add(url);
      const a = document.createElement('a'); a.href = url; a.download = name; a.textContent = 'Save downloaded file';
      document.body.append(a); a.click(); a.remove();
      setTimeout(() => { URL.revokeObjectURL(url); urls.delete(url); }, 60000);
    }
  });
  $('stop').hidden = false; $('files').disabled = true;
  $('send-tab').disabled = true; $('receive-tab').disabled = true;
  renderSelected(); return created;
}
function resetSession() {
  const previous = transfer; peer?.close(); peer = null; transfer = null; busy = false;
  previous?.cleanup().catch(() => {});
  $('stop').hidden = true; $('files').disabled = false; $('send-tab').disabled = false; $('receive-tab').disabled = false;
  for (const id of ['invite-area', 'reply-area', 'available-area', 'verification', 'transfer']) $(id).hidden = true;
  for (const id of ['invite-link', 'reply-code', 'reply-input', 'offer-input']) $(id).value = '';
  $('receive-setup').hidden = false; $('available-files').replaceChildren();
  $('create-reply').disabled = false; $('connect').disabled = false; $('route').textContent = 'Local only'; renderSelected();
}
$('stop').onclick = () => { resetSession(); status('Session ended', 'The local connection is closed.'); notice('Session ended. Your files are no longer shared.'); };
$('cancel-transfer').onclick = () => transfer?.cancel().catch(error => notice(error.message, true));
$('create-invite').onclick = async () => {
  if (busy || peer || !selected.length) return;
  busy = true; let created;
  try {
    created = makePeer('sender'); status('Preparing invitation', 'Finding a local connection…', 'waiting');
    const code = await created.invite(); if (peer !== created) return;
    $('invite-link').value = `${location.origin}${location.pathname}#${code}`; $('invite-area').hidden = false;
    status('Waiting for reply', 'Send the invitation, then paste the receiver’s reply code.', 'waiting');
    notice('Invitation ready. Keep this tab open and send the link to the other device.');
  } catch (error) { if (created && peer === created) resetSession(); notice(error.message, true); status('Could not start', 'Check local network permissions and try again.', 'error'); }
  finally { busy = false; renderSelected(); }
};
$('create-reply').onclick = async () => {
  if (busy || peer) return;
  const input = $('offer-input').value; if (!input.trim()) { notice('Paste the sender’s invitation first.', true); return; }
  busy = true; $('create-reply').disabled = true; let created;
  try {
    created = makePeer('receiver'); status('Preparing reply', 'Finding a local connection…', 'waiting');
    const code = await created.reply(input); if (peer !== created) return;
    $('reply-code').value = code; $('reply-area').hidden = false; $('receive-setup').hidden = true;
    status('Waiting for sender', 'Send your reply code back and ask the sender to connect.', 'waiting');
    notice('Reply ready. Copy it back to the sender and keep this tab open.');
  } catch (error) { if (created && peer === created) resetSession(); notice(error.message, true); status('Could not connect', 'Check the invitation and local network, then try again.', 'error'); }
  finally { busy = false; $('create-reply').disabled = false; }
};
$('connect').onclick = async () => {
  if (busy || !peer || peer.role !== 'sender') return;
  busy = true; $('connect').disabled = true; const created = peer;
  try {
    await created.connect($('reply-input').value);
    if (peer === created && !created.verified) status('Connecting', 'Checking that both ends use a local address…', 'waiting');
  } catch (error) { notice(error.message, true); }
  finally { busy = false; $('connect').disabled = false; }
};
async function copy(id, button) {
  const el = $(id); let copied = false;
  try { await navigator.clipboard.writeText(el.value); copied = true; }
  catch { el.focus(); el.select(); try { copied = document.execCommand('copy'); } catch { /* Manual copy. */ } }
  if (!copied) { notice('The code is selected. Use your device’s Copy command.'); return; }
  const original = button.textContent; button.textContent = 'Copied ✓'; setTimeout(() => { button.textContent = original; }, 2000);
}
$('copy-invite').onclick = event => copy('invite-link', event.currentTarget);
$('copy-reply').onclick = event => copy('reply-code', event.currentTarget);
$('save-note').textContent = typeof window.showSaveFilePicker === 'function' ? 'You will choose a destination. Files stream directly to disk.' : 'Downloads use browser memory. Maximum file size on this browser: 200 MiB.';
window.addEventListener('beforeunload', event => { if (peer?.active) { event.preventDefault(); event.returnValue = ''; } });
window.addEventListener('pagehide', () => { peer?.close(); transfer?.cleanup().catch(() => {}); for (const url of urls) URL.revokeObjectURL(url); });
window.addEventListener('pageshow', event => { if (event.persisted) { resetSession(); status('Session ended', 'Start a new session after returning to this page.'); } });
const fragment = location.hash.slice(1);
if (fragment) { history.replaceState(null, '', location.pathname + location.search); role('receiver'); $('offer-input').value = fragment; notice('Invitation received. Click “Create reply” to pair with the sender.'); }
if (!window.RTCPeerConnection || !window.isSecureContext) {
  notice('Use HTTPS and a current browser with WebRTC support to share files.', true);
  for (const id of ['create-invite', 'create-reply', 'connect', 'files']) $(id).disabled = true;
}
