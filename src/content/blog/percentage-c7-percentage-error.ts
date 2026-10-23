import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A kitchen scale reads 98 g for a 100 g reference weight. The percentage error is 2%. That number says the scale is low by 2% of the true mass, not by 2 g. The distinction matters because percentage error normalizes the miss against the accepted value, letting you compare a 2 g error on a 100 g sample with a 2 g error on a 10 g sample. <strong>Percentage error = |measured − true| ÷ |true| × 100.</strong> This guide shows the arithmetic, explains signed versus absolute error, and flags the cases where the formula stops being useful.</p>
<p>Part of the <a href="/blog/percentage-calculator-guide">Percentage Calculator Guide</a>. Check the division in the <a href="/percentage-calculator">percentage calculator</a>, and read <a href="/blog/percentage-calculator-guide/percentage-difference">percentage difference vs change</a> before comparing two measurements without a reference.</p>

<h2 id="percentage-error-formula">The percentage error formula</h2>
<p>The numerator is the absolute gap between what you measured and the accepted value. The denominator is that accepted value, also in absolute bars so a negative reference does not flip the sign. Multiply by 100 to turn the decimal relative error into a percentage:</p>
<p><strong>Percentage error = |measured − true| ÷ |true| × 100.</strong> The measured value is the reading from your instrument, experiment or model. The true value is the accepted reference, the theoretical result, or the calibrated standard you are checking against. Keep the two labels fixed; swapping them changes the answer because the denominator changes.</p>
<p>For the scale: |98 − 100| ÷ 100 × 100 = 2 ÷ 100 × 100 = 2%. The relative error is the same fraction before the final multiplication, 0.02. If a report asks for relative error, give 0.02; if it asks for percentage error, give 2%. Mixing those two formats is a common source of a result that looks 100 times too small.</p>
<p>Many labs also track <strong>signed error</strong>: (measured − true) ÷ true × 100. A positive result means the measurement came in above the reference; a negative result means it came in below. The absolute version above answers “how far off,” while the signed version answers “which way and how far.” Report the absolute percentage error and state the direction in words, for example “2 g low,” to avoid ambiguity.</p>

<h2 id="worked-examples">Worked examples with the arithmetic shown</h2>
<h3>Example 1 — 98 g against a 100 g standard</h3>
<p>Gap: 98 − 100 = −2 g, so the absolute gap is 2 g. Divide by the true value: 2 ÷ 100 = 0.02. Multiply by 100: 0.02 × 100 = 2%. Signed error: (−2 ÷ 100) × 100 = −2%, an underestimate. The scale is accurate to within 2% at this load.</p>
<h3>Example 2 — 52.5 cm against a 50 cm reference</h3>
<p>Gap: 52.5 − 50 = 2.5 cm. Divide: 2.5 ÷ 50 = 0.05. Multiply: 0.05 × 100 = 5%. Signed error is +5%, an overestimate. A 2.5 cm miss is 5% of 50 cm but only 2.5% of 100 cm, which is why the denominator belongs in the sentence, not just the spreadsheet cell.</p>
<h3>Example 3 — 9.60 m/s² against the accepted 9.81 m/s²</h3>
<p>Gap: 9.60 − 9.81 = −0.21. Divide by the reference: 0.21 ÷ 9.81 = 0.0214067. Multiply by 100: 2.14%. The signed value is −2.14%, so the experimental result sits below the accepted gravitational acceleration. Rounding to 2.1% is reasonable; keeping 2.14067% implies precision the inputs do not support.</p>
<table>
<thead><tr><th>True value</th><th>Measured</th><th>Signed error</th><th>Absolute gap</th><th>Percentage error</th><th>Reading</th></tr></thead>
<tbody>
<tr><td>100 g</td><td>98 g</td><td>−2.00%</td><td>2 g</td><td>2.00%</td><td>2 g low</td></tr>
<tr><td>100 g</td><td>103 g</td><td>+3.00%</td><td>3 g</td><td>3.00%</td><td>3 g high</td></tr>
<tr><td>50 cm</td><td>52.5 cm</td><td>+5.00%</td><td>2.5 cm</td><td>5.00%</td><td>2.5 cm long</td></tr>
<tr><td>9.81 m/s²</td><td>9.60 m/s²</td><td>−2.14%</td><td>0.21 m/s²</td><td>2.14%</td><td>0.21 low</td></tr>
</tbody>
</table>
<p>The same absolute miss can produce very different percentages. A 2 g error is 2% of 100 g, 20% of 10 g and 0.2% of 1,000 g. Before comparing two percentage errors, confirm that the reference values are in the same range; otherwise you may be ranking the denominators rather than the instruments.</p>
<p>Forecasting uses the same arithmetic. If the forecast was 4,800 units and actual demand was 5,100, the percentage error is |4,800 − 5,100| ÷ 5,100 × 100 = 300 ÷ 5,100 × 100 = 5.88%. Treat actual demand as the true value, keep the sign to show whether you over- or under-forecast, and use the absolute number on the accuracy dashboard.</p>

<h2 id="accuracy-and-precision">Percentage error measures accuracy, not precision</h2>
<p>Accuracy is closeness to the true value. Precision is closeness of repeated measurements to each other. A scale that reads 103.0, 103.1 and 102.9 is highly precise but consistently about 3% high; a scale that reads 99.8, 100.1 and 100.0 is less consistent but more accurate on average. Percentage error catches the first problem and misses the second. Report both the error against the reference and the spread across repeats if the decision depends on measurement quality.</p>
<p>A single reading can also be lucky. If the true value is 100 and four readings are 98, 102, 99 and 101, the average is exactly 100, yet the individual errors are 2%, 2%, 1% and 1%. The average signed error is zero while every trial is off. When accuracy matters, calculate the absolute percentage error per trial and summarize the worst case, not just the mean.</p>

<h2 id="error-vs-difference">Percentage error is not percentage difference</h2>
<p>Percentage error requires a true value. Percentage difference does not. Take 80 and 100. If 100 is the accepted reference, the percentage error is |80 − 100| ÷ 100 × 100 = 20%. If neither number is authoritative, the percentage difference is |80 − 100| ÷ ((80 + 100) ÷ 2) × 100 = 20 ÷ 90 × 100 = 22.22%. A change from 100 to 80 is −20%. Three labels, three meanings, all from the same pair.</p>
<p>Use percentage error for calibration checks, lab results against a standard, model validation against ground truth, and forecast accuracy when actual demand is known. Use percentage difference for two peers with no baseline. Use percentage change for a before-and-after series. The <a href="/blog/percentage-calculator-guide/percentage-difference">difference vs change guide</a> walks through the denominator choice in more detail.</p>

<h2 id="when-not-to-use">When percentage error misleads</h2>
<ul>
<li><strong>A true value of zero.</strong> Division is undefined, no matter how small the absolute miss. Report the absolute error instead.</li>
<li><strong>A true value near zero.</strong> A tiny denominator inflates the percentage. An absolute miss of 0.01 on a true value of 0.02 is 50%, which can sound alarming until you see the raw units.</li>
<li><strong>Negative reference values.</strong> The absolute denominator keeps the arithmetic valid, but the direction becomes confusing. State the convention explicitly if you publish the number.</li>
<li><strong>Arbitrary-zero scales such as Celsius.</strong> A rise from 10°C to 20°C is not a 100% increase in heat. Convert to Kelvin before making ratio statements about temperature.</li>
<li><strong>Peer comparisons without a reference.</strong> If neither measurement is authoritative, percentage difference is the honest measure; calling one of them “true” manufactures false confidence.</li>
</ul>
<p>Always publish the absolute error next to the percentage. A 2% error is 20 units on a 1,000-unit batch and 0.2 units on a 10-unit batch. The percentage tells you how large the miss is relative to the reference; the absolute figure tells you how much material, money or time is actually involved.</p>

<h2 id="calculator-workflow">Calculate it in four steps</h2>
<ol>
<li>Subtract the true value from the measured value and drop the sign: |98 − 100| = 2.</li>
<li>Divide by the true value: 2 ÷ 100 = 0.02.</li>
<li>Multiply by 100: 0.02 × 100 = 2%.</li>
<li>Record the direction separately: the reading is 2 g below the reference.</li>
</ol>
<p>To check the division, open the <a href="/percentage-calculator">percentage calculator</a>, use the Percent view with part 2 and whole 100, and confirm it returns 2%. For a full set of percent formulas, from discounts to percentage points, start with the <a href="/blog/percentage-calculator-guide">Percentage Calculator Guide</a>.</p>
<div class="cta-box"><strong>Try it:</strong> open the <a href="/percentage-calculator">percentage calculator</a> and check 2 ÷ 100, then rerun it with 52.5 and 50 to confirm the 5% result. If you are comparing two measurements with no accepted reference, switch to the Difference view instead.</div>
`;

export const percentageError: BlogPost = {
  pillar: "percentage-calculator-guide",
  slug: "percentage-error",
  kind: "cluster",
  title: "Percentage Error Formula: Measure Accuracy Correctly",
  description:
    "Percentage error formula explained: absolute error, signed error and worked examples for 98 g vs 100 g. Measure accuracy without mixing terms.",
  keywords: [
    "percentage error formula",
    "how to calculate percentage error",
    "absolute percentage error",
    "signed error vs absolute error",
    "measurement accuracy formula",
    "percent error examples",
  ],
  toolSlugs: ["percentage-calculator"],
  relatedSlugs: ["percentage-difference", "percentage-increase-decrease", "percentage-points-vs-percent"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "percentage-error-formula", text: "The percentage error formula", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "accuracy-and-precision", text: "Accuracy versus precision", level: 2 },
    { id: "error-vs-difference", text: "Error versus difference", level: 2 },
    { id: "when-not-to-use", text: "When percentage error misleads", level: 2 },
    { id: "calculator-workflow", text: "Calculate it in four steps", level: 2 },
  ],
  html,
  faqs: [
    {
      question: "What is the percentage error formula?",
      answer:
        "Percentage error = |measured − true| ÷ |true| × 100. For a reading of 98 g against a 100 g standard: |98 − 100| ÷ 100 × 100 = 2 ÷ 100 × 100 = 2%. The denominator is the accepted or reference value, not the measured value, which is why the order of the two numbers matters.",
    },
    {
      question: "Should percentage error be positive or negative?",
      answer:
        "The standard percentage error is positive because the numerator uses an absolute gap. If you also want direction, report signed error = (measured − true) ÷ true × 100. A reading of 98 against 100 has a signed error of −2%, meaning 2% low; 103 against 100 has +3%, meaning 3% high. State which convention you are using.",
    },
    {
      question: "What counts as a good percentage error?",
      answer:
        "There is no universal threshold. A 2% error may be excellent for a kitchen scale and unacceptable for a calibrated analytical balance. Judge the number against the tolerance for that instrument, test or decision, and publish the absolute error alongside it so readers can see the units involved.",
    },
    {
      question: "What is the difference between percentage error and percentage difference?",
      answer:
        "Percentage error divides the gap by a known true value; percentage difference divides it by the average of two peers. For 80 and 100, treating 100 as true gives a 20% error, while treating them as peers gives a 22.22% difference. Use error for accuracy checks and difference when neither measurement is the reference.",
    },
    {
      question: "Can I use percentage error with a negative true value?",
      answer:
        "The formula with an absolute denominator still produces a number, but the interpretation gets awkward. For a true value of −20 and a measured value of −18, the gap is 2 and the absolute percentage error is 10%. State the convention clearly, or use absolute error when the sign itself carries meaning.",
    },
    {
      question: "Why is percentage error undefined when the true value is zero?",
      answer:
        "Because the formula divides by the true value, and division by zero has no defined result. An absolute miss of 0.5 on a true value of zero cannot be expressed relative to zero. Report the absolute error, 0.5, and avoid presenting a percentage that suggests a ratio exists.",
    },
  ],
};
