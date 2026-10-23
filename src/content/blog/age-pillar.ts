import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A birthday, a deadline, a flight and a log line all describe moments in time, yet each needs different arithmetic. Age counts calendar labels. Date differences count midnights. Time zone conversion maps an instant onto another clock. Unix timestamps flatten that instant into one integer. Mixing the models produces errors that look like bugs but are definition problems.</p>
<p>This guide connects the four time tools on Tool4SaaS: the <a href="/age-calculator">age calculator</a>, the <a href="/date-calculator">date calculator</a>, the <a href="/timezone-converter">time zone converter</a> and the <a href="/timestamp-converter">timestamp converter</a>. Each section uses checked dates, so you can reproduce every result before trusting a form, invoice or schedule.</p>

<h2 id="why-date-math-goes-wrong">Why date math is harder than subtraction</h2>
<p>Subtracting two dates looks like subtracting two numbers, but calendar dates are labels, not measurements. A month can hold 28, 29, 30 or 31 days. A year can hold 365 or 366. A day on a wall clock can last 23, 24 or 25 hours when daylight saving time changes. None of those variations appears in a plain “end minus start” calculation unless the software is told how to handle them.</p>
<p>The counting model also matters. If a project runs from January 1 to February 15, does it last 45 days or 46? Both answers can be defended. The interval contains 45 elapsed days, measured from the start of January 1 to the start of February 15. It touches 46 calendar dates if you count both the first and last day. Hotels, payroll systems and rental contracts choose different conventions, and the choice changes the number on the invoice.</p>
<p>Time zones add a third layer. An offset such as UTC−5 is not a property of a place. It is the result of a rule that can change at a legislated date. New York uses UTC−5 in winter and UTC−4 in summer. London uses UTC+0 and UTC+1 on different dates. A conversion that assumes one offset for the whole year will be an hour off for part of it, and an hour can move a meeting to the previous or next day.</p>
<p>Age is not a duration stored in years. It is a calendar difference in years, months and days, and month-end rules matter. A child born on January 31 turns one month old on February 28 in a common year, not on March 3. A person born on February 29 has a birthday label that many systems must decide how to handle. The arithmetic below keeps those rules visible.</p>

<h2 id="exact-age">Exact age: years, months and days</h2>
<p>Start with the most common request: age on a specific date. Take a birth date of June 15, 1990 and a comparison date of October 22, 2026. Subtract the components in order, largest last:</p>
<ul>
<li>Days: 22 − 15 = 7.</li>
<li>Months: 10 − 6 = 4.</li>
<li>Years: 2026 − 1990 = 36.</li>
</ul>
<p>The result is <strong>36 years, 4 months and 7 days</strong>. That is a calendar age, not 36.3 years. To see why, add the parts back: 36 years after June 15, 1990 is June 15, 2026; 4 months after that is October 15, 2026; 7 days after that is October 22, 2026.</p>
<p>The component method only works while every subtraction stays at or above zero. Change the birth date to November 2, 1988 and the month step becomes 10 − 11 = −1. Borrow 12 months from the year column: 10 + 12 − 11 = 11 months, and the year count drops by one to 2026 − 1988 − 1 = 37. With days 22 − 2 = 20, the age is <strong>37 years, 11 months and 20 days</strong>. Add it back and you land on October 22, 2026 again.</p>
<p>Total days are a separate calculation. From June 15, 1990 to June 15, 2026 is 36 × 365 = 13,140 days. The nine leap days in 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020 and 2024 add 9, for 13,149 days. June 15 to October 22, 2026 adds 15 days remaining in June, 31 in July, 31 in August, 30 in September and 22 in October: 129 days. The total is <strong>13,278 days</strong>, which is 1,896 weeks and 6 days, or 318,672 hours.</p>
<p>Those totals suit forms that ask for age in months and milestone calculations. They are not interchangeable with the year-month-day label. Converting 13,278 days back to 36 years, 4 months and 7 days requires the calendar rules, not division by 365.</p>

<h2 id="date-differences">Date differences: elapsed days versus dates touched</h2>
<p>For a project, a notice period or a billing cycle, the question is usually “how many days between these two dates?” Count midnights, not labels. From January 1, 2026 to February 15, 2026, January contributes 31 days to February 1, and February 1 to February 15 contributes 14: <strong>45 elapsed days</strong>. In weeks, that is 6 weeks and 3 days. If you count both endpoints, the range covers 46 calendar dates.</p>
<p>Weekdays need their own pass because weekends are excluded. The same range starts on Thursday, January 1 and ends on Sunday, February 15. Monday-to-Friday days total 32 before public holidays are removed. A payroll system that pays for 32 days and a leave policy that counts 46 calendar days are both correct for their own definitions, which is why the definition belongs in the request.</p>
<p>Leap days change short intervals. From February 28, 2024 to March 1, 2024 is <strong>2 days</strong> because February 29 sits between them. The same pair of dates in 2023 is <strong>1 day</strong>. A date calculator that treated every February as 28 days would lose a day from every interval that crosses the 29th.</p>
<table>
<thead><tr><th>Question</th><th>Counting model</th><th>Example</th><th>Result</th></tr></thead>
<tbody>
<tr><td>Exact age</td><td>Calendar years, months and days</td><td>1990-06-15 to 2026-10-22</td><td>36y 4m 7d; 13,278 days</td></tr>
<tr><td>Age gap</td><td>Calendar difference between birth dates</td><td>1988-11-02 to 1992-03-14</td><td>3y 4m 12d; 1,228 days</td></tr>
<tr><td>Days between</td><td>Elapsed midnights</td><td>2026-01-01 to 2026-02-15</td><td>45 days; 6w 3d</td></tr>
<tr><td>Add an offset</td><td>Calendar days or months</td><td>2026-01-01 + 40 days</td><td>2026-02-10</td></tr>
<tr><td>Time zone conversion</td><td>Instant and zone rule</td><td>2026-03-10 15:00 New York</td><td>2026-03-11 04:00 Tokyo</td></tr>
<tr><td>Unix timestamp</td><td>Seconds from 1970-01-01 UTC</td><td>1,700,000,000</td><td>2023-11-14 22:13:20 UTC</td></tr>
</tbody>
</table>
<p>The table is a map, not a formula sheet. The cluster guides cover each row’s traps in detail.</p>

<h2 id="add-subtract">Adding and subtracting days, weeks and months</h2>
<p>Adding days is simplest because a day is a calendar unit, not a 24-hour block. Add 40 days to January 1, 2026: January has 31 days, so 30 days after January 1 is January 31, and 10 more days lands on <strong>February 10, 2026</strong>. Clock changes do not alter the result, because the target is a date label rather than a duration.</p>
<p>Adding months is not the same as adding 30 days. One month after January 31, 2026 is <strong>February 28, 2026</strong>, because February has 28 days and the target is clamped to its last day. In 2024, the same operation gives February 29. One month after March 31 is April 30. This clamping rule is standard in calendar libraries and in contract wording, but it must be applied consistently.</p>
<p>Subtracting crosses boundaries in the same way. Ten days before January 5, 2026 is <strong>December 26, 2025</strong>: five days bring you to December 31, and five more enter December. If you instead subtract 240 hours from a timestamp, a daylight saving change inside the interval can shift the wall-clock result by an hour. Decide whether the question is about a date or an instant before choosing the method.</p>
<p>Recurring schedules add another wrinkle. A monthly subscription that starts on the 31st needs an explicit month-end policy, because February, April, June, September and November cannot supply a 31st. Most billing systems clamp to the last day of the shorter month. A few roll forward to the first of the next month. Both behaviors exist; neither is universal.</p>

<h2 id="time-zones">Time zones: one instant, many clocks</h2>
<p>A time zone is a set of rules attached to a place, not a fixed number attached to a city. The rules include the standard offset, the daylight saving dates and any historical changes. New York observed daylight saving time in 2026 from March 8 to November 1. London switched on March 29 and back on October 25. Because the switch dates differ, the gap between the two cities is four hours for three weeks each spring, not the usual five.</p>
<p>Convert through UTC to keep the arithmetic honest. A meeting at 15:00 on March 10, 2026 in New York is 19:00 UTC, because New York is on EDT at UTC−4. Tokyo is on JST at UTC+9 with no daylight saving change, so add 9 hours to 19:00 UTC for <strong>04:00 on March 11 in Tokyo</strong>. The date moved forward because the sum passed midnight UTC.</p>
<p>Six months later the same wall-clock time produces a different result. On December 15, 2026, New York is on EST at UTC−5. 15:00 becomes 20:00 UTC, and Tokyo receives <strong>05:00 on December 16</strong>. The local meeting time did not change; the offset did. This is why a recurring “3 p.m. New York” series drifts by an hour for the Tokyo participant after a switch.</p>
<p>Two daylight saving edge cases break naive converters. On March 8, 2026, clocks in New York jump from 02:00 to 03:00, so <strong>02:30 does not exist</strong>. On November 1, 2026, clocks fall back from 02:00 to 01:00, so <strong>01:30 occurs twice</strong>. A converter must choose an offset or reject the input for the first case, and must label which occurrence it used for the second. Schedules built on local wall-clock strings cannot resolve that ambiguity without an explicit offset or a UTC anchor.</p>
<p>The safe pattern for distributed teams is to store the instant in UTC, display it in each participant’s zone, and include the zone name and offset in the invitation. “15:00 America/New_York (UTC−4)” is unambiguous. “3 p.m. EST” is not, because the abbreviation is sometimes used loosely in summer, and “IST” can mean India, Ireland or Israel.</p>

<h2 id="unix-time">Unix timestamps: one integer, one instant</h2>
<p>Unix time counts seconds from 1970-01-01 00:00:00 UTC. The value 1,700,000,000 corresponds to <strong>2023-11-14 22:13:20 UTC</strong>. In New York, which was on EST at UTC−5 on that date, the same instant is 17:13:20. In Kolkata, at UTC+5:30, it is 03:43:20 on November 15. In Tokyo, at UTC+9, it is 07:13:20 on November 15. One integer, three local readings, three different dates or times.</p>
<p>The unit is the most common source of bugs. JavaScript’s Date.now() returns milliseconds, so the same instant appears as 1,700,000,000,000, a 13-digit number. A ten-digit value is almost always seconds; a thirteen-digit value is almost always milliseconds. Multiplying or dividing by 1,000 at the wrong point shifts the date by decades, not by a small rounding error.</p>
<p>Useful anchors: 0 is 1970-01-01 00:00:00 UTC. −86,400 is 1969-12-31 00:00:00 UTC. 1,735,689,600 is 2025-01-01 00:00:00 UTC. 1,792,627,200 is 2026-10-22 00:00:00 UTC. If a log entry shows a number near 1.79 billion, it is a 2026 date in seconds; if it shows 1.79 trillion, it is the same date in milliseconds.</p>
<p>Unix time ignores leap seconds. The system pretends every day has exactly 86,400 seconds, so a leap second inserted at the end of a day is not represented as a distinct value. For scheduling, logging and most application logic this simplification is fine. For astronomical timing or leap-second-aware protocols, a Unix timestamp is not a complete record of elapsed SI seconds.</p>

<h2 id="leap-years">Leap years and February 29</h2>
<p>The Gregorian rule is short: a year is a leap year if it is divisible by 4, except that century years are not leap years unless they are divisible by 400. So 2024 and 2028 are leap years, 2026 is not, 2000 is a leap year, and 2100 is not. The rule keeps the calendar aligned with the seasons over centuries.</p>
<p>A February 29 birthday has two separate questions. The elapsed-day count is unambiguous: from February 29, 2000 to October 22, 2026 is <strong>9,732 days</strong>. The year-month-day label depends on the convention for the missing date. If the birthday is observed on February 28, the label is 26 years, 7 months and 24 days. If it is observed on March 1, the label is 26 years, 7 months and 21 days. Both describe the same number of midnights crossed.</p>
<p>Legal and administrative conventions vary by country and by purpose. Some documents treat March 1 as the anniversary in common years; others use February 28. The practical rule is to pick the convention your jurisdiction or form expects, write it down, and apply it consistently. The <a href="/blog/age-calculator-guide/leap-year-birthdays">leap year birthday guide</a> covers the legal and scheduling variations in more detail.</p>
<p>Leap days also affect date arithmetic that has nothing to do with birthdays. One-year terms show the leap day: March 1, 2023 to March 1, 2024 spans 366 days because February 29, 2024 falls inside, while March 1, 2024 to March 1, 2025 spans 365. An annual interest calculation that divides by 365 will differ by one day’s worth of interest between the two periods. The convention should be stated in the contract, not assumed by the spreadsheet.</p>

<h2 id="choose-tool">Which guide and tool to use</h2>
<p>The eight cluster guides follow the questions people actually ask. Start with the one that matches your wording, then use the linked tool to check the result:</p>
<ul>
<li><a href="/blog/age-calculator-guide/how-to-calculate-age">How to calculate exact age</a> — the borrow method with three checked birth dates.</li>
<li><a href="/blog/age-calculator-guide/age-difference-between-dates">Age difference between two dates</a> — comparing siblings, colleagues or records.</li>
<li><a href="/blog/age-calculator-guide/date-difference-calculation">Date difference calculation</a> — elapsed days, weeks, months and working days.</li>
<li><a href="/blog/age-calculator-guide/timezone-conversion">Time zone conversion</a> — DST-aware meeting scheduling.</li>
<li><a href="/blog/age-calculator-guide/unix-timestamp-conversion">Unix timestamp conversion</a> — seconds, milliseconds and ISO strings.</li>
<li><a href="/blog/age-calculator-guide/leap-year-birthdays">Leap year birthdays</a> — February 29 conventions and century rules.</li>
<li><a href="/blog/age-calculator-guide/add-subtract-dates">Add and subtract dates</a> — offsets, month-end clamping and deadlines.</li>
<li><a href="/blog/age-calculator-guide/age-in-days-hours-minutes">Age in days, hours and minutes</a> — total-unit conversions and milestones.</li>
</ul>
<p>Use the age calculator when the input is a birth date and the output is an age. Use the date calculator when the input is two dates or a date and an offset. Use the time zone converter when the input is a meeting time in a named zone. Use the timestamp converter when the input is an integer from a log, an API or a database. Choosing the right input model removes most of the ambiguity before any arithmetic begins.</p>

<h2 id="mistakes">Mistakes that survive a second look</h2>
<ol>
<li><strong>Treating a month as 30 days.</strong> One month after January 31 is February 28 or 29, not March 2. Calendar months clamp to the target month’s last day.</li>
<li><strong>Mixing inclusive and exclusive counts.</strong> A 45-day interval covers 46 dates if both endpoints count. State the convention before comparing two systems.</li>
<li><strong>Assuming today’s offset applies all year.</strong> New York, London, Sydney and most of Europe change offsets. Always resolve the offset at the specific instant.</li>
<li><strong>Adding offsets in the wrong direction.</strong> To convert 15:00 EDT to UTC, add 4 hours; to convert UTC back to EDT, subtract 4. The sign follows the offset, not the direction of travel.</li>
<li><strong>Confusing seconds with milliseconds.</strong> Ten digits versus thirteen. A timestamp near 1.79 billion is seconds; near 1.79 trillion is milliseconds.</li>
<li><strong>Ignoring the time of birth.</strong> A person born at 23:30 on June 15 is not yet 36 years and 4 months old at 09:00 on October 22. Date-only calculators drop the time, which suits forms but not precise legal deadlines.</li>
<li><strong>Using ambiguous abbreviations.</strong> CST can mean US Central, China Standard or Cuba Standard. Use IANA names such as America/Chicago, Asia/Shanghai or America/Havana.</li>
</ol>
<p>A final sanity check works for every row in the table: convert the result back. Add the age components to the birth date and see whether you land on the comparison date. Add the day count to the start date and see whether you reach the end date. Convert the local time back to UTC and compare. If the reverse operation does not return the original, the definition changed somewhere in the middle.</p>
<div class="cta-box"><strong>Check your own dates:</strong> open the <a href="/age-calculator">age calculator</a> for a birth date, the <a href="/date-calculator">date calculator</a> for an offset or interval, the <a href="/timezone-converter">time zone converter</a> for a meeting, and the <a href="/timestamp-converter">timestamp converter</a> for a log value. Each tool shows the result on your device, and the eight cluster guides explain the arithmetic behind it.</div>
`;

export const agePillar: BlogPost = {
  pillar: "age-calculator-guide",
  slug: "age-calculator-guide",
  kind: "pillar",
  title: "Age Calculator Guide: Exact Age, Dates & Time Zones",
  description:
    "Calculate exact age in years, months and days, measure date gaps, add or subtract dates, and convert time zones and Unix timestamps with worked examples.",
  keywords: ["age calculator guide", "how to calculate age", "date difference calculator", "time zone converter", "unix timestamp converter", "leap year birthday", "age in days", "add days to date"],
  toolSlugs: ["age-calculator", "date-calculator", "timezone-converter", "timestamp-converter"],
  relatedSlugs: ["how-to-calculate-age", "age-difference-between-dates", "date-difference-calculation", "timezone-conversion", "unix-timestamp-conversion", "leap-year-birthdays", "add-subtract-dates", "age-in-days-hours-minutes"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "why-date-math-goes-wrong", text: "Why date math goes wrong", level: 2 },
    { id: "exact-age", text: "Exact age in years, months and days", level: 2 },
    { id: "date-differences", text: "Elapsed days vs dates touched", level: 2 },
    { id: "add-subtract", text: "Adding and subtracting dates", level: 2 },
    { id: "time-zones", text: "Time zones and daylight saving", level: 2 },
    { id: "unix-time", text: "Unix timestamps", level: 2 },
    { id: "leap-years", text: "Leap years and February 29", level: 2 },
    { id: "choose-tool", text: "Which guide and tool to use", level: 2 },
    { id: "mistakes", text: "Mistakes that survive a second look", level: 2 },
  ],
  html,
  faqs: [
    { question: "How is exact age calculated in years, months and days?", answer: "Subtract the birth date components from the comparison date, borrowing days from the previous month and months from the year when a component is negative. For June 15, 1990 to October 22, 2026, the result is 36 years, 4 months and 7 days. Adding the parts back returns October 22, 2026, which checks the borrow logic." },
    { question: "Why can the same date produce different ages in two time zones?", answer: "A date label is not an instant. If one system evaluates the comparison at 00:30 in Tokyo and another at 00:30 in New York, the two instants fall on different UTC dates. A birth time near midnight can therefore shift the age by a day. Convert both moments to UTC, or fix a single time-zone convention for the comparison." },
    { question: "When does a February 29 birthday turn a year older?", answer: "There is no universal answer. Some jurisdictions observe the birthday on February 28 in common years, others on March 1, and some documents simply use the last day of February. Elapsed days are unaffected. Choose the rule required by the form or contract, record it, and apply it consistently rather than letting each system guess." },
    { question: "How many days old is someone born on June 15, 1990?", answer: "On October 22, 2026 that person has lived 13,278 days. The calculation is 36 years × 365 = 13,140 days, then add 9 leap days from 1992 through 2024 and 129 days from June 15 to October 22, 2026. The same total equals 1,896 weeks and 6 days, or 318,672 hours." },
    { question: "Does the date calculator count the start date?", answer: "The difference view counts elapsed midnights, so January 1 to February 15, 2026 is 45 days. That interval touches 46 calendar dates if both endpoints are included. The add-subtract view treats the start date as day zero and lands 40 days later on February 10, 2026. State which convention a contract or payroll system expects." },
    { question: "How do I avoid daylight saving errors in a meeting invitation?", answer: "Name the IANA zone and include the UTC offset at the meeting instant, for example 15:00 America/New_York (UTC−4). Convert through UTC rather than adding a remembered city-to-city gap. For recurring meetings, recheck both zones after every transition date, because the United States, Europe and Australia switch on different weekends." },
    { question: "What is the difference between a Unix timestamp and a date?", answer: "A Unix timestamp is a count of seconds from 1970-01-01 00:00:00 UTC, so it identifies one instant without a time zone. A calendar date is a label whose meaning depends on a zone. The same timestamp can be November 14 in New York and November 15 in Tokyo. Keep storage in UTC and convert only for display." },
  ],
};
