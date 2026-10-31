import { Box, Container, Typography, Grid, Stack, Button } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { EmailOutlined as EmailOutlinedIcon, BuildOutlined as BuildOutlinedIcon } from "@/components/ds/icons";
import type { ReactNode } from "react";
import { CATEGORIES } from "@/lib/tools/categories";
import { VISIBLE_TOOL_COUNT } from "@/lib/tools/counts";
// Server-only lite lookup: full Tool objects never enter the footer bundle.
import { liteGetTool } from "@/lib/tools/catalog-lite";
import { siteConfig } from "@/lib/site";
import FooterConsentActions from "@/components/FooterConsentActions";

const popularSlugs = [
  "invoice-generator",
  "qr-code-generator",
  "word-counter",
  "json-formatter",
  "mortgage-calculator",
  "resume-builder",
];

const popular = popularSlugs
  .map((s) => liteGetTool(s))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

const GUIDES = [
  { href: "/guides", label: "All Guides & Tutorials" },
  { href: "/blog/word-counter-guide", label: "Word Counter Guide" },
  { href: "/blog/invoice-generator-guide", label: "Invoice Generator Guide" },
  { href: "/blog/qr-code-generator-guide", label: "QR Code Generator Guide" },
  { href: "/blog/resume-builder-guide", label: "Resume Builder Guide" },
];

const COMPANY = [
  { href: "/about", label: "About Us" },
  { href: "/author", label: "Author" },
  { href: "/methodology", label: "Methodology" },
  { href: "/contact", label: "Contact Us" },
  { href: "/sitemap", label: "HTML Sitemap" },
];

const LANGUAGES = [
  { href: "/", label: "English", hrefLang: "en" },
  { href: "/es", label: "Español", hrefLang: "es" },
  { href: "/fr", label: "Français", hrefLang: "fr" },
];

const linkStyle = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: "44px",
  textDecoration: "none",
} as const;

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="footer-link" style={linkStyle}>
      <Typography
        variant="body2"
        className="text-base-content/70 hover:text-primary" style={{ transition: "color 150ms ease" }}
      >
        {children}
      </Typography>
    </Link>
  );
}

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <Typography component="p" variant="subtitle1" className="font-bold mb-3">
      {children}
    </Typography>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      className="bg-base-100 border-t border-base-300"
    >
      <Box className="h-[4px]" style={{ background: "var(--brand-gradient)" }} aria-hidden="true" />
      <Container maxWidth="xl" className="pt-14 md:pt-18 pb-8 md:pb-10">
        <Grid container spacing={{ xs: 4, md: 4 }}>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Stack spacing={2}>
              <Box className="flex items-center gap-3">
                <Box
                  className="flex p-2 rounded-[12px] bg-primary" style={{ color: "var(--color-primary-content)", boxShadow: "0 1px 2px rgba(34,29,29,0.08)" }}
                >
                  <BuildOutlinedIcon fontSize="small" aria-hidden="true" />
                </Box>
                <Typography
                  variant="h6"
                  component="span"
                  className="font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display), serif" }}
                >
                  {siteConfig.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" className="leading-[1.7] max-w-[320px]">
                {VISIBLE_TOOL_COUNT} fast, local utilities for developers and creators. No
                sign-ups — most tools run in your browser.
              </Typography>
              <Button
                component="a"
                href={`mailto:${siteConfig.email}`}
                variant="outlined"
                size="small"
                startIcon={<EmailOutlinedIcon fontSize="small" aria-hidden="true" />}
                className="self-start rounded-[7992px] normal-case"
              >
                {siteConfig.email}
              </Button>
              <Box
                component="nav"
                aria-label="Languages"
                className="flex items-center flex-wrap gap-3"
              >
                <Typography variant="body2" color="text.secondary" className="font-semibold">
                  Languages:
                </Typography>
                {LANGUAGES.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    hrefLang={l.hrefLang}
                    lang={l.hrefLang}
                    className="footer-link"
                    style={linkStyle}
                  >
                    <Typography
                      variant="body2"
                      className="text-base-content/70 hover:text-primary" style={{ transition: "color 150ms ease" }}
                    >
                      {l.label}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ColumnHeading>Categories</ColumnHeading>
            <Box
              component="ul"
              className="p-0 m-0 list-none grid grid-cols-[1fr_1fr] gap-x-4"
            >
              {CATEGORIES.map((c) => (
                <Box component="li" key={c.id}>
                  <FooterLink href={`/category/${c.id}`}>{c.label}</FooterLink>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <ColumnHeading>Popular tools</ColumnHeading>
            <Box
              component="ul"
              className="p-0 m-0 list-none flex flex-col"
            >
              {popular.map((t) => (
                <Box component="li" key={t.slug}>
                  <FooterLink href={`/${t.slug}`}>{t.title}</FooterLink>
                </Box>
              ))}
              <Box component="li">
                <FooterLink href="/#tools">View all tools →</FooterLink>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <ColumnHeading>Learn</ColumnHeading>
            <Box
              component="ul"
              className="p-0 m-0 list-none flex flex-col"
            >
              {GUIDES.map((l) => (
                <Box component="li" key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </Box>
              ))}
              {COMPANY.map((l) => (
                <Box component="li" key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box
          className="border-t border-base-300 mt-10 md:mt-12 pt-6 pb-[max(16px,_env(safe-area-inset-bottom))] flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <Typography variant="body2" className="font-medium text-base-content/70">
            © {year} {siteConfig.name}. All rights reserved.
          </Typography>
          <Box
            component="ul"
            className="p-0 m-0 list-none flex flex-wrap gap-1 md:gap-2 items-center"
            aria-label="Legal and privacy"
          >
            <Box component="li">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </Box>
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">
              ·
            </Typography>
            <Box component="li">
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </Box>
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">
              ·
            </Typography>
            <FooterConsentActions />
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">
              ·
            </Typography>
            <Box component="li">
              <FooterLink href="/sitemap">HTML Sitemap</FooterLink>
            </Box>
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">
              ·
            </Typography>
            <Box component="li">
              <FooterLink href="/llms.txt">llms.txt</FooterLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
