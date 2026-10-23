import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two high school students can earn the same letters in the same subjects and still report different GPAs. One transcript lists a 3.75; the other lists a 4.38. The difference is not the grades. It is whether the school adds extra weight for honors, Advanced Placement or other advanced courses.</p>
<p>This guide is part of the <a href="/blog/grade-calculator-guide">grade calculator guide</a>. It explains how weighted and unweighted GPAs are built, works two examples with the same grades under different course levels, and covers why colleges may recalculate the number on their own terms. The <a href="/gpa-calculator">GPA calculator</a> can check the unweighted arithmetic.</p>

<h2 id="two-scales">The two scales at a glance</h2>
<p>An <strong>unweighted GPA</strong> treats every course the same. An A is worth 4.0 whether it appears in an AP class or a standard elective. The scale usually tops out at 4.0, and the average is a straightforward credit-weighted mean of those values.</p>
<p>A <strong>weighted GPA</strong> adds extra value to advanced courses. A school might add 0.5 for an honors course and 1.0 for an AP course, so an A in AP Biology counts as 5.0 while an A in a standard biology class counts as 4.0. The resulting average can exceed 4.0, which is why a weighted GPA of 4.3 is not a mistake.</p>
<p>Neither figure is inherently more honest. The unweighted GPA compares raw course performance on one scale. The weighted GPA tries to reflect the difficulty of the schedule. A school may report both, and a college may care about each for different reasons.</p>
<p>The same transcript may lead with a weighted number and print the unweighted value in a smaller field, or the reverse. Before comparing your GPA with a friend’s, check five things: the scale maximum, the bonus for each course level, which courses are included, the credit weights and the rounding rule. Most apparent discrepancies come from one of those five.</p>

<h2 id="how-weighting-works">How honors and AP weight is added</h2>
<p>Weighting policies are local. A school might add a flat bonus to the grade value, add quality points after multiplying by credits, or use a separate 5.0 or 6.0 scale. Some schools weight only core academic courses; others weight every honors section, including electives. Some cap the weighted GPA at 4.5 or 5.0; others let it run higher.</p>
<p>The timing of the bonus also varies. One school adds 0.5 to both semesters of an honors course. Another adds the bonus only at the end of the year. A third weights AP courses but not dual-enrollment courses taken at a local college. These choices change the number even when the report card looks identical.</p>
<p>Because the rules are local, a weighted GPA is not portable by itself. A 4.2 at one high school may reflect a schedule full of AP courses, while a 4.2 at another may reflect a different mix of honors classes and a different bonus scale. Admissions offices often ask for a school profile that explains the weighting, precisely because the raw number cannot carry that context alone.</p>

<h2 id="worked-examples">Two examples with the same grades</h2>
<p><strong>Example 1: one student, two calculations.</strong> A student takes AP Biology, standard English, honors algebra and standard history, one credit each. The grades are A, B+, A− and B. On the unweighted scale the values are 4.0, 3.3, 3.7 and 3.0, which total 14.0 over four credits for a <strong>3.50</strong> GPA.</p>
<table>
<thead><tr><th>Course</th><th>Level</th><th>Grade</th><th>Unweighted value</th><th>Weighted value</th></tr></thead>
<tbody>
<tr><td>Biology</td><td>AP</td><td>A</td><td>4.0</td><td>5.0</td></tr>
<tr><td>English</td><td>Standard</td><td>B+</td><td>3.3</td><td>3.3</td></tr>
<tr><td>Algebra</td><td>Honors</td><td>A−</td><td>3.7</td><td>4.2</td></tr>
<tr><td>History</td><td>Standard</td><td>B</td><td>3.0</td><td>3.0</td></tr>
</tbody>
</table>
<p>Now apply a common policy of +1.0 for AP and +0.5 for honors. The values become 5.0, 3.3, 4.2 and 3.0, totaling 15.5 over four credits. The weighted GPA is 15.5 ÷ 4 = 3.875, which rounds to <strong>3.88</strong>. The grades did not change; the course levels did.</p>
<p><strong>Example 2: two students, same unweighted average.</strong> Student A takes four standard courses and earns A, A, B+ and A−. The unweighted values total 4.0 + 4.0 + 3.3 + 3.7 = 15.0 over four credits, or 3.75. With no advanced courses, the weighted average is also 3.75.</p>
<p>Student B earns the same unweighted 3.75 with a harder schedule: an A in AP English, an A− in AP Calculus, an A in honors history and a B+ in standard science. The unweighted values are 4.0 + 3.7 + 4.0 + 3.3 = 15.0. Under the same +1.0 AP and +0.5 honors policy, the weighted values are 5.0 + 4.7 + 4.5 + 3.3 = 17.5 over four credits, or <strong>4.38</strong>. The weighted scale separates two records that the unweighted scale calls equal.</p>
<p>That separation is the point of weighting, but it is also the source of confusion. Student B’s weighted GPA is higher because the schedule is more demanding, not because the letter grades are better. A college that wants to compare raw performance may look at the unweighted figure, then evaluate rigor separately.</p>

<h2 id="recalculation">Why colleges may recalculate</h2>
<p>Many colleges do not rely on the weighted GPA printed by the high school. They may recompute an unweighted GPA from the transcript, count only core academic courses, apply their own weight to honors and AP work, or cap the weight at a level they choose. Some recalculate for scholarship review and use a different method than the admissions office.</p>
<p>This is not a reason to distrust your school’s number. It is a reason to read each college’s published policy and to understand what its application asks for. A form that requests an unweighted GPA usually wants the 4.0 version, even if the transcript leads with a weighted figure. A form that asks for a weighted GPA may expect the school’s official calculation, not a homemade one.</p>
<p>Course rigor can also be evaluated outside the GPA. Admissions readers may look at the number of advanced courses available at your school, the grades in those courses and the overall schedule. The <a href="/blog/grade-calculator-guide/gpa-vs-cgpa">GPA vs CGPA guide</a> covers a different comparison, but the same principle applies: the label and the scale matter as much as the decimal.</p>

<h2 id="which-to-report">Which number should you report?</h2>
<p>Report the figure the form asks for, using the definition the school or college provides. If the application says “weighted GPA,” use your school’s weighted calculation. If it says “unweighted GPA,” use the 4.0 version. If it asks for “GPA” without a qualifier, check the instructions or the school profile before guessing.</p>
<p>Do not recalculate a lower or higher number to fit a narrative. If you have both figures, a counselor or the application itself may allow you to report both in separate fields. A short note explaining the scale can prevent a reader from comparing your 4.3 to a 3.9 from a school with a different policy.</p>
<p>For scholarships, the same rule applies with extra caution. Some programs publish their own recalculation method, some accept the transcript as printed, and some use a minimum unweighted threshold. Verify the rule for each application rather than assuming one number works everywhere. Requirements change, and the current instructions control.</p>

<h2 id="calculator">Checking the unweighted figure</h2>
<p>The <a href="/gpa-calculator">GPA calculator</a> applies grade values and credit hours on a 4.0-style scale, which makes it a good check on the unweighted number. Enter each course, its grade value and its credit, then compare the result with the transcript. If your school assigns different values for plus-or-minus grades, use that table rather than the default one.</p>
<ol>
<li>List each course with its letter grade and credit.</li>
<li>Convert the letters using your school’s unweighted table.</li>
<li>Enter the rows and confirm the total credits.</li>
<li>For a weighted estimate, add your school’s published bonus to each advanced course value, then recompute and label the result as school-specific.</li>
</ol>
<p>Do not treat a weighted total from one school as comparable to a weighted total from another without checking both policies. The <a href="/blog/grade-calculator-guide/weighted-grade-calculation">weighted grade calculation guide</a> explains the in-course version of weighting, where assignments and exams carry different percentages. For the term-by-term college figure, the <a href="/blog/grade-calculator-guide/semester-gpa-calculation">semester GPA guide</a> and the <a href="/blog/grade-calculator-guide/cumulative-gpa-calculation">cumulative GPA guide</a> show how credits accumulate.</p>
<div class="cta-box"><strong>Check your own average:</strong> open the <a href="/gpa-calculator">GPA calculator</a>, enter your courses and credits, and compare the unweighted result with your transcript. The <a href="/grade-calculator">final grade calculator</a> can help with the current-term grade that feeds into it. No signup, and the arithmetic stays on your device.</div>
`;

export const gradeWeightedUnweighted: BlogPost = {
  pillar: "grade-calculator-guide",
  slug: "weighted-vs-unweighted-gpa",
  kind: "cluster",
  title: "Weighted vs Unweighted GPA: How Schools Calculate",
  description:
    "Compare weighted and unweighted high school GPA, see how honors and AP courses add weight, and why colleges may recalculate on their own scale.",
  keywords: ["weighted vs unweighted gpa", "weighted gpa calculator", "unweighted gpa", "ap honors gpa weight", "high school gpa scale", "college gpa recalculation"],
  toolSlugs: ["gpa-calculator"],
  relatedSlugs: ["weighted-grade-calculation", "gpa-vs-cgpa", "how-to-raise-gpa"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "two-scales", text: "The two scales at a glance", level: 2 },
    { id: "how-weighting-works", text: "How honors and AP weight is added", level: 2 },
    { id: "worked-examples", text: "Two examples with the same grades", level: 2 },
    { id: "recalculation", text: "Why colleges may recalculate", level: 2 },
    { id: "which-to-report", text: "Which number to report", level: 2 },
    { id: "calculator", text: "Checking the unweighted figure", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the difference between weighted and unweighted GPA?", answer: "An unweighted GPA gives every course the same value, usually with an A at 4.0. A weighted GPA adds extra value to honors, AP or other advanced courses, so the same A may count as 4.5 or 5.0. The unweighted figure compares raw grades; the weighted figure attempts to reflect course difficulty." },
    { question: "Can a weighted GPA be higher than 4.0?", answer: "Yes. If a school adds 1.0 for an AP course, an A can contribute 5.0 grade points. A student with several advanced courses can therefore finish above 4.0 on the weighted scale. Some schools cap the weighted GPA, and others do not, so the maximum varies by policy." },
    { question: "Do colleges use the weighted or unweighted GPA?", answer: "It depends on the college and the application. Some recalculate an unweighted GPA from the transcript, some apply their own weights, and some review the weighted figure the high school reports. Check each admissions office’s published policy and follow the instructions on the form rather than assuming one scale is universal." },
    { question: "Why do two students with the same grades have different weighted GPAs?", answer: "The course levels may differ. A student who takes AP and honors courses can receive extra weight that a student in standard courses does not. If the letter grades are identical, the weighted averages will differ even though the unweighted averages match. That is the intended effect of weighting, not an error." },
    { question: "How do I calculate my unweighted GPA?", answer: "Convert each course grade to the school’s 4.0 values, multiply by the course credit, add the grade points and divide by total credits. If every course carries one credit, the calculation is a simple average. The GPA calculator can handle multiple credit values and show the total credits used." },
    { question: "Should I report a weighted GPA if the form does not specify?", answer: "Look for instructions or a school profile first. If the form truly gives no guidance, ask the counselor or admissions office which figure they expect. Reporting a weighted number without explaining the scale can mislead a reader who assumes a 4.0 maximum. When both are allowed, report both clearly." },
  ],
};
