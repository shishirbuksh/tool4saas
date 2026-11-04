import fs from "node:fs";
import { REDIRECTS } from "../redirects.mjs";

async function testAllRedirects() {
  console.log(`Testing all ${REDIRECTS.length} legacy URLs against https://tool4saas.com...\n`);
  
  const results = [];
  for (const [src, dst] of REDIRECTS) {
    const url = `https://tool4saas.com${src}`;
    try {
      const res = await fetch(url, { redirect: "manual" });
      const status = res.status;
      const location = res.headers.get("location");
      const is301 = status === 301;
      
      let finalStatus = null;
      let metaRefreshDst = null;

      if (status === 200) {
        const text = await res.text();
        const m = text.match(/<meta\s+http-equiv="refresh"\s+content="0;url=([^"]+)"/i);
        if (m) metaRefreshDst = m[1];
      } else if (is301 && location) {
        const targetUrl = location.startsWith("http") ? location : `https://tool4saas.com${location}`;
        const finalRes = await fetch(targetUrl, { redirect: "follow" });
        finalStatus = finalRes.status;
      }

      results.push({
        src,
        expectedDst: dst,
        status,
        location,
        metaRefreshDst,
        is301,
        finalStatus
      });
    } catch (err) {
      results.push({
        src,
        expectedDst: dst,
        error: err.message
      });
    }
  }

  const count301 = results.filter(r => r.status === 301).length;
  const count200Meta = results.filter(r => r.status === 200 && r.metaRefreshDst).length;
  const count200Other = results.filter(r => r.status === 200 && !r.metaRefreshDst).length;
  const count404 = results.filter(r => r.status === 404).length;
  const countErrors = results.filter(r => r.error).length;

  console.log("================ REDIRECT AUDIT RESULTS ================");
  console.log(`Total legacy URLs tested: ${results.length}`);
  console.log(`HTTP 301 Moved Permanently: ${count301}`);
  console.log(`HTTP 200 OK with Meta-Refresh: ${count200Meta}`);
  console.log(`HTTP 200 OK without Meta-Refresh: ${count200Other}`);
  console.log(`HTTP 404 Not Found: ${count404}`);
  console.log(`Network Errors: ${countErrors}`);
  console.log("========================================================\n");

  fs.writeFileSync("scripts/qa3/redirect-results.json", JSON.stringify(results, null, 2));
}

testAllRedirects();
