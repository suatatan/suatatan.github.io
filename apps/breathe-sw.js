// Scoped to /apps/ so Breathe can work separately from the blog PWA.
// Other apps under /apps/ are never intercepted by this worker.
const CACHE = 'breathe-assets-v1';
const APP = '/apps/breathing-exercise.html';
const LIB = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js';
const CORE = [
  APP,
  '/apps/breathe-manifest.json',
  '/apps/icons/breathe-192.png',
  '/apps/icons/breathe-512.png',
  '/apps/icons/breathe-180.png',
  '/assets/breathing/sunlit-forest.jpg',
  '/assets/breathing/pine-forest.jpg',
  '/assets/breathing/forest-path.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    // p5 is an external classic script. Cache the opaque response explicitly:
    // cache.add() rejects opaque responses even though cache.put() accepts them.
    try {
      const request = new Request(LIB, { mode: 'no-cors' });
      const response = await fetch(request);
      await cache.put(request, response);
    } catch (error) {
      console.warn('Breathe: animation library not available offline yet', error);
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('breathe-assets-') && name !== CACHE).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const sameOrigin = url.origin === self.location.origin;
  const isCore = sameOrigin && CORE.includes(url.pathname);
  const isLibrary = url.href === LIB;
  if (!isCore && !isLibrary) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const fromNetwork = async () => {
      const response = await fetch(event.request);
      if (response.ok || response.type === 'opaque') {
        event.waitUntil(cache.put(event.request, response.clone()).catch(() => {}));
      }
      return response;
    };
    // Keep Breathe current when online; serve the offline version when offline.
    if (sameOrigin && url.pathname === APP) {
      try { return await fromNetwork(); }
      catch (_) { return (await cache.match(APP)) || Response.error(); }
    }
    return (await cache.match(event.request))
      || await fromNetwork().catch(() => Response.error());
  })());
});
