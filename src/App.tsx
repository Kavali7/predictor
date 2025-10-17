import { Layout, PageSection } from './components/layout';
import { HeroSection } from './components/landing';
import { CoupleCalculator } from './components/calculator';
import { personalNumber, coupleNumber, compatScore } from './app-content/src/numerology';
import { getIndividualReport, getCoupleReport } from './app-content/src/contentLoader';

export default function App() {
  const a = personalNumber('1990-07-15', 'Alice', 'Durand');
  const b = personalNumber('1992-03-02', 'Bob', 'Martin');
  const c = coupleNumber(a, b);
  const score = compatScore(a, b, c);
  const repA = getIndividualReport(a);
  const repB = getIndividualReport(b);
  const repC = getCoupleReport(c);

  return (
    <Layout>
      <HeroSection />
      <PageSection id="resultats" className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-secondary/5 via-transparent to-transparent" />
        <div className="card space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="section-title">Exemple express</h2>
            <span className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
              Démo
            </span>
          </div>
          <p className="text-sm text-muted">Aperçu généré avec les données d’exemple Alice &amp; Bob.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-primary/10 bg-primary/5 px-4 py-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Partenaire A</h3>
              <p className="text-2xl font-semibold text-primary">{a}</p>
              <p className="mt-2 text-sm text-slate-700">{repA.title}</p>
              <p className="mt-1 text-sm text-muted">{repA.summary}</p>
            </div>
            <div className="rounded-lg border border-secondary/20 bg-secondary/5 px-4 py-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary">Partenaire B</h3>
              <p className="text-2xl font-semibold text-secondary">{b}</p>
              <p className="mt-2 text-sm text-slate-700">{repB.title}</p>
              <p className="mt-1 text-sm text-muted">{repB.summary}</p>
            </div>
          </div>

          <div className="rounded-xl border border-accent/20 bg-gradient-to-r from-accent/10 via-white to-secondary/10 px-5 py-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Compatibilité</h3>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Nombre Couple</p>
                <p className="text-3xl font-bold text-accent">{c}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Score</p>
                <p className="text-3xl font-bold text-accent">{score} / 100</p>
              </div>
              <div className="max-w-md text-sm text-slate-700">{repC.dynamic}</div>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection id="simulations" className="space-y-8">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="section-title">Calculateur rapide</h2>
          <p className="text-sm leading-relaxed text-muted sm:max-w-2xl">
            Renseignez vos prénoms et dates de naissance pour obtenir une lecture instantanée. Validation en direct,
            feedbacks clairs et prêts pour générer un rapport partageable.
          </p>
        </div>
        <CoupleCalculator />
      </PageSection>
    </Layout>
  );
}
