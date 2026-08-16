/* Reference pack 2 — extracted from theme-lab.html; shows all hooks */
registerTheme({
  id:'jungle', name:'PSYCHEDELIC JUNGLE',
  palettes:[
    { hue:118, bg:['#03170c','#0d3b18'], node:'#c0ff6e', nodeDone:'#ffd977',
      lock:'#2f5c3a', accent:'#ff5fd0', text:'#eaffe0', veil:'#031208' },
    { hue:300, bg:['#20052e','#45104e'], node:'#ff9ff5', nodeDone:'#7dff6e',
      lock:'#5b3a68', accent:'#7dffc9', text:'#ffe8ff', veil:'#150320' },
  ],
  motif(ctx,m,t,P){
    const s=m.s;
    if(m.v<0.4){ // breathing leaf
      ctx.save(); ctx.rotate(m.v*16+FX.sway(t,1.2,0.16,m.v*9));
      const grow=FX.pulse(t,1.6,0.06,m.v*5); ctx.scale(grow,grow);
      const lg=ctx.createLinearGradient(0,0,0,-s);
      lg.addColorStop(0,'rgba(70,220,110,0.34)'); lg.addColorStop(1,'rgba(255,95,208,0.30)');
      ctx.fillStyle=lg;
      ctx.beginPath(); ctx.moveTo(0,0);
      ctx.quadraticCurveTo(s*0.6,-s*0.5,0,-s);
      ctx.quadraticCurveTo(-s*0.6,-s*0.5,0,0); ctx.fill();
      ctx.strokeStyle='rgba(160,255,160,0.55)'; ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(s*0.06,-s*0.5,0,-s); ctx.stroke();
      ctx.restore();
    } else if(m.v<0.7){ // hypno-swirl
      ctx.save(); ctx.rotate(t*(m.v>0.55?0.55:-0.45));
      ctx.lineWidth=2.2; ctx.lineCap='round';
      for(let arm=0;arm<2;arm++){
        ctx.strokeStyle=arm?P.accent:'rgba(125,255,110,0.8)'; ctx.globalAlpha=0.6;
        ctx.beginPath();
        for(let i=0;i<=24;i++){ const a=i/24*4.2+arm*Math.PI, r=s*0.07+i/24*s*0.42;
          i?ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r):ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r); }
        ctx.stroke();
      }
      ctx.restore(); ctx.globalAlpha=1;
    } else { // blinking eye-flower
      ctx.save(); ctx.rotate(FX.sway(t,0.8,0.12,m.v*11));
      for(let i=0;i<7;i++){ const a=i/7*TAU+t*0.4;
        ctx.fillStyle=i%2?P.accent:'rgba(125,255,110,0.9)'; ctx.globalAlpha=0.8;
        ctx.beginPath(); ctx.ellipse(Math.cos(a)*s*0.26,Math.sin(a)*s*0.26,s*0.22,s*0.1,a,0,TAU); ctx.fill(); }
      ctx.globalAlpha=1;
      const bl=FX.blink(t,m.v);
      ctx.fillStyle='#fff'; ctx.beginPath();
      ctx.ellipse(0,0,s*0.15,s*0.15*(1-bl*0.92),0,0,TAU); ctx.fill();
      if(!bl){ ctx.fillStyle='#12220f'; ctx.beginPath();
        ctx.arc(Math.sin(t*0.9+m.v)*s*0.05,0,s*0.07,0,TAU); ctx.fill(); }
      ctx.restore();
    }
  },
  nodeBody(ctx,r,t,P,st){
    for(let i=0;i<8;i++){ const a=i/8*TAU+t*0.5;
      ctx.fillStyle=st.done?'rgba(255,217,119,0.45)':i%2?'rgba(255,95,208,0.5)':'rgba(192,255,110,0.5)';
      ctx.beginPath(); ctx.ellipse(Math.cos(a)*r*0.72,Math.sin(a)*r*0.72,r*0.4,r*0.18,a,0,TAU); ctx.fill(); }
  },
  critter(ctx,i,t,P,zH){
    if(i<2){ // glowbugs (roamers via wander)
      const [wx,wy]=FX.wander(t,i*2.4,70,80,0.5);
      const x=70+i*(G.UNIT_W-140)+wx, y=180+i*(zH-360)+wy;
      const wing=FX.flap(t,30,0.5,i);
      ctx.save(); ctx.translate(x,y);
      FX.glow(ctx,()=>{ ctx.fillStyle='rgba(150,255,110,0.25)';
        ctx.beginPath(); ctx.arc(0,0,9,0,TAU); ctx.fill();
        ctx.fillStyle='hsl(95,100%,72%)';
        ctx.beginPath(); ctx.arc(0,0,3.2,0,TAU); ctx.fill();
        ctx.fillStyle='rgba(255,255,255,0.8)';
        ctx.beginPath(); ctx.ellipse(-3,-2.2,3.6,1.6,-0.6-wing,0,TAU); ctx.fill();
        ctx.beginPath(); ctx.ellipse(3,-2.2,3.6,1.6,0.6+wing,0,TAU); ctx.fill(); });
      ctx.restore();
    } else { // butterflies in figure-eights (roamers)
      const cx=100+(i-2)*180, cy=zH*0.5;
      const x=cx+Math.sin(t*0.7+i*3)*90, y=cy+Math.sin(t*1.4+i*3)*110;
      const f=FX.flap(t,14,0.8,i);
      ctx.save(); ctx.translate(x,y); ctx.rotate(FX.sway(t,0.7,0.4,i));
      ctx.fillStyle=i%2?P.accent:'rgba(125,255,190,0.9)'; ctx.globalAlpha=0.9;
      for(const e of [-1,1]){
        ctx.beginPath(); ctx.ellipse(e*4,-1,5,3.4,e*(0.6+f*0.5),0,TAU); ctx.fill();
        ctx.beginPath(); ctx.ellipse(e*3,2.6,3.4,2.2,e*(0.8+f*0.5),0,TAU); ctx.fill();
      }
      ctx.fillStyle='#223'; ctx.beginPath(); ctx.ellipse(0,0.5,1.2,4,0,0,TAU); ctx.fill();
      ctx.restore(); ctx.globalAlpha=1;
    }
  },
  drifter(ctx,d,t,P){
    FX.glow(ctx,()=>{ ctx.fillStyle=d.ph%1<0.5?'rgba(150,255,120,0.5)':'rgba(255,120,220,0.45)';
      ctx.beginPath(); ctx.arc(0,0,d.s*0.11+FX.bob(t,3,0.7,d.ph),0,TAU); ctx.fill(); });
  },
  hero(ctx,t,P,zH){ // carnivorous plant that yawns on a lazy cycle
    const yawn=Math.max(0,Math.sin(t*0.6))*0.5;
    ctx.save();
    ctx.strokeStyle='rgba(125,255,110,0.7)'; ctx.lineWidth=3; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(0,26); ctx.quadraticCurveTo(FX.bob(t,1.1,6),8,0,-6); ctx.stroke();
    ctx.save(); ctx.translate(0,-10);
    ctx.rotate(-yawn*0.5);
    ctx.fillStyle=P.accent; ctx.globalAlpha=0.85;
    ctx.beginPath(); ctx.ellipse(0,-7,15,9,0,Math.PI,0); ctx.fill();   // upper jaw
    ctx.restore();
    ctx.fillStyle=P.accent; ctx.globalAlpha=0.7;
    ctx.beginPath(); ctx.ellipse(0,-6,14,7,0,0,Math.PI); ctx.fill();   // lower jaw
    ctx.globalAlpha=1;
    FX.eyes(ctx,0,-22-yawn*8,2,0.7,t,'#12220f');
    ctx.restore();
  },
  _bursts:[],
  onTap(x,y,P,tNow){ this._bursts.push({x,y,at:tNow}); if(this._bursts.length>5) this._bursts.shift(); },
  overlay(ctx,t,P,zH){ // spore puffs where you touch the jungle
    for(const b of this._bursts){
      const age=t-b.at; if(age<0||age>1.4) continue;
      for(let i=0;i<7;i++){ const a=i/7*TAU+b.x;
        const r=age*46, al=(1-age/1.4)*0.7;
        FX.glow(ctx,()=>{ ctx.fillStyle='rgba(150,255,120,'+al+')';
          ctx.beginPath();
          ctx.arc(b.x+Math.cos(a)*r,b.y+Math.sin(a)*r-age*20,2.2,0,TAU); ctx.fill(); });
      }
    }
  },
});
