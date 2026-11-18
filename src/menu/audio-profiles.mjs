import{realmRecipe}from'../game/procedural-realms.mjs';
// Deliberately no wind bed, noise generator, rumble or continuous oscillator.
export const AUDIO_PROFILES=[
 {name:'Forest birds & gentle stream',water:.22,birds:.18,birdGap:15,notes:[261.63,329.63,392],noteGap:14,noteGain:.014,decay:2.5,waterCutoff:1800},
 {name:'Quiet sandstone resonance',water:0,birds:0,birdGap:25,notes:[164.81,220,246.94],noteGap:12,noteGain:.015,decay:2.2,waterCutoff:1500},
 {name:'Harbor water & distant birds',water:.34,birds:.065,birdGap:22,notes:[220,293.66,329.63],noteGap:16,noteGain:.012,decay:2.6,waterCutoff:2200},
 {name:'Autumn birds & warm notes',water:.055,birds:.12,birdGap:19,notes:[196,246.94,293.66],noteGap:17,noteGain:.014,decay:2.3,waterCutoff:1400},
 {name:'Distant water & low soft notes',water:.14,birds:0,birdGap:25,notes:[130.81,196,261.63],noteGap:18,noteGain:.012,decay:3,waterCutoff:850},
 {name:'Quiet ice droplets',water:.045,birds:0,birdGap:25,notes:[293.66,392,523.25],noteGap:17,noteGain:.01,decay:2.8,waterCutoff:1600},
 {name:'Sparse celestial notes',water:0,birds:0,birdGap:25,notes:[220,329.63,440],noteGap:15,noteGain:.013,decay:3.8,waterCutoff:1600},
 {name:'Sanctuary water & soft harp',water:.12,birds:.045,birdGap:25,notes:[261.63,392,523.25],noteGap:14,noteGain:.014,decay:3.2,waterCutoff:1800},
];
export const DEFAULT_AUDIO_VOLUME=.45;
export function audioProfileFor(stage){const recipe=realmRecipe(stage),base=AUDIO_PROFILES[recipe.baseIndex];return{...base,id:Math.max(0,Math.floor(stage)),baseIndex:recipe.baseIndex,notes:recipe.generated?[...base.notes.slice(stage%3),...base.notes.slice(0,stage%3)]:base.notes}}
export function normalizeVolume(value){const n=Number(value);return Number.isFinite(n)?Math.max(0,Math.min(1,n)):DEFAULT_AUDIO_VOLUME}
