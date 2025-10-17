import type { PropsWithChildren } from 'react';

export default function PromoBannerSlot({ children }: PropsWithChildren) {
  return (
    <aside className="flex w-full justify-center border-b border-primary/5 bg-primary/5 py-4">
      <div className="flex w-full max-w-6xl items-center justify-center px-6">
        <div className="relative flex w-full items-center justify-center rounded-2xl border border-dashed border-primary/30 bg-white/95 p-4 shadow-sm">
          {children ?? (
            <div className="flex h-[180px] w-full flex-col items-center justify-center gap-2 text-center sm:h-[120px] xl:h-[90px]">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Espace publicitaire
              </span>
              <p className="text-sm font-semibold text-slate-700">
                Réservez ce bandeau (970 × 250 desktop · 320 × 100 mobile) pour vos annonces premium.
              </p>
              <p className="text-xs text-muted">Rotation automatique des visuels toutes les 5 secondes (à venir).</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
