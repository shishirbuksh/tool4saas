"use client";

// Worker-based RegExp execution with 1s timeout to mitigate ReDoS.
// Falls back to heuristic + sync execution if Worker unavailable.

const NESTED_QUANTIFIER_RE = /(\w+\+|\*|\{[^}]+\})\+/;
const NESTED_PAREN_QUANTIFIER_RE = /\([^)]*(?:\+|\*|\{[^}]+\})[^)]*\)(?:\+|\*|\{)/;

export function isPotentiallyCatastrophic(pattern: string): boolean {
  return NESTED_QUANTIFIER_RE.test(pattern) || NESTED_PAREN_QUANTIFIER_RE.test(pattern);
}

type RegexWorkerRequest =
  | { type: "test"; pattern: string; flags: string; text: string; mode: "match" }
  | { type: "test"; pattern: string; flags: string; text: string; replace: string; mode: "replace" };

type RegexWorkerResponse =
  | { ok: true; matches?: { value: string; index: number }[]; result?: string }
  | { ok: false; error: string };

const WORKER_CODE = `
self.onmessage = function(e) {
  const { pattern, flags, text, replace, mode, id } = e.data;
  try {
    const re = new RegExp(pattern, flags);
    if (mode === "replace") {
      const result = text.replace(re, replace);
      self.postMessage({ id, ok: true, result });
    } else {
      if (!flags.includes("g")) {
        const m = text.match(re);
        const matches = m ? [{ value: m[0], index: m.index ?? 0 }] : [];
        self.postMessage({ id, ok: true, matches });
      } else {
        const matches = [...text.matchAll(re)].slice(0, 100).map(m => ({ value: m[0], index: m.index ?? 0 }));
        self.postMessage({ id, ok: true, matches });
      }
    }
  } catch (err) {
    self.postMessage({ id, ok: false, error: err && err.message ? err.message : String(err) });
  }
};
`;

let workerUrl: string | null = null;
function getWorkerUrl(): string | null {
  if (typeof window === "undefined" || typeof Worker === "undefined" || typeof Blob === "undefined") return null;
  if (workerUrl) return workerUrl;
  try {
    const blob = new Blob([WORKER_CODE], { type: "application/javascript" });
    workerUrl = URL.createObjectURL(blob);
    return workerUrl;
  } catch {
    return null;
  }
}

let worker: Worker | null = null;
function getWorker(): Worker | null {
  const url = getWorkerUrl();
  if (!url) return null;
  if (worker) return worker;
  try {
    worker = new Worker(url);
    return worker;
  } catch {
    return null;
  }
}

export function runRegexInWorker(
  req: Omit<RegexWorkerRequest, "id"> & { id?: number },
  timeoutMs = 1000
): Promise<RegexWorkerResponse> {
  return new Promise((resolve) => {
    // Heuristic fast-reject before worker
    if (isPotentiallyCatastrophic(req.pattern)) {
      resolve({ ok: false, error: "Potentially catastrophic pattern" });
      return;
    }
    if (req.pattern.length > 200) {
      resolve({ ok: false, error: "Pattern too long (max 200 chars)" });
      return;
    }
    if (req.text.length > 50000) {
      resolve({ ok: false, error: "Test string too long (max 50000 chars)" });
      return;
    }

    const w = getWorker();
    if (!w) {
      // Fallback sync (no timeout guard beyond heuristic)
      try {
        const re = new RegExp(req.pattern, req.flags);
        if (req.mode === "replace") {
          const result = req.text.replace(re, (req as any).replace);
          resolve({ ok: true, result });
        } else {
          if (!req.flags.includes("g")) {
            const m = req.text.match(re);
            resolve({ ok: true, matches: m ? [{ value: m[0], index: m.index ?? 0 }] : [] });
          } else {
            resolve({ ok: true, matches: [...req.text.matchAll(re)].slice(0, 100).map((m) => ({ value: m[0], index: m.index ?? 0 })) });
          }
        }
      } catch (e) {
        resolve({ ok: false, error: (e as Error).message });
      }
      return;
    }

    const id = Math.random();
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      resolve({ ok: false, error: "Regex timeout (1s) — pattern may be too slow" });
      // Try to terminate and recreate worker to kill hung execution in some browsers
      // Note: Worker termination does not abort in-flight RegExp in all engines, but releases thread
      try {
        w.terminate();
        worker = null;
        if (workerUrl) {
          URL.revokeObjectURL(workerUrl);
          workerUrl = null;
        }
      } catch {}
    }, timeoutMs);

    const handler = (e: MessageEvent) => {
      const data = e.data as any;
      if (data.id !== id) return;
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      w.removeEventListener("message", handler);
      if (data.ok) {
        if (data.matches) resolve({ ok: true, matches: data.matches });
        else if (data.result !== undefined) resolve({ ok: true, result: data.result });
        else resolve({ ok: true });
      } else {
        resolve({ ok: false, error: data.error });
      }
    };
    w.addEventListener("message", handler);
    w.postMessage({ id, ...req });
  });
}

export function terminateRegexWorker() {
  if (worker) {
    try {
      worker.terminate();
    } catch {}
    worker = null;
  }
  if (workerUrl) {
    try {
      URL.revokeObjectURL(workerUrl);
    } catch {}
    workerUrl = null;
  }
}
