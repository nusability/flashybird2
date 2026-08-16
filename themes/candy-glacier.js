'use strict';
/* ============================================================
   THEME PACK — CANDY GLACIER
   Mint-ice cliffs, gumdrop igloos, aurora ribbons, scarf-wearing
   penguin-birds sledding, peppermint swirls.
   ============================================================ */
registerTheme({
  id:'candy-glacier', name:'CANDY GLACIER',
  palettes:[
    { hue:168, bg:['#04241f','#0a3d3b'], node:'#8effdc', nodeDone:'#ffd977',
      lock:'#3c6a62', accent:'#ff7fae', text:'#eafff7', veil:'#031713' },
    { hue:262, bg:['#160b2e','#2c1450'], node:'#c9a6ff', nodeDone:'#ffcf6e',
      lock:'#544579', accent:'#6effd8', text:'#f1e9ff', veil:'#0d0620' },
  ],
  /* candy-stripe helper: rounded lollipop-striped blob */
  _stripes(ctx,r,t,c1,c2,spin){
    ctx.save(); ctx.rotate(t*spin);
    ctx.fillStyle=c1; ctx.beginPath(); ctx.arc(0,0,r,0,TAU); ctx.fill();
    ctx.fillStyle=c2;
    for(let i=0;i<4;i++){ const a=i/4*TAU;
      ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,r,a,a+TAU/8); ctx.fill(); }
    ctx.restore();
  },
  motif(ctx,m,t,P){
    const s=m.s;
    if(m.v<0.35){ // mint-ice cliff: jagged shard trio with a sleepy face
      ctx.save(); ctx.rotate(FX.sway(t,0.7,0.05,m.v*9));
      const g=ctx.createLinearGradient(0,-s,0,s*0.4);
      g.addColorStop(0,'rgba(142,255,220,0.55)'); g.addColorStop(1,'rgba(60,160,150,0.22)');
      ctx.fillStyle=g;
      ctx.beginPath(); ctx.moveTo(-s*0.55,s*0.35); ctx.lineTo(-s*0.34,-s*0.35);
      ctx.lineTo(-s*0.16,s*0.1); ctx.lineTo(0,-s*(0.8+0.06*Math.sin(t*1.3+m.v*7)));
      ctx.lineTo(s*0.18,s*0.05); ctx.lineTo(s*0.38,-s*0.45); ctx.lineTo(s*0.55,s*0.35);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.lineWidth=1.6; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(0,-s*0.72); ctx.lineTo(-s*0.05,-s*0.2); ctx.stroke(); // glint
      FX.eyes(ctx,0,s*0.08,s*0.04,m.v,t,'rgba(4,40,34,0.75)');
      ctx.restore();
    } else if(m.v<0.7){ // gumdrop igloo: sugar-dusted dome, glowing door, chimney puff
      const jig=FX.pulse(t,1.8,0.035,m.v*11);
      ctx.save(); ctx.scale(jig,1/jig);
      ctx.fillStyle=m.v<0.52?'rgba(255,127,174,0.55)':'rgba(150,120,255,0.5)';
      ctx.beginPath(); ctx.arc(0,s*0.15,s*0.5,Math.PI,0); ctx.closePath(); ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,0.45)'; ctx.lineWidth=1.6; // dome courses
      for(const k of [0.36,0.22]){ ctx.beginPath();
        ctx.arc(0,s*0.15,s*0.5-(0.5-k)*s,Math.PI*1.15,-Math.PI*0.15); ctx.stroke(); }
      ctx.fillStyle='rgba(255,255,255,0.8)'; // sugar-frost cap
      ctx.beginPath(); ctx.arc(0,s*0.15,s*0.5,Math.PI*1.25,Math.PI*1.75); ctx.closePath(); ctx.fill();
      const dg=0.35+0.25*Math.sin(t*2.2+m.v*13); // warm candlelit door
      ctx.fillStyle='rgba(255,220,130,'+dg+')';
      ctx.beginPath(); ctx.arc(0,s*0.15,s*0.16,Math.PI,0); ctx.closePath(); ctx.fill();
      for(let i=0;i<3;i++){ // chimney puffs
        const p=(t*0.5+i/3+m.v)%1;
        ctx.fillStyle='rgba(255,255,255,'+(0.35*(1-p))+')';
        ctx.beginPath(); ctx.arc(s*0.3+Math.sin(p*9+m.v)*3,-s*(0.4+p*0.5),s*0.06+p*s*0.07,0,TAU); ctx.fill(); }
      ctx.restore();
    } else { // peppermint swirl planted on a stick, twirling
      ctx.save();
      ctx.strokeStyle='rgba(255,255,255,0.6)'; ctx.lineWidth=3; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(0,s*0.55); ctx.lineTo(0,s*0.05); ctx.stroke();
      ctx.translate(0,-s*0.2);
      this._stripes(ctx,s*0.32,t,'#fff',P.accent,(m.v>0.85?0.8:-0.7));
      ctx.strokeStyle='rgba(255,255,255,0.85)'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(0,0,s*0.32,0,TAU); ctx.stroke();
      FX.eyes(ctx,0,-s*0.04,s*0.045,m.v,t,'#4c1130');
      ctx.strokeStyle='#4c1130'; ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.arc(0,s*0.07,s*0.07,0.4,Math.PI-0.4); ctx.stroke();
      ctx.restore();
    }
  },
  nodeBody(ctx,r,t,P,st){ // spinning snowflake-candy halo
    ctx.save(); ctx.rotate(t*0.4);
    ctx.strokeStyle=st.done?'rgba(255,217,119,0.5)':hexA(P.node,0.45);
    ctx.lineWidth=2; ctx.lineCap='round';
    for(let i=0;i<6;i++){ const a=i/6*TAU, w=FX.pulse(t,3,0.12,i);
      ctx.beginPath(); ctx.moveTo(Math.cos(a)*r*0.5,Math.sin(a)*r*0.5);
      ctx.lineTo(Math.cos(a)*r*1.05*w,Math.sin(a)*r*1.05*w); ctx.stroke();
      ctx.fillStyle=st.done?'rgba(255,217,119,0.6)':hexA(P.accent,0.55);
      ctx.beginPath(); ctx.arc(Math.cos(a)*r*1.05*w,Math.sin(a)*r*1.05*w,2.4,0,TAU); ctx.fill(); }
    ctx.restore();
  },
  /* scarf-wearing penguin-bird, belly-down on a candy sled */
  _penguin(ctx,t,seed,scarf,tilt){
    ctx.save(); ctx.rotate(tilt);
    ctx.fillStyle='#ffb0c8'; // candy sled runners
    ctx.beginPath(); ctx.roundRect(-11,6,22,3.4,2); ctx.fill();
    ctx.fillStyle='#22303c'; // body
    ctx.beginPath(); ctx.ellipse(0,-1,8,6.4,0,0,TAU); ctx.fill();
    ctx.fillStyle='#f4fbff'; // belly
    ctx.beginPath(); ctx.ellipse(1.5,0.5,5,4,0,0,TAU); ctx.fill();
    ctx.fillStyle='#22303c'; // head
    ctx.beginPath(); ctx.arc(8,-5,4.4,0,TAU); ctx.fill();
    ctx.fillStyle='#ffb23e'; // beak
    ctx.beginPath(); ctx.moveTo(12,-5.6); ctx.lineTo(15.4,-4.6); ctx.lineTo(12,-3.4); ctx.fill();
    FX.eyes(ctx,8.4,-6,1,seed,t,'#fff');
    const fl=FX.flap(t,10,0.4,seed); // trailing flipper
    ctx.fillStyle='#22303c';
    ctx.beginPath(); ctx.ellipse(-5,-3,4.4,1.8,-0.5-fl,0,TAU); ctx.fill();
    ctx.strokeStyle=scarf; ctx.lineWidth=2.6; ctx.lineCap='round'; // scarf streaming
    ctx.beginPath(); ctx.moveTo(6,-2.5); ctx.quadraticCurveTo(0,-4,-8,-8+FX.bob(t,7,2,seed));
    ctx.quadraticCurveTo(-13,-10,-16,-8+FX.bob(t,8,2.6,seed+2)); ctx.stroke();
    ctx.restore();
  },
  critter(ctx,i,t,P,zH){
    if(i<2){ // TRAVEL: penguin-birds sledding across icy slopes, hopping moguls
      const x=FX.crossing(t,52+i*22,G.UNIT_W,i*0.47);
      const yBase=zH*0.3+i*zH*0.42, hop=Math.abs(Math.sin(t*3+i*2))*6;
      const y=yBase+Math.sin(x*0.03+i)*10-hop;
      ctx.save(); ctx.translate(x,y);
      this._penguin(ctx,t,i*1.7,i?P.accent:'#ffd977',Math.cos(x*0.03+i)*0.22);
      for(let k2=0;k2<3;k2++){ // kicked-up sugar spray
        ctx.fillStyle='rgba(255,255,255,'+(0.4-k2*0.11)+')';
        ctx.beginPath(); ctx.arc(-12-k2*5,8+FX.bob(t,9,1.5,k2+i),1.6,0,TAU); ctx.fill(); }
      ctx.restore();
    } else if(i===2){ // TRAVEL: peppermint balloon rising forever
      const y=FX.rise(t,26,zH,0.35), x=G.UNIT_W*0.7+FX.bob(t,0.9,24,3);
      ctx.save(); ctx.translate(x,y);
      this._stripes(ctx,9,t,'#fff',P.accent,0.9);
      ctx.strokeStyle='rgba(255,255,255,0.55)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(0,9); ctx.quadraticCurveTo(FX.bob(t,3,3),16,0,22); ctx.stroke();
      ctx.fillStyle='#ffd977'; ctx.beginPath(); ctx.arc(0,25,3,0,TAU); ctx.fill(); // hitchhiking chick
      FX.eyes(ctx,0,24.4,0.8,2.2,t);
      ctx.restore();
    } else { // roaming snow-puff sprite chasing sweets
      const [wx,wy]=FX.wander(t,5.1,90,100,0.45);
      const x=G.UNIT_W*0.45+wx, y=zH*0.5+wy;
      ctx.save(); ctx.translate(x,y+FX.bob(t,3,2.5,5));
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(190,255,235,0.3)';
        ctx.beginPath(); ctx.arc(0,0,8,0,TAU); ctx.fill(); });
      ctx.fillStyle='rgba(255,255,255,0.95)';
      ctx.beginPath(); ctx.arc(0,0,5,0,TAU); ctx.fill();
      FX.eyes(ctx,0,-1,1.1,5.5,t);
      ctx.strokeStyle=P.accent; ctx.lineWidth=1.6; ctx.lineCap='round'; // tiny antenna bow
      ctx.beginPath(); ctx.moveTo(0,-5); ctx.lineTo(FX.bob(t,4,1.5,1),-8.5); ctx.stroke();
      ctx.restore();
    }
  },
  drifter(ctx,d,t,P){ // spinning sugar snowflake
    ctx.save(); ctx.rotate(t*(0.6+(d.ph%1)*0.5));
    ctx.strokeStyle='rgba(230,255,250,0.55)'; ctx.lineWidth=1.5; ctx.lineCap='round';
    for(let i=0;i<3;i++){ const a=i/3*Math.PI;
      ctx.beginPath(); ctx.moveTo(-Math.cos(a)*d.s*0.22,-Math.sin(a)*d.s*0.22);
      ctx.lineTo(Math.cos(a)*d.s*0.22,Math.sin(a)*d.s*0.22); ctx.stroke(); }
    ctx.restore();
  },
  hero(ctx,t,P,zH){ // postcard: mint glacier cliff, gumdrop igloo, waving penguin
    ctx.save(); ctx.translate(0,FX.bob(t,0.7,3));
    const g=ctx.createLinearGradient(0,-34,0,26); // the cliff
    g.addColorStop(0,'rgba(142,255,220,0.5)'); g.addColorStop(1,'rgba(40,130,120,0.25)');
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.moveTo(-40,26); ctx.lineTo(-30,-14); ctx.lineTo(-12,-8);
    ctx.lineTo(2,-30); ctx.lineTo(20,-10); ctx.lineTo(34,-16); ctx.lineTo(42,26);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle='rgba(255,127,174,0.6)'; // igloo perched on the summit
    ctx.beginPath(); ctx.arc(2,-30,11,Math.PI,0); ctx.closePath(); ctx.fill();
    ctx.fillStyle='rgba(255,220,130,'+(0.4+0.25*Math.sin(t*2))+')';
    ctx.beginPath(); ctx.arc(2,-30,4,Math.PI,0); ctx.closePath(); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.85)';
    ctx.beginPath(); ctx.arc(2,-30,11,Math.PI*1.25,Math.PI*1.7); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.translate(24,-16); // greeter penguin waving its scarf
    ctx.fillStyle='#22303c'; ctx.beginPath(); ctx.ellipse(0,0,5,7,0,0,TAU); ctx.fill();
    ctx.fillStyle='#f4fbff'; ctx.beginPath(); ctx.ellipse(0,1.5,3,4.4,0,0,TAU); ctx.fill();
    FX.eyes(ctx,0,-3.4,1,0.8,t,'#fff');
    ctx.fillStyle='#ffb23e';
    ctx.beginPath(); ctx.moveTo(-1.4,-2.2); ctx.lineTo(1.4,-2.2); ctx.lineTo(0,-0.6); ctx.fill();
    const wave=Math.sin(t*5)*0.6;
    ctx.strokeStyle='#ffd977'; ctx.lineWidth=2.4; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(2,-1); // scarf held aloft, flailing hello
    ctx.quadraticCurveTo(8,-6+wave*3,12,-10+wave*5); ctx.stroke();
    ctx.restore();
    for(let i=0;i<4;i++){ // sparkle dust rolling off the cliff face
      const p=(t*0.4+i/4)%1;
      ctx.fillStyle='rgba(255,255,255,'+(0.5*(1-p))+')';
      ctx.beginPath(); ctx.arc(-30+p*20,-14+p*38,1.6,0,TAU); ctx.fill(); }
    ctx.restore();
  },
  _mints:[],
  onTap(x,y,P,tNow){ this._mints.push({x,y,at:tNow}); if(this._mints.length>6) this._mints.shift(); },
  overlay(ctx,t,P,zH){
    /* aurora ribbons — two sine curtains breathing across the zone */
    ctx.save(); ctx.globalCompositeOperation='lighter';
    for(let rb=0;rb<2;rb++){
      const yc=zH*(0.22+rb*0.3), hue=rb?P.hue:(P.hue+120)%360;
      ctx.beginPath();
      for(let x=0;x<=G.UNIT_W;x+=13){
        const y=yc+Math.sin(x*0.014+t*(0.5+rb*0.25))*26+Math.sin(x*0.05-t*0.9+rb*4)*8;
        x?ctx.lineTo(x,y):ctx.moveTo(x,y);
      }
      ctx.strokeStyle='hsla('+hue+',95%,70%,'+(0.10+0.045*Math.sin(t*0.7+rb*3))+')';
      ctx.lineWidth=26+Math.sin(t*0.55+rb)*8; ctx.lineCap='round'; ctx.stroke();
      ctx.strokeStyle='hsla('+hue+',100%,85%,0.10)'; ctx.lineWidth=6; ctx.stroke();
    }
    ctx.restore();
    /* tapped peppermints spin up, wobble, and dissolve into sugar */
    for(const c of this._mints){
      const age=t-c.at; if(age<0||age>2.2) continue;
      const a=1-age/2.2;
      ctx.save(); ctx.translate(c.x+FX.bob(t,3,5,c.x),c.y-age*34); ctx.globalAlpha=a;
      this._stripes(ctx,7+age*3,t,'#fff',P.accent,2.2);
      for(let i=0;i<5;i++){ const an=i/5*TAU+c.x;
        ctx.fillStyle='rgba(255,255,255,'+(a*0.7)+')';
        ctx.beginPath(); ctx.arc(Math.cos(an)*(10+age*22),Math.sin(an)*(10+age*22),1.7,0,TAU); ctx.fill(); }
      ctx.restore();
    }
    ctx.globalAlpha=1;
  },
});
