import Link from "@/lib/astro/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
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
    <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.15em", color: "primary.main" }}>
        GUIDE LIBRARY
      </Typography>
      <Typography component="h1" variant="h1" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, fontWeight: 800, mb: 2 }}>
        Every guide, one index
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 760, mb: 3, fontSize: "1.1rem", lineHeight: 1.7 }}>
        All {totalGuides} guides across {sections.length} topic silos, each one written around a single job: the pillar
        covers the broad workflow, and every tutorial solves one specific task. Find your silo below, or start at the{" "}
        <Link href="/blog">blog home</Link>.
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 6 }}>
        {sections.map((s) => (
          <a
            key={s.meta.pillar}
            href={`#${s.meta.pillar}`}
            style={{ display: "inline-flex", minHeight: 40, alignItems: "center", padding: "6px 14px", borderRadius: 999, border: "1px solid var(--mui-palette-divider)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}
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
              sx={{ p: 4, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper", height: "100%", scrollMarginTop: 96 }}
            >
              <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
                {s.clusters.length + (s.pillar ? 1 : 0)} GUIDES
              </Typography>
              <Typography component="h2" variant="h2" sx={{ fontSize: "1.4rem", fontWeight: 800, my: 1, lineHeight: 1.3 }}>
                <Link href={`/blog/${s.meta.pillar}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {s.meta.title}
                </Link>
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                {s.meta.description}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 3, color: "text.secondary" }}>
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
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                <Link href={`/blog/${s.meta.pillar}`} style={{ fontWeight: 700 }}>Read the pillar →</Link>
                <Link href={`/${s.meta.toolSlug}`} style={{ fontWeight: 600, color: "inherit" }}>Open the free tool →</Link>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, p: 3, borderRadius: "12px", bgcolor: "action.hover", border: "1px solid", borderColor: "divider" }}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          <strong>Stay current:</strong> new guides land in the <a href="/rss.xml" style={{ fontWeight: 600 }}>RSS feed</a> first.
          Every tutorial links back to its pillar and to the free tool it demonstrates.
        </Typography>
      </Box>
    </Container>
  );
}
