import { Container, Typography, Box } from "@/components/ds";

import Link from "@/lib/astro/navigation";

export default function PrivacyView() {
  return (
    <Container maxWidth="md" className="py-12">
      <Typography variant="h1" className="text-[2.25rem] mb-4">Privacy Policy</Typography>
      <Box className="text-base-content/70 leading-[1.8]">
        <Typography className="block mb-2">
          <strong>Last updated:</strong> <time dateTime="2026-09-09">September 9, 2026</time>
        </Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">What we collect</Typography>
        <Typography className="block mb-2">
          Most tools run locally in your browser. The text, invoices, resumes and other content you generate are not transmitted to or stored on our servers. We do not collect or retain the content you create.
        </Typography>
        <Typography className="block mb-2">
          Exceptions that do use the network: Currency Converter fetches rates from open.er-api.com, YouTube Thumbnail Downloader previews/downloads from img.youtube.com, SSL Checker proxies through api.allorigins.win to SSL Labs, and Speech to Text uses your browser&apos;s Web Speech API (Chrome/Edge send microphone audio to the browser vendor&apos;s cloud speech service for recognition). Each of these discloses your IP address and user agent — and for voice, audio — to that third party. All other tools listed as offline process files locally only.
        </Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Advertising</Typography>
        <Typography className="block mb-2">
          We use Google AdSense to display advertisements. AdSense may use cookies and unique identifiers to serve personalized ads based on your prior visits and other sites. Learn how Google uses information from sites that use its services at{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google ad technologies</a>. You can opt out of personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Analytics & logs</Typography>
        <Typography className="block mb-2">
          We use Google Analytics (G-JD0HNN61MF) to measure pageviews. Google receives your IP address, device and page visits. You can opt out with the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">GA opt-out add-on</a>{' '}
          or by sending <code>ga-disable-G-JD0HNN61MF=true</code>. Our hosting provider may also log standard request data such as IP address, browser type and pages visited to operate and secure the site. This data is not linked to the content you generate with our tools.
        </Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Contact</Typography>
        <Typography className="block mb-2">
          If you have questions about this policy, contact us at hello@tool4saas.com. You can request access or deletion of any analytics/log data linked to you, and you can withdraw ad/analytics consent at any time via the Cookie choices link in the footer.
        </Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Data controller</Typography>
        <Typography className="block mb-2">
          Tool4SaaS is the data controller for this website. Contact: hello@tool4saas.com. For privacy requests (access, erasure, portability, objection), email us with the subject “Privacy request” and include enough detail for us to locate any analytics/log data linked to you.
        </Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Legal basis (GDPR Art. 6)</Typography>
        <Typography className="block mb-2">
          We process personal data for advertising and analytics only with your consent under Art. 6(1)(a) GDPR, collected via our consent banner before non-essential cookies or tags load. Hosting/security logs are processed under Art. 6(1)(f) GDPR (legitimate interests in operating and securing the site). You may withdraw consent at any time via the Cookie choices link in the footer; withdrawal does not affect prior lawful processing.
        </Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Retention</Typography>
        <Typography className="block mb-2">
          Your consent choice (t4s-consent-v1) is stored for 12 months, then asked again. Analytics cookie/data retention follows Google’s settings on our property. Server/hosting logs are retained only as long as our hosting provider needs to operate and secure the site (per host policy) and are not linked to tool content you create.
        </Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">International transfers</Typography>
        <Typography className="block mb-2">
          Google AdSense and Google Analytics may process IP address and cookie identifiers in the United States. Where data leaves the EEA/UK, transfers rely on an adequacy mechanism or Standard Contractual Clauses (SCCs) under Google’s Data Processing Terms. See Google ad technologies and Google’s privacy documentation for details.
        </Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Your rights</Typography>
        <Typography className="block mb-2">
          Depending on your location (EEA/UK GDPR, US state laws), you may have rights of access, rectification, erasure, portability, restriction, and objection/opt-out of sale-sharing for ads. Exercise them by emailing hello@tool4saas.com; we respond within applicable statutory timelines. You can also withdraw ad/analytics consent anytime via the Cookie choices link in the footer, use Google Ads Settings, or the GA opt-out add-on above.
        </Typography>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Cookies</Typography>
        <Typography className="block mb-2">
          Non-essential cookies load only after consent. Essential choice storage is exempt:
        </Typography>
        <Box component="table" className="w-full border-collapse mb-2 text-[14px]">
          <Box component="thead">
            <Box component="tr">
              <Box component="th" className="text-left border-b border-base-300 pr-4 py-2">Cookie</Box>
              <Box component="th" className="text-left border-b border-base-300 pr-4 py-2">Purpose / provider</Box>
              <Box component="th" className="text-left border-b border-base-300 py-2">Duration</Box>
            </Box>
          </Box>
          <Box component="tbody">
            <Box component="tr">
              <Box component="td" className="pr-4 py-2 border-b border-base-300"><code>t4s-consent-v1</code></Box>
              <Box component="td" className="pr-4 py-2 border-b border-base-300">Tool4SaaS consent choice (essential)</Box>
              <Box component="td" className="py-2 border-b border-base-300">12 months</Box>
            </Box>
            <Box component="tr">
              <Box component="td" className="pr-4 py-2 border-b border-base-300"><code>_ga</code></Box>
              <Box component="td" className="pr-4 py-2 border-b border-base-300">Google Analytics (only with consent)</Box>
              <Box component="td" className="py-2 border-b border-base-300">24 months</Box>
            </Box>
            <Box component="tr">
              <Box component="td" className="pr-4 py-2 border-b border-base-300"><code>_ga_*</code></Box>
              <Box component="td" className="pr-4 py-2 border-b border-base-300">Google Analytics session/measurement ID persistence</Box>
              <Box component="td" className="py-2 border-b border-base-300">24 months</Box>
            </Box>
            <Box component="tr">
              <Box component="td" className="pr-4 py-2 border-b border-base-300"><code>_gads / _gac_* / IDE / ANID / NID</code></Box>
              <Box component="td" className="pr-4 py-2 border-b border-base-300">Google AdSense/Ads personalization, frequency capping, fraud prevention (only with consent)</Box>
              <Box component="td" className="py-2 border-b border-base-300">Per Google (typically up to ~13–24 months)</Box>
            </Box>
          </Box>
        </Box>
        <Typography variant="h2" className="text-[18px] text-base-content mt-4">Consent management (CMP)</Typography>
        <Typography className="block mb-2">
          We gate AdSense and Analytics tags behind our consent banner so non-essential storage loads only after opt-in. We are preparing a Google Funding Choices (TCF 2.2) integration for EEA/UK consent signalling; until then, use the footer Cookie choices link to change or withdraw consent, which takes effect on subsequent page loads.
        </Typography>
      </Box>
      <Box component="nav" aria-label="Related pages" className="mt-8 flex flex-wrap gap-4">
        <Typography variant="body2"><Link href="/author">Our authors</Link></Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2"><Link href="/methodology">How we test</Link></Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2"><Link href="/contact">Contact us</Link></Typography>
      </Box>
    </Container>
  );
}
