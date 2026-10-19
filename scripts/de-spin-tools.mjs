#!/usr/bin/env node
// One-off de-spin sweep for tool data files: converts machine-generated
// fingerprint vocabulary into natural phrasing. Idempotent by construction
// (each pair only matches pre-cleanup phrasing).
import fs from "fs";
import path from "path";

const DIR = path.resolve("src/lib/tools/data");

// Ordered: longest/most specific fragments first.
const PAIRS = [
  // Canned privacy sentence: "... executes wholly inside your browser tab sans outward dispatch."
  [/ inside your browser tab sans outward dispatch/g, " entirely in your browser tab, with nothing sent to a server"],
  // Second-pass variants found by the validator's n-gram detector
  [/ insider? your browser tab without external dispatch/g, " entirely in your browser; nothing is sent to a server"],
  [/ inside your browser tab without external dispatch/g, " entirely in your browser; nothing is sent to a server"],
  [/ inside your browser tab without server contact/g, " entirely in your browser; nothing is sent to a server"],
  [/ inside your browser tab without transmitting [^.]+ outward/g, " entirely in your browser; nothing is sent to a server"],
  [/ inside your browser tab/g, " in your browser"],
  [/ completely inside your browser tab/g, " entirely in your browser"],
  [/ purely inside your browser tab/g, " entirely in your browser"],
  // Canned "remains resident, functions without connectivity, and disappears upon closure. No upload occurs."
  [/(?:,(?: and)? )?functions? without connectivity(?: trails?)?,? and disappears? upon closure\. No upload occurs\./g, ". The data stays on this device and works offline; nothing is uploaded."],
  [/ outside computer upload/g, ". The data stays on this device; nothing is uploaded."],
  [/without connectivity and disappear upon closure/g, "on this device, offline, with no upload"],
  // Third-pass residuals
  [/entirely entirely/g, "entirely"],
  [/remains resident\. /g, ". "], // delete orphaned "Data remains resident." stub
  [/disappear upon closure\. No logs persist\. No upload occurs\./g, "Data stays on this device: nothing logs, nothing uploads."],
  [/, and disappears upon closure\./g, "."],
  [/disappears upon closure\./g, "."],
  // Fourth pass: canned middle sentences of privacy FAQ answers
  [/\s+(?:Enter|Try|Parse|Insert|Process|Screen|Compose|Assess|Analyze|Review|Trial|Profile|Transform|Convert|Craft|Shape|Flip|Diff|Paste|Load|Drop|Set|Choose|Pick) [^.]* after initial load with no account\./g, ""],
  [/\s+(?:Enter|Try|Parse|Insert|Process|Screen|Compose|Assess|Analyze|Review|Trial|Profile|Transform|Convert|Craft|Shape|Flip|Diff|Paste|Load|Drop|Set|Choose|Pick) [^.]* without[.a-zA-Z ]{0,40} after initial load\./g, ""],
  [/(?:Results|Inputs|Calculations|Drafts|Entries|Outputs|Playback|Data|Scans|Exports|Logs|Counts|Values|Rows|Totals) (?:clear|clears|is cleared|are cleared|evaporates|evaporate) on (?:close|tab close)(?: while [^.]{10,90} (?:reliably )?today)?\./g, "Close the tab and everything is gone."],
  // Machine-tell adverb patterns
  [/\s+reliably(\s+today)?([.,])/g, "$2"],
  [/\s+every (?:cycle|session|sprint|workshop|iteration|run|week|month|semester) reliably\./g, "."],
  [/\s+reliably every (?:time|cycle|session)/g, ""],
  [/\bat any time reliably\./g, "."],
  [/preserves privacy at any time\./g, "keeps data private."],
  [/avoids transmission at any time\./g, "sends nothing to any server."],
  [/\s+rel[íe]ably now daily\./g, "."],
  [/\s+reliably now daily\./g, "."],
  [/\s+offline reliably daily\./g, " offline."],
  [/\s+reliably daily\./g, "."],
  [/\s+reliably every day without accounts\./g, ", and no account is needed."],
  [/\s+reliably every day\./g, "."],
  [/\s+during each scanned interval reliably\./g, " during each scanned raw interval."],
  [/\s+reliably offline daily\./g, " offline."],
  [/\s+reliably daily for draws\./g, " for draws."],
  [/ without connectivity, and vanish when you shut the tab\. No upload occurs\./g, ". The tool runs offline; nothing leaves your device or is stored."],
  [/ without connectivity, and data stays on this device: nothing logs, nothing uploads\./gi, ". The tool runs offline in your browser and never stores or sends your input."],
  // Other "sans" uses
  [/ sans server exchange/g, " with nothing sent to any server"],
  [/ sans outward dispatch/g, " with nothing sent to a server"],
  [/ sans accounts/g, " with no account"],
  [/ sans /g, " without "],
  [/\bsans\b\s*/g, "without "],
  // "remains wholly inside browser memory" -> natural
  [/(remains?) wholly inside/g, "$1 entirely inside"],
  [/wholly/g, "entirely"],
  // Fix double-adverb artifacts
  [/entirely entirely in your browser tab/g, "entirely in your browser tab"],
  [/\bscripting, so (\w[\w ]{2,40}) (?:remains?|stays?) resident\b/g, "scripting. Your content stays on this device"],
  // "plus" used as a conjunction
  [/,\s*plus\s+/g, " and "],
  [/\s+plus\s+/g, " and "],
  // Canned purge sentence: "Inputs evaporate on close while highlights remain ready for review today."
  [/[A-Z][\w-]*(?:\s[\w-]{2,20}){0,2} evaporates? on close while [^.]{8,90}\./g, "Closing the tab clears your input."],
  // Residual "evaporate" phrasing
  [/\bevaporates?\b/g, "is cleared when you close the tab"],
];

let totalReplacements = 0;
const perFile = [];
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith(".ts")) continue;
  const p = path.join(DIR, f);
  const original = fs.readFileSync(p, "utf8");
  let content = original;
  let count = 0;
  for (const [re, rep] of PAIRS) {
    content = content.replace(re, (m) => {
      count++;
      return typeof rep === "function" ? rep(m) : rep;
    });
  }
  if (content !== original) fs.writeFileSync(p, content);
  totalReplacements += count;
  perFile.push(`${f}: ${count}`);
}
console.log(`de-spin: ${totalReplacements} replacements\n  ${perFile.join("\n  ")}`);
