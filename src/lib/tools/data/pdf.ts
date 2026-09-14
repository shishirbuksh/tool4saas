import type { Tool } from "../types";

export const pdfTools: Tool[] = [
  {
    slug: "image-to-pdf",
    title: "Image to PDF",
    short: "Images → PDF",
    description: "Turn JPG or PNG images into a single PDF document. Choose your page size and orientation, then generate it instantly in your browser.",
    icon: "Image",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf"],
    category: "pdf",
    faq: [{ question: "What formats are supported?", answer: "JPG and PNG. Images are scaled to fit page." }, { question: "Is it private?", answer: "Yes, pages scale and assemble with jsPDF locally; your images stay on your device." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Add images", text: "Select multiple images." }, { name: "Choose page", text: "Pick A4 or Letter and orientation." }, { name: "Create", text: "Click Generate PDF and download." }]
  },
  {
    slug: "pdf-merge",
    title: "PDF Merge",
    short: "Merge multiple PDFs",
    description: "Merge and reorder PDF pages instantly in your browser. Select your files and download the combined document without uploading.",
    icon: "PictureAsPdf",
    keywords: ["pdf merge", "combine pdf", "merge pdf online"],
    category: "pdf",
    faq: [{ question: "Is my PDF uploaded?", answer: "No. Merging happens locally in your browser; files never leave your device." }, { question: "Can I reorder files?", answer: "Yes. Drag to reorder files before merging; pages are concatenated in the selected order." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Select PDFs", text: "Choose two or more PDF files from your device." }, { name: "Reorder", text: "Drag to set the desired order." }, { name: "Merge & download", text: "Click Merge and download the combined PDF." }]
  },
  {
    slug: "pdf-compress",
    title: "PDF Compressor",
    short: "Reduce PDF file size",
    description: "Shrink PDF file sizes directly in your browser. Choose your compression level and download a lighter file instantly.",
    icon: "PictureAsPdf",
    keywords: ["pdf compressor", "compress pdf", "reduce pdf size"],
    category: "pdf",
    faq: [{ question: "Is my PDF uploaded?", answer: "No. Compression runs locally in your browser." }, { question: "Will quality be reduced?", answer: "You control the compression level; lighter compression keeps visual quality while reducing file size." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Choose PDF", text: "Select a PDF file from your device." }, { name: "Set compression", text: "Choose compression level." }, { name: "Download", text: "Click Compress and download the smaller PDF." }]
  },
  {
    slug: "pdf-split",
    title: "PDF Splitter",
    short: "Extract pages",
    description: "Split PDFs by extracting custom page ranges, single pages, or every Nth page into new files with live validation, all processed locally and privately offline.",
    icon: "PictureAsPdf",
    keywords: ["split pdf", "extract pages from pdf", "separate pdf pages"],
    category: "pdf",
    faq: [{ question: "Does splitting upload my file?", answer: "No, extraction runs locally via pdf-lib; files never leave your device." }, { question: "Can I extract ranges?", answer: "Yes, type ranges like 1-3,5 or every N pages; the list validates locally before splitting." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Choose PDF", text: "Select a PDF file." }, { name: "Enter ranges", text: "Type pages like 1-3,5." }, { name: "Split & download", text: "Click Split and download new PDF." }]
  },
  {
    slug: "pdf-to-jpg",
    title: "PDF to JPG",
    short: "Pages to images",
    description: "Convert PDF pages into high-quality JPG or PNG images. Adjust scale and quality, then download a ZIP file.",
    icon: "PictureAsPdf",
    keywords: ["pdf to jpg", "pdf to image", "convert pdf pages to png"],
    category: "pdf",
    faq: [{ question: "What scale to pick?", answer: "1x for web, 2x for print; higher scale means larger images." }, { question: "Is my PDF uploaded?", answer: "No, pages render with pdf.js locally at your scale; your file never leaves the browser." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Choose PDF", text: "Select a PDF file up to 10MB." }, { name: "Set scale", text: "Pick scale and JPEG quality." }, { name: "Convert", text: "Render pages and download JPGs." }]
  },
  {
    slug: "pdf-rotate",
    title: "Rotate PDF Pages",
    short: "Rotate all pages",
    description: "Rotate PDF pages by 90, 180, or 270 degrees. Fix page orientation and save the updated file directly from your browser.",
    icon: "PictureAsPdf",
    keywords: ["rotate pdf", "rotate pdf pages", "pdf rotate online"],
    category: "pdf",
    faq: [{ question: "Does it rotate all pages?", answer: "Yes, applies selected angle to every page via pdf-lib locally." }, { question: "Is my PDF uploaded?", answer: "No, 90/180/270-degree rotation applies with pdf-lib locally; your file stays on your device." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Choose PDF", text: "Select a PDF up to 10MB." }, { name: "Pick angle", text: "Choose 90, 180 or 270 degrees." }, { name: "Rotate", text: "Click Rotate and download." }]
  },
  {
    slug: "pdf-watermark",
    title: "PDF Watermark",
    short: "Add text watermark",
    description: "Stamp your PDFs with custom text watermarks. Adjust text, opacity, and placement, then download your watermarked file.",
    icon: "PictureAsPdf",
    keywords: ["pdf watermark", "add watermark pdf", "watermark pdf online"],
    category: "pdf",
    faq: [{ question: "Where is watermark placed?", answer: "Center diagonal or corners with opacity control via pdf-lib drawText." }, { question: "Is my PDF uploaded?", answer: "No, diagonal or corner text draws with pdf-lib locally; your PDF never leaves the browser." }, { question: "Is it free and private?", answer: "Yes, it is free, works offline in your browser, and your data never leaves your device." }],
    howTo: [{ name: "Choose PDF", text: "Select a PDF up to 10MB." }, { name: "Enter text", text: "Type watermark and set opacity." }, { name: "Apply", text: "Click Watermark and download." }]
  },
];
