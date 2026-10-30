import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { getTool } from "@/lib/tools";
import { buildToolView } from "@/lib/tool-view.server";
import ToolPageShell from "@/components/ToolPageShell";

describe("ToolPageShell – central YMYL injection", () => {
  it("renders the finance banner for mortgage-calculator", () => {
    const view = buildToolView(getTool("mortgage-calculator")!, "en");
    render(
      <ToolPageShell view={view}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBe(1);
    expect(alerts[0]).toHaveTextContent(/not financial advice/i);
    expect(screen.getByRole("link", { name: /terms/i })).toBeInTheDocument();
  });

  it("renders the health banner for bmi-calculator (category override)", () => {
    const view = buildToolView(getTool("bmi-calculator")!, "en");
    render(
      <ToolPageShell view={view}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBe(1);
    expect(alerts[0]).toHaveTextContent(/not medical advice/i);
  });

  it("renders no banner for word-counter", () => {
    const view = buildToolView(getTool("word-counter")!, "en");
    render(
      <ToolPageShell view={view}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    expect(screen.queryByText(/not financial advice/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/not medical advice/i)).not.toBeInTheDocument();
  });

  it("renders exactly one banner (no doubles)", () => {
    const view = buildToolView(getTool("tip-calculator")!, "en");
    const { container } = render(
      <ToolPageShell view={view}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    const matches = container.textContent?.match(/for informational purposes only/gi) ?? [];
    expect(matches.length).toBe(1);
  });

  it("keeps a single h1 + labelled breadcrumb nav", () => {
    const view = buildToolView(getTool("qr-code-generator")!, "en");
    const { container } = render(
      <ToolPageShell view={view}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    expect(container.querySelectorAll("h1").length).toBe(1);
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toBeInTheDocument();
  });
});
