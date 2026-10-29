import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>The flatbed scanner delivered 40 pages of meeting notes, and every page was sideways. I read three pages with my head tilted before admitting the file was the problem, not my posture. One rotation fixed all 40. The interesting part is knowing which rotation to use, and when rotating the whole file would make things worse.</p>
<p>This is part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Rotate in <a href="/pdf-merge">PDF rotate</a>, isolate a bad range with <a href="/blog/pdf-merge-guide/extract-pages-range">PDF split</a>, and rejoin the parts at <a href="/pdf-merge">PDF merge</a>.</p>

<h2 id="diagnose">Diagnose the cause before you rotate</h2>
<p>Sideways pages come from three places: the scanner was fed in the wrong orientation, the PDF already carries a rotation value, or a mixed bundle combines pages from different sources. The symptom tells you which fix to try first.</p>
<table>
<thead><tr><th>Symptom</th><th>Likely cause</th><th>First fix</th></tr></thead>
<tbody>
<tr><td><strong>Every page sideways, same direction</strong></td><td>Portrait sheet scanned on a landscape platen or feeder</td><td>Rotate all pages 90 or 270 degrees</td></tr>
<tr><td><strong>Every page upside down</strong></td><td>Sheet fed bottom-first, or a duplex flip</td><td>Rotate all pages 180 degrees</td></tr>
<tr><td><strong>Fine in one viewer, sideways in another</strong></td><td>One viewer honors the page rotation value, the other does not</td><td>Normalize a copy and verify in both</td></tr>
<tr><td><strong>Only pages 5-8 are sideways</strong></td><td>Mixed bundle from different scanners or phone photos</td><td>Split 5-8, rotate that file, merge back</td></tr>
<tr><td><strong>Wide chart looks rotated</strong></td><td>Genuine landscape content on a landscape page</td><td>Leave it alone; choose landscape paper when printing</td></tr>
</tbody>
</table>
<p>The last row matters. A wide table on a landscape page is not a sideways scan. Rotating it to portrait makes the text smaller and the page harder to read. The defect is only a defect when the text baseline runs vertically or upside down.</p>

<h2 id="rotation-vs-content">Page rotation is not the same as rotating the pixels</h2>
<p>Most PDFs store page orientation as a page-level attribute, commonly a rotation value of 0, 90, 180 or 270 degrees. The content stream itself does not move. The viewer applies the angle when it draws the page, and a printer applies it when it prints. This is why rotation is fast and lossless: text stays text, vectors stay vector, scanned pixels are not resampled, and the file size barely changes. Links and search still work.</p>
<p>Some editors rotate by rewriting every object in the content stream, or by re-rendering the page to an image. That can move annotation anchors, flatten form fields and soften scanned type. The rotate view here uses the page-level approach, which is the right tool for a reading copy. It does not straighten a crooked scan, sharpen a blurry one or run OCR. It only turns pages in right angles.</p>
<p>One implementation detail is worth knowing before you trust a file from another editor. The rotate view sets each page's angle to the 90, 180 or 270 degrees you choose; it does not add that angle to a rotation already stored in the file. Scanner output usually has no rotation value, so the common case works as expected. If a file already carries 90 degrees and choosing 90 changes nothing, test a copy and reset the angle in the app that created it, or rebuild the pages through <a href="/pdf-to-jpg">PDF to JPG</a> and <a href="/image-to-pdf">image to PDF</a> at the cost of selectable text. Check the result in two viewers rather than assuming the download is upright.</p>
<p>Because the page box does not change, a portrait A4 page rotated 90 degrees still reports portrait width and height internally even though the viewer presents it as landscape. Some print dialogs and imposition tools read that page box. Choose fit-to-page and check the preview before printing a rotated file on pre-punched paper.</p>

<h2 id="uniform">Fix a uniformly sideways file</h2>
<ol>
<li><strong>Work on a copy.</strong> Keep the scanner's original file untouched until the result is verified.</li>
<li><strong>Find the top of the text.</strong> If the top edge points left, rotate 90 degrees clockwise. If it points right, rotate 270 degrees clockwise. If the page is upside down, use 180.</li>
<li><strong>Check the first page.</strong> Apply the angle, open the first page and confirm that the header reads left to right and the page number sits at the bottom.</li>
<li><strong>Download and rename.</strong> The output arrives as <code>notes-rotated-90.pdf</code>. Rename it <code>notes-upright.pdf</code> so the good copy is obvious.</li>
</ol>
<p><strong>Worked example: 40 pages of meeting notes.</strong> Every page shows the header along the left edge, so the top of the text points left. Rotating all pages 90 degrees clockwise puts the header at the top and the page numbers at the bottom. The operation touches every page, including the cover and the two landscape appendices; if those appendices were already upright, this is the wrong tool and the mixed-bundle route below is the right one.</p>
<p>If the first page comes out upside down, go back to the original and try 180 degrees instead of stacking another rotation on the already-rotated file. Starting from the original keeps the history clean and prevents a second round trip.</p>

<h2 id="mixed-surgery">Fix a mixed bundle with split-rotate-merge</h2>
<p><strong>Worked example: a 124-page closing binder.</strong> Pages 5 through 8 are landscape receipts scanned sideways relative to the rest. Rotating all 124 pages would break the 120 good pages, so isolate the bad range instead.</p>
<ol>
<li><strong>Split the bad range.</strong> At <a href="/pdf-merge">PDF split</a>, load the binder and enter <code>5-8</code>. The tool copies those four pages into <code>binder-split.pdf</code>. Rename it <code>02-fixed-source.pdf</code> immediately, because every split from this binder will use the same default name.</li>
<li><strong>Rotate the segment.</strong> Load <code>02-fixed-source.pdf</code> in the Rotate view and choose the angle that puts the receipt text upright. Download it as <code>02-fixed.pdf</code>.</li>
<li><strong>Split the good parts.</strong> Run the original binder through Split again with <code>1-4</code>, rename the output <code>01-front.pdf</code>. Run it once more with <code>9-124</code>, rename that <code>03-rest.pdf</code>.</li>
<li><strong>Merge in order.</strong> Add <code>01-front.pdf</code>, <code>02-fixed.pdf</code> and <code>03-rest.pdf</code> to <a href="/pdf-merge">PDF merge</a> in that order. The merge view appends files in the order you add them, and it has no drag reorder, so the file names are your ordering system. Confirm the total is 124 pages before merging.</li>
<li><strong>Verify the seams.</strong> Check pages 4, 5, 8 and 9, then the last page. Page numbers, Bates stamps and signatures should continue across the joins. If a form field or signature flattens during page copying, check whether the recipient needs the interactive version instead.</li>
</ol>
<p>This is three split runs and one merge for a four-page problem. It sounds like more work than pressing Rotate once, but it is the only way to keep the other 120 pages exactly as they were. The merge view accepts up to 20 files, 200 pages total and 10MB per file, so a 124-page binder fits as long as the original and each part stay under the per-file limit.</p>

<h2 id="portrait-landscape">Portrait, landscape and phone scans</h2>
<p>Mixed orientation inside one PDF is normal and valid. A portrait contract followed by a landscape floor plan should stay that way. Each page carries its own orientation, and viewers rotate page by page. Forcing every page to portrait shrinks the plan and adds white space; forcing every page to landscape shrinks the contract. Leave intentionally wide pages alone.</p>
<p>Phone photos add a second layer. A JPEG can carry an EXIF orientation flag, and the gallery app may display it upright while the PDF builder embeds the pixels in their stored orientation. If every page of a phone-scan PDF is sideways, rotate the finished PDF once. If one page is wrong, fix that photo in the phone's editor before rebuilding, or split the page out, rotate it, and merge it back. Do not rotate the whole file to rescue one receipt.</p>
<p>Printing is the final check. A rotated page and an unrotated page can look identical on screen but behave differently in a print dialog. Use fit-to-page, enable automatic rotation if your printer offers it, and print one page before running a 124-page binder through the office printer.</p>

<h2 id="verify">Verify before you archive</h2>
<ul>
<li><strong>Read the running header</strong> on the first, middle and last page. If it is upside down or vertical, the angle is wrong.</li>
<li><strong>Check page numbers and stamps</strong> at the expected edge. Bates numbers and exhibit stamps are easy to miss on a thumbnail.</li>
<li><strong>Open the file in a second viewer.</strong> A phone, a desktop reader and a browser can disagree about rotation metadata.</li>
<li><strong>Check signatures and form fields.</strong> Page rotation preserves them, but split-and-merge workflows copy pages and can flatten interactive elements.</li>
<li><strong>Keep a master.</strong> Archive the pre-rotation file as <code>binder-master.pdf</code> and deliver <code>binder-upright.pdf</code>. Rotation metadata is simple, but a clean master is simpler.</li>
</ul>
<div class="cta-box"><strong>Your turn:</strong> open <a href="/pdf-merge">PDF Merge &amp; Organizer</a>, choose Rotate, and test the angle on a copy. If only one range is wrong, use the Split view with a range like <code>5-8</code>, rotate that file, then merge the parts back in order. The <a href="/blog/pdf-merge-guide">full PDF workflow guide</a> covers the rest of the pipeline.</div>
<blockquote class="tip">General guidance only. For archival or court filings, keep the pre-rotation master and confirm that page numbering, stamps and signatures survive the round trip.</blockquote>
`;

export const pdfRotateFix: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "fix-sideways-scans",
  kind: "cluster",
  title: "Fix Sideways Scans: Rotate PDF Pages Upright",
  description:
    "Fix sideways PDF scans: diagnose page rotation vs content rotation, rotate a whole file, or split-rotate-merge a mixed bundle. Two worked examples.",
  keywords: ["fix sideways pdf scan", "rotate pdf pages upright", "pdf page rotation vs content", "mixed orientation pdf split rotate merge", "rotate only some pages pdf"],
  toolSlugs: ["pdf-merge"],
  relatedSlugs: ["extract-pages-range", "merge-multiple-pdfs-order", "combine-pdf-and-images"],
  published: "2026-10-07",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "diagnose", text: "Diagnose the cause", level: 2 },
    { id: "rotation-vs-content", text: "Page rotation vs pixels", level: 2 },
    { id: "uniform", text: "Fix a uniform file", level: 2 },
    { id: "mixed-surgery", text: "Split-rotate-merge", level: 2 },
    { id: "portrait-landscape", text: "Portrait and landscape", level: 2 },
    { id: "verify", text: "Verify the result", level: 2 },
  ],
  html,
  faqs: [
    { question: "Why are my scanned pages sideways?", answer: "The sheet was placed on the platen in the wrong orientation, the feeder pulled it bottom-first, or the bundle mixes pages from different scanners. If every page leans the same way, one rotation fixes the file. If only a few pages are wrong, split that range, rotate the smaller file, then merge the parts back in order." },
    { question: "How do I rotate every page in a PDF?", answer: "Open the Rotate view, load one PDF up to 10MB, choose 90, 180 or 270 degrees and apply it to all pages. A 90-degree clockwise turn fixes content whose top edge points left; 270 fixes content whose top edge points right; 180 fixes an upside-down sheet. Download the rotated copy, rename it and check the first and last page." },
    { question: "Can I rotate only pages 5 through 8?", answer: "Yes, but not in the Rotate view, which applies one angle to every page. Split the original with the range 5-8, rotate that four-page file, then split the original again for 1-4 and 9 to the end. Merge the three parts in order and confirm the page count is unchanged." },
    { question: "Why does a PDF look upright on my phone but sideways on my desktop?", answer: "The viewers disagree about the page rotation value, or the source photo carries an EXIF orientation flag that one app honors and another ignores. Normalize a copy with an explicit rotation, save it, and open that saved file in both viewers. Do not send the original until both agree." },
    { question: "Does rotating a PDF reduce quality?", answer: "No. The Rotate view changes the page orientation value rather than re-rendering the content, so text, vectors and scanned pixels keep their original quality and file size barely moves. Annotations can shift slightly, and split-rotate-merge workflows can flatten interactive form fields, so check before filing." },
    { question: "Will rotation straighten a crooked scan?", answer: "No. The tool turns pages in 90-degree steps, which fixes sideways and upside-down scans but not a page that is skewed by two or three degrees. A crooked scan needs deskewing in an image editor or scanning software before it is assembled into a PDF." },
  ],
};
