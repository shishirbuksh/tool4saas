import { describe, it, expect } from "vitest";
import { tools, CATEGORIES, ICON_NAMES } from "./tools";

describe("tools validation", () => {
  it("has unique slugs", () => {
    const slugs = tools.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("has 123 tools (121-125 range)", () => {
    expect(tools.length).toBeGreaterThanOrEqual(121);
    expect(tools.length).toBeLessThanOrEqual(125);
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
