import { useState } from 'react';

const NAV_ITEMS = [
  { href: '#hero', label: 'Accueil' },
  { href: '#simulations', label: 'Calculateur' },
  { href: '#resultats', label: 'Résultats' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a className="flex items-center gap-2 font-heading text-lg font-semibold text-primary" href="#hero">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            Aa
          </span>
          Aa Predictor
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} className="transition hover:text-primary" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#simulations"
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-lg hover:brightness-105"
          >
            Explorer
          </a>
        </div>
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((state) => !state)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-primary lg:hidden"
        >
          <span className="sr-only">Ouvrir la navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5M3.75 12h16.5M3.75 16.5h16.5" />
          </svg>
        </button>
      </div>
      <nav
        id="mobile-menu"
        className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} border-t border-slate-100 bg-white/95 px-6 py-4 text-sm font-medium text-slate-600`}
      >
        <ul className="space-y-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a className="block rounded-lg px-3 py-2 hover:bg-primary/10 hover:text-primary" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="mt-2 block rounded-full bg-primary px-4 py-2 text-center text-white shadow-sm hover:shadow-md"
              href="#simulations"
            >
              Lancer le calcul
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
