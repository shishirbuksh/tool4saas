import { describe, it, expect } from "vitest";
import {
  YMYL_GUIDE_SOURCES,
  getGuideCitationUrls,
  getGuideSources,
} from "@/lib/blog-sources";

const PILLARS = [
  "mortgage-calculator-guide",
  "sip-calculator-guide",
  "debt-payoff-guide",
  "bmi-calculator-guide",
];

describe("blog source registry", () => {
  it("covers all four YMYL pillars with at least three sources each", () => {
    for (const pillar of PILLARS) {
      expect(getGuideSources(pillar).length).toBeGreaterThanOrEqual(3);
    }
  });

  it("uses unique https URLs with labels", () => {
    const seen = new Set<string>();
    for (const sources of Object.values(YMYL_GUIDE_SOURCES)) {
      for (const source of sources) {
        expect(source.href).toMatch(/^https:\/\//);
        expect(source.label.trim().length).toBeGreaterThan(0);
        expect(seen.has(source.href)).toBe(false);
        seen.add(source.href);
      }
    }
  });

  it("returns an empty list for non-YMYL pillars", () => {
    expect(getGuideSources("pdf-merge-guide")).toEqual([]);
    expect(getGuideCitationUrls("pdf-merge-guide")).toEqual([]);
  });

  it("citation helper mirrors the visible source list", () => {
    for (const pillar of PILLARS) {
      expect(getGuideCitationUrls(pillar)).toEqual(getGuideSources(pillar).map((s) => s.href));
    }
  });
});
