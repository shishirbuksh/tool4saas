import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p><code>Unexpected token } in JSON at position 412.</code> No line number, no context, just a position to count by hand. Every developer meets this error monthly; the fix takes seconds once you know the three causes that produce 90% of failures: <strong>trailing commas, comments, and single quotes</strong>. This guide teaches reading the error, fixing each cause, and validating at scale — with the line:column pinpointing that turns counting into clicking.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. Validate in the <a href="/json-formatter">JSON formatter</a>; inspect trees in the <a href="/json-tree-viewer">JSON tree viewer</a>; convert configs in <a href="/json-to-yaml">JSON to YAML</a>.</p>

<h2 id="read-error">Read the error: position → line:column</h2>
<p>V8 reports a character offset, not a location. Pasting into the <a href="/json-formatter">formatter</a> translates position 412 to line 18, column 7 with the offending token highlighted — and names the cause class. The 500KB API reply that defeats eyeballing submits instantly; collapse completed subtrees to isolate the broken branch. For recurring feeds, validate on a schedule and diff against the last green payload — most production JSON breaks come from upstream schema drift, not your code.</p>

<h2 id="three-causes">Three causes, three fixes (with examples)</h2>
<table>
<thead><tr><th>Cause</th><th>Broken</th><th>Fixed</th></tr></thead>
<tbody>
<tr><td><strong>Trailing comma</strong></td><td><code>{"a": 1,}</code></td><td><code>{"a": 1}</code> — minify to confirm</td></tr>
<tr><td><strong>Comments</strong></td><td><code>{// x<br>"a": 1}</code></td><td>Strip all comments (JSONC ≠ JSON)</td></tr>
<tr><td><strong>Single quotes</strong></td><td><code>{'a': 1}</code></td><td>Double-quote keys + strings</td></tr>
<tr><td><strong>Duplicate keys</strong></td><td><code>{"a":1,"a":2}</code></td><td>Dedupe — last wins silently</td></tr>
</tbody>
</table>
<p>After fixing, minify and re-pretty-print: a clean round-trip proves validity better than any single check. Payloads over 10MB should split before pasting — oversized dumps hang tabs in every tool, not just ours.</p>

<h2 id="scale">At scale: 500KB replies, duplicate keys, minify math</h2>
<p>Large API responses fail differently: truncated transfers (compare Content-Length), duplicated keys across merged objects (last-wins silently corrupts), and encoding mismatches (BOM prefixes break strict parsers — strip <code>\\uFEFF</code>). Minified output runs ~20% smaller than pretty-printed — meaningful at 500KB over metered connections. Keep a known-good sample response per endpoint; when parse fails, diff structure first (added field? renamed key?) and syntax second. For config files, consider YAML source with JSON build output — humans edit YAML, machines consume JSON, and the <a href="/json-to-yaml">converter</a> bridges them.</p>
<blockquote class="tip">General guidance only. Validate untrusted payloads before processing — malformed JSON is also a classic injection vector; parse strictly, never eval.</blockquote>
`;

export const jsonParseErrors: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "json-parse-errors",
  kind: "cluster",
  title: "Why JSON.parse Fails: Trailing Commas and Quotes",
  description:
    "Fix JSON.parse errors fast: position to line:column, trailing commas, comments, quotes + 500KB-scale validation. Free local formatter.",
  keywords: [
    "why json parse fails trailing commas single quotes",
    "json line column error fix",
    "minify vs pretty 20 percent bytes",
    "duplicate keys last wins",
    "500KB api reply collapse",
    "Can JSON have comments?",
  ],
  toolSlugs: ["json-formatter", "json-tree-viewer", "json-to-yaml"],
  relatedSlugs: ["base64-url-safe-vs-standard", "regex-flags-capture-groups", "jwt-expiry-without-trust"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "read-error", text: "Position to line:column", level: 2 },
    { id: "three-causes", text: "Three causes, fixes", level: 2 },
    { id: "scale", text: "Validation at scale", level: 2 },
  ],
  html,
  faqs: [
    { question: "Why does JSON.parse fail on trailing commas?", answer: "Strict JSON forbids them, unlike JavaScript literals where they are tolerated. Delete the comma and paste into the formatter, which translates positions like 412 into line 18 column 7 with highlighting. Minify and re-pretty-print afterward, since a clean round-trip proves validity better than any single check." },
    { question: "Can JSON have comments?", answer: "No — JSONC with comments is a different format that strict parsers reject. Strip all comments before parsing, since even one line breaks validation. Configs needing comments should live as YAML source with JSON build output, where humans edit YAML, machines consume JSON, and the converter bridges them." },
    { question: "How do I find the error in a 500KB file?", answer: "Paste into a formatter for line:column pinpointing with the offending token highlighted, then collapse subtrees to isolate the broken branch. Diff against the last known-good payload to spot upstream schema drift, truncated transfers or renamed keys. For recurring feeds, validate on a schedule rather than eyeballing." },
    { question: "What do duplicate JSON keys do?", answer: "Last value wins silently with no error but wrong data, since parsers keep the final occurrence. Dedupe keys and use validators that flag them explicitly. Across merged objects, duplicated keys corrupt results invisibly, so compare Content-Length for truncation and strip BOM prefixes that break strict parsers." },
    { question: "Should I minify JSON?", answer: "For transport, yes — minified output runs about 20% smaller than pretty-printed, which matters at 500KB over metered connections. Pretty-print for debugging readability. A clean minify-pretty round-trip proves validity, while payloads over 10MB should split before pasting to avoid hanging tabs in every tool during development." },
  ],
};
