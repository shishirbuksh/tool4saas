"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/site";

// AdSense page-level (Auto Ads) loader.
// GATED LOADING (privacy H1): this component renders ONLY inside
// ConsentGatedGoogleScripts after stored consent grants ad_storage (or for the
// AdSense crawler / ?ads=test review path, which loads code but serves no ads).
// Do NOT render this directly in layout — consent is enforced via gtag
// consent-default/update (denied + wait_for_update:500). Funding Choices (TCF
// 2.2) is wired in RootDocument.tsx and remains the source of truth for EEA/UK.
// Required env: NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
// Format: `ca-pub-` + exactly 16 digits (e.g. ca-pub-1234567890123456).
// Placeholder values (e.g. ca-pub-XXXXXXXXXXXXXXXX / pub-000...) block approval.
// Verification steps:
//   1. Set NEXT_PUBLIC_ADSENSE_CLIENT in .env.local / hosting env.
//   2. Restart dev server / redeploy, view-source confirms
//      https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-...
//   3. In DevTools Network tab allow pagead2.googlesyndication.com + fundingchoicesmessages.* (see CSP in next.config.js).
//   4. Accept consent ("Accept all"); confirm Auto Ads serve and requests return 200.
export default function AdSenseScript() {
  if (!siteConfig.adsenseClient) return null;
  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
    />
  );
}
