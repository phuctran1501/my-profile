import { Command } from 'cmdk';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { PROJECTS, type ProjectCaseStudy } from '../data/projects';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAct: (idx: number) => void;
  onOpenProject: (proj: ProjectCaseStudy) => void;
  onToggleAutoPlay: () => void;
  onToggleFilmstrip: () => void;
  onToggleXray: () => void;
  onCopyEmail: () => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  onSelectAct,
  onOpenProject,
  onToggleAutoPlay,
  onToggleFilmstrip,
  onToggleXray,
  onCopyEmail,
}: CommandPaletteProps) {
  const { lang, t, toggleLang } = useLanguage();
  const { togglePalette } = useTheme();
  const { toggle: toggleAudio } = useAudio();

  if (!open) return null;

  const run = (fn: () => void) => {
    fn();
    onOpenChange(false);
  };

  return (
    <div
      onClick={() => onOpenChange(false)}
      className="fixed inset-0 z-70 flex items-start justify-center pt-20 sm:pt-28 px-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden font-mono-tech text-xs"
        style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
      >
        <Command label="Command Menu">
          <div className="flex items-center justify-between px-4 py-3.5" style={{ backgroundColor: 'var(--ghost)' }}>
            <Command.Input
              autoFocus
              placeholder={t('cmd_placeholder')}
              className="w-full bg-transparent outline-none text-xs sm:text-sm"
              style={{ color: 'var(--fg)' }}
            />
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-[10px] opacity-60 hover:opacity-100 uppercase tracking-widest ml-2"
            >
              ESC
            </button>
          </div>

          <Command.List className="max-h-80 overflow-y-auto no-scrollbar p-3 space-y-3">
            <Command.Empty className="py-6 text-center opacity-60">{t('cmd_empty')}</Command.Empty>

            <Command.Group heading={t('cmd_group_acts')} className="space-y-1">
              {[
                { idx: 0, label: `01 · ${t('act_01')}` },
                { idx: 1, label: `02 · ${t('act_02')}` },
                { idx: 2, label: `03 · ${t('act_03')}` },
                { idx: 3, label: `04 · ${t('act_04')}` },
                { idx: 4, label: `05 · ${t('act_05')}` },
                { idx: 5, label: `06 · ${t('act_06')}` },
              ].map((item) => (
                <Command.Item
                  key={item.idx}
                  onSelect={() => run(() => onSelectAct(item.idx))}
                  className="px-3 py-2 cursor-pointer flex items-center justify-between data-[selected=true]:bg-[var(--inv-bg)] data-[selected=true]:text-[var(--inv-fg)]"
                >
                  <span>{item.label}</span>
                  <span className="opacity-50">→</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading={t('cmd_group_works')} className="space-y-1">
              {PROJECTS.map((proj) => (
                <Command.Item
                  key={proj.id}
                  onSelect={() => run(() => onOpenProject(proj))}
                  className="px-3 py-2 cursor-pointer flex items-center justify-between data-[selected=true]:bg-[var(--inv-bg)] data-[selected=true]:text-[var(--inv-fg)]"
                >
                  <span>
                    {proj.index} · {proj.name}
                  </span>
                  <span className="opacity-50">{proj[lang].metric}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading={t('cmd_group_sys')} className="space-y-1">
              <Command.Item
                onSelect={() => run(onToggleAutoPlay)}
                className="px-3 py-2 cursor-pointer flex items-center justify-between data-[selected=true]:bg-[var(--inv-bg)] data-[selected=true]:text-[var(--inv-fg)]"
              >
                <span>{t('cmd_auto')}</span>
                <span className="opacity-50">AUTO</span>
              </Command.Item>
              <Command.Item
                onSelect={() => run(onToggleXray)}
                className="px-3 py-2 cursor-pointer flex items-center justify-between data-[selected=true]:bg-[var(--inv-bg)] data-[selected=true]:text-[var(--inv-fg)]"
              >
                <span>{t('cmd_xray')}</span>
                <span className="opacity-50">SPACE</span>
              </Command.Item>
              <Command.Item
                onSelect={() => run(onToggleFilmstrip)}
                className="px-3 py-2 cursor-pointer flex items-center justify-between data-[selected=true]:bg-[var(--inv-bg)] data-[selected=true]:text-[var(--inv-fg)]"
              >
                <span>{t('cmd_filmstrip')}</span>
                <span className="opacity-50">G</span>
              </Command.Item>
              <Command.Item
                onSelect={() => run(togglePalette)}
                className="px-3 py-2 cursor-pointer flex items-center justify-between data-[selected=true]:bg-[var(--inv-bg)] data-[selected=true]:text-[var(--inv-fg)]"
              >
                <span>{t('cmd_invert')}</span>
              </Command.Item>
              <Command.Item
                onSelect={() => run(toggleLang)}
                className="px-3 py-2 cursor-pointer flex items-center justify-between data-[selected=true]:bg-[var(--inv-bg)] data-[selected=true]:text-[var(--inv-fg)]"
              >
                <span>{t('cmd_lang')}</span>
              </Command.Item>
              <Command.Item
                onSelect={() => run(toggleAudio)}
                className="px-3 py-2 cursor-pointer flex items-center justify-between data-[selected=true]:bg-[var(--inv-bg)] data-[selected=true]:text-[var(--inv-fg)]"
              >
                <span>{t('cmd_audio')}</span>
              </Command.Item>
              <Command.Item
                onSelect={() => run(onCopyEmail)}
                className="px-3 py-2 cursor-pointer flex items-center justify-between data-[selected=true]:bg-[var(--inv-bg)] data-[selected=true]:text-[var(--inv-fg)]"
              >
                <span>{t('cmd_email')}</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
