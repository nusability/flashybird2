'use strict';
/* ============================================================
   THEME PACK — MUSHROOM METROPOLIS
   A glowing fungi skyline: spore streetlights, snail trams with
   lit windows, tiny doors in stems, moths commuting.
   ============================================================ */
registerTheme({
  id:'mushroom-metropolis', name:'MUSHROOM METROPOLIS',
  palettes:[
    { hue:278, bg:['#150425','#301048'], node:'#7dffe0', nodeDone:'#ffd977',
      lock:'#4d3a66', accent:'#ff9de2', text:'#f3e9ff', veil:'#0c0218' },
    { hue:18,  bg:['#1f0903','#3c1a08'], node:'#ffc07d', nodeDone:'#ffd977',
      lock:'#6b4a36', accent:'#8dffa8', text:'#ffeede', veil:'#140502' },
  ],
  motif(ctx,m,t,P){
    const s=m.s;
    if(m.v<0.36){ // mushroom house: breathing cap, flickering window, tiny door
      const br=FX.pulse(t,1.5,0.05,m.v*9);
      ctx.strokeStyle='rgba(235,225,255,0.5)'; ctx.lineWidth=2.4; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(0,s*0.5); ctx.quadraticCurveTo(s*0.06,s*0.1,0,-s*0.1); ctx.stroke();
      ctx.fillStyle='rgba(240,235,255,0.24)';
      ctx.beginPath(); ctx.moveTo(-s*0.16,s*0.5); ctx.quadraticCurveTo(0,s*0.46,s*0.16,s*0.5);
      ctx.lineTo(s*0.1,s*0.14); ctx.lineTo(-s*0.1,s*0.14); ctx.fill(); // stem
      const fl=0.55+0.35*Math.sin(t*7+m.v*40); // warm window
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,190,90,'+fl+')';
        ctx.beginPath(); ctx.arc(0,s*0.3,s*0.055,0,TAU); ctx.fill(); });
      ctx.fillStyle='rgba(30,10,40,0.8)'; // tiny door in the stem
      ctx.beginPath(); ctx.arc(0,s*0.5,s*0.075,Math.PI,0); ctx.fill();
      ctx.save(); ctx.scale(br,br); // cap breathes
      ctx.fillStyle=P.accent; ctx.globalAlpha=0.55;
      ctx.beginPath(); ctx.moveTo(-s*0.42,s*0.14);
      ctx.quadraticCurveTo(0,-s*0.62,s*0.42,s*0.14); ctx.closePath(); ctx.fill();
      ctx.globalAlpha=0.85; ctx.fillStyle='rgba(255,255,255,0.5)';
      for(const[dx,dy,r]of[[-0.2,-0.04,0.05],[0.13,-0.16,0.04],[0.28,0.02,0.035]]){
        ctx.beginPath(); ctx.arc(dx*s,dy*s,r*s*FX.pulse(t,2.4,0.2,dx*9),0,TAU); ctx.fill(); }
      ctx.restore(); ctx.globalAlpha=1;
    } else if(m.v<0.68){ // spore streetlight with a moth-drawn halo
      ctx.save(); ctx.rotate(FX.sway(t,0.9,0.04,m.v*7));
      ctx.strokeStyle='rgba(200,190,230,0.6)'; ctx.lineWidth=2; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(0,s*0.5); ctx.lineTo(0,-s*0.28);
      ctx.quadraticCurveTo(0,-s*0.5,s*0.22,-s*0.5); ctx.stroke();
      const gl=FX.pulse(t,3,0.22,m.v*20);
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,220,130,0.16)';
        ctx.beginPath(); ctx.arc(s*0.22,-s*0.42,s*0.2*gl,0,TAU); ctx.fill();
        ctx.fillStyle='#ffe9a8';
        ctx.beginPath(); ctx.arc(s*0.22,-s*0.42,s*0.06*gl,0,TAU); ctx.fill(); });
      const[ox,oy]=FX.orbit(t,4,s*0.14,m.v*30); // one devoted moth
      ctx.fillStyle='rgba(255,255,255,0.75)';
      ctx.beginPath(); ctx.ellipse(s*0.22+ox,-s*0.42+oy,2.4,1.2,ox*0.1,0,TAU); ctx.fill();
      ctx.restore();
    } else { // toadstool trio, the big one watches the street
      ctx.save(); ctx.rotate(FX.sway(t,1.1,0.05,m.v*13));
      for(const[dx,sc,ph]of[[-0.26,0.5,1],[0.3,0.62,2],[0,1,0]]){
        const b=FX.pulse(t,1.8,0.05,ph+m.v*6);
        ctx.save(); ctx.translate(dx*s,s*0.34-sc*s*0.34); ctx.scale(sc*b,sc*b);
        ctx.fillStyle='rgba(240,235,255,0.3)';
        ctx.fillRect(-s*0.07,0,s*0.14,s*0.34);
        ctx.fillStyle=ph?P.node:P.accent; ctx.globalAlpha=0.6;
        ctx.beginPath(); ctx.moveTo(-s*0.3,0.02*s);
        ctx.quadraticCurveTo(0,-s*0.44,s*0.3,0.02*s); ctx.closePath(); ctx.fill();
        ctx.globalAlpha=1; ctx.restore();
      }
      FX.eyes(ctx,0,s*0.16,s*0.05,m.v,t,'#1c1030');
      ctx.strokeStyle='#1c1030'; ctx.lineWidth=1.6; ctx.lineCap='round';
      ctx.beginPath(); ctx.arc(0,s*0.22,s*0.05,0.4,Math.PI-0.4); ctx.stroke();
      ctx.restore();
    }
  },
  nodeBody(ctx,r,t,P,st){ // a mushroom cap halo sheltering the node
    const b=FX.pulse(t,2,0.05,r);
    ctx.save(); ctx.scale(b,b);
    ctx.fillStyle=st.done?'rgba(255,217,119,0.3)':st.cur?'rgba(255,157,226,0.32)':'rgba(200,180,255,0.16)';
    ctx.beginPath(); ctx.moveTo(-r*1.5,r*0.24);
    ctx.quadraticCurveTo(0,-r*1.9,r*1.5,r*0.24); ctx.closePath(); ctx.fill();
    ctx.strokeStyle=st.done?'rgba(255,217,119,0.5)':'rgba(230,220,255,0.4)'; ctx.lineWidth=1.5;
    for(let i=-2;i<=2;i++){ // gills fanning beneath the cap
      ctx.beginPath(); ctx.moveTo(i*r*0.5,r*0.2);
      ctx.quadraticCurveTo(i*r*0.62,r*0.66,i*r*0.6,r*0.95+FX.bob(t,3,1.4,i)); ctx.stroke(); }
    ctx.fillStyle='rgba(255,255,255,0.45)';
    for(const[dx,dy]of[[-0.8,-0.5],[0.2,-0.95],[0.9,-0.4]]){
      ctx.beginPath(); ctx.arc(dx*r,dy*r,r*0.14*FX.pulse(t,2.6,0.25,dx*5),0,TAU); ctx.fill(); }
    ctx.restore();
  },
  critter(ctx,i,t,P,zH){
    if(i<2){ // commuting moths: cross the city, bobbing between streetlights
      const x=FX.crossing(t,26+i*13,G.UNIT_W,i*0.47);
      const y=110+i*(zH-300)*0.8+FX.bob(t,2.2,20,i*3)+Math.sin(t*0.9+i)*26;
      const f=FX.flap(t,16,0.7,i*2);
      ctx.save(); ctx.translate(x,y); if(i%2)ctx.scale(-1,1);
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,235,170,0.14)';
        ctx.beginPath(); ctx.arc(0,0,10,0,TAU); ctx.fill(); });
      ctx.fillStyle='rgba(255,250,235,0.9)';
      for(const e of[-1,1]){
        ctx.beginPath(); ctx.ellipse(e*4.4,-1.2,5,3,e*(0.5+f*0.6),0,TAU); ctx.fill(); }
      ctx.fillStyle='#e8d9ff';
      ctx.beginPath(); ctx.ellipse(0,0.6,1.6,4.2,0,0,TAU); ctx.fill();
      ctx.strokeStyle='#e8d9ff'; ctx.lineWidth=1.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(-1,-3.4); ctx.lineTo(-3,-6.4);
      ctx.moveTo(1,-3.4); ctx.lineTo(3,-6.4); ctx.stroke();
      FX.eyes(ctx,0,-2.6,0.8,i*1.7,t);
      ctx.restore();
    } else if(i===2){ // the snail tram: slow, glowing, full of passengers
      const x=FX.crossing(t,11,G.UNIT_W,0.62), y=zH-84+FX.bob(t,1.3,3);
      ctx.save(); ctx.translate(x,y);
      ctx.fillStyle='rgba(200,255,230,0.35)'; // foot / chassis
      ctx.beginPath(); ctx.moveTo(-20,8); ctx.quadraticCurveTo(0,13,22,8);
      ctx.quadraticCurveTo(24,4,18,3); ctx.lineTo(-18,3); ctx.quadraticCurveTo(-24,4,-20,8); ctx.fill();
      ctx.fillStyle=P.accent; ctx.globalAlpha=0.75; // shell cabin
      ctx.beginPath(); ctx.arc(-3,-7,13,0,TAU); ctx.fill(); ctx.globalAlpha=1;
      ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.arc(-3,-7,13,0,TAU);
      ctx.arc(-3,-7,8,0,TAU); ctx.arc(-3,-7,4,0,TAU); ctx.stroke();
      for(let w=0;w<3;w++){ // lit tram windows, each flickering on its own clock
        const fl=0.5+0.4*Math.sin(t*6+w*2.1);
        FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,200,110,'+fl+')';
          ctx.beginPath(); ctx.arc(-11+w*8,-6+((w%2)?-3:3),2.1,0,TAU); ctx.fill(); });
      }
      ctx.strokeStyle='rgba(230,255,240,0.9)'; ctx.lineWidth=1.6; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(14,2); ctx.lineTo(18,-8);
      ctx.moveTo(17,2); ctx.lineTo(22,-6); ctx.stroke(); // eyestalks
      FX.eyes(ctx,20,-8.5,1.3,0.4,t,'#243');
      ctx.restore();
    } else { // off-duty glow-slug inspector, roaming mid-town
      const[wx,wy]=FX.wander(t,7.3,90,70,0.4);
      const x=G.UNIT_W*0.45+wx, y=zH*0.42+wy;
      ctx.save(); ctx.translate(x,y); if(Math.cos(t*0.4+7.3*7)<0)ctx.scale(-1,1);
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(150,255,200,0.16)';
        ctx.beginPath(); ctx.arc(0,0,8,0,TAU); ctx.fill(); });
      ctx.fillStyle=P.node; ctx.globalAlpha=0.85;
      ctx.beginPath(); ctx.moveTo(-8,3); ctx.quadraticCurveTo(0,-6+FX.bob(t,5,1),9,3);
      ctx.quadraticCurveTo(0,5.5,-8,3); ctx.fill(); ctx.globalAlpha=1;
      ctx.strokeStyle=P.node; ctx.lineWidth=1.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(6,-1); ctx.lineTo(8,-5); ctx.moveTo(8,-1); ctx.lineTo(10.5,-4); ctx.stroke();
      FX.eyes(ctx,9,-5.4,1,3.1,t,'#132');
      ctx.restore();
    }
  },
  drifter(ctx,d,t,P){ // rising spores, twinkling as they climb
    FX.glow(ctx,()=>{ const tw=0.35+0.3*Math.sin(t*4+d.ph*5);
      ctx.fillStyle=d.ph%1<0.5?'rgba(190,150,255,'+tw+')':'rgba(150,255,215,'+tw+')';
      ctx.beginPath(); ctx.arc(0,0,d.s*0.09+FX.bob(t,3,0.6,d.ph),0,TAU); ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,'+tw*0.5+')'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(0,0,d.s*0.2,0,TAU); ctx.stroke(); });
  },
  hero(ctx,t,P,zH){ // GRAND CENTRAL MUSHROOM — the downtown terminus
    const br=FX.pulse(t,1.2,0.04);
    ctx.save(); ctx.translate(0,FX.bob(t,0.9,2));
    ctx.fillStyle='rgba(240,235,255,0.26)'; // stem tower
    ctx.beginPath(); ctx.moveTo(-15,34); ctx.quadraticCurveTo(-9,0,-11,-12);
    ctx.lineTo(11,-12); ctx.quadraticCurveTo(9,0,15,34); ctx.closePath(); ctx.fill();
    for(let row=0;row<4;row++)for(let col=-1;col<=1;col++){ // window grid
      const fl=0.35+0.45*Math.max(0,Math.sin(t*3+row*2.7+col*4.1));
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,195,100,'+fl+')';
        ctx.fillRect(col*6.4-1.6,-7+row*8.6,3.2,4); });
    }
    ctx.fillStyle='rgba(30,10,45,0.85)'; // grand door + doormat glow
    ctx.beginPath(); ctx.arc(0,34,6,Math.PI,0); ctx.fill();
    FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,220,130,'+(0.1+0.05*Math.sin(t*2))+')';
      ctx.beginPath(); ctx.ellipse(0,35,11,3,0,0,TAU); ctx.fill(); });
    ctx.save(); ctx.scale(br,br); // breathing megacap
    ctx.fillStyle=P.accent; ctx.globalAlpha=0.7;
    ctx.beginPath(); ctx.moveTo(-34,-10); ctx.quadraticCurveTo(0,-52,34,-10);
    ctx.quadraticCurveTo(0,-2,-34,-10); ctx.fill(); ctx.globalAlpha=1;
    ctx.fillStyle='rgba(255,255,255,0.5)';
    for(const[dx,dy,r]of[[-18,-19,3.4],[2,-30,2.8],[18,-16,2.4],[-4,-14,2]]){
      ctx.beginPath(); ctx.arc(dx,dy,r*FX.pulse(t,2.2,0.2,dx),0,TAU); ctx.fill(); }
    ctx.restore();
    const bl=0.3+0.7*FX.blink(t,2.2); // rooftop beacon
    ctx.strokeStyle='rgba(230,220,255,0.7)'; ctx.lineWidth=1.6;
    ctx.beginPath(); ctx.moveTo(0,-48*br); ctx.lineTo(0,-56); ctx.stroke();
    FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,120,150,'+bl+')';
      ctx.beginPath(); ctx.arc(0,-58,2.6,0,TAU); ctx.fill(); });
    FX.eyes(ctx,0,14,2.2,0.9,t,'#1c1030'); // the terminal is sleepy but kind
    ctx.strokeStyle='#1c1030'; ctx.lineWidth=2; ctx.lineCap='round';
    ctx.beginPath(); ctx.arc(0,19,3.4,0.4,Math.PI-0.4); ctx.stroke();
    ctx.restore();
  },
  _knocks:[],
  onTap(x,y,P,tNow){ this._knocks.push({x,y,at:tNow}); if(this._knocks.length>6) this._knocks.shift(); },
  overlay(ctx,t,P,zH){
    FX.glow(ctx,()=>{ // faint drifting spore-fog banks (alpha <= 0.2)
      for(let i=0;i<3;i++){ const y=zH*(0.22+i*0.3)+FX.bob(t,0.5,14,i*4);
        const x=G.UNIT_W*0.5+Math.sin(t*0.12+i*2.6)*120;
        ctx.fillStyle='hsla('+P.hue+',80%,70%,0.05)';
        ctx.beginPath(); ctx.ellipse(x,y,130,26,0,0,TAU); ctx.fill(); }
    });
    for(const k of this._knocks){ // knock and a porch light answers
      const age=t-k.at; if(age<0||age>4) continue;
      const a=age<0.4?age/0.4:clamp(1-(age-2.6)/1.4,0,1);
      ctx.save(); ctx.translate(k.x,k.y+FX.bob(t,2,1.5,k.x));
      if(age<0.7){ ctx.strokeStyle='rgba(255,220,130,'+(0.6*(1-age/0.7))+')';
        ctx.lineWidth=1.6; ctx.beginPath(); ctx.arc(0,0,4+age*36,0,TAU); ctx.stroke(); }
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,200,110,'+0.16*a+')';
        ctx.beginPath(); ctx.arc(0,0,13,0,TAU); ctx.fill();
        ctx.fillStyle='rgba(255,225,150,'+0.85*a+')';
        ctx.fillRect(-2.4,-3,4.8,6); });
      ctx.strokeStyle='rgba(255,255,255,'+0.5*a+')'; ctx.lineWidth=1.5;
      ctx.strokeRect(-2.4,-3,4.8,6);
      ctx.restore();
    }
    ctx.globalAlpha=1;
  },
});
