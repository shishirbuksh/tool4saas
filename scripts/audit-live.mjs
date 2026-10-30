// Audit tool4saas live production site
async function auditUrl(url, label) {
  console.log(`\n========================================`);
  console.log(`AUDITING [${label}]: ${url}`);
  console.log(`========================================`);

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  });

  console.log(`HTTP Status: ${res.status} ${res.statusText}`);
  console.log(`Content-Type: ${res.headers.get('content-type')}`);
  console.log(`Server: ${res.headers.get('server')}`);
  console.log(`X-Frame-Options: ${res.headers.get('x-frame-options')}`);
  console.log(`X-Content-Type-Options: ${res.headers.get('x-content-type-options')}`);
  console.log(`Strict-Transport-Security: ${res.headers.get('strict-transport-security')}`);
  console.log(`Content-Security-Policy: ${res.headers.get('content-security-policy') ? 'PRESENT (' + res.headers.get('content-security-policy').length + ' chars)' : 'MISSING'}`);

  const html = await res.text();
  console.log(`HTML Payload Size: ${html.length} bytes (${(html.length / 1024).toFixed(1)} KB)`);
  console.log(`Within Googlebot 2MB limit: ${html.length < 2 * 1024 * 1024 ? 'YES (PASS)' : 'NO (FAIL)'}`);

  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  console.log(`Title (${titleMatch ? titleMatch[1].length : 0} chars): ${titleMatch ? titleMatch[1] : 'MISSING'}`);

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  console.log(`Description (${descMatch ? descMatch[1].length : 0} chars): ${descMatch ? descMatch[1] : 'MISSING'}`);

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1] : 'MISSING'}`);

  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
  console.log(`Meta Robots: ${robotsMatch ? robotsMatch[1] : 'NONE (defaults to index, follow)'}`);

  const hreflangs = [...html.matchAll(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/gi)].map(m => `${m[1]} -> ${m[2]}`);
  console.log(`Hreflangs (${hreflangs.length}):`, hreflangs.length > 0 ? hreflangs : 'NONE');

  const ogTags = [...html.matchAll(/<meta[^>]*property=["'](og:[^"']+)["'][^>]*content=["']([^"']+)["']/gi)].map(m => `${m[1]}: ${m[2]}`);
  console.log(`OpenGraph Tags (${ogTags.length}):`, ogTags);

  const twitterTags = [...html.matchAll(/<meta[^>]*name=["'](twitter:[^"']+)["'][^>]*content=["']([^"']+)["']/gi)].map(m => `${m[1]}: ${m[2]}`);
  console.log(`Twitter Tags (${twitterTags.length}):`, twitterTags);

  const schemas = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  console.log(`JSON-LD Scripts Found: ${schemas.length}`);
  schemas.forEach((s, idx) => {
    try {
      const data = JSON.parse(s);
      const type = data['@type'] || (data['@graph'] ? data['@graph'].map(g => g['@type']).join(', ') : 'unknown');
      console.log(`  Schema #${idx + 1} [@type = ${type}]: Valid JSON`);
    } catch (e) {
      console.log(`  Schema #${idx + 1}: INVALID JSON - ${e.message}`);
    }
  });

  const hasEmotionStyles = html.includes('data-emotion=');
  console.log(`SSR Critical CSS (Emotion): ${hasEmotionStyles ? 'PRESENT (Extracted server-side)' : 'NONE'}`);

  const hasConsentMode = html.includes('gtag("consent", "default"') || html.includes("gtag('consent', 'default'");
  console.log(`Google Consent Mode v2 (Default Deny): ${hasConsentMode ? 'PRESENT (DMA Compliant)' : 'NONE'}`);

  const hasAdSense = html.includes('ca-pub-6310719489589992');
  console.log(`AdSense Script Tag: ${hasAdSense ? 'PRESENT' : 'NONE'}`);

  const hasAdContainers = html.includes('class="adsense-slot"') || html.includes('adsbygoogle') || html.includes('data-ad-client');
  console.log(`Ad Placement Containers: ${hasAdContainers ? 'PRESENT' : 'NONE'}`);

  const hasHeading1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  console.log(`H1 Tag: ${hasHeading1 ? 'PRESENT (' + hasHeading1[1].replace(/<[^>]+>/g, '').trim().slice(0, 60) + '...)' : 'MISSING'}`);
}

async function run() {
  await auditUrl('https://tool4saas.com/', 'Homepage (EN)');
  await auditUrl('https://tool4saas.com/invoice-generator', 'Tool Page (EN)');
  await auditUrl('https://tool4saas.com/es/invoice-generator', 'Tool Pilot (ES)');
  await auditUrl('https://tool4saas.com/fr/invoice-generator', 'Tool Pilot (FR)');
  await auditUrl('https://tool4saas.com/blog', 'Blog Index');
  await auditUrl('https://tool4saas.com/blog/invoice-generator-guide', 'Blog Guide Pillar');
  await auditUrl('https://tool4saas.com/about', 'Static About Page');
  await auditUrl('https://tool4saas.com/privacy', 'Privacy Policy (AdSense/GDPR)');
}

run().catch(console.error);
