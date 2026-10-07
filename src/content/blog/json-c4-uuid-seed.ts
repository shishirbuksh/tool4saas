import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Flaky test, third failure this week. Root cause: seed data with auto-increment IDs — test B assumed the user from test A still had ID 7. Switched the fixtures to bulk UUIDs; flakes vanished that afternoon. <strong>Random IDs decouple tests from insertion order</strong>, and v4 UUIDs make collisions a non-event at any sane volume. This guide covers how many you need, bulk workflows, and when random strings serve better.</p>
<p>Part of the <a href="/blog/json-formatter-guide">developer toolkit guide</a>. Mint in bulk in the <a href="/uuid-generator">UUID generator</a>; human-readable codes in <a href="/random-string">random strings</a>.</p>

<h2 id="math">The math: 122 bits means stop worrying</h2>
<p>v4 UUIDs carry 122 random bits. Birthday-paradox math needs ~2.7 quintillion IDs for 50% collision odds — generating a million per second, you would wait centuries. Practical translation: <strong>10,000 fixture IDs cannot collide</strong> (odds ~10⁻²⁸, far below hardware-error rates). Dedupe on insert anyway as belt-and-braces, then forget about it. Variant bits and RFC 4122 formatting (<code>8-4-4-4-12</code> hex groups) are cosmetic; randomness is the substance.</p>

<h2 id="bulk">Bulk workflow: 10,000 IDs into seed scripts</h2>
<ol>
<li><strong>Mint in bulk</strong> with count input in the <a href="/uuid-generator">UUID generator</a> — one click, copy-all, no rate limits, offline.</li>
<li><strong>Store as strings</strong> (CHAR(36) or native UUID columns), indexed. Never truncate for “readability” — truncated UUIDs lose the randomness guarantee.</li>
<li><strong>Reference across fixtures</strong> by literal ID: order #3f… belongs to user #7a… regardless of insertion order. Tests become order-independent.</li>
<li><strong>Rotate secrets separately:</strong> fixture UUIDs are identifiers, not credentials. API keys need entropy <em>plus</em> revocation — different system.</li>
</ol>

<h2 id="uuid-vs-string">UUID vs random string vs GUID (naming the same thing)</h2>
<table>
<thead><tr><th>Need</th><th>Use</th><th>Why</th></tr></thead>
<tbody>
<tr><td><strong>DB rows, distributed IDs</strong></td><td>UUID v4</td><td>Collision-proof, standard format</td></tr>
<tr><td><strong>Human codes (coupons, invites)</strong></td><td>Random string, Crockford base32</td><td>Readable, no confusing 0/O, 1/l</td></tr>
<tr><td><strong>.NET / Windows APIs</strong></td><td>GUID</td><td>Same 128-bit value, different name</td></tr>
<tr><td><strong>Short URLs</strong></td><td>Neither — use counter+hashids</td><td>UUIDs waste 36 chars per link</td></tr>
</tbody>
</table>
<p>API keys deserve their own design (prefix for identification like <code>sk_live_</code>, 32+ random bytes, hashed storage, rotation) — a bare UUID works for prototypes, not production secrets. Compare generators in the <a href="/uuid-generator">UUID tool</a> and <a href="/random-string">random string tool</a> side by side.</p>
<blockquote class="tip">General guidance only. UUIDs identify; they do not authorize — keep authentication and revocation in dedicated systems.</blockquote>
`;

export const uuidSeed: BlogPost = {
  pillar: "json-formatter-guide",
  slug: "uuid-seed-test-database",
  kind: "cluster",
  title: "Seed Test Databases With UUIDs (No Collisions)",
  description:
    "Seed fixtures with bulk UUIDs: 122-bit collision math, 10,000-ID workflow + UUID vs random-string vs GUID rules. Free bulk generator.",
  keywords: [
    "how many uuids to seed test database without collisions",
    "bulk uuid offline free",
    "122 random bits rfc4122",
    "guid vs uuid",
    "database seeding 10000 ids",
    "Can generated UUIDs collide?",
  ],
  toolSlugs: ["uuid-generator", "random-string", "hash-generator"],
  relatedSlugs: ["sha256-vs-md5-hashes", "json-parse-errors", "regex-flags-capture-groups"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "math", text: "122-bit math", level: 2 },
    { id: "bulk", text: "Bulk workflow", level: 2 },
    { id: "uuid-vs-string", text: "UUID vs alternatives", level: 2 },
  ],
  html,
  faqs: [
    { question: "Can generated UUIDs collide?", answer: "Effectively never since v4 UUIDs carry 122 random bits needing about 2.7 quintillion IDs for 50% odds. Even generating a million per second takes centuries, while 10,000 fixtures sit near 10^-28 below hardware-error rates. Dedupe on insert as belt-and-braces, then forget about collisions entirely for dependable test seeding." },
    { question: "How do I bulk-generate UUIDs for seeding?", answer: "Mint thousands in one click with count input and copy-all in the offline UUID generator with no rate limits. Store as CHAR(36) strings or native UUID columns indexed, never truncated. Reference literal IDs across fixtures so order #3f belongs to user #7a regardless of insertion order." },
    { question: "UUID vs GUID — different?", answer: "Same 128-bit value with RFC 4122 formatting in 8-4-4-4-12 hex groups, just different ecosystem names since .NET says GUID. Randomness is the substance while formatting is cosmetic. Interchangeable in practice for database rows and distributed IDs requiring standard collision-proof identifiers across platforms and programming languages." },
    { question: "Can I use UUIDs as API keys?", answer: "For prototypes only, since fixture UUIDs are identifiers rather than credentials. Production keys need prefixes like sk_live_, 32+ random bytes, hashed storage and rotation with revocation. A bare UUID lacks identification and lifecycle controls, so use a dedicated secrets design instead of reusing fixtures for secure production systems." },
    { question: "When are random strings better?", answer: "Human-facing codes like coupons and invites prefer random strings in Crockford base32, which avoids confusing 0/O and 1/l characters. UUIDs waste 36 chars per link, so short URLs need counter-plus-hashids instead. Use UUIDs for machines and database rows, readable strings for humans everywhere for reliable user experience." },
  ],
};
