import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A leap year birthday on 29 February is a calendar edge case with a simple core: the date exists only in leap years. In 2026 it does not exist, and the next one is 2028. That affects birthday plans, age labels and any form that expects a date, but it does not make the underlying day count ambiguous.</p>
<p>This guide is part of the <a href="/blog/age-calculator-guide">age calculator guide</a>. It covers the Gregorian rule, the common ways to assign a birthday in a common year, and the arithmetic that keeps age in years, months and days consistent. Use the <a href="/age-calculator">age calculator</a> to test a date while you read.</p>

<h2 id="leap-year-rule">The Gregorian leap-year rule</h2>
<p>The Gregorian calendar adds a leap day when the year is divisible by 4, except for century years. A century year is a leap year only when it is divisible by 400. So 2024 and 2028 are leap years; 2026 is not; 2100 is not; 2000 is. The exception matters because it keeps the average year close to the solar year: 97 leap years in every 400-year cycle.</p>
<p>February in a leap year has 29 days; in a common year it has 28. The extra day is inserted after 28 February, which is why 29 February is the only date that can disappear from the calendar for three years at a time. The gap can be longer around a skipped century leap year: 2096 is followed by 2104, with no 29 February in 2100.</p>
<p>If dates were spread evenly, a 29 February birthday would fall on about 97 out of every 146,097 calendar days, roughly 1 in 1,506. Real birth dates are not evenly spread, so treat that as a calendar fact rather than a prediction about any hospital ward or generation.</p>
<p>The rule applies to the proleptic Gregorian calendar, which extends the modern leap-year pattern backward before 1582. Historical dates from countries that adopted the Gregorian calendar later can be off by the local Julian calendar, so a genealogy calculation may need a manual adjustment. For dates from the twentieth century onward, the rule above is the one to use.</p>

<h2 id="feb-29-arrives">How often 29 February arrives</h2>
<p>For most people the pattern is every four years. The sequence around now is 2024, 2028, 2032 and 2036. In 2026 and 2027 there is no 29 February, so a leapling's birthday falls on a date that has to be chosen by convention. The table shows how the century rule changes the answer.</p>
<table>
<thead><tr><th>Year</th><th>Divisible by 4?</th><th>Century rule</th><th>Leap year?</th><th>Days in February</th></tr></thead>
<tbody>
<tr><td>2024</td><td>Yes</td><td>Not a century year</td><td>Yes</td><td>29</td></tr>
<tr><td>2026</td><td>No</td><td>Not applicable</td><td>No</td><td>28</td></tr>
<tr><td>2028</td><td>Yes</td><td>Not a century year</td><td>Yes</td><td>29</td></tr>
<tr><td>2100</td><td>Yes</td><td>Divisible by 100, not by 400</td><td>No</td><td>28</td></tr>
<tr><td>2000</td><td>Yes</td><td>Divisible by 400</td><td>Yes</td><td>29</td></tr>
</tbody>
</table>
<p>Do not use "every four years" as a calculation rule without the century check. A simple four-year loop would mark 2100 as a leap year and put every date after it one day off. A date library that follows the proleptic Gregorian calendar handles this correctly; a hand-written rule needs the 100 and 400 tests.</p>

<h2 id="birthday-conventions">Three ways to mark a 29 February birthday</h2>
<p>There are three practical conventions for a common year:</p>
<ul>
<li><strong>28 February:</strong> treat the last day of February as the anniversary, so the age increments on 28 February.</li>
<li><strong>1 March:</strong> treat the first day of March as the anniversary, so the age increments on 1 March.</li>
<li><strong>Wait for 29 February:</strong> hold the celebration until the date returns. That can mean a four-year gap and, around 2100, an eight-year gap.</li>
</ul>
<p>None of these changes the number of days the person has lived. They change the label attached to a particular day. Legal and administrative rules are jurisdiction-specific. Some systems specify 28 February, others specify 1 March, and some laws define age by the anniversary of birth without addressing the missing date. Check the rule that applies to the form, licence or statute instead of assuming one convention is universal.</p>
<p>For everyday purposes, pick a convention inside the family and use it consistently. For official purposes, follow the document. Mixing the two is how a person ends up celebrating on 28 February and filing paperwork as if the birthday were 1 March.</p>
<p>For a child, the convention can affect school cutoff dates by a day, which matters in districts with a strict 1 March or 28 February boundary. For an adult, the practical effect is usually the celebration date, not the legal age. The day count is the stable measure; the annual label is the local rule.</p>

<h2 id="age-math">Age arithmetic for a leap-day birthday</h2>
<p><strong>Example 1: born 29 February 2000, observed on 28 February 2026.</strong> Under the 28 February convention, the person has completed 26 years. The day count is 26 × 365 = 9,490, and the leap days from 2004 through 2024 add 6 more, for <strong>9,496 days</strong>. That is 26 years, 0 months and 0 days under that convention. Under the 1 March convention, the same 28 February date is 25 years, 11 months and 27 days, because the 2026 anniversary has not arrived yet.</p>
<p><strong>Example 2: born 29 February 2000, observed on 1 March 2026.</strong> Under the 1 March convention, the person is exactly 26 years old on that date. The day count is <strong>9,497 days</strong>: 9,496 days to 28 February 2026, and one more day to 1 March. The one-day difference between the two conventions is the entire dispute in most birthday arguments.</p>
<p><strong>Example 3: an ordinary leap-year effect.</strong> From 2024-01-01 to 2025-01-01 there are 366 days because 2024 contains 29 February. From 2025-01-01 to 2026-01-01 there are 365. Someone born on 1 January gains an extra day in the first interval, which is why multiplying age in years by 365 always undercounts.</p>
<p>Notice what stays fixed. The day count between two dates is a fact; the year and month breakdown depends on where you place the anniversary. If a form asks for age in years, use its convention. If you are measuring time lived, use the dates and count days.</p>
<p>If you need the age in months as well, count complete months first, then the leftover days. From 29 February 2000 to 28 February 2026 under the 28 February convention, the complete months are 312 (26 × 12), with 0 leftover days. Under the 1 March convention, the complete months are 311, with 27 leftover days. The month count and the day count move together; they are not independent estimates.</p>

<h2 id="documents-milestones">What this means for documents and milestones</h2>
<p>Age in years is a legal and social label; age in days is a count. A 29 February birthday creates ambiguity only in the first. For school cutoffs, driving eligibility, retirement or visa forms, use the date of birth the document expects and apply the local rule. For a day count, use both dates and count the boundaries between them.</p>
<p>Time zones add a second edge. A baby born at 23:30 on 29 February in one zone may already be 1 March in UTC. If a record stores only the local date, keep that local date; if it stores an instant, convert to the zone that governs the record before deciding which calendar date applies. Do not combine a UTC timestamp with a local birthday convention.</p>
<p>Leap-day birthdays also affect recurring reminders. A calendar app that simply repeats "29 February every year" will skip three years at a time. A reminder set for 28 February or 1 March will fire annually, but it will not match the legal date if the governing rule uses the other convention. Decide which behavior you want before you create the event.</p>

<h2 id="calculator">Checking a leap-day date in the age calculator</h2>
<p>The <a href="/age-calculator">age calculator</a> takes a birth date and a comparison date and returns years, months and days, total days, and the next birthday. Enter 2000-02-29 and 2026-02-28 to see the 28 February convention in action, then change the comparison date to 2026-03-01 and compare.</p>
<ol>
<li>Enter the birth date exactly as recorded, including 29 February if that is the legal date.</li>
<li>Choose the date you are measuring to; today is the default.</li>
<li>Read the year-month-day result and the total days separately.</li>
<li>Check the next-birthday line, which points to 2028 when the current year is common.</li>
</ol>
<p>For a pure day count that ignores birthday conventions, use the <a href="/blog/age-calculator-guide/age-in-days-hours-minutes">age in days guide</a>. For the difference between two arbitrary dates, the <a href="/blog/age-calculator-guide/date-difference-calculation">date difference tutorial</a> covers inclusive and exclusive counting.</p>
<div class="cta-box"><strong>Test a leapling date:</strong> open the <a href="/age-calculator">age calculator</a>, enter 2000-02-29, and compare 2026-02-28 with 2026-03-01. The day total moves by one; the year label depends on the convention.</div>
`;

export const ageLeapYear: BlogPost = {
  pillar: "age-calculator-guide",
  slug: "leap-year-birthdays",
  kind: "cluster",
  title: "Leap Year Birthdays: How Age and Dates Work",
  description:
    "Leap year birthdays explained: the Gregorian rule, how 29 February ages work, day-count arithmetic and the 28 February vs 1 March conventions.",
  keywords: ["leap year birthday", "february 29 birthday", "leap day age", "how old is a leap year baby", "leap year age calculation"],
  toolSlugs: ["age-calculator", "date-calculator"],
  relatedSlugs: ["age-in-days-hours-minutes", "date-difference-calculation", "how-to-calculate-age"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "leap-year-rule", text: "The Gregorian leap-year rule", level: 2 },
    { id: "feb-29-arrives", text: "How often 29 February arrives", level: 2 },
    { id: "birthday-conventions", text: "Marking a 29 February birthday", level: 2 },
    { id: "age-math", text: "Age arithmetic for a leap-day birthday", level: 2 },
    { id: "documents-milestones", text: "Documents and milestones", level: 2 },
    { id: "calculator", text: "Checking a leap-day date", level: 2 },
  ],
  html,
  faqs: [
    { question: "Is 2026 a leap year?", answer: "No. 2026 is not divisible by 4, so February 2026 has 28 days and there is no 29 February. The next leap year is 2028, followed by 2032 and 2036. The century exception is separate: 2100 will not be a leap year because it is divisible by 100 but not by 400." },
    { question: "How old is someone born on 29 February 2000 in 2026?", answer: "On 28 February 2026 they are 26 under the 28 February convention, with 9,496 days lived. Under the 1 March convention they are 25 years, 11 months and 27 days on 28 February, then 26 on 1 March, with 9,497 days. The day count differs by one because the anniversary placement differs." },
    { question: "Why is 2100 not a leap year when 2000 was?", answer: "A century year is a leap year only if it is divisible by 400. 2000 is divisible by 400, so it had 29 February. 2100 is divisible by 100 but not by 400, so it has 28 February. This keeps the calendar aligned with the solar year over long periods." },
    { question: "Do leap-year babies age more slowly?", answer: "No. Their day count is the same as anyone else's born on the same date. Only the annual label is awkward in common years. A person born on 29 February 2000 has lived 9,496 days by 28 February 2026, regardless of whether the family celebrates in February or March." },
    { question: "What date should legal forms use for a 29 February birthday?", answer: "Use the date recorded on the birth certificate and follow the rule of the jurisdiction or agency receiving the form. Some systems specify 28 February in common years, others 1 March, and some define age by the anniversary without addressing the missing date. Do not assume a universal rule." },
    { question: "How many days are there from 29 February 2000 to 28 February 2026?", answer: "There are 9,496 days. Start with 26 × 365 = 9,490, then add the six leap days in 2004, 2008, 2012, 2016, 2020 and 2024. One more day reaches 1 March 2026 and a total of 9,497 days." },
  ],
};
