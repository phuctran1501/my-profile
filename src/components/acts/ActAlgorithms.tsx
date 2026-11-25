import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface ActAlgorithmsProps {
  isActive: boolean;
  isPrev: boolean;
  autoPlay: boolean;
}

type LabId = 'ctu' | 'newshub' | 'smarthire' | 'nimdora';

export function ActAlgorithms({ isActive, isPrev, autoPlay }: ActAlgorithmsProps) {
  const { lang, t } = useLanguage();
  const { palette } = useTheme();
  const [lab, setLab] = useState<LabId>('ctu');

  // Lab 1: CTU-Scheduler CSP Orbits
  const [cspStep, setCspStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cspStepRef = useRef(cspStep);
  const paletteRef = useRef(palette);
  cspStepRef.current = cspStep;
  paletteRef.current = palette;

  // Lab 2: NewsHub Gemini AI Digest
  const [newsRunning, setNewsRunning] = useState(false);
  const [newsLines, setNewsLines] = useState<string[]>([]);
  const [newsDone, setNewsDone] = useState(false);

  // Lab 3: SmartHire ATS Match
  const [candidate, setCandidate] = useState<'phuc' | 'fresher'>('phuc');
  const [atsScore, setAtsScore] = useState(96.4);
  const [atsComputed, setAtsComputed] = useState(true);

  // Lab 4: Nimdora XOR Game AI
  const [nimPiles, setNimPiles] = useState<number[]>([3, 4, 5]);
  const [isAiTurn, setIsAiTurn] = useState(false);
  const aiTimerRef = useRef<number | null>(null);
  const newsTimersRef = useRef<number[]>([]);

  const runNewsHub = useCallback(() => {
    newsTimersRef.current.forEach((id) => window.clearTimeout(id));
    newsTimersRef.current = [];
    setNewsRunning(true);
    setNewsDone(false);
    setNewsLines([]);

    const steps =
      lang === 'en'
        ? [
            '[INGEST] Article: "ASP.NET Core 9 Clean Architecture & PostgreSQL"',
            '[TOKENIZE] 1,420 tokens chunked for streaming pipeline',
            '[GEMINI-1.5] 3-bullet TL;DR generated in 280ms',
          ]
        : [
            '[NẠP BÀI] "Kiến trúc ASP.NET Core 9 Clean Architecture & PostgreSQL"',
            '[TOKENIZE] Chia 1,420 token theo luồng Byte-Pair Encoding',
            '[GEMINI-1.5] Hoàn tất tóm tắt 3 ý chính trong 280ms',
          ];

    steps.forEach((line, idx) => {
      const tid = window.setTimeout(() => {
        setNewsLines((prev) => [...prev, line]);
        if (idx === steps.length - 1) {
          setNewsRunning(false);
          setNewsDone(true);
        }
      }, 300 * (idx + 1));
      newsTimersRef.current.push(tid);
    });
  }, [lang]);

  const computeAts = useCallback((targetCand: 'phuc' | 'fresher') => {
    setCandidate(targetCand);
    setAtsComputed(false);
    window.setTimeout(() => {
      setAtsScore(targetCand === 'phuc' ? 96.4 : 64.2);
      setAtsComputed(true);
    }, 180);
  }, []);

  const tapPile = useCallback(
    (idx: number) => {
      setNimPiles((prev) => {
        if (prev[idx] <= 0) return prev;
        const next = [...prev];
        next[idx] -= 1;

        if (next[0] === 0 && next[1] === 0 && next[2] === 0) {
          return next;
        }

        setIsAiTurn(true);
        aiTimerRef.current = window.setTimeout(() => {
          const s = next[0] ^ next[1] ^ next[2];
          let targetIdx = next.findIndex((v) => v > 0);
          let take = 1;

          if (s !== 0) {
            for (let i = 0; i < 3; i++) {
              const desired = next[i] ^ s;
              if (desired < next[i]) {
                targetIdx = i;
                take = next[i] - desired;
                break;
              }
            }
          }

          if (targetIdx !== -1) {
            next[targetIdx] -= take;
            setNimPiles([...next]);
          }
          setIsAiTurn(false);
        }, 480);

        return next;
      });
    },
    []
  );

  // Full 16s Choreography showcasing ALL 4 project labs sequentially during Auto-Play
  useEffect(() => {
    if (!isActive || !autoPlay) return;

    const timers: number[] = [];

    // 0.0s - 4.0s: CTU-SCHEDULER CSP steps 0 -> 1 -> 2 -> 3
    setLab('ctu');
    setCspStep(0);
    timers.push(window.setTimeout(() => setCspStep(1), 900));
    timers.push(window.setTimeout(() => setCspStep(2), 1900));
    timers.push(window.setTimeout(() => setCspStep(3), 2900));

    // 4.0s - 8.0s: NEWSHUB AI Digest Stream
    timers.push(
      window.setTimeout(() => {
        setLab('newshub');
        runNewsHub();
      }, 4000)
    );

    // 8.0s - 12.0s: SMARTHIRE ATS Match Comparison
    timers.push(
      window.setTimeout(() => {
        setLab('smarthire');
        computeAts('phuc');
      }, 8000)
    );
    timers.push(window.setTimeout(() => computeAts('fresher'), 9600));
    timers.push(window.setTimeout(() => computeAts('phuc'), 11000));

    // 12.0s - 16.0s: NIMDORA XOR Game AI Play
    timers.push(
      window.setTimeout(() => {
        setLab('nimdora');
        setNimPiles([3, 4, 5]);
        setIsAiTurn(false);
      }, 12000)
    );
    timers.push(window.setTimeout(() => tapPile(2), 13000));
    timers.push(window.setTimeout(() => tapPile(1), 14400));

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [isActive, autoPlay, runNewsHub, computeAts, tapPile]);

  useEffect(() => {
    if (!isActive || lab !== 'ctu') return;
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
      const cx = w * 0.5;
      const cy = h * 0.62;
      const step = cspStepRef.current;
      const radii = [42, 70, 98, 126];
      const offsets =
        step === 3 ? [0, 0, 0, 0] : [20 - step * 6, -16, 22 - step * 7, -12];

      radii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${rgb}, ${idx <= step ? 0.78 : 0.2})`;
        ctx.lineWidth = idx <= step ? 1.8 : 1;
        const ox = cx + Math.cos(animT + idx) * offsets[idx];
        const oy = cy + Math.sin(animT + idx) * offsets[idx];
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.stroke();

        const angle = animT * (1 + idx * 0.25);
        ctx.fillStyle = `rgba(${rgb}, 0.9)`;
        ctx.beginPath();
        ctx.arc(ox + Math.cos(angle) * r, oy + Math.sin(angle) * r, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [isActive, lab]);

  useEffect(() => {
    return () => {
      if (aiTimerRef.current !== null) window.clearTimeout(aiTimerRef.current);
      newsTimersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const nimSum = nimPiles[0] ^ nimPiles[1] ^ nimPiles[2];
  const isGameOver = nimPiles[0] === 0 && nimPiles[1] === 0 && nimPiles[2] === 0;

  const resetNim = () => {
    if (aiTimerRef.current !== null) window.clearTimeout(aiTimerRef.current);
    setIsAiTurn(false);
    setNimPiles([3, 4, 5]);
  };

  const cspDescriptions = [
    t('a4_csp_desc_0'),
    t('a4_csp_desc_1'),
    t('a4_csp_desc_2'),
    t('a4_csp_desc_3'),
  ];

  const nimStatus = isGameOver
    ? isAiTurn
      ? t('a4_nim_player_win')
      : t('a4_nim_ai_win')
    : isAiTurn
      ? t('a4_nim_ai_turn')
      : t('a4_nim_player_turn');

  const tabs: { id: LabId; label: string }[] = [
    { id: 'ctu', label: 'CTU-SCHEDULER' },
    { id: 'newshub', label: 'NEWSHUB' },
    { id: 'smarthire', label: 'SMARTHIRE' },
    { id: 'nimdora', label: 'NIMDORA' },
  ];

  return (
    <section
      className={`act-panel flex flex-col justify-between px-5 sm:px-10 py-16 sm:py-20 overflow-hidden ${
        isActive ? 'is-active' : isPrev ? 'is-prev' : ''
      }`}
    >
      {lab === 'ctu' && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      )}

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2">
        <span className="text-[11px] font-mono-tech uppercase tracking-widest" style={{ color: 'var(--subtle)' }}>
          {t('a4_tag')}
        </span>

        <div className="flex flex-wrap items-center gap-4 sm:gap-5 font-mono-tech text-[11px] sm:text-xs">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLab(item.id)}
              data-lens
              className={lab === item.id ? 'font-bold underline underline-offset-4' : 'hover:opacity-100'}
              style={{ color: lab === item.id ? 'var(--fg)' : 'var(--subtle)' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 01: CTU-SCHEDULER CSP */}
      {lab === 'ctu' && (
        <div className="relative z-10 my-auto flex flex-col justify-between space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase">
                {t('a4_csp_title')}
              </h2>
              <p className="text-xs font-mono-tech mt-2" style={{ color: 'var(--muted)' }}>
                {cspDescriptions[cspStep]}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCspStep((s) => (s + 1) % 4)}
              data-lens
              className="px-5 py-2.5 text-xs font-mono-tech font-bold uppercase tracking-widest transition hover:opacity-85"
              style={{ backgroundColor: 'var(--inv-bg)', color: 'var(--inv-fg)' }}
            >
              {t('a4_csp_btn')} ({cspStep}/3)
            </button>
          </div>
        </div>
      )}

      {/* 02: NEWSHUB GEMINI AI STREAM */}
      {lab === 'newshub' && (
        <div className="relative z-10 my-auto space-y-6 max-w-3xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase">
                {t('a4_news_title')}
              </h2>
              <p className="text-xs font-mono-tech mt-2" style={{ color: 'var(--muted)' }}>
                {t('a4_news_desc')}
              </p>
            </div>
            <button
              type="button"
              onClick={runNewsHub}
              disabled={newsRunning}
              data-lens
              className="px-5 py-2.5 text-xs font-mono-tech font-bold uppercase tracking-widest transition hover:opacity-85 disabled:opacity-50"
              style={{ backgroundColor: 'var(--inv-bg)', color: 'var(--inv-fg)' }}
            >
              {newsRunning ? t('a4_news_running') : t('a4_news_btn')}
            </button>
          </div>

          <div className="space-y-1.5 font-mono-tech text-xs" style={{ color: 'var(--muted)' }}>
            {newsLines.length === 0 ? (
              <div style={{ color: 'var(--subtle)' }}>{t('a4_news_idle')}</div>
            ) : (
              newsLines.map((line) => <div key={line}>{line}</div>)
            )}
          </div>

          {newsDone && (
            <ul className="space-y-2 text-xs sm:text-sm font-mono-tech pt-2">
              <li>— {t('a4_news_b1')}</li>
              <li>— {t('a4_news_b2')}</li>
              <li>— {t('a4_news_b3')}</li>
            </ul>
          )}
        </div>
      )}

      {/* 03: SMARTHIRE ATS MATCHING */}
      {lab === 'smarthire' && (
        <div className="relative z-10 my-auto space-y-6 max-w-3xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase">
                {t('a4_hire_title')}
              </h2>
              <p className="text-xs font-mono-tech mt-2" style={{ color: 'var(--muted)' }}>
                {t('a4_hire_desc')}
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono-tech text-xs">
              <button
                type="button"
                onClick={() => computeAts('phuc')}
                data-lens
                className={candidate === 'phuc' ? 'font-bold underline underline-offset-4' : 'opacity-50'}
              >
                {t('a4_hire_cand_a')}
              </button>
              <button
                type="button"
                onClick={() => computeAts('fresher')}
                data-lens
                className={candidate === 'fresher' ? 'font-bold underline underline-offset-4' : 'opacity-50'}
              >
                {t('a4_hire_cand_b')}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline justify-between font-mono-tech">
              <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                {t('a4_hire_score')}
              </span>
              <span className="text-4xl sm:text-6xl font-black tracking-tighter tabular-nums">
                {atsComputed ? `${atsScore}%` : '--%'}
              </span>
            </div>
            <div className="w-full h-[3px]" style={{ backgroundColor: 'var(--ghost)' }}>
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: atsComputed ? `${atsScore}%` : '0%',
                  backgroundColor: 'var(--fg)',
                }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono-tech text-xs">
              <div>
                <div style={{ color: 'var(--subtle)' }}>{t('a4_hire_skill_1')}</div>
                <div className="font-bold mt-0.5">{candidate === 'phuc' ? '98%' : '42%'}</div>
              </div>
              <div>
                <div style={{ color: 'var(--subtle)' }}>{t('a4_hire_skill_2')}</div>
                <div className="font-bold mt-0.5">{candidate === 'phuc' ? '95%' : '50%'}</div>
              </div>
              <div>
                <div style={{ color: 'var(--subtle)' }}>{t('a4_hire_skill_3')}</div>
                <div className="font-bold mt-0.5">{candidate === 'phuc' ? '94%' : '55%'}</div>
              </div>
              <div>
                <div style={{ color: 'var(--subtle)' }}>{t('a4_hire_skill_4')}</div>
                <div className="font-bold mt-0.5">{candidate === 'phuc' ? '92%' : '88%'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 04: NIMDORA XOR GAME AI */}
      {lab === 'nimdora' && (
        <div className="relative z-10 my-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-xs">
            <div className="space-y-1">
              <div className="font-bold tracking-wider uppercase">
                NIM-SUM: {nimPiles[0]} ⊕ {nimPiles[1]} ⊕ {nimPiles[2]} = {nimSum} ·{' '}
                {nimSum === 0 ? t('a4_nim_p_pos') : t('a4_nim_n_pos')}
              </div>
              <div className="text-[11px]" style={{ color: 'var(--muted)' }}>
                {nimStatus}
              </div>
            </div>

            <button
              type="button"
              onClick={resetNim}
              data-lens
              className="underline underline-offset-4 uppercase font-bold"
            >
              {t('a4_nim_reset')}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            {nimPiles.map((count, idx) => {
              const bits = count.toString(2).padStart(3, '0').split('');
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (!isAiTurn) tapPile(idx);
                  }}
                  disabled={isAiTurn || count === 0}
                  data-lens
                  className="py-4 transition-transform hover:-translate-y-2 disabled:opacity-40 cursor-pointer"
                >
                  <div className="text-6xl sm:text-8xl font-black tracking-tighter leading-none tabular-nums">
                    {count}
                  </div>
                  <div className="mt-3 flex justify-center gap-1.5 font-mono-tech text-xs">
                    {bits.map((bit, bIdx) => (
                      <span
                        key={bIdx}
                        className="inline-flex items-center justify-center w-6 h-6"
                        style={
                          bit === '1'
                            ? {
                                backgroundColor: 'var(--inv-bg)',
                                color: 'var(--inv-fg)',
                                fontWeight: 700,
                              }
                            : { opacity: 0.35 }
                        }
                      >
                        {bit}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div
        className="relative z-10 text-[11px] font-mono-tech flex justify-between pb-3"
        style={{ color: 'var(--subtle)' }}
      >
        <span>{t('a4_foot')}</span>
        <span>05 / 06</span>
      </div>
    </section>
  );
}
