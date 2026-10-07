import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>₹5,000 a month. SIP, FD, or PPF? My cousin asked me this in 2024, picked an FD at 7%, and watched a friend's SIP at 12% compound to nearly double over the same decade. Same money, same discipline, different vehicle — <strong>where Indian savings go matters as much as how much goes</strong>. This guide compares SIP vs FD vs PPF vs tax impact with real numbers for 2026: growth math, tax treatment, liquidity and the step-up trick that adds lakhs. Informational only, not financial advice — see /terms.</p>
<p>Here is the promise: you will see <strong>₹5,000/month modeled across SIP, FD and PPF</strong>, understand new-regime tax effects, compare lump sum vs SIP compounding, and learn when to extend PPF or switch regimes. Every figure below is reproducible in our free calculators — start with the <a href="/sip-calculator">SIP calculator</a> preset at ₹5,000, 12%, 10 years.</p>
<p>Part of the <a href="/blog">blog guides</a>. Project growth in <a href="/sip-calculator">SIP calculator</a>; compare interest in <a href="/compound-interest-calculator">compound interest</a>; check FD in <a href="/fd-calculator">FD calculator</a> and PPF in <a href="/ppf-calculator">PPF calculator</a>.</p>

<h2 id="head-to-head">Head-to-head: ₹5,000/month for 10 years</h2>
<table>
<thead><tr><th>Vehicle</th><th>Assumed return</th><th>Invested</th><th>Maturity ≈</th><th>Tax note</th></tr></thead>
<tbody>
<tr><td><strong>SIP (equity)</strong></td><td>12%</td><td>₹6.0L</td><td>₹11.5L</td><td>LTCG 12.5% above ₹1.25L/yr</td></tr>
<tr><td><strong>FD (cumulative)</strong></td><td>7%</td><td>₹6.0L</td><td>₹8.6L</td><td>Interest taxed at slab</td></tr>
<tr><td><strong>PPF</strong></td><td>7.1%</td><td>₹6.0L</td><td>₹8.7L</td><td>EEE — tax-free</td></tr>
<tr><td><strong>RD (for reference)</strong></td><td>6.5–7%</td><td>₹6.0L</td><td>₹8.4L</td><td>Interest taxed at slab</td></tr>
</tbody>
</table>
<p>Same ₹6 lakh in, outcomes span ₹8.4L–₹11.5L — a ₹3 lakh decision made once. Equity SIP wins on raw growth with volatility; PPF wins on guaranteed tax-free compounding; FD wins on liquidity and certainty. Risk capacity (age, horizon, emergency fund) picks among them, not headlines. Deep dives: <a href="/blog/sip-calculator-guide/sip-5000-10-years">₹5,000 SIP math</a>, <a href="/blog/sip-calculator-guide/fd-quarterly-tds">FD mechanics</a>, <a href="/blog/sip-calculator-guide/ppf-extend-15-years">PPF extension</a>.</p>

<h2 id="sip-engine">Why SIP compounding dominates long horizons</h2>
<p>SIP math is annuity future value: monthly rate 1% (12%/12) over 120 months turns ₹5,000 into ~₹11.5L — and a 10% annual step-up (₹5,000 growing with salary) pushes it past ₹17L for the same starting discipline. Time beats timing: starting at 25 vs 35 at ₹500/month creates a ₹7.9L gap by 60. Lump sums compound too, but frequency matters — monthly vs yearly rests differ by thousands (see <a href="/blog/sip-calculator-guide/lumpsum-compounding-frequency">compounding frequency</a>). Lump-sum vs SIP for the same ₹6L, step-up strategies and NAV/expense-ratio honesty live in <a href="/blog/sip-calculator-guide/sip-5000-10-years">the SIP deep dive</a>.</p>

<h2 id="fd-ppf">FD vs PPF: certainty, tax and lock-in</h2>
<p>FDs compound quarterly (a 7% headline yields ~7.19% effective), pay TDS above thresholds, and penalize premature exits — flexible, taxable, certain. PPF pays 7.1% with EEE status (deposit, interest and maturity all tax-free), 15-year lock-in with 5-year extension blocks, and ₹1.5L annual ceiling. Post-tax, PPF often beats higher-rate FDs for salaried investors in upper slabs. Decision rule: emergency and goal money inside 3 years → FD; 15-year tax-free compounding → PPF; everything else → SIP with an emergency buffer. Mechanics: <a href="/blog/sip-calculator-guide/fd-quarterly-tds">FD quarterly/TDS</a> and <a href="/blog/sip-calculator-guide/ppf-extend-15-years">PPF after 15 years</a>.</p>

<h2 id="tax-regime">Tax in 2026: new regime, 87A and real returns</h2>
<p>FY 2026-27 keeps the new-regime pull: 115BAC slabs, 87A rebate dynamics and standard deduction make ₹12.75L effectively zero-tax for eligible salaried — but old-regime deductions (80C, HRA, home-loan interest) still win for high-deduction profiles. Model both in the <a href="/income-tax-calculator">income tax calculator</a> before choosing; employers need the declaration early in the cycle. Then deflate everything: 12% nominal minus 6% inflation is ~5.7% real, and ₹10,000 today buys ~₹5,540 in a decade at 6%. Decision guide: <a href="/blog/sip-calculator-guide/old-vs-new-regime-2026">old vs new regime</a>. Reality check: <a href="/blog/sip-calculator-guide/real-return-inflation">real vs nominal returns</a>.</p>

<h2 id="goals">Goal math: how much SIP for ₹1 crore (and what tax keeps)</h2>
<p>Work backwards from the goal: ₹1 crore in 20 years at 12% needs ~₹10,000/month; starting at 25 instead of 35 nearly halves the monthly burden. Then subtract tax reality — equity LTCG at 12.5% above the ₹1.25L annual exemption vs FD interest at full slab rates changes the keep-rate materially. Goal planner: <a href="/blog/sip-calculator-guide/sip-1-crore-goal">₹1 crore SIP math</a>. Post-tax comparison: <a href="/blog/sip-calculator-guide/equity-ltcg-vs-fd-tax">LTCG vs FD tax</a>. Retirement variant in the <a href="/retirement-calculator">retirement calculator</a>.</p>
<div class="cta-box"><strong>Try it now:</strong> model ₹5,000 at 12% for 10 years in the <a href="/sip-calculator">free SIP calculator — step-up toggle, offline, no signup</a>.</div>

<h2 id="limits">Limits and honest notes</h2>
<p>Projections are illustrations with fixed returns; markets deliver sequences, not averages — a 12% mean with early crashes trails a smooth 10%. TDS, exit loads, expense ratios and slab changes all nibble realized returns. Rates and slabs cited are FY 2026-27 as known in October 2026; verify current notifications before acting. This pillar overviews; each linked cluster carries assumptions, edge cases and tool presets. Informational only, not financial advice — see /terms.</p>
<blockquote class="tip">Informational purposes only — not financial advice. Estimates vary with markets, rates and slabs; consult a qualified financial advisor for decisions. See /terms.</blockquote>
`;

export const wealthPillar: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "sip-calculator-guide",
  kind: "pillar",
  title: "SIP vs FD vs PPF: Where Should ₹5,000/Month Go (2026)",
  description:
    "SIP vs FD vs PPF compared with real numbers: head-to-head table, compounding, tax regimes, goal math + limits. Free calculators. Not financial advice.",
  keywords: [
    "sip vs fd vs ppf which is better india 2026",
    "sip vs lumpsum behavioural timing crash rule",
    "ppf vs fd tax free comparison",
    "step-up sip vs flat sip",
    "real vs nominal return after inflation",
    "What is a step-up SIP?",
  ],
  toolSlugs: ["sip-calculator", "compound-interest-calculator", "fd-calculator", "ppf-calculator"],
  relatedSlugs: ["sip-5000-10-years", "lumpsum-compounding-frequency", "fd-quarterly-tds"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "head-to-head", text: "Head-to-head table", level: 2 },
    { id: "sip-engine", text: "SIP compounding", level: 2 },
    { id: "fd-ppf", text: "FD vs PPF", level: 2 },
    { id: "tax-regime", text: "Tax in 2026", level: 2 },
    { id: "goals", text: "Goal math", level: 2 },
    { id: "limits", text: "Limits", level: 2 },
  ],
  html,
  faqs: [
    { question: "SIP vs FD vs PPF — which is better?", answer: "For 10-year growth: SIP (~₹11.5L on ₹6L invested) beats FD (~₹8.6L) and PPF (~₹8.7L tax-free). Match the vehicle to horizon, risk capacity and tax slab — not headlines: emergencies and sub-3-year goals favor FD certainty despite lower returns." },
    { question: "What is a step-up SIP?", answer: "Raising your SIP about 10% yearly alongside salary growth. On ₹5,000 at 12% over 10 years, step-up pushes maturity past ₹17L versus ₹11.5L flat — roughly 50% more for money your lifestyle never absorbed. Automate the increase each April." },
    { question: "Is PPF better than FD after tax?", answer: "Often yes for salaried investors in upper slabs: PPF's 7.1% EEE status (deposit, interest and maturity all tax-free) beats 7% FD interest taxed at slab rates, despite similar headline numbers. Compare post-tax outcomes, never headlines." },
    { question: "Old or new tax regime in 2026?", answer: "The new regime favors zero-deduction profiles with effective zero-tax up to ~₹12.75L via 87A rebate plus standard deduction; the old regime wins with heavy 80C/HRA/home-loan deduction stacks. Model both side by side before declaring — the crossover is personal." },
    { question: "What is real vs nominal return?", answer: "Nominal is headline growth; real subtracts inflation via (1+n)/(1+i)−1. Twelve percent return at 6% inflation is ~5.7% real, and ₹10,000 today buys only ~₹5,540 in a decade — which is why goals must be planned in real terms." },
    { question: "Is this financial advice?", answer: "No — informational illustrations with fixed assumptions about returns, inflation and slabs, all of which change. Markets deliver sequences, not averages. Consult a qualified financial advisor for personal decisions. See /terms." },
  ],
};
