/* ============================================================
   THEME PACK — MIDNIGHT CARNIVAL
   a ferris wheel of little moons, balloon-fish on strings,
   popcorn stars popping, striped tents breathing, ticket
   stubs in the wind
   ============================================================ */
registerTheme({
  id:'midnight-carnival', name:'MIDNIGHT CARNIVAL',
  palettes:[
    { hue:268, bg:['#160a2e','#2b1245'], node:'#d9b8ff', nodeDone:'#ffd977',
      lock:'#5a4a7a', accent:'#ff5d73', text:'#f3e9ff', veil:'#0c0520' },
    { hue:174, bg:['#04201f','#0b3a33'], node:'#8dffe0', nodeDone:'#ffcf6e',
      lock:'#3a6a5e', accent:'#ffa640', text:'#e4fff6', veil:'#021413' },
  ],
  motif(ctx,m,t,P){
    const s=m.s;
    if(m.v<0.36){ // striped tent, breathing, sleepy face in the doorway
      const br=FX.pulse(t,1.4,0.05,m.v*8);
      ctx.save(); ctx.scale(br,2-br);
      ctx.fillStyle='rgba(20,8,40,0.5)';
      ctx.beginPath(); ctx.moveTo(-s*0.5,s*0.4); ctx.lineTo(0,-s*0.45);
      ctx.lineTo(s*0.5,s*0.4); ctx.closePath(); ctx.fill();
      for(let i=0;i<5;i++){ // stripes swing from the peak
        if(i%2) continue;
        ctx.fillStyle=i===2?P.accent:'rgba(255,255,255,0.35)'; ctx.globalAlpha=0.55;
        ctx.beginPath(); ctx.moveTo(0,-s*0.45);
        ctx.lineTo(-s*0.5+i*s*0.2,s*0.4); ctx.lineTo(-s*0.5+(i+1)*s*0.2,s*0.4);
        ctx.closePath(); ctx.fill();
      }
      ctx.globalAlpha=1;
      ctx.fillStyle='rgba(8,3,18,0.9)'; // doorway
      ctx.beginPath(); ctx.moveTo(-s*0.13,s*0.4);
      ctx.quadraticCurveTo(0,s*0.02,s*0.13,s*0.4); ctx.fill();
      FX.eyes(ctx,0,s*0.26,s*0.035,m.v,t,P.node);
      ctx.strokeStyle=P.accent; ctx.lineWidth=2; ctx.lineCap='round'; // pennant
      ctx.beginPath(); ctx.moveTo(0,-s*0.45); ctx.lineTo(0,-s*0.62); ctx.stroke();
      ctx.fillStyle=P.accent;
      const fw=FX.sway(t,5,0.3,m.v*7);
      ctx.beginPath(); ctx.moveTo(0,-s*0.62);
      ctx.lineTo(s*0.24,-s*0.56+fw*s*0.2); ctx.lineTo(0,-s*0.5); ctx.fill();
      ctx.restore();
    } else if(m.v<0.68){ // popcorn star caught mid-pop, over and over
      const cyc=(t*1.1+m.v*9)%3, pop=cyc<0.5?cyc/0.5:1, settle=1+Math.sin(t*3+m.v)*0.04;
      ctx.save(); ctx.rotate(m.v*6+FX.sway(t,1.5,0.1,m.v));
      if(pop<1){ ctx.strokeStyle=P.accent; ctx.lineWidth=2; ctx.lineCap='round'; // pop rays
        ctx.globalAlpha=0.8*(1-pop);
        for(let i=0;i<6;i++){ const a=i/6*TAU+m.v;
          ctx.beginPath(); ctx.moveTo(Math.cos(a)*s*0.34*pop,Math.sin(a)*s*0.34*pop);
          ctx.lineTo(Math.cos(a)*s*0.5*pop,Math.sin(a)*s*0.5*pop); ctx.stroke(); }
        ctx.globalAlpha=1;
      }
      ctx.scale(pop*settle,pop*settle);
      ctx.fillStyle='rgba(255,240,200,0.85)'; // puffy 5-lobe kernel
      for(let i=0;i<5;i++){ const a=-Math.PI/2+i/5*TAU;
        ctx.beginPath(); ctx.arc(Math.cos(a)*s*0.16,Math.sin(a)*s*0.16,s*0.15,0,TAU); ctx.fill(); }
      ctx.beginPath(); ctx.arc(0,0,s*0.18,0,TAU); ctx.fill();
      FX.eyes(ctx,0,-s*0.02,s*0.035,m.v*3,t,'#3a2410');
      ctx.strokeStyle='#3a2410'; ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.arc(0,s*0.06,s*0.05,0.4,Math.PI-0.4); ctx.stroke();
      ctx.restore();
    } else { // crescent-moon lantern swaying on its string
      ctx.save();
      ctx.strokeStyle='rgba(255,255,255,0.35)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(0,-s*0.7); ctx.lineTo(0,-s*0.2); ctx.stroke();
      ctx.translate(0,-s*0.2); ctx.rotate(FX.sway(t,1.3,0.22,m.v*13));
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,225,150,0.16)';
        ctx.beginPath(); ctx.arc(0,s*0.26,s*0.4,0,TAU); ctx.fill(); });
      ctx.fillStyle='#ffe9a8'; ctx.globalAlpha=0.9;
      ctx.beginPath(); ctx.arc(0,s*0.26,s*0.25,-Math.PI*0.42,Math.PI*0.62);
      ctx.arc(s*0.09,s*0.2,s*0.19,Math.PI*0.62,-Math.PI*0.42,true); ctx.fill();
      ctx.globalAlpha=1;
      FX.eyes(ctx,-s*0.1,s*0.3,s*0.028,m.v*5,t,'#5b3b10');
      ctx.restore();
    }
  },
  nodeBody(ctx,r,t,P,st){ // ring of carnival marquee bulbs
    for(let i=0;i<10;i++){ const a=i/10*TAU+t*0.6;
      const on=Math.sin(t*5-i*1.9)>0;
      ctx.fillStyle=st.done?'rgba(255,217,119,0.55)':
        on?hexA(P.node,0.6):hexA(P.accent,0.35);
      ctx.beginPath();
      ctx.arc(Math.cos(a)*r*0.92,Math.sin(a)*r*0.92,r*0.14+(on?r*0.05:0),0,TAU); ctx.fill(); }
    ctx.fillStyle=st.done?'rgba(255,217,119,0.14)':hexA(P.node,0.12);
    ctx.beginPath(); ctx.arc(0,0,r*0.95*FX.pulse(t,3,0.05),0,TAU); ctx.fill();
  },
  critter(ctx,i,t,P,zH){
    if(i<2){ // escaped balloon-fish rising forever, trailing string (travelers)
      const y=FX.rise(t,26+i*9,zH,i*0.47);
      const x=70+i*230+FX.bob(t,0.9,26,i*4);
      const f=FX.flap(t,7,0.4,i*2);
      ctx.save(); ctx.translate(x,y); ctx.rotate(FX.sway(t,1.6,0.1,i));
      ctx.strokeStyle='rgba(255,255,255,0.4)'; ctx.lineWidth=1.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(0,10); // trailing string
      ctx.quadraticCurveTo(FX.bob(t,2.4,6,i),24,FX.bob(t,1.7,9,i+3),40); ctx.stroke();
      ctx.fillStyle=i?P.accent:P.node; ctx.globalAlpha=0.85;
      ctx.beginPath(); ctx.ellipse(0,0,10,7.5,0,0,TAU); ctx.fill(); // balloon body
      ctx.beginPath(); ctx.moveTo(-9,0); ctx.lineTo(-15,-5+f*8); ctx.lineTo(-15,5+f*8);
      ctx.closePath(); ctx.fill();                                  // tail fin
      ctx.beginPath(); ctx.ellipse(1,-6,4,2.5,-0.6-f,0,TAU); ctx.fill(); // top fin
      ctx.globalAlpha=1;
      ctx.fillStyle='rgba(255,255,255,0.5)';
      ctx.beginPath(); ctx.ellipse(3.5,-2.5,2.6,1.6,0.5,0,TAU); ctx.fill();
      FX.eyes(ctx,4.5,1,1.5,i*3.3,t,'#1c1030');
      ctx.strokeStyle='#1c1030'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(6.5,3.4,1.6,0.4,Math.PI-0.6); ctx.stroke();
      ctx.restore();
    } else if(i===2){ // ticket stub tumbling on the wind (traveler)
      const x=FX.crossing(t,55,G.UNIT_W,0.31);
      const y=zH*0.35+Math.sin(x*0.03)*60+FX.bob(t,2.2,10);
      ctx.save(); ctx.translate(x,y); ctx.rotate(t*2.4);
      ctx.fillStyle='#ffe9a8'; ctx.globalAlpha=0.9;
      ctx.beginPath(); ctx.rect(-9,-5.5,18,11);
      ctx.arc(-9,0,3,-Math.PI/2,Math.PI/2,false);
      ctx.arc(9,0,3,Math.PI/2,-Math.PI/2,false); ctx.fill('evenodd');
      ctx.globalAlpha=1;
      ctx.strokeStyle=P.accent; ctx.lineWidth=1.5; ctx.setLineDash([2,2]);
      ctx.beginPath(); ctx.moveTo(3,-5.5); ctx.lineTo(3,5.5); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle='#7a4a20'; ctx.beginPath(); ctx.arc(-3,0,2.4,0,TAU); ctx.fill();
      ctx.restore();
    } else { // moth juggler roaming the fairground (traveler via wander)
      const [wx,wy]=FX.wander(t,5.1,110,90,0.4);
      const x=G.UNIT_W*0.5+wx, y=zH*0.55+wy, f=FX.flap(t,22,0.6,1);
      ctx.save(); ctx.translate(x,y);
      ctx.fillStyle='rgba(255,235,190,0.85)';
      for(const e of [-1,1]){
        ctx.beginPath(); ctx.ellipse(e*4.5,-1,5.5,3.2,e*(0.5+f*0.6),0,TAU); ctx.fill(); }
      ctx.fillStyle='#2a1a3e'; ctx.beginPath(); ctx.ellipse(0,0.5,1.6,4.5,0,0,TAU); ctx.fill();
      for(let b=0;b<3;b++){ // juggling three glowing orbs
        const [ox,oy]=FX.orbit(t,4.5,10,b/3*TAU);
        FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.75);
          ctx.beginPath(); ctx.arc(ox,-8+oy*0.6,1.8,0,TAU); ctx.fill(); });
      }
      FX.eyes(ctx,0,-3.4,0.9,4.2,t,'#fff');
      ctx.restore();
    }
  },
  drifter(ctx,d,t,P){ // stray confetti flake spinning upward
    ctx.save(); ctx.rotate(t*(1.4+d.ph*0.2)+d.ph);
    ctx.fillStyle=d.ph%1<0.5?hexA(P.accent,0.6):'rgba(255,233,168,0.55)';
    ctx.fillRect(-d.s*0.13,-d.s*0.09,d.s*0.26,d.s*0.18);
    ctx.restore();
  },
  hero(ctx,t,P,zH){ // the moon ferris wheel — the postcard
    const R=42, spin=t*0.35;
    ctx.save();
    ctx.strokeStyle=hexA(P.node,0.55); ctx.lineWidth=3; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(-20,R+22); ctx.lineTo(0,0); ctx.lineTo(20,R+22); ctx.stroke();
    ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(0,0,R,0,TAU); ctx.stroke();      // rim
    for(let i=0;i<6;i++){ const a=i/6*TAU+spin;               // spokes
      ctx.beginPath(); ctx.moveTo(0,0);
      ctx.lineTo(Math.cos(a)*R,Math.sin(a)*R); ctx.stroke(); }
    FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.5);       // hub lamp
      ctx.beginPath(); ctx.arc(0,0,4+FX.pulse(t,4,0.5)*1.5,0,TAU); ctx.fill(); });
    for(let i=0;i<6;i++){ // gondolas are little moons, kept upright, swinging
      const a=i/6*TAU+spin, gx=Math.cos(a)*R, gy=Math.sin(a)*R;
      ctx.save(); ctx.translate(gx,gy); ctx.rotate(FX.sway(t,2,0.2,i*2));
      ctx.strokeStyle=hexA(P.text,0.5); ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,7); ctx.stroke();
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(255,230,160,0.14)';
        ctx.beginPath(); ctx.arc(0,12,9,0,TAU); ctx.fill(); });
      ctx.fillStyle='#ffe9a8'; ctx.globalAlpha=0.95;
      ctx.beginPath(); ctx.arc(0,12,5.5,-Math.PI*0.45,Math.PI*0.6); // crescent seat
      ctx.arc(2,10.6,4.2,Math.PI*0.6,-Math.PI*0.45,true); ctx.fill();
      ctx.globalAlpha=1;
      if(i%2){ // every other moon has a tiny rider peeking out
        ctx.fillStyle=P.accent;
        ctx.beginPath(); ctx.arc(-1,9+FX.bob(t,3,0.7,i),2.2,0,TAU); ctx.fill();
        FX.eyes(ctx,-1,8.6,0.6,i*1.7,t,'#fff');
      }
      ctx.restore();
    }
    ctx.restore();
  },
  _pops:[],
  onTap(x,y,P,tNow){ this._pops.push({x,y,at:tNow}); if(this._pops.length>6) this._pops.shift(); },
  overlay(ctx,t,P,zH){
    for(const s of [-1,1]){ // two crossing searchlights from the fairground floor
      const a=-Math.PI/2+Math.sin(t*0.4+s*1.9)*0.55;
      ctx.save(); ctx.translate(G.UNIT_W*0.5+s*140,zH); ctx.rotate(a);
      const bg=ctx.createLinearGradient(0,0,zH,0);
      bg.addColorStop(0,hexA(P.node,0.12)); bg.addColorStop(1,hexA(P.node,0));
      ctx.fillStyle=bg;
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(zH,-46); ctx.lineTo(zH,46);
      ctx.closePath(); ctx.fill(); ctx.restore();
    }
    for(const p of this._pops){ // tapped spots burst into popcorn
      const age=t-p.at; if(age<0||age>1.6) continue;
      const al=1-age/1.6;
      for(let i=0;i<8;i++){ const a=i/8*TAU+p.x*0.7;
        const r=14+age*52, ky=p.y+Math.sin(a)*r*0.7-age*30+age*age*40;
        const kx=p.x+Math.cos(a)*r;
        ctx.save(); ctx.translate(kx,ky); ctx.rotate(a+age*5); ctx.globalAlpha=al;
        ctx.fillStyle='rgba(255,240,200,0.9)';
        for(let l=0;l<3;l++){ const la=l/3*TAU;
          ctx.beginPath(); ctx.arc(Math.cos(la)*1.6,Math.sin(la)*1.6,2.1,0,TAU); ctx.fill(); }
        ctx.restore();
      }
      ctx.globalAlpha=1;
    }
  },
});
