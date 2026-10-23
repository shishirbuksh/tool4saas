import { siteConfig } from "@/lib/site";
import { NOINDEX_SLUGS } from "@/lib/tools/noindex";
import { liteToolsByCategory } from "@/lib/tools/catalog-lite";
import { HOME_GUIDES } from "@/content/home";
import { HOME_MODIFIED } from "@/lib/edit-dates.generated";
import { LOCALES } from "@/lib/i18n";

// Site-wide WebSite entity. `inLanguage` is the PRIMARY language (English) and
// stays constant on every URL: the same `@id` must not report three different
// languages (that contradicted the entity graph). Translated pages declare
// their own language on their per-page WebPage/WebApplication/BlogPosting node
// and via hreflang; `availableLanguage` lists the whole site's locales.
export default function SiteJsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}#website`,
        name: siteConfig.name,
        url: base,
        description: siteConfig.description,
        inLanguage: "en",
        availableLanguage: [...LOCALES],
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
        },
        ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

// Homepage WebPage — rendered from src/app/page.tsx ONLY (not global).
// Previously emitted in SiteJsonLd on every URL alongside each page's own
// entity; now scoped to / so other routes emit only their own WebPage/
// CollectionPage/ProfilePage plus @id references to #website/#organization.
// Author is Organization (Tool4SaaS Editorial Team → /author) to match
// /author ProfilePage>Organization (no invented people).
export function HomeWebPageJsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  const jsonLd = {
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
    speakableSpecification: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable-hero-summary", ".speakable-faq-answer"],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

// Homepage ItemList — all 125 visible tools match the server-rendered directory
// 1:1. NOINDEX tools stay out so schema, sitemap and page links agree.
export function HomeToolsItemList() {
  const base = siteConfig.url.replace(/\/$/, "");
  const visibleTools = liteToolsByCategory()
    .flatMap((g) => g.tools)
    .filter((t) => !NOINDEX_SLUGS.has(t.slug));
  const jsonLd = {
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

// Homepage FAQ — must match visible FAQ copy 1:1 (no hidden answers).
// Rendered on / only. No AggregateRating/Review anywhere (spam risk).
export function HomeFaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url.replace(/\/$/, "")}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

// Guide ItemList — homepage only, distinct @id from #tools and derived from the
// same three cards the page renders.
export function HomeBlogItemList() {
  const base = siteConfig.url.replace(/\/$/, "");
  const guides = HOME_GUIDES.map((g) => ({
    name: g.title,
    url: `${base}${g.href}`,
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${base}#guides`,
    name: "Guides and tutorials",
    numberOfItems: guides.length,
    itemListElement: guides.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: t.url,
      name: t.name,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
