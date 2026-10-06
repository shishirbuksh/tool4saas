import { describe, it, expect } from "vitest";
import { getYMYLType } from "./ymyl";
import { tools } from "./tools";

describe("ymyl – central mapping", () => {
  it("covers finance + health categories", () => {
    expect(getYMYLType({ slug: "mortgage-calculator", category: "finance" })).toBe("finance");
    expect(getYMYLType({ slug: "calorie-calculator", category: "health" })).toBe("health");
  });

  it("covers the 10 calculators/business overrides", () => {
    const overrides: [string, "finance" | "health"][] = [
      ["bmi-calculator", "health"],
      ["tip-calculator", "finance"],
      ["loan-calculator", "finance"],
      ["discount-calculator", "finance"],
      ["gst-calculator", "finance"],
      ["percentage-calculator", "finance"],
      ["percentage-change", "finance"],
      ["percentage-difference", "finance"],
      ["us-sales-tax-calculator", "finance"],
      ["commission-calculator", "finance"],
    ];
    for (const [slug, type] of overrides) {
      const tool = tools.find((t) => t.slug === slug);
      expect(tool, slug).toBeDefined();
      expect(getYMYLType({ slug, category: tool!.category })).toBe(type);
    }
  });

  it("returns null for non-YMYL tools", () => {
    expect(getYMYLType({ slug: "word-counter", category: "text-documents" })).toBeNull();
    expect(getYMYLType({ slug: "qr-code-generator", category: "images-design" })).toBeNull();
  });

  it("every finance/health tool gets a banner (44 total with overrides)", () => {
    const covered = tools.filter((t) => getYMYLType(t) !== null);
    expect(covered.length).toBe(44);
  });
});
