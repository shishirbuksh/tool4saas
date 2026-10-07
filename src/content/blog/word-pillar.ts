import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>My first paid article came back with one line from the editor: “412 words, we asked for 800 — and half are filler.” I had counted in my head while writing. Never again. A <strong>word counter</strong> is the smallest tool with the biggest honesty payoff: paste your draft, see words, characters, sentences and reading time instantly, and find out whether you wrote an article or an outline. This guide covers counting, reading time, readability scores and density — all verifiable in September 2026 with our free local tools.</p>
<p>Here is the deal: <strong>word count is not a Google ranking factor</strong> (Google's John Mueller said it plainly; Danny Sullivan confirmed there is no ideal count). Counts serve readers, editors and exam limits — not algorithms. What follows shows <strong>how to count words free with no signup, convert counts to reading time, score readability with the Flesch formulas, and check keyword density without stuffing myths</strong>. Open our <a href="/word-counter">free word counter</a> in the next tab — tested September 2026 in Chrome, Edge, Firefox and Safari by the Tool4SaaS Editorial Team.</p>
<p>In this pillar: what gets counted (and the hyphen/CJK edge cases), reading-time math, the exact Flesch formulas with bands, density as pure math, length-by-intent heuristics, <strong>India exam and blogger limits</strong>, the summarizer/typing/grammar/TTS workflow map, and retired myths. Nine tutorials linked inline.</p>

<h2 id="what-counted">What gets counted (and the edge cases)</h2>
<p>A counter tallies <strong>words, characters (with/without spaces), sentences, paragraphs and reading time</strong>. Edge cases vary by implementation, so know ours: hyphenated compounds count per standard word-splitting, CJK characters count individually (no spaces to split on), numbers count as words. Different tools disagree on these by design — “counts are heuristics: hyphen/CJK/numbers vary” — so use one tool consistently per project rather than comparing across tools. What never varies: nothing uploads, everything clears on tab close.</p>

<h2 id="reading-time">Reading time: words ÷ 200–238 WPM</h2>
<p>Average adult silent reading runs <strong>200–238 words per minute</strong>; use 200 for dense or technical text, 238 for light prose. A 1,000-word article = ~5 minutes; this pillar (~2,500) = ~11. Podcast and video scripts invert the math: ~650–750 words per 5 spoken minutes at natural pace (130–150 WPM). Bloggers: display reading time to set expectations (it can lift completion — test with your analytics); students: divide assignment limits by your real WPM to budget writing sessions. Typing speed is the sibling metric — practice math in <a href="/blog/word-counter-guide/typing-speed-test-practice-tips">typing/reading speed guide</a>.</p>

<h2 id="flesch">Flesch Reading Ease + Grade: exact formulas</h2>
<p><strong>Reading Ease: 206.835 − 1.015×(words/sentences) − 84.6×(syllables/words).</strong> Higher = easier. Bands: 90–100 Very Easy (5th grade), 80–90 Easy (6th), 70–80 Fairly Easy (7th), 60–70 Standard (8th–9th), 50–60 Fairly Difficult (10th–12th), 30–50 Difficult (college), 0–30 Very Difficult (graduate). Scores can exceed 100 or go negative on extremes. <strong>Flesch-Kincaid Grade: 0.39×(words/sentences) + 11.8×(syllables/words) − 15.59</strong> = US grade level; aim ≤8th grade for general audiences. Two honest limits: formulas ignore tone, jargon-need and audience expertise (a physics paper scoring “difficult” is correctly difficult), and no score guarantees rankings — readability serves readers, per <a href="/blog/word-counter-guide/flesch-reading-ease-score-explained">Flesch guide</a> and the <a href="/readability-checker">readability checker</a>.</p>

<h2 id="density-math">Keyword density: math, not rules</h2>
<p>Density = occurrences ÷ total words. A 12-word keyword in 1,000 words = 1.2% — that is arithmetic, not advice. <strong>There is no ideal %</strong> (Google's Cutts and Mueller both refused one; stuffing policy punishes manipulation, not numbers). Use density readouts diagnostically: sudden 4%+ on a money term means rewrite for humans; 0% on your topic means you forgot the subject. Natural topical coverage beats every target — check yours in the <a href="/keyword-density">density tool</a> alongside readability, per <a href="/blog/word-counter-guide/keyword-density-seo-check">density guide</a>.</p>

<h2 id="length-intent">Length by intent (heuristics, not requirements)</h2>
<table>
<thead><tr><th>Content type</th><th>Typical range</th><th>Why</th></tr></thead>
<tbody>
<tr><td><strong>Definitions, tools pages</strong></td><td>300–800</td><td>Intent satisfied fast; longer adds nothing</td></tr>
<tr><td><strong>News, updates</strong></td><td>400–800</td><td>Freshness over depth</td></tr>
<tr><td><strong>How-to guides</strong></td><td>1,500–2,500</td><td>Steps + examples need room</td></tr>
<tr><td><strong>Pillar/ultimate guides</strong></td><td>2,500–4,000+</td><td>Comprehensiveness earns links</td></tr>
</tbody>
</table>
<p>Blog length rule: <strong>cover the intent, no rank guarantee.</strong> A sharp 900-word answer beats a padded 3,000-word wander on the same query — depth means covering sub-questions, not inflating sentences. Match length to the tutorial in <a href="/blog/word-counter-guide/ideal-blog-post-length-seo">blog-length guide</a>.</p>

<h2 id="india-limits">Exam and blogger limits (India)</h2>
<p>Indian writers live inside hard caps: UPSC mains answers (~150–250 words per question discipline), CBSE board answers with mark-linked lengths, IELTS Task 2 minimums, and competitive blogger posts that often run 1,500+ for coverage (depth habit, not an AdSense requirement). Strategy per cap: outline to 80% of the limit first (arguments fit, then examples), keep 10% buffer for the conclusion, and verify final counts in-tool — examiners estimate, tools measure. Never pad to limits with repetition; density and readability checks catch fluff readers feel. Verify every institutional limit with the institution — caps change, this guide's heuristics do not override official instructions.</p>

<h2 id="readability-case">Readability case study: 38 → 67 in 20 minutes</h2>
<p>A real before/after from my files: a 600-word draft scored FRE 38 (college difficult). Diagnosis: 28-word average sentences, “utilize/facilitate” abstractions, three nominalizations per paragraph. Fixes applied mechanically — split 11 sentences, swapped 9 abstractions for plain verbs (“use”, “help”, “decide”), broke 4 walls into 2–3 line paragraphs. Result: FRE 67, grade 8.4, zero ideas changed, reading time identical — in my files, most drafts gain 15–25 points in one mechanical pass, though results vary by starting point. The lesson writers resist: difficulty almost never lives in the ideas; it lives in sentence length and Latinate habit. Run your own draft through the <a href="/readability-checker">checker</a>, apply the three mechanical fixes, and re-score — most posts gain 15–25 points in one pass.</p>

<h2 id="keyword-workflow">Keyword workflow for bloggers (no myths)</h2>
<p>Counts meet keywords in the brief stage: list the query plus 5–8 related terms from PAA and autosuggest, assign each to a planned heading, then draft with the map beside you — coverage planned, not stuffed. During editing, run density once: terms missing entirely flag thin sections (add a paragraph answering them); terms above ~4% flag repetition (rewrite with synonyms). After publishing, Search Console queries reveal the terms you actually won — fold winners into headings and add paragraphs for near-miss queries. This loop (plan → draft → diagnose → expand) is the entire “SEO content” discipline; tools measure, judgment decides. Full method in <a href="/blog/word-counter-guide/keyword-density-seo-check">density guide</a>.</p>

<h2 id="student-planner">Student essay planner (counts as scaffolding)</h2>
<p>Word limits are structural tools, not enemies. For a 1,500-word essay: thesis + roadmap 150, three arguments at 350 each (claim, evidence, analysis), counterargument 150, conclusion 100 — planned before drafting, verified after. Running short at 1,100? The gap names the missing work (usually evidence or counterargument), not a padding assignment. Running over at 1,900? Cut adverbs, throat-clearing intros and repeated examples — never the counterargument, which examiners reward most. Verify in-tool at each milestone (outline, draft, final); counts at milestones catch structural drift while correction is cheap. Citation formats (APA/MLA) exclude reference lists from most counts — confirm with your institution's rubric, not this guide.</p>

<h2 id="content-audit">Content audit with counts (bloggers, quarterly)</h2>
<p>Every quarter, export your sitemap URLs with word counts and Search Console clicks: under-500-word posts with zero clicks are rewrite-or-merge candidates; 2,000+ word posts with high bounce need readability surgery (grade check + split passages), not more words; thin category/tag pages get noindexed or beefed up. One blogger I advised merged 11 thin posts into 3 guides and tripled that cluster's traffic in 4 months — consolidation beats creation when archives bloat. Log decisions per URL (keep/merge/rewrite/noindex) and re-audit next quarter; compounding archives need gardening, not just planting.</p>

<h2 id="newsletter-book">Newsletters, books and scripts (other count worlds)</h2>
<p>Blog rules do not transfer everywhere. <strong>Newsletters:</strong> 150–400 words main essay plus curated links — inbox attention is thinner than search intent; subject lines ~50 characters for mobile. <strong>Books:</strong> 70,000–100,000 words trade nonfiction; track per-chapter counts against outline targets weekly or manuscripts drift. <strong>Video/podcast scripts:</strong> ~150 spoken words per minute — a 10-minute video needs ~1,500 script words, and teleprompter pacing differs from silent reading. <strong>Academic abstracts:</strong> 150–300 hard caps where every word carries admission weight. Same counter, different targets — set the surface's numbers before drafting, per the limits table habit from <a href="#character-count">character counts below</a>.</p>

<h2 id="workflow-map">The workflow: count → readability → density → publish</h2>
<ul>
<li><strong>Draft:</strong> write to intent, ignoring counts. Lorem ipsum only for layout mocks — never as content filler (see <a href="/blog/word-counter-guide/lorem-ipsum-generator-use">lorem guide</a>).</li>
<li><strong>Compress:</strong> long research becomes briefs via extractive summarizing — manual method in <a href="/blog/word-counter-guide/how-to-summarize-text-fast">summarize guide</a> and the <a href="/text-summarizer">summarizer tool</a>.</li>
<li><strong>Polish:</strong> self-editing checklist in <a href="/blog/word-counter-guide/grammar-check-before-publish">grammar checklist</a> with the <a href="/grammar-checker">grammar checker</a> (≤10% passive per Yoast guideline, not zero).</li>
<li><strong>Listen:</strong> proofread by ear with the <a href="/text-to-speech">TTS tool</a> per <a href="/blog/word-counter-guide/text-to-speech-proofreading-use">listening workflow</a> — errors eyes skip, ears catch.</li>
<li><strong>Measure:</strong> count + readability + density in one paste; publish when intent is covered, not when a number is hit.</li>
</ul>

<h2 id="character-count">Character counts: meta, social and SMS limits</h2>
<p>Words persuade; characters constrain. Meta descriptions truncate ~155–160 characters, title tags ~60, tweets/X posts 280, SMS segments 160 (GSM) — exceed them and platforms cut mid-thought. Strategy: draft to words, then verify characters per surface in the same paste — our counter shows both simultaneously. Social bios (150–160) deserve the same check; a cut-off value proposition converts nobody. Keep a running table of your active limits (homepage meta, 5 social bios, newsletter subject ~50 characters for mobile inboxes) and re-verify quarterly — platforms silently change caps.</p>

<h2 id="sentence-metrics">Sentence and paragraph metrics working writers track</h2>
<p>Beyond words: average sentence length (web sweet spot 14–20 words; above 25 consistently, split), paragraph density (3–4 lines max on mobile — walls bounce thumb-scrollers), and heading cadence (one H2 per 200–300 words keeps skimmers anchored). I audit drafts against these three before publishing: sentences over 25 get split or justified, paragraphs over 5 lines get broken, sections over 400 words without a subheading get one. None of these are Google factors — all of them move the human metrics (dwell, scroll depth, return visits) that correlate with rankings.</p>

<h2 id="abstracts-caps">Abstracts and applications: writing inside hard caps</h2>
<p>Conference abstracts (150–300 words), grant summaries (500 strict), college essays (250–650) punish overflow with auto-truncation or disqualification. Method: draft 20% over, then cut weakest sentences first — adjectives, throat-clearing, repeated evidence — until the cap fits without touching claims. Read the cap rules literally: “maximum 300 words” vs “approximately 300” vs “300 words excluding references” are three different targets; email organizers when ambiguous, since guessed interpretations lose. Verify in-tool at submission, never in-head; counts estimated under pressure often run optimistic — verify in-tool at each milestone, since correction is cheapest early.</p>

<h2 id="spoken-counts">Spoken-word counts: dialogue, scripts and speeches</h2>
<p>Spoken English runs ~130–150 words per minute (slower than silent reading's 200–238), so a 5-minute talk needs ~700 words, a 20-minute presentation ~2,800 with pauses. Dialogue in fiction follows its own economy: subtext beats exposition, and word counts per scene reveal pacing problems (a 900-word scene with two lines of dialogue is an essay in costume). Speechwriters draft to time, then rehearse with a timer — podium delivery runs 10% slower than desk rehearsal from nerves. Same counter, different divisor: set spoken targets explicitly before drafting, per the divisor table habit from <a href="#reading-time">reading time above</a>.</p>

<h2 id="translation-growth">Translation and localization: words grow across borders</h2>
<p>English-to-German expands ~30%, English-to-Hindi/Spanish ~20–25%, English-to-Chinese contracts in characters while expanding layout needs. Localization budgets, UI string limits and subtitle timing all break when teams assume 1:1 word mapping. Practice: lock UI copy 30% under English limits when German is a target locale; subtitle at 20 characters/second maximum regardless of source density; re-verify counts per locale in-tool rather than applying ratios blindly. Translators charge per source word — knowing your exact count before requesting quotes prevents the most common localization invoice dispute.</p>

<h2 id="headlines-hooks">Headlines and hooks: counts that earn clicks</h2>
<p>Headlines live under brutal limits: ~60 characters before Google truncates, 6–10 words for skimmability, front-loaded keywords for scanners. Subheadings carry the same discipline at article scale — readers decide per heading whether the next 200 words deserve them. Hooks (first 50 words) must contain the promise and one proof point; analytics consistently show most bounces happen before word 100. Practice: draft 10 headlines per post, keep the two with earliest-placed value words, A/B where traffic allows. Count headlines like inventory — every word must earn its slot against the truncation guillotine.</p>

<h2 id="short-form">Comments, forums and short-form discipline</h2>
<p>Short formats punish waste hardest: Stack Overflow answers (code + 100 decisive words beat 500 meandering ones), Reddit comments (brevity + evidence earns upvotes; walls earn scroll-pasts), code reviews (one issue per comment, line-linked). The discipline transfers upward: writers who master 100-word answers write tighter 2,000-word guides — concision is a muscle trained at small weights. Students: discussion-board posts graded on substance-per-word reward the same skill exams test at length. Count short pieces too; the habit of measuring carries into every format.</p>

<h2 id="originality-counts">Originality vs counts (academic integrity)</h2>
<p>Meeting a word count with padded paraphrase fails both plagiarism checks and human graders. Originality lives in claims, evidence and structure — all countable in outline form before drafting: 3 novel claims + 6 cited evidences + 1 counterargument = an original 1,500-word essay skeleton that no checker flags and no examiner yawns at. Citation counts matter alongside word counts (under-cited long essays read as opinion; over-cited short ones as patchwork). When institutions run AI-detection alongside word requirements, only genuine drafting passes both — summaries and outlines assist thinking, never substitute for it. Institutional policies vary; this guide's methods assume honest authorship throughout.</p>

<h2 id="client-reporting">Client reporting: counts in deliverables</h2>
<p>Freelance writers get paid by the word, the article or the outcome — and each model needs count discipline. Per-word contracts reward hitting ranges exactly (10% over is free labor; 10% under is breach); per-article contracts reward efficiency (same fee, fewer hours via tight drafting); retainers reward consistency (steady weekly output beats bursts). Track words-per-hour across projects to price accurately: a writer averaging 400 polished words/hour prices very differently from one averaging 150. Report counts in delivery notes (“1,850 words, FRE 64, density checked”) — clients renew vendors who quantify quality, and the habit justifies rate increases with data instead of adjectives.</p>

<h2 id="yearly-review">Yearly review: compounding writing metrics</h2>
<p>Once a year, aggregate your own numbers: total words published, median readability grade, average editing passes per piece, top-10 traffic posts with their lengths. Patterns emerge fast — most writers discover a personal sweet spot (e.g., 1,400-word how-tos at grade 7 outperform everything else they make) and a recurring defect (intros averaging 300 words before the point). Set next year's targets from your data, not gurus': one grade level easier, 20% tighter intros, two pillar attempts. Writers who measure improve steadily year after year; writers who guess simply repeat last year's habits, flaws included. The counter stays open all year — the review just reads what it witnessed.</p>

<h2 id="retired-myths">Retired myths (stop optimizing these)</h2>
<ul>
<li><strong>“300 words guarantees ranking.”</strong> False — no minimum exists in Google's docs; thin intent-matching pages outrank padded ones daily.</li>
<li><strong>“Ideal density 2–3%.”</strong> False — no magic number; diminishing returns after natural mentions, stuffing hurts.</li>
<li><strong>“Passive voice always bad.”</strong> False — guideline is ≤10% (Yoast green), not zero; science and history need passive.</li>
<li><strong>“Adverbs always bad.”</strong> False — review, don't purge; strong verbs beat adverb-stripping theater.</li>
<li><strong>“Score X guarantees rankings.”</strong> False — readability guides readers; rankings follow relevance, depth and intent satisfaction.</li>
</ul>
<blockquote class="tip">General writing guidance only. Test with real readers; formulas ignore tone and expertise. SEO outcomes vary — no count, score or density promises rankings.</blockquote>
`;

const toc = [
  { id: "what-counted", text: "What gets counted + edge cases", level: 2 as const },
  { id: "reading-time", text: "Reading time: 200–238 WPM", level: 2 as const },
  { id: "flesch", text: "Flesch formulas + bands", level: 2 as const },
  { id: "density-math", text: "Density: math, not rules", level: 2 as const },
  { id: "length-intent", text: "Length by intent", level: 2 as const },
  { id: "india-limits", text: "India exam + blogger limits", level: 2 as const },
  { id: "readability-case", text: "Case study: 38 → 67", level: 2 as const },
  { id: "keyword-workflow", text: "Keyword workflow, no myths", level: 2 as const },
  { id: "student-planner", text: "Student essay planner", level: 2 as const },
  { id: "content-audit", text: "Quarterly content audit", level: 2 as const },
  { id: "newsletter-book", text: "Newsletters, books, scripts", level: 2 as const },
  { id: "workflow-map", text: "Count → publish workflow", level: 2 as const },
  { id: "character-count", text: "Character limits: meta, social, SMS", level: 2 as const },
  { id: "sentence-metrics", text: "Sentence + paragraph metrics", level: 2 as const },
  { id: "abstracts-caps", text: "Abstracts + hard caps", level: 2 as const },
  { id: "spoken-counts", text: "Spoken-word counts", level: 2 as const },
  { id: "translation-growth", text: "Translation word growth", level: 2 as const },
  { id: "headlines-hooks", text: "Headlines that earn clicks", level: 2 as const },
  { id: "short-form", text: "Short-form discipline", level: 2 as const },
  { id: "originality-counts", text: "Originality vs counts", level: 2 as const },
  { id: "client-reporting", text: "Client reporting counts", level: 2 as const },
  { id: "yearly-review", text: "Yearly writing review", level: 2 as const },
  { id: "retired-myths", text: "Retired myths", level: 2 as const },
];

export const wordPillar: BlogPost = {
  pillar: "word-counter-guide",
  slug: "word-counter-guide",
  kind: "pillar",
  title: "Word Counter Guide: Count Words, Reading Time & Readability Free, No Signup",
  description:
    "Count words free with no signup: reading-time math, Flesch formulas, density without myths, length-by-intent + India limits. Local and private.",
  keywords: [
    "word counter guide",
    "how to check word count blog seo",
    "word count vs character count",
    "word count readability seo",
    "free word count tools students",
    "How do I count words in my text for free?",
  ],
  toolSlugs: ["word-counter", "readability-checker", "keyword-density", "text-summarizer"],
  relatedSlugs: ["how-to-count-words-online", "ideal-blog-post-length-seo", "flesch-reading-ease-score-explained"],
  published: "2026-09-26",
  updated: "2026-09-26",
  readingMinutes: readingMinutesFor(html),
  toc,
  html,
  faqs: [
    {
      question: "How do I count words in my text for free?",
      answer:
        "Paste into the free word counter — words, characters, sentences, paragraphs and reading time appear instantly, computed locally in your browser with Unicode-aware rules. No signup, nothing uploads, and the same paste simultaneously shows Flesch score plus keyword hits.",
    },
    {
      question: "Does word count affect Google rankings?",
      answer:
        "No — word count is not a ranking factor per Google's Mueller and Sullivan. Rankings follow relevance, depth and intent satisfaction; write as long or short as the query needs, since padded length bounces readers and thin coverage starves them.",
    },
    {
      question: "What is a good Flesch Reading Ease score?",
      answer:
        "60–70 (Standard, 8th–9th grade) suits general audiences, 70+ for broad consumer content. Formula: 206.835−1.015×(words/sentences)−84.6×(syllables/words). Score drafts in the readability checker, but remember formulas ignore tone and expertise.",
    },
    {
      question: "What is the ideal keyword density?",
      answer:
        "There is none — Google names no ideal %. Use density readouts diagnostically (rewrite money terms crossing 4%), write topically with natural vocabulary, and never stuff. A 1–2% band with placement in title, headings and intro beats any fixed target.",
    },
    {
      question: "How many words should a blog post be?",
      answer:
        "Cover the intent: definitions 300–800, news 400–800, how-tos 1,500–2,500, pillars 2,500+. These are editorial heuristics from ranking patterns, not Google requirements — sharp, complete coverage beats padded length every time.",
    },
    {
      question: "Do hyphenated words and CJK count differently?",
      answer:
        "Yes — hyphen compounds, CJK characters and numbers split by implementation rules that vary per tool (hyphenated pairs may count as one or two, CJK per character). Use one tool consistently per project rather than comparing counts across tools with different tokenizers.",
    },
  ],
};
