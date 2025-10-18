
import { Suspense, lazy, useEffect, useState } from 'react';
import { Layout, PageSection } from './components/layout';
import { HeroSection } from './components/landing';
import { CoupleCalculator } from './components/calculator';
import { ResultPanel, ShareModal, InsightsList, RecommendedNextSteps } from './components/results';
import { ShareResultsFlow } from './components/share';
import type { AdItem } from './components/ads/useRotatingBanner';
import { useCoupleResults } from './hooks/useCoupleResults';

const TestimonialsSection = lazy(() => import('./components/marketing/TestimonialsSection'));
const HowItWorksSection = lazy(() => import('./components/marketing/HowItWorksSection'));
const FaqSection = lazy(() => import('./components/marketing/FaqSection'));
const ResourceCards = lazy(() => import('./components/marketing/ResourceCards'));

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

  const ads: AdItem[] = [
    {
      id: 'ad-banner-1',
      imageUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
      alt: 'Retraite bien-être à Bali',
      link: 'https://example.com/retraite-bali',
      label: 'Retraite 2025',
      background: 'linear-gradient(135deg, rgba(91,33,182,0.25), rgba(14,165,233,0.25))',
    },
    {
      id: 'ad-banner-2',
      imageUrl: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
      alt: 'Masterclass numérologie',
      link: 'https://example.com/masterclass-numerologie',
      label: 'Masterclass',
      background: 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(14,165,233,0.25))',
    },
  ];

  return (
    <Layout ads={ads}>
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
              onDownload={async () => {
                const { generatePdfSummary } = await import('./lib/share/generatePdfSummary');
                await generatePdfSummary(sampleResults, { filename: 'lecture-alice-bob.pdf' });
              }}
              onSendEmail={() => {
                window.open(
                  'mailto:?subject=Lecture de couple Aa Predictor&body=' +
                    encodeURIComponent(
                      `Regarde la lecture Alice & Bob (score ${Math.round(sampleResults.score)} / 100) : ${shareUrl}`,
                    ),
                  '_blank',
                );
              }}
            />
            <InsightsList results={sampleResults} />
            <RecommendedNextSteps results={sampleResults} onShare={() => setShareOpen(true)} />
          </>
        )}

        <footer className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-xs text-muted shadow-inner">
          Exemple mis à jour automatiquement — réalisez votre propre lecture ci-dessous.
        </footer>
      </PageSection>

      <PageSection id="experience" className="space-y-16">
        <Suspense fallback={<div className="card text-sm text-muted">Chargement des contenus…</div>}>
          <HowItWorksSection />
          <TestimonialsSection />
          <ResourceCards />
          <FaqSection />
        </Suspense>
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

      <PageSection id="partage" className="space-y-8">
        <h2 className="section-title text-center sm:text-left">Partagez l’expérience</h2>
        <ShareResultsFlow
          score={sampleResults?.score ?? 0}
          archetype={sampleResults?.couple.archetype ?? 'Constellation lumineuse'}
          shareUrl={shareUrl}
          onTrack={(channel: string) => console.log('share_clicked', { channel })}
        />
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



