import assert from 'node:assert/strict';
import{wallOrigin,WALL_ROW_HEIGHT}from'./wall-layout.mjs';
for(let row=-50;row<500;row++){
 const before=wallOrigin(row*WALL_ROW_HEIGHT-.001),after=wallOrigin(row*WALL_ROW_HEIGHT+.001);
 const shift=Math.round((after-before)/WALL_ROW_HEIGHT);
 assert.equal(shift%2,0,'Recycling must preserve alternating wall colors');
 for(let i=3;i<18;i++){const worldY=before+i*WALL_ROW_HEIGHT;const newIndex=Math.round((worldY-after)/WALL_ROW_HEIGHT);assert.equal(((newIndex%2)+2)%2,i%2,'A world row must retain its color')}
}
console.log('Passed: wall color pattern remains anchored through positive and negative scroll boundaries.');
