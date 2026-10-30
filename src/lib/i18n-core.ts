// Client-safe locale helpers. Import this module (not the full i18n barrel)
// from any component that can end up in a browser bundle: the barrel also
// carries every translated Tool/BlogPost body (~180KB of server-only copy).

// P1 pilot foundation (subdirectory, English slugs kept) — generalized for N locales.
// EN stays at root (/invoice-generator). Pilots live at /<locale>/<slug>.
// Full [locale]/ migration (dynamic <html lang>, per-locale sitemaps, translated
// slugs) is Phase 2; this file proves the hreflang + sitemap + native-keyword
// pattern on winners before multiplying 127xN.
export const LOCALES = ["en", "es", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
// Next locales plug in here (Phase 1 additive): extend LOCALES + add its Tool
// objects + pages + tests. Only FR has content so far (invoice pilot).
export const NON_DEFAULT_LOCALES: readonly Locale[] = ["es", "fr"];
// Locales with a translated hub landing (/es/, /fr/). Tool-only locales stay
// out so the sitemap never lists a hub page that does not exist.
export const HUB_LOCALES: readonly Locale[] = ["es", "fr"];

// Pilot slugs with a native ES alternate. Keep tiny on purpose:
// invoice-generator is GSC #2 (346 imp, 0.29% CTR), qr-code-generator covers
// the QR cluster (qr-size-print guide: 215 imp, 0 clicks), credit-card-validator
// is GSC #3 (262 imp), unit-converter is GSC #5 (205 imp),
// typing-speed-test is GSC #8 (150 imp), plagiarism-checker is GSC #9
// (136 imp), word-counter is the top hero (hero quick links + HERO_SLUGS 0.9),
// mortgage-calculator is the top finance hero (HERO_SLUGS 0.9, YMYL),
// resume-builder is the top business hero (HERO_SLUGS 0.9, pairs with invoice),
// password-generator is the top security hero (generators + password pillar),
// image-compressor is the top images hero (HERO_SLUGS 0.9, pairs with QR),
// pdf-merge is the top PDF hero (HERO_SLUGS 0.9),
// json-formatter is the top developer hero (developer pillar + json guide),
// sip-calculator is the top wealth hero (wealth pillar, YMYL),
// emi-calculator is the top loan hero (finance + loan funnel) —
// together the 15 pilots cover every GSC top-page tool URL plus top heroes.
export const ES_PILOT_SLUGS = new Set<string>([
  "invoice-generator",
  "qr-code-generator",
  "credit-card-validator",
  "unit-converter",
  "typing-speed-test",
  "plagiarism-checker",
  "word-counter",
  "mortgage-calculator",
  "resume-builder",
  "password-generator",
  "image-compressor",
  "pdf-merge",
  "json-formatter",
  "sip-calculator",
  "emi-calculator",
  "bmi-calculator",
]);

// French pilots: invoice-generator (highest-ROI tool), qr-code-generator
// (universal volume), unit-converter (everyday utility), word-counter (top
// hero), credit-card-validator (trust/safety), typing-speed-test (skill test),
// plagiarism-checker (integrity), mortgage-calculator (top finance hero, YMYL),
// bmi-calculator (health volume) —
// steady FR expansion toward full coverage, one proven tool at a time.
export const FR_PILOT_SLUGS = new Set<string>([
  "invoice-generator",
  "qr-code-generator",
  "unit-converter",
  "word-counter",
  "credit-card-validator",
  "typing-speed-test",
  "plagiarism-checker",
  "mortgage-calculator",
  "bmi-calculator",
  "image-compressor",
  "pdf-merge",
  "password-generator",
  "json-formatter",
  "resume-builder",
  "sip-calculator",
  "emi-calculator",
]);

// Generic N-locale pilot registry. New locales add their set here without
// touching metadata/sitemap/ToolPageShell.
const PILOT_SLUGS_BY_LOCALE: Record<string, Set<string>> = {
  es: ES_PILOT_SLUGS,
  fr: FR_PILOT_SLUGS,
};

export function pilotSlugsForLocale(locale: Locale): Set<string> {
  return PILOT_SLUGS_BY_LOCALE[locale] ?? new Set<string>();
}

export function getPilotLocales(slug: string): Locale[] {
  return (Object.keys(PILOT_SLUGS_BY_LOCALE) as Locale[]).filter((loc) =>
    PILOT_SLUGS_BY_LOCALE[loc]?.has(slug),
  );
}

export function isPilotSlug(slug: string): boolean {
  return getPilotLocales(slug).length > 0;
}

export function pilotUrl(locale: Locale, slug: string): string {
  return locale === DEFAULT_LOCALE ? `/${slug}` : `/${locale}/${slug}`;
}

// Hreflang alternates for a pilot slug. Single source producing a FULLY
// reciprocal set: EN + every locale that genuinely has a page for this slug
// + x-default -> EN. Replaces hand-maintained `languages: {...}` maps in
// locale pages that drifted (some FR pages shipped without the ES alternate,
// voiding the whole hreflang cluster for that URL).
export function hreflangLanguages(base: string, slug: string): Record<string, string> {
  const locales = [DEFAULT_LOCALE, ...getPilotLocales(slug)] as Locale[];
  const out: Record<string, string> = {};
  for (const loc of locales) out[loc] = `${base}${pilotUrl(loc, slug)}`;
  out["x-default"] = `${base}${pilotUrl(DEFAULT_LOCALE, slug)}`;
  return out;
}

// Hreflang alternates for locale hub pages (/es, /fr): EN hub + sibling
// hubs + x-default -> EN so the cluster stays mutual from every direction.
// URLs are emitted WITHOUT a trailing slash to match the canonical form
// (home canonical is `base`, hubs are `base/<locale>`), avoiding a canonical/
// hreflang mismatch that previously pointed at `base/`.
export function hreflangHubLanguages(base: string, locale: Locale): Record<string, string> {
  const out: Record<string, string> = { en: base, "x-default": base };
  for (const loc of NON_DEFAULT_LOCALES) if (HUB_LOCALES.includes(loc)) out[loc] = `${base}/${loc}`;
  // The page being rendered must be present in its own alternate set.
  if (!out[locale]) out[locale] = `${base}/${locale}`;
  return out;
}

// Human labels for the visible locale switcher (ToolPageShell).
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English version",
  es: "versión en español",
  fr: "version française",
};

// Endonym labels (the language's own name) for the navbar language menu.
export const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
};

// Open Graph locale codes (og:locale / og:locale:alternate use language_TERRITORY).
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
};

export function isEsPilotSlug(slug: string): boolean {
  return ES_PILOT_SLUGS.has(slug);
}

export const ES_BLOG_PILOTS = new Set<string>(["qr-code-generator-guide/qr-code-size-print-guide"]);

// Locales that publish ANY translated blog pilot. Sitemap + switcher route blog
// alternates through this list (not NON_DEFAULT_LOCALES) so a locale that has
// no blog content — FR today — never gets a /<locale>/blog/... URL that 404s.
export const BLOG_PILOT_LOCALES: readonly Locale[] = ["es"];

export function isEsBlogPilot(pillar: string, slug: string): boolean {
  return ES_BLOG_PILOTS.has(`${pillar}/${slug}`);
}

// True when `locale` publishes this exact blog cluster (translated alternate).
export function hasBlogPilot(locale: Locale, pillar: string, slug: string): boolean {
  return BLOG_PILOT_LOCALES.includes(locale) && isEsBlogPilot(pillar, slug);
}

// Navbar language switcher mapping. Given the current pathname and the target
// locale, return the best available equivalent URL:
//   - direct translation (tool slug in the target's pilot set, or a blog pilot
//     the target publishes) when it exists,
//   - otherwise the target locale's hub (/es, /fr),
//   - switching back to EN strips the locale prefix (EN is at the root).
// Pure function so the switcher stays a thin client component and the
// mapping is unit-testable.
export function switcherTarget(pathname: string, target: Locale): string {
  const p = pathname.replace(/\/+$/, "") || "/";
  const pilotSet = pilotSlugsForLocale(target);
  const m = p.match(/^\/(es|fr)(?:\/(.+))?$/);
  const cur = m ? (m[1] as Locale) : DEFAULT_LOCALE;
  if (cur === target) return p; // already on target
  if (target === DEFAULT_LOCALE) return m ? (m[2] ? `/${m[2]}` : "/") : p;
  // Target is a non-default locale: find a path below EN the target publishes.
  let rest: string | null = null;
  if (m) {
    // Currently in another non-default locale: carry the path only when the
    // target genuinely publishes the same tool. Blogs are locale-specific, so
    // any blog path falls through to the hub rather than a 404.
    const curRest = m[2] ?? null;
    if (curRest && !curRest.startsWith("blog/") && pilotSet.has(curRest)) rest = curRest;
  } else {
    const segs = p.split("/").filter(Boolean);
    if (segs[0] === "blog" && hasBlogPilot(target, segs[1] ?? "", segs[2] ?? "")) {
      rest = `blog/${segs[1]}/${segs[2]}`;
    } else if (segs[0] && pilotSet.has(segs[0])) {
      rest = segs[0];
    }
  }
  if (!rest) return `/${target}`;
  if (rest.startsWith("blog/")) return `/${target}/blog/${rest.split("/").slice(1).join("/")}`;
  return pilotSet.has(rest) ? `/${target}/${rest}` : `/${target}`;
}
