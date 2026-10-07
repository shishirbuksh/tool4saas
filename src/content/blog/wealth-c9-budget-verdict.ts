import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Budget 2026 retained existing slabs — no changes for FY 2026-27. One line, buried in coverage, that decides lakhs of declarations: <strong>stability is itself the verdict</strong>, because every salaried saver can now plan the full year on confirmed numbers (87A ₹60K to ₹12L, 75K standard deduction, slabs to 30% above ₹24L, equity STCG 20% flat). This post renders the authoritative verdict table — what stayed, what it means per income band, and the three actions to take before the declaration window.</p>
<p>Part of the <a href="/blog/sip-calculator-guide">India wealth &amp; tax guide</a>. Model your salary in the <a href="/income-tax-calculator">income tax calculator</a>; check capital moves in <a href="/capital-gains-tax-india">capital gains tax</a>.</p>

<h2 id="verdict-table">The verdict table: what Budget 2026 kept</h2>
<table>
<thead><tr><th>Element</th><th>Status FY 2026-27</th><th>Action</th></tr></thead>
<tbody>
<tr><td><strong>New-regime slabs</strong></td><td>Unchanged (nil–30%)</td><td>Plan full year confidently</td></tr>
<tr><td><strong>87A rebate ₹60K / ₹12L</strong></td><td>Retained</td><td>Zero-tax to ₹12.75L salaried holds</td></tr>
<tr><td><strong>Standard deduction ₹75K</strong></td><td>Retained</td><td>Declare regime early</td></tr>
<tr><td><strong>Equity STCG 20% / LTCG 12.5%</strong></td><td>Retained</td><td>Harvest per existing strategy</td></tr>
<tr><td><strong>New Income-tax Act 2025</strong></td><td>In force from April 2026</td><td>Section numbers shift; substance same</td></tr>
</tbody>
</table>
<p>Cross-check each row in the <a href="/blog/sip-calculator-guide/old-vs-new-regime-2026">regime guide</a> (crossover salaries) and <a href="/blog/sip-calculator-guide/equity-ltcg-vs-fd-tax">LTCG vs FD tax</a> (harvesting). Stability rewards early declaration — file regime choice now, not in March.</p>

<h2 id="bands">What it means per income band</h2>
<ul>
<li><strong>Under ₹12.75L salaried:</strong> effectively zero-tax under new regime — redirect planning energy from tax-saving to step-up SIPs (see <a href="/blog/sip-calculator-guide/sip-1-crore-goal">₹1 crore math</a>).</li>
<li><strong>₹12.75–20L:</strong> marginal-relief zone plus slab climb — model both regimes; 80C/HRA stacks decide.</li>
<li><strong>Above ₹20L:</strong> 25–30% slabs dominate — old-regime deductions, HRA structuring and capital-gains timing carry real money.</li>
<li><strong>Capital income:</strong> STCG 20% flat vs LTCG 12.5% above ₹1.25L/yr exemption — holding-period discipline unchanged.</li>
</ul>

<h2 id="actions">Three actions before the window closes</h2>
<ol>
<li><strong>Declare your regime</strong> with the employer now using modeled numbers, not rules of thumb.</li>
<li><strong>Front-load 80C</strong> (PPF before April 5, ELSS monthly) if old-regime-bound — back-loaded March rushes misprice.</li>
<li><strong>Schedule gain harvesting</strong> across financial years against the ₹1.25L exemption instead of bunching sales in March.</li>
</ol>
<p>Revisit next February when Budget 2027 lands — this page refreshes yearly with the verdict table as its anchor (see <a href="/blog/sip-calculator-guide/ppf-extend-15-years">PPF timing</a> for April-date discipline).</p>
<blockquote class="tip">Informational purposes only — not tax advice. Budget provisions evolve; verify the Finance Act text and consult a qualified professional. See /terms.</blockquote>
`;

export const wealthBudgetVerdict: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "budget-2026-verdict-salaried",
  kind: "cluster",
  title: "Budget 2026 Verdict: What Changed for Salaried Savers",
  description:
    "Budget 2026 verdict: retained slabs, 87A, STCG/LTCG per-band impact + 3 pre-window actions. Free tax calculators. Refreshes yearly.",
  keywords: [
    "budget 2026 salaried tax slab ltcg change?",
    "fy 2026-27 retained slabs declare regime?",
    "87a 60k 12l retained budget 2026?",
    "new income tax act 2025 sections?",
    "equity stcg 20 retained harvest?",
    "Did Budget 2026 change income tax slabs?",
  ],
  toolSlugs: ["income-tax-calculator", "capital-gains-tax-india", "sip-calculator"],
  relatedSlugs: ["old-vs-new-regime-2026", "equity-ltcg-vs-fd-tax", "sip-1-crore-goal"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "verdict-table", text: "Verdict table", level: 2 },
    { id: "bands", text: "Per-band impact", level: 2 },
    { id: "actions", text: "Three actions", level: 2 },
  ],
  html,
  faqs: [
    { question: "Did Budget 2026 change income tax slabs?", answer: "No — slabs, 87A rebate (₹60K to ₹12L), standard deduction (₹75K) and capital-gains rates are retained for FY 2026-27. Stability lets salaried taxpayers plan the full year on confirmed numbers." },
    { question: "What is the new Income-tax Act 2025?", answer: "In force from April 2026 with unchanged slab rates — section numbers shift (e.g. new-regime provisions) while substance stays. Cite new sections in filings; economics carry over." },
    { question: "Is equity STCG still 20%?", answer: "Yes, retained flat regardless of regime. LTCG stays 12.5% above the ₹1.25L annual exemption — keep harvesting across financial years." },
    { question: "What should salaried savers do now?", answer: "Declare regime early on modeled numbers, front-load 80C before April rushes, and schedule gain harvesting across years. Revisit this page each February." },
    { question: "Does this replace professional advice?", answer: "No — informational verdict on published provisions. ESOPs, foreign income and complex holdings need a qualified professional. See /terms." },
  ],
};
