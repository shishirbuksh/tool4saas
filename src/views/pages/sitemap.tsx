
import { useState, useMemo } from "react";import { Container, Box, Typography, Grid, TextField, InputAdornment, Chip, Stack, IconButton } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { Search as SearchIcon, Clear as ClearIcon } from "@/components/ds/icons";
import { siteConfig } from "@/lib/site";

export interface SitemapToolItem {
  slug: string;
  title: string;
  short: string;
  category: string;
}

export interface SitemapCategoryGroup {
  id: string;
  label: string;
  description: string;
  count: number;
  tools: SitemapToolItem[];
}

export interface SitemapGuideCluster {
  slug: string;
  title: string;
  readingMinutes: number;
}

export interface SitemapGuidePillar {
  pillar: string;
  title: string;
  shortLabel: string;
  description: string;
  toolSlug: string;
  clusters: SitemapGuideCluster[];
}

export interface SitemapPilotItem {
  slug: string;
  title: string;
  locale: "es" | "fr";
  path: string;
}

export interface SitemapViewProps extends Record<string, unknown> {
  categories: SitemapCategoryGroup[];
  pillars: SitemapGuidePillar[];
  pilotsEs: SitemapPilotItem[];
  pilotsFr: SitemapPilotItem[];
  totalTools: number;
  totalGuides: number;
  totalPilots: number;
}

const STATIC_PAGES = [
  { href: "/about", label: "About Us", desc: "Our local-first mission, remote team and device-only privacy standards." },
  { href: "/methodology", label: "Methodology", desc: "How we engineer, test on real browsers, and verify our math fixtures." },
  { href: "/author", label: "Editorial & Authors", desc: "Meet the engineers, finance analysts and editors behind Tool4SaaS." },
  { href: "/contact", label: "Contact Us", desc: "Direct support and feedback channel, replies within 2 business days." },
  { href: "/privacy", label: "Privacy Policy", desc: "Zero-tracking, local processing, and network disclosure details." },
  { href: "/terms", label: "Terms of Service", desc: "Fair-use terms, disclaimers, and open licensing for online tools." },
];

const MACHINE_FEEDS = [
  { href: "/sitemap.xml", label: "XML Sitemap Index", desc: "Complete canonical sitemap consumed by search engine crawlers." },
  { href: "/rss.xml", label: "RSS Feed", desc: "Syndicated feed of new guides, updates and published utilities." },
  { href: "/llms.txt", label: "llms.txt", desc: "Curated plain-text documentation formatted for LLM agent discovery." },
  { href: "/llms-full.txt", label: "llms-full.txt", desc: "Full contextual schema and registry for AI web agents." },
  { href: "/robots.txt", label: "robots.txt", desc: "Standard robot exclusion protocol directives and sitemap declaration." },
];

export default function SitemapView({
  categories = [],
  pillars = [],
  pilotsEs = [],
  pilotsFr = [],
  totalTools = 125,
  totalGuides = 198,
  totalPilots = 32,
}: SitemapViewProps) {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<"all" | "tools" | "guides" | "pilots" | "company">("all");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter(
          (t) =>
            t.title.toLowerCase().includes(normalizedQuery) ||
            t.short.toLowerCase().includes(normalizedQuery) ||
            t.slug.toLowerCase().includes(normalizedQuery)
        ),
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [categories, normalizedQuery]);

  const filteredPillars = useMemo(() => {
    if (!normalizedQuery) return pillars;
    return pillars
      .map((p) => {
        const titleMatch = p.title.toLowerCase().includes(normalizedQuery);
        const matchingClusters = p.clusters.filter(
          (c) =>
            c.title.toLowerCase().includes(normalizedQuery) ||
            c.slug.toLowerCase().includes(normalizedQuery)
        );
        if (titleMatch) return p;
        return { ...p, clusters: matchingClusters };
      })
      .filter((p) => p.title.toLowerCase().includes(normalizedQuery) || p.clusters.length > 0);
  }, [pillars, normalizedQuery]);

  const filteredPilotsEs = useMemo(() => {
    if (!normalizedQuery) return pilotsEs;
    return pilotsEs.filter(
      (p) => p.title.toLowerCase().includes(normalizedQuery) || p.slug.toLowerCase().includes(normalizedQuery)
    );
  }, [pilotsEs, normalizedQuery]);

  const filteredPilotsFr = useMemo(() => {
    if (!normalizedQuery) return pilotsFr;
    return pilotsFr.filter(
      (p) => p.title.toLowerCase().includes(normalizedQuery) || p.slug.toLowerCase().includes(normalizedQuery)
    );
  }, [pilotsFr, normalizedQuery]);

  const totalFilteredTools = filteredCategories.reduce((sum, c) => sum + c.tools.length, 0);
  const totalFilteredGuides = filteredPillars.reduce((sum, p) => sum + p.clusters.length + 1, 0);

  const base = siteConfig.url.replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${base}/sitemap`,
        name: "HTML Sitemap — All Tools, Guides & Pages",
        url: `${base}/sitemap`,
        description: `Complete HTML sitemap directory of Tool4SaaS with ${totalTools} free online tools, ${totalGuides} guides, and ${totalPilots} multilingual pilots.`,
        isPartOf: { "@type": "WebSite", "@id": `${base}#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Sitemap", item: `${base}/sitemap` },
        ],
      },
    ],
  };

  return (
    <Container maxWidth="xl" className="py-12 md:py-20 px-4 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Header & Breadcrumbs */}
      <Box className="mb-8">
        <Box
          component="nav"
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-4 text-base-content/70 text-[0.875rem]"
        >
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
          <Typography component="span" color="text.disabled" className="text-[0.875rem]">
            /
          </Typography>
          <Typography component="span" color="text.primary" className="font-semibold text-[0.875rem]">
            Sitemap
          </Typography>
        </Box>

        <Typography
          variant="overline"
          className="font-bold tracking-[0.15em] text-primary block"
        >
          COMPLETE DIRECTORY
        </Typography>
        <Typography
          component="h1"
          variant="h1"
          className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.5rem] font-extrabold text-base-content tracking-[-0.02em] mb-4"
        >
          HTML Sitemap
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          className="max-w-[840px] text-[1rem] md:text-[1.15rem] leading-[1.7] mb-6"
        >
          Explore the full ecosystem of {siteConfig.name}. Access all {totalTools} free browser-based tools
          grouped across 12 categories, {totalGuides} workflow guides and tutorials, {totalPilots} multilingual pilots,
          and public feeds.
        </Typography>

        {/* Stats Chips */}
        <Stack direction="row" spacing={1} useFlexGap className="mb-8 flex-wrap">
          <Chip label={`${totalTools} Free Tools`} color="primary" variant="outlined" className="font-semibold" />
          <Chip label="12 Categories" variant="outlined" className="font-semibold" />
          <Chip label={`${totalGuides} In-Depth Guides`} variant="outlined" className="font-semibold" />
          <Chip label={`${totalPilots} Localized Tools (ES & FR)`} variant="outlined" className="font-semibold" />
          <Chip label="Zero Sign-up · Local First" variant="outlined" className="font-semibold" />
        </Stack>

        {/* Search & Filter Controls */}
        <Box className="max-w-[650px] mb-8">
          <TextField
            fullWidth
            placeholder="Search tools, guides or pages (e.g. invoice, QR, PDF, tax)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: query ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setQuery("")} aria-label="Clear search">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
            
          />
          {query && (
            <Typography variant="body2" color="text.secondary" className="mt-2 font-medium">
              Found {totalFilteredTools} tool{totalFilteredTools === 1 ? "" : "s"} and {totalFilteredGuides} guide
              {totalFilteredGuides === 1 ? "" : "s"} matching &ldquo;{query}&rdquo;
            </Typography>
          )}
        </Box>

        {/* Navigation Quick Links */}
        <Box className="flex flex-wrap gap-2 mb-12">
          {[
            { id: "all", label: "Overview", href: "#" },
            { id: "tools", label: `Tools (${totalTools})`, href: "#tools" },
            { id: "guides", label: `Guides (${totalGuides})`, href: "#guides" },
            { id: "multilingual", label: `Multilingual (${totalPilots})`, href: "#multilingual" },
            { id: "categories", label: "Category Hubs", href: "#categories" },
            { id: "company", label: "Company & Legal", href: "#company" },
            { id: "feeds", label: "Technical Feeds", href: "#feeds" },
          ].map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => {
                if (item.id !== "all") {
                  setActiveSection(item.id as any);
                } else {
                  setActiveSection("all");
                }
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 40,
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid var(--color-base-300)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: activeSection === item.id ? 700 : 500,
                backgroundColor: activeSection === item.id ? "var(--color-base-content)" : "transparent",
                color: activeSection === item.id ? "var(--color-base-100)" : "inherit",
                transition: "all 150ms ease",
              }}
            >
              {item.label}
            </a>
          ))}
        </Box>
      </Box>

      {/* SECTION 1: TOOLS BY CATEGORY */}
      <Box component="section" id="tools" className="mb-20 scroll-mt-[96px]">
        <Box className="flex items-baseline justify-between mb-6">
          <Box>
            <Typography variant="overline" color="primary" className="font-bold">
              ONLINE UTILITIES
            </Typography>
            <Typography component="h2" variant="h2" className="text-[1.8rem] md:text-[2.3rem] font-extrabold">
              125 Free Online Tools by Category
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" className="hidden sm:block">
            100% Client-Side · No Sign-Up
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {filteredCategories.map((group) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={group.id}>
              <Box
                className="p-6 rounded-xl border border-base-300 bg-base-100 h-full flex flex-col hover:border-primary hover:[box-shadow:0_6px_20px_rgba(0,0,0,0.06)]" style={{ transition: "box-shadow 200ms ease, border-color 200ms ease" }}
              >
                <Box className="flex items-center justify-between mb-3">
                  <Typography
                    component="h3"
                    variant="h3"
                    className="text-[1.25rem] font-bold m-0"
                  >
                    <Link
                      href={`/category/${group.id}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {group.label}
                    </Link>
                  </Typography>
                  <Chip
                    label={`${group.tools.length} tools`}
                    size="small"
                    variant="outlined"
                    className="font-semibold text-[0.75rem]"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" className="mb-4 min-h-[38px]">
                  {group.description}
                </Typography>

                <Box
                  component="ul"
                  className="p-0 m-0 list-none grow flex flex-col gap-2.5"
                >
                  {group.tools.map((t) => (
                    <Box component="li" key={t.slug}>
                      <Link
                        href={`/${t.slug}`}
                        style={{
                          textDecoration: "none",
                          display: "block",
                          padding: "6px 10px",
                          borderRadius: "8px",
                          backgroundColor: "color-mix(in oklab, var(--color-base-content) 5%, transparent)",
                          transition: "background-color 150ms ease",
                        }}
                      >
                        <Typography
                          variant="body2"
                          className="font-semibold text-base-content hover:text-primary"
                        >
                          {t.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          className="line-clamp-1 overflow-hidden" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
                        >
                          {t.short}
                        </Typography>
                      </Link>
                    </Box>
                  ))}
                </Box>

                <Box className="mt-5 pt-3 border-base-300" style={{ borderTop: "1px dashed" }}>
                  <Link
                    href={`/category/${group.id}`}
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                      textDecoration: "none",
                    }}
                  >
                    View all {group.label} →
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* SECTION 2: GUIDES & ARTICLES */}
      <Box component="section" id="guides" className="mb-20 scroll-mt-[96px]">
        <Box className="flex items-baseline justify-between mb-6">
          <Box>
            <Typography variant="overline" color="primary" className="font-bold">
              KNOWLEDGE BASE
            </Typography>
            <Typography component="h2" variant="h2" className="text-[1.8rem] md:text-[2.3rem] font-extrabold">
              198 Guides &amp; Workflow Tutorials
            </Typography>
          </Box>
          <Link href="/guides" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
            Explore Guides Library →
          </Link>
        </Box>

        <Grid container spacing={3}>
          {filteredPillars.map((p) => (
            <Grid size={{ xs: 12, md: 6 }} key={p.pillar}>
              <Box
                className="p-6 rounded-xl border border-base-300 bg-base-100 h-full"
              >
                <Box className="flex items-center justify-between mb-2">
                  <Typography variant="overline" color="primary" className="font-bold">
                    {p.clusters.length + 1} ARTICLES
                  </Typography>
                  <Link
                    href={`/${p.toolSlug}`}
                    style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-base-content)", opacity: 0.7 }}
                  >
                    Open Tool ↗
                  </Link>
                </Box>
                <Typography component="h3" variant="h3" className="text-[1.3rem] font-bold mb-2">
                  <Link href={`/blog/${p.pillar}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {p.title}
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" className="mb-4">
                  {p.description}
                </Typography>

                <Box component="ul" className="m-0 pl-5 text-base-content/70 text-[0.9rem]">
                  <li style={{ marginBottom: 6 }}>
                    <Link href={`/blog/${p.pillar}`} style={{ fontWeight: 700 }}>
                      {p.title} (Core Pillar Guide)
                    </Link>
                  </li>
                  {p.clusters.map((c) => (
                    <li key={c.slug} style={{ marginBottom: 6 }}>
                      <Link href={`/blog/${p.pillar}/${c.slug}`} style={{ fontWeight: 500 }}>
                        {c.title}
                      </Link>
                      <Typography component="span" variant="caption" color="text.secondary">
                        {" "}· {c.readingMinutes} min read
                      </Typography>
                    </li>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* SECTION 3: MULTILINGUAL TOOLS */}
      <Box component="section" id="multilingual" className="mb-20 scroll-mt-[96px]">
        <Box className="mb-6">
          <Typography variant="overline" color="primary" className="font-bold">
            INTERNATIONAL PILOTS
          </Typography>
          <Typography component="h2" variant="h2" className="text-[1.8rem] md:text-[2.3rem] font-extrabold">
            32 Multilingual Tools (Español &amp; Français)
          </Typography>
          <Typography variant="body1" color="text.secondary" className="max-w-[760px] mt-2">
            Localized, native-language editions of our most popular utilities with localized formatting, regional tax
            support, and translated interfaces.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Spanish Hub */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              className="p-7 rounded-xl border border-base-300 bg-base-100 h-full"
            >
              <Box className="flex items-center justify-between mb-4">
                <Box className="flex items-center gap-3">
                  <Typography className="text-[1.5rem]" aria-hidden="true">
                    🇪🇸
                  </Typography>
                  <Typography component="h3" variant="h3" className="text-[1.3rem] font-bold">
                    <Link href="/es" style={{ color: "inherit", textDecoration: "none" }}>
                      Herramientas en Español
                    </Link>
                  </Typography>
                </Box>
                <Chip label={`${filteredPilotsEs.length} herramientas`} size="small" variant="outlined" />
              </Box>
              <Typography variant="body2" color="text.secondary" className="mb-5">
                Versiones en español adaptadas para España y Latinoamérica con IVA, IRPF y soporte offline.
              </Typography>
              <Grid container spacing={1.5}>
                {filteredPilotsEs.map((tool) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={tool.slug}>
                    <Link
                      href={tool.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        minHeight: 44,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        backgroundColor: "color-mix(in oklab, var(--color-base-content) 5%, transparent)",
                        textDecoration: "none",
                        color: "inherit",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      {tool.title}
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <Box className="mt-6 pt-4 border-base-300" style={{ borderTop: "1px dashed" }}>
                <Link href="/es" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  Ver centro en español (/es) →
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* French Hub */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              className="p-7 rounded-xl border border-base-300 bg-base-100 h-full"
            >
              <Box className="flex items-center justify-between mb-4">
                <Box className="flex items-center gap-3">
                  <Typography className="text-[1.5rem]" aria-hidden="true">
                    🇫🇷
                  </Typography>
                  <Typography component="h3" variant="h3" className="text-[1.3rem] font-bold">
                    <Link href="/fr" style={{ color: "inherit", textDecoration: "none" }}>
                      Outils en Français
                    </Link>
                  </Typography>
                </Box>
                <Chip label={`${filteredPilotsFr.length} outils`} size="small" variant="outlined" />
              </Box>
              <Typography variant="body2" color="text.secondary" className="mb-5">
                Utilitaires en français adaptés pour la France, la Belgique, la Suisse et le Canada.
              </Typography>
              <Grid container spacing={1.5}>
                {filteredPilotsFr.map((tool) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={tool.slug}>
                    <Link
                      href={tool.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        minHeight: 44,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        backgroundColor: "color-mix(in oklab, var(--color-base-content) 5%, transparent)",
                        textDecoration: "none",
                        color: "inherit",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      {tool.title}
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <Box className="mt-6 pt-4 border-base-300" style={{ borderTop: "1px dashed" }}>
                <Link href="/fr" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  Voir le centre en français (/fr) →
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* SECTION 4: CATEGORY HUBS */}
      <Box component="section" id="categories" className="mb-20 scroll-mt-[96px]">
        <Typography variant="overline" color="primary" className="font-bold">
          COLLECTIONS
        </Typography>
        <Typography component="h2" variant="h2" className="text-[1.8rem] md:text-[2.3rem] font-extrabold mb-6">
          12 Category Hub Pages
        </Typography>
        <Grid container spacing={2}>
          {categories.map((c) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={c.id}>
              <Link
                href={`/category/${c.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid var(--color-base-300)",
                  backgroundColor: "var(--color-base-100)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 150ms ease",
                }}
              >
                <Typography variant="subtitle1" className="font-bold text-base-content mb-1">
                  {c.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {c.count} verified tools · /category/{c.id}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* SECTION 5: COMPANY, LEGAL & TECHNICAL FEEDS */}
      <Grid container spacing={4} id="company" className="scroll-mt-[96px]">
        {/* Company & Legal */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            className="p-7 rounded-xl border border-base-300 bg-base-100 h-full"
          >
            <Typography variant="overline" color="primary" className="font-bold">
              ORGANIZATION &amp; GOVERNANCE
            </Typography>
            <Typography component="h3" variant="h3" className="text-[1.4rem] font-bold mb-4">
              Company, Trust &amp; Legal
            </Typography>
            <Box component="ul" className="p-0 m-0 list-none flex flex-col gap-4">
              {STATIC_PAGES.map((page) => (
                <Box component="li" key={page.href}>
                  <Link href={page.href} style={{ textDecoration: "none" }}>
                    <Typography variant="subtitle2" className="font-bold text-base-content">
                      {page.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {page.desc}
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Technical Feeds */}
        <Grid size={{ xs: 12, md: 6 }} id="feeds" className="scroll-mt-[96px]">
          <Box
            className="p-7 rounded-xl border border-base-300 bg-base-100 h-full"
          >
            <Typography variant="overline" color="primary" className="font-bold">
              CRAWLERS &amp; MACHINE READABILITY
            </Typography>
            <Typography component="h3" variant="h3" className="text-[1.4rem] font-bold mb-4">
              Technical Feeds &amp; Agent Discovery
            </Typography>
            <Box component="ul" className="p-0 m-0 list-none flex flex-col gap-4">
              {MACHINE_FEEDS.map((feed) => (
                <Box component="li" key={feed.href}>
                  <a href={feed.href} style={{ textDecoration: "none" }}>
                    <Typography variant="subtitle2" className="font-bold text-base-content">
                      {feed.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feed.desc}
                    </Typography>
                  </a>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
