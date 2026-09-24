import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A colleague earning $95,000 got preapproved for $520,000 — and felt sick imagining the payment. Preapproval is a lender's maximum, not your budget. <strong>How much house can I afford</strong> has a better answer: the 28/36 rule converts income and debts into a payment ceiling, and the payment converts into a price. Here is that chain with worked numbers.</p>
<p>Part of the <a href="/blog/mortgage-calculator-guide">mortgage calculator guide</a>. Run your numbers in the <a href="/home-affordability-calculator">home affordability calculator</a>, then price payments in the <a href="/mortgage-calculator">mortgage calculator</a>.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>

<h2 id="rule">The 28/36 rule (with a worked paycheck)</h2>
<p>Gross monthly income $7,500 ($90k/year). Housing ceiling: 28% → <strong>$2,100</strong> for PITI. All-debts ceiling: 36% → $2,700; with $800 car + student payments, mortgage room = $1,900. That $1,900 — not the listing price — is the search filter. At illustrative 6%/30yr, $1,900 P&I supports roughly a $316,000 loan; plus 20% down, roughly a $395,000 home. Change the debts to $1,500 and the same income buys far less house — debts move affordability more than most buyers expect.</p>

<h2 id="inputs">The 4 inputs lenders actually weigh</h2>
<table>
<thead><tr><th>Input</th><th>What helps</th><th>What hurts</th></tr></thead>
<tbody>
<tr><td><strong>Income (gross)</strong></td><td>Stable salary, documented bonuses</td><td>Unverifiable gig income</td></tr>
<tr><td><strong>Debts (monthly)</strong></td><td>Paid-off car, low cards</td><td>$800+ in installments</td></tr>
<tr><td><strong>Down payment</strong></td><td>20%+ (no PMI, smaller loan)</td><td>Under 5% (PMI + higher rate)</td></tr>
<tr><td><strong>Credit profile</strong></td><td>750+ score, clean history</td><td>Recent misses, maxed cards</td></tr>
</tbody>
</table>
<ul>
<li><strong>DTI is the gate:</strong> preapproval, rate tier and PMI all key off debt-to-income. Pay down a $400/month car loan and watch the ceiling jump ~$50,000 in price.</li>
<li><strong>Down payment is the lever:</strong> each extra 5% down cuts the loan, the rate tier and eventually PMI. Strategy in <a href="/blog/mortgage-calculator-guide/down-payment-pmi-cost">down payment & PMI guide</a>.</li>
<li><strong>Do not max preapproval:</strong> lenders ignore daycare, savings goals and job risk. Leave 10–15% buffer under the ceiling for life.</li>
</ul>

<h2 id="co-borrow">Co-borrowers and single incomes (edge cases)</h2>
<p>Two salaries change everything and nothing: combined gross raises the ceiling, but combined debts count fully — a partner's $600 student payment erases ~$75,000 in price power. Single-income households should stress-test at 25% housing, not 28: one job means zero fallback, and lenders' maxima assume uninterrupted pay. Divorce-buyout planners: the awarded home's full payment must fit one income under 36% DTI or the settlement math may fail at refinance — confirm with your attorney and lender. Run each scenario separately in the <a href="/home-affordability-calculator">affordability calculator</a> before committing jointly — 10 minutes now beats an unaffordable approval later.</p>

<h2 id="price">From payment to price: the conversion chain</h2>
<p>Payment ceiling → subtract tax/insurance/PMI/HOA → P&I budget → invert the EMI formula at your rate and tenure → loan amount → divide by (1 − down-payment %) → home price. The <a href="/home-affordability-calculator">affordability calculator</a> runs this chain instantly; the <a href="/mortgage-calculator">mortgage calculator</a> then stress-tests the price at 5%, 6% and 7%. Buying together? Use combined gross income but combined debts too — one partner's student loans count fully. Self-employed? Lenders average 2 years of documented income; keep returns clean starting 2 years before house-hunting. India buyers: run the same chain in lakh with FOIR caps via the <a href="/emi-calculator">EMI calculator</a> and <a href="/blog/mortgage-calculator-guide/home-loan-emi-eligibility-india">India eligibility guide</a>.</p>
<p>Rates and examples as of Sept 2026, illustrative only — not a lender offer. Excludes taxes, insurance, PMI, HOA, fees and ARM resets.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>
`;

export const mortgageAfford: BlogPost = {
  pillar: "mortgage-calculator-guide",
  slug: "how-much-house-can-i-afford",
  kind: "cluster",
  title: "How Much House Can I Afford? 28/36 Rule Explained (2026)",
  description:
    "House affordability via the 28/36 DTI rule: worked $90k example, 4 lender inputs + payment-to-price chain. Free affordability calculator.",
  keywords: [
    "how much house can i afford",
    "house affordability by salary",
    "dti rule mortgage",
    "how much mortgage on 90k income",
  ],
  toolSlugs: ["home-affordability-calculator", "mortgage-calculator", "loan-calculator"],
  relatedSlugs: ["how-to-calculate-mortgage-payment", "down-payment-pmi-cost", "rent-vs-buy-house"],
  published: "2026-09-24",
  updated: "2026-09-24",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "rule", text: "28/36 rule, worked", level: 2 },
    { id: "inputs", text: "4 inputs lenders weigh", level: 2 },
    { id: "co-borrow", text: "Co-borrowers + single incomes", level: 2 },
    { id: "price", text: "Payment-to-price chain", level: 2 },
  ],
  html,
  faqs: [
    { question: "How much house can I afford on $90,000 salary?", answer: "At 28/36 with $800 monthly debts: ~$1,900 mortgage room, supporting roughly a $316,000 loan at illustrative 6%/30yr — about a $395,000 home with 20% down. Illustrative only; see /terms." },
    { question: "What is the 28/36 rule?", answer: "Lenders cap housing at 28% of gross monthly income and all debts at 36%. It sizes preapproval, rate tiers and PMI — debts move your ceiling more than buyers expect." },
    { question: "Should I buy at my full preapproval?", answer: "No — preapproval is a lender maximum ignoring daycare, savings and job risk. Leave 10–15% buffer under the ceiling." },
    { question: "How do debts affect affordability?", answer: "Every monthly debt dollar cuts mortgage room at 36% DTI. Clearing a $400/month car payment can raise buying power ~$50,000 in price." },
    { question: "Is this affordability advice?", answer: "No — illustrative education as of Sept 2026. Consult a qualified advisor and your lender for your situation; see /terms." },
  ],
};
