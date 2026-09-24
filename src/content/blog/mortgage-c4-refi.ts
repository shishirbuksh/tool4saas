import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Rates fell 1% and my neighbor refinanced the same week — $180/month saved, $4,500 in closing costs, break-even in 25 months. She is staying 10 years: easy win. Her brother refinanced with 18 months left in town: paid $4,000 to save $1,800. Same decision, opposite answers. <strong>Should I refinance my mortgage</strong> comes down to one division problem plus three gotchas. Here is the complete method.</p>
<p>Part of the <a href="/blog/mortgage-calculator-guide">mortgage calculator guide</a>. Run your numbers in the <a href="/refinance-calculator">refinance calculator</a>; price the new loan in the <a href="/mortgage-calculator">mortgage calculator</a>.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>

<h2 id="breakeven">The break-even rule (the only math that matters)</h2>
<p><strong>Break-even months = closing costs ÷ monthly savings.</strong> $4,500 ÷ $180 = 25 months. Stay past month 25: refinance wins, every month after is profit. Move or sell before: it loses. The “1% rule” (refinance when rates drop 1%+) is just a heuristic for when this division usually works on typical balances — always run your own numbers, since $150,000 loans and $600,000 loans break even at very different rate drops.</p>
<table>
<thead><tr><th>Scenario ($300k balance)</th><th>Costs</th><th>Saving/mo</th><th>Break-even</th><th>Verdict if staying 5 yrs</th></tr></thead>
<tbody>
<tr><td><strong>7% → 6%</strong></td><td>$4,500</td><td>~$200</td><td>~23 mo</td><td>Win (~$7,500 net)</td></tr>
<tr><td><strong>6.5% → 6%</strong></td><td>$4,000</td><td>~$95</td><td>~42 mo</td><td>Win (~$1,700 net)</td></tr>
<tr><td><strong>6% → 5.75%</strong></td><td>$4,000</td><td>~$48</td><td>~83 mo</td><td>Lose</td></tr>
</tbody>
</table>
<p>Rates and examples as of Sept 2026, illustrative only — not a lender offer. Excludes taxes, insurance, PMI, HOA, fees and ARM resets.</p>

<h2 id="gotchas">Three gotchas that flip the answer</h2>
<ol>
<li><strong>Term reset:</strong> refinancing year-8 of a 30-year into a fresh 30-year restarts amortization — early payments are interest-heavy again. Compare remaining-term refinance (22-year) or keep overpaying per <a href="/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment">overpayment guide</a>.</li>
<li><strong>Cash-out confusion:</strong> rate-and-term refinance (same balance, cheaper rate) vs cash-out (bigger balance, cash today). Cash-out at a lower rate can still cost more lifetime interest — separate decisions, separate math.</li>
<li><strong>PMI reset:</strong> if appreciation pushed you past 20% equity, refinance can drop PMI — often worth more than the rate cut itself. Get the appraisal math first.</li>
</ol>
<h2 id="rate-shopping">Rate shopping without tanking your score</h2>
<p>Comparison is mandatory — same-day spreads of 0.25%+ between lenders are routine, worth tens of thousands over the loan. And safe: multiple mortgage hard pulls within ~14 days count as one inquiry for scoring models. So compress shopping into a single week: Monday applications, Wednesday estimates, Friday decision. What to compare line by line: APR (not note rate), lender fees vs third-party fees, points vs credits, and lock period length. A 0.125% lower rate with $3,000 extra fees loses to the plainer offer inside 5 years — run both through break-even before falling for the headline rate. Never pay upfront “application” or “lock” fees to non-lender brokers shopping your file around.</p>

<h3>Refinance checklist (in order)</h3>
<ul>
<li>Credit clean, DTI under 36%, 6+ months reserves — best tiers go to best files.</li>
<li>Three lender estimates on the same day (rates move daily); compare APR and closing line by line.</li>
<li>Break-even vs your honest stay horizon — job, schools, life plans included.</li>
<li>Lock the rate in writing; shopping without locks wastes the comparison.</li>
</ul>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>
`;

export const mortgageRefi: BlogPost = {
  pillar: "mortgage-calculator-guide",
  slug: "should-i-refinance-my-mortgage",
  kind: "cluster",
  title: "Should I Refinance? Break-Even Rule + Checklist (2026)",
  description:
    "Refinance decision via break-even months: worked scenarios, term-reset and PMI gotchas + lender checklist. Free refinance calculator.",
  keywords: [
    "should i refinance my mortgage",
    "mortgage refinance break-even rule",
    "when to refinance 1 percent lower",
    "refinance closing costs worth it",
  ],
  toolSlugs: ["refinance-calculator", "mortgage-calculator", "mortgage-overpayment-calculator"],
  relatedSlugs: ["mortgage-overpayment-extra-payment", "15-vs-30-year-mortgage", "how-to-calculate-mortgage-payment"],
  published: "2026-09-24",
  updated: "2026-09-24",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "breakeven", text: "Break-even rule", level: 2 },
    { id: "gotchas", text: "Three gotchas", level: 2 },
    { id: "rate-shopping", text: "Rate shopping safely", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I know if refinancing is worth it?", answer: "Divide closing costs by monthly savings for break-even months. Stay past it and refinancing wins; move before and it loses. Typical 1% drops break even around two years on mid-size balances." },
    { question: "What is the 1% refinance rule?", answer: "A heuristic that refinancing usually pays when rates fall ~1%+. Always run your own break-even — small balances need bigger drops, large balances smaller ones." },
    { question: "Does refinancing restart my loan term?", answer: "A fresh 30-year does — early payments go interest-heavy again. Ask about remaining-term loans (e.g. 22-year) or keep overpaying instead." },
    { question: "Can refinancing remove PMI?", answer: "Yes — if appreciation pushed equity past 20%, the PMI drop alone can justify refinancing. Get appraisal math before deciding." },
    { question: "Is this refinancing advice?", answer: "No — illustrative education as of Sept 2026. Consult a qualified advisor and compare written lender estimates; see /terms." },
  ],
};
