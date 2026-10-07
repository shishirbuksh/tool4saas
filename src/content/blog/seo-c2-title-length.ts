import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Perfect title, 72 characters, truncated mid-keyword on every SERP. Perfect description, 178 characters, cut before the call to action. The author counted characters; <strong>Google measures pixels</strong>. A 55-character title near 540px stays green; the same count in wide capitals near 660px bleeds red. This guide gives the pixel budgets that actually govern truncation in 2026, why mobile clips earlier, and why Google rewrites titles no matter what you do.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Preview live in <a href="/serp-preview">SERP preview</a>; generate compliant tags in <a href="/meta-tag-generator">meta tag generator</a>.</p>

<h2 id="budgets">Pixel budgets (not character counts)</h2>
<table>
<thead><tr><th>Element</th><th>Safe</th><th>Caution</th><th>Truncated</th></tr></thead>
<tbody>
<tr><td><strong>Title</strong></td><td>50–55 chars (~480–540px)</td><td>62 chars (~595px amber)</td><td>70+ chars (~650px+)</td></tr>
<tr><td><strong>Description</strong></td><td>150–155 chars (~880px)</td><td>165 chars (~940px)</td><td>178+ chars (~990px+)</td></tr>
</tbody>
</table>
<p>Character width varies: <code>W</code> and emojis consume far more than <code>i</code>, <code>l</code> or hyphens. Two 55-char titles can differ 100px in render. Always validate in a pixel meter, never by count alone. Front-load keywords within the first 40 characters — mobile viewports clip hardest, and favicon plus date stamps steal additional room on real SERPs.</p>

<h2 id="mobile-rewrite">Mobile clipping and Google rewrites</h2>
<p>Mobile shows ~40 characters of title before cutting — put the value words first or mobile searchers never see them. And accept what you cannot control: Google rewrites 60%+ of titles (site-name appends, keyword swaps, date injections). Rewrites favor pages with clear H1s and descriptive links — which the <a href="/blog/seo-analyzer-guide/fix-score-60-to-80">60-to-80 rescue</a> covers. When your crafted title gets replaced, improve H1/heading alignment rather than re-tuning characters.</p>

<h2 id="workflow">Workflow: draft, meter, generate, re-verify</h2>
<ol>
<li><strong>Draft</strong> title (keyword fronted) + description (benefit + CTA) in the <a href="/meta-tag-generator">meta tag generator</a>.</li>
<li><strong>Meter</strong> both in the <a href="/serp-preview">SERP preview</a> — green bars at 540px/880px before anything ships.</li>
<li><strong>Generate</strong> the head block and paste once near the top of <code>&lt;head&gt;</code>.</li>
<li><strong>Re-verify</strong> after template or font changes — pixel widths shift silently with typography.</li>
</ol>
<blockquote class="tip">General guidance only. Pixel budgets drift as Google restyles SERPs — re-meter quarterly, not once.</blockquote>
`;

export const seoTitleLength: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "title-meta-length-2026",
  kind: "cluster",
  title: "Title and Meta Lengths That Avoid Truncation (2026)",
  description:
    "Title/description pixel budgets: safe/caution/truncated table, mobile clipping, Google rewrites + draft-meter-generate workflow. Free preview tools.",
  keywords: [
    "how long should title and meta description be 2026",
    "55 char 540px safe green",
    "72 char 660px ellipsis",
    "mobile clips earlier 40 chars",
    "google rewrites title why",
    "How long should a meta description be?",
  ],
  toolSlugs: ["serp-preview", "meta-tag-generator", "seo-analyzer"],
  relatedSlugs: ["fix-score-60-to-80", "stale-og-image-fix", "utm-naming-governance"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "budgets", text: "Pixel budgets", level: 2 },
    { id: "mobile-rewrite", text: "Mobile + rewrites", level: 2 },
    { id: "workflow", text: "Draft-meter-generate", level: 2 },
  ],
  html,
  faqs: [
    { question: "How long should an SEO title be?", answer: "Keep titles 50 to 60 characters near 580 pixels maximum, since 55 near 540 pixels stays safe green while 72 near 660 truncates. Width varies because W and emojis consume far more than narrow letters, so validate pixels not counts. Front-load keywords within 40 characters, meter in SERP preview, and re-meter after font changes." },
    { question: "How long should a meta description be?", answer: "Keep descriptions 150 to 160 characters near 880 to 920 pixels, since 155 near 880 pixels displays fully while 178 near 990 pixels gets cut before the call to action. Draft the benefit plus CTA in the meta tag generator, meter title and description in SERP preview, and re-verify after template changes." },
    { question: "Why does mobile cut my title sooner?", answer: "Mobile viewports show about 40 characters before cutting, plus favicon and date stamps steal room on SERPs, so screens clip hardest. Put value words and keywords within the first 40 characters or mobile searchers never see them. Draft with keywords fronted, then meter in SERP preview." },
    { question: "Why did Google rewrite my title?", answer: "Google rewrites more than 60 percent of titles through site-name appends, keyword swaps and date injections, no matter how you craft characters. Rewrites favor pages with clear H1s and descriptive links, so improve H1 and heading alignment rather than re-tuning characters. When a crafted title gets replaced, fix heading alignment as the 60-to-80 rescue covers." },
    { question: "Do pixel budgets change?", answer: "Yes, pixel budgets drift as Google restyles SERPs and when templates or fonts change, since pixel widths shift with typography. A green title at 540 pixels can drift amber without edits, as can descriptions at 880 pixels. Re-meter quarterly in SERP preview, not once, and re-verify after every template change." },
  ],
};
