import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { staticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = staticPageMetadata({
  title: "Privacy Policy",
  description:
    "How ToolKit Pro handles your data: everything runs locally in your browser and nothing is uploaded unless you download or print.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ fontSize: "2.25rem", mb: 2 }}>Privacy Policy</Typography>
      <Box sx={{ color: "text.secondary", lineHeight: 1.8 }}>
        <Typography  sx={{ display: "block", mb: 1 }}>
          <strong>Last updated:</strong> {new Date().getFullYear()}
        </Typography>
        <Typography variant="h3" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>What we collect</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          Our tools run locally in your browser. The text, invoices, resumes and other content you generate are not transmitted to or stored on our servers. We do not collect or retain the content you create.
        </Typography>
        <Typography variant="h3" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Advertising</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          We use Google AdSense to display advertisements. AdSense may use cookies and unique identifiers to serve personalized ads based on your prior visits and other sites. You can opt out of personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </Typography>
        <Typography variant="h3" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Analytics & logs</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          Our hosting provider may log standard request data such as IP address, browser type and pages visited to operate and secure the site. This data is not linked to the content you generate with our tools.
        </Typography>
        <Typography variant="h3" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Contact</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          If you have questions about this policy, please reach out through the contact details published on the site.
        </Typography>
      </Box>
    </Container>
  );
}
