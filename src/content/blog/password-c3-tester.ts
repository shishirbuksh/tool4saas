import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Pasting your banking password into a random “strength checker” to see if it is safe is like shouting your PIN across a café to test the acoustics. Most checkers upload exactly what you type. This guide shows <strong>how to test password strength without sending it anywhere</strong> — local meters, zxcvbn logic, and reading the score like an attacker would.</p>
<p>Part of the <a href="/blog/password-generator-guide">password generator guide</a>. Our <a href="/password-strength">password strength tester</a> runs entirely in your tab — verify with DevTools Network panel showing zero requests. Theory in <a href="/blog/password-generator-guide/what-makes-password-strong">what makes passwords strong</a>.</p>

<h2 id="local-first">Local-first testing (the only safe kind)</h2>
<p>A strength test is safe only if the secret never leaves your device. Before typing anything anywhere: open DevTools → Network, type a dummy, confirm no requests. Our tester passes — pure client-side scoring, offline-capable after load. Red flags elsewhere: no privacy statement, analytics calls on each keystroke, “save” or “check breach” buttons that POST plaintext (proper breach checks use k-anonymity prefixes, never full secrets). Rule: test <em>patterns similar to</em> your real passwords on third-party sites; test actual secrets only in verified-local tools. Better yet, generate fresh secrets in the <a href="/password-generator">generator</a> and test those — nothing personal at stake.</p>

<h2 id="zxcvbn">How zxcvbn-style scoring actually works</h2>
<p>Good meters (Dropbox's zxcvbn, open source since 2016) do not count character classes — they simulate attackers: dictionary matches (common passwords, names, words in 30+ languages), spatial patterns (qwerty, 12345), repeats (aaa), sequences (abcd), dates, and leet substitutions (a→@). Each match gets guess estimates; the weakest link scores. That is why “Tr0ub4dor&3” rates poorly despite ticking every complexity box, while a 5-word random passphrase rates highly. Score bands (0–4) map to crack resistance in orders of magnitude: 0–1 guessable within minutes, 2 resists casual online guessing, 3–4 effectively infeasible offline — illustrative, not year estimates.</p>
<table>
<thead><tr><th>Score</th><th>Meaning</th><th>Action</th></tr></thead>
<tbody>
<tr><td><strong>0–1 (weak)</strong></td><td>Dictionary/pattern guessable</td><td>Regenerate immediately; never deploy</td></tr>
<tr><td><strong>2 (fair)</strong></td><td>Resists casual guessing</td><td>OK for throwaway accounts only</td></tr>
<tr><td><strong>3 (strong)</strong></td><td>Survives offline attacks practically</td><td>Minimum for email, bank, manager</td></tr>
<tr><td><strong>4 (excellent)</strong></td><td>Brute-force infeasible</td><td>Ideal; still needs uniqueness + 2FA</td></tr>
</tbody>
</table>

<h2 id="reading-score">Reading your score like an attacker</h2>
<ul>
<li><strong>Score 3+ but reused?</strong> Still one breach away from everywhere — uniqueness outranks marginal score gains. Rotate the reused set first.</li>
<li><strong>Score 2 on a long password?</strong> It contains a guessable core (name, date, word). Keep the length, randomize the core — test again.</li>
<li><strong>Perfect 4 everywhere identical?</strong> Same failure. Generate unique 4s per site; the manager holds them all.</li>
<li><strong>After any breach notice:</strong> retest changed passwords, but prioritize the <a href="/blog/password-generator-guide/what-to-do-after-data-breach">breach checklist order</a> (breached + reused first) over perfecting scores.</li>
</ul>
<h2 id="enterprise-checks">Enterprise spot-checks (for teams without a security staff)</h2>
<p>Small teams inherit the same threats with none of the tooling. Quarterly 30-minute ritual: export vault health reports (most managers flag reused/weak/exposed entries — clear to zero), verify every team member has MFA on email and cloud admin, rotate shared credentials after each departure within 24 hours, and test one restore (recovery codes actually work, backups actually open). Log results in one page: date, flags cleared, rotations done. Auditors and cyber-insurance questionnaires accept documented rituals over expensive platforms at small scale. The <a href="/blog/password-generator-guide/what-to-do-after-data-breach">breach order</a> scales to teams identically — contain shared accounts first, then individuals.</p>
<blockquote class="tip">General information only, not security advice. Generate offline, store in a manager, enable MFA on email/bank. If you lose your master password it cannot be recovered by us.</blockquote>
`;

export const passwordTester: BlogPost = {
  pillar: "password-generator-guide",
  slug: "password-strength-tester",
  kind: "cluster",
  title: "Password Strength Tester: Check Without Uploading (2026)",
  description:
    "Test password strength safely: local-only meters, zxcvbn scoring explained, score bands + attacker reading. Nothing leaves your browser.",
  keywords: [
    "password strength tester",
    "zxcvbn score explained",
    "offline password strength checker",
    "test password without sending online",
    "Is it safe to use online password strength checkers?",
  ],
  toolSlugs: ["password-strength", "password-generator", "hash-generator"],
  relatedSlugs: ["what-makes-password-strong", "how-to-create-strong-password", "what-to-do-after-data-breach"],
  published: "2026-09-25",
  updated: "2026-09-25",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "local-first", text: "Local-first testing only", level: 2 },
    { id: "zxcvbn", text: "How zxcvbn scoring works", level: 2 },
    { id: "reading-score", text: "Read score like an attacker", level: 2 },
    { id: "enterprise-checks", text: "Enterprise spot-checks", level: 2 },
  ],
  html,
  faqs: [
    { question: "Is it safe to use online password strength checkers?", answer: "Only verified-local ones. Most upload keystrokes, lack privacy statements or POST plaintext on each keystroke. Check DevTools Network for zero requests with a dummy entry, or test similar patterns instead of real secrets. Ours runs fully in-browser, client-side and offline-capable, so nothing personal is ever at stake." },
    { question: "What is a good zxcvbn score?", answer: "3+ for important accounts (email, bank, manager); 4 ideal. Scores 0–1 mean regenerate immediately, 2 suits throwaways only, 3 survives offline attacks, 4 is infeasible. But uniqueness outranks score — a unique 3 beats a reused 4, so rotate reused sets first with managers today always." },
    { question: "Why does my complex password score low?", answer: "zxcvbn simulates attackers: dictionary words, patterns and substitutions (Tr0ub4dor-style) fall fast regardless of character classes. It checks 30+ languages, spatial qwerty patterns, repeats, sequences, dates and leet substitutions. Randomize the core, keep the length, and retest until guessable cores disappear completely for every important account today." },
    { question: "Do meters replace breach checks?", answer: "No — different jobs. Meters judge guessability; breach checks judge exposure via k-anonymity prefixes, never full secrets. After any notice, follow the breach checklist order with breached plus reused first, MFA second and monitoring third, not just scores for complete safety across all your accounts today." },
    { question: "Can the site see tested passwords?", answer: "Ours cannot — scoring is client-side with no network calls, verifiable in DevTools Network showing zero requests. Never assume this elsewhere; check privacy statements and analytics before typing real secrets. Proper breach checks use prefixes only, and fresh generator secrets carry nothing personal at stake." },
  ],
};
