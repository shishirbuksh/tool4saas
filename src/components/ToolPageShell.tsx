import Link from "@/lib/astro/navigation";
import { Container, Box, Typography, Breadcrumbs } from "@/components/ds";
import ToolSeo from "@/components/ToolSeo";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/blog/RelatedGuides";
import EmbedToolSnippet from "@/components/EmbedToolSnippet";
import { siteConfig } from "@/lib/site";
import type { ToolView } from "@/lib/tool-view";

export default function ToolPageShell({ view, children }: { view: ToolView; children: React.ReactNode }) {
  const { tool } = view;
  const cat = view.category;
  const seeAlso = view.seeAlso;
  const dateModifiedIso = view.dateModifiedIso;
  const dateModifiedDisplay = view.dateModifiedDisplay;
  const ymylType = view.ymylType;

  return (
    <Container maxWidth="xl" className="pt-12 md:pt-20 pb-16 md:pb-24 px-4 md:px-8 overflow-x-clip">
      <Box className="mb-12 md:mb-16 max-w-[800px] mx-auto text-center">
        <Breadcrumbs className="mb-8 justify-center flex" aria-label="breadcrumb">
          <Link href="/" style={{ textDecoration: "none" }}>
            <Box component="span" className="text-base-content/70 no-underline hover:text-primary">
              Home
            </Box>
          </Link>
          {cat && (
            <Link href={`/category/${cat.id}`} style={{ textDecoration: "none" }}>
              <Box component="span" className="text-base-content/70 no-underline hover:text-primary">
                {cat.label}
              </Box>
            </Link>
          )}
          <Typography color="text.primary" className="font-semibold">{tool.title}</Typography>
        </Breadcrumbs>
        
        <Typography variant="h1" className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] font-extrabold mb-6 tracking-[-0.03em] text-balance">
          {tool.title}
        </Typography>
        <Typography color="text.secondary" className="text-[1.125rem] md:text-[1.25rem] leading-[1.6] max-w-[640px] mx-auto text-pretty">
          {tool.description}
        </Typography>
        {cat && (
          <Typography variant="body2" color="text.secondary" className="mt-4 leading-[1.7]">
            Part of our <Link href={`/category/${cat.id}`}>{cat.label}</Link> collection —{" "}
            <Link href={`/category/${cat.id}`}>Explore more {cat.label} tools</Link>
            {seeAlso.length > 0 && (
              <>
                {" "}· See also:{" "}
                {seeAlso.map((t, i) => (
                  <span key={t.slug}>
                    {i > 0 && ", "}
                    <Link href={`/${t.slug}`} title={`${t.title} – ${t.short} (free)`}>{t.title}</Link>
                  </span>
                ))}
              </>
            )}
            .
          </Typography>
        )}
      </Box>
      <Box className="max-w-[860px] mx-auto">
        <Box className="w-full min-w-[0px] overflow-x-auto">
          {ymylType && (
            <Box className="mb-4">
              <YMYLDisclaimer type={ymylType} />
            </Box>
          )}
          {/* TL;DR answer box: 40-60w citable definition above the tool UI
              for answer engines + voice (see speakable .tldr-passage). */}
          <Box className="mb-6 p-5 rounded-xl border border-base-300 bg-base-100">
            <Typography color="text.primary" className="tldr-passage speakable-answer-first leading-[1.7]" >
              <strong>Quick answer:</strong> {tool.title} — {tool.short} Free, no signup, runs in your browser.
              See below for the interactive tool, 4-step guide and FAQs.
            </Typography>
          </Box>
          {children}
          <EmbedToolSnippet slug={tool.slug} title={tool.title} />
        </Box>
      </Box>
      <RelatedTools tools={view.relatedTools} heading={view.relatedToolsHeading} />
      <RelatedGuides guides={view.guides} />
      <Box
        component="section"
        aria-label="About the author"
        className="mt-8 p-6 border border-base-300 rounded-xl bg-base-100"
      >
        <Typography variant="h2" className="text-[1.125rem] mb-2">
          About the author
        </Typography>
        <Typography variant="body2" color="text.secondary" className="leading-[1.8]">
          Reviewed by the <Box component="span" translate="no" className="inline">{siteConfig.authorRole}</Box> — {siteConfig.authorBio}{" "}
          Last updated:{" "}
          <time dateTime={dateModifiedIso}>{dateModifiedDisplay}</time>.{" "}
          See <Link href="/author">our authors</Link>, <Link href="/methodology">methodology</Link> or <Link href="/contact">contact us</Link>.
        </Typography>
      </Box>
      <ToolSeo view={view} />
    </Container>
  );
}
