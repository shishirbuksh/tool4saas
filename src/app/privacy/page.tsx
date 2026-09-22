import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { staticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = staticPageMetadata({
  title: "Privacy Policy — Data Stays in Your Browser",
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
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>What we collect</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          Most tools run locally in your browser. The text, invoices, resumes and other content you generate are not transmitted to or stored on our servers. We do not collect or retain the content you create.
        </Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          Exceptions that do use the network: Currency Converter fetches rates from open.er-api.com, YouTube Thumbnail Downloader previews/downloads from img.youtube.com, SSL Checker proxies through api.allorigins.win to SSL Labs, and Speech to Text uses your browser&apos;s Web Speech API (Chrome/Edge send microphone audio to the browser vendor&apos;s cloud speech service for recognition). Each of these discloses your IP address and user agent — and for voice, audio — to that third party. All other tools listed as offline process files locally only.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Advertising</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          We use Google AdSense to display advertisements. AdSense may use cookies and unique identifiers to serve personalized ads based on your prior visits and other sites. Learn how Google uses information from sites that use its services at{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google ad technologies</a>. You can opt out of personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Analytics & logs</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          We use Google Analytics (G-JD0HNN61MF) to measure pageviews. Google receives your IP address, device and page visits. You can opt out with the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">GA opt-out add-on</a>{' '}
          or by sending <code>ga-disable-G-JD0HNN61MF=true</code>. Our hosting provider may also log standard request data such as IP address, browser type and pages visited to operate and secure the site. This data is not linked to the content you generate with our tools.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Contact</Typography>
        <Typography  sx={{ display: "block", mb: 1 }}>
          If you have questions about this policy, contact us at hello@tool4saas.com. You can request access or deletion of any analytics/log data linked to you, and you can withdraw ad/analytics consent at any time via the Cookie choices link in the footer.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Data controller</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          Tool4SaaS is the data controller for this website. Contact: hello@tool4saas.com. For privacy requests (access, erasure, portability, objection), email us with the subject “Privacy request” and include enough detail for us to locate any analytics/log data linked to you.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Legal basis (GDPR Art. 6)</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          We process personal data for advertising and analytics only with your consent under Art. 6(1)(a) GDPR, collected via our consent banner before non-essential cookies or tags load. Hosting/security logs are processed under Art. 6(1)(f) GDPR (legitimate interests in operating and securing the site). You may withdraw consent at any time via the Cookie choices link in the footer; withdrawal does not affect prior lawful processing.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Retention</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          Your consent choice (t4s-consent-v1) is stored for 12 months, then asked again. Analytics cookie/data retention follows Google’s settings on our property. Server/hosting logs are retained only as long as our hosting provider needs to operate and secure the site (per host policy) and are not linked to tool content you create.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>International transfers</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          Google AdSense and Google Analytics may process IP address and cookie identifiers in the United States. Where data leaves the EEA/UK, transfers rely on an adequacy mechanism or Standard Contractual Clauses (SCCs) under Google’s Data Processing Terms. See Google ad technologies and Google’s privacy documentation for details.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Your rights</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          Depending on your location (EEA/UK GDPR, US state laws), you may have rights of access, rectification, erasure, portability, restriction, and objection/opt-out of sale-sharing for ads. Exercise them by emailing hello@tool4saas.com; we respond within applicable statutory timelines. You can also withdraw ad/analytics consent anytime via the Cookie choices link in the footer, use Google Ads Settings, or the GA opt-out add-on above.
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Cookies</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          Non-essential cookies load only after consent. Essential choice storage is exempt:
        </Typography>
        <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mb: 1, fontSize: 14 }}>
          <Box component="thead">
            <Box component="tr">
              <Box component="th" sx={{ textAlign: "left", borderBottom: "1px solid", borderColor: "divider", pr: 2, py: 1 }}>Cookie</Box>
              <Box component="th" sx={{ textAlign: "left", borderBottom: "1px solid", borderColor: "divider", pr: 2, py: 1 }}>Purpose / provider</Box>
              <Box component="th" sx={{ textAlign: "left", borderBottom: "1px solid", borderColor: "divider", py: 1 }}>Duration</Box>
            </Box>
          </Box>
          <Box component="tbody">
            <Box component="tr">
              <Box component="td" sx={{ pr: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}><code>t4s-consent-v1</code></Box>
              <Box component="td" sx={{ pr: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}>Tool4SaaS consent choice (essential)</Box>
              <Box component="td" sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>12 months</Box>
            </Box>
            <Box component="tr">
              <Box component="td" sx={{ pr: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}><code>_ga</code></Box>
              <Box component="td" sx={{ pr: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}>Google Analytics (only with consent)</Box>
              <Box component="td" sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>24 months</Box>
            </Box>
            <Box component="tr">
              <Box component="td" sx={{ pr: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}><code>_ga_*</code></Box>
              <Box component="td" sx={{ pr: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}>Google Analytics session/measurement ID persistence</Box>
              <Box component="td" sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>24 months</Box>
            </Box>
            <Box component="tr">
              <Box component="td" sx={{ pr: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}><code>_gads / _gac_* / IDE / ANID / NID</code></Box>
              <Box component="td" sx={{ pr: 2, py: 1, borderBottom: "1px solid", borderColor: "divider" }}>Google AdSense/Ads personalization, frequency capping, fraud prevention (only with consent)</Box>
              <Box component="td" sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>Per Google (typically up to ~13–24 months)</Box>
            </Box>
          </Box>
        </Box>
        <Typography variant="h2" sx={{ fontSize: 18, color: "text.primary", mt: 2 }}>Consent management (CMP)</Typography>
        <Typography sx={{ display: "block", mb: 1 }}>
          We gate AdSense and Analytics tags behind our consent banner so non-essential storage loads only after opt-in. We are preparing a Google Funding Choices (TCF 2.2) integration for EEA/UK consent signalling; until then, use the footer Cookie choices link to change or withdraw consent, which takes effect on subsequent page loads.
        </Typography>
      </Box>
      <Box component="nav" aria-label="Related pages" sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Typography variant="body2"><Link href="/author">Our authors</Link></Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2"><Link href="/methodology">How we test</Link></Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2"><Link href="/contact">Contact us</Link></Typography>
      </Box>
    </Container>
  );
}
