// Piper WAV generator for Écoute Répète. All speech inference runs in the browser.
// Large voice/model resources are fetched only when the user selects Piper mode.
const VOICE='fr_FR-siwis-medium';
const MAX_AUDIO_BYTES=60*1024*1024;
const MAX_SENTENCES=60;
const CHUNK_CHARS=175;
let ttsPromise=null,dbPromise=null;

function openCache(){
 if(dbPromise)return dbPromise;
 dbPromise=new Promise((resolve,reject)=>{
  if(!('indexedDB' in window))return reject(Error('IndexedDB kullanılamıyor'));
  const req=indexedDB.open('ecoute_repete_piper_clips_v1',1);
  req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('clips'))req.result.createObjectStore('clips')};
  req.onsuccess=()=>resolve(req.result);
  req.onerror=()=>reject(req.error);
 });
 return dbPromise;
}
async function getCached(text){
 try{
  const db=await openCache();
  return await new Promise(resolve=>{
   const req=db.transaction('clips','readonly').objectStore('clips').get(VOICE+'|'+text);
   req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>resolve(null);
  });
 }catch{return null}
}
async function putCached(text,blob){
 try{
  const db=await openCache();
  // A bounded clip cache avoids filling a phone's storage with old generated speech.
  const count=await new Promise(resolve=>{const r=db.transaction('clips','readonly').objectStore('clips').count();r.onsuccess=()=>resolve(r.result);r.onerror=()=>resolve(999)});
  if(count>=100)return;
  const store=db.transaction('clips','readwrite').objectStore('clips');
  await new Promise((resolve,reject)=>{const r=store.put(blob,VOICE+'|'+text);r.onsuccess=resolve;r.onerror=()=>reject(r.error)});
 }catch(e){console.warn('Piper WAV önbelleğe alınamadı',e)}
}
function chunks(text){
 const words=String(text).trim().split(/\s+/).filter(Boolean),out=[];let current='';
 for(const word of words){
  if(current&&current.length+word.length+1>CHUNK_CHARS){out.push(current);current=''}
  current+=(current?' ':'')+word;
 }
 if(current)out.push(current);
 return out;
}
async function engine(){
 if(!ttsPromise)ttsPromise=import('https://cdn.jsdelivr.net/npm/@diffusionstudio/vits-web@1.0.3/+esm').catch(e=>{ttsPromise=null;throw e});
 return ttsPromise;
}
async function getWav(text,progress){
 const cached=await getCached(text);if(cached)return cached;
 const tts=await engine();
 const blob=await tts.predict({text,voiceId:VOICE},p=>{
  if(p&&p.total>0)progress?.('Fransızca ses modeli indiriliyor: %'+Math.round(100*p.loaded/p.total));
  else progress?.('Fransızca ses modeli yükleniyor…');
 });
 await putCached(text,blob);
 return blob;
}
function pcmFromWav(buffer){
 const v=new DataView(buffer);
 if(v.byteLength<44||v.getUint32(0,true)!==0x46464952||v.getUint32(8,true)!==0x45564157)throw Error('Geçersiz WAV verisi');
 let p=12,format=null,dataStart=-1,dataBytes=0;
 while(p+8<=v.byteLength){
  const tag=v.getUint32(p,true),size=v.getUint32(p+4,true),start=p+8;
  if(start+size>v.byteLength)throw Error('Bozuk WAV parçası');
  if(tag===0x20746d66)format={channels:v.getUint16(start+2,true),rate:v.getUint32(start+4,true),bits:v.getUint16(start+14,true),type:v.getUint16(start,true)};
  if(tag===0x61746164){dataStart=start;dataBytes=size;break}
  p=start+size+(size&1);
 }
 if(!format||format.channels!==1||format.bits!==16||format.type!==1||dataStart<0)throw Error('Yalnızca tek kanallı PCM WAV destekleniyor');
 return {rate:format.rate,pcm:new Uint8Array(buffer,dataStart,dataBytes)};
}
function writeWav(raw,rate,channels=1){
 const view=new DataView(new ArrayBuffer(44+raw.length));
 const tag=(offset,s)=>{for(let i=0;i<s.length;i++)view.setUint8(offset+i,s.charCodeAt(i))};
 tag(0,'RIFF');view.setUint32(4,36+raw.length,true);tag(8,'WAVE');
 tag(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,channels,true);
 view.setUint32(24,rate,true);view.setUint32(28,rate*channels*2,true);
 view.setUint16(32,channels*2,true);view.setUint16(34,16,true);tag(36,'data');view.setUint32(40,raw.length,true);
 new Uint8Array(view.buffer,44).set(raw);
 return new Blob([view.buffer],{type:'audio/wav'});
}

/** Mix binaural carriers and quiet ambient A-minor tones into stereo PCM.
 * Spoken sentences remain centered, including during the pauses between them.
 * Binaural left/right frequencies require stereo headphones to be perceived.
 */
function mixFocusStereo(mono,rate,focus,cancelled=()=>false){
 if(mono.length%2)throw Error('PCM örnek sayısı geçersiz');
 const volume=Math.max(0,Math.min(60,Number(focus.volume)||0))/100;
 const beat=[10,14,18].includes(Number(focus.beatHz))?Number(focus.beatHz):14;
 const frames=mono.length/2,source=new DataView(mono.buffer,mono.byteOffset,mono.byteLength);
 const result=new Uint8Array(mono.length*2),out=new DataView(result.buffer);
 const tau=Math.PI*2,stepL=tau*200/rate,stepR=tau*(200+beat)/rate;
 const stepA=tau*110/rate,stepE=tau*164.81/rate,stepA2=tau*220/rate,stepC=tau*261.63/rate;
 let l=0,r=0,a=0,e=0,a2=0,c=0;
 const fadeSamples=Math.max(1,Math.round(rate*.45));
 for(let i=0;i<frames;i++){
  if((i&65535)===0&&cancelled())throw Error('Hazırlama iptal edildi');
  const pad=Math.sin(a)*.19+Math.sin(e)*.11+Math.sin(a2)*.06+Math.sin(c)*.035;
  const envelope=Math.min(1,i/fadeSamples,(frames-1-i)/fadeSamples);
  const gain=volume*.22*envelope;
  const speech=source.getInt16(i*2,true);
  const left=Math.max(-32768,Math.min(32767,Math.round(speech+32767*gain*(Math.sin(l)+pad))));
  const right=Math.max(-32768,Math.min(32767,Math.round(speech+32767*gain*(Math.sin(r)+pad))));
  out.setInt16(i*4,left,true);out.setInt16(i*4+2,right,true);
  l+=stepL;r+=stepR;a+=stepA;e+=stepE;a2+=stepA2;c+=stepC;
  if(l>=tau)l-=tau;if(r>=tau)r-=tau;if(a>=tau)a-=tau;if(e>=tau)e-=tau;if(a2>=tau)a2-=tau;if(c>=tau)c-=tau;
 }
 return result;
}

/**
 * Prepare ONE native audio file before playback, so no JS sentence scheduling
 * is needed after the phone locks. For infinite repeats, native audio.loop
 * repeats one complete cycle; finite repeats are concatenated into the WAV.
 */
export async function render({items,repeat,gapMs=700,focus={enabled:false},onProgress=()=>{},cancelled=()=>false}){
 const input=[];
 for(const item of items)for(const fragment of chunks(item.text))input.push({index:item.index,text:fragment});
 if(!input.length)throw Error('Önce bir Fransızca cümle gir');
 if(input.length>MAX_SENTENCES)throw Error('Bu modda en fazla 60 cümle parçası hazırlanabilir');
 const count=repeat==='inf'?1:Math.max(1,Math.min(10,Number(repeat)||1));
 const pieces=[];let rate=0,bytePos=0;
 for(let i=0;i<input.length;i++){
  if(cancelled())throw Error('Hazırlama iptal edildi');
  onProgress((i+1)+'/'+input.length+' cümle hazırlanıyor…');
  const blob=await getWav(input[i].text,onProgress);
  if(cancelled())throw Error('Hazırlama iptal edildi');
  const wav=pcmFromWav(await blob.arrayBuffer());
  if(!rate)rate=wav.rate;
  if(rate!==wav.rate)throw Error('Ses örnekleme hızları uyuşmuyor');
  const start=bytePos/(rate*2);
  pieces.push({pcm:wav.pcm,index:input[i].index,text:input[i].text,start,end:start+wav.pcm.length/(rate*2)});
  bytePos+=wav.pcm.length;
  bytePos+=Math.round(rate*gapMs/1000)*2;
  if(bytePos*count*(focus.enabled?2:1)>MAX_AUDIO_BYTES)throw Error('Ses çok uzun. Daha az tekrar veya daha kısa metin seç');
 }
 const total=bytePos*count;
 if(total*(focus.enabled?2:1)>MAX_AUDIO_BYTES)throw Error('Hazırlanan ses telefon belleği için fazla büyük');
 const pcm=new Uint8Array(total),markers=[];
 const silence=Math.round(rate*gapMs/1000)*2;
 for(let n=0;n<count;n++){
  let pos=n*bytePos;
  for(const part of pieces){
   pcm.set(part.pcm,pos);
   const start=pos/(rate*2),end=(pos+part.pcm.length)/(rate*2);
   markers.push({index:part.index,text:part.text,start,end});
   pos+=part.pcm.length+silence;
  }
 }
 let output=pcm,channels=1;
 if(focus.enabled){onProgress('Stereo binaural Focus sesi WAV içine ekleniyor…');output=mixFocusStereo(pcm,rate,focus,cancelled);channels=2}
 return {blob:writeWav(output,rate,channels),markers,cycleSeconds:bytePos/(rate*2),totalSeconds:total/(rate*2),infinite:repeat==='inf'};
}
export {pcmFromWav,writeWav,mixFocusStereo};
