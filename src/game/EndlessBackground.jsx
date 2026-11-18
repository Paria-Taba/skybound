import React,{useEffect,useMemo,useState}from'react';
import{REALM_IMAGES}from'./realm-assets.mjs';
import{themeAt}from'./engine.mjs';
import{realmRecipe}from'./procedural-realms.mjs';
import './realms.css';

function SceneryLayer({stage,active}){const recipe=useMemo(()=>realmRecipe(stage),[stage]),theme=themeAt(stage),[visible,setVisible]=useState(false);useEffect(()=>{const frame=requestAnimationFrame(()=>setVisible(active));return()=>cancelAnimationFrame(frame)},[active]);return <div className={`endless-realm-layer ${visible?'active':''}`}>
 <img className="realm-full-image" src={REALM_IMAGES[recipe.baseIndex]} alt="" draggable="false" style={{objectPosition:`${recipe.position}% center`,filter:recipe.generated?`brightness(${recipe.brightness}) saturate(${recipe.saturation})`:'none',transform:recipe.flip?'scaleX(-1)':'none'}}/>
 {recipe.generated&&<><div className="realm-lighting" style={{background:`linear-gradient(${recipe.light}deg,${theme.fog}38,transparent 60%,#0b1e2b33)`}}/>
 <svg className="generated-islands" viewBox="0 0 1000 700" preserveAspectRatio="none"><defs><linearGradient id={`cascade-${stage}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={theme.fog} stopOpacity=".45"/><stop offset="1" stopColor={theme.fog} stopOpacity="0"/></linearGradient></defs>
 {recipe.clouds.map((c,i)=><ellipse key={`cloud-${i}`} cx={c.x} cy={c.y} rx={c.width} ry="35" fill={theme.fog} opacity={c.opacity}/>)}
 {recipe.islands.map((p,i)=><g key={i} transform={`translate(${p.x},${p.y}) scale(${p.scale})`} opacity=".24"><path d="M-85 0 -45 -12 5 -5 75 -15 95 4 58 35 28 83 5 55 -22 92 -42 40Z" fill={theme.stone}/><path d="M-85 0 -45 -12 5 -5 75 -15 95 4 45 12 -15 5Z" fill={theme.top}/>{p.tower?<><path d="M-20 0 -20 -67 -28 -67 -28 -77 -12 -77 -12 -68 0 -68 0 -77 14 -77 14 -65 8 -65 8 0Z" fill={theme.stone}/><path d="M-12 -43 -12 -53 -5 -53 -5 -43Z" fill={theme.fog}/></>:<path d="M-30 -1 -30 -35 -36 -35 -19 -69 -3 -35 -10 -35 -10 -1 M25 1 25 -23 15 -23 34 -55 52 -23 42 -23 42 1" fill={theme.top}/>}<path d="M48 8 55 8 52 135 44 135Z" fill={`url(#cascade-${stage})`}/></g>)}
 </svg><div className={`realm-weather weather-${recipe.weather}`}>{recipe.particles.map((p,i)=><i key={i} style={{left:`${p.x}%`,top:`${p.y}%`,'--weather-delay':`${p.delay}s`,'--weather-duration':`${p.duration}s`,'--weather-color':theme.stars[i%3]}}/>)}</div></>}
 </div>}
export default function EndlessBackground({stage,paused}){const[layers,setLayers]=useState([stage]);useEffect(()=>{setLayers(old=>old.at(-1)===stage?old:[old.at(-1),stage]);const timer=setTimeout(()=>setLayers(old=>old.filter(id=>id===stage)),1900);const next=new Image();next.src=REALM_IMAGES[realmRecipe(stage+1).baseIndex];return()=>clearTimeout(timer)},[stage]);return <div className={`game-realms endless-background ${paused?'realm-paused':''}`} aria-hidden="true">{layers.map(id=><SceneryLayer key={id} stage={id} active={id===stage}/>)}<div className="realm-shade"/></div>}
