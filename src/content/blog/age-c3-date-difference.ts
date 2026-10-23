import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A date difference is a count of midnights, not a count of days on a calendar page. From January 1 to February 15, 2026, 45 midnights pass, yet the interval touches 46 printed dates. Hotels, payroll systems and contract clauses choose one convention or the other, and the gap between 45 and 46 is exactly the kind of detail that turns a correct calculation into a disputed invoice.</p>
<p>This guide is part of the <a href="/blog/age-calculator-guide">age calculator guide</a>. It covers elapsed versus inclusive counts, leap days, week and month breakdowns, working-day totals, and adding or subtracting an offset. Every example is checked against the calendar so you can reproduce it.</p>

<h2 id="elapsed-vs-inclusive">Elapsed days versus dates touched</h2>
<p>Subtract the start date from the end date and you get elapsed days. January 1 to February 15, 2026 is 45 days: January contributes 31 days to February 1, and February 1 to February 15 contributes 14. The start date is day zero, and the end date is day 45. Most software, contract intervals and age calculations work this way.</p>
<p>Count every printed date in the range and you get 46: January 1 through January 31 is 31 dates, and February 1 through February 15 is 15 more. This is the inclusive count. A hotel stay from January 1 to February 15 charges for 45 nights but covers 46 days of occupancy language. A project plan that says “46 calendar days including both endpoints” is using the inclusive convention.</p>
<p>Neither number is wrong. The error is using one label for the other. A leave policy that grants 45 days but counts 46 dates will overspend by one day per request. A rental contract that charges 46 nights for a 45-night stay will overbill. Write the convention into the request before calculating: “45 elapsed days” or “46 dates inclusive”.</p>
<p>Time of day is a separate axis. Date-only arithmetic treats both endpoints as midnight labels, so the result is a whole number. If the inputs include clock times, the difference can include a fraction of a day. A task that starts at 09:00 and ends at 17:00 on the same date is zero elapsed dates but eight hours of work. Decide whether the question is about dates or durations before subtracting.</p>

<h2 id="worked-examples">Three intervals, checked by hand</h2>
<p><strong>January 1 to February 15, 2026.</strong> January has 31 days, so the first month contributes 31. February 1 to February 15 contributes 14. The total is <strong>45 elapsed days</strong>, or 46 dates inclusive. In weeks, 45 ÷ 7 = 6 weeks and 3 days. The interval starts on Thursday, January 1 and ends on Sunday, February 15.</p>
<p><strong>March 1 to April 1, 2026.</strong> March has 31 days, so the total is <strong>31 days</strong>, or 32 dates inclusive. That is 4 weeks and 3 days. March 1, 2026 is a Sunday and April 1 is a Wednesday. The month length, not a fixed 30-day assumption, determines the result.</p>
<p><strong>October 22 to December 31, 2026.</strong> October 22 to November 1 contributes 10 days, November contributes 30, and December 1 to December 31 contributes 30. The total is <strong>70 days</strong>, or 71 dates inclusive, which is exactly 10 weeks. The interval starts and ends on a Thursday, so the weekday pattern repeats every seven days.</p>
<table>
<thead><tr><th>Interval</th><th>Elapsed days</th><th>Dates inclusive</th><th>Weeks</th><th>Weekdays</th></tr></thead>
<tbody>
<tr><td>2026-01-01 to 2026-02-15</td><td>45</td><td>46</td><td>6w 3d</td><td>32</td></tr>
<tr><td>2026-03-01 to 2026-04-01</td><td>31</td><td>32</td><td>4w 3d</td><td>22</td></tr>
<tr><td>2026-10-22 to 2026-12-31</td><td>70</td><td>71</td><td>10w 0d</td><td>50</td></tr>
<tr><td>2024-02-28 to 2024-03-01</td><td>2</td><td>3</td><td>0w 2d</td><td>2</td></tr>
<tr><td>2023-02-28 to 2023-03-01</td><td>1</td><td>2</td><td>0w 1d</td><td>1</td></tr>
</tbody>
</table>
<p>The weekday column counts Monday through Friday before public holidays. The January–February interval contains 32 weekdays; the March interval contains 22 because March 2026 has five Sundays and four Saturdays. If a weekday public holiday falls inside the range, subtract one per holiday. The count is a calendar count, not a promise about which days a business is open.</p>

<h2 id="leap-years">Leap days inside the interval</h2>
<p>The leap-year rule is divisible by 4, except century years, which must be divisible by 400. So 2024 is a leap year, 2026 is not, 2000 is, and 2100 is not. The extra day is February 29, and it appears in the count only when the interval crosses it.</p>
<p>The shortest illustration is February 28 to March 1. In 2024 the interval is <strong>2 days</strong> because February 29 sits between the endpoints. In 2023 the same dates give <strong>1 day</strong>. A date calculator that assumes February always has 28 days loses a day from every 2024 interval that includes the 29th.</p>
<p>At the year scale, 2024 contains 366 days and 2026 contains 365. A one-year contract from March 1, 2023 to March 1, 2024 covers 366 days because February 29, 2024 falls inside. The same contract from March 1, 2024 to March 1, 2025 covers 365 days. If interest, rent or service fees are calculated per day, the leap year changes the total by one day’s worth even though the calendar anniversary is unchanged.</p>
<p>Leap days also shift weekdays. Because 366 = 52 × 7 + 2, a date after February 29 in a leap year moves forward by two weekdays relative to the previous year, not one. That is why a fixed-date holiday can fall on a different weekday after a leap year even though the month and day are identical.</p>

<h2 id="weeks-months-workdays">Weeks, months and working days</h2>
<p>Weeks are the cleanest subdivision because every week is exactly seven days. Divide the elapsed total by 7 and keep the remainder: 45 days is 6 weeks and 3 days; 31 days is 4 weeks and 3 days; 70 days is exactly 10 weeks. A remainder of zero means the interval is a whole number of weeks, which is useful for sprint planning and recurring schedules.</p>
<p>Months are not clean. January 1 to February 15, 2026 is 1 month and 14 days in calendar terms, but February 15 to March 15 is 28 days in 2026 and 29 days in 2024. A month can be 28, 29, 30 or 31 days, so “one month” is not a fixed duration. A 30-day clause and a one-month clause can produce different dates when the target month is shorter than the starting day, most visibly in February and at year-end.</p>
<p>Working days need the weekday count and a holiday list. The January 1 to February 15, 2026 interval contains 32 Monday-to-Friday dates. Remove one for each weekday public holiday observed inside the range. Weekend work adds back only if the schedule explicitly includes it. Do not estimate working days as elapsed days × 5 ÷ 7: 45 × 5 ÷ 7 = 32.14, which happens to round near the correct 32 here, but the shortcut fails on short intervals and around holiday clusters.</p>
<p>If the interval crosses a daylight saving transition, date-only totals are unaffected. A calendar day is still a calendar day even when it contains 23 or 25 clock hours. Durations measured in hours are a different calculation; they need a time zone and an explicit start instant. The <a href="/blog/age-calculator-guide/age-difference-between-dates">age difference guide</a> covers calendar subtraction between two fixed dates, and the add-subtract guide covers offsets.</p>

<h2 id="add-subtract">Adding and subtracting an offset</h2>
<p>The same calendar rules run in reverse. Add 40 days to January 1, 2026: 30 days after January 1 is January 31, and 10 more days is <strong>February 10, 2026</strong>. Adding days never depends on month length assumptions because each step advances one printed date at a time.</p>
<p>Adding months does depend on month length. One month after January 31, 2026 is <strong>February 28, 2026</strong>, because February has 28 days and the result clamps to the last valid date. One month after January 31, 2024 is February 29. One month after March 31 is April 30. A billing system that rolls forward to March 1 instead is using a different convention, not making an arithmetic error.</p>
<p>Subtraction crosses year boundaries in the same way. Ten days before January 5, 2026 is <strong>December 26, 2025</strong>: five days reach December 31, and five more enter December. If you subtract a 240-hour duration instead of 10 calendar days, a daylight saving change inside the interval can move the wall-clock time by an hour. Choose the unit that matches the question.</p>
<p>For deadline work, decide whether the offset is measured in calendar days or business days. “Net 30” usually means 30 calendar days from the invoice date, which can include four or five weekends. “30 business days” is roughly six calendar weeks and needs a holiday calendar. The two phrases are not interchangeable, and a contract that uses one while the software uses the other will disagree at the boundary.</p>

<h2 id="calculator">Using the date calculator without second-guessing</h2>
<p>Enter the two dates in the difference view. Read the elapsed-day total first, then the week breakdown. If the question is inclusive, add one to the elapsed total and label it “dates inclusive”; do not change the underlying start and end dates.</p>
<ol>
<li>Enter 2026-01-01 and 2026-02-15. Confirm 45 elapsed days and 6 weeks 3 days.</li>
<li>Enter 2024-02-28 and 2024-03-01. Confirm 2 days, then repeat with 2023 and confirm 1 day.</li>
<li>Enter 2026-10-22 and 2026-12-31. Confirm 70 days, or exactly 10 weeks.</li>
<li>For an offset, switch to add-subtract and enter 2026-01-01 with an offset of 40 days. Confirm 2026-02-10.</li>
</ol>
<p>The <a href="/blog/age-calculator-guide/add-subtract-dates">add and subtract dates guide</a> goes deeper on month-end clamping, negative offsets and recurring schedules. The pillar guide connects date differences to age, time zones and timestamps.</p>
<div class="cta-box"><strong>Count your interval:</strong> open the <a href="/date-calculator">date calculator</a>, enter both dates, and compare the elapsed total with the inclusive count before you put either number in a contract or invoice. No signup, and the calculation runs on your device.</div>
`;

export const ageDateDifference: BlogPost = {
  pillar: "age-calculator-guide",
  slug: "date-difference-calculation",
  kind: "cluster",
  title: "Date Difference Calculator: Days, Weeks & Months",
  description:
    "Count days between two dates correctly, including inclusive counts, leap days, weeks, months and working days, with checked examples.",
  keywords: ["date difference calculator", "days between dates", "date duration calculator", "count days between two dates", "weeks between dates", "working days between dates"],
  toolSlugs: ["date-calculator"],
  relatedSlugs: ["add-subtract-dates", "age-difference-between-dates", "timezone-conversion"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "elapsed-vs-inclusive", text: "Elapsed days vs dates touched", level: 2 },
    { id: "worked-examples", text: "Three intervals checked", level: 2 },
    { id: "leap-years", text: "Leap days inside the interval", level: 2 },
    { id: "weeks-months-workdays", text: "Weeks, months and working days", level: 2 },
    { id: "add-subtract", text: "Adding and subtracting an offset", level: 2 },
    { id: "calculator", text: "Using the date calculator", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does the date difference include the start date?", answer: "The difference view counts elapsed midnights, so the start date is day zero and the end date is the total. January 1 to February 15, 2026 is 45 days. The range touches 46 calendar dates if you count both endpoints. Add one for an inclusive count and label it clearly, because payroll and rental systems may expect either convention." },
    { question: "How do I count days between two dates by hand?", answer: "Split the range at month boundaries. Count the days remaining in the first month, add the full days of each month in between, then add the day number of the end date. January 1 to February 15 is 31 days to February 1 and 14 more to February 15, for 45 days. Add one more if the contract counts both endpoints." },
    { question: "Is one month always 30 days?", answer: "No. Calendar months contain 28, 29, 30 or 31 days. One month after January 31 clamps to February 28 in a common year and February 29 in a leap year. A 30-day clause and a one-month clause can produce different dates when the target month is shorter than the starting day, most visibly in February and at year-end, so the contract should name the unit." },
    { question: "How do leap years change a date difference?", answer: "A leap day inside the interval adds one to the total. February 28 to March 1, 2024 is 2 days because February 29 is included; the same dates in 2023 are 1 day. A full leap year contains 366 days, so a one-year interval that includes it is one day longer than the same interval in a common year." },
    { question: "How do I count working days between two dates?", answer: "Count Monday through Friday dates in the range, then subtract one for each weekday public holiday observed inside it. January 1 to February 15, 2026 contains 32 weekdays before holidays. Do not use elapsed days × 5 ÷ 7 as a substitute; it fails on short ranges and around holiday clusters. Weekend shifts need an explicit rule." },
    { question: "Can I add days and months in the same calculator?", answer: "Yes, but use the add-subtract view rather than the difference view. Adding 40 days to January 1, 2026 gives February 10. Adding one month to January 31 gives February 28 in 2026 or February 29 in 2024 because the result clamps to the target month’s last day. Days and months follow different rules and should be entered as separate steps." },
  ],
};
