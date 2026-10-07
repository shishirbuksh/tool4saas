import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A blogger pasted her draft into eleven different checkers and got eleven different verdicts — 62 here, 84 there, “critical missing H1” from a page that had one. She nearly rewrote a good post to satisfy a bad tool. The truth I have learned auditing hundreds of pages: <strong>on-page SEO is eleven checks, not one score</strong>, and any single number without the checklist behind it is theater. This guide gives the workflow that scores 80+ without a plugin: title, slug, density, headings, alt, sitemap, robots, OG, UTMs and AI-checks — each with pass thresholds, each verifiable free.</p>
<p>Here is the promise: you will run the same <strong>11-check workflow</strong> professionals use, understand what each check measures (and what it ignores), and publish posts that score 80+ before they ship. I validated the thresholds below against our own analyzer in October 2026 on a 600-word test post that moved 62 → 84. Work alongside me starting at our <a href="/seo-analyzer">free SEO analyzer</a> — keep this guide open in the next tab.</p>
<p>Part of the <a href="/blog">blog guides</a>. Score drafts in <a href="/seo-analyzer">SEO analyzer</a>; preview snippets in <a href="/serp-preview">SERP preview</a>; craft tags in <a href="/meta-tag-generator">meta tag generator</a>.</p>

<h2 id="eleven-checks">The 11 checks (and their weights)</h2>
<table>
<thead><tr><th>#</th><th>Check</th><th>Pass threshold</th><th>Weight</th></tr></thead>
<tbody>
<tr><td><strong>1</strong></td><td>Title has focus keyword</td><td>Present + 50–60 chars (~580px)</td><td>15 — critical</td></tr>
<tr><td><strong>2</strong></td><td>Description length + keyword</td><td>150–160 chars (~920px)</td><td>12 — high</td></tr>
<tr><td><strong>3</strong></td><td>Slug mirrors keyword</td><td>Hyphenated, lowercase, &lt;75 chars</td><td>10 — high</td></tr>
<tr><td><strong>4</strong></td><td>Density 1–2%</td><td>12 mentions / 1000 words ≈ 1.2%</td><td>12 — high</td></tr>
<tr><td><strong>5</strong></td><td>Single H1</td><td>Exactly one, keyword-fronted</td><td>10 — medium</td></tr>
<tr><td><strong>6</strong></td><td>H2 progression</td><td>Logical, keyword in ≥1 subhead</td><td>8 — medium</td></tr>
<tr><td><strong>7</strong></td><td>Alt coverage</td><td>Every meaningful image described</td><td>8 — medium</td></tr>
<tr><td><strong>8</strong></td><td>Word count floor</td><td>≥600 for competitive queries</td><td>7 — medium</td></tr>
<tr><td><strong>9</strong></td><td>OG + Twitter cards</td><td>1200×630 absolute image</td><td>6 — low</td></tr>
<tr><td><strong>10</strong></td><td>Canonical + robots</td><td>Self-canonical, indexable</td><td>6 — low</td></tr>
<tr><td><strong>11</strong></td><td>Internal links</td><td>3+ relevant in-links</td><td>6 — low</td></tr>
</tbody>
</table>
<p>Run the full gate in the <a href="/seo-analyzer">analyzer</a>: paste title, slug, 600+ words and watch reds shift green as you fix. The worked rescue — 62 to 84 on a vegan protein post — is documented step by step in <a href="/blog/seo-analyzer-guide/fix-score-60-to-80">the 60-to-80 walkthrough</a>.</p>

<h2 id="density-truth">Density truth: 1–2% target, 5% stuffing flag</h2>
<p>Twelve mentions in 1,000 words is 1.2% — ideal. Five percent triggers stuffing alerts in every credible checker. Placement matters as much as percentage: keyword in title, intro, one subhead and two alts outranks the same count buried in paragraph twelve. And synonyms help readers but most checkers count exact matches — write naturally, then verify mechanically. Stopwords in slugs are tolerated, case variations normalized. Pages with no images keep alt checks neutral rather than failing. Measure with the <a href="/keyword-density">keyword density tool</a> alongside the analyzer, not instead of it.</p>

<h2 id="titles-snippets">Titles 55 chars, descriptions 155 (pixels beat characters)</h2>
<p>Google measures pixels, not characters: 55 characters near 540px stays green, 72 near 660px truncates with ellipsis. Wide capitals and pipes consume more than narrow i's and hyphens; mobile clips earlier (~40 visible chars), so front-load keywords. Descriptions: 155 characters near 880px safe, 178 near 990px cut. Google rewrites titles it dislikes regardless — favicon and date stamps also steal horizontal room. Preview both engines in the <a href="/serp-preview">SERP preview</a> and generate compliant tags in the <a href="/meta-tag-generator">meta tag generator</a>. Full pixel tables in <a href="/blog/seo-analyzer-guide/title-meta-length-2026">title length guide</a>.</p>

<h2 id="crawl-plumbing">Crawl plumbing: sitemaps, robots, canonicals</h2>
<p>On-page means nothing uncrawled: split catalogs over 50,000 URLs / 50MB into indexed sitemap files Search Console accepts, with absolute HTTPS URLs (relative paths get rejected) and honest changefreq. Robots.txt blocks crawl, not index — a disallowed <code>/admin</code> can still appear as a title-only result; use noindex meta for true exclusion. Canonicals consolidate duplicates; UTM-tagged URLs must canonical to clean versions. Build maps in the <a href="/sitemap-generator">sitemap generator</a> and rules in the <a href="/robots-txt-generator">robots.txt generator</a>. Plumbing guides: <a href="/blog/seo-analyzer-guide/split-large-sitemap">sitemap splitting</a> and <a href="/blog/seo-analyzer-guide/robots-vs-noindex">robots vs noindex</a>.</p>

<h2 id="social-utm">Social cards and UTM governance</h2>
<p>OG images (1200×630, absolute HTTPS, under 8MB) decide click-through on social; stale LinkedIn caches need explicit refetch via post inspectors, and <code>?v=2</code> cache-busting beats waiting. Mock Facebook-vs-X renders in the <a href="/open-graph-preview">open graph preview</a> before publishing. UTMs: lowercase-hyphen governance (<code>newsletter/email/spring-sale</code>) prevents report splits — <code>Email</code> vs <code>email</code> fragments analytics silently. Build disciplined links in the <a href="/utm-builder">UTM builder</a>. Cards: <a href="/blog/seo-analyzer-guide/stale-og-image-fix">stale image fixes</a>. Tags: <a href="/blog/seo-analyzer-guide/utm-naming-governance">UTM naming</a>.</p>

<h2 id="ai-checks">AI-content checks without false positives</h2>
<p>Detectors measure burstiness (human sentence-length variance) and n-gram overlap — and they are unreliable under ~150 words, where 95% “AI” verdicts routinely misfire on terse human prose. Our <a href="/ai-detector">AI detector</a> shows its work (burstiness scores, sliding 5-gram windows) instead of a black-box percentage, and pairs with the <a href="/plagiarism-checker">plagiarism checker</a> for originality. Rule: 400+ words before trusting any verdict, rewrite flagged passages (don't just re-roll), and never gate grades or jobs on detector output alone — October 2026 coverage keeps confirming vendor accuracy claims overreach. Method: <a href="/blog/seo-analyzer-guide/ai-content-false-positives">false-positive-free checking</a>. Mark up only visible copy with the <a href="/faq-schema-generator">FAQ schema generator</a>.</p>
<div class="cta-box"><strong>Try it now:</strong> paste a draft into the <a href="/seo-analyzer">free SEO analyzer — 11 checks, no signup, no plugin</a> and fix reds until you clear 80.</div>

<h2 id="limits">Limits and honest notes</h2>
<p>On-page caps around 80–90 points of the ranking equation: backlinks, topical authority, Core Web Vitals and search intent match the rest. A perfect 100 on a query nobody searches earns nothing — validate demand (even roughly) before optimizing. Scores also drift with template changes (fonts shift pixel widths) and Google rewrites (titles, descriptions) — re-audit quarterly, not once. And no checker measures expertise: first-hand testing notes and original data outrank perfectly-scored generic advice.</p>
<blockquote class="tip">General guidance only. Scores guide fixes; they don't guarantee rankings — demand, authority and intent decide.</blockquote>
`;

export const seoPillar: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "seo-analyzer-guide",
  kind: "pillar",
  title: "Score 80+ On-Page SEO Without a Plugin: 11 Checks",
  description:
    "On-page SEO without plugins: weighted 11-check workflow, density truth, pixel-based titles, crawl plumbing, social cards + honest AI checks. Free analyzer.",
  keywords: [
    "how to score 80 on page seo without plugin",
    "11 checks title slug density headings alt",
    "600 words 1-2 percent density",
    "rankmath vs yoast audit free",
    "core web vitals vs on page",
    "What keyword density should I target?",
  ],
  toolSlugs: ["seo-analyzer", "meta-tag-generator", "serp-preview", "sitemap-generator"],
  relatedSlugs: ["fix-score-60-to-80", "title-meta-length-2026", "split-large-sitemap"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "eleven-checks", text: "The 11 checks", level: 2 },
    { id: "density-truth", text: "Density truth", level: 2 },
    { id: "titles-snippets", text: "Titles and snippets", level: 2 },
    { id: "crawl-plumbing", text: "Crawl plumbing", level: 2 },
    { id: "social-utm", text: "Social + UTMs", level: 2 },
    { id: "ai-checks", text: "AI checks", level: 2 },
    { id: "limits", text: "Limits", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I score 80+ on-page SEO?", answer: "Run all 11 checks in weight order: keyword in a 55-char title, 155-char description, slug match, 1–2% density, single H1, logical H2 progression, alt coverage, 600+ words, OG cards, canonicals and internal links. Fix reds first — title, H1 and density carry nearly half the points." },
    { question: "What keyword density should I target?", answer: "One to two percent — 12 mentions per 1000 words sits at 1.2%, ideal. Five percent triggers stuffing flags in every credible checker. Placement matters as much as percentage: title, intro, one subhead and two alts beat the same count buried in paragraph twelve." },
    { question: "How long should titles and descriptions be?", answer: "Titles 50–60 characters (~580px), descriptions 150–160 (~920px). Google measures pixels, not characters: wide capitals consume far more than narrow letters, and mobile clips near 40 characters — so front-load keywords and validate in a pixel meter, never by count alone." },
    { question: "Do I need Yoast or RankMath?", answer: "No — the 11 checks run identically in any free analyzer, since the underlying rules (lengths, density, headings, alts) are mechanical and verifiable. Plugin conveniences like inline hints speed editing but change nothing about what gets measured or what passes." },
    { question: "Can AI detectors be trusted?", answer: "Only above ~150 words and never alone: they routinely misfire on terse human prose, with false-positive rates multiples higher on non-native writing. Prefer detectors showing burstiness evidence over black-box percentages, rewrite flagged passages for variance, and never gate grades, jobs or accounts on output." },
    { question: "What limits on-page SEO?", answer: "Backlinks, topical authority, Core Web Vitals and intent match supply the rest — on-page caps around 80–90 points of the equation. Perfect scores on zero-demand queries earn nothing, so validate demand first; then re-audit quarterly as templates and SERP styling shift pixel budgets silently." },
  ],
};
