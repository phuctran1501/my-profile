import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { PROJECTS, type ProjectCaseStudy, type ProjectId } from '../../data/projects';

interface ActWorksProps {
  isActive: boolean;
  isPrev: boolean;
  autoPlay: boolean;
  onOpenProject: (proj: ProjectCaseStudy, origin: { x: string; y: string }) => void;
}

export function ActWorks({ isActive, isPrev, autoPlay, onOpenProject }: ActWorksProps) {
  const { lang, t } = useLanguage();
  const { palette } = useTheme();
  const [hoveredId, setHoveredId] = useState<ProjectId>('newshub');
  const hoveredRef = useRef<ProjectId>('newshub');
  const paletteRef = useRef(palette);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  hoveredRef.current = hoveredId;
  paletteRef.current = palette;

  useEffect(() => {
    if (!isActive || !autoPlay) return;
    let idx = 0;
    setHoveredId(PROJECTS[0].id);
    const id = window.setInterval(() => {
      idx = (idx + 1) % PROJECTS.length;
      setHoveredId(PROJECTS[idx].id);
    }, 1850);
    return () => window.clearInterval(id);
  }, [isActive, autoPlay]);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 320;
    canvas.height = 320;
    let animT = 0;
    let rafId = 0;

    const draw = () => {
      animT += 0.016;
      ctx.clearRect(0, 0, 320, 320);
      const cx = 160;
      const cy = 160;
      const rgb = paletteRef.current === 'light' ? '0,0,0' : '255,255,255';
      ctx.strokeStyle = `rgba(${rgb}, 0.38)`;
      ctx.lineWidth = 1;

      const mode = hoveredRef.current;
      if (mode === 'newshub') {
        for (let r = 20; r <= 140; r += 16) {
          ctx.beginPath();
          for (let a = 0; a <= Math.PI * 2; a += 0.14) {
            const rad = r + Math.sin(a * 6 + animT * 2 + r * 0.05) * 6;
            const x = cx + Math.cos(a) * rad;
            const y = cy + Math.sin(a) * rad;
            if (a === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }
      } else if (mode === 'ctu') {
        for (let i = 0; i < 6; i++) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(animT * 0.25 * (i % 2 === 0 ? 1 : -1) + i * 0.2);
          const s = 44 + i * 26;
          ctx.strokeRect(-s / 2, -s / 2, s, s);
          ctx.restore();
        }
      } else if (mode === 'smarthire') {
        for (let x = 40; x <= 280; x += 24) {
          for (let y = 40; y <= 280; y += 24) {
            const dist = Math.hypot(x - cx, y - cy);
            const size = Math.max(1, Math.sin(dist * 0.05 - animT * 2.5) * 3.5 + 3.5);
            ctx.fillStyle = `rgba(${rgb}, 0.55)`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2 + animT * 0.4;
          const len = 45 + (i % 3) * 32 + Math.sin(animT * 3 + i) * 12;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * 28, cy + Math.sin(angle) * 28);
          ctx.lineTo(cx + Math.cos(angle) * (28 + len), cy + Math.sin(angle) * (28 + len));
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [isActive]);

  const activeProject = PROJECTS.find((p) => p.id === hoveredId) ?? PROJECTS[0];

  const handleSelect = (proj: ProjectCaseStudy, e: MouseEvent<HTMLButtonElement>) => {
    const x = `${Math.round((e.clientX / window.innerWidth) * 100)}%`;
    const y = `${Math.round((e.clientY / window.innerHeight) * 100)}%`;
    onOpenProject(proj, { x, y });
  };

  return (
    <section
      className={`act-panel flex flex-col justify-between px-5 sm:px-10 py-16 sm:py-20 overflow-hidden ${
        isActive ? 'is-active' : isPrev ? 'is-prev' : ''
      }`}
    >
      <canvas
        ref={canvasRef}
        className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 w-[320px] h-[320px] pointer-events-none opacity-85"
      />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tech pt-2">
        <span className="uppercase tracking-widest" style={{ color: 'var(--subtle)' }}>
          {t('a2_tag')}
        </span>
        <span style={{ color: 'var(--subtle)' }}>{t('a2_hint')}</span>
      </div>

      <div className="relative z-10 my-auto works-reel space-y-2 sm:space-y-3 max-w-3xl">
        {PROJECTS.map((proj) => (
          <button
            key={proj.id}
            type="button"
            data-lens
            onMouseEnter={() => setHoveredId(proj.id)}
            onFocus={() => setHoveredId(proj.id)}
            onClick={(e) => handleSelect(proj, e)}
            className="work-reel-item block w-full text-left py-1 cursor-pointer"
            style={
              autoPlay && hoveredId !== proj.id ? { opacity: 0.25 } : undefined
            }
          >
            <div className="flex items-baseline gap-3 sm:gap-5">
              <span className="font-mono-tech text-xs" style={{ color: 'var(--subtle)' }}>
                {proj.index}
              </span>
              <span className="text-3xl sm:text-6xl font-black tracking-tighter uppercase">
                {proj.name}
              </span>
              <span
                className="hidden sm:inline font-mono-tech text-[11px]"
                style={{ color: 'var(--muted)' }}
              >
                {proj[lang].metric}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div
        className="relative z-10 text-[11px] font-mono-tech flex justify-between gap-4 pb-3"
        style={{ color: 'var(--subtle)' }}
      >
        <span className="truncate">{activeProject.stack}</span>
        <span className="shrink-0">{t('a2_systems')}</span>
      </div>
    </section>
  );
}
