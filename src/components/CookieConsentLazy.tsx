
import dynamic from "@/lib/astro/dynamic";

const CookieConsent = dynamic(() => import("./CookieConsent"), {
  ssr: false,
  loading: () => null,
});

export default function CookieConsentLazy() {
  return <CookieConsent />;
}
