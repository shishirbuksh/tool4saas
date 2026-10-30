import { siteConfig } from "@/lib/site";
import { NOINDEX_SLUGS } from "@/lib/tools/noindex";
import { liteToolsByCategory } from "@/lib/tools/catalog-lite";
import { HOME_GUIDES } from "@/content/home";
import { HOME_MODIFIED } from "@/lib/edit-dates.generated";

// Site-wide WebSite + Organization graph. Rendered once per page by
// BaseLayout.astro (server-side only — the tool catalogue never ships to the
// browser just to emit JSON-LD).
export function siteJsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}#website`,
        name: siteConfig.name,
        url: base,
        description: siteConfig.description,
        inLanguage: "en",
        image: `${base}/og/home`,
        publisher: { "@id": `${base}#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${base}#organization`,
        name: siteConfig.author,
        url: base,
        logo: { "@type": "ImageObject", url: `${base}/icon-512.png`, width: 512, height: 512 },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.email,
          url: `${base}/contact`,
          availableLanguage: ["English", "Spanish", "French"],
        },
        ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
      },
    ],
  };
}

// Homepage-only graph: WebPage + all visible tools + FAQ + guide ItemLists.
// Mirrors the visible home page 1:1 so schema, sitemap and links agree.
export function homeJsonLd(faqs: { q: string; a: string }[]) {
  const base = siteConfig.url.replace(/\/$/, "");
  const visibleTools = liteToolsByCategory()
    .flatMap((g) => g.tools)
    .filter((t) => !NOINDEX_SLUGS.has(t.slug));

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${base}/#webpage`,
    url: `${base}/`,
    name: "Free online tools, right in your browser",
    description: siteConfig.description,
    isPartOf: { "@id": `${base}#website` },
    about: { "@id": `${base}#organization` },
    author: { "@type": "Organization", name: siteConfig.authorRole, url: `${base}/author` },
    inLanguage: "en",
    dateModified: HOME_MODIFIED,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable-hero-summary", ".speakable-faq-answer"],
    },
  };

  const toolsList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${base}#tools`,
    name: "All tools",
    numberOfItems: visibleTools.length,
    itemListElement: visibleTools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: `${base}/${t.slug}`,
      name: t.title,
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${base}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const guidesList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${base}#guides`,
    name: "Guides and tutorials",
    numberOfItems: HOME_GUIDES.length,
    itemListElement: HOME_GUIDES.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: `${base}${g.href}`,
      name: g.title,
    })),
  };

  return [webPage, toolsList, faqPage, guidesList];
}
