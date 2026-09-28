import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“correct horse battery staple” — four random words, ~51.7 bits, memorable in seconds. “Tr0ub4dor&3” — 11 characters of pain, weaker against smart guessing, forgotten by Friday. The famous xkcd #936 comparison settled the <strong>passphrase vs password</strong> debate a decade ago, and NIST agreed: length from random words beats complexity theater. But the details decide — word count, wordlist size and use case. Here they are.</p>
<p>Part of the <a href="/blog/password-generator-guide">password generator guide</a>. Generate both kinds in the <a href="/password-generator">generator</a> (random strings) and <a href="/random-passphrase">passphrase tool</a>. Memory method in <a href="/blog/password-generator-guide/how-to-remember-passwords">remembering guide</a>.</p>

<h2 id="math">The math: 5 words beat 12 characters</h2>
<p>EFF's 7,776-word list: each random word ≈12.9 bits, so 4 words ≈51.7 bits, 5 words ≈64.6 bits, 6 words ≈77.5 bits. A 12-character full-pool password: ~78.7 bits. So 6 random words roughly equal 12 random characters — while remaining humanly memorizable and typable. Critical qualifier: RANDOM words. A favorite quote, lyric or proverb has a fraction of the entropy — attackers try published text first. Dice, crypto generators, or the passphrase tool — never “words that feel random.”</p>
<table>
<thead><tr><th>Secret</th><th>Entropy</th><th>Memorizable?</th><th>Best for</th></tr></thead>
<tbody>
<tr><td><strong>4 random words</strong></td><td>~51.7 bits</td><td>Yes</td><td>Low-value logins, Wi-Fi sharing</td></tr>
<tr><td><strong>5 random words</strong></td><td>~64.6 bits</td><td>Yes</td><td>Manager master, email</td></tr>
<tr><td><strong>6 random words</strong></td><td>~77.5 bits</td><td>With practice</td><td>High-value masters</td></tr>
<tr><td><strong>16 random chars</strong></td><td>~104.9 bits</td><td>No</td><td>Everything a manager holds</td></tr>
</tbody>
</table>
<p>Order-of-magnitude framing, illustrative offline ≈10B guesses/sec; online throttled far slower.</p>

<h2 id="which-when">Which to use when (the split rule)</h2>
<ul>
<li><strong>Memorized secrets → passphrases:</strong> manager master, email, device PIN-adjacent logins, full-disk encryption. Five words minimum, story-linked for recall (absurd mental images stick).</li>
<li><strong>Stored secrets → random strings:</strong> all 200 site logins, API keys, Wi-Fi PSKs, router admins. Maximum entropy, zero memory burden — the manager's whole job.</li>
<li><strong>Shared secrets → passphrases:</strong> family Wi-Fi, streaming logins, team staging passwords. Humans transmit words without errors; dictating 16 symbols over the phone fails.</li>
<li><strong>Never:</strong> song lyrics, quotes, keyboard patterns or “passphrase-style” phrases you invented — non-random word choice collapses entropy toward single digits of effective bits against smart attacks.</li>
</ul>

<h2 id="diceware">Diceware in 2 minutes (trustable randomness by hand)</h2>
<p>Distrust software? Roll physical dice: five rolls pick one of 7,776 EFF words; repeat 5–6 times. Dice have no code to backdoor and no memory to leak — the gold standard paranoids and experts agree on. Our <a href="/random-passphrase">passphrase tool</a> demonstrates the concept with a compact built-in wordlist (fine for practice and low-value secrets — for real masters, use physical dice or a 20+ character secret from the <a href="/password-generator">generator</a>). Either way: keep the first draw — re-rolling “ugly” words injects human bias that shrinks entropy. Write the result on paper until memorized, then destroy the paper; never photograph it.</p>
<h2 id="multilingual">Non-English passphrases (untapped entropy)</h2>
<p>Wordlists exist beyond English — and attackers' dictionaries skew English-first. Hindi, Spanish or Tamil wordlists from reputable sources add equivalent bits per word (~12.9 at 7,776 entries) while dodging English-centric guessing. Rules: use a published uniform list (never your own vocabulary — personal word choice is predictable), keep words space-separated for entry, and confirm every login form accepts Unicode (legacy bank forms sometimes mangle it — test before committing a master to Devanagari). Mixed-language draws are fine if uniformly generated, but single-list draws keep the math clean. Whatever the language, randomness source matters more than tongue: dice or crypto.getRandomValues, first draw kept.</p>
<blockquote class="tip">General information only, not security advice. Generate offline, store in a manager, enable MFA on email/bank. If you lose your master password it cannot be recovered by us.</blockquote>
`;

export const passwordPassphrase: BlogPost = {
  pillar: "password-generator-guide",
  slug: "passphrase-vs-password",
  kind: "cluster",
  title: "Passphrase vs Password: When 5 Words Beat 12 Characters (2026)",
  description:
    "Passphrase vs password compared: EFF word math, when to use each, Diceware by hand. Memorable masters + random stored secrets.",
  keywords: [
    "passphrase vs password",
    "are 4 random words safer",
    "correct horse battery staple entropy",
    "eff passphrase words",
  ],
  toolSlugs: ["random-passphrase", "password-generator", "password-strength"],
  relatedSlugs: ["how-to-remember-passwords", "what-makes-password-strong", "how-to-create-strong-password"],
  published: "2026-09-25",
  updated: "2026-09-25",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "math", text: "Math: 5 words vs 12 chars", level: 2 },
    { id: "which-when", text: "Which to use when", level: 2 },
    { id: "diceware", text: "Diceware in 2 minutes", level: 2 },
    { id: "multilingual", text: "Non-English passphrases", level: 2 },
  ],
  html,
  faqs: [
    { question: "Is a passphrase stronger than a password?", answer: "Five random EFF words (~64.6 bits) beat any memorizable gibberish and rival 12 random characters while staying memorable. Six words (~77.5 bits) match them. Randomness is mandatory — quotes and lyrics collapse entropy." },
    { question: "How many words should a passphrase have?", answer: "Five minimum from a full 7,776-word list for master secrets, six for high-value ones. Four words suit low-value shared logins like guest Wi-Fi. Compact demo wordlists (like our practice tool's) carry far fewer bits — count only full-list draws toward these targets." },
    { question: "Can I use song lyrics as a passphrase?", answer: "No — attackers try published text first. Only uniformly random words (dice, crypto generator) count toward the entropy math." },
    { question: "What is Diceware?", answer: "Dice-picked words from a 7,776-entry list: five dice rolls per word, 5–6 words per secret. No software to trust; keep the first draw and destroy the paper after memorizing." },
    { question: "Should stored passwords be passphrases?", answer: "No — where a manager removes memory constraints, full 16+ randomness wins (~104.9 bits). Passphrases are for the few secrets brains must hold." },
  ],
};
