import type { Category } from "./types";

export const CATEGORIES: Category[] = Object.freeze([
  {
    id: "text-documents",
    label: "Text & Documents",
    description:
      "Count, convert, clean and transform text — word counters, case tools, diff checkers and more.",
  },
  {
    id: "business",
    label: "Business & Writing",
    description:
      "Create invoices, resumes and other business documents without leaving your browser.",
  },
  {
    id: "developer",
    label: "Developer Tools",
    description:
      "Encode, decode, hash, format and validate data and code with developer-focused utilities.",
  },
  {
    id: "converters",
    label: "Converters",
    description:
      "Convert between units, formats, data URLs and number systems in a single click.",
  },
  {
    id: "generators",
    label: "Generators",
    description:
      "Generate passwords, UUIDs, random values, placeholders and other useful data.",
  },
  {
    id: "images-design",
    label: "Images & Design",
    description:
      "Generate QR codes, compress and resize images, and work with color and gradients.",
  },
  {
    id: "pdf",
    label: "PDF Tools",
    description:
      "Merge, compress and convert PDFs and images to PDF — all offline in your browser.",
    // NOTE: 7 tools (image-to-pdf, pdf-merge, pdf-compress, pdf-split, pdf-to-jpg, pdf-rotate, pdf-watermark) — kept lean to preserve client-only bundle size.
  },
  {
    id: "calculators",
    label: "Calculators",
    description:
      "Everyday calculators for percentages, loans, tax, BMI and more.",
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
      "Meta tags, sitemaps and robots.txt generators to rank your content — all offline.",
  },
  {
    id: "time",
    label: "Time & Date",
    description:
      "Calculate ages, dates, timezones and count time with clocks and converters.",
  },
]) as Category[];
