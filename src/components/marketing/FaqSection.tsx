import { Disclosure } from "@headlessui/react";
import faqs from "../../content/marketing/faq.json";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Questions fréquentes</p>
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">FAQ pour vivre l'expérience sereinement</h2>
        <p className="text-sm text-muted md:max-w-2xl">
          Tous les détails pour profiter de la lecture, partager vos résultats et prolonger la magie avec votre duo.
        </p>
      </div>
      <div className="space-y-4">
        {(faqs as FaqItem[]).map((faq, index) => (
          <Disclosure key={faq.question}>
            {({ open }) => (
              <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 shadow-sm">
                <Disclosure.Button className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                  <span className="text-primary text-lg font-bold">{open ? "−" : "+"}</span>
                </Disclosure.Button>
                <Disclosure.Panel className="border-t border-slate-100 bg-white px-5 py-4 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  );
}
