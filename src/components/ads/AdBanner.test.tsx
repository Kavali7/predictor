import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdBanner from './AdBanner';
import type { AdItem } from './useRotatingBanner';

const MOCK_ADS: AdItem[] = [
  {
    id: 'ad-1',
    imageUrl: 'https://via.placeholder.com/970x250?text=Ad+1',
    alt: 'Annonce 1',
    link: 'https://example.com/ad-1',
    label: 'Offre spéciale',
  },
  {
    id: 'ad-2',
    imageUrl: 'https://via.placeholder.com/970x250?text=Ad+2',
    alt: 'Annonce 2',
    link: 'https://example.com/ad-2',
    label: 'Nouveauté',
  },
];

describe('AdBanner', () => {
  it('affiche un skeleton en mode chargement', () => {
    render(<AdBanner items={[]} isLoading />);
    expect(screen.getByTestId('ad-banner-skeleton')).toBeInTheDocument();
  });

  it('affiche un fallback si aucune annonce n est disponible', () => {
    render(<AdBanner items={[]} />);
    expect(screen.getByText(/Votre annonce pourrait être ici/i)).toBeInTheDocument();
  });

  it('affiche la première annonce et les indicateurs', () => {
    render(<AdBanner items={MOCK_ADS} intervalMs={10000} />);
    expect(screen.getByAltText('Annonce 1')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(2);
  });

  it('déclenche onAdClick lors du clic', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup({ delay: null });
    render(<AdBanner items={MOCK_ADS} onAdClick={handleClick} />);

    await user.click(screen.getByRole('link', { name: /Annonce 1/i }));
    expect(handleClick).toHaveBeenCalledWith(MOCK_ADS[0]);
  });

  it('permet de naviguer via les indicateurs', async () => {
    const user = userEvent.setup({ delay: null });
    render(<AdBanner items={MOCK_ADS} intervalMs={10000} />);

    const indicatorButtons = screen.getAllByRole('button', { name: /afficher l'annonce/i });
    await user.click(indicatorButtons[1]);
    expect(screen.getByAltText('Annonce 2')).toBeInTheDocument();
  });
});
