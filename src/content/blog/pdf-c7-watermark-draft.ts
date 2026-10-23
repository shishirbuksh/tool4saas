import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A 48-page proposal went out with DRAFT in the footer. The client read the cover, skipped the footer, and asked why the pricing had changed. Nothing had changed. The status had simply been too easy to miss. A page-wide watermark turns that status into part of the page: hard to skim past, easy to understand, and easy to replace when you keep a clean master.</p>
<p>This is part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Stamp the file in <a href="/pdf-merge">PDF watermark</a>, fix orientation first with <a href="/blog/pdf-merge-guide/fix-sideways-scans">split-rotate-merge</a>, and join related files at <a href="/pdf-merge">PDF merge</a>.</p>

<h2 id="what-watermarks-do">What a watermark can and cannot do</h2>
<p>A watermark is a status label printed across the page. It answers two questions before anyone reads the body: what is this file, and may I share it? DRAFT, CONFIDENTIAL, SAMPLE and DO NOT COPY cover most office needs. Some teams call a small approval mark a stamp and a translucent page mark a watermark. This tool does the second: one line of text, repeated on every page.</p>
<p>A watermark is not access control. It does not encrypt the file, stop screenshots, or prevent someone from copying a paragraph. It is a visible social signal that makes casual forwarding feel deliberate. That is enough for most review cycles, and it is far cheaper than a leak conversation.</p>
<p>Because the label is drawn as text over the page, the original text stays selectable, searchable and copyable. That is the right trade-off for review copies: a colleague can quote a clause while seeing DRAFT on every page. It also means a determined recipient can crop, cover or edit the mark. If the file needs real restrictions, use password permissions; if it must stay secret, do not send it. Keep an unmarked master either way. The watermarked copy is a distribution artifact, not the source of truth.</p>

<h2 id="wording">Choose the wording before you stamp</h2>
<p>Pick the shortest word that answers the reader's question. Add a version only when several versions are circulating; DRAFT v4 tells a reviewer more than DRAFT alone, and it makes stale copies self-identify after they leave your inbox.</p>
<table>
<thead><tr><th>Label</th><th>What it tells the reader</th><th>Good for</th><th>Think twice</th></tr></thead>
<tbody>
<tr><td><strong>DRAFT</strong></td><td>Not approved; feedback is invited</td><td>Proposals, reports, internal review</td><td>Anything already sent to a regulator or customer as final</td></tr>
<tr><td><strong>CONFIDENTIAL</strong></td><td>Circulation is restricted</td><td>Contracts, HR, finance, board packs</td><td>Files that are already public</td></tr>
<tr><td><strong>SAMPLE</strong></td><td>An example, not the deliverable</td><td>Portfolios, templates, demos</td><td>Files a client might mistake for final work</td></tr>
<tr><td><strong>DO NOT COPY</strong></td><td>Distribution is prohibited</td><td>Pre-release material, exams, paid downloads</td><td>Cases where you cannot enforce the instruction</td></tr>
</tbody>
</table>
<p>Keep the string short. The stamper uses 48pt Helvetica-Bold and draws one line, so a long recipient-specific string can run past the page edge. <code>DRAFT v4</code> and <code>CONFIDENTIAL</code> fit comfortably; <code>CONFIDENTIAL - COPY FOR PRIYA SHARMA</code> may clip on A4. Put recipient names in the file name instead, or use a dedicated editing tool for per-recipient marks.</p>

<h2 id="opacity-placement">Opacity and placement that stay readable</h2>
<p>Two controls matter in the tool: opacity and position. Font, size and color are fixed at 48pt Helvetica-Bold in mid-gray, and the same string lands on every page. The default opacity is 0.30. For most drafts, 0.25 to 0.30 is the useful band: visible in a thumbnail, quiet behind body text.</p>
<table>
<thead><tr><th>Opacity</th><th>How it looks on white paper</th><th>Best use</th></tr></thead>
<tbody>
<tr><td><strong>0.15-0.20</strong></td><td>Faint; mainly visible on screen</td><td>Near-final samples where the mark is only a hint</td></tr>
<tr><td><strong>0.25-0.30</strong></td><td>Clearly visible; body text still crisp</td><td>Drafts and confidential review copies</td></tr>
<tr><td><strong>0.40-0.50</strong></td><td>Strong; starts competing with dense tables</td><td>Short files, cover pages, dark scans</td></tr>
<tr><td><strong>0.70-1.00</strong></td><td>Dominant; can hide content</td><td>Not recommended</td></tr>
</tbody>
</table>
<p>Opacity is transparency, not gray level. A mid-gray label at 25% over white ends up around 88% lightness, which is why 10pt body text still reads underneath. At 80% the same label lands near 60% lightness and begins to interfere with footnotes, tables and signatures. Very dark scans are the opposite problem: gray text can disappear, so raise opacity to 0.40 or 0.50 and check a page. The tool cannot switch to white text.</p>
<p>Diagonal is the default and the best general choice. It crosses the page at minus 45 degrees, so it cannot be mistaken for a heading or a footer, and it survives thumbnail grids. Center placement is horizontal and stronger; use it for short files where the middle is empty. The four corner positions sit 50pt from the edges and suit samples whose center carries artwork or photographs. Corners can collide with page numbers, letterhead and signature blocks, so check the first and last page of every job.</p>
<p>Test on screen and on paper. A 25% mark can look obvious on a monitor and faint on a printed page; a 30% mark can look heavy on screen and about right in print. Print one dense page before a wide send. This is the step people skip, and it is the one that catches the bad combination of light gray, small print and an office laser printer.</p>

<h2 id="worked-examples">Two worked examples</h2>
<p><strong>Example 1: a 48-page consulting proposal.</strong> The file is <code>acme-proposal-v4.pdf</code>, assembled from a cover, a pricing section and three appendices. Choose DRAFT, opacity 0.30, diagonal. The output downloads as <code>acme-proposal-v4-watermarked.pdf</code>; rename it <code>acme-proposal-v4-draft.pdf</code> so the status survives outside the PDF. Check page 1, the densest pricing table around page 17, and the signature block on the last page. At 100% zoom the body copy is unobstructed; in a thumbnail grid the diagonal still reads DRAFT.</p>
<p><strong>Example 2: a 16-page design portfolio.</strong> The center of every page is the work, so a diagonal across the middle is the wrong choice. Use SAMPLE at 0.30 in the bottom-right corner. The mark stays near the margin and leaves the images clear. Check any full-bleed dark page: if the gray label disappears, raise opacity to 0.40 or 0.50 and check again. The master <code>portfolio-2026.pdf</code> stays untouched; the client receives <code>portfolio-2026-sample.pdf</code>.</p>

<h2 id="rotation-flattening">Rotation, scans and the flattening question</h2>
<p>Orientation first, stamp second, then check the result. A PDF page can carry a rotation value, and the rotate view changes that value without baking the pixels. The stamper draws text in the page's internal coordinate space and does not compensate for the rotation value, so a page that looks upright only because of a rotation flag can still produce a sideways or upside-down mark. Ordinary scanner output with no rotation flag behaves normally. If a rotated page gives you a bad label, rasterize the upright pages at <a href="/pdf-to-jpg">PDF to JPG</a> and rebuild them at <a href="/image-to-pdf">image to PDF</a>, then stamp the raster copy; you lose selectable text, so keep the original. For a mixed bundle, use split-rotate-merge first, then check the stamp on the rotated segment; rasterize that segment only if the label is misoriented.</p>
<p>The watermark is vector text, not a flat image. Stamping does not flatten form fields, signatures or annotations, and it does not turn a hybrid scan into searchable text. If a portal asks for a "flattened" PDF, stamping alone will not satisfy it. A true raster copy means converting pages at <a href="/pdf-to-jpg">PDF to JPG</a> and rebuilding them at <a href="/image-to-pdf">image to PDF</a>; that step removes selectable text and links, can soften small type and usually increases file size. Do it only when the recipient demands a raster file, and do not mistake it for security.</p>
<p>Encrypted files need to be unlocked before stamping, because the PDF engine cannot parse a locked document. Image-only scans accept the mark as a visual label but keep no text layer underneath. And because the mark is editable vector text, someone with the right tools can remove it. Treat it as a status signal, not a lock, and keep the master so a clean copy always exists.</p>

<h2 id="workflow">A safe stamping workflow</h2>
<ol>
<li><strong>Finalize first.</strong> Export a clean master after the last content edit. Stamping before approval creates confusing versions.</li>
<li><strong>Fix orientation.</strong> Rotate sideways pages, or split-rotate-merge a mixed bundle, then save the upright file.</li>
<li><strong>Join related files.</strong> Add files to <a href="/pdf-merge">PDF merge</a> in reading order; the list appends in the order you add them, so name the parts <code>01-</code>, <code>02-</code> and check the page count before merging.</li>
<li><strong>Stamp once.</strong> Use a short label, opacity 0.25 to 0.30, and diagonal placement unless the center carries artwork. The view accepts one PDF up to 10MB. Write the output to a new file; never overwrite the master.</li>
<li><strong>Verify.</strong> Check the cover, one dense page and the last page at 100% zoom. Print one page. Confirm that the stamp does not cover a signature, a page number or a required notice.</li>
<li><strong>Name and archive.</strong> Keep <code>contract-draft-master.pdf</code> and <code>contract-draft-watermarked.pdf</code> side by side. The suffix is the audit trail.</li>
</ol>
<div class="cta-box"><strong>Your turn:</strong> open <a href="/pdf-merge">PDF Merge &amp; Organizer</a>, choose the Watermark view, load one PDF and try DRAFT at 0.30 diagonal on a copy. If the pages are sideways, fix them with the Rotate view first and check how the stamp sits on the rotated page. Then read the <a href="/blog/pdf-merge-guide">full PDF workflow guide</a> for merging, splitting and compression.</div>
<blockquote class="tip">General guidance only. Watermarks communicate status; they are not legal advice or a substitute for access controls. For confidential filings, confirm the recipient's requirements before sending.</blockquote>
`;

export const pdfWatermarkDraft: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "add-draft-watermark",
  kind: "cluster",
  title: "Add DRAFT Watermark to PDF Without Blocking Text",
  description:
    "Stamp readable DRAFT or CONFIDENTIAL watermarks: opacity, placement, rotation, flattening trade-offs and worked PDF examples with a free local tool.",
  keywords: ["how to add draft watermark to pdf", "pdf watermark opacity", "diagonal vs corner watermark", "watermark pdf without blocking text", "confidential watermark pdf"],
  toolSlugs: ["pdf-merge"],
  relatedSlugs: ["merge-multiple-pdfs-order", "extract-pages-range", "fix-sideways-scans"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-watermarks-do", text: "What a watermark can do", level: 2 },
    { id: "wording", text: "Choose the wording", level: 2 },
    { id: "opacity-placement", text: "Opacity and placement", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "rotation-flattening", text: "Rotation and flattening", level: 2 },
    { id: "workflow", text: "Safe stamping workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "What opacity should a PDF watermark use?", answer: "Start at 0.25 to 0.30. The tool draws 48pt mid-gray text, so a 0.30 mark is visible in thumbnails while 10pt body text remains readable underneath. Raise it to 0.40 or 0.50 on dark scans or short cover pages, and avoid 0.70 and above because dense tables and signatures start to disappear. Print one page before sending widely." },
    { question: "Should the watermark be diagonal or in a corner?", answer: "Diagonal for drafts and confidential files, because it crosses the page at minus 45 degrees and cannot be mistaken for a heading. Use a corner when the center carries artwork or photographs; the four corner positions sit 50pt from the edges. Check the first and last page either way, since corner marks can collide with footers, letterhead and signature blocks." },
    { question: "Does watermarking keep text selectable?", answer: "Yes. The label is drawn as text on top of the page, so the original characters remain selectable, searchable and copyable. That is useful for review copies but also means the mark is not tamper-proof and does not stop screenshots or copying. Use password permissions for real restrictions and keep an unmarked master for clean reissues." },
    { question: "Can I watermark only one page?", answer: "The Watermark view stamps every page in the file. To mark one page, split that page out at PDF split, watermark the one-page file, then merge it back with the rest in reading order. The merge view appends files in the order you add them, so name the parts 01, 02 and 03 before selecting them." },
    { question: "Why does my watermark look sideways?", answer: "The page probably carries a rotation value that the stamper does not compensate for. The Rotate view changes the page angle, and the stamp is drawn in page coordinates, so a page that looks upright only because of rotation can still get a sideways or upside-down mark. Test a copy. If it happens, rasterize the upright pages at PDF to JPG, rebuild them at image to PDF and stamp the raster copy, accepting the loss of selectable text." },
    { question: "Can I remove a watermark later?", answer: "Keep the unwatermarked master and never overwrite it. The stamp is editable vector text, so a tool can remove it, but rebuilding a clean copy from the master is faster and safer. Name the files contract-draft-master.pdf and contract-draft-watermarked.pdf so nobody has to guess which is the source." },
  ],
};
