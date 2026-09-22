import type { Tool } from "../types";

export const businessTools: Tool[] = [
  {
    slug: "invoice-generator",
    title: "Invoice Generator",
    short: "Create & download professional invoices",
    description:
      "Build clean PDF invoices with your logo, line items, taxes and totals. Free invoice generator that works offline in your browser with no sign-up needed.",
    icon: "ReceiptLong",
    keywords: ["invoice generator", "free invoice maker", "download invoice pdf"],
    category: "business",
    faq: [{"question":"Is the invoice generator free to use?","answer":"Yes, completely free with no sign-up. Everything runs in your browser; e.g. a 10-line $550 invoice with logo stays on-device, works offline, and Print to PDF is unlimited. No account, watermark or upload is required."},{"question":"Can I download or print the invoice as PDF?","answer":"Yes. Use browser Print with Ctrl or Cmd+P and choose Save as PDF; the layout is print-formatted. Example: INV-2026-001 dated Sept 14, 2026 saves as invoice-acme-001.pdf with logo, $500 subtotal, $50 tax and $550 total crisp on A4."},{"question":"How many line items can an invoice hold?","answer":"Add up to 50 line items with qty, rate and tax, e.g. 3 design tasks at $250 each, with auto subtotal, tax and grand total."}],
    howTo: [{"name":"Enter sender details","text":"Add business name, logo and invoice no., e.g. INV-2026-001 dated Sept 14, 2026."},{"name":"Add line items","text":"Add rows like Logo design, qty 2, $250 each and set tax e.g. 10%."},{"name":"Review totals","text":"Check subtotal e.g. $500, tax $50 and total $550 in live preview."},{"name":"Download or print","text":"Use Print to Save as PDF, e.g. invoice-acme-001.pdf, fully offline."}],
    guide: [{ heading: "What a professional invoice is", body: "A professional invoice is a bill that lists seller details, line items with quantities and rates, tax, and the total due with payment terms. Freelancers use it to bill 3 design tasks at $250 each for a $750 subtotal plus 10% tax, while shops bill 20 units at $40 each for $800. Our invoice generator builds this layout locally with your logo, invoice number like INV-2026-001, up to 50 lines, and live totals, then exports a crisp PDF with no sign-up." }, { heading: "How invoice totals are calculated", body: "Totals use subtotal equals the sum of quantity times rate, tax equals subtotal times tax percent, and total equals subtotal plus tax. For example, 2 logos at $250 each give a $500 subtotal, 10% tax adds $50, and the total is $550. Add a $60 rush fee to reach $560 subtotal, $56 tax, and $616 total. The preview updates each row instantly, handles up to 50 lines, and keeps all math in your browser, so a 10-line $550 invoice never uploads." }, { heading: "Worked example and limitations", body: "Build INV-2026-001 dated Sept 14, 2026 with 2 items at $250, confirm $500 subtotal, $50 tax, and $550 total, then Print to invoice-acme-001.pdf on A4. This covers clean PDF billing only and excludes accounting, GST rules, recurring payments, and legal advice. For quotes first use the quotation-generator tool, for payment slips use the receipt-generator tool, and for Indian GST split use freelance help. Verify tax with your accountant. See /terms." }]
  },
  {
    slug: "resume-builder",
    title: "Resume Builder",
    short: "Build a clean resume and export to PDF",
    description:
      "Create ATS-friendly resumes with experience, education and skills sections. Preview instantly and export to PDF offline. Free resume builder, no upload.",
    icon: "Description",
    keywords: ["resume builder", "free cv maker", "online resume creator"],
    category: "business",
    faq: [{"question":"Is my resume saved on a server?","answer":"No. Everything stays in your browser. You can print or save the resume to PDF locally."},{"question":"Will the resume pass ATS (applicant tracking systems)?","answer":"The layout uses standard headings and clean text, which is ATS-friendly. Avoid images in the body for best results."},{"question":"What sections and export formats are supported?","answer":"Includes summary, experience, education and skills, e.g. 3 roles with bullets, exported via Print to clean single-page PDF."}],
    howTo: [{"name":"Add your profile","text":"Fill name, headline and summary, e.g. Aarav Mehta, Frontend Dev, 4 yrs React."},{"name":"Add experience","text":"Add 2-3 roles like UI Engineer at Zeta, 2022-2025, +30% conversion."},{"name":"Add education and skills","text":"Add degree plus 8-10 skills like TypeScript, Next.js, Figma."},{"name":"Export to PDF","text":"Preview single-page layout and Print to PDF, e.g. aarav-resume.pdf, offline."}],
    guide: [{ heading: "What a clean resume is", body: "A clean resume is a one-page summary of contact details, headline, experience bullets, education, and 8 to 10 skills that recruiters scan in seconds. A frontend developer lists 4 years of React, 3 roles, and a +30% conversion win, while a graduate lists 1 internship, 2 projects, and 8 skills. Our resume builder formats these sections with standard headings, instant preview, and Print-to-PDF export locally, keeping every draft private with no upload or account." }, { heading: "How to structure a one-page resume", body: "Build with a simple formula: headline plus 3-sentence summary, 2 to 3 roles with 3 bullets each, degree plus year, and 8 to 10 keywords. For example, Aarav Mehta, Frontend Dev, adds UI Engineer at Zeta 2022 to 2025 with shipped 12 flows and +30% signup, BSc 2021, and TypeScript plus Next.js. Keep it to 1 page, 400 to 600 words, and standard fonts. The live preview trims overflow instantly, all in your browser offline." }, { heading: "Worked example and limitations", body: "Export aarav-resume.pdf via Print on A4, then test 1 page versus 2 pages and 8 versus 12 skills for fit. This creates clean ATS-friendly layouts only and cannot guarantee interviews, check grammar deeply, or tailor to every posting. For matched wording use the ats-resume-checker tool, and for tailored letters use the cover-letter-builder tool with 250 to 350 words. Keep personal data local. See /terms." }]
  },
  {
    slug: "commission-calculator",
    title: "Commission Calculator",
    short: "Calculate sales commission",
    description: "Calculate sales commission and total payouts from deal value and rate instantly. Enter amounts to see splits update live. Free offline commission calculator.",
    icon: "AttachMoney",
    keywords: ["commission calculator", "sales commission", "calculate commission online"],
    category: "business",
    faq: [{"question":"How is commission calculated?","answer":"Multiply sales by rate divided by 100 to get pay. Total equals sales plus commission. For example, $9,600 at 7% gives $672 and $10,272 total. Enter amounts in this tool to see splits update live. No signup is needed. See /terms."},{"question":"Are calculations local?","answer":"Yes. Deal value and rate math runs locally in your browser. For example, a $14,200 deal never uploads, works offline free, and clears when you close the tab. No account or server is used. Your sales facts stay private on your device. See /terms."},{"question":"Can I handle tiered or split commissions?","answer":"This tool does flat-rate math plus manual slab runs. For example, $13,000 at 5% gives $650; run higher slabs apart and add totals. For teams, split the $1,140 payout by share, like 60/40. This is math help only. Confirm plans with sales ops. See /terms."}],
    howTo: [{"name":"Enter sales amount","text":"Type sales like $10,000 for the deal."},{"name":"Enter commission rate","text":"Type rate like 7.5%; e.g. 10% on $2,000 equals $200."},{"name":"View results","text":"See commission e.g. $750 and total $10,750 update instantly."},{"name":"Compare scenarios","text":"Try 5% vs 10%, e.g. $500 vs $1,000 on $10,000, to negotiate splits."}],
    guide: [{ heading: "Flat commission math", body: "Commission equals sales times rate divided by 100. Total payout equals sales plus commission. For example, $10,000 at 10% gives $1,000 commission and $11,000 total. Try $8,400 at 6% for $504. Enter deal value and rate to see splits update live. All math runs in your browser. Use gross deal value. No fees are added. Copy results for payroll. Works offline free. See /terms." }, { heading: "Tiered slab rates", body: "Tiers pay higher rates as sales grow. For example, 5% to $12,000, then 8% above that mark. A $18,000 deal gives $600 on the first slab plus $480 on the extra $6,000, totaling $1,080. Run each slab in this tool and add totals. This beats flat rates for top sellers. Save each slab result. Set clear cut points. Share slabs in writing. Test 5% versus 8%. See /terms." }, { heading: "Team splits and limits", body: "Split deals by share percent before you pay. For example, a $7,500 payout split 60/40 gives $4,500 and $3,000. Enter each share as its own run. This tool covers flat and manual slab math only. It skips tax, refunds, and chargebacks. Confirm splits with sales ops. Use net collected sales. Deduct refunds first. Keep signed split sheets. Works offline on your device. See /terms." }],
  },
  {
    slug: "ats-resume-checker",
    title: "ATS Resume Checker",
    short: "Check resume vs job",
    description: "Compare your resume against job descriptions for keyword coverage and match percentage. Find missing terms instantly. Free offline ATS resume checker tool.",
    icon: "VerifiedUser",
    keywords: ["ats resume checker", "resume keyword checker", "ats checker online"],
    category: "business",
    faq: [{"question":"How is score calculated?","answer":"Extracts keywords from job (minus stopwords) and checks coverage in resume via word-boundary regex."},{"question":"Is my resume uploaded?","answer":"No, keyword extraction and coverage scoring run locally in the browser; your résumé stays on your device."},{"question":"How long can my resume and job texts be?","answer":"Paste up to about 15,000 characters each, e.g. a 2-page resume versus 300-word posting, scored locally with no upload."}],
    howTo: [{"name":"Paste resume text","text":"Paste resume, e.g. 400-word summary with React, Node, AWS skills."},{"name":"Paste job description","text":"Paste posting, e.g. 300-word JD asking for Next.js, TypeScript, CI/CD."},{"name":"Check match score","text":"View coverage like 72% plus missing list e.g. Docker, Jest."},{"name":"Fix keywords","text":"Add missing terms naturally, e.g. add led CI/CD rollout, then re-check to 90%+."}]
  },
  {
    slug: "signature-maker",
    title: "Signature Maker",
    short: "Draw & type signature",
    description: "Draw or type your signature with adjustable stroke, ink color and fonts, then download a transparent PNG for contracts. Free offline signature maker tool.",
    icon: "Image",
    keywords: ["signature maker", "draw signature", "create signature online"],
    category: "business",
    faq: [{"question":"Can I draw with touch?","answer":"Yes, supports mouse and touch with pen width and color."},{"question":"Is it private?","answer":"Yes, canvas drawing stays in your browser."},{"question":"What download size and format do I get?","answer":"Exports transparent PNG around 1200x400 px, e.g. black 3px stroke on clear background, ready for PDFs and contracts."}],
    howTo: [{"name":"Draw or type","text":"Draw with mouse or touch, or type e.g. Jane Doe in script font."},{"name":"Style the ink","text":"Set width e.g. 3px, color e.g. #0F172A navy, and font e.g. cursive."},{"name":"Preview transparent","text":"Check on white and dark, e.g. 1200x400 px PNG with clear background."},{"name":"Download PNG","text":"Save like jane-signature.png for PDFs, contracts and forms."}]
  },
  {
    slug: "quotation-generator",
    title: "Quotation Generator",
    short: "Create quotations",
    description: "Create professional quotes with line items, tax, notes and totals. Preview, print and save locally with no account. Free offline quotation generator tool.",
    icon: "ReceiptLong",
    keywords: ["quotation generator", "quote maker", "estimate generator"],
    category: "business",
    faq: [{"question":"How is quote total calculated?","answer":"Quote subtotal adds qty times rate per line, tax applies on subtotal, total adds both. Example: 10 hours at $60 equals $600, 18% tax adds $108, total $708."},{"question":"Does my quote data leave my device?","answer":"No. Quote rows, client names and notes live only in tab memory via local state; closing the tab clears the draft, Print to PDF stays on-device, free offline."},{"question":"Can I add validity dates and payment notes?","answer":"Yes, add quote number, e.g. QUO-2026-014, plus 15-day validity, tax percent and bank terms before printing to PDF."}],
    howTo: [{"name":"Fill header details","text":"Enter from/to, number e.g. QUO-2026-014 and date Sept 14, 2026."},{"name":"Add line items","text":"Add rows like Kitchen remodel, 10 hrs, $60/hr with qty and rate."},{"name":"Set tax and notes","text":"Set tax e.g. 18% and note e.g. Valid 15 days, 50% advance."},{"name":"Print to PDF","text":"Preview totals e.g. $708 incl. tax and Print to quote-014.pdf."}],
    guide: [{ heading: "What a quote is", body: "A quote tells a buyer the price before work starts. It lists tasks, qty, rate, tax, and total due. A plumber quotes 10 hours at $60 for $600. A shop quotes 20 packs at $8 for $160. Our tool builds this sheet in your browser. Add QUO-2026-014, dates, and notes. Print to PDF in one click. No sign-up, no upload, works offline." }, { heading: "How totals, validity and GST terms work", body: "Totals use subtotal equals qty times rate, tax equals subtotal times rate, total equals sum. For example $600 at 18% tax adds $108 for $708 due. Set 15-day validity and 50% advance in notes. Same-state GST splits 9% plus 9%, far-state uses 18% IGST. Confirm slabs with your CA. This is format help only, not tax advice before you send the quote." }, { heading: "Shared flow, worked example and limits", body: "Use quotes as step one of a cash flow. Buyer says yes, then sends a PO like PO-1042. You bill with our invoice generator at /invoice-generator as INV-2026-001. Buyer pays, then you give a receipt like RCP-0231. Keep numbers linked for clear books. This tool makes quotes only, not books or legal proof. See /terms. Save each PDF with dates for fast tax time checks." }],
  },
  {
    slug: "purchase-order-generator",
    title: "Purchase Order Generator",
    short: "Create purchase orders",
    description: "Generate purchase orders with supplier details, line items, taxes and totals. Preview and print cleanly offline. Free purchase order generator, no sign-up.",
    icon: "ReceiptLong",
    keywords: ["purchase order generator", "po generator", "create purchase order"],
    category: "business",
    faq: [{"question":"How is PO total calculated?","answer":"PO subtotal sums qty times cost, tax applies once, total is sum plus tax. Example: 20 reams at $8 equals $160, 5% tax adds $8, total $168."},{"question":"Does supplier data upload anywhere?","answer":"No. Supplier names, ship-to addresses and PO lines persist only in this tab's in-memory store; nothing posts to a server, export via local Print to PDF."},{"question":"Can I reuse PO numbers across orders?","answer":"Yes, set custom numbers like PO-1042 per supplier locally; drafts stay in tab memory, so save PDFs for records."}],
    howTo: [{"name":"Fill supplier details","text":"Enter supplier, ship-to and PO no. e.g. PO-1042 dated Sept 14, 2026."},{"name":"Add order lines","text":"Add items like A4 paper, 20 reams, $8 each with qty and rate."},{"name":"Set tax and total","text":"Apply tax e.g. 5% to see subtotal $160, tax $8, total $168."},{"name":"Preview and print","text":"Review layout and Print to PDF e.g. PO-1042-acme.pdf for records."}]
  },
  {
    slug: "cover-letter-builder",
    title: "Cover Letter Builder",
    short: "Build cover letters",
    description: "Build tailored cover letters fast with applicant and job details plus tone options. Preview, copy or print instantly. Free offline cover letter builder tool.",
    icon: "Description",
    keywords: ["cover letter builder", "cover letter generator", "make cover letter"],
    category: "business",
    faq: [{"question":"Can I customize tone?","answer":"Yes, choose professional, enthusiastic or concise tone; placeholders are replaced."},{"question":"Is it private?","answer":"Yes, paragraphs assemble locally from your inputs and chosen tone; nothing leaves the browser."},{"question":"How long should my cover letter be?","answer":"Aim for 250-350 words in 3-4 paragraphs, e.g. intro, 2 proof points and close; the builder trims filler for concise tone."}],
    howTo: [{"name":"Enter details","text":"Fill name, role e.g. UX Designer at Zeta, manager and date."},{"name":"Choose tone","text":"Pick professional, enthusiastic or concise; e.g. concise for startups."},{"name":"Customize body","text":"Edit 3 paragraphs about 280 words, e.g. add shipped 12 flows, +18% signup."},{"name":"Copy or print","text":"Preview, copy text or Print to PDF like cover-zeta.pdf offline."}]
  },
  {
    slug: "receipt-generator",
    title: "Receipt Generator",
    short: "Free PDF receipts",
    description: "Create professional payment receipts with seller details, items, tax and totals. Print or save as PDF locally. Free offline receipt generator, no sign-up.",
    icon: "ReceiptLong",
    keywords: ["receipt generator", "receipt maker free", "payment receipt pdf"],
    category: "business",
    faq: [{"question":"How is receipt total calculated?","answer":"Receipt subtotal sums price times qty, tax adds on top, total is amount paid. Example: 2 shirts at $25 equals $50, 5% tax adds $2.50, total $52.50."},{"question":"Are buyer details kept private?","answer":"No upload. Seller, buyer and item rows compute totals with local script only; files never attach to mail, save via browser Print to PDF offline."},{"question":"Can I create bulk receipts for many sales?","answer":"Create one receipt at a time, e.g. RCP-0231 for $49, print to PDF, then reset for the next; bulk CSV comes from fake-data tool."}],
    howTo: [{"name":"Fill receipt header","text":"Enter seller, buyer, no. e.g. RCP-0231 and date Sept 14, 2026."},{"name":"Add sold items","text":"Add lines like T-shirt, 2 x $25 plus payment mode e.g. UPI."},{"name":"Set tax and total","text":"Add tax e.g. 5% to show subtotal $50, tax $2.50, total $52.50."},{"name":"Print receipt","text":"Preview and Print to PDF e.g. receipt-0231.pdf for records."}]
  },
  {
    slug: "offer-letter-generator",
    title: "Offer Letter Generator",
    short: "Offer letter + CTC PDF",
    description: "Generate professional job offer letters with role, CTC, joining date and terms. Preview, copy or print to PDF locally. Free offer letter generator template.",
    icon: "Description",
    keywords: ["offer letter generator", "job offer letter format", "offer letter with ctc india"],
    category: "business",
    faq: [{"question":"Is this legal advice?","answer":"No, template only for informational purposes. Have HR or counsel review probation, notice and jurisdiction clauses."},{"question":"Can I download as PDF?","answer":"Yes, preview the letter and use Print to save as PDF; CTC table and signature block are print-formatted."},{"question":"Is my offer-letter data uploaded anywhere?","answer":"No. Candidate, CTC and company details stay in your browser; use Print to PDF locally and close the tab to clear."}],
    howTo: [{"name":"Enter offer details","text":"Fill candidate, role e.g. SDE-1, CTC e.g. Rs 8 LPA, joining Oct 1, 2026."},{"name":"Set employment terms","text":"Add probation e.g. 6 months, notice e.g. 60 days, location e.g. Bengaluru."},{"name":"Preview letter","text":"Check CTC table, clauses and signature block for typos."},{"name":"Export letter","text":"Copy text or Print to PDF like offer-aarav-sde1.pdf locally."}]
  },
  {
    slug: "payslip-generator",
    title: "Payslip Generator",
    short: "Salary slip + net pay",
    description: "Use this payslip generator for salary slips with earnings, PF, tax and net pay. Enter CTC breakup, month and employer details, then preview and print PDF offline.",
    icon: "ReceiptLong",
    keywords: ["payslip generator", "salary slip generator india", "pay stub maker pdf"],
    category: "business",
    faq: [{"question":"Is the payslip legally valid?","answer":"For illustration only, not proof of employment. Ask your employer or CA for official payroll records for loans and visas."},{"question":"What deductions are included?","answer":"Basic, HRA, allowances plus PF, professional tax and TDS inputs; net = gross minus deductions."},{"question":"Do my salary figures leave my device?","answer":"No. Basic, HRA, PF and TDS inputs stay local; net pay is computed in-browser and exported via local PDF print."}],
    howTo: [{"name":"Enter employer details","text":"Add company, employee e.g. Aarav Mehta, EMP-042, month Sept 2026, PAN."},{"name":"Add salary breakup","text":"Type earnings e.g. Basic Rs 30,000, HRA Rs 15,000 and deductions PF Rs 3,600, TDS Rs 2,000."},{"name":"Preview net pay","text":"Verify gross e.g. Rs 55,000 minus Rs 5,600 equals net Rs 49,400."},{"name":"Print payslip","text":"Export via Print to PDF e.g. payslip-sept-2026.pdf offline."}]
  },
  {
    slug: "rent-receipt-generator",
    title: "Rent Receipt Generator",
    short: "HRA rent receipts PDF",
    description: "Use this rent receipt generator for HRA with landlord PAN, address and payment mode. Enter months and rent to get print-ready PDF offline. Template only.",
    icon: "ReceiptLong",
    keywords: ["rent receipt generator hra", "house rent receipt pdf india", "rent receipt with pan"],
    category: "business",
    faq: [{"question":"Are these valid for HRA?","answer":"Commonly used with PAN and bank proof; confirm with your employer or CA. Receipts support claims but are not a registered agreement."},{"question":"Can I generate 12 months at once?","answer":"Yes, select multiple months to create a multi-page PDF with revenue-stamp note where applicable."},{"question":"Are tenant and landlord details stored online?","answer":"No. Names, PAN, address and rent amounts stay in your browser; bulk PDFs generate locally for HRA filing."}],
    howTo: [{"name":"Enter parties","text":"Add tenant e.g. Aarav, landlord e.g. R. Sharma, PAN ABCPS1234F, address."},{"name":"Set rent and months","text":"Enter rent e.g. Rs 18,000 and tick Jan-Mar 2026 or full 12 months."},{"name":"Generate receipts","text":"Create paginated slips with mode e.g. UPI plus stamp note if over Rs 5,000."},{"name":"Download PDF","text":"Save bulk file e.g. rent-2026-hra.pdf for employer proof."}]
  },
  {
    slug: "freelance-gst-invoice-generator",
    title: "Freelance GST Invoice Generator",
    short: "GST invoice + tax PDF",
    description: "Use this GST invoice generator for freelance invoices with GSTIN and auto CGST/SGST vs IGST split. Enter services, rate and GST percent to download PDF locally.",
    icon: "ReceiptLong",
    keywords: ["freelance gst invoice format india", "gst invoice generator india", "cgst sgst invoice freelancer"],
    category: "business",
    faq: [{"question":"Do I need a GSTIN?","answer":"Only if registered; otherwise issue a bill without GST. Verify thresholds with your CA before charging tax."},{"question":"How is CGST vs IGST decided?","answer":"Same-state supply splits CGST/SGST; inter-state uses IGST based on place-of-supply state code."},{"question":"Is GST math done locally without upload?","answer":"Yes. Rows, SAC codes and CGST/SGST vs IGST splits calculate in-browser; e.g. 18% on Rs 10,000 splits to 9% + 9%."}],
    howTo: [{"name":"Enter supplier info","text":"Add name, GSTIN e.g. 27ABCDE1234F1Z5 and invoice no. e.g. INV-GST-011."},{"name":"Add service lines","text":"Add rows like UI design, SAC 9983, 10 hrs x Rs 2,000, GST 18%."},{"name":"Review GST split","text":"Check same-state 9%+9% vs inter-state 18%, e.g. Rs 3,600 on Rs 20,000, plus total in words."},{"name":"Save invoice PDF","text":"Preview and Print to e.g. gst-invoice-011.pdf locally; confirm with CA."}]
  },
];
