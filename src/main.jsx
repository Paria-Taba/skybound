import React,{useState}from'react';
import{createRoot}from'react-dom/client';
import './style.css';
import './compact.css';
import MainMenu from './menu/MainMenu';
import Game from './game/Game';
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function save(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
function App(){const[screen,setScreen]=useState('menu'),[color,setColor]=useState(()=>read('sky-color','#68764c')),[best,setBest]=useState(()=>read('sky-best',0));
 function finish(result){const wallet=read('sb-wallet',{coins:0,gems:0});save('sb-wallet',{...wallet,coins:wallet.coins+result.coins});const progress=read('sb-progress',{runs:0,height:0});save('sb-progress',{runs:progress.runs+1,height:Math.max(progress.height,result.height),longestRun:Math.max(progress.longestRun??0,result.time),realm:Math.max(progress.realm??0,result.stage)});setBest(b=>{const next=Math.max(b,result.score);save('sky-best',next);return next})}
 if(screen==='menu')return <main><MainMenu onPlay={()=>setScreen('game')} color={color} onColor={value=>{setColor(value);save('sky-color',value)}} best={best}/></main>;
 return <Game best={best} onMenu={()=>setScreen('menu')} onFinish={finish}/>;
}
createRoot(document.getElementById('root')).render(<App/>);
