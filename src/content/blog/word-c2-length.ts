import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“Make it 2,000 words” — the most common and most wrong SEO brief ever written. Length follows intent: a definition answered in 400 words outranks a 3,000-word wander that never answers. Still, patterns exist across thousands of ranking pages. This is <strong>how long a blog post should be</strong>: intent-first ranges, what earns length, and the padding traps that sink wordy posts.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a>. Measure drafts in the <a href="/word-counter">free word counter</a>; check topical health in the <a href="/keyword-density">density tool</a>.</p>

<h2 id="ranges">Length ranges by intent (heuristics, not requirements)</h2>
<table>
<thead><tr><th>Intent</th><th>Typical range</th><th>Why</th></tr></thead>
<tbody>
<tr><td><strong>What-is / definition</strong></td><td>800–1,300</td><td>One concept, fully answered</td></tr>
<tr><td><strong>How-to</strong></td><td>1,500–2,500</td><td>Steps + examples + troubleshooting</td></tr>
<tr><td><strong>Comparison / best-X</strong></td><td>2,000–3,000</td><td>Multiple entities fairly covered</td></tr>
<tr><td><strong>Pillar / ultimate guide</strong></td><td>2,500–4,000+</td><td>Comprehensiveness earns links</td></tr>
</tbody>
</table>
<p>These describe what comprehensive coverage usually takes — Google ranks relevance and depth, never the number. A 900-word page that fully satisfies beats 3,000 words of wandering, every time.</p>

<h2 id="earns-length">What earns length (and what is padding)</h2>
<ul>
<li><strong>Earns:</strong> worked examples with numbers, comparison tables, troubleshooting sections, original test data, FAQ answering real PAA queries.</li>
<li><strong>Padding:</strong> restated introductions, generic background (“since the dawn of…”), synonym-stuffed repetition, stock anecdotes with no data.</li>
<li><strong>Test:</strong> delete any paragraph — if no sub-question goes unanswered, it was padding. Our 40-post blog gets this delete-test quarterly — intro throat-clearing is usually the first to go.</li>
<li><strong>Student parallel:</strong> examiners reward argument density per 100 words, not total words — same principle, different judge. Essay tactics in the pillar's <a href="/blog/word-counter-guide#india-limits">India limits section</a>.</li>
</ul>

<h2 id="pillar-howto">Pillar vs how-to: different length jobs</h2>
<p>Pillars earn links by mapping a topic (broad, 2,500+, hub of clusters); how-tos earn ranks by solving one task (1,500–2,500, steps first). Our own silos follow this: each 2,500-word pillar anchors 9 focused clusters. New blogs should publish one pillar plus 3–5 clusters minimum before expecting topical authority — single orphans rarely move. Track depth with counts plus readability (grade ≤8 general) via the <a href="/readability-checker">readability checker</a>.</p>
<h2 id="update-strategy">Updating old posts: length decisions that compound</h2>
<p>Posts decay: stats age, screenshots rot, competitors out-cover you. Quarterly, sort published posts by impressions-without-clicks (Search Console) — prime expansion candidates. Update playbook: add the missing sub-section competitors cover (+300–600 words of real coverage, never padding), refresh every number and screenshot, re-verify readability, and update the date honestly (republish notes beat silent date changes for trust). In one case I advised, merging 11 thin posts into 3 guides tripled that cluster's traffic in 4 months — single case, not typical, but maintenance compounds exactly like creation, and counts tell you which posts deserve the effort.</p>
<blockquote class="tip">General writing guidance only. Test with real readers; formulas ignore tone and expertise. SEO outcomes vary — no count, score or density promises rankings.</blockquote>
`;

export const wordLength: BlogPost = {
  pillar: "word-counter-guide",
  slug: "ideal-blog-post-length-seo",
  kind: "cluster",
  title: "How Long Should a Blog Post Be? Intent, Coverage and Limits",
  description:
    "Blog post length by intent: ranges that work, what earns words vs padding + pillar-vs-how-to jobs. No rank guarantees, just method.",
  keywords: [
    "ideal blog post length",
    "how many words blog seo",
    "pillar page vs how-to length",
    "blog word count padding",
    "How many words should an SEO blog post be?",
  ],
  toolSlugs: ["word-counter", "keyword-density", "readability-checker"],
  relatedSlugs: ["how-to-count-words-online", "keyword-density-seo-check", "flesch-reading-ease-score-explained"],
  published: "2026-09-26",
  updated: "2026-09-26",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "ranges", text: "Ranges by intent", level: 2 },
    { id: "earns-length", text: "Earns length vs padding", level: 2 },
    { id: "pillar-howto", text: "Pillar vs how-to jobs", level: 2 },
    { id: "update-strategy", text: "Updating old posts", level: 2 },
  ],
  html,
  faqs: [
    { question: "How many words should an SEO blog post be?", answer: "Cover the intent with definitions at 800 to 1,300, how-tos at 1,500 to 2,500, comparisons at 2,000 to 3,000, and pillars at 2,500 plus. These ranges describe what comprehensive coverage usually takes, not requirements. Google ranks relevance and depth, so a 900-word page that fully satisfies beats 3,000 wandering words every time." },
    { question: "Is longer always better for SEO?", answer: "No, longer wins only when extra words answer sub-questions through worked examples with numbers, comparison tables, troubleshooting sections, original test data and FAQs. Padding like restated introductions, generic background and synonym-stuffed repetition actively hurts engagement. Delete-test every paragraph and cut anything that leaves no sub-question unanswered." },
    { question: "How long should a pillar page be?", answer: "Aim for 2,500 to 4,000 plus words when the topic demands comprehensiveness and must anchor linked clusters. Pillars earn links by mapping a topic broadly as hubs, while how-tos earn ranks by solving one task. New blogs should publish one pillar plus 3 to 5 clusters minimum before expecting topical authority." },
    { question: "How do I hit word count without fluff?", answer: "Add worked examples, comparison tables, troubleshooting sections and FAQs that answer real PAA queries instead of repetition. Use the delete-test on every paragraph and cut it if no sub-question goes unanswered. Our 40-post blog runs this quarterly because intro throat-clearing is usually padding that should go first." },
    { question: "Do student essays follow the same rule?", answer: "Same principle with a different judge, since examiners reward argument density per 100 words rather than total words. Outline to 80 percent of the cap, keep 10 percent buffer, and verify counts in-tool before submitting. That discipline mirrors SEO delete-tests because dense coverage beats wandering length in both classrooms and search." },
  ],
};
