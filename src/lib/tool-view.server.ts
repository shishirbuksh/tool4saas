import { getTool, getCategory, tools, NOINDEX_SLUGS } from "@/lib/tools";
import type { Tool } from "@/lib/tools/types";
import { getYMYLType } from "@/lib/ymyl";
import { getDateModifiedIso, getDatePublishedIso, formatIsoHuman } from "@/lib/dates";
import { GUIDES_BY_TOOL } from "@/lib/tool-guides";
import { siteConfig } from "@/lib/site";
import type { ToolView } from "@/lib/tool-view";

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
export function buildToolView(tool: Tool): ToolView {
  const cat = getCategory(tool.category);
  const validSameCat = tools.filter(
    (t) => t.category === tool.category && !NOINDEX_SLUGS.has(t.slug),
  );
  const toolIdx = validSameCat.findIndex((t) => t.slug === tool.slug);
  const rotatedSameCat: Tool[] = [];
  if (toolIdx >= 0 && validSameCat.length > 1) {
    for (let i = 1; i < validSameCat.length; i++) {
      const candidate = validSameCat[(toolIdx + i) % validSameCat.length];
      if (candidate.slug !== tool.slug) {
        rotatedSameCat.push(candidate);
      }
    }
  } else {
    rotatedSameCat.push(...validSameCat.filter((t) => t.slug !== tool.slug));
  }

  const seeAlso = rotatedSameCat
    .slice(0, 2)
    .map(({ slug, title, short }) => ({ slug, title, short }));

  const crossCat = tools.filter(
    (t) => t.category !== tool.category && t.slug !== tool.slug && !NOINDEX_SLUGS.has(t.slug),
  );
  const relatedTools = [...rotatedSameCat, ...crossCat]
    .slice(0, 6)
    .map(({ slug, title, short }) => ({ slug, title, short }));

  const dateModifiedIso = getDateModifiedIso(tool.slug);
  const guide = (tool as unknown as { guide?: unknown }).guide;
  const guideSections: unknown[] = Array.isArray(guide) ? guide : [];

  return {
    tool,
    category: cat ? { id: cat.id, label: cat.label } : null,
    seeAlso,
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

export function buildToolViewBySlug(slug: string): ToolView {
  const tool = getTool(slug);
  if (!tool) throw new Error(`Unknown tool slug: ${slug}`);
  return buildToolView(tool);
}

const CATEGORY_APPLICATION_MAP: Record<string, string> = {
  business: "BusinessApplication",
  developer: "DeveloperApplication",
  finance: "FinanceApplication",
  health: "HealthApplication",
  "images-design": "DesignApplication",
  calculators: "UtilitiesApplication",
  converters: "UtilitiesApplication",
  generators: "UtilitiesApplication",
  pdf: "UtilitiesApplication",
  "text-documents": "UtilitiesApplication",
  seo: "UtilitiesApplication",
  time: "UtilitiesApplication",
};

// JSON-LD graph for a tool page. Rendered into <head> by AppPage.astro instead
// of the body, so it does not need to be part of the hydration payload.
export function buildToolJsonLd(tool: Tool) {
  const cat = getCategory(tool.category);
  const base = siteConfig.url.replace(/\/$/, "");
  const url = `${base}/${tool.slug}`;
  const catUrl = cat ? `${base}/category/${cat.id}` : undefined;
  const datePublished = getDatePublishedIso(tool.slug);
  const dateModified = getDateModifiedIso(tool.slug);

  const faq = validFaq(tool);
  const crumbItems: { name: string; item: string | undefined }[] = [
    { name: "Home", item: base },
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
        applicationCategory: CATEGORY_APPLICATION_MAP[tool.category] || "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        ...(tool.keywords?.length >= 3 ? { featureList: tool.keywords } : {}),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        inLanguage: "en",
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
        inLanguage: "en",
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
    ],
  };
}
