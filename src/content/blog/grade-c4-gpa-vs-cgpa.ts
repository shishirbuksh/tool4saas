import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two transcripts can both report “3.6” and mean different things. One may be describing a single semester, the other a four-year record. GPA and CGPA are often used interchangeably in conversation, yet registrar offices, scholarship forms and employers may treat them as separate quantities with separate rules.</p>
<p>This guide separates the two, shows the arithmetic behind each, and explains why a 4.0-scale GPA and a 10-point CGPA cannot be converted with a single multiplier. It sits inside the <a href="/blog/grade-calculator-guide">grade calculator guide</a>, and the <a href="/gpa-calculator">GPA calculator</a> can check each step as you read.</p>

<h2 id="what-each-measures">What GPA and CGPA each measure</h2>
<p>A grade point average is a credit-weighted mean of course grades. The formula is the same everywhere: multiply each course grade value by its credit hours, add the results, then divide by the total credit hours. What changes between GPA and CGPA is the window of courses included.</p>
<p><strong>GPA</strong> usually refers to one defined period, most often a semester or quarter. Only the courses taken in that term enter the numerator and denominator. A student might finish the fall term with a 3.56 GPA, then start fresh in spring with a new term GPA.</p>
<p><strong>CGPA</strong> usually refers to a cumulative average across every term in a program, or across every course the institution counts toward that average. The same student’s CGPA after four years would include the fall term, the spring term and everything before and after them.</p>
<p>The terminology is not standardized. Some schools call the cumulative figure “cumulative GPA” and reserve “CGPA” for a 10-point scale. Others print CGPA on the transcript and GPA on internal term reports. Read the label on the document in front of you, then check the handbook definition rather than assuming which window applies.</p>
<p>A single transcript may show both numbers on the same page. The term column helps an advisor see recent momentum; the cumulative column summarizes the whole enrollment. When a form asks for “GPA” without qualification, look for a second field labeled cumulative or overall. If only one box exists, the institution usually wants the cumulative value, but the instructions on the form take precedence.</p>

<h2 id="formulas">The formulas, side by side</h2>
<p>Both measures use grade points, not raw marks. A grade value such as 4.0 for an A or 3.3 for a B+ is assigned by the institution’s scale. Credit hours set the weight of each row.</p>
<ul>
<li><strong>Term GPA:</strong> total grade points earned in the term ÷ total credit hours attempted in the term.</li>
<li><strong>CGPA:</strong> total grade points earned across all counted terms ÷ total credit hours counted across those terms.</li>
</ul>
<p>The numerator grows by grade value × credits for each course. A three-credit A adds 12.0 points; a four-credit B+ adds 13.2. The denominator grows by the same credits, which is why a high-credit course moves the average more than a one-credit seminar.</p>
<p>This is also why CGPA is not the average of term GPAs unless every term carries identical credits. A 3.20 term with 15 credits and a 3.60 term with 12 credits combine to 3.38, not 3.40. The heavier term pulls the result toward itself.</p>

<h2 id="scales-and-conversion">4.0 scales, 10-point scales and percentages</h2>
<p>A 4.0 scale maps letter grades to values near the top of a four-point range. A common version gives A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0 and so on, but plus-or-minus values vary by campus. Some schools award no A+; some treat an A+ as 4.3; some use whole numbers only.</p>
<p>A 10-point scale maps grades to a ten-point range. The bands might run from 10 for the top band down to 0 for a fail, with each university setting its own cutoffs. A CGPA of 8.2 on a 10-point scale is not equivalent to a 3.28 on a 4.0 scale by any official rule, even though 8.2 ÷ 2.5 happens to produce that number.</p>
<p>Percentage systems report marks directly and may or may not convert them to grade points. This is where most conversion errors begin. Multiplying a 10-point CGPA by 9.5, subtracting a fixed amount, or dividing by 25 are folk shortcuts, not universal standards. Two universities can assign different grade points to the same percentage, and professional evaluators may apply a third mapping.</p>
<p>If a form demands a conversion, use the formula printed by the institution that issued the transcript, or the guidance of the credential evaluator receiving it. Do not rely on a conversion table from an unrelated country or a calculator site with no stated source.</p>

<table>
<thead><tr><th>Measure</th><th>Courses included</th><th>Typical scale</th><th>Common use</th></tr></thead>
<tbody>
<tr><td>Term GPA</td><td>One semester or quarter</td><td>4.0, sometimes 5.0</td><td>Term review, probation, dean’s list</td></tr>
<tr><td>Cumulative GPA</td><td>All terms at one institution</td><td>4.0</td><td>Graduation, transfer, some applications</td></tr>
<tr><td>CGPA</td><td>Program-wide, definition varies</td><td>Often 10-point</td><td>University rank, degree classification</td></tr>
<tr><td>Percentage</td><td>Varies by document</td><td>0 to 100</td><td>Systems that report marks directly</td></tr>
</tbody>
</table>

<h2 id="worked-examples">Two worked examples</h2>
<p><strong>Example 1: term GPA.</strong> A fall schedule carries four courses. Biology A is 3 credits at 4.0, giving 12.0 points. English B+ is 3 credits at 3.3, giving 9.9. Calculus A− is 4 credits at 3.7, giving 14.8. History B is 2 credits at 3.0, giving 6.0. Total points are 12.0 + 9.9 + 14.8 + 6.0 = 42.7 over 12 credits. The term GPA is 42.7 ÷ 12 = 3.5583, which rounds to <strong>3.56</strong>.</p>
<p><strong>Example 2: cumulative GPA.</strong> Suppose the same student arrived with a 3.42 GPA over 30 prior credits, worth 3.42 × 30 = 102.6 grade points. Add the fall term’s 42.7 points and 12 credits: 102.6 + 42.7 = 145.3 points over 42 credits. The new cumulative GPA is 145.3 ÷ 42 = 3.4595, or <strong>3.46</strong>.</p>
<p>Notice that the term GPA of 3.56 is higher than the cumulative 3.46, yet the cumulative figure barely moved from 3.42. Thirty prior credits carry more weight than twelve new ones. That inertia is normal, and it explains why one strong semester rarely transforms a long record.</p>

<h2 id="reading-the-result">Reading the result without overclaiming</h2>
<p>A calculated GPA is an estimate of the arithmetic, not a replacement for the transcript. Institutions may exclude pass/fail courses, count only the latest attempt of a repeated course, omit transfer grades from the GPA while accepting the credits, or round at the end of each term instead of at the end of the program. Each choice changes the denominator or the numerator.</p>
<p>Rounding is another quiet difference. Keeping full precision until the final step gives 3.5583, which becomes 3.56. Rounding each course value first, or truncating the term result before adding it to the cumulative total, can shift the displayed figure by a hundredth. Use the same rounding rule the registrar publishes.</p>
<p>Grade values also vary. A B+ worth 3.3 at one school may be worth 3.5 at another, and an A− may be 3.7 or 3.67. If your calculated result differs from the portal, compare the scale first, then the course inclusions, then the rounding. The <a href="/blog/grade-calculator-guide/weighted-grade-calculation">weighted grade calculation guide</a> covers the underlying weighting logic in more detail.</p>
<p>For a job application, quote the figure exactly as the transcript presents it and name the scale. “3.46 cumulative GPA on a 4.0 scale” is unambiguous; a bare “3.46 CGPA” invites the reader to guess whether the denominator is 4, 5 or 10. If the employer asks for a percentage instead, supply the institution’s official conversion rather than a homemade one.</p>

<h2 id="calculator">Checking GPA and CGPA in the calculator</h2>
<p>The <a href="/gpa-calculator">GPA calculator</a> uses the same course-level inputs described above: a grade value on a 4.0 scale and the credit hours for each row. It multiplies, totals and divides, then shows the credit sum so you can verify the denominator.</p>
<ol>
<li>Enter each course’s grade value and credit hours.</li>
<li>Check the total credits against your schedule or transcript.</li>
<li>For a term GPA, include only that term’s courses and reset between terms.</li>
<li>For a cumulative estimate, include every course you want counted, or combine the term result with prior points using the formula above.</li>
</ol>
<p>If you are converting a percentage before entering it, the <a href="/blog/grade-calculator-guide/percentage-to-gpa">percentage to GPA guide</a> explains why the mapping depends on the scale. For a term-only view, the <a href="/blog/grade-calculator-guide/semester-gpa-calculation">semester GPA walkthrough</a> isolates the credit-weighting step. If your question is about one course rather than a term or a record, the <a href="/grade-calculator">final grade calculator</a> handles the remaining-weight calculation.</p>
<div class="cta-box"><strong>Test your own record:</strong> open the <a href="/gpa-calculator">GPA calculator</a>, add your courses and credits, and compare the displayed term result with the cumulative figure from your prior totals. No signup, and the arithmetic runs on your device.</div>
`;

export const gradeGpaVsCgpa: BlogPost = {
  pillar: "grade-calculator-guide",
  slug: "gpa-vs-cgpa",
  kind: "cluster",
  title: "GPA vs CGPA: Term, Cumulative and Scale Differences",
  description:
    "GPA covers one term while CGPA accumulates every term. See the formulas, 4.0 versus 10-point scales, and why no universal conversion exists.",
  keywords: ["gpa vs cgpa", "difference between gpa and cgpa", "term gpa vs cumulative gpa", "cgpa meaning", "4.0 vs 10 point gpa", "gpa conversion"],
  toolSlugs: ["gpa-calculator"],
  relatedSlugs: ["semester-gpa-calculation", "cumulative-gpa-calculation", "percentage-to-gpa"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-each-measures", text: "What GPA and CGPA measure", level: 2 },
    { id: "formulas", text: "The formulas, side by side", level: 2 },
    { id: "scales-and-conversion", text: "4.0, 10-point and percentage scales", level: 2 },
    { id: "worked-examples", text: "Two worked examples", level: 2 },
    { id: "reading-the-result", text: "Reading the result", level: 2 },
    { id: "calculator", text: "Checking your numbers", level: 2 },
  ],
  html,
  faqs: [
    { question: "Is CGPA the same as cumulative GPA?", answer: "Often, but not always. Many schools use CGPA for the program-wide average across all terms and use GPA for a single term. Others use both labels for the same cumulative figure and reserve a different name for term averages. The handbook definition controls, so check which courses and terms the document includes before comparing two numbers." },
    { question: "Can I convert a 10-point CGPA to a 4.0 GPA?", answer: "There is no universal conversion. A 10-point scale assigns grade points using bands set by each university, and a 4.0 scale varies in its plus-or-minus values. Shortcut multipliers produce rough comparisons at best. Use the issuing institution’s stated formula or the receiving evaluator’s guidance when a form requires a converted value." },
    { question: "Why is my CGPA different from the average of my term GPAs?", answer: "Term GPAs are averages over different credit loads. A 3.20 term with 15 credits and a 3.60 term with 12 credits combine to 3.38 because the larger term carries more weight. A simple average of the two term figures gives 3.40, which ignores the credit difference. Always combine total grade points and total credits." },
    { question: "Does a repeated course count twice in CGPA?", answer: "It depends on institutional policy. Some schools replace the earlier grade and remove those credits from the GPA calculation, some average both attempts, and some count only the second attempt while leaving the first on the transcript. The same question applies to transfer credits. Read the repeat and transfer rules in the handbook before estimating a cumulative figure." },
    { question: "Is term GPA or CGPA more important?", answer: "They answer different questions. Term GPA shows recent performance and may matter for probation, scholarships or a specific semester review. CGPA summarizes the full record and is often used for graduation, transfer and some applications. A strong term can improve a CGPA slowly, while a weak term can pull it down quickly, so both are worth tracking." },
    { question: "Why does my calculator result differ from the official GPA?", answer: "The usual causes are a different grade-value table, excluded courses such as pass/fail or transfer work, a repeat policy that drops an earlier attempt, or rounding at a different stage. Compare the scale, the course list and the rounding rule in that order. The official transcript remains the authoritative record, and the calculator is a planning estimate." },
  ],
};
