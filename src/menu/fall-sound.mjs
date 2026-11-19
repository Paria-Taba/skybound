export const FALL_SOUND_SECONDS=1.65;
export const GAME_OVER_DELAY_MS=2000;
export const FALL_SOUND_GAIN=1.15;
export const FALL_IMPACT_AT=.95;
// Recorded creature groan, then a padded ground thump and soft dust puff.
export function buildFallSound(profile,sampleRate=22050,voice=null){const duration=FALL_SOUND_SECONDS,length=Math.ceil(duration*sampleRate),left=new Float32Array(length),right=new Float32Array(length);let phase=0,seed=3811,low=0,peak=0;
 const source=voice?.getChannelData(0),rate=1.08,voiceEnd=source?Math.min(.82,voice.duration/rate):.78;
 let voicePeak=.001;if(source)for(const v of source)voicePeak=Math.max(voicePeak,Math.abs(v));
 for(let i=0;i<length;i++){const t=i/sampleRate;let vocal=0,impact=0;
 if(t<voiceEnd){if(source){const at=t*voice.sampleRate*rate,n=Math.floor(at),mix=at-n;vocal=((source[n]??0)*(1-mix)+(source[n+1]??0)*mix)*(.24/voicePeak)}else{const f=235-90*t/voiceEnd+8*Math.sin(t*34);phase+=2*Math.PI*f/sampleRate;vocal=(Math.sin(phase)+.32*Math.sin(phase*2)+.16*Math.sin(phase*3))*Math.sin(Math.PI*t/voiceEnd)*.18}const attack=Math.min(1,t/.025),release=Math.max(0,Math.min(1,(voiceEnd-t)/.06));vocal*=attack*release}
 const u=t-FALL_IMPACT_AT;if(u>=0&&u<.48){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const noise=seed/2147483648-1;low+=.13*(noise-low);const env=Math.min(1,u/.012)*Math.exp(-u*12)*Math.min(1,(.48-u)/.1),thump=Math.sin(2*Math.PI*(70*u+45*.035*(1-Math.exp(-u/.035))));impact=(thump*.22+low*.25)*env}
 left[i]=vocal+impact;right[i]=vocal*.98+impact;peak=Math.max(peak,Math.abs(left[i]),Math.abs(right[i]))}
 const scale=Math.min(3,.32/Math.max(peak,.001));for(let i=0;i<length;i++){left[i]*=scale;right[i]*=scale}left[length-1]=right[length-1]=0;return{left,right,sampleRate,duration};}
