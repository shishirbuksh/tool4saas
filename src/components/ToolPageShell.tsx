import Link from "@/lib/astro/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
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
    <Container maxWidth="xl" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, overflowX: "clip" }}>
      <Box sx={{ mb: { xs: 6, md: 8 }, maxWidth: 800, mx: "auto", textAlign: "center" }}>
        <Breadcrumbs sx={{ mb: 4, typography: 'body2', justifyContent: "center", display: "flex" }} aria-label="breadcrumb">
          <Link href={locale === "en" ? "/" : `/${locale}`} style={{textDecoration: "none"}}>
            <Box component="span" sx={{ color: "text.secondary", textDecoration: "none", '&:hover': { color: 'primary.main' } }}>
              {locale === "es" ? "Inicio" : locale === "fr" ? "Accueil" : "Home"}
            </Box>
          </Link>
          {cat && (
            <Link href={`/category/${cat.id}`} style={{textDecoration: "none"}}>
              <Box component="span" sx={{ color: "text.secondary", textDecoration: "none", '&:hover': { color: 'primary.main' } }}>
                {cat.label}
              </Box>
            </Link>
          )}
          <Typography color="text.primary" sx={{ fontWeight: 600 }}>{tool.title}</Typography>
        </Breadcrumbs>
        
        <Typography variant="h1" sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" }, fontWeight: 800, mb: 3, letterSpacing: "-0.03em", textWrap: "balance" }}>
          {tool.title}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: { xs: "1.125rem", md: "1.25rem" }, lineHeight: 1.6, maxWidth: 640, mx: "auto", textWrap: "pretty" }}>
          {tool.description}
        </Typography>
        {cat && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
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
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
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
      <Box sx={{ maxWidth: 860, mx: "auto" }}>
        <Box sx={{ width: "100%", minWidth: 0, overflowX: "auto" }}>
          {ymylType && (
            <Box sx={{ mb: 2 }}>
              <YMYLDisclaimer type={ymylType} locale={locale} />
            </Box>
          )}
          {/* TL;DR answer box: 40-60w citable definition above the tool UI
              for answer engines + voice (see speakable .tldr-passage). */}
          <Box
            sx={{ mb: 3, p: 2.5, borderRadius: "12px", border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}
          >
            <Typography color="text.primary" className="tldr-passage speakable-answer-first" sx={{ lineHeight: 1.7 }}>
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
        sx={{ mt: 4, p: 3, border: "1px solid", borderColor: "divider", borderRadius: "12px", bgcolor: "background.paper" }}
      >
        <Typography variant="h2" sx={{ fontSize: "1.125rem", mb: 1 }}>
          {locale === "es" ? "Sobre el autor" : locale === "fr" ? "À propos de l'auteur" : "About the author"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {locale === "es" ? (
            <>
              Revisado por <Box component="span" translate="no" sx={{ display: "inline" }}>{siteConfig.authorRole}</Box> — {siteConfig.authorBio}{" "}
              Última actualización:{" "}
              <time dateTime={dateModifiedIso}>{dateModifiedDisplay}</time>.{" "}
              Ver <Link href="/author">autores</Link>, <Link href="/methodology">metodología</Link> o <Link href="/contact">contacto</Link>.
            </>
          ) : locale === "fr" ? (
            <>
              Relu par <Box component="span" translate="no" sx={{ display: "inline" }}>{siteConfig.authorRole}</Box> — {siteConfig.authorBio}{" "}
              Dernière mise à jour :{" "}
              <time dateTime={dateModifiedIso}>{dateModifiedDisplay}</time>.{" "}
              Voir <Link href="/author">auteurs</Link>, <Link href="/methodology">méthodologie</Link> ou <Link href="/contact">contact</Link>.
            </>
          ) : (
            <>
              Reviewed by the <Box component="span" translate="no" sx={{ display: "inline" }}>{siteConfig.authorRole}</Box> — {siteConfig.authorBio}{" "}
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
