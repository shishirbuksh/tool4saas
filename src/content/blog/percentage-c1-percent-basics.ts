import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A percentage question looks harmless until the numbers are on the page. “What is 18% of 250?” is straightforward. “45 is what percent of 180?” requires a different division. “12 is 30% of what number?” reverses the whole thing. All three appear in tips, invoices, grades and sales reports, and all three are easy to get wrong when you grab the wrong number as the base.</p>
<p>This tutorial sticks to percent of a number and its two close cousins. It shows the arithmetic line by line, then gives you mental shortcuts and a calculator workflow. Keep the <a href="/percentage-calculator">percentage calculator</a> open if you want to check each step.</p>

<h2 id="what-percent-means">What “percent of a number” actually means</h2>
<p>Percent means “per hundred,” so 15% is 15 per 100, or 15/100, or 0.15. Finding 15% of 80 means taking 15 hundredths of 80. The arithmetic is 0.15 × 80 = 12. Nothing more complicated than that.</p>
<p>Because multiplication is commutative, 15% of 80 and 80% of 15 give the same answer: 0.15 × 80 = 12 and 0.80 × 15 = 12. That trick can make a question easier. If someone asks for 4% of 75, flip it to 75% of 4, which is 3. If they ask for 60% of 45, try 45% of 60: 0.45 × 60 = 27. The numbers are the same; one arrangement just fits your head better.</p>
<p>The word “of” is the signal to multiply. The number after “of” is the base, also called the whole. In “18% of 250,” the base is 250. In “18% of the invoice total,” the base is whatever that total happens to be. Identify the base before you touch a keypad, because every variation below depends on knowing which number represents 100%.</p>
<p>One more distinction: a percentage is a ratio, not a unit. You can have 150% of a target, which is 1.5 times the target, and you can have 150% of a daily apple budget. The base decides what the percentage is allowed to describe.</p>

<h2 id="formula-three-ways">The formula, rearranged three ways</h2>
<p>Every percent-of question contains three quantities: the rate, the part and the whole. If you know two, you can find the third. The rearrangements below cover the entire family.</p>
<ul>
<li><strong>Find the part:</strong> Part = (Rate ÷ 100) × Whole. Example: 18% of 250 = 0.18 × 250 = 45.</li>
<li><strong>Find the rate:</strong> Rate = (Part ÷ Whole) × 100. Example: 45 ÷ 180 × 100 = 25%.</li>
<li><strong>Find the whole:</strong> Whole = Part ÷ (Rate ÷ 100). Example: 12 ÷ 0.30 = 40.</li>
</ul>
<p>The common thread is the decimal rate. Convert the percentage to a decimal before multiplying or dividing, then convert back to a percentage at the end if the question asks for one. Mixing the two forms mid-calculation is the source of many “off by a factor of 100” answers.</p>
<p>Label the quantities in the actual sentence. “45 is what percent of 180?” gives you the part (45) and the whole (180), so the rate is the unknown. “12 is 30% of what number?” gives you the part (12) and the rate (30%), so the whole is unknown. “What is 18% of 250?” gives you the rate and the whole, so the part is unknown. This sounds pedantic until you catch yourself dividing 180 by 45 and getting 400%.</p>

<h2 id="worked-examples">Worked examples with the arithmetic shown</h2>
<p><strong>Example 1: Find 18% of 250.</strong> Convert the rate to a decimal: 18 ÷ 100 = 0.18. Multiply by the base: 0.18 × 250 = 45. To check with mental math, split 18% into 10% and 8%: 10% of 250 is 25, 8% of 250 is 20, and 25 + 20 = 45. The two methods agree.</p>
<p><strong>Example 2: Find 7.5% of 240.</strong> Convert to 0.075, then multiply: 0.075 × 240 = 18. A second check: 5% of 240 is 12, 2.5% is half of 5%, or 6, and 12 + 6 = 18. If you had mistakenly used 0.75, you would have landed at 180 — a good reminder to count the decimal places.</p>
<p><strong>Example 3: 45 is what percent of 180?</strong> Divide the part by the whole: 45 ÷ 180 = 0.25. Multiply by 100: 0.25 × 100 = 25%. Check forward: 25% of 180 = 0.25 × 180 = 45. The part goes on top because the question is asking how large 45 is relative to 180.</p>
<p><strong>Example 4: 12 is 30% of what number?</strong> Convert 30% to 0.30, then divide the part by the rate: 12 ÷ 0.30 = 40. Check forward: 30% of 40 = 0.30 × 40 = 12. Dividing by 30 instead of 0.30 would give 0.4, which is not a plausible whole when the part is 12.</p>
<table>
<thead><tr><th>Question</th><th>Known values</th><th>Arithmetic</th><th>Answer</th></tr></thead>
<tbody>
<tr><td>18% of 250</td><td>Rate 18%, whole 250</td><td>0.18 × 250</td><td>45</td></tr>
<tr><td>7.5% of 240</td><td>Rate 7.5%, whole 240</td><td>0.075 × 240</td><td>18</td></tr>
<tr><td>45 of 180</td><td>Part 45, whole 180</td><td>45 ÷ 180 × 100</td><td>25%</td></tr>
<tr><td>12 is 30%</td><td>Part 12, rate 30%</td><td>12 ÷ 0.30</td><td>40</td></tr>
</tbody>
</table>

<h2 id="mental-math">Mental math shortcuts that hold up</h2>
<p>You do not need a calculator for most everyday percentages if you can move a decimal point and take halves.</p>
<ul>
<li><strong>10%:</strong> shift the decimal one place left. 10% of 84 is 8.4.</li>
<li><strong>1%:</strong> shift two places left. 1% of 84 is 0.84.</li>
<li><strong>5%:</strong> take half of 10%. 5% of 84 is 4.2.</li>
<li><strong>15%:</strong> add 10% and 5%. 15% of 84 is 8.4 + 4.2 = 12.6.</li>
<li><strong>20%:</strong> double 10%. 20% of 84 is 16.8.</li>
<li><strong>25%:</strong> divide by four. 25% of 84 is 21.</li>
<li><strong>75%:</strong> take three quarters. 75% of 84 is 63.</li>
</ul>
<p>For a rate like 35%, combine 30% and 5%. Thirty percent of 80 is 24, 5% is 4, so 35% is 28. For 12.5%, take half of 25%: 25% of 96 is 24, so 12.5% is 12. For 6%, take half of 12%, or add 5% and 1%.</p>
<p>Estimation prevents embarrassing answers. If you need 19% of 400, start with 20% (80) and subtract 1% (4) to get 76. If a restaurant bill is 84.50 and you want an 18% tip, use 20% (16.90) and subtract 2% (1.69): 15.21. That is faster than opening a calculator and gives you a number you can defend.</p>

<h2 id="common-mistakes">Common mistakes that flip the answer</h2>
<ol>
<li><strong>Using the wrong base.</strong> “20% more than 50” is 60, but “50% more than 20” is 30. The rate and the base both changed. Read the sentence twice before calculating.</li>
<li><strong>Dividing by the percentage instead of its decimal.</strong> To find the whole from a part, divide by 0.30, not 30. The decimal conversion is not optional.</li>
<li><strong>Assuming a part cannot exceed the whole.</strong> A 150% increase takes 80 to 200. Percentages above 100% are valid when the comparison allows growth beyond the original.</li>
<li><strong>Adding percentages from different bases.</strong> A 10% rise on 100 gives 110; another 10% on 110 gives 11, not 10. The second increase is larger in absolute terms.</li>
<li><strong>Rounding the rate too early.</strong> Keep the full decimal through the multiplication, then round the final amount. Rounding 7.5% to 8% before multiplying changes 18 into 19.20 on a 240 base.</li>
<li><strong>Forgetting the percent sign at the end.</strong> “45 of 180” is 0.25, while “45 of 180” as a percentage is 25%. Decide which form the answer needs.</li>
</ol>
<p>A ten-second sanity check catches most of these. One percent of the base is your smallest building block; ten percent is ten of those. If the answer is wildly outside that scale, check the decimal point. If the question asks for a rate, the answer should usually sit between 0% and 100% unless growth or a comparison beyond the whole is involved.</p>

<h2 id="calculator">Using the percentage calculator without second-guessing</h2>
<p>The <a href="/percentage-calculator">free percentage calculator</a> groups the three arrangements into clear views. Pick “percent of” when you know the rate and base, “what percent” when you know the part and whole, and the reverse field when you know the part and rate. The tool displays the formula beside the answer, so you can see which number was treated as 100%.</p>
<ol>
<li>Write the question in plain words: “What is 18% of 250?”</li>
<li>Identify the known pair: rate 18%, whole 250.</li>
<li>Enter both values in the percent-of view and read 45.</li>
<li>Check with a rough estimate: 10% is 25, so 18% should be under 50. It is.</li>
</ol>
<p>When the question involves a change rather than a fixed part, switch to the <a href="/blog/percentage-calculator-guide/percentage-increase-decrease">percentage increase and decrease guide</a>. When you know the final value after a change and need the starting point, the <a href="/blog/percentage-calculator-guide/reverse-percentage">reverse percentage tutorial</a> shows why dividing by 1 plus the rate works. The <a href="/blog/percentage-calculator-guide">full percentage guide</a> connects both to discounts, tax and margin.</p>
<div class="cta-box"><strong>Check your number:</strong> open the <a href="/percentage-calculator">percentage calculator</a>, enter your rate and base, and compare the displayed formula with the arithmetic above. No signup, and the calculation runs on your device.</div>
`;

export const percentagePercentBasics: BlogPost = {
  pillar: "percentage-calculator-guide",
  slug: "percent-of-a-number",
  kind: "cluster",
  title: "How to Calculate Percent of a Number (With Examples)",
  description:
    "Find percent of a number with three formula layouts, worked examples, mental-math shortcuts and fixes for base errors. Free calculator included.",
  keywords: ["percent of a number", "how to calculate percentage of a number", "what percent of a number", "find the whole from a percentage", "percentage of amount formula"],
  toolSlugs: ["percentage-calculator"],
  relatedSlugs: ["percentage-increase-decrease", "reverse-percentage"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-percent-means", text: "What percent of a number means", level: 2 },
    { id: "formula-three-ways", text: "The formula in three arrangements", level: 2 },
    { id: "worked-examples", text: "Worked examples with arithmetic", level: 2 },
    { id: "mental-math", text: "Mental math shortcuts", level: 2 },
    { id: "common-mistakes", text: "Common mistakes", level: 2 },
    { id: "calculator", text: "Using the percentage calculator", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the fastest way to find 15% of a number?", answer: "Take 10% by shifting the decimal one place left, then add half of that for the 5% portion. For 15% of 84, 10% is 8.4 and 5% is 4.2, so the answer is 12.6. The same split works for 35% (30% and 5%) or 18% (10% and 8%)." },
    { question: "How do I find what percent one number is of another?", answer: "Divide the part by the whole, then multiply by 100. For 45 out of 180, 45 ÷ 180 = 0.25, which becomes 25%. The part goes on top because you are measuring 45 against the full 180. If the result looks like 400%, you probably inverted the two numbers." },
    { question: "How do I find the whole when I know the part and the percentage?", answer: "Convert the percentage to a decimal and divide the part by it. If 12 is 30% of a number, then 12 ÷ 0.30 = 40. Check the result by multiplying back: 0.30 × 40 = 12. Dividing by 30 instead of 0.30 is the usual error and produces an answer that is far too small." },
    { question: "Can a percentage be greater than 100?", answer: "Yes. A value can be 150% of its original, meaning 1.5 times as large. If a target was 80 and actual output reached 200, that is 250% of target. Rates above 100% are common in growth, completion and comparison contexts. They only become impossible when the base itself is a fixed maximum." },
    { question: "Why does 15% of 80 equal 80% of 15?", answer: "Both expressions multiply the same two numbers after converting the rate to a decimal: 0.15 × 80 and 0.80 × 15 both equal 12. Multiplication does not care which factor comes first. This lets you flip awkward percentages into easier ones, such as turning 4% of 75 into 75% of 4." },
    { question: "What is the difference between percent of a number and percentage change?", answer: "Percent of a number finds a slice of a fixed base, like 18% of 250. Percentage change compares an old value with a new one, like 240 growing to 300, which is 25% growth. The change formula divides by the starting value, so the direction and the base both matter." },
  ],
};
