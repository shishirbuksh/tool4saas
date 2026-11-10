import { siteConfig } from "@/lib/site";
import { NOINDEX_SLUGS } from "@/lib/tools/noindex";
import { LITE_TOOLS, liteToolsByCategory } from "@/lib/tools/catalog-lite";
import { CATEGORIES } from "@/lib/tools/categories";
import { faqContentForCategory } from "@/lib/category-content";
import { HOME_GUIDES } from "@/content/home";
import { HOME_MODIFIED } from "@/lib/edit-dates.generated";
import { BLOG_PILLARS } from "@/lib/blog-pillars";

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
          availableLanguage: ["English"],
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

// Category JSON-LD: BreadcrumbList + CollectionPage + ItemList + FAQPage
export function categoryJsonLd(categoryId: string) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return null;
  const base = siteConfig.url.replace(/\/$/, "");
  const categoryUrl = `${base}/category/${categoryId}`;
  const visibleTools = LITE_TOOLS.filter((t) => t.category === categoryId && !NOINDEX_SLUGS.has(t.slug));
  const faqContent = faqContentForCategory(categoryId);
  const labelLower = category.label.toLowerCase();
  const categoryNoun = labelLower.endsWith("tools") ? labelLower : `${labelLower} tools`;
  const categoryFaqs = [
    {
      q: `What are the best free ${categoryNoun}?`,
      a: faqContent[0]?.text ?? "",
    },
    {
      q: `Are ${categoryNoun} on Tool4SaaS really free?`,
      a: faqContent[1]?.text ?? "",
    },
    {
      q: `Is my data safe when using ${categoryNoun}?`,
      a: faqContent[2]?.text ?? "",
    },
    {
      q: `How do I use ${categoryNoun} offline?`,
      a: faqContent[3]?.text ?? "",
    },
    {
      q: `Where do I get help for ${categoryNoun}?`,
      a: faqContent[4]?.text ?? "",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: category.label, item: categoryUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": categoryUrl,
        name: category.label,
        url: categoryUrl,
        description: category.description,
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
        author: { "@type": "Organization", name: siteConfig.authorRole, url: `${base}/author` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".faq-passage", ".category-answer-first"],
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: visibleTools.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: `${base}/${t.slug}`,
            name: t.title,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${categoryUrl}#faq`,
        mainEntity: categoryFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

// About page JSON-LD: AboutPage + BreadcrumbList
export function aboutJsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${base}/about`,
        name: `About ${siteConfig.name}`,
        url: `${base}/about`,
        description: `Meet the ${siteConfig.name} team, our local-first mission, testing rig and contact.`,
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "About", item: `${base}/about` },
        ],
      },
    ],
  };
}



// HTML Sitemap JSON-LD: CollectionPage + BreadcrumbList
export function sitemapJsonLd(totalTools: number, totalGuides: number) {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${base}/sitemap`,
        name: "HTML Sitemap — All Tools, Guides & Pages",
        url: `${base}/sitemap`,
        description: `Complete HTML sitemap directory of Tool4SaaS with ${totalTools} free online tools, ${totalGuides} guides.`,
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Sitemap", item: `${base}/sitemap` },
        ],
      },
    ],
  };
}

// Blog index JSON-LD: CollectionPage + ItemList + BreadcrumbList
export function blogIndexJsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${base}/blog`,
        name: "Tool4SaaS Blog",
        url: `${base}/blog`,
        description: "Pillar guides and tutorials for every free Tool4SaaS tool.",
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: BLOG_PILLARS.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: `${base}/blog/${p.pillar}`,
            name: p.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
        ],
      },
    ],
  };
}

// Author JSON-LD: ProfilePage + BreadcrumbList
export function authorJsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${base}/author`,
        url: `${base}/author`,
        mainEntity: {
          "@type": "Organization",
          name: siteConfig.author,
          url: base,
          member: [
            {
              "@type": "Person",
              name: `Tools Reviewer — ${siteConfig.authorRole}`,
              url: `${base}/author`,
              jobTitle: "Tools Reviewer",
              knowsAbout: ["Developer Tools", "Software Testing", "Web Browsers"],
              description:
                "Tests developer and productivity tools against known samples for correct output. Verifies every tool runs locally in the browser with no sign-up required. Re-checks pages in current Chrome, Edge, Firefox, and Safari.",
            },
            {
              "@type": "Person",
              name: `Finance Reviewer — ${siteConfig.authorRole}`,
              url: `${base}/author`,
              jobTitle: "Finance Reviewer",
              knowsAbout: ["Finance", "Interest Rates", "Tax Estimation"],
              description:
                "Reviews finance calculators using a documented methodology: cross-check formulas against public references and sample inputs. Flags estimates as estimates, never financial advice. Re-verifies tax and interest logic when rules change.",
            },
            {
              "@type": "Person",
              name: `Health Reviewer — ${siteConfig.authorRole}`,
              url: `${base}/author`,
              jobTitle: "Health Reviewer",
              knowsAbout: ["Health", "Body Mass Index", "Unit Conversion"],
              description:
                "Checks health calculators for sane ranges and clear disclaimers. Confirms results encourage consulting a professional where appropriate. Validates metric/imperial conversions against reference values.",
            },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Our Authors", item: `${base}/author` },
        ],
      },
    ],
  };
}

// Contact JSON-LD: ContactPage + BreadcrumbList
export function contactJsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${base}/contact`,
        name: "Contact Us",
        url: `${base}/contact`,
        description: `Questions, feedback, or bug reports? Contact the ${siteConfig.name} team.`,
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Contact Us", item: `${base}/contact` },
        ],
      },
    ],
  };
}

// Methodology JSON-LD: WebPage + BreadcrumbList
export function methodologyJsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}/methodology`,
        name: "How We Test Tools",
        url: `${base}/methodology`,
        description:
          "Testing methodology, verification fixtures, and verification changelog for all Tool4SaaS tools.",
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "How We Test Tools",
            item: `${base}/methodology`,
          },
        ],
      },
    ],
  };
}

// Privacy JSON-LD: WebPage + BreadcrumbList
export function privacyJsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}/privacy`,
        name: "Privacy Policy",
        url: `${base}/privacy`,
        description:
          "Privacy policy for Tool4SaaS: local-first processing, cookies, and data retention.",
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${base}/privacy` },
        ],
      },
    ],
  };
}

// Terms JSON-LD: WebPage + BreadcrumbList
export function termsJsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}/terms`,
        name: "Terms of Service",
        url: `${base}/terms`,
        description: "Terms of service and acceptable use disclaimers for Tool4SaaS.",
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Terms of Service", item: `${base}/terms` },
        ],
      },
    ],
  };
}



