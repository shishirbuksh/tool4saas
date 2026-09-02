"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/site";

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
