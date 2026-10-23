import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A weighted grade gives different assessments different influence. A final exam worth 40% can move your result more than a quiz worth 5%, even when both are scored out of 100. That sounds obvious until you average a column of percentages and discover the answer depends on which scores carry weight.</p>
<p>This tutorial explains category weights, the weighted average formula and the mistakes that make a course grade look better or worse than it is. It sits inside the <a href="/blog/grade-calculator-guide">grade calculator guide</a>. Keep the <a href="/grade-calculator">grade calculator</a> open if you want to check each line.</p>

<h2 id="what-weighted-grade-means">What a weighted grade actually means</h2>
<p>Every graded item has two numbers: the score you earned and the share of the course grade it controls. The share is the weight. A homework category worth 20% supplies one fifth of the final grade, no matter how many individual assignments sit inside it. A final worth 40% supplies two fifths.</p>
<p>The contribution of one item is its score multiplied by its weight. If you earn 90% on a final worth 40%, that item contributes 36 points toward the course total. If you earn 95% on a quiz worth 5%, it contributes 4.75 points. The lower quiz score may look impressive, but the final does more arithmetic work.</p>
<p>Weight is not difficulty, effort or points possible. A hard one-credit lab and an easy one-credit seminar can carry the same weight. Read the syllabus table before assuming that the assessment with the most questions matters most. Often it does not.</p>

<h2 id="weights-vs-points">Weights, points and percentages</h2>
<p>Syllabi usually express weight in one of two ways. Percentage weights say “homework 20%, midterm 30%, final 50%.” Point weights say “homework is worth 200 points out of 1,000.” The two systems describe the same idea: each category owns a fraction of the total.</p>
<p>To convert points to a percentage weight, divide the category points by the total points. If a course has 1,000 points and homework is 200, homework is 200 ÷ 1,000 = 20%. To convert a percentage weight to points in a 500-point course, multiply 500 by 0.20 to get 100 points. Do the conversion once, then stay in one system for the whole calculation.</p>
<p>The grade calculator accepts a score and a weight for each row. It multiplies score by weight, adds the results, then divides by the total weight entered. That means the weights do not have to sum to 100 for the average to calculate. If you enter only three categories worth 20%, 30% and 20%, the tool divides by 70, so the result describes the entered portion rather than the whole course. Check the displayed total weight before trusting the average.</p>

<h2 id="weighted-average-formula">The weighted average formula</h2>
<p>Write each score as a percentage and each weight as a percentage. The weighted average is the sum of score times weight, divided by the sum of the weights:</p>
<p><strong>Weighted average = (g₁ × w₁ + g₂ × w₂ + … ) ÷ (w₁ + w₂ + … )</strong></p>
<p>If the weights add to 100, the denominator is 100 and the arithmetic simplifies to the sum of each score times its decimal share. A score of 88 at 20% becomes 0.20 × 88 = 17.6. Four such contributions add to the course grade. If the weights add to something else, the denominator is that total, which is why a partial grade is not the same as a final grade.</p>
<p>The unweighted average is the special case where every item has the same weight. It is not a universal baseline. A student with scores of 90, 90, 60 and 60 has an unweighted average of 75. If the two 90s are quizzes worth 10% each and the two 60s are exams worth 40% each, the weighted average is 66. The same scores tell a very different story once the syllabus is applied.</p>

<h2 id="worked-example-one">Worked example: four weighted assessments</h2>
<p>Suppose a course uses the weights below. Each score is a percentage, and the weights add to 100%.</p>
<table>
<thead><tr><th>Assessment</th><th>Score</th><th>Weight</th><th>Contribution</th></tr></thead>
<tbody>
<tr><td>Homework</td><td>88%</td><td>20%</td><td>17.60</td></tr>
<tr><td>Quizzes</td><td>92%</td><td>10%</td><td>9.20</td></tr>
<tr><td>Midterm</td><td>78%</td><td>30%</td><td>23.40</td></tr>
<tr><td>Final exam</td><td>85%</td><td>40%</td><td>34.00</td></tr>
<tr><td><strong>Total</strong></td><td>—</td><td><strong>100%</strong></td><td><strong>84.20</strong></td></tr>
</tbody>
</table>
<p>The contributions are 0.20 × 88 = 17.6, 0.10 × 92 = 9.2, 0.30 × 78 = 23.4 and 0.40 × 85 = 34.0. They add to 84.2, so the weighted grade is <strong>84.2%</strong>. Under a common cutoff of 80% for a B, that is a B. Your school may use different cutoffs, so treat the letter as an illustration.</p>
<p>Compare that with the unweighted average of the four scores: (88 + 92 + 78 + 85) ÷ 4 = 85.75. The weighted result is lower because the weakest score, the 78, carries 30% of the grade, while the strongest score, the 92, carries only 10%. This is the central lesson of weighting: position matters as much as performance.</p>

<h2 id="worked-example-two">Worked example: same scores, different weights</h2>
<p>Take three scores of 90, 80 and 70. With weights of 20%, 30% and 50%, the contributions are 18, 24 and 35, for a total of <strong>77%</strong>. The raw average is 80, so the weighting removes three points because the lowest score owns the largest share.</p>
<p>Now reverse the weights: 90 at 50%, 80 at 30% and 70 at 20%. The contributions become 45, 24 and 14, for <strong>83%</strong>. The scores did not change. Only their positions in the grade book changed. A six-point swing came from moving weight toward the strongest result.</p>
<p>This is why two students with the same quiz scores can end the term with different grades, and why a strong final can rescue a weak midterm. It also explains why “I averaged an 80” is incomplete without the word “weighted” or the weights themselves.</p>

<h2 id="reading-the-syllabus">Reading the weights in your syllabus</h2>
<p>Find the assessment table and copy it exactly. Look for the category names, the percentage or point values, and any rule that changes how a category is scored. A homework category worth 15% may contain ten assignments, but the category still owns 15% in total. Ten perfect quizzes do not add 150% to the course.</p>
<p>Check for dropped scores, replacement policies, participation grades and extra credit. A “drop the lowest quiz” rule can raise the quiz average before the weights are applied. A replacement rule may let a final exam replace a midterm score. Extra credit may add points inside a category or to the overall total. Each rule changes the arithmetic in a different place.</p>
<p>Also check how the course rounds. Some systems keep two decimals and round only at the end. Others round each category before weighting. A course that rounds 89.49 to 89.5 before assigning a letter can produce a different result from one that rounds the final average. Policies vary by institution and by instructor, so check the handbook and the course outline rather than assuming a universal rule.</p>

<h2 id="common-mistakes">Common weighted-grade mistakes</h2>
<ol>
<li><strong>Averaging the percentages equally.</strong> Adding 88, 92, 78 and 85 and dividing by four ignores the weights. Use the weighted formula.</li>
<li><strong>Using points as weights.</strong> A category worth 200 points out of 1,000 is 20%, not 200. Convert first, then multiply.</li>
<li><strong>Assuming the weights must sum to 100.</strong> The calculator normalizes by the weight entered. If your rows sum to 70, the result covers 70% of the course, not the whole course.</li>
<li><strong>Treating missing work as zero.</strong> A blank row is not a zero unless the syllabus says it is. A missing assignment may be excluded, penalized or replaced, and each choice changes the result.</li>
<li><strong>Counting the same work twice.</strong> Do not enter both a “homework” category and the individual homework assignments it contains. Pick one level of detail.</li>
<li><strong>Rounding too early.</strong> Keep decimals through the multiplication and addition, then round the final grade. Rounding each category first can shift the total.</li>
<li><strong>Confusing the current average with the final grade.</strong> If the final exam has not happened, your weighted average covers only the completed rows. It is a snapshot, not a prediction.</li>
</ol>
<p>A quick check catches most of these. Multiply each score by its weight and confirm the contributions add to the result. Then ask whether the weights cover the whole course. If they cover only part of it, label the answer as a partial average.</p>

<h2 id="calculator">Checking a weighted grade in the calculator</h2>
<p>Open the <a href="/grade-calculator">grade calculator</a> and add one row for each assessment or category. Enter the score as a percentage and the weight as a percentage. The tool shows the weighted average, the total weight entered and a letter based on common cutoffs.</p>
<ol>
<li>Copy the weights from the syllabus, not from memory.</li>
<li>Enter each score and weight, then read the total weight to confirm the rows cover the intended portion.</li>
<li>Compare the weighted average with your own arithmetic. If they differ, check for a duplicated category or a missing row.</li>
<li>Use the “Use as current” control to carry the average into the final-score panel when you are ready to plan the exam.</li>
</ol>
<p>If you have not taken the final yet, leave it out and treat the result as your current average. The <a href="/blog/grade-calculator-guide/final-exam-grade-needed">final exam grade needed guide</a> shows how to combine that average with the final weight and a target grade. If you need the GPA view instead, the <a href="/blog/grade-calculator-guide/percentage-to-gpa">percentage to GPA guide</a> explains why the conversion is approximate.</p>
<div class="cta-box"><strong>Run your own numbers:</strong> open the <a href="/grade-calculator">free grade calculator</a>, enter each score and weight, and check the weighted average against the table above. No signup, and the calculation stays on your device.</div>
`;

export const gradeWeighted: BlogPost = {
  pillar: "grade-calculator-guide",
  slug: "weighted-grade-calculation",
  kind: "cluster",
  title: "Weighted Grade Calculation: How Weights Shape Your Score",
  description:
    "See how category weights combine into a course grade, with two worked examples, a weight table and fixes for the most common averaging mistakes.",
  keywords: ["weighted grade calculation", "weighted grade calculator", "how to calculate weighted average grade", "category weights", "weighted vs unweighted grade", "grade weight percentage"],
  toolSlugs: ["grade-calculator"],
  relatedSlugs: ["final-exam-grade-needed", "percentage-to-gpa", "weighted-vs-unweighted-gpa"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-weighted-grade-means", text: "What a weighted grade means", level: 2 },
    { id: "weights-vs-points", text: "Weights, points and percentages", level: 2 },
    { id: "weighted-average-formula", text: "The weighted average formula", level: 2 },
    { id: "worked-example-one", text: "Worked example: four assessments", level: 2 },
    { id: "worked-example-two", text: "Worked example: different weights", level: 2 },
    { id: "reading-the-syllabus", text: "Reading the weights in your syllabus", level: 2 },
    { id: "common-mistakes", text: "Common weighted-grade mistakes", level: 2 },
    { id: "calculator", text: "Checking a weighted grade", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I calculate a weighted grade?", answer: "Multiply each score by its weight, add the contributions, then divide by the total weight. For 88 at 20%, 92 at 10%, 78 at 30% and 85 at 40%, the contributions are 17.6, 9.2, 23.4 and 34.0. They add to 84.2 over 100, so the weighted grade is 84.2%." },
    { question: "Do my weights have to add up to 100%?", answer: "No. The grade calculator divides by the total weight entered, so weights of 20, 30 and 20 produce an average over 70. That result covers only the entered portion of the course. For a complete course grade, include every category and check that the displayed total weight matches the syllabus, usually 100%." },
    { question: "What is the difference between weighted and unweighted grades?", answer: "An unweighted average treats every score equally, while a weighted average gives each score the share listed in the syllabus. Scores of 90, 80 and 70 average 80 without weights. With weights of 20%, 30% and 50%, the same scores produce 77%. The weights, not the number of scores, decide the influence." },
    { question: "Why is my weighted grade lower than my average?", answer: "The lower scores probably carry larger weights. In the four-assessment example, the raw average is 85.75, but the 78 carries 30% and the 92 carries only 10%, so the weighted grade falls to 84.2. Compare each score with its weight to see which result is pulling the total." },
    { question: "How should I handle a missing assignment?", answer: "Do not enter zero unless the syllabus says a missed item scores zero. A blank row is excluded by the calculator, while a zero is included and lowers the average. Check the course policy for dropped scores, late penalties and replacement rules before choosing which treatment to model." },
    { question: "Can I use points instead of percentages?", answer: "Yes, after converting. Divide the category points by the total course points to get a percentage weight, then enter that weight with the category score. If homework is 200 points out of 1,000, it is 20%. Mixing raw points and percentage weights in the same calculation produces a meaningless result." },
  ],
};
