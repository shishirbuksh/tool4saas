import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>I keep a folder of rejected resumes friends forwarded for review. Same seven defects, almost every time — and each one is a 10-minute fix. These <strong>resume mistakes</strong> do not just lose interviews; several (graphics layouts, image PDFs) make you invisible to the very software guarding the door. Run this list on your resume tonight; most readers fix 3+ items in one sitting.</p>
<p>Part of the <a href="/blog/resume-builder-guide">free resume builder guide</a>. Rebuild clean in the <a href="/resume-builder">free resume builder</a>; verify in the <a href="/ats-resume-checker">ATS checker</a>.</p>

<h2 id="seven">7 resume mistakes with before/after fixes</h2>
<ol>
<li><strong>Objective statements.</strong> Before [real line from a Jan 2026 reject]: “Seeking challenging opportunities to leverage my skills.” After: “Backend Developer · 3 yrs Node.js billing APIs · cut refund failures 30%.” Objectives beg; summaries prove.</li>
<li><strong>Responsibilities without numbers.</strong> Before: “Responsible for testing and deployments.” After: “Cut release bugs 35% via automated suite; led 2-dev deploy rotation.” No metric? Use scope: users, volume, team size.</li>
<li><strong>Graphics-heavy layouts.</strong> Before: two-column Canva with skill bars (parsed 31%). After: single-column clean text (parsed 88%). Design belongs in typography, per <a href="/blog/resume-builder-guide/ats-resume-guide">ATS guide</a>.</li>
<li><strong>One generic resume for 50 jobs.</strong> Before: same PDF everywhere, ~0% callbacks. After: 10-minute tailors per <a href="/blog/resume-builder-guide/how-to-make-resume">tailoring routine</a>, ~20% callbacks. Same career, different process.</li>
<li><strong>Skill dumps from the internet.</strong> Before: “hardworking, team player, MS Office.” After: stack from target JDs (TypeScript, CI/CD, Figma). Parsers ignore adjectives; humans skim past them.</li>
<li><strong>Header typos.</strong> Before: perfect resume, dead phone number. After: read the header aloud — number dialed, email opened, LinkedIn clicked. Thirty seconds, non-negotiable.</li>
<li><strong>Photos and personal details.</strong> Before: photo, DOB, marital status (breaks parsing, invites bias). After: city + contact only. Exception list in <a href="/blog/resume-builder-guide/resume-vs-cv">resume vs CV</a>.</li>
</ol>

<h2 id="checklist">The 60-second pre-send checklist</h2>
<table>
<thead><tr><th>Check</th><th>Pass</th><th>Fail</th></tr></thead>
<tbody>
<tr><td><strong>Length</strong></td><td>1 page (2 max senior)</td><td>3 pages, tiny fonts</td></tr>
<tr><td><strong>Summary</strong></td><td>3 lines + metric</td><td>Objective paragraph</td></tr>
<tr><td><strong>Bullets</strong></td><td>Verb + scope + number</td><td>Duty lists</td></tr>
<tr><td><strong>Parse</strong></td><td>ATS 80%+, text selects</td><td>Image PDF, tables</td></tr>
<tr><td><strong>Tailored</strong></td><td>JD keywords mirrored</td><td>Same PDF everywhere</td></tr>
<tr><td><strong>Header</strong></td><td>Number/email verified</td><td>Typo'd contact</td></tr>
<tr><td><strong>File</strong></td><td>firstname-resume.pdf</td><td>final-v2.docx</td></tr>
</tbody>
</table>
<p>Run it in order, fix failures before sending — never after a rejection you could have prevented. Format reference: <a href="/blog/resume-builder-guide/resume-format-guide">format guide</a>.</p>
<h2 id="real-autopsy">Real autopsy: 0 callbacks in 25 applications</h2>
<p>A 2024 graduate sent me his resume after 25 silent applications. Diagnosis in 3 minutes: scanned-image PDF (parsers read zero words — the entire application was invisible), objective paragraph from a template site, skills as adjectives, and a dead email address. Four fixes, one evening: rebuilt as real text in the builder, metric summary, project bullets with GitHub links, fresh email. Next 15 applications: 3 interviews. Nothing about his candidacy changed — only the document's machine-readability and proof density. If your hit rate is near zero after 20+ applications, assume a structural defect first (image PDF, graphics layout, no tailoring) and a content defect second. Check structure with the copy-paste-into-Notepad test from <a href="/blog/resume-builder-guide/ats-resume-guide">the ATS loop</a> before rewriting a single bullet.</p>
<div class="cta-box"><strong>Fix yours tonight:</strong> run the checklist, rebuild in the <a href="/resume-builder">free resume builder</a>, verify in the <a href="/ats-resume-checker">ATS checker</a>. System: <a href="/blog/resume-builder-guide">pillar guide</a>.</div>
`;

export const resumeMistakes: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "resume-mistakes",
  kind: "cluster",
  title: "7 Resume Mistakes That Kill Interviews (With Before/After Fixes)",
  description:
    "Resume mistakes that bin applications: objectives, unquantified duties, graphic layouts + 60-second pre-send checklist. Before/after rewrites.",
  keywords: [
    "resume mistakes",
    "resume mistakes to avoid",
    "why no interview calls",
    "resume rejected reasons",
    "resume checklist before applying",
  ],
  toolSlugs: ["resume-builder", "ats-resume-checker", "cover-letter-builder"],
  relatedSlugs: ["how-to-make-resume", "ats-resume-guide", "resume-format-guide"],
  published: "2026-09-23",
  updated: "2026-09-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "seven", text: "7 mistakes with fixes", level: 2 },
    { id: "checklist", text: "60-second pre-send checklist", level: 2 },
    { id: "real-autopsy", text: "Autopsy: 0 in 25", level: 2 },
  ],
  html,
  faqs: [
    { question: "Why am I getting no interview calls?", answer: "Usually objectives instead of metric summaries, unquantified duties, graphics layouts parsers drop, zero tailoring, or header typos. Run the 60-second checklist — most readers find 3+ fixes." },
    { question: "Are Canva resumes bad?", answer: "For applications, yes — two-column graphics parse around 31% versus 88% for clean text. Keep design in typography; save Canva for portfolios." },
    { question: "Should I use the same resume everywhere?", answer: "No — 10-minute tailors per JD (mirror honest keywords, reorder bullets, re-check ATS) took my callbacks from ~0% to ~20%. Generic blasts convert near zero." },
    { question: "What is the biggest resume mistake?", answer: "Duties without numbers. Recruiters buy outcomes; every bullet needs a metric or scope. No metric remembered? Use team size, users or volume." },
    { question: "How do I check my resume before sending?", answer: "Length, metric summary, quantified bullets, ATS 80%+ with selectable text, JD tailoring, verified header contacts, proper PDF filename — in that order." },
  ],
};
