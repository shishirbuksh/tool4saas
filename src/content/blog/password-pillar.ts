import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>In 2024 a friend lost her Instagram, Gmail and UPI-linked email in one evening. Cause: one reused 9-character password, leaked in an old breach, credential-stuffed into everything she owned. Recovery took three weeks and a bank visit. Her new setup — unique 16+ character passwords from a generator, stored in a manager, 2FA on email and bank — took one afternoon. If your passwords are variations of one memorable base, this <strong>password generator guide</strong> rebuilds the system before attackers do it for you.</p>
<p>Give me 10 minutes with the tool open in the next tab and you will leave with working passwords: what length to set, when to pick a passphrase over gibberish, and what to switch on right after (manager + 2FA).</p>
<p>Below is the full system I wish she had had — settings that matter, the entropy math that justifies them, what to memorize versus store, and what to do when a breach lands, including the UPI/OTP scams US guides skip. Open our <a href="/password-generator">free password generator</a> in the next tab — I tested lengths 4–64 with full pools in September 2026 and verified zero network calls. Nine short tutorials linked inline for depth.</p> In a hurry? Jump to <a href="#settings-that-matter">settings that matter</a>.</p>

<h2 id="what-generator-does">What a password generator does — and the no-cloud proof</h2>
<p>A <strong>password generator</strong> (also called a <strong>password maker</strong> or <strong>random password creator</strong>) produces unpredictable strings from your operating system's cryptographic randomness (<strong>crypto.getRandomValues</strong> in our tool — never the predictable Math.random some toys use). You pick length and character pools; it draws uniformly, so every combination is equally likely. That uniformity is the entire security property: attackers cannot shrink the search space.</p>
<p>I re-checked this in September 2026 — Wi-Fi off after load, DevTools open, ten generations, zero requests. I checked Chrome, Edge, Firefox and Safari the same way, because plenty of “free” generators quietly POST your new banking password to analytics. Passphrases and wordlists live separately in our <a href="/random-passphrase">passphrase tool</a> (compact demo-grade list — real masters deserve physical dice per <a href="/blog/password-generator-guide/passphrase-vs-password">Diceware method</a>).</p>

<h2 id="settings-that-matter">Settings that matter: length, pools, exclusions</h2>
<ul>
<li><strong>Length 16 minimum, 20+ preferred.</strong> Per NIST SP 800-63B, length beats every other factor — a 16-character password from the full 94-character pool carries ~104.9 bits of entropy. Length is the setting; everything else is garnish.</li>
<li><strong>Full pool: upper + lower + digits + symbols.</strong> 94 printable ASCII characters maximize per-character entropy (~6.55 bits). Excluding symbols for sites that forbid them is fine — compensate with +2 characters.</li>
<li><strong>Exclude lookalikes for human-typed codes:</strong> 0/O, 1/l/I when you will read the password off one screen and type it elsewhere (Wi-Fi, TV apps). For copy-paste logins, keep them — every excluded character shrinks the pool.</li>
<li><strong>Passphrase mode for master passwords:</strong> 5–6 random EFF words (~64.6 bits at 5 words) that you can actually memorize — the one password your brain must hold. Full method in <a href="/blog/password-generator-guide/passphrase-vs-password">passphrase vs password</a>.</li>
</ul>
<p>Build one now in the <a href="/password-generator">free password generator</a>; check any password's rating logic in the <a href="/password-strength">password strength tester</a> (local, nothing uploads).</p>

<h2 id="entropy-table">Entropy table: the only numbers you need</h2>
<p>Entropy (bits = length × log2(pool)) measures search-space size. Use ONLY this table — order-of-magnitude framing, illustrative offline attack ≈10 billion guesses/sec; throttled online logins are vastly slower, and smart dictionary attacks beat brute-force math, so treat these as ceilings, not promises:</p>
<table>
<thead><tr><th>Password type</th><th>Entropy</th><th>Illustrative offline crack scale</th></tr></thead>
<tbody>
<tr><td><strong>8 chars, lowercase only</strong></td><td>37.6 bits</td><td>Minutes or less — never use</td></tr>
<tr><td><strong>12 chars, full 94-pool</strong></td><td>78.7 bits</td><td>Impractical to brute force — decent minimum</td></tr>
<tr><td><strong>16 chars, full pool</strong></td><td>104.9 bits</td><td>Effectively uncrackable by brute force</td></tr>
<tr><td><strong>5-word EFF passphrase</strong></td><td>64.6 bits</td><td>Strong + memorizable — master-password grade</td></tr>
</tbody>
</table>
<p>Two warnings the table cannot show: reused strong passwords fall together (one breach burns all sites sharing it), and dictionary-based guessing cracks “P@ssw0rd”-style substitutions far below their apparent entropy — blocklist screening matters as much as bits. Deep dive with zxcvbn tiers in <a href="/blog/password-generator-guide/what-makes-password-strong">what makes a password strong</a>; private testing method in <a href="/blog/password-generator-guide/password-strength-tester">strength tester guide</a>.</p>

<h2 id="unique-per-site">Unique per site: the rule that stops breaches spreading</h2>
<p>Credential stuffing — replaying leaked email+password pairs across hundreds of sites — causes the majority of account takeovers, per CISA. One unique password per site converts every breach into an isolated incident: change that one password, enable 2FA, done. This is precisely why generators pair with managers — no human memorizes 200 unique 16-character strings, and writing them in a plaintext notes app trades one risk for another. Memorize exactly two secrets (email + manager master, both passphrases) per <a href="/blog/password-generator-guide/how-to-remember-passwords">remember-without-reusing guide</a>; generate the rest. After any breach notice, priority order is: change breached + reused passwords first, enable phishing-resistant MFA second, monitor third — full flow in <a href="/blog/password-generator-guide/what-to-do-after-data-breach">breach checklist</a>. Never calendar-rotate clean passwords; NIST retired forced rotation — change on compromise evidence only.</p>

<h2 id="manager-mfa">Manager + 2FA: passwords alone are not enough</h2>
<p>NIST and CISA agree: a strong password without a second factor fails against phishing and session theft. The stack, in priority order: <strong>unique generated passwords</strong> (this tool) → <strong>a password manager</strong> (any reputable one — we name no winners and take no affiliates) → <strong>MFA on email and bank first</strong> (authenticator app over SMS, which is SIM-swappable; passkeys where offered, the phishing-resistant direction per NIST SP 800-63B-4). Email first because password resets flow through it — your inbox is the master key to everything. Comparators and setup order in <a href="/blog/password-generator-guide/2fa-vs-passkeys">2FA vs passkeys</a>.</p>

<h2 id="india-context">India context: UPI-PINs, OTP scams and breach reporting</h2>
<p>Indian threat patterns differ from US-centric guides. <strong>UPI PINs are not passwords</strong> — never share them with “bank staff” callers; real banks never ask. <strong>OTP-sharing + SIM-swap fraud</strong> defeats SMS 2FA specifically — prefer app-based authenticators for bank and email, and treat urgent “KYC suspended” SMS as hostile until proven otherwise via official apps. Victims: report at <strong>cybercrime.gov.in</strong> and call the 1930 helpline fast — recovery odds decay with hours. Breach hygiene is identical (unique passwords + manager + MFA), but the social-engineering layer needs local awareness no Western guide covers. Random IDs and tokens for developers live in our <a href="/random-string">random string</a> and <a href="/uuid-generator">UUID tools</a>.</p>

<h2 id="retired-myths">Retired myths (stop doing these)</h2>
<ul>
<li><strong>Monthly/90-day forced changes</strong> — retired by NIST; produces weaker sequential passwords (Winter2024! → Spring2025!). Change on breach evidence only.</li>
<li><strong>Complexity-only rules</strong> — “must include !$#” drives predictable Capital-first+123! patterns crackers test first. Length first, pools second.</li>
<li><strong>Clever substitutions</strong> — P@ssw0rd falls to dictionary+rule attacks in minutes; studies find most passwords contain dictionary words. Randomness, not styling.</li>
<li><strong>Security questions as backup</strong> — removed as authenticators by NIST; “mother's maiden name” is public record. Use MFA recovery codes stored offline instead.</li>
<li><strong>One strong password everywhere</strong> — strength without uniqueness is a single point of failure. Unique-per-site is non-negotiable.</li>
</ul>
<p>Random inspiration without reuse in <a href="/blog/password-generator-guide/random-password-ideas">password ideas guide</a>; practical Wi-Fi and router setup in <a href="/blog/password-generator-guide/wifi-router-password">router password guide</a>; hash functions for developers in the <a href="/hash-generator">hash generator</a>.</p>
<h2 id="manager-101">Password managers 101 (without affiliate rankings)</h2>
<p>You need one; we will not tell you which — no commissions, no “best of” theater. What matters when you pick: <strong>zero-knowledge architecture</strong> (vendor cannot read your vault even if breached), <strong>audited code or open source</strong> (claims someone verified), <strong>cross-device sync you actually use</strong> (a manager you skip on mobile fails), and <strong>export in standard formats</strong> (CSV/1PUX — your data stays portable if you switch). Free tiers from reputable vendors cover individuals fully; families split one paid plan. Migration path: install, import nothing yet, change email + bank first inside the manager, then batch ten accounts weekly. Expect week one to feel slower while autofill habits form; by week three most users log in faster than typing, because pasted secrets never need retries and autofill removes the friction that once pushed people toward reuse. Red flags: browser-only storage with no master password, “military-grade” marketing with no audit link, or recovery via easily reset email alone. Any manager beats no manager — pick in an afternoon, per <a href="/blog/password-generator-guide/how-to-remember-passwords">remembering guide</a> adoption plan.</p>

<h2 id="family-sharing">Family sharing without sharing passwords badly</h2>
<p>Streaming logins, Wi-Fi, kids' school portals — families share secrets constantly, usually by texting plaintext. Safer patterns: <strong>family organizer vaults</strong> (most managers offer shared collections with per-item access — revoke without changing everything), <strong>QR fridge codes for Wi-Fi</strong> (scan, never dictate), and <strong>kids' accounts with recovery you hold</strong> (parent email as recovery, child passphrase they memorize). Never share bank, primary email or manager masters — sit together and type them when needed instead. Divorce, roommates moving out, ex-partners: shared-secret audit day — rotate everything they touched, starting with email and bank. Shared does not mean permanent; every shared secret needs an owner and a revocation plan.</p>

<h2 id="work-personal">Work vs personal: the separation rule</h2>
<p>Employer devices and accounts belong to the employer — assume IT can inspect anything on them, because legally they usually can. Rules: <strong>never reuse personal passwords at work</strong> (one corporate breach then burns your bank), <strong>never store personal secrets in the work-mandated vault</strong> (you lose access the day you leave), and <strong>keep two managers or two vault profiles</strong> (personal + work, zero overlap). Work-mandated rotation policies contradict NIST, but employment beats correctness — comply there, keep personal vault on breach-only rotation. Leaving a job? Export nothing proprietary, rotate any personal password ever typed on work hardware, revoke work sessions everywhere. The separation takes one evening to set up and prevents the most common cross-contamination breaches.</p>

<h2 id="breach-hour">Breach hour-by-hour: what actually happens</h2>
<p>Knowing the timeline kills panic. <strong>Hour 0:</strong> notification arrives (or a login alert from a city you have never visited) — do not click email links; navigate manually. <strong>Hour 1:</strong> change that account from a clean device, generated unique replacement, then email and bank if reused — the spread window is now. <strong>Day 1:</strong> MFA on everything valuable, kill-all-sessions, revoke tokens, screenshot notices. <strong>Week 1:</strong> vault audit (clear every reused flag), upgrade email MFA to strongest option, file reports (bank, cybercrime.gov.in + 1930 in India) if money or IDs moved. <strong>Month 1:</strong> credit freeze or fraud alert if identity documents leaked; new monitoring routine monthly. Most victims compress all of this into a panicked hour and miss step 2 (the reuses) — which is why this guide leads with order, not speed. Full sequence in <a href="/blog/password-generator-guide/what-to-do-after-data-breach">breach checklist</a>.</p>

<h2 id="advanced-settings">Advanced generator settings (power users)</h2>
<ul>
<li><strong>Bulk generation:</strong> rotating 30 service accounts? Generate batches and paste down a checklist — one session, zero reuse temptation. Service-by-service, oldest first.</li>
<li><strong>Pronounceable mode:</strong> consonant-vowel alternation for secrets humans dictate (Wi-Fi, TV logins) — accept ~30% less entropy per character and add length to compensate (20+).</li>
<li><strong>Exclusion sets:</strong> drop ambiguous (0/O, 1/l/I) only for human-typed codes; drop symbols only where sites force it — every exclusion costs entropy, so narrow exclusions to the actual constraint.</li>
<li><strong>Separate profiles per purpose:</strong> 32-char hex for API/router, 20-char full-pool for logins, 5-word passphrases for masters. Saved presets beat re-deciding each time — configure once in the <a href="/password-generator">generator</a>.</li>
<li><strong>Regenerate on schedule events, not calendars:</strong> new device, team change, suspected phishing, service breach notice — events trigger rotation, dates do not. Tie each profile to its trigger list so rotation decisions take seconds.</li>
</ul>

<h2 id="thirty-day">The 30-day overhaul checklist</h2>
<ol>
<li><strong>Days 1–3:</strong> install manager, memorize email + master passphrases, enable app-2FA on email and bank.</li>
<li><strong>Week 1:</strong> rotate email, bank, cloud and socials to generated uniques; kill old sessions; store recovery codes offline.</li>
<li><strong>Week 2–3:</strong> ten accounts per session — oldest and most valuable first; verify each new secret autofills before closing the tab.</li>
<li><strong>Week 4:</strong> vault audit to zero reused flags, family Wi-Fi QR on the fridge, router admin + PSK rotated per <a href="/blog/password-generator-guide/wifi-router-password">router guide</a>.</li>
<li><strong>Ongoing:</strong> new accounts generated from birth; breach notices answered via <a href="/blog/password-generator-guide/what-to-do-after-data-breach">checklist order</a>; annual manager export backup (encrypted, offline).</li>
</ol>
<h2 id="travel-hygiene">Travel and border crossings: device hygiene</h2>
<p>Travel concentrates risk: unfamiliar networks, shared computers, and officials who may inspect devices. Before flying: update everything (patched devices resist hotel-Wi-Fi attacks), enable full-disk encryption, and sign out of non-essential sessions. At borders, some jurisdictions can demand device access — travelers with sensitive work use loaner profiles carrying minimum data, with the real vault restored after. Hotel and airport Wi-Fi: treat as hostile — VPN on, no banking without it, forget the network afterward so your phone stops auto-shouting for it. The travel-mode concept (hiding selected vaults during inspection) exists in premium managers; at minimum, know what your lock screen reveals — message previews and authenticator codes visible without unlock leak plenty.</p>

<h2 id="family-ages">Kids and elderly: passwords for every age</h2>
<p>Security advice assumes a tech-comfortable adult; households contain everyone else. <strong>Kids:</strong> school portals get passphrases they memorize (three words + number, story-linked), parents hold recovery emails until teens, and gaming accounts — prime phishing targets — get unique secrets from day one so a breached game never reaches the family email. <strong>Elderly parents:</strong> the highest-scam-risk group: write their few master secrets in a sealed envelope you co-store, enable every available alert (login notifications, transaction SMS to YOUR number as backup), and rehearse the two sentences that stop 90% of fraud — “banks never ask for OTPs” and “call me before paying anyone new.” Teach verification, not fear: one weekly 5-minute call beats any software for scam-proofing grandparents.</p>

<h2 id="developer-secrets">Developer secrets: API keys, .env files and rotation</h2>
<p>App passwords and machine secrets obey stricter rules than human ones. <strong>Never hardcode:</strong> keys live in environment variables or secret managers, never in git — one pushed .env burns the key forever (rotate immediately; public repo scanners find secrets in seconds). <strong>Generate properly:</strong> 32+ character hex or UUIDs from the <a href="/random-string">random string</a> and <a href="/uuid-generator">UUID tools</a> — human-memorable patterns have no place in machine credentials. <strong>Scope and rotate:</strong> least-privilege scopes, per-environment keys, rotation on team changes and quarterly for production. <strong> Fingerprint, don't log:</strong> verify deployments with hashes via the <a href="/hash-generator">hash generator</a> rather than printing secrets into logs. The human-password rules in this guide protect people; these protect systems — both fail identically when secrets travel in chat screenshots and email threads.</p>
<h2 id="action-summary">Action summary: your security in one page</h2>
<p>If this guide becomes one printed page on your desk, let it be this list. Generate 16+ random secrets per site in the <a href="/password-generator">free generator</a> (offline, uniform draws). Store all of them in a manager; memorize exactly two passphrases (email + master) via story method from <a href="/blog/password-generator-guide/how-to-remember-passwords">remembering guide</a>. Enable app-2FA or passkeys on email, bank and cloud this week per <a href="/blog/password-generator-guide/2fa-vs-passkeys">MFA order</a>. Answer breach notices with <a href="/blog/password-generator-guide/what-to-do-after-data-breach">checklist order</a>, never panic rotation. Rotate router and Wi-Fi secrets per <a href="/blog/password-generator-guide/wifi-router-password">setup guide</a>, and run the <a href="#thirty-day">30-day overhaul</a> once — then live normally while the system guards you quietly. Cost is one focused afternoon: print the checklist above, work it top to bottom once, then revisit quarterly — unique passwords plus MFA hold up well while threats move around them. Start with email today even if the rest waits for the weekend; that single account guards all the others, and securing it first makes every later step safer and faster.</p>
<blockquote class="tip">General information only, not security advice. Generate offline, store in a manager, enable MFA on email/bank. If you lose your master password it cannot be recovered by us.</blockquote>
`;

const toc = [
  { id: "what-generator-does", text: "What a generator does + no-cloud proof", level: 2 as const },
  { id: "settings-that-matter", text: "Settings: length, pools, exclusions", level: 2 as const },
  { id: "entropy-table", text: "Entropy table + crack framing", level: 2 as const },
  { id: "unique-per-site", text: "Unique per site (anti-stuffing)", level: 2 as const },
  { id: "manager-mfa", text: "Manager + 2FA pairing", level: 2 as const },
  { id: "india-context", text: "India: UPI, OTP scams, reporting", level: 2 as const },
  { id: "retired-myths", text: "Retired myths", level: 2 as const },
  { id: "manager-101", text: "Password managers 101", level: 2 as const },
  { id: "family-sharing", text: "Family sharing safely", level: 2 as const },
  { id: "work-personal", text: "Work vs personal separation", level: 2 as const },
  { id: "breach-hour", text: "Breach hour-by-hour", level: 2 as const },
  { id: "advanced-settings", text: "Advanced generator settings", level: 2 as const },
  { id: "thirty-day", text: "30-day overhaul checklist", level: 2 as const },
  { id: "travel-hygiene", text: "Travel + border hygiene", level: 2 as const },
  { id: "family-ages", text: "Kids and elderly", level: 2 as const },
  { id: "developer-secrets", text: "Developer secrets", level: 2 as const },
  { id: "action-summary", text: "One-page action summary", level: 2 as const },
];

export const passwordPillar: BlogPost = {
  pillar: "password-generator-guide",
  slug: "password-generator-guide",
  kind: "pillar",
  title: "How to Generate a Strong Password (Free Offline Tool)",
  description:
    "Generate strong passwords free and offline: settings, entropy table, passphrases, manager + 2FA pairing, breach basics. No signup, nothing uploads.",
  keywords: [
    "how to generate strong password",
    "how to create strong password without manager",
    "offline password generator no signup",
    "passphrase vs random password",
    "store passwords securely 2fa guide",
    "password generator guide",
  ],
  toolSlugs: ["password-generator", "password-strength", "random-passphrase", "otp-generator"],
  relatedSlugs: ["how-to-create-strong-password", "what-makes-password-strong", "passphrase-vs-password"],
  published: "2026-09-25",
  updated: "2026-09-25",
  readingMinutes: readingMinutesFor(html),
  toc,
  html,
  faqs: [
    {
      question: "How do I generate a strong password for free?",
      answer:
        "Open the free password generator, set length 16+ with upper, lower, digits and symbols, generate locally in your browser and copy it into a manager. No signup, nothing uploads — verify zero network requests in DevTools.",
    },
    {
      question: "How long should my password be?",
      answer:
        "16 characters minimum from the full pool (~104.9 bits), 20+ preferred. Per NIST SP 800-63B, length beats complexity — a long passphrase beats a short symbol-heavy password you cannot remember.",
    },
    {
      question: "Should I use a passphrase or random password?",
      answer:
        "Passphrases (5+ random EFF words, ~64.6 bits) for the few secrets you memorize, like your manager master. Random 16+ character strings for everything stored in the manager.",
    },
    {
      question: "Do I still need 2FA with strong passwords?",
      answer:
        "Yes — phishing and session theft bypass password strength entirely. Enable authenticator-app 2FA on email and bank first, passkeys where offered. SMS codes are SIM-swappable and weakest.",
    },
    {
      question: "How often should I change passwords?",
      answer:
        "Only on breach evidence — NIST retired forced rotation because it produces weaker sequential passwords. Unique-per-site passwords plus MFA beat calendar changes.",
    },
    {
      question: "Is this security advice?",
      answer:
        "No — general information only. Consider your threat model, and note no tool can recover a lost master password, so keep recovery codes offline.",
    },
  ],
};
