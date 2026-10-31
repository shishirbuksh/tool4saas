import { Container, Typography, Box } from "@/components/ds";

import Link from "@/lib/astro/navigation";
import { siteConfig } from "@/lib/site";
import { getPageModifiedIso, formatIsoHuman } from "@/lib/dates";
import { CATEGORY_MODIFIED } from "@/lib/edit-dates.generated";

const CATEGORY_UPDATES: [string, string][] = (
  [
    ["Business tool guides", "business"],
    ["General calculators", "calculators"],
    ["Converters", "converters"],
    ["Developer tools", "developer"],
    ["Finance calculators", "finance"],
    ["Generators", "generators"],
    ["Image & design tools", "images-design"],
    ["PDF tools", "pdf"],
    ["SEO tools", "seo"],
    ["Text & document tools", "text-documents"],
    ["Time & clock utilities", "time"],
  ] as const
).map(([area, id]) => [area, CATEGORY_MODIFIED[id] ?? ""]);

export default function MethodologyView() {
  const lastUpdatedIso = getPageModifiedIso("methodology") ?? "";
  return (
    <Container maxWidth="md" className="py-12">
      <Typography variant="h1" className="text-[2.25rem] mb-4">How We Test Tools</Typography>
      <Typography variant="body2" color="text.secondary" className="mb-6">
        Last updated: <time dateTime={lastUpdatedIso}>{formatIsoHuman(lastUpdatedIso)}</time>
      </Typography>
      <Box component="div" className="text-base-content/70 leading-[1.8]">
        <Typography variant="h2" className="text-[1.25rem] text-base-content mt-6 mb-2">
          1. Build locally
        </Typography>
        <Typography className="block mb-2">
          Every <span translate="no">{siteConfig.name}</span> tool is built and tested in-house. Most tools run 100%
          locally in your browser with no sign-up and no uploads, so what you type never leaves your device.
        </Typography>
        <Typography variant="h2" className="text-[1.25rem] text-base-content mt-6 mb-2">
          2. Verify against known samples
        </Typography>
        <Typography className="block mb-2">
          We check outputs against known reference values before publishing. For example: a $100,000 loan at 5%
          over 30 years gives a monthly payment of $536.82, and 70 kg at 175 cm gives a BMI of 22.9.
        </Typography>
        <Box
          component="table"
          className="w-full border-collapse mt-4 mb-2 text-[0.875rem]"
        >
          <Box component="caption" className="text-left pb-2 text-base-content/70">
            Sample verification checks run before publishing
          </Box>
          <Box component="thead">
            <Box component="tr">
              <Box component="th" scope="col" className="text-left p-2 border-b border-base-300">
                Check
              </Box>
              <Box component="th" scope="col" className="text-left p-2 border-b border-base-300">
                Input
              </Box>
              <Box component="th" scope="col" className="text-left p-2 border-b border-base-300">
                Expected output
              </Box>
            </Box>
          </Box>
          <Box component="tbody">
            <Box component="tr">
              <Box component="th" scope="row" className="text-left p-2 border-b border-base-300 font-semibold">
                Loan payment
              </Box>
              <Box component="td" className="p-2 border-b border-base-300">
                $100,000 at 5% over 30 years
              </Box>
              <Box component="td" className="p-2 border-b border-base-300">
                $536.82 / month
              </Box>
            </Box>
            <Box component="tr">
              <Box component="th" scope="row" className="text-left p-2 border-b border-base-300 font-semibold">
                BMI
              </Box>
              <Box component="td" className="p-2 border-b border-base-300">
                70 kg at 175 cm
              </Box>
              <Box component="td" className="p-2 border-b border-base-300">
                22.9
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography variant="h2" className="text-[1.25rem] text-base-content mt-6 mb-2">
          3. Browser matrix
        </Typography>
        <Typography className="block mb-2">
          We verify pages in current Chrome, Edge, Firefox, and Safari on desktop and mobile viewports,
          checking layout, input handling, and downloads or copy actions where applicable.
        </Typography>
        <Typography variant="h2" className="text-[1.25rem] text-base-content mt-6 mb-2">
          4. Update policy and limitations
        </Typography>
        <Typography className="block mb-2">
          We re-check pages as tools improve and re-verify calculator logic when rules change. Results are
          estimates for general information, not professional advice — see <Link href="/terms">/terms</Link>.
        </Typography>
        <Box component="ul" className="m-0 pl-5">
          <Typography component="li" className="mb-1" style={{ display: "list-item" }}>
            Re-run sample checks after every logic change before re-publishing.
          </Typography>
          <Typography component="li" className="mb-1" style={{ display: "list-item" }}>
            Re-verify finance logic when tax or interest rules change; label estimates as estimates.
          </Typography>
          <Typography component="li" className="mb-1" style={{ display: "list-item" }}>
            Re-check health ranges and conversions when reference guidance changes.
          </Typography>
        </Box>
        <Typography variant="h2" className="text-[1.25rem] text-base-content mt-6 mb-2">
          5. Public references we check against
        </Typography>
        <Typography className="block mb-2">
          We cross-check behavior against public references:{" "}
          <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
            MDN Web Docs
          </a>{" "}
          for JavaScript, date, and number behavior; published{" "}
          <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer">
            RBI
          </a>{" "}
          and{" "}
          <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer">
            IRS
          </a>{" "}
          formula guidance for loan and tax estimate logic (results remain estimates, not financial advice);
          and{" "}
          <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">
            WHO
          </a>{" "}
          BMI classification ranges for health calculators. See <Link href="/terms">/terms</Link> for
          limitations.
        </Typography>
        <Typography variant="h2" className="text-[1.25rem] text-base-content mt-6 mb-2">
          6. Testing rig in detail
        </Typography>
        <Typography className="block mb-2">
          Day-to-day verification runs on current stable Chrome, Edge, Firefox, and Safari, on desktop
          viewports from 1280 pixels up and mobile widths of 360 to 390 pixels. Each candidate page is
          exercised end to end: enter the sample input, read the output, then use copy, download, or print
          exactly as a visitor would. Layout must hold at both extremes, inputs must reject garbage with
          clear messages, and exports must open correctly — a PDF invoice must paginate on A4, a CSV must
          reopen with headers intact. <span translate="no">{siteConfig.name}</span> has operated this way
          since its 2026 launch, and failures block release until fixed.
        </Typography>
        <Typography variant="h2" className="text-[1.25rem] text-base-content mt-6 mb-2">
          7. Sampling, edge cases and YMYL care
        </Typography>
        <Typography className="block mb-2">
          Reference samples cover the happy path and edge cases: leap-day birthdays, DST jumps in March, empty
          inputs, 1,000-row batches, and malformed JSON with a missing comma. Finance and health tools get a
          second pass because money and body decisions carry real consequences — every FAQ answer there
          averages well above our editorial floor, results are labeled estimates, and pages point readers to
          qualified professionals. Tax figures use clearly marked demo brackets, never live filing tables, so
          no visitor mistakes a planning sketch for filed advice.
        </Typography>
        <Typography variant="h2" className="text-[1.25rem] text-base-content mt-6 mb-2">
          8. Content update history
        </Typography>
        <Typography className="block mb-2">
          The dates in this table come directly from the site&apos;s version-control
          history — each entry is the last real edit of that category&apos;s guide
          content. We publish this table rather than a curated &ldquo;review log&rdquo;
          so every date is independently checkable against <Link href="/blog">our guides</Link>{" "}
          and actual content changes.
        </Typography>
        <Box
          component="table"
          className="w-full border-collapse mt-2 mb-2 text-[0.875rem]"
        >
          <Box component="thead">
            <Box component="tr">
              <Box component="th" scope="col" className="text-left p-2 border-b border-base-300">
                Content area
              </Box>
              <Box component="th" scope="col" className="text-left p-2 border-b border-base-300">
                Last content edit
              </Box>
            </Box>
          </Box>
          <Box component="tbody">
            {CATEGORY_UPDATES.map(([area, iso]) => (
              <Box component="tr" key={area}>
                <Box component="td" className="p-2 border-b border-base-300">
                  {area}
                </Box>
                <Box component="td" className="p-2 border-b border-base-300 whitespace-nowrap">
                  {formatIsoHuman(iso)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        component="nav"
        aria-label="Related pages"
        className="mt-8 flex flex-wrap gap-4 text-base-content/70"
      >
        <Typography variant="body2">
          <Link href="/author">Our authors</Link>
        </Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2">
          <Link href="/contact">Contact us</Link>
        </Typography>
        <Typography variant="body2" aria-hidden="true">·</Typography>
        <Typography variant="body2">
          <Link href="/terms">Terms of Service</Link>
        </Typography>
      </Box>
    </Container>
  );
}
