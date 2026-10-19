#!/usr/bin/env node
// One-off: replace canned privacy-FAQ template answers in text-documents.ts
// with natural, per-tool answers. Uses split/join (no regex) for exact matches.
import fs from "fs";

const FILE = path_sep_fix();
function path_sep_fix() {
  return "src/lib/tools/data/text-documents.ts";
}

const PAIRS = [
  // case-converter
  ['"question":"Is my pasted text uploaded to a server?","answer":"No. Conversion executes entirely inside your browser tab through local scripting. Your content stays on this device. Nothing transmits outward, accounts remain unnecessary, activity continues after initial load and closing tabs discards drafts instantly for confidential manuscripts and proprietary codebases securely."',
   '"question":"Is my text uploaded to a server?","answer":"No. All conversion runs locally in your browser, so your text never leaves this device; paste confidential drafts freely because nothing is stored once you close the page."'],
  // text-diff
  ['"question":"Is my text stored?","answer":"No. Collation executes entirely inside your browser tab with nothing sent to any server, so manuscripts never depart outward. Diff two 500KB configurations after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my text stored?","answer":"No. The comparison happens entirely in your browser: both drafts stay on your machine, are never uploaded, and are discarded as soon as you close the page."'],
  // text-list
  ['"question":"Is my data uploaded?","answer":"No. Line manipulations execute entirely in your browser tab, with nothing sent to a server. Process 520 rows condensing to 480 unique after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my data uploaded?","answer":"No. Sorting, deduplication and shuffling run entirely in your browser; your list stays on your device and nothing is kept once the tab closes."'],
  // text-find-replace
  ['"question":"Is my text uploaded?","answer":"No. Search and substitution execute entirely in your browser tab, with nothing sent to a server. Transform colour to color across 5,000 words after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my text uploaded?","answer":"No. Matching and replacing happen entirely in your browser. The text is never transmitted anywhere and disappears when you close the tab."'],
  // text-reverser
  ['"question":"Is my text uploaded?","answer":"No. Reversal executes entirely in your browser tab, with nothing sent to a server. Flip hello world to world hello after initial load with no account. 500-word logs clear on close while outputs remain ready today."',
   '"question":"Is my text uploaded?","answer":"No. Reversal runs locally in your browser, so text you paste never leaves your device and is not stored once the page closes."'],
  // keyword-density
  ['"question":"Is my article uploaded?","answer":"No. Frequency calculations execute entirely in your browser tab, with nothing sent to a server. Analyze 1,000 words with solar panels after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my article uploaded?","answer":"No. Frequency counting runs entirely in your browser. Your article is never uploaded anywhere, and the analysis disappears when you close the page."'],
  // text-to-speech
  ['"question":"Is anything uploaded?","answer":"No. Utterances synthesize locally through device speech engines with nothing sent to any server. Trial 300 words at 1x then 0.8x after initial load with no account. Closing the tab clears your input."',
   '"question":"Is anything uploaded?","answer":"No. Speech is generated locally by your device\'s own voice engine. Your text is not uploaded anywhere, and playback simply stops when you close the tab."'],
  // email-extractor
  ['"question":"Is my text uploaded?","answer":"No. Pattern scanning executes entirely in your browser tab, with nothing sent to a server. Parse 200 addresses from 500KB exports after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my text uploaded?","answer":"No. Extraction and deduplication happen entirely in your browser. Emails are sensitive, and the parsed list never leaves your device; it is not stored once the tab closes."'],
  // markdown-editor
  ['"question":"Is my text stored?","answer":"No. Composition $1 entirely inside browser memory without server retention for privacy. Draft hash Title and pipe tables after initial load with no account, previewing split-pane instantly. Closing the tab clears your input."',
   '"question":"Is my text stored?","answer":"No. Everything happens in your browser: the Markdown you draft, the tables you build, and the HTML you export stay on your machine, and nothing remains after the page closes."'],
  // text-cleaner
  ['"question":"Is my text uploaded when I use this Text Cleaner?","answer":"No. Scrubbing executes entirely in your browser tab, with nothing sent to a server. Clean John and tab and double-space Doe after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my text uploaded when I use this Text Cleaner?","answer":"No. Cleaning runs entirely in your browser: the text you paste is never uploaded, and nothing persists after the page closes."'],
  // readability
  ['"question":"Is my draft uploaded?","answer":"No. Readability computations execute entirely in your browser tab, with nothing sent to a server. Assess 450-word drafts with 30 sentences after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my draft uploaded?","answer":"No. The readability analysis runs locally in your browser. Nothing is uploaded or shared, and your draft is discarded when you close the tab."'],
  // text-summarizer
  ['"question":"Is my article uploaded when I use this Text Summarizer?","answer":"No. Sentence valuation executes entirely in your browser tab, with nothing sent to a server. Condense 2,000-word guides at 25 percent after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my article uploaded when I use this Text Summarizer?","answer":"No. Summarizing happens entirely in your browser. Your document never leaves your device and is not stored after you finish reading the result."'],
  // grammar-checker
  ['"question":"Is my draft uploaded when I use this Grammar Checker?","answer":"No. Pattern inspections execute entirely in your browser tab, with nothing sent to a server. Review 600-word essays with teh to the after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my draft uploaded when I use this Grammar Checker?","answer":"No. The check runs locally in your browser, so the essay never leaves your device and nothing is saved once you leave the page."'],
  // ai-detector
  ['"question":"Is my draft uploaded when I use this AI Detector?","answer":"No. Burstiness and variance computations execute entirely in your browser tab, with nothing sent to a server. Screen 400-word essays with uniform sentences after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my draft uploaded when I use this AI Detector?","answer":"No. The sentence-variation analysis runs entirely in your browser. Your writing is never uploaded, and no trace of it remains after you close the tab."'],
  // plagiarism-checker
  ['"question":"Is my text uploaded when I use this Plagiarism Checker?","answer":"No. Five-gram sliding analysis executes entirely in your browser tab, with nothing sent to a server. Assess 800-word posts scoring 96 percent after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my text uploaded when I use this Plagiarism Checker?","answer":"No. The similarity comparison happens entirely in your browser, only against the reference text you load on the page. Your article is never sent to a server."'],
  // typing-speed
  ['"question":"Is my keystrokes uploaded when I use this Typing Speed Test?","answer":"No. Sixty-second timing, WPM arithmetic and history persist entirely in your browser tab, with nothing sent to a server. Achieve 62 WPM at 97 percent after initial load with no account. Inputs is cleared when you close the tab on reset while summaries remain viewable today."',
   '"question":"Are my keystrokes uploaded?","answer":"No. The timer, WPM math and history live only in your browser. Your keystrokes are never uploaded, and you can clear everything with the reset button or by closing the tab."'],
  // fancy-text
  ['"question":"Is my text uploaded when I use this Fancy Text Generator?","answer":"No. Glyph mapping executes entirely in your browser tab, with nothing sent to a server. Preview Sale in bold and bubble after initial load with no account. Closing the tab clears your input."',
   '"question":"Is my text uploaded when I use this Fancy Text Generator?","answer":"No. The Unicode mapping happens in your browser. Your text stays on this device, even with no connection, and nothing is saved once you leave the page."'],
];

let content = fs.readFileSync(FILE, "utf8");
let hits = 0;
let misses = 0;
for (const [oldS, newS] of PAIRS) {
  if (content.includes(oldS)) {
    content = content.split(oldS).join(newS);
    hits++;
  } else {
    misses++;
    console.log("MISS: " + oldS.slice(0, 110));
  }
}
fs.writeFileSync(FILE, content);
console.log(`de-spin-faqs: ${hits} replaced, ${misses} missed`);
