import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";

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
      },
      {
        "@type": "Organization",
        "@id": `${base}#organization`,
        name: siteConfig.author,
        url: base,
        logo: { "@type": "ImageObject", url: `${base}/og/home`, width: 1200, height: 630 },
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

// Full tool index as ItemList — rendered on the homepage only, where the
// complete grid is visibly listed. Emitting it on every route duplicated
// ~15KB of JSON-LD per page and mismatched visible content.
export function HomeToolsItemList() {
  const base = siteConfig.url.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${base}#tools`,
    name: "All tools",
    numberOfItems: tools.length,
    itemListElement: tools.map((t, i) => ({
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
