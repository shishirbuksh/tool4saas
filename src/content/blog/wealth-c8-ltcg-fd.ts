import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>₹2L equity gains, ₹2L FD interest. Tax bills: ~₹9,500 vs ~₹62,400. Same profit, 6.5× different tax — <strong>India taxes how you earn more than how much you earn</strong>. Equity LTCG at 12.5% above a ₹1.25L annual exemption vs FD interest at full slab rates rewrites every “which is better” comparison that ignores tax. This guide runs the FIFO holding rules, exemption math, cess layering and post-tax keep-rates so comparisons use net numbers.</p>
<p>Part of the <a href="/blog/sip-calculator-guide">India wealth &amp; tax guide</a>. Compute liabilities in <a href="/capital-gains-tax-india">capital gains tax</a>; model FD legs in <a href="/fd-calculator">FD calculator</a>.</p>

<h2 id="rules">Holding rules: 12 months vs 24 months, FIFO always</h2>
<table>
<thead><tr><th>Asset</th><th>Long-term after</th><th>LTCG rate</th><th>Short-term rate</th></tr></thead>
<tbody>
<tr><td><strong>Listed equity</strong></td><td>12 months</td><td>12.5% above ₹1.25L/yr</td><td>20%</td></tr>
<tr><td><strong>Property, gold</strong></td><td>24 months</td><td>12.5% (no indexation)</td><td>Slab rate</td></tr>
<tr><td><strong>FD interest</strong></td><td>N/A (always income)</td><td>—</td><td>Slab rate</td></tr>
</tbody>
</table>
<p>FIFO ordering decides which units sell first — and therefore which rate applies. Partial profit-booking across financial years splits gains under the ₹1.25L annual exemption repeatedly (see exemption play below). Debt fund taxation follows its own post-2026 treatment; verify current classification before assuming equity-like rates.</p>

<h2 id="exemption">The ₹1.25L exemption play (plus 4% cess)</h2>
<p>Equity LTCG exempts ₹1.25L per year — harvest gains annually up to the line and reset cost basis, legally compounding tax-free slices. Example: ₹2L gain → taxable ₹75,000 → 12.5% = ₹9,375 + 4% cess ≈ ₹9,750 total. Same ₹2L as FD interest at 30% slab: ₹60,000 + cess ≈ ₹62,400. Then layer cess mentally last: 4% on computed tax, small but never zero, and the line most hand-math forgets. Use the <a href="/capital-gains-tax-india">capital gains tool</a> with exemption-used tracking across the year.</p>

<h2 id="keep-rate">Post-tax keep-rate: the only comparison that counts</h2>
<ul>
<li><strong>Equity 3-year hold, 30% slab investor:</strong> ~13% gross → ~12%+ net after exemption-efficient harvesting. Winner for horizons past 3 years.</li>
<li><strong>FD 3-year hold, same investor:</strong> 7% gross → ~4.8% net. Certainty costs ~7 points vs equity — acceptable for goals, fatal for retirement.</li>
<li><strong>1-year horizon:</strong> equity STCG 20% vs FD slab — FD often wins net; match instrument to horizon, not headlines.</li>
<li><strong>Gold/property:</strong> 24-month clock + 12.5% LTCG; illiquidity and transaction costs dominate the tax story — model all-in, not rates alone.</li>
</ul>
<p>Revisit every budget: exemption limits, holding periods and surcharge slabs move. Pair with <a href="/blog/sip-calculator-guide/old-vs-new-regime-2026">regime planning</a> — salary slab determines which keep-rate table row you live in.</p>
<blockquote class="tip">Informational purposes only — not tax advice. Rates, exemptions and classifications change; verify current law and consult a qualified professional. See /terms.</blockquote>
`;

export const ltcgFd: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "equity-ltcg-vs-fd-tax",
  kind: "cluster",
  title: "Equity LTCG vs FD Tax: Post-Tax Keep Rates",
  description:
    "Equity LTCG 12.5% vs FD slab tax: holding-period table, ₹1.25L exemption harvesting, cess + horizon-based keep rates. Free tax tool.",
  keywords: [
    "how equity ltcg tax compares to fd tax india",
    "equity gains tax holding 1 year",
    "ltcg vs stcg fifo",
    "debt vs equity tax after 2026",
    "capital gains vs interest slab",
    "Is FD interest taxed more than equity gains?",
  ],
  toolSlugs: ["capital-gains-tax-india", "fd-calculator", "income-tax-calculator"],
  relatedSlugs: ["old-vs-new-regime-2026", "fd-quarterly-tds", "sip-1-crore-goal"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "rules", text: "Holding rules", level: 2 },
    { id: "exemption", text: "Exemption play", level: 2 },
    { id: "keep-rate", text: "Keep-rate comparison", level: 2 },
  ],
  html,
  faqs: [
    { question: "How is equity LTCG taxed in India?", answer: "Listed equity held over 12 months pays 12.5 percent above a 1.25 lakh annual exemption, plus 4 percent cess on computed tax. Holdings under 12 months pay 20 percent as short-term gains. Harvest gains annually up to the exemption line to reset cost basis, track exemption used across the year, and verify debt classifications separately." },
    { question: "Is FD interest taxed more than equity gains?", answer: "Usually yes for upper slabs because 2 lakh FD interest at 30 percent costs about 62,400 including cess, while equivalent equity LTCG costs about 9,750 after exemption. Equity exempts 1.25 lakh yearly, leaving 75,000 taxable at 12.5 percent plus cess. That 6.5-times gap shows India taxes how you earn more than how much you earn." },
    { question: "What is FIFO in capital gains?", answer: "First-in-first-out ordering decides which units sell first and therefore which holding period and rate apply on partial sales. Book profits partially across financial years to split gains under the 1.25 lakh annual exemption repeatedly. That harvesting resets basis legally and compounds tax-free slices instead of bunching gains in one year." },
    { question: "Should short horizons still use equity?", answer: "Rarely, because 1-year equity short-term gains at 20 percent often net below FD certainty after tax and volatility. FD interest taxed at slab still wins net for brief horizons where compounding has little time. Match instrument to horizon rather than headlines, reserving equity for horizons past 3 years where keep-rates dominate." },
    { question: "Do gold and property follow equity rules?", answer: "No, gold and property turn long-term after 24 months with 12.5 percent LTCG and no indexation, while short-term gains follow slab rates. Illiquidity and transaction costs often dominate the tax story beyond headline rates. Model all-in costs, revisit budgets yearly for exemption and holding changes, and pair with regime planning for your slab." },
  ],
};
