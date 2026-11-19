export const ATLAS={columns:6,rows:4,width:1536,height:1024,cell:256};
export const WALK_BASELINES=[244,240,238,247,244,243];
export function noriFrame(s){let action,row,frame;const speed=Math.abs(s.vx);if(s.spin>0){action='spin';row=3;frame=Math.min(5,Math.floor(Math.max(0,1-s.spin/.55)*6))}else if(s.coyote<=0){action=s.vy>0?'jump':'fall';row=3;frame=s.vy>3?1:s.vy>0?2:s.vy< -3?4:3}else if(speed<.2){action='idle';row=0;frame=Math.floor(s.time*5)%6}else{action=speed<3.8?'walk':'run';row=action==='walk'?1:2;frame=Math.floor((s.travel??0)*(row===1?3:2.25))%6}return{action,row,frame,baseline:row===1?WALK_BASELINES[frame]:244}}
export function atlasUV(row,frame){return{repeat:[254/1536,254/1024],offset:[(frame*256+1)/1536,((3-row)*256+1)/1024]}}
