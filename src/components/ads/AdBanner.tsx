import { useEffect, useMemo } from 'react';
import { useRotatingBanner, type AdItem } from './useRotatingBanner';
import { cn } from '../../lib/cn';

export interface AdBannerProps {
  items: AdItem[];
  intervalMs?: number;
  isLoading?: boolean;
  onAdClick?: (item: AdItem) => void;
  onAdView?: (item: AdItem) => void;
}

export default function AdBanner({ items, intervalMs, isLoading = false, onAdClick, onAdView }: AdBannerProps) {
  const { current, index, pause, resume, goTo, count, hasItems } = useRotatingBanner({
    items,
    intervalMs,
    autoStart: true,
  });

  const indicators = useMemo(() => Array.from({ length: count }), [count]);

  useEffect(() => {
    if (current) {
      onAdView?.(current);
      console.log('ad-view', current.id);
    }
  }, [current, onAdView]);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center rounded-2xl bg-white/80 p-6 shadow-sm" data-testid="ad-banner-skeleton">
        <div className="h-20 w-full max-w-4xl animate-pulse rounded-xl bg-gradient-to-r from-primary/10 via-white to-secondary/10" />
      </div>
    );
  }

  if (!hasItems || !current) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/30 bg-white/80 p-6 text-center text-sm text-primary shadow-sm">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Espace disponible
        </span>
        <p>Votre annonce pourrait être ici. Contactez-nous pour mettre en avant vos offres inspirantes.</p>
      </div>
    );
  }

  return (
    <article
      className="flex w-full flex-col gap-4 rounded-2xl border border-primary/20 bg-white/90 p-4 shadow-lg shadow-primary/10 transition"
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-live="polite"
    >
      <a
        href={current.link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-100 transition hover:shadow-2xl focus:outline-none focus-visible:ring focus-visible:ring-primary/50"
        style={{ background: current.background ?? 'linear-gradient(135deg, rgba(91,33,182,0.15), rgba(14,165,233,0.15))' }}
        aria-label={`Annonce ${index + 1} sur ${count}`}
        onClick={() => {
          onAdClick?.(current);
          console.log('ad-click', current.id);
        }}
        onFocus={pause}
        onBlur={resume}
      >
        <img
          src={current.imageUrl}
          alt={current.alt}
          className="h-[120px] w-full max-w-full rounded-2xl object-cover object-center sm:h-[140px] md:h-[180px] lg:h-[220px] xl:h-[250px]"
        />
        {current.label && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {current.label}
          </span>
        )}
      </a>

      {indicators.length > 1 && (
        <div className="flex items-center justify-center gap-3">
          {indicators.map((_, i) => (
            <button
              key={i}
              type="button"
              className={cn(
                'h-2.5 w-2.5 rounded-full border border-primary/20 bg-primary/10 transition hover:scale-110 focus:outline-none focus-visible:ring focus-visible:ring-primary/40',
                i === index && 'w-5 bg-primary',
              )}
              aria-label={`Afficher l'annonce ${i + 1}`}
              aria-pressed={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </article>
  );
}
