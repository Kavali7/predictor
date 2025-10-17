const links = {
  decouvrir: [
    { label: 'Notre approche', href: '#hero' },
    { label: 'Calculateur de couple', href: '#simulations' },
    { label: 'Rapports détaillés', href: '#resultats' },
  ],
  support: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: 'mailto:contact@aapredictor.com' },
    { label: 'Mentions légales', href: '#mentions-legales' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
    { label: 'TikTok', href: 'https://www.tiktok.com' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-200 bg-surface/95">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              Aa
            </span>
            <div>
              <p className="font-heading text-lg font-semibold text-slate-900">Aa Predictor</p>
              <p className="text-sm text-muted">Vivez une expérience mystique moderne.</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Partages, compatibilité, rituels : tout pour mieux comprendre la dynamique de votre couple et diffuser
            l’expérience à vos proches.
          </p>
          <form className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Newsletter
              <span className="sr-only">Newsletter</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                required
                placeholder="Votre email"
                className="input-field rounded-full px-4 py-2 text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-lg hover:brightness-105"
              >
                Je m’inscris
              </button>
            </div>
          </form>
        </div>
        <FooterColumn title="Découvrir" items={links.decouvrir} />
        <FooterColumn title="Support" items={links.support} />
        <FooterColumn title="Social" items={links.social} />
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8 text-sm text-muted">
        <p className="rounded-xl border border-slate-200/70 bg-white/80 px-5 py-4 text-center text-xs leading-relaxed text-muted">
          Pratique de bien-être et d’exploration spirituelle : ne remplace pas un avis médical, psychologique ou
          financier. Faites preuve de discernement et échangez avec votre partenaire en conscience.
        </p>
      </div>
      <div className="border-t border-slate-200/70 bg-white/80 py-6 text-center text-xs text-muted">
        © {year} Aa Predictor · Conçu avec passion pour des relations inspirées.
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  items: Array<{ label: string; href: string }>;
}

function FooterColumn({ title, items }: FooterColumnProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <ul className="space-y-3 text-sm text-muted">
        {items.map((item) => (
          <li key={item.href}>
            <a className="transition hover:text-primary" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
