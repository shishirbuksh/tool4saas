import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Share link, pasted: <code>https://shop.com/search?q=red shoes&amp;sort=price</code>. Clicked: search for “red”, sort parameter eaten. The unencoded space and raw <code>&amp;</code> split the query in two — a bug invisible in every test with single-word queries. <strong>URL encoding is boundary plumbing</strong>: <code>%20</code> vs <code>+</code>, reserved vs unreserved, single vs double encoding. This guide fixes the five encoding bugs behind most “works with test data” link failures.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. Encode and parse with the <a href="/url-encoder">URL encoder</a> and <a href="/url-parser">URL parser</a>.</p>

<h2 id="space-plus">Spaces: <code>%20</code> in paths, <code>+</code> in forms</h2>
<p>The #1 encoding bug: spaces mean different things per context. In URL paths and most APIs, space → <code>%20</code> (<code>red%20shoes</code>). In HTML form bodies (<code>application/x-www-form-urlencoded</code>), space → <code>+</code>. Servers decoding form-style <code>+</code> in paths turn “C++” into “C  ” — a real bug I have fixed twice. Rule: encode for the context you send to, and test with multi-word values containing <code>&amp;</code> and <code>#</code>, not just “hello world”. <code>café</code> → <code>caf%C3%A9</code> always (UTF-8 bytes, never Latin-1).</p>

<h2 id="reserved">Reserved characters: encode values, never structure</h2>
<table>
<thead><tr><th>Char</th><th>Meaning unencoded</th><th>In values, send</th></tr></thead>
<tbody>
<tr><td><strong>&amp;</strong></td><td>Parameter separator</td><td><code>%26</code></td></tr>
<tr><td><strong>=</strong></td><td>Key/value split</td><td><code>%3D</code></td></tr>
<tr><td><strong>#</strong></td><td>Fragment start (never sent!)</td><td><code>%23</code></td></tr>
<tr><td><strong>?</strong></td><td>Query start</td><td><code>%3F</code></td></tr>
<tr><td><strong>%</strong></td><td>Escape introducer</td><td><code>%25</code> (never double-encode)</td></tr>
</tbody>
</table>
<p>Encode <em>values</em>, not structure: <code>?q=red%20shoes&amp;sort=price</code> keeps separators literal and content encoded. Double-encoding (<code>%2520</code>) happens when two layers each encode — trace which layer owns encoding and make it exactly one. Debug with the <a href="/url-parser">parser</a>: paste the broken URL and watch where parameters actually split.</p>

<h2 id="limits-i18n">Limits, i18n and the 2000-character cliff</h2>
<p>Practical ceilings: ~2000 characters total (older proxies/IE truncate beyond), ~40 non-ASCII symbols before readability collapses, UTF-8 everywhere (emoji = 4 bytes each — budget URL length accordingly). Internationalized domain names punycode-encode (<code>müller.de</code> → <code>xn--mller-kva.de</code>) while paths percent-encode — different mechanisms, both required. For share links with 200+ characters of state, stop encoding and POST the payload or use a short-link store: URLs are addresses, not databases. Fragments (<code>#section</code>) never reach servers — don't put access tokens where only JavaScript can see them (and prefer not to put tokens in URLs at all; see <a href="/blog/json-formatter-guide/jwt-expiry-without-trust">token hygiene</a>).</p>
<blockquote class="tip">General guidance only. Test encoded URLs by clicking through, not just copying — intermediaries (chat apps, email clients) re-encode unpredictably.</blockquote>
`;

export const urlEncoding: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "url-encoding-spaces-symbols",
  kind: "cluster",
  title: "URL Encoding: Spaces, Symbols and Double-Escape Bugs",
  description:
    "URL encoding rules: %20 vs + per context, reserved-character table, double-escape diagnosis + i18n and length limits. Free encoder/parser.",
  keywords: [
    "why spaces become percent 20 or plus in urls",
    "encode ampersand equals hash",
    "rfc3986 utf-8 query",
    "plus in form vs path",
    "2000 char url 40 symbols",
    "Should spaces be %20 or +?",
  ],
  toolSlugs: ["url-encoder", "url-parser", "base64-tool"],
  relatedSlugs: ["base64-url-safe-vs-standard", "jwt-expiry-without-trust", "regex-flags-capture-groups"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "space-plus", text: "%20 vs +", level: 2 },
    { id: "reserved", text: "Reserved characters", level: 2 },
    { id: "limits-i18n", text: "Limits and i18n", level: 2 },
  ],
  html,
  faqs: [
    { question: "Should spaces be %20 or +?", answer: "%20 in paths and most APIs like red%20shoes, plus only in form bodies with application/x-www-form-urlencoded. Servers decoding form-style plus in paths turn C++ into spaced letters, a bug fixed twice. Test with multi-word values containing ampersands and hashes, encoding café as caf%C3%A9 via UTF-8 bytes." },
    { question: "How do I encode & in a URL value?", answer: "As %26 since unencoded ampersands split parameters and eat sort values. Same logic applies to equals as %3D and hash as %23 inside values, while keeping structural separators literal like ?q=red%20shoes&sort=price. Debug with the parser by pasting broken URLs to see actual splits for reliable query handling." },
    { question: "What is double-encoding?", answer: "%2520 occurs when two layers each encode once, turning intended %20 into literal text. Trace ownership so exactly one layer encodes and decode once to diagnose. Never double-encode percent itself except as %25 in values, and ensure UTF-8 bytes underlie every non-ASCII conversion for consistency." },
    { question: "How long can a URL be?", answer: "About 2000 characters practical ceiling since older proxies and IE truncate beyond, with 40 non-ASCII symbols before readability collapses. Budget UTF-8 bytes carefully since emoji cost four bytes each. Beyond that length or with 200+ characters of state, POST payloads or use short-link stores instead." },
    { question: "Why did my #fragment disappear server-side?", answer: "Fragments never transmit since browsers strip them before sending, leaving only JavaScript able to read them. Don't put tokens or state after hash symbols where servers cannot see them. Prefer avoiding tokens in URLs entirely per token hygiene, and use short links or POST for sensitive state." },
  ],
};
