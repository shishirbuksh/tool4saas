import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>I ran this comparison in the calculator last Diwali week for three friends — two took 30 years at ~6% ($1,439 on $240,000) for cash-flow room with kids and single incomes, one took 15 years (~$2,025) on dual income with an 8-month buffer. Here is how to decide for your numbers.</p>
<p>Part of the <a href="/blog/mortgage-calculator-guide">mortgage calculator guide</a>. Compare your scenarios in the <a href="/mortgage-calculator">mortgage calculator</a> (try both tenures) and structure options in the <a href="/loan-calculator">loan calculator</a>.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>

<h2 id="numbers">The numbers: $240,000 at illustrative rates</h2>
<table>
<thead><tr><th>Term</th><th>Monthly P&I</th><th>Lifetime interest</th><th>Equity at year 5</th></tr></thead>
<tbody>
<tr><td><strong>30 years @ 6%</strong></td><td>$1,439</td><td>~$278,000</td><td>~$17,000</td></tr>
<tr><td><strong>15 years @ 6%</strong></td><td>~$2,025</td><td>~$125,000</td><td>~$68,000</td></tr>
</tbody>
</table>
<p>Shorter terms usually price ~0.5% lower, widening the gap further — table holds rates equal to isolate tenure. The 15-year costs ~$586 more monthly ($2,025 vs $1,439) but ~$150,000 less in lifetime interest (~$125k vs ~$278k). Faster equity also drops PMI years sooner on low-down-payment loans. Pick your pain — then automate for it.</p>
<p>Rates and examples as of Sept 2026, illustrative only — not a lender offer. Excludes taxes, insurance, PMI, HOA, fees and ARM resets.</p>

<h2 id="when-15">When the 15-year wins (checklist)</h2>
<ul>
<li><strong>Payment under 28% of gross income</strong> with 6-month emergency fund intact after down payment and closing (2–6% of price).</li>
<li><strong>Stable dual or high income</strong> — job loss must not turn the bigger payment into distress within months.</li>
<li><strong>Staying 10+ years</strong> — interest savings compound with time; movers at year 4 capture little of the gap.</li>
<li><strong>Maxed tax-advantaged savings already</strong> — extra dollars beat mortgage interest only after retirement accounts are fed (consult your advisor).</li>
</ul>
<h3>The hybrid most people should consider</h3>
<p>Take the 30-year, overpay the 15-year difference voluntarily (+~$586/month on this example). Same destination when times are good, with a built-in escape hatch when they are not — skip overpayments in lean months with zero penalty. Extra-payment math in <a href="/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment">overpayment guide</a>; what amortization does year by year in <a href="/blog/mortgage-calculator-guide/mortgage-amortization-schedule">amortization guide</a>.</p>

<h2 id="twenty-year">The forgotten 20-year middle path</h2>
<p>Between the two famous terms sits the 20-year: payments ~15% above 30-year (vs ~40% for 15-year) with roughly two-thirds of the interest savings. For buyers who fail the 15-year checklist on payment size but hate 30-year interest totals, it is the compromise lenders rarely advertise — ask explicitly, since many quote only 15/30 menus. On $240,000 at 6%: ~$1,719/month, ~$173,000 lifetime interest — splitting the gap almost evenly. Pair with modest overpayments and you land near 15-year totals with 20-year flexibility. Model all three tenures in the <a href="/mortgage-calculator">calculator</a> before letting a lender frame the choice as binary.</p>

<h2 id="traps">Three traps (both directions)</h2>
<ol>
<li><strong>15-year house-poor:</strong> payment fits at 33% DTI, then the roof, car and daycare arrive. The interest saved means nothing in foreclosure.</li>
<li><strong>30-year drift:</strong> lower payment breeds lifestyle inflation; the “I'll overpay” plan dies without autopay. Automate the extra principal or admit the 15-year was right.</li>
<li><strong>Refinance blindness:</strong> starting 30-year at 7% and never revisiting when rates fall to 6% wastes the option value — break-even math in <a href="/blog/mortgage-calculator-guide/should-i-refinance-my-mortgage">refinance guide</a>.</li>
</ol>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>
`;

export const mortgageTerm: BlogPost = {
  pillar: "mortgage-calculator-guide",
  slug: "15-vs-30-year-mortgage",
  kind: "cluster",
  title: "15 vs 30 Year Mortgage: Interest, Payoff & When 15 Wins (2026)",
  description:
    "15 vs 30 year mortgage compared: payments, ~$150k interest gap, equity speed + 15-year checklist and hybrid overpay strategy. Free calculator.",
  keywords: [
    "15 vs 30 year mortgage",
    "15 year vs 30 year total interest",
    "is 15 year mortgage worth it",
    "30 year mortgage overpay strategy",
  ],
  toolSlugs: ["mortgage-calculator", "loan-calculator", "mortgage-overpayment-calculator"],
  relatedSlugs: ["how-to-calculate-mortgage-payment", "mortgage-overpayment-extra-payment", "mortgage-amortization-schedule"],
  published: "2026-09-24",
  updated: "2026-09-24",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "numbers", text: "$240k numbers compared", level: 2 },
    { id: "when-15", text: "When 15-year wins", level: 2 },
    { id: "twenty-year", text: "20-year middle path", level: 2 },
    { id: "traps", text: "Three traps both ways", level: 2 },
  ],
  html,
  faqs: [
    { question: "How much interest does 15 vs 30 year save?", answer: "On $240,000 at 6%: ~$278,000 over 30 years vs ~$125,000 over 15 — roughly $150,000 gap for ~$586/month higher payments. Illustrative as of Sept 2026; see /terms." },
    { question: "When is a 15-year mortgage worth it?", answer: "When payments stay under ~28% of income with emergency savings intact, income is stable, you stay 10+ years, and retirement accounts are already funded. Otherwise 30-year plus voluntary overpayments." },
    { question: "Can I get 15-year benefits with a 30-year loan?", answer: "Mostly — overpay the payment difference voluntarily. Same destination in good months with an escape hatch in lean ones. Automate it or the plan drifts." },
    { question: "Does 15-year build equity faster?", answer: "About 4× faster early (~$68,000 vs ~$17,000 at year 5 on the example). Faster equity drops PMI sooner and cushions price dips." },
    { question: "Is this mortgage advice?", answer: "No — illustrative education only. Consult a qualified advisor and your lender for your situation; see /terms." },
  ],
};
