import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Staring at an empty “new password” field, everyone types the same tragicomedies: name+birthyear, season+year, “Password123!”. Attackers know — their dictionaries open with exactly these. This page gives <strong>random password ideas</strong> the right way: pattern families you generate (never copy verbatim), what to steal from each, and the hall of shame to delete from your repertoire forever.</p>
<p>Part of the <a href="/blog/password-generator-guide">password generator guide</a>. Generate real ones in the <a href="/random-string">random string tool</a> (custom pools) or <a href="/password-generator">password generator</a>; IDs and tokens via <a href="/uuid-generator">UUID generator</a>.</p>

<h2 id="patterns">Pattern families worth generating (adapt, never copy)</h2>
<ul>
<li><strong>Full-chaos 20-char:</strong> 20 draws from upper+lower+digits+symbols, manager-stored — the default for email and bank.</li>
<li><strong>Pronounceable chunks:</strong> consonant-vowel alternations (e.g. “ba-ne-vo-qi”) read aloud cleanly for phone dictation and Wi-Fi sharing — lower entropy per character, compensate with length 20+.</li>
<li><strong>Word-symbol hybrids:</strong> two random words + 4 random symbols/digits between them — typable, strong at 18+ total characters, good for shared family logins.</li>
<li><strong>Hex tokens:</strong> 32-character hex for API keys and router PSKs — matches what systems expect, pastes cleanly, zero ambiguity.</li>
<li><strong>Numeric PINs (6–8 digits):</strong> only behind rate-limiting (phone unlock + separate data encryption, UPI PIN with bank limits) — never as a sole web password.</li>
</ul>
<p>Generate, do not compose: pick a family, set the parameters in the tool, accept the draw. Every example above is structural — the actual characters must come from uniform randomness, per <a href="/blog/password-generator-guide/how-to-create-strong-password">creation steps</a>.</p>

<h2 id="hall-of-shame">Hall of shame: patterns attackers try first</h2>
<table>
<thead><tr><th>Pattern</th><th>Examples</th><th>Why it falls</th></tr></thead>
<tbody>
<tr><td><strong>Keyboard walks</strong></td><td>qwerty123, 1qaz2wsx</td><td>Spatial dictionaries rank them top-1000</td></tr>
<tr><td><strong>Seasons + year</strong></td><td>Summer2024!, Winter2025</td><td>Rule-based guessing cycles seasons × years instantly</td></tr>
<tr><td><strong>Leet dictionary</strong></td><td>P@ssw0rd, M0nk3y!</td><td>Substitution rules are attacker's bread and butter</td></tr>
<tr><td><strong>Name + digits</strong></td><td>Aarav1998, Priya@123</td><td>Social media supplies the name; digits brute-force in seconds</td></tr>
<tr><td><strong>Reused base + suffix</strong></td><td>Base-FB, Base-Gmail</td><td>One leak reveals the system for all sites</td></tr>
</tbody>
</table>
<p>If any live password resembles these rows, rotate it this week starting with email and bank — breach-order discipline in <a href="/blog/password-generator-guide/what-to-do-after-data-breach">breach checklist</a>. Verify replacements score 3+ in the <a href="/password-strength">strength tester</a>.</p>
<h2 id="team-patterns">Team and classroom patterns (shared secrets done right)</h2>
<p>Shared staging passwords, classroom demo logins and event Wi-Fi need memorizable-but-disposable secrets. Pattern: 3 random words + event tag + rotation date (“correct-event-march”), distributed via manager shared collections or QR, retired on schedule. Classroom trainers: one passphrase per cohort (never reuse across batches — former students keep old ones), projected temporarily, changed each term. Startup staging: per-contractor suffixes so departures revoke individually without team-wide resets. The principle holds everywhere: shared secrets get shorter lifetimes and scheduled deaths, personal secrets get permanence and uniqueness. Expiry dates are part of the secret — “valid till June” printed alongside prevents zombie access nobody remembers granting.</p>
<blockquote class="tip">General information only, not security advice. Generate offline, store in a manager, enable MFA on email/bank. If you lose your master password it cannot be recovered by us.</blockquote>
`;

export const passwordIdeas: BlogPost = {
  pillar: "password-generator-guide",
  slug: "random-password-ideas",
  kind: "cluster",
  title: "Random Password Ideas: Patterns to Generate (Never Copy) 2026",
  description:
    "Password ideas done right: 5 generatable pattern families + hall-of-shame patterns attackers try first. Generate, never copy verbatim.",
  keywords: [
    "random password ideas",
    "strong password examples",
    "password patterns to avoid",
    "funny strong passphrase ideas",
  ],
  toolSlugs: ["random-string", "password-generator", "uuid-generator"],
  relatedSlugs: ["how-to-create-strong-password", "passphrase-vs-password", "what-to-do-after-data-breach"],
  published: "2026-09-25",
  updated: "2026-09-25",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "patterns", text: "Pattern families to generate", level: 2 },
    { id: "hall-of-shame", text: "Hall of shame", level: 2 },
    { id: "team-patterns", text: "Team + classroom patterns", level: 2 },
  ],
  html,
  faqs: [
    { question: "Can I copy password examples from articles?", answer: "No — published examples sit in attacker dictionaries within days. Use articles for pattern families, then generate your own unique draws locally." },
    { question: "What password patterns do hackers try first?", answer: "Keyboard walks, seasons+years, leet substitutions, names+digits, and reused bases with suffixes. If yours matches, rotate starting with email and bank." },
    { question: "Are funny passphrases secure?", answer: "Only if uniformly random — humor you invent follows guessable patterns. Generate random words, then enjoy whatever comedy the dice produce." },
    { question: "What is a good Wi-Fi password pattern?", answer: "Long pronounceable chunks (20+ chars) for dictation, or 32-char hex for set-and-forget routers. Details in the Wi-Fi router guide." },
    { question: "Are numeric PINs ever OK?", answer: "Only behind rate-limiting plus separate encryption/limits: phone unlock, UPI PINs. Never as sole web authentication." },
  ],
};
