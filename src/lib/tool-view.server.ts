import { getTool, getCategory, tools, NOINDEX_SLUGS } from "@/lib/tools";
import type { Tool } from "@/lib/tools/types";
import { getYMYLType } from "@/lib/ymyl";
import { getDateModifiedIso, getDatePublishedIso, formatIsoHuman } from "@/lib/dates";
import {
  getPilotLocales,
  isPilotSlug,
  LOCALE_LABEL,
  type Locale,
} from "@/lib/i18n-core";
import { GUIDES_BY_TOOL } from "@/lib/tool-guides";
import { siteConfig } from "@/lib/site";
import type { ToolView } from "@/lib/tool-view";

const SWITCHER_LEAD: Record<Locale, string> = {
  en: "Also available in: ",
  es: "También disponible en: ",
  fr: "Aussi disponible en : ",
};

function switcherLabel(viewLocale: Locale, target: Locale): string {
  if (target === "en") return viewLocale === "fr" ? "version anglaise" : "English version";
  return LOCALE_LABEL[target];
}

function switcherHref(toolSlug: string, target: Locale): string {
  return target === "en" ? `/${toolSlug}` : `/${target}/${toolSlug}`;
}

function validFaq(tool: Tool) {
  return Array.isArray(tool.faq)
    ? tool.faq.filter(
        (f) =>
          typeof f?.question === "string" &&
          f.question.trim().length > 0 &&
          typeof f?.answer === "string" &&
          f.answer.trim().length > 0,
      )
    : [];
}

function validHowTo(tool: Tool) {
  return Array.isArray(tool.howTo)
    ? tool.howTo.filter(
        (s) =>
          typeof s?.name === "string" &&
          s.name.trim().length > 0 &&
          typeof s?.text === "string" &&
          s.text.trim().length > 0,
      )
    : [];
}

// Everything a tool page needs, resolved once at build time. The returned
// object must stay JSON-serializable: it is both SSR input and the hydration
// payload embedded in #app-props.
export function buildToolView(tool: Tool, locale: Locale): ToolView {
  const cat = getCategory(tool.category);
  const seeAlso = tools
    .filter(
      (t) =>
        t.category === tool.category && t.slug !== tool.slug && !NOINDEX_SLUGS.has(t.slug),
    )
    .slice(0, 2)
    .map(({ slug, title, short }) => ({ slug, title, short }));

  const sameCat = tools.filter(
    (t) => t.category === tool.category && t.slug !== tool.slug && !NOINDEX_SLUGS.has(t.slug),
  );
  const crossCat = tools.filter(
    (t) => t.category !== tool.category && t.slug !== tool.slug && !NOINDEX_SLUGS.has(t.slug),
  );
  const relatedTools = [...sameCat, ...crossCat]
    .slice(0, 6)
    .map(({ slug, title, short }) => ({ slug, title, short }));

  const pilotLocales = isPilotSlug(tool.slug) ? getPilotLocales(tool.slug) : [];
  const localeLinks = (["en", ...pilotLocales] as Locale[])
    .filter((l) => l !== locale)
    .map((l) => ({
      locale: l,
      label: switcherLabel(locale, l),
      href: switcherHref(tool.slug, l),
    }));

  const dateModifiedIso = getDateModifiedIso(tool.slug);
  const guide = (tool as unknown as { guide?: unknown }).guide;
  const guideSections: unknown[] = Array.isArray(guide) ? guide : [];

  return {
    tool,
    locale,
    category: cat ? { id: cat.id, label: cat.label } : null,
    seeAlso,
    switcherLead: SWITCHER_LEAD[locale],
    localeLinks,
    dateModifiedIso,
    dateModifiedDisplay: formatIsoHuman(dateModifiedIso),
    ymylType: getYMYLType(tool),
    relatedTools,
    relatedToolsHeading: `More ${cat?.label ?? "tools"}`,
    guides: GUIDES_BY_TOOL[tool.slug] ?? [],
    validFaq: validFaq(tool),
    validHowTo: validHowTo(tool),
    guideSections,
  };
}

export function buildToolViewBySlug(slug: string, locale: Locale = "en"): ToolView {
  const tool = getTool(slug);
  if (!tool) throw new Error(`Unknown tool slug: ${slug}`);
  return buildToolView(tool, locale);
}

// JSON-LD graph for a tool page. Rendered into <head> by AppPage.astro instead
// of the body, so it does not need to be part of the hydration payload.
export function buildToolJsonLd(tool: Tool, locale: Locale) {
  const cat = getCategory(tool.category);
  const base = siteConfig.url.replace(/\/$/, "");
  const url = locale === "en" ? `${base}/${tool.slug}` : `${base}/${locale}/${tool.slug}`;
  const catUrl = cat ? `${base}/category/${cat.id}` : undefined;
  const datePublished = getDatePublishedIso(tool.slug);
  const dateModified = getDateModifiedIso(tool.slug);

  const faq = validFaq(tool);
  const howTo = validHowTo(tool);
  const homeUrl = locale === "en" ? base : `${base}/${locale}`;
  const crumbItems: { name: string; item: string | undefined }[] = [
    { name: locale === "es" ? "Inicio" : locale === "fr" ? "Accueil" : "Home", item: homeUrl },
    ...(cat ? [{ name: cat.label, item: catUrl }] : []),
    { name: tool.title, item: url },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name: tool.title,
        description: tool.description,
        url,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        ...(tool.keywords?.length >= 3 ? { featureList: tool.keywords } : {}),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        inLanguage: locale,
        author: { "@type": "Organization", name: siteConfig.authorRole, url: `${base}/author` },
        reviewer: { "@type": "Organization", name: siteConfig.authorRole, url: `${base}/author` },
        datePublished,
        dateModified,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: tool.title,
        description: tool.description,
        inLanguage: locale,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".speakable-answer-first", ".faq-passage", ".howto-passage", ".tldr-passage"],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbItems.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.item,
        })),
      },
      ...(faq.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.question.trim(),
                acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
              })),
            },
          ]
        : []),
      ...(howTo.length
        ? [
            {
              "@type": "HowTo",
              name:
                locale === "es"
                  ? `Cómo usar ${tool.title}`
                  : locale === "fr"
                    ? `Comment utiliser ${tool.title}`
                    : `How to use ${tool.title}`,
              totalTime: "PT3M",
              estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
              tool: [{ "@type": "HowToTool", name: tool.title }],
              step: howTo.map((s, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: s.name.trim(),
                text: s.text.trim(),
                url: `${url}#howto-step-${i + 1}`,
              })),
            },
          ]
        : []),
    ],
  };
}
