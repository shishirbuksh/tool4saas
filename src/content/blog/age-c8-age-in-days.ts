import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>"Age in days" sounds like a multiplication problem: take the years, multiply by 365, then add something for leap years. That shortcut gets close, but it misses the exact count by days, and it cannot answer hours or minutes at all. The reliable method is to count calendar days between the birth date and the target date, then convert the total.</p>
<p>This guide is part of the <a href="/blog/age-calculator-guide">age calculator guide</a>. It works through three examples, including the leap-day correction, and explains where timezones and daylight saving break the simple 24-hour conversion. Use the <a href="/age-calculator">age calculator</a> to check your own dates.</p>

<h2 id="days-not-years">Why age in days is not years times 365</h2>
<p>A year is not 365 days on average. The Gregorian calendar averages 365.2425 days, and any span of years contains a whole number of leap days. Someone born on 15 June 1990 and measured on 16 September 2026 has lived through the leap days of 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020 and 2024: nine extra days. Multiplying 36 years by 365 gives 13,140 days; adding the nine leap days gives 13,149; the remaining 3 months and 1 day add 93. The exact total is <strong>13,242 days</strong>.</p>
<p>That is the whole correction. The month and day remainder is not a fraction to estimate; it is a calendar count from 15 June to 16 September: 15 days left in June, 31 in July, 31 in August and 16 in September, for 93. The year-month-day label and the total-day count describe the same span in different units.</p>
<p>The shortcut is still useful for a rough estimate. Thirty years times 365.2425 is about 10,957 days, which matches the exact count in the next section. The average works over long spans, but it can be off by a day or two for a specific birth date, and it cannot tell you which day is the 10,000th. Use it for a sanity check, not for the final number.</p>

<h2 id="exact-day-count">Counting exact days between two dates</h2>
<p>For a date-only age, day 0 is the birth date. The next day is day 1. This is the exclusive convention used by most age calculators: the birth date is not counted as a full day lived. If you need an inclusive count, add one. The distinction matters for milestone celebrations and for any form that asks for days rather than years.</p>
<p><strong>Example 1: 30th birthday.</strong> Born 10 May 1996; target 10 May 2026. The span is 30 years. Leap days after the birth date and up to the target are 2000, 2004, 2008, 2012, 2016, 2020 and 2024: seven. 30 × 365 = 10,950; 10,950 + 7 = <strong>10,957 days</strong>. In hours: 10,957 × 24 = <strong>262,968 hours</strong>. In minutes: 262,968 × 60 = <strong>15,778,080 minutes</strong>.</p>
<p><strong>Example 2: 1,000 days old.</strong> Starting 1 January 2023: 2023 contributes 365 days, 2024 contributes 366, and 365 + 366 = 731. The remaining 269 days run through 2025: January 30 days after the 1st, February 28, March 31, April 30, May 31, June 30, July 31, August 31 and September 27. The 1,000th day is <strong>27 September 2025</strong>. Check: 365 + 366 + 269 = 1,000.</p>
<p><strong>Example 3: the long span.</strong> From 15 June 1990 to 16 September 2026, the 36 years contribute 13,140 days, the nine leap days contribute 9, and the 15 June to 16 September remainder contributes 93. The sum is 13,140 + 9 + 93 = <strong>13,242 days</strong>. That is the figure to use for a day-count milestone, not 36 × 365 = 13,140.</p>
<p>A 10,000-day milestone from the same birth date falls on 31 October 2017. The remaining 3,242 days reach 16 September 2026, which is why the two totals differ by exactly that amount. Milestone dates are easier to find by adding the day count than by converting years.</p>
<h3>Counting across a leap day</h3>
<p>A span that includes 29 February has one more day than the same span in a common year. From 1 January 2024 to 1 January 2025 is 366 days; from 1 January 2025 to 1 January 2026 is 365. If you are counting backward, the leap day is inside the interval whenever it falls between the two dates, regardless of whether the start or end year is the leap year. That is why subtracting two dates is safer than adding 365 repeatedly.</p>

<h2 id="hours-minutes">Converting days to hours and minutes</h2>
<p>Once you have the day total, the rest is multiplication: 1 day = 24 hours, 1 hour = 60 minutes, 1 minute = 60 seconds. For 13,242 days: 13,242 × 24 = <strong>317,808 hours</strong>; 317,808 × 60 = <strong>19,068,480 minutes</strong>; 19,068,480 × 60 = <strong>1,144,108,800 seconds</strong>.</p>
<p>Those figures assume every day has 24 hours. That is true for civil-date arithmetic and false for elapsed time in a zone with daylight saving. The next section explains the gap. For most age milestones, the date-based figure is the one people expect; for a precise elapsed duration between two timestamps, use the UTC difference instead.</p>
<table>
<thead><tr><th>Days</th><th>Hours</th><th>Minutes</th><th>Seconds</th></tr></thead>
<tbody>
<tr><td>1,000</td><td>24,000</td><td>1,440,000</td><td>86,400,000</td></tr>
<tr><td>10,957</td><td>262,968</td><td>15,778,080</td><td>946,684,800</td></tr>
<tr><td>13,242</td><td>317,808</td><td>19,068,480</td><td>1,144,108,800</td></tr>
</tbody>
</table>

<h2 id="dst">Daylight saving: when a day is not 24 hours</h2>
<p>In a zone that springs forward, one local day has 23 hours; in autumn, one has 25. New York's 8 March 2026 is 23 hours long, and 1 November 2026 is 25 hours long. A date-only age calculator that counts 13,242 days and multiplies by 24 gets a clean number, but it is not the exact number of elapsed hours between two local timestamps.</p>
<p>For an exact elapsed duration, subtract the two instants in UTC, then convert. If both records are local times, convert each to UTC with the offset that applied on that date, not the offset that applies today. A birth at 23:30 on 29 February and a target at 00:30 on 1 March can be one hour apart in elapsed time and two calendar dates apart. Decide whether the question is "how many date boundaries" or "how much time."</p>
<p>Cross-zone records add the same issue. A birth certificate may record a local date in one country, while the person now lives in another. Age in days from the recorded civil dates is not the same as elapsed hours from the recorded instants. Keep the dates and the zone attached to them, and state which interpretation a result uses.</p>

<h2 id="what-counts">What counts as a day</h2>
<p>Age in days is usually the number of completed days, so the birth date itself is day 0. Some cultures and forms count the birth date as day 1. Legal age is normally expressed in years, not days, and a day count does not override the legal rule. For a passport, school admission or retirement calculation, use the official date-of-birth rule; for a milestone or a data visualization, use the exact day count.</p>
<p>Inclusive counting also changes anniversaries. From 1 January to 1 January next year, the exclusive count is 365 or 366 days, and the inclusive count adds one. A 1,000-day celebration based on an exclusive count lands one day earlier than one based on an inclusive count. State the convention before comparing two numbers.</p>
<p>Time of birth is a separate input. A date-only calculation treats everyone born on the same date as having the same age in days, regardless of whether the birth was at 00:01 or 23:59. That is appropriate for calendar milestones and insufficient for elapsed-time records. If the exact hour matters, store the timestamp and the zone, not just the date.</p>
<p>If you need an age in days for a legal or medical record, confirm whether the receiving office wants completed days or a date range. A medical record may care about the exact time of birth; a school form may care only about the date. The arithmetic is the same, but the input precision is not.</p>

<h2 id="calculator">Checking the total in the age calculator</h2>
<p>The <a href="/age-calculator">age calculator</a> returns years, months and days, total days, and a next-birthday countdown. Enter a birth date and a target date, then read the totals separately:</p>
<ol>
<li>Enter the birth date, including the correct year.</li>
<li>Set the comparison date; today is fine for a current age.</li>
<li>Read the total days figure before converting to hours or minutes.</li>
<li>Check the next-birthday line if you need the upcoming anniversary date.</li>
</ol>
<p>For leap-day birthdays, the <a href="/blog/age-calculator-guide/leap-year-birthdays">leap year birthday guide</a> explains the 28 February and 1 March conventions. For a plain interval between two dates, the <a href="/blog/age-calculator-guide/date-difference-calculation">date difference tutorial</a> covers inclusive counting and weekday breakdowns.</p>
<div class="cta-box"><strong>Get your total:</strong> open the <a href="/age-calculator">age calculator</a>, enter 15 June 1990 and 16 September 2026, and confirm 13,242 days. Then multiply by 24 to check the 317,808-hour figure.</div>
`;

export const ageInDays: BlogPost = {
  pillar: "age-calculator-guide",
  slug: "age-in-days-hours-minutes",
  kind: "cluster",
  title: "Age in Days, Hours and Minutes: Exact Conversion",
  description:
    "Calculate exact age in days, hours and minutes with leap-day arithmetic, worked examples and the DST caveat for elapsed time.",
  keywords: ["age in days", "age in hours", "age in minutes", "days old calculator", "exact age in days"],
  toolSlugs: ["age-calculator", "date-calculator"],
  relatedSlugs: ["add-subtract-dates", "leap-year-birthdays", "date-difference-calculation"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "days-not-years", text: "Why age in days is not years times 365", level: 2 },
    { id: "exact-day-count", text: "Counting exact days between dates", level: 2 },
    { id: "hours-minutes", text: "Converting days to hours and minutes", level: 2 },
    { id: "dst", text: "Daylight saving and elapsed time", level: 2 },
    { id: "what-counts", text: "What counts as a day", level: 2 },
    { id: "calculator", text: "Checking the total", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I calculate my age in days?", answer: "Count the calendar days from your birth date to the target date, then add the leap days in the span. For 15 June 1990 to 16 September 2026, 36 × 365 = 13,140, the nine leap days add 9, and the 3-month, 1-day remainder adds 93, for 13,242 days. The age calculator does this in one step." },
    { question: "Is age in days just years multiplied by 365?", answer: "No. That omits leap days and the partial year. For a 30th birthday from 10 May 1996 to 10 May 2026, 30 × 365 = 10,950, but the seven leap days raise the exact total to 10,957 days. The error grows with the length of the span." },
    { question: "How many hours are in 13,242 days?", answer: "13,242 × 24 = 317,808 hours. That is 19,068,480 minutes or 1,144,108,800 seconds. The result assumes 24-hour days, which is correct for calendar-date arithmetic but not for exact elapsed time across daylight-saving transitions." },
    { question: "Does daylight saving change age in days?", answer: "It does not change a calendar-date day count. It does change elapsed hours: a spring-forward day in New York has 23 hours, and a fall-back day has 25. For exact duration, subtract the two UTC instants rather than multiplying the day count by 24." },
    { question: "Is the birth date day 0 or day 1?", answer: "Most age calculators use day 0, so the birth date is not counted as a completed day. An inclusive count treats the birth date as day 1 and adds one to the total. Agree on the convention before comparing results from two systems." },
    { question: "Why is 1,000 days after 1 January 2023 on 27 September 2025?", answer: "2023 contributes 365 days and 2024 contributes 366, for 731. The remaining 269 days run from 1 January 2025 to 27 September 2025: 30 days in January after the 1st, 28 in February, and 31, 30, 31, 30, 31, 31 and 27 in the following months. The sum is 365 + 366 + 269 = 1,000." },
  ],
};
