import type { Tool } from "@/lib/tools/types";
import type { Locale } from "@/lib/i18n-core";
import type { YMYLType } from "@/lib/ymyl";

// Serializable view model for a tool page. Built on the server by
// src/lib/tool-view.server.ts and passed to the React view both as SSR props
// and (via #app-props) as hydration props. Keeping every registry lookup out
// of the components below means the 127-tool catalogue never ships to the
// browser just to render a page shell.
export type ToolLink = {
  slug: string;
  title: string;
  short: string;
};

export type ToolView = {
  tool: Tool;
  locale: Locale;
  category: { id: string; label: string } | null;
  seeAlso: ToolLink[];
  switcherLead: string;
  localeLinks: { locale: Locale; label: string; href: string }[];
  dateModifiedIso: string;
  dateModifiedDisplay: string;
  ymylType: YMYLType | null;
  relatedTools: ToolLink[];
  relatedToolsHeading: string;
  guides: { href: string; title: string }[];
  validFaq: { question: string; answer: string }[];
  validHowTo: { name: string; text: string }[];
  guideSections: unknown[];
};
