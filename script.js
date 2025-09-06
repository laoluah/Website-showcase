// Animated background particles (lightweight, no libs)
(function sparkle(){
  const c = document.getElementById('bg-canvas');
  const ctx = c.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  let w, h, dots;
  function resize(){
    w = c.width = innerWidth * DPR;
    h = c.height = innerHeight * DPR;
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    dots = Array.from({length: Math.floor((w*h) / (22000 * DPR))}, () => ({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.2 + 0.5,
      a: Math.random()*Math.PI*2,
      s: Math.random()*0.6 + 0.1
    }));
  }
  function frame(){
    ctx.clearRect(0,0,w,h);
    for(const d of dots){
      d.x += Math.cos(d.a)*d.s;
      d.y += Math.sin(d.a)*d.s;
      if(d.x<0) d.x=w; if(d.x>w) d.x=0; if(d.y<0) d.y=h; if(d.y>h) d.y=0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      const g = ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r*3);
      g.addColorStop(0,'rgba(124,92,255,0.9)');
      g.addColorStop(0.5,'rgba(0,217,255,0.5)');
      g.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  addEventListener('resize', resize);
  resize(); frame();
})();

// Year
document.getElementById('year').textContent = new Date(
