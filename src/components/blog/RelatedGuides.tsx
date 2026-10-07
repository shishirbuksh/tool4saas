import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Tool → blog guide backlinks. Closes the silo loop: blog posts funnel
// down to money tool pages, and tool pages link back up to the guides.
// Only renders when guides exist for the slug — all other tools unaffected.
//
// Every href below is verified against src/lib/blog-registry.ts
// (pillar + cluster slugs in src/content/blog/*). No dead links.
// Tools without a relevant silo yet stay unmapped — mapping them to
// unrelated posts would be irrelevant.
const GUIDES_BY_TOOL: Record<string, { href: string; title: string }[]> = {
  // ---- Mapped heroes (existing guides only) ----
  // ---- Finance tools with topical guides ----
  "freelance-rate-calculator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/freelancer-invoice-guide", title: "Freelancer invoice guide: get paid on time" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
  ],
  "salary-calculator": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/offer-letter-guide", title: "Offer letter: CTC math, clauses & negotiation" },
  ],
  "in-hand-salary-india": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/offer-letter-guide", title: "Offer letter: CTC math, clauses & negotiation" },
  ],
  "us-paycheck-calculator": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/offer-letter-guide", title: "Offer letter: CTC math, clauses & negotiation" },
  ],
  "payslip-generator": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/offer-letter-guide", title: "Offer letter: CTC math, clauses & negotiation" },
  ],
  // ---- Calculators & billing-adjacent tools ----
  "gst-calculator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/gst-invoice-format-india", title: "GST invoice format India: fields, HSN & sample" },
  ],
  "number-to-words": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/invoice-numbering", title: "Invoice numbering: GST-compliant formats & sequences" },
  ],
  "commission-calculator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
    { href: "/blog/invoice-generator-guide/freelancer-invoice-guide", title: "Freelancer invoice guide: get paid on time" },
  ],
  "discount-calculator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
  ],
  "percentage-calculator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/gst-invoice-format-india", title: "GST invoice format India: fields, HSN & sample" },
  ],
  "currency-converter": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/freelancer-invoice-guide", title: "Freelancer invoice guide: get paid on time" },
  ],
  "rent-receipt-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/payment-terms-and-followups", title: "Payment terms + follow-up scripts" },
  ],
  // ---- Invoice family ----
  "invoice-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/how-to-create-invoice-online", title: "How to create an invoice online in 5 steps" },
    { href: "/blog/invoice-generator-guide/invoicing-mistakes-to-avoid", title: "12 invoice mistakes that delay payment" },
    { href: "/blog/invoice-generator-guide/invoice-numbering", title: "Invoice numbering: GST-compliant formats & sequences" },
    { href: "/blog/invoice-generator-guide/invoice-template-formats", title: "Free invoice templates: Word, Excel & PDF formats" },
  ],
  "freelance-gst-invoice-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/gst-invoice-format-india", title: "GST invoice format India: fields, HSN & sample" },
    { href: "/blog/invoice-generator-guide/freelancer-invoice-guide", title: "Freelancer invoice guide: get paid on time" },
    { href: "/blog/invoice-generator-guide/invoice-numbering", title: "Invoice numbering: GST-compliant formats & sequences" },
  ],
  "quotation-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt", title: "Invoice vs quotation vs receipt vs purchase order" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
    { href: "/blog/invoice-generator-guide/invoice-template-formats", title: "Free invoice templates: Word, Excel & PDF formats" },
  ],
  "receipt-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt", title: "Invoice vs quotation vs receipt vs purchase order" },
    { href: "/blog/invoice-generator-guide/payment-terms-and-followups", title: "Payment terms + follow-up scripts" },
    { href: "/blog/invoice-generator-guide/invoice-template-formats", title: "Free invoice templates: Word, Excel & PDF formats" },
  ],
  "purchase-order-generator": [
    { href: "/blog/invoice-generator-guide", title: "Free Invoice Generator Guide (pillar)" },
    { href: "/blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt", title: "Invoice vs quotation vs receipt vs purchase order" },
    { href: "/blog/invoice-generator-guide/small-business-invoicing", title: "Small business invoicing without paid software" },
  ],
  // ---- QR family ----
  "qr-code-generator": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/how-to-create-qr-code", title: "How to create a QR code free in 60 seconds" },
    { href: "/blog/qr-code-generator-guide/qr-code-size-print-guide", title: "QR code size guide for print & distance" },
    { href: "/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes", title: "Static vs dynamic QR codes: which to choose" },
    { href: "/blog/qr-code-generator-guide/upi-payment-qr-code-india", title: "UPI QR code for payments: setup & safety (India)" },
    { href: "/blog/qr-code-generator-guide/vcard-contact-qr-code", title: "vCard QR code: digital business card in 5 seconds" },
  ],
  "wifi-qr-generator": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/wifi-qr-code-guide", title: "WiFi QR code: share guest WiFi with one scan" },
    { href: "/blog/qr-code-generator-guide/qr-code-not-scanning-fix", title: "QR code not scanning? 5 causes & fixes" },
    { href: "/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes", title: "Static vs dynamic QR codes: which to choose" },
  ],
  "qr-scanner": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/qr-code-not-scanning-fix", title: "QR code not scanning? 5 causes & fixes" },
    { href: "/blog/qr-code-generator-guide/static-vs-dynamic-qr-codes", title: "Static vs dynamic QR codes: which to choose" },
    { href: "/blog/qr-code-generator-guide/vcard-contact-qr-code", title: "vCard QR code: digital business card in 5 seconds" },
    { href: "/blog/qr-code-generator-guide/upi-payment-qr-code-india", title: "UPI QR code for payments: setup & safety (India)" },
  ],
  "barcode-generator": [
    { href: "/blog/qr-code-generator-guide", title: "Free QR Code Generator Guide (pillar)" },
    { href: "/blog/qr-code-generator-guide/qr-code-vs-barcode", title: "QR code vs barcode: differences & when to use each" },
    { href: "/blog/qr-code-generator-guide/qr-code-for-business", title: "QR codes for small business: 6 placements" },
  ],
  // ---- Resume family ----
  "resume-builder": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/how-to-make-resume", title: "How to make a resume in 15 minutes + tailor it" },
    { href: "/blog/resume-builder-guide/resume-mistakes", title: "7 resume mistakes that kill interviews" },
    { href: "/blog/resume-builder-guide/ats-resume-guide", title: "ATS-friendly resume: beat tracking software" },
    { href: "/blog/resume-builder-guide/resume-vs-cv", title: "Resume vs CV vs biodata: differences & when to use each" },
  ],
  "ats-resume-checker": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/ats-resume-guide", title: "ATS-friendly resume: beat tracking software" },
    { href: "/blog/resume-builder-guide/resume-format-guide", title: "Resume format: sections, order & norms" },
    { href: "/blog/resume-builder-guide/resume-mistakes", title: "7 resume mistakes that kill interviews" },
  ],
  "cover-letter-builder": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/cover-letter-guide", title: "Cover letter: 4-paragraph format that wins" },
    { href: "/blog/resume-builder-guide/fresher-resume-guide", title: "Fresher resume guide: zero experience" },
    { href: "/blog/resume-builder-guide/resume-vs-cv", title: "Resume vs CV vs biodata: differences & when to use each" },
  ],
  "offer-letter-generator": [
    { href: "/blog/resume-builder-guide", title: "Free Resume Builder Guide (pillar)" },
    { href: "/blog/resume-builder-guide/offer-letter-guide", title: "Offer letter: CTC math, clauses & negotiation" },
    { href: "/blog/resume-builder-guide/experienced-resume-guide", title: "Resume for experienced professionals" },
  ],
  "mortgage-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/how-to-calculate-mortgage-payment", title: "How to calculate mortgage payment: formula + examples" },
    { href: "/blog/mortgage-calculator-guide/15-vs-30-year-mortgage", title: "15 vs 30 year mortgage: interest & payoff compared" },
    { href: "/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment", title: "Extra mortgage payments: interest saved" },
  ],
  "home-affordability-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/how-much-house-can-i-afford", title: "How much house can I afford? 28/36 rule" },
    { href: "/blog/mortgage-calculator-guide/rent-vs-buy-house", title: "Rent vs buy: 5% rule + break-even math" },
  ],
  "refinance-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/should-i-refinance-my-mortgage", title: "Should I refinance? Break-even rule + checklist" },
    { href: "/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment", title: "Extra mortgage payments: interest saved" },
  ],
  "mortgage-overpayment-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment", title: "Extra mortgage payments: interest saved" },
    { href: "/blog/mortgage-calculator-guide/mortgage-amortization-schedule", title: "Amortization schedule: how payments split" },
  ],
  "emi-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/home-loan-emi-eligibility-india", title: "Home loan EMI & eligibility India" },
  ],
  "home-loan-eligibility-india": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/home-loan-emi-eligibility-india", title: "Home loan EMI & eligibility India" },
  ],
  "loan-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/how-to-calculate-mortgage-payment", title: "How to calculate mortgage payment: formula + examples" },
    { href: "/blog/mortgage-calculator-guide/15-vs-30-year-mortgage", title: "15 vs 30 year mortgage: interest & payoff compared" },
  ],
  "rent-vs-buy-calculator": [
    { href: "/blog/mortgage-calculator-guide", title: "Mortgage Calculator Guide (pillar)" },
    { href: "/blog/mortgage-calculator-guide/rent-vs-buy-house", title: "Rent vs buy: 5% rule + break-even math" },
    { href: "/blog/mortgage-calculator-guide/how-much-house-can-i-afford", title: "How much house can I afford? 28/36 rule" },
  ],
  "password-generator": [
    { href: "/blog/password-generator-guide", title: "Password Generator Guide (pillar)" },
    { href: "/blog/password-generator-guide/how-to-create-strong-password", title: "How to create a strong password: 16-character rule" },
    { href: "/blog/password-generator-guide/passphrase-vs-password", title: "Passphrase vs password: when 5 words win" },
    { href: "/blog/password-generator-guide/what-to-do-after-data-breach", title: "What to do after a data breach: 7-step checklist" },
  ],
  "password-strength": [
    { href: "/blog/password-generator-guide", title: "Password Generator Guide (pillar)" },
    { href: "/blog/password-generator-guide/password-strength-tester", title: "Strength tester: check without uploading" },
    { href: "/blog/password-generator-guide/what-makes-password-strong", title: "What makes a password strong: entropy + blacklists" },
  ],
  "random-passphrase": [
    { href: "/blog/password-generator-guide", title: "Password Generator Guide (pillar)" },
    { href: "/blog/password-generator-guide/passphrase-vs-password", title: "Passphrase vs password: when 5 words win" },
    { href: "/blog/password-generator-guide/how-to-remember-passwords", title: "Remember passwords without reusing them" },
  ],
  "otp-generator": [
    { href: "/blog/password-generator-guide", title: "Password Generator Guide (pillar)" },
    { href: "/blog/password-generator-guide/2fa-vs-passkeys", title: "2FA vs passkeys: strength ladder + setup" },
    { href: "/blog/password-generator-guide/what-to-do-after-data-breach", title: "What to do after a data breach: 7-step checklist" },
  ],
  "random-string": [
    { href: "/blog/password-generator-guide", title: "Password Generator Guide (pillar)" },
    { href: "/blog/password-generator-guide/random-password-ideas", title: "Random password ideas: patterns that stay safe" },
    { href: "/blog/password-generator-guide/wifi-router-password", title: "Strong Wi-Fi & router passwords: setup" },
  ],
  "word-counter": [
    { href: "/blog/word-counter-guide", title: "Word Counter Guide (pillar)" },
    { href: "/blog/word-counter-guide/how-to-count-words-online", title: "How to count words online free (no signup)" },
    { href: "/blog/word-counter-guide/ideal-blog-post-length-seo", title: "How long should a blog post be?" },
    { href: "/blog/word-counter-guide/flesch-reading-ease-score-explained", title: "Flesch Reading Ease: formula and bands" },
  ],
  "readability-checker": [
    { href: "/blog/word-counter-guide", title: "Word Counter Guide (pillar)" },
    { href: "/blog/word-counter-guide/flesch-reading-ease-score-explained", title: "Flesch Reading Ease: formula and bands" },
    { href: "/blog/word-counter-guide/grammar-check-before-publish", title: "Grammar check before you publish" },
  ],
  "keyword-density": [
    { href: "/blog/word-counter-guide", title: "Word Counter Guide (pillar)" },
    { href: "/blog/word-counter-guide/keyword-density-seo-check", title: "Keyword density: check and fix stuffing" },
    { href: "/blog/word-counter-guide/ideal-blog-post-length-seo", title: "How long should a blog post be?" },
  ],
  "text-summarizer": [
    { href: "/blog/word-counter-guide", title: "Word Counter Guide (pillar)" },
    { href: "/blog/word-counter-guide/how-to-summarize-text-fast", title: "How to summarize text: extractive method" },
    { href: "/blog/word-counter-guide/text-to-speech-proofreading-use", title: "Proofread by listening: TTS workflow" },
  ],
  "grammar-checker": [
    { href: "/blog/word-counter-guide", title: "Word Counter Guide (pillar)" },
    { href: "/blog/word-counter-guide/grammar-check-before-publish", title: "Grammar check before you publish" },
    { href: "/blog/word-counter-guide/flesch-reading-ease-score-explained", title: "Flesch Reading Ease: formula and bands" },
  ],
  "typing-speed-test": [
    { href: "/blog/word-counter-guide", title: "Word Counter Guide (pillar)" },
    { href: "/blog/word-counter-guide/typing-speed-test-practice-tips", title: "Reading and typing speed: WPM math + tips" },
    { href: "/blog/word-counter-guide/how-to-count-words-online", title: "How to count words online free (no signup)" },
  ],
  "lorem-ipsum": [
    { href: "/blog/word-counter-guide", title: "Word Counter Guide (pillar)" },
    { href: "/blog/word-counter-guide/lorem-ipsum-generator-use", title: "Lorem ipsum: when to use placeholder text" },
    { href: "/blog/word-counter-guide/typing-speed-test-practice-tips", title: "Reading and typing speed: WPM math + tips" },
  ],
  "text-to-speech": [
    { href: "/blog/word-counter-guide", title: "Word Counter Guide (pillar)" },
    { href: "/blog/word-counter-guide/text-to-speech-proofreading-use", title: "Proofread by listening: TTS workflow" },
    { href: "/blog/word-counter-guide/grammar-check-before-publish", title: "Grammar check before you publish" },
  ],
  "case-converter": [
    { href: "/blog/word-counter-guide", title: "Word Counter Guide (pillar)" },
    { href: "/blog/word-counter-guide/how-to-count-words-online", title: "How to count words online free (no signup)" },
  ],
  // ---- Image optimization silo ----
  "image-compressor": [
    { href: "/blog/image-compressor-guide", title: "Image Optimization Guide: 80% rule, formats, 100KB portals (pillar)" },
    { href: "/blog/image-compressor-guide/compress-jpg-100kb-portal", title: "Compress JPG to 100KB for online forms" },
    { href: "/blog/image-compressor-guide/strip-exif-before-upload", title: "Strip EXIF data before uploading" },
  ],
  "image-resizer": [
    { href: "/blog/image-compressor-guide", title: "Image Optimization Guide: 80% rule, formats, 100KB portals (pillar)" },
    { href: "/blog/image-compressor-guide/resize-image-exact-pixels", title: "Resize images to exact pixels without blur" },
    { href: "/blog/image-compressor-guide/crop-passport-photos", title: "Crop passport photos to exact size" },
  ],
  "image-format-converter": [
    { href: "/blog/image-compressor-guide", title: "Image Optimization Guide: 80% rule, formats, 100KB portals (pillar)" },
    { href: "/blog/image-compressor-guide/png-vs-jpg-vs-webp", title: "PNG vs JPG vs WebP: which format to use" },
    { href: "/blog/image-compressor-guide/png-to-webp-transparency", title: "PNG to WebP without losing transparency" },
  ],
  "image-cropper": [
    { href: "/blog/image-compressor-guide", title: "Image Optimization Guide: 80% rule, formats, 100KB portals (pillar)" },
    { href: "/blog/image-compressor-guide/crop-passport-photos", title: "Crop passport photos to exact size" },
    { href: "/blog/image-compressor-guide/resize-image-exact-pixels", title: "Resize images to exact pixels without blur" },
  ],
  "svg-optimizer": [
    { href: "/blog/image-compressor-guide", title: "Image Optimization Guide: 80% rule, formats, 100KB portals (pillar)" },
    { href: "/blog/image-compressor-guide/optimize-svg-logos", title: "Optimize SVG logos without breaking them" },
  ],
  "exif-viewer": [
    { href: "/blog/image-compressor-guide", title: "Image Optimization Guide: 80% rule, formats, 100KB portals (pillar)" },
    { href: "/blog/image-compressor-guide/strip-exif-before-upload", title: "Strip EXIF data before uploading" },
  ],
  // ---- PDF workflow silo ----
  "pdf-merge": [
    { href: "/blog/pdf-merge-guide", title: "PDF Workflow Guide: merge, split, compress offline (pillar)" },
    { href: "/blog/pdf-merge-guide/merge-multiple-pdfs-order", title: "Merge multiple PDFs in order" },
    { href: "/blog/pdf-merge-guide/extract-pages-range", title: "Extract pages by range: 1-3,5 syntax" },
  ],
  "image-to-pdf": [
    { href: "/blog/pdf-merge-guide", title: "PDF Workflow Guide: merge, split, compress offline (pillar)" },
    { href: "/blog/pdf-merge-guide/jpg-scans-single-pdf", title: "JPG scans to single PDF: A4 setup" },
  ],
  "pdf-split": [
    { href: "/blog/pdf-merge-guide", title: "PDF Workflow Guide: merge, split, compress offline (pillar)" },
    { href: "/blog/pdf-merge-guide/extract-pages-range", title: "Extract pages by range: 1-3,5 syntax" },
    { href: "/blog/pdf-merge-guide/fix-sideways-scans", title: "Fix sideways scans: rotate upright" },
  ],
  "pdf-compress": [
    { href: "/blog/pdf-merge-guide", title: "PDF Workflow Guide: merge, split, compress offline (pillar)" },
    { href: "/blog/pdf-merge-guide/compress-pdf-1mb-email", title: "Compress PDF to 1MB for email" },
  ],
  "pdf-to-jpg": [
    { href: "/blog/pdf-merge-guide", title: "PDF Workflow Guide: merge, split, compress offline (pillar)" },
    { href: "/blog/pdf-merge-guide/pdf-pages-high-quality-jpg", title: "PDF pages to high-quality JPG" },
  ],
  "pdf-to-text": [
    { href: "/blog/pdf-merge-guide", title: "PDF Workflow Guide: merge, split, compress offline (pillar)" },
    { href: "/blog/pdf-merge-guide/extract-text-without-ocr", title: "Extract text without OCR" },
  ],
  "pdf-rotate": [
    { href: "/blog/pdf-merge-guide", title: "PDF Workflow Guide: merge, split, compress offline (pillar)" },
    { href: "/blog/pdf-merge-guide/fix-sideways-scans", title: "Fix sideways scans: rotate upright" },
  ],
  "pdf-watermark": [
    { href: "/blog/pdf-merge-guide", title: "PDF Workflow Guide: merge, split, compress offline (pillar)" },
    { href: "/blog/pdf-merge-guide/add-draft-watermark", title: "Add DRAFT watermark readably" },
  ],
  // ---- Developer toolkit silo ----
  "json-formatter": [
    { href: "/blog/json-formatter-guide", title: "Developer Toolkit Guide: JSON, Base64, JWT, regex (pillar)" },
    { href: "/blog/json-formatter-guide/json-parse-errors", title: "Why JSON.parse fails: commas and quotes" },
    { href: "/blog/json-formatter-guide/regex-flags-capture-groups", title: "Regex flags and capture groups" },
  ],
  "base64-tool": [
    { href: "/blog/json-formatter-guide", title: "Developer Toolkit Guide: JSON, Base64, JWT, regex (pillar)" },
    { href: "/blog/json-formatter-guide/base64-url-safe-vs-standard", title: "Base64 URL-safe vs standard" },
  ],
  "hash-generator": [
    { href: "/blog/json-formatter-guide", title: "Developer Toolkit Guide: JSON, Base64, JWT, regex (pillar)" },
    { href: "/blog/json-formatter-guide/sha256-vs-md5-hashes", title: "SHA-256 vs MD5: when to use which" },
  ],
  "uuid-generator": [
    { href: "/blog/json-formatter-guide", title: "Developer Toolkit Guide: JSON, Base64, JWT, regex (pillar)" },
    { href: "/blog/json-formatter-guide/uuid-seed-test-database", title: "Seed test databases with UUIDs" },
  ],
  "regex-tester": [
    { href: "/blog/json-formatter-guide", title: "Developer Toolkit Guide: JSON, Base64, JWT, regex (pillar)" },
    { href: "/blog/json-formatter-guide/regex-flags-capture-groups", title: "Regex flags and capture groups" },
    { href: "/blog/json-formatter-guide/json-parse-errors", title: "Why JSON.parse fails: commas and quotes" },
  ],
  "jwt-decoder": [
    { href: "/blog/json-formatter-guide", title: "Developer Toolkit Guide: JSON, Base64, JWT, regex (pillar)" },
    { href: "/blog/json-formatter-guide/jwt-expiry-without-trust", title: "Check JWT expiry without trusting it" },
  ],
  "url-encoder": [
    { href: "/blog/json-formatter-guide", title: "Developer Toolkit Guide: JSON, Base64, JWT, regex (pillar)" },
    { href: "/blog/json-formatter-guide/url-encoding-spaces-symbols", title: "URL encoding: spaces and symbols" },
  ],
  // ---- SEO publishing silo ----
  "seo-analyzer": [
    { href: "/blog/seo-analyzer-guide", title: "SEO Publishing Guide: 11 checks, no plugin (pillar)" },
    { href: "/blog/seo-analyzer-guide/fix-score-60-to-80", title: "Fix SEO score from 60 to 80" },
    { href: "/blog/seo-analyzer-guide/title-meta-length-2026", title: "Title and meta lengths that avoid truncation" },
    { href: "/blog/seo-analyzer-guide/geo-checklist-ai-citations", title: "GEO checklist: get cited by AI search" },
  ],
  "meta-tag-generator": [
    { href: "/blog/seo-analyzer-guide", title: "SEO Publishing Guide: 11 checks, no plugin (pillar)" },
    { href: "/blog/seo-analyzer-guide/title-meta-length-2026", title: "Title and meta lengths that avoid truncation" },
  ],
  "serp-preview": [
    { href: "/blog/seo-analyzer-guide", title: "SEO Publishing Guide: 11 checks, no plugin (pillar)" },
    { href: "/blog/seo-analyzer-guide/title-meta-length-2026", title: "Title and meta lengths that avoid truncation" },
    { href: "/blog/seo-analyzer-guide/fix-score-60-to-80", title: "Fix SEO score from 60 to 80" },
  ],
  "sitemap-generator": [
    { href: "/blog/seo-analyzer-guide", title: "SEO Publishing Guide: 11 checks, no plugin (pillar)" },
    { href: "/blog/seo-analyzer-guide/split-large-sitemap", title: "Split large sitemaps Search Console accepts" },
  ],
  "robots-txt-generator": [
    { href: "/blog/seo-analyzer-guide", title: "SEO Publishing Guide: 11 checks, no plugin (pillar)" },
    { href: "/blog/seo-analyzer-guide/robots-vs-noindex", title: "Robots.txt vs noindex: when to use each" },
  ],
  "utm-builder": [
    { href: "/blog/seo-analyzer-guide", title: "SEO Publishing Guide: 11 checks, no plugin (pillar)" },
    { href: "/blog/seo-analyzer-guide/utm-naming-governance", title: "Name UTM campaigns without splitting reports" },
  ],
  "faq-schema-generator": [
    { href: "/blog/seo-analyzer-guide", title: "SEO Publishing Guide: 11 checks, no plugin (pillar)" },
    { href: "/blog/seo-analyzer-guide/ai-content-false-positives", title: "Check AI content without false positives" },
  ],
  "open-graph-preview": [
    { href: "/blog/seo-analyzer-guide", title: "SEO Publishing Guide: 11 checks, no plugin (pillar)" },
    { href: "/blog/seo-analyzer-guide/stale-og-image-fix", title: "Fix stale LinkedIn and social preview images" },
  ],
  "ai-detector": [
    { href: "/blog/seo-analyzer-guide", title: "SEO Publishing Guide: 11 checks, no plugin (pillar)" },
    { href: "/blog/seo-analyzer-guide/ai-content-false-positives", title: "Check AI content without false positives" },
  ],
  "plagiarism-checker": [
    { href: "/blog/seo-analyzer-guide", title: "SEO Publishing Guide: 11 checks, no plugin (pillar)" },
    { href: "/blog/seo-analyzer-guide/ai-content-false-positives", title: "Check AI content without false positives" },
  ],
  // ---- India wealth & tax silo ----
  "sip-calculator": [
    { href: "/blog/sip-calculator-guide", title: "SIP vs FD vs PPF: where ₹5,000/month goes (pillar)" },
    { href: "/blog/sip-calculator-guide/sip-5000-10-years", title: "₹5,000 SIP in 10/15/20 years" },
    { href: "/blog/sip-calculator-guide/sip-1-crore-goal", title: "How much SIP for ₹1 crore?" },
  ],
  "compound-interest-calculator": [
    { href: "/blog/sip-calculator-guide", title: "SIP vs FD vs PPF: where ₹5,000/month goes (pillar)" },
    { href: "/blog/sip-calculator-guide/lumpsum-compounding-frequency", title: "Lump sum compounding frequency" },
  ],
  "fd-calculator": [
    { href: "/blog/sip-calculator-guide", title: "SIP vs FD vs PPF: where ₹5,000/month goes (pillar)" },
    { href: "/blog/sip-calculator-guide/fd-quarterly-tds", title: "FD quarterly compounding and TDS" },
    { href: "/blog/sip-calculator-guide/equity-ltcg-vs-fd-tax", title: "Equity LTCG vs FD tax" },
  ],
  "ppf-calculator": [
    { href: "/blog/sip-calculator-guide", title: "SIP vs FD vs PPF: where ₹5,000/month goes (pillar)" },
    { href: "/blog/sip-calculator-guide/ppf-extend-15-years", title: "PPF after 15 years: extend or close?" },
  ],
  "income-tax-calculator": [
    { href: "/blog/sip-calculator-guide", title: "SIP vs FD vs PPF: where ₹5,000/month goes (pillar)" },
    { href: "/blog/sip-calculator-guide/old-vs-new-regime-2026", title: "Old vs new tax regime in 2026" },
    { href: "/blog/sip-calculator-guide/budget-2026-verdict-salaried", title: "Budget 2026 verdict for salaried savers" },
  ],
  "inflation-calculator": [
    { href: "/blog/sip-calculator-guide", title: "SIP vs FD vs PPF: where ₹5,000/month goes (pillar)" },
    { href: "/blog/sip-calculator-guide/real-return-inflation", title: "Real vs nominal returns" },
  ],
  "retirement-calculator": [
    { href: "/blog/sip-calculator-guide", title: "SIP vs FD vs PPF: where ₹5,000/month goes (pillar)" },
    { href: "/blog/sip-calculator-guide/sip-1-crore-goal", title: "How much SIP for ₹1 crore?" },
  ],
  "capital-gains-tax-india": [
    { href: "/blog/sip-calculator-guide", title: "SIP vs FD vs PPF: where ₹5,000/month goes (pillar)" },
    { href: "/blog/sip-calculator-guide/equity-ltcg-vs-fd-tax", title: "Equity LTCG vs FD tax" },
    { href: "/blog/sip-calculator-guide/budget-2026-verdict-salaried", title: "Budget 2026 verdict for salaried savers" },
  ],
};

export default function RelatedGuides({ slug }: { slug: string }) {
  const guides = GUIDES_BY_TOOL[slug];
  if (!guides || guides.length === 0) return null;
  return (
    <Box component="section" aria-label="Related guides" sx={{ mt: 4, p: 3, border: "1px solid", borderColor: "divider", borderRadius: "12px", bgcolor: "background.paper" }}>
      <Typography variant="h2" sx={{ fontSize: "1.125rem", mb: 0.5 }}>
        Learn: guides & tutorials
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Deep dives from the Tool4SaaS blog — tested workflows, print sizes and fixes.
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 3, display: "flex", flexDirection: "column", gap: 1 }}>
        {guides.map((g) => (
          <Box component="li" key={g.href}>
            <Link href={g.href} style={{ fontWeight: 600 }}>
              {g.title}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
