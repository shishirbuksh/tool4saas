# Thin-Content Audit — tool4saas.com

**Run:** 2026-11-09T12:40:18.894Z
**Scope:** 342 URLs from `https://tool4saas.com/sitemap.xml` (live, rendered `<main>` text)
**Thresholds (unique words):** tool >=300, category >=250, blog pillar >=700, blog cluster >=700. Legal/trust pages exempt. Project rule: <300 = thin.

## Verdict

| Bucket | URLs |
| --- | --- |
| Keep (index) | 151 |
| Improve (under target) | 160 |
| Noindex (thin/duplicate) | 31 |
| Broken (non-200) | 0 |
| Total | 342 |

## By page type

| Type | URLs | Min words | Median words | Noindex | Improve |
| --- | --- | --- | --- | --- | --- |
| blog-cluster | 179 | 326 | 512 | 31 | 148 |
| tool | 125 | 376 | 446 | 0 | 0 |
| blog-pillar | 17 | 506 | 772 | 0 | 4 |
| category | 12 | 200 | 241 | 0 | 8 |
| static | 8 | 97 | 313 | 0 | 0 |
| home | 1 | 481 | 481 | 0 | 0 |

## 1. Noindex candidates (31)

These pages should be pulled from the sitemap and set to `noindex, follow` until they have unique content. They currently dilute crawl budget on a domain that Google has not yet trusted.

| Path | Type | Unique words | Why | Lastmod |
| --- | --- | --- | --- | --- |
| /blog/json-formatter-guide/base64-url-safe-vs-standard | blog-cluster | 326 | 326 unique words, floor 400 | 2026-10-19 |
| /blog/seo-analyzer-guide/fix-score-60-to-80 | blog-cluster | 336 | 336 unique words, floor 400 | 2026-10-19 |
| /blog/seo-analyzer-guide/robots-vs-noindex | blog-cluster | 338 | 338 unique words, floor 400 | 2026-10-19 |
| /blog/image-compressor-guide/crop-passport-photos | blog-cluster | 341 | 341 unique words, floor 400 | 2026-10-19 |
| /blog/image-compressor-guide/png-vs-jpg-vs-webp | blog-cluster | 346 | 346 unique words, floor 400 | 2026-10-19 |
| /blog/json-formatter-guide/sha256-vs-md5-hashes | blog-cluster | 348 | 348 unique words, floor 400 | 2026-10-20 |
| /blog/json-formatter-guide/json-parse-errors | blog-cluster | 355 | 355 unique words, floor 400 | 2026-10-19 |
| /blog/json-formatter-guide/regex-flags-capture-groups | blog-cluster | 356 | 356 unique words, floor 400 | 2026-10-20 |
| /blog/pdf-merge-guide/extract-text-without-ocr | blog-cluster | 360 | 360 unique words, floor 400 | 2026-10-19 |
| /blog/seo-analyzer-guide/stale-og-image-fix | blog-cluster | 360 | 360 unique words, floor 400 | 2026-10-20 |
| /blog/sip-calculator-guide/real-return-inflation | blog-cluster | 360 | 360 unique words, floor 400 | 2026-10-19 |
| /blog/json-formatter-guide/jwt-expiry-without-trust | blog-cluster | 363 | 363 unique words, floor 400 | 2026-10-19 |
| /blog/word-counter-guide/flesch-reading-ease-score-explained | blog-cluster | 366 | 366 unique words, floor 400 | 2026-10-20 |
| /blog/sip-calculator-guide/old-vs-new-regime-2026 | blog-cluster | 367 | 367 unique words, floor 400 | 2026-10-19 |
| /blog/json-formatter-guide/url-encoding-spaces-symbols | blog-cluster | 371 | 371 unique words, floor 400 | 2026-10-19 |
| /blog/image-compressor-guide/resize-image-exact-pixels | blog-cluster | 373 | 373 unique words, floor 400 | 2026-10-20 |
| /blog/mortgage-calculator-guide/how-to-calculate-mortgage-payment | blog-cluster | 375 | 375 unique words, floor 400 | 2026-10-19 |
| /blog/image-compressor-guide/png-to-webp-transparency | blog-cluster | 375 | 375 unique words, floor 400 | 2026-10-19 |
| /blog/sip-calculator-guide/equity-ltcg-vs-fd-tax | blog-cluster | 376 | 376 unique words, floor 400 | 2026-10-19 |
| /blog/password-generator-guide/wifi-router-password | blog-cluster | 378 | 378 unique words, floor 400 | 2026-10-19 |
| /blog/seo-analyzer-guide/ai-content-false-positives | blog-cluster | 379 | 379 unique words, floor 400 | 2026-10-19 |
| /blog/resume-builder-guide/resume-vs-cv | blog-cluster | 381 | 381 unique words, floor 400 | 2026-10-19 |
| /blog/word-counter-guide/typing-speed-test-practice-tips | blog-cluster | 382 | 382 unique words, floor 400 | 2026-10-19 |
| /blog/pdf-merge-guide/pdf-pages-high-quality-jpg | blog-cluster | 386 | 386 unique words, floor 400 | 2026-10-23 |
| /blog/image-compressor-guide/image-seo-size-alt | blog-cluster | 393 | 393 unique words, floor 400 | 2026-10-20 |
| /blog/image-compressor-guide/compress-jpg-100kb-portal | blog-cluster | 394 | 394 unique words, floor 400 | 2026-10-19 |
| /blog/qr-code-generator-guide/qr-code-vs-barcode | blog-cluster | 395 | 395 unique words, floor 400 | 2026-10-19 |
| /blog/word-counter-guide/ideal-blog-post-length-seo | blog-cluster | 395 | 395 unique words, floor 400 | 2026-10-20 |
| /blog/word-counter-guide/how-to-count-words-online | blog-cluster | 396 | 396 unique words, floor 400 | 2026-10-20 |
| /blog/resume-builder-guide/cover-letter-guide | blog-cluster | 398 | 398 unique words, floor 400 | 2026-10-19 |
| /blog/image-compressor-guide/strip-exif-before-upload | blog-cluster | 398 | 398 unique words, floor 400 | 2026-10-19 |

## 2. Improve (160)

Indexable, but under the target for their type. Add a real 3-section guide / worked example before promoting them.

| Path | Type | Unique words | H2s | Gap |
| --- | --- | --- | --- | --- |
| /category/pdf | category | 200 | 2 | 200 unique words, target 250 |
| /category/time | category | 228 | 2 | 228 unique words, target 250 |
| /category/health | category | 236 | 2 | 236 unique words, target 250 |
| /category/generators | category | 237 | 2 | 237 unique words, target 250 |
| /category/seo | category | 237 | 2 | 237 unique words, target 250 |
| /category/business | category | 240 | 2 | 240 unique words, target 250 |
| /category/calculators | category | 241 | 2 | 241 unique words, target 250 |
| /category/converters | category | 248 | 2 | 248 unique words, target 250 |
| /blog/qr-code-generator-guide/vcard-contact-qr-code | blog-cluster | 400 | 9 | 400 unique words, target 700 |
| /blog/image-compressor-guide/optimize-svg-logos | blog-cluster | 400 | 9 | 400 unique words, target 700 |
| /blog/percentage-calculator-guide/reverse-percentage | blog-cluster | 400 | 10 | 400 unique words, target 700 |
| /blog/invoice-generator-guide/invoice-template-formats | blog-cluster | 402 | 9 | 402 unique words, target 700 |
| /blog/word-counter-guide/keyword-density-seo-check | blog-cluster | 405 | 8 | 405 unique words, target 700 |
| /blog/invoice-generator-guide/invoice-vs-quotation-vs-receipt | blog-cluster | 407 | 10 | 407 unique words, target 700 |
| /blog/invoice-generator-guide/payment-terms-and-followups | blog-cluster | 414 | 9 | 414 unique words, target 700 |
| /blog/mortgage-calculator-guide/how-much-house-can-i-afford | blog-cluster | 415 | 11 | 415 unique words, target 700 |
| /blog/seo-analyzer-guide/geo-checklist-ai-citations | blog-cluster | 417 | 9 | 417 unique words, target 700 |
| /blog/password-generator-guide/how-to-remember-passwords | blog-cluster | 421 | 9 | 421 unique words, target 700 |
| /blog/mortgage-calculator-guide/mortgage-amortization-schedule | blog-cluster | 424 | 11 | 424 unique words, target 700 |
| /blog/qr-code-generator-guide/static-vs-dynamic-qr-codes | blog-cluster | 427 | 9 | 427 unique words, target 700 |
| /blog/percentage-calculator-guide/percentage-points-vs-percent | blog-cluster | 427 | 10 | 427 unique words, target 700 |
| /blog/invoice-generator-guide/gst-invoice-format-india | blog-cluster | 430 | 10 | 430 unique words, target 700 |
| /blog/password-generator-guide/how-to-create-strong-password | blog-cluster | 432 | 9 | 432 unique words, target 700 |
| /blog/invoice-generator-guide/freelancer-invoice-guide | blog-cluster | 434 | 10 | 434 unique words, target 700 |
| /blog/resume-builder-guide/fresher-resume-guide | blog-cluster | 434 | 9 | 434 unique words, target 700 |
| /blog/password-generator-guide/passphrase-vs-password | blog-cluster | 435 | 9 | 435 unique words, target 700 |
| /blog/mortgage-calculator-guide/home-loan-emi-eligibility-india | blog-cluster | 436 | 10 | 436 unique words, target 700 |
| /blog/resume-builder-guide/experienced-resume-guide | blog-cluster | 439 | 9 | 439 unique words, target 700 |
| /blog/password-generator-guide/password-strength-tester | blog-cluster | 440 | 9 | 440 unique words, target 700 |
| /blog/resume-builder-guide/ats-resume-guide | blog-cluster | 445 | 9 | 445 unique words, target 700 |
| /blog/password-generator-guide/what-makes-password-strong | blog-cluster | 448 | 9 | 448 unique words, target 700 |
| /blog/word-counter-guide/markdown-preview-before-publishing | blog-cluster | 449 | 8 | 449 unique words, target 700 |
| /blog/percentage-calculator-guide/sales-tax-on-a-price | blog-cluster | 451 | 9 | 451 unique words, target 700 |
| /blog/qr-code-generator-guide/qr-code-not-scanning-fix | blog-cluster | 452 | 10 | 452 unique words, target 700 |
| /blog/mortgage-calculator-guide/mortgage-overpayment-extra-payment | blog-cluster | 454 | 11 | 454 unique words, target 700 |
| /blog/qr-code-generator-guide/qr-code-for-business | blog-cluster | 455 | 9 | 455 unique words, target 700 |
| /blog/word-counter-guide/twitter-character-counter | blog-cluster | 456 | 10 | 456 unique words, target 700 |
| /blog/resume-builder-guide/how-to-make-resume | blog-cluster | 457 | 10 | 457 unique words, target 700 |
| /blog/percentage-calculator-guide/tip-calculator-bill-split | blog-cluster | 458 | 9 | 458 unique words, target 700 |
| /blog/word-counter-guide/pages-per-1000-words | blog-cluster | 459 | 11 | 459 unique words, target 700 |
| /blog/mortgage-calculator-guide/rent-vs-buy-house | blog-cluster | 464 | 11 | 464 unique words, target 700 |
| /blog/age-calculator-guide/add-subtract-dates | blog-cluster | 464 | 12 | 464 unique words, target 700 |
| /blog/percentage-calculator-guide/percentage-error | blog-cluster | 466 | 10 | 466 unique words, target 700 |
| /blog/age-calculator-guide/age-difference-between-dates | blog-cluster | 468 | 10 | 468 unique words, target 700 |
| /blog/grade-calculator-guide/weighted-vs-unweighted-gpa | blog-cluster | 470 | 10 | 470 unique words, target 700 |
| /blog/percentage-calculator-guide/percentage-difference | blog-cluster | 473 | 9 | 473 unique words, target 700 |
| /blog/invoice-generator-guide/invoice-numbering | blog-cluster | 474 | 10 | 474 unique words, target 700 |
| /blog/resume-builder-guide/resume-mistakes | blog-cluster | 478 | 9 | 478 unique words, target 700 |
| /blog/qr-code-generator-guide/qr-code-size-print-guide | blog-cluster | 481 | 10 | 481 unique words, target 700 |
| /blog/percentage-calculator-guide/markup-vs-margin | blog-cluster | 482 | 11 | 482 unique words, target 700 |
| /blog/invoice-generator-guide/invoicing-mistakes-to-avoid | blog-cluster | 483 | 9 | 483 unique words, target 700 |
| /blog/percentage-calculator-guide/percentage-increase-decrease | blog-cluster | 484 | 10 | 484 unique words, target 700 |
| /blog/grade-calculator-guide/final-exam-grade-needed | blog-cluster | 484 | 12 | 484 unique words, target 700 |
| /blog/age-calculator-guide/age-in-days-hours-minutes | blog-cluster | 488 | 11 | 488 unique words, target 700 |
| /blog/grade-calculator-guide/percentage-to-gpa | blog-cluster | 490 | 14 | 490 unique words, target 700 |
| /blog/percentage-calculator-guide/percent-of-a-number | blog-cluster | 495 | 10 | 495 unique words, target 700 |
| /blog/age-calculator-guide/date-difference-calculation | blog-cluster | 495 | 10 | 495 unique words, target 700 |
| /blog/image-compressor-guide/wcag-contrast-check | blog-cluster | 497 | 9 | 497 unique words, target 700 |
| /blog/word-counter-guide/compare-two-texts-word-diff | blog-cluster | 499 | 9 | 499 unique words, target 700 |
| /blog/age-calculator-guide/leap-year-birthdays | blog-cluster | 501 | 11 | 501 unique words, target 700 |
| /blog/qr-code-generator-guide/upi-payment-qr-code-india | blog-cluster | 502 | 10 | 502 unique words, target 700 |
| /blog/invoice-generator-guide/credit-note-vs-debit-note | blog-cluster | 504 | 10 | 504 unique words, target 700 |
| /blog/sip-calculator-guide | blog-pillar | 506 | 13 | 506 unique words, target 700 |
| /blog/invoice-generator-guide/how-to-create-invoice-online | blog-cluster | 506 | 10 | 506 unique words, target 700 |
| /blog/grade-calculator-guide/semester-gpa-calculation | blog-cluster | 506 | 10 | 506 unique words, target 700 |
| /blog/grade-calculator-guide/cumulative-gpa-calculation | blog-cluster | 506 | 10 | 506 unique words, target 700 |
| /blog/grade-calculator-guide/weighted-grade-calculation | blog-cluster | 508 | 12 | 508 unique words, target 700 |
| /blog/qr-code-generator-guide/wifi-qr-code-guide | blog-cluster | 512 | 11 | 512 unique words, target 700 |
| /blog/resume-builder-guide/offer-letter-guide | blog-cluster | 512 | 10 | 512 unique words, target 700 |
| /blog/json-formatter-guide/cron-expression-guide | blog-cluster | 512 | 11 | 512 unique words, target 700 |
| /blog/pdf-merge-guide/combine-pdf-and-images | blog-cluster | 513 | 11 | 513 unique words, target 700 |
| /blog/percentage-calculator-guide/discount-and-sale-price | blog-cluster | 515 | 11 | 515 unique words, target 700 |
| /blog/mortgage-calculator-guide/down-payment-pmi-cost | blog-cluster | 517 | 14 | 517 unique words, target 700 |
| /blog/sip-calculator-guide/monthly-vs-yearly-compounding | blog-cluster | 518 | 11 | 518 unique words, target 700 |
| /blog/image-compressor-guide/image-to-base64-data-url | blog-cluster | 521 | 10 | 521 unique words, target 700 |
| /blog/grade-calculator-guide/how-to-raise-gpa | blog-cluster | 521 | 11 | 521 unique words, target 700 |
| /blog/invoice-generator-guide/small-business-invoicing | blog-cluster | 522 | 13 | 522 unique words, target 700 |
| /blog/json-formatter-guide/mime-type-content-type | blog-cluster | 524 | 10 | 524 unique words, target 700 |
| /blog/debt-payoff-guide/snowball-vs-avalanche | blog-cluster | 524 | 13 | 524 unique words, target 700 |
| /blog/age-calculator-guide/how-to-calculate-age | blog-cluster | 525 | 10 | 525 unique words, target 700 |
| /blog/qr-code-generator-guide/how-to-create-qr-code | blog-cluster | 529 | 10 | 529 unique words, target 700 |
| /blog/age-calculator-guide/timezone-conversion | blog-cluster | 530 | 10 | 530 unique words, target 700 |
| /blog/mortgage-calculator-guide/15-vs-30-year-mortgage | blog-cluster | 534 | 14 | 534 unique words, target 700 |
| /blog/seo-analyzer-guide/canonical-tag-guide | blog-cluster | 535 | 12 | 535 unique words, target 700 |
| /blog/json-formatter-guide/minify-css-js-safely | blog-cluster | 537 | 9 | 537 unique words, target 700 |
| /blog/password-generator-guide/2fa-vs-passkeys | blog-cluster | 546 | 13 | 546 unique words, target 700 |
| /blog/word-counter-guide/text-to-speech-proofreading-use | blog-cluster | 546 | 11 | 546 unique words, target 700 |
| /blog/image-compressor-guide/instagram-image-resize | blog-cluster | 546 | 12 | 546 unique words, target 700 |
| /blog/pdf-merge-guide/merge-pdfs-on-iphone | blog-cluster | 546 | 10 | 546 unique words, target 700 |
| /blog/seo-analyzer-guide/internal-linking-guide | blog-cluster | 548 | 12 | 548 unique words, target 700 |
| /blog/debt-payoff-guide/debt-avalanche-method | blog-cluster | 549 | 12 | 549 unique words, target 700 |
| /blog/debt-payoff-guide/debt-free-date | blog-cluster | 549 | 11 | 549 unique words, target 700 |
| /blog/signature-maker-guide/signature-image-for-email | blog-cluster | 550 | 10 | 550 unique words, target 700 |
| /blog/mortgage-calculator-guide/should-i-refinance-my-mortgage | blog-cluster | 553 | 13 | 553 unique words, target 700 |
| /blog/json-formatter-guide/html-entities-encode-decode | blog-cluster | 554 | 10 | 554 unique words, target 700 |
| /blog/json-formatter-guide/format-sql-queries | blog-cluster | 555 | 10 | 555 unique words, target 700 |
| /blog/sip-calculator-guide/sip-1-crore-goal | blog-cluster | 558 | 9 | 558 unique words, target 700 |
| /blog/signature-maker-guide/signature-for-exam-forms | blog-cluster | 562 | 11 | 562 unique words, target 700 |
| /blog/invoice-generator-guide/proforma-vs-tax-invoice | blog-cluster | 564 | 10 | 564 unique words, target 700 |
| /blog/json-formatter-guide/json-to-csv | blog-cluster | 565 | 10 | 565 unique words, target 700 |
| /blog/json-formatter-guide/estimate-ai-token-cost | blog-cluster | 565 | 9 | 565 unique words, target 700 |
| /blog/word-counter-guide/lorem-ipsum-generator-use | blog-cluster | 566 | 11 | 566 unique words, target 700 |
| /blog/bmi-calculator-guide/healthy-weight-range | blog-cluster | 566 | 11 | 566 unique words, target 700 |
| /blog/pdf-merge-guide/fix-sideways-scans | blog-cluster | 567 | 10 | 567 unique words, target 700 |
| /blog/grade-calculator-guide/gpa-vs-cgpa | blog-cluster | 568 | 10 | 568 unique words, target 700 |
| /blog/debt-payoff-guide/how-to-pay-off-credit-card-debt | blog-cluster | 569 | 14 | 569 unique words, target 700 |
| /blog/image-compressor-guide/jpg-to-png | blog-cluster | 570 | 10 | 570 unique words, target 700 |
| /blog/sip-calculator-guide/fd-quarterly-tds | blog-cluster | 571 | 12 | 571 unique words, target 700 |
| /blog/resume-builder-guide/resume-format-guide | blog-cluster | 573 | 13 | 573 unique words, target 700 |
| /blog/pdf-merge-guide/merge-pdfs-on-android | blog-cluster | 573 | 10 | 573 unique words, target 700 |
| /blog/sip-calculator-guide/ppf-extend-15-years | blog-cluster | 575 | 9 | 575 unique words, target 700 |
| /blog/word-counter-guide/how-to-summarize-text-fast | blog-cluster | 576 | 12 | 576 unique words, target 700 |
| /blog/json-formatter-guide/inspect-csv-before-import | blog-cluster | 576 | 10 | 576 unique words, target 700 |
| /blog/sip-calculator-guide/lumpsum-compounding-frequency | blog-cluster | 576 | 12 | 576 unique words, target 700 |
| /blog/bmi-calculator-guide/bmi-for-men | blog-cluster | 577 | 11 | 577 unique words, target 700 |
| /blog/pdf-merge-guide/extract-pages-range | blog-cluster | 582 | 10 | 582 unique words, target 700 |
| /blog/signature-maker-guide/transparent-signature-png | blog-cluster | 582 | 13 | 582 unique words, target 700 |
| /blog/signature-maker-guide/sign-pdf-without-printing | blog-cluster | 583 | 10 | 583 unique words, target 700 |
| /blog/sip-calculator-guide/budget-2026-verdict-salaried | blog-cluster | 588 | 9 | 588 unique words, target 700 |
| /blog/signature-maker-guide/electronic-signature-validity | blog-cluster | 591 | 10 | 591 unique words, target 700 |
| /blog/debt-payoff-guide/debt-consolidation-vs-payoff | blog-cluster | 591 | 12 | 591 unique words, target 700 |
| /blog/invoice-generator-guide/international-client-invoicing | blog-cluster | 594 | 10 | 594 unique words, target 700 |
| /blog/sip-calculator-guide/sip-5000-10-years | blog-cluster | 594 | 9 | 594 unique words, target 700 |
| /blog/json-formatter-guide/url-slug-rules | blog-cluster | 596 | 10 | 596 unique words, target 700 |
| /blog/pdf-merge-guide/jpg-scans-single-pdf | blog-cluster | 598 | 11 | 598 unique words, target 700 |
| /blog/image-compressor-guide/compress-jpg-200kb | blog-cluster | 599 | 12 | 599 unique words, target 700 |
| /blog/debt-payoff-guide/debt-snowball-method | blog-cluster | 599 | 12 | 599 unique words, target 700 |
| /blog/image-compressor-guide/compress-jpg-20kb | blog-cluster | 601 | 11 | 601 unique words, target 700 |
| /blog/json-formatter-guide/format-xml-sitemaps-feeds | blog-cluster | 603 | 10 | 603 unique words, target 700 |
| /blog/bmi-calculator-guide/bmi-for-children-teens | blog-cluster | 607 | 12 | 607 unique words, target 700 |
| /blog/password-generator-guide/what-to-do-after-data-breach | blog-cluster | 608 | 12 | 608 unique words, target 700 |
| /blog/age-calculator-guide/unix-timestamp-conversion | blog-cluster | 608 | 11 | 608 unique words, target 700 |
| /blog/signature-maker-guide/signature-size-for-pdf | blog-cluster | 611 | 13 | 611 unique words, target 700 |
| /blog/bmi-calculator-guide/bmi-for-women | blog-cluster | 612 | 11 | 612 unique words, target 700 |
| /blog/password-generator-guide/random-password-ideas | blog-cluster | 614 | 11 | 614 unique words, target 700 |
| /blog/word-counter-guide/grammar-check-before-publish | blog-cluster | 617 | 12 | 617 unique words, target 700 |
| /blog/debt-payoff-guide/minimum-payment-trap | blog-cluster | 618 | 12 | 618 unique words, target 700 |
| /blog/qr-code-generator-guide/qr-code-google-forms | blog-cluster | 620 | 13 | 620 unique words, target 700 |
| /blog/pdf-merge-guide/merge-multiple-pdfs-order | blog-cluster | 620 | 8 | 620 unique words, target 700 |
| /blog/seo-analyzer-guide/split-large-sitemap | blog-cluster | 628 | 8 | 628 unique words, target 700 |
| /blog/seo-analyzer-guide/title-meta-length-2026 | blog-cluster | 629 | 12 | 629 unique words, target 700 |
| /blog/seo-analyzer-guide/utm-naming-governance | blog-cluster | 631 | 12 | 631 unique words, target 700 |
| /blog/debt-payoff-guide/extra-payment-strategy | blog-cluster | 633 | 12 | 633 unique words, target 700 |
| /blog/signature-maker-guide/drawn-vs-typed-signature | blog-cluster | 636 | 10 | 636 unique words, target 700 |
| /blog/qr-code-generator-guide/qr-code-restaurant-menu | blog-cluster | 639 | 13 | 639 unique words, target 700 |
| /blog/bmi-calculator-guide/how-bmi-is-calculated | blog-cluster | 640 | 13 | 640 unique words, target 700 |
| /blog/seo-analyzer-guide | blog-pillar | 644 | 13 | 644 unique words, target 700 |
| /blog/seo-analyzer-guide/meta-description-guide | blog-cluster | 644 | 11 | 644 unique words, target 700 |
| /blog/resume-builder-guide/resume-skills-section | blog-cluster | 646 | 11 | 646 unique words, target 700 |
| /blog/qr-code-generator-guide/qr-code-google-reviews | blog-cluster | 652 | 11 | 652 unique words, target 700 |
| /blog/bmi-calculator-guide/bmi-for-athletes | blog-cluster | 652 | 13 | 652 unique words, target 700 |
| /blog/signature-maker-guide/how-to-create-signature-online | blog-cluster | 654 | 12 | 654 unique words, target 700 |
| /blog/resume-builder-guide/resume-summary-examples | blog-cluster | 658 | 12 | 658 unique words, target 700 |
| /blog/pdf-merge-guide/add-draft-watermark | blog-cluster | 658 | 10 | 658 unique words, target 700 |
| /blog/grade-calculator-guide | blog-pillar | 667 | 18 | 667 unique words, target 700 |
| /blog/pdf-merge-guide | blog-pillar | 669 | 16 | 669 unique words, target 700 |
| /blog/resume-builder-guide/career-change-resume | blog-cluster | 673 | 12 | 673 unique words, target 700 |
| /blog/json-formatter-guide/uuid-seed-test-database | blog-cluster | 673 | 7 | 673 unique words, target 700 |
| /blog/bmi-calculator-guide/calorie-deficit-for-weight-loss | blog-cluster | 679 | 13 | 679 unique words, target 700 |
| /blog/bmi-calculator-guide/daily-water-intake | blog-cluster | 679 | 14 | 679 unique words, target 700 |

## 3. Broken URLs (0)

_None — every sitemap URL returned 200._

## 4. Near-duplicate pairs (0 ≥ 50% shingle overlap)

_No page pair shares 50%+ of its 8-word shingles._

## 5. Metadata outliers

| Check | URLs |
| --- | --- |
| Titles > 60 chars | 1 |
| Titles < 25 chars | 0 |
| Descriptions > 160 chars | 2 |
| Descriptions < 70 chars | 0 |
| Missing H1 | 0 |
| Multiple H1 | 0 |
| No internal links in main | 0 |
| No H2 sections | 0 |

## 6. Suggested 60-day index set

Concrete starting surface: 29 URLs. Everything else stays live for users but carries `noindex, follow` and is absent from `sitemap.xml`.

| Path | Type | Unique words |
| --- | --- | --- |
| / | home | 481 |
| /about | static | 285 |
| /age-calculator | tool | 376 |
| /author | static | 176 |
| /blog | static | 804 |
| /blog/mortgage-calculator-guide | blog-pillar | 980 |
| /blog/password-generator-guide | blog-pillar | 1108 |
| /blog/qr-code-generator-guide | blog-pillar | 932 |
| /blog/resume-builder-guide | blog-pillar | 1009 |
| /blog/word-counter-guide | blog-pillar | 1173 |
| /contact | static | 97 |
| /debt-payoff-calculator | tool | 586 |
| /document-generator | tool | 586 |
| /invoice-generator | tool | 503 |
| /json-formatter | tool | 470 |
| /methodology | static | 313 |
| /mortgage-calculator | tool | 430 |
| /password-generator | tool | 423 |
| /pdf-merge | tool | 498 |
| /percentage-calculator | tool | 405 |
| /ppf-calculator | tool | 593 |
| /privacy | static | 317 |
| /qr-code-generator | tool | 449 |
| /resume-builder | tool | 517 |
| /sitemap | static | 1192 |
| /terms | static | 159 |
| /text-to-speech | tool | 414 |
| /unit-converter | tool | 427 |
| /word-counter | tool | 461 |

**Rationale.** Tool pages are this site's strongest asset — all 125 clear the 300-word floor (min 376, median 446) with zero duplicates. The blog is the drag: 179 clusters, none above 700 words, median 512. But note what the crawl also proved: **zero duplicate pairs and zero broken URLs**. This is not a spam or doorway problem — it is a depth and trust problem.

**Sequence (recommended):**

1. Do **not** noindex the 160 `improve` pages. They cost nothing, they are unique, and they can earn long-tail impressions once the domain is trusted. Depth comes later.
2. Apply `noindex, follow` to the 31 pages in section 1 only. That is the reversible, low-risk slice.
3. Resubmit `sitemap.xml` in GSC and run `npm run indexnow`.
4. Request indexing for the 29-URL priority set above — 10–15 per day, not all at once.
5. Fix the real bottleneck: external signals. Three to five genuine mentions (directory, Product Hunt, a dev.to or Reddit post where relevant) will move impressions faster than any on-page change at this stage.

**Do not** treat a 29-URL index set as the goal. It is a starting surface for indexing requests, not a noindex list. Cutting the site to 29 pages would remove the long-tail upside that is the entire point of a tool directory.
