import React,{Suspense,useEffect,useMemo,useRef,useState}from'react';
import{Canvas,useFrame,useLoader,useThree}from'@react-three/fiber';
import * as THREE from'three';
import artUrl from './assets/skybound-sanctuary.png';
import depthUrl from './assets/sanctuary-depth.png';
import{coverRelief,RELIEF_DISTANCE,RELIEF_FOV}from'./image-relief.mjs';
import './menu-depth.css';

const vertexShader=`
uniform sampler2D uDepth;
uniform float uDistance;
uniform float uStrength;
uniform vec2 uOffset;
varying vec2 vUv;
void main(){
 vUv=uv;
 float depth=texture2D(uDepth,uv).r;
 vec3 p=position;
 p.xy+=uOffset;
 p.z=depth*uStrength;
 // Align the original photograph at the neutral camera position.
 p.xy*=(uDistance-p.z)/uDistance;
 gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
}`;
const fragmentShader=`
uniform sampler2D uArt;
varying vec2 vUv;
void main(){
 gl_FragColor=texture2D(uArt,vUv);
 #include <colorspace_fragment>
}`;
function Relief({pointer,reduced,paused,onReady}){const[art,depth]=useLoader(THREE.TextureLoader,[artUrl,depthUrl]),{size,gl}=useThree();const layout=coverRelief(size.width,size.height,art.image.width/art.image.height),material=useRef();
 const uniforms=useMemo(()=>({uArt:{value:art},uDepth:{value:depth},uDistance:{value:RELIEF_DISTANCE},uStrength:{value:1.25},uOffset:{value:new THREE.Vector2()}}),[art,depth]);
 useEffect(()=>{art.colorSpace=THREE.SRGBColorSpace;art.anisotropy=Math.min(8,gl.capabilities.getMaxAnisotropy());art.minFilter=THREE.LinearMipmapLinearFilter;art.magFilter=THREE.LinearFilter;art.needsUpdate=true;depth.colorSpace=THREE.NoColorSpace;depth.minFilter=THREE.LinearFilter;depth.magFilter=THREE.LinearFilter;depth.generateMipmaps=false;depth.needsUpdate=true;onReady(true);return()=>onReady(false)},[art,depth,gl,onReady]);
 uniforms.uOffset.value.set(layout.offsetX,0);
 useFrame(({camera},delta)=>{const target=reduced||paused?{x:0,y:0}:pointer.current;camera.position.x=THREE.MathUtils.damp(camera.position.x,target.x*.72,3.2,Math.min(delta,.05));camera.position.y=THREE.MathUtils.damp(camera.position.y,target.y*.38,3.2,Math.min(delta,.05));camera.position.z=RELIEF_DISTANCE;camera.lookAt(0,0,0)});
 return <mesh frustumCulled={false}><planeGeometry args={[layout.planeWidth,layout.planeHeight,180,100]}/><shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} toneMapped={false} side={THREE.DoubleSide}/></mesh>
}
class DepthBoundary extends React.Component{state={failed:false};static getDerivedStateFromError(){return{failed:true}}componentDidCatch(){this.props.onFailure()}render(){return this.state.failed?null:this.props.children}}
export default function MenuDepthScene({pointer,reduced,paused,enabled=true}){const[ready,setReady]=useState(false),[failed,setFailed]=useState(false),[osReduced,setOsReduced]=useState(()=>typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches);useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)'),update=()=>setOsReduced(media.matches);media.addEventListener?.('change',update);return()=>media.removeEventListener?.('change',update)},[]);
 return <div className="menu-depth-scene" data-depth-status={enabled&&!failed?'enabled':'original'}><img className="sb-art" src={artUrl} alt="NORI overlooking ancient floating islands and waterfalls at sunrise"/>{enabled&&!failed&&<DepthBoundary onFailure={()=>{setFailed(true);setReady(false)}}><div className={`menu-depth-render ${ready?'is-ready':''}`}><Canvas dpr={[1,2]} camera={{position:[0,0,RELIEF_DISTANCE],fov:RELIEF_FOV,near:.1,far:30}} gl={{alpha:true,antialias:true,powerPreference:'default'}} fallback={null}><Suspense fallback={null}><Relief {...{pointer,paused}} reduced={reduced||osReduced} onReady={setReady}/></Suspense></Canvas></div></DepthBoundary>}</div>
}
