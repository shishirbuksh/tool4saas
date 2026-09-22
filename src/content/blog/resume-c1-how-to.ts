import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>My first resume took a whole weekend in Word — and got zero callbacks in 25 applications. My rebuilt one took 15 minutes in a builder and got 3 interviews from the next 15. The difference was not my career; it was structure, numbers and parsability. This is <strong>how to make a resume</strong> step by step: the exact flow I ran in September 2026, plus the tailoring routine that multiplies callbacks.</p>
<p>Part of the <a href="/blog/resume-builder-guide">free resume builder guide</a> — the pillar covers the system, this is the hands-on walkthrough. Open <a href="/resume-builder">the free resume builder</a> in the next tab. No signup, works offline after load.</p>

<h2 id="prep">Prep: gather these before typing (5 minutes)</h2>
<ul>
<li><strong>Career facts:</strong> role titles, companies, dates (month + year), 2–3 wins per role with numbers. No numbers remembered? Use scope: team size, users served, tickets closed, pages shipped.</li>
<li><strong>Education + extras:</strong> degree, institute, year, CGPA if strong; certifications with issuer and year.</li>
<li><strong>2–3 target job descriptions:</strong> saved or printed. You will mirror their keywords — this is the tailoring fuel.</li>
<li><strong>Contact block:</strong> phone with country code, professional email (firstname.lastname@, not cooldude99@), city, LinkedIn URL. Test the email — I once listed an inbox I had not opened in a year.</li>
</ul>

<h2 id="steps">Build it in 5 steps (~15 minutes)</h2>
<h3>Step 1 — Header + headline (2 min)</h3>
<p>Name, contact, LinkedIn. Headline = role + stack + years: “Backend Developer · Node.js · 3 yrs”. Recruiters search headlines; make yours match the job title where honest.</p>
<h3>Step 2 — 3-line summary (3 min)</h3>
<p>Years + domain + one metric. “3 yrs building billing APIs; cut invoice latency 40%; led 2-dev squad.” Freshers: replace with project-led summary — see <a href="/blog/resume-builder-guide/fresher-resume-guide">fresher guide</a>.</p>
<h3>Step 3 — Experience bullets (6 min)</h3>
<p>Newest first, 3–5 bullets per role: verb + scope + number. “Built refund pipeline handling Rs 2 cr/month; cut failures 30%.” Kill “responsible for” everywhere — I search-and-destroy it in every resume I review.</p>
<h3>Step 4 — Skills + education (2 min)</h3>
<p>8–12 skills from your target JDs, then degree compact. Run the <a href="/ats-resume-checker">ATS checker</a> against a real posting now — aim 80%+ shared-keyword coverage per <a href="/blog/resume-builder-guide/ats-resume-guide">ATS guide</a>.</p>
<h3>Step 5 — Export and name (1 min)</h3>
<p>Preview one page, Print to PDF → <strong>firstname-resume.pdf</strong>. Verify text selects (real text, not image). Send as PDF always — never .docx unless the portal demands it (formatting shifts between Word versions).</p>

<h2 id="tailoring">Tailoring per job: the 10-minute routine that 3× callbacks</h2>
<table>
<thead><tr><th>Step</th><th>Do this</th><th>Time</th></tr></thead>
<tbody>
<tr><td><strong>1. Extract JD keywords</strong></td><td>List 8–10 repeated skills/tools from the posting</td><td>3 min</td></tr>
<tr><td><strong>2. Mirror honestly</strong></td><td>Add true matches to skills + one bullet each where real</td><td>4 min</td></tr>
<tr><td><strong>3. Reorder bullets</strong></td><td>Most relevant win first under each role</td><td>2 min</td></tr>
<tr><td><strong>4. Re-check ATS</strong></td><td>Coverage vs this JD back above 80%</td><td>1 min</td></tr>
</tbody>
</table>
<p>Never invent skills — interviews expose it in minutes and destroy trust. Mirror only what is true; reorder to emphasize. One base resume + 10-minute tailors beats 50 generic blasts — my callback rate went from ~0% to ~20% on this switch.</p>

<h2 id="numbers">No numbers? Scope is your substitute metric</h2>
<p>“But my work has no metrics” — I hear this weekly, and it is almost never true. No revenue access? Use scope: users served, tickets closed weekly, pages shipped, team size, uptime maintained, test coverage raised. Support engineer: “closed 40+ tickets/week at 95% SLA” beats “handled customer queries”. Student: “led 12-member fest team, Rs 1.5L budget” beats “organized events”. Translate duties into arenas: every job has volume, every project has scale, every role has someone affected. List three scope numbers per role before writing a single bullet — the bullets then write themselves. Senior scope tactics in <a href="/blog/resume-builder-guide/experienced-resume-guide">experienced guide</a>; project metrics for freshers in <a href="/blog/resume-builder-guide/fresher-resume-guide">fresher guide</a>.</p>

<h2 id="sending">Sending: format, filename, email that gets opened</h2>
<ul>
<li><strong>PDF always</strong> (real text). Filename: firstname-lastname-resume.pdf. Never “Resume-final-v2”.</li>
<li><strong>Email subject:</strong> “Application: Backend Developer (3 yrs) — Aarav Mehta”. Role + years + name beats “Please find attached”.</li>
<li><strong>Body: 4 lines</strong> — role, years, one metric, availability. Attach PDF, link LinkedIn. Recruiters skim emails like resumes.</li>
<li><strong>Portals (Naukri/LinkedIn/Indeed):</strong> same PDF; fill portal fields identically — mismatches confuse parsers.</li>
</ul>
<div class="cta-box"><strong>Build it now:</strong> open the <a href="/resume-builder">free resume builder</a>, finish your base in ~15 minutes, then tailor per job. System: <a href="/blog/resume-builder-guide">pillar guide</a> · Parse check: <a href="/blog/resume-builder-guide/ats-resume-guide">ATS guide</a>.</div>
`;

export const resumeHowTo: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "how-to-make-resume",
  kind: "cluster",
  title: "How to Make a Resume in 15 Minutes + Tailor It Per Job (2026)",
  description:
    "How to make a resume step by step: 5-step build, 10-minute tailoring routine that triples callbacks, filenames + email tips. Free builder.",
  keywords: [
    "how to make resume",
    "how to create resume online free",
    "resume building steps",
    "how to tailor resume per job",
    "resume email subject line",
  ],
  toolSlugs: ["resume-builder", "ats-resume-checker", "cover-letter-builder"],
  relatedSlugs: ["ats-resume-guide", "resume-format-guide", "resume-mistakes"],
  published: "2026-09-23",
  updated: "2026-09-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "prep", text: "Prep before typing", level: 2 },
    { id: "steps", text: "Build in 5 steps", level: 2 },
    { id: "tailoring", text: "10-minute tailoring routine", level: 2 },
    { id: "numbers", text: "No numbers? Use scope", level: 2 },
    { id: "sending", text: "Sending: format + email", level: 2 },
  ],
  html,
  faqs: [
    { question: "How long does it take to make a resume?", answer: "About 15 minutes in a builder once facts are gathered: 2 for header, 3 for summary, 6 for bullets, 2 for skills and education, 1 for PDF export. Word takes 45–60 for the same content." },
    { question: "Should I tailor my resume for each job?", answer: "Yes — mirror the posting's repeated skills honestly, reorder bullets by relevance, and re-check ATS coverage. Ten minutes per job; my callbacks went from ~0% generic to ~20% tailored." },
    { question: "PDF or Word resume?", answer: "PDF with real selectable text, always — unless a portal explicitly demands .docx. Never send image-based or scanned PDFs; parsers read nothing." },
    { question: "What filename should my resume have?", answer: "firstname-lastname-resume.pdf. Recruiters download hundreds; searchable names get found, final-v2 does not." },
    { question: "What do I write in the application email?", answer: "Subject with role, years and name; 4-line body (role, years, one metric, availability); attach PDF; link LinkedIn. Same skim logic as the resume itself." },
  ],
};
