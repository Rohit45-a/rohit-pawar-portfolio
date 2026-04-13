// ================= HERO PARTICLES =================
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

let W, H;
let pts = [];
let mouse = { x: 0, y: 0 };

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();

for (let i = 0; i < 80; i++) {
  pts.push({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: Math.random() - 0.5,
    vy: Math.random() - 0.5
  });
}

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function draw() {
  ctx.clearRect(0, 0, W, H);

  pts.forEach(p => {
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      p.vx += dx * 0.0005;
      p.vy += dy * 0.0005;
    }

    p.x += p.vx;
    p.y += p.vy;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#c8ff00';
    ctx.fill();
  });

  requestAnimationFrame(draw);
}
draw();

window.addEventListener('resize', resize);

// ================= SKILLS CHART =================
new Chart(document.getElementById('skillsChart'), {
  type: 'radar',
  data: {
    labels: ['MATLAB', 'Simulink', 'Python', 'C++', 'Control', 'BMS'],
    datasets: [{
      label: 'Skill Level',
      data: [95, 90, 82, 75, 90, 78]
    }]
  },
  options: {
    scales: {
      r: {
        grid: { color: '#222' },
        pointLabels: { color: '#ccc' }
      }
    }
  }
});

// ================= PROJECT CLICK =================
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

// ================= MAGNETIC BUTTON =================
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});

// ================= SIMULATION =================
const sim = document.getElementById('simCanvas');
const sctx = sim.getContext('2d');

sim.width = window.innerWidth;
sim.height = 200;

let t = 0;

function animateSim() {
  sctx.clearRect(0, 0, sim.width, sim.height);

  sctx.beginPath();
  for (let x = 0; x < sim.width; x++) {
    let y = 100 + Math.sin((x + t) * 0.02) * 40;
    sctx.lineTo(x, y);
  }

  sctx.strokeStyle = '#c8ff00';
  sctx.stroke();

  t += 2;
  requestAnimationFrame(animateSim);
}

animateSim();
