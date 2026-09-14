"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import { CATEGORIES, getTool, EXPECTED_TOOL_COUNT, EXPECTED_CATEGORY_COUNT } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

const popularSlugs = [
  "invoice-generator",
  "qr-code-generator",
  "word-counter",
  "password-generator",
  "json-formatter",
  "unit-converter",
  "color-converter",
  "age-calculator",
];

const popular = popularSlugs
  .map((s) => getTool(s))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

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
      <Container maxWidth="xl" sx={{ pt: { xs: 10, md: 14 }, pb: 8 }}>
        <Grid container spacing={7}>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Stack spacing={3}>
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
              <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.7, opacity: 0.85 }}>
                {EXPECTED_TOOL_COUNT} fast, local utilities for developers and creators. No sign-ups. Tool inputs run locally in your browser; ads and analytics are described in our Privacy Policy.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {EXPECTED_TOOL_COUNT} free tools across {EXPECTED_CATEGORY_COUNT} categories. ({CATEGORIES.length} categories live.)
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 2, lg: 3 }}>
            <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Categories
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1 }}>
              {CATEGORIES.map((c) => (
                <Box component="li" key={c.id}>
                  <Link href={`/category/${c.id}`} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 150ms ease' }}>
                      {c.label}
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 3, lg: 3 }}>
            <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Popular Tools
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1 }}>
              {popular.map((t) => (
                <Box component="li" key={t.slug}>
                  <Link href={`/${t.slug}`} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 150ms ease' }}>
                      {t.title}
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 3, lg: 3 }}>
            <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Company
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box component="li">
                <Link href="/" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 150ms ease' }}>
                    All Tools
                  </Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link href="/about" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 150ms ease' }}>
                    About Us
                  </Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link href="/privacy" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 150ms ease' }}>
                    Privacy Policy
                  </Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link href="/terms" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 150ms ease' }}>
                    Terms of Service
                  </Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link href={`mailto:${siteConfig.email}`} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 150ms ease' }}>
                    Contact Support
                  </Typography>
                </Link>
              </Box>
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
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            mt: 10,
            pt: 6,
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

        </Box>
      </Container>
    </Box>
  );
}
