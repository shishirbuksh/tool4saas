export type BlogTocItem = { id: string; text: string; level: 2 | 3 };

export type BlogFaq = { question: string; answer: string };

export type BlogPost = {
  pillar: string;
  /** cluster slug; for pillar pages this equals pillar */
  slug: string;
  kind: "pillar" | "cluster";
  /** H1 — single per page, distinct from meta title */
  title: string;
  description: string;
  keywords: string[];
  /** money tool pages this post funnels to, e.g. ["invoice-generator"] */
  toolSlugs: string[];
  /** sibling cluster slugs for cross-link mesh */
  relatedSlugs: string[];
  published: string;
  updated: string;
  readingMinutes: number;
  toc: BlogTocItem[];
  /** Full SSR HTML body. Must use h2 id="...", h3, p, ul/ol, table, strong. No h1 inside. */
  html: string;
  faqs: BlogFaq[];
};

export type BlogPillarMeta = {
  pillar: string;
  title: string;
  /** Short crumb label, e.g. "Invoice Guide" */
  shortLabel: string;
  description: string;
  toolSlug: string;
  keywords: string[];
  updated: string;
};

export function countWords(html: string): number {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return 0;
  return text.split(" ").length;
}

export function readingMinutesFor(html: string): number {
  return Math.max(3, Math.round(countWords(html) / 200));
}
