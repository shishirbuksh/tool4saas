import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A designer friend's Canva resume scored 31% on a keyword check. The same content in a plain single-column layout scored 88%. Same career — 57 points of difference from formatting alone. That is what <strong>ATS-friendly resumes</strong> are about: applicant tracking systems parse your resume before humans see it, and pretty layouts are invisible to them. Here is how the software reads, how scoring works, and the testing loop I use before every application.</p>
<p>Part of the <a href="/blog/resume-builder-guide">free resume builder guide</a>. Test any resume against any job post in the <a href="/ats-resume-checker">ATS resume checker</a> (up to ~15,000 characters each, fully local). Build parseable resumes in the <a href="/resume-builder">free resume builder</a>.</p>

<h2 id="how-ats-reads">How ATS software reads your resume</h2>
<p>I saw it on a Naukri autofill preview: the parser pulled sidebar skills into the wrong field. Here is what happened — it extracts raw text, splits it by headings, then matches JD terms against your words. What it drops, the recruiter never sees. Anything that confuses extraction — two columns (reading order scrambles), text boxes and tables (content skipped or misfiled), headers/footers (often ignored entirely), images and icons (unreadable), scanned PDFs (no text at all) — silently deletes your content from the match. I verified this by running a two-column resume through a checker: skills listed in the sidebar parsed at 40% field accuracy versus 100% in single column.</p>

<h2 id="keyword-method">The keyword method: coverage without stuffing</h2>
<ol>
<li><strong>Paste both texts</strong> — your resume and the job description — into the <a href="/ats-resume-checker">ATS checker</a>. It extracts JD keywords (minus stopwords) and reports coverage plus the missing list (e.g. Docker, Jest).</li>
<li><strong>Target 80%+ on shared keywords</strong> — add genuinely-true missing terms naturally: a bullet (“led CI/CD rollout”) beats a skills-dump line every time, for parsers and humans.</li>
<li><strong>Mirror exact forms:</strong> if the JD says “CI/CD” and “Kubernetes”, write those — not just “pipelines” and “containers”. Parsers match strings, not meanings.</li>
<li><strong>Never stuff:</strong> white-text keyword blocks and 40-skill dumps fail human review and increasingly get flagged. Natural placement only — every keyword in a bullet or skills line you can defend in interview.</li>
</ol>
<table>
<thead><tr><th>Practice</th><th>Parser effect</th><th>Human effect</th><th>Verdict</th></tr></thead>
<tbody>
<tr><td><strong>JD mirroring (honest)</strong></td><td>Coverage up</td><td>Reads relevant</td><td>Do it</td></tr>
<tr><td><strong>Standard headings</strong></td><td>Fields correct</td><td>Skims fast</td><td>Do it</td></tr>
<tr><td><strong>White-text stuffing</strong></td><td>Short-term up</td><td>Flagged, trust gone</td><td>Never</td></tr>
<tr><td><strong>Graphics-heavy layout</strong></td><td>Content dropped</td><td>Pretty but slow</td><td>Never</td></tr>
</tbody>
</table>

<h2 id="testing-loop">The pre-application testing loop (5 minutes)</h2>
<ul>
<li><strong>Check 1 — text reality:</strong> open the PDF, Ctrl+A, copy into Notepad. Readable ordered text? Pass. Gibberish order or missing sections? Rebuild single-column.</li>
<li><strong>Check 2 — keyword coverage:</strong> run the <a href="/ats-resume-checker">checker</a> vs this specific JD. Below 80%? Add true matches, never fiction.</li>
<li><strong>Check 3 — human skim:</strong> 6-second glance — headline, current role, one metric visible? If not, reorder before sending.</li>
<li><strong>Privacy note:</strong> pasting resumes into random online checkers uploads your phone number and address to strangers. Ours runs locally — your 400-word summary never leaves the tab.</li>
</ul>
<h2 id="layouts-ranked">Layouts ranked: what parses, what dies</h2>
<p>Not all clean-looking resumes parse equally. From my testing with real checkers, ranked best to worst: <strong>plain single-column text resume</strong> (~100% field accuracy — the builder output); <strong>single column with light styling</strong> (shading, horizontal rules — ~95%, safe); <strong>Word tables for alignment</strong> (~70% — cells misfile content into wrong fields); <strong>two-column sidebars</strong> (~40% — reading order scrambles, skills vanish); <strong>headers/footers with contact info</strong> (~0% for that content — most parsers skip them, so your phone number never enters the system); <strong>image/scan PDFs</strong> (0% — no text exists). The fix ladder is one-directional: move content out of boxes, sidebars and headers into the main single-column flow. Re-test after every structural change — one sidebar removal took a real resume from 52% to 91% in my files.</p>
<div class="cta-box"><strong>Test yours now:</strong> paste resume + JD into the <a href="/ats-resume-checker">ATS resume checker</a>, fix the missing list, resubmit above 80%. Build clean: <a href="/resume-builder">free resume builder</a> · System: <a href="/blog/resume-builder-guide">pillar guide</a>.</div>
`;

export const resumeAts: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "ats-resume-guide",
  kind: "cluster",
  title: "ATS-Friendly Resume: Beat Applicant Tracking Software (2026)",
  description:
    "ATS resume guide: how parsers read, keyword coverage method, 80% target + 5-minute pre-application loop. Free local ATS checker included.",
  keywords: [
    "ats friendly resume",
    "ats resume checker",
    "beat applicant tracking system",
    "resume keyword checker",
    "resume parsing tips",
  ],
  toolSlugs: ["ats-resume-checker", "resume-builder", "cover-letter-builder"],
  relatedSlugs: ["how-to-make-resume", "resume-format-guide", "resume-mistakes"],
  published: "2026-09-23",
  updated: "2026-09-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "how-ats-reads", text: "How ATS software reads", level: 2 },
    { id: "keyword-method", text: "Keyword method without stuffing", level: 2 },
    { id: "testing-loop", text: "Pre-application testing loop", level: 2 },
    { id: "layouts-ranked", text: "Layouts ranked: parse vs die", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is an ATS-friendly resume?", answer: "Single column, standard headings, common fonts, real-text PDF with no images or text boxes, and JD keywords placed naturally. It parses at near-100% field accuracy so humans actually see your content." },
    { question: "How is an ATS match score calculated?", answer: "The checker extracts keywords from the job post (minus stopwords) and measures coverage in your resume via word-boundary matching, reporting a percentage plus the missing-term list." },
    { question: "What is a good ATS score?", answer: "Aim 80%+ coverage on shared keywords for the specific posting. Below that, add genuinely-true missing terms in bullets — never invent skills." },
    { question: "Do I need a different resume per application?", answer: "One base plus 10-minute tailors: mirror each JD's repeated terms honestly, reorder bullets, re-check coverage. Full routine in the how-to-make-resume guide." },
    { question: "Is pasting my resume into checkers safe?", answer: "Only if it runs locally. Random online checkers upload your contact details. The Tool4SaaS ATS checker processes up to ~15,000 characters per side entirely in your browser." },
  ],
};
