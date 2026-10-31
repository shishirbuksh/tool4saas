import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { tools, CATEGORIES, ICON_NAMES, getTool } from "@/lib/tools";
import { buildToolViewBySlug, buildToolJsonLd } from "@/lib/tool-view.server";
import { getYMYLType } from "@/lib/ymyl";
import { ES_PILOT_SLUGS, FR_PILOT_SLUGS } from "@/lib/i18n-core";

const projectRoot = path.resolve(".");
const viewsToolsDir = path.join(projectRoot, "src/views/tools");
const componentsToolsDir = path.join(projectRoot, "src/components/tools");

describe("Comprehensive All-Tools & UI/UX Audit", () => {
  it("verifies 127 tools are registered with unique kebab-case slugs", () => {
    expect(tools.length).toBe(127);
    const slugs = new Set<string>();
    for (const t of tools) {
      expect(slugs.has(t.slug), `Duplicate slug: ${t.slug}`).toBe(false);
      slugs.add(t.slug);
      expect(t.slug).toMatch(/^[a-z0-9-]+$/);
      expect(t.slug.startsWith("-") || t.slug.endsWith("-")).toBe(false);
      expect(t.slug.includes("--")).toBe(false);
    }
  });

  it("verifies every tool has a valid matching view file in src/views/tools/", () => {
    for (const t of tools) {
      const viewFile = path.join(viewsToolsDir, `${t.slug}.tsx`);
      expect(fs.existsSync(viewFile), `Missing view file for tool: ${t.slug}`).toBe(true);

      const viewContent = fs.readFileSync(viewFile, "utf-8");
      // Must wrap in ToolPageShell
      expect(viewContent).toContain("ToolPageShell");
      
      // Extract imported tool component
      const match = viewContent.match(/from\s+["']@\/components\/tools\/([^"']+)["']/);
      expect(match, `Tool view ${t.slug} does not import from @/components/tools/`).toBeTruthy();
      if (match) {
        const compPath = path.join(componentsToolsDir, `${match[1]}.tsx`);
        expect(fs.existsSync(compPath), `Imported component ${match[1]}.tsx does not exist`).toBe(true);
      }
    }
  });

  it("verifies buildToolViewBySlug and buildToolJsonLd succeed for all 127 tools", () => {
    for (const t of tools) {
      const view = buildToolViewBySlug(t.slug, "en");
      expect(view).toBeDefined();
      expect(view.tool.slug).toBe(t.slug);
      expect(view.locale).toBe("en");
      expect(view.category).toBeDefined();
      expect(Array.isArray(view.relatedTools)).toBe(true);
      expect(Array.isArray(view.validFaq)).toBe(true);
      expect(view.validFaq.length).toBeGreaterThanOrEqual(3);
      expect(Array.isArray(view.validHowTo)).toBe(true);
      expect(view.validHowTo.length).toBeGreaterThanOrEqual(3);

      const jsonLd = buildToolJsonLd(t, "en") as Record<string, any>;
      const webApp = jsonLd["@graph"]?.find((item: any) => item["@type"] === "WebApplication");
      expect(webApp).toBeDefined();
      expect(webApp.name).toBe(t.title);
      expect(webApp.description).toBe(t.description);
      expect(webApp.applicationCategory).toBeDefined();
      expect(webApp.offers?.price).toBe("0");
    }
  });

  it("verifies international pilot tools (ES & FR) resolve properly in buildToolViewBySlug", () => {
    for (const slug of ES_PILOT_SLUGS) {
      const view = buildToolViewBySlug(slug, "es");
      expect(view.locale).toBe("es");
      expect(view.tool.slug).toBe(slug);
      expect(view.localeLinks.some((l) => l.locale === "en")).toBe(true);
    }

    for (const slug of FR_PILOT_SLUGS) {
      const view = buildToolViewBySlug(slug, "fr");
      expect(view.locale).toBe("fr");
      expect(view.tool.slug).toBe(slug);
      expect(view.localeLinks.some((l) => l.locale === "en")).toBe(true);
    }
  });

  it("verifies zero Material UI (@mui) or Next.js imports across all tool components", () => {
    const toolFiles = fs.readdirSync(componentsToolsDir).filter((f) => f.endsWith(".tsx"));
    for (const file of toolFiles) {
      const content = fs.readFileSync(path.join(componentsToolsDir, file), "utf-8");
      expect(content).not.toContain("@mui/");
      expect(content).not.toContain('from "next');
      expect(content).not.toContain("from 'next");
    }
  });

  it("verifies all finance and health tools have YMYL disclaimers configured", () => {
    const ymylCategories = new Set(["finance", "health"]);
    for (const t of tools) {
      const ymyl = getYMYLType(t);
      if (ymylCategories.has(t.category)) {
        expect(ymyl, `Tool ${t.slug} in ${t.category} should have YMYL disclaimer`).toBeDefined();
        expect(["finance", "health"]).toContain(ymyl);
      }
    }
  });

  it("verifies no dangerous hardcoded fixed desktop widths without responsive prefixes", () => {
    const toolFiles = fs.readdirSync(componentsToolsDir).filter((f) => f.endsWith(".tsx"));
    const issues: string[] = [];
    for (const file of toolFiles) {
      const content = fs.readFileSync(path.join(componentsToolsDir, file), "utf-8");
      // Find class patterns like className="... w-[700px] ..." without responsive prefix
      const matches = content.match(/(?:^|\s)["'`]([^"'`]*)\b(?:w|min-w)-\[(\d{3,4})px\]([^"'`]*)["'`]/g);
      if (matches) {
        for (const m of matches) {
          // Check if width > 400 and lacks sm:, md:, lg:, xl: prefix or max-w
          const numMatch = m.match(/(?:w|min-w)-\[(\d+)px\]/);
          if (numMatch && parseInt(numMatch[1], 10) > 420) {
            // Check if preceded by responsive prefix
            const hasPrefix = /(?:sm|md|lg|xl):(w|min-w)-\[\d+px\]/.test(m);
            if (!hasPrefix && !m.includes("max-w-") && !m.includes("overflow-x-auto")) {
              issues.push(`${file}: ${m.trim()}`);
            }
          }
        }
      }
    }
    // Report or verify
    expect(issues, `Unresponsive fixed desktop widths found:\n${issues.join("\n")}`).toEqual([]);
  });

  it("verifies no leftover legacy Material UI blue/purple color hexes or mui-palette variables", () => {
    const toolFiles = fs.readdirSync(componentsToolsDir).filter((f) => f.endsWith(".tsx"));
    const issues: string[] = [];
    for (const file of toolFiles) {
      const content = fs.readFileSync(path.join(componentsToolsDir, file), "utf-8");
      const matches = content.match(/#1976d2|#1565c0|#1e88e5|--mui-palette/gi);
      if (matches) {
        issues.push(`${file}: ${matches.join(", ")}`);
      }
    }
    expect(issues, `Legacy color hexes or mui vars found:\n${issues.join("\n")}`).toEqual([]);
  });

  it("verifies every category has >= 3 tools and valid metadata", () => {
    expect(CATEGORIES.length).toBe(12);
    for (const cat of CATEGORIES) {
      const catTools = tools.filter((t) => t.category === cat.id);
      expect(catTools.length, `Category ${cat.id} has too few tools (${catTools.length})`).toBeGreaterThanOrEqual(3);
    }
  });

  it("verifies FAQ questions end with question marks and howTo steps have substantive guidance", () => {
    for (const t of tools) {
      for (const [i, f] of t.faq.entries()) {
        expect(f.question.trim().endsWith("?"), `Tool ${t.slug} faq[${i}] question "${f.question}" must end with '?'`).toBe(true);
        expect(f.answer.trim().length, `Tool ${t.slug} faq[${i}] answer too short`).toBeGreaterThanOrEqual(25);
      }
      for (const [i, s] of t.howTo.entries()) {
        expect(s.name.trim().length, `Tool ${t.slug} howTo[${i}] name too short`).toBeGreaterThanOrEqual(3);
        expect(s.text.trim().length, `Tool ${t.slug} howTo[${i}] text too short`).toBeGreaterThanOrEqual(20);
      }
    }
  });
});
