import{buildStormAmbience}from'./storm-ambience.mjs';
// Render a continuous soft texture plus a distinct environmental motif per family.
// Every tail wraps into the start of the loop; there is no silence at a seam.
export function buildThemeBed(profile,sampleRate=22050){const duration=24,length=Math.round(duration*sampleRate),left=new Float32Array(length),right=new Float32Array(length),notes=profile.notes;
 function add(start,tail,gain,pan,sound){for(let n=0;n<tail*sampleRate;n++){const t=n/sampleRate,u=t/tail,envelope=(1-Math.exp(-t/.025))*Math.exp(-t/(tail*.27))*Math.min(1,(1-u)*8),v=sound(t,u)*envelope*gain,i=(Math.round(start*sampleRate)+n)%length;left[i]+=v*(1-pan);right[i]+=v*(1+pan)}}
 const sequence=[0,1,2,1,0,2,1,2],tone=profile.voice;
 for(let i=0;i<8;i++){const f=notes[sequence[i]],gain=.15*(profile.noteGain/.012),decay=profile.decay??2.6;
 add(i*3,Math.min(10,decay*2.8),gain,i%2?.12:-.12,t=>Math.sin(2*Math.PI*f*t)+.07*Math.sin(2*Math.PI*f*2*t));}
 for(let i=0,start=.7;start<duration;i++,start+=profile.motifGap??4){const f=notes[(i*2+1)%3],pan=Math.sin(i*2.1)*.3;
 const tails={clock:.17,bamboo:.35,bubble:.65,ice:2.4,crystal:2.7,moon:3.4,stars:3.2,lava:2.5,deep:3,rigging:1.8,spore:1.4,tide:2.8,wood:.65,sand:1.7,stone:2.5,harp:2};
 add(start,tails[tone]??2,profile.motifGain??.025,pan,(t,u)=>{
 const sin=x=>Math.sin(2*Math.PI*x);
 switch(tone){case'bubble':return sin(f*(t+.4*t*t))*.8;case'clock':return sin(f*1.5*t)*Math.exp(-t*18)+.3*sin(f*2*t)*Math.exp(-t*30);case'bamboo':return sin(f*t)+.25*sin(f*2.7*t)*Math.exp(-t*12);case'wood':return sin(f*t)+.18*sin(f*1.8*t)*Math.exp(-t*8);case'lava':return sin(f*.7*t)*( .65+.35*Math.sin(Math.PI*u));case'ice':return sin(f*t)+.16*sin(f*2.4*t)*Math.exp(-t*2);case'crystal':return sin(f*t)+.2*sin(f*1.5*t)+.08*sin(f*2.5*t);case'moon':return sin(f*t)*.7+.25*sin(f*1.25*t);case'stars':return sin(f*t)+.12*sin(f*2*t);case'rigging':return sin(f*(t+.018*t*t))+.2*sin(f*.5*t);case'spore':return sin(f*(t-.09*t*t));case'tide':return sin(f*t)*(.75+.25*Math.sin(Math.PI*u));case'sand':return sin(f*t)+.15*sin(f*2*t)*Math.exp(-t*4);case'deep':return sin(f*t)*.7;default:return sin(f*t)+.1*sin(f*2*t)} });}
 if(profile.rain||profile.thunder){const storm=buildStormAmbience(profile,sampleRate,duration);for(let i=0;i<length;i++){left[i]+=storm.left[i];right[i]+=storm.right[i]}}
 let peak=0;for(let i=0;i<length;i++)peak=Math.max(peak,Math.abs(left[i]),Math.abs(right[i]));if(peak>.26){const scale=.26/peak;for(let i=0;i<length;i++){left[i]*=scale;right[i]*=scale}}
 return{left,right,sampleRate,duration};}
