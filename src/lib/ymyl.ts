// Single source of truth for YMYL disclaimer mapping.
// Rendered once in ToolPageShell (above the tool UI) — tools must NOT
// import YMYLDisclaimer directly (no manual imports; see adsense gates).
//
// Category mapping covers finance (24) + health (10) automatically.
// OVERRIDES covers the 10 tools in other categories (calculators/business)
// whose content is financial/medical advice (verified against data/*.ts).

export type YMYLType = "finance" | "health";

const OVERRIDES: Record<string, YMYLType> = {
  "bmi-calculator": "health",
  "tip-calculator": "finance",
  "loan-calculator": "finance",
  "discount-calculator": "finance",
  "gst-calculator": "finance",
  "percentage-calculator": "finance",
  "percentage-change": "finance",
  "percentage-difference": "finance",
  "us-sales-tax-calculator": "finance",
  "commission-calculator": "finance",
};

export function getYMYLType(tool: { slug: string; category: string }): YMYLType | null {
  if (tool.category === "finance") return "finance";
  if (tool.category === "health") return "health";
  return OVERRIDES[tool.slug] ?? null;
}
