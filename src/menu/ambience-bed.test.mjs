import assert from'node:assert/strict';
import{buildThemeBed}from'./ambience-bed.mjs';
import{AUDIO_PROFILES}from'./audio-profiles.mjs';
for(const profile of AUDIO_PROFILES){const bed=buildThemeBed(profile);assert.equal(bed.left.length,24*22050);for(const channel of [bed.left,bed.right]){let peak=0;for(let start=0;start<channel.length;start+=11025){let energy=0;const end=Math.min(start+11025,channel.length);for(let i=start;i<end;i++){energy+=channel[i]**2;peak=Math.max(peak,Math.abs(channel[i]))}assert.ok(Math.sqrt(energy/(end-start))>.002,`${profile.name}: no silent half-second gaps`)}assert.ok(peak<=.281);assert.ok(Math.abs(channel[0]-channel.at(-1))<.02,'Loop boundary must remain smooth')}}
console.log('Passed: all eight themes have continuous 24-second beds, bounded peaks, and smooth wraparound without silent gaps.');
