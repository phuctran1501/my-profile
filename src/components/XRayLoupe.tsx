import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface XRayLoupeProps {
  open: boolean;
  currentAct: number;
}

const XRAY_SPECS = [
  {
    viTag: 'ĐO ĐẠC HỆ THỐNG // CHƯƠNG 01 · MỞ ĐẦU',
    enTag: 'SYSTEM TELEMETRY // ACT 01 · MONOLITH',
    title: 'CleanArchitecture.Domain & SpatialLattice',
    code:
      'public sealed record EngineerIdentity(string Handle, string University)\n' +
      '{\n' +
      '    // Handle: "phuctran1501" · Core: C# 12 / .NET 10\n' +
      '    // Torus-Knot Lattice: 64 vertices · Zero DOM borders\n' +
      '}',
    viFoot: 'ĐỘ TRỄ MỤC TIÊU: <16MS // LIGHT-MODE MONOCHROME',
    enFoot: 'LATENCY TARGET: <16MS // LIGHT-MODE MONOCHROME',
  },
  {
    viTag: 'ĐO ĐẠC HỆ THỐNG // CHƯƠNG 02 · CÔNG NGHỆ',
    enTag: 'SYSTEM TELEMETRY // ACT 02 · TECH STACK',
    title: 'ProductionEcosystem.CapabilitiesManifest',
    code:
      'Backend  = ["C#", ".NET 10", "NodeJS", "Express.js"];\n' +
      'Frontend = ["TypeScript", "React", "HTML5", "CSS3", "Tailwind", "Bootstrap"];\n' +
      'Data/Ops = ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Docker"];',
    viFoot: '23 CÔNG NGHỆ THỰC CHIẾN // HIỆN MÀU GỐC KHI RÊ CHUỘT',
    enFoot: '23 VERIFIED TECHNOLOGIES // COLOR REVEAL ON HOVER',
  },
  {
    viTag: 'ĐO ĐẠC HỆ THỐNG // CHƯƠNG 03 · DỰ ÁN',
    enTag: 'SYSTEM TELEMETRY // ACT 03 · WORKS',
    title: 'ProductionSystems.Repository & CaseStudies',
    code:
      'await _mediator.Send(new QueryProductionSystemsQuery {\n' +
      '    Verified = ["NewsHub", "CTU-Scheduler", "SmartHire", "Nimdora"],\n' +
      '    Impact   = "100+ CTU Students · <350ms AI TL;DR"\n' +
      '});',
    viFoot: 'HIỆU ỨNG IRIS WIPE // SONG NGỮ TYPE-SAFE VI & EN',
    enFoot: 'IRIS WIPE SHADER // TYPE-SAFE VI & EN DICTIONARY',
  },
  {
    viTag: 'ĐO ĐẠC HỆ THỐNG // CHƯƠNG 04 · KIẾN TRÚC',
    enTag: 'SYSTEM TELEMETRY // ACT 04 · SIGNAL',
    title: 'DistributedTelemetry & RedisCacheShortcut',
    code:
      'if (useRedisShortcut)\n' +
      '    return Results.Ok(await _redis.GetAsync<ScheduleDto>(key)); // 1.4ms\n' +
      'return Results.Ok(await _postgres.QueryWithGinIndexAsync()); // 41.8ms',
    viFoot: 'LUỒNG CQRS // BỘ GIỚI HẠN TOKEN BUCKET',
    enFoot: 'CQRS PIPELINE // TOKEN BUCKET RATE LIMITER',
  },
  {
    viTag: 'ĐO ĐẠC HỆ THỐNG // CHƯƠNG 05 · THUẬT TOÁN',
    enTag: 'SYSTEM TELEMETRY // ACT 05 · ALGORITHMS',
    title: '4InteractiveSandboxes // CSP, AI, ATS & BoutonXOR',
    code:
      'int nimSum = piles[0] ^ piles[1] ^ piles[2];\n' +
      'bool optimalMoveExists = nimSum != 0; // Bouton N-Position Theorem\n' +
      '// 4 Labs: CTU-Scheduler, NewsHub Gemini, SmartHire ATS, Nimdora',
    viFoot: '4 PHÒNG LAB TƯƠNG TÁC ĐẦY ĐỦ',
    enFoot: 'ORBIT HARMONIZER // 4 INTERACTIVE LABS',
  },
  {
    viTag: 'ĐO ĐẠC HỆ THỐNG // CHƯƠNG 06 · LIÊN HỆ',
    enTag: 'SYSTEM TELEMETRY // ACT 06 · FINALE',
    title: 'DirectUplink & WebAudioAnalyserFFT',
    code:
      'Endpoint:   "mailto:trantrongphuc1501@gmail.com"\n' +
      'Repository: "https://github.com/phuctran1501"\n' +
      'Soundtrack: "assets/xuong-rong-intro.mp3" // 64-bin FFT',
    viFoot: 'KÊNH KẾT NỐI SẴN SÀNG // CẦN THƠ, VIỆT NAM',
    enFoot: 'DIRECT UPLINK READY // CAN THO, VIETNAM',
  },
];

export function XRayLoupe({ open, currentAct }: XRayLoupeProps) {
  const { lang, t } = useLanguage();
  const layerRef = useRef<HTMLDivElement | null>(null);
  const hLineRef = useRef<HTMLDivElement | null>(null);
  const vLineRef = useRef<HTMLDivElement | null>(null);
  const coordsRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const pos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
    };
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
    };

    const tick = () => {
      pos.x += (pos.tx - pos.x) * 0.28;
      pos.y += (pos.ty - pos.y) * 0.28;

      if (layerRef.current) {
        layerRef.current.style.setProperty('--xray-x', `${pos.x.toFixed(1)}px`);
        layerRef.current.style.setProperty('--xray-y', `${pos.y.toFixed(1)}px`);
      }
      if (hLineRef.current) hLineRef.current.style.top = `${pos.y.toFixed(1)}px`;
      if (vLineRef.current) vLineRef.current.style.left = `${pos.x.toFixed(1)}px`;
      if (coordsRef.current) {
        const nx = (pos.x / Math.max(1, window.innerWidth)).toFixed(2);
        const ny = (pos.y / Math.max(1, window.innerHeight)).toFixed(2);
        coordsRef.current.textContent = `VEC(${nx}, ${ny}) · 60 FPS`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [open]);

  const spec = XRAY_SPECS[currentAct] ?? XRAY_SPECS[0];

  return (
    <div
      ref={layerRef}
      aria-hidden={!open}
      className={`xray-layer flex flex-col justify-between px-5 sm:px-10 py-16 sm:py-20 font-mono-tech ${
        open ? 'is-open' : ''
      }`}
    >
      <div
        ref={hLineRef}
        className="absolute left-0 right-0 h-[1px] opacity-25"
        style={{ backgroundColor: 'var(--inv-fg)', top: '50%' }}
      />
      <div
        ref={vLineRef}
        className="absolute top-0 bottom-0 w-[1px] opacity-25"
        style={{ backgroundColor: 'var(--inv-fg)', left: '50%' }}
      />

      <div className="relative z-10 flex items-center justify-between text-[11px] pt-2">
        <span className="font-bold tracking-widest uppercase">{t('xray_header')}</span>
        <span ref={coordsRef}>VEC(0.50, 0.50) · 60 FPS</span>
      </div>

      <div className="relative z-10 my-auto max-w-2xl space-y-4">
        <div className="text-[11px] uppercase tracking-widest opacity-60">
          {lang === 'vi' ? spec.viTag : spec.enTag}
        </div>
        <div className="text-xl sm:text-3xl font-bold tracking-tight">{spec.title}</div>
        <pre className="text-xs sm:text-sm leading-relaxed opacity-90 whitespace-pre-wrap">
          {spec.code}
        </pre>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] opacity-75 pb-3">
        <span>{lang === 'vi' ? spec.viFoot : spec.enFoot}</span>
        <span>{t('xray_release_hint')}</span>
      </div>
    </div>
  );
}
