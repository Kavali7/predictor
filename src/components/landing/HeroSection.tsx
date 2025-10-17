import { useMemo } from 'react';
import { PageSection } from '../layout';

const STATS = [
  { label: 'Couples inspirés', value: '12 400+' },
  { label: 'Taux de partage', value: '86%' },
  { label: 'Avis 5★', value: '1 520' },
];

const HIGHLIGHTS = [
  'Rapport instantané propulsé par la numérologie moderne',
  'Visualisations éclatantes prêtes à être partagées',
  'Conseils personnalisés pour nourrir votre duo',
];

export default function HeroSection() {
  return (
    <PageSection
      id="hero"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-background to-secondary/10 px-4 py-16 sm:px-8 lg:px-16"
    >
      <DecorativeBackground />
      <div className="flex flex-col items-center gap-12 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-primary shadow-sm backdrop-blur">
            <span>Nouvelle expérience</span>
            <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
            <span>2025</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Vivez une <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">lecture numérologique</span> qui donne envie d être partagée
            </h1>
            <p className="text-balance text-base leading-relaxed text-slate-700 sm:text-lg">
              Découvrez votre dynamique de couple en quelques secondes, recevez un rapport splendide et diffusez-le
              instantanément à celles et ceux qui comptent. Tout est pensé pour une expérience fluide, chaleureuse et
              premium.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#simulations"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-[0_25px_60px_-25px_rgba(91,33,182,0.75)] transition hover:-translate-y-0.5 hover:shadow-[0_32px_80px_-30px_rgba(91,33,182,0.85)]"
            >
              <span>Commencer maintenant</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </a>
            <a
              href="#resultats"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/70 bg-white px-7 py-3 text-sm font-semibold text-primary transition hover:border-primary/40 hover:text-primary"
            >
              Voir un aperçu
            </a>
          </div>

          <ul className="mx-auto flex max-w-xl flex-col gap-3 text-left text-sm text-slate-700 lg:mx-0">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary shadow-sm" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="grid gap-4 rounded-2xl border border-white/40 bg-white/70 p-6 text-sm shadow-lg shadow-primary/10 backdrop-blur sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center">
          <IllustrationCard />
        </div>
      </div>
    </PageSection>
  );
}

function DecorativeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-16 left-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <Starfield />
    </div>
  );
}

function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, index) => {
        const x = Math.random() * 600;
        const y = Math.random() * 400;
        const opacity = 0.3 + Math.random() * 0.6;
        const radius = 0.6 + Math.random() * 1.4;
        return { id: index, x, y, opacity, radius };
      }),
    [],
  );
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 400" aria-hidden>
      {stars.map((star) => (
        <circle key={star.id} cx={star.x} cy={star.y} r={star.radius} fill="white" fillOpacity={star.opacity} />
      ))}
    </svg>
  );
}

function IllustrationCard() {
  return (
    <div className="relative w-full max-w-[420px] rounded-3xl border border-white/50 bg-white/80 p-6 shadow-[0_30px_120px_-60px_rgba(14,165,233,0.45)] backdrop-blur">
      <div className="absolute -top-3 right-6 inline-flex items-center gap-2 rounded-full bg-secondary/90 px-3 py-1 text-xs font-semibold text-white shadow-lg">
        <span className="inline-flex h-2 w-2 rounded-full bg-white" />
        Lecture premium
      </div>
      <section className="space-y-4">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Aperçu instantané</p>
          <h3 className="text-lg font-semibold text-slate-900">Alice &amp; Bob</h3>
          <p className="text-sm text-muted">Compatibilité vibrante soutenue par une énergie créative.</p>
        </header>
        <div className="grid gap-3 rounded-2xl bg-gradient-to-br from-primary/10 via-white to-secondary/10 p-4 text-sm shadow-inner">
          <InfoRow label="Chiffre Alice" value="7 · Visionnaire" accent="primary" />
          <InfoRow label="Chiffre Bob" value="4 · Architecte" accent="secondary" />
          <InfoRow label="Couple" value="11 · Constellation lumineuse" accent="accent" />
          <InfoRow label="Score" value="92 / 100" accent="accent" />
        </div>
        <footer className="space-y-3 rounded-2xl bg-white/80 p-4 text-xs leading-relaxed text-slate-600 shadow-sm">
          <p>
            Ce duo explore ensemble de nouveaux horizons et crée des rituels inspirants. Chaque partage renforce leur
            lien et illumine leur entourage.
          </p>
          <p className="font-semibold text-primary">Partager ce rapport →</p>
        </footer>
      </section>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  accent: 'primary' | 'secondary' | 'accent';
}

function InfoRow({ label, value, accent }: InfoRowProps) {
  const accentMap: Record<InfoRowProps['accent'], string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
  };
  return (
    <div className="flex flex-col rounded-xl bg-white/80 px-4 py-3 shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">{label}</span>
      <span className={`text-base font-semibold text-slate-900 ${accentMap[accent]}`}>{value}</span>
    </div>
  );
}
