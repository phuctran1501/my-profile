import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ProjectCaseStudy } from '../data/projects';

interface IrisTakeoverProps {
  project: ProjectCaseStudy | null;
  origin: { x: string; y: string };
  onClose: () => void;
}

export function IrisTakeover({ project, origin, onClose }: IrisTakeoverProps) {
  const { lang, t } = useLanguage();
  const isOpen = project !== null;
  const content = project ? project[lang] : null;

  const style: CSSProperties & Record<string, string> = {
    backgroundColor: 'var(--inv-bg)',
    color: 'var(--inv-fg)',
    '--iris-x': origin.x,
    '--iris-y': origin.y,
  };

  return (
    <article
      aria-hidden={!isOpen}
      className={`iris-takeover fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 overflow-y-auto no-scrollbar ${isOpen ? 'is-open' : ''}`}
      style={style}
    >
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col justify-between gap-8">
        <div className="flex items-center justify-between text-xs font-mono-tech pt-1">
          <span className="uppercase tracking-widest opacity-65">{content?.meta}</span>
          <button
            type="button"
            onClick={onClose}
            data-lens
            className="font-bold uppercase tracking-widest underline underline-offset-4"
          >
            {t('iris_close')}
          </button>
        </div>

        {project && content && (
          <div className="my-auto space-y-8 py-4">
            <h2 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.95]">
              {project.name}
            </h2>

            <div className="space-y-2">
              <div className="text-[10px] font-mono-tech uppercase tracking-widest opacity-55">
                {t('iris_overview_lbl')}
              </div>
              <p className="text-sm sm:text-lg leading-relaxed opacity-90">{content.overview}</p>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono-tech uppercase tracking-widest opacity-55">
                {t('iris_highlights_lbl')}
              </div>
              <ul className="space-y-2 text-xs sm:text-sm opacity-85">
                {content.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="font-mono-tech opacity-60">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 font-mono-tech">
              <div className="text-[10px] uppercase tracking-widest opacity-55">
                {t('iris_flow_lbl')}
              </div>
              <div className="text-xs sm:text-sm font-bold leading-relaxed break-words">
                {content.flow}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech pb-2">
          <span className="opacity-70">{project?.stack}</span>
          {project && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              data-lens
              className="inline-flex items-center gap-1.5 font-bold uppercase tracking-widest underline underline-offset-4"
            >
              <span>{t('iris_repo_btn').replace(' ↗', '')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
