import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { getTool } from "@/lib/tools";
import { getEsTool, getFrTool } from "@/lib/i18n";
import { buildToolView } from "@/lib/tool-view.server";
import ToolPageShell from "@/components/ToolPageShell";

describe("ToolPageShell – pilot locale switcher + shell strings", () => {
  it("EN invoice shell links both ES and FR versions (N-locale registry)", () => {
    const view = buildToolView(getTool("invoice-generator")!, "en");
    render(
      <ToolPageShell view={view}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    const esLink = screen.getByRole("link", { name: /versión en español/i });
    const frLink = screen.getByRole("link", { name: /version française/i });
    expect(esLink.getAttribute("href")).toBe("/es/invoice-generator");
    expect(frLink.getAttribute("href")).toBe("/fr/invoice-generator");
  });

  it("EN non-pilot shell shows no switcher (no 404 hreflang targets)", () => {
    const view = buildToolView(getTool("fd-calculator")!, "en");
    render(
      <ToolPageShell view={view}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    expect(screen.queryByText(/Also available in/i)).not.toBeInTheDocument();
  });

  it("ES shell renders native strings + English switcher link", () => {
    const view = buildToolView(getEsTool("invoice-generator")!, "es");
    render(
      <ToolPageShell view={view}>
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
    const view = buildToolView(getFrTool("invoice-generator")!, "fr");
    render(
      <ToolPageShell view={view}>
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
    const view = buildToolView(getEsTool("mortgage-calculator")!, "es");
    render(
      <ToolPageShell view={view}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBe(1);
    expect(alerts[0]).toHaveTextContent(/no es asesoramiento financiero/i);
    expect(alerts[0]).toHaveTextContent(/asesor financiero cualificado/i);
  });
});
