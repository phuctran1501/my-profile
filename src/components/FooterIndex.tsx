import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../i18n/vi';

interface FooterIndexProps {
  currentAct: number;
  onSelectAct: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const ACT_KEYS: { code: string; key: TranslationKey }[] = [
  { code: '01', key: 'act_01' },
  { code: '02', key: 'act_02' },
  { code: '03', key: 'act_03' },
  { code: '04', key: 'act_04' },
  { code: '05', key: 'act_05' },
  { code: '06', key: 'act_06' },
];

export function FooterIndex({
  currentAct,
  onSelectAct,
  onPrev,
  onNext,
}: FooterIndexProps) {
  const { t } = useLanguage();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 px-5 sm:px-10 pb-5 flex items-center justify-between text-[11px] font-mono-tech pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-2.5 sm:gap-5" aria-label="Acts">
        {ACT_KEYS.map((item, idx) => {
          const active = idx === currentAct;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => onSelectAct(idx)}
              data-lens
              className="uppercase tracking-widest transition-opacity"
              style={{
                opacity: active ? 1 : 0.32,
                fontWeight: active ? 700 : 400,
              }}
            >
              <span className="md:hidden">{item.code}</span>
              <span className="hidden md:inline">
                {item.code} {t(item.key)}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="pointer-events-auto flex items-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          data-lens
          aria-label="Previous Act"
          className="p-1 hover:opacity-50 transition"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={onNext}
          data-lens
          aria-label="Next Act"
          className="p-1 hover:opacity-50 transition"
        >
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </footer>
  );
}
