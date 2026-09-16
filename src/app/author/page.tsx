import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { staticPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = staticPageMetadata({
  title: "Our Authors — Tool4SaaS Editorial Team",
  description:
    "Meet the Tool4SaaS editorial team: tools, finance, and health reviewers who build and test every free tool in-house for accuracy.",
  path: "/author",
});

const reviewers = [
  {
    initials: "TR",
    role: "Tools Reviewer",
    name: "Tools Reviewer",
    bio: "Tests developer and productivity tools against known samples for correct output. Verifies every tool runs locally in the browser with no sign-up required. Re-checks pages in current Chrome, Edge, Firefox, and Safari.",
  },
  {
    initials: "FR",
    role: "Finance Reviewer",
    name: "Finance Reviewer",
    bio: "Reviews finance calculators using a documented methodology: cross-check formulas against public references and sample inputs. Flags estimates as estimates, never financial advice. Re-verifies tax and interest logic when rules change.",
  },
  {
    initials: "HR",
    role: "Health Reviewer",
    name: "Health Reviewer",
    bio: "Checks health calculators for sane ranges and clear disclaimers. Confirms results encourage consulting a professional where appropriate. Validates metric/imperial conversions against reference values.",
  },
];

export default function AuthorPage() {
  const base = siteConfig.url.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${base}/author`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.author,
      url: base,
      member: reviewers.map((r) => ({
        "@type": "Person",
        name: `${r.name} — ${siteConfig.authorRole}`,
        url: `${base}/author`,
        jobTitle: r.role,
        description: r.bio,
      })),
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Typography variant="h1" sx={{ fontSize: "2.25rem", mb: 2 }}>
        Our authors
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 1, lineHeight: 1.8 }}>
        Reviewed by the <span translate="no">{siteConfig.authorRole}</span> — {siteConfig.authorBio}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Last updated: <time dateTime="2026-09-09">September 9, 2026</time>
      </Typography>

      <Box sx={{ display: "grid", gap: 2 }}>
        {reviewers.map((r) => (
          <Box
            key={r.role}
            component="section"
            aria-label={r.role}
            sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 3, bgcolor: "background.paper", display: "flex", gap: 2 }}
          >
            <Avatar sx={{ width: 48, height: 48, fontWeight: 700 }} aria-hidden="true">
              {r.initials}
            </Avatar>
            <Box>
              <Typography variant="h2" sx={{ fontSize: "1.25rem", mb: 0.5 }}>
                {r.role}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {r.bio}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        component="nav"
        aria-label="Related pages"
        sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 2, color: "text.secondary" }}
      >
        <Typography variant="body2">
          <Link href="/about">About us</Link>
        </Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2">
          <Link href="/methodology">How we test</Link>
        </Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2">
          <Link href="/contact">Contact us</Link>
        </Typography>
      </Box>
    </Container>
  );
}
