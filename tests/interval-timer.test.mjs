import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const Clock = createRequire(import.meta.url)('../apps/interval-timer/clock.js');
test('rings at each boundary once and stops at the requested count', () => {
 const c=new Clock(); c.start(1,2,0);
 assert.equal(c.tick(59999),0); assert.equal(c.tick(60000),1);
 assert.equal(c.tick(60000),0); assert.equal(c.tick(120000),1);
 assert.equal(c.state,'finished'); assert.equal(c.tick(999999),0);
 assert.equal(c.done,2); assert.equal(c.left(),0);
});
test('pause preserves the remaining interval and resume shifts its deadline', () => {
 const c=new Clock(); c.start(1,3,0); c.pause(15000);
 assert.equal(c.left(90000),45000); assert.equal(c.tick(90000),0);
 c.resume(90000); assert.equal(c.tick(134999),0); assert.equal(c.tick(135000),1);
});
test('suspended tabs catch up without exceeding the repetition limit', () => {
 const c=new Clock(); c.start(0.05,4,0);
 assert.equal(c.tick(7000),2); assert.equal(c.left(7000),2000);
 assert.equal(c.tick(999999),2); assert.equal(c.done,4);
 c.reset(); assert.equal(c.state,'idle'); assert.equal(c.done,0);
 assert.throws(()=>c.start(0,2)); assert.throws(()=>c.start(1,2.5));
});
