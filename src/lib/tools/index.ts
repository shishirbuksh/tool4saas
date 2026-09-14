// Auto-generated index for tools - split from src/lib/tools.ts God File
// Exports: tools, CATEGORIES, getTool (O1 Map), IconName, Category, Tool, etc.

export { ICON_NAMES } from "./icons";
export type { IconName } from "./icons";
export type { Category, Tool } from "./types";
export { CATEGORIES } from "./categories";

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

// Preserve original insertion order (158 tools) for stable sitemap/build output
const _order: string[] = ["invoice-generator", "qr-code-generator", "resume-builder", "word-counter", "password-generator", "json-formatter", "case-converter", "image-compressor", "lorem-ipsum", "unit-converter", "age-calculator", "color-converter", "base64-tool", "url-encoder", "text-diff", "hash-generator", "slug-generator", "random-number", "text-list", "base-converter", "uuid-generator", "percentage-calculator", "timestamp-converter", "html-entities", "text-find-replace", "regex-tester", "jwt-decoder", "json-csv", "date-calculator", "bmi-calculator", "tip-calculator", "color-contrast", "text-reverser", "keyword-density", "text-to-speech", "url-parser", "number-to-words", "roman-numeral", "image-to-base64", "gradient-generator", "email-extractor", "random-string", "mime-type-lookup", "favicon-generator", "color-palette", "loan-calculator", "timezone-converter", "discount-calculator", "json-to-yaml", "html-beautifier", "credit-card-validator", "password-strength", "image-resizer", "stopwatch", "dice-roller", "gst-calculator", "code-minifier", "coin-flip", "commission-calculator", "image-border", "percentage-change", "percentage-difference", "random-passphrase", "work-days-calculator", "random-hex-color", "screen-resolution", "mortgage-calculator", "compound-interest-calculator", "image-format-converter", "markdown-editor", "xml-formatter", "text-cleaner", "readability-checker", "cron-parser", "countdown-timer", "csv-viewer", "morse-translator", "world-clock", "ascii-converter", "svg-optimizer", "calorie-calculator", "salary-calculator", "profit-margin-calculator", "sitemap-generator", "robots-txt-generator", "water-intake-calculator", "css-beautifier", "ideal-weight-calculator", "macro-calculator", "exif-viewer", "barcode-generator", "yaml-to-json", "json-tree-viewer", "file-size-converter", "pregnancy-calculator", "pomodoro-timer", "text-summarizer", "grammar-checker", "open-graph-preview", "serp-preview", "color-shades-generator", "income-tax-calculator", "gpa-calculator", "ats-resume-checker", "signature-maker", "youtube-thumbnail-downloader", "inflation-calculator", "sip-calculator", "image-color-extractor", "json-to-excel", "quotation-generator", "purchase-order-generator", "cover-letter-builder", "fake-data-generator", "qr-scanner", "zip-creator", "ai-detector", "plagiarism-checker", "ssl-checker", "cmyk-converter", "image-to-pdf", "pdf-merge", "pdf-compress", "scientific-calculator", "utm-builder", "meta-tag-generator", "wifi-qr-generator", "receipt-generator", "pdf-split", "currency-converter", "ovulation-calculator", "sql-formatter", "image-cropper", "sleep-cycle-calculator", "simple-interest-calculator", "body-fat-calculator", "typing-speed-test", "business-name-generator", "retirement-calculator", "time-duration-calculator", "fraction-calculator", "faq-schema-generator", "subnet-calculator", "pdf-to-jpg", "chmod-calculator", "css-box-shadow-generator", "speech-to-text", "auto-loan-calculator", "pdf-rotate", "rent-vs-buy-calculator", "css-border-radius-generator", "code-to-image", "freelance-rate-calculator", "pdf-watermark", "hmac-generator", "aes-encryptor", "css-clip-path-generator", "js-beautifier", "seo-analyzer", "home-affordability-calculator", "refinance-calculator", "grade-calculator", "period-calculator", "concrete-calculator", "cagr-calculator", "fancy-text-generator", "one-rep-max-calculator", "svg-to-png-converter", "otp-generator"];
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

// Validation: tools.length must match expected (158) – preserves God File count and sitemap
export const EXPECTED_TOOL_COUNT = 169;
export const EXPECTED_CATEGORY_COUNT = 12;
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










