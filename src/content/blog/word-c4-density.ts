import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A 1,000-word post mentioning its keyword 47 times (4.7%) reads like a robot wrote it — because the writer optimized for a number instead of a reader. Google's stance is explicit: there is <strong>no ideal keyword density</strong>, and stuffing violates spam policies. So what is density good for? Diagnostics. This guide shows <strong>how to check keyword density</strong>, read the readout, and fix stuffing without chasing mythical percentages.</p>
<p>Part of the <a href="/blog/word-counter-guide">word counter guide</a>. Analyze any draft in the <a href="/keyword-density">density tool</a> (1–4 word phrases, stop-word filtering, local only); count in the <a href="/word-counter">word counter</a>.</p>

<h2 id="how-check">How to check density (the right way)</h2>
<ol>
<li><strong>Paste the rendered text</strong> — not HTML source (tags pollute counts). Strip navigation, footers and comments first; analyze body copy only.</li>
<li><strong>Read 1–4 word phrases:</strong> single words show topics; 2–4 word phrases show real targeting (“word counter free” vs scattered “word”, “counter”, “free”). Stop-word filtering removes noise.</li>
<li><strong>Interpret, don't target:</strong> 12 mentions in 1,000 words = 1.2% — pure math. Ask whether the phrase appears where readers need it (title, intro, headings, conclusion), not whether the number hits a myth.</li>
</ol>

<h2 id="fix-stuffing">Fixing stuffing (before/after patterns)</h2>
<table>
<thead><tr><th>Stuffed pattern</th><th>Natural rewrite</th></tr></thead>
<tbody>
<tr><td><strong>“Our free word counter tool counts words free online with our word counter…”</strong></td><td>“Paste your draft below — counts appear instantly, no signup.”</td></tr>
<tr><td><strong>Keyword in every H2 verbatim</strong></td><td>Synonyms + pronouns in half the headings</td></tr>
<tr><td><strong>City/service list paragraphs</strong></td><td>One location page per area, linked — not listed</td></tr>
</tbody>
</table>
<ul>
<li><strong>Synonym test:</strong> if replacing the keyword with “it” in three spots improves flow, those spots were stuffed.</li>
<li><strong>Intent test:</strong> does each mention answer something? Mentions earning their place stay; decorative ones go.</li>
<li><strong>Topical coverage beats repetition:</strong> related terms (readability, character count, reading time) signal depth better than the 15th exact repeat.</li>
</ul>

<h2 id="myth-history">Why the “ideal %” myth refuses to die</h2>
<p>Early-2000s SEO tools needed a dial to display, so vendors invented 2–3% targets — then everyone cited everyone else until myth became doctrine. Google's Cutts (2011) and Mueller (2022) both refused magic numbers; modern systems rank topical authority and intent satisfaction, where repetition has diminishing returns after natural mentions. Tool defaults showing % are fine as readouts; articles prescribing % as rules are not. Pair density checks with readability per <a href="/blog/word-counter-guide/flesch-reading-ease-score-explained">Flesch guide</a> — one paste, both signals, zero myths.</p>
<h2 id="entity-coverage">Entity coverage: what replaced density chasing</h2>
<p>Modern ranking rewards covering an entity's full attribute set — for “word counter,” that's character counts, reading time, readability, density, limits — not repeating one phrase. Audit method: list the 8–12 sub-questions PAA and autosuggest surface, verify each gets a genuine paragraph (not a keyword mention), and let density fall where honest coverage puts it (typically 0.5–2% on primaries without trying). Pages ranking today read topically complete because they answer completely; density is the exhaust, never the fuel. When competitors outrank you, compare their sub-question coverage against yours before touching a single keyword — the gap is almost always coverage, not percentage points.</p>
<blockquote class="tip">General writing guidance only. Test with real readers; formulas ignore tone and expertise. SEO outcomes vary — no count, score or density promises rankings.</blockquote>
`;

export const wordDensity: BlogPost = {
  pillar: "word-counter-guide",
  slug: "keyword-density-seo-check",
  kind: "cluster",
  title: "Keyword Density Explained: How to Check and Fix Stuffing",
  description:
    "Keyword density without myths: how to check, read 1–4 word phrases, fix stuffing patterns + why ideal-% died. Free local analyzer.",
  keywords: [
    "keyword density checker",
    "good keyword density",
    "avoid keyword stuffing",
    "check keyword density free",
  ],
  toolSlugs: ["keyword-density", "word-counter", "readability-checker"],
  relatedSlugs: ["flesch-reading-ease-score-explained", "ideal-blog-post-length-seo", "how-to-count-words-online"],
  published: "2026-09-26",
  updated: "2026-09-26",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "how-check", text: "How to check density", level: 2 },
    { id: "fix-stuffing", text: "Fixing stuffing patterns", level: 2 },
    { id: "myth-history", text: "Why the ideal-% myth persists", level: 2 },
    { id: "entity-coverage", text: "Entity coverage over repetition", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is a good keyword density?", answer: "There is no ideal % per Google. Use density diagnostically: 4%+ on money terms usually means rewrite for humans; 0% on your topic means you forgot the subject." },
    { question: "How do I check keyword density?", answer: "Paste rendered body text (not HTML) into an analyzer; read 1–4 word phrases with stop-words filtered; interpret placement (title, intro, headings) over numbers." },
    { question: "What is keyword stuffing?", answer: "Filling pages with terms to manipulate rankings — verbatim repeats, heading spam, location lists. It violates spam policies; fix with synonyms and intent-driven mentions." },
    { question: "How do I fix a stuffed page?", answer: "Synonym-test each repeat, keep mentions that answer something, cover related terms instead of repeating one, and re-check readability alongside." },
    { question: "Does density affect rankings?", answer: "Only via quality: natural topical coverage helps, stuffing hurts. No percentage promises anything — relevance and intent satisfaction rank." },
  ],
};
