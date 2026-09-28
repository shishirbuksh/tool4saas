import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“Must contain uppercase, number and symbol” — I watched a colleague satisfy that rule with “Autumn2024!” and get breached in months. The rule measured the wrong thing. <strong>What makes a password strong</strong> is length (search-space size), unpredictability (uniform randomness), uniqueness (one site, one secret) and screening (not in breach lists) — complexity checklists rank a distant fifth. Here is the physics, with the mandated entropy table.</p>
<p>Part of the <a href="/blog/password-generator-guide">password generator guide</a>. Test ratings privately in the <a href="/password-strength">password strength tester</a>; developers can fingerprint secrets with the <a href="/hash-generator">hash generator</a> (hashes, never plaintext).</p>

<h2 id="length-entropy">Length and entropy: the only table that matters</h2>
<p>Bits = length × log2(pool). Order-of-magnitude framing only — illustrative offline attack ≈10 billion guesses/sec; throttled online logins are vastly slower; dictionary attacks beat brute-force math, so treat these as ceilings:</p>
<table>
<thead><tr><th>Password type</th><th>Entropy</th><th>Illustrative offline scale</th></tr></thead>
<tbody>
<tr><td><strong>8 chars, lowercase</strong></td><td>37.6 bits</td><td>Minutes — never use</td></tr>
<tr><td><strong>12 chars, full 94-pool</strong></td><td>78.7 bits</td><td>Impractical — decent minimum</td></tr>
<tr><td><strong>16 chars, full pool</strong></td><td>104.9 bits</td><td>Effectively uncrackable by brute force</td></tr>
<tr><td><strong>5-word EFF passphrase</strong></td><td>64.6 bits</td><td>Strong + memorizable</td></tr>
</tbody>
</table>
<p>Each added full-pool character multiplies search space ~94×; each added word multiplies ~7,776×. That compounding is why length wins every argument against complexity theater.</p>

<h2 id="beyond-bits">Beyond bits: unpredictability, uniqueness, screening</h2>
<ul>
<li><strong>Unpredictability:</strong> uniform draws from crypto.getRandomValues — human “random” (birthdays, lyrics, keyboard walks like qwerty123) collapses entropy regardless of length. Test how meters judge this in <a href="/blog/password-generator-guide/password-strength-tester">strength tester guide</a>.</li>
<li><strong>Uniqueness:</strong> a 104-bit secret reused on 10 sites has 104-bit strength exactly once — the first breach burns all ten. Breach priority order in <a href="/blog/password-generator-guide/what-to-do-after-data-breach">breach checklist</a>.</li>
<li><strong>Screening:</strong> NIST requires checking creations against breach corpora, dictionaries and service names. “Correct-Horse-9!” looks strong and sits in every cracker dictionary — screening catches what math cannot.</li>
<li><strong>Composition rules considered harmful:</strong> forced symbols push everyone to the same predictable slots (capital first, 123! last). NIST dropped composition mandates; length + screening replaced them.</li>
</ul>

<h2 id="memory-tradeoff">The memory tradeoff (why passphrases exist)</h2>
<p>Humans cannot hold 104 bits of gibberish — so the memorable tier exists: 5–6 random EFF words (~64.6 bits at 5) for master passwords and the two secrets you memorize, random 16+ strings for everything a manager holds. Never downgrade stored secrets to memorable ones “to be safe” — the manager removes the memory constraint, so use full randomness there. Choosing between them per account in <a href="/blog/password-generator-guide/passphrase-vs-password">passphrase vs password</a>; memorizing safely in <a href="/blog/password-generator-guide/how-to-remember-passwords">remembering guide</a>.</p>
<h2 id="site-policies">Why site policies still demand nonsense (and how to comply)</h2>
<p>If length beats complexity, why do banks still require “one symbol, changed every 90 days”? Legacy compliance checklists, audit inertia, and regulators who codified 2003-era advice. You cannot fix their policy; you can comply cheaply: satisfy the form with a long generated secret that happens to include a symbol (length carries you regardless), set a calendar note for their forced rotation, and treat that account as weaker-by-policy — extra MFA, unique secret, closer monitoring. Never let one site's bad rules infect your system: keep personal vault on NIST-grade practices, maintain a mental “weak-by-policy” list (usually 2–3 legacy banks), and favor institutions with modern auth (passkeys, app-2FA) when choosing where to bank next.</p>
<blockquote class="tip">General information only, not security advice. Generate offline, store in a manager, enable MFA on email/bank. If you lose your master password it cannot be recovered by us.</blockquote>
`;

export const passwordStrong: BlogPost = {
  pillar: "password-generator-guide",
  slug: "what-makes-password-strong",
  kind: "cluster",
  title: "What Makes a Password Strong? Length, Entropy & Blacklists (2026)",
  description:
    "Password strength = length + unpredictability + uniqueness + screening. Mandated entropy table, crack framing, complexity myth. Private tester.",
  keywords: [
    "what makes a password strong",
    "password entropy explained",
    "how long to crack 16 character password",
    "password complexity vs length",
  ],
  toolSlugs: ["password-strength", "hash-generator", "password-generator"],
  relatedSlugs: ["password-strength-tester", "how-to-create-strong-password", "passphrase-vs-password"],
  published: "2026-09-25",
  updated: "2026-09-25",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "length-entropy", text: "Length + entropy table", level: 2 },
    { id: "beyond-bits", text: "Unpredictability, uniqueness, screening", level: 2 },
    { id: "memory-tradeoff", text: "Memory tradeoff", level: 2 },
    { id: "site-policies", text: "Why sites demand nonsense", level: 2 },
  ],
  html,
  faqs: [
    { question: "What matters more, length or complexity?", answer: "Length, by far — each full-pool character multiplies search space ~94×. Complexity rules without length produce predictable patterns crackers test first. NIST dropped composition mandates for this reason." },
    { question: "Is a 16-character password uncrackable?", answer: "By brute force at illustrative offline rates, effectively yes (~104.9 bits). But reuse, phishing and dictionary patterns bypass math entirely — uniqueness and screening matter equally." },
    { question: "Why do strong-looking passwords still get cracked?", answer: "Dictionary + rule attacks guess human patterns (words, substitutions, keyboard walks) far below brute-force estimates. Screening creations against breach lists catches these." },
    { question: "Are passphrases as strong as random passwords?", answer: "Five random EFF words (~64.6 bits) beat any memorizable gibberish and suffice for master secrets. For manager-stored secrets, full 16+ randomness still wins." },
    { question: "Do password meters measure real strength?", answer: "Good ones (zxcvbn-style) estimate guessing patterns, not just length — far better than character-class checklists. Test privately without uploading." },
  ],
};
