'use strict';
/* ============================================================
   THEME PACK — ORIGAMI CANYON
   Folded paper cliffs with visible crease lines, paper cranes
   flapping stiffly, drifting paper planes, an unfolding paper sun.
   ============================================================ */

/* pack-local helpers: angular paper, hinged motion */
const ocPoly=(ctx,pts)=>{ ctx.beginPath();
  for(let i=0;i<pts.length;i++) i?ctx.lineTo(pts[i][0],pts[i][1]):ctx.moveTo(pts[i][0],pts[i][1]);
  ctx.closePath(); };
const ocHinge=(t,sp=7,amp=0.5,ph=0)=>Math.tanh(Math.sin(t*sp+ph)*2.6)*amp; // snappy fold
const ocCrane=(ctx,t,P,seed,sc)=>{ // stiff-winged paper crane at origin, faces +x
  ctx.save(); ctx.scale(sc,sc);
  const f=ocHinge(t,7.5,0.55,seed*5);
  ctx.lineJoin='miter'; ctx.strokeStyle=hexA(P.accent,0.55); ctx.lineWidth=1.5/sc;
  ctx.fillStyle=hexA(P.text,0.55);                      // far wing (behind)
  ctx.save(); ctx.translate(1,-2); ctx.rotate(0.35-f*0.8);
  ocPoly(ctx,[[-4,0],[5,0],[0,-10]]); ctx.fill(); ctx.stroke(); ctx.restore();
  ctx.fillStyle=hexA(P.text,0.95);                      // body: folded diamond
  ocPoly(ctx,[[-6,0],[0,-4],[7,0],[0,4]]); ctx.fill(); ctx.stroke();
  ocPoly(ctx,[[-6,0],[-12,-6],[-6,2]]); ctx.fill(); ctx.stroke();   // tail spike
  ocPoly(ctx,[[5,-2],[11,-9],[8,-0.5]]); ctx.fill(); ctx.stroke();  // neck
  ctx.fillStyle=P.accent; ocPoly(ctx,[[11,-9],[15.5,-8],[11,-6]]); ctx.fill(); // beak
  ctx.beginPath(); ctx.moveTo(-6,0); ctx.lineTo(7,0); ctx.stroke(); // center crease
  ctx.fillStyle=hexA(P.text,0.9);                       // near wing, hinged at spine
  ctx.save(); ctx.translate(0,-2); ctx.rotate(-0.25+f);
  ocPoly(ctx,[[-4,0],[6,0],[1,-12]]); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(1,-12); ctx.lineTo(1,0); ctx.stroke();
  ctx.restore();
  FX.eyes(ctx,10.6,-8.2,0.9,seed,t);
  ctx.restore(); };
const ocPlane=(ctx,P,crease)=>{ // paper dart at origin, faces +x
  ctx.lineJoin='miter'; ctx.strokeStyle=hexA(P.accent,0.6); ctx.lineWidth=1.5;
  ctx.fillStyle=hexA(P.text,0.9);
  ocPoly(ctx,[[10,0],[-8,-6],[-5,0]]); ctx.fill(); ctx.stroke();  // top fold
  ctx.fillStyle=hexA(P.text,0.6);
  ocPoly(ctx,[[10,0],[-8,6],[-5,0]]); ctx.fill(); ctx.stroke();   // under fold
  ctx.beginPath(); ctx.moveTo(10,0); ctx.lineTo(-5,0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(10,0); ctx.lineTo(-8,-6+crease); ctx.stroke(); };

registerTheme({
  id:'origami-canyon', name:'ORIGAMI CANYON',
  palettes:[
    { hue:16, bg:['#2b120a','#4d2513'], node:'#ffc79c', nodeDone:'#ffd977',
      lock:'#6d4a37', accent:'#ff7a4d', text:'#fff2e3', veil:'#1a0a05' },
    { hue:226, bg:['#0e1231','#252c5c'], node:'#aab9ff', nodeDone:'#ffd977',
      lock:'#4a5078', accent:'#7dead6', text:'#eaeeff', veil:'#080b20' },
  ],
  motif(ctx,m,t,P){
    const s=m.s;
    if(m.v<0.34){ // folded paper mesa — top facet hinges open and shut
      ctx.save(); ctx.rotate(FX.sway(t,0.7,0.05,m.v*9));
      ctx.lineJoin='miter'; ctx.strokeStyle=hexA(P.accent,0.5); ctx.lineWidth=1.6;
      ctx.fillStyle=hexA(P.accent,0.28);
      ocPoly(ctx,[[-s*0.5,s*0.4],[-s*0.26,-s*0.28],[s*0.2,-s*0.28],[s*0.5,s*0.4]]);
      ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-s*0.26,-s*0.28); ctx.lineTo(-s*0.06,s*0.4); // crease
      ctx.moveTo(s*0.2,-s*0.28); ctx.lineTo(s*0.3,s*0.4); ctx.stroke();
      const lift=0.5+ocHinge(t,1.3,0.42,m.v*7);         // hinged summit flap
      ctx.save(); ctx.translate(-0.03*s,-s*0.28); ctx.scale(1,Math.max(0.12,lift));
      ctx.fillStyle=hexA(P.text,0.5);
      ocPoly(ctx,[[-s*0.23,0],[s*0.23,0],[0,-s*0.34]]); ctx.fill(); ctx.stroke();
      ctx.restore();
      FX.eyes(ctx,0,s*0.06,s*0.05,m.v,t,hexA(P.text,0.8));
      ctx.restore();
    } else if(m.v<0.68){ // pleated paper fan-cactus, breathing open
      ctx.save(); ctx.rotate(FX.sway(t,1,0.08,m.v*11));
      const open=0.55+Math.sin(t*1.5+m.v*8)*0.3, n=6;
      ctx.lineJoin='miter'; ctx.lineWidth=1.5; ctx.strokeStyle=hexA(P.text,0.6);
      for(let i=0;i<n;i++){ const a=-Math.PI/2+(i-(n-1)/2)*open*0.42;
        ctx.fillStyle=i%2?hexA(P.accent,0.42):hexA(P.text,0.3);
        ctx.save(); ctx.rotate(a);
        ocPoly(ctx,[[0,0],[-s*0.09,-s*0.52],[s*0.09,-s*0.52]]); ctx.fill(); ctx.stroke();
        ctx.restore(); }
      ctx.fillStyle=hexA(P.text,0.85);
      ocPoly(ctx,[[-s*0.1,0],[s*0.1,0],[0,s*0.14]]); ctx.fill(); // pivot pin
      ctx.restore();
    } else { // origami pinwheel star, four kites snapping around
      ctx.save(); ctx.rotate(t*0.6+ocHinge(t,2.2,0.35,m.v*6));
      ctx.lineJoin='miter'; ctx.lineWidth=1.6; ctx.strokeStyle=hexA(P.accent,0.55);
      for(let i=0;i<4;i++){ ctx.save(); ctx.rotate(i/4*TAU);
        ctx.fillStyle=i%2?hexA(P.accent,0.5):hexA(P.text,0.45);
        ocPoly(ctx,[[0,0],[s*0.42,-s*0.14],[s*0.5,s*0.1],[s*0.16,s*0.16]]);
        ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(s*0.42,-s*0.14); ctx.stroke();
        ctx.restore(); }
      ctx.restore();
      ctx.fillStyle=hexA(P.text,0.95);
      ocPoly(ctx,[[-s*0.1,-s*0.1],[s*0.1,-s*0.1],[s*0.1,s*0.1],[-s*0.1,s*0.1]]); ctx.fill();
      FX.eyes(ctx,0,-s*0.02,s*0.035,m.v,t);
    }
  },
  nodeBody(ctx,r,t,P,st){ // folded paper rosette, slowly turning
    ctx.save(); ctx.rotate(t*0.4); ctx.lineJoin='miter';
    for(let i=0;i<8;i++){ ctx.save(); ctx.rotate(i/8*TAU);
      ctx.fillStyle=st.done?'rgba(255,217,119,0.45)':i%2?hexA(P.accent,0.5):hexA(P.text,0.35);
      ocPoly(ctx,[[0,0],[r*0.5,-r*0.34],[r*1.18+ocHinge(t,2,0.08,i)*r,0],[r*0.5,r*0.34]]);
      ctx.fill(); ctx.restore(); }
    ctx.restore();
  },
  critter(ctx,i,t,P,zH){
    if(i<2){ // commuting paper cranes with stiff hinged wingbeats
      const dir=i%2?-1:1;
      const x=FX.crossing(t,34+i*14,G.UNIT_W,i*0.47), y0=110+i*(zH-300)*0.72;
      const y=y0+FX.bob(t,1.2,14,i*3)+ocHinge(t,7.5,3,i*5); // stiff lurch per beat
      ctx.save(); ctx.translate(dir<0?G.UNIT_W-x:x,y); ctx.scale(dir,1);
      ocCrane(ctx,t,P,i*0.7+0.3,1.15);
      ctx.restore();
    } else if(i===2){ // paper plane riding a swooping loop
      const x=FX.crossing(t,58,G.UNIT_W,0.42), ph=t*2.2;
      const y=zH*0.36+Math.sin(ph)*46, ang=Math.atan2(Math.cos(ph)*46*2.2,58);
      ctx.save(); ctx.translate(x,y); ctx.rotate(ang);
      ocPlane(ctx,P,ocHinge(t,9,1.4,2));
      ctx.strokeStyle=hexA(P.accent,0.3); ctx.setLineDash([3,6]); ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(-10,0); ctx.lineTo(-30,0); ctx.stroke(); ctx.setLineDash([]);
      ctx.restore();
    } else { // origami frog patrolling the canyon floor in hops
      const [wx]=FX.wander(t,3.1,110,10,0.35), hop=Math.abs(Math.sin(t*3.4));
      const x=170+wx, y=zH-96-hop*16;
      ctx.save(); ctx.translate(x,y); ctx.rotate(ocHinge(t,3.4,0.12,1));
      ctx.lineJoin='miter'; ctx.strokeStyle=hexA(P.accent,0.5); ctx.lineWidth=1.5;
      ctx.fillStyle=hexA(P.accent,0.75);
      ocPoly(ctx,[[-9,3],[-4,-6],[8,-4],[10,3]]); ctx.fill(); ctx.stroke(); // folded body
      ctx.beginPath(); ctx.moveTo(-4,-6); ctx.lineTo(2,3); ctx.stroke();    // crease
      ocPoly(ctx,[[-9,3],[-13,7-hop*5],[-6,4]]); ctx.fill(); ctx.stroke();  // spring leg
      ocPoly(ctx,[[8,3],[13,7-hop*4],[5,4]]); ctx.fill(); ctx.stroke();
      ctx.fillStyle=hexA(P.text,0.95);
      for(const e of [-1,1]){ ocPoly(ctx,[[e*4-2,-6],[e*4+2,-6],[e*4,-10]]); ctx.fill(); }
      FX.eyes(ctx,4.5,-7,1,0.6,t);
      ctx.restore();
    }
  },
  drifter(ctx,d,t,P){ // tumbling scrap of two-tone paper
    ctx.save(); ctx.rotate(t*1.6+d.ph); ctx.scale(1,0.35+Math.abs(Math.sin(t*2+d.ph))*0.65);
    const s=d.s*0.28;
    ctx.fillStyle=hexA(P.text,0.55); ocPoly(ctx,[[-s,0],[0,-s],[s,0]]); ctx.fill();
    ctx.fillStyle=hexA(P.accent,0.4); ocPoly(ctx,[[-s,0],[0,s],[s,0]]); ctx.fill();
    ctx.restore();
  },
  hero(ctx,t,P,zH){ // the unfolding paper sun — the zone's postcard
    const u=(Math.sin(t*0.55)+1)/2, open=u*u*(3-2*u);   // eased unfold cycle
    ctx.save(); ctx.rotate(t*0.12);
    ctx.lineJoin='miter'; ctx.lineWidth=1.6; ctx.strokeStyle=hexA(P.accent,0.6);
    for(let i=0;i<10;i++){ ctx.save(); ctx.rotate(i/10*TAU);
      ctx.translate(15,0); ctx.rotate((1-open)*1.5);    // rays hinge outward
      ctx.scale(0.25+open*0.75,1);
      ctx.fillStyle=i%2?hexA(P.accent,0.7):'rgba(255,217,119,0.65)';
      ocPoly(ctx,[[0,-5],[20,0],[0,5]]); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(20,0); ctx.stroke();
      ctx.restore(); }
    ctx.fillStyle='rgba(255,217,119,0.95)';             // faceted octagon core
    ctx.beginPath();
    for(let i=0;i<8;i++){ const a=i/8*TAU+Math.PI/8;
      ctx[i?'lineTo':'moveTo'](Math.cos(a)*15,Math.sin(a)*15); }
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle=hexA(P.accent,0.5);
    for(let i=0;i<4;i++){ const a=i/4*TAU+Math.PI/8;    // core crease lines
      ctx.beginPath(); ctx.moveTo(Math.cos(a)*15,Math.sin(a)*15);
      ctx.lineTo(-Math.cos(a)*15,-Math.sin(a)*15); ctx.stroke(); }
    ctx.restore();
    FX.eyes(ctx,0,-3,1.7,0.4,t,'#5b3b10');
    ctx.strokeStyle='#5b3b10'; ctx.lineWidth=2; ctx.lineCap='round';
    ctx.beginPath();                                    // smile, folded flat
    ctx.moveTo(-4,4+open*2); ctx.lineTo(0,6+open*2); ctx.lineTo(4,4+open*2); ctx.stroke();
  },
  _folds:[],
  onTap(x,y,P,tNow){ this._folds.push({x,y,at:tNow}); if(this._folds.length>6) this._folds.shift(); },
  overlay(ctx,t,P,zH){
    ctx.save(); ctx.globalAlpha=0.08;                   // faint drifting crease-light
    ctx.strokeStyle=P.text; ctx.lineWidth=2;
    for(let i=0;i<3;i++){ const yy=((t*12+i*zH/3)%zH);
      ctx.beginPath(); ctx.moveTo(0,yy); ctx.lineTo(G.UNIT_W,yy-46); ctx.stroke(); }
    ctx.restore();
    for(const c of this._folds){                        // tap folds a crane to life
      const age=t-c.at; if(age<0||age>5) continue;
      const born=Math.min(1,age/0.8), fly=Math.max(0,age-0.8);
      ctx.save(); ctx.globalAlpha=clamp(1-(age-3.4)/1.6,0,1);
      ctx.translate(c.x+fly*fly*26,c.y-fly*46+FX.bob(t,4,3,c.x));
      ctx.rotate((1-born)*2.5-0.2); ctx.scale(born,born);
      ocCrane(ctx,t,P,c.x*0.01,1);
      ctx.restore();
    }
    ctx.globalAlpha=1;
  },
});
