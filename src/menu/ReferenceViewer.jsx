import React,{useRef,useState}from'react';
import referenceSheet from './assets/nori-turnaround.png';
// Exact views from the approved sheet. Ordered around the character, not by grid.
const views=[
 {name:'FRONT',box:'70 55 400 425'},
 {name:'FRONT THREE-QUARTER',box:'145 520 400 415'},
 {name:'RIGHT SIDE',box:'590 520 400 415'},
 {name:'BACK THREE-QUARTER',box:'1060 520 400 415'},
 {name:'BACK',box:'1080 55 400 425'},
 {name:'LEFT SIDE',box:'565 55 400 425'},
];
export default function ReferenceViewer(){const[index,setIndex]=useState(0),[zoom,setZoom]=useState(1),drag=useRef(null);const turn=amount=>setIndex(v=>(v+amount+views.length)%views.length);const selected=views[index];return <section className="nori-viewer nori-reference" aria-label="NORI six-angle reference viewer"><div className="nori-stage nori-reference-stage" tabIndex={0} role="application" aria-label="NORI reference images. Drag left or right or click to switch between six views. Arrow keys switch views. Home resets." onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home'].includes(e.key)){e.preventDefault();if(e.key==='Home'){setIndex(0);setZoom(1)}else turn(e.key==='ArrowLeft'?-1:1)}}} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);drag.current={id:e.pointerId,x:e.clientX,start:e.clientX,moved:0}}} onPointerMove={e=>{const d=drag.current;if(!d||d.id!==e.pointerId)return;const delta=e.clientX-d.x;d.moved+=Math.abs(e.clientX-d.start);if(Math.abs(delta)>=35){turn(delta>0?1:-1);d.x=e.clientX}d.start=e.clientX}} onPointerUp={e=>{if(drag.current?.id!==e.pointerId)return;if(drag.current.moved<6)turn(1);drag.current=null}} onPointerCancel={()=>drag.current=null} onLostPointerCapture={()=>drag.current=null}>
 <svg preserveAspectRatio="xMidYMid meet" viewBox={selected.box} role="img" aria-label={`NORI ${selected.name.toLowerCase()}`} className="nori-reference-frame" style={{transform:`scale(${zoom})`}}><image href={referenceSheet} width="1536" height="1024"/></svg></div>
 <div className="nori-view-label nori-sr-only" aria-live="polite">{selected.name} · {index+1} / 6</div><div className="nori-view-controls nori-angle-controls">{views.map((v,i)=><button key={v.name} aria-pressed={i===index} onClick={()=>setIndex(i)}>{v.name}</button>)}</div><div className="nori-view-controls"><button aria-label="Previous angle" onClick={()=>turn(-1)}>← PREVIOUS</button><button onClick={()=>{setIndex(0);setZoom(1)}}>RESET</button><button aria-label="Next angle" onClick={()=>turn(1)}>NEXT →</button></div><label className="nori-zoom">SIZE <input aria-label="Character image size" type="range" min=".8" max="1.4" step=".05" value={zoom} onChange={e=>setZoom(Number(e.target.value))}/><span>{Math.round(zoom*100)}%</span></label></section>}
