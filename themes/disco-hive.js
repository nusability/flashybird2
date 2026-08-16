'use strict';
/* ================= THEME PACK — DISCO HIVE =================
   Honeycomb dance floor, bee-birds in shades, mirror-ball
   flowers, sparkling honey. The hive is OPEN tonight.
   =========================================================== */
registerTheme({
  id:'disco-hive', name:'DISCO HIVE',
  palettes:[
    { hue:45,  bg:['#200e02','#3a2004'], node:'#ffd46e', nodeDone:'#ffd977',
      lock:'#6b5433', accent:'#ff5fa8', text:'#fff3d8', veil:'#140901' },
    { hue:275, bg:['#170529','#2e0a45'], node:'#c98bff', nodeDone:'#ffd977',
      lock:'#584070', accent:'#3affd4', text:'#f3e7ff', veil:'#0c0218' },
  ],
  _hex(ctx,r){ ctx.beginPath();
    for(let i=0;i<6;i++){ const a=i/6*TAU+Math.PI/6;
      ctx[i?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r); }
    ctx.closePath(); },
  motif(ctx,m,t,P){
    const s=m.s;
    if(m.v<0.34){ // honeycomb dance-floor cluster, cells light up in sequence
      const cells=[[0,0],[0.95,0.55],[-0.95,0.55],[0.95,-0.55],[-0.95,-0.55],[0,1.1],[0,-1.1]];
      const step=Math.floor(t*3+m.v*20)%cells.length;
      for(let i=0;i<cells.length;i++){
        const hot=i===step, r=s*0.3;
        ctx.save(); ctx.translate(cells[i][0]*s*0.56,cells[i][1]*s*0.56);
        this._hex(ctx,r*(hot?FX.pulse(t,10,0.1,i):1));
        ctx.fillStyle=hot?hexA(P.accent,0.75):'rgba(255,200,80,0.16)'; ctx.fill();
        ctx.strokeStyle=hot?P.text:'rgba(255,210,110,0.5)'; ctx.lineWidth=hot?2.2:1.5; ctx.stroke();
        ctx.restore();
      }
    } else if(m.v<0.67){ // mirror-ball flower: spinning facet head throwing dots
      ctx.save(); ctx.rotate(FX.sway(t,0.9,0.1,m.v*7));
      ctx.strokeStyle='rgba(140,230,110,0.7)'; ctx.lineWidth=2.4; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(0,s*0.55); ctx.quadraticCurveTo(FX.bob(t,1.3,4,m.v),s*0.2,0,-s*0.05); ctx.stroke();
      ctx.translate(0,-s*0.3); const R=s*0.26, spin=t*(m.v>0.5?1.6:-1.3)+m.v*9;
      for(let i=0;i<6;i++){ const a=i/6*TAU+spin*0.5, d=R+s*0.24+Math.sin(t*5+i)*s*0.06;
        ctx.fillStyle=i%2?P.accent:P.text; ctx.globalAlpha=0.7;
        ctx.beginPath(); ctx.arc(Math.cos(a)*d,Math.sin(a)*d,1.8,0,TAU); ctx.fill(); }
      ctx.globalAlpha=0.9; ctx.fillStyle='rgba(210,225,255,0.35)';
      ctx.beginPath(); ctx.arc(0,0,R,0,TAU); ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,0.65)'; ctx.lineWidth=1.5;
      for(let i=-2;i<=2;i++){ const x=Math.sin(spin+i*0.7)*R;
        ctx.beginPath(); ctx.ellipse(0,0,Math.abs(x)*0.9+0.5,R,0,0,TAU); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(0,0,R,0,TAU); ctx.stroke();
      ctx.restore(); ctx.globalAlpha=1;
    } else { // honey drip that stretches, drops a sparkling bead
      const ph=(t*0.55+m.v*5)%1, stretch=ph<0.7?ph/0.7:0;
      ctx.fillStyle='rgba(255,190,60,0.75)';
      ctx.beginPath(); ctx.ellipse(0,0,s*0.3,s*0.14,0,0,Math.PI); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-s*0.1,s*0.02);
      ctx.quadraticCurveTo(0,s*(0.15+stretch*0.5),s*0.1,s*0.02); ctx.fill();
      const by=ph<0.7?s*(0.2+stretch*0.5):s*0.7+(ph-0.7)/0.3*s*0.9;
      ctx.beginPath(); ctx.arc(0,by,s*0.09,0,TAU); ctx.fill();
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,255,220,'+(0.5+Math.sin(t*7+m.v*9)*0.4)+')';
        ctx.beginPath(); ctx.arc(s*0.04,by-s*0.03,1.6,0,TAU); ctx.fill(); });
      FX.eyes(ctx,0,-s*0.04,s*0.035,m.v,t,'rgba(90,40,0,0.8)');
    }
  },
  nodeBody(ctx,r,t,P,st){ // spinning honeycomb cell halo with corner strobes
    ctx.save(); ctx.rotate(t*0.6);
    this._hex(ctx,r*1.28);
    ctx.fillStyle=st.done?'rgba(255,217,119,0.22)':hexA(P.accent,0.14); ctx.fill();
    ctx.strokeStyle=st.done?'rgba(255,217,119,0.8)':hexA(P.node,0.8);
    ctx.lineWidth=2.2; ctx.stroke();
    const step=Math.floor(t*6)%6;
    for(let i=0;i<6;i++){ const a=i/6*TAU+Math.PI/6;
      ctx.fillStyle=i===step?P.text:hexA(P.accent,0.5);
      ctx.beginPath(); ctx.arc(Math.cos(a)*r*1.28,Math.sin(a)*r*1.28,i===step?2.6:1.6,0,TAU); ctx.fill(); }
    ctx.restore();
  },
  critter(ctx,i,t,P,zH){
    if(i<2){ // bee-birds in sunglasses commuting on a bassline (roamers)
      const x=FX.crossing(t,34+i*13,G.UNIT_W,i*0.47);
      const y=140+i*(zH-320)+Math.abs(Math.sin(t*4.4+i*2))*-16+FX.bob(t,1.2,8,i);
      const f=FX.flap(t,11,0.5,i);
      ctx.save(); ctx.translate(x,y); if(i%2)ctx.scale(-1,1);
      ctx.fillStyle='#ffcf3e'; ctx.beginPath(); ctx.ellipse(0,0,7.5,5,0,0,TAU); ctx.fill();
      ctx.fillStyle='#221a08';
      for(const sx of [-3,1]){ ctx.beginPath(); ctx.ellipse(sx,0,1.7,4.6,0,0,TAU); ctx.fill(); }
      ctx.fillStyle='rgba(210,235,255,0.8)';
      ctx.beginPath(); ctx.ellipse(-1,-4,5.5,2.6,-0.6-f,0,TAU); ctx.fill();
      ctx.fillStyle='#ffcf3e'; ctx.beginPath(); ctx.arc(7,-2.5,3.4,0,TAU); ctx.fill();
      ctx.fillStyle='#111'; // tiny sunglasses
      ctx.beginPath(); ctx.arc(6.4,-3.2,1.5,0,TAU); ctx.arc(9,-3.2,1.5,0,TAU); ctx.fill();
      ctx.strokeStyle='#111'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(7.4,-3.2); ctx.lineTo(8,-3.2); ctx.stroke();
      ctx.fillStyle=P.accent;
      ctx.beginPath(); ctx.moveTo(10,-2.2); ctx.lineTo(12.6,-1.4); ctx.lineTo(10,-0.6); ctx.fill();
      ctx.restore();
    } else if(i===2){ // honey bubble rider floating up the zone (roamer)
      const y=FX.rise(t,26,zH,0.35), x=250+FX.bob(t,0.9,34,2);
      ctx.save(); ctx.translate(x,y);
      ctx.strokeStyle='rgba(255,220,120,0.7)'; ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.arc(0,0,10+FX.bob(t,3,0.8),0,TAU); ctx.stroke();
      ctx.fillStyle='#ffcf3e'; ctx.beginPath(); ctx.ellipse(0,1,4.6,3.4,0,0,TAU); ctx.fill();
      ctx.fillStyle='#221a08'; ctx.beginPath(); ctx.ellipse(-1,1,1.2,3,0,0,TAU); ctx.fill();
      FX.eyes(ctx,1,-1,1,0.6,t);
      ctx.restore();
    } else { // wandering dance-bee busting moves across the floor (roamer)
      const [wx,wy]=FX.wander(t,5.1,90,110,0.45);
      const x=180+wx, y=zH*0.55+wy, arm=Math.sin(t*6)*0.9;
      ctx.save(); ctx.translate(x,y); ctx.rotate(FX.sway(t,3,0.25,3));
      FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.2);
        ctx.beginPath(); ctx.arc(0,0,10,0,TAU); ctx.fill(); });
      ctx.fillStyle='#ffcf3e'; ctx.beginPath(); ctx.ellipse(0,0,5,6.4,0,0,TAU); ctx.fill();
      ctx.fillStyle='#221a08'; ctx.beginPath(); ctx.ellipse(0,1.4,4.6,1.5,0,0,TAU); ctx.fill();
      ctx.strokeStyle='#ffcf3e'; ctx.lineWidth=2; ctx.lineCap='round'; // disco arms
      ctx.beginPath(); ctx.moveTo(-4,-1); ctx.lineTo(-8,-5-arm*3); ctx.moveTo(4,-1); ctx.lineTo(8,-5+arm*3); ctx.stroke();
      FX.eyes(ctx,0,-3,1.1,0.2,t);
      ctx.restore();
    }
  },
  drifter(ctx,d,t,P){ // rising honey-glitter mote
    FX.glow(ctx,()=>{ const tw=0.35+Math.sin(t*5+d.ph*3)*0.3;
      ctx.fillStyle=d.ph%1<0.5?'rgba(255,205,80,'+tw+')':hexA(P.accent,tw);
      ctx.save(); ctx.rotate(t*1.5+d.ph); ctx.fillRect(-d.s*0.09,-d.s*0.09,d.s*0.18,d.s*0.18); ctx.restore(); });
  },
  hero(ctx,t,P,zH){ // the queen's DJ booth: turntable, EQ bars, royal headbob
    ctx.save(); ctx.translate(0,FX.bob(t,1.1,3));
    ctx.fillStyle='rgba(30,16,4,0.75)'; ctx.fillRect(-30,-6,60,26); // booth
    ctx.strokeStyle=hexA(P.accent,0.8); ctx.lineWidth=2; ctx.strokeRect(-30,-6,60,26);
    for(let i=0;i<6;i++){ const h=4+Math.abs(Math.sin(t*5+i*1.9))*12; // EQ bars
      ctx.fillStyle=i%2?P.accent:'#ffcf3e'; ctx.globalAlpha=0.85;
      ctx.fillRect(-24+i*8.4,16-h,5,h); }
    ctx.globalAlpha=1;
    ctx.save(); ctx.translate(14,-1); ctx.rotate(t*2.6); // spinning record
    ctx.fillStyle='#191919'; ctx.beginPath(); ctx.arc(0,0,7.5,0,TAU); ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,0.4)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(0,0,5,0,TAU); ctx.stroke();
    ctx.fillStyle=P.accent; ctx.beginPath(); ctx.arc(0,0,2,0,TAU); ctx.fill();
    ctx.restore();
    ctx.save(); ctx.translate(-12,-14); ctx.rotate(FX.sway(t,5,0.16)); // queen bee DJ
    ctx.fillStyle='#ffcf3e'; ctx.beginPath(); ctx.ellipse(0,0,7,8.5,0,0,TAU); ctx.fill();
    ctx.fillStyle='#221a08';
    for(const sy of [-2,3]){ ctx.beginPath(); ctx.ellipse(0,sy,6.6,1.8,0,0,TAU); ctx.fill(); }
    ctx.fillStyle='#111'; // wraparound shades
    ctx.beginPath(); ctx.ellipse(-2.6,-5.4,2,1.6,0,0,TAU); ctx.ellipse(2.6,-5.4,2,1.6,0,0,TAU); ctx.fill();
    ctx.fillRect(-2.6,-6,5.2,1.4);
    ctx.fillStyle='#ffd977'; // crown
    ctx.beginPath(); ctx.moveTo(-4.5,-9); ctx.lineTo(-4.5,-12.5); ctx.lineTo(-2.2,-10.4);
    ctx.lineTo(0,-13.4); ctx.lineTo(2.2,-10.4); ctx.lineTo(4.5,-12.5); ctx.lineTo(4.5,-9);
    ctx.closePath(); ctx.fill();
    ctx.restore(); ctx.restore();
  },
  _drops:[],
  onTap(x,y,P,tNow){ this._drops.push({x,y,at:tNow}); if(this._drops.length>6) this._drops.shift(); },
  overlay(ctx,t,P,zH){ // sweeping club beams + tapped honey-firework cells
    for(let i=0;i<3;i++){ const a=Math.PI*0.5+Math.sin(t*0.7+i*2.1)*0.55;
      ctx.save(); ctx.translate(65+i*130,-10); ctx.rotate(a-Math.PI*0.5);
      const lg=ctx.createLinearGradient(0,0,0,zH*0.8);
      lg.addColorStop(0,hexA(i%2?P.accent:P.node,0.12)); lg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lg; ctx.beginPath();
      ctx.moveTo(0,0); ctx.lineTo(-30,zH*0.8); ctx.lineTo(30,zH*0.8); ctx.closePath(); ctx.fill();
      ctx.restore(); }
    for(const b of this._drops){ // taps bloom into strobing honeycomb rings
      const age=t-b.at; if(age<0||age>1.6) continue;
      const al=(1-age/1.6)*0.8, step=Math.floor(t*9)%6;
      ctx.save(); ctx.translate(b.x,b.y); ctx.rotate(age*1.2);
      for(let i=0;i<6;i++){ const a=i/6*TAU, r=14+age*46;
        ctx.save(); ctx.translate(Math.cos(a)*r,Math.sin(a)*r);
        this._hex(ctx,5);
        ctx.strokeStyle=i===step?hexA(P.accent,al):'rgba(255,210,110,'+al*0.6+')';
        ctx.lineWidth=1.6; ctx.stroke(); ctx.restore(); }
      ctx.restore();
    }
    ctx.globalAlpha=1;
  },
});
