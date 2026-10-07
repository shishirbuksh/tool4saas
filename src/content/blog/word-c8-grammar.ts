import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“There” for “their” in paragraph two. A client once forwarded my draft back with just that word highlighted — no comment needed. Spellcheckers catch typos; they miss wrong-word errors, tangled modifiers and tone-deaf phrasing. This <strong>grammar check before publishing</strong> is the self-editing checklist that catches what automation skips, in 15 minutes per post.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a>. Run drafts through the <a href="/grammar-checker">grammar checker</a>, then readability in the <a href="/readability-checker">readability checker</a>. For flow scores see <a href="/blog/word-counter-guide/flesch-reading-ease-score-explained">Flesch explained</a>, and for audio proofing <a href="/blog/word-counter-guide/text-to-speech-proofreading-use">the listening workflow</a>.</p>

<h2 id="checklist">The 15-minute pre-publish checklist</h2>
<ol>
<li><strong>Automated pass:</strong> grammar checker for spelling, agreement, punctuation — accept 90% of flags, interrogate the rest (tools misread style as error).</li>
<li><strong>Readability pass:</strong> FRE 60+, grade ≤8 for general posts; split 25+ word sentences; cut nominalizations (“make a decision” → “decide”).</li>
<li><strong>Read aloud (or TTS):</strong> ears catch missing words and rhythm breaks eyes skip — full method in <a href="/blog/word-counter-guide/text-to-speech-proofreading-use">listening workflow</a>.</li>
<li><strong>Facts and names:</strong> verify every number, name, date and link — grammar tools never check truth, and wrong facts outrank typos in damage.</li>
<li><strong>Student/blogger extras:</strong> citations formatted, plagiarism self-check on quoted passages, headline promises matched by body content.</li>
</ol>

<h2 id="auto-limits">What automation catches vs misses</h2>
<p>Knowing the boundary keeps you fast: spend seconds where tools excel, spend minutes where only judgment works.</p>
<table>
<thead><tr><th>Automation nails it</th><th>Only humans catch it</th></tr></thead>
<tbody>
<tr><td>Spelling typos, doubled spaces, missing capitals</td><td>Wrong-word errors (their/there, phase/faze)</td></tr>
<tr><td>Subject-verb agreement, tense consistency</td><td>Dangling modifiers and unclear antecedents</td></tr>
<tr><td>Comma placement, apostrophe errors</td><td>Tone problems (brusque email, hype-y claims)</td></tr>
<tr><td>Repeated words, basic passive detection</td><td>Factual errors, wrong names, broken logic</td></tr>
<tr><td>Sentence-length flags</td><td>Headline-body promise mismatch</td></tr>
</tbody>
</table>
<p>Workflow: run the <a href="/grammar-checker">grammar checker</a> first for the left column (seconds), then work the right column with the checklist below (minutes). Measure the result: paste the cleaned draft in the <a href="/word-counter">word counter</a> and confirm the <a href="/blog/word-counter-guide/ideal-blog-post-length-seo">target length</a> still holds after cuts.</p>

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

<h2 id="sentence-surgery">Sentence-level surgery (the 3 biggest wins)</h2>
<ul>
<li><strong>Kill nominalizations:</strong> “make a decision” → “decide”, “provide assistance” → “help”, “conduct an analysis” → “analyze”. Each cut saves 2–3 words and adds a verb with a pulse. A 1,500-word draft typically hides 30–50 of these — run a find for “-tion” endings and interrogate each.</li>
<li><strong>Cap passives at ~10%:</strong> one passive per paragraph is texture; ten in a row is anesthesia. Flip agentless constructions (“mistakes were made”) into actors (“we mispriced the tier”) except where science or formality genuinely requires it.</li>
<li><strong>Split 25+ word sentences:</strong> the <a href="/readability-checker">readability checker</a> flags them; your fix is a period, not a comma. Two 14-word sentences beat one 28-word maze for every audience including experts.</li>
</ul>
<p>After surgery, re-check <a href="/blog/word-counter-guide/keyword-density-seo-check">keyword density</a> — heavy cuts can thin target terms below useful levels, and heavy additions can stuff them.</p>

<h2 id="punct-triage">Punctuation triage (commas, apostrophes, hyphens)</h2>
<p>Ninety percent of punctuation flags reduce to three rules. <strong>Commas:</strong> join two full sentences only with comma + conjunction (and/but/so) — otherwise use a period or semicolon; never separate subject from verb (“The report, shows…”). <strong>Apostrophes:</strong> possession (the writer's draft, the writers' drafts) vs contraction (it's = it is, don't = do not) — plural nouns never take apostrophes. <strong>Hyphens:</strong> compound modifiers before nouns (“well-known author”, “high-intent keywords”) but not after (“the author is well known”); never hyphenate -ly adverbs (“highly rated”, not “highly-rated”). When the checker and your ear disagree, read the sentence aloud — the pause test resolves more comma disputes than any rulebook.</p>

<h2 id="tone-check">Tone check for bloggers (the invisible error)</h2>
<p>Correct grammar with wrong tone still loses readers. Before publishing, scan for: absolute claims without evidence (“always”, “never”, “guaranteed” — soften or cite), hype adjectives stacked three deep (“amazing incredible game-changing” — keep one, cut two), and second-person accusations (“you're doing it wrong” — try “a common trap is…”). Then verify headline honesty: the title's promise must appear verbatim in the body within the first 300 words, or bounce rates punish you harder than any typo. Finish with the <a href="/blog/word-counter-guide/text-to-speech-proofreading-use">listening pass</a> — tone-deaf phrasing sounds wrong before it reads wrong — and practice delivery speed with the <a href="/blog/word-counter-guide/typing-speed-test-practice-tips">typing routine</a> if you present your posts.</p>

<h2 id="style-guides">Style guides: pick one, follow it (AP vs Chicago vs house)</h2>
<p>Grammar arguments usually mask style-guide differences: Oxford commas (Chicago yes, AP no), numbers under 10 spelled out (both, mostly), headline casing (AP sentence-case evolving, Chicago title-case traditional). Solo bloggers: adopt AP-lite (web journalism standard) and note deviations once. Teams: one shared house guide — even 2 pages — ends more arguments than any checker; tools flag inconsistencies, guides resolve them. Academics: the institution's mandated guide outranks all general advice, including this page. Record the choice in the project README so future collaborators inherit decisions instead of relitigating commas. For the full measurement companion, work through the <a href="/blog/word-counter-guide">word counter pillar guide</a> and the <a href="/blog/word-counter-guide/how-to-summarize-text-fast">summarize method</a> for tight first drafts.</p>
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
    "How do I proofread my own blog post?",
  ],
  toolSlugs: ["grammar-checker", "readability-checker", "word-counter"],
  relatedSlugs: ["text-to-speech-proofreading-use", "flesch-reading-ease-score-explained", "how-to-summarize-text-fast"],
  published: "2026-09-26",
  updated: "2026-09-26",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "checklist", text: "15-minute checklist", level: 2 },
    { id: "auto-limits", text: "Automation limits", level: 2 },
    { id: "top-errors", text: "Top 7 blogger errors", level: 2 },
    { id: "sentence-surgery", text: "Sentence surgery", level: 2 },
    { id: "punct-triage", text: "Punctuation triage", level: 2 },
    { id: "tone-check", text: "Tone check", level: 2 },
    { id: "style-guides", text: "Style guides: pick one", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I proofread my own blog post?", answer: "Run an automated pass in the grammar checker, then a readability pass for FRE 60 plus and grade 8 or below with 25-plus-word splits. Add a read-aloud or TTS pass, verify every number, name, date and link, then check citations and headline-match. This fifteen-minute routine per post catches wrong-word errors and tone issues automation skips." },
    { question: "What do grammar checkers miss?", answer: "Checkers miss wrong-word errors like their versus there, dangling modifiers, unclear antecedents, tone problems and all factual errors. Automation nails spelling typos, subject-verb agreement and comma placement in seconds. Humans must handle meaning, truth and headline-body promise mismatch, so work the checklist after the tool." },
    { question: "How much passive voice is OK?", answer: "Up to about 10 percent per Yoast guideline works as a ceiling, not a zero target. One passive per paragraph adds texture while ten in a row cause anesthesia. Science, history and formal contexts legitimately need more agentless constructions, so flip mistakes-were-made styles into actors except where formality genuinely requires passives." },
    { question: "Should students use grammar checkers?", answer: "Yes as learning aids when each flag is reviewed to learn the underlying rule rather than blind-accepted. Tools misread style as error, so interrogate the remaining 10 percent after accepting most flags. Check institutional policies on AI writing assistance first and follow mandated style guides where they exist." },
    { question: "What's the fastest final check?", answer: "Listening through text-to-speech is fastest because ears catch missing words, doubles and rhythm breaks that multiple silent re-reads miss. Silent reading predicts and autocompletes familiar patterns, while listening processes sequentially. Follow along with highlighted sentences at 1x speed, mark issues without fixing live, then batch fixes afterward." },
  ],
};
