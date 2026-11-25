import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { Toaster, toast } from 'sonner';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AudioProvider, useAudio } from './context/AudioContext';
import { OpticalLens } from './components/OpticalLens';
import { ClickRipple } from './components/ClickRipple';
import { InkShutter } from './components/InkShutter';
import { XRayLoupe } from './components/XRayLoupe';
import { HeaderHUD } from './components/HeaderHUD';
import { FooterIndex } from './components/FooterIndex';
import { FilmstripOverview } from './components/FilmstripOverview';
import { IrisTakeover } from './components/IrisTakeover';
import { CommandPalette } from './components/CommandPalette';
import { ActMonolith } from './components/acts/ActMonolith';
import { ActTechStack } from './components/acts/ActTechStack';
import { ActWorks } from './components/acts/ActWorks';
import { ActSignal } from './components/acts/ActSignal';
import { ActAlgorithms } from './components/acts/ActAlgorithms';
import { ActFinale } from './components/acts/ActFinale';
import type { ProjectCaseStudy } from './data/projects';

const TOTAL_ACTS = 6;
// Per-Act showcase durations (Act 05 Algorithms gets 16s to demonstrate all 4 labs)
const ACT_DURATIONS_MS = [5500, 7500, 8000, 7500, 16000, 6500];

function ExhibitionShell() {
  const { palette, setPalette } = useTheme();
  const { t } = useLanguage();
  const { play: playSoundtrack } = useAudio();

  const [currentAct, setCurrentAct] = useState(0);
  const [shutterKey, setShutterKey] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [filmstripOpen, setFilmstripOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [xrayHeld, setXrayHeld] = useState(false);
  const [xrayPinned, setXrayPinned] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  const [irisOrigin, setIrisOrigin] = useState({ x: '50%', y: '50%' });

  const stageRef = useRef<HTMLElement | null>(null);
  const dragStartXRef = useRef<number | null>(null);
  const wheelLockRef = useRef(false);

  const xrayOpen = (xrayHeld || xrayPinned) && !cmdOpen && !activeProject && !filmstripOpen;

  const advanceAct = useCallback((computeNext: (prev: number) => number) => {
    setFilmstripOpen(false);
    setCurrentAct((prev) => {
      const next = computeNext(prev);
      if (next !== prev) setShutterKey((k) => k + 1);
      return next;
    });
  }, []);

  const manualGoToAct = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= TOTAL_ACTS) return;
      setAutoPlay(false);
      advanceAct(() => idx);
    },
    [advanceAct]
  );

  const manualNextAct = useCallback(() => {
    setAutoPlay(false);
    advanceAct((prev) => (prev + 1) % TOTAL_ACTS);
  }, [advanceAct]);

  const manualPrevAct = useCallback(() => {
    setAutoPlay(false);
    advanceAct((prev) => (prev - 1 + TOTAL_ACTS) % TOTAL_ACTS);
  }, [advanceAct]);

  const toggleAutoPlay = useCallback(() => {
    setAutoPlay((prev) => {
      const next = !prev;
      if (next) {
        setFilmstripOpen(false);
        setActiveProject(null);
        setCmdOpen(false);
        playSoundtrack();
      }
      return next;
    });
  }, [playSoundtrack]);

  useEffect(() => {
    if (!autoPlay) return;
    const ms = ACT_DURATIONS_MS[currentAct] ?? 7500;
    const id = window.setTimeout(() => {
      advanceAct((prev) => (prev + 1) % TOTAL_ACTS);
    }, ms);
    return () => window.clearTimeout(id);
  }, [autoPlay, currentAct, advanceAct]);

  const copyEmail = useCallback(() => {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText('trantrongphuc1501@gmail.com').catch(() => {});
    }
    const prev = palette;
    setPalette(prev === 'light' ? 'invert' : 'light');
    window.setTimeout(() => setPalette(prev), 140);
    toast(t('a5_copied'));
  }, [palette, setPalette, t]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setAutoPlay(false);
        setCmdOpen((v) => !v);
        return;
      }
      if (e.key === 'Escape') {
        setAutoPlay(false);
        setCmdOpen(false);
        setActiveProject(null);
        setFilmstripOpen(false);
        setXrayHeld(false);
        setXrayPinned(false);
        return;
      }
      if (cmdOpen || activeProject) return;

      if (e.code === 'Space' && !(e.target as HTMLElement)?.closest('input, textarea')) {
        e.preventDefault();
        if (!e.repeat) setXrayHeld(true);
        return;
      }

      if (e.key === 'ArrowRight') manualNextAct();
      else if (e.key === 'ArrowLeft') manualPrevAct();
      else if (e.key.toLowerCase() === 'g') {
        setAutoPlay(false);
        setFilmstripOpen((v) => !v);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') setXrayHeld(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [cmdOpen, activeProject, manualNextAct, manualPrevAct]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (filmstripOpen || cmdOpen || activeProject || wheelLockRef.current) return;
    if (Math.abs(e.deltaY) < 28 && Math.abs(e.deltaX) < 28) return;
    wheelLockRef.current = true;
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (delta > 0) manualNextAct();
    else manualPrevAct();
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 560);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, a, input')) return;
    dragStartXRef.current = e.clientX;
    if (stageRef.current) stageRef.current.style.transition = 'none';
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null || !stageRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const skew = Math.max(-5, Math.min(5, dx * 0.025));
    stageRef.current.style.transform = `translate3d(${(dx * 0.3).toFixed(1)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const dx = e.clientX - dragStartXRef.current;
    dragStartXRef.current = null;
    if (stageRef.current) {
      stageRef.current.style.transition = 'transform 340ms cubic-bezier(0.16, 1, 0.3, 1)';
      stageRef.current.style.transform = 'translate3d(0, 0, 0) skewX(0deg)';
    }
    if (Math.abs(dx) > 60) {
      if (dx < 0) manualNextAct();
      else manualPrevAct();
    }
  };

  const activeDuration = ACT_DURATIONS_MS[currentAct] ?? 7500;

  return (
    <div
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-screen h-dvh overflow-hidden select-none"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
    >
      {/* Autonomous Auto-Play Top Progress Hairline */}
      {autoPlay && (
        <div
          key={`auto-${currentAct}`}
          aria-hidden="true"
          className="autoplay-bar fixed top-0 left-0 right-0 h-[2px] z-75 pointer-events-none"
          style={{
            backgroundColor: 'var(--fg)',
            animationDuration: `${activeDuration}ms`,
          }}
        />
      )}

      <OpticalLens hidden={xrayOpen} />
      <ClickRipple />
      <InkShutter triggerKey={shutterKey} />
      <XRayLoupe open={xrayOpen} currentAct={currentAct} />

      <HeaderHUD
        currentAct={currentAct}
        totalActs={TOTAL_ACTS}
        xrayOpen={xrayPinned}
        autoPlay={autoPlay}
        onGoToAct={manualGoToAct}
        onToggleAutoPlay={toggleAutoPlay}
        onToggleXray={() => setXrayPinned((v) => !v)}
        onToggleFilmstrip={() => {
          setAutoPlay(false);
          setFilmstripOpen((v) => !v);
        }}
        onOpenCmd={() => {
          setAutoPlay(false);
          setCmdOpen(true);
        }}
      />

      <main ref={stageRef} className="acts-stage relative w-full h-full">
        <ActMonolith
          isActive={currentAct === 0}
          isPrev={currentAct > 0}
          onEnter={manualNextAct}
        />
        <ActTechStack
          isActive={currentAct === 1}
          isPrev={currentAct > 1}
          autoPlay={autoPlay}
        />
        <ActWorks
          isActive={currentAct === 2}
          isPrev={currentAct > 2}
          autoPlay={autoPlay}
          onOpenProject={(proj, origin) => {
            setAutoPlay(false);
            setIrisOrigin(origin);
            setActiveProject(proj);
          }}
        />
        <ActSignal
          isActive={currentAct === 3}
          isPrev={currentAct > 3}
          autoPlay={autoPlay}
        />
        <ActAlgorithms
          isActive={currentAct === 4}
          isPrev={currentAct > 4}
          autoPlay={autoPlay}
        />
        <ActFinale
          isActive={currentAct === 5}
          isPrev={false}
          onCopyEmail={copyEmail}
        />
      </main>

      <FooterIndex
        currentAct={currentAct}
        onSelectAct={manualGoToAct}
        onPrev={manualPrevAct}
        onNext={manualNextAct}
      />

      <FilmstripOverview
        open={filmstripOpen}
        currentAct={currentAct}
        onSelectAct={manualGoToAct}
        onClose={() => setFilmstripOpen(false)}
      />

      <IrisTakeover
        project={activeProject}
        origin={irisOrigin}
        onClose={() => setActiveProject(null)}
      />

      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        onSelectAct={manualGoToAct}
        onOpenProject={(proj) => {
          setAutoPlay(false);
          setIrisOrigin({ x: '50%', y: '50%' });
          setActiveProject(proj);
        }}
        onToggleAutoPlay={toggleAutoPlay}
        onToggleFilmstrip={() => setFilmstripOpen((v) => !v)}
        onToggleXray={() => setXrayPinned((v) => !v)}
        onCopyEmail={copyEmail}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--inv-bg)',
            color: 'var(--inv-fg)',
            border: 'none',
            borderRadius: '0px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
            boxShadow: 'none',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AudioProvider>
          <ExhibitionShell />
        </AudioProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
