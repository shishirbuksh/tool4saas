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
import { getEsTool } from "@/lib/i18n";
import { isEsBlogPilot } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getPillarMeta, getRelatedPosts } from "@/lib/blog-registry";
import type { BlogPost } from "@/lib/blog";
import EmbeddedTool from "@/components/blog/EmbeddedTool";

function canonicalFor(post: BlogPost, locale: Locale = "en"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const prefix = locale === "en" ? "" : `/${locale}`;
  if (post.kind === "pillar") return `${base}${prefix}/blog/${post.pillar}`;
  return `${base}${prefix}/blog/${post.pillar}/${post.slug}`;
}

export function blogMetadataFor(post: BlogPost, locale: Locale = "en") {
  const canonical = canonicalFor(post, locale);
  const base = siteConfig.url.replace(/\/$/, "");
  const enCanonical = canonicalFor(post, "en");
  // Per-post OG: prefer the funnel tool's /og/<slug> image so shares show
  // the tool, not the generic home card. Falls back to /og/home only when
  // the post has no toolSlugs.
  const ogImage = post.toolSlugs[0] ? `${base}/og/${post.toolSlugs[0]}` : `${base}/og/home`;
  let core = post.title;
  if (core.length > 55) {
    core = core.slice(0, 55).trimEnd();
    const lastSpace = core.lastIndexOf(" ");
    if (lastSpace > 35) core = core.slice(0, lastSpace);
  }
  const fullTitle = `${core} | Tool4SaaS`;
  // Bidirectional hreflang for ES blog pilots (EN <-> /es/blog/...).
  // Non-pilot posts keep {en, x-default} to avoid pointing at 404s.
  const languages =
    locale === "en"
      ? isEsBlogPilot(post.pillar, post.slug)
        ? { en: canonical, es: `${base}/es/blog/${post.pillar}/${post.slug}`, "x-default": canonical }
        : { en: canonical, "x-default": canonical }
      : { es: canonical, en: enCanonical, "x-default": enCanonical };
  return {
    title: { absolute: fullTitle },
    description: post.description,
    alternates: { canonical, languages },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "article" as const,
      locale: locale === "es" ? "es_ES" : siteConfig.locale,
      ...(locale === "es" ? { alternateLocale: ["en_US"] } : {}),
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

export function validBlogFaqs(post: BlogPost) {
  return Array.isArray(post.faqs)
    ? post.faqs.filter(
        (f) =>
          typeof f?.question === "string" &&
          f.question.trim().length > 0 &&
          typeof f?.answer === "string" &&
          f.answer.trim().length > 0
      )
    : [];
}

export function BlogJsonLd({ post, locale = "en" }: { post: BlogPost; locale?: Locale }) {
  const base = siteConfig.url.replace(/\/$/, "");
  const canonical = canonicalFor(post, locale);
  // Filter malformed/empty FAQs so FAQPage always has Question +
  // acceptedAnswer Answer text (1:1 with visible copy below).
  const validFaqs = validBlogFaqs(post);
  // HowTo from TOC: every pillar/cluster has an h2 how-to spine; expose it
  // as HowTo steps (name = TOC text, url = anchor) with totalTime so
  // AI/voice can cite ordered steps, not just prose. `text` is extracted
  // from the section body (first ~300 chars of visible text after the h2)
  // so steps stay valid per Google (HowToStep requires name + text).
  const sectionText = (html: string, id: string): string | undefined => {
    const start = html.indexOf(`id="${id}"`);
    if (start < 0) return undefined;
    const bodyStart = html.indexOf(">", html.indexOf("<h2", Math.max(0, start - 200)));
    const nextH2 = html.indexOf("<h2", start + 1);
    const raw = html.slice(bodyStart + 1, nextH2 > 0 ? nextH2 : undefined);
    const text = raw
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 0 ? text.slice(0, 300) : undefined;
  };
  const howToSteps = Array.isArray(post.toc)
    ? post.toc.filter((t) => t.level === 2)
    : [];
  const ogImage = post.toolSlugs[0] ? `${base}/og/${post.toolSlugs[0]}` : `${base}/og/home`;
  const pillarMeta = getPillarMeta(post.pillar);
  // ES pilot has no translated pillar page yet: pillar crumb falls back to the
  // EN pillar URL (exists) instead of a 404 /es/blog/<pillar>.
  const pillarUrl = `${base}/blog/${post.pillar}`;
  const homeName = locale === "es" ? "Inicio" : "Home";
  const crumbs =
    post.kind === "pillar"
      ? [
          { "@type": "ListItem", position: 1, name: homeName, item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: canonical },
        ]
      : [
          { "@type": "ListItem", position: 1, name: homeName, item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
          { "@type": "ListItem", position: 3, name: pillarMeta?.title ?? post.pillar, item: pillarUrl },
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
        image: ogImage,
        inLanguage: locale === "es" ? "es" : "en",
        author: { "@type": "Organization", name: siteConfig.authorRole, url: `${base}/author` },
        reviewer: { "@type": "Organization", name: siteConfig.authorRole, url: `${base}/author` },
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
        // Voice/AEO hook: selectors below match visible classes
        // (.faq-passage on FAQ answers, .blog-answer-first on the lede).
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".faq-passage", ".blog-answer-first"],
        },
        ...(post.keywords.length ? { keywords: post.keywords.join(", ") } : {}),
        wordCount: post.html ? post.html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length : undefined,
        timeRequired: `PT${Math.max(3, post.readingMinutes)}M`,
      },
      { "@type": "BreadcrumbList", itemListElement: crumbs },
      ...(validFaqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: validFaqs.map((f) => ({
                "@type": "Question",
                name: f.question.trim(),
                acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
              })),
            },
          ]
        : []),
      ...(howToSteps.length
        ? [
            {
              "@type": "HowTo",
              name: post.title,
              totalTime: `PT${Math.max(3, post.readingMinutes)}M`,
              tool: post.toolSlugs[0]
                ? [{ "@type": "HowToTool", name: post.toolSlugs[0] }]
                : undefined,
              step: howToSteps
                .map((t, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: t.text,
                  text: sectionText(post.html, t.id) ?? t.text,
                  url: `${canonical}#${t.id}`,
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

export default function BlogArticle({ post, locale = "en" }: { post: BlogPost; locale?: Locale }) {
  const base = siteConfig.url.replace(/\/$/, "");
  void base;
  const pillarMeta = getPillarMeta(post.pillar);
  const related = getRelatedPosts(post, 4);
  const primaryTool = post.toolSlugs[0] ? getTool(post.toolSlugs[0]) : undefined;
  const secondaryTools = post.toolSlugs.slice(1).map((s) => getTool(s)).filter(Boolean);
  const validFaqs = validBlogFaqs(post);
  // ES pilot: primary CTA deep-links /es/<slug> with the native ES title/short
  // when a transcreation exists; siblings/secondary stay EN (exist only in EN).
  const esPrimaryTool = locale === "es" && post.toolSlugs[0] ? getEsTool(post.toolSlugs[0]) : undefined;
  const primaryHref =
    locale === "es" && esPrimaryTool ? `/es/${post.toolSlugs[0]}` : primaryTool ? `/${primaryTool.slug}` : undefined;
  const primaryTitle = esPrimaryTool?.title ?? primaryTool?.title ?? "";
  const primaryShort = esPrimaryTool?.short ?? primaryTool?.short ?? "";

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <BlogJsonLd post={post} locale={locale} />
      <Breadcrumbs sx={{ mb: 2 }} aria-label="breadcrumb">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>{locale === "es" ? "Inicio" : "Home"}</Link>
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
      <Typography color="text.secondary" className="blog-answer-first" sx={{ mb: 2, maxWidth: 760, fontSize: "1.1rem", lineHeight: 1.7 }}>
        {post.description}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", mb: 4 }}>
        <Typography variant="body2" color="text.secondary">
          {locale === "es" ? (
            <>
              Por <Link href="/author" style={{ fontWeight: 600 }}>{siteConfig.author} Editorial Team</Link>
              {" · "}
              <time dateTime={post.published}>Publicado {post.published}</time>
              {" · Actualizado "}<time dateTime={post.updated}>{post.updated}</time>
              {" · "}{post.readingMinutes} min de lectura
            </>
          ) : (
            <>
              By <Link href="/author" style={{ fontWeight: 600 }}>{siteConfig.author} Editorial Team</Link>
              {" · "}
              <time dateTime={post.published}>Published {post.published}</time>
              {" · Updated "}<time dateTime={post.updated}>{post.updated}</time>
              {" · "}{post.readingMinutes} min read
            </>
          )}
        </Typography>
      </Box>

      {/* Above-fold tool CTA */}
      {primaryTool && primaryHref && (
        <Box sx={{ p: 3, mb: 4, borderRadius: "16px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper", display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, alignItems: { sm: "center" }, justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h2" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 0.5 }}>
              {locale === "es" ? (
                <>Pruébala ahora — {primaryTitle}, gratis en tu navegador</>
              ) : (
                <>Try it now — {primaryTool.title}, free in your browser</>
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {locale === "es" ? (
                <>{primaryShort} · Sin registro · Sin marca de agua · Gratis siempre.</>
              ) : (
                <>{primaryTool.short} · No signup · No watermark · Free forever.</>
              )}
            </Typography>
          </Box>
          <Link
            href={primaryHref}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 48, padding: "12px 24px", borderRadius: 12, background: "var(--brand-gradient, #1976d2)", color: "#fff", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            {locale === "es" ? <>Abrir {primaryTitle} →</> : <>Open {primaryTool.title} →</>}
          </Link>
        </Box>
      )}

      {/* P0-2: working tool embedded in pillar guides (client-only, SSR stays lean) */}
      {post.kind === "pillar" && <EmbeddedTool pillar={post.pillar} />}

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "240px 1fr" }, gap: 4, alignItems: "start" }}>
        {/* TOC — after body on mobile (order 2) so answer-first H1+intro stays above fold; sticky sidebar on md+ */}
        <Box component="nav" aria-label={locale === "es" ? "Índice" : "Table of contents"} sx={{ position: { md: "sticky" }, top: { md: 100 }, p: 2.5, border: "1px solid", borderColor: "divider", borderRadius: "12px", bgcolor: "background.paper", order: { xs: 2, md: 0 } }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            {locale === "es" ? "En esta página" : "On this page"}
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
                {locale === "es" ? "Herramientas gratis relacionadas" : "Related free tools"}
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

          {validFaqs.length > 0 && (
            <Box component="section" sx={{ mt: 5 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" }, fontWeight: 800, mb: 2 }}>
                {locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
              </Typography>
              {validFaqs.map((f, i) => (
                <Accordion key={i} elevation={0} sx={{ border: "1px solid", borderColor: "divider", "&:before": { display: "none" }, mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography component="h3" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                      {f.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary" className="faq-passage speakable-answer-first" sx={{ lineHeight: 1.7 }}>{f.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}

          {primaryTool && primaryHref && (
            <Box sx={{ mt: 5, p: 4, borderRadius: "16px", textAlign: "center", border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
              <Typography variant="h2" sx={{ fontSize: "1.4rem", fontWeight: 800, mb: 1 }}>
                {locale === "es" ? (
                  <>Terminaste de leer — abre {primaryTitle}</>
                ) : (
                  <>Done reading — open the {primaryTool.title}</>
                )}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {locale === "es" ? (
                  <>{primaryShort} — gratis en tu navegador, sin registro.</>
                ) : (
                  <>{primaryTool.short} — free in your browser, no signup.</>
                )}
              </Typography>
              <Link href={primaryHref} style={{ display: "inline-flex", minHeight: 48, alignItems: "center", padding: "12px 28px", borderRadius: 12, background: "var(--brand-gradient, #1976d2)", color: "#fff", fontWeight: 700, textDecoration: "none" }}>
                {locale === "es" ? <>Abrir {primaryTitle} →</> : <>Open {primaryTool.title} →</>}
              </Link>
            </Box>
          )}
        </Box>
      </Box>

      {/* Sibling silo mesh */}
      <Box component="section" sx={{ mt: 6, pt: 4, borderTop: "1px solid", borderColor: "divider" }}>
        <Typography variant="h2" sx={{ fontSize: "1.25rem", fontWeight: 800, mb: 2 }}>
          {locale === "es" ? "Sigue leyendo en esta guía" : "Keep reading in this guide"}
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
          {related.map((r) => (
            <Link
              key={`${r.pillar}/${r.slug}`}
              href={r.kind === "pillar" ? `/blog/${r.pillar}` : `/blog/${r.pillar}/${r.slug}`}
              style={{ textDecoration: "none", color: "inherit", display: "block", padding: 20, borderRadius: 12, border: "1px solid var(--mui-palette-divider)" }}
            >
              <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700, mb: 0.5, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {r.kind === "pillar"
                  ? locale === "es" ? "Guía pilar" : "Pillar guide"
                  : locale === "es" ? "En este bloque" : "In this silo"}
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
