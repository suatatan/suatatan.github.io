// Offline support for the two migrated text-learning PWAs.
const CACHE='suat-text-labs-v1';
const ROOT='/egitim/makineogrenmesi/';
const SHELLS=[ROOT+'tfidf/',ROOT+'jaccard/'];
const ASSETS=['/apps/pwa-install.js','/apps/tfidf-manifest.json','/apps/jaccard-manifest.json','/apps/icons/tfidf.svg','/apps/icons/tfidf-192.svg','/apps/icons/jaccard.svg','/apps/icons/jaccard-192.svg'];
const LIBS=['https://cdn.tailwindcss.com','https://unpkg.com/react@18/umd/react.development.js','https://unpkg.com/react-dom@18/umd/react-dom.development.js','https://unpkg.com/@babel/standalone/babel.min.js'];
const allowed=new Set([...SHELLS,...ASSETS]);
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await Promise.allSettled([...SHELLS,...ASSETS].map(p=>c.add(p)));await Promise.allSettled(LIBS.map(async p=>{const q=new Request(p,{mode:'no-cors'});const r=await fetch(q);if(r.ok||r.type==='opaque')await c.put(q,r)}));await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('suat-text-labs-')&&k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);const same=u.origin===self.location.origin,lib=LIBS.includes(u.href);const path=u.pathname.replace(/index\.html$/,'');if(!lib&&(!same||!allowed.has(path)))return;e.respondWith((async()=>{const c=await caches.open(CACHE);try{const r=await fetch(e.request);if(r.ok||r.type==='opaque')await c.put(e.request,r.clone());return r}catch{return await c.match(e.request)|| (same?await c.match(path):null)||Response.error()}})())});