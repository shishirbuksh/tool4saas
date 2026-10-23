import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Six monthly bank statements and two invoices arrived as eight separate PDFs, 56 pages in total, and the lender wanted one attachment. The phone was an Android device with no PDF editor installed. The whole job ran in Chrome: select the files from Downloads, put them in order, merge, then open the downloaded result. This guide covers the browser route, the rules that decide whether a file is accepted, and the memory habits that keep a long merge from dying halfway through.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Merge in the <a href="/pdf-merge">PDF merge tool</a>; build a PDF from photos first with <a href="/image-to-pdf">image to PDF</a>. For cover pages and chapter order, see <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">merge order</a>.</p>

<h2 id="why-browser">Why a browser is enough on Android</h2>
<p>The merge engine runs as JavaScript on the page. When you choose PDFs, the browser hands their bytes to that page, which parses each document and writes a new one in memory. The original files stay on the phone. No upload, no account and no Play Store install are involved. Chrome, Firefox and Samsung Internet can all run the page, though the file picker and download interface differ slightly between them.</p>
<p>The fixed limits are 2 to 20 PDFs, 10MB per file and 200 pages total. Encrypted documents and corrupt downloads fail, because the engine cannot read them. Processing is local, so there is no server queue and no cloud retry. Android may also stop or reload a background browser tab when memory is low, which is why a large merge deserves a little preparation.</p>
<p>The system file picker is the only access route. It lets you pick PDFs from locations such as Downloads or Files, but the page does not become a file manager, a cloud-sync client or a storage integration. It sees the copies you select, and nothing else. If a PDF is not visible in the picker, move it to Downloads or use the picker's own browse option before blaming the merge tool.</p>

<h2 id="prepare">Prepare the PDFs and the order</h2>
<p>Gather the documents in Downloads or Files and rename them with a numeric prefix: <code>01-cover.pdf</code>, <code>02-statement.pdf</code>, and so on. The browser list shows names and sizes, so clear names make a wrong sequence easy to spot. Check each file against the 10MB cap, count the files, and add up the pages. A 20-file set that totals 240 pages will be rejected even though every individual file is small.</p>
<p>Unlock password-protected PDFs before adding them. Bank statements and payslips often carry owner restrictions that block parsing. If you do not have the password, request an unlocked copy from the issuer rather than experimenting with the file. A corrupt download also fails; download it again rather than adding the same broken file repeatedly.</p>
<p>Decide the final sequence before the first tap. New files are appended to the end of the list, and there is no drag handle. If a file belongs earlier, remove it and add it again at the correct point. For images that need to sit between existing pages, build a separate image PDF and split the original PDF around the insertion point first; the merger cannot interleave pages from two documents.</p>

<h2 id="merge-steps">Merge PDFs in Chrome or another Android browser</h2>
<ol>
<li>Open the browser and navigate to the <a href="/pdf-merge">PDF merge page</a>.</li>
<li>Tap <strong>Add PDFs</strong>. In the system picker, choose Downloads or Files and select a PDF. Multi-select works in many pickers; if it does not, add files one at a time.</li>
<li>Check the numbered list after every addition. Each row shows the file name and size, and the row number is the page position.</li>
<li>Fix the order by removing a file and adding it again at the end. Repeat until the list matches your plan.</li>
<li>Confirm 2 to 20 files, each 10MB or less, with an expected total of 200 pages or fewer.</li>
<li>Tap <strong>Merge</strong>. Leave the page in the foreground and wait for the success message with the file and page counts.</li>
<li>The browser downloads <code>merged.pdf</code>. Open the download notification or find it in Downloads, rename it, then share or move it with your file manager.</li>
</ol>
<p>Android browsers usually surface a completed download in a notification and in the Downloads folder. The exact wording and location depend on the browser, so verify the file before closing the tab. If the success message appears but the file is not where you expected, check the browser's own downloads screen rather than assuming the merge failed.</p>

<h2 id="android-memory">Memory, long documents and the hard limits</h2>
<p>Chrome on Android is aggressive about reclaiming memory. A tab that is switched away from can be discarded, and returning to it may reload the page with an empty file list. A 200-page PDF can be memory-heavy even when it is only 8MB on disk, because the parser has to hold page structures and copied content. Keep the merge page visible, close unused tabs, and download the result before starting anything else.</p>
<p>For a long set, merge in parts. Finish one batch, download it, then start the next. If you later need to join the parts, each part must be under 10MB and the combined page count must stay within 200. That second pass is still a normal merge of 2 to 20 PDFs; there is no special append mode. Keep the part files until the final document opens correctly.</p>
<table>
<thead><tr><th>Scenario</th><th>Recommended action</th><th>Reason</th></tr></thead>
<tbody>
<tr><td><strong>2 to 5 short PDFs</strong></td><td>Merge in one run</td><td>Fast and light on phone memory</td></tr>
<tr><td><strong>One file close to 10MB</strong></td><td>Add it with small files and wait</td><td>The per-file check rejects anything over the cap</td></tr>
<tr><td><strong>20 files</strong></td><td>Use numeric names and verify the list</td><td>20 is the ceiling and order is add order</td></tr>
<tr><td><strong>Over 200 pages</strong></td><td>Split or shorten the sources first</td><td>The merger stops at 200 total pages</td></tr>
<tr><td><strong>Locked or damaged PDF</strong></td><td>Unlock it or download a fresh copy</td><td>Encrypted and corrupt files cannot be parsed</td></tr>
<tr><td><strong>File in the wrong place</strong></td><td>Remove it, then add it again</td><td>There is no drag reorder in the list</td></tr>
<tr><td><strong>Tab discarded by Android</strong></td><td>Retry with smaller batches</td><td>Background tabs lose their in-memory state</td></tr>
</tbody>
</table>

<h2 id="worked-examples">Two worked examples</h2>
<p><strong>Example 1: six statements and two invoices.</strong> The set had six nine-page statements between 1.1MB and 2.9MB, and two one-page invoices at 240KB and 310KB. That is 8 files and 56 pages, comfortably inside every limit. I added them in statement order, with the invoices last, checked the numbered list, and merged. The success message reported 8 files and 56 pages. The download was about 9.1MB, so the page count and file size were both checked before emailing it to the lender. A missing statement would have shown up as 47 pages instead of 56.</p>
<p><strong>Example 2: a 21-file archive.</strong> A client sent 21 small PDFs covering 192 pages. The page total was fine, but the file count was one over the maximum. I merged the first 20 into <code>part-1.pdf</code>, downloaded it, then merged that result with the last file to produce the final 21-source bundle. The intermediate file was 9.4MB, under the per-file cap, and the second pass stayed within 200 pages. The alternative was to ask for one file to be combined at the source, which is cleaner when the sender can do it.</p>
<blockquote class="tip">File size and page count are separate limits. A set can be under 10MB per file and still fail because it has 201 pages, or be under 200 pages and fail because one scan is 11MB.</blockquote>

<h2 id="verify">Verify before you send</h2>
<p>Open the downloaded PDF in any Android PDF viewer and compare the page count with your expectation. Inspect the first page, a middle page and the final page. Use the printed page numbers to confirm the sequence, then check rotation, legibility and blank pages. If the file will be printed, zoom in on small type rather than judging from the thumbnail.</p>
<p>Confirm the size against the recipient's upload limit and rename the file by content and month, such as <code>loan-docs-2026-10.pdf</code>. Keep the source PDFs until the recipient confirms receipt. Merging can flatten form fields, signatures and annotations into static page content, so retain editable originals if you may need to change them. If the order is wrong, rebuild from the sources; editing the merged file is more work and risks losing pages.</p>
<div class="cta-box"><strong>Try it on Android:</strong> open <a href="/pdf-merge">PDF merge</a> in Chrome, select your PDFs from Downloads in the final order and merge. The files stay on your phone. If your source pages are photos, make a PDF with <a href="/image-to-pdf">image to PDF</a> first.</div>
`;

export const pdfMergeAndroid: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "merge-pdfs-on-android",
  kind: "cluster",
  title: "Merge PDFs on Android in Your Browser",
  description:
    "Merge PDFs on Android in Chrome or another browser: select from Downloads, fix add order, merge locally and save. Limits, memory tips and worked examples.",
  keywords: ["merge pdfs on android", "merge pdf android browser", "combine pdf files on android phone", "merge pdf in chrome android", "android pdf merge no app"],
  toolSlugs: ["pdf-merge"],
  relatedSlugs: ["merge-multiple-pdfs-order", "extract-pages-range", "fix-sideways-scans"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "why-browser", text: "Why the browser is enough", level: 2 },
    { id: "prepare", text: "Prepare PDFs and order", level: 2 },
    { id: "merge-steps", text: "Merge steps", level: 2 },
    { id: "android-memory", text: "Memory and limits", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "verify", text: "Verify before sending", level: 2 },
  ],
  html,
  faqs: [
    { question: "Can I merge PDFs on Android without installing an app?", answer: "Yes. Open the PDF merge page in Chrome, Firefox or Samsung Internet, tap Add PDFs and select files through the system picker. The merge runs in the page and downloads a new PDF. No app, account or upload is needed, but the page must be loaded and the files must be under 10MB each." },
    { question: "Where are merged PDFs saved on Android?", answer: "The browser downloads a file called merged.pdf, usually shown in the download notification and stored in Downloads. Use your file manager to rename or move it. The exact location depends on the browser and its download settings, so open the file before closing the tab and confirm it is the complete document." },
    { question: "Why does Android say the PDF cannot be merged?", answer: "Common causes are a file over 10MB, an owner-password restriction, a corrupt download or more than 20 files. Check the size and unlock protected documents first. If the page total exceeds 200, split the set into smaller batches. Retrying the same rejected file will not change the result." },
    { question: "How do I change the order of PDFs on Android?", answer: "Files are appended in the order you add them, and there is no drag reorder. To move one, remove it from the list and add it again so it lands at the end. Rename sources with numbers such as 01-cover.pdf before starting so the intended sequence is visible while you check the list." },
    { question: "How many PDFs can I merge on a phone?", answer: "The limits are 2 to 20 PDFs, 10MB per file and 200 pages total. A 21-file archive needs two passes: merge 20, download the result, then merge that output with the remaining file if both inputs stay under 10MB and the page total stays within 200. Phone memory can make long jobs slow." },
    { question: "Does the Android merge upload my documents?", answer: "No. The parsing and writing happen on the device, so the PDF contents are not sent to a server. The page itself loads from the site, and the browser holds the files in memory during the merge. Keep the tab open, download the result promptly and retain the originals until the recipient accepts the file." },
  ],
};
