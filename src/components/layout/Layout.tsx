import { useEffect, useState } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import PromoBannerSlot from './PromoBannerSlot';
import ScrollProgressBar from './ScrollProgressBar';
import type { AdItem } from '../ads/useRotatingBanner';
import AdBanner from '../ads/AdBanner';
import { cn } from '../../lib/cn';

export interface LayoutProps extends PropsWithChildren {
  promoContent?: ReactNode;
  ads?: AdItem[];
  adsLoading?: boolean;
  onAdClick?: (item: AdItem) => void;
  onAdView?: (item: AdItem) => void;
}

export default function Layout({ children, promoContent, ads, adsLoading = false, onAdClick, onAdView }: LayoutProps) {
  const [contrastMode, setContrastMode] = useState<'standard' | 'high'>('standard');
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedContrast = localStorage.getItem('aa-contrast');
    const storedScale = localStorage.getItem('aa-font-scale');
    if (storedContrast === 'high') setContrastMode('high');
    if (storedScale) {
      const parsed = Number(storedScale);
      if (!Number.isNaN(parsed)) setFontScale(parsed);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.dataset.contrast = contrastMode;
    localStorage.setItem('aa-contrast', contrastMode);
  }, [contrastMode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.style.setProperty('--font-scale', fontScale.toString());
    localStorage.setItem('aa-font-scale', fontScale.toFixed(2));
  }, [fontScale]);

  const increaseFont = () => setFontScale((value) => Math.min(1.3, Number((value + 0.1).toFixed(2))));
  const decreaseFont = () => setFontScale((value) => Math.max(0.9, Number((value - 0.1).toFixed(2))));
  const resetFont = () => setFontScale(1);

  const containerClass =
    contrastMode === 'high'
      ? 'min-h-screen bg-slate-950 text-slate-50'
      : 'min-h-screen bg-background text-slate-900';

  return (
    <div className={containerClass}>
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Aller directement au contenu
      </a>
      <ScrollProgressBar />
      <PromoBannerSlot
        fallback={
          adsLoading
            ? <AdBanner items={ads ?? []} isLoading />
            : ads
              ? <AdBanner items={ads} onAdClick={onAdClick} onAdView={onAdView} />
              : undefined
        }
      >
        {promoContent}
      </PromoBannerSlot>
      <Header />
      <AccessibilityControls
        contrastMode={contrastMode}
        onToggleContrast={() => setContrastMode((mode) => (mode === 'high' ? 'standard' : 'high'))}
        fontScale={fontScale}
        onIncreaseFont={increaseFont}
        onDecreaseFont={decreaseFont}
        onResetFont={resetFont}
      />
      <main
        id="contenu-principal"
        className="mx-auto w-full max-w-6xl px-4 py-12 space-y-16 sm:px-6 lg:px-10 xl:max-w-7xl"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

interface AccessibilityControlsProps {
  contrastMode: 'standard' | 'high';
  onToggleContrast: () => void;
  fontScale: number;
  onIncreaseFont: () => void;
  onDecreaseFont: () => void;
  onResetFont: () => void;
}

function AccessibilityControls({
  contrastMode,
  onToggleContrast,
  fontScale,
  onIncreaseFont,
  onDecreaseFont,
  onResetFont,
}: AccessibilityControlsProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl items-center justify-end gap-3 px-4 py-3 text-xs text-muted sm:px-6 lg:px-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold shadow-sm">
        <span className="text-slate-500">Affichage</span>
        <button
          type="button"
          aria-pressed={contrastMode === 'high'}
          onClick={onToggleContrast}
          className={cn(
            'rounded-full px-3 py-1 transition',
            contrastMode === 'high' ? 'bg-primary text-white shadow' : 'bg-transparent text-slate-600',
          )}
        >
          Contraste +
        </button>
        <div className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden />
        <div className="hidden items-center gap-1 sm:flex">
          <button
            type="button"
            aria-label="Réduire la taille des textes"
            onClick={onDecreaseFont}
            className="rounded-full border border-slate-200 px-2 py-0.5 text-slate-600 transition hover:border-slate-300"
          >
            A-
          </button>
          <button
            type="button"
            aria-label="Réinitialiser la taille des textes"
            onClick={onResetFont}
            className="rounded-full border border-slate-200 px-2 py-0.5 text-slate-600 transition hover:border-slate-300"
          >
            A
          </button>
          <button
            type="button"
            aria-label="Augmenter la taille des textes"
            onClick={onIncreaseFont}
            className="rounded-full border border-slate-200 px-2 py-0.5 text-slate-600 transition hover:border-slate-300"
          >
            A+
          </button>
        </div>
        <span className="hidden text-slate-500 sm:inline">({Math.round(fontScale * 100)}%)</span>
      </div>
    </section>
  );
}
