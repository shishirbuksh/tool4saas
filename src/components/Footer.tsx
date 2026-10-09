"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Button from "@mui/material/Button";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import type { ReactNode } from "react";
import { CATEGORIES, EXPECTED_TOOL_COUNT } from "@/lib/tools";
// Lite lookup: full Tool objects (guide bodies) must never enter the footer chunk.
import { liteGetTool } from "@/lib/tools/catalog-lite";
import { siteConfig } from "@/lib/site";

const popularSlugs = [
  "invoice-generator",
  "qr-code-generator",
  "word-counter",
  "password-generator",
  "json-formatter",
  "mortgage-calculator",
  "emi-calculator",
  "sip-calculator",
];

const popular = popularSlugs
  .map((s) => liteGetTool(s))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

const GUIDES = [
  { href: "/blog/invoice-generator-guide", label: "Invoice Generator Guide" },
  { href: "/blog/qr-code-generator-guide", label: "QR Code Generator Guide" },
  { href: "/blog/resume-builder-guide", label: "Resume Builder Guide" },
  { href: "/blog/mortgage-calculator-guide", label: "Mortgage Calculator Guide" },
  { href: "/blog/password-generator-guide", label: "Password Generator Guide" },
  { href: "/blog/word-counter-guide", label: "Word Counter Guide" },
];

const COMPANY = [
  { href: "/", label: "All Tools" },
  { href: "/about", label: "About Us" },
  { href: "/author", label: "Author" },
  { href: "/methodology", label: "Methodology" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
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
      <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 150ms ease' }}>
        {children}
      </Typography>
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const handleDoNotSell = () => {
    // CCPA/CPRA opt-out: force denied (covers GPC/DNT intent), then open choices.
    try {
      const c = { ad_storage: "denied", analytics_storage: "denied", ts: Date.now() };
      try {
        localStorage.setItem("t4s-consent-v1", JSON.stringify(c));
      } catch {
        /* ignore storage failures */
      }
      try {
        const w = window as unknown as {
          gtag?: (...a: unknown[]) => void;
          [key: string]: unknown;
        };
        if (typeof w.gtag === "function") {
          w.gtag("consent", "update", {
            ad_storage: "denied",
            analytics_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
          });
        }
        w["ga-disable-" + siteConfig.gaId] = true;
      } catch {
        /* ignore gtag failures */
      }
      try {
        window.dispatchEvent(new CustomEvent("t4s:consent-updated", { detail: c }));
      } catch {
        /* ignore */
      }
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event("t4s:open-cookie-choices"));
  };
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ height: 4, background: "var(--brand-gradient)" }} aria-hidden="true" />
      <Container maxWidth="xl" sx={{ pt: { xs: 8, md: 10 }, pb: 6 }}>
        <Grid container spacing={{ xs: 5, md: 4 }}>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Stack spacing={2.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{
                  display: 'flex',
                  p: 1,
                  borderRadius: "12px",
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  boxShadow: '0 1px 2px rgba(34,29,29,0.08)',
                }}>
                  <BuildOutlinedIcon fontSize="small" aria-hidden="true" />
                </Box>
                <Typography variant="h6" component="span" sx={{ fontWeight: 800, fontFamily: "var(--font-display), serif", letterSpacing: "-0.02em" }}>
                  {siteConfig.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 320 }}>
                {EXPECTED_TOOL_COUNT} fast, local utilities for developers and creators. No sign-ups — most
                tools run in your browser (see <Link href="/privacy" className="footer-link" style={{ textDecoration: "underline" }}>/privacy</Link>).
              </Typography>
              <Button
                component="a"
                href={`mailto:${siteConfig.email}`}
                variant="outlined"
                size="small"
                startIcon={<EmailOutlinedIcon fontSize="small" aria-hidden="true" />}
                sx={{ alignSelf: "flex-start", borderRadius: 999, textTransform: "none" }}
              >
                {siteConfig.email}
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Categories
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2 }}>
              {CATEGORIES.map((c) => (
                <Box component="li" key={c.id}>
                  <FooterLink href={`/category/${c.id}`}>{c.label}</FooterLink>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Popular Tools
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
              {popular.map((t) => (
                <Box component="li" key={t.slug}>
                  <FooterLink href={`/${t.slug}`}>{`${t.title} – Free`}</FooterLink>
                </Box>
              ))}
              <Box component="li">
                <FooterLink href="/">View all tools →</FooterLink>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 2 }}>
            <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Company
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
              {COMPANY.map((l) => (
                <Box component="li" key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 2 }}>
            <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Guides
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
              {GUIDES.map((l) => (
                <Box component="li" key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </Box>
              ))}
              <Box component="li">
                <FooterLink href="/llms.txt">llms.txt (for AI)</FooterLink>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            mt: 6,
            pt: 3,
            pb: 'max(16px, env(safe-area-inset-bottom))',
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            © {year} {siteConfig.name}. All rights reserved.
          </Typography>
          <Box
            component="ul"
            sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: { xs: 0.5, md: 1 }, alignItems: 'center' }}
            aria-label="Legal and privacy"
          >
            <Box component="li">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </Box>
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">·</Typography>
            <Box component="li">
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </Box>
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">·</Typography>
            <Box component="li">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("t4s:open-cookie-choices"))}
                className="footer-link"
                style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 150ms ease' }}>
                  Cookie choices
                </Typography>
              </button>
            </Box>
            <Typography component="li" aria-hidden="true" variant="body2" color="text.secondary">·</Typography>
            <Box component="li">
              <button
                type="button"
                onClick={handleDoNotSell}
                className="footer-link"
                style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 150ms ease' }}>
                  Do Not Sell or Share
                </Typography>
              </button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
