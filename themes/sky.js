/* Reference pack 1 — extracted from theme-lab.html; the gold standard */
registerTheme({
  id:'sky', name:'CALM SKY OF A BIRD PLANET',
  palettes:[
    { hue:205, bg:['#0a2c55','#123f74'], node:'#9fdcff', nodeDone:'#ffd977',
      lock:'#41648c', accent:'#ffd977', text:'#eaf6ff', veil:'#061426' },
    { hue:24,  bg:['#331036','#6e2c2c'], node:'#ffcf9f', nodeDone:'#ffd977',
      lock:'#6b4550', accent:'#ff8fb0', text:'#ffeede', veil:'#1c0a1c' },
  ],
  motif(ctx,m,t,P){
    const s=m.s;
    if(m.v<0.62){ // sleepy cloud with a face
      ctx.fillStyle='rgba(255,255,255,0.15)';
      ctx.beginPath();
      ctx.arc(-s*0.42,0,s*0.30,0,TAU); ctx.arc(0,-s*0.16,s*0.40,0,TAU);
      ctx.arc(s*0.4,0,s*0.28,0,TAU); ctx.arc(0,s*0.12,s*0.34,0,TAU); ctx.fill();
      FX.eyes(ctx,0,-s*0.06,s*0.045,m.v,t,'rgba(255,255,255,0.6)');
      ctx.strokeStyle='rgba(255,255,255,0.55)'; ctx.lineWidth=2; ctx.lineCap='round';
      ctx.beginPath(); ctx.arc(0,s*0.07,s*0.06,0.3,Math.PI-0.3); ctx.stroke();
    } else { // smiling sun
      ctx.save(); ctx.rotate(t*0.15);
      ctx.fillStyle=P.accent; ctx.globalAlpha=0.9;
      ctx.beginPath(); ctx.arc(0,0,s*0.26,0,TAU); ctx.fill();
      ctx.strokeStyle=P.accent; ctx.lineWidth=2.4; ctx.lineCap='round';
      for(let i=0;i<9;i++){ const a=i/9*TAU, w=FX.pulse(t,3,0.18,i);
        ctx.beginPath(); ctx.moveTo(Math.cos(a)*s*0.35,Math.sin(a)*s*0.35);
        ctx.lineTo(Math.cos(a)*s*0.48*w,Math.sin(a)*s*0.48*w); ctx.stroke(); }
      ctx.restore(); ctx.globalAlpha=1;
      FX.eyes(ctx,0,-s*0.05,s*0.032,m.v,t,'#5b3b10');
      ctx.strokeStyle='#5b3b10'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(0,s*0.03,s*0.08,0.3,Math.PI-0.3); ctx.stroke();
    }
  },
  nodeBody(ctx,r,t,P,st){
    ctx.fillStyle=st.done?'rgba(255,217,119,0.25)':'rgba(255,255,255,0.18)';
    for(let i=0;i<7;i++){ const a=i/7*TAU+t*0.3;
      ctx.beginPath(); ctx.arc(Math.cos(a)*r*0.6,Math.sin(a)*r*0.6,r*0.46+FX.bob(t,2,1.2,i),0,TAU); ctx.fill(); }
  },
  critter(ctx,i,t,P,zH){
    if(i<3){ // commuting birds (roamers)
      const x=FX.crossing(t,30+i*10,G.UNIT_W,i*0.33), y0=120+i*(zH-260)/2;
      const y=y0+FX.bob(t,1.4,18,i*2), f=FX.flap(t,9,0.5,i);
      ctx.save(); ctx.translate(x,y); if(i%2)ctx.scale(-1,1);
      ctx.fillStyle=P.text; ctx.globalAlpha=0.85;
      ctx.beginPath(); ctx.ellipse(0,0,6.5,4,0,0,TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(5.5,-2,2.8,0,TAU); ctx.fill();
      ctx.fillStyle=P.accent;
      ctx.beginPath(); ctx.moveTo(8,-2.4); ctx.lineTo(11,-1.4); ctx.lineTo(8,-0.5); ctx.fill();
      ctx.fillStyle=P.text;
      ctx.beginPath(); ctx.ellipse(-1,-2.8,5.5,2.4,-0.7-f,0,TAU); ctx.fill();
      ctx.restore(); ctx.globalAlpha=1;
    } else { // hot-air balloon with a nest basket (roamer)
      const x=FX.crossing(t,9,G.UNIT_W,0.5), y=150+FX.bob(t,0.7,26);
      ctx.save(); ctx.translate(x,y);
      ctx.fillStyle=P.accent; ctx.globalAlpha=0.8;
      ctx.beginPath(); ctx.arc(0,0,13,Math.PI*0.95,Math.PI*2.05); ctx.quadraticCurveTo(9,9,0,11);
      ctx.quadraticCurveTo(-9,9,-12.6,1); ctx.fill();
      ctx.strokeStyle=P.accent;
      ctx.beginPath(); ctx.moveTo(-5,10); ctx.lineTo(-4,17); ctx.moveTo(5,10); ctx.lineTo(4,17); ctx.stroke();
      ctx.strokeStyle='hsl(35,90%,65%)'; ctx.lineWidth=2; ctx.lineCap='round';
      ctx.beginPath(); ctx.arc(0,17,5,0.3,Math.PI-0.3); ctx.stroke();
      ctx.restore(); ctx.globalAlpha=1;
    }
  },
  drifter(ctx,d,t,P){ // falling feather
    ctx.save(); ctx.rotate(FX.sway(t,1.1,0.7,d.ph));
    ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.lineWidth=1.5; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(-d.s*0.4,0); ctx.quadraticCurveTo(0,-d.s*0.45,d.s*0.4,0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-d.s*0.28,0); ctx.lineTo(d.s*0.32,-d.s*0.08); ctx.stroke();
    ctx.restore();
  },
  hero(ctx,t,P,zH){ // floating island with a giant nest — the postcard
    ctx.save(); ctx.translate(0,FX.bob(t,0.8,7));
    ctx.fillStyle='rgba(255,255,255,0.13)';
    ctx.beginPath(); ctx.arc(-26,6,20,0,TAU); ctx.arc(0,-2,26,0,TAU); ctx.arc(28,8,18,0,TAU); ctx.fill();
    ctx.strokeStyle='hsl(35,90%,60%)'; ctx.lineWidth=3; ctx.lineCap='round';
    ctx.beginPath(); ctx.arc(0,-14,15,0.25,Math.PI-0.25); ctx.stroke();
    ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,-18,16,0.6,Math.PI-0.6); ctx.stroke();
    for(const e of [-7,4]){ // two eggs, one wobbling
      ctx.save(); ctx.translate(e,-22); ctx.rotate(e>0?FX.sway(t,6,0.12):0);
      ctx.fillStyle='#fff'; ctx.beginPath(); ctx.ellipse(0,0,5,6.4,0,0,TAU); ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  },
  _chicks:[],
  onTap(x,y,P,tNow){ this._chicks.push({x,y,born:tNow}); if(this._chicks.length>6) this._chicks.shift(); },
  overlay(ctx,t,P,zH){ // tapped chicks parachute down with tiny umbrellas
    for(const c of this._chicks){
      const a=clamp(1-(t-c.born)/6,0,1);
      if(a<=0) continue;
      const y=c.y+(t-c.born)*22, x=c.x+FX.bob(t,2,8,c.x);
      ctx.save(); ctx.translate(x,Math.min(y,zH-14)); ctx.globalAlpha=a;
      ctx.strokeStyle=P.accent; ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.arc(0,-16,9,Math.PI,0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-9,-16); ctx.lineTo(0,-6); ctx.moveTo(9,-16); ctx.lineTo(0,-6); ctx.stroke();
      ctx.fillStyle='#ffd23e'; ctx.beginPath(); ctx.arc(0,0,5,0,TAU); ctx.fill();
      FX.eyes(ctx,0,-1.4,1.1,c.x,t);
      ctx.restore();
    }
    ctx.globalAlpha=1;
  },
});
