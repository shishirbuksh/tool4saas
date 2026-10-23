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
        sx={{
          color: "text.secondary",
          "&:hover": { color: "primary.main" },
          transition: "color 150ms ease",
        }}
      >
        {children}
      </Typography>
    </Link>
  );
}

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <Typography component="p" variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
      {children}
    </Typography>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

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
      <Container maxWidth="xl" sx={{ pt: { xs: 7, md: 9 }, pb: { xs: 4, md: 5 } }}>
        <Grid container spacing={{ xs: 4, md: 4 }}>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    p: 1,
                    borderRadius: "12px",
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    boxShadow: "0 1px 2px rgba(34,29,29,0.08)",
                  }}
                >
                  <BuildOutlinedIcon fontSize="small" aria-hidden="true" />
                </Box>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    fontWeight: 800,
                    fontFamily: "var(--font-display), serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {siteConfig.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 320 }}>
                {VISIBLE_TOOL_COUNT} fast, local utilities for developers and creators. No
                sign-ups — most tools run in your browser.
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
              <Box
                component="nav"
                aria-label="Languages"
                sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
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
                      sx={{
                        color: "text.secondary",
                        "&:hover": { color: "primary.main" },
                        transition: "color 150ms ease",
                      }}
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
              sx={{
                p: 0,
                m: 0,
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: 2,
              }}
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
              sx={{ p: 0, m: 0, listStyle: "none", display: "flex", flexDirection: "column" }}
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
              sx={{ p: 0, m: 0, listStyle: "none", display: "flex", flexDirection: "column" }}
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
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            mt: { xs: 5, md: 6 },
            pt: 3,
            pb: "max(16px, env(safe-area-inset-bottom))",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: "text.secondary" }}>
            © {year} {siteConfig.name}. All rights reserved.
          </Typography>
          <Box
            component="ul"
            sx={{
              p: 0,
              m: 0,
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 0.5, md: 1 },
              alignItems: "center",
            }}
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
              <FooterLink href="/llms.txt">llms.txt</FooterLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
