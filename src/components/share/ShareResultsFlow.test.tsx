import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ShareResultsFlow from "./ShareResultsFlow";

describe("ShareResultsFlow", () => {
  const props = {
    score: 92,
    archetype: "Constellation lumineuse",
    shareUrl: "https://aapredictor.com/demo",
    onTrack: vi.fn()
  };

  it("affiche les canaux de partage", () => {
    render(<ShareResultsFlow {...props} />);
    expect(screen.getByText(/Partager l’expérience/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /WhatsApp/i })).toBeInTheDocument();
  });

  it("copie le lien depuis la modale", async () => {
    const user = userEvent.setup();
    render(<ShareResultsFlow {...props} />);
    await user.click(screen.getByRole("button", { name: /Options avancées/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
