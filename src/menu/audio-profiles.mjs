import{realmRecipe}from'../game/procedural-realms.mjs';
const common={water:0,birds:0,birdGap:22,noteGap:14,noteGain:.012,decay:2.6,waterCutoff:1400,motifGain:.025,motifGap:4,voice:'harp'};
const profile=(key,name,notes,voice,extra={})=>({...common,key,name,notes,voice,...extra});
export const AUDIO_PROFILES=[
 profile('forest','Forest stream and woodland birds',[261.63,329.63,392],'wood',{water:.22,birds:.16,birdGap:15}),
 profile('sandstone','Warm sandstone resonance',[164.81,220,246.94],'stone',{motifGap:6}),
 profile('cloudsea','Quiet harbor and water bells',[220,293.66,329.63],'tide',{water:.30,birds:.055,waterCutoff:2200}),
 profile('autumn','Autumn woodland and warm plucks',[196,246.94,293.66],'wood',{birds:.12,water:.055,motifGap:5}),
 profile('storm','Steady rain and distant rolling thunder',[130.81,196,261.63],'deep',{water:0,rain:.16,thunder:.25,noteGain:.009,motifGap:7}),
 profile('ice','Ice droplets and frosted bells',[293.66,392,523.25],'ice',{water:.035,motifGain:.02}),
 profile('astral','Soft celestial harmonics',[220,329.63,440],'stars',{decay:3.8,motifGap:5}),
 profile('crown','Sanctuary water and golden harp',[261.63,392,523.25],'harp',{water:.12,birds:.04,motifGap:5}),
];
export const BIOME_AUDIO={
 abyssal:profile('abyssal','Underwater bubbles and muffled tones',[164.81,220,329.63],'bubble',{water:.12,waterCutoff:650,motifGap:2.7}),
 clockwork:profile('clockwork','Soft wooden ticks and brass chimes',[196,246.94,369.99],'clock',{motifGap:1.5,motifGain:.018}),
 volcanic:profile('volcanic','Warm lava pulses and obsidian resonance',[130.81,164.81,196],'lava',{motifGap:3.7,motifGain:.024}),
 glacial:profile('glacial','Frozen cathedral droplets',[261.63,349.23,523.25],'ice',{water:.025,waterCutoff:1200,motifGap:3.3}),
 desert:profile('desert','Sandstone temple and soft plucked strings',[146.83,220,293.66],'sand',{motifGap:5.5}),
 heartwood:profile('heartwood','Living wood and distant forest birds',[174.61,261.63,349.23],'wood',{water:.065,birds:.07,birdGap:24,motifGap:3.8}),
 lunar:profile('lunar','Lunar glass and distant harmonics',[196,293.66,440],'moon',{decay:3.8,motifGap:6.5}),
 crystal:profile('crystal','Crystalline tines and cavern droplets',[246.94,369.99,493.88],'crystal',{water:.025,motifGap:3.1}),
 bamboo:profile('bamboo','Bamboo knocks and quiet mountain birds',[220,293.66,392],'bamboo',{water:.08,birds:.06,birdGap:23,motifGap:3}),
 sunken:profile('sunken','Tidal water and submerged temple bells',[174.61,261.63,329.63],'tide',{water:.28,waterCutoff:1800,motifGap:4.8}),
 fungal:profile('fungal','Gentle cave droplets and glowing spores',[164.81,246.94,329.63],'spore',{water:.055,waterCutoff:1100,motifGap:2.9}),
 skyharbor:profile('skyharbor','Soft timber creaks and harbor bells',[146.83,196,293.66],'rigging',{birds:.025,birdGap:28,motifGap:5.8}),
};
export const DEFAULT_AUDIO_VOLUME=.45;
export function audioProfileFor(stage){const recipe=realmRecipe(stage),base=recipe.environment?BIOME_AUDIO[recipe.environment.biome.id]:AUDIO_PROFILES[recipe.baseIndex];return{...base,id:Math.max(0,Math.floor(stage)),baseIndex:recipe.baseIndex}}
export function normalizeVolume(value){const n=Number(value);return Number.isFinite(n)?Math.max(0,Math.min(1,n)):DEFAULT_AUDIO_VOLUME}
