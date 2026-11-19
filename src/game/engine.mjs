import {realmRecipe} from './procedural-realms.mjs';
import{constrainToWalls}from'./arena.mjs';
import{platformDifficulty,platformKind}from'./platform-difficulty.mjs';
export const CLOCK_SECONDS=30;
export const STAGE_METERS=30;
export const THEMES=[
 {name:'VERDANT SKIES',subtitle:'Forests above the clouds',stone:'#64705b',top:'#8baf72',accent:'#efd28e',fog:'#afcfda',stars:['#fff1b2','#b7df8a','#e7d8a0']},
 {name:'SUNFORGED RUINS',subtitle:'Temples of the lost sun',stone:'#a48964',top:'#d5ba7e',accent:'#ffdc8c',fog:'#edc7a1',stars:['#ffdc75','#f7a950','#fff4bd']},
 {name:'CLOUDSEA HARBOR',subtitle:'Where the sky becomes an ocean',stone:'#638f8a',top:'#acded0',accent:'#d3fff1',fog:'#b9e6e2',stars:['#c3ffee','#72d8d8','#fff1b8']},
 {name:'EMBERWOOD HEIGHTS',subtitle:'A forest caught in autumn',stone:'#8b6653',top:'#be8c57',accent:'#ffc885',fog:'#dfb9a0',stars:['#ffb665','#f9df9a','#e88c59']},
 {name:'STORMWATCH PEAKS',subtitle:'Above the gathering storm',stone:'#405f6b',top:'#789394',accent:'#c8e6f5',fog:'#839da9',stars:['#dcefff','#89bed9','#f0e6be']},
 {name:'FROSTBOUND HEIGHTS',subtitle:'Beyond the frozen horizon',stone:'#698793',top:'#c4e2e2',accent:'#9ceaf2',fog:'#bbd8e4',stars:['#e8ffff','#8de0f1','#c6e5ff']},
 {name:'ASTRAL OBSERVATORY',subtitle:'The stars remember your ascent',stone:'#394b69',top:'#6e8da5',accent:'#e7dfa7',fog:'#6d87a8',stars:['#fff2bf','#b4daff','#d7edff']},
 {name:'CROWN OF THE SKY',subtitle:'An endless climb beyond the summit',stone:'#a39779',top:'#dfd6b4',accent:'#fff0b6',fog:'#e5dcc0',stars:['#fff8db','#f3ce75','#e2fff6']},
];
export const difficulty=time=>({cycle:Math.floor(time/CLOCK_SECONDS),progress:(time%CLOCK_SECONDS)/CLOCK_SECONDS,speed:.35+Math.floor(time/CLOCK_SECONDS)*.12});
export const stageAt=time=>Math.floor(Math.max(0,time)/CLOCK_SECONDS);
export const themeAt=stage=>{const recipe=realmRecipe(stage),base=THEMES[recipe.baseIndex];return{...base,...(recipe.environment?.biome??{}),baseIndex:recipe.baseIndex,name:recipe.name||base.name}};
export const realmViewBox=index=>`${index%2*543} ${Math.floor(index/2)*362} 543 362`;
export function makePlatform(id,time=0){return{id,x:id===0?0:Math.sin(id*Math.PI/3)*3.8,y:id*1.6,w:id===0?9.3:platformDifficulty(id,time).width,kind:id===0?'safe':platformKind(id,time),broken:false,crumble:0}}
export const platformX=(p,time)=>p.x+(p.kind==='moving'?Math.sin(time*1.5+p.id)*.35:0);
export function createRun(){return{x:0,y:0,vx:0,vy:0,top:0,storm:-5.4,time:0,land:0,combo:0,coins:0,air:false,coyote:.12,buffer:0,dead:false,facing:1,lastLanding:-10,platforms:Array.from({length:26},(_,i)=>makePlatform(i)),taken:new Set(),flash:0,wallSide:0,lastWallJumpSide:0,wallCooldown:0,wallLock:0,wallChain:0,spin:0,spinCount:0,travel:0,viewHeight:12}}
export function snapshot(s){return{height:Math.floor(s.top),score:Math.floor(s.top*10+s.coins*25),combo:s.combo,coins:s.coins,dash:s.air,distance:Math.max(0,s.y-s.storm),time:s.time,stage:stageAt(s.time),wall:s.wallSide!==s.lastWallJumpSide&&s.wallCooldown===0?s.wallSide:0,wallChain:s.wallChain,spin:s.spin,...difficulty(s.time)}}
export function stepRun(s,input,dt){if(s.dead)return;s.time+=dt;s.flash=Math.max(0,s.flash-dt);s.buffer=input.jump?.14:Math.max(0,s.buffer-dt);input.jump=false;
 s.wallCooldown=Math.max(0,s.wallCooldown-dt);s.wallLock=Math.max(0,s.wallLock-dt);s.spin=Math.max(0,s.spin-dt);
 const axis=(input.right?1:0)-(input.left?1:0),target=axis*5.8;if(s.wallLock===0)s.vx+=(target-s.vx)*(1-Math.exp(-(axis?13:10)*dt));if(axis&&s.wallLock===0)s.facing=axis;s.x+=s.vx*dt;s.travel+=Math.abs(s.vx)*dt;s.coyote-=dt;constrainToWalls(s);
 if(s.buffer>0&&s.wallSide&&s.wallSide!==s.lastWallJumpSide&&s.wallCooldown===0){s.lastWallJumpSide=s.wallSide;s.wallChain++;s.spinCount++;s.vy=11.8+Math.min(s.wallChain*.3,1.5);s.vx=-s.wallSide*8.7;s.facing=-s.wallSide;s.wallLock=.2;s.wallCooldown=.18;s.spin=.55;s.buffer=0;s.coyote=0;s.air=true;s.flash=.25}
 else if(s.buffer>0&&s.coyote>0){s.vy=9;s.coyote=0;s.buffer=0;s.air=true}
 if(input.dash&&s.air){s.vx=(axis||s.facing)*10;s.vy=Math.max(s.vy,3.6);s.air=false;s.flash=.18}input.dash=false;
 const previous=s.y;s.vy-=19*dt;s.y+=s.vy*dt;
 for(const p of s.platforms){if(p.crumble>0){p.crumble-=dt;if(p.crumble<=0)p.broken=true}if(!p.broken&&s.vy<=0&&previous>=p.y-.02&&s.y<=p.y&&Math.abs(s.x-platformX(p,s.time))<p.w/2+.15){s.y=p.y;s.vy=0;s.coyote=.12;s.air=true;s.wallChain=0;s.lastWallJumpSide=0;if(p.id>s.land){s.combo=s.time-s.lastLanding<2.5?s.combo+1:1;s.land=p.id;s.lastLanding=s.time}if(p.kind==='fragile'&&p.crumble===0)p.crumble=.65;break}}
 s.top=Math.max(s.top,s.y);s.storm=Math.max(s.storm+difficulty(s.time).speed*dt,s.top-s.viewHeight*.55);
 for(const p of s.platforms)if(p.id>0&&!s.taken.has(p.id)&&!p.broken&&Math.abs(s.x-platformX(p,s.time))<.65&&Math.abs(s.y+.6-(p.y+.95))<.8){s.taken.add(p.id);s.coins++}
 const first=Math.max(0,Math.floor(s.top/1.6)-8);if(s.platforms.at(-1).id<first+25){s.platforms=s.platforms.filter(p=>p.id>=first);if(!s.platforms.length)s.platforms.push(makePlatform(first,s.time));while(s.platforms.at(-1).id<first+25)s.platforms.push(makePlatform(s.platforms.at(-1).id+1,s.time));for(const id of s.taken)if(id<first)s.taken.delete(id)}
 constrainToWalls(s);
 if(s.y<s.storm+.13)s.dead=true;
}
