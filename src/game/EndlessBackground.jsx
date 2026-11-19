import React,{useEffect,useMemo,useState}from'react';
import{REALM_IMAGES}from'./realm-assets.mjs';
import{themeAt}from'./engine.mjs';
import{realmRecipe}from'./procedural-realms.mjs';
import GeneratedWorld from'./GeneratedWorld';
import{ENVIRONMENT_IMAGES}from'./environment-assets.mjs';
import './realms.css';
function SceneryLayer({stage,active}){const recipe=useMemo(()=>realmRecipe(stage),[stage]),theme=themeAt(stage),[visible,setVisible]=useState(false);useEffect(()=>{const frame=requestAnimationFrame(()=>setVisible(active));return()=>cancelAnimationFrame(frame)},[active]);return <div className={`endless-realm-layer ${visible?'active':''}`} data-world={stage}>
 <img className="realm-full-image" src={recipe.environment?ENVIRONMENT_IMAGES[recipe.environment.biome.id]:REALM_IMAGES[recipe.baseIndex]} alt="" draggable="false" style={recipe.environment?{objectPosition:`${recipe.position}% center`,transform:recipe.environment.variant>1&&recipe.flip?'scaleX(-1)':'none'}:undefined}/>{recipe.environment&&recipe.environment.variant>1&&<GeneratedWorld environment={recipe.environment} stage={stage} overlay/>}
 {recipe.generated&&<div className={`realm-weather weather-${recipe.weather}`}>{recipe.particles.map((p,i)=><i key={i} style={{left:`${p.x}%`,top:`${p.y}%`,'--weather-delay':`${p.delay}s`,'--weather-duration':`${p.duration}s`,'--weather-color':theme.stars[i%3]}}/>)}</div>}
 </div>}
export default function EndlessBackground({stage,paused}){const[layers,setLayers]=useState([stage]);useEffect(()=>{setLayers(old=>old.at(-1)===stage?old:[old.at(-1),stage]);const timer=setTimeout(()=>setLayers(old=>old.filter(id=>id===stage)),1900);const nextRecipe=realmRecipe(stage+1);{const next=new Image();next.src=nextRecipe.environment?ENVIRONMENT_IMAGES[nextRecipe.environment.biome.id]:REALM_IMAGES[nextRecipe.baseIndex]}return()=>clearTimeout(timer)},[stage]);return <div className={`game-realms endless-background ${paused?'realm-paused':''}`} aria-hidden="true">{layers.map(id=><SceneryLayer key={id} stage={id} active={id===stage}/>)}<div className="realm-shade"/></div>}
