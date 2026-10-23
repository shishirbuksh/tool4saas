import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Two versions of a paragraph look identical until a comma moves, a number changes or a sentence disappears. Reading them side by side works for a short email and fails for a two-page proposal. A diff highlights what changed, but the unit of comparison matters: word-level tools catch small edits inside a sentence, while line-level tools are better for code and structured records. The local <a href="/text-diff">text diff</a> compares words, and knowing that makes its output much easier to interpret.</p>
<p>Part of the <a href="/blog/word-counter-guide">word and text guide</a>. The tool runs in the page and does not store either version. It has no account, no history and no export, so keep the original documents somewhere safe before pasting them.</p>

<h2 id="word-level">What a word-level diff shows</h2>
<p>The tool splits each version into words and whitespace, then finds the longest common subsequence between the middle sections. Text before the first difference and after the last one is treated as unchanged. The output colors removed words with a strikethrough and added words with a highlight, and reports a count of removed and added tokens.</p>
<p>That design makes small edits visible. Changing <code>30 days</code> to <code>45 days</code> highlights only the number. Reordering a clause shows the old words as removed and the new words as added, even though the meaning may be similar. Inserting a sentence produces a long green run, which is easy to spot.</p>
<p>Whitespace is part of the token stream. A changed space, a removed line break or a doubled space can appear as an added or removed token, and the counts include those tokens. That is why the numbers may be larger than the number of visible words you changed. It is not a bug; it is a consequence of comparing raw text.</p>
<p>Example: <code>The plan costs 30 dollars per month.</code> versus <code>The plan costs 45 dollars per month.</code> produces one removed token and one added token. The surrounding words stay unchanged. If the second version also changes the line wrapping, the whitespace tokens can add to the counts even though the prose is identical.</p>

<h2 id="algorithm">How the comparison works under the hood</h2>
<p>After trimming the common prefix and suffix, the tool builds a dynamic-programming table over the remaining tokens. When the table is small enough, it reconstructs an ordered set of matches, deletions and additions. When the remaining block is very large, the table would be too expensive, so the tool skips the detailed alignment and shows the entire middle section as removed followed by added. That fallback is honest but coarse: it preserves the counts and the visible change, not the fine-grained pairing.</p>
<p>The practical threshold is a product of the two middle token counts. A large document with edits at both ends can trigger the fallback even if the changed middle is modest. If the output suddenly looks like two big blocks instead of interleaved words, shorten the input around the region you care about and compare that excerpt.</p>
<p>There is no option to ignore case, ignore punctuation or normalize whitespace. <code>Total</code> and <code>total</code> are different tokens. A curly apostrophe and a straight apostrophe are different characters. If those differences are noise for your task, normalize both versions in a text editor first, then paste the normalized copies.</p>

<h2 id="reading-output">Reading the counts and the colors</h2>
<p>The red count is the number of removed tokens, and the green count is the number of added tokens. They are not a score, and they do not tell you whether the edit is good. A single changed digit can be more important than a rewritten paragraph. Use the counts to confirm that the diff actually ran and to estimate the size of the change, then read the highlighted passage.</p>
<p>Moved text is displayed as a removal in one place and an addition in another. The tool does not detect moves, so a paragraph that was relocated can look like a deletion and an unrelated insertion. For a contract, that difference matters: a moved clause may still be enforceable, while a deleted one may not. Read the context around both colors rather than relying on the summary.</p>
<p>Punctuation attached to a word stays attached. A changed comma may highlight the neighboring word, depending on where the token boundary falls. Numbers with thousands separators can split differently between versions. If the highlighting looks odd, compare the two source sentences directly and treat the diff as a pointer, not a verdict.</p>

<h2 id="when-to-use">When word diff is the right tool</h2>
<p>Use it for prose revisions: blog drafts, cover letters, policy summaries, product descriptions and translation checks. It is good at catching a changed date, a dropped negation or a swapped name. It is also useful when a collaborator says “I only made a few edits” and you want to verify that claim before publishing.</p>
<p>Do not use it as a code review tool. Code diffs need line numbers, context, syntax awareness and the ability to ignore whitespace. A word-level view of a JSON file or a function can be unreadable. Use version control for code, and use a line-based diff when you need to review configuration or structured text.</p>
<p>For legal redlines, a word diff is a starting point, not a replacement for a clause-by-clause review. It cannot tell you whether a change alters an obligation, and it does not track comments or authorship. Export the comparison or annotate the source document with a qualified reviewer.</p>

<h2 id="workflow">A practical comparison workflow</h2>
<ol>
<li>Save both versions with clear names before editing either one.</li>
<li>Normalize obvious noise such as line endings or smart quotes if you do not want them in the diff.</li>
<li>Paste the original on the left and the revision on the right.</li>
<li>Read the first changed passage in context; do not start with the counts.</li>
<li>Check names, numbers, dates and negations specifically, since a single token can change meaning.</li>
<li>Copy the final approved text back into the source document, not from the diff view.</li>
</ol>
<table>
<thead><tr><th>Situation</th><th>Word diff</th><th>Better choice</th></tr></thead>
<tbody>
<tr><td><strong>Blog draft revision</strong></td><td>Good fit</td><td>This tool</td></tr>
<tr><td><strong>Contract clause review</strong></td><td>Useful pointer</td><td>Clause-level legal review</td></tr>
<tr><td><strong>Code changes</strong></td><td>Poor fit</td><td>Git diff or a code review tool</td></tr>
<tr><td><strong>Translation QA</strong></td><td>Good for missing text</td><td>A bilingual reviewer for meaning</td></tr>
<tr><td><strong>Whitespace-only changes</strong></td><td>Noisy</td><td>Normalize before comparing</td></tr>
<tr><td><strong>Very large documents</strong></td><td>Falls back to block view</td><td>Compare excerpts or use a desktop diff</td></tr>
</tbody>
</table>
<p>The tool does not upload either document, which is useful for unpublished drafts and internal notes. It also does not save them, so closing the tab clears the comparison. If you need an audit trail, keep the versions in your document system and record which one was approved.</p>
<div class="cta-box"><strong>Compare two versions now:</strong> paste both into the <a href="/text-diff">text diff</a>, read the highlighted passages in context, then copy the approved text back to your editor. For length checks on the result, use the <a href="/word-counter">word counter</a>.</div>
`;

export const textDiff: BlogPost = {
  pillar: "word-counter-guide",
  slug: "compare-two-texts-word-diff",
  kind: "cluster",
  title: "Compare Two Texts Word by Word",
  description:
    "Compare two drafts at word level, read the added and removed counts, and know when a line-based diff is the better tool.",
  keywords: ["text diff online", "compare two texts", "word diff tool", "document comparison", "find changes between drafts"],
  toolSlugs: ["text-diff"],
  relatedSlugs: ["how-to-count-words-online", "grammar-check-before-publish", "ideal-blog-post-length-seo"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "word-level", text: "What a word diff shows", level: 2 },
    { id: "algorithm", text: "How the comparison works", level: 2 },
    { id: "reading-output", text: "Reading counts and colors", level: 2 },
    { id: "when-to-use", text: "When to use it", level: 2 },
    { id: "workflow", text: "Comparison workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does the diff ignore capitalization or punctuation?", answer: "No. Every character is part of a token, so Total and total differ, and a changed comma can affect the surrounding token. Normalize the copies in an editor first if those differences are noise for your review." },
    { question: "Why do the counts include spaces?", answer: "The tool splits on whitespace but keeps the separators as tokens. A changed line break or an extra space can therefore add to the added or removed count even when no visible word changed. Read the highlighted passages rather than treating the counts as a word count." },
    { question: "Why did a large document show two big blocks?", answer: "When the changed middle is too large for the detailed alignment table, the tool falls back to showing the whole middle as removed followed by added. Compare a shorter excerpt around the section you care about to get word-level pairing again." },
    { question: "Can I use this for code reviews?", answer: "It is a poor fit for code. Word-level highlighting loses line numbers, indentation context and syntax structure. Use Git or a line-based diff for source files, and keep this tool for prose and short documents." },
    { question: "Is either version uploaded?", answer: "No. The comparison runs in the page and no history is stored. Closing the tab clears the input. Keep the originals in your document system if you need an audit trail or a record of the approved version." },
  ],
};
