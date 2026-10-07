import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“I want ₹1 crore by 60.” The planner's first question back: “How old are you now?” At 25, the answer is ~₹2,800/month. At 35, ~₹8,000. At 45, ~₹28,000. <strong>Same crore, 10× monthly cost — timing is the dominant variable</strong>, bigger than returns, bigger than the starting amount. This guide works backwards from ₹1 crore across start ages, shows the early-vs-late gap in hard numbers, and adjusts for inflation so the target means something at withdrawal.</p>
<p>Part of the <a href="/blog/sip-calculator-guide">India wealth &amp; tax guide</a>. Plan it in the <a href="/retirement-calculator">retirement calculator</a>; model monthly legs in the <a href="/sip-calculator">SIP calculator</a>.</p>

<h2 id="backwards">Work backwards: monthly SIP per start age (12%, ₹1Cr at 60)</h2>
<table>
<thead><tr><th>Start age</th><th>Years</th><th>Monthly SIP ≈</th><th>Total invested</th></tr></thead>
<tbody>
<tr><td><strong>25</strong></td><td>35</td><td>₹2,800</td><td>₹11.8L</td></tr>
<tr><td><strong>30</strong></td><td>30</td><td>₹5,000</td><td>₹18.0L</td></tr>
<tr><td><strong>35</strong></td><td>25</td><td>₹8,000–9,000</td><td>₹27L</td></tr>
<tr><td><strong>45</strong></td><td>15</td><td>₹28,000</td><td>₹50.4L</td></tr>
</tbody>
</table>
<p>Annuity math (PMT×(((1+mr)^n−1)/mr)) rewards duration exponentially: five early years beat higher payments later — 25-vs-35 at ₹500/month already gaps ₹7.9L by 60. Late starters bridge with step-ups plus lump-sum seeds (bonus, arrears) rather than unaffordable flat SIPs. Verify your exact age band with presets before committing.</p>

<h2 id="shortfall">Shortfalls, inflation haircuts and the 4% lens</h2>
<p>Two adjustments before celebrating: <strong>inflation haircut</strong> — ₹1 crore in 2045 spends like ~₹31L today at 6% (see <a href="/blog/sip-calculator-guide/real-return-inflation">real returns</a>), so target ₹3Cr nominal for ₹1Cr real; and <strong>shortfall planning</strong> — a ₹20L gap at 60 needs either +₹3,500/month for the last decade or 2 extra working years, quantified in the <a href="/retirement-calculator">retirement calculator</a> with nominal, real and shortfall outputs. The 4% withdrawal lens: ₹1Cr supports ~₹33,000/month inflation-adjusted — size lifestyle to that, not to the crore number itself.</p>

<h2 id="500-vs-800">₹500 vs ₹800 monthly: the ₹3.7L lesson</h2>
<p>Same 30 years at 7%: ₹500/month → ~₹6.1L, ₹800/month → ~₹9.8L — a ₹300 habit gap compounds to ₹3.7L. Small-step framing beats crore-intimidation for beginners: start ₹500 (or theSeed-plus-SIP combo), step up 10% yearly, review at each milestone. Early-vs-late evidence again: a 25-year-old's ₹500 beats a 35-year-old's ₹800 over the same finish line. Parents: a minor's 15-year head start is the highest-ROI gift in personal finance — open early, automate, ignore.</p>
<blockquote class="tip">Informational purposes only — not financial advice. Returns, inflation and slabs vary; model bands, not points. See /terms.</blockquote>
`;

export const sipCrore: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "sip-1-crore-goal",
  kind: "cluster",
  title: "How Much SIP for ₹1 Crore? Start-Age Math",
  description:
    "₹1 crore SIP math by start age: monthly table 25→45, inflation haircut, shortfall fixes + ₹500 vs ₹800 lesson. Free goal planner.",
  keywords: [
    "how much sip needed to retire with 1 crore",
    "800 monthly 30 years corpus",
    "early vs late start 25 vs 35",
    "corpus shortfall inflation adjusted",
    "500 vs 800 monthly gap 367000",
    "What is ₹1 crore worth in 20 years?",
  ],
  toolSlugs: ["retirement-calculator", "sip-calculator", "inflation-calculator"],
  relatedSlugs: ["sip-5000-10-years", "real-return-inflation", "old-vs-new-regime-2026"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "backwards", text: "Backwards math", level: 2 },
    { id: "shortfall", text: "Shortfalls + 4% lens", level: 2 },
    { id: "500-vs-800", text: "₹500 vs ₹800", level: 2 },
  ],
  html,
  faqs: [
    { question: "How much SIP for ₹1 crore by 60?", answer: "At 12 percent, invest about 2,800 monthly from age 25, 5,000 from 30, 8,500 from 35, and 28,000 from 45 to reach 1 crore by 60. Timing dominates because five early years beat higher later payments through exponential duration rewards. Verify your age band with presets and bridge late starts with step-ups plus lump-sum seeds." },
    { question: "What is ₹1 crore worth in 20 years?", answer: "About 31 lakh of today's spending at 6 percent inflation, so a 1 crore corpus in 2045 spends far less than headlines suggest. Target about 3 crore nominal for 1 crore real purchasing power and plan in real terms. Deflate projections in the inflation calculator and extend horizons or contributions rather than retiring surprised." },
    { question: "What if my corpus falls short?", answer: "Close a 20 lakh gap at 60 with about 3,500 extra monthly for the final decade or roughly two extra working years. Model nominal, real and shortfall outputs explicitly in the retirement calculator rather than hoping markets close the gap. Late starters should combine step-ups with bonus or arrears seeds instead of unaffordable flat SIPs." },
    { question: "Does ₹500 a month even matter?", answer: "Yes, 500 monthly at 7 percent for 30 years grows to 6.1 lakh versus 9.8 lakh for 800, so a 300 habit gap compounds to 3.7 lakh. Small-step framing beats crore intimidation because a 25-year-old 500 beats a 35-year-old 800 over the finish line. Start small, step up 10 percent yearly and review at milestones." },
    { question: "How much can I withdraw from ₹1Cr?", answer: "The 4 percent withdrawal lens suggests about 33,000 monthly inflation-adjusted from 1 crore, rather than spending the headline number. Size lifestyle to sustainable withdrawal across nominal and real projections in the retirement calculator. If shortfalls appear, add contributions, extend working years, or target higher nominal amounts for the same real goal." },
  ],
};
