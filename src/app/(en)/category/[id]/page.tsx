import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import ToolCard from "@/components/ToolCard";
import { CATEGORIES, getCategory, toolsByCategoryCached, NOINDEX_SLUGS } from "@/lib/tools";
import { introForCategory, faqContentForCategory, seoTitleForCategory } from "@/lib/category-content";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) return {};
  const base = siteConfig.url.replace(/\/$/, "");
  const canonical = `${base}/category/${id}`;
  const ogImage = `${base}/og/category-${id}`;
  // Enriched core (~40ch) instead of bare label (21-30ch rendered) — hub
  // pages carry priority 0.7 above 185 tool links and need keyword signal.
  const seoTitle = seoTitleForCategory(id, category.label);
  return {
    title: seoTitle,
    description: category.description,
    alternates: { canonical, languages: { en: canonical, "x-default": canonical } },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    // Full object: Metadata merges shallowly — a partial openGraph here
    // would drop the parent type/locale/siteName/images.
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: `${seoTitle} — ${siteConfig.name}`,
      description: category.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${seoTitle} — ${siteConfig.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${seoTitle} — ${siteConfig.name}`,
      description: category.description,
      images: [ogImage],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) notFound();

  const allGroups = toolsByCategoryCached();
  const group = allGroups.find((g) => g.category.id === id)!;
  const base = siteConfig.url.replace(/\/$/, "");
  const categoryUrl = `${base}/category/${id}`;
  // Keep sitemap exclusion consistent: NOINDEX_SLUGS (single source in @/lib/tools)
  // are hidden from the ItemList and the ToolCard grid, but the category page
  // itself stays indexable + followable and still links to all categories below.
  const visibleTools = group.tools.filter((t) => !NOINDEX_SLUGS.has(t.slug));
  // Per-category FAQ bodies live in @/lib/category-content (single source).
  const faqContent = faqContentForCategory(id);
  // 5Q category FAQ (answer-first 40-60w each) — visible below + FAQPage 1:1.
  const categoryFaqs = [
    {
      q: `What are ${category.label}?`,
      a: faqContent[0].text,
      link: { slug: faqContent[0].linkSlug, label: faqContent[0].linkLabel },
    },
    {
      q: `Which ${category.label.toLowerCase()} tools should I try first?`,
      a: faqContent[1].text,
      link: { slug: faqContent[1].linkSlug, label: faqContent[1].linkLabel },
    },
    {
      q: `Are ${category.label.toLowerCase()} tools free and private?`,
      a: faqContent[2].text,
      link: { slug: faqContent[2].linkSlug, label: faqContent[2].linkLabel },
    },
    {
      q: `How do I use ${category.label.toLowerCase()} tools offline?`,
      a: faqContent[3].text,
      link: { slug: faqContent[3].linkSlug, label: faqContent[3].linkLabel },
    },
    {
      q: `Where do I get help for ${category.label.toLowerCase()}?`,
      a: faqContent[4].text,
      link: { slug: faqContent[4].linkSlug, label: faqContent[4].linkLabel },
    },
  ];
  const jsonLd = {
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

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, overflowX: "clip" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Breadcrumbs sx={{ mb: 2 }} aria-label="breadcrumb">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          Home
        </Link>
        <Typography color="text.primary">{category.label}</Typography>
      </Breadcrumbs>
      <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, mb: 1 }}>
        {category.label}
      </Typography>
      {(() => {
        const intro = introForCategory(id);
        return (
          <Box sx={{ mb: 4, maxWidth: 760 }}>
            <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
              {intro.body}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Popular in {category.label}:{" "}
              {intro.picks.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 && " · "}
                  <Link href={`/${p.slug}`}>{p.label}</Link>
                </span>
              ))}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Questions? Each tool page has an FAQ — start with the{" "}
              <Link href={`/${intro.faqSlug}`}>{intro.faqLabel}</Link>. See also our{" "}
              <Link href="/methodology">testing methodology</Link>.
            </Typography>
          </Box>
        );
      })()}
      <Grid container spacing={3}>
        {visibleTools.map((tool) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.slug}>
            <ToolCard tool={tool} />
          </Grid>
        ))}
      </Grid>
      {/* Category FAQ — 5Q answer-first passages, visible + FAQPage 1:1 */}
      <Box
        component="section"
        aria-label={`Frequently asked questions about ${category.label}`}
        sx={{ mt: 6, maxWidth: 800 }}
      >
        <Typography variant="h2" sx={{ fontSize: 22, fontWeight: 800, mb: 1 }}>
          Frequently asked questions about {category.label}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Reviewed by the Tool4SaaS Editorial Team · <Link href="/author">Authors</Link> ·{" "}
          <Link href="/methodology">How we test</Link>
        </Typography>
        {categoryFaqs.map((f) => {
          // Visible textContent stays identical to JSON-LD `text` (f.a); only markup adds one related-tool link.
          const link = (f as { link?: { slug: string; label: string } }).link;
          const parts = link && f.a.includes(link.label) ? f.a.split(link.label) : null;
          return (
            <Box
              key={f.q}
              component="details"
              sx={{
                mb: 2,
                p: 2.5,
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Typography
                component="summary"
                variant="h3"
                sx={{ fontSize: "1.05rem", fontWeight: 700, cursor: "pointer" }}
              >
                {f.q}
              </Typography>
              <Typography color="text.secondary" className="faq-passage speakable-answer-first" sx={{ lineHeight: 1.7, mt: 1 }}>
                {parts ? (
                  <>
                    {parts.map((part, idx) => (
                      <span key={idx}>
                        {part}
                        {idx < parts.length - 1 && <Link href={`/${link!.slug}`}>{link!.label}</Link>}
                      </span>
                    ))}
                  </>
                ) : (
                  f.a
                )}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h2" sx={{ fontSize: 20, mb: 2 }}>
          Browse all categories
        </Typography>
        <Grid container spacing={3}>
          {allGroups.map((g) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={g.category.id}>
              <Link
                href={`/category/${g.category.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    display: "block",
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: "16px",
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(34,29,29,0.05)",
                    contentVisibility: "auto",
                    containIntrinsicSize: "0 180px",
                    transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms cubic-bezier(0.16,1,0.3,1)",
                    "&:hover": {
                      transform: "translateY(-2px) scale(1.01)",
                      borderColor: "rgba(0,0,0,0.12)",
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 12px 32px rgba(34,29,29,0.08), 0 4px 12px rgba(34,29,29,0.05)",
                    },
                    "&:active": { transform: "scale(0.99)", transitionDuration: "100ms" },
                  }}
                >
                  <Typography variant="h3" sx={{ fontSize: 18, mb: 0.5 }}>
                    {g.category.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {g.tools.filter((t) => !NOINDEX_SLUGS.has(t.slug)).length} tools
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
