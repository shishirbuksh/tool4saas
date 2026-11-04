import fs from 'fs';
import path from 'path';

const redirectsContent = fs.readFileSync(path.resolve('deploy/nginx-redirects.conf'), 'utf8');
const redirectRegex = /location\s*=\s*([^\s{]+)\s*\{\s*return\s+301\s+([^;]+);\s*\}/g;
const rules = [];
let match;
while ((match = redirectRegex.exec(redirectsContent)) !== null) {
  rules.push({
    originalPath: match[1],
    expectedTarget: match[2],
  });
}

console.log(`Parsed ${rules.length} redirect rules from deploy/nginx-redirects.conf`);

const BASE_URL = 'https://tool4saas.com';

async function testUrl(rule) {
  const liveUrl = `${BASE_URL}${rule.originalPath}`;
  try {
    // 1. Initial request without following redirects
    const initialRes = await fetch(liveUrl, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Tool4SaaS-ReleaseGate-Audit',
      },
    });

    const actualStatus = initialRes.status;
    const locationHeader = initialRes.headers.get('location') || '';

    let finalStatus = 'N/A';
    let chainLength = 0;

    if (actualStatus >= 300 && actualStatus < 400 && locationHeader) {
      chainLength = 1;
      const targetRes = await fetch(locationHeader, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Tool4SaaS-ReleaseGate-Audit',
        },
      });
      finalStatus = targetRes.status.toString();
    } else if (actualStatus === 200) {
      // It returned 200 directly (e.g. HTML redirect stub or direct page)
      finalStatus = '200';
      chainLength = 0;
    }

    const isHttp301 = actualStatus === 301;
    const isTargetCorrect = locationHeader === rule.expectedTarget;
    const isFinal200 = finalStatus === '200';

    let statusResult = 'FAIL';
    let failureReason = '';

    if (isHttp301 && isTargetCorrect && isFinal200) {
      statusResult = 'PASS';
    } else {
      if (actualStatus === 200) {
        failureReason = 'Returns HTTP 200 (HTML redirect stub) instead of Nginx HTTP 301';
      } else if (!isHttp301) {
        failureReason = `Returned HTTP ${actualStatus} instead of 301`;
      } else if (!isTargetCorrect) {
        failureReason = `Location mismatch: got "${locationHeader}", expected "${rule.expectedTarget}"`;
      } else if (!isFinal200) {
        failureReason = `Destination returned HTTP ${finalStatus}`;
      }
    }

    return {
      originalUrl: liveUrl,
      originalPath: rule.originalPath,
      expectedTarget: rule.expectedTarget,
      actualInitialStatus: actualStatus,
      locationHeader: locationHeader,
      finalStatus: finalStatus,
      chainLength: chainLength,
      result: statusResult,
      notes: failureReason || 'OK',
    };
  } catch (err) {
    return {
      originalUrl: liveUrl,
      originalPath: rule.originalPath,
      expectedTarget: rule.expectedTarget,
      actualInitialStatus: 'ERROR',
      locationHeader: 'ERROR',
      finalStatus: 'ERROR',
      chainLength: 0,
      result: 'FAIL',
      notes: err.message,
    };
  }
}

async function run() {
  console.log('Testing all 96 redirects against LIVE production: https://tool4saas.com ...');
  const results = [];
  // Run with batching of 5 to avoid overwhelming rate limits
  for (let i = 0; i < rules.length; i += 5) {
    const chunk = rules.slice(i, i + 5);
    const chunkResults = await Promise.all(chunk.map((r) => testUrl(r)));
    results.push(...chunkResults);
    process.stdout.write(`Tested ${results.length}/${rules.length}...\r`);
  }

  console.log('\nTesting completed.');

  let passCount = 0;
  let failCount = 0;
  for (const r of results) {
    if (r.result === 'PASS') passCount++;
    else failCount++;
  }

  console.log(`Live Redirect Test Summary: ${passCount} PASS, ${failCount} FAIL`);

  // Write CSV
  const csvHeader = 'OriginalURL,ExpectedTarget,ActualInitialStatus,LocationHeader,FinalStatus,ChainLength,Status,EvidenceNotes\n';
  const csvRows = results.map((r) => {
    return [
      `"${r.originalUrl}"`,
      `"${r.expectedTarget}"`,
      r.actualInitialStatus,
      `"${r.locationHeader}"`,
      r.finalStatus,
      r.chainLength,
      r.result,
      `"${r.notes.replace(/"/g, '""')}"`,
    ].join(',');
  });

  fs.writeFileSync('LIVE_REDIRECT_TEST_RESULTS.csv', csvHeader + csvRows.join('\n'));
  console.log('Wrote LIVE_REDIRECT_TEST_RESULTS.csv');

  fs.writeFileSync('scripts/qa3/live-redirect-results.json', JSON.stringify(results, null, 2));
}

run();
