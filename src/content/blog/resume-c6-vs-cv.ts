import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>I was cc'd when a founder forwarded a 4-page biodata — photo, father's name, religion — for a Bengaluru startup role, as a joke. The applicant never got a reply. “Send your CV.” “Send your resume.” “Send your biodata.” Three requests, three different documents — and sending the wrong one marks you as careless before page one. Do not be that applicant. Here are the exact lines between <strong>resume vs CV vs biodata</strong>.</p>
<p>Part of the <a href="/blog/resume-builder-guide">free resume builder guide</a>. Build resumes in the <a href="/resume-builder">free resume builder</a>.</p>

<h2 id="three-docs">The three documents side by side</h2>
<table>
<thead><tr><th>Document</th><th>Length</th><th>Content</th><th>Used for</th></tr></thead>
<tbody>
<tr><td><strong>Resume</strong> (India/US)</td><td>1–2 pages</td><td>Tailored summary: skills, experience, outcomes</td><td>Private jobs, startups, portals</td></tr>
<tr><td><strong>CV</strong> (UK / academia)</td><td>2 pages (UK); full record (academia)</td><td>Complete career + education chronology</td><td>UK jobs, research, medicine</td></tr>
<tr><td><strong>Biodata</strong></td><td>1–4 pages</td><td>Personal details: photo, DOB, family, marital status</td><td>Matrimonial, some govt/PSU posts</td></tr>
</tbody>
</table>
<ul>
<li><strong>Resume vs CV in India:</strong> private-sector hiring universally means resume — short, tailored, metric-led. “CV” on Indian portals usually just means “upload your resume”.</li>
<li><strong>Resume vs CV in the UK:</strong> CV is the standard 2-pager with personal statement. Same content discipline, slightly longer leash.</li>
<li><strong>Academic CV:</strong> the exception — full publications, teaching, grants, no page limit. Only for research roles.</li>
<li><strong>Biodata:</strong> never for startups or MNCs. If a government post asks for it, give exactly their proforma — nothing creative.</li>
</ul>

<h2 id="which-when">Which to send when (30-second rules)</h2>
<ul>
<li><strong>Startup / MNC / portal (Naukri, LinkedIn, Indeed) → resume.</strong> Tailored per role per <a href="/blog/resume-builder-guide/how-to-make-resume">tailoring routine</a>.</li>
<li><strong>UK employer asking “CV” → 2-page CV</strong> with personal statement. Format norms in <a href="/blog/resume-builder-guide/resume-format-guide">format guide</a>.</li>
<li><strong>Professor / research / medical → academic CV</strong>, complete record, references included.</li>
<li><strong>Asked “biodata” explicitly → their proforma</strong>, personal details as requested. Otherwise never volunteer photo, DOB or marital status — it breaks <a href="/blog/resume-builder-guide/ats-resume-guide">ATS parsing</a> and invites bias.</li>
</ul>
<h3>The photo rule, once and for all</h3>
<p>No photo on resumes or CVs across India, US and UK — with one narrow exception: acting, modeling, and front-desk hospitality roles where appearance is a stated criterion. Everyone else: photo-free, parser-clean, bias-safe.</p>
<h2 id="portal-labels">Portal labels decoded (Naukri, LinkedIn, Indeed)</h2>
<p>Indian portals say “upload CV” while expecting a resume — the button label is legacy, the parser wants the short tailored document. LinkedIn Easy Apply pulls your profile, so profile-resume consistency decides: same titles, same dates, same metrics. Mismatches (Senior on LinkedIn, SDE-2 on resume) read as inflation. Indeed and Naukri parse your uploaded PDF into fields — check the autofilled preview; garbled fields mean your layout failed parsing, fix per <a href="/blog/resume-builder-guide/ats-resume-guide">ATS guide</a> and re-upload. Government portals (UPSC, SSC, PSU) are the true biodata lane: follow their proforma exactly, attach exactly what is asked, nothing creative — compliance is the test there, not design.</p>
<div class="cta-box"><strong>Build the right one now:</strong> resume in the <a href="/resume-builder">free resume builder</a>. System: <a href="/blog/resume-builder-guide">pillar guide</a> · Formats: <a href="/blog/resume-builder-guide/resume-format-guide">format guide</a>.</div>
`;

export const resumeVsCv: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "resume-vs-cv",
  kind: "cluster",
  title: "Resume vs CV vs Biodata: Differences & When to Use Each (2026)",
  description:
    "Resume vs CV vs biodata explained with a comparison table, country rules and the photo rule. Send the right document every time.",
  keywords: [
    "resume vs cv",
    "difference between resume and cv",
    "cv vs resume india",
    "biodata vs resume",
    "what is biodata format",
  ],
  toolSlugs: ["resume-builder", "ats-resume-checker", "cover-letter-builder"],
  relatedSlugs: ["resume-format-guide", "how-to-make-resume", "fresher-resume-guide"],
  published: "2026-09-23",
  updated: "2026-09-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "three-docs", text: "Three documents side by side", level: 2 },
    { id: "which-when", text: "Which to send when", level: 2 },
    { id: "portal-labels", text: "Portal labels decoded", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the difference between a resume and a CV?", answer: "A resume is a short tailored 1–2 page summary for a specific job; a CV (UK/academia) is a fuller chronological record, 2 pages standard in the UK and unlimited in research." },
    { question: "What is a biodata?", answer: "A personal-details format (photo, DOB, family, marital status) used for matrimonial purposes and some government posts. Never send it for startup or MNC roles." },
    { question: "Do Indian companies want a resume or CV?", answer: "Resume — private-sector hiring means short, tailored, metric-led documents. CV on Indian portals just means upload your resume." },
    { question: "Should my resume have a photo?", answer: "No, across India, US and UK — except acting/modeling/hospitality where appearance is a stated criterion. Photos risk bias filtering and break ATS parsing." },
    { question: "How long should a UK CV be?", answer: "Two pages standard, with a personal statement up top. Academic CVs are the exception with no page limit." },
  ],
};
