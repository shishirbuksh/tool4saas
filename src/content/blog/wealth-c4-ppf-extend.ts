import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Year 15. The PPF statement shows a fat tax-free corpus — and a decision most holders never planned for: <strong>extend in 5-year blocks, withdraw partially, or close and redeploy?</strong> The default (do nothing) lets the account go dormant-sluggish while better options compound elsewhere. This guide covers the 15-year math at 7.1%, extension rules, partial-withdrawal windows and the continue-vs-close framework.</p>
<p>Part of the <a href="/blog/sip-calculator-guide">India wealth &amp; tax guide</a>. Compare 15y vs 20y in the <a href="/ppf-calculator">PPF calculator</a>; contrast taxable growth in <a href="/fd-calculator">FD calculator</a>.</p>

<h2 id="fifteen-math">15 years at 7.1%: ₹1.5L yearly becomes what</h2>
<p>₹1.5 lakh yearly at 7.1% for 15 years matures near ₹40.7L on ₹22.5L invested — interest alone ~₹18.2L, all tax-free under EEE. The yearly ceiling (₹1.5L) and floor (₹500) shape strategy: max it early every April to capture full-year compounding (deposits before April 5 earn the whole year's interest — the single highest-ROI calendar habit in Indian saving). Miss years and the account needs revival formalities; automate standing instructions instead.</p>

<h2 id="extend-withdraw">Extend, withdraw or close: the three doors</h2>
<table>
<thead><tr><th>Option</th><th>Mechanics</th><th>Choose when</th></tr></thead>
<tbody>
<tr><td><strong>Extend (5-year blocks)</strong></td><td>With or without fresh deposits; interest continues tax-free</td><td>Rate stays competitive; no better post-tax use</td></tr>
<tr><td><strong>Partial withdraw</strong></td><td>From year 7 within prescribed limits</td><td>Goals (education, margin money) without full exit</td></tr>
<tr><td><strong>Close + redeploy</strong></td><td>Full maturity, reinvest elsewhere</td><td>Horizon shortened or superior post-tax return found</td></tr>
</tbody>
</table>
<p>Extension with deposits suits ongoing 80C needs; extension without deposits suits a pure compounding tail. Partial withdrawals after year 7 fund goals while the core keeps compounding — the feature most holders discover a decade late.</p>

<h2 id="eee-frame">EEE framing vs FD/RD reality</h2>
<p>PPF's EEE (exempt-exempt-exempt: deposit deduction, tax-free interest, tax-free maturity) routinely beats higher-headline FD rates post-tax for salaried investors in upper slabs — a 7.1% tax-free return equals ~10%+ pre-tax FD interest at 30% slab. The price is liquidity: 15-year lock-in with limited windows vs FDs you can break (with penalty). Framework: emergency + sub-3-year goals → FD/RD; 15-year tax-free core → PPF to the ₹1.5L ceiling; surplus horizon money → equity SIP (see <a href="/blog/sip-calculator-guide/sip-5000-10-years">SIP math</a>). Rate revisions come most Aprils — recheck the 7.1% assumption yearly, not decadally.</p>
<blockquote class="tip">Informational purposes only — not financial advice. PPF rules and rates revise; verify current scheme notifications. See /terms.</blockquote>
`;

export const ppfExtend: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "ppf-extend-15-years",
  kind: "cluster",
  title: "PPF After 15 Years: Extend, Withdraw or Close?",
  description:
    "PPF maturity decisions: 15-year ₹40.7L math, 5-year extension blocks, partial withdrawal windows + EEE vs FD framing. Free comparator.",
  keywords: [
    "should you extend ppf after 15 years",
    "ppf 1.5 lakh 15 years maturity",
    "eee 80c lockin extension rules",
    "ppf rate 7.1 fy 2026-27",
    "ppf partial withdrawal rule",
    "How much does ₹1.5L yearly become in 15 years?",
  ],
  toolSlugs: ["ppf-calculator", "fd-calculator", "income-tax-calculator"],
  relatedSlugs: ["fd-quarterly-tds", "old-vs-new-regime-2026", "sip-5000-10-years"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "fifteen-math", text: "15-year math", level: 2 },
    { id: "extend-withdraw", text: "Three doors", level: 2 },
    { id: "eee-frame", text: "EEE framing", level: 2 },
  ],
  html,
  faqs: [
    { question: "What happens to PPF after 15 years?", answer: "After 15 years choose three doors actively because doing nothing lets the account idle while better options compound elsewhere. Extend in 5-year blocks with or without fresh deposits while interest continues tax-free, withdraw partially within prescribed rules, or close and redeploy full maturity elsewhere. Match the choice to rates, 80C needs and post-tax alternatives." },
    { question: "How much does ₹1.5L yearly become in 15 years?", answer: "Near 40.7 lakh at 7.1 percent on 22.5 lakh invested, comprising about 18.2 lakh tax-free interest under EEE. The 1.5 lakh yearly ceiling and 500 floor shape strategy, so maximize early every April because deposits before April 5 earn whole-year interest. Automate standing instructions rather than risking missed years and revival formalities." },
    { question: "Can I withdraw PPF partially?", answer: "Yes, partial withdrawals are allowed from year 7 within prescribed limits, which most holders discover a decade late. They fund goals like education or margin money without requiring full exit, while the core keeps compounding tax-free. Extension with deposits suits ongoing 80C needs, while extension without deposits suits a pure compounding tail." },
    { question: "Is PPF better than FD after tax?", answer: "Often for salaried upper-slab investors, since 7.1 percent tax-free routinely beats higher-headline FD rates after tax. At a 30 percent slab, tax-free PPF equals more than 10 percent pre-tax FD interest, so compare post-tax keep rates rather than headlines. Balance that edge against 15-year lock-in versus FDs you can break with penalty." },
    { question: "Does the PPF rate change?", answer: "Yes, PPF rates are typically revised most Aprils, with 7.1 percent assumed for FY 2026-27 in current projections. Recheck the assumption yearly rather than decadally because extension decisions depend on competitive post-tax rates. Verify current scheme notifications before extending with deposits or continuing a compounding tail." },
  ],
};
