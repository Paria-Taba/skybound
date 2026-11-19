import assert from'node:assert/strict';
import{BIOMES,biomeForStage,environmentRecipe}from'./biomes.mjs';
import{realmRecipe}from'./procedural-realms.mjs';
import{themeAt}from'./engine.mjs';
import{audioProfileFor}from'../menu/audio-profiles.mjs';
assert.equal(new Set(BIOMES.map(b=>b.id)).size,12);
for(let block=0;block<100;block++){const start=8+block*12;assert.equal(new Set(Array.from({length:12},(_,i)=>biomeForStage(start+i).id)).size,12,'Each journey must introduce all twelve environments');}
const layouts=new Set();let previous='';for(let stage=8;stage<2008;stage++){const e=environmentRecipe(stage);assert.notEqual(e.biome.id,previous,'Neighboring worlds must have different environment families');previous=e.biome.id;assert.deepEqual(e,environmentRecipe(stage));assert.equal(themeAt(stage).stone,e.biome.stone);assert.equal(realmRecipe(stage).baseIndex,e.biome.audio);layouts.add(JSON.stringify(e.landmarks));}
assert.equal(layouts.size,2000);
for(const b of BIOMES.filter(b=>['volcanic','lunar','clockwork','desert'].includes(b.id))){const stage=Array.from({length:12},(_,i)=>8+i).find(s=>biomeForStage(s).id===b.id);assert.equal(audioProfileFor(stage).birds,0);assert.equal(audioProfileFor(stage).water,0);}
assert.ok(environmentRecipe(1000000).landmarks.length>0,'Long runs must keep generating worlds');
for(let i=0;i<8;i++)assert.equal(realmRecipe(i).environment,null,'Original paintings must be preserved');
console.log('Passed: twelve structural environments, no consecutive repeats, 2000 distinct layouts, uncapped progression, palettes and appropriate ambience.');
