import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“We found your email in a breach.” Your stomach drops — then the dangerous part starts: panic-changing one password while twelve reused siblings stay live. Breach response has a correct order, and order matters more than speed. This <strong>data breach checklist</strong> gives the 7 steps in priority sequence, tested against CISA and NIST compromise guidance.</p>
<p>Part of the <a href="/blog/password-generator-guide">password generator guide</a>. Generate replacements in the <a href="/password-generator">password generator</a>; unique OTPs for resets via the <a href="/otp-generator">OTP tool</a>; fingerprint public keys with the <a href="/hash-generator">hash generator</a> where applicable.</p>

<h2 id="seven-steps">The 7 steps, in order (do not skip ahead)</h2>
<ol>
<li><strong>Contain the breached account:</strong> change its password immediately — generated, unique, 16+ — from a clean device. If malware is suspected, clean the device first or the new secret is compromised at birth.</li>
<li><strong>Rotate every reuse:</strong> list all sites sharing the password or its pattern, change each to unique generated secrets, email and bank first. This step — not step 1 — stops the spread.</li>
<li><strong>Enable MFA everywhere it matters:</strong> authenticator app on email, bank, cloud storage and socials. Attackers holding old session tokens get locked out at next challenge.</li>
<li><strong>Kill sessions and keys:</strong> “log out all devices” on email/socials, revoke app passwords and API tokens minted under the old credential, re-issue where needed.</li>
<li><strong>Check exposure scope:</strong> breach-notification details (what fields leaked: passwords only, or IDs, cards, addresses?) set steps 6–7. Screenshot the notice for records.</li>
<li><strong>Watch money and identity:</strong> bank alerts on, statements scanned 60 days, credit freeze or fraud alert if IDs leaked. India: report at cybercrime.gov.in + 1930 helpline promptly.</li>
<li><strong>Do NOT calendar-rotate everything else:</strong> clean unique passwords stay. Mass rotation wastes the window where steps 1–6 matter and breeds weaker replacements.</li>
</ol>

<h2 id="aftermath">Aftermath: the week after (lock in the lesson)</h2>
<ul>
<li><strong>Audit with a manager report:</strong> most managers flag reused/weak/compromised vault entries — clear every flag within 7 days while motivation is hot.</li>
<li><strong>Upgrade email to hardware-grade:</strong> breach survivors should move email MFA to the strongest available option (passkey or hardware key) — your inbox is the recovery path for everything.</li>
<li><strong>Document what leaked where:</strong> one note (offline) mapping breached service → data types → actions taken. Future-you triages the next notice in minutes.</li>
<li><strong>India specifics:</strong> UPI-linked email breaches deserve same-day bank notification; SIM-swap symptoms (sudden no-signal) mean call the carrier and bank immediately, then the cyber helpline.</li>
</ul>
<h2 id="small-business">Small-business breach drill (quarterly, 30 minutes)</h2>
<p>Five-person shops face the same ransomware and stuffing attacks with no SOC. Quarterly drill: verify backups restore (actually restore one file), confirm MFA on email/cloud/bank for every staffer, rotate the three shared credentials (Wi-Fi, socials, vendor portals), and check haveibeenpwned-style exposure for company domains. Assign one owner per item — shared responsibility means no responsibility. Log date + findings on one page; cyber-insurance applications and client security questionnaires accept documented drills as evidence. When a real notice lands, the team runs the <a href="#seven-steps">7-step order above</a> instead of improvising — drills convert panic into procedure. Cost: two working hours per quarter for the whole company.</p>
<blockquote class="tip">General information only, not security advice. Generate offline, store in a manager, enable MFA on email/bank. If you lose your master password it cannot be recovered by us.</blockquote>

<h2 id="monitoring">Monitoring money and identity for 60 days</h2>
<p>After containing accounts, watch financial and identity rails for two months because leaked IDs plus cards monetize slowly. Enable bank transaction alerts for every charge, scan statements weekly for micro-charges that test stolen cards, and place credit freezes or fraud alerts when government IDs leaked — freezes are free and lift temporarily when applying. The <a href="https://www.identitytheft.gov/steps">FTC identity-theft recovery steps</a> walk through reports plus affidavits if misuse appears. India readers: report UPI-linked fraud at cybercrime.gov.in plus the 1930 helpline the same day, then notify banks in writing. Keep a one-page log with dates, reference numbers, and actions taken; future disputes resolve faster with contemporaneous notes than with memory. General information only, not security advice.</p>
<h2 id="breach-kit">Build a personal breach kit before you need it</h2>
<p>Prepare a sealed envelope plus manager vault that turn the 7-step checklist into a ten-minute response. Contents: printed recovery codes for email, bank, and cloud stored in a safe; a list of accounts sharing old passwords flagged for rotation priority; bank plus carrier phone numbers for fast freezes; and a clean device plan specifying which laptop or phone you trust for resets. The <a href="https://www.cisa.gov/secure-our-world/update-software">CISA security basics</a> remind that updated devices plus unique passwords blunt most stuffing attacks. Practice once: rotate one low-stakes password using only kit contents to confirm codes work after phone migrations. Classroom and small-business variants add a contact tree plus backup-restore test dates. Kits expire silently — review codes annually and regenerate after every authenticator move.</p>
<h2 id="scams-after">Scams that follow breaches (and scripts to deflect)</h2>
<p>Leaked emails trigger phishing waves impersonating the breached company, banks, and delivery firms within days. Scripts help: delete password-reset emails you did not request and navigate manually instead of clicking; hang up on caller-ID bank calls and dial the number on your card; ignore parcel-holding texts demanding fees. Verify sender domains character by character since homograph tricks swap letters. Report phishing to providers, warn family members using the same service, and keep MFA on even when tired — fatigue approvals hand attackers the session. Log every suspicious message with headers for a week; patterns reveal which breach sourced the wave and who else needs warnings.</p>


<h2 id="family-plan">Family notification plan in one evening</h2>
<p>Breach notices affect shared accounts, so notify household members the same evening with clear actions rather than vague worry. List which streaming, banking, and email accounts shared the exposed password, assign each person two rotations, and confirm MFA enabled on email plus bank before bedtime. Print recovery codes for older relatives who lose phones often, storing copies in sealed envelopes. Schools and clubs using shared logins should rotate those credentials separately with per-group suffixes. A calm 30-minute huddle prevents months of scattered account-takeover cleanup across family devices.</p>

`;

export const passwordBreach: BlogPost = {
  pillar: "password-generator-guide",
  slug: "what-to-do-after-data-breach",
  kind: "cluster",
  title: "What to Do After a Data Breach: 7-Step Checklist (2026)",
  description:
    "Data breach response in priority order: contain, rotate reuses, MFA, kill sessions, scope, monitor, no mass rotation. CISA/NIST-aligned checklist.",
  keywords: [
    "what to do after data breach",
    "change passwords after breach",
    "have i been pwned what next",
    "breach password reset order",
  ],
  toolSlugs: ["password-generator", "hash-generator", "otp-generator"],
  relatedSlugs: ["how-to-create-strong-password", "2fa-vs-passkeys", "how-to-remember-passwords"],
  published: "2026-09-25",
  updated: "2026-09-28",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "seven-steps", text: "7 steps in order", level: 2 },
    { id: "aftermath", text: "The week after", level: 2 },
    { id: "small-business", text: "Small-business drill", level: 2 },
    { id: "monitoring", text: "60-day monitoring", level: 2 },
    { id: "breach-kit", text: "Personal breach kit", level: 2 },
    { id: "scams-after", text: "Post-breach scams", level: 2 },
    { id: "family-plan", text: "Family plan", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the first thing to do after a breach?", answer: "Change the breached account's password from a clean device, then immediately rotate every account sharing it — email and bank first. Containment then spread-stopping, in that order." },
    { question: "Should I change all my passwords after a breach?", answer: "No — change breached plus reused ones, enable MFA, kill sessions. Mass-rotating clean unique passwords wastes effort and breeds weaker replacements." },
    { question: "How do I know what leaked?", answer: "Read the breach notice for field types (passwords, IDs, cards). Screenshot it; scope sets whether you also freeze credit and watch statements for 60 days." },
    { question: "What if my email was breached?", answer: "Treat as critical: new unique passphrase, strongest MFA available, kill all sessions, revoke app passwords — your inbox recovers everything else." },
    { question: "Where do Indians report cyber fraud?", answer: "cybercrime.gov.in plus the 1930 helpline, fast — recovery odds decay with hours. Notify the bank same-day for UPI-linked breaches." },
    { question: "How long should I watch accounts after a breach?", answer: "Scan statements plus alerts for 60 days, keep credit freezes until applications require lifts, and retain breach notices with reference numbers. Most misuse surfaces within weeks; ID theft can lag months, so keep the log accessible." },
  ],
};
