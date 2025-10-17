import resources from "../../content/marketing/resources.json";

interface ResourceItem {
  title: string;
  description: string;
  link: string;
  cta: string;
}

export default function ResourceCards() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Ressources</p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Prolongez l'illumination</h2>
          <p className="text-sm text-muted md:max-w-2xl">
            Guides premium, templates de partage et masterclass pour ancrer l'expérience au-delà du premier rapport.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {(resources as ResourceItem[]).map((resource) => (
          <article key={resource.title} className="flex h-full flex-col rounded-3xl border border-accent/20 bg-white/90 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
            <p className="mt-3 flex-1 text-sm text-slate-700">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:translate-x-1"
            >
              {resource.cta} →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
