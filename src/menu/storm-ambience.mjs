// Deterministic stereo rainfall and distant rolling thunder. No wind layer.
export const THUNDER_EVENTS=[{at:4.8,tail:6.2,gain:1},{at:16.1,tail:6.8,gain:.8}];
export function buildStormAmbience({rain=0,thunder=0},sampleRate=22050,duration=24){const length=Math.round(duration*sampleRate),left=new Float32Array(length),right=new Float32Array(length);let seed=91731;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2147483648-1};
 for(const output of[left,right]){const noise=Float32Array.from({length},random);let smooth=0,low=0,taps=0;const a=1-Math.exp(-2*Math.PI*2300/sampleRate),h=1-Math.exp(-2*Math.PI*380/sampleRate),tapDecay=Math.exp(-1/(.009*sampleRate));
 // Warm the filters from the end of the same cyclic input before rendering.
 for(let i=Math.max(0,length-4096);i<length;i++){smooth+=a*(noise[i]-smooth);low+=h*(smooth-low)}
 for(let i=0;i<length;i++){smooth+=a*(noise[i]-smooth);low+=h*(smooth-low);taps*=tapDecay;if(random()>.994)taps+=random()*.13;output[i]=rain*((smooth-low)*.65+taps*.3)}
 for(const event of THUNDER_EVENTS){let rumble=0,body=0;const filter=1-Math.exp(-2*Math.PI*160/sampleRate),sub=1-Math.exp(-2*Math.PI*42/sampleRate);for(let i=0;i<event.tail*sampleRate;i++){const t=i/sampleRate,u=t/event.tail;rumble+=filter*(random()-rumble);body+=sub*(rumble-body);const attack=Math.min(1,t/.4),release=Math.max(0,Math.min(1,(1-u)/.22)),roll=.7+.18*Math.sin(t*5)+.12*Math.sin(t*9),envelope=attack*Math.exp(-t/2.6)*release;const index=(Math.round(event.at*sampleRate)+i)%length;output[index]+=(rumble-body)*thunder*event.gain*envelope*roll*2.4}}
 // Round the final 15ms into the first sample, without fading rainfall to silence.
 const seam=Math.min(length,Math.round(sampleRate*.015)),target=output[0];for(let j=0;j<seam;j++){const mix=(1-Math.cos(Math.PI*(j+1)/seam))/2,i=length-seam+j;output[i]=output[i]*(1-mix)+target*mix}
 }
 return{left,right,sampleRate,duration};}
