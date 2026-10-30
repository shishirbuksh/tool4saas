"use client";

import { useState, useMemo } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Link from "@/lib/astro/navigation";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
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
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Header & Breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Box
          component="nav"
          aria-label="Breadcrumb"
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, color: "text.secondary", fontSize: "0.875rem" }}
        >
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
          <Typography component="span" color="text.disabled" sx={{ fontSize: "0.875rem" }}>
            /
          </Typography>
          <Typography component="span" color="text.primary" sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
            Sitemap
          </Typography>
        </Box>

        <Typography
          variant="overline"
          sx={{ fontWeight: 700, letterSpacing: "0.15em", color: "primary.main", display: "block" }}
        >
          COMPLETE DIRECTORY
        </Typography>
        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
            fontWeight: 800,
            color: "text.primary",
            letterSpacing: "-0.02em",
            mb: 2,
          }}
        >
          HTML Sitemap
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 840, fontSize: { xs: "1rem", md: "1.15rem" }, lineHeight: 1.7, mb: 3 }}
        >
          Explore the full ecosystem of {siteConfig.name}. Access all {totalTools} free browser-based tools
          grouped across 12 categories, {totalGuides} workflow guides and tutorials, {totalPilots} multilingual pilots,
          and public feeds.
        </Typography>

        {/* Stats Chips */}
        <Stack direction="row" spacing={1} useFlexGap sx={{ mb: 4, flexWrap: "wrap" }}>
          <Chip label={`${totalTools} Free Tools`} color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
          <Chip label="12 Categories" variant="outlined" sx={{ fontWeight: 600 }} />
          <Chip label={`${totalGuides} In-Depth Guides`} variant="outlined" sx={{ fontWeight: 600 }} />
          <Chip label={`${totalPilots} Localized Tools (ES & FR)`} variant="outlined" sx={{ fontWeight: 600 }} />
          <Chip label="Zero Sign-up · Local First" variant="outlined" sx={{ fontWeight: 600 }} />
        </Stack>

        {/* Search & Filter Controls */}
        <Box sx={{ maxWidth: 650, mb: 4 }}>
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: "background.paper",
              },
            }}
          />
          {query && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
              Found {totalFilteredTools} tool{totalFilteredTools === 1 ? "" : "s"} and {totalFilteredGuides} guide
              {totalFilteredGuides === 1 ? "" : "s"} matching &ldquo;{query}&rdquo;
            </Typography>
          )}
        </Box>

        {/* Navigation Quick Links */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 6 }}>
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
                border: "1px solid var(--mui-palette-divider)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: activeSection === item.id ? 700 : 500,
                backgroundColor: activeSection === item.id ? "var(--mui-palette-action-selected)" : "transparent",
                color: "var(--mui-palette-text-primary)",
                transition: "all 150ms ease",
              }}
            >
              {item.label}
            </a>
          ))}
        </Box>
      </Box>

      {/* SECTION 1: TOOLS BY CATEGORY */}
      <Box component="section" id="tools" sx={{ mb: 10, scrollMarginTop: 96 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
              ONLINE UTILITIES
            </Typography>
            <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" }, fontWeight: 800 }}>
              125 Free Online Tools by Category
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", sm: "block" } }}>
            100% Client-Side · No Sign-Up
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {filteredCategories.map((group) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={group.id}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 200ms ease, border-color 200ms ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                  <Typography
                    component="h3"
                    variant="h3"
                    sx={{ fontSize: "1.25rem", fontWeight: 700, m: 0 }}
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
                    sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 38 }}>
                  {group.description}
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    p: 0,
                    m: 0,
                    listStyle: "none",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.25,
                  }}
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
                          backgroundColor: "var(--mui-palette-action-hover)",
                          transition: "background-color 150ms ease",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            "&:hover": { color: "primary.main" },
                          }}
                        >
                          {t.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {t.short}
                        </Typography>
                      </Link>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ mt: 2.5, pt: 1.5, borderTop: "1px dashed", borderColor: "divider" }}>
                  <Link
                    href={`/category/${group.id}`}
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--mui-palette-primary-main)",
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
      <Box component="section" id="guides" sx={{ mb: 10, scrollMarginTop: 96 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
              KNOWLEDGE BASE
            </Typography>
            <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" }, fontWeight: 800 }}>
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
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  height: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
                    {p.clusters.length + 1} ARTICLES
                  </Typography>
                  <Link
                    href={`/${p.toolSlug}`}
                    style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--mui-palette-text-secondary)" }}
                  >
                    Open Tool ↗
                  </Link>
                </Box>
                <Typography component="h3" variant="h3" sx={{ fontSize: "1.3rem", fontWeight: 700, mb: 1 }}>
                  <Link href={`/blog/${p.pillar}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {p.title}
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {p.description}
                </Typography>

                <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.secondary", fontSize: "0.9rem" }}>
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
      <Box component="section" id="multilingual" sx={{ mb: 10, scrollMarginTop: 96 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
            INTERNATIONAL PILOTS
          </Typography>
          <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" }, fontWeight: 800 }}>
            32 Multilingual Tools (Español &amp; Français)
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mt: 1 }}>
            Localized, native-language editions of our most popular utilities with localized formatting, regional tax
            support, and translated interfaces.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Spanish Hub */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 3.5,
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography sx={{ fontSize: "1.5rem" }} aria-hidden="true">
                    🇪🇸
                  </Typography>
                  <Typography component="h3" variant="h3" sx={{ fontSize: "1.3rem", fontWeight: 700 }}>
                    <Link href="/es" style={{ color: "inherit", textDecoration: "none" }}>
                      Herramientas en Español
                    </Link>
                  </Typography>
                </Box>
                <Chip label={`${filteredPilotsEs.length} herramientas`} size="small" variant="outlined" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
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
                        backgroundColor: "var(--mui-palette-action-hover)",
                        textDecoration: "none",
                        color: "var(--mui-palette-text-primary)",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      {tool.title}
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 3, pt: 2, borderTop: "1px dashed", borderColor: "divider" }}>
                <Link href="/es" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  Ver centro en español (/es) →
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* French Hub */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 3.5,
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography sx={{ fontSize: "1.5rem" }} aria-hidden="true">
                    🇫🇷
                  </Typography>
                  <Typography component="h3" variant="h3" sx={{ fontSize: "1.3rem", fontWeight: 700 }}>
                    <Link href="/fr" style={{ color: "inherit", textDecoration: "none" }}>
                      Outils en Français
                    </Link>
                  </Typography>
                </Box>
                <Chip label={`${filteredPilotsFr.length} outils`} size="small" variant="outlined" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
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
                        backgroundColor: "var(--mui-palette-action-hover)",
                        textDecoration: "none",
                        color: "var(--mui-palette-text-primary)",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      {tool.title}
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 3, pt: 2, borderTop: "1px dashed", borderColor: "divider" }}>
                <Link href="/fr" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                  Voir le centre en français (/fr) →
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* SECTION 4: CATEGORY HUBS */}
      <Box component="section" id="categories" sx={{ mb: 10, scrollMarginTop: 96 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          COLLECTIONS
        </Typography>
        <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" }, fontWeight: 800, mb: 3 }}>
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
                  border: "1px solid var(--mui-palette-divider)",
                  backgroundColor: "var(--mui-palette-background-paper)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 150ms ease",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}>
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
      <Grid container spacing={4} id="company" sx={{ scrollMarginTop: 96 }}>
        {/* Company & Legal */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              p: 3.5,
              borderRadius: "16px",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              height: "100%",
            }}
          >
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
              ORGANIZATION &amp; GOVERNANCE
            </Typography>
            <Typography component="h3" variant="h3" sx={{ fontSize: "1.4rem", fontWeight: 700, mb: 2 }}>
              Company, Trust &amp; Legal
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
              {STATIC_PAGES.map((page) => (
                <Box component="li" key={page.href}>
                  <Link href={page.href} style={{ textDecoration: "none" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary" }}>
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
        <Grid size={{ xs: 12, md: 6 }} id="feeds" sx={{ scrollMarginTop: 96 }}>
          <Box
            sx={{
              p: 3.5,
              borderRadius: "16px",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              height: "100%",
            }}
          >
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
              CRAWLERS &amp; MACHINE READABILITY
            </Typography>
            <Typography component="h3" variant="h3" sx={{ fontSize: "1.4rem", fontWeight: 700, mb: 2 }}>
              Technical Feeds &amp; Agent Discovery
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
              {MACHINE_FEEDS.map((feed) => (
                <Box component="li" key={feed.href}>
                  <a href={feed.href} style={{ textDecoration: "none" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary" }}>
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
