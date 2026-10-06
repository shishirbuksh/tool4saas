import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

// Trust bar (text only, zero JS) + on-this-page jump links (server anchors).
export default function HomeNav() {
  return (
    <>
      {/* Trust bar — text only, zero JS */}
      <Box sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', borderBottom: '1px solid', py: 2 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', lineHeight: 1.7 }}>
            185 free tools · 12 categories · most run offline · no sign-up · <Link href="/methodology">how we test</Link> · <Link href="/about">about us</Link>
          </Typography>
        </Container>
      </Box>

      {/* On this page — jump links, server anchors only */}
      <Box component="nav" aria-label="On this page" sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', py: 1.5, contentVisibility: "auto", containIntrinsicSize: "auto 120px" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {[
              { href: "#popular", label: "Popular" },
              { href: "#categories", label: "Categories" },
              { href: "#tools", label: "All tools" },
              { href: "#what-is", label: "What is Tool4SaaS" },
              { href: "#popular-posts", label: "Popular posts" },
              { href: "#recent-posts", label: "Recent posts" },
              { href: "#faq", label: "FAQ" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 16px', borderRadius: 999, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}
              >
                {l.label}
              </Link>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
