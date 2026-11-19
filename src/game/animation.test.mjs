import assert from'node:assert/strict';
import{noriFrame,atlasUV}from'./animation.mjs';
const base={time:0,travel:0,vx:0,vy:0,coyote:.12,spin:0};
assert.equal(noriFrame(base).action,'idle');assert.notEqual(noriFrame({...base,time:.25}).frame,noriFrame(base).frame);
assert.equal(noriFrame({...base,vx:2}).action,'walk');assert.equal(noriFrame({...base,vx:5.8}).action,'run');assert.notEqual(noriFrame({...base,vx:5.8,travel:1}).frame,noriFrame({...base,vx:5.8,travel:0}).frame);
assert.equal(noriFrame({...base,coyote:0,vy:8}).action,'jump');assert.equal(noriFrame({...base,coyote:0,vy:-8}).action,'fall');
assert.equal(noriFrame({...base,spin:.55}).frame,0);assert.equal(noriFrame({...base,spin:.001}).frame,5);assert.equal(noriFrame({...base,spin:.3,vx:9}).action,'spin');
assert.deepEqual(noriFrame(base),noriFrame({...base}),'Frozen game state must freeze animation');
for(let row=0;row<4;row++)for(let frame=0;frame<6;frame++){const uv=atlasUV(row,frame);assert.ok(uv.offset.every(n=>n>0&&n<1));assert.ok(uv.offset.every((n,i)=>n+uv.repeat[i]<1))}
console.log('Passed: idle/walk/run/jump/fall/spin selection, advancing frames, pause stability, and all 24 atlas UV bounds.');

// Airborne velocity passes through zero at the apex: never flash a grounded pose.
for(const vy of [.21,.1,.001,0,-.001,-.1,-.21]){const p=noriFrame({...base,coyote:-.1,vy});assert.equal(p.row,3);assert.notEqual(p.action,"idle");assert.notEqual(p.action,"run")}
