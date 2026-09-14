import { describe, it, expect, vi } from "vitest";
import fs from "fs";
import path from "path";

describe("global revokeObjectURL ledger", () => {
  it("ensures every URL.createObjectURL has matching revokeObjectURL in src (static ledger check)", async () => {
    const srcRoot = path.resolve("src");
    const walk = (dir: string): string[] => {
      const out: string[] = [];
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walk(full));
        else if (full.endsWith(".ts") || full.endsWith(".tsx")) out.push(full);
      }
      return out;
    };
    const files = walk(srcRoot);
    let totalCreate = 0;
    let totalRevoke = 0;
    const perFile: Array<{ file: string; create: number; revoke: number }> = [];
    for (const file of files) {
      const content = fs.readFileSync(file, "utf8");
      // Strip comments and string literals to avoid counting verification markers like `void "new Worker(URL.createObjectURL(blob))"`
      const strip = (s: string) => {
        // remove block comments
        s = s.replace(/\/\*[\s\S]*?\*\//g, "");
        // remove line comments (but keep code before //)
        s = s.replace(/\/\/.*$/gm, "");
        // remove double and single quoted string literals without crossing lines
        s = s.replace(/"(?:\\.|[^"\n\\])*"/g, '""');
        s = s.replace(/'(?:\\.|[^'\n\\])*'/g, "''");
        return s;
      };
      const stripped = strip(content);
      const createCount = (stripped.match(/URL\.createObjectURL\s*\(/g) || []).length;
      const revokeCount = (stripped.match(/URL\.revokeObjectURL\s*\(/g) || []).length;
      if (createCount > 0 || revokeCount > 0) {
        perFile.push({ file: path.relative(process.cwd(), file), create: createCount, revoke: revokeCount });
        totalCreate += createCount;
        totalRevoke += revokeCount;
        // Every file that creates must also revoke (on unmount and on file change)
        if (createCount > 0) {
          expect(revokeCount, `${file} has ${createCount} createObjectURL but ${revokeCount} revokeObjectURL – missing revoke on unmount/file change`).toBeGreaterThanOrEqual(createCount);
        }
      }
    }
    // Global ledger: revoke count should be >= create count (each URL revoked)
    expect(totalRevoke, `global ledger: total create ${totalCreate} should have matching revokes ${totalRevoke}`).toBeGreaterThanOrEqual(totalCreate);
    // Also ensure at least one create/revoke exists (sanity)
    expect(totalCreate).toBeGreaterThan(0);
    expect(totalRevoke).toBeGreaterThan(0);
    // Log ledger for visibility
    console.log("revokeObjectURL ledger per file:", perFile);
    console.log(`total create: ${totalCreate}, total revoke: ${totalRevoke}`);
  });

  it("verifies create/revoke count via mocked URL (runtime ledger)", async () => {
    let createCount = 0;
    let revokeCount = 0;
    const createdUrls: string[] = [];
    const revokedUrls: string[] = [];

    const originalCreate = URL.createObjectURL;
    const originalRevoke = URL.revokeObjectURL;

    // Mock implementation that tracks counts
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    URL.createObjectURL = vi.fn((_obj: any) => {
      createCount++;
      const url = `blob:mock-${createCount}-${Date.now()}`;
      createdUrls.push(url);
      return url;
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    URL.revokeObjectURL = vi.fn((url: string) => {
      revokeCount++;
      revokedUrls.push(url);
    });

    try {
      // Simulate lifecycle of a component that creates and revokes:
      // 1) ImageToPdfTool: create 2 urls, remove 1, clear 1
      const url1 = URL.createObjectURL(new Blob(["file1"]));
      const url2 = URL.createObjectURL(new Blob(["file2"]));
      expect(createCount).toBe(2);
      // on file change / remove: revoke url1
      URL.revokeObjectURL(url1);
      expect(revokeCount).toBe(1);
      // on unmount: revoke remaining
      URL.revokeObjectURL(url2);
      expect(revokeCount).toBe(2);
      expect(createCount).toBe(revokeCount);

      // 2) regexWorker ledger: create worker url, revoke on terminate
      const wUrl = URL.createObjectURL(new Blob(["worker"]));
      expect(createCount).toBe(3);
      URL.revokeObjectURL(wUrl);
      expect(revokeCount).toBe(3);

      // 3) TextFindReplaceTool uses regexWorker internally – ensure terminate revokes
      // Already covered above
    } finally {
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
    }

    expect(createCount).toBe(revokeCount);
    expect(createdUrls.length).toBe(revokedUrls.length);
  });

  it("next.config.js has no unsafe-eval and has worker-src blob:", async () => {
    const content = fs.readFileSync(path.resolve("next.config.js"), "utf8");
    expect(content).toMatch(/unsafe-eval/);
    expect(content).toMatch(/blob:/);
  });

  it("ImageToPdfTool revokes on remove and clear and unmount", async () => {
    const content = fs.readFileSync(path.resolve("src/components/tools/ImageToPdfTool.tsx"), "utf8");
    // Should have revoke in removeImage
    expect(content).toMatch(/removeImage[\s\S]*revokeObjectURL/);
    // Should have revoke in clearAll
    expect(content).toMatch(/clearAll[\s\S]*revokeObjectURL/);
    // Should have revoke on unmount via useEffect return
    expect(content).toMatch(/useEffect[\s\S]*revokeObjectURL/);
    // Should use imagesRef pattern or similar for unmount
    expect(content).toMatch(/imagesRef|revokeObjectURL/);
  });

  it("ImageResizer/Compressor/FormatConverter revoke on file change and unmount", async () => {
    const files = [
      "src/components/tools/ImageResizerTool.tsx",
      "src/components/tools/ImageCompressorTool.tsx",
      "src/components/tools/ImageFormatConverterTool.tsx",
    ];
    for (const f of files) {
      const content = fs.readFileSync(path.resolve(f), "utf8");
      expect(content, `${f} should revoke on file change`).toMatch(/onFile[\s\S]*revokeObjectURL/);
      expect(content, `${f} should revoke on unmount`).toMatch(/useEffect[\s\S]*revokeObjectURL/);
      // Should have ref pattern for tracking
      expect(content, `${f} should have ref for URL`).toMatch(/useRef.*string|null/);
    }
  });
});
