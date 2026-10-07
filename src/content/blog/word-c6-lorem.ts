import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>I once caught “lorem ipsum” still sitting in a staging footer an hour before launch — a visible reminder that filler is scaffolding: essential during construction, catastrophic if left standing. This is <strong>when to use Lorem Ipsum</strong>: layout testing where it shines, content decisions where it lies, and the replacement workflow that prevents live filler.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a>. Generate filler in the <a href="/lorem-ipsum">lorem ipsum tool</a>; measure real copy in the <a href="/word-counter">word counter</a>. For length targets see <a href="/blog/word-counter-guide/ideal-blog-post-length-seo">ideal blog post length</a>, and for counting basics <a href="/blog/word-counter-guide/how-to-count-words-online">how to count words online</a>.</p>

<h2 id="when-use">When filler helps (layout testing)</h2>
<ul>
<li><strong>Typography and rhythm:</strong> paragraph flow, line-length (45–75 characters optimal), orphans and widows — filler reveals structure without content debates derailing reviews. I test body copy at 16–18px with 1.6–1.75 line-height and watch where 50-word vs 500-word blocks break the grid.</li>
<li><strong>Component stress:</strong> cards, tables and grids at 50 vs 500 words expose breakpoints real copy might never trigger in testing. A recent card grid looked perfect with 20-word blurbs and collapsed with 60-word client copy — filler at both extremes would have caught it in minutes.</li>
<li><strong>Client approvals on structure:</strong> “approve the layout, not the words” keeps feedback on architecture — label mockups DRAFT visibly so screenshots never ship. I watermark staging headers with the date so a forwarded screenshot is self-evidently a mock.</li>
<li><strong>Amount control:</strong> generate exact paragraphs/sentences per component (hero: 3 paragraphs, card: 2 sentences, table cell: 12 words) rather than pasting walls. The <a href="/lorem-ipsum">lorem ipsum tool</a> generates by paragraphs, sentences or words so each slot gets a realistic volume — then I verify the real total in the <a href="/word-counter">word counter</a> before handoff.</li>
</ul>

<h2 id="generator-walkthrough">Generator walkthrough (exact amounts per slot)</h2>
<p>Random walls of filler test nothing. Map each component to a volume first, then generate to spec:</p>
<table>
<thead><tr><th>Slot</th><th>Generate</th><th>Why this volume</th></tr></thead>
<tbody>
<tr><td><strong>Hero</strong></td><td>3 paragraphs, ~60 words</td><td>Mirrors a real value-prop block; exposes headline-to-body rhythm</td></tr>
<tr><td><strong>Feature card</strong></td><td>2 sentences, ~25 words</td><td>Matches scannable card copy; catches overflow at 40+ words</td></tr>
<tr><td><strong>Table cell</strong></td><td>8–12 words</td><td>Prevents column blowout from pasted paragraphs</td></tr>
<tr><td><strong>Footer blurb</strong></td><td>1 paragraph, ~40 words</td><td>The exact slot where I once found live filler — never skip it</td></tr>
<tr><td><strong>Empty state</strong></td><td>1 sentence, ~12 words</td><td>Short slots break most often when filled with walls</td></tr>
</tbody>
</table>
<p>Workflow: generate per slot in the <a href="/lorem-ipsum">lorem ipsum tool</a>, paste into the mock, screenshot at 360px and 1280px widths, then replace slot by slot with real copy and re-check counts in the <a href="/word-counter">word counter</a>. When headlines arrive early, validate their hierarchy with the <a href="/readability-checker">readability checker</a> instead of filler — structure decisions need real words (see <a href="/blog/word-counter-guide/flesch-reading-ease-score-explained">Flesch score explained</a>).</p>

<h2 id="when-hurts">When filler hurts (content decisions)</h2>
<table>
<thead><tr><th>Decision</th><th>Why filler lies</th><th>Do instead</th></tr></thead>
<tbody>
<tr><td><strong>Headline hierarchy</strong></td><td>Real headlines vary wildly in length</td><td>Draft real headlines early</td></tr>
<tr><td><strong>CTA conversion</strong></td><td>Buttons need real verbs</td><td>Write CTAs before layouts</td></tr>
<tr><td><strong>SEO structure</strong></td><td>Headings carry keywords</td><td>Outline real H1/H2s first</td></tr>
<tr><td><strong>Localization</strong></td><td>German runs ~30% longer</td><td>Test with longest-locale strings</td></tr>
<tr><td><strong>Reading level</strong></td><td>Filler has no grade level</td><td>Score real drafts for Flesch and density</td></tr>
<tr><td><strong>Voice and tone</strong></td><td>Clients approve filler silence as tone</td><td>Ship one real paragraph per template</td></tr>
</tbody>
</table>
<p>Production rule: global pre-launch search for “lorem”, “ipsum”, “TODO” and “XXX” — one command that has saved countless launches. Filler in staging is craft; filler in production is a meme about you. Density and length targets belong to real copy: check <a href="/blog/word-counter-guide/keyword-density-seo-check">keyword density</a> and <a href="/blog/word-counter-guide/ideal-blog-post-length-seo">post length targets</a> once words exist.</p>

<h2 id="prelaunch-hunt">Pre-launch filler hunt (commands that work)</h2>
<p>Run all three before every deploy — filler hides in footers, alt text, meta descriptions and JSON fixtures:</p>
<ul>
<li><strong>Repo-wide grep:</strong> <code>grep -ri "lorem\|ipsum\|TODO\|XXX\|changeme" --include="*.tsx" --include="*.ts" --include="*.json" src public</code> — catches code, content and seed data in one pass.</li>
<li><strong>Editor search:</strong> VS Code <code>Ctrl+Shift+F</code> for <code>lorem|ipsum</code> with match-case off across the workspace, including <code>*.md</code> and CMS exports — I found a staging footer this way sixty minutes before launch.</li>
<li><strong>CI gate:</strong> add the grep as a pre-deploy step that fails the build on any hit outside <code>__tests__</code> and <code>*.test.*</code> fixtures. One blocked deploy beats one public screenshot.</li>
<li><strong>Rendered-page pass:</strong> view-source on home, pricing, blog index and 404 plus RSS/sitemap previews — filler in meta descriptions and OG tags is invisible on-page but visible in shares. Validate share cards with the <a href="/open-graph-preview">open graph preview</a> before launch.</li>
<li><strong>Screenshot sweep:</strong> capture 360px, 768px and 1280px of every template; DRAFT watermarks must appear in all three or the mock is shippable by accident.</li>
</ul>

<h2 id="a11y-etiquette">Accessibility and client etiquette</h2>
<p>Two rules I enforce on every team: never audit assistive tech on filler pages, and never present filler without a DRAFT label. Screen readers vocalize lorem as gibberish Latin, so testing navigation, heading order or alt text on filler pages measures nothing real — run accessibility checks only after real copy lands. For client reviews, prefix the page title with “DRAFT — layout only”, banner the header, and state the replacement date out loud; amusement ipsum (Hipster, Cat, Bacon) is fine for internal mocks but reads as unserious in client decks. When real copy arrives, proofread it aloud with <a href="/blog/word-counter-guide/text-to-speech-proofreading-use">text-to-speech proofreading</a> and practice delivery speed with the <a href="/blog/word-counter-guide/typing-speed-test-practice-tips">typing speed routine</a> — ears catch filler-grade rhythm that eyes skip.</p>

<h2 id="history-bits">History in 60 seconds (why this exact text)</h2>
<p>Lorem ipsum descends from Cicero's 45 BC “De Finibus” — scrambled by a 16th-century printer into convincingly Latin-sounding nonsense, then popularized by Letraset sheets and Aldus PageMaker. Its virtue is precisely its meaninglessness: readable English placeholder gets reviewed as content (“change this headline”), while Latin-patterned filler gets reviewed as layout. Modern alternatives (Hipster Ipsum, Cat Ipsum) trade professionalism for amusement — fine for internal mocks, risky for client presentations. One caution: screen readers vocalize filler as gibberish Latin, so strip it before accessibility audits — testing with assistive tech on lorem pages measures nothing real. For the full measurement companion, work through the <a href="/blog/word-counter-guide">word counter pillar guide</a> after generating.</p>
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
    "when to use lorem ipsum vs real copy",
    "when to use lorem ipsum",
    "lorem ipsum vs real copy",
    "lorem ipsum generator",
    "placeholder text web design",
    "When should I use lorem ipsum?",
  ],
  toolSlugs: ["lorem-ipsum", "word-counter", "case-converter"],
  relatedSlugs: ["how-to-count-words-online", "ideal-blog-post-length-seo", "typing-speed-test-practice-tips"],
  published: "2026-09-26",
  updated: "2026-09-26",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "when-use", text: "When filler helps", level: 2 },
    { id: "generator-walkthrough", text: "Generator walkthrough", level: 2 },
    { id: "when-hurts", text: "When filler hurts", level: 2 },
    { id: "prelaunch-hunt", text: "Pre-launch filler hunt", level: 2 },
    { id: "a11y-etiquette", text: "Accessibility and etiquette", level: 2 },
    { id: "history-bits", text: "History in 60 seconds", level: 2 },
  ],
  html,
  faqs: [
    { question: "When should I use lorem ipsum?", answer: "Use lorem ipsum for layout testing including typography rhythm, component stress at word counts, and structure approvals where clients review architecture. It reveals line-length, orphans and breakpoints without content debates derailing reviews. Never use it for headline hierarchy, CTA conversion, SEO structure, localization or reading-level decisions that need real words." },
    { question: "How much lorem ipsum per component?", answer: "Match expectations with hero at 3 paragraphs around 60 words, feature cards at 2 sentences around 25 words, table cells at 8 to 12 words, and footer blurbs at 1 paragraph. Exact-amount generation in the lorem ipsum tool beats pasting random walls. Verify real totals in the word counter and re-check counts after replacing slots." },
    { question: "How do I avoid shipping filler to production?", answer: "Run a global pre-launch search for lorem, ipsum, TODO and XXX across code, content and fixtures before every deploy. Label mockups visibly as DRAFT with dated watermarks so forwarded screenshots never ship accidentally. Add the grep as a CI gate that fails builds on hits outside tests, since one blocked deploy beats a public screenshot." },
    { question: "Does lorem ipsum hurt SEO?", answer: "Live filler hurts because thin meaningless content offers no value to readers or search systems. Staging filler is invisible to crawlers and safe during construction, but production filler becomes an embarrassing meme. Search rendered pages, meta descriptions and OG tags before launch and validate share cards in the open graph preview." },
    { question: "What replaces lorem ipsum for real testing?", answer: "Use real headlines and CTAs early because buttons need verbs and hierarchy varies wildly in length. Test localization with longest-locale strings since German runs about 30 percent longer, and outline real H1 and H2 headings for SEO structure. Score real drafts for Flesch readability and density, and ship one real paragraph per template." },
  ],
};
