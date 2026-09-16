"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/site";

// Funding Choices: paste the Google-provided Funding Choices/TCF snippet in <head>
// BEFORE the gtag consent-default in src/app/layout.tsx so __tcfapi exists early.
// Do NOT gate/block this script on consent — the AdSense crawler + Consent Mode
// require it to always load; consent is enforced via gtag consent-default/update
// (denied + wait_for_update:500) and per-slot data-npa handling in AdSlot.
// Required env: NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
// Format: `ca-pub-` + exactly 16 digits (e.g. ca-pub-1234567890123456).
// Placeholder values (e.g. ca-pub-XXXXXXXXXXXXXXXX / pub-000...) block approval.
// Verification steps:
//   1. Set NEXT_PUBLIC_ADSENSE_CLIENT in .env.local / hosting env.
//   2. Restart dev server / redeploy, view-source confirms
//      https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-...
//   3. In DevTools Network tab allow pagead2.googlesyndication.com + fundingchoicesmessages.* (see CSP in next.config.js).
//   4. Accept consent ("Accept all") so AdSlot pushes ads; check `adsbygoogle` requests return 200.
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
