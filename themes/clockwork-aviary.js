'use strict';
/* ============================================================
   THEME PACK — CLOCKWORK AVIARY
   Brass gears in the walls, swinging pendulums, wind-up birds
   with turning keys, cuckoo doors, floating cogs.
   ============================================================ */

/* shared cog painter: n teeth, hub + spindle, rotated by rot */
function CA_cog(ctx,r,n,rot,fill,stroke,lw=2){
  ctx.save(); ctx.rotate(rot);
  ctx.beginPath();
  for(let i=0;i<n*4;i++){
    const seg=i%4, a=((i>>2)+seg*0.25)/n*TAU;
    const rr=(seg===1||seg===2)?r*1.26:r;
    i?ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):ctx.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);
  }
  ctx.closePath();
  if(fill){ ctx.fillStyle=fill; ctx.fill(); }
  if(stroke){ ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); }
  ctx.beginPath(); ctx.arc(0,0,r*0.34,0,TAU);
  if(stroke){ ctx.stroke(); }
  ctx.beginPath(); ctx.arc(0,0,r*0.1,0,TAU);
  ctx.fillStyle=stroke||fill; ctx.fill();
  ctx.restore();
}
/* wind-up key seen from the side, crank spinning about its shaft */
function CA_key(ctx,t,ph,sc=1){
  ctx.save(); ctx.scale(sc,sc);
  const spin=Math.sin(t*4+ph);          // foreshortened crank turn
  ctx.strokeStyle='#ffd977'; ctx.lineWidth=2; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-6,0); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-9,-3.4,3.2*Math.abs(spin)+0.6,3.2,0,0,TAU);
  ctx.moveTo(-9+ (3.2*Math.abs(spin)+0.6),3.4);
  ctx.ellipse(-9,3.4,3.2*Math.abs(spin)+0.6,3.2,0,0,TAU); ctx.stroke();
  ctx.restore();
}

registerTheme({
  id:'clockwork-aviary', name:'CLOCKWORK AVIARY',
  palettes:[
    { hue:40,  bg:['#1c1106','#3d2812'], node:'#ffe1a8', nodeDone:'#ffd977',
      lock:'#6b5636', accent:'#7ce8d5', text:'#ffeed2', veil:'#120a04' },
    { hue:172, bg:['#03201c','#0f3d36'], node:'#8ff5e4', nodeDone:'#ffd977',
      lock:'#3c6b62', accent:'#ffb04d', text:'#e0fff8', veil:'#021410' },
  ],
  motif(ctx,m,t,P){
    const s=m.s, brass='rgba(212,160,70,0.35)', rim='rgba(255,214,140,0.75)';
    if(m.v<0.34){ // meshing gear pair set into the wall
      const w=t*(0.5+m.v)+m.v*9;
      CA_cog(ctx,s*0.3,8,w,brass,rim,2);
      ctx.save(); ctx.translate(s*0.62,s*0.1);
      CA_cog(ctx,s*0.19,5,-w*8/5+0.31,hexA(P.accent,0.28),rim,1.8);
      ctx.restore();
    } else if(m.v<0.67){ // wall pendulum on a bracket
      ctx.strokeStyle=rim; ctx.lineWidth=2.4; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(-s*0.22,-s*0.42); ctx.lineTo(s*0.22,-s*0.42); ctx.stroke();
      ctx.save(); ctx.translate(0,-s*0.42); ctx.rotate(FX.sway(t,1.7,0.5,m.v*11));
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,s*0.62); ctx.stroke();
      const g=ctx.createRadialGradient(-s*0.04,s*0.58,s*0.02,0,s*0.62,s*0.16);
      g.addColorStop(0,'rgba(255,230,170,0.9)'); g.addColorStop(1,brass);
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,s*0.62,s*0.15,0,TAU); ctx.fill();
      ctx.strokeStyle=rim; ctx.lineWidth=1.6; ctx.stroke();
      ctx.restore();
    } else { // cuckoo door — a tenant peeks out on a cycle
      const open=Math.max(0,Math.sin(t*0.9+m.v*23));
      ctx.fillStyle='rgba(90,55,25,0.55)'; ctx.strokeStyle=rim; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(-s*0.3,-s*0.34); ctx.lineTo(0,-s*0.56); ctx.lineTo(s*0.3,-s*0.34);
      ctx.lineTo(s*0.3,s*0.3); ctx.lineTo(-s*0.3,s*0.3); ctx.closePath(); ctx.fill(); ctx.stroke();
      if(open>0.12){ ctx.save(); ctx.translate(0,-s*0.02);
        ctx.fillStyle=P.accent; ctx.globalAlpha=0.9;
        ctx.beginPath(); ctx.arc(0,-open*s*0.13,s*0.14,0,TAU); ctx.fill(); ctx.globalAlpha=1;
        ctx.fillStyle='#ffd977'; ctx.beginPath();
        ctx.moveTo(s*0.1,-open*s*0.13); ctx.lineTo(s*0.22,-open*s*0.1); ctx.lineTo(s*0.1,-open*s*0.13+s*0.06); ctx.fill();
        FX.eyes(ctx,0,-open*s*0.13-s*0.03,s*0.028,m.v,t);
        ctx.restore(); }
      ctx.save(); ctx.translate(-s*0.3,0); ctx.scale(Math.max(0.06,1-open),1); // swinging door
      ctx.fillStyle='rgba(140,90,40,0.8)'; ctx.strokeStyle=rim; ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.rect(0,-s*0.2,s*0.6,s*0.4); ctx.fill(); ctx.stroke();
      ctx.restore();
    }
  },
  nodeBody(ctx,r,t,P,st){ // counter-rotating gear halo
    const c1=st.done?'rgba(255,217,119,0.5)':'rgba(255,214,140,0.42)';
    CA_cog(ctx,r*0.98,10,t*0.45,st.done?'rgba(255,217,119,0.16)':'rgba(212,160,70,0.16)',c1,1.8);
    CA_cog(ctx,r*0.74,8,-t*0.45*10/8,null,hexA(P.accent,st.cur?0.55:0.3),1.5);
  },
  critter(ctx,i,t,P,zH){
    if(i<2){ // wind-up birds hopping across, keys cranking
      const x=FX.crossing(t,26+i*13,G.UNIT_W,i*0.47);
      const hop=Math.abs(Math.sin(t*5.2+i*2));
      const y=zH*(0.78-i*0.42)-hop*7;
      ctx.save(); ctx.translate(x,y); if(i%2)ctx.scale(-1,1);
      ctx.rotate(Math.sin(t*5.2+i*2)*0.09);
      CA_key(ctx,t,i*3,0.9);
      ctx.fillStyle=i?P.accent:'#e8a24a'; ctx.globalAlpha=0.92;
      ctx.beginPath(); ctx.ellipse(0,0,7.5,5.5,0,0,TAU); ctx.fill();       // tin body
      ctx.beginPath(); ctx.arc(6.5,-4,3.4,0,TAU); ctx.fill();              // head
      ctx.globalAlpha=1;
      ctx.strokeStyle='rgba(60,35,10,0.7)'; ctx.lineWidth=1.5;             // rivet seam
      ctx.beginPath(); ctx.moveTo(-2,-5); ctx.quadraticCurveTo(0,0,-2,5); ctx.stroke();
      ctx.fillStyle='#ffd977';
      ctx.beginPath(); ctx.moveTo(9.4,-4.4); ctx.lineTo(13,-3.4); ctx.lineTo(9.4,-2.2); ctx.fill();
      ctx.fillStyle=i?'#e8a24a':P.accent;                                  // stubby wing flicks
      ctx.beginPath(); ctx.ellipse(-1,-3,4.6,2,-0.6-FX.flap(t,10,0.4,i),0,TAU); ctx.fill();
      FX.eyes(ctx,6.5,-4.8,0.9,i+2,t);
      ctx.strokeStyle='#ffd977'; ctx.lineWidth=1.6; ctx.lineCap='round';   // stick legs
      for(const l of [-2,2]){ ctx.beginPath(); ctx.moveTo(l,5); ctx.lineTo(l+1,8+hop*2); ctx.stroke(); }
      ctx.restore();
    } else if(i===2){ // escaped cog floating up the aviary
      const y=FX.rise(t,24,zH,0.35), x=205+FX.bob(t,0.9,26,4);
      ctx.save(); ctx.translate(x,y); ctx.globalAlpha=0.85;
      CA_cog(ctx,9,7,t*1.3,'rgba(212,160,70,0.4)','rgba(255,214,140,0.85)',1.8);
      FX.eyes(ctx,0,-1,1.1,7,t,'#3a2410');
      ctx.restore(); ctx.globalAlpha=1;
    } else { // brass hummingbird patrolling on tiny sprung wings
      const [wx,wy]=FX.wander(t,5.2,85,95,0.42);
      const x=180+wx, y=zH*0.4+wy, f=FX.flap(t,22,0.7,3);
      ctx.save(); ctx.translate(x,y); ctx.rotate(FX.sway(t,0.8,0.2,3));
      CA_key(ctx,t,7,0.7);
      ctx.fillStyle=P.accent; ctx.globalAlpha=0.9;
      ctx.beginPath(); ctx.ellipse(0,0,5.5,4,0,0,TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(4.8,-2.6,2.6,0,TAU); ctx.fill(); ctx.globalAlpha=1;
      ctx.fillStyle='#ffd977';
      ctx.beginPath(); ctx.moveTo(7,-3); ctx.lineTo(10.4,-2.4); ctx.lineTo(7,-1.6); ctx.fill();
      ctx.fillStyle='rgba(255,230,170,0.85)';
      ctx.beginPath(); ctx.ellipse(-0.5,-3,4.4,1.8,-0.7-f,0,TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-0.5,-3,4.4,1.8,-0.2+f,0,TAU); ctx.fill();
      FX.eyes(ctx,4.8,-3.2,0.8,9,t);
      ctx.restore();
    }
  },
  drifter(ctx,d,t,P){ // loose cog spinning as it rises
    ctx.save(); ctx.globalAlpha=0.55;
    CA_cog(ctx,d.s*0.14,5,t*(1.2+d.ph*0.3)*(d.ph%1<0.5?1:-1),
      'rgba(212,160,70,0.35)','rgba(255,214,140,0.7)',1.5);
    ctx.restore();
  },
  hero(ctx,t,P,zH){ // the Grand Cuckoo Clock — postcard of the zone
    const swing=FX.sway(t,2.1,0.42), pop=Math.max(0,Math.sin(t*0.7));
    ctx.save();
    ctx.save(); ctx.translate(0,-6); ctx.rotate(swing);                 // pendulum behind
    ctx.strokeStyle='rgba(255,214,140,0.8)'; ctx.lineWidth=2.6; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,42); ctx.stroke();
    ctx.fillStyle='rgba(255,217,119,0.85)';
    ctx.beginPath(); ctx.arc(0,44,7.5,0,TAU); ctx.fill(); ctx.restore();
    ctx.fillStyle='rgba(96,58,26,0.9)'; ctx.strokeStyle='rgba(255,214,140,0.85)'; ctx.lineWidth=2.6;
    ctx.beginPath(); ctx.moveTo(-24,-14); ctx.lineTo(0,-38); ctx.lineTo(24,-14);  // chalet
    ctx.lineTo(24,18); ctx.lineTo(-24,18); ctx.closePath(); ctx.fill(); ctx.stroke();
    for(const e of [-1,1]){ ctx.save(); ctx.translate(e*29,-2);          // side gears turning
      CA_cog(ctx,7,6,t*0.8*e,'rgba(212,160,70,0.45)','rgba(255,214,140,0.8)',1.6); ctx.restore(); }
    ctx.fillStyle='#f7ecd2'; ctx.beginPath(); ctx.arc(0,4,11,0,TAU); ctx.fill();  // dial + hands
    ctx.strokeStyle='#4a3010'; ctx.lineWidth=2; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(0,4); ctx.lineTo(Math.cos(t*1.4-1.57)*8,4+Math.sin(t*1.4-1.57)*8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,4); ctx.lineTo(Math.cos(t*0.117-1.57)*5,4+Math.sin(t*0.117-1.57)*5); ctx.stroke();
    ctx.save(); ctx.translate(0,-22);                                   // cuckoo pops the hatch
    if(pop>0.1){ ctx.translate(0,-1); ctx.fillStyle=P.accent;
      ctx.beginPath(); ctx.arc(0,-pop*7,5.5,0,TAU); ctx.fill();
      ctx.fillStyle='#ffd977'; ctx.beginPath();
      ctx.moveTo(4,-pop*7); ctx.lineTo(8.6,-pop*7+1.4); ctx.lineTo(4,-pop*7+2.6); ctx.fill();
      FX.eyes(ctx,0,-pop*7-1.4,1.1,3,t); }
    ctx.fillStyle='rgba(140,90,40,0.95)'; ctx.strokeStyle='rgba(255,214,140,0.8)'; ctx.lineWidth=1.6;
    ctx.beginPath(); ctx.rect(-6,Math.min(2,pop*9-4),12,6); ctx.fill(); ctx.stroke();
    ctx.restore(); ctx.restore();
  },
  _springs:[],
  onTap(x,y,P,tNow){ this._springs.push({x,y,at:tNow}); if(this._springs.length>6) this._springs.shift(); },
  overlay(ctx,t,P,zH){
    ctx.save(); ctx.globalAlpha=0.06; ctx.translate(40,zH*0.22);        // ghost gear in the wall
    CA_cog(ctx,58,12,t*0.12,null,P.text,3.5);
    ctx.restore(); ctx.globalAlpha=1;
    for(const sp of this._springs){                                      // tapped springs go BOING
      const age=t-sp.at; if(age<0||age>1.5) continue;
      const k=1-age/1.5, stretch=14+Math.abs(Math.sin(age*11))*16*k;
      ctx.save(); ctx.translate(sp.x,sp.y); ctx.globalAlpha=Math.min(0.9,k+0.2);
      ctx.strokeStyle='#ffd977'; ctx.lineWidth=2; ctx.lineCap='round';
      ctx.beginPath();
      for(let i=0;i<=12;i++) ctx.lineTo((i%2?5:-5)*k,-i/12*stretch);
      ctx.stroke();
      CA_cog(ctx,4.5,5,age*9,null,hexA(P.accent,0.8*k),1.5);
      ctx.restore();
    }
    ctx.globalAlpha=1;
  },
});
