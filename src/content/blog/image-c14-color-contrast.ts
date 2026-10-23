import type { BlogPost } from "@/lib/blog";
import { readingMinutesFor } from "@/lib/blog";

const html = `
<p>Contrast is not a matter of taste. WCAG compares the relative luminance of text and background, then expresses the result as a ratio from 1:1 to 21:1. A ratio of 1:1 means no difference; 21:1 is black on white. The <a href="/color-contrast">color contrast checker</a> accepts two hex colors, shows the ratio and reports three pass or fail badges. It is a quick check for a color pair, not a complete accessibility audit.</p>
<p>Part of the <a href="/blog/image-compressor-guide">image and design guide</a>. The tool checks text contrast only. It does not inspect icons, focus rings, charts, disabled controls or text placed over a photograph. Those need separate checks.</p>

<h2 id="math">How the ratio is calculated</h2>
<p>Each color is converted from hex to red, green and blue values. Every channel is divided by 255, linearized with a gamma correction, and combined into a relative luminance using the coefficients 0.2126, 0.7152 and 0.0722. The lighter luminance and the darker luminance are then inserted into <code>(L1 + 0.05) / (L2 + 0.05)</code>. The order of the two colors does not matter because the formula always puts the lighter value on top.</p>
<table>
<thead><tr><th>Text</th><th>Background</th><th>Ratio</th><th>What it means</th></tr></thead>
<tbody>
<tr><td>#1a1a1a</td><td>#ffffff</td><td>17.40:1</td><td>Passes AAA for normal text</td></tr>
<tr><td>#595959</td><td>#ffffff</td><td>7.00:1</td><td>Meets the AAA normal-text threshold exactly</td></tr>
<tr><td>#767676</td><td>#ffffff</td><td>4.54:1</td><td>Passes AA normal text, fails AAA normal text</td></tr>
<tr><td>#999999</td><td>#ffffff</td><td>2.85:1</td><td>Fails AA normal text and AA large text</td></tr>
<tr><td>#ff5733</td><td>#ffffff</td><td>3.15:1</td><td>Passes AA large only, not AA normal</td></tr>
<tr><td>#c2410c</td><td>#ffffff</td><td>5.18:1</td><td>Passes AA normal text</td></tr>
<tr><td>#14b8a6</td><td>#ffffff</td><td>2.49:1</td><td>Fails all three badges</td></tr>
<tr><td>#0f766e</td><td>#ffffff</td><td>5.47:1</td><td>Passes AA normal text</td></tr>
<tr><td>#1e3a5f</td><td>#f8fafc</td><td>10.99:1</td><td>Strong contrast without pure black or white</td></tr>
<tr><td>#334155</td><td>#f8fafc</td><td>9.90:1</td><td>Passes AAA for normal text</td></tr>
</tbody>
</table>
<p>The exact numbers matter at the boundaries. A ratio of 4.50 passes AA normal text, while 4.49 does not. The page displays two decimal places but compares the unrounded ratio, so rounding can hide a value just below a threshold. A displayed 4.50 is close enough that you should darken or lighten the pair slightly instead of relying on the display.</p>
<p>The calculation assumes opaque colors. A hex value has no alpha channel, so a translucent overlay must be composited against its real background before it is checked. A 50 percent black overlay on white is not the same as #808080 in every rendering context; compute the resulting solid color first, then enter that color here.</p>

<h2 id="thresholds">The three badges and the missing fourth check</h2>
<p>WCAG sets different thresholds for different text sizes and levels:</p>
<table>
<thead><tr><th>Level</th><th>Normal text</th><th>Large text</th></tr></thead>
<tbody>
<tr><td>AA</td><td>4.5:1</td><td>3:1</td></tr>
<tr><td>AAA</td><td>7:1</td><td>4.5:1</td></tr>
</tbody>
</table>
<p>The tool shows AA normal at 4.5, AA large at 3 and AAA normal at 7. It does not show a separate AAA large badge. That is a real limitation, not a claim that AAA large does not exist. If you need AAA for large text, compare the ratio manually against 4.5.</p>
<p>Large text is generally at least 18 point regular or 14 point bold, which is about 24 pixels regular or 18.66 pixels bold. The tool does not know the font size, so the AA large badge is only a hint until you confirm the rendered size. A 16-pixel paragraph does not become large text because the badge says AA large passes.</p>
<p>The threshold also depends on what is being tested. Normal body copy needs the full 4.5 ratio at AA. Icons, borders and focus indicators are non-text elements with a different requirement, and the checker does not evaluate them. Placeholder text, error messages and link text inside a paragraph are text, so check them with their actual colors rather than assuming the surrounding body style covers them.</p>

<h2 id="read">Reading a failed result</h2>
<p>Start with the contrast ratio and identify which badge fails. A 3.15 ratio passes AA large but fails AA normal. That might be acceptable for a 24-pixel headline and unacceptable for a 16-pixel paragraph. The same color pair can be right for one role and wrong for another.</p>
<p>Do not automatically jump to pure black or pure white. The navy and off-white pair at 10.99:1 is easier on the eyes than 21:1 and still clears AAA for normal text. A gray such as #767676 is a common compromise at 4.54:1: it passes AA normal but fails AAA. A darker gray such as #595959 reaches 7.00:1 and clears AAA normal, but it may look heavier in a minimal interface.</p>
<p>For a brand color, change lightness before changing hue. Orange #ff5733 fails AA normal at 3.15:1, while a darker burnt orange such as #c2410c reaches 5.18:1 and passes. Teal #14b8a6 fails all three badges, while #0f766e reaches 5.47:1. The darker versions keep the hue family and give the text enough separation from white.</p>
<p>Test the actual pair, not the intended pair. A button may have a gradient, a hover overlay or a semi-transparent border that changes the effective background. A card may sit on an image. If the text lands on a photograph, sample the lightest and darkest areas or add a solid scrim; the checker can only evaluate two solid colors.</p>

<h2 id="workflow">A short contrast workflow</h2>
<ol>
<li>Enter the actual text color and background color as three- or six-digit hex values.</li>
<li>Read the ratio and the three badges. Ignore the AA large badge until you know the rendered font size and weight.</li>
<li>Identify the target: AA normal for body copy, AA large for confirmed large text, AAA normal for stricter body copy.</li>
<li>Adjust one color at a time, usually by darkening the text or lightening the background, and recheck.</li>
<li>Test hover, focus, visited, disabled and dark-mode variants separately.</li>
<li>Check icons, borders and focus rings with a non-text contrast review after the text pair passes.</li>
</ol>
<p>A useful habit is to record the ratio beside the design token. For example, body text on a page background might be 14.48:1, while secondary text on the same background might be 7.00:1. Naming the pair and its ratio makes later changes easier to review than a screenshot alone.</p>

<h2 id="limits">What the checker cannot tell you</h2>
<p>It does not simulate color vision deficiency, measure perceived readability, inspect font weight or evaluate text over images. It does not save a palette, export a report or pick a color from the screen. The three-digit shorthand is expanded to six digits, so #fff and #ffffff produce the same result. Invalid hex input produces no numeric ratio and the preview falls back to a safe color.</p>
<p>Passing a ratio is necessary but not sufficient. A page can meet contrast thresholds and still be hard to read because of tiny type, tight spacing, long lines, motion or poor focus states. Use the checker as one gate in a broader accessibility review, not as a substitute for testing with real content and assistive technology.</p>
<div class="cta-box"><strong>Check a pair now:</strong> open the <a href="/color-contrast">WCAG contrast checker</a>, enter the text and background hex values, and confirm the intended text size before accepting a badge. Use the <a href="/color-converter">color converter</a> when you need HEX, RGB or HSL values.</div>
`;

export const wcagContrast: BlogPost = {
  pillar: "image-compressor-guide",
  slug: "wcag-contrast-check",
  kind: "cluster",
  title: "WCAG Contrast Checker: Pass AA and AAA",
  description:
    "Check a text and background pair against WCAG AA and AAA contrast thresholds, read the ratio correctly, and see which checks the tool cannot perform.",
  keywords: ["wcag contrast checker", "color contrast ratio", "accessibility contrast", "aa contrast", "aaa contrast", "text contrast"],
  toolSlugs: ["color-contrast"],
  relatedSlugs: ["image-seo-size-alt", "png-to-webp-transparency", "resize-image-exact-pixels"],
  published: "2026-10-23",
  updated: "2026-10-23",
  readingMinutes: readingMinutesFor(html),
  toc: [
    { id: "math", text: "How the ratio is calculated", level: 2 },
    { id: "thresholds", text: "The three badges", level: 2 },
    { id: "read", text: "Reading a failed result", level: 2 },
    { id: "workflow", text: "A short contrast workflow", level: 2 },
    { id: "limits", text: "What the checker cannot tell you", level: 2 },
  ],
  html,
  faqs: [
    { question: "Does the tool check AAA for large text?", answer: "No. It shows AA normal, AA large and AAA normal. AAA large requires 4.5:1, so compare the displayed ratio against 4.5 manually if that is your target." },
    { question: "Does color order matter?", answer: "No. The formula always uses the lighter luminance first, so swapping text and background produces the same ratio." },
    { question: "Can it check transparent colors?", answer: "No. Only three- and six-digit hex values are accepted. Composite transparency against the final background first, then enter the resulting solid color." },
    { question: "Does it check text over an image?", answer: "No. It evaluates two solid colors. For text over a photo or gradient, test the lightest and darkest effective background areas or add a solid scrim and check that color." },
    { question: "Is passing AA enough for accessibility?", answer: "No. Contrast is one requirement. Font size, spacing, focus visibility, motion, semantics and assistive-technology behavior still need separate review." },
  ],
};
