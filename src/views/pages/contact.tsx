import { Container, Typography, Box, Button } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { siteConfig } from "@/lib/site";
import ContactForm, { CopyEmailButton } from "@/components/ContactForm";

export default function ContactView() {
  return (
    <Container maxWidth="md" className="py-12">
      <Typography variant="h1" className="text-[2.25rem] mb-4">Contact Us</Typography>
      <Typography variant="body2" color="text.secondary" className="mb-6">
        Last updated: <time dateTime="2026-09-09">September 9, 2026</time>
      </Typography>
      <Box component="div" className="text-base-content/70 leading-[1.8]">
        <Typography className="block mb-2">
          Questions, feedback, or bug reports? Contact the <span translate="no">{siteConfig.name}</span> team at {siteConfig.email}. We read every message.
        </Typography>
        <Typography className="block mb-2">
          We aim to respond within 2 business days (Mon-Fri, UTC). For faster help, include the tool name and page URL, what you expected to happen, what actually happened, and your browser and device.
        </Typography>
        <Typography className="block mb-2">
          All tools work without an account — there is no login to troubleshoot. Please never send passwords, payment card numbers, private keys, or other sensitive secrets; test data only.
        </Typography>
      </Box>
      <Box className="mt-6 flex flex-wrap gap-4 items-center">
        <Button variant="contained" href={`mailto:${siteConfig.email}`}>
          Email {siteConfig.email}
        </Button>
        <CopyEmailButton />
      </Box>
      <ContactForm />
      <Box
        component="nav"
        aria-label="Related pages"
        className="mt-8 flex flex-wrap gap-4 text-base-content/70"
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
