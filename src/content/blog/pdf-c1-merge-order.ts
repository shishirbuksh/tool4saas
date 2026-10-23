import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A passport renewal bundle arrived as 34 attachments with names like “scan_final_FINAL2.pdf”. The consulate wanted one file in one sequence, and the bundle was assembled in a hurry. Merging took minutes; discovering that the bank statement sat between the cover letter and the passport scan took another week. <strong>The merge tool appends files in the order you add them</strong>, and that order is fixed once the merge runs. Processing happens locally in the browser, so the documents are not uploaded. This guide covers the actual mechanics, the page and file ceilings, what survives the copy, and the encrypted-file wall.</p>
<p>This sits within the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Merge in <a href="/pdf-merge">PDF merge</a>, extract ranges with the split view in the same tool, and turn loose photos into a PDF with <a href="/image-to-pdf">Image to PDF</a> before combining them.</p>

<h2 id="method">Order files first, then merge</h2>
<p>The merge view accepts up to 20 PDFs, 10MB each, with 200 pages in total, and it needs at least two files. Every file you add appears in a numbered row with its name and size. That numbering is the final order. There are no drag handles and no page-level editor: the tool copies whole documents one after another. To change the sequence, remove the file with its Remove button and add it again at the point where it belongs. Clear all starts the list over.</p>
<p>Preparation makes that limitation harmless. Rename the parts <code>01-cover.pdf</code>, <code>02-chapter.pdf</code> and <code>03-appendix.pdf</code>, then add them one at a time. Selecting several files at once adds them in whatever order the file picker returns, which may not match the order visible on screen. Confirm the numbered rows before pressing merge, because the download starts immediately and always arrives as <code>merged.pdf</code>. The success message reports the number of files and pages combined. That message is the tool's only page count; there is no per-file page badge, so check each page count in a PDF reader beforehand.</p>
<p><strong>Worked example: a 21-page application.</strong> The cover is one page, <code>chapter-1.pdf</code> has 12 pages and <code>chapter-2.pdf</code> has eight. Add cover, chapter 1, chapter 2. The rows read 1, 2, 3, and the success message says 21 pages. Rename the download <code>visa-application-2026-10-22.pdf</code>. If chapter 2 had been added second by mistake, remove it, add it again after chapter 1, and merge; nothing else changes. A mismatch between the expected and reported page total usually means a blank scan or a duplicated file, so investigate before uploading the result.</p>
<p>Page-level interleaving is a different job. If a signature page from the second document must sit after page 4 of the first, this merge view cannot weave the two together. Extract the pieces first with <a href="/blog/pdf-merge-guide/extract-pages-range">range extraction</a>, then add the resulting PDFs in the required sequence. The same rule applies when only one section needs rotation: split it out, rotate that segment, then merge the parts.</p>

<h2 id="survives">What survives a merge, and what to verify</h2>
<p>The PDF engine copies each page into a new document rather than re-rendering it. In practice, the text layer of a born-digital page generally remains selectable and searchable, and page dimensions, rotation and embedded images are retained. That does not mean every interactive feature comes along. Treat the table below as expectations to test, not guarantees.</p>
<table>
<thead><tr><th>Element</th><th>Likely result</th><th>What to check</th></tr></thead>
<tbody>
<tr><td><strong>Text layer</strong></td><td>Usually preserved and searchable</td><td>Select a sentence on page 1 and the last page</td></tr>
<tr><td><strong>Links and bookmarks</strong></td><td>May be lost or incomplete; no bookmarks are added</td><td>Click two links, open the outline panel</td></tr>
<tr><td><strong>Form fields</strong></td><td>May flatten or disappear</td><td>Open the form and try typing</td></tr>
<tr><td><strong>Annotations and comments</strong></td><td>May flatten or vanish</td><td>Check the comment pane</td></tr>
<tr><td><strong>Digital signatures</strong></td><td>May be invalidated or reduced to marks</td><td>Check signature status; keep the signed original</td></tr>
<tr><td><strong>Encryption</strong></td><td>Often fails to parse</td><td>Unlock with credentials before merging</td></tr>
</tbody>
</table>
<p>Do not assume that a hyperlink survives just because the visible page looks unchanged, and do not expect the output to gain a table of contents. The tool imposes no bookmarks, headers or page numbers. If navigation matters, add those in a PDF editor after the merge. Scanned pages also stay image-only: merging does not perform OCR, so a bundle of phone photos will remain unsearchable unless you OCR it separately.</p>
<p><strong>Verification checklist.</strong> Open the merged <code>merged.pdf</code> and inspect four things before sending it anywhere: page 1, the last page, the orientation of every section that was landscape in the source, and any element that was interactive. For a contract, click the signature field and confirm whether it still works; for a report, open the bookmarks panel; for a portfolio, test one external link. If the bundle contains a signed page, keep the original signature file archived because the merged copy may not retain a valid signature. A two-minute check prevents the expensive version of this mistake: the recipient finding page 19 upside down.</p>
<p>One more preflight check is worth the effort: count pages in each source before merging. The tool reports only the final total, so a 40-page statement that is actually 44 pages will not be obvious until someone reads the bundle. Most readers show a page count near the bottom of the window; note the numbers and compare their sum with the success message. If the sum matches but the order is wrong, the row numbering is the first place to look.</p>
<p><strong>Encrypted files stop the run.</strong> A PDF with an owner password, a user password or both commonly fails to parse, and the tool reports that the file could not be parsed. Unlock it with credentials you are entitled to use, save an unlocked copy, then merge that copy. If you only have viewing access, ask the issuer for a printable copy or reprint the document through the system print dialog to PDF; reprinting flattens it into a new file you can merge. Brute-forcing a password is out of scope, violates the tool's terms and is usually illegal. A restricted file may also load but fail when its pages are copied, so treat the successful preview of a protected document as unconfirmed until the merge finishes.</p>

<h2 id="limits">Limits, large bundles and mixed images</h2>
<p>The ceilings are 20 files, 10MB per file, 100MB across the batch and 200 pages in total. Adding a file that would push the count or the per-file size over a limit produces an error before it joins the list; the page total is checked again when the merge runs. A single 11MB scan is rejected even if the other 19 files are tiny. Reduce that file first, or split it, rather than removing the rest of the bundle. The 10MB limit is per input, not a cap on the final download.</p>
<p><strong>Bundles over 200 pages need a plan.</strong> Because the check counts every input page, no merge can output more than 200 pages. For a 320-page archive, split the source into sections of 200 pages or fewer, merge each section from its own source files, and name the results <code>part-01.pdf</code> and <code>part-02.pdf</code>. Merging those two parts would count 320 input pages and fail, so deliver them as numbered parts unless a desktop PDF application can produce the single file your recipient insists on. The common easy case is a pile of 20 small files that totals under 200 pages: merge it in one pass. If you have several merged parts and merely want fewer files, combine groups in passes while each run stays under the page ceiling; never assume the tool will concatenate an oversized set.</p>
<p><strong>Images are not PDFs.</strong> The merge list accepts PDF files only, so a folder of JPGs cannot be dropped into it. Run the images through <a href="/image-to-pdf">Image to PDF</a> first. That tool accepts up to 20 images and 30MB in total, with a maximum of 8,192 pixels per side and 16 megapixels per image, and it places each image on its own A4 or Letter page in portrait or landscape with a 10mm margin. The download is <code>images.pdf</code>. Add that PDF to the merge list at the position where the photos belong.</p>
<p><strong>Worked example: three reports and 12 photos.</strong> The reports are three PDFs; the photos become one <code>images.pdf</code>. That gives four inputs. Add report 1, report 2, report 3, then the photo PDF, confirm four numbered rows, and merge. The success count includes the photo pages. Rename the download by content and date, for example <code>site-survey-2026-10-22.pdf</code>, because <code>merged.pdf</code> tells you nothing six months later. Keep the source reports and the original photos archived; the merged file is a convenience copy, not the record.</p>
<blockquote class="tip">General guidance only. For immigration, legal or compliance filings, confirm the authority's ordering, naming and format rules, keep the originals, and sample the first, middle and last pages before submitting.</blockquote>
`;

export const pdfMergeOrder: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "merge-multiple-pdfs-order",
  kind: "cluster",
  title: "Merge PDFs in Reading Order: Limits and What Survives",
  description:
    "Merge up to 20 PDFs in the order you add them, verify what survives, handle encrypted files, and plan bundles over 200 pages without guesswork.",
  keywords: ["merge pdfs in reading order", "pdf merge 20 files 200 pages", "merge encrypted pdf owner password", "combine pdf and images into one file", "pdf merge page order change"],
  toolSlugs: ["pdf-merge", "image-to-pdf"],
  relatedSlugs: ["jpg-scans-single-pdf", "extract-pages-range", "extract-text-without-ocr"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "method", text: "Order files, then merge", level: 2 },
    { id: "survives", text: "What survives, what to verify", level: 2 },
    { id: "limits", text: "Limits and large bundles", level: 2 },
  ],
  html,
  faqs: [
    { question: "How do I merge PDFs in a specific order?", answer: "Add files in the sequence you want them to appear. Each file gets a numbered row, and the merge appends the whole documents in that order. There are no drag handles and no page interleaving. To change the sequence, remove a file and add it again at the correct point, then confirm the row numbers before merging." },
    { question: "How many PDFs and pages can I merge at once?", answer: "A run accepts at least two and at most 20 PDFs, 10MB per file, 100MB across the batch, with 200 pages in total. The per-file size is checked as you add files, and the page total is checked again when you merge. Reduce or split an oversized input rather than removing the rest of the bundle." },
    { question: "Why does my PDF refuse to merge?", answer: "Encrypted or owner-password files commonly fail to parse. Unlock the document with credentials you are entitled to use, save a copy, and merge that. If you only have viewing access, ask the issuer for a printable copy or reprint it to PDF. Brute-forcing a password is not supported and is usually unlawful." },
    { question: "Do hyperlinks and bookmarks survive PDF merging?", answer: "Text layers usually remain searchable, but interactive links and outlines may be lost or incomplete, and the tool adds no bookmarks of its own. Open the merged file, test two links, and open the outline panel. If navigation matters, add a table of contents in a PDF editor after merging." },
    { question: "Can I merge JPG images with PDFs directly?", answer: "No. The merge list accepts PDF files only. Turn the images into a PDF with Image to PDF first: up to 20 images, 30MB total, 8,192 pixels per side and 16 megapixels each, on A4 or Letter pages in portrait or landscape. Then add the downloaded images.pdf to the merge list." },
    { question: "How do I merge a bundle larger than 200 pages?", answer: "No single merge can exceed 200 input pages, so split the source into sections of 200 pages or fewer and merge each section separately. Keep the results as numbered parts, because merging two 160-page parts would count 320 pages and fail. A single file beyond the ceiling requires desktop PDF software." },
  ],
};
