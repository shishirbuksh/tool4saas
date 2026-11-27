const TARGET_DOMAIN = (process.env.TARGET_DOMAIN || 'https://tool4saas.com').replace(/\/+$/, '');

console.log('====================================================================');
console.log(' Tool4SaaS Production Post-Deployment Verification Suite');
console.log(` Target Domain: ${TARGET_DOMAIN}`);
console.log('====================================================================\n');

const testResults = [];

function record(name, pass, evidence) {
  testResults.push({ name, status: pass ? 'PASS' : 'FAIL', evidence });
  const badge = pass ? '\x1b[32m[PASS]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m';
  console.log(`${badge} ${name}: ${evidence}`);
}

async function run() {
  // 1. Homepage HTTP 200, canonical & SEO verification
  try {
    const res = await fetch(`${TARGET_DOMAIN}/`, { redirect: 'manual' });
    const text = await res.text();
    const is200 = res.status === 200;
    const hasCanonical = text.includes('rel="canonical"') && text.includes('href="https://tool4saas.com/"');
    const hasHero = text.includes('Tool4SaaS') && text.includes('<h1');
    record('Homepage HTTP 200 & Canonical', is200 && hasCanonical && hasHero, `Status: ${res.status}, Canonical: ${hasCanonical}`);
  } catch (e) {
    record('Homepage HTTP 200 & Canonical', false, e.message);
  }

  // 2. Robots.txt, Sitemap.xml, ads.txt verification
  try {
    const [robotsRes, sitemapRes, adsRes] = await Promise.all([
      fetch(`${TARGET_DOMAIN}/robots.txt`),
      fetch(`${TARGET_DOMAIN}/sitemap.xml`),
      fetch(`${TARGET_DOMAIN}/ads.txt`),
    ]);
    const [robotsTxt, sitemapXml, adsTxt] = await Promise.all([
      robotsRes.text(),
      sitemapRes.text(),
      adsRes.text(),
    ]);
    const robotsOk = robotsRes.status === 200 && robotsTxt.includes('Sitemap: https://tool4saas.com/sitemap.xml');
    const sitemapOk = sitemapRes.status === 200 && sitemapXml.includes('<urlset') && sitemapXml.includes('<loc>https://tool4saas.com/</loc>');
    const adsOk = adsRes.status === 200 && adsTxt.includes('pub-6310719489589992');
    record('Feeds (robots.txt, sitemap.xml, ads.txt)', robotsOk && sitemapOk && adsOk, `robots=${robotsRes.status}, sitemap=${sitemapRes.status}, ads=${adsRes.status}`);
  } catch (e) {
    record('Feeds Verification', false, e.message);
  }

  // 3. Security Headers Verification
  try {
    const res = await fetch(`${TARGET_DOMAIN}/`, { method: 'HEAD' });
    const h = res.headers;
    const ctOptions = (h.get('x-content-type-options') || '').toLowerCase();
    const frameOptions = (h.get('x-frame-options') || '').toUpperCase();
    const csp = h.get('content-security-policy') || '';
    const permPolicy = h.get('permissions-policy') || '';

    record('X-Content-Type-Options', ctOptions.includes('nosniff'), `Actual: "${ctOptions}"`);
    record('X-Frame-Options', frameOptions.includes('SAMEORIGIN'), `Actual: "${frameOptions}"`);
    record('Permissions-Policy', permPolicy.includes('microphone=(self)'), `Actual: "${permPolicy}"`);
    record('Content-Security-Policy', csp.length > 0, `CSP Length: ${csp.length} bytes`);
  } catch (e) {
    record('Security Headers Verification', false, e.message);
  }

  // 4. Legacy Redirects & Preset Query Preservation (Single-Hop 301 / 200)
  const redirects = [
    { path: '/json-tree-viewer', expected: '/json-formatter', status: 301 },
    { path: '/loan-calculator', expected: '/emi-calculator', status: 301 },
    { path: '/image-converter', expected: '/image-format-converter', status: 301 },
    { path: '/es/invoice-generator', expected: '/invoice-generator', status: 301 },
    { path: '/fr/qr-code-generator', expected: '/qr-code-generator', status: 301 },
    { path: '/utm-builder?source=newsletter&campaign=launch', expected: null, status: 200 },
    { path: '/base64-tool?urlSafe=1&nopadding=1', expected: null, status: 200 },
  ];

  for (const r of redirects) {
    try {
      const res = await fetch(`${TARGET_DOMAIN}${r.path}`, { redirect: 'manual' });
      const loc = res.headers.get('location') || '';
      const pass = res.status === r.status && (r.expected === null || loc.endsWith(r.expected));
      record(`${r.status} Check ${r.path}`, pass, `Status: ${res.status}${loc ? `, Location: "${loc}"` : ''}`);
    } catch (e) {
      record(`${r.status} Check ${r.path}`, false, e.message);
    }
  }

  // 5. Varnish Bypass Verification (/contact + /api/ssl-check)
  try {
    const contactRes = await fetch(`${TARGET_DOMAIN}/contact`, { redirect: 'manual' });
    const contactOk = contactRes.status === 200 && (contactRes.headers.get('cache-control') || '').includes('no-store');
    record('/contact Varnish Bypass (no-store)', contactOk, `Status: ${contactRes.status}, Cache-Control: "${contactRes.headers.get('cache-control')}"`);
  } catch (e) {
    record('/contact Varnish Bypass', false, e.message);
  }

  const total = testResults.length;
  const passed = testResults.filter((r) => r.status === 'PASS').length;
  console.log('\n====================================================================');
  console.log(` Post-Deployment Verification Summary: ${passed}/${total} Passed`);
  console.log('====================================================================');
  if (passed < total) {
    process.exitCode = 1;
  }
}

run();
