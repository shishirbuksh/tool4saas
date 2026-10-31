import Link from "@/lib/astro/navigation";import { Container, Box, Typography, Breadcrumbs } from "@/components/ds";

import ToolSeo from "@/components/ToolSeo";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/blog/RelatedGuides";
import EmbedToolSnippet from "@/components/EmbedToolSnippet";
import { siteConfig } from "@/lib/site";
import type { ToolView } from "@/lib/tool-view";

// Real dateModified per-tool derived from git history — see src/lib/dates.ts
// (shared with ToolSeo JSON-LD and sitemap lastmod).

export default function ToolPageShell({ view, children }: { view: ToolView; children: React.ReactNode }) {
  const { tool, locale } = view;
  const cat = view.category;
  // dateModified comes from real git history of the tool's data file
  // (src/lib/edit-dates.generated.ts), so the visible <time> date always
  // equals the JSON-LD dateModified and the sitemap lastmod.
  const seeAlso = view.seeAlso;
  const dateModifiedIso = view.dateModifiedIso;
  const dateModifiedDisplay = view.dateModifiedDisplay;
  // Central YMYL injection (single source: src/lib/ymyl.ts). Covers finance +
  // health categories plus 10 calculators/business overrides. Tools must not
  // import YMYLDisclaimer directly.
  const ymylType = view.ymylType;
  return (
    <Container maxWidth="xl" className="pt-12 md:pt-20 pb-16 md:pb-24 px-4 md:px-8 overflow-x-clip">
      <Box className="mb-12 md:mb-16 max-w-[800px] mx-auto text-center">
        <Breadcrumbs className="mb-8 justify-center flex" aria-label="breadcrumb">
          <Link href={locale === "en" ? "/" : `/${locale}`} style={{textDecoration: "none"}}>
            <Box component="span" className="text-base-content/70 no-underline hover:text-primary">
              {locale === "es" ? "Inicio" : locale === "fr" ? "Accueil" : "Home"}
            </Box>
          </Link>
          {cat && (
            <Link href={`/category/${cat.id}`} style={{textDecoration: "none"}}>
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
            {locale === "es" ? (
              <>
                Parte de nuestra colección <Link href={`/category/${cat.id}`}>{cat.label}</Link> —{" "}
                <Link href={`/category/${cat.id}`}>Explorar más herramientas</Link>
                {seeAlso.length > 0 && (
                  <>
                    {" "}· Ver también:{" "}
                    {seeAlso.map((t, i) => (
                      <span key={t.slug}>
                        {i > 0 && ", "}
                        <Link href={`/${t.slug}`} title={`${t.title} – ${t.short} (free)`}>{t.title}</Link>
                      </span>
                    ))}
                  </>
                )}
                .
              </>
            ) : locale === "fr" ? (
              <>
                Fait partie de notre collection <Link href={`/category/${cat.id}`}>{cat.label}</Link> —{" "}
                <Link href={`/category/${cat.id}`}>Explorer plus d&apos;outils</Link>
                {seeAlso.length > 0 && (
                  <>
                    {" "}· Voir aussi :{" "}
                    {seeAlso.map((t, i) => (
                      <span key={t.slug}>
                        {i > 0 && ", "}
                        <Link href={`/${t.slug}`} title={`${t.title} – ${t.short} (free)`}>{t.title}</Link>
                      </span>
                    ))}
                  </>
                )}
                .
              </>
            ) : (
              <>
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
              </>
            )}
          </Typography>
        )}
        {view.localeLinks.length > 0 && (
          <Typography variant="body2" color="text.secondary" className="mt-3">
            {view.switcherLead}
            {view.localeLinks.map((l, i) => (
                <span key={l.locale}>
                  {i > 0 && " · "}
                  <Link href={l.href} hrefLang={l.locale}>
                    {l.label} →
                  </Link>
                </span>
              ))}
          </Typography>
        )}
      </Box>
      <Box className="max-w-[860px] mx-auto">
        <Box className="w-full min-w-[0px] overflow-x-auto">
          {ymylType && (
            <Box className="mb-4">
              <YMYLDisclaimer type={ymylType} locale={locale} />
            </Box>
          )}
          {/* TL;DR answer box: 40-60w citable definition above the tool UI
              for answer engines + voice (see speakable .tldr-passage). */}
          <Box
            className="mb-6 p-5 rounded-xl border border-base-300 bg-base-100"
          >
            <Typography color="text.primary" className="tldr-passage speakable-answer-first leading-[1.7]" >
              {locale === "es" ? (
                <>
                  <strong>Respuesta rápida:</strong> {tool.title} — {tool.short} Gratis, sin registro, funciona en tu navegador.
                  Abajo encontrarás la herramienta, guía en 4 pasos y preguntas frecuentes.
                </>
              ) : locale === "fr" ? (
                <>
                  <strong>Réponse rapide :</strong> {tool.title} — {tool.short} Gratuit, sans inscription, fonctionne dans votre navigateur.
                  Ci-dessous : l&apos;outil, le guide en 4 étapes et les questions fréquentes.
                </>
              ) : (
                <>
                  <strong>Quick answer:</strong> {tool.title} — {tool.short} Free, no signup, runs in your browser.
                  See below for the interactive tool, 4-step guide and FAQs.
                </>
              )}
            </Typography>
          </Box>
          {children}
          <EmbedToolSnippet slug={tool.slug} title={tool.title} locale={locale} />
        </Box>
      </Box>
      <RelatedTools tools={view.relatedTools} heading={view.relatedToolsHeading} />
      <RelatedGuides guides={view.guides} />
      <Box
        component="section"
        aria-label={locale === "es" ? "Sobre el autor" : locale === "fr" ? "À propos de l'auteur" : "About the author"}
        className="mt-8 p-6 border border-base-300 rounded-xl bg-base-100"
      >
        <Typography variant="h2" className="text-[1.125rem] mb-2">
          {locale === "es" ? "Sobre el autor" : locale === "fr" ? "À propos de l'auteur" : "About the author"}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="leading-[1.8]">
          {locale === "es" ? (
            <>
              Revisado por <Box component="span" translate="no" className="inline">{siteConfig.authorRole}</Box> — {siteConfig.authorBio}{" "}
              Última actualización:{" "}
              <time dateTime={dateModifiedIso}>{dateModifiedDisplay}</time>.{" "}
              Ver <Link href="/author">autores</Link>, <Link href="/methodology">metodología</Link> o <Link href="/contact">contacto</Link>.
            </>
          ) : locale === "fr" ? (
            <>
              Relu par <Box component="span" translate="no" className="inline">{siteConfig.authorRole}</Box> — {siteConfig.authorBio}{" "}
              Dernière mise à jour :{" "}
              <time dateTime={dateModifiedIso}>{dateModifiedDisplay}</time>.{" "}
              Voir <Link href="/author">auteurs</Link>, <Link href="/methodology">méthodologie</Link> ou <Link href="/contact">contact</Link>.
            </>
          ) : (
            <>
              Reviewed by the <Box component="span" translate="no" className="inline">{siteConfig.authorRole}</Box> — {siteConfig.authorBio}{" "}
              Last updated:{" "}
              <time dateTime={dateModifiedIso}>{dateModifiedDisplay}</time>.{" "}
              {/* Both /author and /methodology exist (glob check) — prefer /author first */}
              See <Link href="/author">our authors</Link>, <Link href="/methodology">methodology</Link> or <Link href="/contact">contact us</Link>.
            </>
          )}
        </Typography>
      </Box>
      <ToolSeo view={view} />
    </Container>
  );
}
