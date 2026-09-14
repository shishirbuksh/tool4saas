import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { staticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = staticPageMetadata({
  title: "Privacy Policy",
  description:
    "How Tool4SaaS handles your data: everything runs locally in your browser and nothing is uploaded unless you download or print.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ fontSize: "2.25rem", mb: 2 }}>Privacy Policy</Typography>
      <Box sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        <Typography  sx={{ display: "block", mb: 1 }}>
          <strong>Last updated:</strong> <time dateTime="2026-09-09">September 9, 2026</time>
        </Typography>
        <Typography variant="h3" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>What we collect</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          Most tools run locally in your browser. The text, invoices, resumes and other content you generate are not transmitted to or stored on our servers. We do not collect or retain the content you create.
        </Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          Exceptions that do use the network: Currency Converter fetches rates from open.er-api.com, YouTube Thumbnail Downloader previews/downloads from img.youtube.com, SSL Checker proxies through api.allorigins.win to SSL Labs, and Speech to Text uses your browser&apos;s Web Speech API (Chrome/Edge send microphone audio to the browser vendor&apos;s cloud speech service for recognition). Each of these discloses your IP address and user agent — and for voice, audio — to that third party. All other tools listed as offline process files locally only.
        </Typography>
        <Typography variant="h3" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Advertising</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          We use Google AdSense to display advertisements. AdSense may use cookies and unique identifiers to serve personalized ads based on your prior visits and other sites. Learn how Google uses information from sites that use its services at{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google ad technologies</a>. You can opt out of personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </Typography>
        <Typography variant="h3" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Analytics & logs</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          We use Google Analytics (G-JD0HNN61MF) to measure pageviews. Google receives your IP address, device and page visits. You can opt out with the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">GA opt-out add-on</a>{' '}
          or by sending <code>ga-disable-G-JD0HNN61MF=true</code>. Our hosting provider may also log standard request data such as IP address, browser type and pages visited to operate and secure the site. This data is not linked to the content you generate with our tools.
        </Typography>
        <Typography variant="h3" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Contact</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          If you have questions about this policy, contact us at hello@tool4saas.com. You can request access or deletion of any analytics/log data linked to you, and you can withdraw ad/analytics consent at any time via the Cookie choices link in the footer.
        </Typography>
      </Box>
    </Container>
  );
}
