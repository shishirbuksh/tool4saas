import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two identical resumes. One with a tailored cover letter got the interview; the identical one without did not. Same hiring manager, same week — she told me the letter answered her one doubt (“can he write to clients?”) in 30 seconds. A <strong>cover letter</strong> is not a resume repeat; it is a 250-word argument for one specific role. Here is the structure that wins shortlists, plus tone choices for startups vs enterprises.</p>
<p>Part of the <a href="/blog/resume-builder-guide">free resume builder guide</a>. Build tailored letters fast in the <a href="/cover-letter-builder">cover letter builder</a> (professional, enthusiastic, concise tones). Base resume: <a href="/resume-builder">free resume builder</a>.</p>

<h2 id="structure">The 4-paragraph structure (250–350 words)</h2>
<ol>
<li><strong>Hook (2 lines):</strong> role + years + one metric. “Backend Developer applicant, 3 yrs Node.js billing APIs, cut refund failures 30%.” The hiring manager decides in these lines whether to read on.</li>
<li><strong>Fit (1 paragraph):</strong> 2–3 job requirements mapped to your proof. Mirror their language: if they say “incident leadership”, show yours — never generic “fast learner” claims.</li>
<li><strong>Why them (3 lines):</strong> one specific thing about the company (product, scale, tech). “Your UPI-switch migration is exactly the systems work I do” beats “I admire your esteemed organization”.</li>
<li><strong>Close (2 lines):</strong> availability + interview ask. “Available immediately; happy to walk through the refund pipeline on a call.” Phone + email below.</li>
</ol>
<ul>
<li><strong>Length ceiling:</strong> 350 words. Hiring managers spend ~30 seconds here; every sentence must argue fit.</li>
<li><strong>No resume repeat:</strong> the letter interprets (“why this role, why me”); the resume proves. Different jobs, different pages.</li>
<li><strong>One letter per role:</strong> swap paragraph 2–3 per application (10 minutes). Generic letters read generic — worse than none.</li>
</ul>

<h2 id="tones">Tone: professional vs enthusiastic vs concise</h2>
<table>
<thead><tr><th>Tone</th><th>Use for</th><th>Sounds like</th></tr></thead>
<tbody>
<tr><td><strong>Professional</strong></td><td>Banks, enterprises, govt-adjacent</td><td>Measured, formal, no exclamation</td></tr>
<tr><td><strong>Enthusiastic</strong></td><td>Startups, product roles, junior posts</td><td>Energy + specifics, still proof-led</td></tr>
<tr><td><strong>Concise</strong></td><td>Referrals, high-volume applications</td><td>150 words, three bullets, done</td></tr>
</tbody>
</table>
<p>Pick in the <a href="/cover-letter-builder">builder's tone option</a> — same details, three voices. Freshers: enthusiastic + one project proof wins (see <a href="/blog/resume-builder-guide/fresher-resume-guide">fresher guide</a>). Senior pivots: professional + bridge story (see <a href="/blog/resume-builder-guide/experienced-resume-guide">experienced guide</a>).</p>

<h2 id="mistakes">3 cover letter killers</h2>
<ol>
<li><strong>“To whom it may concern” + company-name typos.</strong> Find the hiring manager's name on LinkedIn; copy-paste the company name. A wrong name ends the read instantly.</li>
<li><strong>Salary demands in the letter.</strong> Negotiate at offer stage (<a href="/blog/resume-builder-guide/offer-letter-guide">offer guide</a>), not in the introduction. Early numbers anchor low or filter you out.</li>
<li><strong>Apology framing.</strong> “Though I lack experience…” spotlights weakness. Lead with the closest proof instead — projects, freelance, adjacent wins.</li>
</ol>
<h2 id="email-body">When the “cover letter” is an email body</h2>
<p>On Naukri and LinkedIn Easy Apply in India, most startups never open attachments first — a founder told me she shortlists from the 120-word email body alone. That body IS the cover letter. Compress the 4 paragraphs into 120 words: role + years + metric, two requirement proofs, one company-specific line, availability. Same architecture, half the length, zero attachment friction. Portals with “cover letter” text boxes want the same compressed version, not the full letter pasted awkwardly. Referrals get the shortest form: “Referred by Priya for Backend Dev; 3 yrs billing APIs, cut failures 30%; free Thursday for a call?” — three lines that ride the referrer's credibility. Full-length letters still rule for enterprise postings and visa-sponsored roles where process demands them; match the container to the channel, keep the argument identical.</p>
<div class="cta-box"><strong>Write yours now:</strong> open the <a href="/cover-letter-builder">cover letter builder</a>, pick a tone, tailor paragraphs 2–3 per role. System: <a href="/blog/resume-builder-guide">pillar guide</a>.</div>
`;

export const resumeCoverLetter: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "cover-letter-guide",
  kind: "cluster",
  title: "Cover Letter Guide: 4-Paragraph Format That Wins Shortlists (2026)",
  description:
    "Cover letter format: 250–350 word structure, professional vs enthusiastic vs concise tones + 3 killers to avoid. Free builder with tone options.",
  keywords: [
    "cover letter format",
    "how to write cover letter",
    "cover letter for job application",
    "cover letter tone professional",
    "short cover letter sample",
  ],
  toolSlugs: ["cover-letter-builder", "resume-builder", "ats-resume-checker"],
  relatedSlugs: ["how-to-make-resume", "fresher-resume-guide", "offer-letter-guide"],
  published: "2026-09-23",
  updated: "2026-09-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "structure", text: "4-paragraph structure", level: 2 },
    { id: "tones", text: "Tone: pick per employer", level: 2 },
    { id: "mistakes", text: "3 cover letter killers", level: 2 },
    { id: "email-body", text: "When it is an email body", level: 2 },
  ],
  html,
  faqs: [
    { question: "How long should a cover letter be?", answer: "250–350 words, four paragraphs. Hiring managers spend ~30 seconds; concise tailored letters beat long generic ones. Referrals can go shorter at ~150 words." },
    { question: "What goes in each cover letter paragraph?", answer: "Hook (role + years + metric), fit (2–3 requirements mapped to proof), why-them (one specific company point), close (availability + interview ask)." },
    { question: "Should freshers write cover letters?", answer: "Yes — most skip them, so a tailored 250-word letter with one project proof stands out disproportionately and doubles shortlist odds in my experience." },
    { question: "Professional or enthusiastic tone?", answer: "Professional for banks and enterprises, enthusiastic for startups and junior roles, concise for referrals and volume. Same details, different voice — pick per employer." },
    { question: "Should salary go in the cover letter?", answer: "No — negotiate at offer stage. Early numbers anchor low or filter you out before anyone reads your proof." },
  ],
};
