export const PRAISE_WORDS=['AMAZING','BRILLIANT','AWESOME','FANTASTIC','INCREDIBLE','SPECTACULAR','UNSTOPPABLE','MAGNIFICENT','SUPERB','OUTSTANDING'];
// Shuffle bag: every word is used once before reshuffling, with no repeat at a seam.
export function createPraisePicker(random=Math.random){let bag=[],last='';return()=>{if(!bag.length){bag=[...PRAISE_WORDS];for(let i=bag.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}if(bag.at(-1)===last)[bag[0],bag[bag.length-1]]=[bag[bag.length-1],bag[0]]}last=bag.pop();return last}}
