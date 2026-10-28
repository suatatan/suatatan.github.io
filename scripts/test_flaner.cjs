'use strict';
const{test}=require('node:test');const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');const crypto=require('node:crypto');const path=require('node:path');const ROOT=path.resolve(__dirname,'..');const localHTML=fs.readFileSync(path.join(ROOT,'apps/flaner/flaner.html'),'utf8');const nanoSource=[...localHTML.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)][2][1];const nanoContext={module:{exports:{}}};vm.createContext(nanoContext);vm.runInContext(nanoSource,nanoContext);const Nano=nanoContext.module.exports;
const tick=()=>new Promise(r=>setImmediate(r));
function fixture(edition="flaner.html"){
 let ankiError=null;
 const els={},storage=new Map(),calls=[];let revision=0,disk=null;
 class El{constructor(){this.value='';this.children=[];this.classList={add(){},remove(){},toggle(){}};this.dataset={};this.scrollHeight=100;this.clientHeight=100;this.scrollTop=0;}set id(id){els[id]=this;}append(...nodes){this.children.push(...nodes);if(!this.value&&nodes[0]?.value)this.value=nodes[0].value;}replaceChildren(){this.children=[];this.value='';}showModal(){}close(){}focus(){}checkValidity(){return true;}}
 let nanoOptions,destroyed=0;
 const c={console,URL,Blob,TextDecoder,TextEncoder,Uint8Array,DOMException,AbortController,AbortSignal,crypto:crypto.webcrypto,setTimeout,
  FlanerNano:Nano,DOMPurify:{sanitize:x=>x},marked:{parse:x=>x},location:{origin:'http://127.0.0.1:18766'},navigator:{clipboard:{writeText:async()=>{}}},confirm:()=>true,
  window:{LOCAL_BRIDGE:{token:'test'},addEventListener(){},getSelection:()=>({toString:()=>''}),LanguageModel:{availability:async()=> 'available',create:async options=>{nanoOptions=options;return {destroy(){destroyed++;},addEventListener(){},promptStreaming(){return(async function*(){yield 'Bon';yield 'jour';})();}};}}},
  localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},document:{getElementById:id=>els[id]??=new El(),querySelectorAll:()=>[],createElement:()=>new El()},
  fetch:async(url,init={})=>{calls.push({url,init});const value=init.body?JSON.parse(init.body):null;
   if(url==='/state'){if(!value)return {ok:true,json:async()=>({revision,state:disk})};assert.equal(value.revision,revision);disk=value.state;return {ok:true,json:async()=>({revision:++revision})};}
   if(url.endsWith('/api/tags'))throw Error('Ollama not installed');
   if(url==='/open-chrome')return {ok:true,json:async()=>({url:'http://127.0.0.1:18766'})};
   if(url==='http://127.0.0.1:8765'){const results={version:6,deckNames:['French'],modelNames:['Basic'],modelFieldNames:['Front','Back'],addNote:12345};return {ok:true,json:async()=>({result:ankiError?null:results[value.action],error:ankiError})};}
   throw Error('Unexpected route '+url);
  }};
 vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(ROOT,'apps/flaner',edition),'utf8').split('<script>').at(-1).split('</script>')[0],c);
 return {setAnkiError:e=>ankiError=e,run:x=>vm.runInContext(x,c),els,calls,storage,get disk(){return disk;},get nanoOptions(){return nanoOptions;},get destroyed(){return destroyed;}};
}
test('Anki full form loads fields, preserves edits on failure, retries and escapes model HTML',async()=>{
 const f=fixture();await tick();await tick();f.run("cardDraft={front:'avoir hâte de',back:'<img src=x>\\nDört gözle beklemek'};openAnki()");
 await f.els.loadAnki.onclick();assert.equal(f.els.addAnki.disabled,false);assert.equal(f.els.field0.value,'avoir hâte de');
 f.els.field0.value='J’ai hâte de te revoir.';f.run("$('tags').value='français expression'");f.setAnkiError('cannot create note because it is a duplicate');
 await f.els.addAnki.onclick();assert.match(f.els.ankiStatus.textContent,/duplicate/);assert.equal(f.els.addAnki.disabled,false);assert.equal(f.els.field0.value,'J’ai hâte de te revoir.');
 f.setAnkiError(null);await f.els.addAnki.onclick();assert.match(f.els.ankiStatus.textContent,/12345/);assert.equal(f.els.addAnki.disabled,true);
 const call=f.calls.filter(c=>c.url==='http://127.0.0.1:8765').at(-1);const note=JSON.parse(call.init.body).params.note;
 assert.equal(note.deckName,'French');assert.equal(note.modelName,'Basic');assert.equal(note.fields.Front,'J’ai hâte de te revoir.');assert.match(note.fields.Back,/&lt;img src=x&gt;<br>/);assert.deepEqual(note.tags,['français','expression']);assert.equal(note.options.allowDuplicate,false);
});

test('web edition uses Nano without local requests and excludes Anki UI',async()=>{
 const f=fixture('index.html');await tick();assert.equal(f.calls.length,0);assert.equal(f.run('state.engine'),'chrome');f.els.prompt.value='Bonjour';await f.els.composer.onsubmit({preventDefault(){}});assert.equal(f.run('current().messages.at(-1).content'),'Bonjour');assert.equal(f.calls.length,0);assert.equal(f.destroyed,1);
 const html=fs.readFileSync(path.join(ROOT,'apps/flaner/index.html'),'utf8');assert(!html.includes('id="addAnki"'));assert(!html.includes("action('Anki’ye ekle'"));assert(html.includes('by Dr. Suat ATAN'));
});
