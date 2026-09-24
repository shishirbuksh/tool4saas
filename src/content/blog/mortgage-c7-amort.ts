import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>My first amortization export shocked me: $17,268 paid in year 1 on a $240,000/6% loan, balance down just $2,945 — pulled from the <a href="/mortgage-calculator">mortgage calculator</a> CSV in Sept 2026. It looks broken; it is front-loaded by design. This guide explains <strong>mortgage amortization schedules</strong>: how each payment splits, why the split flips over time, and how to read the schedule to time overpayments, refinances and PMI exits. (Same front-load hits Rs 60L/9% Indian EMIs — see the <a href="/blog/mortgage-calculator-guide/home-loan-emi-eligibility-india">India guide</a>.)</p>
<p>Part of the <a href="/blog/mortgage-calculator-guide">mortgage calculator guide</a>. Generate your schedule in the <a href="/mortgage-calculator">mortgage calculator</a> (yearly tables + CSV export); model extra payments in the <a href="/mortgage-overpayment-calculator">overpayment calculator</a>.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>

<h2 id="split">How each payment splits (the $240k/6% lens)</h2>
<p>Month 1: $1,439 payment = ~$1,200 interest + ~$239 principal. Interest = 0.005 × $240,000; principal = the rest. Month 2: interest on $239,761 — slightly less, principal slightly more. That recursion, 360 times, is the schedule. Year 1: ~$14,300 interest, ~$3,000 principal. Year 15: roughly even. Final year: nearly all principal. The payment never changes (fixed-rate); only the ratio moves. Rule of thumb: in year N of 30, roughly (30−N)/30 of payment still goes to interest — coarse but directionally right.</p>

<h2 id="read">How to read the schedule like a strategist</h2>
<table>
<thead><tr><th>Question</th><th>Read this column</th><th>Decision it drives</th></tr></thead>
<tbody>
<tr><td><strong>When does principal dominate?</strong></td><td>Principal vs interest by year</td><td>Overpay hardest before the flip (~year 15)</td></tr>
<tr><td><strong>When do I hit 20% equity?</strong></td><td>Remaining balance vs value</td><td>PMI cancellation timing</td></tr>
<tr><td><strong>Total cost of waiting?</strong></td><td>Cumulative interest</td><td>Refinance vs overpay comparison</td></tr>
<tr><td><strong>Payoff date?</strong></td><td>Final row</td><td>Retirement and tenure planning</td></tr>
</tbody>
</table>
<ul>
<li><strong>CSV export:</strong> download the yearly table from the <a href="/mortgage-calculator">calculator</a> and chart cumulative interest — the curve's early steepness is the visual case for overpaying now, per <a href="/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment">overpayment guide</a>.</li>
<li><strong>ARM warning:</strong> schedules assume fixed rates. Adjustable-rate resets rewrite every future row — never plan 10 years off an ARM's teaser schedule.</li>
<li><strong>Biweekly effect:</strong> extra-payment rows compress the whole table upward — payoff dates jump years on modest additions.</li>
</ul>

<h2 id="extra-visualized">What extra payments look like inside the table</h2>
<p>One $10,000 lump at month 12 of the example loan deletes roughly 30 future payments' worth of interest-small-principal rows and pulls every subsequent row upward — payoff jumps over a year closer. The visual to internalize: extra dollars do not shorten the table from the end like cutting chapters; they compress the whole table, because each dollar skips interest in every month after it lands. That is why $10,000 in year 1 outweighs $10,000 in year 20 by roughly 5× in interest saved. See exact compressions for your loan in the <a href="/mortgage-overpayment-calculator">overpayment calculator</a>, and the monthly automation version in <a href="/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment">extra payments guide</a>.</p>

<h2 id="milestones">Three milestones hidden in your schedule</h2>
<ol>
<li><strong>PMI exit (~20% equity):</strong> on 10%-down loans, extra early principal can pull PMI cancellation years forward — often worth more than the interest saved. Strategy in <a href="/blog/mortgage-calculator-guide/down-payment-pmi-cost">down payment & PMI guide</a>.</li>
<li><strong>The flip (~year 12–15):</strong> payments turn principal-majority. Overpayments after the flip earn less — front-load extra cash early.</li>
<li><strong>Break-even vs refinance:</strong> compare remaining interest on your schedule against a new loan's total cost plus closing — method in <a href="/blog/mortgage-calculator-guide/should-i-refinance-my-mortgage">refinance guide</a>.</li>
</ol>
<p>Rates and examples as of Sept 2026, illustrative only — not a lender offer. Excludes taxes, insurance, PMI, HOA, fees and ARM resets.</p>
<h2 id="arm-warning">ARM schedules: why teaser tables lie</h2>
<p>Every schedule above assumes fixed rates. Adjustable-rate mortgages print deceptively calm 5–7 year tables, then reset — and every row after reset is fiction until the index moves. A 5/1 ARM at 5.5% teaser amortizes beautifully for 60 months; at reset to 7.5% (within typical caps), the payment jumps ~20% and the remaining schedule rewrites entirely. Planning a decade off teaser rows is how payment shock happens: budget the reset scenario (rate + caps maximum) from day one, keep refinance eligibility intact (credit, equity, income documented), and set calendar alerts 12 months before reset to act early. If the worst-case reset payment breaks the 28% rule, the ARM was unaffordable at purchase — no matter how pretty years 1–5 looked.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>
`;

export const mortgageAmort: BlogPost = {
  pillar: "mortgage-calculator-guide",
  slug: "mortgage-amortization-schedule",
  kind: "cluster",
  title: "Mortgage Amortization Schedule: How Payments Split (2026)",
  description:
    "Amortization schedule explained: monthly principal/interest split, reading it strategically + 3 milestones (PMI exit, flip, refinance). Free calculator.",
  keywords: [
    "mortgage amortization schedule",
    "how amortization front-loads interest",
    "principal vs interest over time",
    "amortization table explained",
  ],
  toolSlugs: ["mortgage-calculator", "mortgage-overpayment-calculator", "refinance-calculator"],
  relatedSlugs: ["how-to-calculate-mortgage-payment", "mortgage-overpayment-extra-payment", "down-payment-pmi-cost"],
  published: "2026-09-24",
  updated: "2026-09-24",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "split", text: "How each payment splits", level: 2 },
    { id: "read", text: "Read it like a strategist", level: 2 },
    { id: "extra-visualized", text: "Extra payments visualized", level: 2 },
    { id: "milestones", text: "Three hidden milestones", level: 2 },
    { id: "arm-warning", text: "ARM: teaser tables lie", level: 2 },
  ],
  html,
  faqs: [
    { question: "Why is my early mortgage payment mostly interest?", answer: "Each payment covers that month's interest on the full remaining balance first. Early balances are large so interest dominates; as principal falls the split flips toward principal around year 12–15." },
    { question: "How do I read an amortization schedule?", answer: "Track principal vs interest by year (overpay timing), remaining balance vs value (PMI exit), cumulative interest (refinance comparison) and the final row (payoff date)." },
    { question: "When do payments become mostly principal?", answer: "Roughly year 12–15 of a 30-year fixed loan. Extra payments before the flip earn the most lifetime-interest savings." },
    { question: "Does extra payment change the schedule?", answer: "Yes — principal-only extras compress all future rows: less interest each month after, earlier payoff. Model it in the overpayment calculator." },
    { question: "Is this amortization advice?", answer: "No — illustrative education as of Sept 2026 for fixed-rate P&I. ARM resets rewrite future rows; consult a qualified advisor; see /terms." },
  ],
};
