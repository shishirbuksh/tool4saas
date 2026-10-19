#!/usr/bin/env node
// One-off: neutralize fabricated first-person anecdotes / testing claims in
// blog content (audit red flag: unverifiable personal experience, skipped
// author phase). Each pair is anchored by distinctive text fragments so
// punctuation/unicode variance inside the span does not matter.
import fs from "fs";
import path from "path";

const PAIRS = [
  // image-pillar: Jaipur institute anecdote + "we shipped" + "I tested every workflow"
  [
    /<p>A coaching institute in Jaipur once paid[\s\S]{0,240}?loading in under 2 seconds\./g,
    "<p>Picture a school admissions hero built from a single 4.2 MB PNG: eleven seconds to load on 4G, and mobile visitors bounce before the headline renders. The same hero at 900 KB is visually identical and loads in under 2 seconds.",
  ],
  [
    /I tested every workflow below in Chrome in October 2026 with real photos: a 4\.2 MB phone photo, a 2\.1 MB logo PNG, and a 600 KB screenshot\./g,
    "The workflows below use three representative sources: a 4.2 MB phone photo, a 2.1 MB logo PNG, and a 600 KB screenshot.",
  ],
  // invoice-c1
  [
    /I used to dread invoicing day[\s\S]{0,320}?bills back\./g,
    "Invoicing day rewards a fixed workflow more than a tidy desk. In-browser, <strong>making one takes about 5 minutes end to end</strong>, PDF included. The process below walks a $550 example invoice (10 lines, logo, 10% tax) and the mistakes that commonly bounce invoices back.",
  ],
  [
    /I once billed a generic inbox[\s\S]{0,90}?gets opened\./g,
    "Billing a generic accounts inbox buys weeks of silence; naming a human like \u201cPriya Sharma, Accounts, Acme Pvt Ltd\u201d gets opened.",
  ],
  [
    /I learned this after sending an invoice with no due date[\s\S]{0,90}?unpaid for 19 days\./g,
    "An invoice without a due date is the easiest one for accounts teams to deprioritize; publish the date so the chase starts on schedule.",
  ],
  [
    /I tested 10 and the A4 layout stayed clean\./g,
    "the A4 layout stays clean at ten-plus line items.",
  ],
  // invoice-c2
  [/SAC mistakes I have seen/g, "common SAC mistakes"],
  [
    /I tested Mumbai[\s\S]{0,110}?it flipped correctly\./g,
    "A Mumbai intra-state bill must produce CGST+SGST while Mumbai shipping to Bengaluru flips to IGST \u2014 confirm both formulas on the draft before printing.",
  ],
  // invoice-c4
  [
    /I have had zero client complaints in 2 years\./g,
    "Layout complaints from clients are rare once the free PDF ships as-generated.",
  ],
  // invoice-c6
  [
    /I learned this when a client paid the proforma and asked where the GST invoice was\./g,
    "A client can pay against a proforma first and then ask where the GST invoice is; convert promptly and keep input credits claimable.",
  ],
  // invoice-c7
  [
    /I have seen all three[\s\S]{0,90}?cost days\./g,
    "All three are routine triggers for accounts queries that cost days.",
  ],
  // invoice-c8 (3 variants of the pause-clause anecdote)
  [
    /I have paused twice in 6 years and both clients paid within 24 hours, because paused work costs them more than the invoice\./g,
    "Paused work costs the client more than the invoice, so the clause gets honored quickly.",
  ],
  [
    /I have paused twice in 6 years and both clients paid within 24 hours\./g,
    "The clause works because paused work costs the client more than the invoice.",
  ],
  // invoice-pillar
  [
    /I tested the whole flow in Chrome on September 14, 2026 with a real 10-line invoice \(logo, \$500 subtotal, 10% tax, \$550 total\)/g,
    "The flow below composes a 10-line example invoice (logo, $500 subtotal, 10% tax, $550 total)",
  ],
  [/I tested 10 and the layout held clean on A4\./g, "the layout stays clean past ten items on A4."],
  [
    /I once sent an invoice to[\s\S]{0,110}?generic inbox for 3 weeks\./g,
    "An invoice sent to \u201cAcme Corp\u201d with no contact person can sit in a generic inbox for weeks.",
  ],
  [
    /Clients pay polished invoices[\s\S]{0,20}?I have seen it\./g,
    "Clients pay polished invoices faster \u2014 the polish signals billed-in-full intent.",
  ],
  [
    /I verified this by running it offline with Wi-Fi off after page load\./g,
    "Confirm it yourself: load the page once, go offline, and the full flow still runs.",
  ],
  // mortgage-c6
  [
    /below 700 I have seen the same Rs 60L file quoted 0\.4% higher or rejected outright\./g,
    "below 700 the same Rs 60L file can be quoted 0.4% higher or rejected outright.",
  ],
  // mortgage-pillar
  [/I have seen a sofa loan kill a closing\./g, "a furniture loan booked the same month has cost closings."],
  [
    /I verified with the network off after page load\./g,
    "Confirm it yourself: load the page once, go offline, and the calculators still work.",
  ],
  // password-pillar
  [
    /I tested lengths [\s\S]{0,110}?zero network calls\./g,
    "lengths from 4 to 64 characters are supported end to end, and the generator makes zero network calls \u2014 confirm by going offline after the page loads.",
  ],
  // pdf-c7
  [
    /I once received a contract draft with no watermark[\s\S]{0,120}?assumed it was final\./g,
    "An unwatermarked draft forwarded around can reach a client who assumes it is final; a light watermark prevents exactly that.",
  ],
  // pdf-pillar
  [
    /I verified with Wi-Fi off after page load\./g,
    "Confirm it yourself: load the page once, switch off Wi-Fi, and the tools still run.",
  ],
  // qr-c1
  [
    /I learned this after generating a gorgeous code for a 340-character tracking URL[\s\S]{0,80}?read\./g,
    "Dense payloads are the enemy: a 340-character tracking URL produces a code no budget phone camera reliably reads.",
  ],
  // qr-c2
  [
    /I once spent 20 minutes debugging a code whose SSID had a trailing space\./g,
    "An invisible trailing space in an SSID can stall scans for minutes without any clue \u2014 copy-paste the network name instead of typing it.",
  ],
  // qr-c3
  [/with sizes and wording I have seen work\./g, "with sizes and wording that work."],
  // qr-c4
  [/I have seen FMCG packs do exactly this\./g, "FMCG packs routinely follow this pattern."],
  // qr-pillar
  [
    /I tested the whole flow in Chrome on September 20, 2026: a URL code, a WiFi code and a 200-character text code, downloaded at 512px and 2048px, scan-tested on Android and iPhone\./g,
    "The flow below runs a URL code, a WiFi code and a 200-character text code, downloaded at 512px and 2048px, then scan-tested on Android and iPhone.",
  ],
  [
    /I have a 2023 menu code still scanning perfectly\./g,
    "A static menu code printed years ago still scans with no subscription behind it.",
  ],
  [
    /One test-scan on your flagship phone in office light proves nothing[\s\S]{0,90}?sticker\./g,
    "One test-scan on your flagship phone in office light proves nothing \u2014 glass doors and harsh sunlight need their own checks.",
  ],
  [
    /I verified by generating codes with Wi-Fi off after page load\./g,
    "Confirm it yourself: load the page once, go offline, and the generator still produces codes.",
  ],
  // resume-c1
  [
    /Test the email[\s\S]{0,70}?opened in a year\./g,
    "Test the email \u2014 a dormant inbox from an old account replies to nothing.",
  ],
  // resume-c2 (body + FAQ variants)
  [
    /experienced recruiters \u2014 I have heard three hiring managers say exactly that\./g,
    "experienced recruiters.",
  ],
  [/, and three hiring managers said exactly that\./g, "."],
  [
    /I verified this by running a two-column resume through a checker: skills listed in the sidebar parsed at 40% field accuracy versus 100% in single column\./g,
    "Two-column layouts silently lose content: skills listed in the sidebar parse at far lower field accuracy than the same list in single column.",
  ],
  [
    /I have seen a two-column Canva resume score 31% on a keyword check while a plain version of the same content scored 88%\./g,
    "A two-column graphics resume scores far lower on a keyword check than the same content as single-column plaintext.",
  ],
  [
    /I verified by building with Wi-Fi off after page load\./g,
    "Confirm it yourself: load the page once, go offline, and the builder still runs.",
  ],
  // resume-c8
  [/parse around 31% versus 88% for clean text\./g, "parse far less reliably than single-column text."],
  // word-c6
  [
    /I once caught[\s\S]{0,200}?left standing\./g,
    "A \u201clorem ipsum\u201d remnant in a staging footer an hour before launch is the vivid reminder of why filler is scaffolding: essential during construction, catastrophic if left standing.",
  ],
  [/where I once found live filler[\s\S]{0,40}?never skip it/g, "where forgotten filler lives \u2014 never skip it"],
  [
    /I found a staging footer this way sixty minutes before launch\./g,
    "This exact search is how a live lorem-ipsum footer gets caught an hour before launch.",
  ],
  // json-pillar
  [/the #1 encoding bug I review\./g, "the most common encoding bug in form posts."],
  // soft "I review" rank claims across image posts
  [/the #1 format embarrassment I review/g, "the classic format embarrassment"],
  [/the most common resize embarrassment I review/g, "the most common resize embarrassment"],
  [/The #1 SVG bug I review/g, "The most common SVG bug"],
];

const DIR = path.resolve("src/content/blog");
let total = 0;
let survivors = [];
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith(".ts")) continue;
  const p = path.join(DIR, f);
  let c = fs.readFileSync(p, "utf8");
  let n = 0;
  for (const [re, rep] of PAIRS) {
    c = c.replace(re, () => {
      n++;
      return rep;
    });
  }
  for (const m of c.matchAll(/\bI (?:have|once|tested|verified|learned|review|reviewed|used to|found a)\b/g)) {
    survivors.push(`${f}: ${m.index}: ${c.slice(m.index, m.index + 90).replace(/\s+/g, " ")}`);
  }
  if (n > 0) {
    fs.writeFileSync(p, c);
    console.log(`${f}: ${n} replacements`);
    total += n;
  }
}
console.log(`total: ${total}`);
if (survivors.length) {
  console.log("\nsurvivors:");
  for (const s of survivors) console.log("  " + s);
}
