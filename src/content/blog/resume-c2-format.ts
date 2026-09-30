import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Last month I pasted a two-column Canva “resume format” made for a Pune fresher into our ATS checker — 31% parsed. Same text, single column: 88%. Here is the truth behind that 57-point gap: <strong>professional resume format</strong> means chronological, single column, standard headings. Everything else is decoration that costs callbacks. This guide shows the exact format for India, the US and the UK, with section order and a sample skeleton you can copy.</p>
<p>Part of the <a href="/blog/resume-builder-guide">free resume builder guide</a>. Build in the format below with the <a href="/resume-builder">free resume builder</a>; verify parsing in the <a href="/ats-resume-checker">ATS checker</a>.</p>

<h2 id="the-format">The format that works: section order + skeleton</h2>
<ol>
<li><strong>Header:</strong> Name | phone (+country code) | email | city | LinkedIn</li>
<li><strong>Headline:</strong> Role · stack · years (one line)</li>
<li><strong>Summary:</strong> 3 lines — years, domain, one metric</li>
<li><strong>Experience:</strong> newest first; 3–5 quantified bullets per role</li>
<li><strong>Skills:</strong> 8–12, mirrored from target JDs</li>
<li><strong>Education:</strong> degree, institute, year (compact for experienced)</li>
<li><strong>Extras:</strong> certifications, open-source, languages — one line each</li>
</ol>
<ul>
<li><strong>Fonts:</strong> Arial, Calibri, Georgia or similar at 10.5–11.5pt. Exotic fonts break on recruiters' systems.</li>
<li><strong>Margins:</strong> 1.5–2 cm; white space is readability, not waste.</li>
<li><strong>Length:</strong> 1 page to ~8 years; 2 max beyond. UK CV: 2 pages standard.</li>
</ul>

<h2 id="chron-vs-rest">Chronological vs functional vs hybrid</h2>
<table>
<thead><tr><th>Format</th><th>Structure</th><th>Use when</th><th>Recruiter view</th></tr></thead>
<tbody>
<tr><td><strong>Chronological</strong></td><td>Newest role first</td><td>Default — 90% of applicants</td><td>Trusted, skimmable</td></tr>
<tr><td><strong>Functional</strong></td><td>Skills groups, no timeline</td><td>Almost never</td><td>Suspicious — hides gaps</td></tr>
<tr><td><strong>Hybrid</strong></td><td>Skills snapshot + short history</td><td>Career pivots, big gaps</td><td>Acceptable if honest</td></tr>
</tbody>
</table>
<p>Functional resumes read as gap-hiding to experienced recruiters — I have heard three hiring managers say exactly that. Pivoting? Use hybrid: a skills snapshot up top, then a compact honest timeline. Career-switch tactics in <a href="/blog/resume-builder-guide/experienced-resume-guide">experienced guide</a>.</p>

<h2 id="country-norms">India vs US vs UK norms (get these right)</h2>
<ul>
<li><strong>India:</strong> 1–2 pages, no photo, no declaration, references on request. Freshers: detailed education + projects; add <a href="/blog/resume-builder-guide/fresher-resume-guide">fresher guide</a> tactics. Govt jobs may want biodata — different document, see <a href="/blog/resume-builder-guide/resume-vs-cv">resume vs CV</a>.</li>
<li><strong>US:</strong> strictly 1 page early-career; no photo, age, marital status or address beyond city. Metrics-heavy bullets expected.</li>
<li><strong>UK:</strong> 2-page CV standard with personal statement; no photo; referees available on request.</li>
<li><strong>Universal:</strong> real-text PDF, standard headings, no graphics-as-information. Test in the <a href="/ats-resume-checker">ATS checker</a> regardless of country.</li>
</ul>
<h2 id="formatting-details">Formatting details that separate clean from careless</h2>
<p>Same sections, different execution — recruiters feel the gap in seconds. <strong>Dates:</strong> month + year both sides (“Jan 2023 – Aug 2025”), right-aligned, consistent punctuation. Year-only ranges hide job-hopping and recruiters know it. <strong>Verb tense:</strong> past roles past tense, current role present — mixed tenses read as sloppy in one glance. <strong>Consistency:</strong> one bullet style (all start with verbs), one date format, one way of writing the same tool (pick “Next.js” and never “NextJS” elsewhere). <strong>White space:</strong> if adding a line forces page two, cut a weaker bullet instead of shrinking to 9pt — unreadable density fails the skim before content gets a chance. I run a final consistency pass reading only the left edge (verbs), then only the right edge (dates) — two minutes, catches everything.</p>
<div class="cta-box"><strong>Build in this format now:</strong> open the <a href="/resume-builder">free resume builder</a> — sections already ordered right. Walkthrough: <a href="/blog/resume-builder-guide/how-to-make-resume">how to make a resume</a> · System: <a href="/blog/resume-builder-guide">pillar guide</a>.</div>

<h2 id="ats-tests">ATS parsing tests you can run in ten minutes</h2>
<p>Paste your resume text into our <a href="/ats-resume-checker">ATS checker</a> and confirm scores above 80% against a target job description before submitting. Then run manual checks recruiters use: copy all text from the PDF and paste into plain Notepad — scrambled order means tables or text boxes broke parsing; search for standard headings like Experience and Education since creative labels like My Journey confuse parsers; and verify dates align right without disappearing. The <a href="https://www.dol.gov/general/topic/hiring">US Department of Labor hiring resources</a> confirm standard chronological formats parse most reliably. Fix failures by switching to single-column layouts, Arial or Calibri at 10.5 to 11.5pt, and real-text PDFs exported from the <a href="/resume-builder">free resume builder</a> rather than scanned images or Canva graphics.</p>
<h2 id="page-length">One page versus two pages: decide with experience math</h2>
<p>Stay on one page through roughly eight years by cutting older internships, redundant bullets, and coursework that no longer signals seniority. Move to two pages when three quantified roles plus 10 skills cannot fit at readable density — shrinking to 9pt to force one page fails the skim before content gets judged. The <a href="https://www.careeronestop.org/Resumes/ResumeGuide/ResumeGuide.aspx">CareerOneStop resume guide</a> advises concise relevant history over exhaustive lists. UK CVs run two pages standard with personal statements; US early-career stays strictly one. Test both lengths with hiring-manager friends who spend 30 seconds each: if page two holds the metric that wins interviews, keep it; if it holds hobbies, cut it.</p>
<h2 id="bullets-proof">Bullets that prove instead of claim</h2>
<p>Recruiters trust numbers over adjectives, so rewrite duties as outcomes with scope. Formula: strong verb plus task plus metric plus context — Led checkout redesign lifting conversion 18% across 40k monthly users, or Cut report time 6 hours weekly by automating SQL pulls for 12 analysts. Mirror exact tool spellings from target descriptions since parsers match literally: Next.js versus NextJS counts separately. Keep 3 to 5 bullets per role, newest first, with past tense for prior jobs and present for current. Run a final verb-only read down the left edge plus date-only read down the right edge; inconsistencies reveal themselves in two minutes.</p>


<h2 id="header-mistakes">Header mistakes that cost callbacks</h2>
<p>Headers decide whether recruiters reach your bullets: include name, phone with country code, email, city, plus LinkedIn URL on one line, and omit photos, birth dates, marital status, plus full street addresses that trigger bias filters and waste space. Use a one-line headline with role, stack, plus years to orient skim readers instantly. Test headers by printing at 100 percent and viewing from one meter — crowded contact blocks signal poor prioritization before experience gets read.</p>

`;

export const resumeFormat: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "resume-format-guide",
  kind: "cluster",
  title: "Resume Format Guide: Sections, Order & India/US/UK Norms (2026)",
  description:
    "Professional resume format: exact section order, chronological vs functional, India/US/UK norms + skeleton to copy. Free builder + ATS check.",
  keywords: [
    "resume format",
    "professional resume format",
    "resume format india",
    "chronological resume format",
    "resume section order",
  ],
  toolSlugs: ["resume-builder", "ats-resume-checker", "cover-letter-builder"],
  relatedSlugs: ["how-to-make-resume", "resume-vs-cv", "ats-resume-guide"],
  published: "2026-09-23",
  updated: "2026-09-28",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "the-format", text: "Section order + skeleton", level: 2 },
    { id: "chron-vs-rest", text: "Chronological vs functional", level: 2 },
    { id: "country-norms", text: "India vs US vs UK norms", level: 2 },
    { id: "formatting-details", text: "Details: clean vs careless", level: 2 },
    { id: "ats-tests", text: "ATS tests in 10 minutes", level: 2 },
    { id: "page-length", text: "One vs two pages", level: 2 },
    { id: "bullets-proof", text: "Bullets that prove", level: 2 },
    { id: "header-mistakes", text: "Header mistakes", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the best resume format?", answer: "Chronological, single column, standard headings — newest role first. It suits 90% of applicants and parses cleanly in ATS software. Use hybrid only for pivots or large gaps." },
    { question: "What order should resume sections go in?", answer: "Header, one-line headline, 3-line summary, experience newest-first, skills, compact education, one-line extras. Recruiters scan top-down; proof must come before history." },
    { question: "Is a functional resume a good idea?", answer: "Almost never — recruiters read skill-only formats as gap-hiding. Career switchers should use hybrid: skills snapshot plus an honest compact timeline." },
    { question: "How long should my resume be in India?", answer: "One page for freshers and early career, up to two with substantial experience. UK CVs run two pages standard; US resumes stay one page early-career." },
    { question: "Should Indian resumes include photos?", answer: "No — standard practice across India, US and UK is no photo. Photos risk bias filtering and break ATS parsing." },
    { question: "How do I test resume parsing quickly?", answer: "Copy PDF text into Notepad to check order, verify standard headings parse, and score above 80 percent in the ATS checker. Single-column real-text PDFs in Arial or Calibri pass most reliably." },
  ],
};
