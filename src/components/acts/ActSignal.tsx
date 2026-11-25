import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { ARCHITECTURE_HUBS } from '../../data/architecture';

interface ActSignalProps {
  isActive: boolean;
  isPrev: boolean;
  autoPlay: boolean;
}

interface SignalParticle {
  t: number;
  speed: number;
  shortcut: boolean;
  size: number;
}

interface SignalRipple {
  hub: number;
  r: number;
  alpha: number;
}

export function ActSignal({ isActive, isPrev, autoPlay }: ActSignalProps) {
  const { t } = useLanguage();
  const { palette } = useTheme();
  const [cacheOn, setCacheOn] = useState(false);
  const [selectedHubId, setSelectedHubId] = useState(2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cacheRef = useRef(cacheOn);
  const paletteRef = useRef(palette);
  const particlesRef = useRef<SignalParticle[]>([]);
  const ripplesRef = useRef<SignalRipple[]>([]);

  cacheRef.current = cacheOn;
  paletteRef.current = palette;

  const spawnBurst = useCallback((shortcut: boolean) => {
    for (let i = 0; i < 14; i++) {
      particlesRef.current.push({
        t: -i * 0.05,
        speed: shortcut ? 0.022 : 0.015,
        shortcut,
        size: 2.2 + Math.random() * 2,
      });
    }
    ripplesRef.current.push({ hub: 0, r: 4, alpha: 0.9 });
  }, []);

  useEffect(() => {
    if (!isActive || !autoPlay) return;
    setCacheOn(false);
    setSelectedHubId(0);
    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => {
        setSelectedHubId(2);
        spawnBurst(false);
      }, 650)
    );
    timers.push(
      window.setTimeout(() => {
        setSelectedHubId(3);
      }, 2100)
    );
    timers.push(
      window.setTimeout(() => {
        setCacheOn(true);
        setSelectedHubId(4);
        spawnBurst(true);
      }, 3700)
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [isActive, autoPlay, spawnBurst]);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animT = 0;
    let rafId = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.max(300, Math.floor(rect.width));
      canvas.height = Math.max(360, Math.floor(rect.height));
    };

    const draw = () => {
      animT += 0.016;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const rgb = paletteRef.current === 'light' ? '0,0,0' : '255,255,255';
      const cy = h * 0.52;
      const hubs = [0.1, 0.3, 0.5, 0.7, 0.9].map((r, i) => ({
        x: w * r,
        y: cy + Math.sin(animT * 1.4 + i) * 14,
      }));

      ctx.strokeStyle = `rgba(${rgb}, 0.16)`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(hubs[0].x, hubs[0].y);
      for (let i = 0; i < hubs.length - 1; i++) {
        const mx = (hubs[i].x + hubs[i + 1].x) / 2;
        ctx.bezierCurveTo(mx, hubs[i].y, mx, hubs[i + 1].y, hubs[i + 1].x, hubs[i + 1].y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = `rgba(${rgb}, ${cacheRef.current ? 0.65 : 0.14})`;
      ctx.moveTo(hubs[2].x, hubs[2].y);
      ctx.quadraticCurveTo(w * 0.7, cy - 110, hubs[4].x, hubs[4].y);
      ctx.stroke();
      ctx.setLineDash([]);

      if (Math.random() < 0.05) {
        particlesRef.current.push({ t: 0, speed: 0.008, shortcut: cacheRef.current, size: 1.8 });
      }

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.t += p.speed;
        if (p.t >= 1) {
          ripplesRef.current.push({ hub: 4, r: 4, alpha: 0.65 });
          particles.splice(i, 1);
          continue;
        }
        if (p.t < 0) continue;

        let px: number;
        let py: number;
        if (p.shortcut && p.t > 0.5) {
          const st = (p.t - 0.5) * 2;
          const x0 = hubs[2].x;
          const y0 = hubs[2].y;
          const x1 = w * 0.7;
          const y1 = cy - 110;
          const x2 = hubs[4].x;
          const y2 = hubs[4].y;
          px = (1 - st) * (1 - st) * x0 + 2 * (1 - st) * st * x1 + st * st * x2;
          py = (1 - st) * (1 - st) * y0 + 2 * (1 - st) * st * y1 + st * st * y2;
        } else {
          px = hubs[0].x + (hubs[4].x - hubs[0].x) * p.t;
          py = cy + Math.sin(p.t * Math.PI * 3 + animT) * 12;
        }

        ctx.fillStyle = `rgba(${rgb}, 0.9)`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 1.6;
        rp.alpha -= 0.025;
        if (rp.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        const target = hubs[rp.hub] ?? hubs[0];
        ctx.strokeStyle = `rgba(${rgb}, ${rp.alpha})`;
        ctx.beginPath();
        ctx.arc(target.x, target.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [isActive]);

  const activeHub = ARCHITECTURE_HUBS[selectedHubId] ?? ARCHITECTURE_HUBS[2];

  return (
    <section
      className={`act-panel flex flex-col justify-between px-5 sm:px-10 py-16 sm:py-20 overflow-hidden ${
        isActive ? 'is-active' : isPrev ? 'is-prev' : ''
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2">
        <div>
          <div className="text-[11px] font-mono-tech uppercase tracking-widest" style={{ color: 'var(--subtle)' }}>
            {t('a3_tag')}
          </div>
          <div className="flex items-baseline gap-4 mt-1">
            <span className="text-3xl sm:text-5xl font-black tracking-tighter tabular-nums">
              {cacheOn ? '1.4ms' : '41.8ms'}
            </span>
            <span className="text-xs font-mono-tech uppercase" style={{ color: 'var(--muted)' }}>
              {cacheOn ? t('a3_cache_hit') : t('a3_full_trace')}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech">
          <button
            type="button"
            onClick={() => {
              const next = !cacheOn;
              setCacheOn(next);
              spawnBurst(next);
            }}
            data-lens
            className="uppercase tracking-wider underline underline-offset-4"
          >
            {t('a3_redis_shortcut')}:{' '}
            <span className="font-bold">{cacheOn ? t('a3_on') : t('a3_off')}</span>
          </button>

          <button
            type="button"
            onClick={() => spawnBurst(cacheOn)}
            data-lens
            className="px-4 py-2 font-bold uppercase tracking-widest transition hover:opacity-85"
            style={{ backgroundColor: 'var(--inv-bg)', color: 'var(--inv-fg)' }}
          >
            {t('a3_fire')}
          </button>
        </div>
      </div>

      <div className="relative z-10 my-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-center font-mono-tech py-10">
        {ARCHITECTURE_HUBS.map((hub) => (
          <button
            key={hub.id}
            type="button"
            onClick={() => {
              setSelectedHubId(hub.id);
              ripplesRef.current.push({ hub: hub.id, r: 6, alpha: 1 });
            }}
            data-lens
            className="flex-1 min-w-[90px] py-4 group cursor-pointer"
          >
            <div className="text-[10px]" style={{ color: 'var(--subtle)' }}>
              {hub.code}
            </div>
            <div
              className={`text-xs sm:text-sm font-bold tracking-tight group-hover:underline ${
                selectedHubId === hub.id ? 'underline underline-offset-4' : ''
              }`}
            >
              {hub.label}
            </div>
          </button>
        ))}
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-[11px] font-mono-tech pb-3">
        <div className="max-w-xl">
          <div className="font-bold uppercase tracking-wider mb-1">{activeHub.file}</div>
          <div className="opacity-75 whitespace-pre-wrap leading-relaxed">{activeHub.codeSnippet}</div>
        </div>
        <span style={{ color: 'var(--subtle)' }}>{t('a3_click_hub')}</span>
      </div>
    </section>
  );
}
