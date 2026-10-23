import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A semester GPA is one number built from several course results, and the credit hours attached to those courses decide how much each result matters. Two students can earn the same letter grades and finish the term with different averages because one carried a heavier four-credit course while the other spread the load across electives.</p>
<p>This walkthrough is part of the <a href="/blog/grade-calculator-guide">grade calculator guide</a>. It covers the credit-weighted formula, works the Biology A and Mathematics B+ example to 3.60, and finishes with a four-course term. The <a href="/gpa-calculator">GPA calculator</a> mirrors each step if you want to check your own schedule.</p>

<h2 id="what-semester-gpa-is">What a semester GPA includes</h2>
<p>A semester GPA, also called a term GPA, averages the courses completed in one semester or quarter. It is a snapshot, not a permanent record. The next term starts a new numerator and a new denominator, and the cumulative GPA later combines the snapshots.</p>
<p>Only graded courses that carry credit belong in the calculation. A three-credit lecture and a one-credit lab are separate rows if the school grades them separately. A zero-credit seminar adds no points and no hours, so it cannot move the average. A pass/fail course usually stays out of the GPA even though it appears on the transcript.</p>
<p>The result is expressed on a grade-value scale, most commonly 4.0 in the United States. The scale may include plus-or-minus steps, such as 3.7 for an A− or 3.3 for a B+, or it may use whole numbers only. The same letter grades can therefore produce slightly different term GPAs at different schools.</p>
<p>A part-time schedule follows the same rule but produces a more volatile number. Six credits spread across two courses give each grade half the term’s weight, so one weak result can move the average by several tenths. A full load of fifteen or eighteen credits usually absorbs a single grade more gently, though a high-credit course can still dominate.</p>

<h2 id="formula">The credit-weighted formula</h2>
<p>Start with the grade value for each course. Multiply it by the course’s credit hours to get grade points. Add every course’s points, then divide by the total credits attempted in the term.</p>
<p><strong>Semester GPA = total grade points ÷ total credit hours.</strong></p>
<p>The division is what makes this a weighted mean. A course worth four credits contributes four times as much to the denominator as a one-credit course, and its grade points scale the same way. If you simply averaged the letter values and ignored credits, a one-credit elective would count as much as a four-credit science course, which is not how the registrar calculates it.</p>
<p>Keep the grade value table in front of you while entering rows. A common 4.0 table assigns A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0 and F = 0.0. Some campuses shift the plus-or-minus values, so confirm the exact table in the handbook before trusting a tenth of a point.</p>

<h2 id="worked-examples">Two semesters worked through</h2>
<p><strong>Example 1: Biology A and Mathematics B+.</strong> Biology is a three-credit course with an A, so it earns 4.0 × 3 = 12.0 grade points. Mathematics is a four-credit course with a B+, so it earns 3.3 × 4 = 13.2 grade points. The term total is 25.2 points over seven credits.</p>
<table>
<thead><tr><th>Course</th><th>Grade</th><th>Grade value</th><th>Credits</th><th>Grade points</th></tr></thead>
<tbody>
<tr><td>Biology</td><td>A</td><td>4.0</td><td>3</td><td>12.0</td></tr>
<tr><td>Mathematics</td><td>B+</td><td>3.3</td><td>4</td><td>13.2</td></tr>
<tr><td>Term total</td><td>—</td><td>—</td><td>7</td><td>25.2</td></tr>
</tbody>
</table>
<p>Divide 25.2 by 7: the semester GPA is <strong>3.60</strong>. The mathematics course carries more credits, so its B+ pulls harder on the average than the biology A lifts it. If both courses were three credits, the same grades would produce (12.0 + 9.9) ÷ 6 = 3.65. The grade values did not change; only the weights did.</p>
<p><strong>Example 2: a four-course term.</strong> A student takes a four-credit A (16.0 points), a three-credit B+ (9.9), a three-credit B− (8.1) and a two-credit A− (7.4). Total points are 16.0 + 9.9 + 8.1 + 7.4 = 41.4 over 12 credits. The semester GPA is 41.4 ÷ 12 = 3.45.</p>
<p>Both examples use the same formula, but the second shows why a single weak grade does not automatically sink a term. The B− is offset by the A and A−, and the 12-credit denominator spreads the effect. A third example with a failing grade would behave differently, because an F contributes zero points while still adding its credits to the denominator.</p>

<h2 id="credit-weighting">Why credit hours change the outcome</h2>
<p>Credit weighting is the part students most often underestimate. Adding a one-credit A to the 3.60 example raises the average only slightly: 25.2 + 4.0 = 29.2 over 8 credits, or 3.65. Adding a one-credit C instead lowers it to 27.2 ÷ 8 = 3.40. A one-credit course has a limited voice either way.</p>
<p>Now compare a four-credit course. Replacing the Mathematics B+ with an A− adds 1.6 grade points (14.8 instead of 13.2) and lifts the two-course term to 26.8 ÷ 7 = 3.83. That single grade change moves the average by 0.23. The same improvement in a one-credit elective would move it by much less.</p>
<p>This does not mean you should avoid demanding courses. It means the schedule is part of the arithmetic. If you are protecting a scholarship threshold or a probation limit, know which courses carry the most credits and where your current grade stands before the final weeks. The <a href="/blog/grade-calculator-guide/weighted-grade-calculation">weighted grade guide</a> explains how in-course weights work, while the <a href="/grade-calculator">final grade calculator</a> can show what score you still need in a course.</p>

<h2 id="edge-cases">Edge cases that change the denominator</h2>
<p>Institutional rules can remove a course from the calculation or change which attempt counts. The common cases are worth checking before you estimate a term GPA.</p>
<ul>
<li><strong>Pass/fail:</strong> credits may count toward graduation while staying out of the GPA. The grade is recorded as P or F, and only the F may affect the average, depending on policy.</li>
<li><strong>Repeats:</strong> some schools replace the earlier grade, some average both attempts, and some keep both on the transcript while counting only the latest. The denominator can change by the credits of the dropped attempt.</li>
<li><strong>Withdrawals:</strong> a W usually carries no grade points and no GPA credits, but it can affect full-time status, financial aid or progress requirements. Verify before treating it as neutral.</li>
<li><strong>Incompletes:</strong> an I is temporary. The grade that replaces it later may land in the original term or the term in which it is resolved.</li>
<li><strong>Transfer credits:</strong> many schools accept the credits without folding the grades into the GPA. A transfer student’s term GPA may therefore cover fewer courses than the transcript suggests.</li>
</ul>
<p>Rounding deserves its own check. Carry the full decimal through the division, then round once at the end. Rounding 25.2 ÷ 7 to 3.6 is fine because the result is exact; rounding intermediate course points can shift a close term from 3.495 to 3.50 or leave it at 3.49. If a scholarship requires a specific cutoff, compare the unrounded value with the published rule before assuming either direction.</p>

<h2 id="calculator">Running your own semester</h2>
<p>The <a href="/gpa-calculator">GPA calculator</a> takes a grade value and credit hours for each course, multiplies them, and divides the totals. It is a fast way to test a schedule before grades are final, or to confirm a hand calculation after they are posted.</p>
<ol>
<li>List each graded course with its credit hours and current letter grade.</li>
<li>Convert each letter to the grade value used by your school.</li>
<li>Enter the rows and check that total credits match your registration.</li>
<li>Read the GPA, then change one grade to see how sensitive the term is to that course.</li>
</ol>
<p>Use a separate run for each semester rather than mixing terms. If you want the cumulative picture, the <a href="/blog/grade-calculator-guide/cumulative-gpa-calculation">cumulative GPA guide</a> shows how to combine this term with prior credits. For the difference between a term figure and a program-wide figure, see <a href="/blog/grade-calculator-guide/gpa-vs-cgpa">GPA vs CGPA</a>.</p>
<div class="cta-box"><strong>Check your term:</strong> open the <a href="/gpa-calculator">GPA calculator</a>, enter your course grades and credit hours, and compare the result with the 3.60 and 3.45 examples above. No signup, and the calculation stays on your device.</div>
`;

export const gradeSemesterGpa: BlogPost = {
  pillar: "grade-calculator-guide",
  slug: "semester-gpa-calculation",
  kind: "cluster",
  title: "Semester GPA Calculation: Credits, Grades and Examples",
  description:
    "Calculate semester GPA by weighting each course grade by its credit hours. Includes a Biology A and Math B+ example that totals 3.60.",
  keywords: ["semester gpa calculator", "how to calculate semester gpa", "term gpa formula", "credit weighted gpa", "semester grade point average", "gpa by credit hours"],
  toolSlugs: ["gpa-calculator"],
  relatedSlugs: ["gpa-vs-cgpa", "cumulative-gpa-calculation", "weighted-grade-calculation"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-semester-gpa-is", text: "What a semester GPA includes", level: 2 },
    { id: "formula", text: "The credit-weighted formula", level: 2 },
    { id: "worked-examples", text: "Two semesters worked through", level: 2 },
    { id: "credit-weighting", text: "Why credit hours change the outcome", level: 2 },
    { id: "edge-cases", text: "Edge cases that change the denominator", level: 2 },
    { id: "calculator", text: "Running your own semester", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I calculate semester GPA by hand?", answer: "Multiply each course grade value by its credit hours, add the grade points, then divide by the total credits. Biology A at 4.0 with three credits gives 12.0, and Mathematics B+ at 3.3 with four credits gives 13.2. The total is 25.2 over seven credits, so the semester GPA is 3.60." },
    { question: "Why does a four-credit course affect GPA more than a one-credit course?", answer: "The credit hours set the weight in both the numerator and the denominator. A four-credit B+ contributes 13.2 grade points and four credits, while a one-credit A contributes 4.0 points and one credit. The larger course moves the average further for the same grade change because it represents a bigger share of the term." },
    { question: "Do pass/fail courses count toward semester GPA?", answer: "Usually not. Many schools record pass/fail credits without grade points, so the course adds no numerator and no denominator. A failing pass/fail grade may or may not affect the GPA depending on the policy. Check the handbook before assuming a pass/fail course is neutral in every respect." },
    { question: "Are repeated courses included in the semester GPA?", answer: "The rule varies. Some schools replace the earlier grade and remove those credits from the calculation, some average both attempts, and some count only the most recent attempt. If a repeat is in progress, the current term GPA may change when the final grade posts. Confirm the repeat policy with the registrar." },
    { question: "How is a semester GPA different from a cumulative GPA?", answer: "A semester GPA covers one term’s courses and credits. A cumulative GPA combines every counted term, so prior credits stay in the denominator. A strong semester can raise the cumulative figure slowly, while a weak semester can pull it down quickly if the prior record is small. The arithmetic is the same; the time window differs." },
    { question: "What happens to semester GPA if I withdraw from a course?", answer: "A standard withdrawal usually leaves a W on the transcript with no grade points and no GPA credits, so the term average covers the remaining courses. Withdrawal can still affect full-time enrollment, aid eligibility or academic progress rules. Verify the deadline and the consequences before dropping a course." },
  ],
};
