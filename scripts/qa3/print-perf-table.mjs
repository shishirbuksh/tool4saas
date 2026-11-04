import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("scripts/qa3/performance-results.json", "utf8"));
console.log("| Page | Device | LCP (ms) | FCP (ms) | CLS | DOMContentLoaded (ms) | Load Time (ms) | JS (KB) | Total (KB) | LCP Element |");
console.log("| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |");
for (const item of data) {
  const m = item.median;
  const el = (m.lcpElement || "").replace(/\|/g, "\\|").slice(0, 45);
  console.log(`| ${item.page} | ${item.device} | ${m.lcp} | ${m.fcp} | ${m.cls} | ${m.domContentLoaded} | ${m.loadTime} | ${m.jsTransferKB} | ${m.totalTransferKB} | \`${el}\` |`);
}
