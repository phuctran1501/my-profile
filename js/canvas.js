/**
 * Kinetic Luminescent Aurora & Ambient Energy Field Canvas
 * Inspired by Apple, Vercel, Linear & Impeccable Design
 * Perfectly synchronized between Dark Mode (Obsidian Blue) & Light Mode (Azure Pearl)
 * 60 FPS lightweight physics, interactive cursor repulsion & fluid energy blending
 */

(function () {
  const canvas = document.getElementById('geometric-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animId = null;

  // Mouse & Physics Tracking
  const mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    vx: 0,
    vy: 0,
    radius: 240,
    isHovered: false
  };

  // Color Palettes
  const THEME_PALETTES = {
    dark: {
      aurora1: { r: 31, g: 92, b: 169, alpha: 0.28 },   // Signature CTU Blue
      aurora2: { r: 56, g: 189, b: 248, alpha: 0.22 },  // Electric Cyan
      aurora3: { r: 15, g: 61, b: 117, alpha: 0.32 },   // Deep Navy Accent
      aurora4: { r: 99, g: 102, b: 241, alpha: 0.16 },  // Subtle Indigo
      particleColor: 'rgba(56, 189, 248, 0.45)',
      lineColor: 'rgba(56, 189, 248, 0.08)'
    },
    light: {
      aurora1: { r: 31, g: 92, b: 169, alpha: 0.10 },   // Soft Blue
      aurora2: { r: 56, g: 189, b: 248, alpha: 0.12 },  // Soft Sky
      aurora3: { r: 203, g: 213, b: 225, alpha: 0.25 }, // Frost Slate
      aurora4: { r: 147, g: 197, b: 253, alpha: 0.10 }, // Baby Azure
      particleColor: 'rgba(31, 92, 169, 0.28)',
      lineColor: 'rgba(31, 92, 169, 0.06)'
    }
  };

  // Plasma Aurora Blobs
  const blobs = [
    { x: 0.18, y: 0.22, r: 420, baseR: 420, angle: 0, speed: 0.007, paletteKey: 'aurora1', phase: 0 },
    { x: 0.82, y: 0.28, r: 480, baseR: 480, angle: 1.8, speed: 0.006, paletteKey: 'aurora2', phase: 1.2 },
    { x: 0.45, y: 0.65, r: 520, baseR: 520, angle: 3.4, speed: 0.005, paletteKey: 'aurora3', phase: 2.4 },
    { x: 0.88, y: 0.82, r: 390, baseR: 390, angle: 4.8, speed: 0.008, paletteKey: 'aurora4', phase: 3.6 }
  ];

  // Interactive Particle Stars
  const numParticles = 45;
  const particles = [];

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  resize();
  window.addEventListener('resize', resize);

  // Mouse tracking with momentum
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.isHovered = true;
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    mouse.isHovered = false;
  });

  // Current Theme state
  function isDarkMode() {
    return document.documentElement.classList.contains('dark');
  }

  let time = 0;

  function render() {
    time += 1;

    // Smooth mouse interpolation
    if (mouse.isHovered) {
      mouse.vx = (mouse.targetX - mouse.x) * 0.06;
      mouse.vy = (mouse.targetY - mouse.y) * 0.06;
      mouse.x += mouse.vx;
      mouse.y += mouse.vy;
    } else {
      // Drift gently to screen center when idle
      mouse.x += (width * 0.5 - mouse.x) * 0.02;
      mouse.y += (height * 0.4 - mouse.y) * 0.02;
    }

    ctx.clearRect(0, 0, width, height);

    const isDark = isDarkMode();
    const palette = isDark ? THEME_PALETTES.dark : THEME_PALETTES.light;

    // 1. Render Liquid Aurora Plasma Blobs
    for (let i = 0; i < blobs.length; i++) {
      const b = blobs[i];
      b.angle += b.speed;

      // Orbiting motion with organic Perlin-like oscillation
      const offsetX = Math.cos(b.angle + b.phase) * (width * 0.12);
      const offsetY = Math.sin(b.angle * 1.3 + b.phase) * (height * 0.1);

      // Mouse attraction pull
      const dx = mouse.x - (b.x * width + offsetX);
      const dy = mouse.y - (b.y * height + offsetY);
      const pull = 0.08;

      const cx = (b.x * width + offsetX) + (dx * pull);
      const cy = (b.y * height + offsetY) + (dy * pull);

      // Dynamic breathing radius
      const currentRadius = b.baseR + Math.sin(time * 0.02 + b.phase) * 35;

      const col = palette[b.paletteKey];
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, currentRadius);
      grad.addColorStop(0, `rgba(${col.r}, ${col.g}, ${col.b}, ${col.alpha})`);
      grad.addColorStop(0.5, `rgba(${col.r}, ${col.g}, ${col.b}, ${col.alpha * 0.45})`);
      grad.addColorStop(1, `rgba(${col.r}, ${col.g}, ${col.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Render Interactive Floating Particles with Repulsion & Connective Web
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.pulse += p.pulseSpeed;

      // Natural drift
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around bounds
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse Repulsion Physics
      const pdx = p.x - mouse.x;
      const pdy = p.y - mouse.y;
      const dist = Math.sqrt(pdx * pdx + pdy * pdy);

      if (dist < mouse.radius && dist > 0) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(pdy, pdx);
        p.x += Math.cos(angle) * force * 5;
        p.y += Math.sin(angle) * force * 5;
      }

      // Render Particle
      const pulseSize = p.size * (1 + Math.sin(p.pulse) * 0.35);
      ctx.fillStyle = palette.particleColor;
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Subtle Connective Constellation Lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const lineDx = p.x - p2.x;
        const lineDy = p.y - p2.y;
        const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

        if (lineDist < 110) {
          ctx.strokeStyle = palette.lineColor;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(render);
  }

  render();

  // Clean redraw on theme switch
  const observer = new MutationObserver(() => {
    // Instant smooth color transition
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

})();
