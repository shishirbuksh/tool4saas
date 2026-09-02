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
        mt: 8,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ height: 2, background: "var(--mui-palette-primary-main)" }} />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BuildOutlinedIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {siteConfig.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Free, privacy-friendly productivity tools that run entirely in your
                browser. No account required.
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography component="h2" variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
              Categories
            </Typography>
            <Stack spacing={0.5} sx={{ color: "text.secondary" }}>
              {CATEGORIES.map((c) => (
                <Link key={c.id} href={`/category/${c.id}`} className="footer-link">
                  {c.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography component="h2" variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
              Popular Tools
            </Typography>
            <Stack spacing={0.5} sx={{ color: "text.secondary" }}>
              {popular.map((t) => (
                <Link key={t.slug} href={`/${t.slug}`} className="footer-link">
                  {t.title}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography component="h2" variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
              Company
            </Typography>
            <Stack spacing={0.5} sx={{ color: "text.secondary" }}>
              <Link href="/" className="footer-link">
                All Tools
              </Link>
              <Link href="/about" className="footer-link">
                About
              </Link>
              <Link href="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="footer-link">
                Terms of Service
              </Link>
              <Link href={`mailto:${siteConfig.email}`} className="footer-link">
                Contact
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            mt: 5,
            pt: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © {year} {siteConfig.name}. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Built with Next.js &amp; Material UI. Your data stays in your browser.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
