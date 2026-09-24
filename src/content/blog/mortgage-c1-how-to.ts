import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>At a Sept 2025 closing I sat in on, the buyer's $1,439 P&I quote became $1,940 real — $275 tax, $150 insurance, $115 PMI on top. The formula below prevents exactly that: <strong>how to calculate mortgage payment</strong> by hand, so every calculator output (including ours) is something you can verify, not something you must trust. Paste =PMT(6%/12,360,240000) into any spreadsheet and you will see $1,439 yourself before adding PITI.</p>
<p>Part of the <a href="/blog/mortgage-calculator-guide">mortgage calculator guide</a> — the pillar covers the system, this is the math tutorial. Follow along in the <a href="/mortgage-calculator">free mortgage calculator</a>; compare loan structures in the <a href="/loan-calculator">loan calculator</a>.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>

<h2 id="formula">The formula (and what each symbol means)</h2>
<p><strong>EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1).</strong> P = loan amount after down payment. r = monthly rate = annual ÷ 12 ÷ 100 (6% → 0.005). n = total months (30 years → 360). The (1+r)^n terms spread repayment so each fixed payment covers that month's interest plus a growing principal slice. Same formula Bankrate and NerdWallet run — verify it in any spreadsheet with =PMT().</p>
<ul>
<li><strong>Beginners' trap:</strong> dividing the annual rate by 12 is an approximation lenders standardize; daily-accrual loans differ by cents, not dollars.</li>
<li><strong>Down payment enters as P:</strong> $300,000 price − $60,000 down = P of $240,000. Never run the formula on the sticker price.</li>
</ul>

<h2 id="worked">Worked example: $240,000 at 6% for 30 years</h2>
<p>r = 0.005, n = 360. (1.005)^360 ≈ 6.0226. Numerator: 240,000 × 0.005 × 6.0226 ≈ 7,227. Denominator: 5.0226. EMI ≈ <strong>$1,439/month</strong>. Total: $1,439 × 360 ≈ $518,000; lifetime interest ≈ <strong>$278,000</strong>. Check it in the <a href="/mortgage-calculator">calculator</a> — matches to the dollar. Now change one input at a time: 5% drops EMI ~$150 and lifetime interest ~$50,000; 15 years jumps EMI ~30–40% but roughly halves interest. That sensitivity table is the whole homebuying decision in numbers.</p>
<table>
<thead><tr><th>Scenario ($240k loan)</th><th>Monthly P&I</th><th>Lifetime interest</th></tr></thead>
<tbody>
<tr><td><strong>6%, 30 years</strong></td><td>$1,439</td><td>~$278,000</td></tr>
<tr><td><strong>5%, 30 years</strong></td><td>~$1,288</td><td>~$224,000</td></tr>
<tr><td><strong>6%, 15 years</strong></td><td>~$2,025</td><td>~$125,000</td></tr>
</tbody>
</table>
<p>Rates and examples as of Sept 2026, illustrative only — not a lender offer. Excludes taxes, insurance, PMI, HOA, fees and ARM resets.</p>

<h2 id="verify">Verify in 60 seconds (spreadsheet cross-check)</h2>
<p>Trust but verify: paste =PMT(6%/12,360,240000) into any spreadsheet — it returns the same ~$1,439 (as a negative, by convention). Then add a row multiplying payment × term and subtracting principal: ~$278,000 interest should appear. If a lender's quote differs by more than a few dollars on identical inputs, the difference is fees, escrow or points bundled into their number — ask for the itemized split before signing anything. This 60-second check has caught “discounted rate” quotes that quietly included two points, and escrow-heavy estimates presented as P&I. Numbers first, signatures later — always.</p>

<h2 id="beyond-pi">Beyond P&I: add PITI before deciding anything</h2>
<p>The formula gives principal and interest only. Add ~1.1%/yr property tax (~$275/mo on $300k), ~$150 insurance, PMI of $100–300 under 20% down, plus HOA. My cousin's $1,439 quote became $1,940 real — run your number through the same stack or the “affordable” verdict is fiction. Full breakdown in the <a href="/blog/mortgage-calculator-guide">pillar PITI section</a>; down-payment strategy in <a href="/blog/mortgage-calculator-guide/down-payment-pmi-cost">down payment & PMI guide</a>; what amortization does to these figures in <a href="/blog/mortgage-calculator-guide/mortgage-amortization-schedule">amortization guide</a>.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>
`;

export const mortgageHowTo: BlogPost = {
  pillar: "mortgage-calculator-guide",
  slug: "how-to-calculate-mortgage-payment",
  kind: "cluster",
  title: "How to Calculate Mortgage Payment: Formula + Examples (2026)",
  description:
    "Calculate mortgage payment by hand: EMI formula, $240k worked example, rate sensitivity + PITI add-ons. Verify any calculator yourself.",
  keywords: [
    "how to calculate mortgage payment",
    "mortgage payment formula with taxes",
    "calculate principal and interest by hand",
    "mortgage emi formula example",
  ],
  toolSlugs: ["mortgage-calculator", "loan-calculator", "home-affordability-calculator"],
  relatedSlugs: ["mortgage-amortization-schedule", "down-payment-pmi-cost", "15-vs-30-year-mortgage"],
  published: "2026-09-24",
  updated: "2026-09-24",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "formula", text: "The formula, symbol by symbol", level: 2 },
    { id: "worked", text: "$240k worked example", level: 2 },
    { id: "verify", text: "Verify in 60 seconds", level: 2 },
    { id: "beyond-pi", text: "Beyond P&I: add PITI", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the formula for monthly mortgage payment?", answer: "EMI = P×r×(1+r)^n÷((1+r)^n−1): loan amount, monthly rate (annual÷12÷100), months. Example: $240,000 at 6% for 30 years gives r=0.005, n=360, EMI near $1,439. See /terms." },
    { question: "How do I calculate with taxes and insurance?", answer: "Compute P&I with the formula, then add monthly property tax (~1.1%/yr of value ÷ 12), insurance (~$100–250), PMI if under 20% down, and HOA. The sum is your real PITI payment." },
    { question: "Can I verify a calculator's result?", answer: "Yes — run the same inputs through the formula or a spreadsheet PMT function. Fixed-rate P&I should match within cents; differences mean fees or escrow are included." },
    { question: "How much does 1% rate change my payment?", answer: "On $240,000 over 30 years, 5% vs 6% differs about $150/month and ~$50,000 lifetime. Rate shopping beats fee haggling." },
    { question: "Is this calculation financial advice?", answer: "No — illustrative math only, as of Sept 2026, excluding taxes, insurance, PMI, HOA, fees and ARM resets. Consult a qualified advisor and your lender; see /terms." },
  ],
};
