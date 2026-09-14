import type { Category } from "./types";

export const CATEGORIES: Category[] = Object.freeze([
  {
    id: "text-documents",
    label: "Text & Documents",
    description:
      "Count words, convert case, clean text and compare documents with 19 free browser-based writing utilities for everyday editing.",
  },
  {
    id: "business",
    label: "Business & Writing",
    description:
      "Create invoices, resumes, quotations and receipts instantly in your browser with 9 free business document generators.",
  },
  {
    id: "developer",
    label: "Developer Tools",
    description:
      "Encode Base64, hash, format JSON and SQL, test regex and validate code with 29 free developer utilities that run locally.",
  },
  {
    id: "converters",
    label: "Converters",
    description:
      "Convert units, currencies, YAML, JSON, CSV and number systems instantly with 13 free offline converters in one click.",
  },
  {
    id: "generators",
    label: "Generators",
    description:
      "Generate strong passwords, UUIDs, random strings, favicons and robots.txt with 13 free privacy-friendly generator tools.",
  },
  {
    id: "images-design",
    label: "Images & Design",
    description:
      "Generate QR codes, compress and resize images, extract colors and build gradients with 23 free design tools offline.",
  },
  {
    id: "pdf",
    label: "PDF Tools",
    description:
      "Merge, split, compress and convert PDFs and images to PDF securely in your browser with 7 free offline PDF utilities.",
    // NOTE: 7 tools (image-to-pdf, pdf-merge, pdf-compress, pdf-split, pdf-to-jpg, pdf-rotate, pdf-watermark) — kept lean to preserve client-only bundle size.
  },
  {
    id: "calculators",
    label: "Calculators",
    description:
      "Calculate percentages, loans, grades, discounts and BMI instantly with 15 free everyday calculators that work offline.",
  },
  {
    id: "finance",
    label: "Finance & Money",
    description:
      "Mortgage, investment, salary and tax calculators for planning — informational only, not financial advice.",
  },
  {
    id: "health",
    label: "Health & Fitness",
    description:
      "Calorie, BMI and macro calculators for informational purposes only — not medical advice, consult a professional.",
  },
  {
    id: "seo",
    label: "SEO & Marketing",
    description:
      "Generate meta tags, sitemaps, robots.txt and SERP previews to rank higher with 8 free SEO and marketing utilities offline.",
  },
  {
    id: "time",
    label: "Time & Date",
    description:
      "Calculate age, workdays, timezones and durations with clocks, timers and converters in 8 free time and date utilities.",
  },
]) as Category[];
