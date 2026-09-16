import { describe, it, expect } from "vitest";
import { tools, CATEGORIES, ICON_NAMES } from "./tools";

// Test-only hardening for the tools catalogue. No source imports beyond data.
const categoryIds = new Set(CATEGORIES.map((c) => c.id));
const iconNames = new Set<string>(ICON_NAMES as readonly string[]);
const wordCount = (s: string) => s.split(/\s+/).filter(Boolean).length;

describe("tools catalogue quality", () => {
  it("has unique slugs", () => {
    const slugs = tools.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every slug is kebab-case", () => {
    for (const t of tools) {
      expect(t.slug, `${t.slug} charset`).toMatch(/^[a-z0-9-]+$/);
      expect(t.slug.startsWith("-") || t.slug.endsWith("-"), `${t.slug} edges`).toBe(false);
      expect(t.slug.includes("--"), `${t.slug} double-hyphen`).toBe(false);
    }
  });

  it("every tool category is a valid CATEGORIES id", () => {
    for (const t of tools) {
      expect(categoryIds.has(t.category), `${t.slug} category ${t.category}`).toBe(true);
    }
  });

  it("every tool icon is a valid ICON_NAMES entry", () => {
    for (const t of tools) {
      expect(iconNames.has(t.icon), `${t.slug} icon ${t.icon}`).toBe(true);
    }
  });

  it("every tool has >=3 non-empty keywords", () => {
    for (const t of tools) {
      expect(t.keywords.length, `${t.slug} keywords`).toBeGreaterThanOrEqual(3);
      for (const k of t.keywords) {
        expect(k.trim().length, `${t.slug} empty keyword`).toBeGreaterThan(0);
      }
    }
  });

  it("every tool description is 100-180 chars (AdSense content depth)", () => {
    for (const t of tools) {
      expect(t.description.length, `${t.slug} len=${t.description.length}`).toBeGreaterThanOrEqual(100);
      expect(t.description.length, `${t.slug} len=${t.description.length}`).toBeLessThanOrEqual(180);
    }
  });

  it("every tool has >=3 FAQs and >=3 howTo steps", () => {
    const nonStandardHowTo: string[] = [];
    for (const t of tools) {
      expect(t.faq.length, `${t.slug} faq`).toBeGreaterThanOrEqual(3);
      expect(t.howTo.length, `${t.slug} howTo`).toBeGreaterThanOrEqual(3);
      if (t.howTo.length !== 4) nonStandardHowTo.push(`${t.slug} (howTo=${t.howTo.length})`);
    }
    // Canonical howTo shape is 4 steps; flag drift without failing (spec: assert >=3, warn otherwise).
    if (nonStandardHowTo.length > 0) console.warn(`[tools-quality] non-4-step howTo: ${nonStandardHowTo.join(", ")}`);
  });

  it("has no empty faq questions/answers or howTo names/texts", () => {
    for (const t of tools) {
      for (const [i, f] of t.faq.entries()) {
        expect(f.question.trim().length, `${t.slug} faq[${i}] question`).toBeGreaterThan(0);
        expect(f.answer.trim().length, `${t.slug} faq[${i}] answer`).toBeGreaterThan(0);
      }
      for (const [i, s] of t.howTo.entries()) {
        expect(s.name.trim().length, `${t.slug} howTo[${i}] name`).toBeGreaterThan(0);
        expect(s.text.trim().length, `${t.slug} howTo[${i}] text`).toBeGreaterThan(0);
      }
    }
  });

  it("YMYL (finance/health) FAQ answers average >15 words in aggregate, >10 per tool", () => {
    const ymyl = tools.filter((t) => t.category === "finance" || t.category === "health");
    expect(ymyl.length).toBeGreaterThan(0);
    const allWords: number[] = [];
    const belowTarget: string[] = [];
    for (const t of ymyl) {
      const counts = t.faq.map((f) => wordCount(f.answer));
      allWords.push(...counts);
      const avg = counts.reduce((a, b) => a + b, 0) / counts.length;
      // Hard floor per tool; 15-word editorial target reported as warning (backlog, non-failing).
      expect(avg, `${t.slug} avg FAQ words=${avg.toFixed(1)}`).toBeGreaterThan(10);
      if (avg <= 15) belowTarget.push(`${t.slug} (avg=${avg.toFixed(1)})`);
    }
    const globalAvg = allWords.reduce((a, b) => a + b, 0) / allWords.length;
    expect(globalAvg, `YMYL global avg FAQ words=${globalAvg.toFixed(2)}`).toBeGreaterThan(15);
    if (belowTarget.length > 0) {
      console.warn(`[tools-quality] YMYL tools below 15-word avg FAQ target: ${belowTarget.join(", ")}`);
    }
  });

  it("guide pilots exist (top-5) with 3 substantive sections each", () => {
    // Optional rich-guide pilot: { heading, body }[] with 3 sections
    // (What it is / How it works / Worked example + limitations).
    const withGuide = tools.filter((t) => Array.isArray(t.guide) && t.guide.length > 0);
    const slugs = new Set(withGuide.map((t) => t.slug));
    // Top-5 pilot guides must keep existing.
    for (const s of ["word-counter", "qr-code-generator", "json-formatter", "mortgage-calculator", "emi-calculator"]) {
      expect(slugs.has(s), `missing pilot guide: ${s}`).toBe(true);
    }
    for (const t of withGuide) {
      expect(t.guide!.length, `${t.slug} guide sections`).toBe(3);
      for (const [i, g] of t.guide!.entries()) {
        expect(g.heading.trim().length, `${t.slug} guide[${i}] heading`).toBeGreaterThan(0);
        expect(g.body.trim().length, `${t.slug} guide[${i}] body`).toBeGreaterThan(0);
        expect(wordCount(g.body), `${t.slug} guide[${i}] body words`).toBeGreaterThanOrEqual(20);
      }
    }
  });
});
