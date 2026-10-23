import { describe, expect, it } from "vitest";
import { BLOG_PILLARS, getClustersForPillar } from "./blog-registry";
import { BLOG_POST_DATES } from "./edit-dates.generated";
import { getBlogPostDateModifiedIso, getBlogPostDatePublishedIso } from "./dates";

const iso = /^\d{4}-\d{2}-\d{2}$/;

describe("blog dates", () => {
  it("has a generated date entry for every registered pillar and cluster", () => {
    for (const pillar of BLOG_PILLARS) {
      expect(BLOG_POST_DATES[`${pillar.pillar}/${pillar.pillar}`], pillar.pillar).toBeDefined();
      for (const cluster of getClustersForPillar(pillar.pillar)) {
        const key = `${cluster.pillar}/${cluster.slug}`;
        expect(BLOG_POST_DATES[key], key).toBeDefined();
      }
    }
  });

  it("generated blog dates are valid ISO dates with published <= modified", () => {
    for (const [key, dates] of Object.entries(BLOG_POST_DATES)) {
      expect(dates.published, key).toMatch(iso);
      expect(dates.modified, key).toMatch(iso);
      expect(dates.published <= dates.modified, key).toBe(true);
    }
  });

  it("helpers return generated dates and a safe declared fallback", () => {
    const modified = getBlogPostDateModifiedIso(
      "percentage-calculator-guide",
      "percent-of-a-number",
      "2026-10-22"
    );
    const published = getBlogPostDatePublishedIso(
      "percentage-calculator-guide",
      "percent-of-a-number",
      "2026-10-22"
    );
    expect(modified).toMatch(iso);
    expect(published).toMatch(iso);
    expect(published <= modified).toBe(true);
    expect(getBlogPostDateModifiedIso("missing", "missing", "2026-10-22")).toBe("2026-10-22");
    expect(getBlogPostDatePublishedIso("missing", "missing", "2026-10-22")).toBe("2026-10-22");
  });
});
