import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>₹5,000 a month is a modest commitment. At a flat 12% annual return with monthly compounding, it grows to about ₹11.62 lakh in 10 years on ₹6.0 lakh invested. The same contribution reaches about ₹25.23 lakh in 15 years and ₹49.96 lakh in 20 years. Those figures are arithmetic under a fixed assumption, not a forecast.</p>
<p>This guide uses the flat SIP model in the <a href="/sip-calculator">SIP calculator</a>: a constant monthly contribution, a constant annual rate, monthly compounding, and contributions at the start of each month. The calculator accepts a monthly amount, an annual rate, and a number of years. Currency is selectable; the examples here use rupees. It has no step-up mode and no goal mode, so the step-up figures below are separate manual calculations. This is part of the <a href="/blog/sip-calculator-guide">India wealth and tax guide</a>.</p>
<p>The output has three lines: future value, invested amount, and estimated gain. The gain line is simply future value minus contributions. It is not a tax-adjusted profit, and it does not account for inflation. A ₹11.62 lakh maturity in 10 years will not buy what ₹11.62 lakh buys today; at 6% inflation its purchasing power is closer to ₹6.5 lakh. Use the <a href="/inflation-calculator">inflation calculator</a> when the number has to support a real goal, not just a nominal one.</p>

<h2 id="ten-fifteen-twenty">10, 15 and 20 years at 12%: the flat SIP table</h2>
<p>The formula behind the flat projections is <strong>FV = M × [((1 + i)^n − 1) ÷ i] × (1 + i)</strong>, where M is the monthly contribution, i is the annual rate divided by 12 and expressed as a decimal, and n is the number of months. The final (1 + i) factor reflects a contribution at the start of each month. For ₹5,000 at 12%, i is 0.01. Over 10 years n is 120 and the full multiplier works out to 232.3391, giving ₹11,61,695, or about ₹11.62 lakh.</p>
<p>At 15 years n is 180 and the factor is 504.5760, producing ₹25,22,880. At 20 years n is 240 and the factor is 999.1479, producing ₹49,95,740. The invested amount rises in a straight line—₹6.0 lakh, ₹9.0 lakh, ₹12.0 lakh—while the corpus curves upward. That gap between straight-line contributions and a curved maturity is compounding at work.</p>
<table>
<thead><tr><th>Horizon</th><th>Invested</th><th>Flat SIP at 12%</th><th>Manual 10% step-up</th></tr></thead>
<tbody>
<tr><td><strong>10 years</strong></td><td>₹6.0L</td><td>₹11.62L</td><td>₹16.87L</td></tr>
<tr><td><strong>15 years</strong></td><td>₹9.0L</td><td>₹25.23L</td><td>₹43.42L</td></tr>
<tr><td><strong>20 years</strong></td><td>₹12.0L</td><td>₹49.96L</td><td>₹99.44L</td></tr>
</tbody>
</table>
<p>The step-up column is manually calculated illustrative math, not output from the calculator. The calculator only projects a flat contribution. Read the next section before using those larger numbers in a plan.</p>
<p>Worked example one: the 10-year flat path invests ₹6.0 lakh and ends near ₹11.62 lakh, so the gain is about ₹5.62 lakh. Worked example two: the 20-year path invests ₹12.0 lakh and ends near ₹49.96 lakh, a gain of about ₹37.96 lakh. The second gain is more than three times the money contributed, while the first is slightly less than the amount invested. Time does most of the heavy lifting.</p>
<p>Rate sensitivity matters just as much. At 10%, the 20-year flat figure is about ₹38.28 lakh; at 14%, it is about ₹65.82 lakh. A two-point change in the assumed return moves the answer by lakhs. The calculator will accept any rate you type, including an unrealistic one, and return a precise-looking number. Precision is not the same as certainty.</p>
<p>The timing of each contribution also matters. If the same ₹5,000 goes in at the end of each month rather than the start, the 10-year figure is about ₹11.50 lakh, roughly ₹11,500 lower. The calculator assumes start-of-month deposits. Your actual SIP date, bank holiday, and clearing time can shift the result a little, which is one reason a real XIRR will not match a hand calculation exactly.</p>

<h2 id="stepup">Step-up arithmetic the calculator leaves out</h2>
<p>The SIP calculator does not support step-up contributions. If you want to model a rising SIP, use a spreadsheet or a manual year-by-year calculation. The third column of the table assumes a 10% increase at the start of each year: ₹5,000 in year one, ₹5,500 in year two, ₹6,050 in year three, and so on. Each year's monthly amount is 10% higher than the previous year's.</p>
<p>Worked example: over 10 years the monthly amount rises from ₹5,000 to about ₹11,790, and total contributions are about ₹9.56 lakh rather than ₹6.0 lakh. At 12% monthly compounding, that schedule reaches about ₹16.87 lakh. At 15 years it reaches about ₹43.42 lakh, and at 20 years about ₹99.44 lakh. The extra corpus comes from larger contributions and from the fact that each increase still has years to compound.</p>
<p>A 5% annual increase is a gentler middle path. At the same 12% return, it reaches about ₹13.93 lakh in 10 years, ₹32.65 lakh in 15 years, and ₹68.69 lakh in 20 years. That is still a manual projection, not a calculator output. The right percentage depends on how your income actually grows, not on which column looks most impressive.</p>
<p>Step-up is not free money. It assumes your income rises every year, which may not happen. A job loss, a sabbatical, or a flat salary can break the schedule. If you automate an increase, keep it small enough to survive a bad year. The calculator cannot check affordability, and it cannot model a pause. A plan that assumes a 10% raise every year for two decades is a plan with a strong embedded assumption.</p>
<p>Use the flat calculator for the base case and keep the step-up plan separate. If flat ₹5,000 is already comfortable, a 5% annual increase is easier to sustain than 10%. The useful step-up is the one you can continue, not the one that produces the largest projection. Review the contribution once a year, after your salary is known rather than before.</p>

<h2 id="sip-vs-lumpsum">SIP versus lump sum, costs and the XIRR gap</h2>
<p>A lump sum and a SIP with the same total outlay do not produce the same maturity. ₹6.0 lakh invested on day one at 12% monthly compounding grows to about ₹19.80 lakh in 10 years. The ₹5,000 SIP that totals ₹6.0 lakh over the same decade reaches about ₹11.62 lakh. The lump sum wins on arithmetic because every rupee starts compounding immediately.</p>
<p>Yet the comparison is not a recommendation. Most savers do not have ₹6.0 lakh idle, and a lump sum deployed just before a drawdown can take years to recover. A SIP spreads purchases across market levels, which is a risk-management choice rather than a return advantage. The calculator assumes a smooth 12% path; real funds do not deliver one. Compare the two approaches in the <a href="/compound-interest-calculator">compound interest calculator</a> before deciding.</p>
<p>The projection also ignores costs and taxes. A 1% annual expense ratio can turn a 12% gross assumption into roughly 11% net; at 11%, the 10-year flat figure is about ₹10.95 lakh instead of ₹11.62 lakh. A 1% exit load on the final value would leave about ₹11.50 lakh. Equity LTCG is taxed at 12.5% above the annual ₹1.25 lakh exemption under current rules, and STCG at 20%; debt gains generally follow slab rates. Those rules can change.</p>
<p>Actual XIRR differs from the 12% input for several reasons: expense ratio, exit load, tracking error, taxes, the timing of each cash flow, and the market path. XIRR is money-weighted and uses actual dates and amounts; it is not the same as a constant annual return. If you invest on different dates or pause contributions, the realised number will move. A fund can show a 12% five-year CAGR and still leave your SIP with a lower XIRR if most of your money arrived late.</p>
<p>Use the SIP calculator for flat monthly contributions, the compound interest calculator for a lump-sum comparison, and the <a href="/retirement-calculator">retirement calculator</a> to see how a projected corpus compares with a target. The sibling notes on <a href="/blog/sip-calculator-guide/lumpsum-compounding-frequency">compounding frequency</a>, <a href="/blog/sip-calculator-guide/sip-1-crore-goal">₹1 crore goal math</a>, and <a href="/blog/sip-calculator-guide/real-return-inflation">real returns</a> carry the comparison further. Treat every output as an illustration. A 12% assumption is a planning input, not a guarantee, and no calculator can tell you what the next decade will deliver.</p>
<blockquote class="tip">Educational information only, not financial advice. Projections assume a constant 12% return and ignore fees, taxes and inflation. See /terms.</blockquote>
`;

export const sipGrowth: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "sip-5000-10-years",
  kind: "cluster",
  title: "₹5,000 SIP for 10, 15 and 20 Years at 12%",
  description:
    "Flat ₹5,000 SIP projections at 12% for 10, 15 and 20 years, manual step-up math, and the reasons actual XIRR can differ from the illustration.",
  keywords: ["5000 sip 10 years 12 percent", "sip 15 years maturity", "sip step up manual calculation", "sip xirr vs cagr", "flat sip monthly compounding"],
  toolSlugs: ["sip-calculator", "compound-interest-calculator", "retirement-calculator"],
  relatedSlugs: ["lumpsum-compounding-frequency", "sip-1-crore-goal", "real-return-inflation"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "ten-fifteen-twenty", text: "10, 15 and 20-year table", level: 2 },
    { id: "stepup", text: "Step-up arithmetic", level: 2 },
    { id: "sip-vs-lumpsum", text: "SIP versus lump sum", level: 2 },
  ],
  html,
  faqs: [
    { question: "How much will a ₹5,000 SIP grow in 10 years at 12%?", answer: "About ₹11.62 lakh on ₹6.0 lakh invested, assuming a flat monthly contribution, monthly compounding, and contributions at the start of each month. The gain is about ₹5.62 lakh. The same calculation gives about ₹25.23 lakh at 15 years and ₹49.96 lakh at 20 years. These are fixed-rate illustrations, not promises." },
    { question: "Does the SIP calculator support step-up?", answer: "No. The calculator projects a constant monthly amount at a constant annual rate. A 10% yearly step-up has to be calculated separately, for example in a spreadsheet. Under that manual schedule, ₹5,000 rising 10% a year reaches about ₹16.87 lakh in 10 years, ₹43.42 lakh in 15 years, and ₹99.44 lakh in 20 years at 12%." },
    { question: "Why might my actual XIRR be lower than 12%?", answer: "Expense ratios, exit loads, tracking error, taxes, cashflow timing, and the market path all pull the realised return away from a fixed 12% input. XIRR is money-weighted and depends on when each instalment went in. A 1% annual fee can reduce the 10-year flat result from about ₹11.62 lakh to roughly ₹10.95 lakh before tax." },
    { question: "Is a ₹6 lakh lump sum better than a ₹5,000 SIP?", answer: "On pure arithmetic at 12% monthly compounding, ₹6.0 lakh invested on day one grows to about ₹19.80 lakh in 10 years, against about ₹11.62 lakh for the SIP. The lump sum wins because the full amount compounds from day one. Most people do not hold that cash, and deploying it before a fall carries timing risk. A SIP spreads entry risk." },
    { question: "Is 12% a guaranteed return?", answer: "No. Twelve percent is an illustrative assumption for comparing horizons, not a promise from any fund or market. At 10% the 20-year flat figure is about ₹38.28 lakh; at 14% it is about ₹65.82 lakh. Use a range of rates, keep costs and taxes in view, and do not treat a calculator output as a forecast." },
    { question: "Can I use the calculator for a goal amount?", answer: "No. It takes a monthly investment, an annual rate, and a number of years, then returns the future value. To work backwards from a goal, enter monthly amounts until the result is close, or solve the formula in a spreadsheet. The retirement calculator can compare a projected corpus with a target, but it also does not solve for the required monthly contribution." },
  ],
};
