import {fitRanges,classify,makeData} from './model.mjs';
const $=id=>document.getElementById(id);
const plot=$('plot'), svgNS='http://www.w3.org/2000/svg';
const box={x:78,y:32,w:650,h:374};
const sx=age=>box.x+(age-18)/52*box.w;
const sy=education=>box.y+box.h-(education-5)/17*box.h;
const fmt=(n,d=3)=>n.toLocaleString('tr-TR',{minimumFractionDigits:d,maximumFractionDigits:d});
let data=makeData(), ranges=fitRanges(data), seed=23, stage=0;
const stages=[
 {title:'Her noktanın bir geçmişi var.',description:'Bu kişilerin yaşını, eğitim yılını ve kredi sonucunu biliyoruz. Bunlar modelin eğitim verileri (training data).',plot:'Eğitim verisinin dağılımı',next:'Yeni kişi gelsin →'},
 {title:'Özelliklerini biliyoruz. Sonucunu bilmiyoruz.',description:'Sarı elmas yeni bir kişi. Yaşını ve eğitim yılını değiştir; eğitim verisinin neresine düştüğünü gör. Sence kredisini öder mi?',plot:'Bilinen geçmiş + bilinmeyen yeni gözlem',next:'Komşulara sor →'},
 {title:'En yakın k kişi söz alsın.',description:'Çizgiler en yakın komşuları gösterir. Her komşunun bir oyu var. k değerini değiştir: Tahmin aynı kalıyor mu?',plot:'Mesafe → en yakın k komşu → çoğunluk oyu',next:'Karar haritasını aç →'},
 {title:'Her konumda aynı soruyu sor.',description:'Arka plandaki her renk, oraya gelen bir kişi için modelin tahminini gösterir. k ve ölçeklendirme değiştiğinde bölgeler de değişir.',plot:'KNN karar bölgeleri',next:'Baştan dene ↺'}
];
function svg(tag,attrs={},text){const node=document.createElementNS(svgNS,tag);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,value);if(text!==undefined)node.textContent=text;return node;}
function query(){return {age:Number($('age').value),education:Number($('education').value)};}
function settings(){return {k:Number($('k').value),scaled:$('scaled').checked};}
function renderAxes(){const grid=$('grid');grid.replaceChildren();
 for(let age=20;age<=70;age+=10){grid.append(svg('line',{x1:sx(age),x2:sx(age),y1:box.y,y2:box.y+box.h,class:'gridline'}),svg('text',{x:sx(age),y:430,'text-anchor':'middle'},age));}
 for(const edu of [5,8,12,16,20,22]){grid.append(svg('line',{x1:box.x,x2:box.x+box.w,y1:sy(edu),y2:sy(edu),class:'gridline'}),svg('text',{x:65,y:sy(edu)+4,'text-anchor':'end'},edu));}
 grid.append(svg('path',{d:`M${box.x} ${box.y}V406H728`,fill:'none',class:'axis'}),svg('text',{x:box.x+box.w/2,y:466,'text-anchor':'middle',class:'axis-title'},'Yaş (x₁) · yıl'),svg('text',{transform:'translate(21 219) rotate(-90)','text-anchor':'middle',class:'axis-title'},'Eğitim süresi (x₂) · yıl'));
}
function renderData(){
 $('sample-count').textContent=`${data.length} gözlem`;
 $('data-summary').textContent=`${data.length} kurmaca kişi · X ve y birlikte`;
 $('training-data').innerHTML=data.map(p=>`<tr><td>#${p.id}</td><td>${p.age}</td><td>${p.education}</td><td class="${p.y?'paid':'unpaid'}-label">${p.y?'● 1 · Ödedi':'× 0 · Ödemedi'}</td></tr>`).join('');
}
function renderMap(){const layer=$('regions');layer.replaceChildren();if(stage!==3||!$('surface').checked)return;
 const {k,scaled}=settings(),cols=52,rows=34,frag=document.createDocumentFragment();
 for(let ix=0;ix<cols;ix++)for(let iy=0;iy<rows;iy++){
 const q={age:18+(ix+.5)*52/cols,education:22-(iy+.5)*17/rows};
 const pred=classify(data,q,k,scaled,ranges).prediction;
 frag.append(svg('rect',{x:box.x+ix*box.w/cols,y:box.y+iy*box.h/rows,width:box.w/cols+.3,height:box.h/rows+.3,fill:pred?'#2860b5':'#cb453e','fill-opacity':'.13'}));
 }layer.append(frag);
}
function draw(){const q=query(),{k,scaled}=settings(),result=classify(data,q,k,scaled,ranges),neighbors=new Map(result.neighbors.map((p,i)=>[p.id,i+1]));
 $('age-out').value=q.age;$('education-out').value=q.education;$('k-out').value=`k = ${k}`;
 const points=$('points'),connections=$('connections'),marker=$('query-marker');points.replaceChildren();connections.replaceChildren();marker.replaceChildren();
 for(const p of data){const x=sx(p.age),y=sy(p.education),rank=neighbors.get(p.id);
 if(stage>=2&&rank)connections.append(svg('line',{x1:sx(q.age),y1:sy(q.education),x2:x,y2:y,class:'link'}));
 const g=svg('g',{class:`point${stage>=2&&!rank?' dimmed':''}`});
 g.append(svg('circle',{cx:x,cy:y,r:13,fill:'transparent'}));
 if(p.y)g.append(svg('circle',{cx:x,cy:y,r:6.5,class:'paid'}));else g.append(svg('path',{d:`M${x-4.5} ${y-4.5}l9 9m0-9l-9 9`,class:'unpaid'}));
 const label=`Kişi #${p.id} · Yaş ${p.age} · Eğitim ${p.education} yıl · y = ${p.y} (${p.y?'ödedi':'ödemedi'})`;
 g.append(svg('title',{},label));g.addEventListener('pointerenter',()=>{$('hover-info').textContent=label;});
 if(stage>=2&&rank)g.append(svg('circle',{cx:x,cy:y,r:11,class:'neighbor-ring'}),svg('text',{x:x+11,y:y-10,class:'rank'},rank));
 points.append(g);
 }
 if(stage>=1){const x=sx(q.age),y=sy(q.education);marker.append(svg('path',{d:`M${x} ${y-13}l11 13-11 13-11-13Z`,class:'query'}),svg('text',{x:x>650?x-16:x+16,y:y<65?y+28:y-16,'text-anchor':x>650?'end':'start',class:'query-label'},'y = ?'));}
 $('prediction').classList.toggle('negative',result.prediction===0);
 $('prediction').innerHTML=`MODELİN TAHMİNİ<strong>${result.prediction?'Öder · ŷ = 1':'Ödemez · ŷ = 0'}</strong>${k} komşu: ${result.yes} “ödedi”, ${result.no} “ödemedi”.`;
 $('yes-bar').style.width=`${result.yes/k*100}%`;
 $('vote-note').textContent=`Ödedi diyenlerin oy oranı: %${fmt(result.yes/k*100,0)}. Bu bir doğruluk puanı veya kalibre edilmiş olasılık değildir.`;
 $('neighbors').innerHTML=result.neighbors.map((p,i)=>`<tr><td>${i+1}</td><td>#${p.id}</td><td>${p.age}</td><td>${p.education}</td><td>${fmt(p.distance)}</td><td class="${p.y?'paid':'unpaid'}-label">${p.y?'● Ödedi':'× Ödemedi'}</td></tr>`).join('');
 const a=ranges.age,e=ranges.education;
 $('scale-note').textContent=scaled?`Açık: yaş ${a.min}–${a.max}, eğitim ${e.min}–${e.max} aralığından 0–1 ölçeğine taşınır. Mesafe iki özelliği de dikkate alır.`:'Kapalı: ham yıllarla mesafe hesaplanır. Sayısal yayılımı geniş olan yaş, komşulukta daha baskın olabilir.';
 $('distance-explanation').textContent=scaled?`Öklid mesafesi, eğitim verisinden bulunan aralıklara bölünerek hesaplanır. Yaş aralığı ${a.span}, eğitim yılı aralığı ${e.span}. Küçük mesafe = daha yakın komşu.`:'Ham Öklid mesafesi: d = √[(yaş farkı)² + (eğitim yılı farkı)²]. Grafik eksenleri aynı uzunlukta ölçeklenmediği için ekrandaki cetvel mesafesiyle aynı olmayabilir.';
 const nearest=result.neighbors[0],da=Math.abs(q.age-nearest.age),de=Math.abs(q.education-nearest.education);
 $('distance-example').textContent=scaled?`#${nearest.id}: √[(${da}/${a.span})² + (${de}/${e.span})²] = ${fmt(nearest.distance)}`:`#${nearest.id}: √[${da}² + ${de}²] = ${fmt(nearest.distance)}`;
 $('plot-desc').textContent=stage===0?'Eğitim verisi: mavi daireler krediyi ödeyenler, kırmızı çarpılar ödemeyenler. Tüm sayısal değerler eğitim verisi tablosunda.':`Yeni kişi ${q.age} yaşında, eğitim süresi ${q.education} yıl. Gerçek y bilinmiyor. ${stage>=2?`${k} komşudan ${result.yes} kişi ödedi, ${result.no} kişi ödemedi. Tahmin: ${result.prediction?'öder':'ödemez'}.`:''} Ayrıntılar aşağıdaki tablolarda.`;
}
function update({map=false}={}){draw();if(map)renderMap();$('comparison').hidden=true;}
function setStage(value){stage=value;document.querySelectorAll('[data-stage]').forEach(b=>{if(Number(b.dataset.stage)===stage)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
 const s=stages[stage];$('stage-count').textContent=`ADIM 0${stage+1} / 04`;$('stage-title').textContent=s.title;$('stage-description').textContent=s.description;$('plot-label').textContent=s.plot;$('next').textContent=s.next;$('progress-text').textContent=`${stage+1} / 4`;$('previous').disabled=stage===0;
 $('training-panel').hidden=stage!==0;$('query-panel').hidden=stage===0;$('voting-panel').hidden=stage<2;$('map-panel').hidden=stage!==3;$('neighbor-detail').hidden=stage<2;$('unknown-legend').hidden=stage===0;
 plot.classList.toggle('interactive',stage>0);
 $('graph-hint').textContent=stage===0?'Noktaların üzerine gelerek kişinin bilgilerini görebilirsin. Eğitim verisi tablosu aşağıda.':'Yeni kişiyi grafiğe tıklayarak, sürükleyerek veya kaydırıcılarla taşı. Sarı elmasın gerçek sonucu hâlâ bilinmiyor.';
 update({map:true});
}
renderAxes();renderData();setStage(0);
document.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>setStage(Number(b.dataset.stage))));
$('next').addEventListener('click',()=>setStage((stage+1)%4));$('previous').addEventListener('click',()=>setStage(Math.max(0,stage-1)));
for(const id of ['age','education'])$(id).addEventListener('input',()=>update());
$('k').addEventListener('input',()=>update({map:true}));for(const id of ['scaled','surface'])$(id).addEventListener('change',()=>update({map:true}));
document.querySelectorAll('[data-query]').forEach(b=>b.addEventListener('click',()=>{const [a,e]=b.dataset.query.split(',');$('age').value=a;$('education').value=e;update();}));
let dragging=false;
function move(event){if(stage===0)return;const point=new DOMPoint(event.clientX,event.clientY).matrixTransform(plot.getScreenCTM().inverse());
 $('age').value=Math.round(Math.max(18,Math.min(70,18+(point.x-box.x)/box.w*52)));
 $('education').value=Math.round(Math.max(5,Math.min(22,22-(point.y-box.y)/box.h*17)));update();}
plot.addEventListener('pointerdown',e=>{if(stage===0||e.button!==0)return;dragging=true;plot.setPointerCapture(e.pointerId);move(e);});plot.addEventListener('pointermove',e=>{if(dragging)move(e);});for(const type of ['pointerup','pointercancel','lostpointercapture'])plot.addEventListener(type,()=>{dragging=false;});
$('compare').addEventListener('click',()=>{const q=query(),k=settings().k,a=classify(data,q,k,true,ranges),b=classify(data,q,k,false,ranges);const label=r=>`${r.prediction?'öder':'ödemez'} (${r.yes}/${k} ödedi oyu)`;const overlap=a.neighbors.filter(p=>b.neighbors.some(n=>n.id===p.id)).length;$('comparison').textContent=`${q.age} yaş / ${q.education} yıl: Ölçekli → ${label(a)}. Ham → ${label(b)}. İki listenin ${overlap} komşusu ortak. ${a.prediction===b.prediction?'Bu kişide sınıf aynı kaldı; başka bir konum dene.':'Ölçek seçimi bu kişide tahmini değiştirdi.'}`;$('comparison').hidden=false;});
$('regenerate').addEventListener('click',()=>{data=makeData(++seed);ranges=fitRanges(data);renderData();update({map:true});});
$('reset').addEventListener('click',()=>{seed=23;data=makeData(seed);ranges=fitRanges(data);$('age').value=34;$('education').value=13;$('k').value=5;$('scaled').checked=true;$('surface').checked=true;renderData();setStage(0);});
$('download').addEventListener('click',()=>{const content='id,age,education_years,repaid_on_time_12_months\r\n'+data.map(p=>[p.id,p.age,p.education,p.y].join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([content],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='knn-egitim-verisi.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
$('present').addEventListener('click',()=>{const active=document.body.classList.toggle('is-presenting');$('present').textContent=active?'Normal görünüme dön':'Sunum görünümü';$('present').setAttribute('aria-pressed',String(active));});
document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT','BUTTON','SUMMARY','A'].includes(e.target.tagName)||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();setStage(Math.min(3,stage+1));}if(e.key==='ArrowLeft'){e.preventDefault();setStage(Math.max(0,stage-1));}});
