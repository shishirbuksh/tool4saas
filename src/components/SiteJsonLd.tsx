import { siteConfig } from "@/lib/site";
import { NOINDEX_SLUGS } from "@/lib/tools";
import { liteToolsByCategory } from "@/lib/tools/catalog-lite";
import { HOME_LATEST_GUIDES, HOME_POPULAR_GUIDES } from "@/content/home";
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
      {
        "@type": "ContactPage",
        "@id": `${base}/contact#webpage`,
        url: `${base}/contact`,
        name: "Contact Us",
        isPartOf: { "@id": `${base}#website` },
        about: { "@id": `${base}#organization` },
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
    dateModified: "2026-10-20",
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

// Homepage ItemList — MUST match the SSR-visible grid (ToolExplorer renders 12
// cards of the "All" view in the initial HTML; the rest load via "Show more").
// Emitting all tools while only 12 are visible mismatches content, so list the
// first 12 in the same category order the explorer renders. Full crawl coverage
// lives in sitemap.xml.
export function HomeToolsItemList() {
  const base = siteConfig.url.replace(/\/$/, "");
  // Exclude NOINDEX_SLUGS (e.g. pdf-compress placeholder) so the ItemList
  // matches the sitemap + visible homepage grid; slice to SSR-visible 12.
  const visibleTools = liteToolsByCategory()
    .flatMap((g) => g.tools)
    .filter((t) => !NOINDEX_SLUGS.has(t.slug))
    .slice(0, 12);
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
// Rendered on / only. Pass `faqs` from page.tsx FAQS to keep a single source
// of truth; the inline default below is a fallback only. No AggregateRating/Review anywhere (spam risk).
export function HomeFaqJsonLd({ faqs: faqsProp }: { faqs?: { q: string; a: string }[] } = {}) {
  const fallback: { q: string; a: string }[] = [
    {
      q: "What is Tool4SaaS?",
      a: "Tool4SaaS is a free set of web utilities that run in your browser. You can count words, make codes, format text, and plan money with ease. Most jobs run on your device, so they are fast and private.",
    },
    {
      q: "Is Tool4SaaS free?",
      a: "Yes. Every tool is free to use with no cost and no paywall. You can open any tool, maker, or generator as often as you like each day.",
    },
    {
      q: "Do I need to sign up?",
      a: "No. You do not need an account or signup to use any tool. Just open the page and start your job right away. There are no forms or passwords.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. Most tools run local-first, so your text and files stay on your device. Only 4 tools need the internet for live facts: currency rates, YouTube thumbnails, SSL check, and voice input. See our privacy policy for details.",
    },
    {
      q: "Which popular tools should I try first?",
      a: "Top picks are invoice generator for client bills, QR code generator for menus and links, JSON formatter for code checks, word counter for essays, PDF merge for files, and mortgage calculator for home loans.",
    },
    {
      q: "How are tools tested?",
      a: "We build and test every tool in-house. We check outputs against known values, for example a $100,000 loan at 5 percent over 30 years equals $536.82 monthly. See our methodology page for the full process.",
    },
    {
      q: "How do I use tools offline?",
      a: "Open the tool once while online and keep the tab open. Most tools then work without internet because they run locally. Your files stay on your device always.",
    },
    {
      q: "How do I request a new tool?",
      a: "Send your idea through our contact page. Tell us the job to be done and what result you want to see. We review top requests each month and build free private tools first.",
    },
  ];
  const faqs = faqsProp ?? fallback;
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

// Recent + Popular posts ItemLists — homepage only, distinct @ids from #tools.
// Both mirrors are derived from the same content arrays the visible cards use,
// so the schema can never drift from the page.
export function HomeBlogItemList() {
  const base = siteConfig.url.replace(/\/$/, "");
  const recent = HOME_LATEST_GUIDES.map((g) => ({
    name: g.title,
    url: `${base}${g.href}`,
  }));
  const popular = HOME_POPULAR_GUIDES.map((g) => ({
    name: g.title,
    url: `${base}${g.href}`,
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": `${base}#recent-posts`,
        name: "Recent posts",
        numberOfItems: recent.length,
        itemListElement: recent.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: t.url,
          name: t.name,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${base}#popular-posts`,
        name: "Popular posts",
        numberOfItems: popular.length,
        itemListElement: popular.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: t.url,
          name: t.name,
        })),
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
