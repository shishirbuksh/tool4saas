import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A production API returned a 500KB JSON error blob at 2 AM, and the on-call engineer pasted it — credentials and all — into a random online formatter. The formatting worked. So did the credential leak, into a stranger's server logs. I have seen this movie too many times: <strong>debugging with tools that upload your secrets</strong>. This guide is the alternative: format JSON, decode Base64 and JWTs, test regex, hash and mint UUIDs — everything locally, nothing uploaded, secrets stay in your tab.</p>
<p>Here is the promise: you will learn a <strong>local-first debugging workflow</strong> covering the seven operations developers repeat daily, with exact behaviors (trailing commas, padding, <code>exp</code> skew, bulk UUID counts) and the security boundaries that matter. I ran every example below in October 2026 against real payloads. Work alongside me starting at our <a href="/json-formatter">free JSON formatter</a>.</p>
<p>Part of the <a href="/blog">blog guides</a>. Format in <a href="/json-formatter">JSON formatter</a>; decode in <a href="/base64-tool">Base64</a> and <a href="/jwt-decoder">JWT decoder</a>; test in <a href="/regex-tester">regex tester</a>.</p>

<h2 id="workflow">The local-first debugging loop (paste → inspect → fix → verify)</h2>
<ol>
<li><strong>Paste into the local tool, never a cloud box:</strong> API replies, tokens, hashes and patterns stay in your browser tab. Close the tab and they are gone — no retention policy to read.</li>
<li><strong>Let the tool point at line:column:</strong> a missing comma at 1:18 beats staring at 10,000 lines. Fix, re-paste, confirm green.</li>
<li><strong>Decode one layer at a time:</strong> JWT → Base64 segments → JSON claims. Each layer gets its own tool and its own verification.</li>
<li><strong>Verify, don't trust:</strong> decoding is not verifying — a decoded signature proves nothing. Expiry, audience and algorithm checks are separate steps below.</li>
</ol>

<h2 id="json-errors">Why JSON.parse fails: trailing commas, comments, single quotes</h2>
<p>Strict JSON accepts exactly one grammar — JavaScript object literals are not it. The three killers I see weekly:</p>
<table>
<thead><tr><th>Cause</th><th>Example</th><th>Fix</th></tr></thead>
<tbody>
<tr><td><strong>Trailing comma</strong></td><td><code>{"a": 1,}</code></td><td>Delete the comma; minifiers flag it</td></tr>
<tr><td><strong>Comments</strong></td><td><code>{// note\n"a": 1}</code></td><td>Strip comments (JSONC is not JSON)</td></tr>
<tr><td><strong>Single quotes</strong></td><td><code>{'a': 1}</code></td><td>Double-quote all keys and strings</td></tr>
<tr><td><strong>Duplicate keys</strong></td><td><code>{"a": 1, "a": 2}</code></td><td>Last wins silently — dedupe</td></tr>
</tbody>
</table>
<p>Paste the payload into the <a href="/json-formatter">JSON formatter</a> — it pinpoints line and column, pretty-prints 500KB replies instantly, and minifies ~20% smaller for transport. Split payloads over 10MB before pasting; oversized dumps hang tabs regardless of tool. Errors guide: <a href="/blog/json-formatter-guide/json-parse-errors">JSON.parse error fixes</a>. Tree-view large responses in the <a href="/json-tree-viewer">JSON tree viewer</a>, and convert configs with the <a href="/json-to-yaml">JSON to YAML tool</a>.</p>

<h2 id="base64-modes">Base64 standard vs URL-safe: padding, <code>+/\</code> vs <code>-_</code></h2>
<p>Standard Base64 (<code>A–Z a–z 0–9 + /</code> with <code>=</code> padding) breaks in URLs — <code>+</code> becomes a space, <code>/</code> splits paths. URL-safe mode swaps <code>+/</code> for <code>-_</code> and drops padding. Rule: standard for MIME/email/data-URLs, URL-safe for tokens, query params and filenames. Costs to remember: ~33% size overhead, UTF-8 emoji encode as 4 bytes first (café → <code>Y2Fmw6k=</code>), and 76-char mail wrapping is a transport concern, not storage. JWT segments are Base64URL without padding by spec — decode them in the <a href="/base64-tool">Base64 tool</a>, then inspect claims in the <a href="/jwt-decoder">JWT decoder</a>. Modes: <a href="/blog/json-formatter-guide/base64-url-safe-vs-standard">URL-safe vs standard</a>.</p>

<h2 id="hashing">SHA-256 vs MD5: digest lengths and when legacy is acceptable</h2>
<p><code>hello</code> → SHA-256 <code>2cf24dba…</code> (64 hex chars), MD5 <code>5d41402a…</code> (32). Lengths identify algorithms at a glance: 40 SHA-1, 64 SHA-256, 128 SHA-512. Use SHA-256 for integrity checks and fingerprints; MD5 only for legacy manifest compatibility — never for passwords (use bcrypt/argon2 server-side). Flip one letter (<code>hallo</code>) and the avalanche effect rewrites the whole digest. Compare side by side in the <a href="/hash-generator">hash generator</a>, step up to keyed HMAC in the <a href="/hmac-generator">HMAC tool</a>, and encrypt (not just hash) secrets with the <a href="/aes-encryptor">AES encryptor</a>. Guide: <a href="/blog/json-formatter-guide/sha256-vs-md5-hashes">hash comparison</a>.</p>

<h2 id="uuid-seeding">Seeding test DBs: how many UUIDs without collisions</h2>
<p>v4 UUIDs carry 122 random bits — you can mint millions per second for fixtures with effectively zero collision risk (birthday math needs ~2.7 quintillion for 50% odds). Practical flow: generate 10,000 in bulk, bulk-copy into seed scripts, dedupe on insert as belt-and-braces. Prefer UUIDs over auto-increment IDs in test data to avoid order-dependent flakes; prefer <code>random-string</code> only for human-readable codes, never for unguessable tokens. Bulk mint in the <a href="/uuid-generator">UUID generator</a>. Seeding guide: <a href="/blog/json-formatter-guide/uuid-seed-test-database">UUID seeding</a>.</p>

<h2 id="regex-flags">Regex flags <code>g/i/m/s</code> and capture groups that actually capture</h2>
<p>Two thirds of regex pain is flags, not patterns. <code>g</code> finds all matches (<code>\d+</code> pulls 42 from “Order 42”), <code>i</code> ignores case, <code>m</code> makes <code>^/$</code> per-line for 4000-line logs, <code>s</code> lets <code>.</code> cross newlines. Named groups (<code>(?&lt;year&gt;\d{4})-(?&lt;month&gt;\d{2})</code>) beat numbered ones for <code>2024-05-01</code> extraction; non-capturing <code>(?:…)</code> keeps indexes stable. Greedy <code>.*</code> backtracks catastrophically on large inputs — prefer lazy <code>.*?</code> or explicit classes. Our <a href="/regex-tester">regex tester</a> highlights matches with per-flag control and runs catastrophic patterns in a worker with timeouts instead of freezing your tab. Flags lab: <a href="/blog/json-formatter-guide/regex-flags-capture-groups">capture groups guide</a>.</p>

<h2 id="jwt-expiry">JWT expiry without trust: <code>exp</code>, skew and <code>alg:none</code></h2>
<p>Decoding shows claims; verification proves them — do both, in that order. Check <code>exp</code> against now (allow ~30s clock skew, sync NTP), confirm <code>aud</code> is your service and <code>iss</code> your IdP, and <strong>reject <code>alg:none</code> unconditionally</strong> — unsigned tokens must never authorize. <code>exp: 1717252800</code> two hours past means expired, full stop, regardless of a valid-looking signature from the wrong key. Paste into the <a href="/jwt-decoder">JWT decoder</a> (redact emails before screenshotting), convert timestamps in the <a href="/timestamp-converter">timestamp converter</a>. Expiry guide: <a href="/blog/json-formatter-guide/jwt-expiry-without-trust">JWT checks</a>.</p>

<h2 id="url-encoding">Why <code>café</code> becomes <code>caf%C3%A9</code> (and spaces become <code>%20</code>)</h2>
<p>URLs allow a small ASCII set; everything else percent-encodes as UTF-8 bytes — é is two bytes, hence <code>%C3%A9</code>. Spaces encode as <code>%20</code> in paths but <code>+</code> in form bodies (application/x-www-form-urlencoded) — the #1 encoding bug I review. Encode <code>&amp;</code>, <code>=</code> and <code>#</code> inside values or they split your query; never double-encode (<code>%2520</code>). URLs over ~2000 chars risk proxy truncation — POST the payload instead. Encode and parse safely with the <a href="/url-encoder">URL encoder</a> and <a href="/url-parser">URL parser</a>. Encoding guide: <a href="/blog/json-formatter-guide/url-encoding-spaces-symbols">URL encoding</a>.</p>
<div class="cta-box"><strong>Try it now:</strong> paste a broken API reply into the <a href="/json-formatter">free JSON formatter — line errors, offline, nothing uploads</a> and fix it in seconds.</div>

<h2 id="limits">Limits and honest notes</h2>
<p>Local tools inspect; they do not execute. Decoded JWTs are unverified until your backend checks signatures against the IdP keys. Hash comparisons catch corruption, not malice without a trusted channel. Regex testers validate patterns, not intent — a matching pattern can still be the wrong pattern. And no formatter fixes a 500 status: client-side validation narrows the suspect list, server logs close the case.</p>
<blockquote class="tip">General guidance only. Never paste production secrets into any web tool you have not audited — ours runs locally, but verify in DevTools Network tab.</blockquote>
`;

export const jsonPillar: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "json-formatter-guide",
  kind: "pillar",
  title: "Debug API Responses Locally: JSON, Base64, JWT, Regex Guide",
  description:
    "Debug APIs without uploading secrets: JSON errors at line:col, Base64 modes, SHA-256 vs MD5, UUID seeding, regex flags, JWT expiry + URL encoding. Free tools.",
  keywords: [
    "how to debug api json responses locally",
    "json parse errors line column",
    "base64 url safe vs standard",
    "sha256 vs md5 which to use",
    "jwt expiry check without trust",
    "How do I debug a JSON API error locally?",
  ],
  toolSlugs: ["json-formatter", "base64-tool", "jwt-decoder", "regex-tester"],
  relatedSlugs: ["json-parse-errors", "base64-url-safe-vs-standard", "jwt-expiry-without-trust"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "workflow", text: "Local-first loop", level: 2 },
    { id: "json-errors", text: "JSON.parse failures", level: 2 },
    { id: "base64-modes", text: "Base64 modes", level: 2 },
    { id: "hashing", text: "SHA-256 vs MD5", level: 2 },
    { id: "uuid-seeding", text: "UUID seeding", level: 2 },
    { id: "regex-flags", text: "Regex flags + groups", level: 2 },
    { id: "jwt-expiry", text: "JWT expiry", level: 2 },
    { id: "url-encoding", text: "URL encoding", level: 2 },
    { id: "limits", text: "Limits", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I debug a JSON API error locally?", answer: "Paste the payload into a local formatter for line:column errors — a missing comma at 1:18 beats staring at 10,000 lines. Fix trailing commas, quotes and comments, decode nested Base64/JWT layers one at a time, and verify token expiry and audience separately." },
    { question: "When should I use URL-safe Base64?", answer: "For tokens, query params, filenames and slugs, where it uses -_ without padding. Standard Base64 (+/ with =) belongs in MIME, email and data URLs. Mixing modes across a boundary is the classic midnight outage — standardize per side." },
    { question: "Is MD5 ever acceptable?", answer: "Only for legacy checksum compatibility, never for passwords or security. Use SHA-256 for integrity fingerprints, keyed HMAC for origin proof, and slow bcrypt/argon2 for password storage server-side." },
    { question: "Does decoding a JWT verify it?", answer: "No. Decoding displays claims; your backend must verify the signature against IdP keys plus exp, aud and algorithm checks on every request. Reject alg:none unconditionally — unsigned tokens authorize nothing." },
    { question: "Why does my regex freeze the tab?", answer: "Catastrophic backtracking: nested quantifiers like (a+)+$ explode exponentially on non-matches. Prefer lazy quantifiers and explicit classes, anchor patterns, and test in runners that isolate execution in workers with timeouts." },
    { question: "Are my pasted secrets uploaded?", answer: "Not with local tools: everything runs in your tab and vanishes on close, with no retention policy to read. Verify any web tool yourself in DevTools Network — ours fires zero requests, even with Wi-Fi off after load." },
  ],
};
