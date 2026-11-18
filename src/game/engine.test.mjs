import assert from 'node:assert/strict';
import{createRun,stepRun,difficulty,stageAt,makePlatform,platformX}from'./engine.mjs';
assert.equal(difficulty(29.999).cycle,0);assert.equal(difficulty(30).cycle,1);assert.ok(difficulty(60).speed>difficulty(30).speed);assert.equal(difficulty(0).progress,0);assert.equal(difficulty(30).progress,0);
assert.equal(stageAt(29.9),0);assert.equal(stageAt(30),1);assert.equal(stageAt(60),2);
for(let i=1;i<300;i++)assert.ok(Math.abs(makePlatform(i).x-makePlatform(i-1).x)<3.4,'Consecutive platforms must be reachable');
let s=createRun();stepRun(s,{jump:true},1/120);assert.ok(s.vy>0);for(let i=0;i<120;i++)stepRun(s,{},1/120);assert.equal(s.y,0);assert.equal(s.dead,false);
s=createRun();for(let i=0;i<4000&&!s.dead;i++)stepRun(s,{},1/120);assert.ok(s.dead,'Idle player must be caught');
s=createRun();s.time=29.99;s.storm=-100;stepRun(s,{},.02);assert.equal(difficulty(s.time).cycle,1);
s=createRun();s.top=60;stepRun(s,{},1/120);assert.ok(s.platforms.at(-1).y>60);assert.ok(s.platforms.length<=35);assert.equal(stageAt(s.top),2);
s=createRun();s.x=4.4;s.y=2;s.coyote=0;stepRun(s,{jump:true,right:true},1/120);assert.ok(s.vy>11);assert.ok(s.vx<0);assert.ok(s.spin>0);assert.equal(s.wallChain,1);
s=createRun();s.x=-4.4;s.y=2;s.coyote=0;stepRun(s,{jump:true,left:true},1/120);assert.ok(s.vx>0);assert.ok(s.vy>11);
// One boost per wall: neither elapsed cooldown nor briefly leaving re-arms it.
for(const side of [-1,1]){
 s=createRun();s.x=side*4.4;s.y=3;s.coyote=0;stepRun(s,{jump:true},1/120);assert.equal(s.spinCount,1);
 for(let attempt=0;attempt<8;attempt++){s.x=side*4.4;s.y=3;s.vx=0;s.vy=0;s.coyote=0;s.wallLock=0;s.wallCooldown=0;stepRun(s,{jump:true},1/120);assert.equal(s.spinCount,1,'Same-wall boost must remain blocked');assert.ok(s.vy<=0)}
 s.x=0;s.y=3;s.vx=0;stepRun(s,{},1/120);s.x=side*4.4;s.vx=0;s.wallCooldown=0;stepRun(s,{jump:true},1/120);assert.equal(s.spinCount,1,'Leaving a wall must not recharge it');
 s.x=-side*4.4;s.y=3;s.vx=0;s.wallCooldown=0;s.wallLock=0;stepRun(s,{jump:true},1/120);assert.equal(s.spinCount,2,'Opposite wall must allow a boost');
 s.x=-side*4.4;s.y=.001;s.vy=-1;s.vx=0;s.buffer=0;s.wallLock=0;stepRun(s,{},1/120);assert.equal(s.y,0);assert.equal(s.lastWallJumpSide,0,'Landing must recharge wall boost');
 s.wallCooldown=0;stepRun(s,{jump:true},1/120);assert.equal(s.spinCount,3,'Boost must work again after landing');
}
s=createRun();for(let i=0;i<14400&&!s.dead;i++){const next=s.platforms.find(p=>p.id===s.land+1),dx=platformX(next,s.time+.5)-s.x;stepRun(s,{left:dx<-.1,right:dx>.1,jump:s.coyote>0},1/120)}assert.ok(!s.dead);assert.ok(s.top>200);assert.ok(stageAt(s.top)>=6);assert.ok(difficulty(s.time).cycle>=3);assert.ok(s.platforms.length<40);
console.log('Passed: clock speed, themes, reachability, jumps, screen-edge death, left/right wall boosts, spin, and two-minute multi-realm climb.');
