import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Rs 60 lakh loan, 9% floating, 20 years — EMI near Rs 54,000, lifetime interest near Rs 70 lakh. More interest than principal. Every Indian homebuyer meets this shock, then asks two questions: <strong>how much EMI can I afford, and will the bank agree?</strong> This guide answers both — EMI math in lakh/crore, eligibility via CIBIL/FOIR/salary, and the prepayment lever that Indian floating loans make nearly free.</p>
<p>Part of the <a href="/blog/mortgage-calculator-guide">mortgage calculator guide</a>. Compute EMIs in the <a href="/emi-calculator">EMI calculator</a>; check eligibility in the <a href="/home-loan-eligibility-india">home loan eligibility tool</a>.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>

<h2 id="emi-math">EMI math in lakh and crore (same formula, Indian dress)</h2>
<p>Same reducing-balance formula: <strong>EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1)</strong>. Rs 60,00,000 at 9% for 20 years: r = 0.0075, n = 240 → EMI near <strong>Rs 54,000</strong>; total ≈ Rs 1.3 crore, interest ≈ Rs 70 lakh. Three levers: bigger down payment (cuts P and LTV), longer tenure to 30 years (drops EMI ~20% but adds ~Rs 40L interest), and rate negotiation — 0.5% on Rs 60L saves ~Rs 2,000/month. Stamp duty + registration (5–8% of price) sits outside the loan math but inside your cash planning — first-time buyers forget it most.</p>
<table>
<thead><tr><th>Loan (20yr @ 9%)</th><th>EMI approx</th><th>Lifetime interest approx</th></tr></thead>
<tbody>
<tr><td><strong>Rs 30L</strong></td><td>Rs 27,000</td><td>Rs 35L</td></tr>
<tr><td><strong>Rs 60L</strong></td><td>Rs 54,000</td><td>Rs 70L</td></tr>
<tr><td><strong>Rs 1Cr</strong></td><td>Rs 90,000</td><td>Rs 1.16Cr</td></tr>
</tbody>
</table>
<p>Rates and examples as of Sept 2026, illustrative only — not a lender offer. RBI repo-linked reset rules, LTV caps and fees change; confirm with your bank/HFC.</p>

<h2 id="eligibility">Eligibility: CIBIL, FOIR, salary, age</h2>
<ul>
<li><strong>CIBIL 750+:</strong> qualifies for the lowest rate slabs banks publish — below 700 I have seen the same Rs 60L file quoted 0.4% higher or rejected outright. Check the score months before applying — disputes take time.</li>
<li><strong>FOIR 50–60%:</strong> all EMIs (home + car + personal) must fit within roughly half of net monthly income. Rs 1L salary with Rs 20k car EMI leaves ~Rs 30–40k home-loan room.</li>
<li><strong>Age + tenure:</strong> loans must typically close by retirement age — a 45-year-old gets ~15 years, raising EMI versus a 30-year-old's 25. Younger applicants borrow more for the same salary.</li>
<li><strong>LTV caps:</strong> up to 90% under Rs 30L, ~80% above — the rest is down payment plus stamp/registration cash. Salaried applicants: 6 months' statements, Form 16, clean banking conduct.</li>
</ul>
<h3>Raise eligibility before applying</h3>
<p>Clear small personal loans (FOIR freed rupee-for-rupee), take the longest comfortable tenure then prepay (lower EMI qualifies more), add a co-applicant spouse (clubbed income), and wait out CIBIL dips rather than applying into rejection — hard inquiries stack. Verify with the <a href="/home-loan-eligibility-india">eligibility tool</a>.</p>

<h2 id="balance-transfer">Balance transfer: India's refinance by another name</h2>
<p>Floating rates differ across banks by 0.5–1%+ — moving your outstanding to a cheaper lender (balance transfer) replicates refinancing without the US-style closing circus. Math first: transfer costs (processing ~0.5%, legal, MODT charges) versus monthly EMI drop over your remaining tenure. Rs 50L outstanding with 15 years left, 9.5% → 8.75%: EMI falls ~Rs 2,200, break-even inside a year. Negotiate with your current bank first — retention desks routinely match transfers to keep the book, saving you the paperwork entirely. Time it early in the tenure when interest share is highest; transferring in year 18 of 20 saves little. Compare retention offer vs transfer via the <a href="/emi-calculator">EMI calculator</a> at both rates, and confirm no hidden reset clauses before signing.</p>

<h2 id="prepay">Prepayment: Indian floating loans' superpower</h2>
<p>Floating-rate home loans carry near-zero prepayment penalties — so annual bonuses routed to principal demolish lifetime interest. Rs 2L yearly prepayment on the Rs 60L example can cut ~5+ years and ~Rs 25L+ interest (illustrative). Park bonuses automatically via part-payment standing instructions; even Rs 50,000/year moves the needle. Fixed-rate loans may charge ~2% — check your sanction letter first. US/UK readers: same mechanics as <a href="/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment">extra payments</a>, different penalty regimes.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>
`;

export const mortgageIndia: BlogPost = {
  pillar: "mortgage-calculator-guide",
  slug: "home-loan-emi-eligibility-india",
  kind: "cluster",
  title: "Home Loan EMI & Eligibility India: CIBIL, FOIR, Prepayment (2026)",
  description:
    "India home loan guide: EMI math in lakh/crore, CIBIL 750 + FOIR eligibility, raising limits + prepayment superpower. Free EMI + eligibility tools.",
  keywords: [
    "home loan emi calculator india",
    "home loan eligibility india",
    "cibil score home loan 750",
    "foir home loan meaning",
    "home loan prepayment india",
  ],
  toolSlugs: ["emi-calculator", "home-loan-eligibility-india", "mortgage-calculator"],
  relatedSlugs: ["how-to-calculate-mortgage-payment", "mortgage-overpayment-extra-payment", "how-much-house-can-i-afford"],
  published: "2026-09-24",
  updated: "2026-09-24",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "emi-math", text: "EMI math in lakh/crore", level: 2 },
    { id: "eligibility", text: "CIBIL, FOIR, salary, age", level: 2 },
    { id: "balance-transfer", text: "Balance transfer tactic", level: 2 },
    { id: "prepay", text: "Prepayment superpower", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the EMI for a Rs 60 lakh home loan?", answer: "At illustrative 9% for 20 years: near Rs 54,000/month with lifetime interest near Rs 70 lakh. Longer tenure or lower rates cut EMI; bigger down payments cut both. Illustrative as of Sept 2026; see /terms." },
    { question: "What CIBIL score is needed for a home loan?", answer: "750+ qualifies for the lowest slabs banks publish; below 700 expect higher rates or rejection. Check and dispute months before applying — inquiries stack." },
    { question: "What is FOIR in home loans?", answer: "Fixed-Obligation-to-Income Ratio: all EMIs must fit roughly 50–60% of net monthly income. Clearing small loans frees eligibility rupee-for-rupee." },
    { question: "Is prepayment allowed on Indian home loans?", answer: "Floating-rate loans carry near-zero prepayment penalties — annual bonus prepayments demolish lifetime interest. Fixed-rate loans may charge ~2%; check your sanction letter." },
    { question: "Is this home loan advice?", answer: "No — illustrative education only. RBI rules, LTV caps and fees change; confirm with your bank/HFC and a qualified advisor; see /terms." },
  ],
};
