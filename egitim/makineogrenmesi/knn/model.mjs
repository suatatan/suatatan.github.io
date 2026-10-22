// Training-only preprocessing; the query never changes fitted ranges.
export function fitRanges(data) {
  return Object.fromEntries(['age','education'].map(key => {
    const values=data.map(p=>p[key]), min=Math.min(...values), max=Math.max(...values);
    return [key,{min,max,span:max-min || 1}];
  }));
}
export function distance(a,b,ranges,scaled=true) {
  return Math.hypot((a.age-b.age)/(scaled?ranges.age.span:1), (a.education-b.education)/(scaled?ranges.education.span:1));
}
export function classify(data,query,k,scaled=true,ranges=fitRanges(data)) {
  if(!Number.isInteger(k)||k<1||k>data.length) throw new RangeError('k must be between 1 and training size');
  const neighbors=data.map(p=>({...p,distance:distance(p,query,ranges,scaled)}))
    .sort((a,b)=>a.distance-b.distance||a.id-b.id).slice(0,k);
  const yes=neighbors.reduce((n,p)=>n+p.y,0), no=k-yes;
  return {neighbors,yes,no,prediction:yes===no?null:Number(yes>no)};
}
export function makeData(seed=23) {
  let state=seed>>>0;
  const random=()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};
  // Fictional mixed clusters with deliberately overlapping labels.
  const groups=[{age:29,education:11,y:0},{age:44,education:17,y:1},{age:59,education:10,y:1}];
  const data=groups.flatMap(g=>Array.from({length:12},()=>({
    age:Math.max(18,Math.min(70,Math.round(g.age+(random()-.5)*23))),
    education:Math.max(5,Math.min(22,Math.round(g.education+(random()-.5)*10))),
    y:random()<.17?1-g.y:g.y
  })));
  return data.map((p,i)=>({...p,id:i+1}));
}
