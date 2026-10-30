import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@/lib/astro/navigation";
import { FAQS } from "@/content/home";

// Static FAQ accordion — zero JS, matches the FAQPage JSON-LD 1:1.
export default function HomeFaq() {
  return (
    <Box
      component="section"
      id="faq"
      aria-label="Frequently asked questions"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        py: { xs: 7, md: 10 },
        scrollMarginTop: 100,
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.75rem", md: "2.25rem" },
              fontWeight: 700,
              letterSpacing: "-0.025em",
              mb: 0.5,
            }}
          >
            Frequently asked questions
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: { xs: "0.9375rem", md: "1rem" } }}>
            Plain answers. Still stuck? <Link href="/contact">Contact us</Link>.
          </Typography>
        </Box>

        {FAQS.map((f, i) => (
          <Box
            key={f.q}
            component="details"
            open={i === 0}
            sx={{
              mb: 1,
              px: { xs: 2, md: 2.5 },
              py: { xs: 1.75, md: 2 },
              borderRadius: "12px",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.default",
              contentVisibility: "auto",
              containIntrinsicSize: "auto 64px",
              "&[open]": { borderColor: "rgba(0,0,0,0.16)" },
              'html[data-theme="dark"] &[open]': { borderColor: "rgba(255,255,255,0.2)" },
            }}
          >
            <Typography
              component="summary"
              sx={{
                fontSize: { xs: "0.9375rem", md: "1rem" },
                fontWeight: 600,
                cursor: "pointer",
                lineHeight: 1.4,
                "&:focus-visible": { outline: "3px solid", outlineOffset: "4px" },
              }}
            >
              {f.q}
            </Typography>
            <Typography
              color="text.secondary"
              className="speakable-faq-answer"
              sx={{ lineHeight: 1.7, mt: 1, fontSize: { xs: "0.875rem", md: "0.9375rem" } }}
            >
              {f.a}
            </Typography>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
