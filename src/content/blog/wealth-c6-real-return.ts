import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“12% returns!” — with 6% inflation quietly eating half. The statement showed growth; the grocery bill showed truth. <strong>Nominal returns impress, real returns feed</strong>: 12% minus 6% inflation is ~5.7% real, and ₹10,000 today buys ~₹5,540 in a decade at 6%. Every projection in this blog's calculators has this shadow twin. This guide teaches deflating any return, the Rule of 72 shortcut, personal-vs-CPI inflation, and why the SIP-vs-FD debate changes entirely in real terms.</p>
<p>Part of the <a href="/blog/sip-calculator-guide">India wealth &amp; tax guide</a>. Deflate projections in the <a href="/inflation-calculator">inflation calculator</a>; grow them in the <a href="/sip-calculator">SIP calculator</a> first.</p>

<h2 id="deflate">Deflate any return (the division, not subtraction)</h2>
<p>Precisely: real = (1+nominal)/(1+inflation) − 1. At 12% and 6%: 1.12/1.06 − 1 ≈ 5.66% — close to naive 6%, and the gap widens at higher rates (never subtract when precision matters). Worked: ₹10,000 at 6% inflation for 10 years → 10000/1.06^10 ≈ ₹5,540 of today's purchasing power. A “₹1 crore corpus” at 6% inflation over 20 years spends like ₹31L today — still life-changing, but plan in real terms or retire surprised. Run both directions in the <a href="/inflation-calculator">calculator</a>: future value of money and required nominal for a real target.</p>

<h2 id="rule72">Rule of 72 (and when it lies)</h2>
<table>
<thead><tr><th>Rate</th><th>Doubling time ≈</th><th>Use</th></tr></thead>
<tbody>
<tr><td><strong>6% inflation</strong></td><td>12 years to halve money</td><td>Purchasing-power gut checks</td></tr>
<tr><td><strong>12% returns</strong></td><td>6 years to double</td><td>Equity horizon sanity</td></tr>
<tr><td><strong>3% inflation</strong></td><td>24 years to halve</td><td>Conservative planning</td></tr>
</tbody>
</table>
<p>72 ÷ rate ≈ doubling (or halving) years. Accurate within months for 4–12%; drifts at extremes (use exact math past 15%). The memorable corollary: money halves every 24 years even at “mild” 3% inflation — cash is a melting ice cube, and every idle-year decision should feel that cold.</p>

<h2 id="personal-cpi">Your inflation ≠ CPI (rent weighs 34%+ for you, maybe 10% for CPI)</h2>
<p>CPI baskets average the nation; your basket is rent, education, healthcare and food in your city. Urban renters facing 8–10% annual hikes live 3+ points above headline CPI; homeowners with fixed EMIs live below it. Build a personal index: weight your top 5 expenses, track yearly, compare against the 6% default in projections. Then revisit the SIP-vs-FD verdict in <a href="/blog/sip-calculator-guide/sip-5000-10-years">SIP math</a> — at 8% personal inflation, even 12% nominal leaves ~3.7% real, and horizons must extend or contributions rise (see <a href="/blog/sip-calculator-guide/sip-1-crore-goal">₹1 crore planning</a>).</p>
<blockquote class="tip">Informational purposes only — not financial advice. Inflation regimes shift; recheck assumptions yearly. See /terms.</blockquote>
`;

export const realReturn: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "real-return-inflation",
  kind: "cluster",
  title: "Real vs Nominal Returns: Inflation-Adjusted Math",
  description:
    "Real returns explained: deflation formula, Rule of 72 table, personal-vs-CPI inflation + SIP verdicts in real terms. Free calculator.",
  keywords: [
    "how inflation shrinks sip returns real vs nominal",
    "10000 in 10 years 3 percent inflation power",
    "rule of 72 halve in 24 years",
    "cpi vs personal inflation rent",
    "nominal 12% minus 6% real",
    "What is the difference between real and nominal returns?",
  ],
  toolSlugs: ["inflation-calculator", "sip-calculator", "retirement-calculator"],
  relatedSlugs: ["sip-5000-10-years", "lumpsum-compounding-frequency", "sip-1-crore-goal"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "deflate", text: "Deflation formula", level: 2 },
    { id: "rule72", text: "Rule of 72", level: 2 },
    { id: "personal-cpi", text: "Personal inflation", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the difference between real and nominal returns?", answer: "Nominal is headline growth while real subtracts inflation through one plus nominal divided by one plus inflation minus one. Twelve percent nominal at 6 percent inflation equals about 5.7 percent real, not 6 percent by subtraction. Use division when precision matters because the gap widens at higher rates, then deflate projections in the inflation calculator." },
    { question: "How does the Rule of 72 work?", answer: "Divide 72 by the rate for doubling or halving years, so 12 percent doubles in 6 years and 6 percent halves money in 12 years. The shortcut stays accurate for 4 to 12 percent but drifts at extremes. Use exact math past 15 percent and remember 3 percent halves money in 24 years." },
    { question: "Is CPI my inflation rate?", answer: "Rarely, because CPI averages baskets while your spending weights rent, education, healthcare and food in your city. Urban renters facing 8 to 10 percent hikes often live 3 points above headline CPI, while homeowners with EMIs live below it. Build a personal index from your top five expenses and compare against the 6 percent default." },
    { question: "How much will ₹10,000 be worth in 10 years?", answer: "About 5,540 of today's purchasing power at 6 percent inflation, calculated as 10,000 divided by 1.06 to the power 10. A 1 crore corpus over 20 years at 6 percent spends like 31 lakh, which is life-changing but different. Plan goals in real terms and run directions in the calculator for future value and nominal." },
    { question: "Does inflation change SIP vs FD choice?", answer: "Yes, inflation compresses both options but fixed returns suffer more in real terms, changing SIP-versus-FD verdicts entirely. At 8 percent personal inflation, even 12 percent nominal leaves about 3.7 percent real. Extend horizons or raise contributions when personal inflation exceeds CPI, and revisit projections from SIP math with real targets." },
  ],
};
