import { useEffect, useState, type CSSProperties } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TECH_STACK_CATEGORIES } from '../../data/techStack';

interface ActTechStackProps {
  isActive: boolean;
  isPrev: boolean;
  autoPlay: boolean;
}

export function ActTechStack({ isActive, isPrev, autoPlay }: ActTechStackProps) {
  const { lang, t } = useLanguage();
  const [autoCatIdx, setAutoCatIdx] = useState<number>(-1);

  useEffect(() => {
    if (!isActive || !autoPlay) {
      setAutoCatIdx(-1);
      return;
    }

    setAutoCatIdx(0);
    let idx = 0;
    const id = window.setInterval(() => {
      idx = (idx + 1) % TECH_STACK_CATEGORIES.length;
      setAutoCatIdx(idx);
    }, 1350);

    return () => window.clearInterval(id);
  }, [isActive, autoPlay]);

  return (
    <section
      className={`act-panel flex flex-col justify-between px-5 sm:px-10 py-16 sm:py-20 overflow-y-auto no-scrollbar ${
        isActive ? 'is-active' : isPrev ? 'is-prev' : ''
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tech pt-2">
        <span className="uppercase tracking-widest" style={{ color: 'var(--subtle)' }}>
          {t('stack_tag')}
        </span>
        <span style={{ color: 'var(--subtle)' }}>{t('stack_hint')}</span>
      </div>

      <div className="my-auto py-4 sm:py-6 space-y-5 sm:space-y-6 max-w-5xl w-full mx-auto">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase">
          {t('stack_title')}
        </h2>

        <div className="space-y-4 sm:space-y-5">
          {TECH_STACK_CATEGORIES.map((cat, cIdx) => {
            const rowHighlighted = autoPlay && autoCatIdx === cIdx;
            return (
              <div
                key={cat.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-4 items-center"
              >
                <div className="md:col-span-3 text-xs sm:text-sm font-semibold tracking-tight">
                  {lang === 'vi' ? cat.labelVi : cat.labelEn}
                </div>

                <div className="md:col-span-5 flex flex-wrap items-center gap-4 sm:gap-5">
                  {cat.items.map((item) => {
                    const IconComponent = item.Icon;
                    const style = { '--brand-color': item.brandColor } as CSSProperties;
                    return (
                      <div
                        key={item.id}
                        data-no-lens
                        title={item.name}
                        style={style}
                        className={`tech-item inline-flex items-center gap-2 cursor-default ${
                          rowHighlighted ? 'is-colored' : ''
                        }`}
                      >
                        <IconComponent className="tech-icon-svg w-7 h-7 sm:w-8 sm:h-8" />
                        <span
                          className="sm:hidden text-xs font-mono-tech"
                          style={{ color: 'var(--muted)' }}
                        >
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div
                  className="hidden md:block md:col-span-4 text-xs font-mono-tech leading-relaxed"
                  style={{ color: 'var(--muted)' }}
                >
                  {cat.summary}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="text-[11px] font-mono-tech flex justify-between pb-3"
        style={{ color: 'var(--subtle)' }}
      >
        <span>{t('stack_count')}</span>
        <span>02 / 06</span>
      </div>
    </section>
  );
}
