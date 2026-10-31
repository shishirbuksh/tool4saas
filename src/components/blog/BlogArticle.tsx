import Link from "@/lib/astro/navigation";import { Container, Box, Typography, Breadcrumbs, Accordion, AccordionSummary, AccordionDetails } from "@/components/ds";

import { ExpandMore as ExpandMoreIcon } from "@/components/ds/icons";
import { siteConfig } from "@/lib/site";
import { getTool } from "@/lib/tools";
import { getEsTool } from "@/lib/i18n";
import { isEsBlogPilot } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getPillarMeta, getRelatedPosts } from "@/lib/blog-registry";
import type { BlogPost } from "@/lib/blog";
import { blogMetaTitle } from "@/lib/seo-title";
import {
  formatIsoHuman,
  getBlogPostDateModifiedIso,
  getBlogPostDatePublishedIso,
} from "@/lib/dates";
import EmbeddedTool from "@/components/blog/EmbeddedTool";
import BlogSources from "@/components/blog/BlogSources";
import { getGuideCitationUrls } from "@/lib/blog-sources";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import { getBlogYMYLType } from "@/lib/ymyl";

function canonicalFor(post: BlogPost, locale: Locale = "en"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const prefix = locale === "en" ? "" : `/${locale}`;
  if (post.kind === "pillar") return `${base}${prefix}/blog/${post.pillar}`;
  return `${base}${prefix}/blog/${post.pillar}/${post.slug}`;
}

// Per-post OG card rendered by /og/blog/[...parts] from the same registry the
// page renders, so the share image title/description always match the article.
function blogOgImage(post: BlogPost): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return post.kind === "pillar"
    ? `${base}/og/blog/${post.pillar}`
    : `${base}/og/blog/${post.pillar}/${post.slug}`;
}

export function blogMetadataFor(post: BlogPost, locale: Locale = "en") {
  const canonical = canonicalFor(post, locale);
  const base = siteConfig.url.replace(/\/$/, "");
  const enCanonical = canonicalFor(post, "en");
  const publishedIso = getBlogPostDatePublishedIso(post.pillar, post.slug, post.published);
  const modifiedIso = getBlogPostDateModifiedIso(post.pillar, post.slug, post.updated);
  // Per-post OG: the article's own card from /og/blog/[...parts], so shares
  // show the guide title instead of reusing the funnel tool's card.
  const ogImage = blogOgImage(post);
  const fullTitle = blogMetaTitle(post.title, post.seoTitle);
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
      publishedTime: publishedIso,
      modifiedTime: modifiedIso,
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
  const publishedIso = getBlogPostDatePublishedIso(post.pillar, post.slug, post.published);
  const modifiedIso = getBlogPostDateModifiedIso(post.pillar, post.slug, post.updated);
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
  const ogImage = blogOgImage(post);
  const pillarMeta = getPillarMeta(post.pillar);
  // ES pilot has no translated pillar page yet: pillar crumb falls back to the
  // EN pillar URL (exists) instead of a 404 /es/blog/<pillar>.
  const pillarUrl = `${base}/blog/${post.pillar}`;
  const homeName = locale === "es" ? "Inicio" : "Home";
  const homeUrl = locale === "es" ? `${base}/es` : `${base}/`;
  const crumbs =
    post.kind === "pillar"
      ? [
          { "@type": "ListItem", position: 1, name: homeName, item: homeUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: canonical },
        ]
      : [
          { "@type": "ListItem", position: 1, name: homeName, item: homeUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
          { "@type": "ListItem", position: 3, name: pillarMeta?.title ?? post.pillar, item: pillarUrl },
          { "@type": "ListItem", position: 4, name: post.title, item: canonical },
        ];
  const citations = getGuideCitationUrls(post.pillar);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [      {
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
        datePublished: publishedIso,
        dateModified: modifiedIso,
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
        ...(citations.length ? { citation: citations } : {}),
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
  const publishedIso = getBlogPostDatePublishedIso(post.pillar, post.slug, post.published);
  const modifiedIso = getBlogPostDateModifiedIso(post.pillar, post.slug, post.updated);
  const ymylType = getBlogYMYLType(post);
  // ES pilot: primary CTA deep-links /es/<slug> with the native ES title/short
  // when a transcreation exists; siblings/secondary stay EN (exist only in EN).
  const esPrimaryTool = locale === "es" && post.toolSlugs[0] ? getEsTool(post.toolSlugs[0]) : undefined;
  const primaryHref =
    locale === "es" && esPrimaryTool ? `/es/${post.toolSlugs[0]}` : primaryTool ? `/${primaryTool.slug}` : undefined;
  const primaryTitle = esPrimaryTool?.title ?? primaryTool?.title ?? "";
  const primaryShort = esPrimaryTool?.short ?? primaryTool?.short ?? "";

  return (
    <Container maxWidth="xl" className="py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <BlogJsonLd post={post} locale={locale} />
      <Breadcrumbs className="mb-4" aria-label="breadcrumb">
        <Link href={locale === "es" ? "/es" : "/"} style={{ color: "inherit", textDecoration: "none" }}>{locale === "es" ? "Inicio" : "Home"}</Link>
        <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Blog</Link>
        {post.kind === "cluster" && pillarMeta && (
          <Link href={`/blog/${post.pillar}`} style={{ color: "inherit", textDecoration: "none" }}>
            {pillarMeta.title.length > 40 ? pillarMeta.shortLabel : pillarMeta.title}
          </Link>
        )}
        <Typography color="text.primary" component="span" className="max-w-[320px] overflow-hidden text-ellipsis whitespace-nowrap">
          {post.title}
        </Typography>
      </Breadcrumbs>

      <Typography component="h1" variant="h1" className="text-[2rem] md:text-[2.75rem] font-extrabold tracking-[-0.02em] leading-[1.15] mb-4 text-balance">
        {post.title}
      </Typography>
      <Typography color="text.secondary" className="blog-answer-first mb-4 max-w-[760px] text-[1.1rem] leading-[1.7]" >
        {post.description}
      </Typography>
      <Box className="flex flex-wrap gap-4 items-center mb-8">
        <Typography variant="body2" color="text.secondary">
          {locale === "es" ? (
            <>
              Por <Link href="/author" style={{ fontWeight: 600 }}>{siteConfig.author} Editorial Team</Link>
              {" · "}
              <time dateTime={publishedIso}>Publicado {formatIsoHuman(publishedIso)}</time>
              {" · Actualizado "}<time dateTime={modifiedIso}>{formatIsoHuman(modifiedIso)}</time>
              {" · "}{post.readingMinutes} min de lectura
            </>
          ) : (
            <>
              By <Link href="/author" style={{ fontWeight: 600 }}>{siteConfig.author} Editorial Team</Link>
              {" · "}
              <time dateTime={publishedIso}>Published {formatIsoHuman(publishedIso)}</time>
              {" · Updated "}<time dateTime={modifiedIso}>{formatIsoHuman(modifiedIso)}</time>
              {" · "}{post.readingMinutes} min read
            </>
          )}
        </Typography>
        {/* Visible language toggle mirroring the bidirectional hreflang
            metadata above: only posts in the ES blog pilot registry render
            it, so links never point at 404s. ES view links back to EN. */}
        {isEsBlogPilot(post.pillar, post.slug) && (
          <Typography variant="body2" color="text.secondary" className="w-full">
            {locale === "es" ? "Also available in: " : "También disponible en: "}
            <Link
              href={locale === "es" ? `/blog/${post.pillar}/${post.slug}` : `/es/blog/${post.pillar}/${post.slug}`}
              hrefLang={locale === "es" ? "en" : "es"}
              style={{ fontWeight: 600 }}
            >
              {locale === "es" ? "English version →" : "versión en español →"}
            </Link>
          </Typography>
        )}
      </Box>

      {/* YMYL disclaimer for financial and health pillars */}
      {ymylType && (
        <Box className="mb-8">
          <YMYLDisclaimer type={ymylType} locale={locale} />
        </Box>
      )}

      {/* Above-fold tool CTA */}
      {primaryTool && primaryHref && (
        <Box className="p-6 mb-8 rounded-xl border border-base-300 bg-base-100 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <Box>
            <Typography variant="h2" className="text-[1.1rem] font-bold mb-1">
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
            className="btn btn-primary min-h-[44px] px-6 rounded-lg text-sm font-semibold tracking-[-0.01em] shadow-sm hover:opacity-90 no-underline whitespace-nowrap"
          >
            {locale === "es" ? <>Abrir {primaryTitle} →</> : <>Open {primaryTool.title} →</>}
          </Link>
        </Box>
      )}

      {/* P0-2: working tool embedded in pillar guides (client-only, SSR stays lean) */}
      {post.kind === "pillar" && primaryTool && (
        <EmbeddedTool
          pillar={post.pillar}
          title={primaryTool.title}
          short={primaryTool.short}
          slug={primaryTool.slug}
        />
      )}

      <Box className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10 items-start">
        {/* Main Article Content (Column 1 on desktop, order-2 on mobile) */}
        <Box color="text.primary" className="min-w-0 order-2 lg:order-1">
          <article className="blog-body" dangerouslySetInnerHTML={{ __html: post.html }} />
          <BlogSources pillar={post.pillar} />
          {secondaryTools.length > 0 && (
            <Box className="mt-8 p-6 rounded-xl border border-base-300 bg-base-200/50">
              <Typography variant="h2" className="text-[1.1rem] font-bold mb-2">
                {locale === "es" ? "Herramientas gratis relacionadas" : "Related free tools"}
              </Typography>
              <Box className="flex flex-wrap gap-2">
                {secondaryTools.map((t) => (
                  <Link
                    key={t!.slug}
                    href={`/${t!.slug}`}
                    className="inline-flex min-h-[40px] items-center px-4 py-2 rounded-full border border-base-300 text-sm font-semibold hover:border-base-content transition-colors"
                    style={{ textDecoration: "none" }}
                  >
                    {t!.title} →
                  </Link>
                ))}
              </Box>
            </Box>
          )}

          {validFaqs.length > 0 && (
            <Box component="section" className="mt-10">
              <Typography variant="h2" className="text-[1.5rem] md:text-[1.75rem] font-extrabold mb-4">
                {locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
              </Typography>
              {validFaqs.map((f, i) => (
                <Accordion key={i} elevation={0} className="border border-base-300 before:hidden mb-2 rounded-xl">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography component="span" className="font-semibold text-[1rem]">
                      {f.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary" className="faq-passage speakable-answer-first leading-[1.7]" >{f.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}

          {primaryTool && primaryHref && (
            <Box className="mt-10 p-8 rounded-xl text-center border border-base-300 bg-base-100">
              <Typography variant="h2" className="text-[1.4rem] font-extrabold mb-2">
                {locale === "es" ? (
                  <>Terminaste de leer — abre {primaryTitle}</>
                ) : (
                  <>Done reading — open the {primaryTool.title}</>
                )}
              </Typography>
              <Typography color="text.secondary" className="mb-4">
                {locale === "es" ? (
                  <>{primaryShort} — gratis en tu navegador, sin registro.</>
                ) : (
                  <>{primaryTool.short} — free in your browser, no signup.</>
                )}
              </Typography>
              <Link
                href={primaryHref}
                className="btn btn-primary min-h-[48px] px-8 rounded-lg text-sm font-bold tracking-[-0.01em] shadow-sm hover:opacity-90 no-underline inline-flex items-center"
              >
                {locale === "es" ? <>Abrir {primaryTitle} →</> : <>Open {primaryTool.title} →</>}
              </Link>
            </Box>
          )}
        </Box>

        {/* Sticky TOC Sidebar (Column 2 on desktop, order-1 on mobile) */}
        {post.toc && post.toc.length > 0 && (
          <Box
            component="nav"
            aria-label={locale === "es" ? "Índice" : "Table of contents"}
            className="order-1 lg:order-2 lg:sticky lg:top-24 p-5 border border-base-300 rounded-xl bg-base-100/90 backdrop-blur-sm"
          >
            <Typography variant="subtitle2" className="font-extrabold mb-3 tracking-[0.04em] uppercase text-[0.75rem] text-base-content/70">
              {locale === "es" ? "En esta página" : "On this page"}
            </Typography>
            <Box component="ul" className="m-0 p-0 list-none flex flex-col gap-1">
              {post.toc.map((t) => (
                <Box component="li" key={t.id} style={{ paddingLeft: t.level === 3 ? "16px" : "0px" }}>
                  <Link
                    href={`#${t.id}`}
                    className="block py-1 text-[0.875rem] leading-snug text-base-content/70 hover:text-base-content hover:underline transition-colors"
                    style={{ textDecoration: "none", fontWeight: t.level === 2 ? 600 : 400 }}
                  >
                    {t.text}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {/* Sibling silo mesh */}
      <Box component="section" className="mt-12 pt-8 border-t border-base-300">
        <Typography variant="h2" className="text-[1.25rem] font-extrabold mb-4">
          {locale === "es" ? "Sigue leyendo en esta guía" : "Keep reading in this guide"}
        </Typography>
        <Box className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] gap-4">
          {related.map((r) => (
            <Link
              key={`${r.pillar}/${r.slug}`}
              href={r.kind === "pillar" ? `/blog/${r.pillar}` : `/blog/${r.pillar}/${r.slug}`}
              className="block p-5 rounded-xl border border-base-300 bg-base-100 hover:border-base-content/40 transition-colors no-underline text-inherit"
            >
              <Typography variant="subtitle2" color="primary" className="font-bold mb-1 text-[0.75rem] uppercase tracking-[0.05em]">
                {r.kind === "pillar"
                  ? locale === "es" ? "Guía pilar" : "Pillar guide"
                  : locale === "es" ? "En este bloque" : "In this silo"}
              </Typography>
              <Typography variant="h3" className="text-[1rem] font-bold leading-[1.4]">
                {r.title}
              </Typography>
            </Link>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
