import type { Tool } from "../types";

export const seoTools: Tool[] = [
  {
    slug: "sitemap-generator",
    title: "Sitemap Generator",
    short: "XML sitemap builder",
    description: "Build a valid XML sitemap from a URL list with editable changefreq, priority 0.0-1.0 and lastmod. Validates http URLs and downloads sitemap.xml instantly offline.",
    icon: "Code",
    keywords: ["sitemap generator", "xml sitemap", "generate sitemap online"],
    category: "seo",
    faq: [{"question":"What URLs are allowed?","answer":"Must be absolute http(s) URLs, one per line. Validated via new URL()."},{"question":"Is it private?","answer":"Yes, XML is built locally from your list."},{"question":"What sitemap specs and limits apply?","answer":"Outputs UTF-8 sitemap.xml with urlset per Google spec, max 50,000 URLs or 50MB uncompressed. For example, 1,200 product URLs validate cleanly."}],
    howTo: [{"name":"Paste URLs","text":"One absolute URL per line like https example blog."},{"name":"Set options","text":"Choose weekly changefreq, 0.8 priority and today lastmod."},{"name":"Validate list","text":"Bad URLs flagged via URL check, for example 1,200 rows."},{"name":"Copy or download","text":"Save UTF-8 sitemap.xml under 50k URLs."}]
  },
  {
    slug: "robots-txt-generator",
    title: "Robots.txt Generator",
    short: "Generate robots.txt",
    description: "Create a valid robots.txt to guide Googlebot and other crawlers. Set Allow, Disallow, Crawl-delay and Sitemap paths, then copy or download the file offline.",
    icon: "Code",
    keywords: ["robots.txt generator", "generate robots.txt", "robots.txt maker"],
    category: "seo",
    faq: [{"question":"What is robots.txt?","answer":"A file at domain root that tells crawlers which paths to allow or disallow, plus sitemap location."},{"question":"Is it private?","answer":"Yes, file is generated locally from your inputs."},{"question":"Where do I install robots.txt?","answer":"Upload the plain-text UTF-8 file to domain root, for example example.com slash robots.txt, keep under 500KB with Disallow plus Sitemap lines."}],
    howTo: [{"name":"Pick user-agent","text":"Use star for all or Googlebot."},{"name":"Add rules","text":"Enter Disallow admin, Allow root and delay 5."},{"name":"Add sitemap","text":"Append sitemap URL like example sitemap.xml."},{"name":"Copy or download","text":"Upload to domain root robots.txt under 500KB."}]
  },
  {
    slug: "open-graph-preview",
    title: "Open Graph Preview",
    short: "Preview social cards",
    description: "Preview Facebook, LinkedIn and X social cards before publishing. Enter title, description, URL and 1200x630 image to copy clean Open Graph meta tags.",
    icon: "Public",
    keywords: ["open graph preview", "og preview", "social card preview"],
    category: "seo",
    faq: [{"question":"What is Open Graph?","answer":"Tags like og:title and og:image control how links look on Facebook, Twitter and LinkedIn."},{"question":"Is it private?","answer":"Yes, Facebook and Twitter card mocks render locally from your title and image URL."},{"question":"What image size works best?","answer":"Use 1200x630 JPG or PNG under 8MB with absolute https URL. For example, a 60-char title plus that image renders a full-width Facebook card."}],
    howTo: [{"name":"Enter title and URL","text":"55-char title plus https post URL."},{"name":"Add description and image","text":"150-char blurb plus 1200x630 JPG URL."},{"name":"Preview cards","text":"Compare Facebook wide versus X compact mock."},{"name":"Copy meta tags","text":"Paste og title and image block into head."}]
  },
  {
    slug: "serp-preview",
    title: "SERP Preview",
    short: "Google snippet preview",
    description: "Preview Google snippets with live pixel checks at 580px titles and 920px descriptions. Tune 50-60 char titles and 150-160 char descriptions to avoid cuts.",
    icon: "Search",
    keywords: ["serp preview", "google snippet", "search preview"],
    category: "seo",
    faq: [{"question":"What are pixel limits?","answer":"Title ~580px, description ~920px. Exceeding may truncate in Google."},{"question":"Is it private?","answer":"Yes, the Google snippet mock and 580/920px checks compute locally from your inputs."},{"question":"What lengths avoid truncation?","answer":"Keep title 50-60 chars and description 150-160 chars with lowercase-hyphen slug. For example, a 55-char title near 540px shows fully."}],
    howTo: [{"name":"Type title","text":"55 chars and watch the 580px bar."},{"name":"Type description","text":"155 chars and watch the 920px bar."},{"name":"Edit slug","text":"Use lowercase hyphens like best-running-shoes."},{"name":"Fix warnings","text":"Shorten text to avoid ellipsis cuts."}]
  },
  {
    slug: "utm-builder",
    title: "UTM Builder",
    short: "GA4 campaign links",
    description: "Build clean GA4 UTM campaign links in seconds. Add source, medium, campaign plus optional term and content with auto-encoding and one-click copy offline.",
    icon: "Link",
    keywords: ["utm builder", "utm link generator", "campaign url builder"],
    category: "seo",
    faq: [{"question":"Which UTMs does GA4 require?","answer":"Source, medium and campaign are required; term and content are optional for granular tracking."},{"question":"Is it private?","answer":"Yes, source, medium, and campaign tags encode locally; your base URL stays private."},{"question":"What characters are safe in UTM values?","answer":"Use lowercase letters, numbers and hyphens, for example source newsletter and campaign spring-sale. Full URL stays under about 2,000 chars."}],
    howTo: [{"name":"Paste base URL","text":"Start with https like example sale page."},{"name":"Fill required tags","text":"Source newsletter, medium email, campaign spring-sale."},{"name":"Add optional tags","text":"Term and content for ads, auto-encoded."},{"name":"Copy clean link","text":"Share the GA4-ready URL."}]
  },
  {
    slug: "meta-tag-generator",
    title: "Meta Tag Generator",
    short: "SEO + OG tags",
    description: "Generate SEO title, 150-160 char meta description, canonical plus Open Graph and Twitter Card tags. Preview Google and social mocks, then copy in one click.",
    icon: "Code",
    keywords: ["meta tag generator", "meta description generator", "og tags generator"],
    category: "seo",
    faq: [{"question":"What length avoids truncation?","answer":"Title 50-60 chars (~580px), description 150-160 chars (~920px) to avoid Google truncation."},{"question":"Is it private?","answer":"Yes, SERP and social mocks render locally from your title and description; nothing is uploaded."},{"question":"Which tags are included?","answer":"Exports title, meta description, canonical, viewport plus og and twitter card tags. For example, paste the block into head with your 1200x630 image."}],
    howTo: [{"name":"Fill title and description","text":"55-char title and 155-char description."},{"name":"Add URL and image","text":"Canonical URL plus 1200x630 image."},{"name":"Preview mocks","text":"Check Google snippet and social cards."},{"name":"Copy tag block","text":"Paste full head tags to your page."}]
  },
  {
    slug: "faq-schema-generator",
    title: "FAQ Schema Generator",
    short: "JSON-LD FAQs",
    description: "Build valid FAQPage JSON-LD structured data for Google rich results. Add questions and answers, preview formatted JSON and paste the script before body end.",
    icon: "Code",
    keywords: ["faq schema generator", "json-ld generator", "faq structured data"],
    category: "seo",
    faq: [{"question":"Will this guarantee rich results?","answer":"No, but valid FAQPage JSON-LD is eligible for FAQ rich results."},{"question":"Is it private?","answer":"Yes, FAQPage JSON-LD assembles locally from your questions; validation never contacts a server."},{"question":"What JSON-LD spec does it output?","answer":"Emits schema.org FAQPage with context, 2-10 Question and Answer pairs recommended. Paste the script before body end and test in Rich Results Test."}],
    howTo: [{"name":"Add questions","text":"Enter 4 questions with 2-3 sentence answers."},{"name":"Preview JSON-LD","text":"See FAQPage schema formatting."},{"name":"Validate JSON","text":"Confirm no trailing commas or errors."},{"name":"Install script","text":"Paste JSON-LD before body end."}]
  },
  {
    slug: "seo-analyzer",
    title: "SEO Analyzer",
    short: "RankMath-style SEO score",
    description: "Score any page like RankMath: focus keyword, title, slug, description, density, headings and alt checks with 0-100 score and fix hints, all private.",
    icon: "Search",
    keywords: ["seo analyzer", "rankmath style checker", "on page seo score"],
    category: "seo",
    faq: [{"question":"How is the score calculated?","answer":"11 weighted checks (title, slug, description, density, headings, alt) sum to 100; 80+ is publish-ready."},{"question":"Is my content uploaded?","answer":"No, scoring runs locally in your browser; nothing leaves your device."},{"question":"What score and length should I target?","answer":"Aim for 80 plus of 100 with 600 plus words and 1-2 percent keyword density. For example, fix red title and H1 checks first."}],
    howTo: [{"name":"Enter focus keyword","text":"Use one phrase like vegan protein powder."},{"name":"Paste SEO fields","text":"Add title, slug, description and 600 plus words."},{"name":"Run 11 checks","text":"Score title, density, headings and alt to 100."},{"name":"Fix reds","text":"Add keyword to H1 and reach 80 plus."}]
  },
];
