import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import axe from "axe-core";
import { getTool } from "@/lib/tools";
import { buildToolView } from "@/lib/tool-view.server";
import ToolPageShell from "@/components/ToolPageShell";

const EXCLUDED = ["color-contrast"];

describe("ToolPageShell – axe accessibility", () => {
  for (const slug of ["mortgage-calculator", "bmi-calculator", "word-counter"]) {
    it(`has no axe violations on ${slug}`, async () => {
      const view = buildToolView(getTool(slug)!, "en");
      const { container } = render(
        <ToolPageShell view={view}>
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
