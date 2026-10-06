// Homepage content data (extracted from src/app/page.tsx).
// Server-safe: data only, no JSX/MUI. Single source for the homepage grids.
// NOTE: SiteJsonLd keeps a hardcoded mirror of the guide lists for its
// ItemList output (HomeBlogItemList) — update both together to keep
// visible-grid vs JSON-LD parity.

export type PopularSlug = { slug: string; benefit: string };

export type Guide = {
  title: string;
  desc: string;
  label: string;
  date: string;
  href: string;
};

export type Faq = { q: string; a: string };

export const POPULAR_SLUGS: PopularSlug[] = [
  { slug: "invoice-generator", benefit: "Make a clean invoice PDF in minutes, free." },
  { slug: "qr-code-generator", benefit: "Make a QR code for links, WiFi, or UPI." },
  { slug: "json-formatter", benefit: "Fix and read messy JSON fast." },
  { slug: "word-counter", benefit: "Count words and reading time as you type." },
  { slug: "pdf-merge", benefit: "Join PDF files in order, in your browser." },
  { slug: "image-compressor", benefit: "Shrink photos without losing quality." },
  { slug: "mortgage-calculator", benefit: "See your monthly home loan payment." },
  { slug: "resume-builder", benefit: "Build a clean resume that gets interviews." },
];

export const RECENT_GUIDES: Guide[] = [
  {
    title: "Word Counter Guide: Count Words, Reading Time & Readability Free, No Signup",
    desc: "Reading-time math, Flesch formulas, density without myths, length-by-intent.",
    label: "Word Count Guide",
    date: "2026-09-26",
    href: "/blog/word-counter-guide",
  },
  {
    title: "How to Generate a Strong Password (Free Offline Tool)",
    desc: "Settings, entropy table, passphrases, manager + 2FA pairing, breach basics.",
    label: "Password Guide",
    date: "2026-09-25",
    href: "/blog/password-generator-guide",
  },
  {
    title: "Mortgage Calculator Guide: Payments, PMI & Amortization",
    desc: "PITI, $240k example, amortization, 15-vs-30, refinance, India EMI + rent-vs-buy.",
    label: "Mortgage Guide",
    date: "2026-09-24",
    href: "/blog/mortgage-calculator-guide",
  },
  {
    title: "Free Resume Builder Guide: Build a Job-Winning Resume Fast",
    desc: "Sections, fresher vs experienced, ATS rules, India/US/UK formats + PDF export.",
    label: "Resume Guide",
    date: "2026-09-23",
    href: "/blog/resume-builder-guide",
  },
  {
    title: "Free QR Code Generator Guide: Create Scannable QR Codes Fast",
    desc: "WiFi, UPI, menus, vCards, and print sizes that scan.",
    label: "QR Code Guide",
    date: "2026-09-22",
    href: "/blog/qr-code-generator-guide",
  },
  {
    title: "Free Invoice Generator Guide: Create Professional Invoices Fast",
    desc: "What to include, GST rules, and PDF export with no signup.",
    label: "Invoice Guide",
    date: "2026-09-18",
    href: "/blog/invoice-generator-guide",
  },
];

// Popular posts — evergreen high-intent clusters (traffic drivers, not newest).
// Sorted by search intent: ATS jobs, QR payments, home loans, GST, word count.
export const POPULAR_GUIDES: Guide[] = [
  {
    title: "ATS-Friendly Resume: Beat Applicant Tracking Software (2026)",
    desc: "How parsers read, 80% keyword target + 5-minute pre-application loop.",
    label: "Resume Guide",
    date: "2026-09-23",
    href: "/blog/resume-builder-guide/ats-resume-guide",
  },
  {
    title: "UPI QR Code for Payments: Setup, Counter Tips & Safety (India)",
    desc: "Fixed vs open amount, lamination, and fraud checks.",
    label: "QR Code Guide",
    date: "2026-09-22",
    href: "/blog/qr-code-generator-guide/upi-payment-qr-code-india",
  },
  {
    title: "Static vs Dynamic QR Codes: Which to Choose (Honest Guide)",
    desc: "When free static wins and when paid dynamic earns it.",
    label: "QR Code Guide",
    date: "2026-09-22",
    href: "/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes",
  },
  {
    title: "Home Loan EMI & Eligibility India: CIBIL, FOIR, Prepayment (2026)",
    desc: "CIBIL 750+, FOIR 50%, zero-penalty prepayment + bank comparison.",
    label: "Mortgage Guide",
    date: "2026-09-24",
    href: "/blog/mortgage-calculator-guide/home-loan-emi-eligibility-india",
  },
  {
    title: "GST Invoice Format India: Mandatory Fields, HSN & Sample (2026)",
    desc: "CGST/SGST vs IGST split, GSTIN, HSN codes + freelancers sample.",
    label: "Invoice Guide",
    date: "2026-09-18",
    href: "/blog/invoice-generator-guide/gst-invoice-format-india",
  },
  {
    title: "How to Count Words Online Free (No Signup)",
    desc: "Paste 1,500 words, get count + reading time at 200 WPM instantly.",
    label: "Word Count Guide",
    date: "2026-09-26",
    href: "/blog/word-counter-guide/how-to-count-words-online",
  },
];

export const FAQS: Faq[] = [
  {
    q: "What is Tool4SaaS?",
    a: "Tool4SaaS is a free set of web utilities that run in your browser. You can count words, make codes, format text, and plan money with ease. Most jobs run on your device, so they are fast and private.",
  },
  {
    q: "Is Tool4SaaS free?",
      a: "Yes. Every tool is free to use with no cost and no paywall. You can open any tool, maker, or generator as often as you like each day.",
  },
  {
    q: "Do I need to sign up?",
    a: "No. You do not need an account or signup to use any tool. Just open the page and start your job right away. There are no forms or passwords.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Most tools run local-first, so your text and files stay on your device. Only 4 tools need the internet for live facts: currency rates, YouTube thumbnails, SSL check, and voice input. See our privacy policy for details.",
  },
  {
    q: "Which popular tools should I try first?",
    a: "Top picks are invoice generator for client bills, QR code generator for menus and links, JSON formatter for code checks, word counter for essays, PDF merge for files, and mortgage calculator for home loans.",
  },
  {
    q: "How are tools tested?",
    a: "We build and test every tool in-house. We check outputs against known values, for example a $100,000 loan at 5 percent over 30 years equals $536.82 monthly. See our methodology page for the full process.",
  },
  {
    q: "How do I use tools offline?",
    a: "Open the tool once while online and keep the tab open. Most tools then work without internet because they run locally. Your files stay on your device always.",
  },
  {
    q: "How do I request a new tool?",
    a: "Send your idea through our contact page. Tell us the job to be done and what result you want to see. We review top requests each month and build free private tools first.",
  },
];
