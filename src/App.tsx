import { useEffect, useState } from 'react';
import { Layout, PageSection } from './components/layout';
import { HeroSection } from './components/landing';
import { CoupleCalculator } from './components/calculator';
import { ResultPanel, ShareModal, InsightsList, RecommendedNextSteps } from './components/results';
import { useCoupleResults } from './hooks/useCoupleResults';
import { generatePdfSummary } from './lib/share/generatePdfSummary';

const SAMPLE_PARTNER_A = { firstName: 'Alice', lastName: 'Durand', date: '1990-07-15' };
const SAMPLE_PARTNER_B = { firstName: 'Bob', lastName: 'Martin', date: '1992-03-02' };

export default function App() {
  const sampleResults = useCoupleResults(SAMPLE_PARTNER_A, SAMPLE_PARTNER_B);
  const [shareOpen, setShareOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('https://aapredictor.com/experience');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.hash = 'resultats';
      setShareUrl(url.toString());
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 1800);
    } catch (error) {
      console.warn('Clipboard non disponible', error);
      setHasCopied(false);
    }
  };

  return (
    <Layout>
      <HeroSection />

      <PageSection id="resultats" className="relative space-y-8">
        <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-secondary/5 via-transparent to-transparent" />
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="section-title">Exemple express</h2>
            <p className="text-sm text-muted">Aperçu généré avec les données d’exemple Alice &amp; Bob.</p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
            Démo
          </span>
        </header>

        {sampleResults && (
          <>
            <ResultPanel
              results={sampleResults}
              headline="Le duo Alice & Bob brille à 92/100"
              subHeadline="Une synergie inspirante que vous pouvez reproduire en quelques secondes grâce au calculateur."
              onShare={() => setShareOpen(true)}
              onDownload={() => generatePdfSummary(sampleResults, { filename: 'lecture-alice-bob.pdf' })}
              onSendEmail={() => {
                window.open(
                  `mailto:?subject=Lecture de couple Aa Predictor&body=${encodeURIComponent(
                    `Regarde la lecture Alice & Bob (score ${Math.round(sampleResults.score)} / 100) : ${shareUrl}`,
                  )}`,
                  '_blank',
                );
              }}
            />
            <InsightsList results={sampleResults} />
            <RecommendedNextSteps results={sampleResults} onShare={() => setShareOpen(true)} />
          </>
        )}

        <footer className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-xs text-muted shadow-inner">
          Exemple mis à jour automatiquement – réalisez votre propre lecture ci-dessous.
        </footer>
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

      {sampleResults && (
        <ShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          shareUrl={shareUrl}
          title="Partager l’exemple Alice & Bob"
          description={`Score ${Math.round(sampleResults.score)} / 100 – ${sampleResults.couple.archetype}`}
          hasCopied={hasCopied}
          onCopy={handleCopy}
        />
      )}
    </Layout>
  );
}
