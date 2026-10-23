// Single API surface for REAL content dates, backed by
// src/lib/edit-dates.generated.ts (derived from git history by
// scripts/generate-edit-dates.mjs — run via `npm run validate` / build).
//
// Why per-data-file granularity is honest: tool pages ("word-counter" etc.)
// are rendered from src/lib/tools/data/<category>.ts, so the last real
// content edit for a tool's page text is the data file's last git commit.
// dateModified of tool pages used to come from a deterministic slug hash —
// a fabricated freshness signal — and every date now traces to a real
// commit. Consumers: ToolSeo (JSON-LD), ToolPageShell (visible <time>),
// sitemap (lastmod). Keep all three in sync via these helpers.
import {
  TOOL_DATES,
  PAGE_DATES,
  BLOG_POST_DATES,
  SITE_PUBLISHED,
} from "./edit-dates.generated";

// Composite-page dates are re-exported verbatim for sitemap consumers.
export {
  CATEGORY_MODIFIED,
  HOME_MODIFIED,
  BLOG_MODIFIED,
} from "./edit-dates.generated";

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

// Date the site's tool content first entered git (earliest data-file commit).
// datePublished of tool pages == site-wide first publish until per-tool
// publication data exists — never fabricate per-tool spreads.
export const SITE_PUBLISHED_ISO: string = SITE_PUBLISHED;

function isoFor(slug: string): string | undefined {
  const d = TOOL_DATES[slug];
  if (!d) return undefined;
  return ISO_RE.test(d.modified) ? d.modified : undefined;
}

// Real last-modified date for a tool page's content, from git. Falls back to
// SITE_PUBLISHED_ISO (never a fake delta) when the slug is unknown.
export function getDateModifiedIso(slug: string): string {
  return isoFor(slug) ?? SITE_PUBLISHED_ISO;
}

// Real first-published date for a tool page's content, from git.
export function getDatePublishedIso(slug: string): string {
  const d = TOOL_DATES[slug];
  if (!d || !ISO_RE.test(d.published) || d.published > getDateModifiedIso(slug)) {
    return SITE_PUBLISHED_ISO;
  }
  return d.published;
}

// Real last-modified date for a blog post by "<pillar>/<slug>". Falls back to
// the post's declared date (or site publish date) when git has no history,
// such as an uncommitted draft in local development.
export function getBlogPostDateModifiedIso(pillar: string, slug: string, fallback?: string): string {
  const d = BLOG_POST_DATES[`${pillar}/${slug}`];
  if (d && ISO_RE.test(d.modified)) return d.modified;
  return fallback && ISO_RE.test(fallback) ? fallback : SITE_PUBLISHED_ISO;
}

// Real first-published date for a blog post. Never returns a date after the
// last-modified date, which keeps JSON-LD and visible bylines consistent.
export function getBlogPostDatePublishedIso(pillar: string, slug: string, fallback?: string): string {
  const d = BLOG_POST_DATES[`${pillar}/${slug}`];
  const modified = getBlogPostDateModifiedIso(pillar, slug, fallback);
  if (d && ISO_RE.test(d.published) && d.published <= modified) return d.published;
  return fallback && ISO_RE.test(fallback) && fallback <= modified ? fallback : modified;
}

// Real last-modified date for a static page by key (about, privacy, ...).
export function getPageModifiedIso(key: string): string | undefined {
  const d = PAGE_DATES[key];
  if (!d) return undefined;
  return ISO_RE.test(d.modified) ? d.modified : undefined;
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// "2026-10-09" -> "October 9, 2026" for visible <time> display alongside
// dateTime={iso}. Shared by ToolPageShell and static pages so display and
// machine-readable dates can never drift apart.
export function formatIsoHuman(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  return `${MONTH_NAMES[m - 1]} ${d}, ${iso.slice(0, 4)}`;
}
