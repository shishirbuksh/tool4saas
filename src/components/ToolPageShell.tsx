import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AdSlot from "@/components/AdSlotLazy";
import ToolSeo from "@/components/ToolSeo";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/blog/RelatedGuides";
import { getCategory, NOINDEX_SLUGS, tools, type Tool } from "@/lib/tools";
import { getYMYLType } from "@/lib/ymyl";
import { siteConfig } from "@/lib/site";
import { getStaggeredDay } from "@/lib/dates";
import { isPilotSlug, getPilotLocales, LOCALE_LABEL, type Locale } from "@/lib/i18n";

// Lead-in + link labels for the visible locale switcher, keyed by shell locale.
// Link labels reuse LOCALE_LABEL so new locales plug in via i18n.ts only.
const SWITCHER_LEAD: Record<Locale, string> = {
  en: "Also available in: ",
  es: "También disponible en: ",
  fr: "Aussi disponible en : ",
};
function switcherLabel(viewLocale: Locale, target: Locale): string {
  if (target === "en") return viewLocale === "fr" ? "version anglaise" : "English version";
  return LOCALE_LABEL[target];
}
function switcherHref(toolSlug: string, target: Locale): string {
  return target === "en" ? `/${toolSlug}` : `/${target}/${toolSlug}`;
}

// Staggered dateModified per-tool (Sept 1-9) — see src/lib/dates.ts
// (shared with ToolSeo JSON-LD and sitemap lastmod).

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getStaggeredDate(slug: string): { iso: string; display: string } {
  const day = getStaggeredDay(slug);
  const iso = `2026-09-${String(day).padStart(2, "0")}`;
  const display = `${MONTH_NAMES[8]} ${day}, 2026`;
  return { iso, display };
}

export default function ToolPageShell({ tool, children, locale = "en" }: { tool: Tool; children: React.ReactNode; locale?: Locale }) {
  const cat = getCategory(tool.category);
  // dateModified uses the same staggered Sept 1-9 slug hash as ToolSeo's
  // dateModified (published 2026-09-01), so the visible <time> date always
  // equals the JSON-LD dateModified. Never clamp to a single date.
  const seeAlso = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug && !NOINDEX_SLUGS.has(t.slug)).slice(0, 2);
  const { iso: dateModifiedIso, display: dateModifiedDisplay } = getStaggeredDate(tool.slug);
  // Central YMYL injection (single source: src/lib/ymyl.ts). Covers finance +
  // health categories plus 10 calculators/business overrides. Tools must not
  // import YMYLDisclaimer directly.
  const ymylType = getYMYLType(tool);
  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, overflowX: "clip" }}>
      <Box sx={{ mb: { xs: 6, md: 8 }, maxWidth: 800, mx: "auto", textAlign: "center" }}>
        <Breadcrumbs sx={{ mb: 4, typography: 'body2', justifyContent: "center", display: "flex" }} aria-label="breadcrumb">
          <Link href="/" style={{textDecoration: "none"}}>
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
        {isPilotSlug(tool.slug) && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            {SWITCHER_LEAD[locale]}
            {(["en", ...getPilotLocales(tool.slug)] as Locale[])
              .filter((l) => l !== locale)
              .map((l, i) => (
                <span key={l}>
                  {i > 0 && " · "}
                  <Link href={switcherHref(tool.slug, l)} hrefLang={l}>
                    {switcherLabel(locale, l)} →
                  </Link>
                </span>
              ))}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "minmax(0, 800px) 300px" },
          justifyContent: "center",
          gap: { xs: 4, md: 6 },
          alignItems: "start",
        }}
      >
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
        </Box>
        <Box sx={{ minHeight: { xs: 250, lg: 280 } }}>
          <AdSlot
            format="rectangle"
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE || ""}
            label="Advertisement"
          />
        </Box>
      </Box>
      <RelatedTools slug={tool.slug} />
      <RelatedGuides slug={tool.slug} />
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
              Probado en Chrome, Edge, Firefox y Safari. Cada herramienta funciona en tu navegador. Última actualización:{" "}
              <time dateTime={dateModifiedIso}>{dateModifiedDisplay}</time>.{" "}
              Ver <Link href="/author">autores</Link>, <Link href="/methodology">metodología</Link> o <Link href="/contact">contacto</Link>.
            </>
          ) : locale === "fr" ? (
            <>
              Relu par <Box component="span" translate="no" sx={{ display: "inline" }}>{siteConfig.authorRole}</Box> — {siteConfig.authorBio}{" "}
              Testé sur Chrome, Edge, Firefox et Safari. Chaque outil fonctionne dans votre navigateur. Dernière mise à jour :{" "}
              <time dateTime={dateModifiedIso}>{dateModifiedDisplay}</time>.{" "}
              Voir <Link href="/author">auteurs</Link>, <Link href="/methodology">méthodologie</Link> ou <Link href="/contact">contact</Link>.
            </>
          ) : (
            <>
              Reviewed by the <Box component="span" translate="no" sx={{ display: "inline" }}>{siteConfig.authorRole}</Box> — {siteConfig.authorBio}{" "}
              Tested in-house on Chrome, Edge, Firefox, and Safari. Every tool runs locally in your browser. Last updated:{" "}
              <time dateTime={dateModifiedIso}>{dateModifiedDisplay}</time>.{" "}
              {/* Both /author and /methodology exist (glob check) — prefer /author first */}
              See <Link href="/author">our authors</Link>, <Link href="/methodology">methodology</Link> or <Link href="/contact">contact us</Link>.
            </>
          )}
        </Typography>
      </Box>
      <ToolSeo tool={tool} locale={locale} />
    </Container>
  );
}
