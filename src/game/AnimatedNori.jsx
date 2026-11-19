import React,{useEffect,useMemo,useRef}from'react';
import{useFrame,useLoader}from'@react-three/fiber';
import * as THREE from'three';
import atlasUrl from './assets/nori-animation-atlas.png';
import{noriFrame,atlasUV}from'./animation.mjs';
import{NORI_SIZE}from'./arena.mjs';

export default function AnimatedNori({s}){const source=useLoader(THREE.TextureLoader,atlasUrl),sprite=useRef(),last=useRef('');const texture=useMemo(()=>{const t=source.clone();t.colorSpace=THREE.SRGBColorSpace;t.minFilter=THREE.LinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=false;t.wrapS=t.wrapT=THREE.ClampToEdgeWrapping;t.needsUpdate=true;return t},[source]);useEffect(()=>()=>texture.dispose(),[texture]);
 useFrame(({camera})=>{const pose=noriFrame(s),key=`${pose.row}:${pose.frame}`;if(last.current!==key){const uv=atlasUV(pose.row,pose.frame);texture.repeat.set(...uv.repeat);texture.offset.set(...uv.offset);last.current=key}sprite.current.quaternion.copy(camera.quaternion);if(s.spin>0)sprite.current.rotateZ((1-s.spin/.55)*Math.PI*2*s.facing);const size=NORI_SIZE;sprite.current.position.set(s.x,s.y+size*(pose.baseline/256-.5),.22);sprite.current.scale.set(s.facing*size,size,1)});
 return <mesh ref={sprite} renderOrder={10}><planeGeometry args={[1,1]}/><meshBasicMaterial map={texture} transparent alphaTest={.08} side={THREE.DoubleSide} depthWrite={false} depthTest={false} toneMapped={false}/></mesh>
}
