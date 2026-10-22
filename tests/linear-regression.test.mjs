import test from 'node:test';
import assert from 'node:assert/strict';
import {freshData,predict,fitOLS,evaluate,withOutlier,isExtrapolation} from '../egitim/makineogrenmesi/lineer-regresyon/model.mjs';
const close=(a,b,tolerance=1e-10)=>assert.ok(Math.abs(a-b)<tolerance,`${a} != ${b}`);
test('OLS recovers a known line and predicts an unseen x',()=>{
 const data=[{x:1,y:3},{x:2,y:5},{x:3,y:7},{x:4,y:9}],m=fitOLS(data);
 close(m.slope,2);close(m.intercept,1);close(predict(m,5),11);close(evaluate(data,m).sse,0);
});
test('signed residuals do not cancel in SSE; RMSE is in price units',()=>{
 const m={intercept:2,slope:0},r=evaluate([{x:1,y:1},{x:2,y:3}],m);
 assert.deepEqual(r.rows.map(p=>p.residual),[-1,1]);close(r.sse,2);close(r.mse,1);close(r.rmse,1);
});
test('lesson fit minimizes SSE and satisfies OLS residual identities',()=>{
 const data=freshData(),m=fitOLS(data),r=evaluate(data,m);
 for(const da of [-.1,0,.1])for(const db of [-.001,0,.001]) assert.ok(evaluate(data,{intercept:m.intercept+da,slope:m.slope+db}).sse>=r.sse-1e-10);
 close(r.rows.reduce((s,p)=>s+p.residual,0),0);close(r.rows.reduce((s,p)=>s+p.x*p.residual,0),0,1e-9);
 assert.ok(r.sse<evaluate(data,{intercept:1.2,slope:.016}).sse);
});
test('outlier retraining changes coefficients and other homes, query does not alter training data',()=>{
 const clean=freshData(),copy=JSON.stringify(clean),expanded=withOutlier(clean,true,9),a=fitOLS(clean),b=fitOLS(expanded);
 assert.equal(clean.length,12);assert.equal(expanded.length,13);assert.ok(b.slope>a.slope);assert.ok(Math.abs(predict(a,100)-predict(b,100))>.1);
 assert.equal(isExtrapolation(clean,115),false);assert.equal(isExtrapolation(clean,160),false);assert.equal(isExtrapolation(clean,220),true);assert.equal(isExtrapolation(expanded,190),false);
 predict(b,220);assert.equal(JSON.stringify(clean),copy);assert.throws(()=>fitOLS([{x:1,y:1},{x:1,y:3}]),RangeError);
});
