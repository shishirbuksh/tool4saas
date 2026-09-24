import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>An extra $200 a month on a $240,000 loan cuts roughly 7 years and saves tens of thousands in interest. No refinance paperwork, no appraisal, no closing costs — just principal paid early, skipping interest on all remaining months. <strong>Mortgage overpayment</strong> is one of the highest-certainty uses of spare cash (illustrative — always compare against higher-rate debt first), and this guide shows exactly how much different amounts save, plus the UK 10% rule and prepayment traps.</p>
<p>Part of the <a href="/blog/mortgage-calculator-guide">mortgage calculator guide</a>. Model your extra payments in the <a href="/mortgage-overpayment-calculator">overpayment calculator</a>; compare against refinancing in the <a href="/refinance-calculator">refinance calculator</a>.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>

<h2 id="math">The math: what $100, $200, $500 extra buys ($240k/6%/30yr)</h2>
<table>
<thead><tr><th>Extra/month</th><th>Years saved (approx)</th><th>Interest saved (approx)</th></tr></thead>
<tbody>
<tr><td><strong>+$100</strong></td><td>~4 years</td><td>Tens of thousands</td></tr>
<tr><td><strong>+$200</strong></td><td>~7 years</td><td>~$70,000+</td></tr>
<tr><td><strong>+$500</strong></td><td>~12 years</td><td>~$130,000+</td></tr>
<tr><td><strong>Biweekly (half-payment every 2 wks)</strong></td><td>~4 years</td><td>One extra payment/year effect</td></tr>
</tbody>
</table>
<p>Why it works: early principal skips interest across all 360 months — front-loaded amortization makes year-1 extra dollars the hardest-working money in the loan. See year-by-year mechanics in <a href="/blog/mortgage-calculator-guide/mortgage-amortization-schedule">amortization guide</a>.</p>
<p>Rates and examples as of Sept 2026, illustrative only — not a lender offer. Excludes taxes, insurance, PMI, HOA, fees and ARM resets.</p>

<h2 id="rules">Rules that decide if overpaying is right</h2>
<ul>
<li><strong>UK 10% rule:</strong> most UK lenders allow ~10% of balance penalty-free yearly — check yours before larger overpayments; penalties can erase the gain.</li>
<li><strong>US prepayment penalties:</strong> rare on mainstream fixed loans, common on some subprime/ARM products — read the note, then overpay.</li>
<li><strong>Emergency fund first:</strong> extra principal is illiquid (retrievable only via sale or refinance). Six months' expenses saved beats year-7 payoff math.</li>
<li><strong>Higher-interest debt first:</strong> 20% credit cards and 8% student loans mathematically outrank 6% mortgage extra payments — kill those, then overpay.</li>
<li><strong>Specify “principal only”:</strong> some servicers park extra cash as “next payment” (including interest) unless labeled. Mark every extra payment principal-only and verify the statement.</li>
</ul>

<h2 id="lump-vs-monthly">Lump sums vs monthly: which saves more?</h2>
<p>A $6,000 yearly bonus applied once beats $500/month dripped — slightly. Lump money kills principal 11 months earlier on average, skipping nearly a year of interest on that chunk. But dripped monthly wins behaviorally: autopay survives, “I'll prepay at bonus time” often evaporates into vacations. The practical ranking: automated monthly first (the habit), lump bonuses second (the accelerator), windfalls third (tax refunds, RSU vests — straight to principal unless higher-rate debt exists). On the $240k example, $500/month plus one $5,000 yearly lump approaches ~15 years off combined. Model your exact mix in the <a href="/mortgage-overpayment-calculator">overpayment calculator</a> — then automate the monthly part this week.</p>

<h2 id="auto">Automate it or lose it (the biweekly trick)</h2>
<p>Willpower fails; autopay does not. Splitting the monthly payment in half and paying biweekly creates one extra full payment yearly (26 halves = 13 months) — ~4 years saved with zero budgeting pain. Annual-bonus lump sums work the same way: one $5,000 yearly extra on the example loan saves roughly 3+ years. Set the automation the week the mortgage starts; lifestyle fills every unallocated dollar within months. Refinancing instead? Break-even decides — <a href="/blog/mortgage-calculator-guide/should-i-refinance-my-mortgage">refinance guide</a>.</p>
<h2 id="invest-instead">Overpay vs invest: the honest comparison</h2>
<p>The overpayment debate has a legitimate other side: markets. $500/month extra at 6% mortgage saves a guaranteed ~6% (the avoided interest); the same $500 in index funds might earn ~7–10% long-term — with volatility, taxes and zero guarantees. Framework: above 7% mortgage rates, overpaying usually wins risk-adjusted; below 5%, investing usually wins on expected value (consult your advisor for your tax picture); between 5–7%, split the difference and sleep well. Non-math factors break ties: no debt tolerance (overpay), employer 401(k) match left on the table (invest first — 100% instant return), PMI exit within reach (overpay — the $200/month raise beats both). Anyone promising one answer for everyone is selling something; run both scenarios with your numbers, then pick the one that survives your risk tolerance.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>
`;

export const mortgageOverpay: BlogPost = {
  pillar: "mortgage-calculator-guide",
  slug: "mortgage-overpayment-extra-payment",
  kind: "cluster",
  title: "Extra Mortgage Payments: Interest Saved & 10% Rules (2026)",
  description:
    "Mortgage overpayment math: $100/$200/$500 extra savings, biweekly trick, UK 10% rule + prepayment traps. Free overpayment calculator.",
  keywords: [
    "mortgage overpayment calculator",
    "extra mortgage payment save interest",
    "biweekly vs monthly mortgage",
    "uk overpayment 10 percent rule",
  ],
  toolSlugs: ["mortgage-overpayment-calculator", "refinance-calculator", "mortgage-calculator"],
  relatedSlugs: ["mortgage-amortization-schedule", "should-i-refinance-my-mortgage", "15-vs-30-year-mortgage"],
  published: "2026-09-24",
  updated: "2026-09-24",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "math", text: "$100/$200/$500 savings math", level: 2 },
    { id: "rules", text: "Rules: when overpaying fits", level: 2 },
    { id: "lump-vs-monthly", text: "Lump sums vs monthly", level: 2 },
    { id: "auto", text: "Automate: biweekly trick", level: 2 },
    { id: "invest-instead", text: "Overpay vs invest", level: 2 },
  ],
  html,
  faqs: [
    { question: "How much do extra mortgage payments save?", answer: "On $240,000 at 6%/30yr: +$200/month cuts roughly 7 years and saves tens of thousands in interest; +$500 saves roughly 12 years. Early principal skips interest across all remaining months." },
    { question: "Is biweekly better than monthly?", answer: "Half-payments every two weeks equal 13 monthly payments yearly — about 4 years saved with no budgeting pain. Same effect as one extra payment per year." },
    { question: "Can I overpay without penalty in the UK?", answer: "Most UK lenders allow ~10% of balance yearly penalty-free. Check your terms first — penalties on larger amounts can erase the gain." },
    { question: "Should extra cash go to mortgage or savings?", answer: "Six months' emergency fund and higher-interest debts (cards, 8% student loans) come first — extra principal is illiquid until sale or refinance." },
    { question: "Is this overpayment advice?", answer: "No — illustrative education as of Sept 2026. Mark extra payments principal-only, verify statements, and consult a qualified advisor; see /terms." },
  ],
};
