import type { Tool } from "../types";

export const pdfTools: Tool[] = [
  {
    slug: "image-to-pdf",
    title: "Image to PDF",
    short: "Images → PDF",
    description: "Turn JPG or PNG images into a single PDF document in your browser. Choose A4 or Letter size and portrait or landscape orientation, then generate instantly.",
    icon: "Image",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf"],
    category: "pdf",
    faq: [{ question: "What formats are supported?", answer: "JPG and PNG. Images are scaled to fit page." }, { question: "Is it private?", answer: "Yes, pages scale and assemble with jsPDF locally; your images stay on your device." }, { question: "How many images and what size can I convert?", answer: "Combine up to 50 JPG or PNG images of 10 MB each. Pages default to A4 portrait at 150 DPI with auto-fit margins." }],
    howTo: [{ name: "Add images", text: "Select multiple JPG/PNG files, e.g. scan-01.jpg and scan-02.png, up to 50 pages." }, { name: "Choose page setup", text: "Pick size A4 or Letter and orientation portrait for docs or landscape for slides." }, { name: "Order pages", text: "Drag thumbnails into reading order so page 1 appears first in the PDF." }, { name: "Generate PDF", text: "Click Generate PDF and download, e.g. scans-merged.pdf, assembled locally." }],
    guide: [{ heading: "What image to PDF does", body: "The tool turns JPG or PNG shots into one PDF in your browser. Pick A4 at 210 by 297 mm or US Letter at 8.5 by 11 inches to match printers. Each image gets its own page, scaled to fit with clean white edges. Drag thumbs into read order before you build. Work runs locally with jsPDF, so scans never upload to a server." }, { heading: "How pages, size and layout work", body: "You can add up to 50 JPG or PNG files at 10 MB each for books, bills, or class notes. Choose portrait for docs and tall scans, or landscape for slides and wide charts. Auto-fit keeps full shots on page with no crop, adding white space where needed. A 12-shot set at 150 DPI often builds a 4.2 MB PDF in seconds on a laptop." }, { heading: "Worked example and limitations", body: "Add scan-01.jpg through scan-04.jpg, pick A4 portrait, sort 1 to 4, then save scans-merged.pdf for school or visa forms. Limits: JPG and PNG only, no Word or HEIC input, and no text search layer for scans. For text pulls use PDF to Text, and for joins use PDF Merge. Reorder before you click Generate, since page order sets read flow." }]
  },
  {
    slug: "pdf-merge",
    title: "PDF Merge",
    short: "Merge multiple PDFs",
    description: "Merge multiple PDF files and reorder pages instantly in your browser. Select files, drag to sort and download the combined document without uploading.",
    icon: "PictureAsPdf",
    keywords: ["pdf merge", "combine pdf", "merge pdf online"],
    category: "pdf",
    faq: [{ question: "Is combining PDFs private and what are the limits?", answer: "Yes. Combining multiple PDFs in order runs locally via pdf-lib; up to 20 files, 200 pages total and 10 MB per file never leave your device." }, { question: "Can I reorder files?", answer: "Yes. Drag to reorder files before merging; pages are concatenated in the selected order." }, { question: "How many PDFs and pages can I merge?", answer: "Merge up to 20 PDFs with 200 pages total and 10 MB per file. Encrypted files must be unlocked first before concatenation." }],
    howTo: [{ name: "Select PDFs", text: "Choose two or more PDFs, e.g. chapter1.pdf and chapter2.pdf from your device." }, { name: "Reorder files", text: "Drag rows so the first-read document sits on top, e.g. cover.pdf first." }, { name: "Check page counts", text: "Verify listed page numbers add up, e.g. 12 + 8 = 20 pages expected." }, { name: "Merge and download", text: "Click Merge PDFs and save, e.g. book-combined.pdf, entirely offline." }],
    guide: [{ heading: "What PDF merging does", body: "PDF merging combines multiple PDF files into one ordered document for books, applications and reports. Select two or more files such as cover.pdf plus chapter1.pdf and chapter2.pdf, drag rows into reading order, and download a single file like book-combined.pdf. Concatenation preserves page order and text layers, so the first-read document stays on top. Everything runs locally in your browser via pdf-lib, so source files never upload." }, { heading: "How combining in order works", body: "The merger reads each PDF locally, lists page counts for verification such as 12 plus 8 equals 20 pages, and concatenates pages in your drag-sorted sequence. Reorder before merging because output follows the visible list from top to bottom. Encrypted files must be unlocked first, and files up to 10 MB each with 200 pages total and 20 files maximum process reliably. Check the badge total before clicking Merge PDFs." }, { heading: "Worked example and limitations", body: "Choose cover.pdf first plus chapter1.pdf with 12 pages and chapter2.pdf with 8 pages, confirm 20 pages expected, then merge to book-combined.pdf entirely offline. Limitations: password-protected PDFs need unlocking, forms and annotations may flatten, and very large sets over 200 pages or 10 MB per file can slow phones. For chapters inside one file use the splitter to extract ranges first, then merge the pieces back in order." }]
  },
  {
    slug: "pdf-compress",
    title: "PDF Compressor",
    short: "Reduce PDF file size",
    description: "Shrink large PDF file sizes directly in your browser without uploading. Choose compression level, keep readable quality and download a lighter file instantly.",
    icon: "PictureAsPdf",
    keywords: ["pdf compressor", "compress pdf", "reduce pdf size"],
    category: "pdf",
    faq: [{ question: "Does compression upload my file and what limits apply?", answer: "No. Shrinking file size with your chosen compression level runs locally in your browser; files up to 10 MB and 200 pages never upload." }, { question: "Will quality be reduced?", answer: "You control the compression level; lighter compression keeps visual quality while reducing file size." }, { question: "How much smaller will my PDF get?", answer: "Expect 20-70% savings as images downsample to 150 DPI. Text stays vector-sharp; scanned pages compress less than photo-heavy exports." }],
    howTo: [{ name: "Choose PDF", text: "Select a file, e.g. report-18MB.pdf that is too large to email." }, { name: "Set compression", text: "Pick level like Medium for email or Strong for 10 MB upload portals." }, { name: "Preview savings", text: "Check estimated output size and zoom a photo page to confirm text stays legible." }, { name: "Compress and download", text: "Click Compress and save, e.g. report-6MB.pdf, ready to attach." }],
    guide: [{ heading: "What PDF compression does", body: "The compressor shrinks PDFs in your browser by lowering image detail and cleaning data. Photos downsample near 150 DPI, which looks fine on screen and in most prints. Text stays as sharp lines, not images, so words do not blur. Pick Light, Medium, or Strong to set how much size drops. Files up to 10 MB and 200 pages run locally with no upload." }, { heading: "How much smaller files get", body: "Expect 20 to 70 percent savings based on content. Photo decks drop most, like 18 MB to near 6 MB at 67 percent off. Scanned pages are flat images and shrink less, near 20 to 30 percent. Born-digital files with vector text and charts shrink more, near 50 to 70 percent. Check a zoomed photo and small text at 100 percent after each pass to catch blur early." }, { heading: "Worked example and limitations", body: "Open report-18MB.pdf that Gmail blocks, pick Medium, compress to report-6MB.pdf, then attach it to email in one go. Limits: it cannot unlock locked files, add OCR, or fix blurry scans. Very image-heavy sets over 200 pages may run slow on phones. For page picks use PDF Splitter first, and for joins use PDF Merge. Text stays selectable after local work via pdf-lib." }]
  },
  {
    slug: "pdf-split",
    title: "PDF Splitter",
    short: "Extract pages",
    description: "Split PDFs by extracting custom page ranges, single pages, or every Nth page into new files with live validation, all processed locally and privately offline.",
    icon: "PictureAsPdf",
    keywords: ["split pdf", "extract pages from pdf", "separate pdf pages"],
    category: "pdf",
    faq: [{ question: "Is extracting pages private and what limits apply?", answer: "Yes. Extracting pages and custom ranges runs locally via pdf-lib; files up to 10 MB and 200 pages never leave your device." }, { question: "Can I extract ranges?", answer: "Yes, type ranges like 1-3,5 or every N pages; the list validates locally before splitting." }, { question: "What is the maximum PDF size and page count?", answer: "Files up to 10 MB and 200 pages split reliably. Ranges like 1-3,5,8-10 validate live before extraction." }],
    howTo: [{ name: "Choose PDF", text: "Select a file, e.g. manual-120pages.pdf up to 10 MB." }, { name: "Enter page ranges", text: "Type ranges like 1-3,5 to pull the cover plus page 5, or 10-20 for a chapter." }, { name: "Validate selection", text: "Check the live page-count badge confirms e.g. 4 pages selected with no typos." }, { name: "Split and download", text: "Click Split and save, e.g. manual-pages-1-3-5.pdf, processed locally." }]
  },
  {
    slug: "pdf-to-jpg",
    title: "PDF to JPG",
    short: "Pages to images",
    description: "Convert PDF pages into high-quality JPG or PNG images in your browser. Adjust render scale and JPEG quality, then download all pages as a ZIP file.",
    icon: "PictureAsPdf",
    keywords: ["pdf to jpg", "pdf to image", "convert pdf pages to png"],
    category: "pdf",
    faq: [{ question: "What scale to pick?", answer: "1x for web, 2x for print; higher scale means larger images." }, { question: "Does page-to-image conversion upload my PDF?", answer: "No. Converting each page to JPG or PNG images renders locally with pdf.js at your scale; files up to 10 MB and 200 pages never leave the browser." }, { question: "What DPI do the exported JPGs match?", answer: "1x renders near 96 DPI for web, 2x near 192 DPI for print. Files up to 10 MB and 200 pages export as a ZIP of JPGs." }],
    howTo: [{ name: "Choose PDF", text: "Select a file up to 10 MB, e.g. brochure-6pages.pdf." }, { name: "Set scale and quality", text: "Pick 1x for web or 2x for print, plus JPEG quality e.g. 85%." }, { name: "Render pages", text: "Click Convert and wait for thumbnails like page-01.jpg through page-06.jpg to render." }, { name: "Download ZIP", text: "Click Download ZIP, e.g. brochure-images.zip, containing all rendered pages." }]
  },
  {
    slug: "pdf-rotate",
    title: "Rotate PDF Pages",
    short: "Rotate all pages",
    description: "Rotate PDF pages by 90, 180 or 270 degrees in your browser. Fix sideways scans and page orientation, then save and download the updated file.",
    icon: "PictureAsPdf",
    keywords: ["rotate pdf", "rotate pdf pages", "pdf rotate online"],
    category: "pdf",
    faq: [{ question: "Does it rotate all pages?", answer: "Yes, applies selected angle to every page via pdf-lib locally." }, { question: "Is fixing orientation private and what limits apply?", answer: "Yes. Fixing sideways orientation with 90, 180 or 270-degree rotation runs locally via pdf-lib; files up to 10 MB and 200 pages never upload." }, { question: "Can I rotate only specific pages?", answer: "Currently the angle applies to all pages in files up to 10 MB and 200 pages. For mixed scans, split out pages like 5-8, rotate them, then merge back." }],
    howTo: [{ name: "Choose PDF", text: "Select a file up to 10 MB, e.g. scan-sideways.pdf from a flatbed scanner." }, { name: "Pick angle", text: "Choose 90, 180 or 270 degrees; try 90 clockwise first for portrait scans." }, { name: "Preview orientation", text: "Check the first-page thumbnail flips upright with headers reading correctly." }, { name: "Rotate and download", text: "Click Rotate and save, e.g. scan-upright.pdf, entirely in your browser." }]
  },
  {
    slug: "pdf-watermark",
    title: "PDF Watermark",
    short: "Add text watermark",
    description: "Stamp PDF pages with a custom diagonal text watermark in your browser. Adjust text, opacity and placement, then download your watermarked file.",
    icon: "PictureAsPdf",
    keywords: ["pdf watermark", "add watermark pdf", "watermark pdf online"],
    category: "pdf",
    faq: [{ question: "Where is watermark placed?", answer: "Center diagonal or corners with opacity control via pdf-lib drawText." }, { question: "Does text-overlay watermarking upload my PDF?", answer: "No. Stamping a diagonal text overlay with opacity control draws locally via pdf-lib; files up to 10 MB and 200 pages never leave your browser." }, { question: "Will the watermark block reading?", answer: "No if you use 20-30% opacity grey like DRAFT across the diagonal. Text stays selectable underneath on files up to 10 MB and 200 pages." }],
    howTo: [{ name: "Choose PDF", text: "Select a file up to 10 MB, e.g. contract-draft.pdf." }, { name: "Enter watermark text", text: "Type text like DRAFT or Confidential plus size e.g. 48pt diagonal." }, { name: "Set opacity and placement", text: "Set 25% opacity, center-diagonal, so body text remains readable underneath." }, { name: "Apply and download", text: "Click Watermark and save, e.g. contract-draft-watermarked.pdf." }]
  },
  {
    slug: "pdf-to-text",
    title: "PDF to Text",
    short: "Extract text pages",
    description: "Extract text from any PDF into plain text instantly. Select page ranges, copy to clipboard or download a .txt file — everything runs locally in your browser.",
    icon: "Description",
    keywords: ["pdf to text", "extract text from pdf", "pdf to txt converter"],
    category: "pdf",
    faq: [{ question: "Is extracting selectable text private?", answer: "Yes. Extracting selectable text with pdf.js runs locally in your browser; files up to 10 MB and 200 pages never upload." }, { question: "What about scanned PDFs?", answer: "Image-only pages have no text layer and return empty; OCR is out of scope and flagged per page." }, { question: "What is the page limit and what about scanned PDFs?", answer: "Handles up to 200 pages and 10 MB per file. Digital pages extract fully; image-only scans return empty and need OCR software instead." }],
    howTo: [{ name: "Choose PDF", text: "Select a digital PDF up to 10 MB and 200 pages, e.g. ebook-chapter.pdf." }, { name: "Set page range", text: "Optionally type pages like 1-3,5 to extract only the introduction." }, { name: "Extract text", text: "Click Extract and review the plain-text preview for line breaks and headings." }, { name: "Copy or download", text: "Click Copy or Download .txt, e.g. chapter.txt, then paste into Word or Notes." }]
  },
];
