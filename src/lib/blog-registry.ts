import type { BlogPost, BlogPillarMeta } from "@/lib/blog";
import { isNoindexCluster } from "@/lib/blog/noindex";
import { invoicePillar } from "@/content/blog/invoice-pillar";
import { invoiceHowToCreate } from "@/content/blog/invoice-c1-how-to-create";
import { invoiceGstFormat } from "@/content/blog/invoice-c2-gst-format";
import { invoiceFreelancer } from "@/content/blog/invoice-c3-freelancer";
import { invoiceSmallBusiness } from "@/content/blog/invoice-c4-small-business";
import { invoiceTemplates } from "@/content/blog/invoice-c5-templates";
import { invoiceVsDocs } from "@/content/blog/invoice-c6-vs-docs";
import { invoiceNumbering } from "@/content/blog/invoice-c7-numbering";
import { invoicePaymentTerms } from "@/content/blog/invoice-c8-payment-terms";
import { invoiceMistakes } from "@/content/blog/invoice-c9-mistakes";
import { qrPillar } from "@/content/blog/qr-pillar";
import { qrHowToCreate } from "@/content/blog/qr-c1-how-to-create";
import { qrWifi } from "@/content/blog/qr-c2-wifi";
import { qrBusiness } from "@/content/blog/qr-c3-business";
import { qrVsBarcode } from "@/content/blog/qr-c4-vs-barcode";
import { qrSizePrint } from "@/content/blog/qr-c5-size-print";
import { qrNotScanning } from "@/content/blog/qr-c6-not-scanning";
import { qrVcard } from "@/content/blog/qr-c7-vcard";
import { qrUpi } from "@/content/blog/qr-c8-upi";
import { qrStaticDynamic } from "@/content/blog/qr-c9-static-dynamic";
import { resumePillar } from "@/content/blog/resume-pillar";
import { resumeHowTo } from "@/content/blog/resume-c1-how-to";
import { resumeFormat } from "@/content/blog/resume-c2-format";
import { resumeAts } from "@/content/blog/resume-c3-ats";
import { resumeFresher } from "@/content/blog/resume-c4-fresher";
import { resumeExperienced } from "@/content/blog/resume-c5-experienced";
import { resumeVsCv } from "@/content/blog/resume-c6-vs-cv";
import { resumeCoverLetter } from "@/content/blog/resume-c7-cover-letter";
import { resumeMistakes } from "@/content/blog/resume-c8-mistakes";
import { resumeOfferLetter } from "@/content/blog/resume-c9-offer-letter";
import { mortgagePillar } from "@/content/blog/mortgage-pillar";
import { mortgageHowTo } from "@/content/blog/mortgage-c1-how-to";
import { mortgageAfford } from "@/content/blog/mortgage-c2-afford";
import { mortgageTerm } from "@/content/blog/mortgage-c3-term";
import { mortgageRefi } from "@/content/blog/mortgage-c4-refi";
import { mortgageOverpay } from "@/content/blog/mortgage-c5-overpay";
import { mortgageIndia } from "@/content/blog/mortgage-c6-india";
import { mortgageAmort } from "@/content/blog/mortgage-c7-amort";
import { mortgageDown } from "@/content/blog/mortgage-c8-down";
import { mortgageRentBuy } from "@/content/blog/mortgage-c9-rentbuy";
import { passwordPillar } from "@/content/blog/password-pillar";
import { passwordHowTo } from "@/content/blog/password-c1-how-to";
import { passwordStrong } from "@/content/blog/password-c2-strong";
import { passwordTester } from "@/content/blog/password-c3-tester";
import { passwordPassphrase } from "@/content/blog/password-c4-passphrase";
import { passwordRemember } from "@/content/blog/password-c5-remember";
import { passwordIdeas } from "@/content/blog/password-c6-ideas";
import { passwordBreach } from "@/content/blog/password-c7-breach";
import { passwordMfa } from "@/content/blog/password-c8-mfa";
import { passwordWifi } from "@/content/blog/password-c9-wifi";
import { wordPillar } from "@/content/blog/word-pillar";
import { wordHowTo } from "@/content/blog/word-c1-how-to";
import { wordLength } from "@/content/blog/word-c2-length";
import { wordFlesch } from "@/content/blog/word-c3-flesch";
import { wordDensity } from "@/content/blog/word-c4-density";
import { wordSummarize } from "@/content/blog/word-c5-summarize";
import { wordLorem } from "@/content/blog/word-c6-lorem";
import { wordTyping } from "@/content/blog/word-c7-typing";
import { wordGrammar } from "@/content/blog/word-c8-grammar";
import { wordTts } from "@/content/blog/word-c9-tts";
import { imagePillar } from "@/content/blog/image-pillar";
import { imagePortal100kb } from "@/content/blog/image-c1-portal-100kb";
import { imageFormats } from "@/content/blog/image-c2-formats";
import { imageResize } from "@/content/blog/image-c3-resize";
import { imageWebp } from "@/content/blog/image-c4-webp";
import { imageSvg } from "@/content/blog/image-c5-svg";
import { imageExif } from "@/content/blog/image-c6-exif";
import { imageSeo } from "@/content/blog/image-c7-seo";
import { imageCrop } from "@/content/blog/image-c8-crop";
import { pdfPillar } from "@/content/blog/pdf-pillar";
import { pdfMergeOrder } from "@/content/blog/pdf-c1-merge-order";
import { pdfScansPdf } from "@/content/blog/pdf-c2-scans-pdf";
import { pdfExtractRange } from "@/content/blog/pdf-c3-extract-range";
import { pdfCompress1mb } from "@/content/blog/pdf-c4-compress-1mb";
import { pdfPagesJpg } from "@/content/blog/pdf-c5-pages-jpg";
import { pdfRotateFix } from "@/content/blog/pdf-c6-rotate-fix";
import { pdfWatermarkDraft } from "@/content/blog/pdf-c7-watermark-draft";
import { pdfTextOcr } from "@/content/blog/pdf-c8-text-ocr";
import { jsonPillar } from "@/content/blog/json-pillar";
import { jsonParseErrors } from "@/content/blog/json-c1-parse-errors";
import { base64Modes } from "@/content/blog/json-c2-base64-modes";
import { hashCompare } from "@/content/blog/json-c3-hash-compare";
import { uuidSeed } from "@/content/blog/json-c4-uuid-seed";
import { regexFlags } from "@/content/blog/json-c5-regex-flags";
import { jwtExpiry } from "@/content/blog/json-c6-jwt-expiry";
import { urlEncoding } from "@/content/blog/json-c7-url-encoding";
import { seoPillar } from "@/content/blog/seo-pillar";
import { seoFixScore } from "@/content/blog/seo-c1-fix-score";
import { seoTitleLength } from "@/content/blog/seo-c2-title-length";
import { seoSplitSitemap } from "@/content/blog/seo-c3-split-sitemap";
import { seoRobotsNoindex } from "@/content/blog/seo-c4-robots-noindex";
import { seoStaleOg } from "@/content/blog/seo-c5-stale-og";
import { seoUtmNaming } from "@/content/blog/seo-c6-utm-naming";
import { seoAiFalsePositive } from "@/content/blog/seo-c7-ai-false-positive";
import { seoGeoChecklist } from "@/content/blog/seo-c8-geo-checklist";
import { wealthPillar } from "@/content/blog/wealth-pillar";
import { sipGrowth } from "@/content/blog/wealth-c1-sip-5000";
import { lumpSumFreq } from "@/content/blog/wealth-c2-lumpsum-frequency";
import { fdTds } from "@/content/blog/wealth-c3-fd-tds";
import { ppfExtend } from "@/content/blog/wealth-c4-ppf-extend";
import { taxRegime } from "@/content/blog/wealth-c5-tax-regime";
import { realReturn } from "@/content/blog/wealth-c6-real-return";
import { sipCrore } from "@/content/blog/wealth-c7-sip-crore";
import { ltcgFd } from "@/content/blog/wealth-c8-ltcg-fd";
import { wealthBudgetVerdict } from "@/content/blog/wealth-c9-budget-verdict";
import { percentagePillar } from "@/content/blog/percentage-pillar";
import { percentagePercentBasics } from "@/content/blog/percentage-c1-percent-basics";
import { percentageIncreaseDecrease } from "@/content/blog/percentage-c2-increase-decrease";
import { percentageDiscountSale } from "@/content/blog/percentage-c3-discount-sale-price";
import { percentageMarkupMargin } from "@/content/blog/percentage-c4-markup-margin";
import { percentageDifference } from "@/content/blog/percentage-c5-percentage-difference";
import { percentageReverse } from "@/content/blog/percentage-c6-reverse-percentage";
import { percentageError } from "@/content/blog/percentage-c7-percentage-error";
import { percentagePoints } from "@/content/blog/percentage-c8-percentage-points";
import { bmiPillar } from "@/content/blog/bmi-pillar";
import { bmiHowItWorks } from "@/content/blog/bmi-c1-how-bmi-works";
import { bmiWomen } from "@/content/blog/bmi-c2-bmi-women";
import { bmiMen } from "@/content/blog/bmi-c3-bmi-men";
import { bmiHealthyWeight } from "@/content/blog/bmi-c4-healthy-weight-range";
import { bmiCalorieDeficit } from "@/content/blog/bmi-c5-calorie-deficit";
import { bmiWaterIntake } from "@/content/blog/bmi-c6-water-intake";
import { bmiAthletes } from "@/content/blog/bmi-c7-bmi-athletes";
import { bmiChildren } from "@/content/blog/bmi-c8-bmi-children";
import { agePillar } from "@/content/blog/age-pillar";
import { ageExact } from "@/content/blog/age-c1-calculate-exact-age";
import { ageDifference } from "@/content/blog/age-c2-age-difference";
import { ageDateDifference } from "@/content/blog/age-c3-date-difference";
import { ageTimezone } from "@/content/blog/age-c4-timezone-conversion";
import { ageTimestamp } from "@/content/blog/age-c5-unix-timestamp";
import { ageLeapYear } from "@/content/blog/age-c6-leap-year-birthdays";
import { ageDateAddSubtract } from "@/content/blog/age-c7-date-add-subtract";
import { ageInDays } from "@/content/blog/age-c8-age-in-days";
import { invoiceProforma } from "@/content/blog/invoice-c10-proforma-invoice";
import { invoiceCreditNote } from "@/content/blog/invoice-c11-credit-note";
import { invoiceInternational } from "@/content/blog/invoice-c12-international";
import { qrGoogleReviews } from "@/content/blog/qr-c10-google-reviews";
import { qrRestaurantMenu } from "@/content/blog/qr-c11-restaurant-menu";
import { qrGoogleForms } from "@/content/blog/qr-c12-google-forms";
import { resumeSummaryExamples } from "@/content/blog/resume-c10-summary-examples";
import { resumeSkillsSection } from "@/content/blog/resume-c11-skills-section";
import { resumeCareerChange } from "@/content/blog/resume-c12-career-change";
import { image20kb } from "@/content/blog/image-c9-20kb";
import { image200kb } from "@/content/blog/image-c10-200kb";
import { imageInstagramResize } from "@/content/blog/image-c11-instagram";
import { signaturePillar } from "@/content/blog/signature-pillar";
import { signatureCreate } from "@/content/blog/signature-c1-create";
import { signatureTransparentPng } from "@/content/blog/signature-c2-transparent-png";
import { signatureSize } from "@/content/blog/signature-c3-size";
import { signatureDrawnVsTyped } from "@/content/blog/signature-c4-drawn-vs-typed";
import { signatureSignPdf } from "@/content/blog/signature-c5-sign-pdf";
import { signatureEmail } from "@/content/blog/signature-c6-email";
import { signatureValidity } from "@/content/blog/signature-c7-validity";
import { signatureExamForms } from "@/content/blog/signature-c8-exam-forms";
import { debtPillar } from "@/content/blog/debt-pillar";
import { debtSnowballAvalanche } from "@/content/blog/debt-c1-snowball-vs-avalanche";
import { debtCreditCard } from "@/content/blog/debt-c2-credit-card";
import { debtAvalanche } from "@/content/blog/debt-c3-avalanche";
import { debtSnowball } from "@/content/blog/debt-c4-snowball";
import { debtMinimumPayments } from "@/content/blog/debt-c5-minimum-payments";
import { debtExtraPayments } from "@/content/blog/debt-c6-extra-payments";
import { debtConsolidation } from "@/content/blog/debt-c7-consolidation";
import { debtPayoffDate } from "@/content/blog/debt-c8-payoff-date";
import { gradePillar } from "@/content/blog/grade-pillar";
import { gradeWeighted } from "@/content/blog/grade-c1-weighted";
import { gradeFinalNeeded } from "@/content/blog/grade-c2-final-needed";
import { gradePercentageToGpa } from "@/content/blog/grade-c3-percentage-to-gpa";
import { gradeGpaVsCgpa } from "@/content/blog/grade-c4-gpa-vs-cgpa";
import { gradeSemesterGpa } from "@/content/blog/grade-c5-semester-gpa";
import { gradeCumulativeGpa } from "@/content/blog/grade-c6-cumulative-gpa";
import { gradeRaiseGpa } from "@/content/blog/grade-c7-raise-gpa";
import { gradeWeightedUnweighted } from "@/content/blog/grade-c8-weighted-unweighted";
import { imageJpgToPng } from "@/content/blog/image-c12-jpg-to-png";
import { pdfMergeIphone } from "@/content/blog/pdf-c9-merge-iphone";
import { pdfMergeAndroid } from "@/content/blog/pdf-c10-merge-android";
import { pdfCombineImages } from "@/content/blog/pdf-c11-pdf-and-images";
import { jsonToCsv } from "@/content/blog/json-c8-json-to-csv";
import { sqlFormatter } from "@/content/blog/json-c9-sql-formatter";
import { cronExpressions } from "@/content/blog/json-c10-cron-expressions";
import { seoMetaDescriptions } from "@/content/blog/seo-c9-meta-descriptions";
import { seoCanonical } from "@/content/blog/seo-c10-canonical-tags";
import { seoInternalLinking } from "@/content/blog/seo-c11-internal-linking";
import { wordTwitterCounter } from "@/content/blog/word-c10-twitter-counter";
import { wordPagesPer1000 } from "@/content/blog/word-c11-pages-per-1000";
import { xmlFormatter } from "@/content/blog/json-c11-xml-formatter";
import { htmlEntities } from "@/content/blog/json-c12-html-entities";
import { slugGenerator } from "@/content/blog/json-c13-slug-generator";
import { mimeType } from "@/content/blog/json-c14-mime-type";
import { csvViewer } from "@/content/blog/json-c15-csv-viewer";
import { codeMinifier } from "@/content/blog/json-c16-code-minifier";
import { textDiff } from "@/content/blog/word-c12-text-diff";
import { imageToBase64 } from "@/content/blog/image-c13-image-to-base64";
import { compoundingFrequency } from "@/content/blog/wealth-c10-compounding-frequency";
import { tipBillSplit } from "@/content/blog/percentage-c9-tip-split";
import { salesTaxPrice } from "@/content/blog/percentage-c10-sales-tax";
import { markdownPreview } from "@/content/blog/word-c13-markdown-preview";
import { wcagContrast } from "@/content/blog/image-c14-color-contrast";
import { aiTokenCost } from "@/content/blog/json-c17-ai-token-cost";

export const BLOG_PILLARS: BlogPillarMeta[] = [
  {
    pillar: "invoice-generator-guide",
    title: "Free Invoice Generator Guide: Create Professional Invoices Fast",
    shortLabel: "Invoice Guide",
    description:
      "The complete free invoice generator guide — what to include, GST rules, templates, numbering, payment terms and how to create a PDF invoice in minutes with no signup.",
    toolSlug: "invoice-generator",
    keywords: ["free invoice generator", "invoice maker", "create invoice online free", "gst invoice format", "freelancer invoice"],
    updated: "2026-09-18",
  },
  {
    pillar: "qr-code-generator-guide",
    title: "Free QR Code Generator Guide: Create Scannable QR Codes Fast",
    shortLabel: "QR Code Guide",
    description:
      "The complete free QR code generator guide — WiFi, UPI, menus, vCards, print sizing, static vs dynamic and scan fixes. No signup, no expiry.",
    toolSlug: "qr-code-generator",
    keywords: ["free qr code generator", "qr code maker", "wifi qr code", "upi qr code", "qr code size print"],
    updated: "2026-09-22",
  },
  {
    pillar: "resume-builder-guide",
    title: "Free Resume Builder Guide: Build a Job-Winning Resume Fast",
    shortLabel: "Resume Guide",
    description:
      "The complete free resume builder guide — sections, fresher vs experienced, ATS rules, India/US/UK formats, cover letters, offer letters + PDF export.",
    toolSlug: "resume-builder",
    keywords: ["free resume builder", "resume maker", "ats friendly resume", "resume format india", "fresher resume"],
    updated: "2026-09-23",
  },
  {
    pillar: "mortgage-calculator-guide",
    title: "Mortgage Calculator Guide: Payments, PMI & Amortization",
    shortLabel: "Mortgage Guide",
    description:
      "The complete mortgage calculator guide — PITI, formula with $240k example, amortization, 15-vs-30, refinance, India EMI + rent-vs-buy. Free calculator.",
    toolSlug: "mortgage-calculator",
    keywords: ["mortgage calculator guide", "home loan calculator guide", "house payment estimator", "piti vs principal and interest", "home loan emi calculator india"],
    updated: "2026-09-24",
  },
  {
    pillar: "password-generator-guide",
    title: "How to Generate a Strong Password (Free Offline Tool)",
    shortLabel: "Password Guide",
    description:
      "Generate strong passwords free and offline: settings, entropy table, passphrases, manager + 2FA pairing, breach basics. No signup, nothing uploads.",
    toolSlug: "password-generator",
    keywords: ["how to generate strong password", "password generator guide", "offline password generator", "passphrase vs password", "password manager 2fa guide"],
    updated: "2026-09-25",
  },
  {
    pillar: "word-counter-guide",
    title: "Word Counter Guide: Count Words, Reading Time & Readability Free, No Signup",
    shortLabel: "Word Count Guide",
    description:
      "Count words free with no signup: reading-time math, Flesch formulas, density without myths, length-by-intent + India limits. Local and private.",
    toolSlug: "word-counter",
    keywords: ["word counter guide", "how to check word count", "reading time calculator", "flesch reading ease", "keyword density checker"],
    updated: "2026-09-26",
  },
  {
    pillar: "image-compressor-guide",
    title: "Compress Images for Web Without Losing Quality: 80% Guide",
    shortLabel: "Image Guide",
    description:
      "The complete image optimization guide — 80% quality rule, JPG vs PNG vs WebP, exact resize presets, 100KB portal method, EXIF privacy + image SEO.",
    toolSlug: "image-compressor",
    keywords: ["how to compress images for web", "compress images without losing quality", "jpg vs png vs webp", "resize image exact pixels", "remove exif before upload"],
    updated: "2026-10-07",
  },
  {
    pillar: "pdf-merge-guide",
    title: "Manage PDFs Offline: Merge, Split, Compress Without Uploading",
    shortLabel: "PDF Guide",
    description:
      "The complete PDF workflow guide — merge in order, range extraction, 1MB compression, scans to PDF, JPG export, text vs OCR, rotate + watermark.",
    toolSlug: "pdf-merge",
    keywords: ["how to manage pdf files offline", "merge split compress pdf private", "pdf tools without upload", "jpg scans to single pdf", "extract text from pdf without ocr"],
    updated: "2026-10-07",
  },
  {
    pillar: "json-formatter-guide",
    title: "Debug API Responses Locally: JSON, Base64, JWT, Regex Guide",
    shortLabel: "Developer Guide",
    description:
      "The complete local debugging guide — JSON errors, Base64 modes, SHA-256 vs MD5, UUID seeding, regex flags, JWT expiry + URL encoding. No uploads.",
    toolSlug: "json-formatter",
    keywords: ["how to debug api json responses locally", "json parse errors line column", "jwt expiry check without trust"],
    updated: "2026-10-07",
  },
  {
    pillar: "seo-analyzer-guide",
    title: "Score 80+ On-Page SEO Without a Plugin: 11 Checks",
    shortLabel: "SEO Guide",
    description:
      "The complete on-page SEO workflow — 11 weighted checks, density truth, pixel titles, crawl plumbing, social cards + honest AI checks. Free analyzer.",
    toolSlug: "seo-analyzer",
    keywords: ["how to score 80 on page seo without plugin", "11 checks title slug density headings alt", "600 words 1-2 percent density", "rankmath vs yoast audit free", "core web vitals vs on page"],
    updated: "2026-10-07",
  },
  {
    pillar: "sip-calculator-guide",
    title: "SIP vs FD vs PPF: Where Should ₹5,000/Month Go (2026)",
    shortLabel: "Wealth Guide",
    description:
      "The complete India wealth guide — SIP vs FD vs PPF numbers, compounding frequency, tax regimes, real returns, goal math + LTCG. Free calculators.",
    toolSlug: "sip-calculator",
    keywords: ["sip vs lumpsum returns comparison", "ppf vs fd tax free comparison", "step-up sip vs flat sip", "real vs nominal return after inflation"],
    updated: "2026-10-07",
  },
  {
    pillar: "percentage-calculator-guide",
    title: "Percentage Calculator Guide: Formulas, Discounts & Real-Life Uses",
    shortLabel: "Percentage Guide",
    description:
      "The complete percentage guide - percent of a number, increase and decrease, discounts, markup vs margin, reverse percentages, error, and percentage points.",
    toolSlug: "percentage-calculator",
    keywords: ["percentage calculator guide", "how to calculate percentage", "percentage increase calculator", "discount calculator", "percentage points vs percent"],
    updated: "2026-10-22",
  },
  {
    pillar: "bmi-calculator-guide",
    title: "BMI Calculator Guide: Healthy Weight, Calories & Water Needs",
    shortLabel: "BMI Guide",
    description:
      "The complete BMI guide - formula and charts, women vs men, healthy weight range, calorie deficits, water intake, athletes, and BMI for children.",
    toolSlug: "bmi-calculator",
    keywords: ["bmi calculator guide", "how is bmi calculated", "healthy weight for height", "bmi for women", "bmi for men"],
    updated: "2026-10-22",
  },
  {
    pillar: "age-calculator-guide",
    title: "Age Calculator Guide: Exact Age, Dates & Time Zones",
    shortLabel: "Age Guide",
    description:
      "The complete age and date guide - exact age in years, months and days, date differences, time zones, Unix timestamps, leap years and date math.",
    toolSlug: "age-calculator",
    keywords: ["age calculator guide", "how to calculate age", "age difference calculator", "date difference calculator", "unix timestamp converter"],
    updated: "2026-10-22",
  },
  {
    pillar: "signature-maker-guide",
    title: "Signature Maker Guide: Draw, Type & Download a Transparent PNG",
    shortLabel: "Signature Guide",
    description:
      "Create a signature online: draw with mouse, touch or pen, type in cursive fonts, then export a transparent PNG for PDFs, forms and email.",
    toolSlug: "signature-maker",
    keywords: ["signature maker guide", "how to make a signature online", "transparent signature png", "draw signature online", "typed signature cursive font"],
    updated: "2026-10-22",
  },
  {
    pillar: "debt-payoff-guide",
    title: "Debt Payoff Guide: Snowball vs Avalanche Methods",
    shortLabel: "Debt Guide",
    description:
      "Compare snowball and avalanche debt payoff, see how minimums roll forward, and use two worked examples to plan your debt-free date.",
    toolSlug: "debt-payoff-calculator",
    keywords: ["debt payoff guide", "debt snowball vs avalanche", "how to pay off debt", "debt payoff calculator", "minimum payment rollover"],
    updated: "2026-10-22",
  },
  {
    pillar: "grade-calculator-guide",
    title: "Grade Calculator Guide: Weighted Grades & Final Exam Score",
    shortLabel: "Grade Guide",
    description:
      "Learn how weighted grades work, calculate your current average, and find the final exam score needed for your target, with checked examples.",
    toolSlug: "grade-calculator",
    keywords: ["grade calculator guide", "weighted grade calculator", "final exam grade needed", "how to calculate grades", "course grade formula"],
    updated: "2026-10-22",
  },
];

// Single flat list of every registered post (pillars + clusters). Exported for
// the RSS feed; page-level lookups still go through the typed helpers below.
export const ALL_POSTS: BlogPost[] = [
  invoicePillar,
  invoiceHowToCreate,
  invoiceGstFormat,
  invoiceFreelancer,
  invoiceSmallBusiness,
  invoiceTemplates,
  invoiceVsDocs,
  invoiceNumbering,
  invoicePaymentTerms,
  invoiceMistakes,
  qrPillar,
  qrHowToCreate,
  qrWifi,
  qrBusiness,
  qrVsBarcode,
  qrSizePrint,
  qrNotScanning,
  qrVcard,
  qrUpi,
  qrStaticDynamic,
  resumePillar,
  resumeHowTo,
  resumeFormat,
  resumeAts,
  resumeFresher,
  resumeExperienced,
  resumeVsCv,
  resumeCoverLetter,
  resumeMistakes,
  resumeOfferLetter,
  mortgagePillar,
  mortgageHowTo,
  mortgageAfford,
  mortgageTerm,
  mortgageRefi,
  mortgageOverpay,
  mortgageIndia,
  mortgageAmort,
  mortgageDown,
  mortgageRentBuy,
  passwordPillar,
  passwordHowTo,
  passwordStrong,
  passwordTester,
  passwordPassphrase,
  passwordRemember,
  passwordIdeas,
  passwordBreach,
  passwordMfa,
  passwordWifi,
  wordPillar,
  wordHowTo,
  wordLength,
  wordFlesch,
  wordDensity,
  wordSummarize,
  wordLorem,
  wordTyping,
  wordGrammar,
  wordTts,
  imagePillar,
  imagePortal100kb,
  imageFormats,
  imageResize,
  imageWebp,
  imageSvg,
  imageExif,
  imageSeo,
  imageCrop,
  pdfPillar,
  pdfMergeOrder,
  pdfScansPdf,
  pdfExtractRange,
  pdfCompress1mb,
  pdfPagesJpg,
  pdfRotateFix,
  pdfWatermarkDraft,
  pdfTextOcr,
  jsonPillar,
  jsonParseErrors,
  base64Modes,
  hashCompare,
  uuidSeed,
  regexFlags,
  jwtExpiry,
  urlEncoding,
  seoPillar,
  seoFixScore,
  seoTitleLength,
  seoSplitSitemap,
  seoRobotsNoindex,
  seoStaleOg,
  seoUtmNaming,
  seoAiFalsePositive,
  seoGeoChecklist,
  wealthPillar,
  sipGrowth,
  lumpSumFreq,
  fdTds,
  ppfExtend,
  taxRegime,
  realReturn,
  sipCrore,
  ltcgFd,
  wealthBudgetVerdict,
  percentagePillar,
  percentagePercentBasics,
  percentageIncreaseDecrease,
  percentageDiscountSale,
  percentageMarkupMargin,
  percentageDifference,
  percentageReverse,
  percentageError,
  percentagePoints,
  bmiPillar,
  bmiHowItWorks,
  bmiWomen,
  bmiMen,
  bmiHealthyWeight,
  bmiCalorieDeficit,
  bmiWaterIntake,
  bmiAthletes,
  bmiChildren,
  agePillar,
  ageExact,
  ageDifference,
  ageDateDifference,
  ageTimezone,
  ageTimestamp,
  ageLeapYear,
  ageDateAddSubtract,
  ageInDays,
  invoiceProforma,
  invoiceCreditNote,
  invoiceInternational,
  qrGoogleReviews,
  qrRestaurantMenu,
  qrGoogleForms,
  resumeSummaryExamples,
  resumeSkillsSection,
  resumeCareerChange,
  image20kb,
  image200kb,
  imageInstagramResize,
  signaturePillar,
  signatureCreate,
  signatureTransparentPng,
  signatureSize,
  signatureDrawnVsTyped,
  signatureSignPdf,
  signatureEmail,
  signatureValidity,
  signatureExamForms,
  debtPillar,
  debtSnowballAvalanche,
  debtCreditCard,
  debtAvalanche,
  debtSnowball,
  debtMinimumPayments,
  debtExtraPayments,
  debtConsolidation,
  debtPayoffDate,
  gradePillar,
  gradeWeighted,
  gradeFinalNeeded,
  gradePercentageToGpa,
  gradeGpaVsCgpa,
  gradeSemesterGpa,
  gradeCumulativeGpa,
  gradeRaiseGpa,
  gradeWeightedUnweighted,
  imageJpgToPng,
  pdfMergeIphone,
  pdfMergeAndroid,
  pdfCombineImages,
  jsonToCsv,
  sqlFormatter,
  cronExpressions,
  seoMetaDescriptions,
  seoCanonical,
  seoInternalLinking,
  wordTwitterCounter,
  wordPagesPer1000,
  xmlFormatter,
  htmlEntities,
  slugGenerator,
  mimeType,
  csvViewer,
  codeMinifier,
  textDiff,
  imageToBase64,
  compoundingFrequency,
  tipBillSplit,
  salesTaxPrice,
  markdownPreview,
  wcagContrast,
  aiTokenCost,
];

export function getPillarMeta(pillar: string): BlogPillarMeta | undefined {
  return BLOG_PILLARS.find((p) => p.pillar === pillar);
}

export function getPillarPost(pillar: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.pillar === pillar && p.kind === "pillar");
}

export function getClusterPost(pillar: string, cluster: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.pillar === pillar && p.slug === cluster && p.kind === "cluster");
}

export function getClustersForPillar(pillar: string): BlogPost[] {
  return ALL_POSTS.filter((p) => p.pillar === pillar && p.kind === "cluster");
}

export function getAllBlogStaticParams(): { pillar: string; cluster?: string }[] {
  const params: { pillar: string; cluster?: string }[] = [];
  for (const meta of BLOG_PILLARS) {
    params.push({ pillar: meta.pillar });
    for (const c of getClustersForPillar(meta.pillar)) {
      params.push({ pillar: meta.pillar, cluster: c.slug });
    }
  }
  return params;
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const siblings = getClustersForPillar(post.pillar).filter(
    (p) => p.slug !== post.slug && !isNoindexCluster(post.pillar, p.slug)
  );
  // Prefer explicitly related slugs first, then fill with the rest.
  const ordered = [
    ...siblings.filter((s) => post.relatedSlugs.includes(s.slug)),
    ...siblings.filter((s) => !post.relatedSlugs.includes(s.slug)),
  ];
  if (post.kind === "pillar") return ordered.slice(0, limit);
  const pillar = getPillarPost(post.pillar);
  const rest = ordered.filter((p) => p.slug !== post.slug).slice(0, Math.max(0, limit - (pillar ? 1 : 0)));
  return [...(pillar ? [pillar] : []), ...rest].slice(0, limit);
}

export const BLOG_POST_COUNT = ALL_POSTS.length;
