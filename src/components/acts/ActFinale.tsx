import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAudio } from '../../context/AudioContext';
import { TRACK_TITLE } from '../../data/lyrics';

interface ActFinaleProps {
  isActive: boolean;
  isPrev: boolean;
  onCopyEmail: () => void;
}

export function ActFinale({ isActive, isPrev, onCopyEmail }: ActFinaleProps) {
  const { t } = useLanguage();
  const { palette } = useTheme();
  const { isPlaying, currentLyric, toggle: toggleAudio, getFrequencyData } = useAudio();

  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const emailBtnRef = useRef<HTMLButtonElement | null>(null);
  const emailCenterRef = useRef<{ cx: number; cy: number } | null>(null);
  const paletteRef = useRef(palette);
  paletteRef.current = palette;

  useEffect(() => {
    if (!isActive) return;

    const cacheEmailCenter = () => {
      const btn = emailBtnRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      emailCenterRef.current = { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    };

    cacheEmailCenter();
    window.addEventListener('resize', cacheEmailCenter);

    const onMove = (e: MouseEvent) => {
      const btn = emailBtnRef.current;
      const center = emailCenterRef.current;
      if (!btn || !center) return;
      const dist = Math.hypot(e.clientX - center.cx, e.clientY - center.cy);
      if (dist < 160) {
        const pullX = (e.clientX - center.cx) * 0.14;
        const pullY = (e.clientY - center.cy) * 0.18;
        btn.style.transform = `translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0)`;
      } else {
        btn.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('resize', cacheEmailCenter);
      window.removeEventListener('mousemove', onMove);
    };
  }, [isActive]);

  useEffect(() => {
    const canvas = waveCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const drawIdle = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = paletteRef.current === 'light' ? '0,0,0' : '255,255,255';
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${rgb}, 0.55)`;
      ctx.lineWidth = 1.4;
      ctx.moveTo(0, 12);
      ctx.lineTo(96, 12);
      ctx.stroke();
    };

    if (!isActive || !isPlaying) {
      drawIdle();
      return;
    }

    const bins = new Uint8Array(32);
    let animT = 0;
    let rafId = 0;

    const drawWave = () => {
      animT += 0.08;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = paletteRef.current === 'light' ? '0,0,0' : '255,255,255';
      const hasReal = getFrequencyData(bins);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${rgb}, 0.85)`;
      ctx.lineWidth = 1.4;
      for (let x = 0; x <= 96; x += 2) {
        let amp = 0;
        if (hasReal) {
          const binIdx = Math.min(bins.length - 1, Math.floor((x / 96) * 16));
          const norm = bins[binIdx] / 255;
          amp = Math.sin(x * 0.25 + animT) * (2 + norm * 8) * Math.sin((x / 96) * Math.PI);
        } else {
          amp = Math.sin(x * 0.16 + animT) * Math.sin((x / 96) * Math.PI) * 8;
        }
        const y = 12 + amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      rafId = requestAnimationFrame(drawWave);
    };

    rafId = requestAnimationFrame(drawWave);
    return () => cancelAnimationFrame(rafId);
  }, [isActive, isPlaying, palette, getFrequencyData]);

  return (
    <section
      className={`act-panel flex flex-col justify-between px-5 sm:px-10 py-16 sm:py-20 overflow-hidden ${
        isActive ? 'is-active' : isPrev ? 'is-prev' : ''
      }`}
    >
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none overflow-x-hidden py-12 select-none"
        style={{ color: 'var(--ghost)' }}
      >
        <div className="marquee-track text-[20vw] sm:text-[150px] font-black tracking-tighter leading-[1.35] py-4 uppercase whitespace-nowrap">
          <span>{t('a5_marquee')}&nbsp;</span>
          <span>{t('a5_marquee')}&nbsp;</span>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech pt-2">
        <span className="uppercase tracking-widest" style={{ color: 'var(--subtle)' }}>
          {t('a5_tag')}
        </span>
        <span style={{ color: 'var(--subtle)' }}>© 2026 PHUCTRAN1501</span>
      </div>

      <div className="relative z-10 my-auto space-y-5">
        <div className="text-xs font-mono-tech uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          {t('a5_prompt')}
        </div>

        <button
          ref={emailBtnRef}
          type="button"
          onClick={onCopyEmail}
          data-lens
          className="block text-left text-2xl sm:text-5xl lg:text-6xl font-black tracking-tighter break-all transition-transform duration-150 cursor-pointer"
        >
          trantrongphuc1501@gmail.com
        </button>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3">
        <button
          type="button"
          onClick={toggleAudio}
          data-lens
          className="flex flex-col items-start gap-1.5 text-xs font-mono-tech group text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <canvas ref={waveCanvasRef} width={96} height={24} className="block" />
            <span className="uppercase tracking-wider group-hover:underline">
              {TRACK_TITLE} · {isPlaying ? t('a5_audio_playing') : t('a5_audio_paused')}
            </span>
          </div>
          <span className="text-[11px] truncate max-w-[85vw] sm:max-w-md" style={{ color: 'var(--subtle)' }}>
            {currentLyric}
          </span>
        </button>

        <a
          href="https://github.com/phuctran1501"
          target="_blank"
          rel="noreferrer"
          data-lens
          className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold uppercase tracking-widest underline underline-offset-4 shrink-0"
        >
          <span>GITHUB.COM/PHUCTRAN1501</span>
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}
