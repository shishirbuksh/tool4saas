import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import { CATEGORIES, getTool } from "@/lib/tools";
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
      <Box sx={{ height: 4, background: "linear-gradient(90deg, var(--mui-palette-primary-main), var(--mui-palette-secondary-main))" }} />
      <Container maxWidth="xl" sx={{ pt: { xs: 8, md: 12 }, pb: 6 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ 
                  display: 'flex', 
                  p: 1, 
                  borderRadius: 2, 
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }}>
                  <BuildOutlinedIcon fontSize="small" />
                </Box>
                <Typography variant="h6" component="span" sx={{ fontWeight: 800, fontFamily: "var(--font-display), serif", letterSpacing: "-0.02em" }}>
                  {siteConfig.name}
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Premium, privacy-first productivity tools that run entirely in your
                browser. Fast, secure, and always free.
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 2, lg: 3 }}>
            <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Categories
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {CATEGORIES.map((c) => (
                <Box component="li" key={c.id}>
                  <Link href={`/category/${c.id}`} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
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
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {popular.map((t) => (
                <Box component="li" key={t.slug}>
                  <Link href={`/${t.slug}`} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
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
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box component="li">
                <Link href="/" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                    All Tools
                  </Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link href="/about" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                    About Us
                  </Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link href="/privacy" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                    Privacy Policy
                  </Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link href="/terms" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                    Terms of Service
                  </Typography>
                </Link>
              </Box>
              <Box component="li">
                <Link href={`mailto:${siteConfig.email}`} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>
                    Contact Support
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            mt: 8,
            pt: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            © {year} {siteConfig.name}. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Engineered with Next.js &amp; Material UI. Your data stays in your browser.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
