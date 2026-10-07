import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>A landlord posted a “flat for rent” photo straight from his phone. A stranger extracted the GPS coordinates, walked to the building, and knocked — while the flat sat empty awaiting tenants. The photo had done exactly what the landlord asked, plus one thing he never imagined: <strong>broadcasting his vacant property's location to the meter</strong>. Every phone photo embeds EXIF metadata — GPS, timestamps, device model. This guide shows what leaks, how to check in seconds, and how stripping works (plus the WhatsApp exception everyone misunderstands).</p>
<p>Part of the <a href="/blog/image-compressor-guide">image optimization guide</a>. Inspect any photo in the <a href="/exif-viewer">EXIF viewer</a> (local FileReader — nothing uploads); strip by recompressing in the <a href="/image-compressor">image compressor</a>. Portal method in <a href="/blog/image-compressor-guide/compress-jpg-100kb-portal">100KB guide</a>.</p>

<h2 id="what-leaks">What your photo leaks (GPS, timestamps, device)</h2>
<table>
<thead><tr><th>Field</th><th>Example leak</th><th>Who cares</th></tr></thead>
<tbody>
<tr><td><strong>GPS coordinates</strong></td><td>28.6139°N, 77.2090°E — your home</td><td>Anyone downloading the file</td></tr>
<tr><td><strong>Timestamp</strong></td><td>Photo taken Tue 02:14 — proves routine</td><td>Insurers, disputants, stalkers</td></tr>
<tr><td><strong>Device + software</strong></td><td>iPhone 15, edited in Snapseed</td><td>Forensics, verification</td></tr>
<tr><td><strong>Orientation flag</strong></td><td>Rotated display vs stored pixels</td><td>Developers (layout bugs)</td></tr>
</tbody>
</table>
<p>Rental listings, marketplace sales, dating profiles, protest photos, whistleblower documents — any upload where location or timing matters deserves a 10-second EXIF check first. The landlord's photo carried all four fields.</p>

<h2 id="check-now">Check in 10 seconds (local viewer method)</h2>
<p>Open the <a href="/exif-viewer">EXIF viewer</a>, drop the photo, read the table: coordinates with map link, timestamp, camera, dimensions, orientation. Because it uses FileReader locally, checking a sensitive photo is safe — the bytes never traverse the network (verify in DevTools if you are cautious; zero requests fire). Screenshots and downloaded memes typically carry no EXIF (already stripped upstream); fresh camera photos almost always do. Check <em>before</em> posting, not after — deletion after upload only removes future copies.</p>

<h2 id="whatsapp-myth">The WhatsApp myth (what it strips vs keeps)</h2>
<p>“WhatsApp removes metadata, so I'm safe everywhere” — wrong in both directions. WhatsApp <em>does</em> strip EXIF on send (re-encoding images), which is why forwarded photos lose location. But email attachments, direct forum uploads, cloud links (Drive/Dropbox originals), listing sites and Bluetooth transfers preserve EXIF fully. The rule: <strong>assume every upload keeps metadata unless the platform documents stripping</strong>. Instagram strips on post but keeps it in stories drafts; Telegram's “send as file” preserves everything while quick-send compresses. When in doubt, strip yourself — takes seconds, costs nothing.</p>

<h2 id="strip-method">Strip method: recompress and verify</h2>
<p>Re-saving through the <a href="/image-compressor">image compressor</a> drops EXIF while keeping pixels: the canvas pipeline carries image data only, no metadata segments. Procedure: view original (note GPS present) → compress at 80% → view output (GPS absent) → upload the output. For bulk listing shoots, batch all finals through one pass. Caveat: orientation flags also strip — if a photo relied on the flag to display upright, verify rotation after (rare, but check). Professionals handling source protection should additionally screenshot-and-recrop sensitive frames rather than trusting any single tool. Pair with <a href="/blog/image-compressor-guide/resize-image-exact-pixels">resizing</a> for portal uploads in one workflow.</p>
<blockquote class="tip">General guidance only, not legal advice. For legally sensitive material, consult counsel about metadata obligations — some contexts require preserving originals.</blockquote>
`;

export const imageExif: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "strip-exif-before-upload",
  kind: "cluster",
  title: "Strip EXIF Data Before Uploading Photos",
  description:
    "Photo EXIF leaks GPS, timestamps, device: 10-second local check method, WhatsApp stripping myth, recompress-to-strip workflow. Free private viewer.",
  keywords: [
    "how to remove exif data before uploading",
    "what is exif gps location risk",
    "view exif online private",
    "does whatsapp strip exif",
    "exif vs metadata",
    "What is EXIF data and why remove it?",
  ],
  toolSlugs: ["exif-viewer", "image-compressor", "image-resizer"],
  relatedSlugs: ["compress-jpg-100kb-portal", "png-vs-jpg-vs-webp", "image-seo-size-alt"],
  published: "2026-10-07",
  updated: "2026-10-07",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "what-leaks", text: "What leaks", level: 2 },
    { id: "check-now", text: "10-second check", level: 2 },
    { id: "whatsapp-myth", text: "WhatsApp myth", level: 2 },
    { id: "strip-method", text: "Strip method", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is EXIF data and why remove it?", answer: "Embedded photo metadata: GPS coordinates like 28.6139°N 77.2090°E, timestamps, camera model and orientation flags. Anyone downloading your file can read location and routine, from rental listings to protest photos. Strip before uploads where location or timing matters, since deletion after posting only removes future copies." },
    { question: "How do I check EXIF without uploading?", answer: "Use a local FileReader-based EXIF viewer: drop the photo, read coordinates with map link, timestamp, camera, dimensions and orientation table. Bytes never traverse the network — verify with zero DevTools requests. Fresh camera photos almost always carry EXIF, while screenshots typically carry none, so check before posting." },
    { question: "Does WhatsApp remove EXIF?", answer: "On send, yes since re-encoding strips it, which is why forwarded photos lose location. But email attachments, forums, cloud Drive originals, Bluetooth, listing sites and Telegram file-sends preserve it fully. Assume every upload keeps metadata unless documented otherwise, and strip yourself since it takes seconds." },
    { question: "How do I strip EXIF?", answer: "Recompress through a local image compressor at 80% — the canvas pipeline carries pixels only, no metadata segments. Procedure: view original noting GPS present, compress, view output GPS-absent, then upload the output. Verify rotation afterward since orientation flags also strip, and batch finals in one pass." },
    { question: "Do screenshots have EXIF?", answer: "Usually minimal — screenshots carry dimensions but rarely GPS, since they were stripped upstream. Fresh camera photos almost always carry full EXIF with coordinates, timestamps and device model. Check regardless in the local viewer; it takes ten seconds and confirms whether stripping is needed before sensitive uploads." },
  ],
};
