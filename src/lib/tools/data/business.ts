import type { Tool } from "../types";

export const businessTools: Tool[] = [
  {
    slug: "invoice-generator",
    title: "Invoice Generator",
    short: "Create & download professional invoices",
    description:
      "Build clean PDF invoices with your logo, line items, and taxes. Fast, offline, and private directly in your browser.",
    icon: "ReceiptLong",
    keywords: ["invoice generator", "free invoice maker", "download invoice pdf"],
    category: "business",
    faq: [{"question":"Is the invoice generator free to use?","answer":"Yes, it is completely free and runs in your browser. Your data never leaves your device."},{"question":"Can I download or print the invoice as PDF?","answer":"Yes. Use your browser's Print (Ctrl/Cmd+P) and choose 'Save as PDF' — the invoice is formatted for clean printing."},{"question":"Is it free and private?","answer":"Yes, it is free, works offline in your browser, and your data never leaves your device."}],
    howTo: [{"name":"Enter sender details","text":"Enter your business details and invoice number in the sender section."},{"name":"Add line items","text":"Add line items with description, quantity, and rate; set the tax percentage if needed."},{"name":"Download or print","text":"Preview the invoice and use Print / Save as PDF to download it."}],
  },
  {
    slug: "resume-builder",
    title: "Resume Builder",
    short: "Build a clean resume and export to PDF",
    description:
      "Create ATS-friendly resumes with experience, education, and skills sections. Preview and export to PDF instantly offline.",
    icon: "Description",
    keywords: ["resume builder", "free cv maker", "online resume creator"],
    category: "business",
    faq: [{"question":"Is my resume saved on a server?","answer":"No. Everything stays in your browser. You can print or save the resume to PDF locally."},{"question":"Will the resume pass ATS (applicant tracking systems)?","answer":"The layout uses standard headings and clean text, which is ATS-friendly. Avoid images in the body for best results."},{"question":"Is it free and private?","answer":"Yes, it is free, works offline in your browser, and your data never leaves your device."}],
    howTo: [{"name":"Add your profile","text":"Fill in your name, headline, summary, and skills."},{"name":"Add experience and education","text":"Add your work experience and education entries."},{"name":"Export","text":"Preview the resume and print or save it as a PDF."}],
  },
  {
    slug: "commission-calculator",
    title: "Commission Calculator",
    short: "Calculate sales commission",
    description: "Calculate sales commission and total payouts from deal value and rates instantly. Works offline in your browser.",
    icon: "AttachMoney",
    keywords: ["commission calculator", "sales commission", "calculate commission online"],
    category: "business",
    faq: [{ question: "How is commission calculated?", answer: "Commission = sales × (rate ÷ 100). Total = sales + commission." }, { question: "Are calculations local?", answer: "Yes. All calculations run in your browser." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter sales", text: "Enter the sales amount in dollars." }, { name: "Enter rate", text: "Enter commission rate as a percentage." }, { name: "View result", text: "See commission and total update instantly." }],
  },
  {
    slug: "ats-resume-checker",
    title: "ATS Resume Checker",
    short: "Check resume vs job",
    description: "Compare your resume against job descriptions for keyword coverage. See match percentage and missing keywords instantly offline.",
    icon: "VerifiedUser",
    keywords: ["ats resume checker", "resume keyword checker", "ats checker online"],
    category: "business",
    faq: [{ question: "How is score calculated?", answer: "Extracts keywords from job (minus stopwords) and checks coverage in resume via word-boundary regex." }, { question: "Is my resume uploaded?", answer: "No, keyword extraction and coverage scoring run locally in the browser; your résumé stays on your device." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Paste resume", text: "Paste your resume text." }, { name: "Paste job", text: "Paste job description." }, { name: "Check", text: "See match % and missing keywords." }]
  },
  {
    slug: "signature-maker",
    title: "Signature Maker",
    short: "Draw & type signature",
    description: "Draw or type your signature with adjustable stroke width, ink color, and font styles, then download a transparent PNG for contracts and forms offline.",
    icon: "Image",
    keywords: ["signature maker", "draw signature", "create signature online"],
    category: "business",
    faq: [{ question: "Can I draw with touch?", answer: "Yes, supports mouse and touch with pen width and color." }, { question: "Is it private?", answer: "Yes, canvas drawing stays in your browser." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Draw", text: "Draw signature on canvas." }, { name: "Or type", text: "Or type and choose font." }, { name: "Download", text: "Download PNG with transparent background." }]
  },
  {
    slug: "quotation-generator",
    title: "Quotation Generator",
    short: "Create quotations",
    description: "Create professional quotes with line items, tax, and notes. Preview, print, and save locally offline.",
    icon: "ReceiptLong",
    keywords: ["quotation generator", "quote maker", "estimate generator"],
    category: "business",
    faq: [{ question: "How is total calculated?", answer: "Subtotal = sum(qty×rate), tax = subtotal×rate%, total = subtotal+tax." }, { question: "Is it private?", answer: "Yes, all rows, totals, and notes stay in browser memory; closing the tab clears the draft." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Fill details", text: "Enter from, to, number and date." }, { name: "Add lines", text: "Add line items with qty and rate." }, { name: "Print", text: "Preview and print/download." }]
  },
  {
    slug: "purchase-order-generator",
    title: "Purchase Order Generator",
    short: "Create purchase orders",
    description: "Generate purchase orders with supplier details, line items, and taxes. Preview and print offline in your browser.",
    icon: "ReceiptLong",
    keywords: ["purchase order generator", "po generator", "create purchase order"],
    category: "business",
    faq: [{ question: "How is total calculated?", answer: "Subtotal = sum(qty×rate), tax = subtotal×rate%, total = subtotal+tax." }, { question: "Is it private?", answer: "Yes, supplier details and line items stay in local tab memory; nothing is sent to a server." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Fill details", text: "Enter supplier, ship-to and PO number." }, { name: "Add lines", text: "Add items with qty and rate." }, { name: "Print", text: "Preview and print." }]
  },
  {
    slug: "cover-letter-builder",
    title: "Cover Letter Builder",
    short: "Build cover letters",
    description: "Build tailored cover letters fast. Add applicant and job details, choose a tone, and export instantly offline.",
    icon: "Description",
    keywords: ["cover letter builder", "cover letter generator", "make cover letter"],
    category: "business",
    faq: [{ question: "Can I customize tone?", answer: "Yes, choose professional, enthusiastic or concise tone; placeholders are replaced." }, { question: "Is it private?", answer: "Yes, paragraphs assemble locally from your inputs and chosen tone; nothing leaves the browser." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Enter details", text: "Fill applicant, hiring manager and job details." }, { name: "Choose tone", text: "Pick tone and letter body." }, { name: "Copy", text: "Preview, copy or print cover letter." }]
  },
  {
    slug: "receipt-generator",
    title: "Receipt Generator",
    short: "Free PDF receipts",
    description: "Create professional receipts locally. Add seller details, items, and tax, then download as a print-ready PDF.",
    icon: "ReceiptLong",
    keywords: ["receipt generator", "receipt maker free", "payment receipt pdf"],
    category: "business",
    faq: [{ question: "Can I add logo and tax?", answer: "Yes, add seller details, line items, tax percent and payment method; totals update instantly." }, { question: "Is it private?", answer: "Yes, everything runs locally in your browser." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Fill details", text: "Enter seller, buyer, receipt number and date." }, { name: "Add lines", text: "Add items with quantity and rate." }, { name: "Print", text: "Preview and print or download PDF." }]
  },
];
