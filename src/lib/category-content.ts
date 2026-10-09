// Category editorial copy (extracted from src/app/category/[id]/page.tsx).
// Single source for AdSense content-depth intros + per-category FAQ bodies.
// Counts here must match src/lib/tools/data/*.ts slug counts (185 tools total).

export type CategoryIntro = {
  body: string;
  picks: { slug: string; label: string }[];
  faqSlug: string;
  faqLabel: string;
};

export type CategoryFaqItem = {
  text: string;
  linkSlug: string;
  linkLabel: string;
};

// AdSense content-depth intros: one unique 80-120 word intro per category,
// each naming its top-3 tools with a worked example. Rendered below instead
// of the short catalogue description (which stays in metadata + JSON-LD).
export const CATEGORY_INTROS: Record<string, CategoryIntro> = {
  "text-documents": {
    body: "Draft, clean, and compare everyday writing with 19 browser-based utilities that never upload your text. Start with the word counter to hit targets like a 1,500-word essay or a 280-character post, then fix headings with the case converter across 500 lines at once. The text diff highlights every changed word between two drafts, catching edits a quick skim misses. For example, paste 2,000 words to see reading time near 10 minutes alongside keyword hits. Each tool page answers common questions in its FAQ and everything runs offline after load.",
    picks: [
      { slug: "word-counter", label: "Word Counter" },
      { slug: "case-converter", label: "Case Converter" },
      { slug: "text-diff", label: "Text Diff" },
    ],
    faqSlug: "word-counter",
    faqLabel: "Word Counter FAQ",
  },
  business: {
    body: "Send invoices, build resumes, and beat keyword filters with 13 business document generators that work fully in your browser. The invoice generator totals a 10-line $550 bill with logo and tax, then prints to crisp A4 PDF. The resume builder lays out 3 roles plus skills on one ATS-friendly page, while the checker scores it near 90 percent against a 300-word posting. For example, INV-2026-001 with $500 subtotal plus 10 percent tax totals $550 exactly. Each tool page answers common questions in its FAQ, with no sign-up or upload.",
    picks: [
      { slug: "invoice-generator", label: "Invoice Generator" },
      { slug: "resume-builder", label: "Resume Builder" },
      { slug: "ats-resume-checker", label: "ATS Resume Checker" },
    ],
    faqSlug: "invoice-generator",
    faqLabel: "Invoice Generator FAQ",
  },
  developer: {
    body: "Debug APIs, patterns, and tokens with 30 developer utilities that run 100 percent locally, so secrets never leave your device. The JSON formatter pretty-prints a 500 KB response and points to exact line-column errors like a missing comma at 1:18. The regex tester highlights matches for digit patterns across sample logs, while the JWT decoder exposes expiry claims instantly. For example, formatting a 10,000-line payload takes a blink, and minifying cuts bytes by roughly 20 percent. Each tool page answers common questions in its FAQ, free and offline.",
    picks: [
      { slug: "json-formatter", label: "JSON Formatter" },
      { slug: "regex-tester", label: "Regex Tester" },
      { slug: "jwt-decoder", label: "JWT Decoder" },
    ],
    faqSlug: "json-formatter",
    faqLabel: "JSON Formatter FAQ",
  },
  converters: {
    body: "Translate between units, currencies, and data formats with 13 offline converters in one click. The unit converter turns 100 km into 62.1 miles and 0°C into 32°F with exact factors. The currency converter tracks 150-plus currencies with live rates plus an offline fallback, so 100 USD to EUR works anywhere. The JSON-CSV tool maps a 1,000-row array to spreadsheet columns instantly. For example, 1 kg equals 2.205 lb and a 2-item JSON list becomes a 2-row sheet. Each tool page answers common questions in its FAQ, private by design.",
    picks: [
      { slug: "unit-converter", label: "Unit Converter" },
      { slug: "currency-converter", label: "Currency Converter" },
      { slug: "json-csv", label: "JSON-CSV Converter" },
    ],
    faqSlug: "unit-converter",
    faqLabel: "Unit Converter FAQ",
  },
  generators: {
    body: "Create passwords, IDs, and game randomness with 13 privacy-friendly generators powered by your browser crypto engine. The password generator builds 20-character logins with about 131 bits of entropy that resist brute force. The UUID tool mints 500 v4 IDs per batch for database seeding, while the dice roller totals 2d6 like 4 plus 6 equals 10. For example, 16 characters from 94 symbols give about 105 bits of protection. Each tool page answers common questions in its FAQ, with nothing uploaded ever.",
    picks: [
      { slug: "password-generator", label: "Password Generator" },
      { slug: "uuid-generator", label: "UUID Generator" },
      { slug: "dice-roller", label: "Dice Roller" },
    ],
    faqSlug: "password-generator",
    faqLabel: "Password Generator FAQ",
  },
  "images-design": {
    body: "Design faster with 23 free utilities for codes, images, and color that run offline in your browser. The QR generator encodes long URLs into crisp scannable squares, while the compressor shrinks a 2 MB photo for the web without visible loss. The contrast checker verifies pairs like indigo on white against accessibility ratios before you ship. For example, a #6366F1 swatch copies in one click and resizes cleanly to any layout. Each tool page answers common questions in its FAQ, with no sign-up needed.",
    picks: [
      { slug: "qr-code-generator", label: "QR Code Generator" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "color-contrast", label: "Color Contrast Checker" },
    ],
    faqSlug: "qr-code-generator",
    faqLabel: "QR Code Generator FAQ",
  },
  pdf: {
    body: "Handle everyday PDF jobs with a focused set of offline utilities that keep documents on your device. Convert JPG or PNG pages into a single PDF, merge 5 reports into one file, or split a 40-page deck into exact ranges. For example, 10 photos become one shareable PDF in seconds, and a 12 MB file stays private throughout because files process locally start to finish. Each tool page answers common questions in its FAQ, free with no uploads or accounts.",
    picks: [
      { slug: "image-to-pdf", label: "Image to PDF" },
      { slug: "pdf-merge", label: "PDF Merge" },
      { slug: "pdf-split", label: "PDF Split" },
    ],
    faqSlug: "image-to-pdf",
    faqLabel: "Image to PDF FAQ",
  },
  calculators: {
    body: "Answer everyday percent, loan, and body questions with 16 free calculators that work offline. The percentage tool turns 45 out of 60 into 75 percent in one step, while the loan calculator splits a $100,000 loan at 5 percent over 30 years into $536.82 monthly. The BMI checker converts 70 kg at 175 cm into 22.9 with clear ranges. For example, a 20 percent tip on $85 is $17 exactly. Each tool page answers common questions in its FAQ, with no sign-up or limits.",
    picks: [
      { slug: "percentage-calculator", label: "Percentage Calculator" },
      { slug: "loan-calculator", label: "Loan Calculator" },
      { slug: "bmi-calculator", label: "BMI Calculator" },
    ],
    faqSlug: "percentage-calculator",
    faqLabel: "Percentage Calculator FAQ",
  },
  finance: {
    body: "Plan mortgages, investments, and taxes with planning calculators that are informational only, never financial advice. The mortgage tool prices a $240,000 loan at 6 percent over 30 years near $1,439 monthly with about $278,000 lifetime interest. The SIP projector grows Rs 5,000 monthly at 12 percent over 10 years toward Rs 11.5L, while the tax estimator nets a $90,000 salary near $75,400 taxable. For example, $200 extra principal monthly can save over $70,000 interest. Each tool page answers common questions in its FAQ, private and offline.",
    picks: [
      { slug: "mortgage-calculator", label: "Mortgage Calculator" },
      { slug: "sip-calculator", label: "SIP Calculator" },
      { slug: "income-tax-calculator", label: "Income Tax Calculator" },
    ],
    faqSlug: "mortgage-calculator",
    faqLabel: "Mortgage Calculator FAQ",
  },
  health: {
    body: "Estimate calories, macros, and body metrics with informational calculators that never replace medical advice — consult a professional for decisions. The calorie tool targets intake from weight, height, age, and activity, like roughly 2,200 kcal for an active 70 kg adult. The macro splitter divides that into protein, carbs, and fat grams, while body-fat trends track change over weeks. For example, 70 kg at 175 cm gives a BMI of 22.9. Each tool page answers common questions in its FAQ, private and offline.",
    picks: [
      { slug: "calorie-calculator", label: "Calorie Calculator" },
      { slug: "macro-calculator", label: "Macro Calculator" },
      { slug: "body-fat-calculator", label: "Body Fat Calculator" },
    ],
    faqSlug: "calorie-calculator",
    faqLabel: "Calorie Calculator FAQ",
  },
  seo: {
    body: "Ship search-ready pages with 8 free SEO and marketing utilities that run offline. The meta tag generator drafts titles near 60 characters with descriptions that lift click-through, while the Open Graph preview shows exactly how links unfurl on social. The sitemap builder maps hundreds of URLs for clean crawling. UTM tagging keeps campaign data clean across channels. For example, preview a 155-character description before publishing to avoid truncation. Each tool page answers common questions in its FAQ, with no sign-up or watermark.",
    picks: [
      { slug: "meta-tag-generator", label: "Meta Tag Generator" },
      { slug: "open-graph-preview", label: "Open Graph Preview" },
      { slug: "sitemap-generator", label: "Sitemap Generator" },
    ],
    faqSlug: "meta-tag-generator",
    faqLabel: "Meta Tag Generator FAQ",
  },
  time: {
    body: "Master dates, zones, and focus with 8 free time and date utilities. The age calculator turns 1990-06-15 into 36 years plus weekday and a live birthday countdown. The timezone converter moves 3:00 PM New York into 4:00 AM next-day Tokyo with DST handled, while the Pomodoro timer structures 25-minute sprints with 5-minute breaks. Countdown links share live targets with friends and teams. For example, four rounds total 100 focus minutes before a long rest. Each tool page answers common questions in its FAQ, free and offline.",
    picks: [
      { slug: "age-calculator", label: "Age Calculator" },
      { slug: "timezone-converter", label: "Timezone Converter" },
      { slug: "pomodoro-timer", label: "Pomodoro Timer" },
    ],
    faqSlug: "age-calculator",
    faqLabel: "Age Calculator FAQ",
  },
};

// Generic fallback intro (used only if a category id has no entry above).
export const FALLBACK_INTRO: CategoryIntro = {
  body: "Browse every tool in this collection below — each one runs in your browser with no sign-up, and most work fully offline with nothing uploaded. Open any card to get the interactive tool plus a 4-step guide, worked examples with real numbers, and a FAQ that answers edge cases. For example, calculator pages show exact inputs like $100,000 at 5 percent alongside expected outputs. Each tool page answers common questions in its FAQ, and our testing method is public for review.",
  picks: [
    { slug: "word-counter", label: "Word Counter" },
    { slug: "json-formatter", label: "JSON Formatter" },
    { slug: "mortgage-calculator", label: "Mortgage Calculator" },
  ],
  faqSlug: "word-counter",
  faqLabel: "Word Counter FAQ",
};

export function introForCategory(id: string): CategoryIntro {
  return CATEGORY_INTROS[id] ?? FALLBACK_INTRO;
}

// SEO title cores (~35-45ch; layout template appends " | Tool4SaaS").
// Hub pages rendered "PDF Tools | Tool4SaaS" (21ch) — too thin for SERPs.
export const CATEGORY_SEO_TITLES: Record<string, string> = {
  "text-documents": "Text Tools: Count Words, Convert Case Free",
  business: "Invoice, Resume & Quotes – 13 Free Tools",
  developer: "Developer Tools: JSON, Base64, Regex Free",
  converters: "Converters: Units, Currency, JSON-CSV Free",
  generators: "Generators: Passwords, UUIDs, Random Free",
  "images-design": "Image Tools: Compress, Resize, QR Codes",
  pdf: "PDF Tools: Merge, Split, Compress Free",
  calculators: "Calculators: Percent, Loan, BMI Free",
  finance: "Finance Calculators: Mortgage, SIP, Tax",
  health: "Health Calculators: BMI, Calorie, Macro",
  seo: "SEO Tools: Meta Tags, Sitemap Free",
  time: "Time Tools: Age, Timezone, Pomodoro Free",
};

export function seoTitleForCategory(id: string, fallbackLabel: string): string {
  return CATEGORY_SEO_TITLES[id] ?? fallbackLabel;
}

// Per-category FAQ bodies (40-60w each) reusing intro worked numbers for AEO depth.
// Each entry links one related tool where natural; visible rendering splits plain text
// by link.label so textContent stays identical to JSON-LD `a` (FAQPage 1:1).
export const CATEGORY_FAQ_CONTENT: Record<string, CategoryFaqItem[]> = {
  "text-documents": [
    {
      text: "Think of them as 19 free browser utilities for drafting and polishing writing with no signup. The Word Counter tracks a 1,500-word essay or 280-character post live, while Case Converter fixes 500 lines at once. Most run offline after load, so drafts never leave your device.",
      linkSlug: "word-counter",
      linkLabel: "Word Counter",
    },
    {
      text: "Begin with Word Counter, Case Converter, and Text Diff for the most common jobs. Paste 2,000 words to see reading time near 10 minutes plus keyword hits, then convert headings and diff two drafts word by word. Each page shows a 4-step how-to with edge cases and examples.",
      linkSlug: "case-converter",
      linkLabel: "Case Converter",
    },
    {
      text: "Absolutely — every writing tool here is free with no account, watermark, or upload. Text Diff compares two drafts locally in your browser, so sensitive copy stays on your device. Only live features need internet, and each page labels that plainly. You can clean 500 lines or check 2,000 words privately.",
      linkSlug: "text-diff",
      linkLabel: "Text Diff",
    },
    {
      text: "First open Word Counter once while online and keep that tab open for later. Most writing tools then run without internet because counting and converting happen locally on your device. Close the tab and your pasted text vanishes. No install is needed, and a 1,500-word draft still analyzes instantly.",
      linkSlug: "word-counter",
      linkLabel: "Word Counter",
    },
    {
      text: "Head to each tool page FAQ for edge cases and worked examples — start with Word Counter FAQ for limits like 280 characters and 10-minute reading time. You will find 4-step guides, 500-line conversion tips, and diff walkthroughs. See also our testing methodology and contact page for new ideas.",
      linkSlug: "word-counter",
      linkLabel: "Word Counter",
    },
  ],
  business: [
    {
      text: "They are essentially 13 free business document generators that run fully in your browser with no signup. The Invoice Generator totals a 10-line $550 bill with logo and tax, while Resume Builder fits 3 roles plus skills on one ATS-friendly page. Files never upload, and most work offline.",
      linkSlug: "invoice-generator",
      linkLabel: "Invoice Generator",
    },
    {
      text: "Kick off with Invoice Generator, Resume Builder, and ATS Resume Checker for hiring and billing jobs. Try INV-2026-001 with $500 subtotal plus 10 percent tax totaling $550 exactly, then score that resume near 90 percent against a 300-word posting. Each card below opens the free tool instantly.",
      linkSlug: "resume-builder",
      linkLabel: "Resume Builder",
    },
    {
      text: "Yes, and every business tool stays free with no account or watermark. ATS Resume Checker scores your resume near 90 percent against a 300-word posting locally, so personal details stay on your device. Only live lookups need internet, and each page says so. Print that $550 invoice to crisp A4 PDF privately.",
      linkSlug: "ats-resume-checker",
      linkLabel: "ATS Resume Checker",
    },
    {
      text: "Load once Invoice Generator while online and leave the tab open to work later. Most business tools then calculate totals locally without internet, so a 10-line $550 bill with 10 percent tax still sums correctly. Closing the tab clears your entries. No install is required for offline drafting.",
      linkSlug: "invoice-generator",
      linkLabel: "Invoice Generator",
    },
    {
      text: "Start with each tool FAQ for formatting and tax edge cases — begin with Invoice Generator FAQ showing INV-2026-001 at $500 plus 10 percent equals $550. You will see 3-role resume layouts and 90-percent matching tips. Check our testing methodology and contact page for corrections or requests.",
      linkSlug: "invoice-generator",
      linkLabel: "Invoice Generator",
    },
  ],
  developer: [
    {
      text: "In practice, they are 30 free developer utilities that run 100 percent locally so secrets never leave your device. The JSON Formatter pretty-prints a 500 KB response and flags a missing comma at 1:18, while Regex Tester highlights digit matches across logs. Most work offline after first load.",
      linkSlug: "json-formatter",
      linkLabel: "JSON Formatter",
    },
    {
      text: "Start debugging with JSON Formatter, Regex Tester, and JWT Decoder for everyday code chores. Format a 10,000-line payload in a blink, test digit patterns against sample logs, then decode expiry claims instantly. Each page includes a 4-step guide plus minification that cuts bytes by roughly 20 percent.",
      linkSlug: "regex-tester",
      linkLabel: "Regex Tester",
    },
    {
      text: "Yes — every developer tool is free with no signup and no upload, running 100 percent in your browser. JWT Decoder exposes expiry claims locally, so tokens stay private on your device. Only live fetches need internet, clearly labeled. You can safely paste a 500 KB JSON sample or 10,000 lines.",
      linkSlug: "jwt-decoder",
      linkLabel: "JWT Decoder",
    },
    {
      text: "Cache the page JSON Formatter once while online and keep the tab open afterward. Most developer tools then validate locally without internet, catching a missing comma at 1:18 or minifying by 20 percent offline. Closing the tab wipes pasted secrets. No install or account is ever needed.",
      linkSlug: "json-formatter",
      linkLabel: "JSON Formatter",
    },
    {
      text: "Dive into each tool FAQ for syntax edge cases — open JSON Formatter FAQ for fixing a missing comma at 1:18 in 500 KB files. You will find regex digit examples and JWT expiry checks plus 10,000-line performance notes. See our testing methodology and contact page for tool requests.",
      linkSlug: "json-formatter",
      linkLabel: "JSON Formatter",
    },
  ],
  converters: [
    {
      text: "At their core, they are 13 free offline converters for units, currencies, and data formats with no signup. The Unit Converter turns 100 km into 62.1 miles and 0°C into 32°F with exact factors, while Currency Converter tracks 150-plus currencies. Everything calculates locally after load.",
      linkSlug: "unit-converter",
      linkLabel: "Unit Converter",
    },
    {
      text: "Try first Unit Converter, Currency Converter, and JSON-CSV Converter for everyday swaps. Convert 100 USD to EUR with live rates plus offline fallback, map a 1,000-row array to columns instantly, and turn 1 kg into 2.205 lb. Each card below runs free with worked examples.",
      linkSlug: "currency-converter",
      linkLabel: "Currency Converter",
    },
    {
      text: "Definitely — all conversion tools are free with no account or watermark and run locally. JSON-CSV Converter maps a 1,000-row array plus a 2-item list into a 2-row sheet without uploading data. Only currency live rates need internet, clearly noted. Your 100 km to 62.1 miles stays private.",
      linkSlug: "json-csv",
      linkLabel: "JSON-CSV Converter",
    },
    {
      text: "Visit once Unit Converter while online and leave the tab open for offline use. Most converters then compute locally without internet, so 100 km to 62.1 miles and 0°C to 32°F still resolve. Closing the tab clears entries. No install is needed, though currency live rates pause offline.",
      linkSlug: "unit-converter",
      linkLabel: "Unit Converter",
    },
    {
      text: "See each tool FAQ for factors and edge cases — start with Unit Converter FAQ covering 1 kg equals 2.205 lb and 100 km to 62.1 miles. You will find 100 USD to EUR notes and 1,000-row mapping tips. Check our testing methodology and contact page for corrections or ideas.",
      linkSlug: "unit-converter",
      linkLabel: "Unit Converter",
    },
  ],
  generators: [
    {
      text: "Simply put, they are 13 privacy-friendly generators powered by your browser crypto engine with no signup. The Password Generator builds 20-character logins with about 131 bits of entropy, while UUID Generator mints 500 v4 IDs per batch. Nothing ever uploads, and most work offline.",
      linkSlug: "password-generator",
      linkLabel: "Password Generator",
    },
    {
      text: "Lead with Password Generator, UUID Generator, and Dice Roller for logins, seeding, and play. Mint 500 v4 IDs for databases, roll 2d6 like 4 plus 6 equals 10, then build 16 characters from 94 symbols for about 105 bits. Each page shows entropy notes and offline use.",
      linkSlug: "uuid-generator",
      linkLabel: "UUID Generator",
    },
    {
      text: "Completely — every generator is free with no account and runs 100 percent locally via crypto randomness. Dice Roller totals 2d6 like 4 plus 6 equals 10 on your device, so results stay private. No internet is needed after load, and 20-character passwords with 131 bits never leave.",
      linkSlug: "dice-roller",
      linkLabel: "Dice Roller",
    },
    {
      text: "Open the page Password Generator once while online and keep the tab ready. Most generators then work offline because crypto happens locally, so 16 characters from 94 symbols still give about 105 bits without internet. Closing the tab discards results. No install or signup is required.",
      linkSlug: "password-generator",
      linkLabel: "Password Generator",
    },
    {
      text: "Read each tool FAQ for entropy and fairness details — begin with Password Generator FAQ explaining 20 characters deliver about 131 bits and 16 characters about 105 bits. You will see 500-ID batch tips and 2d6 examples like 10. See testing methodology and contact for requests.",
      linkSlug: "password-generator",
      linkLabel: "Password Generator",
    },
  ],
  "images-design": [
    {
      text: "Picture them as 23 free utilities for codes, images, and color that run offline with no signup. The QR Code Generator encodes long URLs into crisp scannable squares, while Image Compressor shrinks a 2 MB photo without visible loss. Color tools copy a #6366F1 swatch in one click.",
      linkSlug: "qr-code-generator",
      linkLabel: "QR Code Generator",
    },
    {
      text: "Open with QR Code Generator, Image Compressor, and Color Contrast Checker for shipping designs. Shrink a 2 MB photo for the web, verify indigo on white against accessibility ratios, then encode long URLs cleanly. Each page shows one-click copy like #6366F1 plus resizing guidance.",
      linkSlug: "image-compressor",
      linkLabel: "Image Compressor",
    },
    {
      text: "Yes. Every design tool is free with no watermark and processes files locally in your browser. Color Contrast Checker verifies pairs like indigo on white before you ship, so palettes stay private. Only font or stock fetches need internet, labeled clearly. Resizing that #6366F1 swatch stays instant.",
      linkSlug: "color-contrast",
      linkLabel: "Color Contrast Checker",
    },
    {
      text: "Preload once QR Code Generator while online and keep the tab open afterward. Most design tools then run offline because rendering happens locally, so a 2 MB photo still compresses and #6366F1 still copies. Closing the tab clears uploads. No install is needed for private editing.",
      linkSlug: "qr-code-generator",
      linkLabel: "QR Code Generator",
    },
    {
      text: "Browse each tool FAQ for export and accessibility tips — try QR Code Generator FAQ for encoding long URLs into scannable squares. You will find 2 MB compression guidance and indigo-on-white ratio checks plus #6366F1 copying. See our testing methodology and contact page for ideas.",
      linkSlug: "qr-code-generator",
      linkLabel: "QR Code Generator",
    },
  ],
  pdf: [
    {
      text: "Basically, they are focused offline utilities that keep documents on your device with no signup. The Image to PDF tool turns 10 photos into one shareable PDF in seconds, while PDF Merge joins 5 reports into one file. A 12 MB file stays private throughout because processing is local.",
      linkSlug: "image-to-pdf",
      linkLabel: "Image to PDF",
    },
    {
      text: "Tackle first Image to PDF, PDF Merge, and PDF Split for everyday document jobs. Merge 5 reports into one file, split a 40-page deck into exact ranges, or turn 10 photos into one PDF in seconds. Each page explains local processing with no uploads and free use.",
      linkSlug: "pdf-merge",
      linkLabel: "PDF Merge",
    },
    {
      text: "Yep — every PDF tool is free with no account or watermark and runs locally. PDF Split divides a 40-page deck into exact ranges on your device, so pages never upload. A 12 MB file stays private start to finish. Only help pages need internet, and each tool states that plainly.",
      linkSlug: "pdf-split",
      linkLabel: "PDF Split",
    },
    {
      text: "Because PDFs stay local, open Image to PDF once while online and keep the tab. Most PDF jobs then run offline, turning 10 photos into one PDF or merging 5 reports without internet. A 12 MB file never leaves your device. Close the tab and your files vanish; no install needed.",
      linkSlug: "image-to-pdf",
      linkLabel: "Image to PDF",
    },
    {
      text: "Open each tool FAQ for limits and quality notes — start with Image to PDF FAQ on turning 10 photos into one PDF in seconds. You will see how 5-report merges and 40-page splits preserve layout privately. Check testing methodology and contact page for corrections or new-tool ideas.",
      linkSlug: "image-to-pdf",
      linkLabel: "Image to PDF",
    },
  ],
  calculators: [
    {
      text: "In short, they are 16 free calculators for everyday percent, loan, and body questions with no signup. The Percentage Calculator turns 45 out of 60 into 75 percent, while Loan Calculator splits $100,000 at 5 percent into $536.82 monthly. Most run offline after load.",
      linkSlug: "percentage-calculator",
      linkLabel: "Percentage Calculator",
    },
    {
      text: "Work through Percentage Calculator, Loan Calculator, and BMI Calculator for the most useful math. Split a $100,000 loan at 5 percent over 30 years into $536.82 monthly, convert 70 kg at 175 cm into 22.9 BMI, and confirm a 20 percent tip on $85 equals $17. Each page shows steps.",
      linkSlug: "loan-calculator",
      linkLabel: "Loan Calculator",
    },
    {
      text: "Yes, fully free with no account, watermark, or limits, running locally in your browser. BMI Calculator turns 70 kg at 175 cm into 22.9 with clear ranges privately, so inputs never upload. Only help articles need internet. You can also recheck 45 out of 60 as 75 percent offline.",
      linkSlug: "bmi-calculator",
      linkLabel: "BMI Calculator",
    },
    {
      text: "To work offline, open Percentage Calculator once while online and keep the tab open. Most calculators then compute locally without internet, so 45 out of 60 still gives 75 percent and $100,000 at 5 percent still shows $536.82. Closing the tab clears entries. No install is needed.",
      linkSlug: "percentage-calculator",
      linkLabel: "Percentage Calculator",
    },
    {
      text: "Visit each tool FAQ for formulas and edge cases — begin with Percentage Calculator FAQ on turning 45 out of 60 into 75 percent and $85 tips into $17. You will find $100,000 loan splits at $536.82 and 22.9 BMI notes. See testing methodology and contact for help.",
      linkSlug: "percentage-calculator",
      linkLabel: "Percentage Calculator",
    },
  ],
  finance: [
    {
      text: "Treat them as informational planning calculators for mortgages, investments, and taxes, never financial advice. The Mortgage Calculator prices a $240,000 loan at 6 percent over 30 years near $1,439 monthly with about $278,000 interest. SIP and tax tools add Rs 5,000 and $90,000 examples privately offline.",
      linkSlug: "mortgage-calculator",
      linkLabel: "Mortgage Calculator",
    },
    {
      text: "Model first Mortgage Calculator, SIP Calculator, and Income Tax Calculator for big money questions. Price $240,000 at 6 percent near $1,439 monthly, grow Rs 5,000 monthly at 12 percent over 10 years toward Rs 11.5L, and net $90,000 near $75,400 taxable. Each page labels estimates clearly.",
      linkSlug: "sip-calculator",
      linkLabel: "SIP Calculator",
    },
    {
      text: "Yes, with a caveat — every finance tool is free with no signup and runs locally, but results are estimates only. Income Tax Calculator nets a $90,000 salary near $75,400 taxable on your device without uploading. Only guidance pages need internet. Consult a professional before borrowing $240,000 at 6 percent.",
      linkSlug: "income-tax-calculator",
      linkLabel: "Income Tax Calculator",
    },
    {
      text: "For offline planning, open Mortgage Calculator once while online and keep the tab. Most finance math then runs locally without internet, so $240,000 at 6 percent still shows near $1,439 and $200 extra still saves over $70,000 interest. Closing clears inputs. Estimates never replace professional advice.",
      linkSlug: "mortgage-calculator",
      linkLabel: "Mortgage Calculator",
    },
    {
      text: "Review each tool FAQ for assumptions and limits — start with Mortgage Calculator FAQ on $240,000 at 6 percent near $1,439 with $278,000 lifetime interest. You will see Rs 5,000 SIP paths to Rs 11.5L and $90,000 tax notes. See testing methodology and contact for corrections.",
      linkSlug: "mortgage-calculator",
      linkLabel: "Mortgage Calculator",
    },
  ],
  health: [
    {
      text: "Essentially, they are informational calculators for calories, macros, and body metrics, never medical advice. The Calorie Calculator targets roughly 2,200 kcal for an active 70 kg adult from weight, height, age, and activity. Macro tools then split that into protein, carbs, and fat grams privately.",
      linkSlug: "calorie-calculator",
      linkLabel: "Calorie Calculator",
    },
    {
      text: "Check first Calorie Calculator, Macro Calculator, and Body Fat Calculator for everyday wellness estimates. Target about 2,200 kcal for an active 70 kg adult, split it into protein, carbs, and fat grams, then track body-fat trends over weeks. Each page explains ranges and professional-consult reminders.",
      linkSlug: "macro-calculator",
      linkLabel: "Macro Calculator",
    },
    {
      text: "Yes, with care — all health tools are free with no signup and calculate locally so data stays private. Body Fat Calculator tracks change over weeks on your device without uploading weight history. Only articles need internet. Remember 70 kg at 175 cm gives BMI 22.9, still just an estimate.",
      linkSlug: "body-fat-calculator",
      linkLabel: "Body Fat Calculator",
    },
    {
      text: "To keep data private, open Calorie Calculator once while online and leave the tab open. Most health math then runs offline locally, so 70 kg at 175 cm still yields BMI 22.9 and 2,200 kcal targets still show. Closing the tab erases entries. No install is needed; consult professionals for decisions.",
      linkSlug: "calorie-calculator",
      linkLabel: "Calorie Calculator",
    },
    {
      text: "Look at each tool FAQ for healthy ranges and limits — begin with Calorie Calculator FAQ on 2,200 kcal for an active 70 kg adult. You will see macro gram splits and 22.9 BMI context at 70 kg, 175 cm. Check testing methodology and contact page for feedback or corrections.",
      linkSlug: "calorie-calculator",
      linkLabel: "Calorie Calculator",
    },
  ],
  seo: [
    {
      text: "For most teams, they are 8 free SEO and marketing utilities that run offline with no signup. The Meta Tag Generator drafts titles near 60 characters with descriptions that lift clicks, while Open Graph Preview shows social unfurls. Sitemap Builder maps hundreds of URLs for clean crawling.",
      linkSlug: "meta-tag-generator",
      linkLabel: "Meta Tag Generator",
    },
    {
      text: "Audit first Meta Tag Generator, Open Graph Preview, and Sitemap Generator before publishing. Draft a 60-character title, preview a 155-character description to avoid truncation, then map hundreds of URLs for crawlers. Add UTM tagging to keep campaign data clean across every channel.",
      linkSlug: "open-graph-preview",
      linkLabel: "Open Graph Preview",
    },
    {
      text: "Yes — every SEO tool is free with no account or watermark and runs 100 percent locally. Sitemap Generator maps hundreds of URLs on your device without uploading drafts, so titles stay private. Only preview fetches need internet, labeled plainly. Your 60-character titles and 155-character descriptions remain yours.",
      linkSlug: "sitemap-generator",
      linkLabel: "Sitemap Generator",
    },
    {
      text: "Since most run locally, open Meta Tag Generator once while online and keep the tab. Most SEO helpers then work offline, drafting 60-character titles and 155-character descriptions without internet. Closing clears inputs. No install is needed, though live URL previews pause until you reconnect.",
      linkSlug: "meta-tag-generator",
      linkLabel: "Meta Tag Generator",
    },
    {
      text: "Check each tool FAQ for length limits and tagging help — start with Meta Tag Generator FAQ on 60-character titles and 155-character descriptions. You will find Open Graph unfurl tips, hundreds-URL sitemap notes, and UTM hygiene. See testing methodology and contact page for requests.",
      linkSlug: "meta-tag-generator",
      linkLabel: "Meta Tag Generator",
    },
  ],
  time: [
    {
      text: "You can think of them as 8 free time and date utilities with no signup. The Age Calculator turns 1990-06-15 into 36 years plus weekday and a live birthday countdown, while Timezone Converter moves 3:00 PM New York to 4:00 AM next-day Tokyo with DST. Focus timers need no install.",
      linkSlug: "age-calculator",
      linkLabel: "Age Calculator",
    },
    {
      text: "Plan first Age Calculator, Timezone Converter, and Pomodoro Timer for dates, zones, and focus. Convert 3:00 PM New York to 4:00 AM Tokyo next day, turn 1990-06-15 into 36 years, then run 25-minute sprints with 5-minute breaks. Four rounds total 100 focus minutes before a long rest.",
      linkSlug: "timezone-converter",
      linkLabel: "Timezone Converter",
    },
    {
      text: "Yep, they are fully free with no account and run locally in your browser. Pomodoro Timer structures 25-minute sprints with 5-minute breaks on your device, so focus logs stay private. Only shareable countdown links need internet. Your 1990-06-15 age math and Tokyo conversions never upload.",
      linkSlug: "pomodoro-timer",
      linkLabel: "Pomodoro Timer",
    },
    {
      text: "Keep the tab Age Calculator open after one online load to use it offline. Most time math then runs locally without internet, so 1990-06-15 still yields 36 years and 25-minute sprints still tick. Countdown sharing needs internet, but timers do not. Closing the tab clears custom targets.",
      linkSlug: "age-calculator",
      linkLabel: "Age Calculator",
    },
    {
      text: "Explore each tool FAQ for DST and formatting edge cases — open Age Calculator FAQ on 1990-06-15 to 36 years with weekday and countdown. You will see 3:00 PM to 4:00 AM Tokyo shifts and 4-round, 100-minute Pomodoro plans. Check testing methodology and contact for ideas.",
      linkSlug: "age-calculator",
      linkLabel: "Age Calculator",
    },
  ],
};

export const FALLBACK_FAQ_CONTENT: CategoryFaqItem[] = [
  {
    text: "Think of this collection as free browser tools that run locally with no signup. Word Counter checks a 1,500-word draft, JSON Formatter fixes a missing comma at 1:18, and Mortgage Calculator prices $100,000 at 5 percent. Most work offline after load with nothing uploaded.",
    linkSlug: "word-counter",
    linkLabel: "Word Counter",
  },
  {
    text: "Begin with Word Counter, JSON Formatter, and Mortgage Calculator for common jobs. Each page shows a 4-step how-to plus worked numbers like $100,000 at 5 percent alongside expected outputs. Open any card below to run the tool free in your browser today with guides.",
    linkSlug: "json-formatter",
    linkLabel: "JSON Formatter",
  },
  {
    text: "Yes — every tool here is free with no account, watermark, or upload. Most run 100 percent locally in your browser, so inputs stay on your device. Only live-data tools need internet, and each page says so plainly. Your $100,000 samples and 500 KB pastes stay private.",
    linkSlug: "mortgage-calculator",
    linkLabel: "Mortgage Calculator",
  },
  {
    text: "Open the tool once while online and keep the tab open for offline use. Most tools then run without internet because math happens locally on your device. Close the tab and your data is gone. No install is needed, and $100,000 at 5 percent still calculates.",
    linkSlug: "word-counter",
    linkLabel: "Word Counter",
  },
  {
    text: "Head to each tool FAQ for edge cases and worked examples — start with Word Counter FAQ for writing limits. You will find JSON formatting tips and $100,000 calculator checks. See also our testing methodology and contact page for requests, corrections, and new tool ideas.",
    linkSlug: "word-counter",
    linkLabel: "Word Counter",
  },
];

export function faqContentForCategory(id: string): CategoryFaqItem[] {
  return CATEGORY_FAQ_CONTENT[id] ?? FALLBACK_FAQ_CONTENT;
}
