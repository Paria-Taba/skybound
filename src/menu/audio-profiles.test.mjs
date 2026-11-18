import assert from'node:assert/strict';
import{AUDIO_PROFILES,audioProfileFor,normalizeVolume}from'./audio-profiles.mjs';
import{realmRecipe}from'../game/procedural-realms.mjs';
assert.equal(AUDIO_PROFILES.length,8);assert.equal(new Set(AUDIO_PROFILES.map(p=>p.name)).size,8);
for(let stage=0;stage<1000;stage++){const p=audioProfileFor(stage);assert.equal(p.baseIndex,realmRecipe(stage).baseIndex);assert.equal(p.id,stage);assert.ok(p.notes.every(n=>n>=130&&n<=524));assert.ok(p.noteGain<=.015&&p.water<=.34&&p.birds<=.18);assert.ok(p.noteGap>=12);assert.ok(!('wind' in p));}
assert.equal(normalizeVolume(-1),0);assert.equal(normalizeVolume(3),1);assert.equal(normalizeVolume('bad'),.45);
console.log('Passed: eight distinct gentle profiles, endless-world theme mapping, conservative gains/frequencies, no wind layer, and volume clamping.');
