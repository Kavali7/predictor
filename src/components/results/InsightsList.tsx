import type { CoupleResults } from '../../hooks/useCoupleResults';
import { cn } from '../../lib/cn';

interface InsightsListProps {
  results: CoupleResults;
  className?: string;
}

export default function InsightsList({ results, className }: InsightsListProps) {
  const score = Math.round(results.score);
  const affinity =
    score >= 90 ? 'harmonie flamboyante' : score >= 75 ? 'alignement solide' : score >= 60 ? 'équilibre en mouvement' : 'contraste fertile';

  const insights = [
    `Vos vibrations personnelles ${results.partnerA.number} & ${results.partnerB.number} racontent une ${affinity}.`,
    `L’archetype de couple « ${results.couple.archetype} » suggère ${results.couple.dynamic.toLowerCase()}.`,
    `Score ${score}/100 : ${score >= 80 ? 'partagez votre énergie rayonnante' : 'identifiez vos rituels pour renforcer votre connection'}.`,
  ];

  return (
    <div className={cn('space-y-3 rounded-2xl border border-secondary/20 bg-secondary/5 p-5 text-sm text-secondary', className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary/70">3 points à retenir</p>
      <ul className="space-y-3">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start gap-3 leading-relaxed">
            <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-secondary" />
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
