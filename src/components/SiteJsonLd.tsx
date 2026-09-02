import { siteConfig } from "@/lib/site";
import { tools, toolsByCategoryCached } from "@/lib/tools";

export default function SiteJsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  // Use cached grouping to ensure O(1) map and cached category aggregation are wired
  const cachedTools = toolsByCategoryCached().flatMap((g) => g.tools);
  const listTools = cachedTools.length === tools.length ? cachedTools : tools;
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
        ...(tools.length
          ? {
              potentialAction: {
                "@type": "SearchAction",
                target: `${base}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }
          : {}),
      },
      {
        "@type": "Organization",
        "@id": `${base}#organization`,
        name: siteConfig.author,
        url: base,
        logo: { "@type": "ImageObject", url: `${base}/og/home`, width: 1200, height: 630 },
        ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
      },
      {
        "@type": "ItemList",
        "@id": `${base}#tools`,
        name: "All tools",
        itemListElement: listTools.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${base}/${t.slug}`,
          item: `${base}/${t.slug}`,
          name: t.title,
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
