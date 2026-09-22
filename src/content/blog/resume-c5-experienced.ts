import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>After 5 years, your resume's job changes: nobody hires you for potential anymore — they buy <strong>shipped outcomes, scope and trajectory</strong>. Yet most experienced resumes read like elongated fresher ones: duty lists, no numbers, promotions buried. I reviewed a 7-year backend dev's resume that hid “led 6-engineer team, Rs 2 cr billing pipeline” on page two beneath tool lists. Moved up, quantified, tailored — 3 interview calls in 2 weeks. This is positioning for people with proof.</p>
<p>Part of the <a href="/blog/resume-builder-guide">free resume builder guide</a>. Build in the <a href="/resume-builder">free resume builder</a>; verify keyword coverage in the <a href="/ats-resume-checker">ATS checker</a>.</p>

<h2 id="positioning">Positioning: outcomes, scope, trajectory</h2>
<p>Every bullet must answer one of three questions. <strong>Outcome:</strong> what changed because of you (revenue, latency, conversion, cost)? <strong>Scope:</strong> how big was the arena (team size, users, budget, systems)? <strong>Trajectory:</strong> are you growing (promotions, expanding ownership)? A senior bullet carries all three: “Promoted to lead in 18 months; own billing pipeline (Rs 2 cr/mo); cut failures 30% with 6-engineer squad.” Junior bullets carry one. Audit every line — duty descriptions with none of the three get rewritten or deleted.</p>
<ul>
<li><strong>Lead with the last 3 years:</strong> recent scope dominates; compress older roles to one line each after 2 roles.</li>
<li><strong>Promotions are headlines:</strong> “SDE-1 → SDE-2 (14 months)” beats any adjective. Fast growth is the strongest signal in the packet.</li>
<li><strong>Kill legacy skills:</strong> that 2016 framework occupies space senior keywords need. Keep what target JDs ask for now.</li>
</ul>

<h2 id="length">Length and compression rules</h2>
<table>
<thead><tr><th>Experience</th><th>Length</th><th>Compression rule</th></tr></thead>
<tbody>
<tr><td><strong>3–5 years</strong></td><td>1 page</td><td>Cut oldest role to 2 bullets; kill college details</td></tr>
<tr><td><strong>5–8 years</strong></td><td>1 page (2 if dense wins)</td><td>One line per role beyond the last two</td></tr>
<tr><td><strong>8+ years</strong></td><td>2 pages max</td><td>Early career = company + title + dates only</td></tr>
</tbody>
</table>
<p>Two pages must earn the second: leadership scope, patents, major launches. If page two holds coursework and hobbies, cut to one. Recruiters decide on page one; page two only confirms.</p>

<h2 id="pivots">Pivots, gaps and the offer endgame</h2>
<ul>
<li><strong>Career pivots:</strong> hybrid format — skills snapshot of the target domain up top, then honest timeline. Bridge bullets translate (“support escalations → incident leadership”) per project, not claims. One pivot story per resume, told in the summary.</li>
<li><strong>Gaps:</strong> one line, no apology (“Career break 2023–24: family care; freelance billing APIs”). Consulting, courses or care — named beats blank. Never stretch dates to hide gaps; background checks end offers.</li>
<li><strong>The offer letter:</strong> senior hires negotiate CTC structure, not just totals — fixed vs variable, joining bonus, probation and notice terms. Generate clean letters with the <a href="/offer-letter-generator">offer letter generator</a> and learn every clause in <a href="/blog/resume-builder-guide/offer-letter-guide">offer letter guide</a>. Your resume got the interview; the offer letter protects the joining.</li>
</ul>
<h2 id="staff-principal">Staff/principal resumes: scope becomes the product</h2>
<p>Beyond ~8 years, hiring managers buy organizational leverage, not output. Your bullets shift from “shipped X” to “multiplied teams that shipped X”: org design, technical strategy, incident command, mentoring ladders. Quantify differently — teams led, budget owned, systems with 99.9%+ SLOs, cost programs (Rs 50L infra savings reads louder than any feature). Publications, talks and open-source stewardship move from extras to core proof. And the narrative tightens to one arc: growing scope every 2–3 years. Flat scope at year ten worries readers more than any gap — show the expanding arena or explain the deep-specialist choice explicitly in the summary. Offer-stage leverage peaks here too: competing offers, joining bonuses and notice buyouts all negotiate harder with documented scope, per <a href="/blog/resume-builder-guide/offer-letter-guide">offer guide</a>.</p>
<div class="cta-box"><strong>Senior action:</strong> rewrite 5 bullets to outcome+scope+trajectory today, rebuild in the <a href="/resume-builder">free resume builder</a>, check coverage in the <a href="/ats-resume-checker">ATS checker</a>. System: <a href="/blog/resume-builder-guide">pillar guide</a>.</div>
`;

export const resumeExperienced: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "experienced-resume-guide",
  kind: "cluster",
  title: "Resume for Experienced Professionals: Positioning That Wins (2026)",
  description:
    "Experienced resume guide: outcome-scope-trajectory bullets, length rules, pivots, gaps + offer endgame. Free builder + ATS check included.",
  keywords: [
    "resume for experienced professionals",
    "senior resume tips",
    "resume after 5 years experience",
    "career gap resume",
    "resume career change",
  ],
  toolSlugs: ["resume-builder", "ats-resume-checker", "offer-letter-generator"],
  relatedSlugs: ["how-to-make-resume", "offer-letter-guide", "ats-resume-guide"],
  published: "2026-09-23",
  updated: "2026-09-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "positioning", text: "Outcomes, scope, trajectory", level: 2 },
    { id: "length", text: "Length and compression", level: 2 },
    { id: "pivots", text: "Pivots, gaps, offer endgame", level: 2 },
    { id: "staff-principal", text: "Staff/principal: scope as product", level: 2 },
  ],
  html,
  faqs: [
    { question: "How should resumes change after 5 years?", answer: "From duties to outcomes-scope-trajectory: every bullet carries a result, arena size or growth signal. Recent 3 years dominate; older roles compress to one line." },
    { question: "How long should an experienced resume be?", answer: "One page to ~8 years, two max beyond — and page two must hold leadership scope or major launches, not coursework. Recruiters decide on page one." },
    { question: "How do I show a promotion?", answer: "As a headline fact: SDE-1 → SDE-2 (14 months). Fast growth is the strongest signal in the packet — never bury it in prose." },
    { question: "How do I explain a career gap?", answer: "One honest line (family care, freelance, study) with dates. Never stretch dates — background checks end offers. Named beats blank." },
    { question: "How do I pivot domains on a resume?", answer: "Hybrid format: target-domain skills snapshot up top, honest timeline below, bridge bullets translating old wins into new-domain language. One pivot story, told in the summary." },
  ],
};
