import {environmentRecipe} from './biomes.mjs';
// Eight original paintings, then twelve shuffled environment families with seeded layouts.
// No upper realm index or fixed return-to-world-one cycle.
function rng(seed){let a=(seed+1)>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
function createRecipe(index){const stage=Math.max(0,Math.floor(index)),random=rng(stage*701+19),generated=stage>=8,baseIndex=generated?Math.floor(random()*8):stage;
 const environment=generated?environmentRecipe(stage):null;
 return{environment,stage,generated,baseIndex:environment?environment.biome.audio:baseIndex,signature:`realm-${stage}`,name:generated?`${environment.biome.name} / ${environment.variant}`:null,
  brightness:generated?.85+random()*.25:1,saturation:generated?.86+random()*.25:1,flip:generated&&random()>.5,position:generated?35+random()*35:60,
  weather:generated?environment.biome.weather:'clear',light:generated?Math.floor(random()*360):35,
  islands:generated?Array.from({length:7},(_,i)=>({x:i%2?820+random()*170:random()*170,y:70+random()*500,scale:.45+random()*.75,tower:random()>.45})):[],
  clouds:generated?Array.from({length:5},()=>({x:random()*1000,y:random()*650,width:100+random()*160,opacity:.04+random()*.08})):[],
  particles:generated?Array.from({length:24},()=>({x:random()*100,y:random()*100,delay:random()*-8,duration:3+random()*5})):[]};
}

const recipes=new Map();
export function realmRecipe(index){const stage=Math.max(0,Math.floor(index));if(!recipes.has(stage)){recipes.set(stage,createRecipe(stage));if(recipes.size>32)recipes.delete(recipes.keys().next().value)}return recipes.get(stage)}
