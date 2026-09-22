import type { Metadata } from "next";
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { siteConfig } from "@/lib/site";
import { staticPageMetadata } from "@/lib/metadata";
import { BLOG_PILLARS, getClustersForPillar, getPillarPost } from "@/lib/blog-registry";
import { countWords } from "@/lib/blog";

export const metadata: Metadata = staticPageMetadata({
  title: "Blog — Free Tool Guides & Tutorials",
  description:
    "Practical guides for every Tool4SaaS tool: invoice generators, PDF tools, calculators and more. Pillar guides + step-by-step tutorials with free templates.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const base = siteConfig.url.replace(/\/$/, "");
  const jsonLd = {
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
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.15em", color: "primary.main" }}>
        TOOL4SAAS BLOG
      </Typography>
      <Typography variant="h1" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, fontWeight: 800, mb: 2 }}>
        Guides that actually show the clicks
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 720, mb: 6, fontSize: "1.1rem", lineHeight: 1.7 }}>
        Every tool gets one <strong>pillar guide</strong> + <strong>8–10 hands-on tutorials</strong> in a silo.
        No fluff — we open the tool in Chrome, time it, and tell you where it breaks. Start with our first silo below.
      </Typography>
      <Grid container spacing={3}>
        {BLOG_PILLARS.map((p) => {
          const pillar = getPillarPost(p.pillar);
          const clusters = getClustersForPillar(p.pillar);
          const words = pillar ? countWords(pillar.html) : 0;
          return (
            <Grid size={{ xs: 12, md: 6 }} key={p.pillar}>
              <Box sx={{ p: 4, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper", height: "100%" }}>
                <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
                  PILLAR · {clusters.length} TUTORIALS · {words.toLocaleString()}+ WORDS
                </Typography>
                <Link href={`/blog/${p.pillar}`} style={{ textDecoration: "none" }}>
                  <Typography variant="h2" sx={{ fontSize: "1.5rem", fontWeight: 800, my: 1, lineHeight: 1.3 }}>
                    {p.title}
                  </Typography>
                </Link>
                <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                  {p.description}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 3, mb: 3, color: "text.secondary" }}>
                  {clusters.slice(0, 5).map((c) => (
                    <li key={c.slug} style={{ marginBottom: 4 }}>
                      <Link href={`/blog/${c.pillar}/${c.slug}`} style={{ fontWeight: 500 }}>{c.title}</Link>
                    </li>
                  ))}
                  {clusters.length > 5 && <li>…and {clusters.length - 5} more tutorials in the silo</li>}
                </Box>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Link href={`/blog/${p.pillar}`} style={{ fontWeight: 700 }}>Read the pillar guide →</Link>
                  <Link href={`/${p.toolSlug}`} style={{ fontWeight: 600, color: "inherit" }}>Open the free tool →</Link>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ mt: 6, p: 3, borderRadius: "12px", bgcolor: "action.hover", border: "1px solid", borderColor: "divider" }}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          <strong>How silos work here:</strong> the pillar ranks for the broad topic (e.g. free invoice generator guide),
          each tutorial ranks for one long-tail query (e.g. GST invoice format India), and all of them funnel to the free
          tool page. New silos (QR codes, resume, JSON formatter…) follow the same template — one pillar, 8–10 clusters, deep internal linking.
        </Typography>
      </Box>
    </Container>
  );
}
