'use strict';
/* ============================================================
   THEME PACK — VOLCANO HATCHERY
   Warm ember glow, speckled eggs cracking open, baby phoenix
   chicks on wobbly first flights, lava bubbles, smoke rings.
   ============================================================ */
registerTheme({
  id:'volcano-hatchery', name:'VOLCANO HATCHERY',
  palettes:[
    { hue:16,  bg:['#2b0a05','#4a1a08'], node:'#ffb066', nodeDone:'#ffd977',
      lock:'#6e4436', accent:'#ff9b3d', text:'#ffeadd', veil:'#170402' },
    { hue:195, bg:['#080a17','#1a1330'], node:'#8fd8ff', nodeDone:'#ffd977',
      lock:'#4a4468', accent:'#63e8ff', text:'#e6f1ff', veil:'#050310' },
  ],
  motif(ctx,m,t,P){
    const s=m.s;
    if(m.v<0.36){ // speckled egg that wobbles, cracks, and leaks glow
      const c=(t+m.v*23)%6, crack=clamp((c-2.4)/1.2,0,1);       // 6s hatch cycle
      const wob=c<2.4?FX.sway(t,7,0.10*(c/2.4),m.v*9):FX.sway(t,15,0.05,m.v);
      ctx.save(); ctx.rotate(wob);
      ctx.fillStyle='rgba(255,238,215,0.85)';
      ctx.beginPath(); ctx.ellipse(0,0,s*0.30,s*0.40,0,0,TAU); ctx.fill();
      ctx.fillStyle=hexA(P.accent,0.5);                          // speckles
      for(let i=0;i<5;i++){ const a=m.v*31+i*2.4;
        ctx.beginPath();
        ctx.arc(Math.sin(a)*s*0.16,Math.cos(a*1.7)*s*0.24,s*0.035,0,TAU); ctx.fill(); }
      if(crack>0){                                               // zigzag crack + glow
        FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.35*crack);
          ctx.beginPath(); ctx.arc(0,0,s*0.5,0,TAU); ctx.fill(); });
        ctx.strokeStyle='rgba(60,20,10,0.8)'; ctx.lineWidth=1.6; ctx.lineCap='round';
        ctx.beginPath(); ctx.moveTo(-s*0.24*crack,-s*0.02);
        for(let i=1;i<=4;i++)
          ctx.lineTo((-0.24+i*0.12)*s*crack,(i%2?-0.10:0.04)*s);
        ctx.stroke();
        if(crack>0.7){ ctx.fillStyle=P.accent;                   // tiny beak peeks out
          ctx.beginPath(); ctx.moveTo(-s*0.04,-s*0.06);
          ctx.lineTo(s*0.06,-s*0.03); ctx.lineTo(-s*0.04,0); ctx.fill(); }
      }
      ctx.restore();
    } else if(m.v<0.7){ // lava puddle, bubbles swelling then popping
      ctx.fillStyle=hexA(P.accent,0.30);
      ctx.beginPath(); ctx.ellipse(0,s*0.16,s*0.5,s*0.15,0,0,TAU); ctx.fill();
      ctx.strokeStyle=hexA(P.accent,0.7); ctx.lineWidth=2;
      for(let i=0;i<3;i++){ const p=(t*0.9+m.v*7+i*0.33)%1;      // grow 0..1 then pop
        const bx=(i-1)*s*0.26, r=s*0.14*Math.sin(p*Math.PI);
        FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.35*(1-p));
          ctx.beginPath(); ctx.arc(bx,s*0.1-p*s*0.16,r,0,TAU); ctx.fill(); });
        ctx.beginPath(); ctx.arc(bx,s*0.1-p*s*0.16,r,0,TAU); ctx.stroke();
      }
    } else { // smoke-ring vent puffing rings upward
      ctx.fillStyle='rgba(70,40,35,0.75)';
      ctx.beginPath(); ctx.moveTo(-s*0.3,s*0.3); ctx.lineTo(-s*0.1,-s*0.05);
      ctx.lineTo(s*0.1,-s*0.05); ctx.lineTo(s*0.3,s*0.3); ctx.fill();
      ctx.lineCap='round';
      for(let i=0;i<3;i++){ const p=(t*0.5+m.v*9+i/3)%1;
        ctx.strokeStyle='rgba(210,190,185,'+(0.5*(1-p))+')';
        ctx.lineWidth=2.4-p;
        ctx.beginPath();
        ctx.ellipse(Math.sin(p*6+m.v*20)*s*0.08,-s*0.12-p*s*0.75,
          s*(0.08+p*0.22),s*(0.03+p*0.08),0,0,TAU); ctx.stroke();
      }
    }
  },
  nodeBody(ctx,r,t,P,st){ // ring of flame petals licking around the node
    for(let i=0;i<8;i++){ const a=i/8*TAU-t*0.7, l=FX.pulse(t,5,0.22,i*1.7);
      ctx.fillStyle=st.done?'rgba(255,217,119,0.4)':hexA(P.accent,i%2?0.45:0.28);
      ctx.save(); ctx.translate(Math.cos(a)*r*0.8,Math.sin(a)*r*0.8);
      ctx.rotate(a+Math.PI/2);
      ctx.beginPath(); ctx.moveTo(-r*0.16,0);
      ctx.quadraticCurveTo(0,-r*0.55*l,r*0.16,0);
      ctx.quadraticCurveTo(0,r*0.18,-r*0.16,0); ctx.fill();
      ctx.restore(); }
  },
  critter(ctx,i,t,P,zH){
    if(i<2){ // wobbly first-flight phoenix chicks with flame trails (travelers)
      const sp=34+i*12, y0=150+i*(zH-330), dir=i%2?-1:1;
      const cx=d=>FX.crossing(t-d,sp,G.UNIT_W,i*0.41);
      const cy=d=>y0+FX.bob(t-d,3.1,26,i*2)+FX.bob(t-d,7.7,7,i);  // wobbly!
      for(let k=4;k>=1;k--){ const d=k*0.09;                      // flame trail
        FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.30*(1-k/5));
          ctx.beginPath(); ctx.arc(cx(d),cy(d),3.4-k*0.5,0,TAU); ctx.fill(); });
      }
      const f=FX.flap(t,11,0.7,i);
      ctx.save(); ctx.translate(cx(0),cy(0)); if(dir<0)ctx.scale(-1,1);
      ctx.rotate(FX.sway(t,3.1,0.22,i*2));
      FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.25);
        ctx.beginPath(); ctx.arc(0,0,10,0,TAU); ctx.fill(); });
      ctx.fillStyle=P.accent;
      ctx.beginPath(); ctx.ellipse(0,0,6,5,0,0,TAU); ctx.fill();  // fluffy body
      ctx.beginPath(); ctx.arc(4.5,-4,3.4,0,TAU); ctx.fill();     // head
      ctx.fillStyle=P.text;                                       // frantic wings
      ctx.beginPath(); ctx.ellipse(-2,-3,5.5,2.4,-0.8-f,0,TAU); ctx.fill();
      ctx.strokeStyle=P.accent; ctx.lineWidth=1.6; ctx.lineCap='round';
      for(const e of [-1,0,1]){ ctx.beginPath(); ctx.moveTo(3+e,-7);   // flame crest
        ctx.lineTo(3+e*2,-9.5+FX.bob(t,9,0.8,e+i)); ctx.stroke(); }
      ctx.fillStyle='#ffd23e';
      ctx.beginPath(); ctx.moveTo(7.4,-4.6); ctx.lineTo(10,-3.6); ctx.lineTo(7.4,-2.8); ctx.fill();
      FX.eyes(ctx,4.5,-4.6,0.9,i*3+1,t);
      ctx.restore();
    } else if(i===2){ // big smoke ring floating up the whole zone (traveler)
      const y=FX.rise(t,26,zH,0.3), x=195+Math.sin(y*0.02)*70;
      const a=clamp(y/120,0,1)*clamp((zH-y)/120,0,1);
      ctx.save(); ctx.translate(x,y); ctx.rotate(FX.sway(t,0.9,0.3));
      ctx.strokeStyle='rgba(215,195,190,'+(0.5*a)+')'; ctx.lineWidth=3.4; ctx.lineCap='round';
      ctx.beginPath(); ctx.ellipse(0,0,15*FX.pulse(t,2,0.1),6,0,0,TAU); ctx.stroke();
      ctx.strokeStyle='rgba(255,255,255,'+(0.22*a)+')'; ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.ellipse(0,-1.4,12,4.4,0,0,TAU); ctx.stroke();
      ctx.restore();
    } else { // ember salamander roaming the floor (traveler)
      const [wx]=FX.wander(t,5.1,120,0,0.35);
      const x=195+wx, y=zH-46+FX.bob(t,5,2,1), dir=Math.cos(t*0.35+5.1*7)>0?1:-1;
      ctx.save(); ctx.translate(x,y); if(dir<0)ctx.scale(-1,1);
      FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.2);
        ctx.beginPath(); ctx.arc(0,0,11,0,TAU); ctx.fill(); });
      ctx.strokeStyle=P.accent; ctx.lineWidth=3.4; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(-10,1);
      ctx.quadraticCurveTo(-4,1+Math.sin(t*7)*2.4,3,0);
      ctx.quadraticCurveTo(7,-0.6,9,-2); ctx.stroke();
      ctx.fillStyle=P.accent; ctx.beginPath(); ctx.arc(9,-3,3,0,TAU); ctx.fill();
      FX.eyes(ctx,9,-3.6,0.8,3.7,t);
      ctx.restore();
    }
  },
  drifter(ctx,d,t,P){ // rising ember spark, flickering
    const fl=0.5+Math.sin(t*9+d.ph*5)*0.3;
    FX.glow(ctx,()=>{
      ctx.fillStyle=hexA(P.accent,0.25*fl);
      ctx.beginPath(); ctx.arc(0,0,d.s*0.16,0,TAU); ctx.fill();
      ctx.fillStyle='rgba(255,225,170,'+(0.85*fl)+')';
      ctx.beginPath(); ctx.arc(0,0,d.s*0.055+FX.bob(t,6,0.4,d.ph),0,TAU); ctx.fill();
    });
  },
  hero(ctx,t,P,zH){ // mother phoenix brooding a giant nest — the postcard
    ctx.save(); ctx.translate(0,FX.bob(t,1.1,3));
    ctx.lineCap='round';
    for(let i=0;i<5;i++){ const a=i/5*TAU+t*1.6;                 // tail-fire aura
      FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.16);
        ctx.beginPath();
        ctx.arc(Math.cos(a)*17,-16+Math.sin(a)*9,7+Math.sin(t*4+i)*2,0,TAU); ctx.fill(); });
    }
    const br=FX.pulse(t,1.4,0.04);                               // breathing body
    ctx.fillStyle=P.accent;
    ctx.beginPath(); ctx.ellipse(0,-16,16*br,13*br,0,0,TAU); ctx.fill();
    for(const e of [-1,1]){                                      // folded wings
      ctx.fillStyle=hexA(P.accent,0.75);
      ctx.beginPath();
      ctx.ellipse(e*11,-14,8,12,e*(0.35+FX.sway(t,1.4,0.05)),0,0,TAU); ctx.fill(); }
    ctx.fillStyle=P.accent; ctx.beginPath(); ctx.arc(0,-32,7.5,0,TAU); ctx.fill();
    ctx.strokeStyle='#ffd23e'; ctx.lineWidth=2.4;
    for(const e of [-1,0,1]){ const w=FX.bob(t,7,1.6,e*2);       // flaming crest
      ctx.beginPath(); ctx.moveTo(e*2.5,-38);
      ctx.quadraticCurveTo(e*5,-43+w,e*7,-46+w); ctx.stroke(); }
    ctx.fillStyle='#ffd23e'; ctx.beginPath();
    ctx.moveTo(-2,-31); ctx.lineTo(2,-31); ctx.lineTo(0,-26.5); ctx.fill();
    FX.eyes(ctx,0,-33.5,1.5,0.4,t);
    ctx.strokeStyle='hsl(18,55%,38%)'; ctx.lineWidth=3.6;        // stone-twig nest
    ctx.beginPath(); ctx.arc(0,-4,22,0.15,Math.PI-0.15); ctx.stroke();
    ctx.lineWidth=2.2; ctx.beginPath(); ctx.arc(0,-9,24,0.5,Math.PI-0.5); ctx.stroke();
    for(const e of [-13,14]){                                    // eggs poking out
      ctx.save(); ctx.translate(e,-8); ctx.rotate(e>0?FX.sway(t,8,0.14,2):FX.sway(t,5,0.08));
      ctx.fillStyle='rgba(255,238,215,0.9)';
      ctx.beginPath(); ctx.ellipse(0,0,4.4,5.6,0,0,TAU); ctx.fill();
      ctx.fillStyle=hexA(P.accent,0.6);
      ctx.beginPath(); ctx.arc(1.2,-1.5,0.9,0,TAU); ctx.fill();
      ctx.restore(); }
    ctx.restore();
  },
  _hatches:[],
  onTap(x,y,P,tNow){ this._hatches.push({x,y,at:tNow}); if(this._hatches.length>5) this._hatches.shift(); },
  overlay(ctx,t,P,zH){
    const g=ctx.createLinearGradient(0,zH,0,zH-200);             // warm floor glow
    g.addColorStop(0,hexA(P.accent,0.14+Math.sin(t*1.3)*0.04));
    g.addColorStop(1,hexA(P.accent,0));
    ctx.fillStyle=g; ctx.fillRect(0,zH-200,G.UNIT_W,200);
    ctx.lineWidth=1.5;                                           // heat shimmer bands
    for(let i=0;i<3;i++){ const yy=(((i/3)*zH-t*24)%zH+zH)%zH;
      ctx.strokeStyle='rgba(255,220,190,0.05)';
      ctx.beginPath();
      for(let x=0;x<=G.UNIT_W;x+=26)
        ctx[x?'lineTo':'moveTo'](x,yy+Math.sin(x*0.05+t*3+i*2)*4);
      ctx.stroke();
    }
    for(const h of this._hatches){                               // tap: hatch burst
      const age=t-h.at; if(age<0||age>1.6) continue;
      const al=1-age/1.6;
      ctx.strokeStyle=hexA(P.accent,0.6*al); ctx.lineWidth=2.4;  // smoke ring pop
      ctx.beginPath(); ctx.ellipse(h.x,h.y-age*30,6+age*30,(6+age*30)*0.4,0,0,TAU); ctx.stroke();
      for(let i=0;i<6;i++){ const a=i/6*TAU+h.x;                 // spark shower
        FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,215,120,'+(0.8*al)+')';
          ctx.beginPath();
          ctx.arc(h.x+Math.cos(a)*age*44,h.y+Math.sin(a)*age*30-age*24,2,0,TAU); ctx.fill(); });
      }
      ctx.fillStyle='#ffd23e'; ctx.globalAlpha=al;               // hatchling pops up
      ctx.beginPath(); ctx.arc(h.x,h.y-age*34,4.4,0,TAU); ctx.fill();
      FX.eyes(ctx,h.x,h.y-age*34-1.2,1,h.x,t);
      ctx.globalAlpha=1;
    }
  },
});
