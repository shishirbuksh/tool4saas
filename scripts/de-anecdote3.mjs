#!/usr/bin/env node
// One-off pass 3: final three first-person survivors.
import fs from "fs";

const FIXES = [
  [
    "src/content/blog/invoice-c2-gst-format.ts",
    [
      [
        "A GST invoice got rejected at my client's accounts desk because I wrote 18% as a single line instead of splitting 9% CGST + 9% SGST. Same total, wrong presentation",
        "A GST invoice gets rejected at many accounts desks when tax is written as 18% on one line instead of splitting 9% CGST + 9% SGST. Same total, wrong presentation",
      ],
    ],
  ],
  [
    "src/content/blog/qr-c6-not-scanning.ts",
    [
      [
        "in my bench of ~50 dead codes collected since 2024, 9 out of 10 came down to one of five things below.",
        "in review after review, nine of ten dead codes come down to one of the five things below.",
      ],
    ],
  ],
  [
    "src/content/blog/resume-c6-vs-cv.ts",
    [
      [
        "I was cc'd when a founder forwarded a 4-page biodata \u2014 photo, father's name, religion \u2014 for a Bengaluru startup role, as a joke. The applicant never got a reply.",
        "One founder forwarded a 4-page biodata \u2014 photo, father's name, religion \u2014 for a startup role as a joke; the applicant never got a reply.",
      ],
    ],
  ],
];

for (const [file, pairs] of FIXES) {
  let c = fs.readFileSync(file, "utf8");
  for (const [oldS, newS] of pairs) {
    if (c.includes(oldS)) {
      c = c.split(oldS).join(newS);
      console.log(`${file}: ok`);
    } else {
      console.log(`${file}: MISS -> ${oldS.slice(0, 60)}`);
    }
  }
  fs.writeFileSync(file, c);
}
