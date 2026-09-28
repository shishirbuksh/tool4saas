import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A 40-page report lands Friday; the brief is due Monday. Reading everything costs the weekend — but deciding from nothing costs the grade. <strong>Summarizing text</strong> is the middle skill: extractive compression that keeps decisions sound. This guide teaches the manual method that works with any tool (including ours), plus the summarize-vs-paraphrase line students cross at their peril.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a>. Compress long text in the <a href="/text-summarizer">summarizer tool</a> (length control, local); polish wording with the <a href="/grammar-checker">grammar checker</a>.</p>

<h2 id="method">The extractive method (5 steps, any text)</h2>
<ol>
<li><strong>Read the intro + conclusion first:</strong> thesis and verdict frame everything; 80% of summaries fail from skipping this orientation.</li>
<li><strong>Mark one sentence per section:</strong> the claim each section exists to make — highlight, don't copy yet.</li>
<li><strong>Compress 10:1:</strong> 40 pages → 4 pages of marked claims; then 4 → 1 page of connected prose in your own sentences.</li>
<li><strong>Preserve numbers and caveats:</strong> figures, dates and limitations survive compression; adjectives and anecdotes mostly don't.</li>
<li><strong>Cite the source:</strong> every summary links its original — summaries inform decisions, citations defend them.</li>
</ol>
<ul>
<li><strong>Length control:</strong> briefs get 5% length (executive), study notes 20% (retention), literature reviews 10% with critique added.</li>
<li><strong>Local-first privacy:</strong> our summarizer runs extractive compression in-browser — sensitive reports never upload, unlike many server-AI tools that impose free-tier caps and retain data (check current terms — limits change).</li>
</ul>

<h2 id="vs-paraphrase">Summarize vs paraphrase (the academic line)</h2>
<table>
<thead><tr><th>Technique</th><th>What it does</th><th>Cite?</th></tr></thead>
<tbody>
<tr><td><strong>Quote</strong></td><td>Exact words, marked</td><td>Always</td></tr>
<tr><td><strong>Paraphrase</strong></td><td>Same ideas, your sentences</td><td>Always</td></tr>
<tr><td><strong>Summarize</strong></td><td>Compressed main points</td><td>Always</td></tr>
<tr><td><strong>Common knowledge</strong></td><td>Established facts</td><td>No</td></tr>
</tbody>
</table>
<p>Students: paraphrase without citation is plagiarism even with changed words — summarizing inherits the same rule. Bloggers: summarizing competitors' posts then outranking them requires adding original value (data, tests, examples), not just shorter words. When in doubt, cite; citations cost nothing and protect everything.</p>
<h2 id="meeting-notes">Meeting and lecture notes (live summarizing)</h2>
<p>Summarizing live — meetings, lectures, calls — adds speed pressure the desk method skips. Technique: capture verbatim decisions and numbers only (everything else paraphrased later), mark speaker names per claim, and flag follow-ups inline with [TODO + owner] so the summary drives action. Within 2 hours, compress raw notes 3:1 while memory is fresh; after 24 hours, half the context evaporates and compression quality collapses. Students: lecture notes summarized same-evening retain dramatically better than weekend batch jobs — the 2-hour window is the whole game. Professionals: circulate one-page decision summaries, never raw transcripts; nobody reads 40 messages, everybody reads 10 lines with owners.</p>
<blockquote class="tip">General writing guidance only, not academic or legal advice. Test with real readers; formulas ignore tone and expertise. SEO outcomes vary.</blockquote>
`;

export const wordSummarize: BlogPost = {
  pillar: "word-counter-guide",
  slug: "how-to-summarize-text-fast",
  kind: "cluster",
  title: "How to Summarize Text Fast: Extractive Method",
  description:
    "Summarize any text with the 5-step extractive method: length control, privacy-first tools + summarize-vs-paraphrase rules. Students + bloggers.",
  keywords: [
    "how to summarize text",
    "summarize article own words",
    "summarize vs paraphrase",
    "extractive summarizer method",
  ],
  toolSlugs: ["text-summarizer", "grammar-checker", "word-counter"],
  relatedSlugs: ["grammar-check-before-publish", "how-to-count-words-online", "ideal-blog-post-length-seo"],
  published: "2026-09-26",
  updated: "2026-09-26",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "method", text: "Extractive method, 5 steps", level: 2 },
    { id: "vs-paraphrase", text: "Summarize vs paraphrase", level: 2 },
    { id: "meeting-notes", text: "Live meeting/lecture notes", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I summarize a long article quickly?", answer: "Read intro and conclusion, mark one claim sentence per section, compress 10:1 twice into your own sentences, preserve numbers and caveats, cite the source." },
    { question: "What is extractive summarization?", answer: "Selecting and compressing the source's own key sentences rather than generating new text — private, predictable, and citable. Our tool does this locally with length control." },
    { question: "Summarize vs paraphrase — what's the difference?", answer: "Summarizing compresses main points; paraphrasing restates ideas at similar length. Both need citations; only common knowledge doesn't." },
    { question: "Is using a summarizer cheating for students?", answer: "As a study aid producing notes you understand, no — as submitted work, yes. Check institutional AI/plagiarism policies; cite everything." },
    { question: "How long should a summary be?", answer: "Executive briefs ~5%, study notes ~20%, literature reviews ~10% plus critique. Match length to the decision the summary serves." },
  ],
};
