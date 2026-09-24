import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { siteConfig } from "@/lib/site";
import { getTool } from "@/lib/tools";
import { getPillarMeta, getRelatedPosts } from "@/lib/blog-registry";
import type { BlogPost } from "@/lib/blog";
import EmbeddedTool from "@/components/blog/EmbeddedTool";

function canonicalFor(post: BlogPost): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (post.kind === "pillar") return `${base}/blog/${post.pillar}`;
  return `${base}/blog/${post.pillar}/${post.slug}`;
}

export function blogMetadataFor(post: BlogPost) {
  const canonical = canonicalFor(post);
  const ogImage = `${siteConfig.url.replace(/\/$/, "")}/og/home`;
  let core = post.title;
  if (core.length > 55) {
    core = core.slice(0, 55).trimEnd();
    const lastSpace = core.lastIndexOf(" ");
    if (lastSpace > 35) core = core.slice(0, lastSpace);
  }
  const fullTitle = `${core} | Tool4SaaS`;
  return {
    title: fullTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "article" as const,
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: fullTitle,
      description: post.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${post.title} — ${siteConfig.name}` }],
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: [siteConfig.author],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullTitle,
      description: post.description,
      images: [ogImage],
    },
  };
}

export function BlogJsonLd({ post }: { post: BlogPost }) {
  const base = siteConfig.url.replace(/\/$/, "");
  const canonical = canonicalFor(post);
  const pillarMeta = getPillarMeta(post.pillar);
  const crumbs =
    post.kind === "pillar"
      ? [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: canonical },
        ]
      : [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
          { "@type": "ListItem", position: 3, name: pillarMeta?.title ?? post.pillar, item: `${base}/blog/${post.pillar}` },
          { "@type": "ListItem", position: 4, name: post.title, item: canonical },
        ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: post.title,
        description: post.description,
        url: canonical,
        image: `${base}/og/home`,
        inLanguage: "en",
        author: { "@type": "Organization", name: siteConfig.author, url: `${base}/author` },
        reviewer: { "@type": "Organization", name: siteConfig.author, url: `${base}/author` },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: base,
          logo: {
            "@type": "ImageObject",
            url: `${base}/icon-512.png`,
            width: 512,
            height: 512,
          },
        },
        datePublished: post.published,
        dateModified: post.updated,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        ...(post.keywords.length ? { keywords: post.keywords.join(", ") } : {}),
      },
      { "@type": "BreadcrumbList", itemListElement: crumbs },
      ...(post.faqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: post.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  const base = siteConfig.url.replace(/\/$/, "");
  void base;
  const pillarMeta = getPillarMeta(post.pillar);
  const related = getRelatedPosts(post, 4);
  const primaryTool = post.toolSlugs[0] ? getTool(post.toolSlugs[0]) : undefined;
  const secondaryTools = post.toolSlugs.slice(1).map((s) => getTool(s)).filter(Boolean);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <BlogJsonLd post={post} />
      <Breadcrumbs sx={{ mb: 2 }} aria-label="breadcrumb">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
        <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Blog</Link>
        {post.kind === "cluster" && pillarMeta && (
          <Link href={`/blog/${post.pillar}`} style={{ color: "inherit", textDecoration: "none" }}>
            {pillarMeta.title.length > 40 ? pillarMeta.shortLabel : pillarMeta.title}
          </Link>
        )}
        <Typography color="text.primary" component="span" sx={{ maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {post.title}
        </Typography>
      </Breadcrumbs>

      <Typography component="h1" variant="h1" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, mb: 2, textWrap: "balance" }}>
        {post.title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 760, fontSize: "1.1rem", lineHeight: 1.7 }}>
        {post.description}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", mb: 4 }}>
        <Typography variant="body2" color="text.secondary">
          By <Link href="/author" style={{ fontWeight: 600 }}>{siteConfig.author} Editorial Team</Link>
          {" · "}
          <time dateTime={post.published}>Published {post.published}</time>
          {" · Updated "}<time dateTime={post.updated}>{post.updated}</time>
          {" · "}{post.readingMinutes} min read
        </Typography>
      </Box>

      {/* Above-fold tool CTA */}
      {primaryTool && (
        <Box sx={{ p: 3, mb: 4, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper", display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, alignItems: { sm: "center" }, justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 0.5 }}>
              Try it now — {primaryTool.title}, free in your browser
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {primaryTool.short} · No signup · No watermark · Free forever.
            </Typography>
          </Box>
          <Link
            href={`/${primaryTool.slug}`}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 48, padding: "12px 24px", borderRadius: 12, background: "var(--brand-gradient, #1976d2)", color: "#fff", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Open {primaryTool.title} →
          </Link>
        </Box>
      )}

      {/* P0-2: working tool embedded in pillar guides (client-only, SSR stays lean) */}
      {post.kind === "pillar" && <EmbeddedTool pillar={post.pillar} />}

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "240px 1fr" }, gap: 4, alignItems: "start" }}>
        {/* TOC */}
        <Box component="nav" aria-label="Table of contents" sx={{ position: { md: "sticky" }, top: { md: 100 }, p: 2.5, border: "1px solid", borderColor: "divider", borderRadius: "12px", bgcolor: "background.paper", order: { xs: -1, md: 0 } }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            On this page
          </Typography>
          <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 0.5 }}>
            {post.toc.map((t) => (
              <Box component="li" key={t.id} sx={{ pl: t.level === 3 ? 2 : 0 }}>
                <Link href={`#${t.id}`} style={{ textDecoration: "none", fontSize: t.level === 3 ? "0.85rem" : "0.9rem", fontWeight: t.level === 2 ? 600 : 400, color: "inherit", display: "block", padding: "6px 0", lineHeight: 1.4 }}>
                  {t.text}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Body */}
        <Box color="text.primary">
          <article className="blog-body" dangerouslySetInnerHTML={{ __html: post.html }} />
          {secondaryTools.length > 0 && (
            <Box sx={{ mt: 4, p: 3, borderRadius: "12px", bgcolor: "action.hover", border: "1px solid", borderColor: "divider" }}>
              <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1 }}>
                Related free tools
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {secondaryTools.map((t) => (
                  <Link key={t!.slug} href={`/${t!.slug}`} style={{ display: "inline-flex", minHeight: 44, alignItems: "center", padding: "8px 16px", borderRadius: 999, border: "1px solid var(--mui-palette-divider)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600 }}>
                    {t!.title} →
                  </Link>
                ))}
              </Box>
            </Box>
          )}

          {post.faqs.length > 0 && (
            <Box component="section" sx={{ mt: 5 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" }, fontWeight: 800, mb: 2 }}>
                Frequently asked questions
              </Typography>
              {post.faqs.map((f, i) => (
                <Accordion key={i} elevation={0} sx={{ border: "1px solid", borderColor: "divider", "&:before": { display: "none" }, mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>{f.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{f.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}

          {primaryTool && (
            <Box sx={{ mt: 5, p: 4, borderRadius: "16px", textAlign: "center", border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
              <Typography variant="h2" sx={{ fontSize: "1.4rem", fontWeight: 800, mb: 1 }}>
                Done reading — open the {primaryTool.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {primaryTool.short} — free in your browser, no signup.
              </Typography>
              <Link href={`/${primaryTool.slug}`} style={{ display: "inline-flex", minHeight: 48, alignItems: "center", padding: "12px 28px", borderRadius: 12, background: "var(--brand-gradient, #1976d2)", color: "#fff", fontWeight: 700, textDecoration: "none" }}>
                Open {primaryTool.title} →
              </Link>
            </Box>
          )}
        </Box>
      </Box>

      {/* Sibling silo mesh */}
      <Box component="section" sx={{ mt: 6, pt: 4, borderTop: "1px solid", borderColor: "divider" }}>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", fontWeight: 800, mb: 2 }}>
          Keep reading in this guide
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
          {related.map((r) => (
            <Link
              key={`${r.pillar}/${r.slug}`}
              href={r.kind === "pillar" ? `/blog/${r.pillar}` : `/blog/${r.pillar}/${r.slug}`}
              style={{ textDecoration: "none", color: "inherit", display: "block", padding: 20, borderRadius: 12, border: "1px solid var(--mui-palette-divider)" }}
            >
              <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700, mb: 0.5, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {r.kind === "pillar" ? "Pillar guide" : "In this silo"}
              </Typography>
              <Typography variant="h3" sx={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.4 }}>
                {r.title}
              </Typography>
            </Link>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
