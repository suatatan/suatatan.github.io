// Only this app's shell is cached. Local Ollama/Anki traffic bypasses this worker.
const CACHE='suat-flaner-v9-turkish-20261028';
const APP=new URL('./',self.location.href).href;
const INDEX=new URL('index.html',APP).href;
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const response=await fetch(new Request(INDEX,{cache:'reload'}));
    if(!response.ok||!response.headers.get('content-type')?.includes('text/html'))throw new Error('App shell unavailable');
    const cache=await caches.open(CACHE);
    await cache.put(APP,response.clone());
    await cache.put(INDEX,response);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    for(const name of await caches.keys())if(name.startsWith('suat-flaner-')&&name!==CACHE)await caches.delete(name);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;
  if(url.pathname!==new URL(APP).pathname&&url.pathname!==new URL(INDEX).pathname)return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    try{
      const response=await fetch(request,{signal:AbortSignal.timeout(4000)});
      if(response.ok&&response.headers.get('content-type')?.includes('text/html')){
        await cache.put(APP,response.clone());
        await cache.put(INDEX,response.clone());
        return response;
      }
      return (await cache.match(APP))||response;
    }catch{
      return (await cache.match(APP))||new Response('Çevrimdışı kopya bulunamadı. İnternetle bir kez açın.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
    }
  })());
});
