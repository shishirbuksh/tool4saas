import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Put 5% down on $300,000 and you borrow $285,000 plus ~$200/month PMI for years. Put 20% down and you borrow $240,000 with zero PMI. The gap between those two buyers exceeds $60,000 over a decade — from one decision made before house-hunting started. <strong>Down payment and PMI</strong> is where first-time buyers win or lose the most money with the least attention. Here is the full picture.</p>
<p>Part of the <a href="/blog/mortgage-calculator-guide">mortgage calculator guide</a>. Compare down-payment scenarios in the <a href="/mortgage-calculator">mortgage calculator</a>; size your budget in the <a href="/home-affordability-calculator">affordability calculator</a>.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>

<h2 id="pmi">What PMI costs (and when it dies)</h2>
<p>Private mortgage insurance protects the lender — you pay it, they benefit — on conventional loans under 20% down, typically <strong>0.5–1.5% of the loan yearly</strong> ($120–360/month on $285,000). It cancels automatically around 22% equity by law and on request at 20% with appraisal and good history. FHA loans use MIP with different (often permanent) rules — confirm your loan type before planning the exit. Fastest PMI kill: buy near 20%, then direct early overpayments at principal until the appraisal threshold, per <a href="/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment">overpayment guide</a>.</p>

<h2 id="levels">3% vs 10% vs 20%: honest comparison ($300k home, 6%)</h2>
<table>
<thead><tr><th>Down</th><th>Loan</th><th>Monthly P&I</th><th>PMI/mo</th><th>10-yr extra cost vs 20%</th></tr></thead>
<tbody>
<tr><td><strong>3% ($9k)</strong></td><td>$291,000</td><td>~$1,745</td><td>~$250</td><td>~$60,000+</td></tr>
<tr><td><strong>10% ($30k)</strong></td><td>$270,000</td><td>~$1,619</td><td>~$180</td><td>~$35,000+</td></tr>
<tr><td><strong>20% ($60k)</strong></td><td>$240,000</td><td>$1,439</td><td>$0</td><td>Baseline</td></tr>
</tbody>
</table>
<p>Rates and examples as of Sept 2026, illustrative only — not a lender offer. Excludes taxes, insurance, HOA, fees and ARM resets.</p>

<h2 id="pmi-exit-plan">PMI exit plan: the fastest $200/month raise</h2>
<p>Killing PMI early is among the highest-return moves a low-down-payment buyer makes: every extra principal dollar toward 20% equity can save ~$200/month until PMI drops. Tactics in order: overpay from month one with “PMI exit” as the explicit goal (track balance vs 80%-of-value quarterly); request removal at 20% with appraisal + clean history — servicers rarely volunteer it; consider a one-time lump when bonuses land if it crosses the threshold (crossing 6 months early saves ~$1,200); and recheck after renovations only with permits documented, since unpermitted work appraises at zero. Never refinance solely to drop PMI unless the rate math also works — break-even decides per <a href="/blog/mortgage-calculator-guide/should-i-refinance-my-mortgage">refinance guide</a>. Watch the schedule cross the line in <a href="/blog/mortgage-calculator-guide/mortgage-amortization-schedule">amortization guide</a> tables.</p>

<h2 id="strategy">Down-payment strategy (no judgment, just math)</h2>
<ul>
<li><strong>Waiting to save 20% while renting:</strong> compare rent paid during saving years against PMI + higher interest of buying now — in fast-appreciating markets, buying at 10% wins; in flat markets, waiting wins. Run both in <a href="/blog/mortgage-calculator-guide/rent-vs-buy-house">rent-vs-buy guide</a>.</li>
<li><strong>Gift funds:</strong> most programs allow documented family gifts — paper-trail them early; last-minute large deposits trigger underwriting delays.</li>
<li><strong>Assistance programs:</strong> first-time-buyer grants and 3%-down conventional options exist — cheaper than draining emergency savings to zero for 20%.</li>
<li><strong>Never zero the emergency fund:</strong> a 20% down payment that leaves 2 weeks' reserves converts one roof leak into credit-card debt. Keep 3–6 months liquid, then maximize down payment.</li>
</ul>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>
`;

export const mortgageDown: BlogPost = {
  pillar: "mortgage-calculator-guide",
  slug: "down-payment-pmi-cost",
  kind: "cluster",
  title: "Down Payment & PMI: 20% Rule, Costs & Strategy (2026)",
  description:
    "Down payment vs PMI: real cost of 3%/10%/20% down, PMI cancellation + strategy that protects savings. Free mortgage calculator scenarios.",
  keywords: [
    "how much down payment to avoid pmi",
    "pmi cost per month",
    "3 vs 10 vs 20 down payment",
    "how to cancel pmi early",
  ],
  toolSlugs: ["mortgage-calculator", "home-affordability-calculator", "mortgage-overpayment-calculator"],
  relatedSlugs: ["how-much-house-can-i-afford", "mortgage-amortization-schedule", "rent-vs-buy-house"],
  published: "2026-09-24",
  updated: "2026-09-24",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "pmi", text: "PMI cost + cancellation", level: 2 },
    { id: "levels", text: "3% vs 10% vs 20%", level: 2 },
    { id: "pmi-exit-plan", text: "PMI exit plan", level: 2 },
    { id: "strategy", text: "Down-payment strategy", level: 2 },
  ],
  html,
  faqs: [
    { question: "How much down payment avoids PMI?", answer: "20% on conventional loans. Below that, PMI runs roughly 0.5–1.5% of the loan yearly until ~20–22% equity, when it can be cancelled or drops automatically." },
    { question: "How much does PMI cost monthly?", answer: "Around $120–360/month on typical first-time-buyer balances. Rate depends on down payment size, credit score and loan type — FHA MIP follows different rules." },
    { question: "How do I cancel PMI early?", answer: "Reach 20% equity then request cancellation with an appraisal and clean payment history; it auto-terminates near 22%. Early overpayments pull the date forward." },
    { question: "Is 3% down a bad idea?", answer: "Not automatically — it costs ~$60,000+ extra over a decade versus 20% on a $300k home, but beats years of rent in rising markets. Run rent-vs-buy for your timeline." },
    { question: "Is this down-payment advice?", answer: "No — illustrative education as of Sept 2026. Consult a qualified advisor and your lender for your situation; see /terms." },
  ],
};
