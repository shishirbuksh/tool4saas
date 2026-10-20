// Auto-generated index for tools - split from src/lib/tools.ts God File
// Exports: tools, CATEGORIES, getTool (O1 Map), IconName, Category, Tool, etc.

export { ICON_NAMES } from "./icons";
export type { IconName } from "./icons";
export type { Category, Tool } from "./types";
export { CATEGORIES } from "./categories";
// NOINDEX single source lives in ./noindex (tiny, client-safe); re-exported
// here so existing "@/lib/tools" importers keep working unchanged.
import { NOINDEX_SLUGS } from "./noindex";
export { NOINDEX_SLUGS };

import type { Category, Tool } from "./types";
import { CATEGORIES } from "./categories";
import { textDocumentsTools } from "./data/text-documents";
import { businessTools } from "./data/business";
import { developerTools } from "./data/developer";
import { convertersTools } from "./data/converters";
import { generatorsTools } from "./data/generators";
import { imagesDesignTools } from "./data/images-design";
import { pdfTools } from "./data/pdf";
import { calculatorsTools } from "./data/calculators";
import { financeTools } from "./data/finance";
import { healthTools } from "./data/health";
import { seoTools } from "./data/seo";
import { timeTools } from "./data/time";

// Preserve original insertion order (128 tools) for stable sitemap/build output
const _order: string[] = ["invoice-generator", "qr-code-generator", "resume-builder", "word-counter", "password-generator", "json-formatter", "text-tools", "image-compressor", "lorem-ipsum", "unit-converter", "age-calculator", "color-converter", "base64-tool", "url-encoder", "text-diff", "hash-generator", "slug-generator", "random-number", "percentage-calculator", "timestamp-converter", "html-entities", "regex-tester", "jwt-decoder", "json-csv", "date-calculator", "bmi-calculator", "tip-calculator", "color-contrast", "text-to-speech", "url-parser", "number-to-words", "image-to-base64", "gradient-generator", "email-extractor", "mime-type-lookup", "favicon-generator", "timezone-converter", "discount-calculator", "credit-card-validator", "password-strength", "stopwatch", "gst-calculator", "code-minifier", "coin-flip", "commission-calculator", "screen-resolution", "mortgage-calculator", "compound-interest-calculator", "image-format-converter", "markdown-editor", "xml-formatter", "cron-parser", "csv-viewer", "morse-translator", "svg-optimizer", "calorie-calculator", "salary-calculator", "profit-margin-calculator", "sitemap-generator", "robots-txt-generator", "water-intake-calculator", "exif-viewer", "barcode-generator", "pregnancy-calculator", "pomodoro-timer", "text-summarizer", "grammar-checker", "serp-preview", "income-tax-calculator", "gpa-calculator", "ats-resume-checker", "signature-maker", "youtube-thumbnail-downloader", "inflation-calculator", "sip-calculator", "image-color-extractor", "json-to-excel", "document-generator", "cover-letter-builder", "fake-data-generator", "qr-scanner", "zip-creator", "ai-detector", "plagiarism-checker", "ssl-checker", "image-to-pdf", "pdf-merge", "pdf-compress", "scientific-calculator", "utm-builder", "meta-tag-generator", "currency-converter", "sql-formatter", "sleep-cycle-calculator", "typing-speed-test", "business-name-generator", "retirement-calculator", "fraction-calculator", "faq-schema-generator", "subnet-calculator", "pdf-to-jpg", "chmod-calculator", "speech-to-text", "rent-vs-buy-calculator", "code-to-image", "freelance-rate-calculator", "aes-encryptor", "seo-analyzer", "home-affordability-calculator", "refinance-calculator", "grade-calculator", "period-calculator", "concrete-calculator", "fancy-text-generator", "one-rep-max-calculator", "svg-to-png-converter", "otp-generator"];
const _orderIndex = new Map<string, number>(_order.map((slug, i) => [slug, i]));

// Merge all category arrays
const _all: Tool[] = [...textDocumentsTools, ...businessTools, ...developerTools, ...convertersTools, ...generatorsTools, ...imagesDesignTools, ...pdfTools, ...calculatorsTools, ...financeTools, ...healthTools, ...seoTools, ...timeTools];

// Sort to preserve original file order (or map via _order)
// Unknown slugs sort last so orphans are obvious instead of silently front-loading.
export const tools: Tool[] = Object.freeze(
  [..._all].sort(
    (a, b) =>
      (_orderIndex.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
      (_orderIndex.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
  ),
) as Tool[];

// O(1) lookups via Maps
const toolMap = new Map<string, Tool>(tools.map((t) => [t.slug, t]));
const categoryMap = new Map<string, Category>(CATEGORIES.map((c) => [c.id, c]));

export const getTool = (slug: string): Tool | undefined => toolMap.get(slug);
export const getToolOrThrow = (slug: string): Tool => {
  const t = toolMap.get(slug);
  if (!t) throw new Error(`Tool not found: ${slug}`);
  return t;
};

export const getCategory = (id: string): Category | undefined => categoryMap.get(id);

export const toolsByCategory = () =>
  CATEGORIES.map((category) => ({
    category,
    tools: tools.filter((t) => t.category === category.id),
  }));

// Frozen singleton groups: shared via toolsByCategoryCached() to avoid
// re-filtering on every render (Header, category pages, SiteJsonLd).
export const groups = Object.freeze(
  toolsByCategory().map((g) =>
    Object.freeze({
      category: g.category,
      tools: Object.freeze([...g.tools]) as Tool[],
    }),
  ),
) as { category: Category; tools: Tool[] }[];
export const toolsByCategoryCached = () => groups;

// Validation: tools.length must match expected – preserves count and sitemap
export const EXPECTED_TOOL_COUNT = 128;
export const EXPECTED_CATEGORY_COUNT = 12;
// User-facing count = registry minus noindexed tools (the single source for the
// tool count in Hero/Footer/site metadata). Never hardcode the visible count or
// write `EXPECTED_TOOL_COUNT - 1` again.
export const VISIBLE_TOOL_COUNT = tools.length - NOINDEX_SLUGS.size;
if (tools.length !== EXPECTED_TOOL_COUNT) {
  throw new Error(`[tools] length mismatch: expected ${EXPECTED_TOOL_COUNT}, got ${tools.length} (check src/lib/tools/data/*.ts)`);
}
if (CATEGORIES.length !== EXPECTED_CATEGORY_COUNT) {
  throw new Error(`[tools] CATEGORIES mismatch: expected ${EXPECTED_CATEGORY_COUNT}, got ${CATEGORIES.length}`);
}
// Dev-only duplicate-slug guard (also covered by validate-tools.mjs and tools.test.ts)
if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
  const seen = new Set<string>();
  for (const t of tools) {
    if (seen.has(t.slug)) throw new Error(`[tools] duplicate slug: ${t.slug}`);
    seen.add(t.slug);
  }
}










