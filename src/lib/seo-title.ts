const BRAND_SUFFIX = " | Tool4SaaS";
const MIN_TITLE = 30;
const MAX_TITLE = 70;

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

function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function trimTrailingPunctuation(text: string): string {
  return text.replace(/[\s,;:|—–-]+$/g, "").trim();
}

function wordOf(text: string): string {
  return text.split(" ").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ?? "";
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

function cutAtWord(text: string, maxLength: number): string {
  let candidate = text.slice(0, maxLength);
  const lastSpace = candidate.lastIndexOf(" ");
  if (lastSpace > 20) candidate = candidate.slice(0, lastSpace);
  candidate = trimTrailingPunctuation(candidate);
  const words = candidate.split(" ");
  while (words.length > 2 && TRAILING_STOPWORDS.has(wordOf(words.join(" ")))) {
    words.pop();
  }
  return trimTrailingPunctuation(words.join(" "));
}

function fitTitle(primary: string, suffix: string, requireBrand: boolean): string {
  const title = normalize(primary);
  if (!title) return requireBrand ? suffix.trim() : "";

  const withSuffix = `${title}${suffix}`;
  if (withSuffix.length >= MIN_TITLE && withSuffix.length <= MAX_TITLE) {
    return withSuffix;
  }

  if (!requireBrand && title.length >= MIN_TITLE && title.length <= MAX_TITLE) {
    return title;
  }

  const maxCore = MAX_TITLE - suffix.length;
  const clause = cutAtClause(title, maxCore);
  if (clause && clause.length + suffix.length >= MIN_TITLE) {
    return `${clause}${suffix}`;
  }

  const wordCut = cutAtWord(title, maxCore);
  if (wordCut && wordCut.length + suffix.length >= MIN_TITLE) {
    return `${wordCut}${suffix}`;
  }

  if (!requireBrand) {
    const plainCut = cutAtWord(title, MAX_TITLE);
    if (plainCut.length >= MIN_TITLE) return plainCut;
  }

  const fallbackCore = cutAtWord(title, maxCore) || cutAtWord(title, MAX_TITLE - suffix.length);
  const fallback = `${fallbackCore}${suffix}`.trim();
  if (fallback.length >= MIN_TITLE) return fallback.slice(0, MAX_TITLE).trim();
  const padded = `${title} - Free Guide${suffix}`;
  if (padded.length >= MIN_TITLE && padded.length <= MAX_TITLE) return padded;
  return `${title}${suffix}`.slice(0, MAX_TITLE).trim();
}

/**
 * Blog titles may omit the brand suffix when the full title already fits the
 * 30-70 character budget. That preserves the complete phrase instead of
 * cutting a long question at an arbitrary word.
 */
export function blogMetaTitle(title: string, seoTitle?: string): string {
  const preferred = normalize(seoTitle || title);
  if (seoTitle) {
    const withSuffix = `${preferred}${BRAND_SUFFIX}`;
    if (withSuffix.length >= MIN_TITLE && withSuffix.length <= MAX_TITLE) {
      return withSuffix;
    }
    if (preferred.length >= MIN_TITLE && preferred.length <= MAX_TITLE) {
      return preferred;
    }
  }
  return fitTitle(preferred, BRAND_SUFFIX, false);
}

/**
 * Tool titles always keep the brand suffix so the existing site-wide
 * metadata contract stays intact. Prefer a clause boundary over a raw word
 * cut, then prefer the shorter "title + brand" form over a truncated
 * "title - short" phrase.
 */
export function toolMetaTitle(title: string, short: string, seoTitle?: string): string {
  const preferred = normalize(seoTitle || title);
  const candidates = [
    `${preferred} - ${normalize(short)}${BRAND_SUFFIX}`,
    `${preferred}${BRAND_SUFFIX}`,
    `${preferred} - Free Online Tool${BRAND_SUFFIX}`,
  ];
  for (const candidate of candidates) {
    if (candidate.length >= MIN_TITLE && candidate.length <= MAX_TITLE) return candidate;
  }
  return fitTitle(`${preferred} - ${normalize(short)}`, BRAND_SUFFIX, true);
}
