import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

async function auditTools() {
  console.log("=== COMPREHENSIVE TOOLS & UI/UX AUDIT ===");

  // 1. Load tools catalogue
  const toolsModule = await import("../src/lib/tools.ts");
  const tools = toolsModule.tools;
  const categories = toolsModule.CATEGORIES;
  const categoryIds = new Set(categories.map((c) => c.id));
  const iconNames = new Set(toolsModule.ICON_NAMES);

  console.log(`Loaded ${tools.length} tools across ${categories.length} categories.`);

  const findings = {
    catalogueErrors: [],
    viewErrors: [],
    componentMissing: [],
    legacyColorArtifacts: [],
    fixedWidthOverflows: [],
    missingAriaOrLabels: [],
    ymylIssues: [],
    jsonLdIssues: [],
    objectUrlIssues: [],
  };

  // 2. Load YMYL registry
  const ymylModule = await import("../src/lib/ymyl.ts");
  const getToolYMYLType = ymylModule.getToolYMYLType;

  // 3. Check tool-view.server module
  const toolViewServer = await import("../src/lib/tool-view.server.ts");
  const buildToolViewBySlug = toolViewServer.buildToolViewBySlug;
  const buildToolJsonLd = toolViewServer.buildToolJsonLd;

  // 4. Audit each tool in catalogue
  const slugs = new Set();
  for (const t of tools) {
    if (slugs.has(t.slug)) {
      findings.catalogueErrors.push(`Duplicate slug: ${t.slug}`);
    }
    slugs.add(t.slug);

    if (!/^[a-z0-9-]+$/.test(t.slug) || t.slug.startsWith("-") || t.slug.endsWith("-") || t.slug.includes("--")) {
      findings.catalogueErrors.push(`Invalid slug syntax: ${t.slug}`);
    }

    if (!categoryIds.has(t.category)) {
      findings.catalogueErrors.push(`Tool ${t.slug} has invalid category: ${t.category}`);
    }

    if (!iconNames.has(t.icon)) {
      findings.catalogueErrors.push(`Tool ${t.slug} has invalid icon: ${t.icon}`);
    }

    if (!t.title || t.title.trim().length === 0) {
      findings.catalogueErrors.push(`Tool ${t.slug} has empty title`);
    }

    if (!t.short || t.short.trim().length === 0) {
      findings.catalogueErrors.push(`Tool ${t.slug} has empty short`);
    }

    if (!t.description || t.description.length < 50) {
      findings.catalogueErrors.push(`Tool ${t.slug} has short description (${t.description?.length} chars)`);
    }

    if (!Array.isArray(t.keywords) || t.keywords.length < 3) {
      findings.catalogueErrors.push(`Tool ${t.slug} has fewer than 3 keywords`);
    }

    if (!Array.isArray(t.faq) || t.faq.length < 3) {
      findings.catalogueErrors.push(`Tool ${t.slug} has fewer than 3 FAQs`);
    }

    if (!Array.isArray(t.howTo) || t.howTo.length < 3) {
      findings.catalogueErrors.push(`Tool ${t.slug} has fewer than 3 howTo steps`);
    }

    // Check view file exists
    const viewPath = path.join(root, "src/views/tools", `${t.slug}.tsx`);
    if (!fs.existsSync(viewPath)) {
      findings.viewErrors.push(`Missing view file for tool: src/views/tools/${t.slug}.tsx`);
    } else {
      // Check what component it imports
      const viewContent = fs.readFileSync(viewPath, "utf-8");
      const importMatch = viewContent.match(/from\s+["']@\/components\/tools\/([^"']+)["']/);
      if (importMatch) {
        const compFileName = `${importMatch[1]}.tsx`;
        const compPath = path.join(root, "src/components/tools", compFileName);
        if (!fs.existsSync(compPath)) {
          findings.componentMissing.push(`Tool ${t.slug} imports non-existent component ${compFileName}`);
        }
      }
    }

    // Check buildToolViewBySlug and JSON-LD
    try {
      const view = buildToolViewBySlug(t.slug, "en");
      if (!view || !view.tool) {
        findings.viewErrors.push(`buildToolViewBySlug returned invalid view for ${t.slug}`);
      }
    } catch (err) {
      findings.viewErrors.push(`buildToolViewBySlug threw for ${t.slug}: ${err.message}`);
    }

    try {
      const jsonLd = buildToolJsonLd(t, "en");
      if (!jsonLd || jsonLd["@type"] !== "WebApplication") {
        findings.jsonLdIssues.push(`Invalid JSON-LD @type for ${t.slug}`);
      }
      if (!jsonLd.name || !jsonLd.description || !jsonLd.applicationCategory) {
        findings.jsonLdIssues.push(`Incomplete JSON-LD fields for ${t.slug}`);
      }
    } catch (err) {
      findings.jsonLdIssues.push(`buildToolJsonLd threw for ${t.slug}: ${err.message}`);
    }

    // YMYL check
    const ymyl = getToolYMYLType(t);
    if ((t.category === "finance" || t.category === "health") && !ymyl) {
      findings.ymylIssues.push(`Tool ${t.slug} is in ${t.category} but has no YMYL type assigned`);
    }
  }

  // 5. Audit all components in src/components/tools/
  const toolsCompDir = path.join(root, "src/components/tools");
  const toolFiles = fs.readdirSync(toolsCompDir).filter((f) => f.endsWith(".tsx"));

  console.log(`Auditing ${toolFiles.length} tool component files in src/components/tools/...`);

  for (const file of toolFiles) {
    const fullPath = path.join(toolsCompDir, file);
    const content = fs.readFileSync(fullPath, "utf-8");

    // Check for MUI imports
    if (content.includes("@mui/")) {
      findings.legacyColorArtifacts.push(`${file} still contains @mui import`);
    }

    // Check for Next imports
    if (content.includes('from "next') || content.includes("from 'next")) {
      findings.legacyColorArtifacts.push(`${file} still contains next/ import`);
    }

    // Check for old MUI primary colors (#1976d2, #1565c0, #1e88e5) or legacy CSS variables
    const legacyMuiColors = content.match(/#1976d2|#1565c0|#1e88e5|--mui-palette/gi);
    if (legacyMuiColors) {
      findings.legacyColorArtifacts.push(`${file} contains legacy MUI colors: ${legacyMuiColors.join(", ")}`);
    }

    // Check for dangerous hardcoded fixed desktop widths on outer wrappers
    // e.g. w-[800px], w-[900px] without responsive prefix
    const fixedWidths = content.match(/\b(w-\[\d{3,4}px\]|min-w-\[\d{3,4}px\])/g);
    if (fixedWidths) {
      // Filter out small badges/buttons (w-[100px]) - look for > 500px without max-w
      const largeFixed = fixedWidths.filter((w) => {
        const num = parseInt(w.replace(/\D/g, ""), 10);
        return num > 400;
      });
      if (largeFixed.length > 0) {
        findings.fixedWidthOverflows.push(`${file} has large fixed width classes: ${largeFixed.join(", ")}`);
      }
    }

    // Check Object URL revoke pairing
    const createMatches = content.match(/URL\.createObjectURL/g) || [];
    const revokeMatches = content.match(/URL\.revokeObjectURL/g) || [];
    if (createMatches.length > revokeMatches.length) {
      findings.objectUrlIssues.push(
        `${file}: createObjectURL count (${createMatches.length}) > revokeObjectURL count (${revokeMatches.length})`
      );
    }
  }

  console.log("\n--- AUDIT RESULTS ---");
  console.log(`Catalogue Errors: ${findings.catalogueErrors.length}`);
  console.log(`View Errors: ${findings.viewErrors.length}`);
  console.log(`Missing Components: ${findings.componentMissing.length}`);
  console.log(`Legacy Color Artifacts: ${findings.legacyColorArtifacts.length}`);
  if (findings.legacyColorArtifacts.length > 0) {
    findings.legacyColorArtifacts.forEach((e) => console.log(`  - ${e}`));
  }
  console.log(`Fixed Width Overflows (>400px): ${findings.fixedWidthOverflows.length}`);
  if (findings.fixedWidthOverflows.length > 0) {
    findings.fixedWidthOverflows.forEach((e) => console.log(`  - ${e}`));
  }
  console.log(`YMYL Issues: ${findings.ymylIssues.length}`);
  console.log(`JSON-LD Issues: ${findings.jsonLdIssues.length}`);
  console.log(`Object URL Ledger Discrepancies: ${findings.objectUrlIssues.length}`);
  if (findings.objectUrlIssues.length > 0) {
    findings.objectUrlIssues.forEach((e) => console.log(`  - ${e}`));
  }

  return findings;
}

auditTools().catch((err) => {
  console.error(err);
  process.exit(1);
});
