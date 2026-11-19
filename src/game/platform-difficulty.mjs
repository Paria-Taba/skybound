// Applied only when a platform is created; existing footholds never shrink.
export function platformDifficulty(id,time=0){const pressure=Math.max(Math.max(0,time)/30,Math.max(0,id-8)/30);return{pressure,width:Math.max(1.3,2.6-pressure*.10),fragileChance:Math.min(.60,.10+pressure*.04)}}
export function platformKind(id,time=0){if(id<=7||id%4===0)return'safe';const rank=((id*13)%20+.5)/20;if(rank<platformDifficulty(id,time).fragileChance)return'fragile';return id%7===0?'moving':'safe'}
