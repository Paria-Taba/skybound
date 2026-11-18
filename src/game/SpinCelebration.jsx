import React from 'react';
import './celebration.css';
import {themeAt} from './engine.mjs';

export default function SpinCelebration({event,paused}){if(!event)return null;const colors=themeAt(event.stage).stars;return <div key={event.id} className={`spin-celebration ${paused?'is-paused':''}`} style={{'--praise-color':colors[0]}}>
 <div className="spin-praise" role="status" aria-live="polite"><span>✦</span><strong>{event.word}!</strong><small>WALL SPIN</small></div>
 <div className="spin-star-rain" aria-hidden="true">{Array.from({length:28},(_,i)=><span key={i} style={{left:`${(i*37+event.id*13)%100}%`,'--star-size':`${7+(i*7)%12}px`,'--star-color':colors[i%3],'--star-delay':`${(i%7)*.055}s`,'--star-duration':`${1.05+(i%6)*.12}s`,'--star-drift':`${((i*23)%90)-45}px`,'--star-angle':`${i%2?360:-360}deg`}}><svg viewBox="0 0 20 20"><path d="M10 0 13 6.5 20 7.5 15 12.5 16.5 20 10 16.2 3.5 20 5 12.5 0 7.5 7 6.5Z"/></svg></span>)}</div>
 </div>}
