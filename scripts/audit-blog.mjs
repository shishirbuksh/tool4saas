import fs from "fs";
import path from "path";

const DIR = path.resolve("src/content/blog");
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".ts"));

console.log(`Auditing ${files.length} blog post files on disk...`);

const stats = {
  totalFiles: files.length,
  pillars: 0,
  clusters: 0,
  wordCounts: [],
  shortWordCount: [],
  missingH2Id: [],
  h1Found: [],
  invalidDates: [],
  invalidDescriptions: [],
  faqCounts: [],
  lowFaqs: [],
  tocMismatches: [],
  linksIssues: [],
  machineSpin: [],
  invisibleWatermarks: [],
};

const invisibleRegex = /[\u200B\u200C\u200D\uFEFF]/;

for (const file of files) {
  const content = fs.readFileSync(path.join(DIR, file), "utf8");

  // Determine kind
  const isPillar = file.endsWith("-pillar.ts") || /kind:\s*["']pillar["']/.test(content);
  if (isPillar) stats.pillars++;
  else stats.clusters++;

  // Word count heuristic from HTML
  const htmlMatch = content.match(/const html = `([\s\S]*?)`;/);
  if (htmlMatch) {
    const rawHtml = htmlMatch[1];
    const text = rawHtml
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
    const wordCount = text ? text.split(" ").length : 0;
    stats.wordCounts.push({ file, words: wordCount, isPillar });
    if (wordCount < 400) {
      stats.shortWordCount.push({ file, words: wordCount });
    }

    // Check H1 inside html
    if (/<h1[\s>]/i.test(rawHtml)) {
      stats.h1Found.push(file);
    }

    // Check H2 without ID
    const h2s = [...rawHtml.matchAll(/<h2([^>]*)>/gi)];
    for (const h2 of h2s) {
      if (!/id=["'][^"']+["']/i.test(h2[1])) {
        stats.missingH2Id.push({ file, tag: h2[0] });
      }
    }
  }

  // Dates
  const pub = content.match(/published:\s*["']([^"']+)["']/);
  const upd = content.match(/updated:\s*["']([^"']+)["']/);
  if (!pub || !upd || !/^\d{4}-\d{2}-\d{2}$/.test(pub[1]) || !/^\d{4}-\d{2}-\d{2}$/.test(upd[1])) {
    stats.invalidDates.push({ file, pub: pub?.[1], upd: upd?.[1] });
  }

  // Description
  const desc = content.match(/description:\s*\n?\s*["']([\s\S]*?)["'],/);
  if (!desc || desc[1].length < 40 || desc[1].length > 200) {
    stats.invalidDescriptions.push({ file, len: desc ? desc[1].length : 0 });
  }

  // FAQs
  const faqsMatch = content.match(/faqs:\s*\[([\s\S]*?)\]\s*(?:,\s*};|};)/);
  if (faqsMatch) {
    const faqBlocks = faqsMatch[1].match(/\{\s*question:/g) || [];
    stats.faqCounts.push(faqBlocks.length);
    if (faqBlocks.length < 3) {
      stats.lowFaqs.push({ file, count: faqBlocks.length });
    }
  }

  // Machine spin / canned phrasing
  if (/\bsans\b/i.test(content)) stats.machineSpin.push({ file, word: "sans" });
  if (/\bwholly\b/i.test(content)) stats.machineSpin.push({ file, word: "wholly" });
  if (/\bevaporate?s? (?:on|upon) close\b/i.test(content)) stats.machineSpin.push({ file, word: "evaporate on close" });
  if (/entirely entirely/i.test(content)) stats.machineSpin.push({ file, word: "entirely entirely" });
  if (/ inside your browser tab/i.test(content)) stats.machineSpin.push({ file, word: "inside your browser tab" });

  // Invisible watermarks
  if (invisibleRegex.test(content)) {
    stats.invisibleWatermarks.push(file);
  }
}

// Word count summary
const sortedWords = [...stats.wordCounts].sort((a, b) => a.words - b.words);
const minWords = sortedWords[0];
const maxWords = sortedWords[sortedWords.length - 1];
const avgWords = Math.round(stats.wordCounts.reduce((acc, c) => acc + c.words, 0) / stats.wordCounts.length);

console.log("\n================ BLOG AUDIT RESULTS ================");
console.log(`Total Posts: ${stats.totalFiles} (${stats.pillars} pillars, ${stats.clusters} clusters)`);
console.log(`Word Count: Min = ${minWords.words} (${minWords.file}), Max = ${maxWords.words} (${maxWords.file}), Average = ${avgWords} words/post`);
console.log(`Posts < 400 words: ${stats.shortWordCount.length}`);
if (stats.shortWordCount.length) {
  console.log("  Details:", stats.shortWordCount);
}
console.log(`H1 inside body: ${stats.h1Found.length}`);
console.log(`Missing H2 ID: ${stats.missingH2Id.length}`);
console.log(`Invalid dates: ${stats.invalidDates.length}`);
console.log(`Description length issues (<40 or >200 chars): ${stats.invalidDescriptions.length}`);
if (stats.invalidDescriptions.length) {
  console.log("  Details:", stats.invalidDescriptions);
}
console.log(`Posts with <3 FAQs: ${stats.lowFaqs.length}`);
console.log(`Machine spin occurrences: ${stats.machineSpin.length}`);
console.log(`Invisible Unicode watermarks: ${stats.invisibleWatermarks.length}`);
console.log("===================================================\n");
