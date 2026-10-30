import fs from "node:fs";

const checks = [];

function check(name, pass, detail) {
  checks.push({ name, status: pass ? "PASS" : "FAIL", detail });
}

const html = fs.readFileSync("dist/index.html", "utf8");
check("dist/index.html exists", html.length > 0, `${html.length} bytes`);
check("Emotion SSR CSS", html.includes("data-emotion"), "Critical styles extracted to head");
check("Site JSON-LD Schema", html.includes("application/ld+json"), "Schema.org graph embedded");
check("Canonical tag", html.includes('rel="canonical"'), "Canonical link present");
check("OpenGraph metadata", html.includes('property="og:title"'), "og:title tag present");
check("Twitter card metadata", html.includes('name="twitter:card"'), "twitter:card present");
check("Robots tag", html.includes('name="robots"'), "Robots index/follow present");
check("App container with hydration dataset", html.includes('id="app"') && html.includes('data-view='), "View and container wired");
check("Consent Mode v2 default", html.includes("ad_storage") && html.includes("wait_for_update"), "Denied defaults present");
check("Theme bootstrap script", html.includes("data-theme"), "Theme persistence script present");

const sitemap = fs.readFileSync("dist/sitemap.xml", "utf8");
check("dist/sitemap.xml", sitemap.includes("<urlset") && sitemap.includes("/invoice-generator"), `${sitemap.length} bytes`);

const robots = fs.readFileSync("dist/robots.txt", "utf8");
check("dist/robots.txt", robots.includes("User-agent:") && robots.includes("sitemap.xml"), "Valid robots.txt");

const rss = fs.readFileSync("dist/rss.xml", "utf8");
check("dist/rss.xml", rss.includes("<rss") && rss.includes("<channel>"), "Valid RSS feed");

const ogTool = fs.existsSync("dist/og/invoice-generator.png");
check("OG tool PNG generated", ogTool, "dist/og/invoice-generator.png exists");

const ogPillar = fs.existsSync("dist/og/blog/invoice-generator-guide.png");
check("OG blog pillar PNG generated", ogPillar, "dist/og/blog/invoice-generator-guide.png exists");

const ogCluster = fs.existsSync("dist/og/blog/invoice-generator-guide/how-to-create-invoice-online.png");
check("OG blog cluster PNG generated", ogCluster, "dist/og/blog/.../how-to-create-invoice-online.png exists");

const nginxConf = fs.readFileSync("deploy/nginx.conf", "utf8");
check("Nginx clean URLs", nginxConf.includes("try_files $uri $uri.html"), "try_files configured");
check("Nginx OG images routing", nginxConf.includes("try_files $uri $uri.png"), "OG routing configured");
check("Nginx CSP headers", nginxConf.includes("Content-Security-Policy"), "CSP security header configured");

console.log("\n================ PRODUCTION READINESS AUDIT ================");
let allPass = true;
for (const c of checks) {
  const icon = c.status === "PASS" ? "✓" : "✗";
  console.log(`${icon} [${c.status}] ${c.name.padEnd(35)} : ${c.detail}`);
  if (c.status !== "PASS") allPass = false;
}
console.log("============================================================\n");
if (!allPass) process.exit(1);
