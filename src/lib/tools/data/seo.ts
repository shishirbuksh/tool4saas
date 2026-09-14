import type { Tool } from "../types";

export const seoTools: Tool[] = [
  {
    slug: "sitemap-generator",
    title: "Sitemap Generator",
    short: "XML sitemap builder",
    description: "Build an XML sitemap from a list of URLs. Set change frequency, priority, and lastmod, then download the file instantly.",
    icon: "Code",
    keywords: ["sitemap generator", "xml sitemap", "generate sitemap online"],
    category: "seo",
    faq: [{ question: "What URLs are allowed?", answer: "Must be absolute http(s) URLs, one per line. Validated via new URL()." }, { question: "Is it private?", answer: "Yes, XML is built locally from your list." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Paste URLs", text: "Paste one URL per line." }, { name: "Set options", text: "Choose changefreq, priority and lastmod." }, { name: "Copy/download", text: "Copy XML or download sitemap.xml." }]
  },
  {
    slug: "robots-txt-generator",
    title: "Robots.txt Generator",
    short: "Generate robots.txt",
    description: "Create a robots.txt file to guide search engine crawlers. Set user-agent rules, crawl delays, and sitemap paths.",
    icon: "Code",
    keywords: ["robots.txt generator", "generate robots.txt", "robots.txt maker"],
    category: "seo",
    faq: [{ question: "What is robots.txt?", answer: "A file at domain root that tells crawlers which paths to allow or disallow, plus sitemap location." }, { question: "Is it private?", answer: "Yes, file is generated locally from your inputs." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Set agent", text: "Choose user-agent like * or Googlebot." }, { name: "Add rules", text: "Enter allow/disallow paths, sitemap and delay." }, { name: "Copy", text: "Copy robots.txt or download." }]
  },
  {
    slug: "open-graph-preview",
    title: "Open Graph Preview",
    short: "Preview social cards",
    description: "See how your links look on social media. Preview Open Graph and Twitter cards for Facebook, LinkedIn, and X.",
    icon: "Public",
    keywords: ["open graph preview", "og preview", "social card preview"],
    category: "seo",
    faq: [{ question: "What is Open Graph?", answer: "Tags like og:title and og:image control how links look on Facebook, Twitter and LinkedIn." }, { question: "Is it private?", answer: "Yes, Facebook and Twitter card mocks render locally from your title and image URL." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter tags", text: "Fill title, description, image and URL." }, { name: "Preview", text: "See Facebook and Twitter card mocks." }, { name: "Copy tags", text: "Copy generated meta tags." }]
  },
  {
    slug: "serp-preview",
    title: "SERP Preview",
    short: "Google snippet preview",
    description: "Preview your Google search snippets. Check pixel widths for titles and descriptions to avoid truncation in search results.",
    icon: "Search",
    keywords: ["serp preview", "google snippet", "search preview"],
    category: "seo",
    faq: [{ question: "What are pixel limits?", answer: "Title ~580px, description ~920px. Exceeding may truncate in Google." }, { question: "Is it private?", answer: "Yes, the Google snippet mock and 580/920px checks compute locally from your inputs." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter title", text: "Type title (0-60 chars)." }, { name: "Enter description", text: "Type description (0-160 chars)." }, { name: "Preview", text: "See snippet and length warnings." }]
  },
  {
    slug: "utm-builder",
    title: "UTM Builder",
    short: "GA4 campaign links",
    description: "Create UTM tracking links for GA4 campaigns. Add your source, medium, and campaign tags to generate clean tracking URLs.",
    icon: "Link",
    keywords: ["utm builder", "utm link generator", "campaign url builder"],
    category: "seo",
    faq: [{ question: "Which UTMs does GA4 require?", answer: "Source, medium and campaign are required; term and content are optional for granular tracking." }, { question: "Is it private?", answer: "Yes, source, medium, and campaign tags encode locally; your base URL stays private." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter URL", text: "Paste base URL with https." }, { name: "Add UTMs", text: "Fill source, medium and campaign." }, { name: "Copy", text: "Copy clean UTM URL or download." }]
  },
  {
    slug: "meta-tag-generator",
    title: "Meta Tag Generator",
    short: "SEO + OG tags",
    description: "Generate SEO and social media meta tags. Create optimized title, description, and Open Graph tags for your website.",
    icon: "Code",
    keywords: ["meta tag generator", "meta description generator", "og tags generator"],
    category: "seo",
    faq: [{ question: "What length avoids truncation?", answer: "Title 50-60 chars (~580px), description 150-160 chars (~920px) to avoid Google truncation." }, { question: "Is it private?", answer: "Yes, SERP and social mocks render locally from your title and description; nothing is uploaded." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Fill tags", text: "Enter title, description, URL and image." }, { name: "Preview", text: "See Google and social card mocks." }, { name: "Copy", text: "Copy meta tags block." }]
  },
  {
    slug: "faq-schema-generator",
    title: "FAQ Schema Generator",
    short: "JSON-LD FAQs",
    description: "Build FAQ JSON-LD schema to help win rich results in Google search. Add questions and answers to generate valid structured data.",
    icon: "Code",
    keywords: ["faq schema generator", "json-ld generator", "faq structured data"],
    category: "seo",
    faq: [{ question: "Will this guarantee rich results?", answer: "No, but valid FAQPage JSON-LD is eligible for FAQ rich results." }, { question: "Is it private?", answer: "Yes, FAQPage JSON-LD assembles locally from your questions; validation never contacts a server." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Add Q/A", text: "Enter questions and answers." }, { name: "Preview", text: "See JSON-LD output." }, { name: "Copy", text: "Copy code for your page." }]
  },
  {
    slug: "seo-analyzer",
    title: "SEO Analyzer",
    short: "RankMath-style SEO score",
    description: "Score any page like RankMath: focus keyword, title, slug, description, density, headings and alt checks with 0-100 score and fix hints, all private.",
    icon: "Search",
    keywords: ["seo analyzer", "rankmath style checker", "on page seo score"],
    category: "seo",
    faq: [{ question: "How is the score calculated?", answer: "11 weighted checks (title, slug, description, density, headings, alt) sum to 100; 80+ is publish-ready." }, { question: "Is my content uploaded?", answer: "No, scoring runs locally in your browser; nothing leaves your device." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter keyword", text: "Type one focus keyword." }, { name: "Fill fields", text: "Paste title, slug, description and content." }, { name: "Fix reds", text: "Work through failing checks, then copy the report." }]
  },
];
