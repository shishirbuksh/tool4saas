#!/usr/bin/env node
// One-off: de-can the privacy sentences MYSELF introduced by global
// replacements earlier. Rotates through distinct natural variants so no
// two tools share identical phrasing.
import fs from "fs";
import path from "path";

const DIR = path.resolve("src/lib/tools/data");

const A = [
  "Nothing is stored or sent anywhere; close the tab and everything is gone.",
  "Your input never leaves this device, even with no connection.",
  "Everything runs on your machine and nothing is saved once the page closes.",
  "The data stays local; there is no upload and nothing persists after the tab closes.",
  "All processing is local, so anything typed here is not sent to a server.",
  "Content lives only in this tab; it disappears completely when you close it.",
  "Your work stays on your device, with no uploads and no saved copies.",
  "Nothing is transmitted from your browser, and closing the page clears everything.",
  "The tool is fully client-side; your input is never logged or uploaded.",
  "It works offline in your browser and keeps no record of your entry.",
  "Pasted data is handled in-browser; it is neither stored nor transmitted.",
  "Your session is private: no uploads, no history, nothing left after closing.",
  "Everything happens on your computer, so nothing is uploaded anywhere.",
  "The page keeps no history; your data is gone the moment you close it.",
  "All operations happen locally without accounts or network requests.",
  "Nothing you enter is saved or transmitted; closing the tab wipes it.",
  "Your input is processed in-browser and vanishes as soon as the page closes.",
  "It runs entirely on your device, with no data leaving the browser.",
];
const B = [
  "It runs on your side only: no uploads, no copies, nothing left behind.",
  "Everything is computed in this tab; nothing is sent out in any direction.",
  "The tool works entirely offline in your browser and forgets everything on close.",
  "Your input is processed locally, with no storage and no transmission.",
];

let n = 0;
const nextA = () => A[n++ % A.length];
const nextB = () => B[n++ % B.length];

const RULES = [
  // Hybrid leftover: "... remains resident. The data stays ... uploaded."
  [/remains resident\. The data stays on this device and works offline; nothing is uploaded\./g, () => ". " + nextA()],
  // Family A: ". The data stays on this device and works offline; nothing is uploaded."
  [/\. The data stays on this device and works offline; nothing is uploaded\./g, () => ". " + nextA()],
  // Family B: ". The tool runs offline in your browser and never stores or sends your input."
  [/\. The tool runs offline in your browser and never stores or sends your input\./g, () => ". " + nextB()],
];

let total = 0;
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith(".ts")) continue;
  const p = path.join(DIR, f);
  const original = fs.readFileSync(p, "utf8");
  let content = original;
  let c = 0;
  for (const [re, rep] of RULES) {
    content = content.replace(re, (...args) => {
      c++;
      return rep(args[0]);
    });
  }
  if (content !== original) fs.writeFileSync(p, content);
  total += c;
}
console.log(`privacy-variants: ${total} replacements (variety pool ${A.length})`);
