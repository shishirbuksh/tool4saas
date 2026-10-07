import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>“95% AI-generated,” said the detector about a paragraph I typed myself — slowly, grumpily, at midnight. Terse human prose scores as artificial because <strong>detectors measure statistical regularity, and short texts have no room to be irregular</strong>. Meanwhile obviously-spun articles sail through at 12% because length buys variance. This guide explains burstiness and n-gram overlap honestly, sets the 400-word reliability floor, and shows checking workflows that avoid false accusations — including why our detector shows evidence instead of verdicts.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Check with evidence in the <a href="/ai-detector">AI detector</a>; verify originality in the <a href="/plagiarism-checker">plagiarism checker</a>; mark up only visible copy with the <a href="/faq-schema-generator">FAQ schema generator</a>.</p>

<h2 id="signals">What detectors actually measure (burstiness + 5-grams)</h2>
<table>
<thead><tr><th>Signal</th><th>Human pattern</th><th>AI pattern</th><th>Failure mode</th></tr></thead>
<tbody>
<tr><td><strong>Burstiness</strong></td><td>Varied sentence lengths (4–28 words)</td><td>Uniform ~18-word sentences</td><td>Short texts can't vary</td></tr>
<tr><td><strong>Perplexity</strong></td><td>Surprising word choices</td><td>Predictable phrasing</td><td>Technical writing looks “predictable”</td></tr>
<tr><td><strong>5-gram overlap</strong></td><td>Unique phrasing</td><td>Training-data echoes</td><td>Quotes and boilerplate false-flag</td></tr>
</tbody>
</table>
<p>Our detector surfaces these three numbers with a sliding 5-gram window view instead of a single percentage — because a 72% verdict on 400 words with visible uniform-length runs means something, while 95% on 50 words means nothing. Independent October 2026 coverage keeps confirming vendor accuracy claims overreach; tools that hide methodology deserve the least trust, not the most.</p>

<h2 id="floor">The 400-word floor and the rewrite protocol</h2>
<ul>
<li><strong>Under ~150 words:</strong> do not test — detectors misfire on terse human prose routinely. No verdict is valid here.</li>
<li><strong>150–400 words:</strong> indicative only; corroborate with process evidence (drafts, edit history) before any conclusion.</li>
<li><strong>400+ words:</strong> patterns stabilize; burstiness variance plus n-gram runs become meaningful — still evidence, not proof.</li>
<li><strong>On flags:</strong> rewrite passages for variance (sentence lengths, transitions, concrete detail) rather than re-rolling through paraphrasers — adversarial laundering degrades quality while teaching nothing.</li>
</ul>
<p>Editors: pair detection with the <a href="/plagiarism-checker">plagiarism checker</a> (originality is the checkable claim) and publish the workflow, not just the verdict. A 96% uniqueness score with visible burstiness beats any single detector number.</p>

<h2 id="never-gate">Never gate grades, jobs or accounts on output</h2>
<p>The strongest statement in this guide: <strong>detector output must not decide academic, hiring or moderation outcomes alone</strong>. False-positive rates on non-native writing run multiples higher (simpler constructions pattern-match “AI-like”), creating discrimination risk stacked on accuracy risk. Institutions need process policies (drafts, vivas, revision trails); platforms need human review; individuals accused deserve the evidence, not a percentage. Our tool exists to inform revision — which passages read uniformly and how to vary them — not to certify authorship. Anyone selling certainty here is selling something else.</p>
<blockquote class="tip">General guidance only, not academic-integrity or legal advice. Detection is statistical evidence with known failure modes — treat it accordingly.</blockquote>
`;

export const seoAiFalsePositive: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "ai-content-false-positives",
  kind: "cluster",
  title: "Check AI Content Without False Positives",
  description:
    "AI detection without false accusations: burstiness + 5-gram signals, 400-word reliability floor, rewrite protocol + never-gate rule. Evidence-first tool.",
  keywords: [
    "how to check ai content without false positives",
    "burstiness variance 18 words",
    "150 vs 50 words unreliable",
    "95 vs 70 percent rewrite flag",
    "5 gram sliding window",
    "Why did a detector flag my human writing?",
  ],
  toolSlugs: ["ai-detector", "plagiarism-checker", "faq-schema-generator"],
  relatedSlugs: ["fix-score-60-to-80", "title-meta-length-2026", "utm-naming-governance"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "signals", text: "Detection signals", level: 2 },
    { id: "floor", text: "400-word floor", level: 2 },
    { id: "never-gate", text: "Never-gate rule", level: 2 },
  ],
  html,
  faqs: [
    { question: "Why did a detector flag my human writing?", answer: "Terse human prose scores as artificial because detectors measure statistical regularity and short texts have no room to be irregular. A 50-word sample can return 95 percent on paragraphs typed at midnight, while articles sail through at 12 percent because length buys variance. Test 400 words, inspect variance, and corroborate with drafts before conclusion." },
    { question: "What do AI detectors actually measure?", answer: "Detectors measure burstiness from varied 4 to 28-word sentences versus uniform 18-word runs, perplexity from surprising versus predictable word choices, and 5-gram overlap echoing training data. Prefer tools showing these three numbers with a sliding 5-gram window over black-box percentages. Quotes, boilerplate and technical writing false-flag because predictable patterns look artificial." },
    { question: "How long should text be for reliable detection?", answer: "Use 400 plus words for stable patterns where burstiness variance and n-gram runs become meaningful, though still evidence not proof. Treat 150 to 400 words as indicative only and corroborate with process evidence like drafts and edit history. Under about 150 words do not test because detectors misfire routinely and no verdict is valid there." },
    { question: "How do I reduce AI-flags on my writing?", answer: "Vary sentence lengths, add concrete detail and transitions, and keep your voice to restore burstiness across passages. Rewrite flagged passages for variance rather than re-rolling through paraphrasers, since adversarial laundering degrades quality while teaching nothing. Pair detection with the plagiarism checker and publish workflow evidence, since 96 percent uniqueness with visible variance beats detector numbers." },
    { question: "Can schools or employers rely on detectors?", answer: "No, detector output must not decide academic, hiring or moderation outcomes alone because false-positive rates on non-native writing run multiples higher. Simpler constructions pattern-match as AI-like, creating discrimination risk stacked on accuracy risk. Require drafts, vivas, revision trails and human review, and give accused individuals evidence rather than a percentage." },
  ],
};
