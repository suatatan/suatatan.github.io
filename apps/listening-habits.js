/* Shared, device-only French listening history across LoopLab, Écoute Live, Écoute Répète. */
(function(w){
'use strict';
const KEY='suat_fr_listening_habit_v1',ZONE='Europe/Istanbul';
function dateKey(date=new Date()){
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
  const p=Object.fromEntries(parts.filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));
  return p.year+'-'+p.month+'-'+p.day;
}
function back(n){return dateKey(new Date(Date.now()-n*86400000))}
function read(){
  try{const data=JSON.parse(localStorage.getItem(KEY)||'null');if(data&&data.version===1&&data.days&&typeof data.days==='object')return data}catch{}
  return {version:1,days:{},history:[]};
}
function write(data){
  const keys=Object.keys(data.days).sort().reverse();
  keys.slice(180).forEach(k=>delete data.days[k]);
  data.history=(data.history||[]).slice(-120);
  try{localStorage.setItem(KEY,JSON.stringify(data));return true}catch{return false}
}
function streak(data){
  let n=0,i=0;
  if(!qualifies(data.days[back(0)]))i=1;
  while(i<=180&&qualifies(data.days[back(i)])){n++;i++}
  return n;
}
function qualifies(day){return !!day&&(day.seconds>=60||day.phrases>=3)}
function summary(){
  const data=read(),today=data.days[dateKey()]||{seconds:0,phrases:0,events:0};
  return {streak:streak(data),today,history:(data.history||[]).slice(-8).reverse(),totalDays:Object.values(data.days).filter(qualifies).length};
}
function record(app,kind,seconds=0,phrase=''){
  const data=read(),date=dateKey(),day=data.days[date]||{seconds:0,phrases:0,events:0};
  if(kind==='listen')day.seconds+=Math.min(1800,Math.max(0,Number(seconds)||0));
  else if(kind==='sentence'||kind==='transcript'){day.phrases++;if(phrase){data.history.push({date,app,kind,text:String(phrase).trim().slice(0,500),at:Date.now()})}}
  else day.events++;
  data.days[date]=day;write(data);refresh();return summary();
}
function refresh(){
  const s=summary();
  document.querySelectorAll('[data-listening-habit]').forEach(node=>{
    node.replaceChildren();
    const strong=document.createElement('strong');
    strong.textContent='🔥 '+s.streak+' gün seri';
    const progress=document.createElement('span');
    progress.textContent=' · Bugün '+Math.round(s.today.seconds/6)/10+' dk / '+s.today.phrases+' cümle';
    const hint=document.createElement('small');
    hint.textContent=' · Günlük hedef: 1 dk dinleme veya 3 cümle'+(qualifies(s.today)?' ✓':'');
    node.append(strong,progress,hint);
    if(s.history.length){
      const details=document.createElement('details');details.style.marginTop='6px';
      const head=document.createElement('summary');head.textContent='Son çalışılan cümleler (bu cihazda)';head.style.cursor='pointer';
      const list=document.createElement('ul');list.style.paddingLeft='22px';list.style.margin='7px 0';
      s.history.forEach(h=>{const item=document.createElement('li');item.textContent=h.text;item.style.marginBottom='3px';list.append(item)});
      details.append(head,list);node.append(details);
    }
  });
}
w.FrenchListeningHabit={record,summary,refresh,dateKey};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refresh,{once:true});else refresh();
})(window);
