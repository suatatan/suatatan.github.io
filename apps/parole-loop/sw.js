// Scoped exclusively to Écoute Répète. The Piper runtime is cached as used;
// the ~63 MB voice model is kept separately by the TTS library in OPFS.
const CACHE='suat-parole-loop-shell-v3';
const CORE=['./','./index.html','./manifest.webmanifest','./piper-audio.js','/apps/pwa-install.js','/apps/icons/parole-loop-192.svg','/apps/icons/parole-loop.svg','/apps/listening-habits.js'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await Promise.allSettled(CORE.map(path=>cache.add(path)));await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('suat-parole-loop-shell-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const u=new URL(event.request.url),local=u.origin===self.location.origin&&(u.pathname.startsWith('/apps/parole-loop/')||u.pathname==='/apps/listening-habits.js'||u.pathname==='/apps/pwa-install.js'||u.pathname.startsWith('/apps/icons/parole-loop'));
 const runtime=(u.hostname==='cdn.jsdelivr.net'&&(u.pathname.includes('vits-web@1.0.3')||u.pathname.includes('piper-wasm@1.0.0')||u.pathname.includes('onnxruntime-web')))||
 (u.hostname==='cdnjs.cloudflare.com'&&u.pathname.includes('/onnxruntime-web/1.18.0/'));
 if(!local&&!runtime)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  if(local&&event.request.mode==='navigate'){
   try{const r=await fetch(event.request);if(r.ok)event.waitUntil(cache.put(event.request,r.clone()));return r}
   catch{return await cache.match(event.request)||await cache.match('./index.html')||Response.error()}
  }
  const saved=await cache.match(event.request);if(saved)return saved;
  try{const r=await fetch(event.request);if(r.ok||r.type==='opaque')event.waitUntil(cache.put(event.request,r.clone()));return r}
  catch{return Response.error()}
 })());
});
