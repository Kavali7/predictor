import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import testimonials from "../../content/marketing/testimonials.json";
import { cn } from "../../lib/cn";

const autoplay: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let mouseOver = false;

  function clear() {
    if (timeout) clearTimeout(timeout);
  }

  function next() {
    if (!mouseOver) slider.next();
  }

  function set() {
    clear();
    timeout = setTimeout(next, 5000);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clear();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      set();
    });
    set();
  });
  slider.on("dragStarted", clear);
  slider.on("animationEnded", set);
  slider.on("updated", set);
};

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  highlight: string;
}

export default function TestimonialsSection() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1, spacing: 16 },
      breakpoints: {
        "(min-width: 768px)": { slides: { perView: 2, spacing: 20 } },
        "(min-width: 1280px)": { slides: { perView: 3, spacing: 24 } },
      },
      mode: "free-snap",
      renderMode: "precision",
    },
    [autoplay]
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Ils en parlent</p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Des duos conquis par l'expérience</h2>
          <p className="text-sm text-muted md:max-w-2xl">
            Chaque lecture nourrit les conversations, révèle des points d'harmonie et sème des étincelles à partager
            autour de soi.
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.24em] text-primary/70">Rotation automatique</p>
      </div>
      <div ref={sliderRef} className="keen-slider">
        {(testimonials as TestimonialItem[]).map((item) => (
          <article
            key={item.id}
            className="keen-slider__slide flex h-full flex-col gap-4 rounded-3xl bg-white/90 p-6 shadow-xl shadow-primary/5 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="h-14 w-14 rounded-full object-cover shadow-inner" />
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-muted">{item.role}</p>
              </div>
              <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                {item.highlight}
              </span>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-slate-700">“{item.quote}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}

