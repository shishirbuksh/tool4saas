import { Button, Paper, Typography } from "@/components/ds";

/**
 * Cookie consent banner — presentational only.
 *
 * Server-rendered with `hidden`; src/lib/shell/consent-banner.ts reveals it
 * after 3 s or the first interaction, persists the choice to
 * localStorage["t4s-consent-v1"], and drives Consent Mode. Behaviour is a 1:1
 * port of the previous React component (DNT/GPC, 12-month expiry, split
 * analytics/ads grants, "Cookie choices" + "Do Not Sell" footer actions).
 */
export default function CookieConsent() {
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      aria-describedby="t4s-consent-desc"
      data-cookie-banner
      hidden
      className="fixed left-[16px] right-[16px] bottom-[max(16px,_env(safe-area-inset-bottom))]"
      style={{ zIndex: 1190, pointerEvents: "none" }}
    >
      {/* `hidden` on the root only works if no author `display` utility is set
          on it, so the centering flex lives on this inner wrapper. */}
      <div className="flex justify-center">
        <Paper
          elevation={0}
          className="max-w-[720px] w-full p-4 sm:p-6 border border-base-300 rounded-[12px]"
          style={{ pointerEvents: "auto" }}
        >
          <Typography component="p" variant="subtitle1" className="font-bold mb-2">
            Cookies and ads
          </Typography>
          <Typography id="t4s-consent-desc" variant="body2" color="text.secondary" className="mb-4 leading-[1.7]">
            Tool inputs run locally, but we use Google Analytics and Google AdSense cookies for measurement and ads. See our{" "}
            <a href="/privacy">Privacy Policy</a>. You can accept or reject — the site works either way.
            Choices expire after 12 months; you can change them anytime via “Cookie choices” in the footer.
          </Typography>
          <div className="flex gap-1 flex-wrap mb-2">
            <label className="label cursor-pointer justify-start gap-3 py-1.5">
              <input type="checkbox" className="toggle toggle-primary" data-consent-analytics />
              <span className="label-text text-sm font-medium">Analytics</span>
            </label>
            <label className="label cursor-pointer justify-start gap-3 py-1.5">
              <input type="checkbox" className="toggle toggle-primary" data-consent-ads />
              <span className="label-text text-sm font-medium">Ads</span>
            </label>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button variant="contained" data-consent-accept className="min-h-[44px]">
              Accept all
            </Button>
            <Button variant="outlined" data-consent-reject className="min-h-[44px]">
              Reject all
            </Button>
            <Button variant="text" data-consent-save className="min-h-[44px]">
              Save choices
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}
