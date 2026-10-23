import { describe, it, expect } from "vitest";
import { tools, CATEGORIES, ICON_NAMES, NOINDEX_SLUGS } from "./tools";
import { EXPECTED_TOOL_COUNT, VISIBLE_TOOL_COUNT } from "./tools/counts";
import { SEARCH_TOOLS } from "./tools/search-index.generated";

describe("tools validation", () => {
  it("has unique slugs", () => {
    const slugs = tools.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("matches generated registry counts", () => {
    expect(tools.length).toBe(EXPECTED_TOOL_COUNT);
    expect(VISIBLE_TOOL_COUNT).toBe(tools.length - NOINDEX_SLUGS.size);
  });
  it("search index contains every visible tool and no NOINDEX tool", () => {
    expect(SEARCH_TOOLS).toHaveLength(VISIBLE_TOOL_COUNT);
    expect(new Set(SEARCH_TOOLS.map((t) => t.slug)).size).toBe(VISIBLE_TOOL_COUNT);
    for (const slug of NOINDEX_SLUGS) {
      expect(SEARCH_TOOLS.some((t) => t.slug === slug), slug).toBe(false);
    }
  });
  it("every tool category is in CATEGORIES", () => {
    const cats = new Set(CATEGORIES.map((c) => c.id));
    for (const t of tools) {
      expect(cats.has(t.category), `${t.slug} category ${t.category}`).toBe(true);
    }
  });
  it("every icon is in ICON_NAMES", () => {
    const icons = new Set(ICON_NAMES);
    for (const t of tools) {
      expect(icons.has(t.icon), `${t.slug} icon ${t.icon}`).toBe(true);
    }
  });
  it("every slug is kebab-case and keywords non-empty", () => {
    for (const t of tools) {
      expect(t.slug).toMatch(/^[a-z0-9-]+$/);
      expect(t.keywords.length).toBeGreaterThanOrEqual(3);
      expect(t.description.length).toBeGreaterThan(30);
    }
  });
});
