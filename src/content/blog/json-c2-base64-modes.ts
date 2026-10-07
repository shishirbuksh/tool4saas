import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Auth broke at midnight: tokens generated with <code>+</code> and <code>/</code> sailed through tests, then shattered in production URLs — plus became space, slash split the path, padding got stripped by a proxy. The fix was three characters of alphabet swap: <strong>URL-safe Base64</strong>. Standard vs URL-safe is the most common encoding bug I review, and it hides until deployment. This guide maps both alphabets, padding rules, size math and the JWT connection.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. Encode in the <a href="/base64-tool">Base64 tool</a> (mode toggle); inspect tokens in the <a href="/jwt-decoder">JWT decoder</a>.</p>

<h2 id="alphabets">Two alphabets: <code>+/=</code> vs <code>-_</code> (no pad)</h2>
<table>
<thead><tr><th></th><th>Standard (RFC 4648)</th><th>URL-safe</th></tr></thead>
<tbody>
<tr><td><strong>Chars 62–63</strong></td><td><code>+</code> <code>/</code></td><td><code>-</code> <code>_</code></td></tr>
<tr><td><strong>Padding</strong></td><td><code>=</code> required</td><td>Omitted</td></tr>
<tr><td><strong>Safe in URLs</strong></td><td>No (space/path splits)</td><td>Yes</td></tr>
<tr><td><strong>Safe in email/MIME</strong></td><td>Yes (76-char wrap)</td><td>Decoders may choke</td></tr>
<tr><td><strong>Example (<code>fa fb fc</code>)</strong></td><td><code>+vv8</code></td><td><code>-vv8</code></td></tr>
</tbody>
</table>
<p>Rule: standard for MIME, email and data-URLs; URL-safe for tokens, query params, filenames and slugs. Mixing modes (URL-safe encode, standard decode) is the midnight-outage pattern — standardize per boundary and document which side owns encoding.</p>

<h2 id="size-math">Size math: 33% overhead, UTF-8 first</h2>
<p>Base64 inflates ~33%: every 3 bytes become 4 characters. Budget it: a 3MB binary becomes 4MB of text — fine for tokens, fatal for “embed the video in JSON” designs. UTF-8 encodes first: <code>café</code> → bytes <code>63 61 66 C3 A9</code> → <code>Y2Fmw6k=</code>; emoji cost 4 bytes each, so “🎉” alone becomes 8 characters. Forgetting the UTF-8 step produces mojibake that decodes “successfully” into garbage — always encode text as UTF-8 bytes, decode bytes as UTF-8 text. The 76-character mail wrap is transport-only; strip whitespace before decoding stored values.</p>

<h2 id="jwt-link">JWT segments are Base64URL (and why padding vanishes)</h2>
<p>Every JWT is three Base64URL segments joined by dots — header, payload, signature. No padding, <code>-_</code> alphabet, always. So <code>exp: 1717252800</code> rides inside segment two, and decoding it needs a URL-safe decoder (standard decoders reject unpadded input or misread <code>-_</code>). Workflow: decode segments in the <a href="/base64-tool">Base64 tool</a> with URL-safe mode, then hand the full token to the <a href="/jwt-decoder">JWT decoder</a> for claim inspection — and remember decoding ≠ verifying (see <a href="/blog/json-formatter-guide/jwt-expiry-without-trust">expiry checks</a>).</p>
<blockquote class="tip">General guidance only. Base64 is encoding, not encryption — anyone can decode it. Never put secrets in tokens or URLs.</blockquote>
`;

export const base64Modes: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "base64-url-safe-vs-standard",
  kind: "cluster",
  title: "Base64 URL-Safe vs Standard: Padding and Modes",
  description:
    "Base64 standard vs URL-safe: alphabet table, padding rules, 33% size math, UTF-8 step + JWT segment link. Free mode-toggle encoder.",
  keywords: [
    "when to use base64 url safe vs standard",
    "hello to aGVsbG8 padding",
    "fa fb fc plus vv8 vs minus vv8",
    "jwt segment base64",
    "33 percent overhead budget",
    "Why did my token break in a URL?",
  ],
  toolSlugs: ["base64-tool", "jwt-decoder", "url-encoder"],
  relatedSlugs: ["json-parse-errors", "jwt-expiry-without-trust", "url-encoding-spaces-symbols"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "alphabets", text: "Two alphabets", level: 2 },
    { id: "size-math", text: "Size math + UTF-8", level: 2 },
    { id: "jwt-link", text: "JWT segment link", level: 2 },
  ],
  html,
  faqs: [
    { question: "When do I use URL-safe Base64?", answer: "For tokens, query params, filenames and slugs using dash-underscore without padding. Standard with plus-slash and equals serves MIME, email and data URLs with 76-character wrap. Mixing modes causes midnight outages, so standardize per boundary and document which side owns encoding for reliability across production and staging environments." },
    { question: "Why did my token break in a URL?", answer: "Standard plus became space and slash split the path, while proxies stripped padding unexpectedly. Re-encode URL-safe with dash-underscore and no padding, or percent-encode the standard output. Test with production URLs containing plus and slash, since single-word test data hides the bug until deployment across different gateways and browsers." },
    { question: "How much bigger is Base64?", answer: "About 33% overhead since every three bytes become four characters, so a 3MB binary becomes 4MB of text. Budget carefully since embedding video in JSON turns fatal quickly. Remember UTF-8 encodes first — café becomes Y2Fmw6k= and emoji cost four bytes each — then strip whitespace before decoding." },
    { question: "Is Base64 encryption?", answer: "No — encoding is trivially reversible by anyone, unlike encryption with keys. Never put secrets in tokens or URLs since decoding requires no permission. For example, exp 1717252800 rides visibly inside JWT segment two. Encrypt separately with proper tools and treat encoded values as public text." },
    { question: "Why does JWT use no padding?", answer: "JWT segments are Base64URL by specification with dash-underscore alphabet and padding omitted always. Three dot-joined segments carry header, payload and signature, so standard decoders reject unpadded input or misread characters. Use a URL-safe decoder mode, then hand the full token to the JWT decoder for reliable claim inspection workflows." },
  ],
};
