import Link from "@/lib/astro/navigation";
import { Container, Box, Typography, Breadcrumbs, Accordion, AccordionSummary, AccordionDetails } from "@/components/ds";
import { ChevronDownIcon as ExpandMoreIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";
import { liteGetTool } from "@/lib/tools/catalog-lite";
import { getPillarMeta } from "@/lib/blog-pillars";
import type { BlogPost } from "@/lib/blog";
import { blogMetaTitle } from "@/lib/seo-title";
import {
  formatIsoHuman,
  getBlogPostDateModifiedIso,
  getBlogPostDatePublishedIso,
} from "@/lib/dates";
import BlogSources from "@/components/blog/BlogSources";
import { getGuideCitationUrls } from "@/lib/blog-sources";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import { getBlogYMYLType } from "@/lib/ymyl";

function canonicalFor(post: BlogPost): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (post.kind === "pillar") return `${base}/blog/${post.pillar}`;
  return `${base}/blog/${post.pillar}/${post.slug}`;
}

function blogOgImage(post: BlogPost): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return post.kind === "pillar"
    ? `${base}/og/blog/${post.pillar}`
    : `${base}/og/blog/${post.pillar}/${post.slug}`;
}

export function blogMetadataFor(post: BlogPost) {
  const canonical = canonicalFor(post);
  const publishedIso = getBlogPostDatePublishedIso(post.pillar, post.slug, post.published);
  const modifiedIso = getBlogPostDateModifiedIso(post.pillar, post.slug, post.updated);
  const ogImage = blogOgImage(post);
  const fullTitle = blogMetaTitle(post.title, post.seoTitle);

  return {
    title: { absolute: fullTitle },
    description: post.description,
    alternates: { canonical, languages: { en: canonical, "x-default": canonical } },
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

export function buildBlogJsonLd(post: BlogPost) {
  const base = siteConfig.url.replace(/\/$/, "");
  const canonical = canonicalFor(post);
  const publishedIso = getBlogPostDatePublishedIso(post.pillar, post.slug, post.published);
  const modifiedIso = getBlogPostDateModifiedIso(post.pillar, post.slug, post.updated);
  const validFaqs = validBlogFaqs(post);
  const ogImage = blogOgImage(post);
  const pillarMeta = getPillarMeta(post.pillar);
  const pillarUrl = `${base}/blog/${post.pillar}`;
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
          { "@type": "ListItem", position: 3, name: pillarMeta?.title ?? post.pillar, item: pillarUrl },
          { "@type": "ListItem", position: 4, name: post.title, item: canonical },
        ];
  const ymylType = getBlogYMYLType(post);
  const reviewerRole =
    ymylType === "finance"
      ? "Finance Reviewer"
      : ymylType === "health"
        ? "Health Reviewer"
        : "Tools Reviewer";

  const authorPerson = {
    "@type": "Person",
    name: `${reviewerRole} — ${siteConfig.authorRole}`,
    jobTitle: reviewerRole,
    url: `${base}/author`,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: base,
    },
  };
  const citations = getGuideCitationUrls(post.pillar);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: post.title,
        description: post.description,
        url: canonical,
        image: ogImage,
        inLanguage: "en",
        author: authorPerson,
        reviewer: authorPerson,
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
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonical,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".blog-answer-first", ".faq-passage", ".howto-passage"],
        },
        ...(citations.length > 0 ? { citation: citations } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs,
      },
      ...(validFaqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: validFaqs.map((f) => ({
                "@type": "Question",
                name: f.question.trim(),
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer.trim(),
                },
              })),
            },
          ]
        : []),
    ],
  };
}

export function BlogJsonLd({ post }: { post: BlogPost }) {
  const jsonLd = buildBlogJsonLd(post);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default function BlogArticle({
  post,
  related: passedRelated,
  skipJsonLd = true,
}: {
  post: BlogPost;
  related?: BlogPost[];
  skipJsonLd?: boolean;
}) {
  const pillarMeta = getPillarMeta(post.pillar);
  const related = passedRelated ?? [];
  const primaryTool = post.toolSlugs[0] ? liteGetTool(post.toolSlugs[0]) : undefined;
  const secondaryTools = post.toolSlugs.slice(1).map((s) => liteGetTool(s)).filter(Boolean);
  const validFaqs = validBlogFaqs(post);
  const publishedIso = getBlogPostDatePublishedIso(post.pillar, post.slug, post.published);
  const modifiedIso = getBlogPostDateModifiedIso(post.pillar, post.slug, post.updated);
  const ymylType = getBlogYMYLType(post);
  const reviewerRole =
    ymylType === "finance"
      ? "Finance Reviewer"
      : ymylType === "health"
        ? "Health Reviewer"
        : "Tools Reviewer";
  const primaryHref = primaryTool ? `/${primaryTool.slug}` : undefined;

  return (
    <Container maxWidth="xl" className="py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      {!skipJsonLd && <BlogJsonLd post={post} />}
      <Breadcrumbs className="mb-4" aria-label="breadcrumb">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
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
          By <Link href="/author" style={{ fontWeight: 600 }}>{reviewerRole} ({siteConfig.authorRole})</Link>
          {" · "}
          <time dateTime={publishedIso}>Published {formatIsoHuman(publishedIso)}</time>
          {" · Updated "}<time dateTime={modifiedIso}>{formatIsoHuman(modifiedIso)}</time>
          {" · "}{post.readingMinutes} min read
        </Typography>
      </Box>

      {/* YMYL disclaimer for financial and health pillars */}
      {ymylType && (
        <Box className="mb-8">
          <YMYLDisclaimer type={ymylType} />
        </Box>
      )}

      {/* Above-fold tool CTA */}
      {primaryTool && primaryHref && (
        <Box className="p-6 mb-8 rounded-xl border border-base-300 bg-base-100 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <Box>
            <Typography variant="h2" className="text-[1.1rem] font-bold mb-1">
              Try it now — {primaryTool.title}, free in your browser
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {primaryTool.short} · No signup · No watermark · Free forever.
            </Typography>
          </Box>
          <Link
            href={primaryHref}
            className="btn btn-primary min-h-[44px] px-6 rounded-lg text-sm font-semibold tracking-[-0.01em] shadow-sm hover:opacity-90 no-underline whitespace-nowrap"
          >
            Open {primaryTool.title} →
          </Link>
        </Box>
      )}

      <Box className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10 items-start">
        {/* Main Article Content (Column 1 on desktop, order-2 on mobile) */}
        <Box color="text.primary" className="min-w-0 order-2 lg:order-1">
          <article className="blog-body" dangerouslySetInnerHTML={{ __html: post.html }} />
          <BlogSources pillar={post.pillar} />
          {secondaryTools.length > 0 && (
            <Box className="mt-8 p-6 rounded-xl border border-base-300 bg-base-200/50">
              <Typography variant="h2" className="text-[1.1rem] font-bold mb-2">
                Related free tools
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
                Frequently asked questions
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
                Done reading — open the {primaryTool.title}
              </Typography>
              <Typography color="text.secondary" className="mb-4">
                {primaryTool.short} — free in your browser, no signup.
              </Typography>
              <Link
                href={primaryHref}
                className="btn btn-primary min-h-[48px] px-8 rounded-lg text-sm font-bold tracking-[-0.01em] shadow-sm hover:opacity-90 no-underline inline-flex items-center"
              >
                Open {primaryTool.title} →
              </Link>
            </Box>
          )}
        </Box>

        {/* Sticky TOC Sidebar (Column 2 on desktop, order-1 on mobile) */}
        {post.toc && post.toc.length > 0 && (
          <Box
            component="nav"
            aria-label="Table of contents"
            className="order-1 lg:order-2 lg:sticky lg:top-24 p-5 border border-base-300 rounded-xl bg-base-100/90 backdrop-blur-sm"
          >
            <Typography variant="subtitle2" className="font-extrabold mb-3 tracking-[0.04em] uppercase text-[0.75rem] text-base-content/70">
              On this page
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
          Keep reading in this guide
        </Typography>
        <Box className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] gap-4">
          {related.map((r) => (
            <Link
              key={`${r.pillar}/${r.slug}`}
              href={r.kind === "pillar" ? `/blog/${r.pillar}` : `/blog/${r.pillar}/${r.slug}`}
              className="block p-5 rounded-xl border border-base-300 bg-base-100 hover:border-base-content/40 transition-colors no-underline text-inherit"
            >
              <Typography variant="subtitle2" color="primary" className="font-bold mb-1 text-[0.75rem] uppercase tracking-[0.05em]">
                {r.kind === "pillar" ? "Pillar guide" : "In this silo"}
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
