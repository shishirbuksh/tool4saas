import fs from "node:fs";
import path from "node:path";

const SECRET_PATTERNS = [
  { name: "AWS Access Key", regex: /AKIA[0-9A-Z]{16}/g },
  { name: "Private Key Header", regex: /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/g },
  { name: "Generic Secret / Token", regex: /(api[_-]?key|secret|token|password|auth[_-]?key)\s*[:=]\s*["'][A-Za-z0-9_\-]{16,}["']/gi },
  { name: "Google API Key", regex: /AIza[0-9A-Za-z\-_]{35}/g },
  { name: "Slack Token", regex: /xox[baprs]-[0-9]{12}-[0-9]{12}-[0-9a-zA-Z]{24}/g },
  { name: "Stripe Key", regex: /(sk|pk)_(test|live)_[0-9a-zA-Z]{24}/g }
];

function scanDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".git" && entry.name !== "dist") {
        scanDir(fullPath, results);
      }
    } else if (entry.isFile()) {
      if (/\.(ts|tsx|js|mjs|astro|json|env|md)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, "utf8");
        for (const pattern of SECRET_PATTERNS) {
          const matches = content.match(pattern.regex);
          if (matches) {
            // Filter out obvious false positives like dummy test placeholders
            const realMatches = matches.filter(m => !m.includes("example") && !m.includes("placeholder") && !m.includes("AIzaSyDummy"));
            if (realMatches.length > 0) {
              results.push({
                file: fullPath,
                pattern: pattern.name,
                count: realMatches.length
              });
            }
          }
        }
      }
    }
  }
  return results;
}

const findings = scanDir("src");
console.log("Secret scan complete. Real exposed secrets found:", findings.length);
if (findings.length > 0) {
  console.log(JSON.stringify(findings, null, 2));
}
fs.writeFileSync("scripts/qa3/secret-scan-results.json", JSON.stringify(findings, null, 2));
