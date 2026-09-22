import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“No experience, no job; no job, no experience.” Every fresher hits this wall — and most resumes make it worse by apologizing for it: empty experience sections, objective paragraphs begging for a chance. Flip the frame: recruiters hiring freshers buy <strong>proof of work and trainability</strong>, not tenure. I have helped a dozen juniors rewrite this way; the pattern below turns final-year projects into interview calls.</p>
<p>Part of the <a href="/blog/resume-builder-guide">free resume builder guide</a>. Build yours in the <a href="/resume-builder">free resume builder</a>; check parsing in the <a href="/ats-resume-checker">ATS checker</a>.</p>

<h2 id="frame">The fresher frame: projects are your experience</h2>
<p>Delete the empty “Experience” heading guilt. Replace it with <strong>Projects + Internships</strong> carrying the same bullet discipline as jobs: what you built, your contribution, the outcome with numbers. “Built campus event app (Flutter, 3-dev team); 800+ downloads; crash-free 99%” beats two years of vague trainee lines. Recruiters told me directly: one substantial project with a GitHub link outranks a page of coursework.</p>
<ul>
<li><strong>2–3 projects minimum:</strong> one academic (with your specific role), one self-driven (shows initiative), one team effort (shows collaboration).</li>
<li><strong>Every project gets:</strong> one-line purpose, your stack, your contribution, one metric (users, performance, downloads, marks).</li>
<li><strong>Internships count double:</strong> even unpaid or virtual ones — company name, duration, shipped output. “Virtual intern” still beats blank.</li>
</ul>

<h2 id="order">Section order for zero-experience resumes</h2>
<table>
<thead><tr><th>Order</th><th>Section</th><th>Why here</th></tr></thead>
<tbody>
<tr><td><strong>1</strong></td><td>Header + headline (role + stack)</td><td>Searchable in 2 seconds</td></tr>
<tr><td><strong>2</strong></td><td>2-line summary (stack + strongest proof)</td><td>Frames the scan</td></tr>
<tr><td><strong>3</strong></td><td>Projects + internships</td><td>Your experience section</td></tr>
<tr><td><strong>4</strong></td><td>Skills (from target JDs)</td><td>ATS fuel</td></tr>
<tr><td><strong>5</strong></td><td>Education (CGPA 8+, coursework, year)</td><td>Credentials, compact</td></tr>
<tr><td><strong>6</strong></td><td>Certifications + extras</td><td>One line each</td></tr>
</tbody>
</table>
<p>Education stays detailed for freshers — CGPA above 8, relevant coursework, final-year project title. Below 8? List the degree without the number; nobody rejects for a missing CGPA, many reject for a weak one displayed prominently.</p>

<h2 id="proof">Zero to proof in 90 days (if your projects are thin)</h2>
<ul>
<li><strong>Ship one public project:</strong> clone + extend something real (expense tracker with charts, not another to-do). Live link + GitHub, 3–4 weekends.</li>
<li><strong>Contribute once to open source:</strong> docs, then a small fix. “Contributor, libname (2 PRs merged)” signals teamwork no certificate can.</li>
<li><strong>Freelance one micro-gig:</strong> a relative's shop site, a campus club portal. Client work — even free — reads as experience because it is.</li>
<li><strong>Certify one in-demand skill:</strong> cloud practitioner, framework cert. Pair each cert with a project using it, or it reads as theory.</li>
</ul>
<h3>Cover letter multiplier</h3>
<p>Freshers skip cover letters; that is the opening. A 250-word tailored letter (role, one project proof, why this company) built in the <a href="/cover-letter-builder">cover letter builder</a> doubles shortlists in my experience — method in <a href="/blog/resume-builder-guide/cover-letter-guide">cover letter guide</a>. Pair with <a href="/blog/resume-builder-guide/how-to-make-resume">build steps</a> and <a href="/blog/resume-builder-guide/ats-resume-guide">ATS checks</a> before sending anything.</p>
<h2 id="campus">Campus placements: the 60-second screening game</h2>
<p>On-campus recruiters screen hundreds of near-identical fresher resumes in an evening — CGPA brackets, branch, then one differentiator. Win the bracket first: eligibility cutoffs are real, so lead with qualifying facts (CGPA, no backlogs if true). Then differentiate with exactly one memorable proof: a deployed project link, an internship brand name, a competition rank. Mass-recruiter aptitude rounds filter before resumes matter — but for core and product roles, the resume shortlist is the whole game. Carry 5 clean prints (yes, paper still matters on campus), know your top project cold for the 2-minute grilling, and keep your <a href="/blog/resume-builder-guide/how-to-make-resume">email follow-up</a> ready the same night. Day-one slip? One strong GitHub contribution history beats a semester of excuses.</p>
<div class="cta-box"><strong>Fresher action:</strong> list 3 projects with metrics today, build in the <a href="/resume-builder">free resume builder</a>, check coverage in the <a href="/ats-resume-checker">ATS checker</a>. System: <a href="/blog/resume-builder-guide">pillar guide</a>.</div>
`;

export const resumeFresher: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "fresher-resume-guide",
  kind: "cluster",
  title: "Fresher Resume Guide: Get Interviews With Zero Experience (2026)",
  description:
    "Resume for freshers: project-led structure, section order, 90-day proof plan + cover letter multiplier. Free builder + ATS check included.",
  keywords: [
    "resume for freshers",
    "fresher resume format",
    "resume with no experience",
    "fresher resume sample india",
    "first job resume tips",
  ],
  toolSlugs: ["resume-builder", "ats-resume-checker", "cover-letter-builder"],
  relatedSlugs: ["how-to-make-resume", "ats-resume-guide", "cover-letter-guide"],
  published: "2026-09-23",
  updated: "2026-09-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "frame", text: "Projects are your experience", level: 2 },
    { id: "order", text: "Section order, zero experience", level: 2 },
    { id: "proof", text: "Zero to proof in 90 days", level: 2 },
    { id: "campus", text: "Campus placement screening", level: 2 },
  ],
  html,
  faqs: [
    { question: "What do I put on a resume with no experience?", answer: "Projects with your contribution and metrics, internships (even virtual), certifications paired with projects, coursework and skills. Two to three substantial projects outrank blank experience sections." },
    { question: "Should freshers write one page?", answer: "Strictly one page. Density signals judgment; recruiters spend the same 6 seconds on fresher resumes and reward the scannable one." },
    { question: "Do I include CGPA?", answer: "Above 8 (or equivalent), yes with coursework. Below that, list the degree without the number — nobody rejects a missing CGPA, many downgrade a weak displayed one." },
    { question: "How do freshers beat ATS with no keywords?", answer: "Project stacks are keywords: frameworks, tools and methods from real work mirror JD terms naturally. Check coverage per posting and add honest matches." },
    { question: "Do cover letters help freshers?", answer: "Disproportionately — most freshers skip them. A 250-word tailored letter with one project proof doubles shortlist odds in my experience." },
  ],
};
