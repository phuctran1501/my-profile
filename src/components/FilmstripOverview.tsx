import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../i18n/vi';

interface FilmstripOverviewProps {
  open: boolean;
  currentAct: number;
  onSelectAct: (idx: number) => void;
  onClose: () => void;
}

const ACTS_META: { code: string; key: TranslationKey }[] = [
  { code: '01', key: 'act_01' },
  { code: '02', key: 'act_02' },
  { code: '03', key: 'act_03' },
  { code: '04', key: 'act_04' },
  { code: '05', key: 'act_05' },
  { code: '06', key: 'act_06' },
];

export function FilmstripOverview({
  open,
  currentAct,
  onSelectAct,
  onClose,
}: FilmstripOverviewProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          key="filmstrip"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 px-6 sm:px-12 py-20 flex flex-col justify-center overflow-y-auto no-scrollbar"
          style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
        >
          <div className="max-w-6xl w-full mx-auto">
            <div className="flex items-center justify-between mb-8 text-xs font-mono-tech">
              <span className="uppercase tracking-widest" style={{ color: 'var(--subtle)' }}>
                {t('film_title')}
              </span>
              <button
                type="button"
                onClick={onClose}
                data-lens
                className="uppercase font-bold underline underline-offset-4"
              >
                ESC
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {ACTS_META.map((act, idx) => {
                const active = idx === currentAct;
                return (
                  <motion.button
                    key={act.code}
                    type="button"
                    data-lens
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    onClick={() => onSelectAct(idx)}
                    className="p-5 text-left flex flex-col justify-between h-32 sm:h-48 cursor-pointer"
                    style={{
                      backgroundColor: active ? 'var(--inv-bg)' : 'var(--ghost)',
                      color: active ? 'var(--inv-fg)' : 'var(--fg)',
                    }}
                  >
                    <span className="font-mono-tech text-xs opacity-60">{act.code}</span>
                    <span className="text-lg sm:text-xl font-black tracking-tighter uppercase">
                      {t(act.key)}
                    </span>
                    <span className="font-mono-tech text-[10px] opacity-60 uppercase">
                      {t('film_enter')}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
