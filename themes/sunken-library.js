'use strict';
/* ============================================================
   THEME PACK — SUNKEN LIBRARY
   Books floating like fish with fluttering pages, ink-squid
   librarians, a reading-lamp anglerfish, letters bubbling up.
   ============================================================ */
registerTheme({
  id:'sunken-library', name:'SUNKEN LIBRARY',
  palettes:[
    { hue:192, bg:['#04222b','#0b3c49'], node:'#7fe6ff', nodeDone:'#ffd977',
      lock:'#3a6273', accent:'#ffb85c', text:'#e6f8ff', veil:'#031318' },
    { hue:275, bg:['#190a2c','#2f1349'], node:'#cfa4ff', nodeDone:'#ffd977',
      lock:'#584070', accent:'#6effc0', text:'#f2e9ff', veil:'#100620' },
  ],
  motif(ctx,m,t,P){
    const s=m.s;
    if(m.v<0.36){ // drifting open book, pages fluttering
      ctx.save(); ctx.rotate(FX.sway(t,1.1,0.14,m.v*9)+m.v*0.6-0.3);
      const fl=Math.sin(t*5+m.v*20)*s*0.09;
      ctx.fillStyle=hexA(P.node,0.28); ctx.strokeStyle=hexA(P.text,0.6);
      ctx.lineWidth=1.6; ctx.lineJoin='round';
      for(const e of [-1,1]){
        ctx.beginPath(); ctx.moveTo(0,s*0.06);
        ctx.quadraticCurveTo(e*s*0.3,-s*0.16+e*fl,e*s*0.55,-s*0.02+e*fl);
        ctx.lineTo(e*s*0.55,s*0.2); ctx.quadraticCurveTo(e*s*0.3,s*0.06,0,s*0.24);
        ctx.closePath(); ctx.fill(); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(0,s*0.06); ctx.lineTo(0,s*0.24); ctx.stroke();
      ctx.restore();
    } else if(m.v<0.68){ // wobbly stack of books with a swaying bookmark
      ctx.save(); ctx.rotate(FX.sway(t,0.9,0.05,m.v*7));
      const cols=[hexA(P.accent,0.55),hexA(P.node,0.45),hexA(P.text,0.3)];
      for(let i=0;i<3;i++){
        const w=s*(0.62-i*0.09), h=s*0.16, y=-i*h*1.15+s*0.2;
        ctx.save(); ctx.translate(Math.sin(t*1.3+i*2+m.v*9)*s*0.03,y);
        ctx.rotate((i-1)*0.09+FX.sway(t,1.6,0.03,i));
        ctx.fillStyle=cols[i]; ctx.fillRect(-w/2,-h/2,w,h);
        ctx.strokeStyle=hexA(P.text,0.5); ctx.lineWidth=1.5;
        ctx.strokeRect(-w/2,-h/2,w,h);
        ctx.restore();
      }
      ctx.strokeStyle=P.accent; ctx.lineWidth=2; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(s*0.1,-s*0.22);
      ctx.quadraticCurveTo(s*0.16+FX.bob(t,2,s*0.05,m.v),-s*0.42,s*0.08,-s*0.55);
      ctx.stroke();
      FX.eyes(ctx,0,s*0.18,s*0.035,m.v,t,hexA(P.text,0.75));
      ctx.restore();
    } else { // sunken reading lamp on a kelp stem, swaying, bubbling
      ctx.save(); ctx.rotate(FX.sway(t,0.8,0.09,m.v*13));
      ctx.strokeStyle=hexA(P.node,0.6); ctx.lineWidth=2.4; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(0,s*0.5);
      ctx.quadraticCurveTo(FX.bob(t,1.4,s*0.12,m.v*5),s*0.1,0,-s*0.2); ctx.stroke();
      FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.22);
        ctx.beginPath(); ctx.arc(0,-s*0.3,s*0.26*FX.pulse(t,2.4,0.12,m.v*8),0,TAU); ctx.fill(); });
      ctx.fillStyle=hexA(P.accent,0.85);
      ctx.beginPath(); ctx.moveTo(-s*0.2,-s*0.24); ctx.lineTo(s*0.2,-s*0.24);
      ctx.lineTo(s*0.12,-s*0.44); ctx.lineTo(-s*0.12,-s*0.44); ctx.closePath(); ctx.fill();
      const bub=(t*0.35+m.v)%1;
      ctx.strokeStyle=hexA(P.text,0.5*(1-bub)); ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(Math.sin(bub*9)*s*0.08,-s*0.45-bub*s*0.5,s*0.05,0,TAU); ctx.stroke();
      ctx.restore();
    }
  },
  nodeBody(ctx,r,t,P,st){ // an open book cradling the node, corners fluttering
    ctx.save(); ctx.rotate(FX.sway(t,1.3,0.04));
    const fl=Math.sin(t*6)*r*0.12;
    ctx.fillStyle=st.done?'rgba(255,217,119,0.35)':hexA(P.node,0.3);
    ctx.strokeStyle=st.done?'rgba(255,217,119,0.8)':hexA(P.node,0.7);
    ctx.lineWidth=1.6; ctx.lineJoin='round';
    for(const e of [-1,1]){
      ctx.beginPath(); ctx.moveTo(0,r*0.5);
      ctx.quadraticCurveTo(e*r*0.9,r*0.1+e*fl,e*r*1.5,r*0.4+e*fl);
      ctx.quadraticCurveTo(e*r*1.4,r*1.05,e*r*0.1,r*1.0);
      ctx.closePath(); ctx.fill(); ctx.stroke();
    }
    for(let i=0;i<4;i++){ const b=(t*0.5+i*0.25)%1; // bubbles slipping off the pages
      ctx.strokeStyle=hexA(st.done?P.nodeDone:P.node,0.5*(1-b));
      ctx.beginPath(); ctx.arc(Math.sin(i*4+t)*r,-r*0.4-b*r*1.2,r*0.09,0,TAU); ctx.stroke(); }
    ctx.restore();
  },
  critter(ctx,i,t,P,zH){
    if(i<2){ // book-fish: swim by flapping their covers (travelers)
      const x=FX.crossing(t,24+i*13,G.UNIT_W,i*0.47), y=130+i*(zH-330)+FX.bob(t,1.5,15,i*3);
      const f=FX.flap(t,6.5,0.5,i*2);
      ctx.save(); ctx.translate(x,y); if(i%2)ctx.scale(-1,1);
      const bub=(t*0.8+i*0.5)%1; // exhaled bubble trailing behind
      ctx.strokeStyle=hexA(P.text,0.5*(1-bub)); ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(-14-bub*16,-3-bub*10,2.2,0,TAU); ctx.stroke();
      ctx.fillStyle=i%2?hexA(P.accent,0.85):hexA(P.node,0.8);
      ctx.strokeStyle=hexA(P.text,0.7); ctx.lineWidth=1.6; ctx.lineJoin='round';
      for(const e of [-1,1]){ // covers = wings, hinged at the spine
        ctx.save(); ctx.rotate(e*(0.28+f));
        ctx.beginPath(); ctx.moveTo(-10,0); ctx.lineTo(8,e*-2);
        ctx.quadraticCurveTo(11,e*-5,9,e*-8); ctx.lineTo(-9,e*-5);
        ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
      }
      ctx.fillStyle=hexA(P.text,0.9); // page block peeking between the covers
      ctx.beginPath(); ctx.ellipse(-1,0,8,2.6,0,0,TAU); ctx.fill();
      FX.eyes(ctx,7,-1,1.5,i*1.7,t,'#12222b');
      ctx.restore();
    } else if(i===2){ // reading-lamp anglerfish on patrol (traveler)
      const x=FX.crossing(t,13,G.UNIT_W,0.62), y=zH*0.62+FX.bob(t,0.9,22,4);
      ctx.save(); ctx.translate(x,y);
      const tail=FX.flap(t,5,0.4,1);
      ctx.fillStyle=hexA(P.node,0.35); ctx.strokeStyle=hexA(P.node,0.8);
      ctx.lineWidth=2; ctx.lineJoin='round';
      ctx.save(); ctx.translate(-14,0); ctx.rotate(tail); // tail fin
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-9,-6); ctx.lineTo(-9,6);
      ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
      ctx.beginPath(); ctx.ellipse(0,0,15,10,0,0,TAU); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4,6); ctx.lineTo(11,4); ctx.stroke(); // grin
      ctx.strokeStyle=P.accent; ctx.lineWidth=2; ctx.lineCap='round'; // lure stalk
      ctx.beginPath(); ctx.moveTo(6,-9);
      ctx.quadraticCurveTo(14,-22,20+FX.bob(t,2,2,3),-16); ctx.stroke();
      FX.glow(ctx,()=>{ ctx.fillStyle=hexA(P.accent,0.3); // the reading lamp
        ctx.beginPath(); ctx.arc(20,-14,8*FX.pulse(t,3,0.2),0,TAU); ctx.fill();
        ctx.fillStyle=P.accent; ctx.beginPath(); ctx.arc(20,-14,3,0,TAU); ctx.fill(); });
      ctx.strokeStyle=hexA(P.text,0.8); ctx.lineWidth=1.5; // little round glasses
      ctx.beginPath(); ctx.arc(5,-3,3,0,TAU); ctx.moveTo(11.5,-3); ctx.arc(10,-3,1.8,0,TAU); ctx.stroke();
      FX.eyes(ctx,5,-3,1.3,2.6,t,'#0a1c24');
      ctx.restore();
    } else { // ink-squid librarian, roaming with a tiny book (traveler)
      const [wx,wy]=FX.wander(t,5.1,85,90,0.4);
      const x=200+wx, y=zH*0.35+wy;
      ctx.save(); ctx.translate(x,y); ctx.rotate(FX.sway(t,1.1,0.12,2));
      ctx.strokeStyle=hexA(P.accent,0.8); ctx.lineWidth=2; ctx.lineCap='round';
      for(let k=0;k<5;k++){ const a=(k-2)*0.35; // wiggling tentacles
        ctx.beginPath(); ctx.moveTo((k-2)*3,7);
        ctx.quadraticCurveTo((k-2)*5+Math.sin(t*3.4+k)*3,15,(k-2)*6+Math.sin(t*3.4+k+1)*4,21+a);
        ctx.stroke(); }
      ctx.fillStyle=hexA(P.accent,0.55); ctx.strokeStyle=hexA(P.accent,0.9);
      ctx.beginPath(); ctx.moveTo(-9,7); ctx.quadraticCurveTo(-10,-12,0,-13*FX.pulse(t,2.2,0.06));
      ctx.quadraticCurveTo(10,-12,9,7); ctx.closePath(); ctx.fill(); ctx.stroke();
      FX.eyes(ctx,0,-1,1.8,3.9,t,'#101024');
      ctx.save(); ctx.translate(11,14); ctx.rotate(FX.sway(t,2,0.2,5)); // its tiny book
      ctx.fillStyle=hexA(P.text,0.85); ctx.fillRect(-4,-3,8,6);
      ctx.strokeStyle=hexA(P.node,0.9); ctx.lineWidth=1.5;
      ctx.strokeRect(-4,-3,8,6); ctx.beginPath(); ctx.moveTo(0,-3); ctx.lineTo(0,3); ctx.stroke();
      ctx.restore(); ctx.restore();
    }
  },
  drifter(ctx,d,t,P){ // single letters bubbling upward
    const L='AEBOKRSWMG', ch=L[Math.floor(d.ph*3.7)%L.length];
    ctx.save(); ctx.rotate(FX.sway(t,1.4,0.3,d.ph));
    ctx.font='900 '+(d.s*0.55)+'px system-ui,sans-serif';
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillStyle=hexA(P.text,0.35+Math.sin(t*2+d.ph)*0.15);
    ctx.fillText(ch,0,0);
    ctx.strokeStyle=hexA(P.node,0.3); ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(0,0,d.s*0.42*FX.pulse(t,2,0.08,d.ph),0,TAU); ctx.stroke();
    ctx.restore();
  },
  hero(ctx,t,P,zH){ // the Great Tome: a giant open book shedding glowing letters
    ctx.save(); ctx.translate(0,FX.bob(t,0.7,5));
    ctx.fillStyle=hexA(P.veil,0.9); // pedestal rock
    ctx.beginPath(); ctx.ellipse(0,30,30,10,0,0,TAU); ctx.fill();
    const fl=Math.sin(t*3)*4;
    ctx.fillStyle=hexA(P.node,0.3); ctx.strokeStyle=hexA(P.node,0.85);
    ctx.lineWidth=2.4; ctx.lineJoin='round';
    for(const e of [-1,1]){ // the two great pages, breathing
      ctx.beginPath(); ctx.moveTo(0,6);
      ctx.quadraticCurveTo(e*20,-8+e*fl,e*34,-2+e*fl);
      ctx.quadraticCurveTo(e*32,16,e*2,20); ctx.closePath(); ctx.fill(); ctx.stroke();
    }
    ctx.lineWidth=1.5; ctx.strokeStyle=hexA(P.text,0.45);
    for(const e of [-1,1]) for(let r=0;r<3;r++){ // lines of "text"
      ctx.beginPath(); ctx.moveTo(e*6,8+r*3.6);
      ctx.lineTo(e*26,3.4+r*3.6+e*fl*0.3); ctx.stroke(); }
    const flip=(t*0.35)%1; // a loose page mid-turn
    ctx.strokeStyle=hexA(P.text,0.7*(1-flip)); ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0,6);
    ctx.quadraticCurveTo(Math.cos(flip*Math.PI)*24,-14-flip*8,Math.cos(flip*Math.PI)*30,-4-flip*10);
    ctx.stroke();
    for(let k=0;k<3;k++){ const b=(t*0.3+k/3)%1; // letters escaping the tome
      ctx.font='900 10px system-ui,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillStyle=hexA(P.accent,0.8*(1-b));
      ctx.fillText('AEIOU'[(k*2+1)%5],Math.sin(b*7+k*3)*14,-6-b*44); }
    FX.eyes(ctx,0,26,1.6,0.8,t,hexA(P.text,0.8)); // the tome is watching
    ctx.restore();
  },
  _words:[],
  onTap(x,y,P,tNow){
    const W=['HUSH!','PLOP','GLUB','SHH…','BLUB','FISH?'];
    this._words.push({x,y,at:tNow,w:W[Math.floor(tNow*7)%W.length]});
    if(this._words.length>5) this._words.shift();
  },
  overlay(ctx,t,P,zH){ // drowned light rays + tapped words bubbling away
    for(let i=0;i<3;i++){ const rx=70+i*120+Math.sin(t*0.3+i*2)*24;
      const g=ctx.createLinearGradient(0,0,0,zH*0.7);
      g.addColorStop(0,hexA(P.node,0.10)); g.addColorStop(1,hexA(P.node,0));
      ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(rx-8,0); ctx.lineTo(rx+8,0);
      ctx.lineTo(rx+34,zH*0.7); ctx.lineTo(rx-34,zH*0.7); ctx.closePath(); ctx.fill(); }
    for(const b of this._words){
      const age=t-b.at; if(age<0||age>2.2) continue;
      const al=(1-age/2.2);
      ctx.save(); ctx.translate(b.x+Math.sin(age*5+b.x)*8,b.y-age*46);
      ctx.rotate(FX.sway(t,3,0.1,b.x)); ctx.globalAlpha=al;
      ctx.font='900 13px system-ui,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.strokeStyle=hexA(P.node,0.6); ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(0,0,15,0,TAU); ctx.stroke();
      ctx.fillStyle=P.accent; ctx.fillText(b.w,0,0.5);
      ctx.restore();
    }
    ctx.globalAlpha=1;
  },
});
