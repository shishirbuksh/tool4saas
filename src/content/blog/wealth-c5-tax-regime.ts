import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>₹12,75,000 salary, zero tax. The figure broke Indian personal-finance Twitter in 2025 and still confuses declarations in 2026: <strong>under the new regime, 87A rebate plus standard deduction can zero out tax near ₹12.75L</strong> for eligible salaried — while the old regime with full 80C/HRA/home-loan deductions wins bigger for others. Picking blind costs tens of thousands yearly. This guide runs both regimes on real salaries, explains 115BAC slabs, 87A mechanics and marginal relief, and tells you exactly when to switch.</p>
<p>Part of the <a href="/blog/sip-calculator-guide">India wealth &amp; tax guide</a>. Model your salary in the <a href="/income-tax-calculator">income tax calculator</a>; check take-home in <a href="/in-hand-salary-india">in-hand salary</a>.</p>

<h2 id="slabs">FY 2026-27 slabs: 115BAC, 87A, standard deduction</h2>
<table>
<thead><tr><th>New regime element</th><th>What it does</th><th>Watch out</th></tr></thead>
<tbody>
<tr><td><strong>115BAC slabs</strong></td><td>Graduated rates, no/few deductions</td><td>Slab creep as pay rises</td></tr>
<tr><td><strong>87A rebate</strong></td><td>Zeroes tax up to the threshold</td><td>Cliff edge + marginal relief zone</td></tr>
<tr><td><strong>Standard deduction</strong></td><td>Flat cut for salaried</td><td>Applies in both regimes</td></tr>
<tr><td><strong>4% cess</strong></td><td>On computed tax</td><td>Forgotten in hand math</td></tr>
</tbody>
</table>
<p>Verify each element against the current Finance Act before declaring — slabs and rebate limits move, and this page refreshes yearly. The calculator encodes FY 2026-27 as known in October 2026.</p>

<h2 id="crossover">Crossover: three salaries, both regimes</h2>
<table>
<thead><tr><th>Profile</th><th>New regime ≈</th><th>Old regime ≈</th><th>Winner</th></tr></thead>
<tbody>
<tr><td><strong>₹8L, minimal deductions</strong></td><td>Near-zero (87A)</td><td>Higher</td><td>New, clearly</td></tr>
<tr><td><strong>₹15L, ₹3L deductions</strong></td><td>Moderate</td><td>Lower</td><td>Old, usually</td></tr>
<tr><td><strong>₹25L, ₹5L+ deductions</strong></td><td>High</td><td>Lower</td><td>Old, clearly</td></tr>
</tbody>
</table>
<p>Pattern: low deductions favor new, heavy 80C/HRA/home-loan stacks favor old. The ₹12–13L band is the knife-edge — marginal relief softens the cliff, but a small raise can still cost disproportionately. Run your exact CTC in the <a href="/income-tax-calculator">calculator</a> with both regimes side by side; the crossover is personal, not universal.</p>

<h2 id="declaration">Declaration discipline + in-hand reality</h2>
<p>Employers need your regime choice early in the cycle — declare late and TDS defaults may over-withhold for months (recoverable at filing, painful meanwhile). Track HRA receipts, 80C proofs and home-loan certificates through the year; April scrambles lose deductions. Then convert CTC to monthly reality in the <a href="/in-hand-salary-india">in-hand salary tool</a> (PF, gratuity accounting, professional tax) — annual tax means little until it becomes monthly cash. Salaried with ESOPs, rent-free housing or foreign income: your edge cases need a CA, not a blog post.</p>
<blockquote class="tip">Informational purposes only — not tax advice. Slabs, rebates and thresholds change yearly; verify current law and consult a qualified professional. See /terms.</blockquote>
`;

export const taxRegime: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "old-vs-new-regime-2026",
  kind: "cluster",
  title: "Old vs New Tax Regime for Salaried in 2026",
  description:
    "Old vs new regime FY 2026-27: 115BAC slabs, 87A rebate, crossover salaries + declaration discipline. Free side-by-side calculator.",
  keywords: [
    "old vs new tax regime which is better for salaried 2026",
    "12.75 lakh zero tax new regime",
    "87a rebate standard deduction 2026",
    "115bac slab rates fy 2026-27",
    "ctc take home old vs new",
    "How does 87A rebate work?",
  ],
  toolSlugs: ["income-tax-calculator", "in-hand-salary-india", "salary-calculator"],
  relatedSlugs: ["ppf-extend-15-years", "fd-quarterly-tds", "sip-1-crore-goal"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "slabs", text: "Slabs and rebate", level: 2 },
    { id: "crossover", text: "Crossover salaries", level: 2 },
    { id: "declaration", text: "Declaration discipline", level: 2 },
  ],
  html,
  faqs: [
    { question: "Which regime is better for salaried in 2026?", answer: "New regime suits low-deduction profiles with near-zero tax up to 12.75 lakh through 87A rebate plus standard deduction. Old regime usually wins with heavy 80C, HRA and home-loan stacks, as shown by 15 lakh and 25 lakh crossover examples. Model your CTC side by side in the tax calculator because crossover is personal, not universal." },
    { question: "How does 87A rebate work?", answer: "Section 87A zeroes computed tax up to the threshold income for eligible taxpayers, creating near-zero liability near 12.75 lakh for salaried under new regime. Just above the line, marginal relief softens the cliff so small raises do not cost disproportionately. Verify current limits yearly against the Finance Act because slabs and rebate thresholds move." },
    { question: "What is 115BAC?", answer: "115BAC is the new-regime slab structure offering graduated rates with minimal or no deductions and standard deduction for salaried. It contrasts with old-regime slabs that allow full 80C, HRA and home-loan claims at higher marginal rates. Compare both regimes on your exact salary because slab creep as pay rises changes the winner." },
    { question: "When must I declare my regime?", answer: "Declare your regime choice early in the financial cycle to your employer so TDS reflects the correct slabs and rebate. Late declarations mean defaults may over-withhold for months, which is recoverable only at filing and painful meanwhile. Track HRA receipts, 80C proofs and home-loan certificates through the year to avoid April scrambles." },
    { question: "Does this replace a CA?", answer: "No, this comparison covers standard salaried cases with salary, 80C, HRA and home loans, not complex edge situations. Salaried taxpayers with ESOPs, rent-free housing, foreign income or capital gains need a qualified professional. Slabs, rebates and thresholds change yearly, so verify current law and consult a CA for personalized advice." },
  ],
};
