export const BRAND_SUFFIX = " | Tool4SaaS";
export const MIN_TITLE = 50;
export const MAX_TITLE = 60;

const TRAILING_STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "vs",
  "with",
]);

const BENEFIT_PADS = [
  " - Fast, Free & Private Browser Tool",
  " - Free Private Browser Utility",
  " - Free Online Browser Tool",
  " - Complete Guide & Tutorial",
  " - Step-by-Step Guide & Tips",
  " - Free Calculation Tool",
  " - Free Online Generator",
  " - Free Online Converter",
  " - Free Online Utility",
  " - Free Step-by-Step Guide",
  " - Free Online Tool",
  " - Complete Guide",
  " - Free Tool Online",
  " - Free Guide",
  " - Online Tool",
  " - Free Online",
  " - Free Tool",
  " - Free",
  " Online",
];

const DESC_BENEFIT_PADS = [
  " 100% free, private, and runs entirely in your browser.",
  " Free, private, and runs locally on your device.",
  " Fast, free, and runs securely in your browser.",
  " Free, local-first, and requires no registration.",
  " Fast, free, and runs privately on your device.",
  " Free, private, and requires no account signup.",
  " Free and runs securely in your browser.",
  " Free and runs privately on your device.",
  " Free, private, and requires no signup.",
  " Free, private, and works offline.",
  " Free, private, and no signup.",
  " Free and runs in your browser.",
  " Free, private, and offline.",
  " Free and works offline.",
  " Free, with no signup.",
  " Free and private.",
  " Free online.",
];

function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function trimTrailingPunctuation(text: string): string {
  return text.replace(/[\s,;:|—–\-&+]+$/g, "").trim();
}

function wordOf(text: string): string {
  return text.split(" ").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ?? "";
}

function isTrailingWordUnwanted(text: string): boolean {
  const last = text.split(" ").pop() ?? "";
  const cleaned = last.toLowerCase().replace(/[^a-z0-9]/g, "");
  return !cleaned || TRAILING_STOPWORDS.has(cleaned) || /^[\W_]+$/.test(last);
}

function cutAtClause(text: string, maxLength: number): string {
  let best = "";
  const boundary = /[?:;|—–]|\.(?=\s|$)|\s[-–—]\s/g;
  for (const match of text.matchAll(boundary)) {
    const end = (match.index ?? 0) + match[0].length;
    const candidate = trimTrailingPunctuation(text.slice(0, end));
    if (candidate.length <= maxLength && candidate.length > best.length) {
      best = candidate;
    }
  }
  return best;
}

/**
 * Standardizes a page title to 50-60 characters with primary keyword first and brand last.
 */
export function fitMetaTitle(primary: string, suffix: string = BRAND_SUFFIX): string {
  const title = normalize(primary);
  if (!title) return suffix.trim();

  const withSuffix = `${title}${suffix}`;
  if (withSuffix.length >= MIN_TITLE && withSuffix.length <= MAX_TITLE) {
    return withSuffix;
  }

  const maxCore = MAX_TITLE - suffix.length; // e.g. 48 chars

  // If too long, cut cleanly at clause or word boundaries
  if (withSuffix.length > MAX_TITLE) {
    const clause = cutAtClause(title, maxCore);
    if (clause && clause.length + suffix.length >= MIN_TITLE && clause.length + suffix.length <= MAX_TITLE) {
      return `${clause}${suffix}`;
    }

    const words = title.split(" ");
    let candidateWords = [...words];
    while (candidateWords.length > 1) {
      candidateWords.pop();
      let joined = candidateWords.join(" ");
      while (joined.length > 2 && isTrailingWordUnwanted(joined)) {
        candidateWords.pop();
        joined = candidateWords.join(" ");
      }
      joined = trimTrailingPunctuation(joined);
      const totalLen = joined.length + suffix.length;
      if (totalLen >= MIN_TITLE && totalLen <= MAX_TITLE) {
        return `${joined}${suffix}`;
      }
      if (totalLen < MIN_TITLE) {
        for (const pad of BENEFIT_PADS) {
          const padded = `${joined}${pad}${suffix}`;
          if (padded.length >= MIN_TITLE && padded.length <= MAX_TITLE) {
            return padded;
          }
        }
        break;
      }
    }
  }

  // If too short, add relevant benefit pad
  if (withSuffix.length < MIN_TITLE) {
    for (const pad of BENEFIT_PADS) {
      const candidate = `${title}${pad}${suffix}`;
      if (candidate.length >= MIN_TITLE && candidate.length <= MAX_TITLE) {
        return candidate;
      }
    }
  }

  return withSuffix;
}

/**
 * Normalizes meta description to 140-160 characters with clear user benefit.
 */
export function fitMetaDescription(desc: string): string {
  const text = normalize(desc);
  if (text.length >= 60 && text.length <= 160) return text;

  // If too long (> 160 chars), cut cleanly
  if (text.length > 160) {
    const candidate = text.slice(0, 160);
    const lastPunct = Math.max(candidate.lastIndexOf(". "), candidate.lastIndexOf("; "));
    if (lastPunct >= 135) {
      return candidate.slice(0, lastPunct + 1).trim();
    }
    const lastSpace = candidate.lastIndexOf(" ");
    if (lastSpace >= 135) {
      return candidate.slice(0, lastSpace).replace(/[\s,;:—–-]+$/, "").trim() + ".";
    }
    return candidate.slice(0, 157).trim() + "...";
  }

  // If extremely short (< 60 chars), append high-value benefit phrase
  for (const pad of DESC_BENEFIT_PADS) {
    const candidate = text.endsWith(".") ? `${text.slice(0, -1)}.${pad}` : `${text}.${pad}`;
    if (candidate.length >= 60 && candidate.length <= 160) {
      return candidate;
    }
  }

  return text;
}

/**
 * Blog titles: primary keyword first, brand last (50-60 chars).
 */
export function blogMetaTitle(title: string, seoTitle?: string): string {
  const preferred = normalize(seoTitle || title);
  return fitMetaTitle(preferred, BRAND_SUFFIX);
}

/**
 * Tool titles: primary keyword first, brand last (50-60 chars).
 */
export function toolMetaTitle(title: string, short: string, seoTitle?: string): string {
  const preferred = normalize(seoTitle || title);
  const candidates = [
    `${preferred} - ${normalize(short)}`,
    preferred,
  ];
  for (const cand of candidates) {
    const fitted = fitMetaTitle(cand, BRAND_SUFFIX);
    if (fitted.length >= MIN_TITLE && fitted.length <= MAX_TITLE) {
      return fitted;
    }
  }
  return fitMetaTitle(`${preferred} - ${normalize(short)}`, BRAND_SUFFIX);
}
