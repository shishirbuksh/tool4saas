import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { staticPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import ContactForm, { CopyEmailButton } from "@/components/ContactForm";

export const metadata: Metadata = staticPageMetadata({
  title: "Contact Tool4SaaS — Help, Feedback & Bugs",
  description:
    "Contact the Tool4SaaS team for support, feedback, or bug reports — we read every message and reply within 2 business days (Mon-Fri, UTC).",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ fontSize: "2.25rem", mb: 2 }}>Contact Us</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Last updated: <time dateTime="2026-09-09">September 9, 2026</time>
      </Typography>
      <Box component="div" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        <Typography sx={{ display: "block", mb: 1 }}>
          Questions, feedback, or bug reports? Contact the <span translate="no">{siteConfig.name}</span> team at {siteConfig.email}. We read every message.
        </Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          We aim to respond within 2 business days (Mon-Fri, UTC). For faster help, include the tool name and page URL, what you expected to happen, what actually happened, and your browser and device.
        </Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          All tools work without an account — there is no login to troubleshoot. Please never send passwords, payment card numbers, private keys, or other sensitive secrets; test data only.
        </Typography>
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
        <Button variant="contained" href={`mailto:${siteConfig.email}`}>
          Email {siteConfig.email}
        </Button>
        <CopyEmailButton />
      </Box>
      <ContactForm />
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
          <Link href="/privacy">Privacy Policy</Link>
        </Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2">
          <Link href="/terms">Terms of Service</Link>
        </Typography>
      </Box>
    </Container>
  );
}
