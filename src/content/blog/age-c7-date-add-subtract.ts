import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Adding 30 days to 31 January does not land on the same date as adding one month. That is not a bug in the calculator; it is the difference between a fixed day count and calendar arithmetic. Once you separate the two, most date planning becomes predictable.</p>
<p>This guide is part of the <a href="/blog/age-calculator-guide">age calculator guide</a>. It covers adding and subtracting calendar days, the month-end clamping rule, business-day counts and the inclusive-versus-exclusive distinction that can move a deadline by one day. Follow along in the <a href="/date-calculator">date calculator</a>.</p>

<h2 id="calendar-days">Calendar days are not 24-hour blocks</h2>
<p>A calendar day is a date on the wall, not a fixed duration. Adding one calendar day to 8 March 2026 in New York takes you to 9 March 2026, even though the clocks spring forward in between and only 23 hours elapse. If you instead add 24 hours to the instant 2026-03-08 00:00 EST, you land at 2026-03-09 01:00 EDT, not at midnight. Both operations are correct; they answer different questions.</p>
<p>For deadlines, anniversaries and billing dates, calendar-day arithmetic is usually what people mean. For elapsed time, shifts, logs and countdowns, use exact durations. A date calculator should work on dates, not on 24-hour blocks, because otherwise a spring-forward day silently shifts every result after it.</p>
<p>Most date calculators accept only a date, with no time or zone. That is a feature: it removes the DST ambiguity and makes the result reproducible. If your input includes a time, strip it only after deciding which zone's date you mean. A timestamp at 23:30 UTC is already the next date in Tokyo, so the "start date" can differ by zone before any arithmetic begins.</p>

<h2 id="add-days">Adding days with the arithmetic shown</h2>
<p><strong>Example 1: 2026-01-01 plus 40 days.</strong> January has 31 days. From 1 January, 30 days takes you to 31 January, and 10 more days takes you to <strong>2026-02-10</strong>. Check by day of year: 1 January is day 1, so day 41 is 10 February because January supplies 31 days and February supplies the remaining 10.</p>
<p><strong>Example 2: 2026-03-01 minus 45 days.</strong> Going back from 1 March, February 2026 has 28 days, so 1 March minus 28 days is 1 February. That leaves 17 more days to subtract; 1 February minus 17 days is <strong>2026-01-15</strong>. A forward check: 15 January and 16 days reach 31 January, then 28 days of February and 1 day to 1 March gives 16 + 28 + 1 = 45.</p>
<p><strong>Example 3: 2026-01-01 minus 10 days.</strong> Subtract 1 day to 31 December 2025, then 9 more to <strong>2025-12-22</strong>. The year boundary is just another month boundary; no special case is needed. The same method works for positive and negative offsets, which is why a single add-or-subtract field is enough.</p>

<h2 id="months-weeks">Weeks, months and the month-end clamp</h2>
<p>Weeks are unambiguous: add 2 weeks means add 14 days. Months are not. Adding one month to 31 January 2026 gives 28 February 2026, because February has no 31st and the result is clamped to the last valid day. In 2024, the same operation gives 29 February. Adding 30 days to 31 January 2026 gives 2 March 2026, a different result.</p>
<p>This clamping rule is why subscription renewals, lease terms and payroll dates need a written convention. "One month" can mean the same day number next month, the last day of the next month, or a fixed 30-day period. Pick one and state it. If the contract says "the same date next month," a 31 January start usually renews on the last day of February, not on 3 March.</p>
<p>Leap years change the clamp only in February. A 29 February start advanced by one year lands on 28 February in a common year and 29 February in the next leap year. A 31 March start advanced by one month is 30 April in every year, because April always has 30 days. The rule is about the target month's length, not about the starting month.</p>
<p>Years follow the same clamp. Adding one year to 29 February 2024 gives 28 February 2025, and adding four years gives 29 February 2028. A 31 December start advanced by one year is 31 December, because December always has 31 days. The operation is calendar-aware, not a fixed 365-day add, which is why a leap year never shifts a December anniversary.</p>

<h2 id="weekends">Weekends and business-day counts</h2>
<p>Calendar days include weekends and holidays. Business-day arithmetic skips them, but the definition of a business day is local: Monday to Friday in many offices, Sunday to Thursday in others, and holiday calendars differ by country and year.</p>
<p><strong>Example 4: add 10 business days to Monday 2026-03-02.</strong> If the start day counts as day 1, the sequence is 2, 3, 4, 5 and 6 March for five days, then 9, 10, 11, 12 and 13 March for ten, so the result is <strong>Friday 2026-03-13</strong>. If counting begins on the next business day, the result is <strong>Monday 2026-03-16</strong>. The one-day gap is a convention, not an arithmetic error.</p>
<p>Holidays can move the result further. A 10-business-day promise that crosses a public holiday is 11 weekdays unless the holiday is excluded. The <a href="/date-calculator">date calculator</a> counts calendar days and can show weekday breakdowns; it does not know your local holiday list, so subtract those separately.</p>
<table>
<thead><tr><th>Operation</th><th>Start date</th><th>Result</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Add 40 calendar days</td><td>2026-01-01</td><td>2026-02-10</td><td>31 days in January, then 10 in February</td></tr>
<tr><td>Subtract 10 calendar days</td><td>2026-01-01</td><td>2025-12-22</td><td>Crosses the year boundary</td></tr>
<tr><td>Add 1 month</td><td>2026-01-31</td><td>2026-02-28</td><td>Clamped to the last day of February</td></tr>
<tr><td>Add 30 days</td><td>2026-01-31</td><td>2026-03-02</td><td>Fixed count ignores month lengths</td></tr>
<tr><td>Add 10 business days, start counts</td><td>2026-03-02</td><td>2026-03-13</td><td>Weekends skipped</td></tr>
</tbody>
</table>

<h2 id="inclusive-exclusive">Inclusive vs exclusive counting</h2>
<p>Date differences are either inclusive or exclusive of an endpoint. From 1 January to 10 January, the exclusive count is 9 days: 2 January is day 1, and 10 January is day 9. The inclusive count is 10 dates because both 1 January and 10 January are included. Neither is wrong; the contract or question decides.</p>
<p>The same split appears in "add 7 days." Starting 1 January, 7 days later is 8 January, which is 7 elapsed days but 8 dates touched if you count both ends. Hotel stays use nights, so a check-in on 1 January and check-out on 8 January is 7 nights. A project that runs "from 1 January for 7 days" may include 1 January and end on 7 January, or start counting on 2 January and end on 8 January. Write the end date, not just the duration.</p>
<p>Age calculations use the same convention. A baby born on 1 January is 0 days old on 1 January, 1 day old on 2 January, and 365 or 366 days old on the next 1 January. An inclusive count would call the birth date day 1 and add one to every total. If two systems disagree by exactly one day, check this first.</p>

<h2 id="common-mistakes">Mistakes that move the date</h2>
<ol>
<li><strong>Using 30 days for every month.</strong> Months have 28, 29, 30 or 31 days, and February changes with the leap-year rule.</li>
<li><strong>Adding months by day number without clamping.</strong> One month after 31 January is not 3 March; it is the last valid day of February.</li>
<li><strong>Mixing calendar days with 24-hour durations across DST.</strong> A calendar-day add and a 24-hour add can differ by an hour at the transition.</li>
<li><strong>Forgetting weekends and holidays.</strong> A 10-day promise in calendar days can be 8 business days or fewer once a holiday lands inside it.</li>
<li><strong>Counting both endpoints when the contract counts one.</strong> The difference is one day, which is enough to miss a filing window.</li>
<li><strong>Assuming "between" means inclusive.</strong> Many calculators return the exclusive gap, so confirm before you rely on the number.</li>
</ol>

<h2 id="calculator">Using the date calculator</h2>
<p>The date calculator has an add-or-subtract mode and a difference mode. Use add-or-subtract mode when you need to add days to a date or count backward from one; enter the start date and a positive or negative number of days, weeks or months. In difference mode, enter two dates and read the day total and weekday breakdown. Both modes use calendar arithmetic and handle leap years.</p>
<ol>
<li>Choose add/subtract or difference.</li>
<li>Enter the start date, or both dates for a difference.</li>
<li>Pick days, weeks or months; use a negative number to subtract.</li>
<li>Read the result and check the weekday if the deadline is business-sensitive.</li>
</ol>
<p>For age-specific date math, the <a href="/blog/age-calculator-guide/age-in-days-hours-minutes">age in days guide</a> converts a birth date to total days and hours. The <a href="/blog/age-calculator-guide/date-difference-calculation">date difference tutorial</a> goes deeper on inclusive counting.</p>
<div class="cta-box"><strong>Run your date:</strong> open the <a href="/date-calculator">date calculator</a>, add 40 days to 2026-01-01, then switch to difference mode and check the same pair. The result should read 2026-02-10 and 40 days.</div>
`;

export const ageDateAddSubtract: BlogPost = {
  pillar: "age-calculator-guide",
  slug: "add-subtract-dates",
  kind: "cluster",
  title: "Add or Subtract Days From a Date (Including Weekends)",
  description:
    "Add or subtract days from any date with calendar math, month-end clamping, business-day counting and clear inclusive vs exclusive rules.",
  keywords: ["add days to date", "subtract days from date", "date calculator add days", "business days calculator", "date math including weekends"],
  toolSlugs: ["date-calculator", "age-calculator"],
  relatedSlugs: ["date-difference-calculation", "age-in-days-hours-minutes", "timezone-conversion"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "calendar-days", text: "Calendar days are not 24-hour blocks", level: 2 },
    { id: "add-days", text: "Adding days with arithmetic", level: 2 },
    { id: "months-weeks", text: "Weeks, months and month-end clamping", level: 2 },
    { id: "weekends", text: "Weekends and business days", level: 2 },
    { id: "inclusive-exclusive", text: "Inclusive vs exclusive counting", level: 2 },
    { id: "common-mistakes", text: "Mistakes that move the date", level: 2 },
    { id: "calculator", text: "Using the date calculator", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I add 30 days to a date?", answer: "Count forward through the calendar rather than assuming every month has 30 days. From 2026-01-31, 30 days lands on 2026-03-02: February contributes 28 days and the remaining 2 fall in March. A date calculator handles the month boundary automatically and reports the weekday." },
    { question: "What is 40 days after 1 January 2026?", answer: "It is 10 February 2026. January has 31 days, so 30 days after 1 January is 31 January, and 10 more days reaches 10 February. The same result comes from day-of-year counting: 1 January is day 1, so day 41 is 10 February." },
    { question: "Why does one month after 31 January land on 28 February?", answer: "February has no 31st, so calendar arithmetic clamps the result to the last valid day of the target month. In 2026 that is 28 February; in 2024 it is 29 February. Adding a fixed 30 days instead gives 2 March 2026, which is a different operation." },
    { question: "Are weekends included when adding days?", answer: "Calendar-day addition includes weekends and holidays. Business-day addition skips them, but the definition of a business day depends on the country and office. Adding 10 business days to Monday 2026-03-02 gives Friday 13 March if the start day counts, or Monday 16 March if counting starts the next day." },
    { question: "How many days are there from 1 January to 10 January?", answer: "The exclusive count is 9 days, because the span stops before 10 January. The inclusive count is 10 dates because both endpoints are included. A hotel stay from 1 January to 8 January is 7 nights, using the exclusive convention, while a project that includes both start and end dates would add one." },
    { question: "Does daylight saving change date addition?", answer: "It changes elapsed time, not calendar dates. Adding one calendar day to 2026-03-08 in New York gives 9 March even though only 23 hours pass. Adding 24 hours to the instant lands at 01:00 on 9 March. Choose the method based on whether you need a date or a duration." },
  ],
};
