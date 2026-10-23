import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>An email footer with a signature image can look sharp and consistent across clients, or it can arrive as a giant blurry rectangle that pushes the message sideways. The difference is mostly preparation: a sensible canvas size, a transparent PNG, a display width that fits the footer, and alt text for the people whose email client blocks images.</p>
<p>This guide covers the image itself. The <a href="/signature-maker">signature maker</a> creates a transparent PNG; it does not build a complete email signature block with your job title, phone number, social icons and legal disclaimer. For the full signature workflow, start with the <a href="/blog/signature-maker-guide">signature maker guide</a>.</p>

<h2 id="why-an-image">Why use an image instead of a signature font?</h2>
<p>A font renders differently depending on the recipient’s device, and email clients are notoriously inconsistent about which fonts they load. An image renders the same shapes everywhere the message is displayed, as long as the client shows images at all. That consistency is useful when your signature is part of your brand, or when you want the exact slant and spacing you approved.</p>
<p>The tradeoff is that an image is a fixed block. It does not reflow like text, it may be blocked by default, and it can look wrong in dark mode. Text remains accessible and searchable; an image needs alt text to be understood when it does not load. Many footers combine both: a text block with name and contact details, and a small signature image for the personal mark.</p>

<h2 id="dimensions-and-format">Pick dimensions and format for the footer</h2>
<p>A common target is about 600×200 pixels for the image file, displayed smaller inside the footer. The 3:1 shape matches a typical signature and leaves room for an underline or a short title if your design includes one. Start with a 1200×400 master, then save a 600×200 copy for the footer. Keeping the master means you can produce a larger version later without redrawing.</p>
<p>PNG is the right default because it preserves transparency and keeps thin strokes crisp. JPG is smaller but fills transparent areas with white, which produces a visible rectangle on any non-white background. If your footer already sits on a white card, a high-quality JPG can work, but PNG gives you more flexibility and avoids a surprise when the design changes.</p>
<table>
<thead><tr><th>Placement</th><th>Suggested image width</th><th>Format</th><th>Note</th></tr></thead>
<tbody>
<tr><td>Standard email footer</td><td>600 px file, displayed near 200 px</td><td>PNG</td><td>Transparent background, dark ink</td></tr>
<tr><td>Narrow mobile footer</td><td>480 px file</td><td>PNG</td><td>Test at the smallest width you support</td></tr>
<tr><td>White card or newsletter block</td><td>600 px</td><td>JPG or PNG</td><td>JPG loses transparency</td></tr>
<tr><td>High-resolution master</td><td>1200 px</td><td>PNG</td><td>Export source, then derive smaller copies</td></tr>
</tbody>
</table>
<p>Do not use a 4000px phone photo as the footer image. It will be scaled down anyway, and the extra bytes make the message heavier for no visual gain. If you only have a large scan, resize and compress it before inserting it.</p>

<h2 id="export-workflow">Export a footer-ready signature</h2>
<p>Open the <a href="/signature-maker">signature maker</a> and draw with a mouse, touch or pen, or type your name in a cursive font. Use a stroke around 3px on the 1200×400 canvas and choose near-black or deep navy ink. Preview against white and dark surfaces, because a transparent PNG will sit on whatever background the email client provides.</p>
<p>Export the PNG at full size and save it as your master. Then create a 600×200 copy for the footer. If your email platform asks for a file under a certain size, run the copy through the <a href="/image-compressor">image compressor</a> and resize it to the exact dimensions rather than letting the email client squash a larger file. Keep the master untouched so you can make a light-ink variant for dark mode later.</p>
<p><strong>Example 1: a consultant’s Gmail footer.</strong> Maya exports a 600×200 PNG with 3px dark navy ink, then inserts it in her Gmail signature settings at about 200px wide. She adds a plain-text line underneath with her role, email address and website. The text carries the contact details if images are blocked, and the image supplies the personal mark. She keeps a 1200×400 master in a private folder for future use.</p>
<p><strong>Example 2: an Outlook footer for a small team.</strong> The team uses one shared signature image at 480px wide so it fits a narrow reading pane. Each person inserts the same PNG at the same display width, then edits the text lines with their own name and phone number. The shared image keeps the brand consistent, while the text block stays searchable and accessible.</p>

<h2 id="add-to-footer">Add the image to your email footer</h2>
<p>In Gmail, open Settings, find the signature editor, and use the image button to insert the PNG. Set the display width so the signature does not dominate the message. In Outlook, the signature editor is under File, Options, Mail, Signatures; the insert-image control works similarly. Other clients have their own signature settings, but the pattern is the same: insert the file, set a width, add alt text if the editor exposes it, and send a test message to yourself.</p>
<p>Test the result in more than one client if you can. Gmail, Outlook, Apple Mail and mobile apps all render images differently. Check the footer on a phone, where the available width is smaller, and confirm that the image does not force horizontal scrolling. If it does, reduce the display width or use a narrower crop.</p>
<p>Do not place the image inside a table cell that is narrower than the image’s display width. Many email templates use tables for layout, and an oversized image can break the column. Set the image width in the editor rather than dragging it to fill the space.</p>

<h2 id="alt-text-and-dark-mode">Alt text and the dark-mode caveat</h2>
<p>Alt text describes the image when it cannot be displayed. Write something short and useful: <code>alt="Signature of Maya Chen"</code>. Do not repeat your entire job history in the alt attribute. If the image contains your name and nothing else, the alt text can simply say whose signature it is. Some email editors hide the alt field, so add it in the HTML if you control the template.</p>
<p>Dark mode is the most common visual failure. A transparent PNG with dark ink can disappear against a dark background, and some clients invert or dim images unpredictably. There is no single fix that works everywhere. The practical approach is to export a second version with light ink for dark backgrounds, test it in the clients your recipients actually use, and consider placing the image on a light card if the design allows. Do not assume the client will preserve your intended colors.</p>
<p>A signature image is not a logo, and it does not need to be visible at every screen width. If the footer becomes crowded on mobile, let the text block carry the information and hide or shrink the image. The message should remain readable even when the image is blocked, inverted or stripped by a corporate mail gateway.</p>

<h2 id="weight-and-limits">File weight, deliverability and what the tool does not build</h2>
<p>Keep the image light. A footer image should be tens of kilobytes, not megabytes. Large images slow down loading, may be clipped by some clients and add unnecessary weight to every message in a thread. PNG line art at 600×200 is usually compact; if yours is not, check that you did not export a photo or a full-page scan. The <a href="/image-compressor">image compressor</a> can resize and re-encode a copy without touching the master.</p>
<p>The <a href="/signature-maker">signature maker</a> makes one signature image at a time. It does not generate an email-signature block, insert itself into Gmail or Outlook, add social icons, create a disclaimer or manage a team-wide template. Those parts belong in your email client or template editor. The tool also does not remove the background from a photographed signature, so start from a clean canvas rather than a picture of paper.</p>
<p>For the visual basics, see <a href="/blog/signature-maker-guide/transparent-signature-png">transparent signature PNG</a>. If the same mark will also go on a PDF, <a href="/blog/signature-maker-guide/signature-size-for-pdf">signature size for PDF</a> explains the placement dimensions. And if you are comparing a hand-drawn mark with a typed one, <a href="/blog/signature-maker-guide/drawn-vs-typed-signature">drawn vs typed signature</a> walks through the tradeoffs.</p>
<div class="cta-box"><strong>Make a footer-ready mark:</strong> open the <a href="/signature-maker">signature maker</a>, draw or type your signature, preview it on light and dark backgrounds, and download a transparent PNG. Then insert it in your email signature settings at a width that fits.</div>
`;

export const signatureEmail: BlogPost = {
  pillar: "signature-maker-guide",
  slug: "signature-image-for-email",
  kind: "cluster",
  title: "Signature Image for Email: Size, PNG and Alt Text",
  description:
    "Put a signature image in an email footer: about 600×200 PNG, useful alt text, light file weight, and a dark-mode caveat. Not a full signature builder.",
  keywords: ["signature image for email", "email footer signature png", "signature size for email", "transparent signature email", "email signature image alt text"],
  toolSlugs: ["signature-maker"],
  relatedSlugs: ["transparent-signature-png", "drawn-vs-typed-signature", "signature-size-for-pdf"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "why-an-image", text: "Why use an image", level: 2 },
    { id: "dimensions-and-format", text: "Dimensions and format", level: 2 },
    { id: "export-workflow", text: "Export a footer-ready signature", level: 2 },
    { id: "add-to-footer", text: "Add the image to your footer", level: 2 },
    { id: "alt-text-and-dark-mode", text: "Alt text and dark mode", level: 2 },
    { id: "weight-and-limits", text: "File weight and limits", level: 2 },
  ],
  html,
  faqs: [
    { question: "What size should a signature image be for email?", answer: "Start with a 1200×400 master and save a 600×200 copy for the footer, then display it around 200 pixels wide in the signature editor. The exact display width depends on your template and the reading pane. Test on a phone and in a narrow desktop pane so the image does not force horizontal scrolling." },
    { question: "Should I use PNG or JPG for an email signature image?", answer: "PNG is the better default because it keeps transparency and crisp strokes. JPG fills transparent areas with white, which creates a visible rectangle on colored or dark backgrounds. Use JPG only when the footer sits on a white card and you have deliberately flattened the background." },
    { question: "How do I add the image to my Gmail or Outlook signature?", answer: "In Gmail, open Settings, find the signature editor, and use the image button to insert the PNG. In Outlook, open File, Options, Mail, Signatures and use the insert-image control. Set a sensible display width, add alt text if the editor allows it, and send a test message to yourself before using it on real mail." },
    { question: "Why does my signature disappear in dark mode?", answer: "A transparent PNG with dark ink can blend into a dark background, and some email clients invert or dim images. Export a light-ink version for dark backgrounds, test it in the clients your recipients use, or place the image on a light card if the design allows. There is no single setting that fixes every client." },
    { question: "Is this a complete email signature generator?", answer: "No. The signature maker creates the image only. It does not build a block with your title, phone number, social icons or disclaimer, and it does not insert the image into Gmail or Outlook. Use your email client’s signature editor for the text and layout around the image." },
    { question: "Will a signature image hurt email deliverability?", answer: "A small, clean image is unlikely to be the deciding factor, but large attachments and image-only messages are harder to read and slower to load. Keep the footer image to tens of kilobytes, include plain text for the important details, and avoid turning the entire signature into a single picture. Follow your organization’s email guidelines." },
  ],
};
