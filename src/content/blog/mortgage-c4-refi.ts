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

<h2 id="cost-anatomy">Closing-cost anatomy lenders rarely headline</h2>
<p>Refinance quotes bundle origination fees, appraisal, title search plus insurance, recording charges, and prepaid escrow that together reach 2 to 6% of balances — $4,500 on $300,000 is typical. Lender credits marketed as no-closing-cost options simply roll expenses into higher rates that cost more when stays exceed five years. The <a href="https://www.consumerfinance.gov/ask-cfpb/what-are-closing-costs-en-1801/">CFPB closing-cost explainer</a> lists line items to compare across same-day Loan Estimates since daily rate moves distort comparisons. Demand itemized origination versus third-party splits, question application or lock fees from brokers shopping files around, and run both credit versus fee versions through break-even months equal to costs divided by savings. Written locks preserve comparisons; verbal quotes evaporate.</p>
<h2 id="timing-windows">Timing windows that reward patience</h2>
<p>Rate dips plus equity milestones create windows where refinancing pays triple duty: lower rates, PMI removal past 20% equity, and term alignment without resets. Monitor 0.5% drops from your note rate, appreciation pushing loan-to-value below 80%, and credit score tier upgrades that unlock better pricing together. The <a href="https://www.federalreserve.gov/consumers.htm">Federal Reserve consumer resources</a> track rate environments shaping lender competition. Compress shopping into one week so multiple hard pulls within about 14 days count as one inquiry, comparing APR plus points versus credits line by line. Set calendar alerts for break-even anniversaries to confirm savings materialized after closing, keeping statements plus disclosures filed for taxes and future moves.</p>
<h2 id="alternatives">Alternatives when refinancing loses</h2>
<p>When break-even exceeds honest stay horizons, alternatives beat new loans: automate overpayments targeting principal per the <a href="/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment">overpayment guide</a>, recast with lump sums where servicers allow lower payments without new closings, or shorten effective tenure with biweekly half-payments creating one extra annual installment. PMI removal via appraisal at 20% equity often saves more than rate cuts alone without refinancing costs. Track progress in <a href="/blog/mortgage-calculator-guide/mortgage-amortization-schedule">amortization schedules</a> and revisit refinance math annually as rates plus equity evolve. For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor. See <a href="/terms">/terms</a>.</p>


<h2 id="score-protection">Score protection during rate shopping</h2>
<p>Multiple mortgage hard pulls within about 14 days count as one inquiry under scoring models, so compress applications into a single Monday-to-Friday sprint with three same-day estimates. Avoid opening credit cards or auto loans concurrently, keep utilization low, and freeze stray subscriptions that trigger verifications. Document scores before shopping plus after closing to confirm expected recovery within months as new accounts age.</p>

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
    "Does refinancing restart my loan term?",
  ],
  toolSlugs: ["refinance-calculator", "mortgage-calculator", "mortgage-overpayment-calculator"],
  relatedSlugs: ["mortgage-overpayment-extra-payment", "15-vs-30-year-mortgage", "how-to-calculate-mortgage-payment"],
  published: "2026-09-24",
  updated: "2026-09-28",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "breakeven", text: "Break-even rule", level: 2 },
    { id: "gotchas", text: "Three gotchas", level: 2 },
    { id: "rate-shopping", text: "Rate shopping safely", level: 2 },
    { id: "cost-anatomy", text: "Closing-cost anatomy", level: 2 },
    { id: "timing-windows", text: "Timing windows", level: 2 },
    { id: "alternatives", text: "When refinance loses", level: 2 },
    { id: "score-protection", text: "Score protection", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I know if refinancing is worth it?", answer: "Divide closing costs by monthly savings for break-even months like $4,500 ÷ $180 = 25 months. Stay past it and refinancing wins; move before and it loses. Her brother paid $4,000 to save $1,800 with 18 months left. Typical 1% drops break even around two years on mid-size balances like $300,000." },
    { question: "What is the 1% refinance rule?", answer: "A heuristic that refinancing usually pays when rates fall ~1%+. Always run your own break-even — small balances like $150,000 need bigger drops, large balances like $600,000 need smaller ones. On $300,000, 7% to 6% wins in ~23 months while 6% to 5.75% loses past five years." },
    { question: "Does refinancing restart my loan term?", answer: "A fresh 30-year does — early payments go interest-heavy again by restarting amortization in year eight. Ask about remaining-term loans (e.g. 22-year) that preserve payoff dates or keep overpaying instead. Compare remaining interest against new total costs plus closing before signing anything today with amortization tables." },
    { question: "Can refinancing remove PMI?", answer: "Yes — if appreciation pushed equity past 20%, the PMI drop alone can justify refinancing and often beats the rate cut itself. Get appraisal math before deciding, confirming loan-to-value below 80% with clean history. Time it early when interest share is highest; transferring late in tenure saves little overall." },
    { question: "Is this refinancing advice?", answer: "No — illustrative education as of Sept 2026, excluding taxes, insurance, PMI, HOA, fees and ARM resets. Compare three same-day Loan Estimates line by line for APR, points and credits. Consult a qualified advisor and compare written lender estimates with locks preserved today; see /terms." },
    { question: "What paperwork should I keep after refinancing?", answer: "Retain Loan Estimates, closing disclosures, appraisal reports, plus monthly statements showing break-even progress. File escrow analyses annually and keep records for taxes plus future moves. Set calendar alerts for break-even anniversaries to confirm savings materialized, keeping disclosures filed for taxes and refinancing comparisons after closing every year." },
  ],
};
