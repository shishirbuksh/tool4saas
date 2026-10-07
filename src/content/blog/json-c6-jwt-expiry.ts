import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Staging worked, production rejected every token. Diffing the two JWTs showed identical structure — except <code>exp</code>: staging tokens lived 24 hours, production 15 minutes, and the reviewer's clock ran 4 minutes slow. Three lessons in one outage: <strong>decode shows claims, expiry decides, and clocks lie</strong>. This guide teaches checking <code>exp/iat</code>, audience, and the <code>alg:none</code> kill-switch — decoding plus verification, in that order, without ever trusting a token you only read.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. Inspect in the <a href="/jwt-decoder">JWT decoder</a> (redact before screenshots); convert epochs in the <a href="/timestamp-converter">timestamp converter</a>.</p>

<h2 id="claims">Read claims: <code>exp</code>, <code>iat</code>, <code>aud</code>, <code>iss</code></h2>
<table>
<thead><tr><th>Claim</th><th>Means</th><th>Check</th></tr></thead>
<tbody>
<tr><td><strong>exp</strong></td><td>Expiry epoch seconds</td><td><code>exp: 1717252800</code> past = dead, no exceptions</td></tr>
<tr><td><strong>iat</strong></td><td>Issued-at</td><td>Future <code>iat</code> means clock skew or forgery</td></tr>
<tr><td><strong>aud</strong></td><td>Intended audience</td><td>Must equal your service ID exactly</td></tr>
<tr><td><strong>iss</strong></td><td>Issuer</td><td>Must equal your IdP, character-for-character</td></tr>
<tr><td><strong>sub</strong></td><td>Subject user ID</td><td>Opaque string like <code>123</code>, not an email to trust blindly</td></tr>
</tbody>
</table>
<p>Convert <code>exp</code> in the <a href="/timestamp-converter">timestamp converter</a> — epoch integers hide “expired 2 hours ago” behind inscrutable digits. Allow ~30 seconds clock skew (sync NTP on all parties); beyond that, fix clocks, not tolerances.</p>

<h2 id="alg-none">Kill <code>alg:none</code> on sight</h2>
<p>An unsigned token with <code>{"alg":"none"}</code> verifies against nothing — any attacker mints admin claims in seconds. History is littered with libraries that accepted it during algorithm-confusion attacks (attacker swaps RS256→HS256, signs with the public key as HMAC secret). Rules: reject <code>none</code> unconditionally, pin expected algorithms server-side, fetch signing keys only from the IdP's published JWKS over HTTPS. Client-side decoding can display <code>alg</code>; only the backend decides. If your decoder ever shows <code>none</code> on a production token, treat it as an incident, not a curiosity.</p>

<h2 id="decode-verify">Decode ≠ verify (the two-step discipline)</h2>
<ol>
<li><strong>Decode (client-safe):</strong> paste into the <a href="/jwt-decoder">decoder</a>, read claims, check expiry/audience/issuer visually. Catches 80% of integration bugs (wrong env, stale token, clock skew).</li>
<li><strong>Verify (backend only):</strong> signature against IdP keys, algorithm allowlist, expiry enforcement, audience match — every request, no caching of verdicts.</li>
<li><strong>Redact before sharing:</strong> tokens in screenshots, tickets and logs leak sessions. Redact signature segments, rotate exposed tokens immediately.</li>
</ol>
<p>Staging-vs-production mismatches (24h vs 15min lifetimes, different <code>aud</code>) cause most “works here, fails there” mysteries — diff the decoded claims side by side before touching code. Full flag/claim drills in <a href="/blog/json-formatter-guide/regex-flags-capture-groups">regex groups</a> for log correlation and <a href="/blog/json-formatter-guide/base64-url-safe-vs-standard">Base64 modes</a> for segment decoding.</p>
<blockquote class="tip">General guidance only, not a security audit. Token architectures for regulated data need professional review.</blockquote>
`;

export const jwtExpiry: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "jwt-expiry-without-trust",
  kind: "cluster",
  title: "Check JWT Expiry Without Trusting the Token",
  description:
    "JWT expiry checks: exp/iat/aud/iss table, alg:none kill rule + decode-vs-verify discipline with redaction habits. Free local decoder.",
  keywords: [
    "how to check jwt expiry without verifying signature",
    "exp 1717252800 expired 2h",
    "alg none reject",
    "aud vs iss mismatch staging",
    "decode vs verify",
    "How do I check if a JWT is expired?",
  ],
  toolSlugs: ["jwt-decoder", "timestamp-converter", "base64-tool"],
  relatedSlugs: ["base64-url-safe-vs-standard", "json-parse-errors", "regex-flags-capture-groups"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "claims", text: "Claims table", level: 2 },
    { id: "alg-none", text: "Kill alg:none", level: 2 },
    { id: "decode-verify", text: "Decode vs verify", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I check if a JWT is expired?", answer: "Decode and compare exp epoch seconds like 1717252800 against now, allowing about 30 seconds clock skew with NTP synced. Past exp means dead with no exceptions regardless of signature appearance. Convert inscrutable integers in the timestamp converter to reveal expired-two-hours-ago status, then diff staging versus production lifetimes." },
    { question: "Should I accept alg:none tokens?", answer: "Never in production since unsigned tokens with alg none verify against nothing and enable trivial forgery in seconds. Reject unconditionally, pin expected algorithms server-side, and fetch signing keys only from the IdP published JWKS over HTTPS. If a decoder shows none on production tokens, treat it as an incident." },
    { question: "Does decoding a JWT verify it?", answer: "No, since decoding only displays claims while backend signature verification against IdP keys authorizes. Client-safe decoding catches 80% of integration bugs like wrong environment, stale tokens and clock skew. Every request still needs algorithm allowlists plus expiry, audience and issuer enforcement without caching verdicts for secure authentication workflows." },
    { question: "Why do tokens work in staging but fail in production?", answer: "Usually different lifetimes like 24 hours versus 15 minutes, mismatched audiences, or clock skew up to four minutes. Diff decoded claims side by side before touching code, checking exp, aud and iss character-for-character. Sync NTP on all parties rather than widening tolerances beyond 30 seconds." },
    { question: "Can I share JWT screenshots for debugging?", answer: "Only redacted since tokens in screenshots, tickets and logs leak sessions immediately. Redact signature segments, rotate any exposed token immediately, and verify audience and issuer visually before sharing. Remember decoding never authorizes — only backend verification against IdP keys with algorithm checks permits access for safe debugging practices." },
  ],
};
