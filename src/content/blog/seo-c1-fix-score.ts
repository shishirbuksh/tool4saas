import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Score: 62. Target: publish-ready 80+. The draft was a 600-word vegan protein powder post with good research and bad metadata — no H1, thin alt text, keyword absent from the title. Ninety minutes of targeted fixes later: 84. <strong>Score rescue is mechanical, not creative</strong>: each red check maps to one concrete edit. This walkthrough replays the exact sequence so you can run it on any draft.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Score in the <a href="/seo-analyzer">SEO analyzer</a>; preview in <a href="/serp-preview">SERP preview</a>. Method background in <a href="/blog/seo-analyzer-guide">the 11-check workflow</a>.</p>

<h2 id="baseline">Baseline 62: read the reds in order</h2>
<p>The analyzer reported: title missing keyword (−15), no H1 (−10), thin alt coverage (−8), density 0.4% (−12 partial), description 190 chars (−6 partial). Total drag: 51 points of fixable red against 600 words of solid content. Priority rule: <strong>title + H1 + density first</strong> (37 points, twenty minutes), alts + description second (14 points). Never start with alt text when the title lacks the keyword — weights decide order.</p>

<h2 id="fixes">The fix sequence (62 → 84)</h2>
<table>
<thead><tr><th>Step</th><th>Edit</th><th>Score after</th></tr></thead>
<tbody>
<tr><td><strong>1</strong></td><td>Title → 56 chars with “vegan protein powder” fronted</td><td>68 (+6 partial… full +15 needs slug too)</td></tr>
<tr><td><strong>2</strong></td><td>Slug → <code>vegan-protein-powder-guide</code></td><td>74</td></tr>
<tr><td><strong>3</strong></td><td>H1 added with keyword; 12 mentions placed (intro, subhead, 2 alts)</td><td>80</td></tr>
<tr><td><strong>4</strong></td><td>Description 190 → 154 chars; 3 alts described</td><td><strong>84</strong></td></tr>
</tbody>
</table>
<p>Density math: 12 mentions in 1000 words is 1.2% — inside the 1–2% band, clear of the 5% stuffing flag. Each fix re-ran the analyzer (rerun after every ~100 words of edits, not once at the end — compounding errors hide in batch runs). The 155-char description and 60-char title were validated in the <a href="/serp-preview">SERP preview</a> at 540px/880px before publishing (see <a href="/blog/seo-analyzer-guide/title-meta-length-2026">length guide</a>).</p>

<h2 id="publish-ready">The 80+ publish gate (and when to stop)</h2>
<p>Ship at 80 with remaining yellows documented; chase 90+ only for money pages worth another hour. Never trade readability for points: a keyword crammed into every H2 reads as spam to humans and increasingly to models. Post-publish: re-score after 100 words of future edits, monitor Search Console impressions for 2–4 weeks, and refresh when templates change (fonts shift pixel widths and can un-complete previously green checks).</p>
<blockquote class="tip">General guidance only. Scores predict fix-completeness, not rankings — demand and authority decide traffic.</blockquote>
`;

export const seoFixScore: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "fix-score-60-to-80",
  kind: "cluster",
  title: "Fix SEO Score From 60 to 80: Worked Example",
  description:
    "Lift on-page SEO 62 to 84: ordered fix sequence with score-after table, density math + publish gate. Free analyzer walkthrough.",
  keywords: [
    "how to fix on page seo score from 60 to 80",
    "12 mentions in 1000 words 1.2 percent",
    "missing h1 thin alt fix",
    "rerun after 100 words",
    "80 plus publish ready",
    "How do I raise my SEO score quickly?",
  ],
  toolSlugs: ["seo-analyzer", "serp-preview", "meta-tag-generator"],
  relatedSlugs: ["title-meta-length-2026", "split-large-sitemap", "ai-content-false-positives"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "baseline", text: "Read the reds", level: 2 },
    { id: "fixes", text: "Fix sequence", level: 2 },
    { id: "publish-ready", text: "Publish gate", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I raise my SEO score quickly?", answer: "Fix in weight order: title plus slug plus H1 plus distance first for 37 points, then density placement, then alts plus description. The 62 to 84 vegan protein powder rescue used a 56-character title, slug, H1 with 12 mentions, 190 to 154-character description and three alts. Re-run the analyzer after each fix." },
    { question: "What keyword density should I hit?", answer: "Hit 1 to 2 percent, which is 12 mentions per 1000 words for 1.2 percent, placed in the title, intro, one subhead and two alts. That density lifted the 600-word vegan protein powder draft from 62 toward 84 without tripping the 5 percent stuffing flag. Validate in SERP preview and re-run about every 100 words." },
    { question: "Is 80 a good SEO score?", answer: "Yes, 80 is publish-ready, so ship with remaining yellows documented and chase 90 plus only for money pages worth another hour. Never trade readability for points by cramming keywords into every H2. Post-publish, re-score after 100 words, monitor Search Console impressions for two to four weeks and refresh when templates change." },
    { question: "How often should I re-score?", answer: "Re-score after every 100 words of edits, not once at the end, because errors compound in batch runs. Each fix re-ran the analyzer before the 155-character description and 60-character title were validated in SERP preview. Post-publish, re-score after future edits and quarterly after template changes since fonts shift pixel widths." },
    { question: "Do scores guarantee rankings?", answer: "No, scores measure fix-completeness, not rankings, because demand, backlinks, authority and intent decide traffic. The 62 to 84 rescue improved a 600-word vegan protein powder draft with good research but bad metadata through mechanical edits where each red check mapped to one concrete fix. Use scores to sequence title, H1, density, alts and description." },
  ],
};
