import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“Just MD5 it, it's only a checksum.” Six months later that checksum guarded password resets. <strong>Hash choice is a security decision wearing a utility costume</strong>: MD5 for legacy manifests, SHA-256 for integrity, bcrypt for passwords — and the wrong pick fails silently for years. This guide gives digest lengths that identify algorithms on sight, the avalanche intuition, and the hash-vs-HMAC-vs-encryption ladder, with <code>hello</code> worked through every level.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. Compare in the <a href="/hash-generator">hash generator</a>; step up keyed hashing in <a href="/hmac-generator">HMAC</a>; encrypt secrets with <a href="/aes-encryptor">AES</a>.</p>

<h2 id="lengths">Digest lengths identify algorithms on sight</h2>
<table>
<thead><tr><th>Algorithm</th><th>Hex length</th><th><code>hello</code> starts</th><th>Use for</th></tr></thead>
<tbody>
<tr><td><strong>MD5</strong></td><td>32</td><td><code>5d41402a…</code></td><td>Legacy checks only</td></tr>
<tr><td><strong>SHA-1</strong></td><td>40</td><td><code>aaf4c61d…</code></td><td>Legacy (git internals)</td></tr>
<tr><td><strong>SHA-256</strong></td><td>64</td><td><code>2cf24dba…</code></td><td>Integrity, fingerprints</td></tr>
<tr><td><strong>SHA-512</strong></td><td>128</td><td><code>9b71d224…</code></td><td>High-assurance digests</td></tr>
</tbody>
</table>
<p>Count the hex: 32/40/64/128 tells you the algorithm before any label does. Case varies by tool (uppercase manifests vs lowercase APIs) — normalize before comparing, and compare full strings, never prefixes.</p>

<h2 id="avalanche">Avalanche: <code>hello</code> vs <code>hallo</code> rewrites everything</h2>
<p>Flip one letter and the digest scrambles completely — <code>hello</code> and <code>hallo</code> share no recognizable prefix. That avalanche is the security property: no partial credit for close guesses. It also kills two folk practices: leet substitutions (<code>a→4</code>) barely change crack time because attackers normalize them, and truncated digests (“first 8 chars match!”) prove nothing. Test both inputs side by side in the <a href="/hash-generator">hash generator</a> to build the intuition permanently.</p>

<h2 id="ladder">The ladder: hash vs HMAC vs AES (when to climb)</h2>
<ul>
<li><strong>Hash (SHA-256):</strong> fingerprinting downloads, cache keys, dedupe. Anyone can recompute — proves integrity against accidents, not attackers.</li>
<li><strong>HMAC:</strong> hash plus secret key — proves the message came from a key holder. Webhooks, API signatures. Step up in the <a href="/hmac-generator">HMAC tool</a>.</li>
<li><strong>AES encryption:</strong> reversible secrecy for stored/transmitted data. Passwords get bcrypt/argon2 instead (slow by design). Encrypt in the <a href="/aes-encryptor">AES tool</a>.</li>
</ul>
<p>Passwords are the classic misplacement: fast hashes (even SHA-256) fall to GPUs in hours; password hashing must be slow (bcrypt cost factors) plus salted per user. If your login table uses MD5/SHA, migrating to argon2 outranks every feature on the roadmap.</p>
<blockquote class="tip">General guidance only, not a security audit. Hash choices for regulated data need professional review — this page builds intuition, not compliance.</blockquote>
`;

export const hashCompare: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "sha256-vs-md5-hashes",
  kind: "cluster",
  title: "SHA-256 vs MD5: When to Use Which Hash",
  description:
    "SHA-256 vs MD5 with digest-length table, avalanche demos, hash-vs-HMAC-vs-AES ladder + password hashing warning. Free compare tool.",
  keywords: [
    "sha256 vs md5 when to use which hash",
    "sha256 of hello",
    "40 vs 64 vs 128 hex length",
    "avalanche hallo change",
    "hash vs hmac vs aes",
    "When is MD5 acceptable?",
  ],
  toolSlugs: ["hash-generator", "hmac-generator", "aes-encryptor"],
  relatedSlugs: ["json-parse-errors", "base64-url-safe-vs-standard", "uuid-seed-test-database"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "lengths", text: "Digest lengths", level: 2 },
    { id: "avalanche", text: "Avalanche effect", level: 2 },
    { id: "ladder", text: "Hash-HMAC-AES ladder", level: 2 },
  ],
  html,
  faqs: [
    { question: "When is MD5 acceptable?", answer: "Only legacy checksum compatibility, never for passwords or security decisions. Six months after just-MD5-it thinking, checksums often guard password resets and fail silently for years. Use SHA-256 for integrity and fingerprints, bcrypt or argon2 slow salted hashes for passwords, and migrate MD5 login tables immediately." },
    { question: "How do I tell hash algorithms apart?", answer: "Count hex chars: 32 means MD5 starting 5d41402a, 40 means SHA-1, 64 means SHA-256 starting 2cf24dba, and 128 means SHA-512. Case varies between uppercase manifests and lowercase APIs, so normalize before comparing. Always compare full strings, never prefixes, since truncated matches prove nothing for reliable identification across tools." },
    { question: "Do leet substitutions strengthen passwords?", answer: "Barely, since attackers normalize a-to-4 automatically and avalanche gives no partial credit for close guesses. Length and randomness dominate crack time, not substitutions. Test hello versus hallo side by side in the hash generator — one flipped letter scrambles the digest completely without recognizable prefixes." },
    { question: "Hash vs HMAC vs encryption?", answer: "Hash with SHA-256 proves integrity for downloads, cache keys and dedupe against accidents, not attackers. HMAC adds a secret key to prove keyed origin for webhooks and API signatures. Encryption with AES provides reversible secrecy, while passwords need slow salted bcrypt or argon2 instead of fast hashes." },
    { question: "Why did half my digest match?", answer: "Truncated comparisons prove nothing because avalanche means close inputs like hello and hallo share no prefix structure. First-eight-char matches show coincidence, not integrity. Always compare full digests after normalizing case, and test both inputs side by side to build lasting avalanche intuition for secure verification workflows." },
  ],
};
