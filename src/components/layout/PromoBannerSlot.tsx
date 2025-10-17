import type { PropsWithChildren, ReactNode } from 'react';

interface PromoBannerSlotProps extends PropsWithChildren {
  fallback?: ReactNode;
}

export default function PromoBannerSlot({ children, fallback }: PromoBannerSlotProps) {
  return (
    <aside className="flex w-full justify-center border-b border-primary/5 bg-primary/5 py-4">
      <div className="flex w-full max-w-6xl items-center justify-center px-6">
        <div className="relative flex w-full items-center justify-center">
          {children ?? fallback ?? (
            <div className="flex h-[150px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/30 bg-white/95 p-6 text-center shadow-sm">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Espace publicitaire
              </span>
              <p className="text-sm font-semibold text-slate-700">
                Réservez ce bandeau (970 × 250 desktop · 320 × 100 mobile) pour vos annonces premium.
              </p>
              <p className="text-xs text-muted">Rotation automatique des visuels toutes les 5 secondes.</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
