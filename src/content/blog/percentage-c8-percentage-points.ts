import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A savings account raises its rate from 4% to 5%. The difference is 1 percentage point. The relative increase is 25%. A headline that says the rate “rose 1%” describes something else entirely: 4% × 1.01 = 4.04%, not 5%. <strong>A percentage point is the arithmetic difference between two percentages; a percent change is the relative change from the starting percentage.</strong> The same one-point move can be a doubling at the bottom of the scale or a rounding error at the top, so the two units answer different questions.</p>
<p>Part of the <a href="/blog/percentage-calculator-guide">Percentage Calculator Guide</a>. Run the relative change in the <a href="/percentage-calculator">percentage calculator</a>, and read <a href="/blog/percentage-calculator-guide/percentage-increase-decrease">percentage increase and decrease</a> for the forward formula.</p>

<h2 id="percentage-points-vs-percent">The difference in one sentence</h2>
<p><strong>Percentage points measure the gap between two percentages. Percent measures the size of that gap relative to where you started.</strong> From 4% to 5%, the point change is 5 − 4 = 1 percentage point. The relative change is (5 − 4) ÷ 4 × 100 = 1 ÷ 4 × 100 = 25%. Both statements are correct, but they are not interchangeable.</p>
<p>The confusion starts because “percent” is both a unit and an operation. As a unit, 1% means one part in 100. As an operation, a “1% increase” means multiply by 1.01. A rate moving from 4% to 5% did not multiply by 1.01; it added one point. That is why the phrase “up 1%” is ambiguous and “up 1 percentage point” is not.</p>
<p>The gap widens as the starting rate gets smaller. From 1% to 2% is a 1-point move but a 100% relative increase, because the gap equals the entire starting value. From 50% to 51% is also a 1-point move but only a 2% relative increase. Same points, wildly different relative changes. Neither number is wrong; each becomes misleading when the other is omitted.</p>

<h2 id="worked-examples">Worked examples with both numbers</h2>
<h3>Savings rate: 4% to 5%</h3>
<p>Point change: 5 − 4 = 1 percentage point. Relative change: (5 − 4) ÷ 4 × 100 = 1 ÷ 4 × 100 = 25%. On a $10,000 balance, interest rises from 10,000 × 0.04 = $400 to 10,000 × 0.05 = $500. The extra $100 is 1 point of the principal and 25% more interest. Because the principal is unchanged, the relative change in interest matches the relative change in the rate.</p>
<h3>GST rate: 18% to 20%</h3>
<p>Point change: 20 − 18 = 2 percentage points. Relative change: 2 ÷ 18 × 100 = 11.11%. On a ₹1,000 pre-tax invoice, GST rises from ₹180 to ₹200, a ₹20 increase. Saying “GST went up 2%” would imply ₹180 × 1.02 = ₹183.60, which is not the new figure. “GST went up 2 percentage points, or 11.11%” is precise and fits in one line.</p>
<h3>Exam pass rate: 72% to 78%</h3>
<p>Point change: 78 − 72 = 6 percentage points. Relative change: 6 ÷ 72 × 100 = 8.33%. If 1,000 students took the exam, the number passing rose from 720 to 780, a gain of 60 students. The school improved by 6 points, while the count of passing students rose 8.33%. Both are useful; the first compares rates, the second compares the size of the change against the old rate.</p>
<table>
<thead><tr><th>Start rate</th><th>End rate</th><th>Point change</th><th>Relative change</th><th>Clear wording</th></tr></thead>
<tbody>
<tr><td>4% savings</td><td>5%</td><td>+1 pp</td><td>+25%</td><td>Up 1 point, or 25% more</td></tr>
<tr><td>6% loan</td><td>8%</td><td>+2 pp</td><td>+33.33%</td><td>Up 2 points, one-third more</td></tr>
<tr><td>18% GST</td><td>20%</td><td>+2 pp</td><td>+11.11%</td><td>Up 2 points, 11.11% higher</td></tr>
<tr><td>72% pass rate</td><td>78%</td><td>+6 pp</td><td>+8.33%</td><td>Up 6 points, 8.33% better</td></tr>
<tr><td>1% fee</td><td>2%</td><td>+1 pp</td><td>+100%</td><td>Doubled, up 1 point</td></tr>
</tbody>
</table>

<h2 id="why-headlines-get-it-wrong">Why headlines get it wrong</h2>
<p>“Unemployment rose 2%” could mean the rate moved from 5.0% to 5.1%, a relative rise of 2%, or from 5% to 7%, a rise of 2 percentage points. The first is a modest change; the second is a large one. In economics and policy writing, the convention is to use “percentage points” for the difference and “percent” for the relative change, but the rule is not universal, so the reader often has to guess.</p>
<p>You can remove the guesswork with a simple rule: name the unit and, where space allows, show both. “The rate rose 2 percentage points, from 5% to 7%, a 40% increase” leaves nothing to interpret. “The rate rose 2%” does not. The same discipline applies to dashboards and reports: a column labeled “change” without “pp” or “%” is an invitation to misread the number.</p>
<p>Avoid “2% percentage points” and “percent of a percentage point.” A point is already the unit for the difference; adding percent in front doubles the ambiguity. In tables, “pp” is a fine abbreviation if the header defines it. In prose, spell out “percentage points” the first time and use “points” after that.</p>

<h2 id="when-relative-change-misleads">When the relative number misleads</h2>
<p>Relative change is sensitive to the starting value. A 1-point move from 1% to 2% is a 100% increase, while the same point move from 10% to 11% is a 10% increase. If you report only the percentage, the first sounds enormous and the second sounds routine, even though both add the same one point to the rate. If you report only the point change, the first looks small despite doubling the rate.</p>
<p>Money impact follows the point change, not the relative change. A 1-point fee increase on a $100,000 balance costs $1,000 whether the fee went from 1% to 2% or from 10% to 11%. The relative increase is 100% in the first case and 10% in the second, but the cash difference is identical. For a borrower or investor, the dollar or rupee amount is often the decision-relevant number; the percentage framing explains how dramatic the change is relative to the old rate.</p>
<blockquote class="tip"><strong>Report both:</strong> “2 points, or 11.11%” is only seven words and removes the ambiguity. If you can report only one, use points when comparing rates and percent when comparing amounts or counts.</blockquote>

<h2 id="how-to-convert">Converting between points and percent</h2>
<p>To convert a point change into a relative percentage, divide the point change by the starting rate and multiply by 100. Three points starting from 6% is 3 ÷ 6 × 100 = 50%. The same three points starting from 30% is 3 ÷ 30 × 100 = 10%. The point change alone cannot tell you the relative change; you always need the starting rate.</p>
<p>To go the other way, multiply the starting rate by 1 plus the relative change. A 10% relative increase from a 20% rate gives 20 × 1.10 = 22%, a 2-point move. A 10% relative increase from a 5% rate gives 5 × 1.10 = 5.5%, a 0.5-point move. This is the same forward percentage formula used for prices and salaries; the only difference is that the base is itself a percentage.</p>
<p>Watch the direction. A fall from 5% to 4% is −1 point and −20% relative, because 1 ÷ 5 = 0.20. A rise back from 4% to 5% is +1 point but +25% relative, because 1 ÷ 4 = 0.25. The point change is symmetric; the relative change is not.</p>

<h2 id="calculator-workflow">Check both numbers in the calculator</h2>
<ol>
<li>Subtract the starting rate from the ending rate to get the point change: 5 − 4 = 1 point.</li>
<li>Divide the point change by the starting rate and multiply by 100: 1 ÷ 4 × 100 = 25%.</li>
<li>Label both results. A single “1” in a report is meaningless without its unit.</li>
<li>Use the Change view in the tool to verify the relative figure with the start and end values.</li>
</ol>
<p>Open the <a href="/percentage-calculator">percentage calculator</a> and enter old 4, new 5 to confirm the 25% relative change. Then run old 1, new 2 to see the 100% result that a one-point move can produce. For the underlying formulas across discounts, margins and taxes, the <a href="/blog/percentage-calculator-guide">pillar guide</a> collects the whole family in one place.</p>
<div class="cta-box"><strong>Try it:</strong> open the <a href="/percentage-calculator">percentage calculator</a>, confirm 4 → 5 is +25%, then check 72 → 78 for +8.33%. Report the point change and the relative change together, and the classic points-versus-percent mistake disappears from your next report.</div>
`;

export const percentagePoints: BlogPost = {
  pillar: "percentage-calculator-guide",
  slug: "percentage-points-vs-percent",
  kind: "cluster",
  title: "Percentage Points vs Percent: Avoid the Classic Mistake",
  description:
    "Percentage points vs percent: why 4% to 5% is 1 point but a 25% rise, with a conversion table and clear worked rate examples.",
  keywords: [
    "percentage points vs percent",
    "percentage point difference",
    "points versus percent change",
    "convert percentage points to percent",
    "rate change in percentage points",
    "percentage point example",
  ],
  toolSlugs: ["percentage-calculator"],
  relatedSlugs: ["percentage-increase-decrease", "percentage-difference", "reverse-percentage"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "percentage-points-vs-percent", text: "The difference in one sentence", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "why-headlines-get-it-wrong", text: "Why headlines get it wrong", level: 2 },
    { id: "when-relative-change-misleads", text: "When relative change misleads", level: 2 },
    { id: "how-to-convert", text: "Converting between points and percent", level: 2 },
    { id: "calculator-workflow", text: "Check both numbers", level: 2 },
  ],
  html,
  faqs: [
    {
      question: "What is the difference between percentage points and percent?",
      answer:
        "A percentage point is the arithmetic difference between two percentages, while percent describes a relative change from a starting value. A rate from 4% to 5% rises 1 percentage point, but that is a 25% relative increase because 1 ÷ 4 = 0.25. The point change is the gap; the percent change scales the gap to the starting rate.",
    },
    {
      question: "Is 2% the same as 2 percentage points?",
      answer:
        "No. Two percentage points is a fixed gap between rates, such as 5% to 7%. A 2% change is relative and depends on the starting rate: 2% of 5% is 0.1 point, while 2% of 50% is 1 point. Saying “up 2%” when you mean 2 points understates the move in most cases.",
    },
    {
      question: "How do I convert percentage points to percent?",
      answer:
        "Divide the point change by the starting rate and multiply by 100. A 2-point rise from 6% is 2 ÷ 6 × 100 = 33.33%. The same 2-point rise from 20% is 2 ÷ 20 × 100 = 10%. Because the starting rate is in the denominator, points alone are never enough to produce the relative percentage.",
    },
    {
      question: "Why is a move from 1% to 2% a 100% increase?",
      answer:
        "The gap is 1 point, and the starting value is 1%, so the relative change is 1 ÷ 1 × 100 = 100%. The rate doubled. A move from 10% to 11% is also 1 point but only a 10% increase, because the same gap is measured against a much larger base. This is why point changes and relative changes must be reported together.",
    },
    {
      question: "Should reports say percentage points or percent?",
      answer:
        "Use percentage points when comparing two rates, and percent when comparing amounts, counts or a change relative to a starting value. “The rate rose 2 percentage points, from 5% to 7%, a 40% increase” is unambiguous. “The rate rose 2%” is not, because readers cannot tell which unit was intended.",
    },
    {
      question: "How do I calculate a percentage point change?",
      answer:
        "Subtract the starting rate from the ending rate. From 18% to 20%, the change is 20 − 18 = 2 percentage points. On a ₹1,000 base, the tax rises from ₹180 to ₹200, a ₹20 increase. The relative change is 2 ÷ 18 × 100 = 11.11%, which is a different and equally valid number.",
    },
  ],
};
