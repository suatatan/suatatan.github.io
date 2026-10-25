(function(root){
class IntervalClock {
 constructor(){this.reset()}
 reset(){this.state='idle';this.done=0;this.count=0;this.interval=0;this.deadline=0;this.remaining=0}
 start(minutes,count,now=Date.now()){
  if(!Number.isFinite(minutes)||minutes<1/60||minutes>1440||!Number.isInteger(count)||count<1||count>10000)throw Error('Süre ve tekrar sayısını kontrol et.');
  this.interval=minutes*60000;this.count=count;this.done=0;this.remaining=this.interval;this.deadline=now+this.interval;this.state='running';
 }
 tick(now=Date.now()){
  if(this.state!=='running'||now<this.deadline)return 0;
  const elapsed=Math.min(this.count-this.done,Math.floor((now-this.deadline)/this.interval)+1);
  this.done+=elapsed;this.deadline+=elapsed*this.interval;
  if(this.done===this.count){this.state='finished';this.remaining=0}else this.remaining=Math.max(0,this.deadline-now);
  return elapsed;
 }
 left(now=Date.now()){return this.state==='running'?Math.max(0,this.deadline-now):this.remaining}
 pause(now=Date.now()){if(this.state==='running'){this.remaining=this.left(now);this.state='paused'}}
 resume(now=Date.now()){if(this.state==='paused'){this.deadline=now+this.remaining;this.state='running'}}
}
if(typeof module!=='undefined')module.exports=IntervalClock;else root.IntervalClock=IntervalClock;
})(globalThis);
