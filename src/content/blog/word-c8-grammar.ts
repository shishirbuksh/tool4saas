import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“There” for “their” in paragraph two. A client once forwarded my draft back with just that word highlighted — no comment needed. Spellcheckers catch typos; they miss wrong-word errors, tangled modifiers and tone-deaf phrasing. This <strong>grammar check before publishing</strong> is the self-editing checklist that catches what automation skips, in 15 minutes per post.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a>. Run drafts through the <a href="/grammar-checker">grammar checker</a>, then readability in the <a href="/readability-checker">readability checker</a>.</p>

<h2 id="checklist">The 15-minute pre-publish checklist</h2>
<ol>
<li><strong>Automated pass:</strong> grammar checker for spelling, agreement, punctuation — accept 90% of flags, interrogate the rest (tools misread style as error).</li>
<li><strong>Readability pass:</strong> FRE 60+, grade ≤8 for general posts; split 25+ word sentences; cut nominalizations (“make a decision” → “decide”).</li>
<li><strong>Read aloud (or TTS):</strong> ears catch missing words and rhythm breaks eyes skip — full method in <a href="/blog/word-counter-guide/text-to-speech-proofreading-use">listening workflow</a>.</li>
<li><strong>Facts and names:</strong> verify every number, name, date and link — grammar tools never check truth, and wrong facts outrank typos in damage.</li>
<li><strong>Student/blogger extras:</strong> citations formatted, plagiarism self-check on quoted passages, headline promises matched by body content.</li>
</ol>

<h2 id="top-errors">Top 7 blogger errors (with fixes)</h2>
<table>
<thead><tr><th>Error</th><th>Example</th><th>Fix</th></tr></thead>
<tbody>
<tr><td><strong>Their/there/they're</strong></td><td>“There audience…”</td><td>Possessive/place/contraction drill</td></tr>
<tr><td><strong>Its/it's</strong></td><td>“Its a guide…”</td><td>Expand to “it is” mentally</td></tr>
<tr><td><strong>Dangling modifiers</strong></td><td>“Walking home, the idea struck…”</td><td>Name the walker first</td></tr>
<tr><td><strong>Comma splices</strong></td><td>“It works, trust me…”</td><td>Period, conjunction, or semicolon</td></tr>
<tr><td><strong>Affect/effect</strong></td><td>“The affect was…”</td><td>Verb vs noun test</td></tr>
<tr><td><strong>Passive pile-ups</strong></td><td>“Was written by…” ×10</td><td>Keep ≤10% per Yoast guideline</td></tr>
<tr><td><strong>Then/than</strong></td><td>“Better then…”</td><td>Time vs comparison check</td></tr>
</tbody>
</table>
<p>No comparison with paid tools here and no affiliate picks — this checklist plus our free checker covers student and blogger needs; professionals add human editors for books and legal copy. Not academic advice; follow institutional style guides where they exist.</p>
<h2 id="style-guides">Style guides: pick one, follow it (AP vs Chicago vs house)</h2>
<p>Grammar arguments usually mask style-guide differences: Oxford commas (Chicago yes, AP no), numbers under 10 spelled out (both, mostly), headline casing (AP sentence-case evolving, Chicago title-case traditional). Solo bloggers: adopt AP-lite (web journalism standard) and note deviations once. Teams: one shared house guide — even 2 pages — ends more arguments than any checker; tools flag inconsistencies, guides resolve them. Academics: the institution's mandated guide outranks all general advice, including this page. Record the choice in the project README so future collaborators inherit decisions instead of relitigating commas.</p>
<blockquote class="tip">General writing guidance only. Test with real readers; formulas ignore tone and expertise. SEO outcomes vary.</blockquote>
`;

export const wordGrammar: BlogPost = {
  pillar: "word-counter-guide",
  slug: "grammar-check-before-publish",
  kind: "cluster",
  title: "Grammar Check Before You Publish: Self-Editing Checklist",
  description:
    "Pre-publish grammar checklist: 15-minute routine, top 7 blogger errors with fixes + what automation misses. Free checker included.",
  keywords: [
    "grammar check essay blog",
    "proofread blog post checklist",
    "common grammar mistakes bloggers",
    "self-editing checklist",
  ],
  toolSlugs: ["grammar-checker", "readability-checker", "word-counter"],
  relatedSlugs: ["text-to-speech-proofreading-use", "flesch-reading-ease-score-explained", "how-to-summarize-text-fast"],
  published: "2026-09-26",
  updated: "2026-09-26",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "checklist", text: "15-minute checklist", level: 2 },
    { id: "top-errors", text: "Top 7 blogger errors", level: 2 },
    { id: "style-guides", text: "Style guides: pick one", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I proofread my own blog post?", answer: "Automated pass, readability pass (FRE 60+, grade ≤8), read-aloud or TTS pass, facts-and-names verification, then citations and headline-match check. Fifteen minutes per post." },
    { question: "What do grammar checkers miss?", answer: "Wrong-word errors (their/there), tangled modifiers, tone issues, and all factual errors. Automation handles spelling and agreement; humans handle meaning and truth." },
    { question: "How much passive voice is OK?", answer: "Up to ~10% per Yoast's guideline — a ceiling, not zero. Science, history and formal contexts legitimately need more." },
    { question: "Should students use grammar checkers?", answer: "Yes as learning aids — review each flag to learn the rule, don't blind-accept. Check institutional policies on AI writing assistance first." },
    { question: "What's the fastest final check?", answer: "Listening via text-to-speech. Ears catch missing words, doubles and rhythm breaks that multiple silent re-reads miss." },
  ],
};
