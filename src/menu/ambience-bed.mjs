// Seamless, sparse-but-continuous instrumental texture. No noise/wind layer.
// Note tails wrap across the buffer boundary rather than being cut off.
export function buildThemeBed(profile,sampleRate=22050){const duration=24,length=duration*sampleRate,left=new Float32Array(length),right=new Float32Array(length);const notes=profile.notes,sequence=[0,1,2,1,0,2,1,2];
 for(let i=0;i<sequence.length;i++){const frequency=notes[sequence[i]%notes.length],start=Math.floor(i*3*sampleRate),tail=6.5,pan=i%2?.13:-.13;for(let n=0;n<tail*sampleRate;n++){const t=n/sampleRate,attack=1-Math.exp(-t/ .09),decay=Math.exp(-t/1.75),release=Math.max(0,Math.min(1,(tail-t)/.8));const sample=(Math.sin(2*Math.PI*frequency*t)+.1*Math.sin(2*Math.PI*frequency*2*t)+.025*Math.sin(2*Math.PI*frequency*3*t))*attack*decay*release*.18;const index=(start+n)%length;left[index]+=sample*(1-pan);right[index]+=sample*(1+pan)}}
 let peak=0;for(let i=0;i<length;i++)peak=Math.max(peak,Math.abs(left[i]),Math.abs(right[i]));if(peak>.28){const scale=.28/peak;for(let i=0;i<length;i++){left[i]*=scale;right[i]*=scale}}
 return{left,right,sampleRate,duration};
}
