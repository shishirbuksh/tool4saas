import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Log file, 4,000 lines, one task: pull every <code>2024-05-01</code>-style date plus the order number on the same line. My first pattern <code>.*date.*</code> matched the whole file as one blob. My second, with the right flags and a named group, returned 37 clean rows in one pass. <strong>Two thirds of regex pain is flags, not patterns</strong> — <code>g/i/m/s</code> change what the same characters mean. This guide teaches flags first, capture groups second, and the catastrophic patterns that freeze tabs.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. Test live in the <a href="/regex-tester">regex tester</a> (worker-isolated, per-flag control). Validate JSON logs with the <a href="/json-formatter">JSON formatter</a> first.</p>

<h2 id="flags">Flags <code>g/i/m/s</code>: same pattern, four meanings</h2>
<table>
<thead><tr><th>Flag</th><th>Does</th><th>Example win</th></tr></thead>
<tbody>
<tr><td><strong>g (global)</strong></td><td>All matches, not just first</td><td><code>\\d+</code> pulls every number (“Order 42” → 42, plus the rest)</td></tr>
<tr><td><strong>i (insensitive)</strong></td><td>Case-blind</td><td><code>error</code> matches ERROR, Error, eRrOr in logs</td></tr>
<tr><td><strong>m (multiline)</strong></td><td><code>^/$</code> per line</td><td>4000-line logs: match per-line timestamps</td></tr>
<tr><td><strong>s (dotAll)</strong></td><td><code>.</code> crosses newlines</td><td>Multi-line stack traces as one match</td></tr>
</tbody>
</table>
<p>Debug sequence for a dead pattern: toggle <code>g</code> (only-first vs all?), then <code>i</code> (case?), then <code>m</code> (anchors per line?). Nine of ten “broken regex” reports I review are a missing flag, not a wrong pattern.</p>

<h2 id="groups">Capture groups: named beats numbered</h2>
<p><code>(\\d{4})-(\\d{2})-(\\d{2})</code> captures year/month/day as groups 1/2/3 — until someone adds a group in front and every index shifts. Named groups (<code>(?&lt;year&gt;\\d{4})-(?&lt;month&gt;\\d{2})</code>) survive refactoring because names don't renumber. Non-capturing <code>(?:…)</code> groups without capturing (keeps indexes stable, slight speed win). Backreferences (<code>\\1</code>) match repeats — <code>(\\w+) \\1</code> finds doubled words like “the the”. Practice set: extract order + date pairs from the sample log in the <a href="/regex-tester">tester</a> with one pattern and two named groups.</p>

<h2 id="catastrophic">Catastrophic patterns (and the worker that saves you)</h2>
<p><code>(a+)+$</code> on a long non-matching string doesn't fail — it <em>explodes</em>, trying exponentially many paths (ReDoS). Nested quantifiers, overlapping alternations and greedy <code>.*</code> before a required suffix are the classic triggers. Defenses in order: prefer lazy quantifiers or explicit character classes, anchor patterns, cap input size — and test in a runner that isolates execution. Our tester runs patterns in a Web Worker with timeouts and flags potentially-catastrophic shapes <em>before</em> running, so the worst case is a warning, never a frozen tab. If your pattern needs a paragraph of explanation, split it into two patterns and a line of code instead.</p>
<blockquote class="tip">General guidance only. For security-critical validation (emails, URLs, auth), prefer purpose-built parsers plus allowlists — regex alone under-validates.</blockquote>
`;

export const regexFlags: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "regex-flags-capture-groups",
  kind: "cluster",
  title: "Regex Flags and Capture Groups That Work",
  description:
    "Regex g/i/m/s flags with examples, named vs numbered groups, backreferences + catastrophic-pattern defense in isolated workers. Free tester.",
  keywords: [
    "how to test regex capture groups with flags",
    "d+ finds 42",
    "named groups year month",
    "greedy dot star backtracking",
    "120KB log 4000 lines",
    "What do regex flags g, i, m, s do?",
  ],
  toolSlugs: ["regex-tester", "json-formatter", "text-find-replace"],
  relatedSlugs: ["json-parse-errors", "base64-url-safe-vs-standard", "jwt-expiry-without-trust"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "flags", text: "g/i/m/s flags", level: 2 },
    { id: "groups", text: "Capture groups", level: 2 },
    { id: "catastrophic", text: "Catastrophic defense", level: 2 },
  ],
  html,
  faqs: [
    { question: "What do regex flags g, i, m, s do?", answer: "g finds all matches rather than first, i ignores case so error matches ERROR, m anchors ^/$ per line for 4000-line timestamps, and s lets dot cross newlines for stack traces. Most dead patterns miss a flag rather than the pattern itself. Debug by toggling g, then i, then m in sequence." },
    { question: "Named vs numbered capture groups?", answer: "Named groups like (?<year>...) survive refactoring since names don't renumber, while numbered groups shift when additions arrive in front. Non-capturing (?:...) groups without capturing to keep indexes stable with slight speed wins. Backreferences like \\1 match repeats, finding doubled words such as the the reliably." },
    { question: "Why does my regex freeze the browser?", answer: "Catastrophic backtracking from nested quantifiers like (a+)+$ explodes exponentially on non-matches rather than failing. Overlapping alternations and greedy .* before required suffixes trigger ReDoS similarly. Use lazy quantifiers, explicit classes and anchors, cap input size, and test in worker-isolated runners with timeouts for safe pattern development workflows." },
    { question: "How do I match across 4000 log lines?", answer: "Multiline flag m for per-line anchors, g for all matches, and named groups for order and date fields. Test against a real 4000-line log sample rather than one line, since .*date.* alone matches the whole file as one blob. One pattern with two named groups returned 37 clean rows in one pass." },
    { question: "Are regexes safe for validation?", answer: "For security-critical input like emails, URLs and auth, prefer purpose-built parsers plus allowlists. Regex alone under-validates edge cases attackers love and needs paragraphs of explanation for complex rules. If a pattern grows unwieldy, split it into two patterns plus a line of code instead for dependable production validation." },
  ],
};
