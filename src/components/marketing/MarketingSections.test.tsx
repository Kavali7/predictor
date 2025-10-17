import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("keen-slider/react", () => ({
  useKeenSlider: (_options: unknown, plugins: Array<(slider: any) => void> = []) => {
    const slider = {
      on: () => void 0,
      next: () => void 0,
      container: {
        addEventListener: () => void 0,
      },
    };
    plugins.forEach((plugin) => plugin(slider));
    return [() => void 0, slider];
  },
}));

import TestimonialsSection from "./TestimonialsSection";
import HowItWorksSection from "./HowItWorksSection";
import FaqSection from "./FaqSection";
import ResourceCards from "./ResourceCards";

describe("marketing sections", () => {
  it("renders testimonials carousel", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/Des duos conquis/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice & Paul/)).toBeInTheDocument();
  });

  it("renders how it works steps", () => {
    render(<HowItWorksSection />);
    expect(screen.getByText(/Découvrir/)).toBeInTheDocument();
    expect(screen.getByText(/Partager/)).toBeInTheDocument();
  });

  it("opens faq answers on disclosure", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);
    const button = screen.getByRole("button", { name: /Comment fonctionne/i });
    await user.click(button);
    expect(screen.getByText(/Nous combinons vos données/)).toBeInTheDocument();
  });

  it("lists resource cards", () => {
    render(<ResourceCards />);
    expect(screen.getByText(/Guide numérologie moderne/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Réserver ma place/ })).toBeInTheDocument();
  });
});
