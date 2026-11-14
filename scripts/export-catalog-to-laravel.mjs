import { tools, CATEGORIES } from "../src/lib/tools/index.ts";
import { REDIRECTS } from "./redirects.mjs";
import fs from "node:fs";
import path from "node:path";

function toPhp(val, indent = 1) {
  const sp = "    ".repeat(indent);
  const spPrev = "    ".repeat(indent - 1);
  if (val === null || val === undefined) return "null";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return String(val);
  if (typeof val === "string") {
    return JSON.stringify(val).replace(/\$/g, "\\$");
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    const items = val.map((item) => `${sp}${toPhp(item, indent + 1)}`).join(",\n");
    return "[\n" + items + ",\n" + spPrev + "]";
  }
  if (typeof val === "object") {
    const keys = Object.keys(val);
    if (keys.length === 0) return "[]";
    const entries = keys.map((k) => `${sp}${JSON.stringify(k)} => ${toPhp(val[k], indent + 1)}`).join(",\n");
    return "[\n" + entries + ",\n" + spPrev + "]";
  }
  return "null";
}

fs.mkdirSync("config", { recursive: true });

// Export categories
const catPhp = `<?php

declare(strict_types=1);

return ${toPhp(CATEGORIES)};
`;
fs.writeFileSync("config/categories.php", catPhp);

// Export tools
const toolsPhp = `<?php

declare(strict_types=1);

return ${toPhp(tools)};
`;
fs.writeFileSync("config/tools.php", toolsPhp);

// Export redirects map (source => destination)
const redirectMap = Object.fromEntries(REDIRECTS);
const redirectsPhp = `<?php

declare(strict_types=1);

return ${toPhp(redirectMap)};
`;
fs.writeFileSync("config/redirects.php", redirectsPhp);

console.log(`Successfully exported ${CATEGORIES.length} categories to config/categories.php`);
console.log(`Successfully exported ${tools.length} tools to config/tools.php`);
console.log(`Successfully exported ${REDIRECTS.length} redirects to config/redirects.php`);

