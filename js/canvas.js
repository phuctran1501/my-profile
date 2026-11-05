/**
 * Can Tho University (CTU) Architectural Wave Grid Canvas
 * Palette: Official CTU Blue (#1f5ca9), Sky Blue (#60a5fa), Crisp White Grid
 * Zero AI Slop • 60fps Dynamic Geometry Physics
 */

class PolyhedralFieldCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    this.nodes = [];
    this.time = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
      if (this.mouse.x === -1000) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.targetX = -1000;
      this.mouse.targetY = -1000;
    });

    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    const spacing = Math.max(52, Math.min(72, Math.floor(this.width / 26)));
    this.cols = Math.ceil(this.width / spacing) + 1;
    this.rows = Math.ceil(this.height / spacing) + 1;
    this.spacing = spacing;

    this.nodes = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.nodes.push({
          baseX: c * spacing,
          baseY: r * spacing,
          x: c * spacing,
          y: r * spacing,
          vx: 0,
          vy: 0,
          phase: (c * 0.22) + (r * 0.28)
        });
      }
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.time += 0.02;

    // Smooth cursor interpolation
    if (this.mouse.targetX !== -1000) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;
    } else {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Subtle CTU Blue radial ambient illumination behind cursor
    if (this.mouse.x !== -1000) {
      const grad = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 10,
        this.mouse.x, this.mouse.y, 450
      );
      grad.addColorStop(0, 'rgba(31, 92, 169, 0.12)');
      grad.addColorStop(0.5, 'rgba(31, 92, 169, 0.03)');
      grad.addColorStop(1, 'rgba(248, 250, 252, 0)');
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // Update node wave physics
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      const wave = Math.sin(this.time + n.phase) * 2.5;
      const targetY = n.baseY + wave;

      if (this.mouse.x !== -1000) {
        const dx = this.mouse.x - n.x;
        const dy = this.mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 18;
          const angle = Math.atan2(dy, dx);
          n.vx -= Math.cos(angle) * force * 0.3;
          n.vy -= Math.sin(angle) * force * 0.3;
        }
      }

      // Spring back to base grid
      n.vx += (n.baseX - n.x) * 0.05;
      n.vy += (targetY - n.y) * 0.05;
      n.vx *= 0.85;
      n.vy *= 0.85;
      n.x += n.vx;
      n.y += n.vy;
    }

    // Draw Architectural Grid Lines in CTU Blue
    this.ctx.lineWidth = 1;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const idx = r * this.cols + c;
        const curr = this.nodes[idx];
        if (!curr) continue;

        // Horizontal line
        if (c < this.cols - 1) {
          const right = this.nodes[idx + 1];
          if (right) {
            const dist = this.mouse.x !== -1000 
              ? Math.hypot(this.mouse.x - curr.x, this.mouse.y - curr.y) 
              : 999;
            const alpha = dist < 200 ? 0.28 : 0.06;
            this.ctx.strokeStyle = `rgba(31, 92, 169, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.moveTo(curr.x, curr.y);
            this.ctx.lineTo(right.x, right.y);
            this.ctx.stroke();
          }
        }

        // Vertical line
        if (r < this.rows - 1) {
          const down = this.nodes[(r + 1) * this.cols + c];
          if (down) {
            const dist = this.mouse.x !== -1000 
              ? Math.hypot(this.mouse.x - curr.x, this.mouse.y - curr.y) 
              : 999;
            const alpha = dist < 200 ? 0.28 : 0.06;
            this.ctx.strokeStyle = `rgba(31, 92, 169, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.moveTo(curr.x, curr.y);
            this.ctx.lineTo(down.x, down.y);
            this.ctx.stroke();
          }
        }

        // Draw node tick mark at grid intersections near cursor
        if (this.mouse.x !== -1000) {
          const d = Math.hypot(this.mouse.x - curr.x, this.mouse.y - curr.y);
          if (d < 150) {
            this.ctx.fillStyle = '#1f5ca9';
            this.ctx.fillRect(curr.x - 1.5, curr.y - 1.5, 3, 3);
          }
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PolyhedralFieldCanvas('geometric-canvas');
});
