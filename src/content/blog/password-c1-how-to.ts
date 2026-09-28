import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>My old “system” was one base word plus site-specific suffixes — until a forum breach handed attackers the pattern and two of my accounts fell in a week. Rebuilding with real randomness took an afternoon and has held for years. This is <strong>how to create a strong password</strong> in 5 steps: the 16-character rule, settings, uniqueness, storage and 2FA — each step tested in September 2026 with our local tools.</p>
<p>Part of the <a href="/blog/password-generator-guide">password generator guide</a> — the pillar covers the system, this is the hands-on walkthrough. Open the <a href="/password-generator">free password generator</a> in the next tab. No signup, offline after load.</p>

<h2 id="five-steps">Create one in 5 steps (~3 minutes)</h2>
<h3>Step 1 — Set length 16+ (20 for important accounts)</h3>
<p>Open the generator, drag length to 16 minimum — 20 for email, bank and manager master adjacent. Length is the dominant variable: 16 full-pool characters carry ~104.9 bits. Everything below is tuning.</p>
<h3>Step 2 — Enable all four pools</h3>
<p>Upper, lower, digits, symbols ON (94 printable characters, ~6.55 bits each). If a site forbids symbols, add 2 characters of length to compensate rather than accepting weakness.</p>
<h3>Step 3 — Generate 3, pick 1, never hand-edit</h3>
<p>Generate three candidates and take one verbatim. Hand-“improving” randomness (swapping a character you distrust) only shrinks unpredictability — trust the uniform draw from crypto.getRandomValues.</p>
<h3>Step 4 — Store immediately in a manager</h3>
<p>Copy straight into a password manager — any reputable one; we take no affiliates and rank none. Never into notes apps, chats or screenshots. The manager holds 200 unique secrets; your brain holds two passphrases per <a href="/blog/password-generator-guide/how-to-remember-passwords">remembering guide</a>.</p>
<h3>Step 5 — Enable 2FA on email and bank today</h3>
<p>Authenticator app over SMS (SIM-swappable). Email first — resets flow through it. Passkeys where offered. Order and setup in <a href="/blog/password-generator-guide/2fa-vs-passkeys">2FA vs passkeys</a>.</p>

<h2 id="uniqueness">Uniqueness: one site, one password, no exceptions</h2>
<p>Credential stuffing replays leaked pairs across hundreds of sites automatically — reused passwords fall in bulk, unique ones fall alone. After generating, search your memory honestly: if any live account shares substantial structure with the new secret, rotate that account too, starting with email and bank. Breach already happened? Priority order (breached + reused first, MFA second, monitor third) in <a href="/blog/password-generator-guide/what-to-do-after-data-breach">breach checklist</a>. Theory behind the bits in <a href="/blog/password-generator-guide/what-makes-password-strong">what makes passwords strong</a>.</p>

<h2 id="wont-work">When generated passwords will not work (site limits)</h2>
<ul>
<li><strong>Max-length caps (looking at you, banks):</strong> some legacy sites cap at 12–16. Max the length, enable all allowed pools, and note the site as weak — enable every alert and MFA option it offers.</li>
<li><strong>No-symbol rules:</strong> compensate with length (+4 characters beats a symbol set mathematically at these sizes).</li>
<li><strong>Forced rotation policies:</strong> employer-mandated 90-day changes contradict NIST — comply for work accounts (their rules), keep personal vault on breach-only rotation.</li>
<li><strong>Shared accounts:</strong> family streaming logins cannot be unique-per-human — use a long passphrase everyone memorizes, and never reuse its pattern for personal accounts.</li>
</ul>
<h2 id="rotation-policy">Your personal rotation policy (write it once)</h2>
<p>Decide in advance when passwords change, or every breach becomes a debate. The policy: rotate on compromise evidence, service breach notices, team/device changes, and suspected phishing — never on calendars. Write the trigger list on paper with your recovery codes: “change when: breach notice naming the service, unknown login alert confirmed, device lost unencrypted, ex-partner/roommate access ends, employer exit.” Review annually in 10 minutes; the list rarely changes, but having it ends the “should I change everything?” panic that produces weaker replacements. Pair with the <a href="/blog/password-generator-guide/what-to-do-after-data-breach">breach order</a> so triggers map to actions, not anxiety.</p>
<blockquote class="tip">General information only, not security advice. Generate offline, store in a manager, enable MFA on email/bank. If you lose your master password it cannot be recovered by us.</blockquote>
`;

export const passwordHowTo: BlogPost = {
  pillar: "password-generator-guide",
  slug: "how-to-create-strong-password",
  kind: "cluster",
  title: "How to Create a Strong Password: The 16-Character Rule (2026)",
  description:
    "Create a strong password in 5 steps: 16+ length, full pools, uniqueness, manager storage + 2FA. Tested local flow, no signup.",
  keywords: [
    "how to create strong password",
    "how to make password with symbols",
    "create unique password each account",
    "strong password steps",
  ],
  toolSlugs: ["password-generator", "random-passphrase", "password-strength"],
  relatedSlugs: ["what-makes-password-strong", "how-to-remember-passwords", "password-strength-tester"],
  published: "2026-09-25",
  updated: "2026-09-25",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "five-steps", text: "Create one in 5 steps", level: 2 },
    { id: "uniqueness", text: "Uniqueness: no exceptions", level: 2 },
    { id: "wont-work", text: "When sites limit you", level: 2 },
    { id: "rotation-policy", text: "Personal rotation policy", level: 2 },
  ],
  html,
  faqs: [
    { question: "How long should a strong password be?", answer: "16 characters minimum from the full 94-character pool (~104.9 bits); 20+ for email, bank and other critical accounts. Length dominates all other settings." },
    { question: "Should I include symbols?", answer: "Yes when allowed — they widen the pool to 94 characters. Where forbidden, add length instead: +4 characters beats the lost symbol set at these sizes." },
    { question: "Can I edit a generated password to improve it?", answer: "No — hand-editing uniform randomness only shrinks unpredictability. Generate three candidates and accept one verbatim." },
    { question: "What if my bank limits password length?", answer: "Max out their cap with all allowed pools, enable every alert and MFA option, and treat that account as weaker — monitor it more closely." },
    { question: "Do I need a manager if passwords are strong?", answer: "Yes — no human holds 200 unique 16-character secrets. The manager holds them; your brain holds two passphrases; 2FA guards the rest." },
  ],
};
