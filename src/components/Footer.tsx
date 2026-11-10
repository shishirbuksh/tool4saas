import { Container, Typography, Grid, Stack, Button } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { MailIcon as EmailOutlinedIcon, WrenchIcon as BuildOutlinedIcon } from "@/components/ui/icons";
import type { ReactNode } from "react";
import { CATEGORIES } from "@/lib/tools/categories";
import { VISIBLE_TOOL_COUNT } from "@/lib/tools/counts";
// Server-only lite lookup: full Tool objects never enter the footer bundle.
import { liteGetTool } from "@/lib/tools/catalog-lite";
import { siteConfig } from "@/lib/site";

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
  { href: "/blog", label: "All Guides & Tutorials" },
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
    <footer className="bg-base-100 border-t border-base-300">
      <Container maxWidth="xl" className="pt-14 md:pt-18 pb-8 md:pb-10">
        <Grid container spacing={{ xs: 4, md: 4 }}>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Stack spacing={2}>
              <div className="flex items-center gap-3">
                <div
                  className="flex p-2 rounded-lg bg-primary text-primary-content shadow-xs"
                >
                  <BuildOutlinedIcon fontSize="small" aria-hidden="true" />
                </div>
                <Typography
                  variant="h6"
                  component="span"
                  className="font-semibold tracking-[-0.02em]"
                >
                  {siteConfig.name}
                </Typography>
              </div>
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
                className="self-start rounded-lg normal-case font-medium text-xs border-base-300 hover:border-base-content/40"
              >
                {siteConfig.email}
              </Button>
              
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ColumnHeading>Categories</ColumnHeading>
            <ul
              className="p-0 m-0 list-none grid grid-cols-[1fr_1fr] gap-x-4"
            >
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <FooterLink href={`/category/${c.id}`}>{c.label}</FooterLink>
                </li>
              ))}
            </ul>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <ColumnHeading>Popular tools</ColumnHeading>
            <ul
              className="p-0 m-0 list-none flex flex-col"
            >
              {popular.map((t) => (
                <li key={t.slug}>
                  <FooterLink href={`/${t.slug}`}>{t.title}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/#tools">View all tools →</FooterLink>
              </li>
            </ul>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <ColumnHeading>Learn</ColumnHeading>
            <ul
              className="p-0 m-0 list-none flex flex-col"
            >
              {GUIDES.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>

        <div
          className="border-t border-base-300 mt-10 md:mt-12 pt-6 pb-[max(16px,_env(safe-area-inset-bottom))] flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <Typography variant="body2" className="font-medium text-base-content/70">
            © {year} {siteConfig.name}. All rights reserved.
          </Typography>
          <ul
            className="p-0 m-0 list-none flex flex-wrap gap-1 md:gap-2 items-center"
            aria-label="Legal and privacy"
          >
            <li>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </li>
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">
              ·
            </Typography>
            <li>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </li>
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">
              ·
            </Typography>
            <li>
              <button
                type="button"
                data-consent-open
                className="footer-link footer-legal-button"
              >
                Cookie choices
              </button>
            </li>
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">
              ·
            </Typography>
            <li>
              <button
                type="button"
                data-consent-donotsell
                className="footer-link footer-legal-button"
              >
                Do Not Sell or Share
              </button>
            </li>
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">
              ·
            </Typography>
            <li>
              <FooterLink href="/sitemap">HTML Sitemap</FooterLink>
            </li>
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">
              ·
            </Typography>
            <li>
              <FooterLink href="/llms.txt">llms.txt</FooterLink>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
