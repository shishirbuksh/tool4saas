import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two numbers move from 60 to 80. One report calls that a 33.33% increase; another calls it a 28.57% difference. Both are right because they answer different questions. <strong>Percentage change measures movement from a known starting point. Percentage difference measures the gap between two peers when neither value is the baseline.</strong> Swap the order and change flips from +33.33% to −25%, while difference stays 28.57%. This guide gives both formulas, runs them on identical numbers, and shows which one belongs in a KPI report, a lab comparison, or a price check.</p>
<p>Part of the <a href="/blog/percentage-calculator-guide">Percentage Calculator Guide</a>. Run both views in the <a href="/percentage-calculator">free percentage calculator</a>, and read <a href="/blog/percentage-calculator-guide/percentage-increase-decrease">percentage increase and decrease</a> when direction is the story.</p>

<h2 id="two-formulas">The two formulas side by side</h2>
<p><strong>Percentage change</strong> answers a before-and-after question. You need an old value and a new value, and the old value is the denominator: change = (new − old) ÷ old × 100. From 60 to 80, the gap is 20, the baseline is 60, so the result is 20 ÷ 60 = 0.3333, or +33.33%. Reverse the direction and the baseline becomes 80: (60 − 80) ÷ 80 = −25%. The sign matters because the movement has a direction.</p>
<p><strong>Percentage difference</strong> answers a peer-to-peer question. There is no old or new, only A and B, and the denominator is their average: difference = |A − B| ÷ ((A + B) ÷ 2) × 100. For 60 and 80, the gap is 20, the mean is 70, so the result is 20 ÷ 70 = 0.2857, or 28.57%. Enter 80 and 60 instead and the numerator stays 20 while the denominator stays 70. The answer does not move.</p>
<p>That average denominator is the whole trick. Dividing by one of the values would reintroduce a baseline and destroy symmetry. Dividing by the midpoint treats the two values as equal citizens, which is exactly what you want when comparing two suppliers' quotes, two labs' readings, or two regions' rates. The cost is interpretive: a symmetric number cannot tell you whether something grew or shrank, so it should never replace change in a trend report.</p>
<blockquote class="tip"><strong>Memory hook:</strong> change asks “how far did we travel from where we started?” Difference asks “how far apart are these two values?” One has a starting line; the other does not.</blockquote>

<h2 id="worked-examples">Same numbers, different answers</h2>
<h3>Example 1 — 60 and 80</h3>
<p>Forward change: (80 − 60) ÷ 60 × 100 = 20 ÷ 60 × 100 = 33.33%. Backward change: (60 − 80) ÷ 80 × 100 = −20 ÷ 80 × 100 = −25%. Percentage difference: |60 − 80| ÷ ((60 + 80) ÷ 2) × 100 = 20 ÷ 70 × 100 = 28.57%. Notice that 28.57% is not the average of +33.33% and −25%; that average would be 4.17%, which answers nothing useful. Difference has its own denominator, so it deserves its own line in your spreadsheet.</p>
<h3>Example 2 — revenue from $150,000 to $180,000</h3>
<p>Change: (180,000 − 150,000) ÷ 150,000 × 100 = 30,000 ÷ 150,000 × 100 = 20%. Difference: |180,000 − 150,000| ÷ ((180,000 + 150,000) ÷ 2) × 100 = 30,000 ÷ 165,000 × 100 = 18.18%. The difference is smaller than the change because the average, $165,000, is larger than the old value, $150,000. If you report “18.18% difference” in a growth review, a reader may assume growth stalled; if you report “20% growth,” you have correctly named the baseline.</p>
<h3>Example 3 — 120 planned hours vs 150 actual hours</h3>
<p>Change against the plan: (150 − 120) ÷ 120 × 100 = 30 ÷ 120 × 100 = 25% over budget. Difference: |150 − 120| ÷ ((150 + 120) ÷ 2) × 100 = 30 ÷ 135 × 100 = 22.22%. If the plan is authoritative, 25% is the honest number. If you are comparing two teams' estimates and neither is the official baseline, 22.22% is the fairer gap. The arithmetic is similar; the story is not.</p>

<h2 id="when-to-use-each">When to use each</h2>
<p>The choice follows from the question, not from which formula looks more familiar. Use change when one value is genuinely the starting point and the other is the result. Use difference when the two values are peers and either order should produce the same answer.</p>
<table>
<thead><tr><th>Question you are answering</th><th>Measure</th><th>Formula</th><th>Result for 60 and 80</th></tr></thead>
<tbody>
<tr><td>How much did it grow or fall from the old value?</td><td>Percentage change</td><td>(new − old) ÷ old × 100</td><td>+33.33% forward, −25% backward</td></tr>
<tr><td>How far apart are two peers with no baseline?</td><td>Percentage difference</td><td>|A − B| ÷ mean × 100</td><td>28.57% either order</td></tr>
<tr><td>What part of the whole is this?</td><td>Percentage share</td><td>part ÷ whole × 100</td><td>60 is 75% of 80</td></tr>
<tr><td>How many points did a percentage rate move?</td><td>Percentage points</td><td>end rate − start rate</td><td>Not applicable to counts</td></tr>
</tbody>
</table>
<ul>
<li><strong>Use change for:</strong> monthly revenue, traffic this quarter vs last, a price before and after a known increase, weight lost from a starting weight, or any KPI where the earlier period is the reference.</li>
<li><strong>Use difference for:</strong> two suppliers' quotes, two labs measuring the same sample, two cities' rates, two ad variants with no control, or any comparison where neither side is the official baseline.</li>
<li><strong>Use neither for:</strong> “what percent of the total is this?” and “how many percentage points did the rate move?” Those are separate calculations, and forcing them into a change-or-difference frame is how reports end up with the wrong label.</li>
</ul>

<h2 id="traps">Traps: order, zero and signed values</h2>
<p><strong>Order changes the answer for change, never for difference.</strong> If someone presents a change without saying which value is old, the number is incomplete. From 80 to 60 is a 25% fall; from 60 to 80 is a 33.33% rise. The same pair carries two different change values, which is why press releases often choose the flattering direction.</p>
<p><strong>Zero breaks change.</strong> If old = 0, the formula divides by zero and the result is undefined. Going from 0 to 50 is not “infinity percent growth” in a management report; write “from zero” and show the absolute increase. Percentage difference handles 0 vs 50: |0 − 50| ÷ 25 × 100 = 200%. If both values are zero, the denominator is also zero, so report 0 rather than an error.</p>
<p><strong>Negative values need care.</strong> When one value is negative, the mean denominator can shrink toward zero and create a huge, misleading percentage. A profit of −$10,000 turning into +$10,000 is a $20,000 swing, but a percentage built on a mean near zero is not meaningful. For signed quantities such as profit and loss, compare absolute changes or declare a fixed baseline instead of forcing the formula.</p>
<p><strong>Percent is not a percentage point.</strong> A rate moving from 4% to 5% rose 1 percentage point, which is a 25% relative increase. The formulas above operate on the underlying numbers; the percentage-point distinction applies when the numbers themselves are rates. Keep the two vocabularies separate and half the confusing headlines disappear.</p>
<p><strong>Label every number in the report.</strong> “Sales rose 20%” and “the two regions differ by 18.18%” are different claims. A reader who cannot see the denominator cannot reproduce either figure, so pair each percentage with the two inputs that produced it.</p>

<h2 id="calculator-walkthrough">Use the calculator without mixing modes</h2>
<p>The <a href="/percentage-calculator">percentage calculator</a> separates the two questions into different views, which is the main defense against accidental mode-mixing. Work through this sequence once and the labels become obvious:</p>
<ol>
<li>Open the tool and choose the Difference view. Enter 60 and 80 in either field.</li>
<li>Read 28.57% with the formula shown. Swap the two inputs; the result should stay 28.57%.</li>
<li>Switch to the Change view for a timeline. Enter old 150,000 and new 180,000 to get +20%.</li>
<li>Reverse the pair to get −16.67%. If that feels wrong, the baseline changed, not the arithmetic.</li>
</ol>
<div class="cta-box"><strong>Try it:</strong> open the <a href="/percentage-calculator">percentage calculator</a>, run 60 vs 80 in Difference, then run 150 to 180 in Change. For the full set of percent formulas and use cases, start with the <a href="/blog/percentage-calculator-guide">Percentage Calculator Guide</a>.</div>
`;

export const percentageDifference: BlogPost = {
  pillar: "percentage-calculator-guide",
  slug: "percentage-difference",
  kind: "cluster",
  title: "Percentage Difference vs Change: When to Use Each",
  description:
    "Percentage difference vs change: formulas, a comparison table and worked examples for 60 vs 80 and revenue growth. Use the right measure.",
  keywords: [
    "percentage difference calculator",
    "percentage difference vs change",
    "percent difference formula",
    "symmetric percent difference",
    "compare two percentages",
    "percentage change formula",
  ],
  toolSlugs: ["percentage-calculator"],
  relatedSlugs: ["percentage-increase-decrease", "reverse-percentage", "percentage-points-vs-percent"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "two-formulas", text: "The two formulas", level: 2 },
    { id: "worked-examples", text: "Same numbers, different answers", level: 2 },
    { id: "when-to-use-each", text: "When to use each", level: 2 },
    { id: "traps", text: "Traps and edge cases", level: 2 },
    { id: "calculator-walkthrough", text: "Use the calculator", level: 2 },
  ],
  html,
  faqs: [
    {
      question: "What is the formula for percentage difference?",
      answer:
        "Percentage difference equals the absolute gap between two values divided by their average, then multiplied by 100. For 60 and 80: |60 − 80| ÷ ((60 + 80) ÷ 2) × 100 = 20 ÷ 70 × 100 = 28.57%. The absolute value makes the result symmetric, so entering the values in either order gives the same 28.57%.",
    },
    {
      question: "Why is percentage difference symmetric?",
      answer:
        "It uses the mean of the two values as the denominator instead of picking one value as the baseline. The gap between 60 and 80 is 20 either way, and their mean is 70 either way, so the result is 28.57% whichever value you type first. That neutrality suits peer comparisons such as two quotes, two lab readings or two regions.",
    },
    {
      question: "When should I use percentage change instead?",
      answer:
        "Use percentage change whenever one value is genuinely the starting point and the other is the result. Revenue moving from $150,000 to $180,000 is (180,000 − 150,000) ÷ 150,000 × 100 = 20% growth. The same pair read backward is a 16.67% decline, which is why a change figure must always name its baseline.",
    },
    {
      question: "Can percentage difference be larger than percentage change?",
      answer:
        "Yes. If the average of the two values is smaller than the baseline used for change, the difference will be larger. Comparing 100 with 50 gives a 50% change downward but a 66.67% difference, because the gap of 50 is divided by the mean of 75 rather than by 100. The denominators, not the gap, create the gap between the answers.",
    },
    {
      question: "What happens if one of the values is zero?",
      answer:
        "Percentage change is undefined when the old value is zero because the formula divides by zero. Percentage difference still works for 0 and 50: the gap is 50 and the mean is 25, so the difference is 200%. If both values are zero, the difference is 0 rather than an error; report that no gap exists.",
    },
    {
      question: "Should I use percentage difference to compare prices?",
      answer:
        "Only when neither price is the reference. Comparing two stores' prices for the same item is a peer comparison, so difference is defensible. Measuring a price before and after a known discount is a change question, so use change and keep the original price as the baseline. Label the measure in the report so readers know which question was asked.",
    },
  ],
};
