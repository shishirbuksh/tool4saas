import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“How old are you?” sounds like one question, but a form, a paediatrician and a pension calculator may each want a different answer. One wants completed years. Another wants years, months and days. A third wants the age on a future eligibility date. The arithmetic is the same calendar subtraction, but the stopping rule changes the output.</p>
<p>This tutorial is part of the <a href="/blog/age-calculator-guide">age calculator guide</a>. It works through the borrow method, checks three birth dates against October 22, 2026, and shows how to convert the result into total months, weeks, days and hours. Keep the age calculator open if you want to verify each step.</p>

<h2 id="three-kinds-of-age">Three kinds of age, three different answers</h2>
<p>Before subtracting anything, decide which age the question wants.</p>
<ul>
<li><strong>Exact age on a date:</strong> the calendar distance from birth to a chosen comparison date, expressed as years, months and days. Born June 15, 1990, on October 22, 2026 you are 36 years, 4 months and 7 days.</li>
<li><strong>Completed years:</strong> the year component of that result, with the months and days dropped. The same person is 36 for a form that asks for age in whole years, even though the next birthday is almost eight months away.</li>
<li><strong>Age on another date:</strong> the same subtraction with a different endpoint. On June 15, 2027 the person turns 37; on June 14, 2027 the exact age is still 36 years, 11 months and 30 days.</li>
</ul>
<p>Age differences between two people use the same machinery with two birth dates instead of a birth date and today. That case has its own guide, but the borrow rules are identical. The most common mistake is answering a completed-years question with a decimal such as 36.35, which is neither a calendar age nor a useful eligibility value.</p>

<h2 id="subtract-step-by-step">The borrow method, step by step</h2>
<p>Write the comparison date above the birth date, aligned by year, month and day. Subtract the day column first, then the month column, then the year column. If a column would go negative, borrow from the column to its left.</p>
<p>Start with June 15, 1990 and October 22, 2026:</p>
<ul>
<li>Days: 22 − 15 = 7.</li>
<li>Months: 10 − 6 = 4.</li>
<li>Years: 2026 − 1990 = 36.</li>
</ul>
<p>The result is <strong>36 years, 4 months and 7 days</strong>. Reverse it to check: add 36 years to 1990-06-15 to reach 2026-06-15, add 4 months to reach 2026-10-15, and add 7 days to reach 2026-10-22. The endpoint matches, so no borrowing was needed.</p>
<p>Now take a case that does need borrowing. Compare July 19, 2015 with February 3, 2019. The day column is 3 − 19 = −16. Borrow the number of days in the month before the comparison month, which is January 2019 with 31 days: 3 + 31 − 19 = 15. The month column is now 1 − 7 = −6, so borrow 12 months from the year column: 1 + 12 − 7 = 6, and the year count becomes 2019 − 2015 − 1 = 3. The age gap is <strong>3 years, 6 months and 15 days</strong>.</p>
<p>Check it forward: add 3 years to 2015-07-19 to reach 2018-07-19, add 6 months to reach 2019-01-19, and add 15 days to reach 2019-02-03. The elapsed total is 1,295 days. Both the calendar label and the day count describe the same interval.</p>
<p>The borrow source matters. When the comparison month is March, borrowing from February uses 28 or 29 days, not 30. That single choice is why 2024 and 2023 can produce different day remainders for dates that look similar.</p>

<h2 id="worked-examples">Three birth dates, three checked results</h2>
<p><strong>Example 1: November 2, 1988 to October 22, 2026.</strong> Days: 22 − 2 = 20. Months: 10 − 11 = −1, so borrow 12: 10 + 12 − 11 = 11, and the year count drops to 2026 − 1988 − 1 = 37. The age is <strong>37 years, 11 months and 20 days</strong>. Total days: 37 × 365 = 13,505. The 9 leap days from 1992 through 2024 add 9, giving 13,514 to November 2, 2025. Another 354 days reaches October 22, 2026, for <strong>13,868 days</strong>.</p>
<p><strong>Example 2: April 10, 2008 to October 22, 2026.</strong> Days: 22 − 10 = 12. Months: 10 − 4 = 6. Years: 2026 − 2008 = 18. The age is <strong>18 years, 6 months and 12 days</strong>. Total days: 18 × 365 = 6,570. The leap days in 2012, 2016, 2020 and 2024 add 4, giving 6,574 to April 10, 2026. Another 195 days reaches October 22, for <strong>6,769 days</strong>. The result matters for an 18-plus check: the person crossed the threshold on April 10, 2026, not on January 1.</p>
<p><strong>Example 3: February 29, 2000 to October 22, 2026.</strong> The day and month columns have no February 29 to subtract from in 2026. Elapsed days avoid the ambiguity: <strong>9,732 days</strong>. The year-month-day label depends on whether the birthday is observed on February 28 or March 1. The next section explains why both labels can be correct.</p>
<table>
<thead><tr><th>Birth date</th><th>Comparison date</th><th>Exact age</th><th>Total days</th><th>Total hours</th></tr></thead>
<tbody>
<tr><td>1990-06-15</td><td>2026-10-22</td><td>36y 4m 7d</td><td>13,278</td><td>318,672</td></tr>
<tr><td>1988-11-02</td><td>2026-10-22</td><td>37y 11m 20d</td><td>13,868</td><td>332,832</td></tr>
<tr><td>2008-04-10</td><td>2026-10-22</td><td>18y 6m 12d</td><td>6,769</td><td>162,456</td></tr>
<tr><td>2000-02-29</td><td>2026-10-22</td><td>26y 7m 24d or 26y 7m 21d</td><td>9,732</td><td>233,568</td></tr>
</tbody>
</table>
<p>The February 29 row carries two labels because the birthday convention changes the month-and-day remainder. Both labels share the same 9,732-day total, which is the number to use when a form asks for days lived rather than a calendar age.</p>

<h2 id="total-units">Converting the result to months, weeks, days and hours</h2>
<p>The year-month-day answer is not the only useful format. Each total below comes from a different multiplication, and each answers a different question.</p>
<ul>
<li><strong>Months:</strong> 36 × 12 + 4 = 436 months and 7 days. This is a calendar-month count, not days divided by 30.</li>
<li><strong>Weeks:</strong> 13,278 ÷ 7 = 1,896 weeks with 6 days left over.</li>
<li><strong>Hours:</strong> 13,278 × 24 = 318,672 hours.</li>
<li><strong>Minutes:</strong> 318,672 × 60 = 19,120,320 minutes.</li>
</ul>
<p>Do not mix the formats. Dividing 13,278 days by 30.44 gives about 436.2 average months, which is close to the calendar answer but not identical. Dividing by 365 gives about 36.38 years, which is a duration in average years, not the calendar age of 36 years and 4 months. If a form asks for completed years, take the year component. If it asks for total days, use the day total. If it asks for months, decide whether it means calendar months or an average-month conversion before calculating.</p>
<p>The <a href="/blog/age-calculator-guide/age-in-days-hours-minutes">age in days, hours and minutes guide</a> covers milestone conversions, including the difference between a 10,000-day celebration and a 10,000-day legal threshold.</p>

<h2 id="leap-and-month-ends">Leap years and month ends</h2>
<p>The Gregorian leap rule has three parts. A year divisible by 4 is a leap year. A century year is not a leap year unless it is divisible by 400. So 2024 is a leap year, 2026 is not, 2000 is a leap year, and 2100 is not. The extra day is February 29, which adds one to the year and raises the day-of-year number of every later date by one.</p>
<p>That shift changes age calculations in two places. First, an interval that crosses February 29 contains one more day than the same calendar interval in a common year. From February 28, 2024 to March 1, 2024 is 2 days; from February 28, 2023 to March 1, 2023 is 1 day. Second, a birth date of February 29 has no exact anniversary in three out of four years, so the comparison date must adopt a convention.</p>
<p>Two conventions dominate: observe the birthday on February 28, or observe it on March 1. On October 22, 2026, the elapsed total for someone born February 29, 2000 is 9,732 days under every convention. The year-month-day label is 26 years, 7 months and 24 days with the February 28 clamp, or 26 years, 7 months and 21 days with the March 1 observance. The <a href="/blog/age-calculator-guide/leap-year-birthdays">leap year birthday guide</a> covers legal and scheduling differences; the arithmetic point is that the elapsed days stay fixed while the label moves.</p>
<p>Month-end clamping causes a similar split. One month after January 31, 2026 is February 28, 2026, because the target month has no 31st. One month after January 31, 2024 is February 29. If a form expects March 1 instead, it is using a roll-forward rule, not the standard clamp. Neither rule is wrong, but a payroll or eligibility system must state which one it applies.</p>

<h2 id="calculator">Checking the result in the age calculator</h2>
<p>Enter the birth date and the comparison date, then read three values: the years-months-days label, the total days, and the next birthday countdown. The label is the one to use for most forms. The total days is the one to use for milestone maths. The countdown is separate from age and should not be confused with it.</p>
<ol>
<li>Enter 1990-06-15 as the birth date and 2026-10-22 as the comparison date.</li>
<li>Confirm the label reads 36 years, 4 months and 7 days.</li>
<li>Confirm the total reads 13,278 days, or 318,672 hours if the tool shows hours.</li>
<li>Add the components back to the birth date and check that you land on October 22, 2026.</li>
</ol>
<p>If the tool returns a different day count, check whether it used a time zone or a time of birth. A birth time near midnight can move the instant across a date boundary, especially when the birth and comparison locations are in different zones. Date-only calculators avoid that by treating both dates as labels, which is the right choice for forms and the wrong choice for exact legal deadlines.</p>
<div class="cta-box"><strong>Run your own date:</strong> open the <a href="/age-calculator">age calculator</a>, enter the birth date and comparison date, and check the years, months, days and total-day figures against the arithmetic above. No signup, and the calculation stays on your device.</div>
`;

export const ageExact: BlogPost = {
  pillar: "age-calculator-guide",
  slug: "how-to-calculate-age",
  kind: "cluster",
  title: "How to Calculate Exact Age in Years, Months & Days",
  description:
    "Learn how to calculate age by hand in years, months and days, with leap-year rules, borrow examples and a 13,278-day walkthrough.",
  keywords: ["how to calculate age", "exact age calculator", "age in years months days", "calculate age from date of birth", "age calculation formula"],
  toolSlugs: ["age-calculator"],
  relatedSlugs: ["age-difference-between-dates", "leap-year-birthdays", "age-in-days-hours-minutes"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "three-kinds-of-age", text: "Three kinds of age", level: 2 },
    { id: "subtract-step-by-step", text: "The borrow method, step by step", level: 2 },
    { id: "worked-examples", text: "Three birth dates, three results", level: 2 },
    { id: "total-units", text: "Months, weeks, days and hours", level: 2 },
    { id: "leap-and-month-ends", text: "Leap years and month ends", level: 2 },
    { id: "calculator", text: "Checking the result", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the formula for exact age?", answer: "Subtract the birth year, month and day from the comparison date in that order, borrowing 12 months or the previous month’s day count when a column goes negative. June 15, 1990 to October 22, 2026 gives 36 years, 4 months and 7 days. The check is to add the three parts back and confirm the comparison date." },
    { question: "How do you borrow when the day number is smaller?", answer: "Take the number of days in the month before the comparison month, add it to the comparison day, and subtract the birth day. For February 3, 2019 minus July 19, 2015, borrow 31 days from January 2019: 3 + 31 − 19 = 15 days. The month column then borrows 12 from the year column, producing 3 years, 6 months and 15 days." },
    { question: "Why is total days different from years multiplied by 365?", answer: "Years multiplied by 365 ignores leap days. The interval from June 15, 1990 to October 22, 2026 includes nine February 29 dates, adding nine days to the 13,140-day base and giving 13,278 days after the final 129-day segment. Use the day count when a form asks for days lived, and the calendar label when it asks for age." },
    { question: "How do I calculate age on a future date?", answer: "Use that future date as the comparison date instead of today. For a person born June 15, 1990, the age on October 22, 2026 is 36 years, 4 months and 7 days; on June 15, 2027 it is exactly 37 years. Completed years change only when the birthday is reached, not when the calendar year changes." },
    { question: "Should the birth day itself count as day one?", answer: "For an age calculation, the birth date is the start instant and the comparison date is the end instant, so the elapsed count runs from the beginning of the start date to the beginning of the end date. That is why January 1 to February 15 is 45 elapsed days but touches 46 dates. Forms that ask for age in years do not care about this distinction, but day-count and notice-period questions do." },
    { question: "How is age calculated for someone born on February 29?", answer: "The elapsed-day total is unambiguous. The years-months-days label needs a convention: clamp the anniversary to February 28 in common years, or observe it on March 1. Born February 29, 2000, the person has lived 9,732 days by October 22, 2026, which is 26 years, 7 months and 24 days with the February 28 clamp or 26 years, 7 months and 21 days with March 1." },
  ],
};
