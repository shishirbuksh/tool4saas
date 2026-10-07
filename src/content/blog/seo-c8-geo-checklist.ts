import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Seventy-six percent of Google AI Overview citations come from pages <em>outside</em> the organic top 10. Read that again: ranking first and getting cited are different games with different rules. <strong>GEO — generative engine optimization — is the discipline of becoming citable</strong>: answer-first passages, verifiable numbers, clean structure, entity authority and freshness that retrieval systems can lift verbatim. This checklist turns any well-researched post into citation bait across AI Overviews, ChatGPT, Perplexity and Claude.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Score the page in the <a href="/seo-analyzer">SEO analyzer</a>; mark visible FAQs with the <a href="/faq-schema-generator">FAQ schema generator</a>; verify originality in <a href="/plagiarism-checker">plagiarism checker</a>.</p>

<h2 id="answer-first">Answer first, evidence second, fluff never</h2>
<p>AI systems lift passages that answer completely in 40–60 words: direct answer sentence, then supporting numbers, then the caveat. Our FAQ answers follow exactly this shape (see <a href="/blog/seo-analyzer-guide/fix-score-60-to-80">the scoring walkthrough</a> for the pattern). Lead every section with its conclusion; bury nothing below 300 words of throat-clearing. Tables beat paragraphs for comparisons (rates, dimensions, scores) because extractors parse rows cleanly — every pillar on this site ships comparison tables for this reason.</p>

<h2 id="verifiable">Numbers, dates and entities that verify</h2>
<ul>
<li><strong>Quantify claims:</strong> “55 characters near 540px” cites; “keep titles short” doesn't. Every number in this silo carries units, dates or versions.</li>
<li><strong>Date-stamp freshness:</strong> FY 2026-27 slabs, 87A thresholds, version numbers — retrieval systems weight recency, and dated facts beat timeless vagueness (see <a href="/blog/sip-calculator-guide/old-vs-new-regime-2026">regime dating</a>).</li>
<li><strong>Named entities:</strong> 115BAC, Section 87A, UPSC, CIBIL, RFC 4648 — entities anchor passages in knowledge graphs; generic advice floats.</li>
<li><strong>Quote-able definitions:</strong> one sentence that stands alone (“Base64 inflates ~33%”) travels; paragraphs needing context don't.</li>
</ul>

<h2 id="machine-readable">Machine-readable plumbing (llms.txt + schema + bots)</h2>
<p>Three files decide whether AI systems even see your content: <code>llms.txt</code> (our full catalogue + FAQ answers at <code>/llms.txt</code>, linked site-wide), FAQPage/HowTo JSON-LD mirroring visible copy 1:1, and robots.txt that allows AI crawlers (GPTBot, OAI-SearchBot, PerplexityBot, Claude — all explicitly allowed in our <a href="/robots.txt">robots.txt</a>). Blocking training crawlers while begging citations is incoherent for most publishers — we document max-visibility intent openly. Validate with the same discipline as on-page SEO: score, preview, verify (see <a href="/blog/seo-analyzer-guide/title-meta-length-2026">length guide</a>).</p>

<h2 id="authority">Authority signals that actually move citations</h2>
<p>Studies keep finding citations concentrate on credible, verifiable sources — but credibility alone misattributes 11% of claims, so precision matters as much as reputation. What moves the needle for independent sites: first-hand testing notes with dates (“tested October 2026, Chrome, 4.2MB photo → 900KB”), named methodology pages, author accountability, and original data tables competitors must cite rather than replicate. Our <a href="/methodology">methodology page</a> exists precisely for this — process transparency that earns the cite. No amount of schema compensates for generic, undated, untested content.</p>
<blockquote class="tip">General guidance only. Citation systems shift quarterly — re-verify bot access, schema validity and freshness dates on a schedule, not once.</blockquote>
`;

export const seoGeoChecklist: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "geo-checklist-ai-citations",
  kind: "cluster",
  title: "GEO Checklist: Get Cited by AI Search in 2026",
  description:
    "GEO checklist for AI citations: answer-first passages, verifiable numbers, llms.txt + schema plumbing + authority signals. Free analyzer.",
  keywords: [
    "how to get cited ai search geo checklist",
    "answer first passages 40-60 words",
    "llms.txt faq schema discoverability",
    "ai overviews outside top 10 cite",
    "freshness dates ai citations 2026?",
    "How do I get cited by AI Overviews?",
  ],
  toolSlugs: ["seo-analyzer", "faq-schema-generator", "plagiarism-checker"],
  relatedSlugs: ["fix-score-60-to-80", "ai-content-false-positives", "title-meta-length-2026"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "answer-first", text: "Answer-first passages", level: 2 },
    { id: "verifiable", text: "Verifiable numbers", level: 2 },
    { id: "machine-readable", text: "Machine-readable plumbing", level: 2 },
    { id: "authority", text: "Authority signals", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is GEO and how does it differ from SEO?", answer: "Generative engine optimization targets AI citations, not rankings: 76% of AI Overview citations come from outside the organic top 10. Tactics are answer-first passages, verifiable numbers, machine-readable files and freshness — overlapping SEO but scored differently." },
    { question: "How do I get cited by AI Overviews?", answer: "Write 40–60 word self-contained answers with numbers, dates and entities; publish FAQPage/HowTo schema mirroring visible copy; keep llms.txt discoverable; allow AI crawlers in robots; refresh dates. Citations follow citability, not rank." },
    { question: "Does JSON-LD schema win AI citations?", answer: "No direct lift measured — schema is entity infrastructure, not a citation lever. It helps systems parse structure, but passages win on answer quality, verifiability and freshness. Keep schema accurate anyway." },
    { question: "Should I block AI training crawlers?", answer: "Blocking training while seeking citations is incoherent for most publishers — document an explicit posture instead. We allow all major AI crawlers and state max-visibility intent in robots comments." },
    { question: "How do I measure AI visibility?", answer: "Track AI share of voice: prompt key queries across ChatGPT, Perplexity, Gemini and AI Overviews, record citation presence. Pair with Search Console for the click-through half neither metric shows alone." },
  ],
};
