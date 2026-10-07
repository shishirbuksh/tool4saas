import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>₹5,000 a month sounds small until compounding multiplies it 19×: at 12% for 10 years, ₹6 lakh invested becomes ~₹11.5L. Stretch to 15 years and it nears ₹25L; to 20, past ₹49L. <strong>Time plus rate plus discipline — the three levers of every SIP projection</strong>. This guide runs the exact numbers for 10/15/20 years, adds the 10% step-up trick salaried investors swear by, and contrasts SIP with same-money lump sums so you pick deliberately.</p>
<p>Part of the <a href="/blog/sip-calculator-guide">India wealth &amp; tax guide</a>. Model it live in the <a href="/sip-calculator">SIP calculator</a> (₹5k/10y/12% preset + step-up toggle); compare lump sums in <a href="/compound-interest-calculator">compound interest</a>.</p>

<h2 id="ten-fifteen-twenty">10, 15, 20 years at 12%: the patience table</h2>
<table>
<thead><tr><th>Horizon</th><th>Invested</th><th>Maturity ≈</th><th>Gains</th></tr></thead>
<tbody>
<tr><td><strong>10 years</strong></td><td>₹6.0L</td><td>₹11.5L</td><td>₹5.5L</td></tr>
<tr><td><strong>15 years</strong></td><td>₹9.0L</td><td>₹24.9L</td><td>₹15.9L</td></tr>
<tr><td><strong>20 years</strong></td><td>₹12.0L</td><td>₹49.9L</td><td>₹37.9L</td></tr>
</tbody>
</table>
<p>Formula underneath: FV = M×(((1+mr)^n−1)/mr) with mr = 1% monthly, n = months. Notice gains overtake principal after year 7 — that crossover is compounding visibly working. Verify each row with the preset buttons, then test your own monthly figure.</p>

<h2 id="stepup">Step-up 10%: salary growth becomes wealth growth</h2>
<p>Flat ₹5,000 ignores raises. A 10% yearly step-up (₹5,000 → ₹5,500 → …) tracks typical salary growth and lifts 10-year maturity past ₹17L — roughly 50% more for money you barely miss because lifestyle never absorbed it. Automate the step-up at the same time as the SIP (April, with appraisals); manual annual increases die by February. Compare flat vs step-up side by side in the <a href="/sip-calculator">calculator</a> before committing — the gap column sells the habit better than any lecture.</p>

<h2 id="sip-vs-lumpsum">SIP vs lump sum on identical ₹6 lakh</h2>
<p>Same ₹6L as a day-one lump sum at 12% for 10 years: ~₹18.6L — more than SIP's ₹11.5L, because every rupee compounds from day one. So why SIP? Because nobody holds idle ₹6L, and lump sums face entry-timing risk (deploy before a crash and sequence hurts). SIP's real edge is behavioral: automated, affordable, crash-agnostic (downturns buy more NAV units). Windfall rule: lump-sum money you already hold, SIP money you earn monthly. NAV and expense ratios explain projection gaps between calculators — same math, different fee assumptions (see <a href="/blog/sip-calculator-guide/lumpsum-compounding-frequency">compounding frequency</a>).</p>
<blockquote class="tip">Informational purposes only — not financial advice. Fixed-return illustrations; markets deliver sequences. See /terms.</blockquote>
`;

export const sipGrowth: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "sip-5000-10-years",
  kind: "cluster",
  title: "₹5,000 SIP in 10/15/20 Years at 12% (With Step-Up)",
  description:
    "₹5,000 SIP projections: 10/15/20-year table, 10% step-up boost past ₹17L + lump-sum comparison. Free calculator with presets.",
  keywords: [
    "how much will 5000 sip grow in 10 years",
    "5000 sip 12 percent 15 years maturity",
    "step-up 10 percent yearly extra lakhs",
    "sip vs lumpsum same 6 lakh",
    "nav expense ratio why projection differs",
    "What does a 10% step-up add?",
  ],
  toolSlugs: ["sip-calculator", "compound-interest-calculator", "retirement-calculator"],
  relatedSlugs: ["lumpsum-compounding-frequency", "sip-1-crore-goal", "real-return-inflation"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "ten-fifteen-twenty", text: "10/15/20-year table", level: 2 },
    { id: "stepup", text: "Step-up trick", level: 2 },
    { id: "sip-vs-lumpsum", text: "SIP vs lump sum", level: 2 },
  ],
  html,
  faqs: [
    { question: "How much will ₹5,000 SIP grow in 10 years at 12%?", answer: "About 11.5 lakh on 6 lakh invested over 10 years at 12 percent, rising to 24.9 lakh at 15 years and 49.9 lakh at 20 years. Gains overtake principal after year 7, showing compounding working through rests at 1 percent. Verify each row with preset buttons in the SIP calculator, then test your monthly figure." },
    { question: "What does a 10% step-up add?", answer: "A 10 percent step-up from 5,000 to 5,500 and onward tracks salary growth and lifts 10-year maturity past 17 lakh versus 11.5 lakh flat. That is 50 percent more for money you barely miss because lifestyle never absorbed it. Automate the increase each April with appraisals and compare flat versus step-up side by side." },
    { question: "SIP or lump sum for the same money?", answer: "A lump sum of 6 lakh at 12 percent for 10 years reaches 18.6 lakh versus 11.5 lakh for SIP, since every rupee compounds from day one. Lump sums need idle cash and face timing risk if deployed before a crash. SIP wins because it is automated and crash-agnostic, with downturns buying NAV units." },
    { question: "Why do calculators show different maturities?", answer: "Different calculators assume different NAV paths and expense ratios, so the same FV formula with 1 percent monthly rests produces different maturities. Fee drag explains projection gaps because the math is identical but cost assumptions vary. Compare inputs like rate, step-up and fees, not just outputs, and reproduce rows with preset buttons before committing." },
    { question: "Is 12% realistic?", answer: "Twelve percent is a long-run equity assumption for illustration, not a promise, since markets deliver sequences rather than fixed returns. Fixed-return illustrations help compare horizons, but real paths vary with NAV and timing. Model 10 percent and 14 percent bands in the calculator to see sensitivity before planning contributions." },
  ],
};
