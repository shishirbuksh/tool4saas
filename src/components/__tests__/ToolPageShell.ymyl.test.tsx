import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { getTool } from "@/lib/tools";
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

describe("ToolPageShell – central YMYL injection", () => {
  it("renders the finance banner for mortgage-calculator", () => {
    render(
      <ToolPageShell tool={getTool("mortgage-calculator")!}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    // ToolSeo FAQ/guide copy also mentions adviceTerms — scope to role=alert.
    // (MUI Alert exposes an empty accessible name in jsdom, so match content.)
    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBe(1);
    expect(alerts[0]).toHaveTextContent(/not financial advice/i);
    expect(screen.getByRole("link", { name: /terms/i })).toBeInTheDocument();
  });

  it("renders the health banner for bmi-calculator (category override)", () => {
    render(
      <ToolPageShell tool={getTool("bmi-calculator")!}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBe(1);
    expect(alerts[0]).toHaveTextContent(/not medical advice/i);
  });

  it("renders no banner for word-counter", () => {
    render(
      <ToolPageShell tool={getTool("word-counter")!}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    expect(screen.queryByText(/not financial advice/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/not medical advice/i)).not.toBeInTheDocument();
  });

  it("renders exactly one banner (no doubles)", () => {
    const { container } = render(
      <ToolPageShell tool={getTool("tip-calculator")!}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    const matches = container.textContent?.match(/for informational purposes only/gi) ?? [];
    expect(matches.length).toBe(1);
  });

  it("keeps a single h1 + labelled breadcrumb nav", () => {
    const { container } = render(
      <ToolPageShell tool={getTool("qr-code-generator")!}>
        <div>tool ui</div>
      </ToolPageShell>
    );
    expect(container.querySelectorAll("h1").length).toBe(1);
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toBeInTheDocument();
  });
});
