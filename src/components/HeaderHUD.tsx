import { Command, Grid2x2, Pause, Play, ScanEye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderHUDProps {
  currentAct: number;
  totalActs: number;
  xrayOpen: boolean;
  autoPlay: boolean;
  onGoToAct: (idx: number) => void;
  onToggleAutoPlay: () => void;
  onToggleXray: () => void;
  onToggleFilmstrip: () => void;
  onOpenCmd: () => void;
}

export function HeaderHUD({
  currentAct,
  totalActs,
  xrayOpen,
  autoPlay,
  onGoToAct,
  onToggleAutoPlay,
  onToggleXray,
  onToggleFilmstrip,
  onOpenCmd,
}: HeaderHUDProps) {
  const { lang, toggleLang, t } = useLanguage();
  const { palette, togglePalette } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-5 sm:px-10 pt-5 sm:pt-7 flex items-center justify-between text-[11px] font-mono-tech pointer-events-none">
      <button
        type="button"
        onClick={() => onGoToAct(0)}
        data-no-lens
        className="pointer-events-auto inline-flex items-center gap-2.5 font-bold tracking-widest uppercase hover:opacity-80 transition group"
      >
        <img
          src="./assets/favicon.jpg"
          alt={t('brand_name')}
          className="w-6 h-6 rounded-full object-cover grayscale group-hover:grayscale-0 transition duration-300"
        />
        <span>{t('brand_name')}</span>
      </button>

      <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-5">
        <span className="tracking-widest font-bold tabular-nums hidden sm:inline">
          0{currentAct + 1} / 0{totalActs}
        </span>

        <button
          type="button"
          onClick={onToggleAutoPlay}
          data-lens
          aria-label={autoPlay ? t('hud_stop') : t('hud_auto')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 uppercase tracking-widest font-bold transition"
          style={
            autoPlay
              ? { backgroundColor: 'var(--inv-bg)', color: 'var(--inv-fg)' }
              : { opacity: 0.8 }
          }
        >
          {autoPlay ? (
            <Pause className="w-3 h-3" strokeWidth={1.75} />
          ) : (
            <Play className="w-3 h-3" strokeWidth={1.75} />
          )}
          <span>{autoPlay ? t('hud_stop') : t('hud_auto')}</span>
        </button>

        <button
          type="button"
          onClick={onToggleXray}
          data-lens
          aria-label={t('hud_xray')}
          className={`inline-flex items-center gap-1 uppercase tracking-widest transition ${
            xrayOpen ? 'font-bold underline underline-offset-4 opacity-100' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <ScanEye className="w-3.5 h-3.5 sm:hidden" strokeWidth={1.5} />
          <span className="hidden sm:inline">{t('hud_xray')}</span>
        </button>

        <button
          type="button"
          onClick={togglePalette}
          data-lens
          className="uppercase tracking-widest opacity-60 hover:opacity-100 transition"
        >
          {palette === 'light' ? t('hud_invert') : t('hud_light')}
        </button>

        <button
          type="button"
          onClick={toggleLang}
          data-lens
          className="uppercase tracking-widest font-bold opacity-80 hover:opacity-100 transition"
        >
          {lang === 'vi' ? 'EN' : 'VI'}
        </button>

        <button
          type="button"
          onClick={onOpenCmd}
          data-lens
          aria-label={t('hud_search')}
          className="inline-flex items-center gap-1 uppercase tracking-widest opacity-70 hover:opacity-100 transition"
        >
          <Command className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="hidden md:inline">K</span>
        </button>

        <button
          type="button"
          onClick={onToggleFilmstrip}
          data-lens
          aria-label={t('hud_filmstrip')}
          className="inline-flex items-center gap-1.5 uppercase tracking-widest underline underline-offset-4 hover:opacity-60 transition"
        >
          <Grid2x2 className="w-3.5 h-3.5 sm:hidden" strokeWidth={1.5} />
          <span className="hidden sm:inline">{t('hud_filmstrip')}</span>
        </button>
      </div>
    </header>
  );
}
