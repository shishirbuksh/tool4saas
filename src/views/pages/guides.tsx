import Link from "@/lib/astro/navigation";import { Container, Box, Typography, Grid } from "@/components/ds";

import { siteConfig } from "@/lib/site";
import { BLOG_PILLARS, getPillarPost, getClustersForPillar } from "@/lib/blog-registry";
import { isNoindexCluster } from "@/lib/blog/noindex";

export default function GuidesView() {
  const base = siteConfig.url.replace(/\/$/, "");
  const sections = BLOG_PILLARS.map((p) => {
    const pillar = getPillarPost(p.pillar);
    const clusters = getClustersForPillar(p.pillar).filter((c) => !isNoindexCluster(c.pillar, c.slug));
    return { meta: p, pillar, clusters };
  });
  const totalGuides = sections.reduce(
    (sum, s) => sum + s.clusters.length + (s.pillar ? 1 : 0),
    0
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${base}/guides`,
        name: "All Guides & Tutorials",
        url: `${base}/guides`,
        description:
          "Complete index of every Tool4SaaS pillar guide and tutorial, grouped by topic silo.",
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: sections.length,
          itemListElement: sections.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: `${base}/blog/${s.meta.pillar}`,
            name: s.meta.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
          { "@type": "ListItem", position: 3, name: "All Guides", item: `${base}/guides` },
        ],
      },
    ],
  };
  return (
    <Container maxWidth="xl" className="py-16 md:py-24 px-4 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Typography variant="overline" className="font-bold tracking-[0.15em] text-primary">
        GUIDE LIBRARY
      </Typography>
      <Typography component="h1" variant="h1" className="text-[2.2rem] md:text-[3rem] font-extrabold mb-4">
        Every guide, one index
      </Typography>
      <Typography color="text.secondary" className="max-w-[760px] mb-6 text-[1.1rem] leading-[1.7]">
        All {totalGuides} guides across {sections.length} topic silos, each one written around a single job: the pillar
        covers the broad workflow, and every tutorial solves one specific task. Find your silo below, or start at the{" "}
        <Link href="/blog">blog home</Link>.
      </Typography>

      <Box className="flex flex-wrap gap-2 mb-12">
        {sections.map((s) => (
          <a
            key={s.meta.pillar}
            href={`#${s.meta.pillar}`}
            className="inline-flex min-h-[38px] items-center px-3.5 py-1.5 rounded-full border border-base-300 text-sm font-semibold hover:border-base-content text-base-content no-underline transition-colors"
          >
            {s.meta.shortLabel}
          </a>
        ))}
      </Box>

      <Grid container spacing={3}>
        {sections.map((s) => (
          <Grid size={{ xs: 12, md: 6 }} key={s.meta.pillar}>
            <Box
              component="section"
              id={s.meta.pillar}
              className="p-8 rounded-xl border border-base-300 bg-base-100 h-full scroll-mt-[96px] hover:border-base-content/30 transition-colors"
            >
              <Typography variant="overline" color="primary" className="font-bold">
                {s.clusters.length + (s.pillar ? 1 : 0)} GUIDES
              </Typography>
              <Typography component="h2" variant="h2" className="text-[1.4rem] font-extrabold my-2 leading-[1.3]">
                <Link href={`/blog/${s.meta.pillar}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {s.meta.title}
                </Link>
              </Typography>
              <Typography color="text.secondary" className="mb-4 leading-[1.7]">
                {s.meta.description}
              </Typography>
              <Box component="ul" className="m-0 pl-6 text-base-content/70">
                {s.pillar && (
                  <li style={{ marginBottom: 6 }}>
                    <Link href={`/blog/${s.meta.pillar}`} style={{ fontWeight: 700 }}>
                      {s.pillar.title} (pillar guide)
                    </Link>
                  </li>
                )}
                {s.clusters.map((c) => (
                  <li key={c.slug} style={{ marginBottom: 6 }}>
                    <Link href={`/blog/${c.pillar}/${c.slug}`} style={{ fontWeight: 500 }}>{c.title}</Link>
                    <Typography component="span" variant="body2" color="text.secondary"> · {c.readingMinutes} min</Typography>
                  </li>
                ))}
              </Box>
              <Box className="flex gap-4 flex-wrap mt-4">
                <Link href={`/blog/${s.meta.pillar}`} style={{ fontWeight: 700 }}>Read the pillar →</Link>
                <Link href={`/${s.meta.toolSlug}`} style={{ fontWeight: 600, color: "inherit" }}>Open the free tool →</Link>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box className="mt-12 p-6 rounded-xl border border-base-300 bg-base-200/50">
        <Typography variant="body2" color="text.secondary" className="leading-[1.7]">
          <strong>Stay current:</strong> new guides land in the <a href="/rss.xml" style={{ fontWeight: 600 }}>RSS feed</a> first.
          Every tutorial links back to its pillar and to the free tool it demonstrates.
        </Typography>
      </Box>
    </Container>
  );
}
