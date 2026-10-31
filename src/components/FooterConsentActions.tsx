
import { siteConfig } from "@/lib/site";

function handleDoNotSell() {
  try {
    const c = { ad_storage: "denied", analytics_storage: "denied", ts: Date.now() };
    try {
      localStorage.setItem("t4s-consent-v1", JSON.stringify(c));
    } catch {
      /* ignore storage failures */
    }
    try {
      const w = window as unknown as {
        gtag?: (...a: unknown[]) => void;
        [key: string]: unknown;
      };
      if (typeof w.gtag === "function") {
        w.gtag("consent", "update", {
          ad_storage: "denied",
          analytics_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
      }
      w["ga-disable-" + siteConfig.gaId] = true;
    } catch {
      /* ignore gtag failures */
    }
    try {
      window.dispatchEvent(new CustomEvent("t4s:consent-updated", { detail: c }));
    } catch {
      /* ignore */
    }
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event("t4s:open-cookie-choices"));
}

export default function FooterConsentActions() {
  return (
    <>
      <li>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("t4s:open-cookie-choices"))}
          className="footer-link footer-legal-button"
        >
          Cookie choices
        </button>
      </li>
      <li aria-hidden="true">·</li>
      <li>
        <button
          type="button"
          onClick={handleDoNotSell}
          className="footer-link footer-legal-button"
        >
          Do Not Sell or Share
        </button>
      </li>
    </>
  );
}
