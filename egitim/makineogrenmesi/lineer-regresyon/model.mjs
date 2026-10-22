// Price values are in millions of TL; area is in square metres.
export const BASE_DATA = [
  [50,2.2],[60,2.0],[70,2.8],[80,2.4],[90,3.1],[100,3.0],
  [110,3.7],[120,3.4],[130,4.2],[140,4.0],[150,4.7],[160,4.6]
].map(([x,y],i)=>({id:i+1,x,y}));
export const freshData=()=>BASE_DATA.map(p=>({...p}));
export const predict=(model,x)=>model.intercept+model.slope*x;
export function fitOLS(data) {
  if(data.length<2) throw new RangeError('At least two observations are required');
  const meanX=data.reduce((s,p)=>s+p.x,0)/data.length;
  const meanY=data.reduce((s,p)=>s+p.y,0)/data.length;
  let numerator=0,denominator=0;
  for(const p of data){numerator+=(p.x-meanX)*(p.y-meanY);denominator+=(p.x-meanX)**2;}
  if(denominator===0)throw new RangeError('The x values must vary');
  const slope=numerator/denominator;
  return {slope,intercept:meanY-slope*meanX};
}
export function evaluate(data,model) {
  const rows=data.map(p=>{const predicted=predict(model,p.x),residual=p.y-predicted;return {...p,predicted,residual,squared:residual**2};});
  const sse=rows.reduce((sum,p)=>sum+p.squared,0),mse=sse/data.length;
  return {rows,sse,mse,rmse:Math.sqrt(mse)};
}
export function withOutlier(data,enabled,price=9) {
  return enabled?[...data,{id:13,x:190,y:price,outlier:true}]:[...data];
}
export function isExtrapolation(data,x) {
  return x<Math.min(...data.map(p=>p.x))||x>Math.max(...data.map(p=>p.x));
}
