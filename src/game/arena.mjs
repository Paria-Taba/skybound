import{noriFrame}from'./animation.mjs';
export const WALL_CENTER_X=4.85,WALL_WIDTH=.5,WALL_TRIM_OFFSET=.28,WALL_TRIM_WIDTH=.045;
export const WALL_INNER_X=Math.min(WALL_CENTER_X-WALL_WIDTH/2,WALL_CENTER_X-WALL_TRIM_OFFSET-WALL_TRIM_WIDTH/2);
export const NORI_SIZE=1.65,WALL_SKIN=.035,WALL_CONTACT_SLOP=.025;
// Visible alpha bounds of the approved 256px atlas cells (alpha >= 20).
const BOUNDS=[[30,11,224,245],[32,8,225,245],[30,8,225,244],[29,12,226,244],[28,13,224,245],[26,13,223,245],[27,9,225,245],[32,6,220,241],[30,7,220,239],[30,7,217,248],[27,10,214,246],[31,10,221,244],[27,16,221,230],[22,12,230,234],[19,15,236,214],[20,17,229,243],[24,20,227,243],[26,21,232,232],[31,32,216,244],[53,12,202,219],[70,6,189,181],[50,4,212,203],[29,7,218,240],[21,13,223,245]];
export function noriWallRadius(s){const pose=noriFrame(s),[l,t,r,b]=BOUNDS[pose.row*6+pose.frame],angle=s.spin>0?(1-s.spin/.55)*Math.PI*2*s.facing:0,c=Math.cos(angle),sn=Math.sin(angle);let radius=.7;for(const x of[l,r])for(const y of[t,b])radius=Math.max(radius,Math.abs(((x-128)/254*s.facing*c-(128-y)/254*sn)*NORI_SIZE));return radius}
export function constrainToWalls(s){const limit=WALL_INNER_X-WALL_SKIN-noriWallRadius(s);s.x=Math.max(-limit,Math.min(limit,s.x));if((s.x>=limit&&s.vx>0)||(s.x<=-limit&&s.vx<0))s.vx=0;s.wallSide=s.x>=limit-WALL_CONTACT_SLOP?1:s.x<=-limit+WALL_CONTACT_SLOP?-1:0;return limit}
