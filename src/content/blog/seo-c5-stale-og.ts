import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>New brand, new logo, new OG image — shared on LinkedIn: old logo, old title, three weeks stale. The page was perfect; <strong>the cache was not</strong>. Social networks snapshot link previews on first share and re-fetch on their own schedule (read: eventually). This guide covers correct OG markup once, then the per-network refetch rituals plus <code>?v=2</code> cache-busting that forces fresh scrapes today.</p>
<p>Part of the <a href="/blog/seo-analyzer-guide">SEO publishing guide</a>. Mock renders in the <a href="/open-graph-preview">open graph preview</a>; compress oversized images via <a href="/blog/image-compressor-guide/png-vs-jpg-vs-webp">format conversion</a>.</p>

<h2 id="correct-markup">Correct markup first (1200×630, absolute, under 8MB)</h2>
<table>
<thead><tr><th>Tag</th><th>Requirement</th><th>Common failure</th></tr></thead>
<tbody>
<tr><td><strong>og:image</strong></td><td>1200×630, absolute HTTPS, &lt;8MB</td><td>Relative path renders blank</td></tr>
<tr><td><strong>og:title</strong></td><td>Matches page, under ~60 chars</td><td>Stale title after rebrand</td></tr>
<tr><td><strong>og:url</strong></td><td>Canonical absolute URL</td><td>UTM-polluted canonicals split shares</td></tr>
<tr><td><strong>twitter:card</strong></td><td><code>summary_large_image</code> for heroes</td><td>Small <code>summary</code> crops the visual</td></tr>
</tbody>
</table>
<p>Hotlinked images behind referrer-blocked hosts render blank in scrapers — self-host share art. Keep text within the center safe margin; Facebook, LinkedIn and X each crop edges differently, and focal subjects near borders get beheaded on at least one network.</p>

<h2 id="refetch">Per-network refetch rituals + <code>?v=2</code></h2>
<ul>
<li><strong>Facebook/Meta:</strong> Sharing Debugger → scrape again (repeat until preview updates; stubborn URLs need 2–3 passes).</li>
<li><strong>LinkedIn:</strong> Post Inspector → inspect; LinkedIn caches aggressively — <code>?v=2</code> on the image URL forces a fresh object reliably.</li>
<li><strong>X/Twitter:</strong> Card Validator → preview; summary vs large-image mismatches usually mean the tag changed without a re-scrape.</li>
<li><strong>Slack/Discord:</strong> append a fresh query string per share during testing; their caches are short but opaque.</li>
</ul>
<p>Version your share art deliberately (<code>launch-v2.jpg</code>) rather than overwriting filenames — immutable assets plus new URLs beat cache-invalidation waits every time. Verify all four renders in the <a href="/open-graph-preview">preview mock</a> before announcing.</p>

<h2 id="hotlink-focal">Hotlink blocks and focal discipline</h2>
<p>If previews show gray boxes, check hosting first: referrer policies and hotlink protection starve scrapers that fetch without browser credentials. Move art to the same domain as the page. Then enforce focal discipline: single subject, centered, high contrast at 120px thumbnail size — the LinkedIn feed compresses your 1200px art to a phone-screen stamp, and fine print becomes gray noise. Compress 12MB PNG masters before serving (see <a href="/blog/image-compressor-guide/png-vs-jpg-vs-webp">format guide</a>); scrapers time out on heavy files and fall back to nothing.</p>
<blockquote class="tip">General guidance only. Scraper behaviors shift without notice — re-verify refetch flows after any rebrand, not just markup.</blockquote>
`;

export const seoStaleOg: BlogPost = {
  pillar: "seo-analyzer-guide",
  slug: "stale-og-image-fix",
  kind: "cluster",
  title: "Fix Stale LinkedIn and Social Preview Images",
  description:
    "Fix stale OG images: correct 1200x630 markup, per-network refetch rituals, ?v=2 cache-busting + hotlink and focal rules. Free preview mock.",
  keywords: [
    "why linkedin shows stale og image and how to fix",
    "1200x630 under 8MB absolute https",
    "facebook vs x large vs summary",
    "hotlink referrer blocked blank",
    "post inspector refetch",
    "What size should OG images be?",
  ],
  toolSlugs: ["open-graph-preview", "image-format-converter", "meta-tag-generator"],
  relatedSlugs: ["title-meta-length-2026", "robots-vs-noindex", "utm-naming-governance"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "correct-markup", text: "Correct markup", level: 2 },
    { id: "refetch", text: "Refetch rituals", level: 2 },
    { id: "hotlink-focal", text: "Hotlink + focal", level: 2 },
  ],
  html,
  faqs: [
    { question: "Why does LinkedIn show my old image?", answer: "LinkedIn caches aggressively, so the first scrape snapshot persists for weeks even after a rebrand to new logos and titles. Open Post Inspector and inspect until the preview updates, since stubborn URLs need persistence. For reliable invalidation, version the image URL with question v equals 2 to force a fresh object rather than overwriting filenames." },
    { question: "What size should OG images be?", answer: "Use 1200 by 630 pixels, absolute HTTPS under 8MB for og image, with subjects centered in the safe margin. Facebook, LinkedIn and X each crop edges differently, so subjects near borders get beheaded on at least one network. Self-host share art on the domain, compress 12MB PNG masters before serving, and mock all four renders." },
    { question: "Why is my social preview blank?", answer: "Blank previews come from relative image paths that render blank, referrer-blocked hotlinks that starve scrapers without browser credentials, or oversized files that time out and fall back to nothing. Move art to the same domain as the page with absolute URLs. Compress heavy masters, keep text centered, and verify in the preview mock before announcing." },
    { question: "Facebook vs X cards — different tags?", answer: "Open Graph tags cover Facebook and LinkedIn, while X needs twitter card set to summary large image for hero visuals. Using small summary crops the visual, while mismatches mean the tag changed without a re-scrape. Mock both renders in the open graph preview, version art as launch-v2, and refetch with Sharing Debugger and Card Validator." },
    { question: "How do I force a fresh scrape?", answer: "Run per-network rituals first with Facebook Sharing Debugger scrape again, LinkedIn Post Inspector inspect, X Card Validator preview, and fresh query strings for Slack and Discord. When caches resist, append question v equals 2 versioning to force fresh objects. Never overwrite filenames expecting invalidation, since immutable assets plus new URLs beat waiting." },
  ],
};
