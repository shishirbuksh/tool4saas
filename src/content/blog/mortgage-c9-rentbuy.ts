import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>My friend in Pune rented at Rs 28,000 versus a Rs 54,000 EMI on a Rs 60L loan in 2024 — 4-year stay, renting won by roughly Rs 6L after closing plus maintenance. Same math, opposite coast: my Austin cousin staying 12 years, buying won walking away. The honest answer is always <strong>it depends on timeline, rates and local prices</strong> — which is exactly what break-even math settles. Here is the complete comparison.</p>
<p>Part of the <a href="/blog/mortgage-calculator-guide">mortgage calculator guide</a>. Size buying power in the <a href="/home-affordability-calculator">affordability calculator</a>; price payments in the <a href="/mortgage-calculator">mortgage calculator</a>.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>

<h2 id="true-cost">True cost of owning (beyond the EMI)</h2>
<ul>
<li><strong>PITI + HOA:</strong> the full monthly stack, not just P&I — see <a href="/blog/mortgage-calculator-guide">pillar PITI breakdown</a>.</li>
<li><strong>Maintenance ~1%/yr:</strong> $3,000/year on $300,000 — roofs, plumbing and appliances bill owners, never renters.</li>
<li><strong>Closing 2–6%:</strong> $6,000–18,000 sunk on day one; selling within 3 years rarely recovers it.</li>
<li><strong>Opportunity cost:</strong> $60,000 down payment invested at 7% becomes ~$118,000 in a decade — owning must beat that hurdle too.</li>
<li><strong>Minus principal repaid + appreciation:</strong> the two forces pulling back toward buying over time.</li>
</ul>

<h2 id="rule">The 5% rule + break-even years</h2>
<p>Quick screen — the <strong>5% rule</strong>: yearly unrecoverable owning costs ≈ 5% of home value (interest + tax + maintenance, roughly). $300,000 × 5% = $15,000/year vs $18,000 rent? Buying likely wins long-term. Rent at $1,000/month ($12,000)? Renting likely wins until prices or rents shift. Then refine with break-even years: total owning costs minus equity gained, versus renting + investing the down payment difference. Typical US break-even: <strong>5–7 years</strong>; under 3 years, renting almost always wins (closing costs dominate); past 10, owning usually wins (principal paydown compounds).</p>
<table>
<thead><tr><th>Stay horizon</th><th>Likely winner</th><th>Why</th></tr></thead>
<tbody>
<tr><td><strong>Under 3 years</strong></td><td>Rent</td><td>Closing costs unrecovered</td></tr>
<tr><td><strong>5–7 years</strong></td><td>Toss-up — run math</td><td>Break-even zone</td></tr>
<tr><td><strong>10+ years</strong></td><td>Buy</td><td>Principal + appreciation compound</td></tr>
</tbody>
</table>

<h2 id="when-each">When each wins (beyond math)</h2>
<ul>
<li><strong>Rent wins:</strong> uncertain job/city, high price-to-rent ratios (&gt;20× annual rent), hot rental deals, flexibility premium (founders, transfers, students).</li>
<li><strong>Buy wins:</strong> 10-year horizon, fixed payments beating rising rents, space needs rentals cannot meet, forced-savings discipline.</li>
<li><strong>Hybrid path:</strong> rent cheap + invest the difference aggressively beats stretched buying in most 5-year windows — but only if the difference is actually invested, not spent. Be honest about which person you are.</li>
<li><strong>India lens:</strong> high rental yields in some cities + 9% loan rates tilt short horizons to renting; family stability needs tilt long ones to buying. Same break-even method, local numbers via the <a href="/emi-calculator">EMI calculator</a> and <a href="/blog/mortgage-calculator-guide/home-loan-emi-eligibility-india">India guide</a>.</li>
</ul>
<h2 id="calculator-method">Run your own comparison (15-minute method)</h2>
<p>Collect four numbers: target home price, local annual rent for equivalent space, your down payment, and a mortgage quote (or illustrative 6%). Step 1: compute PITI via the <a href="/mortgage-calculator">mortgage calculator</a> plus local tax/insurance. Step 2: add 1% maintenance and amortize 2–6% closing over your horizon (divide by stay years). Step 3: subtract principal repaid by horizon end (read it off the <a href="/blog/mortgage-calculator-guide/mortgage-amortization-schedule">amortization schedule</a>). Step 4: compare against rent × years plus down-payment growth at ~7%. Whichever total is lower wins — then adjust for the non-math factors in the previous section. Most couples finish this in 15 minutes and argue about the inputs, not the method — which means the method works. Size the buying side first with the <a href="/home-affordability-calculator">affordability calculator</a>.</p>
<p>Rates and examples as of Sept 2026, illustrative only — not a lender offer. Excludes taxes, insurance, PMI, HOA, fees and ARM resets.</p>
<h2 id="couple-disagreement">When partners disagree (settle it with numbers)</h2>
<p>Rent-vs-buy splits couples more often than any spreadsheet admits — one values roots, the other freedom, and both argue math that is really emotion. The settlement protocol: each writes their horizon (years you will actually stay), then run the 15-minute method twice — once per horizon. Different horizons, different winners, both computed honestly. Then price the disagreement: if buying wins only past year 8 but one partner may relocate at year 4, the “winner” is conditional and renting wins on expected value. Non-math tiebreakers get explicit weights: school stability, commute sanity, renovation joy, landlord fatigue. Couples who quantify first and emote second decide in one evening; couples who emote first re-litigate for a year. The method does not pick sides — it prices each side's assumptions until one becomes undeniable.</p>
<blockquote class="tip">For informational purposes only — not financial advice. Estimates may vary; consult a qualified financial advisor for decisions. See <a href="/terms">/terms</a>.</blockquote>
`;

export const mortgageRentBuy: BlogPost = {
  pillar: "mortgage-calculator-guide",
  slug: "rent-vs-buy-house",
  kind: "cluster",
  title: "Rent vs Buy a House: 5% Rule + Break-Even Math (2026)",
  description:
    "Rent vs buy compared honestly: true owning costs, 5% rule, break-even years + when each wins. Free affordability + mortgage calculators.",
  keywords: [
    "renting vs buying a house",
    "rent vs buy break-even years",
    "is it cheaper to rent or buy",
    "5 percent rule renting vs buying",
  ],
  toolSlugs: ["home-affordability-calculator", "mortgage-calculator", "rent-vs-buy-calculator"],
  relatedSlugs: ["how-much-house-can-i-afford", "down-payment-pmi-cost", "how-to-calculate-mortgage-payment"],
  published: "2026-09-24",
  updated: "2026-09-24",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "true-cost", text: "True cost of owning", level: 2 },
    { id: "rule", text: "5% rule + break-even", level: 2 },
    { id: "when-each", text: "When each wins", level: 2 },
    { id: "calculator-method", text: "15-minute comparison method", level: 2 },
    { id: "couple-disagreement", text: "When partners disagree", level: 2 },
  ],
  html,
  faqs: [
    { question: "Is renting throwing money away?", answer: "No — rent buys flexibility and avoids interest, tax, maintenance, closing costs and down-payment opportunity cost. Compare total 5–7 year costs both ways instead of slogans." },
    { question: "What is the 5% rule?", answer: "Yearly unrecoverable owning costs run roughly 5% of home value (interest, tax, maintenance). Compare that against annual rent for a quick screen, then run break-even math." },
    { question: "How long until buying beats renting?", answer: "Typically 5–7 years in the US. Under 3 years renting usually wins on closing costs; past 10 years owning usually wins on principal paydown and appreciation." },
    { question: "Does rent-vs-buy differ in India?", answer: "Same method, local numbers: 9% loan rates and high yields in some cities favor short-horizon renting; use the EMI calculator with local rents and prices." },
    { question: "Is this housing advice?", answer: "No — illustrative education as of Sept 2026. Consult a qualified advisor for your situation; see /terms." },
  ],
};
