import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type PaletteMode = 'light' | 'invert';

interface ThemeContextValue {
  palette: PaletteMode;
  setPalette: (mode: PaletteMode) => void;
  togglePalette: () => void;
}

const STORAGE_KEY = 'phuctran_monolith_palette';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'invert' ? 'invert' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('is-invert', palette === 'invert');
    localStorage.setItem(STORAGE_KEY, palette);
  }, [palette]);

  const setPalette = (mode: PaletteMode) => setPaletteState(mode);
  const togglePalette = () => setPaletteState((prev) => (prev === 'light' ? 'invert' : 'light'));

  return (
    <ThemeContext.Provider value={{ palette, setPalette, togglePalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
