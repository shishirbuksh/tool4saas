// Single source for per-tool staggered dates (Sept 1-9 2026) from a
// deterministic slug hash (charCode sum % 9 + 1). Avoids a programmatic
// same-date freshness signal where every tool page shares an identical
// dateModified. Consumers: ToolSeo (JSON-LD), ToolPageShell (visible
// <time>), sitemap (lastmod). Keep all three in sync via these helpers.
export function getStaggeredDay(slug: string): number {
  let sum = 0;
  for (let i = 0; i < slug.length; i++) sum += slug.charCodeAt(i);
  return (sum % 9) + 1;
}

// Honest staggered dates: datePublished is the earliest staggered day
// (2026-09-01) and dateModified is this tool's deterministic staggered day
// (Sept 1-9), so modified >= published always holds without clamping and the
// JSON-LD date matches the visible <time> date.
export function getDateModifiedIso(slug: string): string {
  const day = getStaggeredDay(slug);
  return `2026-09-${String(day).padStart(2, "0")}`;
}

export const SITE_PUBLISHED_ISO = "2026-09-01";
