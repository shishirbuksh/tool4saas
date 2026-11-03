import type { IconName } from "./icons";
export type { IconName };
export { ICON_NAMES } from "./icons";

export type Category = {
  id: string;
  label: string;
  description: string;
};

export type GuideTable = {
  caption?: string;
  headers: string[];
  rows: (string | number)[][];
};

export type GuideSection = {
  heading: string;
  body: string;
  paragraphs?: string[];
  table?: GuideTable;
};

export type Tool = {
  slug: string;
  title: string;
  /** Optional 30-70 character meta title used when the catalogue title is long. */
  seoTitle?: string;
  short: string;
  description: string;
  icon: IconName;
  keywords: string[];
  category: Category["id"];
  faq: { question: string; answer: string }[];
  howTo: { name: string; text: string }[];
  // Rich guide: sections covering what it is, how it works, tables, worked example + limitations.
  // Optional so tools without guides still validate.
  guide?: GuideSection[];
};
