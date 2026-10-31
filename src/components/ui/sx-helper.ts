import type { CSSProperties } from "react";

/**
 * Lightweight helper to convert MUI sx objects/arrays into standard React style objects.
 * Handles common responsive objects ({ xs: 2, md: 4 }) by taking the desktop or base value,
 * and passes CSS properties directly to style.
 */
export function resolveSx(sx: any): CSSProperties {
  if (!sx) return {};
  if (Array.isArray(sx)) {
    return sx.reduce((acc, item) => Object.assign(acc, resolveSx(item)), {});
  }
  if (typeof sx !== "object") return {};

  const style: Record<string, any> = {};
  for (const [key, val] of Object.entries(sx)) {
    if (val === undefined || val === null) continue;
    if (key === "&:hover" || key.startsWith("&")) continue; // pseudo-classes handled via CSS/Tailwind

    // Responsive breakpoints { xs: ..., md: ... }
    if (typeof val === "object" && !Array.isArray(val)) {
      const resp = val as Record<string, any>;
      const picked = resp.lg ?? resp.md ?? resp.sm ?? resp.xs ?? Object.values(resp)[0];
      if (picked !== undefined) {
        style[key] = mapSxValue(key, picked);
      }
    } else {
      style[key] = mapSxValue(key, val);
    }
  }
  return style;
}

function mapSxValue(key: string, val: any): any {
  if (typeof val === "number") {
    // Spacing scale: p, m, gap, etc.
    if (["p", "padding", "m", "margin", "pt", "pb", "pl", "pr", "mt", "mb", "ml", "mr", "gap"].includes(key)) {
      return `${val * 8}px`;
    }
    // borderRadius multiplier
    if (key === "borderRadius" && val > 0 && val < 10) {
      return `${val * 4}px`;
    }
    return val;
  }
  if (typeof val === "string") {
    if (val === "background.default") return "var(--color-base-100, #FCFCF9)";
    if (val === "background.paper") return "var(--color-base-100, #FFFFFF)";
    if (val === "text.primary") return "currentColor";
    if (val === "text.secondary") return "var(--color-base-content, #666666)";
    if (val === "primary.main") return "var(--color-primary, #111111)";
    if (val === "divider") return "var(--color-base-200, rgba(0,0,0,0.08))";
  }
  return val;
}
