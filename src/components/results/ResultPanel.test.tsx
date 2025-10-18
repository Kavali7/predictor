import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultPanel from './ResultPanel';
import type { CoupleResults } from '../../hooks/useCoupleResults';

const partnerAReport = {
  id: 'individual-7',
  type: 'individual',
  locale: 'fr',
  number: 7,
  version: 1,
  updatedAt: '2025-01-01',
  title: 'Visionnaire inspiré',
  summary: 'Explore des idées nouvelles et stimule la relation par la curiosité.',
  love: 'Passionné et investi.',
  work: 'Analyse et stratégie.',
  money: 'Gère avec prudence.',
  health: 'Veille à l’équilibre émotionnel.',
  shadow: 'Peut s’isoler.',
  overallAdvice: 'Partager ses visions avec son partenaire.',
  luckyMonths: ['mars'],
  keywords: ['vision', 'intuition'],
};

const partnerBReport = {
  ...partnerAReport,
  id: 'individual-4',
  number: 4,
  title: 'Architecte stable',
  summary: 'Ancre le duo avec structure et engagement durable.',
};

const coupleReport = {
  id: 'couple-11',
  type: 'couple',
  locale: 'fr',
  number: 11,
  version: 1,
  updatedAt: '2025-01-01',
  archetype: 'Constellation lumineuse',
  dynamic: 'Une alchimie qui invite à rayonner autour de soi.',
  strengths: ['vision partagée'],
  blindspots: ['fatigue énergétique'],
  conflicts: ['rythme différent'],
  rituals: ['revue mensuelle'],
  advice: 'Célébrez vos victoires en duo.',
};

const MOCK_RESULTS: CoupleResults = {
  partnerA: {
    number: 7,
    title: partnerAReport.title,
    summary: partnerAReport.summary,
    report: partnerAReport,
  },
  partnerB: {
    number: 4,
    title: partnerBReport.title,
    summary: partnerBReport.summary,
    report: partnerBReport,
  },
  couple: {
    number: 11,
    archetype: coupleReport.archetype,
    dynamic: coupleReport.dynamic,
    report: coupleReport,
  },
  score: 92,
  raw: {
    partnerA: { number: 7, report: partnerAReport },
    partnerB: { number: 4, report: partnerBReport },
    couple: { number: 11, report: coupleReport },
    score: 92,
  },
};

describe('ResultPanel', () => {
  it('affiche les informations principales du couple', () => {
    render(<ResultPanel results={MOCK_RESULTS} />);

    expect(screen.getByText(/Partenaire 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Partenaire 2/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Couple/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/92/i)).toBeInTheDocument();
    expect(screen.getByText(/Constellation lumineuse/i)).toBeInTheDocument();
  });

  it('met à disposition les actions lorsque les callbacks sont fournis', async () => {
    const handleShare = vi.fn();
    const handleDownload = vi.fn();
    const handleEmail = vi.fn();
    const user = userEvent.setup({ delay: null });

    render(
      <ResultPanel
        results={MOCK_RESULTS}
        onShare={handleShare}
        onDownload={handleDownload}
        onSendEmail={handleEmail}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Partager/i }));
    expect(handleShare).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: /Enregistrer en PDF/i }));
    expect(handleDownload).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: /Envoyer par email/i }));
    expect(handleEmail).toHaveBeenCalledTimes(1);
  });

  it('masque les actions non configurées', () => {
    render(<ResultPanel results={MOCK_RESULTS} onShare={vi.fn()} />);

    expect(screen.getByRole('button', { name: /Partager/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Enregistrer en PDF/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Envoyer par email/i })).not.toBeInTheDocument();
  });
});
