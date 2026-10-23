import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Most resume skills sections fail in one of two directions. Either they list 30 tools copied from a template, or they list adjectives no parser can match. A useful section sits in the middle: a short, grouped inventory of abilities you can defend in an interview, ordered by what the posting asks for. This guide covers what to list, how to separate hard and soft skills, and what to cut before you export.</p>
<p>Part of the <a href="/blog/resume-builder-guide">free resume builder guide</a>. If you are rewriting the whole document, pair this with the section-by-section build walkthrough.</p>

<h2 id="what-belongs">What belongs in a resume skills section</h2>
<p>A skill belongs on the page if you can do three things: name it precisely, point to work where you used it, and discuss it for two minutes without notes. That test removes most filler. “Python” passes if you shipped a data pipeline. “Excel” passes if the job requires spreadsheet modeling. “Hardworking” fails because it is not a skill; it is a character claim.</p>
<p>Build the list from target postings, not from memory. Collect three job descriptions for the role you want, highlight repeated tools and methods, and keep the overlap first. If most postings ask for SQL and one asks for Tableau, SQL leads and Tableau follows. This is the same mirroring logic used across the <a href="/blog/resume-builder-guide/ats-resume-guide">ATS resume guide</a>, applied to one section.</p>
<p>A skills section is an index, not an argument. The argument lives in your bullets. Listing “Kubernetes” is useful when a parser searches for it and a human sees it. Listing “Kubernetes” without a single deployment, migration, or debugging story is a liability in the interview. Keep the index honest and let the experience section carry the proof.</p>

<h2 id="hard-vs-soft">Hard skills versus soft skills</h2>
<p>Hard skills are verifiable and searchable: languages, frameworks, platforms, methods, certifications, and domain knowledge. Soft skills are behavioral: communication, ownership, mentoring, prioritization. Both matter, but they do not belong in the same format. Hard skills earn a place in the list. Soft skills earn a place in a bullet that shows the behavior at work.</p>
<table>
<thead><tr><th>Type</th><th>Examples</th><th>In the skills list?</th><th>Where to prove it</th></tr></thead>
<tbody>
<tr><td><strong>Technical</strong></td><td>TypeScript, SQL, Figma, Docker</td><td>Yes, grouped by category</td><td>Skills line and bullets</td></tr>
<tr><td><strong>Domain</strong></td><td>GST filing, clinical coding, payroll</td><td>Yes, when the target role needs it</td><td>Experience bullets</td></tr>
<tr><td><strong>Method</strong></td><td>Agile delivery, incident response, SEO audits</td><td>Yes, with one concrete use</td><td>Project or role bullets</td></tr>
<tr><td><strong>Soft</strong></td><td>Mentoring, stakeholder management</td><td>Rarely on its own</td><td>Bullet with scope and result</td></tr>
<tr><td><strong>Traits</strong></td><td>Hardworking, team player, passionate</td><td>Never</td><td>Delete</td></tr>
</tbody>
</table>
<p>“Mentoring” as a lone word tells a reader nothing. “Mentored 4 junior analysts through their first quarterly close” shows the behavior, the scale, and the context. The same rule applies to communication: instead of listing it, write “presented monthly revenue findings to a 12-person leadership group.” The skill is visible without being asserted.</p>

<h2 id="how-many">How many skills, and how to group them</h2>
<p>For most non-executive resumes, 8 to 14 skills is the useful range. Fewer than eight can look thin for a technical role. More than 14 starts to read as a dump, and the reader cannot tell which items are current. Group them into three to five labeled lines so the section scans in one pass.</p>
<ul>
<li><strong>Languages and frameworks:</strong> TypeScript, React, Node.js, PostgreSQL.</li>
<li><strong>Platforms and tools:</strong> AWS, Docker, GitHub Actions, Figma.</li>
<li><strong>Methods:</strong> code review, incident response, A/B testing.</li>
<li><strong>Domain:</strong> payments, subscription billing, fraud review.</li>
</ul>
<p>Order groups by relevance to the posting, not by personal pride. A frontend role should see the UI stack first. A platform role should see infrastructure first. Keep naming consistent across the document: if the resume says Next.js in one place, do not write NextJS in another. Avoid rating bars, percentages, and star icons; they add visual noise, parse poorly, and invite arguments about what four stars mean.</p>
<p>Do not repeat the same skill in three groups to look comprehensive. Duplicates waste space and make the section harder to scan. One mention in the most relevant group is enough, with proof in the bullets below.</p>

<h2 id="ats-matching">ATS keyword matching for skills</h2>
<p>Parsers generally match literal strings, not meanings. If the posting says “JavaScript” and your resume says “JS,” some systems will treat those as different terms. Write the form the posting uses, and include the common abbreviation in parentheses when both are honest: “JavaScript (JS).” The same applies to “CI/CD,” “PostgreSQL,” and hyphenated tool names.</p>
<p>Frequency matters less than placement. A term that appears once in a skills line and once in a bullet is easier to trust than a term repeated six times in a comma-separated block. Use the checker to find missing terms, then decide which ones are true and relevant. The goal is coverage, not density. A resume that scores well but cannot support the claims in an interview is worse than a lower score with defensible content.</p>
<p>Finally, keep the skills section outside tables, columns, and text boxes. A visually tidy grid can scramble reading order or drop content entirely. Plain lines with bold group labels parse cleanly and still look organized on a one-page PDF.</p>

<h2 id="what-to-cut">What to cut, and what to rename</h2>
<ul>
<li><strong>Obsolete tools.</strong> A framework you last used in 2017 takes space from the stack the posting asks for now.</li>
<li><strong>Generic software.</strong> “MS Office” only helps when the role explicitly requires Excel, PowerPoint, or Word.</li>
<li><strong>Character claims.</strong> Hardworking, detail-oriented, and team player are unverifiable and ignored.</li>
<li><strong>Skill bars and percentages.</strong> They are subjective, hard to parse, and easy to mock in an interview.</li>
<li><strong>Course-only tools.</strong> Keep a tool only if you built something with it; otherwise move it to a certification line with the project named.</li>
<li><strong>Inflated languages.</strong> “Fluent” invites a conversation in that language. Use “professional working proficiency” when accurate.</li>
<li><strong>Hobbies and interests.</strong> They belong in a short extras line only when relevant or genuinely distinctive.</li>
</ul>
<p>Rename vague labels into searchable ones. “Data visualization” becomes “Tableau, Looker Studio.” “Social media” becomes “paid social, content calendars, Meta Ads Manager.” “Project management” becomes “Jira, sprint planning, stakeholder reporting.” Specific nouns survive both the parser and the six-second human scan.</p>

<h2 id="before-after">Two skills sections, rewritten</h2>
<p><strong>Example 1 — software developer.</strong> Before: “Skills: HTML, CSS, JavaScript, jQuery, Bootstrap, PHP, MySQL, WordPress, React, Node, Git, hardworking, team player, MS Office, good communication.”</p>
<p>After: “Languages: TypeScript, JavaScript, SQL. Frontend: React, Next.js, Tailwind CSS. Backend: Node.js, Express, PostgreSQL. Tools: Git, Docker, GitHub Actions.”</p>
<p>The before list mixes current and legacy tools, pads with traits, and gives no hierarchy. The after list is 12 items in four groups, all of which the candidate can defend. The proof sits in the bullets: “Rebuilt checkout in Next.js, cutting first-load time 38% on mobile.” The skills line makes the claim findable; the bullet makes it credible.</p>
<p><strong>Example 2 — marketing generalist.</strong> Before: “SEO, SEM, social media, email marketing, communication, creativity, Microsoft Office, Google Analytics.”</p>
<p>After: “SEO: technical audits, keyword mapping, Search Console. Analytics: GA4, Looker Studio, UTM tracking. Lifecycle: HubSpot, email segmentation, A/B tests. Paid: Meta Ads Manager, Google Ads.”</p>
<p>The rewrite replaces broad labels with the actual platforms and methods a hiring manager searches for. It also creates natural interview topics. “Keyword mapping” invites a question about a specific audit; “communication” invites nothing. If the candidate has never run a technical audit, that item should come out, even if the posting mentions it. The section must survive scrutiny, not just the parser.</p>
<div class="cta-box"><strong>Build the section now:</strong> open the <a href="/resume-builder">free resume builder</a>, add three to five skill groups, then check the full draft against a real posting. Keep only terms you can defend. Related: <a href="/blog/resume-builder-guide/resume-summary-examples">resume summary examples</a>.</div>
`;

export const resumeSkillsSection: BlogPost = {
  pillar: "resume-builder-guide",
  slug: "resume-skills-section",
  kind: "cluster",
  title: "Resume Skills Section: What to List and What to Cut",
  description:
    "Resume skills section guide: what to list, how to group hard and soft skills, ATS keyword matching, and what to cut, with two before-and-after examples.",
  keywords: ["resume skills section", "skills to put on a resume", "hard skills vs soft skills resume", "resume skills examples", "ats resume skills keywords", "what to put in skills section"],
  toolSlugs: ["resume-builder", "ats-resume-checker"],
  relatedSlugs: ["ats-resume-guide", "resume-summary-examples", "resume-mistakes"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-belongs", text: "What belongs in the section", level: 2 },
    { id: "hard-vs-soft", text: "Hard skills versus soft skills", level: 2 },
    { id: "how-many", text: "How many skills and how to group", level: 2 },
    { id: "ats-matching", text: "ATS keyword matching", level: 2 },
    { id: "what-to-cut", text: "What to cut and rename", level: 2 },
    { id: "before-after", text: "Two sections, rewritten", level: 2 },
  ],
  html,
  faqs: [
    { question: "How many skills should a resume list?", answer: "Aim for 8 to 14 skills for most non-executive roles, grouped into three to five labeled lines. Fewer can look thin for technical jobs; more starts to read as a dump. Order groups by relevance to the posting and keep every item defensible in an interview. Duplicates across groups waste space without improving keyword coverage." },
    { question: "Should soft skills go in a resume skills section?", answer: "Usually not as standalone words. Mentoring, communication, and ownership are better shown in bullets with scale and context. For example, mentored 4 junior analysts through their first quarterly close proves the skill. A lone list of “team player” and “hardworking” tells a reader nothing and parsers ignore it." },
    { question: "How do I list skills for ATS matching?", answer: "Use the exact wording from the job posting where it is true, including common abbreviations such as JavaScript (JS) and CI/CD. Keep the section in plain lines outside tables, columns, and text boxes. A term in both the skills line and a bullet is stronger than a long comma-separated block. Test coverage against the specific posting before applying." },
    { question: "Should I include skills from courses I have not used at work?", answer: "Include them only when you built something with them. Pair the tool with a project, certificate, or freelance task so the claim has evidence. A course-only tool with no artifact tends to collapse in the first technical question. If the posting asks for it and you have real practice, list it and show the work in a project bullet." },
    { question: "What should I remove from my skills section?", answer: "Remove obsolete tools, generic software unless the role requires it, character claims, skill bars, and anything you cannot discuss for two minutes. Replace vague labels with specific platforms and methods. Keep languages only at the proficiency you can demonstrate. Hobbies belong in an extras line, not in the skills inventory." },
    { question: "Do skills need to appear in experience bullets too?", answer: "Yes. The skills section makes a term findable; the bullet makes it credible. A line listing PostgreSQL is useful, but a bullet describing a query or migration proves it. Recruiters and interviewers both look for the connection. If a skill appears only in the list, expect the first technical question to test it." },
  ],
};
