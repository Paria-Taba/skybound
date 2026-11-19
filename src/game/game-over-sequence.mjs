import{GAME_OVER_DELAY_MS}from'../menu/fall-sound.mjs';
export function createGameOverSequence({schedule=setTimeout,cancel=clearTimeout}={}){let timer=null,version=0;return{showAfterCue(reveal){const token=++version;if(timer!==null)cancel(timer);timer=schedule(()=>{if(token!==version)return;timer=null;reveal()},GAME_OVER_DELAY_MS)},reset(){version++;if(timer!==null)cancel(timer);timer=null}}}
