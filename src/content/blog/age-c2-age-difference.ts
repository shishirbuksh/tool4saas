import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two people born four years apart are not always four years apart on paper. Around birthdays, a completed-years comparison can say three while the exact gap is three years and eleven months. The difference depends on whether you subtract birth dates or subtract current ages, and on which date you evaluate the result.</p>
<p>Part of the <a href="/blog/age-calculator-guide">age calculator guide</a>, this tutorial compares birth dates directly, shows the borrow arithmetic, and works through three pairs and a month-end case that defeats naive subtraction. The same method answers “who is older”, “what is the age gap” and “how many days apart were they born”.</p>

<h2 id="two-ways-to-compare">Two ways to compare ages</h2>
<p>The first method subtracts one birth date from the other. Born November 2, 1988 and March 14, 1992, the younger person is <strong>3 years, 4 months and 12 days</strong> younger, a gap of 1,228 days. This is a fixed interval: it does not change as the two people age, because both endpoints are fixed.</p>
<p>The second method computes each person’s age on a chosen date and compares the two ages. On October 22, 2026, the first person is 37 years, 11 months and 20 days old and the second is 34 years, 7 months and 8 days old. Subtracting those ages gives the same 3 years, 4 months and 12 days. Done consistently, the two methods agree because both measure the same two birth dates against the same endpoint.</p>
<p>The disagreement appears when one method drops smaller units. Completed years on that date are 37 and 34, a difference of 3, while the exact gap is 3 years and 4 months. A form that asks “how many years apart are you?” usually wants completed years. A genealogy record or a paediatric milestone chart may want the full years-months-days gap. Write down which one you need before subtracting.</p>

<h2 id="same-method">The same borrow method, with two birth dates</h2>
<p>Put the later birth date on top and subtract year, month and day. Start with November 2, 1988 and March 14, 1992:</p>
<ul>
<li>Days: 14 − 2 = 12.</li>
<li>Months: 3 − 11 = −8. Borrow 12 months: 3 + 12 − 11 = 4.</li>
<li>Years: 1992 − 1988 − 1 = 3.</li>
</ul>
<p>The gap is <strong>3 years, 4 months and 12 days</strong>. Add it back: add 3 years to November 2, 1988 to reach November 2, 1991, add 4 months to reach March 2, 1992, and add 12 days to reach March 14, 1992. The endpoint matches.</p>
<p>Total days follow the same pattern as age. Three common years contribute 3 × 365 = 1,095 days to November 2, 1991. The remaining segment to March 14, 1992 is 133 days, and it contains February 29, 1992. The total is <strong>1,228 days</strong>. Notice that the leap day is not in the three-year base; it is inside the final four-month segment.</p>
<p>If the day column is negative, borrow from the month before the later date. Compare July 19, 2015 with February 3, 2019. Days: 3 − 19 = −16. January 2019 has 31 days, so 3 + 31 − 19 = 15. Months: 1 − 7 = −6, borrow 12 to get 6, and the year count becomes 3. The gap is <strong>3 years, 6 months and 15 days</strong>, or 1,295 days. Adding it back from July 19, 2015 lands on February 3, 2019.</p>
<p>The <a href="/blog/age-calculator-guide/how-to-calculate-age">exact age tutorial</a> covers the same borrow logic with a single birth date and a comparison date. Read it first if the column-borrowing step is unfamiliar.</p>

<h2 id="worked-examples">Three pairs, checked against the calendar</h2>
<p><strong>Siblings: November 2, 1988 and March 14, 1992.</strong> The older sibling was 3 years, 4 months and 12 days old when the younger was born. The gap is 1,228 days. It stays 1,228 days forever; only the labels “older” and “younger” remain fixed while both ages grow.</p>
<p><strong>Cousins: July 19, 2015 and February 3, 2019.</strong> The gap is 3 years, 6 months and 15 days, or 1,295 days. The subtraction needed a day borrow from January 2019 and a month borrow from the year column. Add the result back to July 19, 2015 to confirm the later date.</p>
<p><strong>Colleagues: December 30, 1985 and August 21, 1994.</strong> Days: 21 − 30 = −9. Borrow from July 1994, which has 31 days: 21 + 31 − 30 = 22. Months: 8 − 12 = −4, borrow 12 to get 8, and the year count becomes 1994 − 1985 − 1 = 8. The gap is <strong>8 years, 7 months and 22 days</strong>, or 3,156 days. In a workplace age-gap question, the full gap is more informative than the difference between completed ages, which can read as 8 or 9 depending on the month.</p>
<table>
<thead><tr><th>Pair</th><th>Earlier date</th><th>Later date</th><th>Calendar gap</th><th>Total days</th></tr></thead>
<tbody>
<tr><td>Siblings</td><td>1988-11-02</td><td>1992-03-14</td><td>3y 4m 12d</td><td>1,228</td></tr>
<tr><td>Cousins</td><td>2015-07-19</td><td>2019-02-03</td><td>3y 6m 15d</td><td>1,295</td></tr>
<tr><td>Colleagues</td><td>1985-12-30</td><td>1994-08-21</td><td>8y 7m 22d</td><td>3,156</td></tr>
<tr><td>Same birthday</td><td>2002-05-12</td><td>2010-05-12</td><td>8y 0m 0d</td><td>2,922</td></tr>
</tbody>
</table>
<p>The last row is a sanity check. Two people born on the same month and day are exactly 8 years apart, and the interval contains the leap days of 2004 and 2008: 8 × 365 = 2,920. The two leap days add 2, for 2,922 days. No borrowing is needed when the day and month match.</p>

<h2 id="borrow-and-month-end">The month-end case that breaks naive borrowing</h2>
<p>Compare January 31, 2001 with March 1, 2005. The day column is 1 − 31 = −30. Borrowing from February 2005 gives 28 days, so 1 + 28 − 31 = −2, still negative. A single borrow is not enough because the earlier date sits on the longest possible day of a 31-day month and the later date sits on the first day of a month whose predecessor is short.</p>
<p>The reliable method is addition, not subtraction. Start at January 31, 2001, add 4 years to reach January 31, 2005, add 1 month to reach February 28, 2005 under the standard clamp, and add 1 day to reach March 1, 2005. The gap is <strong>4 years, 1 month and 1 day</strong>. The elapsed total is 1,490 days. A calculator that blindly borrows 28 days will report a negative remainder or silently land on a different March date.</p>
<p>The same issue appears when a birth date is the 29th, 30th or 31st and the comparison month is shorter. The clamp rule says the anniversary of January 31 falls on February 28 in a common year, not March 3. Apply that rule before subtracting, and the negative-remainder case disappears.</p>

<h2 id="leap-birthdays">Leap days and same-birthday comparisons</h2>
<p>When both people share a birthday, the gap is a whole number of years. Born May 12, 2002 and May 12, 2010, they are exactly 8 years apart, and the interval is 2,922 days because 2004 and 2008 are leap years. Because the birthdays coincide, the completed-year difference also stays at 8; no month of the year produces a temporary 7 or 9.</p>
<p>February 29 introduces the only genuine convention choice. Compare a child born February 29, 2020 with one born March 1, 2021. The fixed gap between the two birth dates is 1 year and 1 day, or 366 days. The older child’s age on March 1, 2021 depends on the convention: 1 year and 1 day if the birthday is clamped to February 28, or exactly 1 year if it is observed on March 1. For the gap between the two people, use the birth dates and ignore the convention.</p>
<p>If you need total days rather than a calendar label, the leap-day debate disappears. The <a href="/blog/age-calculator-guide/age-in-days-hours-minutes">age in days and hours guide</a> shows how to convert the day total into weeks and hours and where the 24-hour multiplication stops being meaningful across daylight saving changes.</p>

<h2 id="calculator">Checking an age gap in the calculator</h2>
<p>The age difference calculator takes the earlier birth date first and the later birth date second. Read the years-months-days gap and the total-day count. Then add the gap to the earlier date; if the result is not the later date, one of the borrow rules was applied differently.</p>
<ol>
<li>Enter 1988-11-02 and 1992-03-14. Confirm 3 years, 4 months and 12 days, and 1,228 total days.</li>
<li>Enter 2015-07-19 and 2019-02-03. Confirm 3 years, 6 months and 15 days, and 1,295 total days.</li>
<li>Enter 2001-01-31 and 2005-03-01. Confirm 4 years, 1 month and 1 day, not a negative day count.</li>
<li>Swap the dates. The direction reverses, but the absolute gap and the day total should not change.</li>
</ol>
<p>If you are comparing two people rather than two historical records, decide whether the question is “what is the fixed gap between their births” or “what is the difference in their ages today”. Both are legitimate, but only the second changes with the calendar. Most forms want the first.</p>
<div class="cta-box"><strong>Compare two dates:</strong> open the <a href="/age-calculator">age calculator</a>, enter both birth dates, and check the calendar gap against the total-day count. If the addition check fails, the month-end clamp is the first rule to inspect.</div>
`;

export const ageDifference: BlogPost = {
  pillar: "age-calculator-guide",
  slug: "age-difference-between-dates",
  kind: "cluster",
  title: "Age Difference Between Two Dates (With Examples)",
  description:
    "Compare two birth dates with an age difference calculator: exact gaps in years, months and days, borrow cases, leap days and same-day checks.",
  keywords: ["age difference calculator", "age gap between two dates", "date of birth difference", "how to calculate age difference", "compare two ages"],
  toolSlugs: ["age-calculator"],
  relatedSlugs: ["how-to-calculate-age", "age-in-days-hours-minutes", "leap-year-birthdays"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "two-ways-to-compare", text: "Two ways to compare ages", level: 2 },
    { id: "same-method", text: "The borrow method with two dates", level: 2 },
    { id: "worked-examples", text: "Three pairs checked", level: 2 },
    { id: "borrow-and-month-end", text: "The month-end case", level: 2 },
    { id: "leap-birthdays", text: "Leap days and shared birthdays", level: 2 },
    { id: "calculator", text: "Checking an age gap", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I calculate the age difference between two birth dates?", answer: "Subtract the earlier date from the later one, column by column. Borrow the previous month’s day count when the day is negative, then borrow 12 months when the month is negative. November 2, 1988 to March 14, 1992 is 3 years, 4 months and 12 days. Add the result back to the earlier date to verify it." },
    { question: "Why does the age gap change around birthdays?", answer: "The fixed gap between two birth dates never changes. The difference between completed ages can. If one person was born in March 1990 and the other in July 1991, the completed-age gap is 1 for most of the year but 2 between March and July, when the older has had a birthday and the younger has not. The birth-date gap stays 1 year and 4 months." },
    { question: "What if one birth date is January 31?", answer: "Use the month-end clamp. Add the years and months first, clamp to the last day of the target month, then add the remaining days. January 31, 2001 to March 1, 2005 is 4 years, 1 month and 1 day: the first anniversary lands on February 28, 2005. Naive borrowing can produce a negative day remainder, which is why the addition check matters." },
    { question: "How do leap years affect an age gap?", answer: "A leap day inside the interval adds one day to the total but does not change the calendar label by itself. The gap from November 2, 1988 to March 14, 1992 is 3 years, 4 months and 12 days and 1,228 days, including February 29, 1992. For people born on February 29, choose February 28 or March 1 as the anniversary convention and state it." },
    { question: "Should I subtract current ages or birth dates?", answer: "Birth dates give a fixed interval that does not move as time passes. Current ages give a snapshot that changes around birthdays and depends on the evaluation date. Use birth dates for records, eligibility and genealogy; use current ages when the question is about how old each person is today. Do not mix the two by subtracting completed years and then adding months from the birth dates." },
    { question: "How many days apart are two people born eight years apart?", answer: "Eight calendar years contain 2,920 days and one extra day for each February 29 in the interval. From May 12, 2002 to May 12, 2010 the leap days are in 2004 and 2008, so the total is 2,922 days. Count the leap days explicitly; multiplying by 365 alone understates every multi-year gap." },
  ],
};
