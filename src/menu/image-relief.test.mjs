import assert from'node:assert/strict';
import{coverRelief,projectionCompensate,RELIEF_DISTANCE}from'./image-relief.mjs';
for(const[w,h]of[[1440,900],[1920,1080],[390,844],[360,520],[844,390]]){const p=coverRelief(w,h,1672/941);assert.ok(p.planeWidth>=p.viewWidth&&p.planeHeight>=p.viewHeight,'Art must cover the viewport');assert.ok(Math.abs(p.offsetX)<p.planeWidth/2)}
for(const depth of[0,.3,.8,1.25]){const[x,y,z]=projectionCompensate(2,-1,depth);assert.ok(Math.abs(x*RELIEF_DISTANCE/(RELIEF_DISTANCE-z)-2)<1e-10);assert.ok(Math.abs(y*RELIEF_DISTANCE/(RELIEF_DISTANCE-z)+1)<1e-10)}
console.log('Passed: desktop/mobile cover sizing and original-image alignment at every relief depth.');
