import type { IconName } from "./icons";
export type { IconName };
export { ICON_NAMES } from "./icons";

export type Category = {
  id: string;
  label: string;
  description: string;
};

export type Tool = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: IconName;
  keywords: string[];
  category: Category["id"];
  faq: { question: string; answer: string }[];
  howTo: { name: string; text: string }[];
  // Optional rich guide pilot: 3 sections per tool (What it is / How it works / Worked example + limitations).
  // Optional so existing tools without guides still validate.
  guide?: { heading: string; body: string }[];
};
