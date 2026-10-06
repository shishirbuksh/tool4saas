import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import axe from "axe-core";
import { getTool } from "@/lib/tools";
import ToolPageShell from "@/components/ToolPageShell";

vi.mock("@/components/AdSlotLazy", () => ({
  default: () => null,
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: any) => (
    <a href={typeof href === "string" ? href : "#"} {...rest}>
      {children}
    </a>
  ),
}));

// jsdom has no layout engine: color-contrast is always "incomplete" there,
// so it is excluded here (covered manually in the a11y audit). Every other
// violation fails the test.
const EXCLUDED = ["color-contrast"];

describe("ToolPageShell – axe accessibility", () => {
  for (const slug of ["mortgage-calculator", "bmi-calculator", "word-counter"]) {
    it(`has no axe violations on ${slug}`, async () => {
      const { container } = render(
        <ToolPageShell tool={getTool(slug)!}>
          <div>tool ui</div>
        </ToolPageShell>
      );
      const result = await axe.run(container, {
        resultTypes: ["violations"],
      });
      const real = result.violations.filter((v) => !EXCLUDED.includes(v.id));
      expect(
        real.map((v) => `${v.id}: ${v.nodes.length} node(s)`),
        JSON.stringify(real.flatMap((v) => v.nodes.map((n) => n.html)), null, 2)
      ).toEqual([]);
    }, 30000);
  }
});
