import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A cumulative GPA answers a different question from a semester GPA. Instead of describing one term, it summarizes every course the school counts across the student’s record. That longer window makes the number stable, slow to move and easy to misread when prior credits are left out of the arithmetic.</p>
<p>This tutorial is part of the <a href="/blog/grade-calculator-guide">grade calculator guide</a>. It gives the cumulative formula, works two examples with prior credits, and lists the policy decisions that can change the official result. Use the <a href="/gpa-calculator">GPA calculator</a> to test your own numbers as you go.</p>

<h2 id="what-cumulative-gpa-includes">What a cumulative GPA includes</h2>
<p>A cumulative GPA combines grade points from every counted course, not just the current term. The numerator is the sum of grade value × credits across the record. The denominator is the sum of credits the institution includes in that average.</p>
<p>At one school the record might mean every course since enrollment. At another it might mean every course that applies to the current degree, with transfer work and repeated attempts handled separately. A student who changes majors may find that some courses still count toward the cumulative average even though they no longer count toward the new major.</p>
<p>The label matters. “Cumulative GPA” usually refers to all terms at the current institution. “Overall GPA” may include transfer work. “CGPA” may mean the same thing on a 4.0 scale or a different program-wide average on a 10-point scale. The <a href="/blog/grade-calculator-guide/gpa-vs-cgpa">GPA vs CGPA comparison</a> covers that terminology split; the arithmetic below applies whenever the average is cumulative.</p>

<h2 id="formula">The cumulative GPA formula</h2>
<p>You cannot average two GPAs directly unless their credit totals are identical. Convert each prior GPA into grade points first, then combine the points and credits.</p>
<p><strong>Cumulative GPA = (prior grade points + new grade points) ÷ (prior credits + new credits).</strong></p>
<p>Prior grade points come from prior GPA × prior credits. New grade points come from the new term’s courses. For a single new term, the same expression can be written as:</p>
<p><strong>Cumulative GPA = (prior GPA × prior credits + new term GPA × new credits) ÷ (prior credits + new credits).</strong></p>
<p>The rearranged form is useful when you know the target. If you want a particular cumulative GPA after a set number of new credits, solve for the new term GPA:</p>
<p><strong>Required new GPA = (target cumulative GPA × total credits − prior grade points) ÷ new credits.</strong></p>
<p>That last equation is the basis of recovery planning, and the <a href="/blog/grade-calculator-guide/how-to-raise-gpa">guide to raising GPA</a> works through it in more detail. The key point here is that cumulative arithmetic always runs through total grade points, never through a simple average of term percentages.</p>

<h2 id="worked-examples">Two worked examples</h2>
<p><strong>Example 1: adding a strong term to a moderate record.</strong> A student has a 3.40 GPA over 30 prior credits. The prior points are 3.40 × 30 = 102.0. The new term carries 12 credits at a 3.60 GPA, worth 43.2 points. Combined points are 102.0 + 43.2 = 145.2 over 30 + 12 = 42 credits. The new cumulative GPA is 145.2 ÷ 42 = 3.4571, which rounds to <strong>3.46</strong>.</p>
<p><strong>Example 2: adding a weak term to a strong record.</strong> Another student has a 3.60 GPA over 48 prior credits, worth 172.8 points. A 12-credit term at 2.50 adds 30.0 points. The combined record is 202.8 points over 60 credits, giving <strong>3.38</strong>. The same 2.50 term would have hurt a smaller prior record more, and a stronger new term would have moved this larger record less.</p>
<table>
<thead><tr><th>Scenario</th><th>Prior points</th><th>Prior credits</th><th>New points</th><th>New credits</th><th>Cumulative GPA</th></tr></thead>
<tbody>
<tr><td>Moderate record, strong term</td><td>102.0</td><td>30</td><td>43.2</td><td>12</td><td>3.46</td></tr>
<tr><td>Strong record, weak term</td><td>172.8</td><td>48</td><td>30.0</td><td>12</td><td>3.38</td></tr>
<tr><td>Strong record, strong term</td><td>172.8</td><td>48</td><td>46.8</td><td>12</td><td>3.66</td></tr>
</tbody>
</table>
<p>The third row is a what-if: replace the 2.50 term with a 3.90 term and the same 60-credit record rises to 3.66. The comparison shows how much a single term can matter, and how much it cannot. Twelve new credits are one fifth of the 60-credit total, so even a large term swing moves the cumulative figure by a fraction of the gap.</p>

<h2 id="policy-caveats">Policy caveats that change the official number</h2>
<p>The formula is simple; the course list is not. Before treating a calculated cumulative GPA as final, check how the institution handles the following cases.</p>
<ul>
<li><strong>Repeated courses:</strong> grade replacement may remove the earlier attempt’s points and credits, average both attempts, or count only the latest grade. Each rule produces a different denominator.</li>
<li><strong>Transfer credits:</strong> many schools accept transfer credits toward the degree but exclude those grades from the institutional GPA. If the grades are excluded, the cumulative average covers fewer credits than the transcript lists.</li>
<li><strong>Pass/fail and credit/no-credit:</strong> these often count toward progress but not toward the GPA. A failing pass/fail grade may be an exception under some policies.</li>
<li><strong>Academic forgiveness or fresh start:</strong> some institutions exclude an early period from the GPA after a petition. The original grades may remain visible on the transcript with a notation.</li>
<li><strong>Study abroad and exchange:</strong> grades may be converted, transferred as credit only, or excluded. Conversion tables vary, so do not assume a direct match.</li>
<li><strong>Graduate or dual-level courses:</strong> a course taken for graduate credit may use a different scale or may be excluded from the undergraduate cumulative average.</li>
</ul>
<p>Rounding is another policy detail. Some schools round the cumulative GPA to two decimals at the end of each term; others keep more precision internally and round only for display. A student sitting at 3.495 can appear as 3.49 or 3.50 depending on the rule, and that difference can matter at a scholarship cutoff. Ask the registrar which value is official.</p>

<h2 id="common-mistakes">Common cumulative GPA mistakes</h2>
<p>The most frequent error is averaging term GPAs as if each term carried the same weight. A 3.80 term with 9 credits and a 3.20 term with 18 credits do not average to 3.50. The combined points are 34.2 + 57.6 = 91.8 over 27 credits, or 3.40. The heavier term dominates.</p>
<p>The second error is using credits earned instead of credits attempted. A withdrawn course may add no points but still count as attempted under some policies, while a repeated course may have its earlier credits removed. Read the definition attached to the GPA on your transcript rather than assuming the two credit totals are the same.</p>
<p>The third error is mixing scales. A prior 10-point CGPA cannot be inserted into a 4.0 formula without the institution’s conversion rule. Even within 4.0, a B+ may be 3.3 at one school and 3.5 at another. Convert grades to points using one consistent table, and keep full precision until the final division.</p>
<p>The fourth error is forgetting that cumulative GPA includes courses from earlier terms that may no longer be relevant to the current program. A change of major does not automatically erase them. If the official record surprises you, request an unofficial audit and compare course by course.</p>

<h2 id="calculator">Combining prior and new work in the calculator</h2>
<p>The <a href="/gpa-calculator">GPA calculator</a> works at the course level, which makes it a useful check on cumulative arithmetic. Enter the courses you want counted, with grade values and credit hours, and verify the total credits against the record you are reproducing.</p>
<ol>
<li>Start with the prior record: either enter every prior course or convert the prior GPA into points using prior GPA × prior credits.</li>
<li>Add the new term’s rows with their grade values and credits.</li>
<li>Confirm the combined credit total before dividing.</li>
<li>Compare the result with the official cumulative GPA and investigate any gap by policy category.</li>
</ol>
<p>For a term-only calculation, the <a href="/blog/grade-calculator-guide/semester-gpa-calculation">semester GPA walkthrough</a> isolates the new credits. If you are planning a target, the <a href="/blog/grade-calculator-guide/how-to-raise-gpa">GPA recovery guide</a> shows how to solve for the grades still needed. The <a href="/grade-calculator">final grade calculator</a> handles the in-course version of the same question: what score is required on the remaining work.</p>
<div class="cta-box"><strong>Check your cumulative estimate:</strong> open the <a href="/gpa-calculator">GPA calculator</a>, enter prior and current courses with their credits, and compare the combined result with the official transcript. No signup, and the arithmetic stays on your device.</div>
`;

export const gradeCumulativeGpa: BlogPost = {
  pillar: "grade-calculator-guide",
  slug: "cumulative-gpa-calculation",
  kind: "cluster",
  title: "Cumulative GPA: Formula, Prior Credits and Examples",
  description:
    "Combine prior GPA and credits with a new term to find cumulative GPA. Two worked examples show how new grades move the average.",
  keywords: ["cumulative gpa calculator", "how to calculate cumulative gpa", "cumulative gpa formula", "overall gpa calculation", "prior credits gpa", "cgpa calculation"],
  toolSlugs: ["gpa-calculator"],
  relatedSlugs: ["semester-gpa-calculation", "gpa-vs-cgpa", "how-to-raise-gpa"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-cumulative-gpa-includes", text: "What a cumulative GPA includes", level: 2 },
    { id: "formula", text: "The cumulative GPA formula", level: 2 },
    { id: "worked-examples", text: "Two worked examples", level: 2 },
    { id: "policy-caveats", text: "Policy caveats", level: 2 },
    { id: "common-mistakes", text: "Common mistakes", level: 2 },
    { id: "calculator", text: "Combining prior and new work", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I calculate cumulative GPA with prior credits?", answer: "Convert the prior GPA into grade points by multiplying it by the prior credits. Add the new term’s grade points and credits, then divide the combined points by the combined credits. A 3.40 GPA over 30 credits is 102.0 points; adding 43.2 points over 12 credits gives 145.2 over 42 credits, or 3.46." },
    { question: "Can I just average my semester GPAs?", answer: "Only when every semester carries the same credit total. Otherwise the average ignores weight. A 3.80 term with 9 credits and a 3.20 term with 18 credits combine to 3.40, not 3.50, because the larger term contributes more points and more credits. Use total grade points and total credits for a cumulative result." },
    { question: "Does a repeated course change my cumulative GPA?", answer: "It can, depending on the institution’s repeat policy. Replacement removes the earlier attempt’s points and credits, averaging keeps both, and a latest-attempt rule may count only the new grade. The official cumulative GPA follows whichever rule the registrar applies. Check the handbook before recalculating." },
    { question: "Are transfer credits included in cumulative GPA?", answer: "Often the credits transfer but the grades do not, which means the courses count toward progress and graduation without entering the GPA. Some schools do include transfer grades after conversion. Because the practice varies, compare the official credit total with the GPA denominator before assuming a course is included." },
    { question: "Why did my cumulative GPA move so little after a strong term?", answer: "Prior credits carry weight. If you have 48 credits at a 3.60 GPA, a 12-credit term is only one fifth of the new total. A 3.90 term raises the combined record to 3.66, while a 2.50 term lowers it to 3.38. The larger the prior record, the smaller the movement from one term." },
    { question: "What is the difference between cumulative GPA and CGPA?", answer: "Usage varies by institution. Many schools use cumulative GPA for all terms at the current institution and CGPA for a program-wide average, sometimes on a 10-point scale. Others use the labels interchangeably. The arithmetic is the same credit-weighted mean; the difference is which courses and scale the document includes." },
  ],
};
