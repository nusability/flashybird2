'use strict';
/* ============================================================
   THEME PACK — SPACE KOI POND
   Koi fish drifting between lily-pad planets, ripple rings in
   the void, lotus lanterns, a sleepy moon reflected in nothing.
   ============================================================ */

/* shared koi painter: undulating spine of discs + flowing tail */
function drawSpaceKoi(ctx,t,sz,ph,col,spot){
  const w=k=>Math.sin(t*5.2+ph-k*1.5)*sz*0.15;
  ctx.fillStyle=col; ctx.globalAlpha=0.92;
  for(let k=0;k<=6;k++){ const r=sz*(0.30-k*0.037);
    ctx.beginPath(); ctx.arc(-k*sz*0.21,w(k),r,0,TAU); ctx.fill(); }
  const tx=-6*sz*0.21, ty=w(6), fl=Math.sin(t*5.2+ph-9.5)*0.5;
  ctx.beginPath(); ctx.moveTo(tx,ty);                       // flowing tail veil
  ctx.quadraticCurveTo(tx-sz*0.5,ty-sz*0.34+fl*sz*0.3,tx-sz*0.66,ty+fl*sz*0.42);
  ctx.quadraticCurveTo(tx-sz*0.38,ty+sz*0.3,tx,ty); ctx.fill();
  for(const e of [-1,1]){                                    // rippling side fins
    ctx.beginPath();
    ctx.ellipse(-sz*0.26,w(1)+e*sz*0.26,sz*0.2,sz*0.09,e*(0.7+fl*0.4),0,TAU); ctx.fill(); }
  ctx.fillStyle=spot;                                        // koi patches
  ctx.beginPath(); ctx.arc(-sz*0.2,w(1)-sz*0.08,sz*0.11,0,TAU); ctx.fill();
  ctx.beginPath(); ctx.arc(-sz*0.72,w(3)+sz*0.05,sz*0.085,0,TAU); ctx.fill();
  ctx.globalAlpha=1;
  FX.eyes(ctx,sz*0.1,-sz*0.09,sz*0.05,ph,t,'#101828');
}

registerTheme({
  id:'space-koi', name:'SPACE KOI POND',
  palettes:[
    { hue:195, bg:['#050a22','#0c2440'], node:'#8fe8ff', nodeDone:'#ffd977',
      lock:'#3a5570', accent:'#ff9d5c', text:'#e8f7ff', veil:'#030614' },
    { hue:330, bg:['#1c0418','#3d1030'], node:'#ffb3d9', nodeDone:'#ffe08a',
      lock:'#5f3350', accent:'#7dffd4', text:'#ffe9f4', veil:'#10030e' },
  ],
  motif(ctx,m,t,P){
    const s=m.s;
    if(m.v<0.34){ // lily-pad planet with a saturn ring and a moonlet
      ctx.save(); ctx.rotate(FX.sway(t,0.6,0.1,m.v*8));
      const grow=FX.pulse(t,1.4,0.05,m.v*7); ctx.scale(grow,grow);
      ctx.strokeStyle=hexA(P.node,0.35); ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.ellipse(0,0,s*0.62,s*0.2,0.3,0,TAU); ctx.stroke();
      const a0=m.v*9;
      ctx.fillStyle='rgba(90,220,160,0.45)';
      ctx.beginPath(); ctx.moveTo(0,0);
      ctx.arc(0,0,s*0.42,a0,a0+TAU-0.7); ctx.closePath(); ctx.fill();
      ctx.strokeStyle='rgba(190,255,220,0.5)'; ctx.lineWidth=1.5;
      for(let k=0;k<3;k++){ const a=a0+0.6+k*1.5;
        ctx.beginPath(); ctx.moveTo(0,0);
        ctx.lineTo(Math.cos(a)*s*0.36,Math.sin(a)*s*0.36); ctx.stroke(); }
      const [ox,oy]=FX.orbit(t,1.1,s*0.62,m.v*11);           // busy moonlet
      ctx.fillStyle=hexA(P.accent,0.85);
      ctx.beginPath(); ctx.arc(ox,oy*0.32,s*0.07,0,TAU); ctx.fill();
      ctx.restore();
    } else if(m.v<0.67){ // ripple rings spreading through the void
      for(let i=0;i<3;i++){ const p=(t*0.35+i/3+m.v)%1;
        ctx.strokeStyle=hexA(P.node,(1-p)*0.4); ctx.lineWidth=1.8;
        ctx.beginPath(); ctx.ellipse(0,0,(0.12+p*0.5)*s,(0.12+p*0.5)*s*0.45,0,0,TAU); ctx.stroke(); }
      ctx.fillStyle=hexA(P.text,0.5+Math.sin(t*3+m.v*9)*0.3);
      ctx.beginPath(); ctx.arc(0,0,s*0.05,0,TAU); ctx.fill();
    } else { // lotus lantern, warm and flickery, with a shy face
      ctx.save(); ctx.translate(0,FX.bob(t,1.1,3,m.v*13));
      const fl=FX.pulse(t,7,0.15,m.v*13);
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,190,110,0.16)';
        ctx.beginPath(); ctx.arc(0,-s*0.1,s*0.5*fl,0,TAU); ctx.fill(); });
      ctx.fillStyle='rgba(255,150,190,0.55)';
      for(let k=-2;k<=2;k++){ ctx.save(); ctx.rotate(k*0.5+FX.sway(t,1.6,0.05,k+m.v*7));
        ctx.beginPath(); ctx.moveTo(0,s*0.12);
        ctx.quadraticCurveTo(s*0.16,-s*0.16,0,-s*0.4);
        ctx.quadraticCurveTo(-s*0.16,-s*0.16,0,s*0.12); ctx.fill(); ctx.restore(); }
      ctx.fillStyle='#ffe9b0'; ctx.globalAlpha=0.5+fl*0.35;
      ctx.beginPath(); ctx.arc(0,-s*0.08,s*0.1,0,TAU); ctx.fill(); ctx.globalAlpha=1;
      FX.eyes(ctx,0,-s*0.09,s*0.028,m.v,t,'#5b3b10');
      ctx.restore();
    }
  },
  nodeBody(ctx,r,t,P,st){ // pond ripples spreading from every level node
    ctx.save(); ctx.rotate(FX.sway(t,0.5,0.2,r));
    ctx.fillStyle=st.done?'rgba(255,217,119,0.22)':'rgba(90,220,160,0.28)';
    ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,r*1.28,0.35,TAU-0.35);
    ctx.closePath(); ctx.fill(); ctx.restore();
    for(let i=0;i<3;i++){ const p=(t*0.45+i/3)%1;
      ctx.strokeStyle=hexA(st.done?P.nodeDone:P.node,(1-p)*(st.cur?0.55:0.35));
      ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(0,0,r*(0.75+p*0.85),0,TAU); ctx.stroke(); }
  },
  critter(ctx,i,t,P,zH){
    if(i<2){ // two koi commuting across the void in lazy S-curves
      const sz=15+i*5, x=FX.crossing(t,30-i*8,G.UNIT_W,i*0.47);
      const ph=x*0.018+i*2.6, y=130+i*(zH-300)+Math.sin(ph)*36;
      ctx.save(); ctx.translate(i%2?G.UNIT_W-x:x,y);
      if(i%2) ctx.scale(-1,1);
      ctx.rotate(Math.cos(ph)*0.5);
      drawSpaceKoi(ctx,t,sz,i*3.1,i?P.accent:'#f2f4ff',i?'#ffd977':P.accent);
      ctx.restore();
    } else if(i===2){ // tadpole comet wriggling up through the pond
      const y=FX.rise(t,36,zH,0.35), x=305+FX.bob(t,0.9,20,4);
      ctx.save(); ctx.translate(x,y);
      ctx.strokeStyle=hexA(P.accent,0.6); ctx.lineWidth=2.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(0,4);
      ctx.quadraticCurveTo(Math.sin(t*8)*6,12,Math.sin(t*8+1.5)*4,20); ctx.stroke();
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(170,235,255,0.3)';
        ctx.beginPath(); ctx.arc(0,0,9,0,TAU); ctx.fill(); });
      ctx.fillStyle='#bfe9ff'; ctx.beginPath(); ctx.arc(0,0,5,0,TAU); ctx.fill();
      FX.eyes(ctx,0,-1,1.3,2.2,t);
      ctx.restore();
    } else { // sleepy frog drifting on a runaway lily pad
      const [wx,wy]=FX.wander(t,5.1,80,70,0.35);
      ctx.save(); ctx.translate(190+wx,zH*0.62+wy); ctx.rotate(FX.sway(t,0.8,0.08,2));
      ctx.fillStyle='rgba(90,220,160,0.8)';
      ctx.beginPath(); ctx.ellipse(0,5,15,6,0,0,TAU); ctx.fill();
      ctx.strokeStyle='rgba(200,255,225,0.6)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(3,5); ctx.lineTo(14,3); ctx.stroke();
      const th=FX.pulse(t,3,0.12,1);
      ctx.fillStyle='hsl(140,55%,58%)';
      ctx.beginPath(); ctx.ellipse(-2,-3,6.5*th,5.5,0,0,TAU); ctx.fill();
      for(const e of [-1,1]){ ctx.beginPath(); ctx.arc(-2+e*4,-8,2.4,0,TAU); ctx.fill(); }
      FX.eyes(ctx,-2,-8,1.2,3.7,t);
      ctx.fillStyle='rgba(255,140,150,0.5)';
      for(const e of [-1,1]){ ctx.beginPath(); ctx.arc(-2+e*5,-4,1.4,0,TAU); ctx.fill(); }
      ctx.restore();
    }
  },
  drifter(ctx,d,t,P){ // lotus petals and pond bubbles rising forever
    if(d.ph%1<0.55){
      ctx.save(); ctx.rotate(d.ph+FX.sway(t,1.3,0.8,d.ph));
      ctx.fillStyle='rgba(255,170,205,0.45)';
      ctx.beginPath(); ctx.moveTo(0,d.s*0.2);
      ctx.quadraticCurveTo(d.s*0.18,-d.s*0.1,0,-d.s*0.34);
      ctx.quadraticCurveTo(-d.s*0.18,-d.s*0.1,0,d.s*0.2); ctx.fill();
      ctx.restore();
    } else FX.glow(ctx,()=>{ ctx.strokeStyle='rgba(160,230,255,0.5)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(0,0,d.s*0.14*FX.pulse(t,3,0.15,d.ph),0,TAU); ctx.stroke(); });
  },
  hero(ctx,t,P,zH){ // the sleepy moon, reflected in absolutely nothing
    ctx.save(); ctx.translate(0,FX.bob(t,0.7,5));
    FX.glow(ctx,()=>{ ctx.fillStyle='rgba(245,238,200,0.14)';
      ctx.beginPath(); ctx.arc(0,0,34*FX.pulse(t,1.2,0.06),0,TAU); ctx.fill(); });
    ctx.fillStyle='#f2ecc8';
    ctx.beginPath(); ctx.arc(0,0,24,0,TAU); ctx.fill();
    ctx.fillStyle='rgba(180,170,120,0.4)';                    // dozing craters
    ctx.beginPath(); ctx.arc(-9,-9,3.6,0,TAU); ctx.arc(11,4,2.6,0,TAU); ctx.fill();
    ctx.strokeStyle='#6b5a2c'; ctx.lineWidth=2; ctx.lineCap='round';
    for(const e of [-1,1]){ ctx.beginPath();                  // closed happy eyes
      ctx.arc(e*7,-2,3.4,0.25,Math.PI-0.25); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(0,7,2.6,0.3,Math.PI-0.3); ctx.stroke();
    const zp=(t*0.5)%1;                                       // drifting z z z
    ctx.strokeStyle=hexA(P.text,(1-zp)*0.7); ctx.lineWidth=1.6;
    for(let k=0;k<2;k++){ const zs=3.5+k*1.6;
      ctx.save(); ctx.translate(22+k*8+zp*10,-20-k*8-zp*22); ctx.rotate(0.15);
      ctx.beginPath(); ctx.moveTo(-zs,-zs); ctx.lineTo(zs,-zs);
      ctx.lineTo(-zs,zs); ctx.lineTo(zs,zs); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.translate(0,56); ctx.scale(1,-0.55);      // the reflection
    ctx.globalAlpha=0.13; ctx.fillStyle='#f2ecc8';
    ctx.beginPath(); ctx.arc(Math.sin(t*1.1)*2,0,24,0,TAU); ctx.fill();
    ctx.restore(); ctx.globalAlpha=1;
    ctx.strokeStyle=hexA(P.node,0.25); ctx.lineWidth=1.5;     // water that isn't there
    for(let k=0;k<3;k++){ const p=(t*0.3+k/3)%1;
      ctx.beginPath(); ctx.ellipse(0,42,(10+p*30),(2+p*7)*0.5,0,0,TAU);
      ctx.strokeStyle=hexA(P.node,(1-p)*0.3); ctx.stroke(); }
    ctx.restore();
  },
  _rips:[],
  onTap(x,y,P,tNow){ this._rips.push({x,y,at:tNow}); if(this._rips.length>8) this._rips.shift(); },
  overlay(ctx,t,P,zH){
    ctx.strokeStyle=hexA(P.node,0.06+Math.sin(t*0.8)*0.03);   // faint void currents
    ctx.lineWidth=1.5;
    for(let k=0;k<3;k++){ const y=zH*(0.22+k*0.28)+FX.bob(t,0.5,9,k*2);
      ctx.beginPath();
      for(let x=0;x<=G.UNIT_W;x+=20){ const yy=y+Math.sin(x*0.03+t*0.9+k*2)*6;
        x?ctx.lineTo(x,yy):ctx.moveTo(x,yy); }
      ctx.stroke(); }
    for(const rp of this._rips){ // the pond ripples where you touch it
      const age=t-rp.at; if(age<0||age>1.8) continue;
      for(let i=0;i<3;i++){ const p=age/1.8+i*0.12; if(p>1) continue;
        ctx.strokeStyle=hexA(P.node,(1-p)*0.55); ctx.lineWidth=2.2-i*0.4;
        ctx.beginPath(); ctx.ellipse(rp.x,rp.y,p*54,p*24,0,0,TAU); ctx.stroke(); }
    }
  },
});
