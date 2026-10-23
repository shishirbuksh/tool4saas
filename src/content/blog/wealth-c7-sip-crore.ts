import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>₹1 crore by 60 sounds like one goal. The monthly SIP needed to get there depends heavily on when you start. At a flat 12% annual return with monthly compounding, a 25-year-old needs about ₹1,540 a month. A 30-year-old needs about ₹2,833. A 35-year-old needs about ₹5,270, and a 40-year-old needs about ₹10,009. The target is identical; the monthly cost is not.</p>
<p>Those are nominal figures. If you want the corpus to have ₹1 crore of purchasing power in today's terms at 60, the target itself must grow with inflation. At 6%, the required SIP rises to about ₹11,833 at 25 and ₹32,099 at 40. The <a href="/sip-calculator">SIP calculator</a> projects a flat contribution; it does not solve for a goal. This guide shows the reverse math, the inflation adjustment, and how to check your own number. It is part of the <a href="/blog/sip-calculator-guide">India wealth and tax guide</a>.</p>

<h2 id="backwards">Working backwards from ₹1 crore: SIP by start age</h2>
<p>The flat SIP formula can be rearranged to solve for the contribution. If FV is the target, i is the monthly rate, and n is the number of months, then <strong>M = FV × i ÷ [((1 + i)^n − 1) × (1 + i)]</strong>. The (1 + i) factor again reflects a contribution at the start of each month.</p>
<p>Worked example one: a 25-year-old has 35 years, or 420 months, to age 60. With i = 0.01, the denominator works out to about 64.95, so ₹1 crore requires about ₹1,539.58 a month. Worked example two: a 40-year-old has 20 years, or 240 months. The same formula gives about ₹10,008.53 a month. The target did not change; the time to compound did.</p>
<p>Here is the full set. The nominal column keeps the target at ₹1 crore. The inflation-adjusted column raises the target by 6% a year to age 60, then solves for the SIP that would produce that larger nominal sum. Both columns use the same 12% return and start-of-month contributions.</p>
<table>
<thead><tr><th>Start age</th><th>Years to 60</th><th>Nominal ₹1Cr SIP</th><th>Inflation-adjusted SIP</th></tr></thead>
<tbody>
<tr><td><strong>25</strong></td><td>35</td><td>₹1,540</td><td>₹11,833</td></tr>
<tr><td><strong>30</strong></td><td>30</td><td>₹2,833</td><td>₹16,271</td></tr>
<tr><td><strong>35</strong></td><td>25</td><td>₹5,270</td><td>₹22,617</td></tr>
<tr><td><strong>40</strong></td><td>20</td><td>₹10,009</td><td>₹32,099</td></tr>
</tbody>
</table>
<p>The jump is steep. A 10-year delay from 25 to 35 raises the nominal SIP from ₹1,540 to ₹5,270, about 3.4 times. Stretch the delay to 15 years, starting at 40, and the required amount becomes ₹10,009, about 6.5 times the age-25 figure. The later you start, the more each month has to carry because fewer months are available to compound.</p>
<p>The return assumption matters too. At 10%, the 30-year-old's nominal target needs about ₹4,387 a month; at 14%, about ₹1,800. A two-point change in the assumed return moves the answer by thousands. Twelve percent is a planning input, not a promise. Test 10% and 12% in the calculator before committing to a contribution you cannot sustain.</p>
<p>The SIP calculator has no goal mode. To find your number, enter a monthly amount and adjust it until the future value is close to the target, or solve the formula in a spreadsheet. The <a href="/retirement-calculator">retirement calculator</a> accepts an optional goal and shows a shortfall, which is useful for checking a plan, but it also does not calculate the required monthly contribution for you.</p>
<p>The reverse math also assumes the SIP starts from zero. If you already hold ₹5 lakh, that money compounds too: at 12% for 25 years it grows to about ₹85.0 lakh, leaving roughly ₹15 lakh to fund, so the required monthly contribution falls to about ₹790. The SIP calculator does not accept an existing balance. Subtract the future value of your current savings from the target before solving, or use the retirement calculator's corpus and shortfall view to see the combined effect.</p>
<p>Costs change the answer. A 1% annual expense ratio turns a 12% gross assumption into roughly 11% net; the age-30 requirement rises from ₹2,833 to about ₹3,533. Taxes on gains and any exit load add another drag. The calculator does not know your fund's expense ratio, so the 12% input should be treated as a gross assumption, not a net return you can spend.</p>

<h2 id="shortfall">Nominal versus real: why ₹1 crore may not be enough</h2>
<p>₹1 crore received in 35 years is not ₹1 crore of today's spending. At 6% inflation, its purchasing power is about ₹13 lakh in today's money. A 25-year-old who wants ₹1 crore of today's purchasing power at 60 therefore needs a nominal target of about ₹7.69 crore. A 40-year-old needs about ₹3.21 crore because the money has only 20 years to lose value before it is spent. That is why the inflation-adjusted SIP column is so much larger.</p>
<p>Worked example: a 35-year-old investing ₹3,000 a month at 12% for 25 years accumulates about ₹56.9 lakh by 60. The nominal shortfall against ₹1 crore is about ₹43.1 lakh. Raising the SIP to the required ₹5,270 closes it on paper, but that still targets nominal ₹1 crore. If the goal is ₹1 crore in today's purchasing power, the target is about ₹4.29 crore and the required SIP is about ₹22,617. A ₹5,270 contribution would leave a much larger gap.</p>
<p>The common 4% withdrawal shortcut is another check. Four percent of ₹1 crore is ₹4 lakh a year, or about ₹33,000 a month in the first year. That is a starting point, not a guarantee. Taxes, fees, inflation, and the order in which returns arrive can all reduce what the corpus supports. A plan that assumes a smooth 12% return every year is ignoring sequence risk: a poor market early in retirement can hurt more than the same poor return later.</p>
<p>Keep nominal and real separate. The inflation-adjusted SIP column does not raise the return; it raises the target. The return stays 12% nominal, and 6% inflation means the real return is only about 5.7%. If inflation averages 5% or 7%, the required SIP moves in the opposite direction, so test both. The point of the real column is to stop a future ₹1 crore from feeling larger than it will be.</p>
<p>Other caveats belong in the same sentence as the projection: returns are not fixed, inflation may average more or less than 6%, equity gains are taxed, fund fees reduce the compounding rate, income may not grow as planned, and an emergency fund should sit outside the retirement corpus. The calculator cannot model a salary pause, a market crash, or a change in tax law. Use it to compare scenarios, not to certify an outcome.</p>

<h2 id="500-vs-800">Why ₹500 still matters, and how to close a shortfall</h2>
<p>Small contributions are not enough for ₹1 crore on their own, but they change the starting point. At 12% for 30 years, ₹500 a month grows to about ₹17.65 lakh and ₹800 a month grows to about ₹28.24 lakh. The ₹300 difference becomes about ₹10.59 lakh, which is the cost of waiting to increase the amount. The point is not that ₹500 is sufficient; it is that a small, sustainable start is easier to raise later than a large contribution you abandon.</p>
<p>Starting early also beats starting bigger. ₹500 a month from age 25 for 35 years grows to about ₹32.48 lakh at 12%. ₹800 a month from age 35 for 25 years grows to about ₹15.18 lakh. The earlier start wins despite the smaller monthly amount, because the first contributions compound for a decade longer. This is the same lesson as the table, applied at a smaller scale.</p>
<p>If the projected corpus falls short, the levers are straightforward: contribute more, extend the horizon, lower the target, or add a lump sum when a bonus or inheritance arrives. Increasing a SIP by 5% or 10% a year is also powerful, but the calculator does not model step-up contributions. Work that schedule out separately, and keep the increase realistic. A plan that assumes a raise every year can fail in a year without one.</p>
<p>The most useful next step is to run your own age, contribution, and rate in the SIP calculator, then check the real value in the <a href="/inflation-calculator">inflation calculator</a>. The notes on <a href="/blog/sip-calculator-guide/real-return-inflation">real returns</a>, <a href="/blog/sip-calculator-guide/sip-5000-10-years">₹5,000 SIP growth</a>, and <a href="/blog/sip-calculator-guide/old-vs-new-regime-2026">tax regimes</a> fill in the parts a single projection leaves out. Treat the result as a range, not a finish line.</p>
<blockquote class="tip">Educational information only, not financial advice. The 12% return and 6% inflation inputs are illustrations, not forecasts. Returns, taxes, fees and inflation can all differ. See /terms.</blockquote>
`;

export const sipCrore: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "sip-1-crore-goal",
  kind: "cluster",
  title: "SIP Needed for ₹1 Crore by Age 60",
  description:
    "Required flat SIP for ₹1 crore at 12% by age 60, from 25 to 40, with 6% inflation-adjusted targets and realistic planning caveats.",
  keywords: ["sip for 1 crore by 60", "sip required at age 25 30 35 40", "inflation adjusted 1 crore target", "nominal vs real corpus", "monthly sip goal calculation"],
  toolSlugs: ["retirement-calculator", "sip-calculator", "inflation-calculator"],
  relatedSlugs: ["sip-5000-10-years", "real-return-inflation", "old-vs-new-regime-2026"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "backwards", text: "SIP by start age", level: 2 },
    { id: "shortfall", text: "Nominal versus real", level: 2 },
    { id: "500-vs-800", text: "Small starts and shortfalls", level: 2 },
  ],
  html,
  faqs: [
    { question: "How much SIP is needed for ₹1 crore by age 60?", answer: "At a flat 12% return with monthly compounding, about ₹1,540 a month from age 25, ₹2,833 from 30, ₹5,270 from 35, or ₹10,009 from 40. The target is nominal ₹1 crore. Starting later leaves fewer months to compound, so the required contribution rises sharply." },
    { question: "Why does starting at 25 cost so much less than starting at 40?", answer: "The age-25 investor has 35 years, or 420 monthly contributions, while the age-40 investor has 20 years, or 240. Earlier contributions compound for longer. The required SIP rises from about ₹1,540 to ₹10,009, roughly 6.5 times, even though the target stays at ₹1 crore." },
    { question: "How do I adjust ₹1 crore for inflation?", answer: "Grow the target by your inflation assumption to age 60, then solve for the SIP. At 6%, a 25-year-old needs a nominal target of about ₹7.69 crore and a SIP near ₹11,833. A 40-year-old needs about ₹3.21 crore and ₹32,099. These are illustrations, not guaranteed outcomes." },
    { question: "Does the SIP calculator have a goal mode?", answer: "No. It accepts a monthly investment, an annual rate, and a number of years, then returns the future value. To work backwards, change the monthly amount until the result is close to your target, or use a spreadsheet. The retirement calculator can compare a projected corpus with a goal and show a shortfall, but it does not solve for the required SIP." },
    { question: "What if I start late or my corpus is short?", answer: "A 35-year-old investing ₹3,000 a month at 12% for 25 years reaches about ₹56.9 lakh, leaving a nominal shortfall of about ₹43.1 lakh against ₹1 crore. Raising the contribution, extending the horizon, adding a lump sum, or lowering the target can close the gap. Test the combination in the calculator rather than relying on one lever." },
    { question: "Is a 12% return realistic for a long SIP?", answer: "Twelve percent is an illustrative assumption for comparing start ages, not a promise. At 10%, the 30-year-old's required SIP is about ₹4,387; at 14%, about ₹1,800. Markets deliver variable returns, and taxes, fees, inflation and the sequence of returns can reduce the realised result. Plan with a range." },
  ],
};
