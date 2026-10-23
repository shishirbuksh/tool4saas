import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“Can you do 3 p.m. my time?” is a complete sentence and an incomplete instruction. It omits the date, the zone and the offset, and any one of those can move the meeting by an hour or a day. A time zone converter works only when the input identifies a place and an instant, not just a clock reading.</p>
<p>This guide is part of the <a href="/blog/age-calculator-guide">age calculator guide</a>. It explains why offsets change, converts several 2026 meetings through UTC, and lists the daylight saving cases that break otherwise careful schedules. The examples use IANA zone names so the rules stay attached to the place.</p>

<h2 id="offset-rules">An offset is a rule, not a constant</h2>
<p>UTC−5 is not “the New York offset”. It is the offset New York uses while standard time is in effect. From March 8 to November 1, 2026, New York uses UTC−4 under daylight saving time. London uses UTC+0 in winter and UTC+1 from March 29 to October 25. Sydney moves in the opposite direction on the calendar because it is in the southern hemisphere: daylight time began there on October 4, 2026 and ends on April 4, 2027.</p>
<p>Because the switch dates differ by country, the gap between two cities is not stable. New York and London are normally five hours apart. Between March 8 and March 29, 2026, New York has already sprung forward while London has not, so the gap is four hours. The same four-hour gap returns between October 25 and November 1, when London has fallen back and New York has not. A converter that stores “New York is five hours behind London” will be wrong during both windows.</p>
<p>Abbreviations make the problem worse. EST and EDT are reasonably specific, but CST can mean US Central, China Standard or Cuba Standard. IST can mean India Standard, Irish Standard or Israel Standard. Use IANA identifiers such as America/New_York, Europe/London, Asia/Kolkata and Australia/Sydney. The identifier carries the full rule set, including historical changes and future scheduled transitions.</p>
<p>India is a useful reminder that “no daylight saving” is not the same as “never changes”. India currently observes UTC+5:30 without a seasonal shift, but the converter should still resolve the zone rule for the date rather than hard-code a permanent offset. Historical dates and future legislation can differ from the current rule.</p>

<h2 id="worked-conversions">Converting through UTC, with the arithmetic shown</h2>
<p>Convert the source local time to UTC, then convert UTC to the target. The two steps keep the signs straight and make the date rollover visible.</p>
<p><strong>March 10, 2026, 15:00 in New York to Tokyo.</strong> New York is on EDT at UTC−4, so 15:00 + 4 hours = 19:00 UTC. Tokyo is on JST at UTC+9, so 19:00 + 9 hours = 28:00, which is <strong>04:00 on March 11</strong>. The target date is one day later than the source date.</p>
<p><strong>December 15, 2026, 15:00 in New York to Tokyo.</strong> New York is on EST at UTC−5, so 15:00 + 5 = 20:00 UTC. Add 9 hours for Tokyo: 29:00, or <strong>05:00 on December 16</strong>. The local clock time is the same as in March, but the conversion is one hour later because New York’s offset changed.</p>
<p><strong>March 10, 2026, 15:00 in London to New York.</strong> London is still on GMT at UTC+0, so the UTC time is 15:00. New York is on EDT at UTC−4, so subtract 4 hours: <strong>11:00 in New York</strong>. The four-hour gap is temporary. On April 10, London is on BST at UTC+1, so 15:00 London is 14:00 UTC and <strong>10:00 in New York</strong>, a five-hour gap.</p>
<table>
<thead><tr><th>Source local time</th><th>UTC</th><th>Target zone</th><th>Target local time</th><th>Date shift</th></tr></thead>
<tbody>
<tr><td>2026-03-10 15:00 America/New_York (UTC−4)</td><td>19:00</td><td>Asia/Tokyo (UTC+9)</td><td>2026-03-11 04:00</td><td>+1 day</td></tr>
<tr><td>2026-12-15 15:00 America/New_York (UTC−5)</td><td>20:00</td><td>Asia/Tokyo (UTC+9)</td><td>2026-12-16 05:00</td><td>+1 day</td></tr>
<tr><td>2026-03-10 15:00 Europe/London (UTC+0)</td><td>15:00</td><td>America/New_York (UTC−4)</td><td>2026-03-10 11:00</td><td>same day</td></tr>
<tr><td>2026-04-10 15:00 Europe/London (UTC+1)</td><td>14:00</td><td>America/New_York (UTC−4)</td><td>2026-04-10 10:00</td><td>same day</td></tr>
<tr><td>2026-10-22 09:00 America/New_York (UTC−4)</td><td>13:00</td><td>Asia/Kolkata (UTC+5:30)</td><td>2026-10-22 18:30</td><td>same day</td></tr>
<tr><td>2026-10-22 09:00 America/New_York (UTC−4)</td><td>13:00</td><td>Australia/Sydney (UTC+11)</td><td>2026-10-23 00:00</td><td>+1 day</td></tr>
</tbody>
</table>
<p>The last row is the one people miss. Sydney is 15 hours ahead of New York on that date, so a 09:00 call in New York is midnight at the start of the next day in Sydney. The date changes even though the conversion is only a few hours of arithmetic.</p>

<h2 id="dst-traps">DST gaps, repeated hours and mismatched switch dates</h2>
<p>Spring forward creates times that do not exist. On March 8, 2026, New York clocks jump from 02:00 to 03:00, so <strong>02:30 is not a valid local time</strong>. A scheduler that accepts it must either reject the input or shift it forward to 03:30. On March 29, 2026, London does the same at 01:00, so 01:30 is missing there.</p>
<p>Fall back creates times that exist twice. On November 1, 2026, New York clocks move from 02:00 back to 01:00, so <strong>01:30 occurs once in EDT and again in EST</strong>. The two occurrences are an hour apart in UTC. An invitation that says “01:30” without an offset is ambiguous; one of the two will be wrong for at least one participant.</p>
<p>Mismatched transition dates create a quieter problem. A weekly 15:00 New York–London call is five hours apart for most of the year, four hours apart from March 8 to March 29, and four hours apart again from October 25 to November 1. If the series is stored as “15:00 New York” and “20:00 London”, the London time is wrong during those windows. If it is stored as a UTC instant, the local times shift automatically but the wall-clock hour changes for both sides.</p>
<p>Decide which promise the meeting makes. “Same local time every week” preserves the clock reading and lets the UTC instant move. “Same absolute instant every week” preserves the UTC time and lets the local clock move. Both are valid; a series that silently mixes them is not.</p>

<h2 id="date-rollover">Date rollover and the international date line</h2>
<p>Date rollover is not limited to the date line. Any conversion that pushes the local time past midnight changes the date. New York to Tokyo at 15:00 produces 04:00 the next day. New York to Sydney at 09:00 produces midnight the next day. A meeting at 23:00 in Los Angeles to London lands at 07:00 the next morning when the usual eight-hour gap applies.</p>
<p>The international date line adds a full-day difference between some pairs. Auckland, at UTC+13 during southern summer, is 17 hours ahead of New York at UTC−4. A 09:00 New York call on October 22 is 02:00 on October 23 in Auckland. Tokelau and Samoa sit at UTC+13; American Samoa sits at UTC−11, so the two Samoas are 24 hours apart despite being close neighbours.</p>
<p>When the output date differs from the input date, say so explicitly in the invitation. “March 10, 15:00 New York / March 11, 04:00 Tokyo” is clearer than “15:00 New York” with a separate note that Tokyo is ahead. The date is part of the conversion, not an afterthought.</p>

<h2 id="scheduling-checklist">A scheduling checklist that survives transitions</h2>
<ol>
<li><strong>Name the zones, not the abbreviations.</strong> Use America/New_York and Asia/Tokyo. Add the offset at the meeting instant as a human-readable check.</li>
<li><strong>Convert through UTC.</strong> Write the UTC time down. It is the one value that does not change when a government adjusts a rule.</li>
<li><strong>Check both ends of the meeting.</strong> A call that starts before a transition and ends after it can span two clock hours while only one hour of real time passes, or the reverse.</li>
<li><strong>Check the date on both sides.</strong> If the target date differs, include it in every message and calendar entry.</li>
<li><strong>Test transition weekends.</strong> March 8, March 29, October 25 and November 1, 2026 are the dates to inspect for US, UK and EU participants. Australia’s dates are separate.</li>
<li><strong>State the recurrence rule.</strong> “Every Tuesday at 15:00 New York” and “every Tuesday at 19:00 UTC” behave differently after a transition. Pick one and write it down.</li>
<li><strong>Ask a second person to read the invitation.</strong> A local participant will catch a wrong offset faster than any amount of arithmetic.</li>
</ol>
<p>For logs and APIs, store the UTC instant and the IANA zone separately. The instant answers “when did it happen”; the zone answers “what time was it for the user”. Storing only a local string loses the offset, and storing only an offset loses the zone rule. The <a href="/blog/age-calculator-guide/unix-timestamp-conversion">Unix timestamp guide</a> covers the integer side of that pair, and the <a href="/blog/age-calculator-guide/date-difference-calculation">date difference guide</a> covers the calendar side.</p>

<h2 id="converter">Using the time zone converter</h2>
<p>Pick the date and time, then choose the source and target zones by name. Read three things: the converted local time, the date on each side, and the offset in effect. If the tool shows a UTC row, compare it with the arithmetic above; that row is the anchor that makes the rest checkable.</p>
<ol>
<li>Enter 2026-03-10 at 15:00 with America/New_York as the source and Asia/Tokyo as the target. Confirm 04:00 on March 11.</li>
<li>Change the date to 2026-12-15 and confirm 05:00 on December 16, one hour later than the March result.</li>
<li>Convert 2026-03-10 15:00 Europe/London to America/New_York and confirm 11:00, not 10:00.</li>
<li>Convert 2026-10-22 09:00 America/New_York to Australia/Sydney and confirm 00:00 on October 23.</li>
</ol>
<p>If a result looks an hour off, check the transition weekend first. If it looks a day off, check the date line and the target date. If it looks several hours off, check whether the source zone was entered with the right city, not just the right country.</p>
<div class="cta-box"><strong>Convert your meeting:</strong> open the <a href="/timezone-converter">time zone converter</a>, enter the date, time and IANA zones, and compare the local results with the UTC anchor. Then send the invitation with the date, zone and offset spelled out.</div>
`;

export const ageTimezone: BlogPost = {
  pillar: "age-calculator-guide",
  slug: "timezone-conversion",
  kind: "cluster",
  title: "Time Zone Converter: Schedule Across Zones Without Errors",
  description:
    "Convert meeting times across IANA time zones with DST-aware examples, UTC anchors, date rollovers and a repeatable scheduling checklist.",
  keywords: ["time zone converter", "timezone conversion", "convert meeting time", "UTC offset", "DST scheduling", "world clock converter"],
  toolSlugs: ["timezone-converter"],
  relatedSlugs: ["unix-timestamp-conversion", "date-difference-calculation", "add-subtract-dates"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "offset-rules", text: "An offset is a rule, not a constant", level: 2 },
    { id: "worked-conversions", text: "Converting through UTC", level: 2 },
    { id: "dst-traps", text: "DST gaps and repeated hours", level: 2 },
    { id: "date-rollover", text: "Date rollover", level: 2 },
    { id: "scheduling-checklist", text: "A scheduling checklist", level: 2 },
    { id: "converter", text: "Using the time zone converter", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I convert a meeting time from one time zone to another?", answer: "Convert the source local time to UTC using the offset in effect on that date, then apply the target zone’s offset. For March 10, 2026 at 15:00 in New York, EDT is UTC−4, so the instant is 19:00 UTC. Tokyo at UTC+9 is 04:00 on March 11. Convert through UTC to keep the signs and the date rollover visible." },
    { question: "Why is New York sometimes four hours behind London instead of five?", answer: "The two cities switch daylight saving on different dates. In 2026 New York starts on March 8 and London on March 29. Between those dates New York is on EDT at UTC−4 while London is still on GMT at UTC+0, so the gap is four hours. The same four-hour gap returns from October 25 to November 1, when London has fallen back but New York has not." },
    { question: "What happens to a meeting at 2:30 a.m. on a spring-forward date?", answer: "That local time does not exist. On March 8, 2026 New York clocks jump from 02:00 to 03:00, so 02:30 is skipped. A converter should reject the input or shift it forward. On March 29, 2026 the same gap occurs in London at 01:00. Schedule the meeting at 03:30 or later, or anchor it to a UTC time instead." },
    { question: "Does a time zone converter handle daylight saving automatically?", answer: "A converter that uses IANA zone identifiers resolves the rule for the specific date, so it should apply the correct standard or daylight offset. It cannot guess which of two repeated fall-back times you meant. On November 1, 2026, 01:30 in New York occurs twice, once in EDT and once in EST, so include an offset or a UTC anchor when the time falls in that ambiguous hour." },
    { question: "Why does the date change when I convert New York to Tokyo or Sydney?", answer: "The target clock can pass midnight even when the source is in the afternoon. New York at 15:00 on March 10 is 04:00 on March 11 in Tokyo. New York at 09:00 on October 22 is 00:00 on October 23 in Sydney because Sydney is 15 hours ahead on that date. The date is part of the conversion and belongs in the invitation." },
    { question: "Is UTC the same as GMT?", answer: "They currently read the same on civil clocks, but they are not the same concept. UTC is the time standard used to coordinate clocks worldwide; GMT is a time zone name based on Greenwich mean time. Neither observes daylight saving. For scheduling and storage, write UTC because it is the unambiguous reference, and use Europe/London when you specifically mean the civil zone." },
  ],
};
