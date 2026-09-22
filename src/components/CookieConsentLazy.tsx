"use client";

import dynamic from "next/dynamic";

const CookieConsent = dynamic(() => import("./CookieConsent"), {
  ssr: false,
  loading: () => null,
});

export default function CookieConsentLazy() {
  return <CookieConsent />;
}
