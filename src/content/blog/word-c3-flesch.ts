import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two drafts, same topic. One scores 72 (“Fairly Easy”), the other 38 (“Difficult, college”). Same facts — different sentence lengths and word choices. The <strong>Flesch Reading Ease score</strong> quantifies that gap with 1948-vintage math that still powers Yoast, Hemingway-adjacent tools and plain-language laws. Here is the exact formula, the bands, and how to lift a score without dumbing ideas down.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a>. Score drafts in the <a href="/readability-checker">readability checker</a>; count basics in the <a href="/word-counter">word counter</a>.</p>

<h2 id="formula">The formula + bands (exact)</h2>
<p><strong>206.835 − 1.015×(words ÷ sentences) − 84.6×(syllables ÷ words).</strong> Higher = easier. Bands: 90–100 Very Easy (5th), 80–90 Easy (6th), 70–80 Fairly Easy (7th), 60–70 Standard (8th–9th), 50–60 Fairly Difficult (10th–12th), 30–50 Difficult (college), 0–30 Very Difficult (graduate). Scores can exceed 100 (toddlers' books) or go negative (legal disclaimers). Sibling metric — <strong>Flesch-Kincaid Grade: 0.39×(W/S) + 11.8×(Syl/W) − 15.59</strong> — states US grade level directly; general audiences target grade ≤8.</p>
<table>
<thead><tr><th>Score</th><th>Label</th><th>Example register</th></tr></thead>
<tbody>
<tr><td><strong>90–100</strong></td><td>Very Easy</td><td>Comics, product blurbs</td></tr>
<tr><td><strong>60–70</strong></td><td>Standard</td><td>General blogs, news — the target zone</td></tr>
<tr><td><strong>30–50</strong></td><td>Difficult</td><td>Academic, legal — appropriate there</td></tr>
<tr><td><strong>0–30</strong></td><td>Very Difficult</td><td>Specialist papers — never consumer copy</td></tr>
</tbody>
</table>

<h2 id="raise">Raise scores without dumbing down</h2>
<ul>
<li><strong>Split sentences over 25 words:</strong> one idea per sentence lifts scores fastest — and readers. Keep occasional long sentences for rhythm; averages decide.</li>
<li><strong>Swap Latinate abstractions:</strong> “utilize” → “use”, “facilitate” → “help”, “in order to” → “to”. Ideas stay identical, syllables fall.</li>
<li><strong>Prefer verbs to nominalizations:</strong> “make a decision” → “decide”, “conduct an analysis” → “analyze”. Shorter and stronger.</li>
<li><strong>Keep necessary jargon:</strong> a cardiology paper scoring 40 is correctly difficult — formulas ignore audience expertise by design. Target the reader, not the number.</li>
</ul>

<h2 id="combo">Pair with density (readability + SEO in one paste)</h2>
<p>Readability serves humans; density diagnostics serve search. Run both: FRE 60+ with grade ≤8, plus topical terms present naturally (no stuffing — there is no ideal %). Our competitors silo these checks; one paste showing score + top terms + stuffing alert beats two tabs. Method in <a href="/blog/word-counter-guide/keyword-density-seo-check">density guide</a>; tools: <a href="/readability-checker">checker</a> + <a href="/keyword-density">density</a>. Honest caveat: formulas ignore tone and expertise — test with real readers, and no score promises rankings.</p>
<h2 id="grade-targets">Grade targets by audience (stop aiming blindly)</h2>
<p>Different readers need different grades, and mismatches cost comprehension: general web content grade 6–8, B2B professional 9–11, academic/legal 12+ (appropriately difficult), children's content grade 3–5, ESL audiences one grade below native equivalent. Healthcare and finance face plain-language regulations in several jurisdictions — grade 8 ceilings with legal review, not vibes. Measure per-section, not just per-article: introductions can run easier (grade 6) to onboard, methodology sections harder (grade 11) where precision demands it. The checker reports both FRE and grade — use FRE for quick comparison, grade for audience targeting, and reader feedback over both.</p>
<blockquote class="tip">General writing guidance only. Test with real readers; formulas ignore tone and expertise. SEO outcomes vary — no count, score or density promises rankings.</blockquote>
`;

export const wordFlesch: BlogPost = {
  pillar: "word-counter-guide",
  slug: "flesch-reading-ease-score-explained",
  kind: "cluster",
  title: "Flesch Reading Ease Score Explained: Formula and Bands",
  description:
    "Flesch Reading Ease: exact formula, bands, grade equivalent + how to raise scores without dumbing down. Pair with density checks.",
  keywords: [
    "flesch reading ease score",
    "flesch kincaid score good",
    "improve readability score",
    "reading ease formula bands",
    "What is a good Flesch Reading Ease score?",
  ],
  toolSlugs: ["readability-checker", "word-counter", "keyword-density"],
  relatedSlugs: ["keyword-density-seo-check", "how-to-count-words-online", "ideal-blog-post-length-seo"],
  published: "2026-09-26",
  updated: "2026-09-26",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "formula", text: "Formula + bands, exact", level: 2 },
    { id: "raise", text: "Raise scores smartly", level: 2 },
    { id: "combo", text: "Pair with density", level: 2 },
    { id: "grade-targets", text: "Grade targets by audience", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is a good Flesch Reading Ease score?", answer: "Aim for 60 to 70 Standard at 8th to 9th grade for general audiences, with 70 plus for consumer content like news and blogs. Scores of 90 to 100 suit comics and blurbs, while 30 to 50 fits academic or legal writing. Cardiology papers scoring 40 are difficult because formulas ignore audience expertise by design." },
    { question: "What is the Flesch Reading Ease formula?", answer: "Calculate 206.835 minus 1.015 times words divided by sentences minus 84.6 times syllables divided by words, where higher means easier. Scores can exceed 100 for toddler books or go negative for legal disclaimers. The sibling Flesch-Kincaid Grade outputs US grade level directly, with general audiences targeting grade 8 or below." },
    { question: "How is Flesch-Kincaid Grade different?", answer: "Flesch-Kincaid Grade outputs US grade level through 0.39 times words per sentence plus 11.8 times syllables per word minus 15.59. Target grade 8 or below for the public, 6 to 8 for web content and 9 to 11 for B2B professionals. Use FRE for quick comparison, grade for audience targeting, and reader feedback over both." },
    { question: "How do I improve readability without dumbing down?", answer: "Split sentences over 25 words into one idea per sentence, since averages decide scores and occasional long sentences preserve rhythm. Swap Latinate abstractions like utilize to use and prefer verbs over nominalizations like make a decision to decide. Keep necessary jargon for expert readers and target the reader, not the number." },
    { question: "Does readability score affect SEO?", answer: "Only indirectly, because readable pages with FRE 60 plus and grade 8 or below engage better and sustain attention. Formulas ignore tone, expertise and topical completeness, so no score guarantees rankings. Pair readability with density diagnostics in one paste, cover topical terms naturally without stuffing, and test with real readers." },
  ],
};
