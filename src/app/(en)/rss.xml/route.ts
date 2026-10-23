import { siteConfig } from "@/lib/site";
import { ALL_POSTS, getPillarMeta } from "@/lib/blog-registry";
import { isNoindexCluster } from "@/lib/blog/noindex";
import { getBlogPostDateModifiedIso, getBlogPostDatePublishedIso } from "@/lib/dates";

export const dynamic = "force-static";

// Newest 50 indexable posts, ordered by effective publish date (generated
// per-post dates) with last-modified as the tie-breaker. The same noindex
// filter used by the sitemap and blog listings keeps hidden clusters out.
const ITEM_LIMIT = 50;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = siteConfig.url.replace(/\/$/, "");
  const publishedFor = (pillar: string, slug: string, fallback: string) =>
    getBlogPostDatePublishedIso(pillar, slug, fallback);
  const modifiedFor = (pillar: string, slug: string, fallback: string) =>
    getBlogPostDateModifiedIso(pillar, slug, fallback);

  const items = ALL_POSTS.filter((post) => !isNoindexCluster(post.pillar, post.slug))
    .map((post) => {
      const published = publishedFor(post.pillar, post.slug, post.published);
      const modified = modifiedFor(post.pillar, post.slug, post.updated);
      const url =
        post.kind === "pillar"
          ? `${base}/blog/${post.pillar}`
          : `${base}/blog/${post.pillar}/${post.slug}`;
      return { post, url, published, modified };
    })
    .sort((a, b) => {
      if (a.published !== b.published) return a.published < b.published ? 1 : -1;
      if (a.modified !== b.modified) return a.modified < b.modified ? 1 : -1;
      return a.post.title.localeCompare(b.post.title);
    })
    .slice(0, ITEM_LIMIT);

  const lastBuildDate = items.reduce(
    (latest, item) => (item.modified > latest ? item.modified : latest),
    items[0]?.modified ?? new Date().toISOString().slice(0, 10)
  );

  const itemXml = items
    .map(
      ({ post, url, published, modified }) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(published).toUTCString()}</pubDate>
      <atom:updated>${new Date(modified).toISOString()}</atom:updated>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(getPillarMeta(post.pillar)?.title ?? post.pillar)}</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} Blog — Guides &amp; Tutorials</title>
    <link>${escapeXml(`${base}/blog`)}</link>
    <description>${escapeXml(
      "Step-by-step guides for every Tool4SaaS tool: invoices, PDFs, images, calculators, SEO and more. Tested workflows, no fluff."
    )}</description>
    <language>en</language>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(`${base}/rss.xml`)}" rel="self" type="application/rss+xml" />
${itemXml}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
