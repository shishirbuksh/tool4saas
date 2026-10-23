import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Instagram image sizes are not one-size-fits-all. Feed posts are shown inside a supported aspect range, profile photos sit behind a circular mask, and stories and reels use a tall canvas with interface elements over the top and bottom. Automatic cropping is the result. The way to avoid it is to decide the slot before you export, crop to that ratio yourself, and resize to the pixel dimensions the app expects.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image compression guide</a>. The <a href="/blog/image-compressor-guide/resize-image-exact-pixels">exact-pixel resize method</a> covers the crop-resize-compress order, and the <a href="/image-format-converter">format converter</a> is useful when a PNG export needs to become a JPEG. Finish with a quality pass in the image compressor.</p>

<h2 id="sizes">The Instagram image sizes to export in 2026</h2>
<p>These are the practical export targets. Instagram re-encodes what you upload, so the final bytes after posting will differ, but starting at the right pixel dimensions avoids unnecessary softness and gives the app less reason to crop.</p>
<table>
<thead><tr><th>Placement</th><th>Export size</th><th>Ratio</th><th>Main risk</th></tr></thead>
<tbody>
<tr><td><strong>Feed portrait</strong></td><td>1080×1350</td><td>4:5</td><td>Taller uploads lose top or bottom</td></tr>
<tr><td><strong>Feed square</strong></td><td>1080×1080</td><td>1:1</td><td>Safe for a consistent grid</td></tr>
<tr><td><strong>Feed landscape</strong></td><td>1080×566</td><td>1.91:1</td><td>Widest supported ratio; less feed height</td></tr>
<tr><td><strong>Profile photo</strong></td><td>320×320</td><td>1:1</td><td>Circular mask cuts the corners</td></tr>
<tr><td><strong>Story</strong></td><td>1080×1920</td><td>9:16</td><td>Interface overlays the top and bottom</td></tr>
<tr><td><strong>Reel cover</strong></td><td>1080×1920</td><td>9:16</td><td>Also cropped into the profile grid</td></tr>
</tbody>
</table>
<p>Portrait feed posts use the most vertical space, which is why 1080×1350 is a common choice for photos with a clear subject. Square 1080×1080 keeps a tidy grid and is the easiest ratio to reuse across other platforms. Landscape 1080×566 is the widest the feed supports; anything wider will be trimmed. Profile photos display at 320×320 inside a circle, so the corners never appear. Stories and reels share the 1080×1920 canvas.</p>

<h2 id="auto-crop">Why Instagram crops your upload</h2>
<p>The app fits your file into a fixed slot. If the file's ratio does not match the slot, the extra edges are trimmed, usually from the sides or from the top and bottom. The preview can hide part of that decision, especially on the profile grid and on reel covers, which are cropped again after upload. The app cannot know which part of the frame matters, so it makes a generic choice that often cuts heads, text or logos near an edge.</p>
<p>You can avoid the surprise by cropping first. Decide whether the image is a 4:5 portrait, a square, a 1.91:1 landscape, or a 9:16 story. Crop to that ratio with the subject centred and a little breathing room on every side, then resize to the pixel target. If you cannot bear to cut the composition, place the photo on a canvas of the target ratio with a matching background instead. That keeps the whole frame but adds visible bars, so use it only when the full composition matters more than filling the screen.</p>

<h2 id="feed">Feed: 1080×1350 or 1080×1080</h2>
<p>Choose the feed shape from the source, not from a habit. A 4:5 portrait suits tall subjects, full-body shots and vertical scenes. A square suits products, group photos and anything that needs to survive a grid crop. If the original is already 3:2 or 4:3, you will lose sides when converting to 4:5 and top or bottom when converting to 1:1. Crop before resizing, and never stretch the image to force a ratio; widened faces are obvious in a feed.</p>
<p>Export these feed slots at 1080px wide. A 600px image upscaled to 1080px will look soft, and a 6000px master offers no visible benefit after Instagram re-encodes it. A clean JPEG around 80–85% quality is usually a better starting point than a huge file. Keep important text away from the outer edges, because the app may still adjust the crop slightly depending on how the post is displayed.</p>

<h2 id="profile">Profile: 320×320 and the circle mask</h2>
<p>A profile photo is displayed at 320×320 and masked into a circle. Design for the circle, not the square: the corners are gone. Put the logo mark or face in the centre, keep lettering large and short, and leave a margin so the mask does not clip the edges of a wordmark. A wide logo squeezed into the square becomes tiny, and fine text disappears at the size people actually see in the app.</p>
<p>Export a square source at 320×320. The display target is small, so clarity at that size matters more than file size. Check the result in the app's circular preview rather than judging the square file on your desktop.</p>

<h2 id="story">Story and reel: 1080×1920</h2>
<p>Stories and reels use a 9:16 canvas at 1080×1920. The top and bottom of that canvas are covered by interface elements, captions and controls, so keep faces, captions and calls to action away from the extreme edges. A 16:9 photo dropped into a story will either be letterboxed or cropped depending on how it is added; export a 9:16 composition when you want full-bleed coverage.</p>
<p>Reels add one more crop: the cover appears in the profile grid, where it is shown in a square or portrait tile. A cover that looks perfect at 9:16 can lose its title in the grid. Design the cover with a central safe area that survives a square crop, and check the grid preview before publishing. The same caution applies to any text placed near the top or bottom of a story frame.</p>

<h2 id="worked-examples">Two worked examples with byte outcomes</h2>
<p><strong>Example 1: a landscape phone photo for the feed.</strong> The source was a 4032×3024 JPEG at 5.3MB. The subject was vertical, so the image was cropped to a 4:5 region of 2419×3024, then resized to 1080×1350. The resize view exported a PNG, which was converted to JPEG. At 85% the file was about 245KB; at 80% it was about 185KB and the face still looked clean. The 80% file was used. Because the ratio was already 4:5, the feed preview showed no additional crop. If the subject had not survived the side trim, the fallback would have been a 1080×566 landscape export instead.</p>
<p><strong>Example 2: a portrait photo for a story.</strong> The source was a 3000×4000 JPEG at 4.2MB. A 9:16 crop of 2250×4000 kept the full height and trimmed the sides, then a resize to 1080×1920 produced the story frame. At 85% the JPEG was about 260KB; at 80% it was about 190KB. The caption was placed inside the middle of the frame so the interface overlays did not cover it. The result was checked in the story preview, not only in the desktop image viewer.</p>
<p>These outcomes are examples from specific images. A busy background, skin texture or fine pattern can produce a larger file at the same settings, and Instagram's own re-encoding will change the bytes again after upload.</p>

<h2 id="quality-check">Format, quality and the final preview</h2>
<p>Use JPEG for photographs and PNG for graphics with sharp text if the resulting file is reasonable. Instagram re-encodes uploads, so a PNG does not stay lossless after posting, and a very large master does not guarantee a better final render. Export in sRGB; CMYK files can shift colour. The format converter here supports JPEG, PNG and WebP, but WebP upload support is not universal across every posting path, so JPEG or PNG is the safer choice for Instagram. iPhone HEIC files often need to be exported to JPEG before a browser tool can open them.</p>
<p>Before posting, check every placement that matters: the feed crop, the profile grid, the story safe area and the reel cover. The in-app preview is the last honest check because it shows the crop the app will apply. Keep a copy of the pre-upload file so you can re-export from the original if a different placement needs another ratio.</p>
<blockquote class="tip">Instagram can change its interface and crop behaviour without notice. The ratios above are a practical starting point, not a guarantee; always confirm the final framing in the app before publishing.</blockquote>

<div class="cta-box"><strong>Resize before you post:</strong> use the <a href="/image-compressor">image compressor and cropper</a> to make the 1080px frame, then convert to JPEG if needed. Processing is local and nothing is uploaded.</div>
`;

export const imageInstagramResize: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "instagram-image-resize",
  kind: "cluster",
  title: "Instagram Image Size 2026: Resize Without Cropping",
  description:
    "Instagram image sizes for 2026: feed 1080x1350 or 1080x1080, profile 320x320, story and reel 1080x1920, with crop-safe resize steps.",
  keywords: ["instagram image size", "instagram post size 2026", "1080x1350 instagram", "instagram story size", "resize image for instagram without cropping"],
  toolSlugs: ["image-compressor", "image-format-converter"],
  relatedSlugs: ["resize-image-exact-pixels", "png-vs-jpg-vs-webp", "compress-jpg-200kb"],
  published: "2026-10-22",
  updated: "2026-10-22",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "sizes", text: "Instagram image sizes", level: 2 },
    { id: "auto-crop", text: "Why Instagram crops", level: 2 },
    { id: "feed", text: "Feed sizes", level: 2 },
    { id: "profile", text: "Profile photo", level: 2 },
    { id: "story", text: "Story and reel", level: 2 },
    { id: "worked-examples", text: "Worked examples", level: 2 },
    { id: "quality-check", text: "Quality and preview", level: 2 },
  ],
  html,
  faqs: [
    { question: "What is the best Instagram feed size in 2026?", answer: "Use 1080×1350 for a 4:5 portrait or 1080×1080 for a square. Portrait uses more vertical space in the feed, while square keeps a consistent grid. A 1080×566 landscape is the widest supported ratio. Choose based on the source composition, then crop before resizing." },
    { question: "Why does Instagram crop my photo even when I resize it?", answer: "Resizing changes pixels, not the aspect ratio. If the file's shape does not match the slot, the app trims the extra edges. Crop to 4:5, 1:1 or 9:16 first, then resize to the matching pixels. The in-app preview is the best way to confirm the final framing." },
    { question: "What size should a profile picture be?", answer: "Export 320×320 at 1:1. Instagram displays the image in a circle, so the square's corners never appear. Keep the logo or face centred with a margin, use large lettering and avoid fine text. Check the circular preview in the app because a mark that looks fine as a square can lose its edges." },
    { question: "Are stories and reels both 1080×1920?", answer: "Both use a 9:16 canvas at 1080×1920, but the interfaces differ. Keep text and faces away from the top and bottom, where controls and captions sit. A reel cover also appears in the profile grid, where it is cropped again, so keep the important part of the cover near the centre." },
    { question: "Will resizing to 1080×1080 stretch my photo?", answer: "Only if you unlock the aspect ratio and force both dimensions. A 3:2 or 4:3 photo must be cropped to a square first, then resized. Stretching widens faces and is obvious in a feed. Crop, resize, then compress; do not reverse the order." },
    { question: "Does Instagram remove EXIF data?", answer: "Instagram generally strips metadata on upload, but do not rely on that as your only privacy step. The same file may be posted elsewhere or sent directly. Strip location data before sharing if the photo was taken at home or a private location, and keep an untouched original archived separately." },
  ],
};
