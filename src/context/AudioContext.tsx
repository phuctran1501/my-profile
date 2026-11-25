import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { SONG_LYRICS, TRACK_SRC } from '../data/lyrics';

interface AudioContextValue {
  isPlaying: boolean;
  currentLyric: string;
  play: () => void;
  toggle: () => void;
  getFrequencyData: (bins: Uint8Array<ArrayBuffer>) => boolean;
}

const AudioContextReact = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const webCtxRef = useRef<globalThis.AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyric, setCurrentLyric] = useState(SONG_LYRICS[0].text);

  const ensureWebAudio = useCallback(() => {
    const el = audioRef.current;
    if (!el || analyserRef.current) return;
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof globalThis.AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.78;
      const source = ctx.createMediaElementSource(el);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      webCtxRef.current = ctx;
      analyserRef.current = analyser;
    } catch {
      analyserRef.current = null;
    }
  }, []);

  useEffect(() => {
    const audio = new Audio(TRACK_SRC);
    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => {
      const t = audio.currentTime;
      for (let i = SONG_LYRICS.length - 1; i >= 0; i--) {
        if (t >= SONG_LYRICS[i].time) {
          setCurrentLyric(SONG_LYRICS[i].text);
          break;
        }
      }
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTime);

    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTime);
    };
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureWebAudio();
    if (webCtxRef.current?.state === 'suspended') {
      void webCtxRef.current.resume();
    }
    if (audio.paused) {
      void audio.play().catch(() => {});
    }
  }, [ensureWebAudio]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureWebAudio();
    if (webCtxRef.current?.state === 'suspended') {
      void webCtxRef.current.resume();
    }
    if (audio.paused) {
      void audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [ensureWebAudio]);

  const getFrequencyData = useCallback((bins: Uint8Array<ArrayBuffer>): boolean => {
    const analyser = analyserRef.current;
    if (!analyser || !isPlaying) return false;
    analyser.getByteFrequencyData(bins);
    return true;
  }, [isPlaying]);

  return (
    <AudioContextReact.Provider value={{ isPlaying, currentLyric, play, toggle, getFrequencyData }}>
      {children}
    </AudioContextReact.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContextReact);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
