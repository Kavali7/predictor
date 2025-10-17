import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultPanel from './ResultPanel';
import type { CoupleResults } from '../../hooks/useCoupleResults';

const MOCK_RESULTS: CoupleResults = {
  partnerA: {
    number: 7,
    title: 'Visionnaire inspiré',
    summary: 'Explore des idées nouvelles et stimule la relation par la curiosité.',
  },
  partnerB: {
    number: 4,
    title: 'Architecte stable',
    summary: 'Ancre le duo avec structure et engagement durable.',
  },
  couple: {
    number: 11,
    archetype: 'Constellation lumineuse',
    dynamic: 'Une alchimie qui invite à rayonner autour de soi.',
  },
  score: 92,
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
