import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface ActMonolithProps {
  isActive: boolean;
  isPrev: boolean;
  onEnter: () => void;
}

interface LatticePoint {
  bx: number;
  by: number;
  bz: number;
}

interface CachedCharBox {
  el: HTMLElement;
  cx: number;
  cy: number;
}

function buildLattice(): LatticePoint[] {
  const pts: LatticePoint[] = [];
  const count = 64;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const r = 0.55 + 0.25 * Math.cos(3 * t);
    pts.push({
      bx: r * Math.cos(2 * t),
      by: r * Math.sin(2 * t),
      bz: 0.32 * Math.sin(3 * t),
    });
  }
  return pts;
}

export function ActMonolith({ isActive, isPrev, onEnter }: ActMonolithProps) {
  const { lang, t } = useLanguage();
  const { palette } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const charCacheRef = useRef<CachedCharBox[]>([]);
  const paletteRef = useRef(palette);
  paletteRef.current = palette;

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lattice = buildLattice();
    const mouse = {
      x: 0.5,
      y: 0.5,
      tx: 0.5,
      ty: 0.5,
      px: -200,
      py: -200,
      tpx: -200,
      tpy: -200,
      absX: -200,
      absY: -200,
      active: false,
    };
    let animT = 0;
    let rafId = 0;

    const cacheChars = () => {
      if (!parallaxRef.current) {
        charCacheRef.current = [];
        return;
      }
      const list: CachedCharBox[] = [];
      parallaxRef.current.querySelectorAll<HTMLElement>('.elastic-char').forEach((el) => {
        const r = el.getBoundingClientRect();
        list.push({ el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 });
      });
      charCacheRef.current = list;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.max(300, Math.floor(rect.width));
      canvas.height = Math.max(360, Math.floor(rect.height));
      cacheChars();
    };

    const onMove = (e: MouseEvent) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouse.absX = e.clientX;
      mouse.absY = e.clientY;
      mouse.tpx = e.clientX - rect.left;
      mouse.tpy = e.clientY - rect.top;
      mouse.tx = mouse.tpx / rect.width;
      mouse.ty = mouse.tpy / rect.height;
      mouse.active = true;

      if (parallaxRef.current) {
        const dx = (mouse.tx - 0.5) * -14;
        const dy = (mouse.ty - 0.5) * -10;
        parallaxRef.current.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      }

      // Update per-letter elastic stretch smoothly on pointer move without forcing reflow inside RAF
      for (const ch of charCacheRef.current) {
        const d = Math.hypot(e.clientX - ch.cx, e.clientY - ch.cy);
        const prox = Math.max(0, 1 - d / 140);
        const sy = 1 + prox * 0.24;
        const ty = -prox * 8;
        ch.el.style.transform =
          prox > 0.01 ? `translate3d(0, ${ty.toFixed(1)}px, 0) scaleY(${sy.toFixed(3)})` : 'translate3d(0, 0, 0) scaleY(1)';
      }
    };

    const draw = () => {
      animT += 0.015;
      mouse.px += (mouse.tpx - mouse.px) * 0.16;
      mouse.py += (mouse.tpy - mouse.py) * 0.16;
      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const rgb = paletteRef.current === 'light' ? '0,0,0' : '255,255,255';
      const cx = w * 0.66;
      const cy = h * 0.5;
      const scale = Math.min(w, h) * 0.35;
      const rotY = animT * 0.45 + (mouse.x - 0.5) * 1.3;
      const rotX = animT * 0.25 + (mouse.y - 0.5) * 1.0;

      const projected = lattice.map((pt) => {
        const x1 = pt.bx * Math.cos(rotY) - pt.bz * Math.sin(rotY);
        const z1 = pt.bx * Math.sin(rotY) + pt.bz * Math.cos(rotY);
        const y2 = pt.by * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = pt.by * Math.sin(rotX) + z1 * Math.cos(rotX);
        const persp = 2.2 / (2.2 - z2);
        let sx = cx + x1 * scale * persp;
        let sy = cy + y2 * scale * persp;

        if (mouse.active) {
          const dx = sx - mouse.px;
          const dy = sy - mouse.py;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 1) {
            const push = ((120 - dist) / 120) * 30;
            sx += (dx / dist) * push;
            sy += (dy / dist) * push;
          }
        }
        return { x: sx, y: sy, z: z2 };
      });

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${rgb}, 0.15)`;
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        const b = projected[(i + 1) % projected.length];
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        if (i % 2 === 0) {
          const c = projected[(i + 19) % projected.length];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(c.x, c.y);
        }
      }
      ctx.stroke();

      for (const p of projected) {
        const alpha = Math.min(0.85, 0.18 + (p.z + 1) * 0.28);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 + (p.z + 1) * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    const timer = window.setTimeout(cacheChars, 720);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [isActive, lang]);

  const firstChars = Array.from(t('hero_first'));
  const lastChars = Array.from(t('hero_last'));

  return (
    <section
      className={`act-panel flex flex-col justify-between px-5 sm:px-10 py-16 sm:py-20 overflow-hidden ${
        isActive ? 'is-active' : isPrev ? 'is-prev' : ''
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full ink-pulse" style={{ backgroundColor: 'var(--fg)' }} />
          <span className="tracking-widest uppercase">{t('a1_avail')}</span>
        </div>
        <span style={{ color: 'var(--subtle)' }}>10.0452° N · 105.7469° E</span>
      </div>

      <div ref={parallaxRef} className="relative z-10 my-auto pointer-events-none space-y-4">
        <div className="clip-wrap">
          <span
            className="clip-inner delay-1 text-[11px] sm:text-xs font-mono-tech tracking-[0.22em] uppercase block"
            style={{ color: 'var(--muted)' }}
          >
            {t('a1_role')}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16 pt-2">
          <div className="shrink-0">
            <div className="clip-wrap">
              <h1
                data-lens
                className="clip-inner delay-2 pointer-events-auto text-[15vw] sm:text-[108px] lg:text-[120px] font-black tracking-tight leading-[1.12] uppercase"
              >
                {firstChars.map((ch, idx) => (
                  <span key={`${t('hero_first')}-${idx}`} className="elastic-char">
                    {ch}
                  </span>
                ))}
              </h1>
            </div>

            <div className="clip-wrap">
              <h1
                data-lens
                className="clip-inner delay-3 pointer-events-auto text-[15vw] sm:text-[108px] lg:text-[120px] font-black tracking-tight leading-[1.12] uppercase"
              >
                {lastChars.map((ch, idx) => (
                  <span key={`${t('hero_last')}-${idx}`} className="elastic-char">
                    {ch}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          <p
            className="hidden sm:block text-xs sm:text-sm font-mono-tech max-w-[300px] leading-relaxed pb-3"
            style={{ color: 'var(--muted)' }}
          >
            {t('a1_sub')}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-4 pb-3">
        <p className="sm:hidden text-xs max-w-[220px] leading-relaxed" style={{ color: 'var(--muted)' }}>
          {t('a1_sub')}
        </p>
        <span
          className="hidden sm:inline text-[11px] font-mono-tech tracking-wider"
          style={{ color: 'var(--subtle)' }}
        >
          {t('a1_drag_hint')}
        </span>

        <button
          type="button"
          onClick={onEnter}
          data-lens
          className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-widest group shrink-0"
        >
          <span>{t('a1_enter')}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
