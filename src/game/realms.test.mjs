import assert from'node:assert/strict';
import{THEMES,stageAt,themeAt,createRun,stepRun,platformX,snapshot}from'./engine.mjs';
import{realmRecipe}from'./procedural-realms.mjs';
assert.equal(THEMES.length,8);assert.equal(stageAt(29.999),0);assert.equal(stageAt(30),1);assert.equal(stageAt(240),8);assert.equal(stageAt(30000),1000);
let run=createRun();run.top=300;assert.equal(snapshot(run).stage,0,'Height alone must not advance the world');run.time=30;assert.equal(snapshot(run).stage,1);run.time=300;assert.equal(snapshot(run).stage,10,'There must be no final world cap');
for(let i=0;i<8;i++)assert.equal(themeAt(i).name,THEMES[i].name);
const signatures=new Set();for(let i=8;i<1008;i++){const r=realmRecipe(i);assert.ok(r.baseIndex>=0&&r.baseIndex<8);assert.ok(r.generated&&r.islands.length>0&&r.particles.length>0);assert.deepEqual(r,realmRecipe(i),'Recipes must be deterministic');signatures.add(JSON.stringify({base:r.baseIndex,light:r.light,islands:r.islands,clouds:r.clouds}));assert.ok(themeAt(i).stars.length===3)}assert.equal(signatures.size,1000,'Long runs must not enter an eight-scene composition loop');
run=createRun();for(let i=0;i<14400&&!run.dead;i++){const p=run.platforms.find(p=>p.id===run.land+1),dx=platformX(p,run.time+.5)-run.x;stepRun(run,{left:dx<-.1,right:dx>.1,jump:run.coyote>0},1/120)}assert.ok(!run.dead&&run.top>200);assert.equal(snapshot(run).stage,Math.floor(run.time/30));
console.log('Passed: worlds advance only on 30-second laps, no final cap, 1000 distinct deterministic recipes, and active gameplay progression.');
