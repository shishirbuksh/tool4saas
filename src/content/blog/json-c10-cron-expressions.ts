import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A cron expression packs a schedule into five short fields. The syntax is old, compact and easy to misread: one misplaced number can mean every minute instead of every hour, or the first of the month instead of every Monday. The reliable way to check a schedule is to read each field separately, then compare the next run times with a calendar. This guide covers the five fields, the supported ranges, lists and steps, the day-of-month and day-of-week quirk, and the limits of a browser-based parser.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. Test an expression in the <a href="/cron-parser">cron parser</a>, which shows a field breakdown, a plain-language description and the next run times in your browser's local timezone.</p>

<h2 id="five-fields">The five fields, in order</h2>
<p>Every expression has exactly five whitespace-separated fields: minute, hour, day of month, month and day of week. The order never changes. A sixth field is rejected rather than ignored, which is helpful because six-field variants usually add seconds at the front and silently shift every other value.</p>
<table>
<thead><tr><th>Field</th><th>Allowed values</th><th>Common forms</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Minute</strong></td><td>0–59</td><td><code>*</code>, <code>5</code>, <code>1-5</code>, <code>*/15</code>, <code>0,30</code></td><td><code>*/15</code> every 15 minutes</td></tr>
<tr><td><strong>Hour</strong></td><td>0–23</td><td><code>*</code>, <code>9</code>, <code>9-17</code>, <code>*/2</code></td><td><code>9-17</code> business hours</td></tr>
<tr><td><strong>Day of month</strong></td><td>1–31</td><td><code>*</code>, <code>1</code>, <code>15</code>, <code>1-7</code></td><td><code>1</code> the first day</td></tr>
<tr><td><strong>Month</strong></td><td>1–12</td><td><code>*</code>, <code>1</code>, <code>1-6</code>, <code>*/3</code></td><td><code>1-6</code> January through June</td></tr>
<tr><td><strong>Day of week</strong></td><td>0–7</td><td><code>*</code>, <code>1</code>, <code>1-5</code>, <code>0,6</code></td><td><code>1-5</code> Monday through Friday</td></tr>
</tbody>
</table>
<p>Day of week uses numbers, not names. Both 0 and 7 mean Sunday, so <code>0</code> and <code>7</code> are interchangeable for that day, while <code>1</code> is Monday and <code>6</code> is Saturday. Month names such as JAN and DOW names such as MON are not accepted. Macros such as <code>@daily</code> or <code>@reboot</code> are not accepted either; write the five fields explicitly.</p>
<p>The simplest useful expression is <code>0 0 * * *</code>: minute 0, hour 0, every day of the month, every month, every day of the week. That is midnight daily, and it is the tool's default, which makes it a useful baseline to edit one field at a time.</p>

<h2 id="ranges-lists-steps">Ranges, lists and steps</h2>
<p>A single number matches that value. A range such as <code>9-17</code> matches every value from 9 through 17 inclusive. A comma-separated list such as <code>0,30</code> matches both values, and list entries can themselves be ranges or steps. A step divides a field: <code>*/15</code> in the minute field means every 15 minutes starting at 0, so 0, 15, 30 and 45. A ranged step such as <code>10-50/10</code> means 10, 20, 30, 40 and 50.</p>
<p>The tool also accepts a start value with a step, for example <code>5/10</code> in the minute field. It treats that as starting at 5 and continuing every 10 minutes through the end of the field, so 5, 15, 25 and so on. Not every scheduler documents this convention the same way, so write the full range explicitly or test the real scheduler.</p>
<p>Values are range-checked. A minute of 60, an hour of 24, a day of month of 0 or a day of week of 8 is rejected with the field name in the error. A step of zero is rejected too. Fix the field rather than assuming the parser will clamp it. Silent clamping is how a schedule ends up running at a time nobody intended.</p>

<h2 id="next-runs">What the next five runs do and do not show</h2>
<p>The parser calculates the next five matching minutes in your browser's local timezone. Each result is also shown with a UTC timestamp, which helps when the person reading the screen and the server running the job are in different places. The list is a simulation, not a guarantee. It starts from the next minute and scans forward roughly 69 days, or 100,000 minutes.</p>
<p>That window explains a common surprise. A monthly schedule may list only two or three upcoming dates because five months do not fit inside 69 days. A yearly schedule or a leap-day expression may list none, even though the expression is valid. The warning about no run times means the scan ended, not necessarily that the schedule is impossible.</p>
<p>The plain-language description is also an approximation, useful for spotting an obvious misread such as “every minute” when you expected “every hour,” but the field breakdown and actual dates are stronger evidence.</p>

<h2 id="dom-dow">Day of month and day of week use OR semantics</h2>
<p>This is the rule that causes the most production surprises. When both day of month and day of week are constrained, the parser matches a date if either field matches. The fields are not combined with AND. If day of month is <code>*</code>, only day of week matters; if day of week is <code>*</code>, only day of month matters. When both are restricted, either one can trigger the job.</p>
<p>Example: <code>0 0 1 * 1</code> means midnight on the first of the month or on every Monday, not midnight on Mondays that happen to be the first. If you need both conditions, a single cron expression is the wrong tool. Check the date inside the job, use two schedules with a guard, or move the logic into the application.</p>
<p>Day of week 0 and 7 both mean Sunday, including inside ranges and lists. <code>1-5</code> is Monday through Friday, <code>0,6</code> is Sunday and Saturday, and <code>5-7</code> covers Friday through Sunday. Avoid mixing 0 and 7 in the same list; it does not add a second Sunday, but it does make the expression harder to review.</p>

<h2 id="examples">Two worked schedules</h2>
<p><strong>Example 1: <code>*/15 9-17 * * 1-5</code>.</strong> The minute field runs every 15 minutes. The hour field covers 9 through 17, so the first run is 09:00 and the last is 17:45. Day of month is unrestricted, so day of week decides: Monday through Friday only. The result is 36 runs per weekday, four per hour across nine hours. The next-run list should show a weekday sequence and skip the weekend. If it shows Saturday, recheck the day-of-week field.</p>
<p><strong>Example 2: <code>30 9 1 * *</code>.</strong> The minute is 30 and the hour is 9, so the time is 09:30. Day of month is 1 and month is unrestricted, so the job runs on the first day of every month. Day of week is unrestricted, so it does not add a condition. The next-run list may show only two or three entries because of the 69-day scan window. Confirm the first date against a calendar and remember that months have different lengths; the expression handles that automatically.</p>
<p>Run <code>0 0 1 * 1</code> as a third check. If you see Mondays that are not the first, the OR behavior is working as designed. That is the moment to decide whether the schedule is what you actually meant.</p>

<h2 id="timezones-dst">Timezones, daylight saving and the scheduler</h2>
<p>The parser has no timezone selector. It reads the clock in your browser and displays each run in local time and UTC. The server that executes the job may use a different timezone, often UTC. An expression that looks correct on your laptop can run at the wrong local hour in production. Confirm the scheduler's timezone setting before you copy the expression into a deployment.</p>
<p>Daylight saving transitions add another edge. When clocks move forward, a local time may not exist; when they move back, it may occur twice. The browser simulation walks local minutes and can disagree with a scheduler that skips or repeats a wall-clock time. Test schedules that run near a transition, or express critical jobs in UTC and convert only for display. The parser is a reading aid, not a substitute for the scheduler's own documentation.</p>

<h2 id="workflow">A review workflow for a new schedule</h2>
<ol>
<li>Write the five fields in order and say each one aloud: minute, hour, day of month, month, day of week.</li>
<li>Paste the expression and read the field breakdown before looking at the dates.</li>
<li>Compare the next runs with a calendar, including the weekday names.</li>
<li>Check whether both day fields are constrained; if so, confirm the OR behavior is acceptable.</li>
<li>Confirm the scheduler timezone and test around a daylight saving transition if the job is critical.</li>
<li>Run the job once manually, then monitor the first scheduled execution.</li>
</ol>
<p>Keep the expression in version control with a comment describing the intended schedule in plain words. A future reader should not have to decode five fields to learn the schedule, and a change should update the comment in the same commit.</p>
<p>For related debugging work, the <a href="/blog/json-formatter-guide/jwt-expiry-without-trust">JWT expiry guide</a> covers timestamp checks, and the <a href="/blog/json-formatter-guide/json-parse-errors">JSON parse error guide</a> covers payloads that jobs consume. Both use the same principle: verify the value, not just the format.</p>
<div class="cta-box"><strong>Check a schedule now:</strong> paste the expression into the <a href="/cron-parser">cron parser</a> to see the field breakdown and next runs. It runs locally in your browser. For the wider workflow, start with the <a href="/blog/json-formatter-guide">developer toolkit guide</a>.</div>
`;

export const cronExpressions: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "cron-expression-guide",
  kind: "cluster",
  title: "Cron Expression Guide: 5 Fields and Next Runs",
  description:
    "Read five-field cron expressions, decode ranges, lists and steps, and check the next five runs before you trust a schedule in production.",
  keywords: ["cron expression 5 fields", "cron ranges lists steps", "cron day of week 0 7 sunday", "cron next run times", "cron dom dow or semantics"],
  toolSlugs: ["cron-parser"],
  relatedSlugs: ["json-parse-errors", "jwt-expiry-without-trust", "uuid-seed-test-database"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "five-fields", text: "The five fields", level: 2 },
    { id: "ranges-lists-steps", text: "Ranges, lists and steps", level: 2 },
    { id: "next-runs", text: "Next runs and limits", level: 2 },
    { id: "dom-dow", text: "Day-of-month and day-of-week", level: 2 },
    { id: "examples", text: "Worked schedules", level: 2 },
    { id: "timezones-dst", text: "Timezones and DST", level: 2 },
    { id: "workflow", text: "Review workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "What do the five cron fields mean?", answer: "They are minute, hour, day of month, month and day of week, always in that order. Each field accepts numbers, ranges, lists and steps. A sixth field is rejected because this parser supports standard five-field cron only, not the variants that add seconds at the front." },
    { question: "Does the parser support names or macros?", answer: "No. Names such as MON or JAN, macros such as @daily, seconds fields and timezone selectors are not supported. Write the numeric fields explicitly. If your scheduler uses a different syntax, test the expression there as well rather than assuming the browser result transfers." },
    { question: "Why does 0 0 1 * 1 run on Mondays?", answer: "When both day of month and day of week are restricted, this parser uses OR semantics: a date matches if either field matches. The expression therefore means the first of the month or every Monday. If you need both conditions together, check the date inside the job or use two guarded schedules." },
    { question: "Why are fewer than five next runs shown?", answer: "The parser scans roughly 69 days ahead, so a monthly schedule may fit only two or three dates in the window. A yearly or leap-day schedule may show none. The expression can still be valid. Use the field breakdown and a calendar to verify it, and test it in the real scheduler." },
    { question: "Is day of week 7 Sunday?", answer: "Yes. Both 0 and 7 mean Sunday in this parser. Monday is 1 and Saturday is 6. Ranges and lists use the same numbering. Avoid mixing 0 and 7 in one expression; it does not create a second Sunday, but it makes the schedule harder to read." },
    { question: "Which timezone do the next runs use?", answer: "The browser's local timezone, with a UTC timestamp shown alongside. The server running the job may use a different timezone, often UTC, so confirm the scheduler setting. Daylight saving transitions can skip or repeat a local time; test critical schedules around those dates." },
  ],
};
