import { ChatBubbleBottomCenterTextIcon, GiftIcon, ShareIcon } from '@heroicons/react/24/outline';
import type { CoupleResults } from '../../hooks/useCoupleResults';
import { cn } from '../../lib/cn';

interface RecommendedNextStepsProps {
  onShare?: () => void;
  onBookSession?: () => void;
  results: CoupleResults;
  className?: string;
}

const NEXT_STEPS = [
  {
    label: 'Partager avec votre partenaire',
    description: 'Diffusez le rapport pour continuer la conversation à deux.',
    icon: ShareIcon,
    action: 'share',
  },
  {
    label: 'Planifier une session guidée',
    description: 'Recevez un accompagnement personnalisé basé sur vos vibrations.',
    icon: ChatBubbleBottomCenterTextIcon,
    action: 'book',
  },
  {
    label: 'Offrir une expérience',
    description: 'Surprenez un couple ami avec une lecture exclusive.',
    icon: GiftIcon,
    action: 'gift',
  },
];

export default function RecommendedNextSteps({ onShare, onBookSession, results, className }: RecommendedNextStepsProps) {
  const actionsMap = {
    share: onShare,
    book: onBookSession ?? (() => {
      window.open('mailto:contact@aapredictor.com?subject=Session accompagnée&body=Bonjour, nous aimerions réserver une session guidée suite à notre lecture.', '_blank');
    }),
    gift: () => {
      window.open('https://calendly.com', '_blank', 'noopener');
    },
  };

  return (
    <div className={cn('space-y-4 rounded-2xl border border-primary/15 bg-primary/5 p-5 text-sm text-primary', className)}>
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Prochaines étapes</p>
        <h4 className="text-lg font-semibold text-slate-900">Amplifiez votre score {Math.round(results.score)}/100</h4>
        <p className="text-xs text-primary/80">Sélectionnez un levier pour faire rayonner votre relation dès aujourd’hui.</p>
      </header>
      <div className="grid gap-3 md:grid-cols-3">
        {NEXT_STEPS.map((step) => {
          const Icon = step.icon;
          const handler = actionsMap[step.action as keyof typeof actionsMap];
          return (
            <button
              key={step.label}
              type="button"
              onClick={() => handler?.()}
              className="group flex h-full flex-col items-start gap-2 rounded-2xl border border-primary/10 bg-white/80 px-4 py-4 text-left text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              <Icon className="h-5 w-5 text-primary transition group-hover:scale-110" aria-hidden />
              <span className="text-sm font-semibold text-slate-900">{step.label}</span>
              <span className="text-xs text-slate-600">{step.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
