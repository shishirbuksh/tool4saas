import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A resume summary is the first paragraph a recruiter reads and the last section most candidates revise. Weak summaries describe personality. Strong summaries compress role, scope, and proof into three lines the reader can verify further down the page. The resume summary examples below cover freshers through senior leaders and career changers, then two before-and-after rewrites show how to turn a vague opening into evidence.</p>
<p>This is part of the <a href="/blog/resume-builder-guide">free resume builder guide</a>. Read the examples with your current draft open, and steal the sentence shapes rather than the facts.</p>

<h2 id="summary-purpose">What a resume summary has to do</h2>
<p>Every summary has three jobs: name the target role, establish the scale you have worked at, and give one reason to keep reading. A recruiter scanning for a backend role should see the word backend in the first line, payments or distributed systems in the second, and a number in the third. If any of those is missing, the paragraph is decoration.</p>
<p>Length matters more than most advice admits. Two to four lines, roughly 40 to 70 words, fits under the headline without pushing experience below the fold. A longer block is not a summary; it is an autobiography with the interesting parts removed. Write it after the bullets, when you already know which achievements are strongest.</p>
<p>Use the same tense and voice as the rest of the resume. Present tense for current capability, past tense for completed outcomes. Avoid first person (“I am a…”) and avoid the distant third person (“Aarav is a…”). Start with the role or a noun phrase, not with “Seeking” or “Passionate.”</p>

<h2 id="formula">The four-slot formula</h2>
<p>I use a four-slot formula because it survives every experience level: <strong>role and years</strong>, <strong>domain or stack</strong>, <strong>scope</strong>, <strong>proof</strong>. Fill the slots you can defend, drop the rest, and keep the result under 70 words.</p>
<ol>
<li><strong>Role and years:</strong> “Backend engineer, 5 years” tells the reader where to file you.</li>
<li><strong>Domain or stack:</strong> “payments and billing APIs” narrows the file to relevant openings.</li>
<li><strong>Scope:</strong> “Rs 4 cr monthly volume, 6-engineer squad” shows the size of the arena.</li>
<li><strong>Proof:</strong> “cut refund failures 32%” gives the reader a reason to trust the bullets below.</li>
</ol>
<p>One sentence can carry all four: “Backend engineer, 5 years in payments APIs; own a Rs 4 cr monthly billing pipeline and led a 6-engineer squad that cut refund failures 32%.” That is 25 words, and every clause is checkable in the experience section. Freshers replace scope with project scale, career changers replace domain with the bridge, and senior candidates replace hands-on proof with organizational proof.</p>

<h2 id="examples-by-level">Examples for every experience level</h2>
<p>Same formula, different evidence. The table shows what each level should lead with; the paragraphs explain the trade-offs.</p>
<table>
<thead><tr><th>Level</th><th>Lead with</th><th>Best proof</th><th>Watch out for</th></tr></thead>
<tbody>
<tr><td><strong>Fresher</strong></td><td>Degree, projects, internship</td><td>Downloads, users, shipped scope</td><td>Apologizing for missing experience</td></tr>
<tr><td><strong>1–3 years</strong></td><td>Role and stack</td><td>One production metric</td><td>Listing tools without outcomes</td></tr>
<tr><td><strong>4–7 years</strong></td><td>Domain and ownership</td><td>Volume, team size, cost or latency</td><td>Repeating the job description</td></tr>
<tr><td><strong>8+ years</strong></td><td>Scope and trajectory</td><td>Org size, budget, reliability</td><td>Hands-on bullets that hide leverage</td></tr>
<tr><td><strong>Career change</strong></td><td>Target role and bridge</td><td>Transferable outcome with numbers</td><td>“Seeking a transition” openings</td></tr>
</tbody>
</table>
<p><strong>Fresher:</strong> lead with proof of work, not with the absence of a job. “Computer science graduate (2026) with two shipped Flutter apps, 800+ combined downloads, and a backend internship where I built 9 REST endpoints used by a 12-person support team” answers the reader's real question: can you build something? Keep coursework out unless it produced a project.</p>
<p><strong>One to three years:</strong> name the stack and one production outcome. “Frontend developer, 2 years React and TypeScript; shipped 12 customer-facing flows and raised signup conversion 18%” is stronger than a list of libraries because it shows what happened when you used them.</p>
<p><strong>Four to seven years:</strong> sell ownership. Name the system, the volume, and the team size, then the result. “Backend engineer, 6 years in fintech; own a billing service handling Rs 4 cr monthly and led a 6-engineer squad through a zero-downtime migration” gives a hiring manager three reasons to ask about the migration.</p>
<p><strong>Eight years and beyond:</strong> sell leverage. Replace individual output with organizational scope: teams led, budget owned, systems kept healthy, people promoted. “Engineering manager, 10 years; built a 22-person platform org across two time zones and cut infrastructure spend 24% without missing an availability target” reads like a mandate, not a task list.</p>
<p><strong>Career change:</strong> put the destination and the bridge in the same breath. “Support lead moving into product operations; 6 years turning customer signals into process fixes that cut repeat contacts 21%” names the target, then proves the transferable skill. Keep the old title visible because hiding it wastes the credibility it earned.</p>

<h2 id="before-after">Two rewrites, line by line</h2>
<p><strong>Example 1 — fresher.</strong> Before: “Hardworking and passionate graduate seeking an opportunity to prove myself in a reputed organization where I can utilize my skills and grow with the company.”</p>
<p>After: “Computer science graduate (2026) with two shipped Flutter apps, 800+ combined downloads, and a backend internship where I built 9 REST endpoints used by a 12-person support team.”</p>
<p>The before line could belong to anyone. The after line names a credential, a build record, a number, and a concrete contribution. It also gives the interviewer three topics to probe, which is exactly what a summary should do.</p>
<p><strong>Example 2 — mid-level operations.</strong> Before: “Experienced professional with a proven track record of success in fast-paced environments, looking for a challenging role in operations.”</p>
<p>After: “Operations lead, 7 years in e-commerce fulfillment; manage 3 warehouses and a Rs 9 cr annual budget, and cut dispatch delays 28% by rebuilding the pick-pack handoff.”</p>
<p>The rewrite replaces adjectives with nouns a hiring manager can picture: warehouses, budget, handoff. “Proven track record” becomes a result with a direction. Nothing is invented; the candidate simply chose which facts deserved the first sentence.</p>

<h2 id="summary-vs-objective">Summary versus objective</h2>
<p>Objectives describe what you want. Summaries describe what you offer. Recruiters have read thousands of “seeking a challenging position” lines and learned to skip them. If you need to signal intent — a career change, a relocation, a return after a break — attach it to evidence instead of making it the whole paragraph.</p>
<p>“Returning to product management after a two-year care break; previously shipped three billing features used by 40,000 customers, and completed a refresher course in analytics” is honest, specific, and still candidate-first. The intent is present, but the proof carries the sentence.</p>

<h2 id="tailoring">Tailor the summary to each posting</h2>
<p>Write one base summary, then create a variant for each application. Start by mirroring the exact job title from the posting where it is honest. If the posting says “Data Analyst” and your last title was “Business Analyst,” write “Business analyst moving into data analytics” rather than inventing a title you never held.</p>
<p>Next, pick two or three exact terms from the posting — SQL, dbt, stakeholder reporting — and make sure they appear naturally in the summary or in the first bullet below it. Parsers match strings, so JS and JavaScript are different tokens unless you include both. Run the draft against the posting using the <a href="/blog/resume-builder-guide/ats-resume-guide">ATS resume guide</a> method; if a term is missing and true, add it. If it is missing and false, leave it out.</p>
<p>Keep a small library of variants by role family, not by company. A backend platform version, a backend product version, and a backend lead version cover most postings without rewriting from scratch. Update the numbers only when they change.</p>

<h2 id="mistakes">Mistakes that flatten a summary</h2>
<ul>
<li><strong>Adjectives instead of evidence.</strong> “Results-driven” is a claim; “cut checkout errors 19%” is a result.</li>
<li><strong>A missing role title.</strong> If the reader cannot file you in two seconds, the summary failed.</li>
<li><strong>Too much history.</strong> The summary is a trailer, not the film; leave detail for the bullets.</li>
<li><strong>Unsupported seniority.</strong> “Senior leader” without team size, budget, or scope reads as inflation.</li>
<li><strong>Stale framing.</strong> A 2019 objective on a 2026 resume signals an untouched document.</li>
<li><strong>Keyword stuffing.</strong> A sentence of comma-separated tools helps neither parsers nor humans.</li>
</ul>
<div class="cta-box"><strong>Test your draft:</strong> paste your resume and a real posting into the <a href="/ats-resume-checker">ATS resume checker</a>, then fix the missing terms in the summary and first bullet. Section help: <a href="/blog/resume-builder-guide/career-change-resume">career change resume</a>.</div>
`;

export const resumeSummaryExamples: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "resume-summary-examples",
  kind: "cluster",
  title: "Resume Summary Examples for Every Experience Level",
  description:
    "Resume summary examples for freshers, mid-level, senior, and career-change candidates, with a four-slot formula and two before-and-after rewrites.",
  keywords: ["resume summary examples", "resume summary", "professional summary examples", "resume profile examples", "summary for resume fresher", "career change resume summary"],
  toolSlugs: ["resume-builder", "ats-resume-checker"],
  relatedSlugs: ["ats-resume-guide", "resume-format-guide", "career-change-resume"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "summary-purpose", text: "What a summary has to do", level: 2 },
    { id: "formula", text: "The four-slot formula", level: 2 },
    { id: "examples-by-level", text: "Examples by experience level", level: 2 },
    { id: "before-after", text: "Two rewrites, line by line", level: 2 },
    { id: "summary-vs-objective", text: "Summary versus objective", level: 2 },
    { id: "tailoring", text: "Tailor to each posting", level: 2 },
    { id: "mistakes", text: "Mistakes that flatten a summary", level: 2 },
  ],
  html,
  faqs: [
    { question: "How long should a resume summary be?", answer: "Two to four lines, roughly 40 to 70 words. It sits under the headline and should name the role, the domain, the scope, and one proof point. If it runs past four lines, move the extra detail into experience bullets. Write it after the bullets so you already know which result is strongest." },
    { question: "Should a fresher include a resume summary?", answer: "Yes, but lead with projects, internships, or a degree that produced shipped work. Example: Computer science graduate (2026) with two Flutter apps, 800+ downloads, and an internship building 9 REST endpoints. Skip apologies about missing experience and avoid objective language. One concrete build record is enough to earn the next line of the page." },
    { question: "What is the difference between a resume summary and an objective?", answer: "A summary states what you offer and backs it with scope or results. An objective states what you want from the employer. Recruiters skim past openings that begin with “seeking a challenging role.” If you must signal a career change or a return after a break, attach the intent to evidence, such as a transferable result and a relevant course or project." },
    { question: "Can I reuse one summary for every job?", answer: "Keep one base and make small variants by role family. Mirror the posting's exact title where honest, then add two or three exact terms from the description. Reuse the structure but change the domain nouns and lead metric. A backend platform version and a backend product version cover most applications without a full rewrite." },
    { question: "How do I make my summary ATS-friendly?", answer: "Use plain sentences, exact tool names, and standard job titles. Parsers match strings, so write JavaScript and JS if both appear in the posting. Avoid tables, columns, and text boxes around the summary. Test the full resume against the posting in an ATS checker and add missing terms only where the claim is true." },
    { question: "What numbers should go in a summary?", answer: "Pick the number that best shows scale or outcome for the target role: revenue or volume owned, users served, team size, latency reduced, cost saved, or conversion lifted. One strong number beats three vague ones. If you cannot disclose a figure, use a defensible range or a scope fact such as team size and system count." },
  ],
};
