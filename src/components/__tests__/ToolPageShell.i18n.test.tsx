import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { getTool } from "@/lib/tools";
import { getEsTool, getFrTool } from "@/lib/i18n";
import ToolPageShell from "@/components/ToolPageShell";

// AdSlot is client-lazy + consent-gated; stub it so shell tests stay hermetic.
vi.mock("@/components/AdSlotLazy", () => ({
  default: () => null,
}));

// next/link without router context: render a plain anchor.
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: any) => (
    <a href={typeof href === "string" ? href : "#"} {...rest}>
      {children}
    </a>
  ),
}));

describe("ToolPageShell – pilot locale switcher + shell strings", () => {
  it("EN invoice shell links both ES and FR versions (N-locale registry)", () => {
    render(
      <ToolPageShell tool={getTool("invoice-generator")!}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    const esLink = screen.getByRole("link", { name: /versión en español/i });
    const frLink = screen.getByRole("link", { name: /version française/i });
    expect(esLink.getAttribute("href")).toBe("/es/invoice-generator");
    expect(frLink.getAttribute("href")).toBe("/fr/invoice-generator");
  });

  it("EN non-pilot shell shows no switcher (no 404 hreflang targets)", () => {
    render(
      <ToolPageShell tool={getTool("fd-calculator")!}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    expect(screen.queryByText(/Also available in/i)).not.toBeInTheDocument();
  });

  it("ES shell renders native strings + English switcher link", () => {
    render(
      <ToolPageShell tool={getEsTool("invoice-generator")!} locale="es">
        <div>tool ui</div>
      </ToolPageShell>
    );
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText(/Respuesta rápida/i)).toBeInTheDocument();
    expect(screen.getByText("Sobre el autor")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /English version/i }).getAttribute("href")
    ).toBe("/invoice-generator");
  });

  it("FR shell renders native strings + EN/ES switcher links", () => {
    render(
      <ToolPageShell tool={getFrTool("invoice-generator")!} locale="fr">
        <div>tool ui</div>
      </ToolPageShell>
    );
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText(/Réponse rapide/i)).toBeInTheDocument();
    expect(screen.getByText("À propos de l'auteur")).toBeInTheDocument();
    expect(screen.getByText("Questions fréquentes")).toBeInTheDocument();
    const enLink = screen.getByRole("link", { name: /version anglaise/i });
    const esLink = screen.getByRole("link", { name: /versión en español/i });
    expect(enLink.getAttribute("href")).toBe("/invoice-generator");
    expect(esLink.getAttribute("href")).toBe("/es/invoice-generator");
  });

  it("ES finance shell renders the localized YMYL banner (not financial advice → ES)", () => {
    render(
      <ToolPageShell tool={getEsTool("mortgage-calculator")!} locale="es">
        <div>tool ui</div>
      </ToolPageShell>
    );
    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBe(1);
    expect(alerts[0]).toHaveTextContent(/no es asesoramiento financiero/i);
    expect(alerts[0]).toHaveTextContent(/asesor financiero cualificado/i);
  });
});
