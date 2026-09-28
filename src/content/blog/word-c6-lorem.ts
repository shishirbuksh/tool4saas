import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>I once caught “lorem ipsum” still sitting in a staging footer an hour before launch — a visible reminder that filler is scaffolding: essential during construction, catastrophic if left standing. This is <strong>when to use Lorem Ipsum</strong>: layout testing where it shines, content decisions where it lies, and the replacement workflow that prevents live filler.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a>. Generate filler in the <a href="/lorem-ipsum">lorem ipsum tool</a>; measure real copy in the <a href="/word-counter">word counter</a>.</p>

<h2 id="when-use">When filler helps (layout testing)</h2>
<ul>
<li><strong>Typography and rhythm:</strong> paragraph flow, line-length (45–75 characters optimal), orphans and widows — filler reveals structure without content debates derailing reviews.</li>
<li><strong>Component stress:</strong> cards, tables and grids at 50 vs 500 words expose breakpoints real copy might never trigger in testing.</li>
<li><strong>Client approvals on structure:</strong> “approve the layout, not the words” keeps feedback on architecture — label mockups DRAFT visibly so screenshots never ship.</li>
<li><strong>Amount control:</strong> generate exact paragraphs/sentences per component (hero: 3 paragraphs, card: 2 sentences) rather than pasting walls.</li>
</ul>

<h2 id="when-hurts">When filler hurts (content decisions)</h2>
<table>
<thead><tr><th>Decision</th><th>Why filler lies</th><th>Do instead</th></tr></thead>
<tbody>
<tr><td><strong>Headline hierarchy</strong></td><td>Real headlines vary wildly in length</td><td>Draft real headlines early</td></tr>
<tr><td><strong>CTA conversion</strong></td><td>Buttons need real verbs</td><td>Write CTAs before layouts</td></tr>
<tr><td><strong>SEO structure</strong></td><td>Headings carry keywords</td><td>Outline real H1/H2s first</td></tr>
<tr><td><strong>Localization</strong></td><td>German runs ~30% longer</td><td>Test with longest-locale strings</td></tr>
</tbody>
</table>
<p>Production rule: global pre-launch search for “lorem”, “ipsum”, “TODO” and “XXX” — one command that has saved countless launches. Filler in staging is craft; filler in production is a meme about you.</p>
<h2 id="history-bits">History in 60 seconds (why this exact text)</h2>
<p>Lorem ipsum descends from Cicero's 45 BC “De Finibus” — scrambled by a 16th-century printer into convincingly Latin-sounding nonsense, then popularized by Letraset sheets and Aldus PageMaker. Its virtue is precisely its meaninglessness: readable English placeholder gets reviewed as content (“change this headline”), while Latin-patterned filler gets reviewed as layout. Modern alternatives (Hipster Ipsum, Cat Ipsum) trade professionalism for amusement — fine for internal mocks, risky for client presentations. One caution: screen readers vocalize filler as gibberish Latin, so strip it before accessibility audits — testing with assistive tech on lorem pages measures nothing real.</p>
<blockquote class="tip">General writing guidance only. Test with real readers; formulas ignore tone and expertise. SEO outcomes vary.</blockquote>
`;

export const wordLorem: BlogPost = {
  pillar: "word-counter-guide",
  slug: "lorem-ipsum-generator-use",
  kind: "cluster",
  title: "Lorem Ipsum: When to Use Placeholder Text",
  description:
    "Lorem ipsum done right: layout testing wins, content decisions it ruins + pre-launch filler check. Free generator with amount control.",
  keywords: [
    "lorem ipsum generator",
    "when to use lorem ipsum",
    "lorem ipsum vs real copy",
    "placeholder text web design",
  ],
  toolSlugs: ["lorem-ipsum", "word-counter", "case-converter"],
  relatedSlugs: ["how-to-count-words-online", "ideal-blog-post-length-seo", "typing-speed-test-practice-tips"],
  published: "2026-09-26",
  updated: "2026-09-26",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "when-use", text: "When filler helps", level: 2 },
    { id: "when-hurts", text: "When filler hurts", level: 2 },
    { id: "history-bits", text: "History in 60 seconds", level: 2 },
  ],
  html,
  faqs: [
    { question: "When should I use lorem ipsum?", answer: "For layout testing: typography rhythm, component stress at word counts, and structure approvals. Never for headline, CTA, SEO or localization decisions." },
    { question: "How much lorem ipsum per component?", answer: "Match real expectations: hero 3 paragraphs, cards 2 sentences. Exact-amount generation beats pasting walls." },
    { question: "How do I avoid shipping filler to production?", answer: "Global pre-launch search for lorem, ipsum, TODO and XXX, plus labeled DRAFT mockups so screenshots never ship." },
    { question: "Does lorem ipsum hurt SEO?", answer: "Live filler does — thin meaningless content. Staging filler is invisible to crawlers; just ensure none survives launch." },
    { question: "What replaces lorem ipsum for real testing?", answer: "Real headlines and CTAs early, longest-locale strings for localization, and actual keyword-mapped headings for SEO structure." },
  ],
};
