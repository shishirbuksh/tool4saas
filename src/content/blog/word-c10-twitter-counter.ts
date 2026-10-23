import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A draft looks like it fits: 265 characters in the word counter, 42 words, no warnings. You paste it into X, add a link and a mention, and the composer says you are over. Nothing is broken. The word counter measures raw text; X applies its own counting rules, replaces links with a t.co URL and may give some characters more weight than others. The only reliable final check is the composer for the account you are using.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a>. Draft and measure in the <a href="/word-counter">word counter</a>, then verify the post in X before publishing.</p>

<h2 id="what-tool-reports">What the word counter actually reports</h2>
<p>The <a href="/word-counter">word counter</a> reports characters with spaces, characters without spaces, words, sentences, paragraphs and estimated reading and speaking time. Those numbers are useful for drafting: they tell you whether a post is 180 characters or 420, and whether a thread is 600 words or 1,200. They do not calculate X's weighted length, thread numbering or link shortening.</p>
<p>Treat “characters with spaces” as a rough ceiling for plain English text. If the draft contains only Latin letters, digits and ordinary punctuation, the composer will often show a similar number. Once you add emoji, CJK characters, links or thread markers, the raw count and the composer can diverge. That is not a bug in either tool; they measure different things.</p>

<h2 id="what-x-counts">What X counts, and why the rules move</h2>
<p>X counts most characters as one. Some emoji and some CJK characters can count as more than one, and the exact weighting is set by X, not by your text editor. A flag emoji, a skin-tone modifier or a character outside the Basic Latin range may consume more of the limit than its visual width suggests. Treat any “one emoji equals one character” rule as a simplification, not a guarantee.</p>
<p>The standard limit shown in the composer is 280 characters for most accounts at the time of writing, with different limits for some account types and features. Those rules can change. Do not hard-code a limit into a template or a social preview tool and assume it will stay correct. Check X's current help page and the composer for your account before a campaign that depends on a precise count.</p>

<h2 id="links">Links are replaced, not counted as typed</h2>
<p>X replaces links with a fixed-length t.co link. The raw URL in your draft is not what the composer counts, so a long UTM-tagged URL may cost less than its character count suggests, and a short link may still be wrapped. The replacement length is set by X and can change, so the only safe method is to paste the final URL into the composer and read the remaining count.</p>
<p>This matters for threads and replies. A link that fits in a standalone post may push a reply over the limit when combined with numbering and a mention. Build the post with the final link in place, then decide whether the link belongs in the first post, a reply or a follow-up. Shortening a URL for display can help readability, but it does not guarantee a particular counted length.</p>
<p>Link placement also changes the reading experience. A post that ends with a bare URL reads like an afterthought; a post that names the destination before the link gives people a reason to tap. If the link is essential, put it in the first post and keep the thread's promise visible. If it is supplementary, move it to a reply so the main post can stay short. The composer count follows the link wherever it goes, so decide placement before you finalize the numbering.</p>

<h2 id="threads">Threads, numbering and per-post limits</h2>
<p>Thread numbering consumes characters in every post: “1/8”, “2/8” and so on. The word counter sees those characters as part of the draft, but it does not split the draft into posts or reserve room for the next number. If you write a 1,400-character thread, you still need to know how it divides at the composer's limit, not at the whole-draft total.</p>
<p>Plan the thread before drafting. Decide the number of posts, reserve space for the numbering and any link, then write each post to fit. A common workflow is to draft the thread in one document, split it into per-post blocks, count each block separately, and paste each one into the composer. Do not trust an auto-threader to preserve meaning or numbering; review the result post by post.</p>
<p>Hashtags and mentions count as typed. A mention such as @brand consumes characters in the post where it appears, and a hashtag consumes its letters and the hash. Neither is weighted like a link. Keep one or two hashtags, place the mention only where it is needed, and count the final text rather than the draft without them.</p>

<h2 id="workflow">A manual counting workflow</h2>
<ol>
<li><strong>Draft without counting.</strong> Write the idea first; stopping every sentence to check a meter produces choppy posts.</li>
<li><strong>Measure the raw draft.</strong> Paste it into the <a href="/word-counter">word counter</a> for characters and words. Use the with-spaces count as a rough ceiling, not a verdict.</li>
<li><strong>Split threads into posts.</strong> Number each post and count each block separately. Add a buffer for links, mentions and edits.</li>
<li><strong>Paste into the composer.</strong> Add the final link and any media. Read the remaining-character indicator for your account.</li>
<li><strong>Cut, do not cram.</strong> Remove a clause, move a detail to a reply or drop a hashtag. If the count still fails, the post is carrying too much.</li>
</ol>

<h2 id="examples">Two posts measured</h2>
<h3>Example 1: a plain English post</h3>
<p>A 38-word post has 240 characters including spaces and 203 without spaces. With only Latin letters, digits and periods, the composer will usually show a number close to 240. That leaves room under a 280-character limit for most accounts, but not enough for a long link and a mention. Paste the final version with the link before assuming it fits; the t.co replacement and the mention both change the count.</p>
<h3>Example 2: a thread with weights</h3>
<p>A six-post thread totals 1,500 characters in the word counter, with numbering and one link in the final post. The average is 250 characters per post, but averages hide the problem: one post contains a block of CJK text and an emoji, and the composer counts it higher than the raw text. Another post carries the link and the numbering. Count each post in the composer, keep a 20–30 character buffer, and rewrite the heavy post instead of trimming words at random.</p>

<table>
<thead><tr><th>Element</th><th>Word counter</th><th>X composer</th><th>What to do</th></tr></thead>
<tbody>
<tr><td><strong>Plain Latin text</strong></td><td>Counts each character</td><td>Usually counts each character as one</td><td>Use the raw count as a starting estimate</td></tr>
<tr><td><strong>Spaces</strong></td><td>Included in the with-spaces count</td><td>Counted</td><td>Do not budget from the no-spaces number</td></tr>
<tr><td><strong>Emoji</strong></td><td>Counts Unicode characters</td><td>Some count as more than one</td><td>Verify every emoji-heavy post in the composer</td></tr>
<tr><td><strong>CJK characters</strong></td><td>Counts each character</td><td>Some carry extra weight</td><td>Check the composer for the account</td></tr>
<tr><td><strong>Links</strong></td><td>Counts the full URL</td><td>Replaced by a fixed-length t.co link</td><td>Paste the final URL before judging the count</td></tr>
<tr><td><strong>Thread numbering</strong></td><td>Counts the characters</td><td>Counts them in each post</td><td>Reserve space per post, not for the thread total</td></tr>
<tr><td><strong>Premium or other limits</strong></td><td>No special handling</td><td>Account-dependent</td><td>Read the composer for your plan</td></tr>
</tbody>
</table>

<p>If the post is part of a longer article, the <a href="/blog/word-counter-guide/how-to-summarize-text-fast">summarizing guide</a> helps compress the source without losing the point, and <a href="/blog/word-counter-guide/grammar-check-before-publish">grammar check before publish</a> catches the errors that survive a character limit. The <a href="/blog/word-counter-guide/how-to-count-words-online">word counting guide</a> explains the raw metrics in more detail.</p>
<div class="cta-box"><strong>Measure the draft, then verify in X:</strong> paste the text into the <a href="/word-counter">word counter</a> for characters and words, split threads into posts, and check the final version in the composer. For the full set of text metrics, start with the <a href="/blog/word-counter-guide">word counter guide</a>.</div>
`;

export const wordTwitterCounter: BlogPost = {
  pillar: "word-counter-guide",
  slug: "twitter-character-counter",
  kind: "cluster",
  title: "Twitter/X Character Counter: What Actually Counts",
  description:
    "What counts toward an X post: character weights, emoji and CJK variations, t.co link replacement, thread numbering and composer checks.",
  keywords: ["twitter character counter", "x post character count", "emoji character weight", "tco link counting", "thread numbering characters"],
  toolSlugs: ["word-counter"],
  relatedSlugs: ["how-to-count-words-online", "how-to-summarize-text-fast", "grammar-check-before-publish"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-tool-reports", text: "What the counter reports", level: 2 },
    { id: "what-x-counts", text: "What X counts", level: 2 },
    { id: "links", text: "Links and t.co", level: 2 },
    { id: "threads", text: "Threads and numbering", level: 2 },
    { id: "workflow", text: "Manual workflow", level: 2 },
    { id: "examples", text: "Two posts measured", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does the word counter show the X character limit?", answer: "No. The word counter shows raw characters with and without spaces, words, sentences, paragraphs and reading time. It does not apply X's character weights, thread numbering or t.co link replacement. Use it to size the draft, then read the remaining-character indicator in the X composer before publishing." },
    { question: "Do spaces count toward an X post?", answer: "Yes, spaces count. The word counter shows them in the with-spaces figure, so budget from that number rather than the no-spaces total. For plain Latin text the composer usually matches the raw count closely, but links, emoji and thread markers can still change the result. Verify the final draft in the composer." },
    { question: "How do links count in an X post?", answer: "X replaces links with a fixed-length t.co link, so the raw URL length is not what the composer counts. The replacement length is set by X and can change, which means you should paste the final URL into the composer instead of estimating. A long tracking URL may cost less than its raw count suggests." },
    { question: "Do emoji count as one character?", answer: "Not always. Some emoji and some CJK characters can count as more than one, and the weighting is controlled by X. A flag or a skin-tone modifier may consume more of the limit than its visual width suggests. Treat one-emoji-one-character as a simplification and verify emoji-heavy posts in the composer." },
    { question: "How do I count characters in a thread?", answer: "Count each post separately, not the whole thread total. Thread numbering such as 1/8 consumes characters in every post, and links or mentions may appear in only one. Draft the thread in one document, split it into blocks, add numbering to each block and check each block in the composer with a small buffer." },
    { question: "Is the X limit always 280 characters?", answer: "Most accounts see a 280-character composer limit at the time of writing, but X can change limits and offers different limits for some account types and features. Do not treat any number as permanent. Check X's current help page and the composer for the account you are posting from before a campaign that depends on an exact count." },
  ],
};
