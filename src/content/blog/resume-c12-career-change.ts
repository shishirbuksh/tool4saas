import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A career change resume has a narrative problem before it has a formatting problem. Your job titles describe the field you are leaving, while the reader is trying to decide whether you fit the field you want. The fix is not to hide the old career. It is to make the bridge visible, prove it with evidence, and translate your achievements into the target role's language.</p>
<p>Part of the <a href="/blog/resume-builder-guide">free resume builder guide</a>. The examples below use teaching, support, and operations backgrounds, but the method works for any switch where the skills overlap.</p>

<h2 id="bridge">Lead with a bridge, not an apology</h2>
<p>Career-change summaries fail when they start with what the candidate lacks: “Seeking to transition into product design, willing to learn.” That sentence asks the reader to take a risk. A bridge sentence does the opposite. It names the target role, states the old domain, and immediately connects them with proof.</p>
<p>Use this shape: <strong>target role + current identity + transferable proof + target language</strong>. For example: “Teacher moving into UX writing; designed 60+ lesson modules and rewrote instructions that cut student support questions 35%.” The target is clear, the old title stays visible, and the result belongs to the new field's vocabulary.</p>
<p>Put the target role in the headline as well. “UX Writer | Curriculum Designer” or “Product Operations | Customer Support Lead” tells the reader how to file you before the summary begins. Do not call yourself a senior anything in the new field until you have the scope to support it. Ambition is fine; inflation gets caught in the first interview.</p>
<p>Keep the “why” for the cover letter. The resume's job is to show fit, not to explain your life story. One line of context is enough; a paragraph about wanting a new challenge pushes the evidence down the page.</p>

<h2 id="transferable-evidence">Find transferable skills with evidence</h2>
<p>“Transferable skills” is not a list you paste from a blog. It is a mapping exercise. Take each task from your current role, name the underlying capability, and attach a result. Then write the target-role phrasing you will use in the bullet. If you cannot attach evidence, the skill is not ready for the resume.</p>
<table>
<thead><tr><th>Old task</th><th>Transferable skill</th><th>Evidence to show</th><th>Target-role phrasing</th></tr></thead>
<tbody>
<tr><td>Wrote lesson plans and worksheets</td><td>Content design, information architecture</td><td>60+ modules, revision cycle, readability gains</td><td>Designed and structured 60 learning modules</td></tr>
<tr><td>Handled escalations and refunds</td><td>Incident response, prioritization</td><td>40+ tickets weekly, SLA, repeat-contact reduction</td><td>Triaged high-volume incidents at 95% SLA</td></tr>
<tr><td>Coordinated vendors and schedules</td><td>Project coordination, stakeholder management</td><td>12 vendors, budget, on-time delivery</td><td>Ran cross-functional delivery across 12 vendors</td></tr>
<tr><td>Built weekly reports for managers</td><td>Data analysis, executive communication</td><td>Dashboard adoption, hours saved, decision changed</td><td>Built a weekly dashboard used by 30 managers</td></tr>
<tr><td>Trained new team members</td><td>Enablement, documentation</td><td>Number trained, ramp time, handbook created</td><td>Built onboarding docs that cut ramp time 20%</td></tr>
</tbody>
</table>
<p>The table is a thinking tool, not resume content. On the page, keep the evidence and the target phrasing; drop the middle column. A reader does not need to see your translation process, only the result.</p>

<h2 id="structure">Resume structure for a career change</h2>
<p>Use a hybrid structure: target-role headline, bridge summary, a skills snapshot for the new field, selected experience with translated bullets, relevant projects or certifications, then a compact education section. This keeps the chronology honest while moving the relevant proof upward.</p>
<ul>
<li><strong>Headline:</strong> target role and the strongest adjacent identity.</li>
<li><strong>Summary:</strong> the bridge sentence, two to three lines.</li>
<li><strong>Skills:</strong> target-field tools and methods first, old-field tools second when they transfer.</li>
<li><strong>Experience:</strong> two or three roles, newest first, with the most relevant bullets rewritten.</li>
<li><strong>Projects and certificates:</strong> evidence built specifically for the new field.</li>
<li><strong>Education:</strong> compact unless you are an early-career candidate.</li>
</ul>
<p>Do not use a pure functional resume that lists skills with no timeline. Recruiters read that format as gap-hiding, and parsers lose the employment history they need. The <a href="/blog/resume-builder-guide/experienced-resume-guide">experienced resume guide</a> covers hybrid compression in more detail, including how to handle older roles and gaps without stretching dates.</p>
<p>Keep the old job titles exactly as they were. Changing “Support Associate” to “Customer Success Manager” to sound closer to the target is a background-check problem, not a positioning win. Translate the bullets, not the facts.</p>

<h2 id="translate">Translate achievements into the target language</h2>
<p>Translation means describing the same work with the vocabulary of the field you want. It does not mean inventing a different job. Start with the target posting, collect the verbs and nouns it repeats, and use them where they accurately describe your work. “Lesson plans” can become “content modules” if that is what they were. “Customer complaints” can become “escalations” if you handled escalations.</p>
<p>Add enough context for an outsider to understand the scale. A teacher's “managed a class of 40” is meaningful to another teacher; a UX hiring manager needs “designed for 40 learners with mixed reading levels.” A support agent's “handled tickets” becomes “resolved 40+ billing and account tickets weekly at a 95% SLA.” The number stays, the frame changes.</p>
<p>Then check the draft against the posting with the <a href="/blog/resume-builder-guide/ats-resume-guide">ATS resume guide</a> method. Mirror exact tool names and methods where true, and leave out what you cannot defend. A career-change resume that reads as a keyword collage is easy to spot and hard to trust.</p>

<h2 id="before-after">Two career-change rewrites</h2>
<p><strong>Example 1 — teacher to UX writer.</strong> Before: “Taught English to classes of 40. Prepared lesson plans, graded assignments, and communicated with parents.”</p>
<p>After: “Designed 60+ lesson modules for classes of 40; rewrote confusing instructions and cut student support questions 35%; created a style guide adopted by 8 teachers.”</p>
<p>The before version describes duties in the old field's language. The after version keeps the same job but surfaces design, simplification, and adoption, which are the skills a UX writing manager can evaluate. The style guide is the bridge artifact: it proves the candidate can create standards, not just follow them.</p>
<p><strong>Example 2 — customer support to QA analyst.</strong> Before: “Handled customer queries and complaints. Worked with the technical team to resolve issues.”</p>
<p>After: “Resolved 40+ tickets weekly at a 95% SLA; reproduced and documented 120 bugs in Jira; partnered with 3 engineers to cut repeat contact reasons 22%.”</p>
<p>The rewrite turns vague collaboration into a workflow: reproduce, document, partner, reduce. QA hiring managers look for exactly that sequence. The support title stays, the metrics stay, and the target vocabulary does the positioning. These numbers are illustrative resume facts, not benchmarks; use your own verified figures.</p>

<h2 id="gaps">Handle gaps, courses, and screening</h2>
<p>If you have a gap, name it in one line without apology: “Career break 2024–25: family care; completed Google Data Analytics certificate and built 3 dashboard projects.” The line is honest, dated, and immediately followed by evidence. Never stretch employment dates to cover a gap; background checks end offers.</p>
<p>Courses help when they produce artifacts. One certificate with a project beats six certificates with no work attached. Add the project to a “Selected projects” section and describe the problem, your role, the tools, and the result. If you freelanced or volunteered in the new field, treat it as experience with dates and outcomes, even if the pay was zero.</p>
<p>Screening is not only an ATS question. Some employers will prefer candidates with direct domain experience, and no formatting trick changes that. Apply to roles where the overlap is real, use referrals and direct outreach where you can, and keep the resume focused on the evidence you actually have. The goal is a truthful application that a hiring manager can defend internally.</p>

<h2 id="tailoring">Tailor and test the draft</h2>
<p>Create one base career-change resume, then adjust the headline, summary, and first two bullets for each posting. Mirror the exact target title where honest, add the posting's terms where true, and keep the same evidence underneath. Test the draft against the posting before sending. If coverage is low because the posting asks for years in the new field, do not stuff synonyms; apply through a channel where your transferable proof gets read by a human.</p>
<div class="cta-box"><strong>Check the bridge:</strong> paste your draft and a target posting into the <a href="/ats-resume-checker">ATS resume checker</a>, then rewrite the missing terms you can honestly support. Keep the summary first; every line below it should reinforce the same bridge.</div>
`;

export const resumeCareerChange: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "career-change-resume",
  kind: "cluster",
  title: "Career Change Resume: Transferable Skills That Land",
  description:
    "Career change resume guide: map transferable skills, translate achievements, structure a hybrid resume, and prove the bridge with before-and-after rewrites.",
  keywords: ["career change resume", "transferable skills resume", "career switch resume examples", "how to write a career change resume", "resume for career transition", "career changer resume summary"],
  toolSlugs: ["resume-builder", "ats-resume-checker"],
  relatedSlugs: ["experienced-resume-guide", "resume-summary-examples", "ats-resume-guide"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "bridge", text: "Lead with a bridge", level: 2 },
    { id: "transferable-evidence", text: "Transferable skills with evidence", level: 2 },
    { id: "structure", text: "Resume structure for a switch", level: 2 },
    { id: "translate", text: "Translate achievements", level: 2 },
    { id: "before-after", text: "Two career-change rewrites", level: 2 },
    { id: "gaps", text: "Gaps, courses, and screening", level: 2 },
    { id: "tailoring", text: "Tailor and test the draft", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I write a career change resume with no direct experience?", answer: "Lead with a target-role headline and a bridge summary, then prove transferable skills with results from your current field. Add projects, certificates, freelance work, or volunteering in the new field so the claim has artifacts. Keep the old titles honest and translate the bullets into target-role language. Two or three strong bridge bullets beat a page of coursework." },
    { question: "What are the best transferable skills for a career change?", answer: "Look for capabilities that appear in both jobs: prioritization, documentation, stakeholder communication, data analysis, process design, training, and incident handling. The label matters less than the evidence. A support lead who cut repeat contacts has a process-improvement story; a teacher who built a style guide has a content-design story. Map the task, then attach a number." },
    { question: "Should a career change resume use a functional format?", answer: "Usually not. A pure functional resume hides the timeline, which recruiters read as gap-hiding and parsers handle poorly. Use a hybrid: target-field skills snapshot at the top, then an honest chronological experience section with translated bullets. It keeps the relevant proof visible without obscuring where and when you did the work." },
    { question: "How do I explain why I am changing careers?", answer: "Put one line of context in the summary or cover letter, then spend the rest of the page on evidence. Avoid long explanations about wanting a new challenge. A sentence such as “Support lead moving into product operations; 6 years of process fixes that cut repeat contacts 21%” answers the question and immediately returns to proof." },
    { question: "Will an ATS reject my career change resume?", answer: "An ATS does not reject a person; it parses text and matches terms for a specific posting. Use standard headings, a single column, and exact terms from the job description where true. A low match score often reflects missing domain vocabulary, so add honest overlaps and apply through channels where a human reviews transferable evidence. No layout can guarantee a shortlist." },
    { question: "How far back should a career change resume go?", answer: "Focus on the last 8 to 10 years, with two or three roles in detail and older roles compressed to title, company, and dates. Translate the bullets that support the target role and cut the rest. Early career detail can disappear once you have relevant projects or freelance work. Keep dates consistent everywhere." },
  ],
};
