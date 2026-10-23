import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Revenue moved from 1,200 to 1,500. A supplier raised a price from 480 to 540. Your electricity bill fell from 2,400 to 1,800. Each sentence describes a change, and each one needs the same three-step calculation. The only difference is whether the answer carries a positive or negative sign.</p>
<p>Percentage increase and decrease is where otherwise careful people mix up the starting point. The formula is short, but the base matters more than the subtraction. This guide, part of the <a href="/blog/percentage-calculator-guide">percentage calculator guide</a>, works through the arithmetic, shows why a rise and a fall of the same rate do not cancel, and gives you a clean way to check the result with the <a href="/percentage-calculator">percentage calculator</a>.</p>

<h2 id="the-formula">The percentage change formula</h2>
<p>Percentage change compares a new value with an old value:</p>
<p><strong>Percentage change = ((New − Old) ÷ Old) × 100</strong></p>
<p>Subtract the old value from the new one, divide by the old value, then multiply by 100. If the result is positive, the value increased. If it is negative, the value decreased. The old value is always the denominator because it represents the starting point — the 100% baseline.</p>
<p>From 240 to 300, the gap is 300 − 240 = 60. Divide by the old value: 60 ÷ 240 = 0.25. Multiply by 100: 25%. The value grew by a quarter of where it started.</p>
<p>From 300 to 240, the gap is 240 − 300 = −60. Divide by the old value: −60 ÷ 300 = −0.20. Multiply by 100: −20%. Same absolute gap, different base, different percentage. That is not a mathematical inconsistency; it is the whole point of measuring change relative to a starting point.</p>
<p>When the old value is zero, the formula breaks because division by zero is undefined. Going from 0 to 50 cannot be expressed as a percentage increase of the starting point. Describe it as “started from zero” and report the absolute change instead.</p>

<h2 id="worked-examples">Worked examples, including one decrease</h2>
<p><strong>Example 1: Sales rose from 1,200 to 1,500.</strong> New minus old is 1,500 − 1,200 = 300. Divide by old: 300 ÷ 1,200 = 0.25. Multiply by 100: <strong>25% increase</strong>. Check by applying the rate forward: 1,200 × 1.25 = 1,500.</p>
<p><strong>Example 2: A price fell from 480 to 420.</strong> The gap is 420 − 480 = −60. Divide by the old price: −60 ÷ 480 = −0.125. Multiply by 100: <strong>12.5% decrease</strong>. Check by applying the rate: 480 × (1 − 0.125) = 480 × 0.875 = 420.</p>
<p><strong>Example 3: A salary went from 48,000 to 55,200.</strong> The increase is 7,200. Divide by 48,000: 7,200 ÷ 48,000 = 0.15. Multiply by 100: <strong>15% raise</strong>. Check: 48,000 × 1.15 = 55,200.</p>
<p><strong>Example 4: Output dropped from 80 to 68.</strong> The change is −12. Divide by 80: −12 ÷ 80 = −0.15. Multiply by 100: <strong>15% decrease</strong>. The new value is 85% of the old one, which is another way to see the same result.</p>
<table>
<thead><tr><th>Change</th><th>Old value</th><th>New value</th><th>Arithmetic</th><th>Result</th></tr></thead>
<tbody>
<tr><td>Sales growth</td><td>1,200</td><td>1,500</td><td>300 ÷ 1,200 × 100</td><td>+25%</td></tr>
<tr><td>Price drop</td><td>480</td><td>420</td><td>−60 ÷ 480 × 100</td><td>−12.5%</td></tr>
<tr><td>Salary raise</td><td>48,000</td><td>55,200</td><td>7,200 ÷ 48,000 × 100</td><td>+15%</td></tr>
<tr><td>Output fall</td><td>80</td><td>68</td><td>−12 ÷ 80 × 100</td><td>−15%</td></tr>
<tr><td>Round trip</td><td>300</td><td>240</td><td>−60 ÷ 300 × 100</td><td>−20%</td></tr>
</tbody>
</table>

<h2 id="why-reversing-is-not-symmetric">Why reversing a change is not symmetric</h2>
<p>Start with 100. A 20% increase gives 120. Now apply a 20% decrease to 120: 120 × 0.80 = 96. You are four short of where you began, even though the rate looks identical in both directions.</p>
<p>The reason is that the second calculation uses 120 as its base, not 100. Twenty percent of 120 is 24, while twenty percent of 100 is 20. The fall removes a larger slice than the rise added. To get from 120 back to 100, you need a decrease of 20 ÷ 120 = 16.67%, not 20%.</p>
<p>The same logic applies to any pair of opposite changes. A 15% increase followed by a 15% decrease leaves 100 × 1.15 × 0.85 = 97.75, a net loss of 2.25%. A 50% increase followed by a 50% decrease leaves 75, a net loss of 25%. The gap grows as the rate grows, and it never disappears unless one of the rates is zero.</p>
<p>This is why “we raised prices 10%, then offered a 10% discount” does not restore the original price. The discount applies to the higher price. If the original was 200, the raise takes it to 220, and a 10% discount takes 22 off, leaving 198. The customer pays 1% less than before, and the business earns 1% less per unit before costs.</p>
<p>To reverse a known percentage change, divide by the factor rather than subtracting the rate. If a value rose 20% to 120, the original is 120 ÷ 1.20 = 100. If it fell 20% to 80, the original is 80 ÷ 0.80 = 100. The <a href="/blog/percentage-calculator-guide/reverse-percentage">reverse percentage guide</a> covers the division in more detail.</p>

<h2 id="business-uses">Where percentage change helps in business</h2>
<p>Percentage change is useful because it normalizes movement across different-sized numbers. A 300-unit increase means something different for a shop selling 1,000 units a month than for one selling 10,000. As percentages, those are 30% and 3%.</p>
<ul>
<li><strong>Revenue and volume:</strong> compare this month with the same month last year, not with an arbitrary earlier period. Seasonal businesses can post a huge “increase” in December that disappears in January.</li>
<li><strong>Cost control:</strong> a supplier quote moving from 480 to 420 is a 12.5% reduction. Put that next to the volume you buy to see the absolute saving.</li>
<li><strong>Pricing:</strong> a 10% price rise does not produce a 10% profit rise if unit costs stay fixed. Profit changes by a larger percentage because the base is smaller. Model the profit line separately.</li>
<li><strong>Conversion rates:</strong> moving from 2% to 3% is a 1-point gain and a 50% relative increase. Both descriptions are accurate, but they answer different questions.</li>
</ul>
<p>Keep the old and new values in the same units and the same scope. Comparing a partial month with a full month, or revenue including tax with revenue excluding tax, produces a percentage that looks precise and means nothing. Write the definition down before the number travels into a slide.</p>
<p>For price cuts specifically, the <a href="/blog/percentage-calculator-guide/discount-and-sale-price">discount and sale price guide</a> shows how the same percentage affects the customer’s total and the seller’s margin. A 20% discount is a 20% revenue cut on that unit, but it can be a much larger percentage cut to profit.</p>

<h2 id="common-mistakes">Mistakes that flip the sign or the size</h2>
<ol>
<li><strong>Dividing by the new value.</strong> Change is measured against the old value. Using the new value makes an increase look smaller and a decrease look larger. From 80 to 100, the correct change is 20 ÷ 80 = 25%, not 20%.</li>
<li><strong>Dropping the negative sign.</strong> A fall from 480 to 420 is −12.5%, not +12.5%. The sign carries the direction. If the context already says “decrease,” you can report the magnitude, but do not mix the two conventions in one table.</li>
<li><strong>Adding and subtracting rates.</strong> A 10% rise followed by a 10% fall is not 0%. Multiply the factors: 1.10 × 0.90 = 0.99, a 1% net decrease.</li>
<li><strong>Confusing percentage points with percent.</strong> A rate moving from 4% to 5% is 1 point and a 25% relative increase. Decide which one your audience needs.</li>
<li><strong>Averaging percentages without weighting.</strong> A 10% rise in one product and a 50% rise in another do not average to 30% unless both products have the same base. Weight by the underlying values.</li>
<li><strong>Using a zero base.</strong> Change from zero is undefined. Report the absolute movement and say so.</li>
</ol>
<p>A quick check: apply your answer back to the old value. If the old value was 480 and you calculated a 12.5% decrease, then 480 × 0.875 should equal 420. If it does not, the base or the sign is wrong. This one step catches more errors than rereading the formula.</p>

<h2 id="calculator">Using the percentage calculator for change</h2>
<p>The <a href="/percentage-calculator">percentage calculator</a> has a change view that takes the old value and the new value in that order. Enter 1,200 as old and 1,500 as new, and it returns +25% with the formula shown. Swap the entries and you get −16.67%, which is the correct change from 1,500 down to 1,200 — not a bug.</p>
<ol>
<li>Label the starting value as old. This is the number that represents 100%.</li>
<li>Label the ending value as new. Order matters; reversing the two changes the denominator.</li>
<li>Read the percentage and the sign. Positive means growth, negative means decline.</li>
<li>Check by multiplying the old value by 1 plus the rate. The result should match the new value.</li>
</ol>
<p>If you need a neutral comparison where neither value is a baseline, use the difference view instead. Comparing 60 with 80 gives a 28.57% difference either way, while change gives +33.33% from 60 to 80 and −25% from 80 to 60. The percentage difference guide explains when that symmetry is the right choice.</p>
<div class="cta-box"><strong>Test a change:</strong> open the <a href="/percentage-calculator">percentage calculator</a>, enter your old and new values, and confirm the sign before you put the number in a report. The calculation stays on your device.</div>
`;

export const percentageIncreaseDecrease: BlogPost = {
  pillar: "percentage-calculator-guide",
  slug: "percentage-increase-decrease",
  kind: "cluster",
  title: "Percentage Increase and Decrease: Formula & Examples",
  description:
    "Percentage increase and decrease with the formula, worked examples, reverse checks and the mistakes that flip the base. Includes a free calculator.",
  keywords: ["percentage increase calculator", "percentage decrease formula", "how to calculate percentage increase", "percent change formula", "percentage growth calculator"],
  toolSlugs: ["percentage-calculator"],
  relatedSlugs: ["percent-of-a-number", "discount-and-sale-price", "percentage-difference"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "the-formula", text: "The percentage change formula", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "why-reversing-is-not-symmetric", text: "Why reversing is not symmetric", level: 2 },
    { id: "business-uses", text: "Percentage change in business", level: 2 },
    { id: "common-mistakes", text: "Mistakes that flip the result", level: 2 },
    { id: "calculator", text: "Using the calculator", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the formula for percentage increase?", answer: "Subtract the old value from the new value, divide the difference by the old value, then multiply by 100. Going from 1,200 to 1,500 gives 300 ÷ 1,200 × 100 = 25%. The old value stays in the denominator because it is the starting baseline." },
    { question: "Why is a 20% rise followed by a 20% fall not zero?", answer: "The fall is calculated on the larger value. Start at 100, rise to 120, then take 20% of 120, which is 24, leaving 96. The net change is −4%. To return to 100 from 120, the required fall is 20 ÷ 120 = 16.67%, not 20%." },
    { question: "How do I calculate a percentage decrease?", answer: "Use the same formula with the new value below the old one. A price falling from 480 to 420 has a change of −60, and −60 ÷ 480 × 100 = −12.5%. The negative sign means decrease. You can report the magnitude as 12.5% if the direction is already stated." },
    { question: "Can I reverse a percentage increase by subtracting the same rate?", answer: "No. If a value rose 20% to 120, subtracting 20% of 120 removes 24 and leaves 96. Divide by 1.20 instead: 120 ÷ 1.20 = 100. For a decrease, divide by one minus the rate, so a value that fell 20% to 80 came from 80 ÷ 0.80 = 100." },
    { question: "What does a 100% increase mean?", answer: "A 100% increase doubles the value. Going from 45 to 90 is a 100% rise. A 200% increase triples it, taking 45 to 135. Percentages above 100 are valid for growth, but they often get confused with “100% of,” which means the original amount, not double." },
    { question: "Why is change from zero undefined?", answer: "The formula divides by the old value, and division by zero has no finite result. Moving from 0 to 50 cannot be expressed as a percentage increase of the starting point. Report the absolute change of 50 and note that the baseline was zero instead of inventing a percentage." },
  ],
};
