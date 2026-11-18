// Deterministic art recipes: eight authored base worlds, then new combinations.
// No upper realm index or fixed return-to-world-one cycle.
function rng(seed){let a=(seed+1)>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const adjectives=['WINDCARVED','DAWNVEIL','SILVERCREST','SUNWARD','MISTWOVEN','STARLIT','CLOUDBORNE','ANCIENT','SKYGLASS','GOLDEN'];
const places=['ARCHIPELAGO','SANCTUARY','HIGHLANDS','CITADEL','GARDENS','HORIZON','PASSAGE','REACHES','WATCHTOWERS','CASCADES'];
export function realmRecipe(index){const stage=Math.max(0,Math.floor(index)),random=rng(stage*701+19),generated=stage>=8,baseIndex=generated?Math.floor(random()*8):stage;
 return{stage,generated,baseIndex,signature:`realm-${stage}`,name:generated?`${adjectives[Math.floor(random()*adjectives.length)]} ${places[Math.floor(random()*places.length)]}`:null,
  brightness:generated?.85+random()*.25:1,saturation:generated?.86+random()*.25:1,flip:generated&&random()>.5,position:generated?35+random()*35:60,
  weather:generated?['mist','rain','snow','stardust','wind'][Math.floor(random()*5)]:'clear',light:generated?Math.floor(random()*360):35,
  islands:generated?Array.from({length:7},(_,i)=>({x:i%2?820+random()*170:random()*170,y:70+random()*500,scale:.45+random()*.75,tower:random()>.45})):[],
  clouds:generated?Array.from({length:5},()=>({x:random()*1000,y:random()*650,width:100+random()*160,opacity:.04+random()*.08})):[],
  particles:generated?Array.from({length:24},()=>({x:random()*100,y:random()*100,delay:random()*-8,duration:3+random()*5})):[]};
}
