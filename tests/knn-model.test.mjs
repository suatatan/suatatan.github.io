import test from 'node:test';
import assert from 'node:assert/strict';
import {fitRanges,distance,classify,makeData} from '../egitim/makineogrenmesi/knn/model.mjs';
const example=[{id:1,age:20,education:10,y:0},{id:2,age:40,education:12,y:1},{id:3,age:60,education:20,y:1}];
test('training-only min–max distance, known Euclidean result',()=>{
 const ranges=fitRanges(example);
 assert.equal(ranges.age.span,40);assert.equal(ranges.education.span,10);
 assert.equal(distance(example[0],example[2],ranges,true),Math.SQRT2);
 assert.equal(distance(example[0],example[1],ranges,false),Math.hypot(20,2));
 const before=JSON.stringify(ranges);classify(example,{age:70,education:22},1,true,ranges);assert.equal(JSON.stringify(ranges),before);
});
test('classification uses only training labels, exact k, and stable ties',()=>{
 assert.equal(classify(example,{age:20,education:10,y:1},1).prediction,0);
 const result=classify(example,{age:20,education:10},3);
 assert.equal(result.neighbors.length,3);assert.equal(result.yes,2);assert.equal(result.prediction,1);
 const tie=[{id:2,age:30,education:12,y:1},{id:1,age:30,education:12,y:0}];
 assert.equal(classify(tie,{age:30,education:12},1).neighbors[0].id,1);
 assert.equal(classify(tie,{age:30,education:12},2).prediction,null);
 assert.throws(()=>classify(example,example[0],4),RangeError);
});
test('lesson scenario demonstrates k and scaling changing predictions',()=>{
 const data=makeData(),q={age:34,education:13};
 assert.deepEqual(data,makeData());assert.equal(data.length,36);
 assert.equal(classify(data,q,5,true).yes,3);
 assert.equal(classify(data,q,5,false).yes,2);
 assert.notEqual(classify(data,q,1,true).prediction,classify(data,q,15,true).prediction);
 for(const p of data){assert.ok(p.age>=18&&p.age<=70);assert.ok(p.education>=5&&p.education<=22);assert.ok([0,1].includes(p.y));}
});
