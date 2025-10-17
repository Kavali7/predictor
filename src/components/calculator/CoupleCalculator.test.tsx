import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CoupleCalculator from './CoupleCalculator';

describe('CoupleCalculator', () => {
  it('pré-remplit le formulaire et affiche un score par défaut', async () => {
    render(<CoupleCalculator />);

    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bob')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1990-07-15')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1992-03-02')).toBeInTheDocument();
    expect(
      await screen.findByText((content) => /Score\s+\d+\s*\/\s*100/i.test(content)),
    ).toBeInTheDocument();
  });

  it('désactive le bouton lorsque le formulaire est invalide', async () => {
    const user = userEvent.setup({ delay: null });
    render(<CoupleCalculator />);

    const [partner1FirstName] = screen.getAllByLabelText('Prénom');
    await user.clear(partner1FirstName);
    await user.type(partner1FirstName, 'A');
    await user.tab(); // trigger blur

    const submitButton = screen.getByRole('button', { name: /Comparer nos chiffres/i });
    expect(submitButton).toBeDisabled();
    expect(await screen.findByText(/Minimum 2 caractères/i)).toBeInTheDocument();
  });

  it('inverse correctement les partenaires', async () => {
    const user = userEvent.setup({ delay: null });
    render(<CoupleCalculator />);

    const swapButton = screen.getByRole('button', { name: /Inverser les partenaires/i });
    await user.click(swapButton);

    const partner1FirstName = await screen.findByDisplayValue('Bob');
    const partner2FirstName = await screen.findByDisplayValue('Alice');
    expect(partner1FirstName).toBeInTheDocument();
    expect(partner2FirstName).toBeInTheDocument();
  });
});
