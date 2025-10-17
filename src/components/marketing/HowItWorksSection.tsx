import steps from "../../content/marketing/how-it-works.json";

interface StepItem {
  step: number;
  title: string;
  description: string;
  icon: string;
}

const icons: Record<string, string> = {
  SparklesIcon: "✨",
  ChartBarIcon: "📊",
  PaperAirplaneIcon: "🕊️",
};

export default function HowItWorksSection() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">Parcours</p>
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Comment se déroule votre lecture</h2>
        <p className="text-sm text-muted md:max-w-2xl">
          En trois étapes fluides, explorez votre duo, décantez vos insights et partagez-les avec élégance.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {(steps as StepItem[]).map((step) => (
          <article key={step.step} className="rounded-3xl border border-secondary/20 bg-white/90 p-6 shadow-sm">
            <span className="text-2xl">{icons[step.icon] ?? "✨"}</span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Étape {step.step}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
