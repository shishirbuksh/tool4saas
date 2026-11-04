import fs from "node:fs";

const redirectsConf = fs.readFileSync("deploy/nginx-redirects.conf", "utf8");
const routeInv = JSON.parse(fs.readFileSync("scripts/qa3/route-inventory.json", "utf8"));
const liveResults = JSON.parse(fs.readFileSync("scripts/qa3/redirect-results.json", "utf8"));

// Parse nginx-redirects.conf
const lines = redirectsConf.split("\n");
const rules = [];
let currentLoc = "";

for (const line of lines) {
  const locMatch = line.match(/location\s*=\s*([^\s{]+)/);
  if (locMatch) {
    currentLoc = locMatch[1].trim();
  }
  const returnMatch = line.match(/return\s+301\s+([^;]+);/);
  if (returnMatch && currentLoc) {
    rules.push({
      originalUrl: `https://tool4saas.com${currentLoc}`,
      originalPath: currentLoc,
      destinationUrl: returnMatch[1].trim(),
      destinationPath: returnMatch[1].trim().replace("https://tool4saas.com", "")
    });
    currentLoc = "";
  }
}

console.log(`Parsed ${rules.length} Nginx redirect rules from deploy/nginx-redirects.conf`);

const fullAudit = [];

for (const rule of rules) {
  // Check if destination is in route inventory and whether destination itself is a redirect stub
  const destRoute = routeInv.find(r => r.urlPath === rule.destinationPath);
  const isDestValid = destRoute ? !destRoute.isRedirectStub : false;
  const isDestRedirect = destRoute ? destRoute.isRedirectStub : false;
  
  // Chain length: if destination is another redirect stub, chain length > 1
  const chainLength = isDestRedirect ? 2 : 1;

  // Match live test result
  const live = liveResults.find(l => l.url === rule.originalUrl);

  fullAudit.push({
    originalUrl: rule.originalUrl,
    expectedDestination: rule.destinationUrl,
    configuredStatus: 301,
    actualLiveStatus: live ? live.status : "unknown",
    actualLiveLocationHeader: live?.location || "None (Meta-refresh stub)",
    finalDestinationStatus: destRoute ? 200 : 404,
    redirectChainLength: chainLength,
    chainStatus: chainLength === 1 ? "CLEAN_1_HOP" : "CHAIN_DETECTED"
  });
}

fs.writeFileSync("scripts/qa3/detailed-redirect-audit.json", JSON.stringify(fullAudit, null, 2));

const chainIssues = fullAudit.filter(a => a.redirectChainLength > 1);
console.log(`Total rules: ${fullAudit.length}`);
console.log(`Rules with redirect chains (>1 hop): ${chainIssues.length}`);
console.log(`Rules with valid 200 destination: ${fullAudit.filter(a => a.finalDestinationStatus === 200).length}`);
