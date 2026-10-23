import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two deposits can both advertise 8% and pay different amounts. The difference is not a trick in the arithmetic; it is the compounding frequency. Interest added monthly starts earning interest a month earlier than interest added yearly. Over one year the gap is small. Over ten years it compounds into a meaningful sum, which is why the frequency belongs next to the rate in any comparison.</p>
<p>Part of the <a href="/blog/sip-calculator-guide">wealth and compounding guide</a>. The local <a href="/compound-interest-calculator">compound interest calculator</a> models a single lump sum with yearly, half-yearly, quarterly or monthly compounding. It does not accept monthly contributions, taxes, fees or inflation. Those omissions are not flaws in the formula; they define what the result can and cannot tell you.</p>

<h2 id="formula">The formula behind the result</h2>
<p>For a lump sum, the maturity value is <code>A = P × (1 + r / n)^(n × t)</code>. <code>P</code> is the principal, <code>r</code> is the nominal annual rate as a decimal, <code>n</code> is the number of compounding periods per year and <code>t</code> is the time in years. The calculator offers four values of <code>n</code>: 1 for yearly, 2 for half-yearly, 4 for quarterly and 12 for monthly.</p>
<p>The interest earned is simply the maturity value minus the principal. The tool displays both, formatted in the selected currency. It accepts decimal years and uses the same formula, so a two-and-a-half-year projection is possible. It does not round each period separately, which means the displayed result can differ by a few cents from a bank's statement that rounds every credit.</p>
<p>Because the model has no payment field, it cannot represent a recurring deposit, a SIP or a loan with monthly installments. Adding contributions requires a different formula or a schedule of cash flows. Use the SIP calculator for monthly investments, and use an amortization calculator for a loan with payments.</p>

<h2 id="example">A worked example: 10,000 at 8% for 10 years</h2>
<p>Assume a nominal annual rate of 8%, a principal of 10,000 and a term of 10 years. Changing only the compounding frequency produces the following values, before tax and fees:</p>
<table>
<thead><tr><th>Frequency</th><th>Periods per year</th><th>Maturity value</th><th>Interest earned</th><th>Effective annual rate</th></tr></thead>
<tbody>
<tr><td><strong>Yearly</strong></td><td>1</td><td>21,589.25</td><td>11,589.25</td><td>8.00%</td></tr>
<tr><td><strong>Half-yearly</strong></td><td>2</td><td>21,911.23</td><td>11,911.23</td><td>8.16%</td></tr>
<tr><td><strong>Quarterly</strong></td><td>4</td><td>22,080.40</td><td>12,080.40</td><td>8.24%</td></tr>
<tr><td><strong>Monthly</strong></td><td>12</td><td>22,196.40</td><td>12,196.40</td><td>8.30%</td></tr>
</tbody>
</table>
<p>Monthly compounding adds 607.15 over yearly compounding on the same nominal rate, about 5.2% more interest. The maturity value is 2.8% higher. The gap is not free money: the nominal rate, the term and the absence of fees are all held constant. In a real product, a bank that compounds monthly may quote a lower nominal rate than one that compounds yearly, which can erase or reverse the difference.</p>
<p>Here is the same comparison for a principal of 500,000 at 7% for five years, useful when the currency is INR or another unit with a different scale: yearly gives 701,275.87, quarterly gives 707,389.10 and monthly gives 708,812.63. The absolute gap is smaller because the rate and term are smaller, but the direction is the same.</p>

<h2 id="effective-rate">Nominal rate versus effective annual rate</h2>
<p>The nominal rate is the quoted annual rate before compounding within the year. The effective annual rate, sometimes called the annual equivalent rate or effective yield, is what you actually earn over one year when the intra-year compounding is included. It is calculated as <code>(1 + r / n)^n - 1</code>. For an 8% nominal rate, monthly compounding produces an effective rate of about 8.30%.</p>
<p>This is the number to use when comparing products with different compounding schedules. Comparing an 8.30% effective yield with an 8.00% effective yield is meaningful; comparing a monthly-compounded 8.00% with a yearly-compounded 8.10% requires converting both to the same basis first. The calculator does not display the effective rate, but the maturity values already reflect it.</p>
<p>For loans, the same mathematics can work against the borrower. A higher compounding frequency at the same nominal rate can increase the effective cost, although most consumer loans quote an annual percentage rate that already accounts for fees and compounding. Do not compare a loan's nominal rate with a deposit's effective yield. They describe different cash flows.</p>

<h2 id="gap">Why the gap grows with time and rate</h2>
<p>Compounding is exponential, so the difference between frequencies grows with both the rate and the term. At low rates and short terms, the gap is small enough to ignore for a rough estimate. At higher rates or longer horizons, it becomes visible. The monthly-versus-yearly gap on 10,000 at 8% is about 607 over ten years; at 12% over the same term it is much larger because the base grows faster.</p>
<p>The frequency also matters more when the term is long because each extra period's interest has more time to compound. A one-year comparison understates the long-run effect. If you are choosing between two multi-year products, compare the maturity values over the full term, not just the first-year yield.</p>
<p>Inflation is a separate subtraction. A maturity value that looks large in nominal terms may buy less after ten years. The <a href="/blog/sip-calculator-guide/real-return-inflation">real return guide</a> covers that adjustment. Taxes and fees are also outside this model, and they can change the ranking of two products with different tax treatment.</p>

<h2 id="limits">What the result does not include</h2>
<table>
<thead><tr><th>Factor</th><th>Included?</th><th>What to do</th></tr></thead>
<tbody>
<tr><td><strong>Recurring contributions</strong></td><td>No</td><td>Use the SIP calculator or a cash-flow schedule</td></tr>
<tr><td><strong>Tax on interest</strong></td><td>No</td><td>Apply your marginal rate or the product's tax rule</td></tr>
<tr><td><strong>Fees and charges</strong></td><td>No</td><td>Subtract them from the maturity value or the rate</td></tr>
<tr><td><strong>Inflation</strong></td><td>No</td><td>Convert to real terms with the inflation calculator</td></tr>
<tr><td><strong>Variable rates</strong></td><td>No</td><td>Run scenarios for each rate path</td></tr>
<tr><td><strong>Day-count conventions</strong></td><td>No</td><td>Use the product's official statement for exact amounts</td></tr>
</tbody>
</table>
<p>The calculator also assumes the rate stays constant for the entire term. A floating-rate deposit or a loan with a reset schedule needs a scenario analysis, not a single number. Run a low, middle and high case, and label them as scenarios rather than predictions.</p>
<p>Finally, the output is an illustration, not an offer. Banks may use a different day-count convention, credit interest at a different time or apply minimum-balance rules. Use the result to compare structures and to ask better questions, then confirm the actual terms in the product documents.</p>

<h2 id="workflow">A clean comparison workflow</h2>
<ol>
<li>Write down the nominal rate, the term and the compounding frequency for each option.</li>
<li>Convert each option to an effective annual rate, or compare maturity values over the same term.</li>
<li>Run the same principal through the calculator for each frequency.</li>
<li>Subtract estimated tax and fees before comparing spendable amounts.</li>
<li>Adjust for inflation if the goal is purchasing power rather than nominal balance.</li>
<li>Stress-test the result with a lower rate and a shorter term before committing.</li>
</ol>
<p>For a monthly investment rather than a lump sum, use the <a href="/sip-calculator">SIP calculator</a> and the <a href="/blog/sip-calculator-guide/lumpsum-compounding-frequency">lump-sum versus frequency guide</a>. For the retirement horizon, the <a href="/retirement-calculator">retirement calculator</a> adds contributions and withdrawals that this lump-sum model intentionally leaves out.</p>
<div class="cta-box"><strong>Compare frequencies now:</strong> enter the same principal, rate and term in the <a href="/compound-interest-calculator">compound interest calculator</a>, change only the frequency, and note the maturity difference. This is an educational estimate, not financial advice; confirm product terms with the provider.</div>
`;

export const compoundingFrequency: BlogPost = {
  pillar: "sip-calculator-guide",
  slug: "monthly-vs-yearly-compounding",
  kind: "cluster",
  title: "Monthly vs Yearly Compounding: The Real Gap",
  description:
    "Compare monthly, quarterly and yearly compounding on the same nominal rate, including effective yield and the limits of a lump-sum model.",
  keywords: ["monthly vs yearly compounding", "compound interest frequency", "effective annual rate", "compound interest calculator", "nominal vs effective rate"],
  toolSlugs: ["compound-interest-calculator"],
  relatedSlugs: ["lumpsum-compounding-frequency", "sip-5000-10-years", "real-return-inflation"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "formula", text: "The formula behind the result", level: 2 },
    { id: "example", text: "A worked example", level: 2 },
    { id: "effective-rate", text: "Nominal vs effective rate", level: 2 },
    { id: "gap", text: "Why the gap grows", level: 2 },
    { id: "limits", text: "What is not included", level: 2 },
    { id: "workflow", text: "Comparison workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "Is monthly compounding always better than yearly?", answer: "For a deposit at the same nominal rate and term, more frequent compounding produces a higher effective yield. But products rarely hold the nominal rate constant across schedules, and taxes and fees can reverse the ranking. Compare effective annual rates or full-term maturity values, not the frequency label alone." },
    { question: "Does the calculator support daily compounding?", answer: "No. It offers yearly, half-yearly, quarterly and monthly. Daily compounding would use n equal to 365 and a slightly higher effective rate. The difference from monthly is usually small, but you need a calculator or a spreadsheet that supports the extra frequency." },
    { question: "Can I add monthly contributions?", answer: "No. The model is a single lump sum. Adding a fixed amount every month changes the formula because each contribution has its own compounding period. Use the SIP calculator for recurring investments, and keep this tool for one-time deposits." },
    { question: "Why is my bank's maturity amount slightly different?", answer: "Banks may round interest at each credit, use a different day-count convention, deduct tax at source or apply minimum-balance rules. The calculator uses one formula for the whole term and rounds only the display. Treat a small difference as a modeling convention, not an error." },
    { question: "Does the result include tax?", answer: "No. Tax treatment depends on the product and jurisdiction, and it can change the effective return substantially. Apply the relevant tax rule to the interest earned, then compare the after-tax amounts. The result here is a pre-tax illustration." },
  ],
};
