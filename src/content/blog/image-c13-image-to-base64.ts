import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A Base64 data URL lets an image travel inside a text document. Instead of a separate file request, the image bytes become a long string in the HTML, CSS or JSON. That can simplify a single-file demo or a small icon, and it can also bloat a page, break caching and leak metadata. The decision is less about whether the conversion works and more about whether inlining is appropriate for this particular image.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image optimization guide</a>. The local <a href="/image-to-base64">image to Base64 tool</a> converts a file into a data URL and previews a pasted data URL. It does not compress, resize or strip metadata, so it should not be the last step before publishing a photo.</p>

<h2 id="data-url-anatomy">What a data URL contains</h2>
<p>The format is <code>data:image/png;base64,iVBORw0KGgo...</code>. The first part declares the media type, then comes the Base64 marker, then the encoded bytes. A browser can use that string directly as an image source. The payload is ordinary Base64, not encryption and not compression. Anyone who can read the page can decode it.</p>
<p>Base64 represents every three bytes as four text characters, so the encoded payload is about one third larger than the binary file. A 100 KB image becomes roughly 133 KB of text before the prefix. That overhead applies whether the image is a tiny icon or a photograph, and the text does not compress as well as the original binary in a gzip or Brotli response.</p>
<p>There is no file name, no separate cache key and no independent HTTP response. The image lives or dies with the document that contains it. Updating the image means updating the document, and every visitor downloads the full string again unless the document itself is cached aggressively.</p>

<h2 id="tool-behavior">What the converter accepts</h2>
<p>Encode mode reads a local file through the browser's FileReader. The file must be 10 MB or smaller and one of five types: JPEG, PNG, WebP, GIF or SVG. The result is a complete data URL, ready to copy. There is no resize, no quality setting, no EXIF removal and no dimension check. A 9000-pixel image that passes the size limit will still produce a very long string.</p>
<p>Decode mode expects a full image data URL, not raw Base64. It accepts a preview allowlist that includes PNG, JPEG, GIF, WebP, SVG, BMP, AVIF and ICO, and it blocks obvious script and HTML payloads. The input is capped at 15,000,000 characters. Decoding shows a preview; it does not download a reconstructed file. To save the image, use the browser's image save command or decode the payload with a local script.</p>
<p>The asymmetry is intentional but easy to miss. The encoder accepts fewer types than the decoder can preview. If you have a BMP or AVIF file, convert it to PNG or WebP first. If you paste raw Base64 without the <code>data:image/...;base64,</code> prefix, the preview will reject it even though the characters are valid Base64.</p>
<table>
<thead><tr><th>Operation</th><th>Limit or rule</th></tr></thead>
<tbody>
<tr><td><strong>Encode file size</strong></td><td>10 MB maximum</td></tr>
<tr><td><strong>Encode types</strong></td><td>JPEG, PNG, WebP, GIF, SVG</td></tr>
<tr><td><strong>Decode input</strong></td><td>Full data URL, 15,000,000 characters maximum</td></tr>
<tr><td><strong>Decode preview types</strong></td><td>PNG, JPEG, GIF, WebP, SVG, BMP, AVIF, ICO</td></tr>
<tr><td><strong>Compression</strong></td><td>None</td></tr>
<tr><td><strong>Metadata removal</strong></td><td>None</td></tr>
<tr><td><strong>Download button</strong></td><td>None; preview only</td></tr>
</tbody>
</table>

<h2 id="size-math">Doing the size math before you inline</h2>
<p>A 10 KB icon becomes about 13.3 KB of text. A 100 KB illustration becomes about 133 KB. A 1 MB photo becomes about 1.33 MB. Add the prefix and the surrounding HTML, then compare that with a separate image request that can be cached, compressed and served from a CDN. For a single small icon used once, inlining can remove a request. For a photo used on every page, it usually makes the page heavier and less cacheable.</p>
<p>The break-even point depends on the connection, the cache hit rate and the number of pages that share the image. An image used once on a rarely visited page may be fine inline. An image used in a header on every page should be a separate file with a long cache lifetime. Measure the actual page weight rather than guessing from the file size alone.</p>
<p>Base64 also affects HTML parsing and memory. A very long attribute or text node is more expensive to parse than a URL, and editing a document with megabytes of encoded image is unpleasant. Keep inline images small, and move anything approaching a few hundred kilobytes to a normal file.</p>

<h2 id="when-to-inline">When inlining helps, and when it hurts</h2>
<p>Good candidates are small SVG icons, a single-file HTML report, a tiny CSS background used on one page, or an email template that must survive a strict content security policy. Even then, test the final environment. Many email clients block or strip data URL images, and corporate gateways may rewrite them. A preview in one client is not proof that every recipient will see the image.</p>
<p>Poor candidates are photographs, hero images, product galleries and anything reused across pages. They benefit from separate requests, responsive sources, modern formats and CDN caching. Inlining also makes responsive images harder because you cannot use <code>srcset</code> with the same ease, and it can duplicate the payload if the same image appears in several components.</p>
<p>Content Security Policy adds another constraint. If the page uses a strict <code>img-src</code> directive, data URLs need to be allowed explicitly. Allowing <code>data:</code> broadly can weaken the policy, so scope it to images if possible. Test with the production policy, not just a local development server.</p>

<h2 id="privacy">Metadata and SVG risks</h2>
<p>Converting a photo to Base64 does not remove EXIF data. GPS coordinates, camera model, timestamps and orientation can all survive inside the encoded string. If the image is going public, strip metadata with an image editor or a dedicated EXIF tool before encoding. The converter's preview is not a privacy filter.</p>
<p>SVG is text and can contain scripts, event handlers and external references. The decoder's allowlist and the way an image is used affect the risk. An SVG loaded through an <code>&lt;img&gt;</code> element has a restricted scripting model, while SVG inlined into the page is part of the document. Treat user-supplied SVG as untrusted, and do not paste an unknown data URL into a context where it becomes active markup.</p>
<p>The converter checks the declared media type and blocks obvious script prefixes, but it does not sanitize the SVG contents. That is enough for a preview of your own file, not for a public upload pipeline.</p>

<h2 id="workflow">A practical inlining workflow</h2>
<ol>
<li>Resize and compress the image first; the converter does neither.</li>
<li>Strip EXIF and other metadata if the image will be public.</li>
<li>Encode the optimized file and check the resulting string length.</li>
<li>Confirm the destination supports data URLs, especially if it is an email client or a CMS.</li>
<li>Update the CSP if needed, scoped to images rather than all content.</li>
<li>Measure the page before and after; remove the inline image if it makes the critical path heavier.</li>
</ol>
<p>For a separate-file workflow, see the <a href="/blog/image-compressor-guide/png-vs-jpg-vs-webp">format comparison</a> and the <a href="/blog/image-compressor-guide/strip-exif-before-upload">EXIF guide</a>. For the text encoding layer, the <a href="/blog/json-formatter-guide/base64-url-safe-vs-standard">Base64 modes guide</a> explains why URL-safe alphabets differ from the standard one used in data URLs.</p>
<div class="cta-box"><strong>Convert an image now:</strong> choose a file in the <a href="/image-to-base64">image to Base64 tool</a>, copy the data URL, and check its size before pasting it into a page. For large images, compress first with the <a href="/image-compressor">image compressor</a>.</div>
`;

export const imageToBase64: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "image-to-base64-data-url",
  kind: "cluster",
  title: "Image to Base64: Data URLs in Practice",
  description:
    "Turn images into Base64 data URLs, judge the size overhead, and avoid inlining where caching or email clients will punish it.",
  keywords: ["image to base64", "base64 data url", "inline image html", "data uri image size", "convert png to base64"],
  toolSlugs: ["image-to-base64"],
  relatedSlugs: ["png-vs-jpg-vs-webp", "strip-exif-before-upload", "jpg-to-png"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "data-url-anatomy", text: "What a data URL contains", level: 2 },
    { id: "tool-behavior", text: "What the converter accepts", level: 2 },
    { id: "size-math", text: "Doing the size math", level: 2 },
    { id: "when-to-inline", text: "When inlining helps", level: 2 },
    { id: "privacy", text: "Metadata and SVG risks", level: 2 },
    { id: "workflow", text: "Inlining workflow", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does the tool compress the image?", answer: "No. It encodes the original bytes as Base64. Compress and resize first, then convert, or the data URL will carry the full original size along with the Base64 overhead. The image compressor is the right step before this one." },
    { question: "Can I paste raw Base64 without the data prefix?", answer: "No. The decoder expects a complete data URL beginning with data:image/...;base64,. Raw Base64 has no media type, so the page cannot choose a preview format. Add the correct prefix if you know the image type." },
    { question: "Does the conversion remove EXIF data?", answer: "No. The encoded bytes are unchanged, so camera metadata, timestamps and GPS coordinates can remain. Strip metadata with an editor or a dedicated tool before encoding an image that will be published." },
    { question: "Why do email clients hide data URL images?", answer: "Support varies and many clients or gateways block data URLs for security, size or rendering reasons. Test the actual received message in the clients your audience uses. A normal hosted image is usually more reliable for email." },
    { question: "Can I download the decoded image?", answer: "The decoder shows a preview but has no download button. Use the browser's save-image command on the preview, or decode the Base64 with a local script if you need the original file." },
  ],
};
