// Custom cursor
const cur = document.getElementById('cur');
const ring = document.getElementById('ring');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function trackRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(trackRing);
})();
document.querySelectorAll('a, button, .proj-card, .exp-item, .skills-table tr').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('hover'); ring.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cur.classList.remove('hover'); ring.classList.remove('hover'); });
});

// Hero particle canvas
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let pts = [], W, H;
function resize() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
function init() {
  pts = [];
  for (let i = 0; i < 90; i++) {
    pts.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5, r: Math.random()*1.5+0.3 });
  }
}
function draw() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(200,255,0,0.55)'; ctx.fill();
    pts.forEach(q => {
      const d = Math.hypot(p.x-q.x, p.y-q.y);
      if (d < 130) {
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(200,255,0,${0.09*(1-d/130)})`;
        ctx.lineWidth = 0.5; ctx.stroke();
      }
    });
  });
  requestAnimationFrame(draw);
}
resize(); init(); draw();
window.addEventListener('resize', () => { resize(); init(); });

// Skill bar animation on scroll
const fills = document.querySelectorAll('.bar-fill');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      fills.forEach(f => { f.style.width = f.dataset.w + '%'; });
      obs.disconnect();
    }
  });
}, { threshold: 0.3 });
const st = document.getElementById('skills-table');
if (st) obs.observe(st);

// Stagger exp items on scroll
const expObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.exp-item, .proj-card, .edu-card, .stat-box').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i*0.08}s, transform 0.6s ease ${i*0.08}s`;
  expObs.observe(el);
});