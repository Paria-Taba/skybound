export const RELIEF_DISTANCE=10;
export const RELIEF_FOV=40;
export function coverRelief(width,height,imageAspect){const viewHeight=2*RELIEF_DISTANCE*Math.tan(RELIEF_FOV*Math.PI/360),viewWidth=viewHeight*width/height,position=width<=700?(height<=600?.6:.61):.58;const planeWidth=Math.max(viewWidth,viewHeight*imageAspect)*1.035,planeHeight=planeWidth/imageAspect;return{planeWidth,planeHeight,offsetX:(viewWidth-planeWidth)*(position-.5),viewWidth,viewHeight}}
export function projectionCompensate(x,y,depth){const scale=(RELIEF_DISTANCE-depth)/RELIEF_DISTANCE;return[x*scale,y*scale,depth]}
