import {freshData,predict,fitOLS,evaluate,withOutlier,isExtrapolation} from './model.mjs';
const $=id=>document.getElementById(id),ns='http://www.w3.org/2000/svg';
const plot=$('plot'),box={x:78,y:32,w:650,h:374};
const fmt=(n,d=2)=>n.toLocaleString('tr-TR',{minimumFractionDigits:d,maximumFractionDigits:d});
const tl=n=>Math.round(n*1e6).toLocaleString('tr-TR')+' TL';
const signed=(n,d=2)=>n.toLocaleString('tr-TR',{minimumFractionDigits:d,maximumFractionDigits:d,signDisplay:'always'});
const state={base:freshData(),stage:0,selected:6,manual:{intercept:1.2,slope:.016},area:115,outlier:false,outlierPrice:9};
let yMin=0,yMax=6,dragging=false;
const scenes=[
 {title:'Büyük ev, daha yüksek fiyat mı?',description:'Her nokta geçmişte satılmış kurmaca bir ev. Metrekaresini ve satış fiyatını biliyoruz. Bunlar eğitim verimiz.',plot:'Eğitim verisinin dağılımı',next:'Bir doğru çizelim →'},
 {title:'En iyi doğruyu sen bulabilir misin?',description:'Eğimi ve sabit terimi değiştir. Kırmızı dikey çizgiler, gerçek fiyat ile tahmin arasındaki fark. Hata kareleri toplamını küçültmeyi dene.',plot:'Senin doğrun + noktaların hataları',next:'Model en iyisini bulsun →'},
 {title:'Model, hata karelerini en aza indirir.',description:'En küçük kareler yöntemi a ve b’yi hesapladı. Bir fiyatı değiştir veya uç değer ekle: Model yeniden eğitilince doğru nereye gidiyor?',plot:'Öğrenilen doğru · en küçük kareler',next:'Yeni bir ev gelsin →'},
 {title:'Yeni evin metrekaresini yerine koy.',description:'Yeni evin gerçek fiyatı bilinmiyor. Sarı elmas, modelin tahmini. Eğitimde gördüğümüz aralıktan çıkınca neye daha fazla dikkat etmeliyiz?',plot:'Öğrenilen doğru → yeni bir sayısal tahmin',next:'Baştan keşfet ↺'}
];
function el(tag,attrs={},text){const n=document.createElementNS(ns,tag);for(const [key,value] of Object.entries(attrs))n.setAttribute(key,value);if(text!==undefined)n.textContent=text;return n;}
const sx=x=>box.x+x/240*box.w;
const sy=y=>box.y+box.h-(y-yMin)/(yMax-yMin)*box.h;
const data=()=>withOutlier(state.base,state.outlier,state.outlierPrice);
const model=()=>state.stage===0?null:state.stage===1?state.manual:fitOLS(data());
function updateSelect(){const rows=data();if(!rows.some(p=>p.id===state.selected))state.selected=6;
 $('house-select').replaceChildren(...rows.map(p=>{const option=document.createElement('option');option.value=p.id;option.textContent=`Ev #${p.id} · ${p.x} m²${p.outlier?' · uç değer':''}`;return option;}));$('house-select').value=state.selected;
}
function axis(){const layer=$('grid');layer.replaceChildren();
 for(let x=0;x<=240;x+=40)layer.append(el('line',{x1:sx(x),x2:sx(x),y1:box.y,y2:406,class:'gridline'}),el('text',{x:sx(x),y:430,'text-anchor':'middle'},x));
 for(let y=yMin;y<=yMax;y+=2)layer.append(el('line',{x1:box.x,x2:728,y1:sy(y),y2:sy(y),class:'gridline'}),el('text',{x:64,y:sy(y)+4,'text-anchor':'end'},y));
 layer.append(el('path',{d:`M78 32V406H728`,class:'axis',fill:'none'}),el('text',{x:403,y:466,'text-anchor':'middle',class:'axis-title'},'Evin büyüklüğü (x) · m²'),el('text',{transform:'translate(20 219) rotate(-90)','text-anchor':'middle',class:'axis-title'},'Satış fiyatı (y) · milyon TL'));
}
function line(m,className){return el('line',{x1:sx(0),y1:sy(predict(m,0)),x2:sx(240),y2:sy(predict(m,240)),class:className});}
function bars(report){const svg=$('error-bars');svg.replaceChildren(el('title',{id:'bars-title'},'Evlerin hata kareleri'),el('desc',{id:'bars-desc'},'Her çubuğun yüksekliği ilgili evin hata karesidir. Ayrıntılı sayılar eğitim verisi tablosundadır.'));
 const max=Math.max(.1,...report.rows.map(p=>p.squared)),step=540/report.rows.length;
 svg.append(el('line',{x1:40,x2:580,y1:180,y2:180,stroke:'var(--line)'}));
 for(const [i,p] of report.rows.entries()){const height=p.squared/max*140;const g=el('g');
 g.append(el('rect',{x:43+i*step,y:180-height,width:Math.max(10,step-10),height:Math.max(height,.4),rx:3,class:p.outlier?'bar-outlier':p.id===state.selected?'bar-selected':'bar'}),el('text',{x:43+i*step+(step-10)/2,y:201,'text-anchor':'middle'},'#'+p.id),el('title',{},`Ev #${p.id}: e² = ${fmt(p.squared,4)}`));svg.append(g);}
 svg.append(el('text',{x:40,y:21},`En yüksek e²: ${fmt(max,3)} (milyon TL)²`));
 $('bars-note').textContent=`Çubukların toplamı = SSE = ${fmt(report.sse,4)}. Dikey ölçek, en büyük hata karesine göre yenilenir.`;
}
function render(){const rows=data(),m=model(),best=fitOLS(rows),report=m?evaluate(rows,m):null,selected=rows.find(p=>p.id===state.selected)||rows[0];
 const forecast=m?predict(m,state.area):0;
 yMin=state.stage===3?Math.min(0,Math.floor(forecast/2)*2):0;
 yMax=Math.max(6,Math.ceil(Math.max(...rows.map(p=>p.y),state.stage===3?forecast+.5:0)/2)*2);
 axis();for(const id of ['extrapolation','residuals','lines','points','query-marker'])$(id).replaceChildren();
 const showComparison=(state.stage===1&&$('compare-best').checked)||(state.stage===2&&state.outlier&&$('baseline').checked);
 $('comparison-legend').hidden=!showComparison;
 $('comparison-legend-label').textContent=state.stage===1?'En iyi doğru · kesikli':'Uç değersiz doğru · kesikli';
 if(state.stage===3){const minX=Math.min(...rows.map(p=>p.x)),maxX=Math.max(...rows.map(p=>p.x));$('extrapolation').append(el('rect',{x:sx(0),y:32,width:sx(minX)-sx(0),height:374,class:'zone'}),el('rect',{x:sx(maxX),y:32,width:sx(240)-sx(maxX),height:374,class:'zone'}));}
 if(m){
  if(showComparison)$('lines').append(line(state.stage===1?best:fitOLS(state.base),'comparison-line'));
  $('lines').append(line(m,'model-line'));
  if(state.stage<=2&&$('show-residuals').checked)for(const p of report.rows)$('residuals').append(el('line',{x1:sx(p.x),x2:sx(p.x),y1:sy(p.y),y2:sy(p.predicted),class:'residual-line'}));
 }
 for(const p of rows){const g=el('g',{'data-house':p.id});
 g.append(el('circle',{cx:sx(p.x),cy:sy(p.y),r:14,fill:'transparent'}),el('circle',{cx:sx(p.x),cy:sy(p.y),r:7,class:p.outlier?'outlier-point':'training-point'}));
 if(p.id===state.selected&&state.stage!==3)g.append(el('circle',{cx:sx(p.x),cy:sy(p.y),r:11,class:'selected-point'}));
 g.append(el('text',{x:sx(p.x)+9,y:sy(p.y)-10,class:'house-number'},'#'+p.id),el('title',{},`Ev #${p.id}: ${p.x} m², ${fmt(p.y)} milyon TL`));
 $('points').append(g);
 }
 if(state.stage===3){const x=sx(state.area),y=sy(forecast);$('query-marker').append(el('line',{x1:x,x2:x,y1:406,y2:y,class:'guide-line'}),el('line',{x1:78,x2:x,y1:y,y2:y,class:'guide-line'}),el('path',{d:`M${x} ${y-11}l10 11-10 11-10-11Z`,class:'query'}),el('text',{x:x>610?x-16:x+16,y:y<60?y+26:y-16,'text-anchor':x>610?'end':'start',class:'query-label'},`ŷ = ${fmt(forecast)} milyon`));}
 $('sample-count').textContent=`${rows.length} ev${state.outlier?' · uç değer dahil':''}`;
 $('slope-out').value=fmt(state.manual.slope,4);$('intercept-out').value=fmt(state.manual.intercept);
 $('house-select').value=state.selected;$('house-price').value=selected.y;$('house-price-out').value=fmt(selected.y,1);
 $('outlier-out').value=fmt(state.outlierPrice,1);$('new-area-out').value=state.area+' m²';
 $('point-info').textContent=`Ev #${selected.id} · ${selected.x} m² · Gerçek fiyat ${fmt(selected.y)} milyon TL${m?' · Tahmin '+fmt(predict(m,selected.x))+' milyon TL':''}`;
 if(m){const bestSSE=evaluate(rows,best).sse;
  $('sse-value').textContent=fmt(report.sse,4);$('rmse-value').textContent=fmt(report.rmse,3);
  $('fit-comparison').textContent=state.stage===1?`Bu veriyle mümkün olan en küçük SSE: ${fmt(bestSSE,4)}. Senin doğrunun SSE’si: ${fmt(report.sse,4)}.`:`Eğitimde ${rows.length} ev kullanıldı. Bu, yeni evlerde ölçülmüş bir hata değildir.`;
  $('live-equation').textContent=`ŷ = ${fmt(m.intercept,4)} ${m.slope>=0?'+':'−'} ${fmt(Math.abs(m.slope),5)} × x`;
  $('slope-meaning').textContent=`Bu doğruya göre +10 m², tahminde ${tl(Math.abs(m.slope*10))} ${m.slope>=0?'artış':'azalış'} demek.`;
  $('learned-coefficients').textContent=`a = ${fmt(best.intercept,4)} milyon TL\nb = ${fmt(best.slope,5)} milyon TL / m²`;
  const chosen=report.rows.find(p=>p.id===state.selected)||report.rows[0];
  $('selected-error').textContent=`Ev #${chosen.id}: e = ${fmt(chosen.y)} − (${fmt(chosen.predicted,3)}) = ${signed(chosen.residual,3)}\ne² = ${fmt(chosen.squared,4)} (milyon TL)²`;
  bars(report);
 }
 if(state.outlier){const clean=fitOLS(state.base);$('outlier-effect').textContent=`Uç değersiz modelin 150 m² tahmini ${fmt(predict(clean,150))} milyon TL. Uç değer dahil yeniden eğitilince ${fmt(predict(best,150))} milyon TL. Bir yeni eğitim örneği, başka evlerin tahminini de değiştirdi.`;}else $('outlier-effect').textContent='Uç değeri açıp doğrunun nasıl değiştiğine bak. Yeni örnek eğitim kümesine katıldığında model yeniden eğitilir.';
 $('outlier-controls').hidden=!state.outlier;
 if(state.stage===3){const outside=isExtrapolation(rows,state.area),min=Math.min(...rows.map(p=>p.x)),max=Math.max(...rows.map(p=>p.x));
  $('prediction').innerHTML=`${state.area} m² İÇİN MODEL TAHMİNİ<strong>${fmt(forecast)} milyon TL</strong><small>Yaklaşık ${tl(forecast)}</small>`;
  $('prediction-formula').textContent=`ŷ = (${fmt(m.intercept,4)}) + (${fmt(m.slope,5)} × ${state.area}) = ${fmt(forecast)} milyon TL\n(Hesap, yuvarlanmamış katsayılarla yapılır.)`;
  $('range-warning').classList.toggle('warning',outside);
  $('range-warning').textContent=`${outside?'Ekstrapolasyon: eğitim aralığının dışındasın.':'İnterpolasyon: eğitim aralığının içindesin.'} Model ${min}–${max} m² evleri gördü${state.outlier?' (uç değer dahil)':''}. ${outside?'Sarı arka plan, eğitimde görülmeyen metrekareleri gösterir. Aynı eğilim burada sürmeyebilir.':'Bu aralıkta olmak da doğru tahmini garanti etmez.'}${forecast<0?' Negatif fiyat, modelin bu kullanımda gerçekçi olmadığını gösteriyor.':''}`;
 }
 $('data-summary').textContent=`${rows.length} kurmaca ev · x, y, ŷ ve e²`;
 $('table-caption').textContent=state.stage===0?'Eğitim verisi · fiyatlar milyon TL, tahminler 2. adımda açılır':'Eğitim verisi · y, ŷ ve e: milyon TL; e²: (milyon TL)²';
 const tableRows=report?report.rows:rows;
 $('training-data').innerHTML=tableRows.map(p=>`<tr${p.id===state.selected?' class="training-highlight"':''}><td>#${p.id}${p.outlier?' · uç değer':''}</td><td>${p.x}</td><td>${fmt(p.y)}</td><td>${m?fmt(p.predicted,3):'—'}</td><td>${m?signed(p.residual,3):'—'}</td><td>${m?fmt(p.squared,4):'—'}</td></tr>`).join('');
 $('plot-desc').textContent=state.stage===0?`${rows.length} evin metrekaresi ve bilinen satış fiyatı. Bir evin fiyatını kaydırıcıyla değiştirebilirsin. Değerler veri tablosunda.`:`${rows.length} eğitim evi. Model ŷ = ${fmt(m.intercept,4)} + ${fmt(m.slope,5)} × x. Eğitim SSE’si ${fmt(report.sse,4)}.${state.stage===3?` Yeni ev ${state.area} m². Tahmin ${fmt(forecast)} milyon TL; gerçek fiyat bilinmiyor.`:''} Ayrıntılar aşağıdaki tabloda.`;
}
function setStage(stage){state.stage=stage;const s=scenes[stage];document.querySelectorAll('[data-stage]').forEach(b=>{if(Number(b.dataset.stage)===stage)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
 $('stage-count').textContent=`ADIM 0${stage+1} / 04`;$('stage-title').textContent=s.title;$('stage-description').textContent=s.description;$('plot-label').textContent=s.plot;$('progress-text').textContent=`${stage+1} / 4`;$('next').textContent=s.next;$('previous').disabled=stage===0;
 for(const [id,visible] of Object.entries({'training-panel':stage===0,'manual-panel':stage===1,'auto-panel':stage===2,'prediction-panel':stage===3,'equation-panel':stage===1||stage===2,'edit-panel':stage===0||stage===2,'metrics':stage>0,'fit-comparison':stage>0,'line-legend':stage>0,'residual-legend':stage===1||stage===2,'query-legend':stage===3,'residual-control':stage===1||stage===2,'error-detail':stage===1||stage===2}))$(id).hidden=!visible;
 $('graph-hint').textContent=stage===0||stage===2?'Bir noktayı seçip yukarı veya aşağı sürükle; evin fiyatını değiştir. Kaydırıcıyla da yapabilirsin.':stage===1?'Eğimi ve sabit terimi kaydırıcılarla değiştir. Bir noktaya tıklayarak o evin hata hesabını incele.':'Grafiğe tıklayarak veya kaydırıcıyla yeni evin metrekaresini seç. Yeni gözlem eğitim kümesine katılmaz.';
 plot.classList.toggle('editing',stage===0||stage===2||stage===3);updateSelect();render();
}
function setPrice(value){if(state.selected===13){state.outlierPrice=value;$('outlier-price').value=value;}else state.base=state.base.map(p=>p.id===state.selected?{...p,y:value}:p);render();}
// A distinct legend for the optional reference line.
const comparison=document.createElement('span');comparison.id='comparison-legend';comparison.hidden=true;comparison.innerHTML='<i class="comparison-key"></i><span id="comparison-legend-label"></span>';document.querySelector('.legend').append(comparison);
document.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>setStage(Number(b.dataset.stage))));
$('next').addEventListener('click',()=>setStage((state.stage+1)%4));$('previous').addEventListener('click',()=>setStage(Math.max(0,state.stage-1)));
for(const id of ['slope','intercept'])$(id).addEventListener('input',()=>{state.manual[id]=Number($(id).value);render();});
for(const id of ['show-residuals','compare-best','baseline'])$(id).addEventListener('change',render);
$('outlier').addEventListener('change',()=>{state.outlier=$('outlier').checked;updateSelect();render();});
$('outlier-price').addEventListener('input',()=>{state.outlierPrice=Number($('outlier-price').value);render();});
$('house-select').addEventListener('change',()=>{state.selected=Number($('house-select').value);render();});
$('house-price').addEventListener('input',()=>setPrice(Number($('house-price').value)));
$('new-area').addEventListener('input',()=>{state.area=Number($('new-area').value);render();});
document.querySelectorAll('[data-area]').forEach(b=>b.addEventListener('click',()=>{state.area=Number(b.dataset.area);$('new-area').value=state.area;render();}));
function move(event){const p=new DOMPoint(event.clientX,event.clientY).matrixTransform(plot.getScreenCTM().inverse());if(state.stage===3){state.area=Math.round(Math.max(20,Math.min(220,(p.x-box.x)/box.w*240)));$('new-area').value=state.area;render();}else if(state.stage===0||state.stage===2){const price=yMax-(p.y-box.y)/box.h*(yMax-yMin);setPrice(Math.round(Math.max(.5,Math.min(10,price))*10)/10);}}
plot.addEventListener('pointerdown',event=>{if(event.button!==0)return;const house=event.target.closest('[data-house]');if(state.stage!==3&&!house)return;
 if(house){state.selected=Number(house.dataset.house);render();}if(state.stage===1)return;
 dragging=true;plot.setPointerCapture(event.pointerId);if(state.stage===3)move(event);
});
plot.addEventListener('pointermove',event=>{if(dragging)move(event);});for(const type of ['pointerup','pointercancel','lostpointercapture'])plot.addEventListener(type,()=>{dragging=false;});
$('reset').addEventListener('click',()=>{state.base=freshData();state.manual={intercept:1.2,slope:.016};state.selected=6;state.area=115;state.outlier=false;state.outlierPrice=9;for(const [id,value] of Object.entries({slope:.016,intercept:1.2,'new-area':115,'outlier-price':9}))$(id).value=value;$('outlier').checked=false;$('compare-best').checked=false;$('baseline').checked=true;$('show-residuals').checked=true;setStage(0);});
$('download').addEventListener('click',()=>{const m=model(),rows=m?evaluate(data(),m).rows:data();const csv='id,area_m2,price_million_tl,predicted_million_tl,residual_million_tl,squared_residual_million_tl_squared\r\n'+rows.map(p=>[p.id,p.x,p.y,m?p.predicted:'',m?p.residual:'',m?p.squared:''].join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='lineer-regresyon-veri-ve-hatalar.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
$('present').addEventListener('click',()=>{const active=document.body.classList.toggle('is-presenting');$('present').textContent=active?'Normal görünüme dön':'Sunum görünümü';$('present').setAttribute('aria-pressed',String(active));});
document.addEventListener('keydown',event=>{if(['INPUT','SELECT','BUTTON','A','TEXTAREA','SUMMARY'].includes(event.target.tagName)||event.ctrlKey||event.metaKey||event.altKey)return;if(event.key==='ArrowRight'){event.preventDefault();setStage(Math.min(3,state.stage+1));}if(event.key==='ArrowLeft'){event.preventDefault();setStage(Math.max(0,state.stage-1));}});
setStage(0);
