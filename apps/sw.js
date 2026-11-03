// Shared shell worker for the three legacy single-file apps only.
// Independent manifest IDs/scopes make each app separately installable.
// More specific /apps/<name>/ workers own their respective applications.
const CACHE='suat-single-apps-v1';
const SHELLS=['/apps/breathing-exercise.html','/apps/jaccard_visualizer.html','/apps/tfidf_visualizer.html'];
const ASSETS=['/apps/pwa-install.js','/apps/listening-habits.js','/apps/breathe-manifest.json','/apps/jaccard-manifest.json','/apps/tfidf-manifest.json'];
const BREATHE=['/apps/icons/breathe-180.png','/apps/icons/breathe-192.png','/apps/icons/breathe-512.png','/assets/breathing/sunlit-forest.jpg','/assets/breathing/pine-forest.jpg','/assets/breathing/forest-path.jpg'];
const ICONS=['/apps/icons/jaccard.svg','/apps/icons/jaccard-192.svg','/apps/icons/tfidf.svg','/apps/icons/tfidf-192.svg'];
const ALLOWED=new Set([...SHELLS,...ASSETS,...BREATHE,...ICONS]);
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await Promise.allSettled([...SHELLS,...ASSETS,...BREATHE,...ICONS].map(p=>cache.add(p)));try{const req=new Request('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js',{mode:'no-cors'});await cache.put(req,await fetch(req))}catch{}await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const names=await caches.keys();await Promise.all(names.filter(n=>n.startsWith('suat-single-apps-')&&n!==CACHE).map(n=>caches.delete(n)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const u=new URL(event.request.url),lib=u.href==='https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js';if(!lib&&(u.origin!==location.origin||!ALLOWED.has(u.pathname)))return;event.respondWith((async()=>{const cache=await caches.open(CACHE);if(SHELLS.includes(u.pathname)){try{const r=await fetch(event.request);if(r.ok)event.waitUntil(cache.put(event.request,r.clone()));return r}catch{return await cache.match(event.request)||Response.error()}}const existing=await cache.match(event.request);if(existing)return existing;try{const r=await fetch(event.request);if(r.ok||r.type==='opaque')event.waitUntil(cache.put(event.request,r.clone()));return r}catch{return Response.error()}})())});
