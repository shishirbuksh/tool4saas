import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { staticPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = staticPageMetadata({
  title: "About",
  description:
    "Tool4SaaS is a free, privacy-friendly collection of browser-based productivity tools. Learn how and why we built it.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ fontSize: "2.25rem", mb: 2 }}>About <span translate="no">{siteConfig.name}</span></Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Last updated: <time dateTime="2026-09-09">September 9, 2026</time>
      </Typography>
      <Box component="div" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        <Typography  sx={{ display: "block", mb: 1 }}>
          <span translate="no">{siteConfig.name}</span> is a collection of free, privacy-friendly productivity tools that run entirely in your browser. We built it because great tools shouldn&apos;t require an account, a subscription, or handing over your data.
        </Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          Every tool — from the invoice generator to the word counter — processes your input locally on your device. Nothing you type is uploaded to our servers unless you explicitly download or print the result.
        </Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          We keep the service free by displaying advertisements. This helps us cover hosting and continue improving the toolkit. Thank you for using it.
        </Typography>
      </Box>
      <Box
        component="section"
        aria-label="Founder story"
        sx={{ mt: 4, p: 3, border: "1px solid", borderColor: "divider", borderRadius: 3, bgcolor: "background.paper" }}
      >
        <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, color: "text.primary" }}>Why I built this</Typography>
        <Typography sx={{ display: "block", mb: 1, color: "text.secondary", lineHeight: 1.8 }}>
          I started <span translate="no">{siteConfig.name}</span> because I kept hitting the same wall: I needed a quick invoice, a QR code, or a word count, and every site asked me to sign up or upload my files first. I wanted tools that just work — open the page, get it done, leave nothing behind.
        </Typography>
        <Typography sx={{ display: "block", color: "text.secondary", lineHeight: 1.8 }}>
          So I built every tool to run locally in your browser. Your text, invoices, and images never leave your device. That constraint makes the work harder, but it is the whole point — and why I keep <span translate="no">{siteConfig.name}</span> free and privacy-first.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          — Founder, <span translate="no">{siteConfig.name}</span> · <time dateTime="2026-09-09">September 9, 2026</time>
        </Typography>
      </Box>
      <Box
        component="section"
        aria-label="About the author"
        sx={{ mt: 3, p: 3, border: "1px solid", borderColor: "divider", borderRadius: 3 }}
      >
        <Typography variant="h2" sx={{ fontSize: "1.25rem", mb: 1, color: "text.primary" }}>About the author</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          Written and maintained by the <span translate="no">{siteConfig.name}</span> team ({siteConfig.author}). We build and test every tool in-house, review guides for accuracy, and update pages as tools improve. Contact: {siteConfig.email}. Reviewed: <time dateTime="2026-09-09">September 9, 2026</time>.
        </Typography>
      </Box>
    </Container>
  );
}
