import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Google Docs buries the count in a menu, Word needs the file open, and PDFs defeat both. Meanwhile the draft sits in a CMS, an email or a scanned page. This is <strong>how to count words online</strong> from any source in seconds: paste-and-read flow, per-source tricks, and the edge cases (hyphens, CJK, numbers) that explain mismatched counts.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a> — the pillar covers the system, this is the hands-on walkthrough. Open the <a href="/word-counter">free word counter</a> in the next tab. No signup, local only.</p>

<h2 id="three-steps">Count from anything in 3 steps</h2>
<h3>Step 1 — Get the text out</h3>
<p>Docs/Web/CMS: select all, copy. PDF: select text if real-text (scanned-image PDFs need OCR first — counts read zero otherwise). Phone photos of printouts: share-to-text or retype short passages; never estimate by eye — eyeball counts run visibly short, so verify in-tool).</p>
<h3>Step 2 — Paste and read</h3>
<p>Paste into the <a href="/word-counter">counter</a>: words, characters with/without spaces, sentences, paragraphs, reading time appear live. For case cleanup first (UPPERCASE drafts, title mishaps), run the <a href="/case-converter">case converter</a> — counts stay identical, readability jumps.</p>
<h3>Step 3 — Interpret, don't idolize</h3>
<p>Compare against your target (assignment cap, SEO brief, abstract limit) with 10% buffer — then stop counting and start editing. Counts guide revision scope; they never grade quality.</p>

<h2 id="source-tricks">Per-source tricks (Docs, Word, web, PDF)</h2>
<table>
<thead><tr><th>Source</th><th>Fastest count</th><th>Watch out</th></tr></thead>
<tbody>
<tr><td><strong>Google Docs</strong></td><td>Ctrl+Shift+C, or paste here</td><td>Comments/suggestions inflate Docs counts</td></tr>
<tr><td><strong>Word</strong></td><td>Status bar / Review tab</td><td>Footnotes, text boxes counted inconsistently</td></tr>
<tr><td><strong>Web/CMS</strong></td><td>Copy rendered text, paste here</td><td>HTML tags must be excluded — paste rendered, not source</td></tr>
<tr><td><strong>PDF</strong></td><td>Copy text, paste here</td><td>Scanned images need OCR; tables split oddly</td></tr>
</tbody>
</table>

<h2 id="mismatch">Why two tools disagree (edge cases)</h2>
<ul>
<li><strong>Hyphenated compounds:</strong> “well-known” = 1 or 2 words depending on splitter. Neither is wrong — consistency beats correctness here.</li>
<li><strong>CJK text:</strong> character-based counting (no spaces); Latin-mixed passages split by each tool's own rules.</li>
<li><strong>Numbers and symbols:</strong> “2026”, “$45”, “3.5%” count as words in most tools; some exclude pure symbols.</li>
<li><strong>Fix:</strong> pick one tool per project and note the rule once. Cross-tool comparison is the only real error.</li>
</ul>
<p>Counts are heuristics: hyphen/CJK/numbers vary. Blog-length targets in <a href="/blog/word-counter-guide/ideal-blog-post-length-seo">length guide</a>.</p>
<h2 id="mobile-counting">Counting on mobile (notes, chat, on-the-go drafts)</h2>
<p>Half of all drafts start on phones — notes apps, chat messages to self, voice memos transcribed. Mobile counting pitfalls: autocorrect silently changes words (verify before trusting counts), chat apps strip formatting that affects sentence splits, and small screens hide overlong paragraphs. Workflow: draft freely on mobile, paste into the counter on desktop for the real audit (counts + readability + density in one pass). Voice-dictated drafts run 15–20% wordier than typed ones — dictate freely, then cut ruthlessly; the counter quantifies exactly how much the spoken version bloated versus your typed baseline.</p>
<blockquote class="tip">General writing guidance only. Test with real readers; formulas ignore tone and expertise. SEO outcomes vary — no count promises rankings.</blockquote>
`;

export const wordHowTo: BlogPost = {
  pillar: "word-counter-guide",
  slug: "how-to-count-words-online",
  kind: "cluster",
  title: "How to Count Words Online Free (No Signup)",
  description:
    "Count words from Docs, Word, web or PDF in 3 steps: paste-and-read flow, per-source tricks + why tools disagree. Free local counter.",
  keywords: [
    "how to count words online",
    "how to check character count",
    "count words without word",
    "word count pdf text",
    "How do I count words without Microsoft Word?",
  ],
  toolSlugs: ["word-counter", "case-converter", "readability-checker"],
  relatedSlugs: ["ideal-blog-post-length-seo", "flesch-reading-ease-score-explained", "keyword-density-seo-check"],
  published: "2026-09-26",
  updated: "2026-09-26",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "three-steps", text: "Count in 3 steps", level: 2 },
    { id: "source-tricks", text: "Per-source tricks", level: 2 },
    { id: "mismatch", text: "Why tools disagree", level: 2 },
    { id: "mobile-counting", text: "Counting on mobile", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I count words without Microsoft Word?", answer: "Paste text into the free word counter, where words, characters with and without spaces, sentences, paragraphs and reading time appear live in your browser. It works for Docs, web, CMS and PDF text alike without signup since processing stays local. For uppercase drafts, run the case converter first because counts stay identical while readability jumps." },
    { question: "How do I count words in a PDF?", answer: "Copy real text from the PDF and paste it into the counter for instant words, characters and reading time. Scanned-image PDFs need OCR first because without extractable text counts read zero. Tables may split oddly and image pages need share-to-text or retyping, so never estimate by eye and verify in-tool." },
    { question: "Do characters with spaces matter?", answer: "Yes for hard caps like abstracts, meta descriptions and social bios where limits count every space. Track both figures throughout drafting because with-space and without-space totals diverge on formatted copy. Our counter shows characters with and without spaces live, so compare against your target with 10 percent buffer." },
    { question: "Why do Word and online counters differ?", answer: "Hyphenated compounds like well-known count as one or two words depending on the splitter, while footnotes, text boxes and CJK rules differ by implementation. Numbers like 2026 and symbols also split inconsistently across tools. Neither result is wrong, so pick one tool per project, note the rule once, and avoid cross-tool comparison." },
    { question: "Can I count case-changed text?", answer: "Yes, run text through the case converter first to fix uppercase drafts and title mishaps, then paste into the counter. Counts stay identical while readability improves because casing changes no word boundaries. This cleanup helps before interpreting against assignment caps or SEO briefs, letting counts guide revision scope rather than grading quality." },
  ],
};
