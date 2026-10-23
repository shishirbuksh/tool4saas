import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A Unix timestamp looks like a random number until you need to read it. A log line shows <code>1700000000</code>; a JavaScript payload shows <code>1700000000000</code>; a database column shows <code>2023-11-14 22:13:20+00</code>. All three can describe the same instant. The conversion is simple once you know the unit and the reference point, and most mistakes come from mixing seconds with milliseconds or reading a UTC value as local time.</p>
<p>This guide is part of the <a href="/blog/age-calculator-guide">age calculator guide</a>. Open the <a href="/timestamp-converter">Unix timestamp converter</a> to check each example as you read.</p>
<p>Two questions decide every conversion: which unit the number is in, and which zone should display it. The epoch and the arithmetic are fixed; the display is a choice. Keep those separate and a timestamp stops being mysterious.</p>

<h2 id="what-unix-time-counts">What Unix time actually counts</h2>
<p>Unix time counts seconds from <strong>1970-01-01T00:00:00Z</strong>, the epoch, in UTC. <code>0</code> is that instant. <code>86400</code> is 1970-01-02T00:00:00Z because one day has 86,400 seconds. The number is not a clock face and carries no timezone; it names one instant on the global timeline.</p>
<p>Why 1970? It was a convenient origin for early Unix systems, close enough to their own era to keep values small and far enough back to cover useful history. The choice is a convention, not an astronomical event. Other systems use different origins, which is why a timestamp from a Windows file property or a GPS receiver should not be pasted into a Unix converter without checking its epoch.</p>
<p>The count ignores leap seconds. Unix time treats every day as 86,400 seconds, so the UTC label around an inserted leap second can differ from a strict count of SI seconds. For ordinary logging, scheduling and date arithmetic that difference is irrelevant. For precision timing systems, it is not.</p>
<p>Timestamps can be negative: <code>-86400</code> is 1969-12-31T00:00:00Z. They also have a range limit on older systems. A signed 32-bit seconds value stops at <code>2147483647</code>, which is <strong>2038-01-19T03:14:07Z</strong>. That is the much-discussed 2038 problem. Modern 64-bit systems handle dates far beyond it, but embedded devices and old database columns may not.</p>

<h2 id="seconds-vs-milliseconds">Seconds vs milliseconds: how to tell them apart</h2>
<p>Unix seconds and Unix milliseconds share the same epoch and differ by a factor of 1,000. <code>1700000000</code> seconds and <code>1700000000000</code> milliseconds are the same instant. Digit length is the quickest check: a present-day seconds value has 10 digits, and the same instant in milliseconds has 13. A 16-digit value is usually microseconds, which require dividing by 1,000,000.</p>
<p>APIs disagree about units. Many HTTP APIs and database functions return seconds; JavaScript's <code>Date.now()</code> returns milliseconds. If a converted date lands in 1970 or in the year 56,000, the unit is wrong by a factor of 1,000. Divide or multiply once and recheck the year before doing anything else.</p>
<table>
<thead><tr><th>Unit</th><th>Digits in this example</th><th>Value</th><th>UTC rendering</th></tr></thead>
<tbody>
<tr><td>Seconds</td><td>10</td><td>1700000000</td><td>2023-11-14T22:13:20Z</td></tr>
<tr><td>Milliseconds</td><td>13</td><td>1700000000000</td><td>2023-11-14T22:13:20Z</td></tr>
<tr><td>Microseconds</td><td>16</td><td>1700000000000000</td><td>2023-11-14T22:13:20Z</td></tr>
<tr><td>ISO 8601 string</td><td>20 characters</td><td>2023-11-14T22:13:20Z</td><td>2023-11-14T22:13:20Z</td></tr>
</tbody>
</table>
<p>The ISO row is not a different time; it is a different notation. The trailing <code>Z</code> means UTC, so an ISO string with a <code>Z</code> and a Unix timestamp can be compared directly. An ISO string with <code>+05:30</code> or <code>-04:00</code> describes the same kind of instant with an explicit offset attached.</p>
<h3>Which unit should you store?</h3>
<p>Store the unit your consumers expect, and write it into the field name or schema. A column called <code>created_at</code> with no unit is a future bug; <code>created_at_ms</code> or an ISO 8601 text field removes the guess. Milliseconds are convenient for JavaScript and for ordering events that occur within the same second. Seconds are smaller and match many APIs. Microseconds and nanoseconds appear in instrumentation and high-resolution logs, where 16 or 19 digits are normal.</p>
<p>When a value arrives without documentation, test it against a known event. A 10-digit value near 1.7 billion is late 2023 in seconds; the same digits with three more zeros are milliseconds. A 9-digit number is 2001 or earlier in seconds, while a 12-digit number is likely milliseconds between 1973 and 2001, or a non-Unix epoch. The year is the tell, not the digit count alone.</p>

<h2 id="convert-both-ways">Converting in both directions, with the arithmetic shown</h2>
<p>To convert seconds to UTC, divide by 86,400 to get whole days after the epoch, then turn the remainder into hours, minutes and seconds. <strong>Example 1:</strong> 1,700,000,000 seconds. The division gives 19,675 days with a remainder of 80,000 seconds. 80,000 seconds is 22 hours (79,200), 13 minutes (780) and 20 seconds. Day 19,675 after 1970-01-01 is 2023-11-14, so the instant is <strong>2023-11-14T22:13:20Z</strong>.</p>
<p>To go the other way, count the days from the epoch and multiply. <strong>Example 2:</strong> 2024-01-01T00:00:00Z is 19,723 days after the epoch. 19,723 × 86,400 = 1,704,067,200, so the timestamp is <strong>1704067200</strong>. <strong>Example 3:</strong> 2024-03-01T00:00:00Z is 60 days later, because January has 31 days and February 2024 has 29. 60 × 86,400 = 5,184,000, and 1,704,067,200 + 5,184,000 = <strong>1,709,251,200</strong>. That matches 2024-03-01T00:00:00Z.</p>
<p>For milliseconds, multiply the seconds result by 1,000. The 2024-01-01 example becomes 1,704,067,200,000 milliseconds. Going back, divide by 1,000 before doing the day arithmetic. For microseconds, divide by 1,000,000. Doing the day division on a millisecond value is the single most common conversion error, and it produces a date tens of thousands of years away.</p>
<p>Fractional seconds are not part of the integer count. <code>1700000000.5</code> is half a second after the whole-second instant, and ISO would show <code>2023-11-14T22:13:20.500Z</code>. If a system truncates the fraction, two events can appear in the wrong order. Keep the fractional part when ordering high-frequency logs, and round only when displaying a human-readable time.</p>

<h2 id="timezone-and-dst">Where timezones and daylight saving enter</h2>
<p>A timestamp does not change when you change timezones; the local rendering does. 1,700,000,000 is 2023-11-14T22:13:20Z everywhere. On that date New York was on EST, UTC−5, so the local clock read <strong>17:13:20</strong>. Berlin was on CET, UTC+1, so it read <strong>23:13:20</strong>. Tokyo was at UTC+9, so it read <strong>07:13:20 on 15 November</strong>. The instant is identical; the labels differ.</p>
<p>Offsets are rules, not constants. New York uses EST in winter and EDT in summer, and the switch dates are set by local law. A timestamp near a boundary can therefore render with one offset in January and another in July. For example, 2026-03-08 05:00 UTC is 00:00 EST in New York. At 07:00 UTC that same morning, the city has sprung forward and the local time is 03:00 EDT. The two-hour UTC gap contains a one-hour local jump, not a missing timestamp.</p>
<p>That is why logs should store UTC and render in a named IANA zone such as <code>America/New_York</code>, not a fixed <code>UTC-5</code>. A fixed offset is correct only until the next clock change. Use the <a href="/blog/age-calculator-guide/timezone-conversion">timezone conversion guide</a> for meeting-time examples, and keep the zone name with any timestamp you archive.</p>
<p>When you render a timestamp for a user, show the zone abbreviation or the offset alongside it. "22:13" is ambiguous; "22:13 UTC" or "17:13 EST" is not. The converter's local pane uses the device zone, which may not be the zone the user expects if they are travelling or if the browser is set to a different region.</p>

<h2 id="common-mistakes">Common mistakes that produce the wrong date</h2>
<ol>
<li><strong>Treating milliseconds as seconds.</strong> The year jumps to roughly 56,000. Divide by 1,000 before converting.</li>
<li><strong>Treating seconds as milliseconds.</strong> The date collapses to January 1970. Multiply by 1,000 and look again.</li>
<li><strong>Reading a UTC timestamp as local.</strong> A log stamped 22:13Z is not 22:13 in New York; it is 17:13 EST that day.</li>
<li><strong>Using a fixed offset for a DST zone.</strong> A value that is correct in January is off by an hour in July. Use the IANA zone and a date-aware conversion.</li>
<li><strong>Dropping the <code>Z</code>.</strong> An ISO string without a zone can be interpreted as local time by the receiving system, which shifts the instant.</li>
<li><strong>Assuming 2038 is only a hardware problem.</strong> Any database column or API field still storing signed 32-bit seconds has the same ceiling.</li>
<li><strong>Confusing a duration with a timestamp.</strong> The number of seconds between two events is not a date. Adding 3,600 to a timestamp is fine; adding 3,600 to a duration is just arithmetic.</li>
</ol>
<p>A quick sanity check catches most of these. A 2023 or 2024 timestamp in seconds sits near 1.7 billion; the same instant in milliseconds is near 1.7 trillion. If the digit count and the year do not agree, stop and check the unit before debugging the timezone.</p>

<h2 id="converter-workflow">A clean converter workflow</h2>
<p>The <a href="/timestamp-converter">timestamp converter</a> accepts seconds or milliseconds and displays UTC and local versions together. Paste the value, confirm the digit count, compare the two panes, then copy the ISO string into your code or log. If you need to add days to a date rather than translate an instant, the <a href="/date-calculator">date calculator</a> handles calendar arithmetic without timestamp conversions.</p>
<ol>
<li>Paste the number and note whether it has 10, 13 or 16 digits.</li>
<li>Check the UTC result against a known event or a second source.</li>
<li>Switch the local zone and confirm the offset for that specific date.</li>
<li>Copy the ISO 8601 string with its <code>Z</code> or offset attached.</li>
</ol>
<div class="cta-box"><strong>Try it:</strong> paste 1700000000 into the <a href="/timestamp-converter">Unix timestamp converter</a>, confirm 2023-11-14T22:13:20Z, then switch the local zone and watch the clock change while the instant stays fixed.</div>
`;

export const ageTimestamp: BlogPost = {
  pillar: "age-calculator-guide",
  slug: "unix-timestamp-conversion",
  kind: "cluster",
  title: "Unix Timestamp Converter: Seconds, Milliseconds & Dates",
  description:
    "Convert Unix timestamps in seconds and milliseconds to UTC and local dates. Worked arithmetic, timezone offsets, DST and the 2038 limit explained.",
  keywords: ["unix timestamp converter", "epoch converter", "unix time to date", "timestamp seconds vs milliseconds", "convert date to unix timestamp"],
  toolSlugs: ["timestamp-converter", "timezone-converter", "date-calculator"],
  relatedSlugs: ["timezone-conversion", "date-difference-calculation", "age-in-days-hours-minutes"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-unix-time-counts", text: "What Unix time counts", level: 2 },
    { id: "seconds-vs-milliseconds", text: "Seconds vs milliseconds", level: 2 },
    { id: "convert-both-ways", text: "Converting in both directions", level: 2 },
    { id: "timezone-and-dst", text: "Timezones and daylight saving", level: 2 },
    { id: "common-mistakes", text: "Common conversion mistakes", level: 2 },
    { id: "converter-workflow", text: "A clean converter workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is a Unix timestamp?", answer: "It is the number of seconds since 1970-01-01T00:00:00Z, ignoring leap seconds. 1700000000 means 2023-11-14T22:13:20Z. The number identifies an instant and has no timezone; local clocks display that instant according to their offset and DST rules." },
    { question: "How do I know if a timestamp is seconds or milliseconds?", answer: "Count the digits. A present-day seconds value has 10 digits, the same instant in milliseconds has 13, and microseconds have 16. 1700000000 and 1700000000000 are the same moment. If the converted year is 1970 or around 56,000, the unit is off by a factor of 1,000." },
    { question: "Does a Unix timestamp change with timezone?", answer: "No. The timestamp is tied to UTC, so 1700000000 is the same instant in New York, Berlin and Tokyo. Only the displayed local time changes: 17:13:20 EST in New York, 23:13:20 CET in Berlin and 07:13:20 the next day in Tokyo." },
    { question: "Why does my converted date land one day off?", answer: "A one-day shift usually comes from applying the wrong offset or reading a UTC date as local. A timestamp near midnight UTC can be the previous or next date in another zone. Convert to the zone that governs the record and keep the date and offset together." },
    { question: "What is the 2038 problem?", answer: "A signed 32-bit seconds counter reaches its maximum at 2147483647, which is 2038-01-19T03:14:07Z. Systems that still store time that way will overflow unless they move to 64-bit values. Modern databases and languages generally use wider types." },
    { question: "Can a Unix timestamp be negative?", answer: "Yes. Negative values represent instants before 1970-01-01T00:00:00Z; for example, -86400 is 1969-12-31T00:00:00Z. Some APIs reject negative values, so check the receiving system before sending historical dates." },
  ],
};
