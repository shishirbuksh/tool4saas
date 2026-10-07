import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“7% FD” paid 6.3% after TDS, minus a premature-withdrawal penalty nobody mentioned at booking. The headline rate is advertising; <strong>quarterly compounding, TDS thresholds and penalty clauses are the product</strong>. This guide dissects all three with SBI/HDFC-style 2026 terms, payout-vs-cumulative math, and the premature-exit arithmetic to run before breaking any deposit.</p>
<p>Part of the <a href="/blog/sip-calculator-guide">India wealth &amp; tax guide</a>. Model rates and tenures in the <a href="/fd-calculator">FD calculator</a>; compare compounding in <a href="/blog/sip-calculator-guide/lumpsum-compounding-frequency">frequency guide</a>.</p>

<h2 id="quarterly">Quarterly compounding: 7% means 7.19%</h2>
<p>Most Indian FDs compound quarterly: 7%/4 per quarter, reinvested. Effective annual yield ≈ 7.19% — the number that actually credits. Monthly-payout variants pay exactly 7% as cash flow (no compounding). So the first question at booking is never “what rate?” but “cumulative or payout, and at what rest?” — answered in the sanction letter, confirmed in the <a href="/fd-calculator">calculator</a> with payout-vs-cumulative comparison.</p>

<h2 id="tds-penalty">TDS thresholds and premature penalties</h2>
<table>
<thead><tr><th>Event</th><th>Rule of thumb</th><th>Action</th></tr></thead>
<tbody>
<tr><td><strong>TDS on interest</strong></td><td>Deducted above threshold per FY</td><td>Submit 15G/15H if eligible; track across branches</td></tr>
<tr><td><strong>Premature exit</strong></td><td>~1% penalty + lower slab rate</td><td>Compute break cost before breaking</td></tr>
<tr><td><strong>Senior citizens</strong></td><td>Higher thresholds + rates</td><td>Confirm age-based slabs at booking</td></tr>
</tbody>
</table>
<p>Breaking a 5-year FD in year 2 typically reprices interest to the 2-year slab minus penalty — sometimes below savings-account returns. Ladder maturities (1/2/3/5 years) instead of one mega-deposit so emergencies tap the nearest rung, not the whole ladder. RDs follow identical compounding with monthly deposits; compare both before committing salary flows.</p>

<h2 id="compare">FD vs RD vs savings: where each wins</h2>
<p>FDs win for parked goals with known dates (fees, admissions, down payments). RDs win for building from salary (forced monthly discipline, same compounding). Savings accounts win for emergencies (instant access beats 50bps). None beat inflation-adjusted equity over decades — but none crash 20% the year fees are due, either. Match instrument to horizon: under 3 years, certainty dominates; over 7, growth dominates; between, split. Rate-check quarterly against repo moves — 2026's trajectory reprices both directions.</p>
<blockquote class="tip">Informational purposes only — not financial advice. Bank terms vary by institution and change; verify current slabs before booking. See /terms.</blockquote>
`;

export const fdTds: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "fd-quarterly-tds",
  kind: "cluster",
  title: "FD Quarterly Compounding, TDS and Penalties (2026)",
  description:
    "FD mechanics: quarterly rests to 7.19% effective, TDS thresholds, premature penalties + FD vs RD vs savings rules. Free calculator.",
  keywords: [
    "how fd quarterly compounding and tds works india",
    "fd 5 years 7 percent maturity",
    "quarterly vs monthly fd payout",
    "tds threshold premature penalty",
    "fd vs rd which compounding",
    "What is the effective yield of a 7% FD?",
  ],
  toolSlugs: ["fd-calculator", "compound-interest-calculator", "income-tax-calculator"],
  relatedSlugs: ["lumpsum-compounding-frequency", "sip-5000-10-years", "old-vs-new-regime-2026"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "quarterly", text: "Quarterly compounding", level: 2 },
    { id: "tds-penalty", text: "TDS + penalties", level: 2 },
    { id: "compare", text: "FD vs RD vs savings", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the effective yield of a 7% FD?", answer: "About 7.19 percent cumulative through quarterly rests at 7 divided by 4 per quarter reinvested, which is the number that actually credits. Monthly-payout variants pay exactly 7 percent as cash flow with no compounding. Ask first whether booking is cumulative or payout and at what rest, then confirm in the sanction letter and calculator comparison." },
    { question: "When is TDS deducted on FDs?", answer: "TDS applies above per-financial-year interest thresholds per depositor, tracked across branches rather than per deposit. Submit Form 15G or 15H if eligible and track cumulative interest yourself through the year. Bank terms vary by institution and change, so verify current slabs and thresholds before booking deposits." },
    { question: "What does breaking an FD cost?", answer: "Breaking typically costs about 1 percent penalty plus repricing to the completed-tenure slab rate, so a 5-year FD broken in year 2 earns 2-year rates minus penalty. That outcome sometimes falls below savings-account returns. Compute break cost before breaking and ladder maturities across 1, 2, 3 and 5 years instead of one mega-deposit." },
    { question: "FD or RD for salaried savings?", answer: "Use FDs for parked lump goals with known dates like fees, admissions or down payments where certainty dominates under 3 years. Use RDs for building monthly from salary through forced discipline with identical quarterly compounding. Compare both before committing salary flows, since cash-flow shapes differ while compounding mechanics match." },
    { question: "Do senior citizens get better FD terms?", answer: "Senior citizens usually receive higher FD rates and higher TDS thresholds, though exact age-based slabs vary by bank and rate cycle. Confirm eligible thresholds, penalty terms and payout versus cumulative rests at booking. Rate-check quarterly against repo moves, since 2026 repricing moves both directions and terms change." },
  ],
};
