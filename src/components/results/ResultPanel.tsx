import { ArrowDownTrayIcon, ArrowUpOnSquareIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import type { CoupleResults } from '../../hooks/useCoupleResults';
import { cn } from '../../lib/cn';

interface ResultPanelProps {
  results: CoupleResults;
  headline?: string;
  subHeadline?: string;
  onShare?: () => void;
  onDownload?: () => void | Promise<void>;
  onSendEmail?: () => void | Promise<void>;
  className?: string;
  variant?: 'default' | 'compact';
}

export default function ResultPanel({
  results,
  headline = 'Lecture instantanée',
  subHeadline = 'Un résumé harmonieux de vos vibrations personnelles et de couple.',
  onShare,
  onDownload,
  onSendEmail,
  className,
  variant = 'default',
}: ResultPanelProps) {
  const score = Math.round(results.score);
  const cards = [
    {
      title: 'Partenaire 1',
      number: results.partnerA.number,
      tone: 'primary',
      subtitle: results.partnerA.title,
      description: results.partnerA.summary,
    },
    {
      title: 'Partenaire 2',
      number: results.partnerB.number,
      tone: 'secondary',
      subtitle: results.partnerB.title,
      description: results.partnerB.summary,
    },
    {
      title: 'Couple',
      number: results.couple.number,
      tone: 'accent',
      subtitle: `${results.couple.archetype}`,
      description: `${results.couple.dynamic}`,
      footer: `Score ${score} / 100`,
    },
  ];

  const actions = [
    {
      label: 'Partager',
      icon: ArrowUpOnSquareIcon,
      onClick: onShare,
      disabled: !onShare,
    },
    {
      label: 'Enregistrer en PDF',
      icon: ArrowDownTrayIcon,
      onClick: onDownload,
      disabled: !onDownload,
    },
    {
      label: 'Envoyer par email',
      icon: EnvelopeIcon,
      onClick: onSendEmail,
      disabled: !onSendEmail,
    },
  ].filter((action) => action.onClick);

  return (
    <section
      className={cn(
        'space-y-6 rounded-3xl border border-white/50 bg-white/80 p-6 shadow-[0_30px_80px_-60px_rgba(91,33,182,0.35)] backdrop-blur',
        variant === 'compact' && 'shadow-none border-primary/10 bg-white',
        className,
      )}
    >
      <header className="space-y-2 text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Vos vibrations</p>
        <h3 className="text-2xl font-semibold text-slate-900">{headline}</h3>
        <p className="text-sm leading-relaxed text-muted">{subHeadline}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className={cn(
              'group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl',
              card.tone === 'primary' && 'from-primary/10 via-white to-primary/5 border-primary/20',
              card.tone === 'secondary' && 'from-secondary/10 via-white to-secondary/5 border-secondary/20',
              card.tone === 'accent' && 'from-accent/10 via-white to-accent/5 border-accent/20 md:col-span-1',
            )}
          >
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div
                className={cn(
                  'absolute inset-0',
                  card.tone === 'primary' && 'bg-primary/10',
                  card.tone === 'secondary' && 'bg-secondary/10',
                  card.tone === 'accent' && 'bg-accent/10',
                )}
              />
            </div>
            <div className="relative space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{card.title}</p>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-4xl font-semibold text-slate-950">{card.number}</span>
                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
                  {card.subtitle}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{card.description}</p>
              {card.footer && <p className="text-sm font-semibold text-slate-900">{card.footer}</p>}
            </div>
          </article>
        ))}
      </div>

      {actions.length > 0 && (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">Amplifier l expérience</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  disabled={action.disabled}
                  onClick={() => action.onClick?.()}
                  className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-60',
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
