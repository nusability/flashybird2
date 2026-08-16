/* ============================================================
   THEME PACK — THUNDER MEADOW
   Storm clouds grazing like sheep, lightning-seed dandelions,
   static-frizzed birds, slow dotted rain, and a shepherd cloud
   keeping the flock together with a crackling crook.
   ============================================================ */
registerTheme({
  id:'thunder-meadow', name:'THUNDER MEADOW',
  palettes:[
    { hue:74,  bg:['#0b2213','#1d3d1b'], node:'#d9ff70', nodeDone:'#ffd977',
      lock:'#476b4c', accent:'#ffe94a', text:'#eefbe4', veil:'#06140b' },
    { hue:262, bg:['#160a30','#2c1754'], node:'#c3adff', nodeDone:'#ffcf6e',
      lock:'#55487c', accent:'#6ef2ff', text:'#efe9ff', veil:'#0c0620' },
  ],
  /* little storm-sheep body, shared by critters & hero flock */
  _sheep(ctx,s,t,seed,P){
    const trot=Math.sin(t*6+seed*5);
    ctx.lineCap='round';
    ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.lineWidth=2;
    for(const l of [-1,1]){ ctx.beginPath();                     // trotting legs
      ctx.moveTo(l*s*0.38,s*0.26); ctx.lineTo(l*s*0.38+trot*l*s*0.1,s*0.55); ctx.stroke(); }
    ctx.fillStyle='rgba(235,240,255,0.28)';
    ctx.beginPath();                                             // woolly cloud body
    ctx.arc(-s*0.42,0,s*0.3,0,TAU); ctx.arc(0,-s*0.17,s*0.38,0,TAU);
    ctx.arc(s*0.36,0,s*0.28,0,TAU); ctx.arc(0,s*0.12,s*0.33,0,TAU); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.4)';
    ctx.beginPath(); ctx.arc(s*0.58,-s*0.14,s*0.2,0,TAU); ctx.fill();  // head
    ctx.beginPath(); ctx.ellipse(s*0.5,-s*0.32,s*0.1,s*0.05,-0.5,0,TAU); ctx.fill(); // ear
    FX.eyes(ctx,s*0.6,-s*0.16,s*0.035,seed,t);
    const sp=(t*0.6+seed*7)%7;
    if(sp<0.4){                                                  // graze-spark!
      const a=Math.sin(sp/0.4*Math.PI);
      FX.glow(ctx,()=>{ ctx.strokeStyle=hexA(P.accent,0.9*a);
        ctx.lineWidth=1.8; ctx.beginPath(); ctx.moveTo(0,s*0.4);
        ctx.lineTo(-s*0.08,s*0.58); ctx.lineTo(s*0.06,s*0.62); ctx.lineTo(-s*0.04,s*0.82);
        ctx.stroke(); });
    }
  },
  motif(ctx,m,t,P){
    const s=m.s;
    if(m.v<0.38){                                                // grazing storm-sheep
      ctx.save(); if(m.v>0.19) ctx.scale(-1,1);
      const nib=Math.max(0,Math.sin(t*1.3+m.v*20));              // head dips to graze
      ctx.rotate(nib*0.09);
      this._sheep(ctx,s*0.55,t,m.v*9,P);
      ctx.restore();
    } else if(m.v<0.7){                                          // lightning-seed dandelion
      ctx.save(); ctx.rotate(FX.sway(t,1.1,0.1,m.v*11));
      ctx.strokeStyle='rgba(180,255,170,0.55)'; ctx.lineWidth=2; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(0,s*0.5);
      ctx.quadraticCurveTo(FX.bob(t,1.4,s*0.06,m.v*8),0,0,-s*0.28); ctx.stroke();
      const crackle=FX.pulse(t,5,0.12,m.v*17);
      FX.glow(ctx,()=>{
        ctx.strokeStyle=hexA(P.accent,0.75); ctx.lineWidth=1.5;
        for(let i=0;i<8;i++){ const a=i/8*TAU+FX.sway(t,2,0.15,i+m.v*5);
          const r=s*0.3*crackle, mx=Math.cos(a)*r*0.55, my=-s*0.28+Math.sin(a)*r*0.55;
          ctx.beginPath(); ctx.moveTo(0,-s*0.28);                // seeds are tiny bolts
          ctx.lineTo(mx+Math.sin(a*7)*2.5,my); ctx.lineTo(Math.cos(a)*r,-s*0.28+Math.sin(a)*r);
          ctx.stroke(); }
        ctx.fillStyle=hexA(P.accent,0.9);
        ctx.beginPath(); ctx.arc(0,-s*0.28,s*0.06*crackle,0,TAU); ctx.fill(); });
      ctx.restore();
    } else {                                                     // charged grass tuft
      ctx.save(); ctx.lineCap='round';
      for(let i=0;i<5;i++){ const b=(i-2)/2, ph=m.v*13+i;
        const lean=b*0.5+FX.sway(t,1.6,0.2,ph);
        ctx.strokeStyle='rgba(150,235,150,'+(0.35+i%2*0.2)+')'; ctx.lineWidth=2.2;
        ctx.beginPath(); ctx.moveTo(b*s*0.12,s*0.4);
        ctx.quadraticCurveTo(b*s*0.2,0,b*s*0.16+lean*s*0.34,-s*0.42); ctx.stroke();
        if(FX.blink(t,ph)) FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.9);  // tip pops
          ctx.beginPath(); ctx.arc(b*s*0.16+lean*s*0.34,-s*0.42,2.2,0,TAU); ctx.fill(); });
      }
      ctx.restore();
    }
  },
  nodeBody(ctx,r,t,P,st){                                        // puff-and-bolt halo
    for(let i=0;i<8;i++){ const a=i/8*TAU+t*0.45;
      const x=Math.cos(a)*r*0.75, y=Math.sin(a)*r*0.75;
      if(i%2){ ctx.fillStyle=st.done?'rgba(255,217,119,0.4)':'rgba(235,240,255,0.3)';
        ctx.beginPath(); ctx.arc(x,y,r*0.28+FX.bob(t,3,1,i),0,TAU); ctx.fill();
      } else { ctx.strokeStyle=st.done?'rgba(255,217,119,0.6)':hexA(P.accent,0.55);
        ctx.lineWidth=1.6; ctx.lineCap='round'; ctx.beginPath();
        ctx.moveTo(x-2,y-4); ctx.lineTo(x+1,y); ctx.lineTo(x-1,y+1); ctx.lineTo(x+2,y+5);
        ctx.stroke(); }
    }
  },
  critter(ctx,i,t,P,zH){
    if(i<2){                                                     // the herd drifts across
      const x=FX.crossing(t,13+i*5,G.UNIT_W,i*0.47);
      const y=zH*0.28+i*zH*0.38+FX.bob(t,1.1,7,i*3);
      ctx.save(); ctx.translate(x,y); if(i%2)ctx.scale(-1,1);
      this._sheep(ctx,14,t,i*3.3,P);
      ctx.restore();
    } else if(i===2){                                            // lamb bounding after them
      const x=FX.crossing(t,18,G.UNIT_W,0.47-0.14);
      const y=zH*0.28+FX.bob(t,1.1,7,0)+6-Math.abs(Math.sin(t*4))*10;
      ctx.save(); ctx.translate(x,y);
      this._sheep(ctx,8,t,7.7,P);
      ctx.restore();
    } else {                                                     // static-frizzed bird
      const [wx,wy]=FX.wander(t,4.2,80,70,0.4);
      const x=200+wx, y=zH*0.62+wy, f=FX.flap(t,11,0.5);
      ctx.save(); ctx.translate(x,y);
      FX.glow(ctx,()=>{ ctx.strokeStyle=hexA(P.accent,0.6); ctx.lineWidth=1.5; ctx.lineCap='round';
        for(let k=0;k<9;k++){ const a=k/9*TAU+0.3, j=1+FX.blink(t,k)*0.5;    // hair on end
          ctx.beginPath(); ctx.moveTo(Math.cos(a)*6,Math.sin(a)*5);
          ctx.lineTo(Math.cos(a)*(10+Math.sin(t*7+k)*1.5)*j,Math.sin(a)*(9)*j); ctx.stroke(); } });
      ctx.fillStyle=P.text; ctx.globalAlpha=0.92;
      ctx.beginPath(); ctx.ellipse(0,0,6.5,5.5,0,0,TAU); ctx.fill();
      ctx.fillStyle=P.text;
      ctx.beginPath(); ctx.ellipse(-4,-2,4.5,2,-0.7-f,0,TAU); ctx.fill();    // startled wing
      ctx.fillStyle=P.accent;
      ctx.beginPath(); ctx.moveTo(6,-0.5); ctx.lineTo(9.5,0.5); ctx.lineTo(6,1.5); ctx.fill();
      FX.eyes(ctx,0.5,-1.5,1.5,4.2,t);                           // permanently astonished
      ctx.restore(); ctx.globalAlpha=1;
    }
  },
  drifter(ctx,d,t,P){                                            // rising lightning seed
    ctx.save(); ctx.rotate(FX.sway(t,1.3,0.5,d.ph));
    FX.glow(ctx,()=>{
      ctx.strokeStyle=hexA(P.accent,0.5); ctx.lineWidth=1.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(0,-d.s*0.05);
      ctx.lineTo(-d.s*0.07,d.s*0.12); ctx.lineTo(d.s*0.05,d.s*0.16); ctx.lineTo(-d.s*0.03,d.s*0.32);
      ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,'+(0.35+FX.blink(t,d.ph)*0.4)+')';
      ctx.beginPath(); ctx.arc(0,-d.s*0.1,d.s*0.09,0,TAU); ctx.fill(); });
    ctx.restore();
  },
  hero(ctx,t,P,zH){                                              // the shepherd cloud
    ctx.save(); ctx.translate(0,FX.bob(t,0.9,5));
    const sw=FX.sway(t,0.8,0.08);
    ctx.save(); ctx.rotate(sw); ctx.translate(24,-2);            // the crook
    ctx.strokeStyle='hsl(35,70%,55%)'; ctx.lineWidth=3.2; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(0,30); ctx.lineTo(0,-26);
    ctx.arc(-7,-26,7,0,Math.PI,true); ctx.stroke();
    const wh=(t*0.5)%8;
    if(wh<0.5) FX.glow(ctx,()=>{ const a=Math.sin(wh/0.5*Math.PI);   // crook whistles sparks
      ctx.fillStyle=hexA(P.accent,0.9*a);
      ctx.beginPath(); ctx.arc(-14,-26-wh*20,2.6,0,TAU); ctx.fill(); });
    ctx.restore();
    ctx.fillStyle='rgba(235,240,255,0.3)';                       // stout cloud shepherd
    ctx.beginPath();
    ctx.arc(-16,2,13,0,TAU); ctx.arc(0,-8,17,0,TAU);
    ctx.arc(14,2,12,0,TAU); ctx.arc(0,8,15,0,TAU); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.35)';
    ctx.beginPath(); ctx.arc(20,-4,6,0,TAU); ctx.fill();         // hand on the crook
    ctx.save(); ctx.rotate(-0.15);                               // rumpled storm hat
    ctx.fillStyle=hexA(P.accent,0.55);
    ctx.beginPath(); ctx.moveTo(-11,-20); ctx.quadraticCurveTo(-2,-34+FX.bob(t,2,1.5),8,-21);
    ctx.quadraticCurveTo(-2,-25,-11,-20); ctx.fill(); ctx.restore();
    FX.eyes(ctx,-2,-10,2.4,0.5,t,'#1a2418');
    ctx.strokeStyle='#1a2418'; ctx.lineWidth=2; ctx.lineCap='round';
    ctx.beginPath(); ctx.arc(-2,-4,4.5,0.4,Math.PI-0.4); ctx.stroke();  // proud smile
    ctx.restore();
  },
  _bolts:[],
  onTap(x,y,P,tNow){ this._bolts.push({x,y,at:tNow}); if(this._bolts.length>5) this._bolts.shift(); },
  overlay(ctx,t,P,zH){
    ctx.save();                                                  // slow dotted rain
    ctx.fillStyle='rgba(200,225,255,0.16)';
    for(let c=0;c<11;c++){ const x0=(c*137.5)%G.UNIT_W, drift=Math.sin(c*5)*8;
      for(let k=0;k<6;k++){
        const y=((c*61+k*zH/6+t*26)%zH), x=x0+drift*Math.sin(y*0.01+c);
        ctx.beginPath(); ctx.arc(x,y,1.3,0,TAU); ctx.fill();
        ctx.beginPath(); ctx.arc(x,y+6,0.8,0,TAU); ctx.fill();   // dotted-line tail
      }
    }
    const fl=(t%13);                                             // far-off sheet flash
    if(fl<0.5){ ctx.fillStyle='rgba(255,255,240,'+(Math.sin(fl/0.5*Math.PI)*0.08)+')';
      ctx.fillRect(0,0,G.UNIT_W,zH); }
    for(const b of this._bolts){                                 // tap: a tiny strike
      const age=t-b.at; if(age<0||age>1.1) continue;
      const a=1-age/1.1;
      FX.glow(ctx,()=>{
        ctx.strokeStyle=hexA(P.accent,0.9*a); ctx.lineWidth=2.5; ctx.lineCap='round';
        ctx.beginPath(); let yy=b.y-46;
        ctx.moveTo(b.x+Math.sin(b.x)*6,yy);
        for(let s=1;s<=5;s++){ yy+=9.2;
          ctx.lineTo(b.x+Math.sin(b.x*3+s*4.7)*7*(1-s/6),yy); }
        ctx.stroke();
        ctx.strokeStyle='rgba(255,255,255,'+(0.5*a)+')';
        ctx.beginPath(); ctx.arc(b.x,b.y,4+age*30,0,TAU); ctx.stroke(); });  // ground ring
    }
    ctx.restore(); ctx.globalAlpha=1;
  },
});
