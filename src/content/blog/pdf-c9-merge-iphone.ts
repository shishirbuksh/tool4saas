import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Four PDFs sat in Files on my iPhone: a one-page cover, a one-page ID, six pages of bank statements and an eight-page signed lease. The letting agent wanted one 16-page document. I did not install an app. I opened the merge page in the browser, selected the four files through the file picker, merged them locally and saved the download. This guide covers that exact route, including the order rule, the 10MB per-file cap and the memory behaviour that matters on a phone.</p>
<p>Part of the <a href="/blog/pdf-merge-guide">PDF workflow guide</a>. Merge in the <a href="/pdf-merge">PDF merge tool</a>; turn scans into a PDF first with <a href="/image-to-pdf">image to PDF</a>. For covers, chapters and mixed bundles, read <a href="/blog/pdf-merge-guide/merge-multiple-pdfs-order">merge order</a>.</p>

<h2 id="why-browser">Why the browser works on iPhone</h2>
<p>The merge is performed by the page itself, not by a remote server. Your PDFs are read into memory on the phone and written into a new file locally. Nothing is uploaded, there is no account to create, and there is no app to install or update. Safari and Chrome run the same merge page, and the important behaviour is similar even though the surrounding interface differs.</p>
<p>The limits are fixed and worth learning before you start: 2 to 20 PDFs, 10MB per file, and 200 pages in total. Encrypted PDFs and corrupt files fail because the merge engine cannot parse them. Everything is local, so there is no server-side cleanup step and no second attempt on another machine. If the phone runs out of memory, the work is lost and you start again.</p>
<p>The browser's file picker is the only bridge to your documents. It can open PDFs you select from Files or Downloads, but this is not an iOS app and not a Files extension. It does not browse your folders on its own, sync a cloud drive or keep a library. You choose the files, and the page receives the copies the picker hands over.</p>

<h2 id="prepare">Prepare the files before you add them</h2>
<p>Put every PDF somewhere the picker can see, usually Files or Downloads. If a file lives in iCloud Drive and is not downloaded yet, let the download finish before you select it. A placeholder that has not fully arrived can fail to load, which looks like a broken PDF rather than a sync delay.</p>
<p>Rename the files with a numeric prefix such as <code>01-cover.pdf</code> and <code>02-id.pdf</code>. You will still verify the order on screen, but clear names make a wrong sequence obvious. Check three limits at the same time: each file is under 10MB, the set is no more than 20 files, and the page counts add up to 200 or less. A file that is password-protected or damaged will not merge; unlock it or request a fresh copy before adding it.</p>
<p>Decide the final order now. The order in which files are added becomes the page order in the result. There is no drag handle in the list, so changing position means removing a file and adding it again at the end. If the images belong between pages of an existing PDF, this tool cannot interleave them; split the PDF first and merge the parts around a separate image PDF.</p>

<h2 id="merge-steps">Merge steps on the iPhone</h2>
<ol>
<li>Open Safari or Chrome and go to the <a href="/pdf-merge">PDF merge page</a>.</li>
<li>Tap <strong>Add PDFs</strong>. The system file picker opens. Choose a PDF from Files or Downloads. Select several at once if your picker offers it, or add them one at a time; each addition appends to the list.</li>
<li>Read the numbered list from top to bottom. It shows each file name and size. That number is the page order the merge will follow.</li>
<li>If a file is out of place, tap <strong>Remove</strong> and add it again so it lands at the end. Repeat until the sequence matches your plan.</li>
<li>Confirm the list has 2 to 20 files, every file is 10MB or less, and your expected total is 200 pages or fewer.</li>
<li>Tap <strong>Merge</strong>. Keep the page open and wait. The success message reports how many files and pages were merged.</li>
<li>The browser downloads <code>merged.pdf</code>. Rename it with the content and date, save it through the browser's download or share control, then open it and check the pages.</li>
</ol>
<p>Do not assume the download went to a particular folder. Use the browser's download list or the share control to keep the file in Files, send it by email or pass it to another app. The exact placement varies with the browser and the iOS version, so verify that the file exists before you close the tab.</p>

<h2 id="iphone-memory">Memory, speed and the 200-page ceiling</h2>
<p>A PDF's memory cost depends on page complexity, not only on file size. A 200-page text document can be lighter than a 40-page scan with large images. The phone does the parsing and writing, so a long merge may take noticeably longer than the same job on a laptop. The browser can also discard and reload a background tab when memory gets tight, which wipes the selected list and any progress.</p>
<p>Close other tabs before a large merge, keep the merge page in front, and avoid switching apps while it runs. Download each result before starting another batch. If the tab reloads, do not immediately retry the same 20-file set. Split it into two smaller runs, download both outputs, and merge those outputs only if each is under 10MB and the combined page count stays within 200. Keep the intermediate files until the final PDF opens correctly.</p>
<table>
<thead><tr><th>Situation</th><th>What to do</th><th>Why</th></tr></thead>
<tbody>
<tr><td><strong>2 to 5 short PDFs</strong></td><td>Merge in one run</td><td>Low memory use and a quick result</td></tr>
<tr><td><strong>One file near 10MB</strong></td><td>Merge it with small files and wait</td><td>The per-file cap is checked, and heavy pages take longer</td></tr>
<tr><td><strong>20 files</strong></td><td>Use numeric names and check the list twice</td><td>20 is the maximum, and there is no drag reorder</td></tr>
<tr><td><strong>More than 200 pages</strong></td><td>Split or compress the source first</td><td>The merger stops at 200 pages total</td></tr>
<tr><td><strong>Encrypted or corrupt PDF</strong></td><td>Unlock it or get a fresh copy</td><td>The engine cannot parse protected or damaged files</td></tr>
<tr><td><strong>Wrong sequence</strong></td><td>Remove the file and add it again</td><td>Add order becomes page order</td></tr>
<tr><td><strong>Tab reloads mid-merge</strong></td><td>Split the job into smaller batches</td><td>iOS may reclaim memory and discard the page state</td></tr>
</tbody>
</table>

<h2 id="worked-examples">Two worked examples</h2>
<p><strong>Example 1: a 16-page rental application.</strong> The set was a one-page cover at 180KB, a one-page ID at 1.9MB, a six-page statement at 3.2MB and an eight-page lease at 4.1MB. I added them in that order, read the numbered list, and merged. The success message reported 4 files and 16 pages. The download was about 9.3MB, close enough to common 10MB attachment limits to be worth checking before emailing. I opened the result and confirmed the cover was page 1 and the lease ended on page 16. If the statement had been encrypted, the merge would have refused it, so unlocking it first was part of the preparation.</p>
<p><strong>Example 2: 14 statements, 188 pages.</strong> A mortgage file arrived as 14 PDFs with 188 pages in total, each between 2MB and 9MB. The file count was under 20 and the page total was under 200, but this was a heavy job for a phone. I closed other tabs, kept the merge page in front and let it finish. The success message confirmed 188 pages. If the tab had reloaded, the plan was to merge seven files, download the result, merge the other seven, then combine the two outputs only if both were under 10MB. Sampling the first, middle and last pages caught a sequence error before the file was sent.</p>

<h2 id="verify">Verify the download before sharing</h2>
<p>Open the downloaded PDF on the iPhone and check the page count against your expectation. Then inspect the first page, a middle page and the last page. Confirm the sequence by the page numbers printed on the documents, not only by the file names. Check that no page is sideways, blank or missing, and zoom in on small text if the file will be printed.</p>
<p>Check the byte size against the recipient's limit, then rename the file with content and month, such as <code>rental-bundle-2026-10.pdf</code>. Keep the original PDFs until the recipient accepts the upload. Merging can flatten form fields, signatures and annotations into static page content, so archive any editable originals you may need again. If the order is wrong after merging, rebuild from the sources rather than trying to edit the finished file.</p>
<div class="cta-box"><strong>Merge on your phone:</strong> open <a href="/pdf-merge">PDF merge</a> in Safari or Chrome, add your PDFs in final order and download the result. No app, no upload. If your pages start as photos, build them into a PDF with <a href="/image-to-pdf">image to PDF</a> first.</div>
`;

export const pdfMergeIphone: BlogPost = {
  pillar: "pdf-merge-guide",
  slug: "merge-pdfs-on-iphone",
  kind: "cluster",
  title: "Merge PDFs on iPhone Without an App",
  description:
    "Merge PDFs on iPhone in Safari: pick files from Files or Downloads, set order, merge locally and save the download. Limits, memory tips and examples.",
  keywords: ["merge pdfs on iphone", "merge pdf iphone without app", "combine pdf files on iphone browser", "merge pdfs in safari", "iphone pdf merge order"],
  toolSlugs: ["pdf-merge"],
  relatedSlugs: ["merge-multiple-pdfs-order", "jpg-scans-single-pdf", "extract-pages-range"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "why-browser", text: "Why the browser works", level: 2 },
    { id: "prepare", text: "Prepare the files", level: 2 },
    { id: "merge-steps", text: "Merge steps", level: 2 },
    { id: "iphone-memory", text: "Memory and page limits", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "verify", text: "Verify the download", level: 2 },
  ],
  html,
  faqs: [
    { question: "Do I need to install an app to merge PDFs on iPhone?", answer: "No. Open the PDF merge page in Safari or Chrome, tap Add PDFs and choose files through the system file picker. The merge runs on the phone and downloads a new PDF. There is no app, account or subscription, and the files are not uploaded to a server." },
    { question: "Where does the merged PDF go on iPhone?", answer: "The browser downloads a file named merged.pdf. Use the browser's download list or share control to keep it in Files, send it on or open it in another app. The exact folder varies by browser and iOS version, so confirm the file exists before closing the tab, then rename it by content and date." },
    { question: "Why won't a PDF add to the merge list?", answer: "The file may be over 10MB, encrypted or corrupt, or you may have reached the 20-file limit. Unlock protected PDFs with the owner password or request a fresh copy. Check the size in Files before adding. A PDF that fails to parse cannot be rescued by retrying it in the same list." },
    { question: "Can I reorder PDFs after adding them on iPhone?", answer: "There is no drag reorder in the list. The order in which you add files becomes the page order. To move a file, remove it and add it again so it lands at the end, repeating until the sequence is correct. Numeric file names such as 01-cover.pdf make the intended order easier to check." },
    { question: "How many PDFs and pages can I merge?", answer: "The limits are 2 to 20 PDFs, 10MB per file and 200 pages in total. A 14-file, 188-page bundle is allowed but heavy for a phone. If the tab reloads, split the set into smaller batches, download each result, and only re-merge outputs that are each under 10MB." },
    { question: "Are my PDFs private when merging on iPhone?", answer: "The merge runs locally in the page, so the PDF contents are not uploaded. The page itself must load from the site first, and the browser holds the files in memory while it works. Close other tabs, download the result promptly and keep the originals until the recipient accepts the file." },
  ],
};
