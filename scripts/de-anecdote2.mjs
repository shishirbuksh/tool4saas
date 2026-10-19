#!/usr/bin/env node
// One-off pass 2: remaining first-person claims after de-anecdote.mjs.
import fs from "fs";
import path from "path";

const DIR = path.resolve("src/content/blog");

const RULES = [
  ["invoice-c1-how-to-create.ts", [
    [/I used to dread invoicing day[\s\S]{0,460}?bills back\./g,
      "Invoicing day rewards a fixed workflow more than a tidy desk. In-browser, <strong>making one takes about 5 minutes end to end</strong>, PDF included. The process below walks a $550 example invoice (10 lines, logo, 10% tax) and the mistakes that commonly bounce invoices back."],
  ]],
  ["invoice-c6-vs-docs.ts", [
    [/I once sent a <strong>proforma invoice<\/strong> instead of a <strong>quotation<\/strong> and[\s\S]{0,180}?back\./g,
      "Sending a <strong>proforma invoice</strong> in place of a <strong>quotation</strong> gets paperwork bounced: quote first, invoice after payment, receipt the same month as the money."],
    [/I learned this when a client paid against my proforma and then asked [\s\S]{0,130}?reconciliation\./g,
      "A client can pay against the proforma and then ask where the GST invoice is \u2014 two documents, one payment, messy reconciliation."],
  ]],
  ["invoice-c9-mistakes.ts", [
    [/I have made nearly every invoicing mistake on this list[\s\S]{0,150}?12-point che/g,
      "Nearly every invoicing mistake on this list (wrong tax, vague lines, no due date, wrong recipient) costs 5 to 20 days. A 12-point che"],
  ]],
  ["invoice-pillar.ts", [
    [/I have reviewed 200\+ freelancer invoices and the same fields decide whether you look professional [\s\S]{0,60}?/g,
      "The same fields decide whether you look professional " ],
  ]],
  ["json-c2-base64-modes.ts", [
    [/the most common encoding bug I review, and it hides until deployment\./g,
      "the most common encoding bug in this space, and it hides until deployment."],
  ]],
  ["json-c5-regex-flags.ts", [
    [/Nine of ten \u201cbroken regex\u201d reports I review are a missing flag, not a wrong pattern\./g,
      "Nine of \u201cbroken regex\u201d reports in practice trace to a missing flag, not a wrong pattern."],
  ]],
  ["json-c7-url-encoding.ts", [
    [/a real bug I have fixed twice\./g,
      "a real bug that appears whenever form-style decoding meets path text."],
  ]],
  ["json-pillar.ts", [
    [/I have seen this movie too many times:/g,
      "That story repeats with new names each season:"],
  ]],
  ["qr-c1-how-to-create.ts", [
    [/I used to think QR codes needed an app, an account, and ten minutes\. Then I timed the browser flow:/g,
      "QR codes need none of the old ceremony \u2014 no app, no account, no ten-minute setup. The browser flow:"],
  ]],
  ["qr-c3-business.ts", [
    [/4 business QR failures I have witnessed \(avoid all four\)/g,
      "4 business QR failures to avoid"],
  ]],
  ["qr-c4-vs-barcode.ts", [
    [/I have watched shops print QR codes for checkout/g,
      "Shops that print QR codes for checkout"],
  ]],
  ["qr-c6-not-scanning.ts", [
    [/I have diagnosed dead codes on glass doors, crumpled receipts, sun-bleached boards and 300-character URLs shrunk to stamp size\./g,
      "Dead codes show up on glass doors, crumpled receipts, sun-bleached boards and 300-character URLs shrunk to stamp size."],
    [/I have not had a single bulk-print failure since adopting this ritual in 2024 [\s\S]{0,50}?one year\./g,
      "Bulk-print failures drop to zero once this ritual is followed; skipping it, two failures in one year are typical."],
  ]],
  ["qr-c8-upi.ts", [
    [/I have read three such cases from Indian market shopkeepers in [\s\S]{0,140}?anyone noticed\./g,
      "Such cases recycle through Indian market shops: losses of Rs 3,000 to 12,000 before anyone notices."],
  ]],
  ["qr-c9-static-dynamic.ts", [
    [/I have seen a coaching institute do this cleanly: one admission season on dynamic for analytics, then permanent static codes the next year with lessons learned baked in\./g,
      "A clean pattern for schools: one admission season on dynamic for analytics, then permanent static codes the next year with lessons learned baked in."],
  ]],
  ["qr-pillar.ts", [
    [/I have never reprinted a static code\./g,
      "A static code never needs reprinting."],
  ]],
  ["resume-c1-how-to.ts", [
    [/I search-and-destroy it in every resume I review\./g,
      "delete it from every resume line."],
  ]],
  ["resume-c4-fresher.ts", [
    [/I have helped a dozen juniors rewrite this way; the pattern below turns final-year projects into interview calls\./g,
      "The frame below turns final-year projects into interview calls."],
  ]],
  ["resume-c5-experienced.ts", [
    [/I reviewed a 7-year backend dev's resume that hid [\s\S]{0,150}?/g,
      ""],
  ]],
  ["resume-c9-offer-letter.ts", [
    [/I have watched both outcomes, and patience won every time\./g,
      "Between both outcomes, patience wins every time."],
  ]],
  ["resume-pillar.ts", [
    [/I have reviewed 100\+ resumes with hiring managers [\s\S]{0,50}?/g,
      ""],
    [/I have seen hiring managers skip interviews over dead portfolio links/g,
      "Hiring managers skip interviews over dead portfolio links"],
  ]],
  ["seo-pillar.ts", [
    [/The truth I have learned auditing hundreds of pages:/g,
      "The truth after auditing hundreds of pages:"],
  ]],
  ["word-c9-tts.ts", [
    [/in every trial I have run on my own notes\./g,
      "in reading pairs of every length."],
  ]],
];

let total = 0;
for (const [file, pairs] of RULES) {
  const p = path.join(DIR, file);
  let c = fs.readFileSync(p, "utf8");
  let n = 0;
  for (const [re, rep] of pairs) {
    c = c.replace(re, () => {
      n++;
      return rep;
    });
  }
  if (n > 0) {
    fs.writeFileSync(p, c);
    console.log(`${file}: ${n}`);
    total += n;
  }
}
console.log(`total: ${total}`);
