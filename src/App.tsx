import { useMemo, useState } from 'react';
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

  const [p1, setP1] = useState({ first: 'Alice', last: 'Durand', date: '1990-07-15' });
  const [p2, setP2] = useState({ first: 'Bob', last: 'Martin', date: '1992-03-02' });

  const computed = useMemo(() => {
    try {
      const n1 = personalNumber(p1.date, p1.first, p1.last);
      const n2 = personalNumber(p2.date, p2.first, p2.last);
      const nc = coupleNumber(n1, n2);
      const sc = compatScore(n1, n2, nc);
      return {
        n1,
        n2,
        nc,
        sc,
        r1: getIndividualReport(n1),
        r2: getIndividualReport(n2),
        rc: getCoupleReport(nc),
      };
    } catch {
      return null;
    }
  }, [p1, p2]);

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
        <header className="space-y-3 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            Aa Predictor
          </span>
          <h1 className="text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            Numerologie de couple inspiree et partageable
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Explorez le potentiel de votre duo, revelez vos points d harmonie et partagez un rapport scintillant
            avec vos proches en un clic.
          </p>
        </header>

        <section className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title">Exemple express</h2>
            <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
              Demo
            </span>
          </div>
          <p className="text-sm text-muted">Apercu genere avec les donnees d exemplaires Alice &amp; Bob.</p>

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
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">Compatibilite</h3>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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
        </section>

        <section className="card space-y-6" id="simulations">
          <div className="space-y-2">
            <h2 className="section-title">Calculateur rapide</h2>
          <p className="text-sm leading-relaxed text-muted">
            Renseignez vos prenoms et dates de naissance pour obtenir une lecture instantanee. Les resultats
            s adaptent au fur et a mesure.
          </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <fieldset className="space-y-4 rounded-xl border border-slate-200/70 bg-surface px-5 py-6 shadow-sm">
              <legend className="px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Partenaire 1
              </legend>
              <label className="space-y-2 text-sm font-semibold text-slate-700">
                Prenom
                <input
                  className="input-field"
                  value={p1.first}
                  onChange={(e) => setP1({ ...p1, first: e.target.value })}
                />
              </label>
              <label className="space-y-2 text-sm font-semibold text-slate-700">
                Nom
                <input
                  className="input-field"
                  value={p1.last}
                  onChange={(e) => setP1({ ...p1, last: e.target.value })}
                />
              </label>
              <label className="space-y-2 text-sm font-semibold text-slate-700">
                Date (YYYY-MM-DD)
                <input
                  className="input-field"
                  value={p1.date}
                  onChange={(e) => setP1({ ...p1, date: e.target.value })}
                />
              </label>
            </fieldset>

            <fieldset className="space-y-4 rounded-xl border border-slate-200/70 bg-surface px-5 py-6 shadow-sm">
              <legend className="px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Partenaire 2
              </legend>
              <label className="space-y-2 text-sm font-semibold text-slate-700">
                Prenom
                <input
                  className="input-field"
                  value={p2.first}
                  onChange={(e) => setP2({ ...p2, first: e.target.value })}
                />
              </label>
              <label className="space-y-2 text-sm font-semibold text-slate-700">
                Nom
                <input
                  className="input-field"
                  value={p2.last}
                  onChange={(e) => setP2({ ...p2, last: e.target.value })}
                />
              </label>
              <label className="space-y-2 text-sm font-semibold text-slate-700">
                Date (YYYY-MM-DD)
                <input
                  className="input-field"
                  value={p2.date}
                  onChange={(e) => setP2({ ...p2, date: e.target.value })}
                />
              </label>
            </fieldset>
          </div>

          <div className="border-t border-slate-200 pt-6">
            {computed ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-slate-700">
                  <p className="font-semibold text-primary">Partenaire 1</p>
                  <p>
                    Chiffre: <span className="font-semibold text-primary">{computed.n1}</span>
                  </p>
                  <p className="mt-1 font-medium text-slate-800">{computed.r1.title}</p>
                </div>
                <div className="rounded-lg border border-secondary/20 bg-secondary/5 px-4 py-3 text-sm text-slate-700">
                  <p className="font-semibold text-secondary">Partenaire 2</p>
                  <p>
                    Chiffre: <span className="font-semibold text-secondary">{computed.n2}</span>
                  </p>
                  <p className="mt-1 font-medium text-slate-800">{computed.r2.title}</p>
                </div>
                <div className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-slate-700 sm:col-span-2">
                  <p className="font-semibold text-accent">Couple</p>
                  <p>
                    Nombre: <span className="font-semibold text-accent">{computed.nc}</span> —{' '}
                    <span className="font-medium text-slate-800">{computed.rc.archetype}</span>
                  </p>
                  <p className="mt-1 font-semibold text-accent">Score {computed.sc} / 100</p>
                  <p className="mt-2 text-sm text-muted">{computed.rc.dynamic}</p>
                </div>
              </div>
            ) : (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Verifiez le format des dates (YYYY-MM-DD) pour lancer la magie numerologique.
              </p>
            )}
          </div>
        </section>

        <footer className="pb-10 text-center text-xs text-muted">
          <p>
            Pratique de bien-etre et d exploration. Ne remplace pas un avis medical, psychologique ou financier.
          </p>
        </footer>
      </main>
    </div>
  );
}
