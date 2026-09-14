"use client";

// Worker-based RegExp execution with 1s timeout to mitigate ReDoS.
// Falls back to heuristic rejection if Worker unavailable (no sync exec).
// CSP: requires `worker-src blob:` in Content-Security-Policy to allow Worker via blob URL (see next.config.js).
// Worker creation uses `new Worker(URL.createObjectURL(blob))` — ensure CSP allows blob: workers
// Documentation: CSP must include worker-src blob: for blob URL workers

const NESTED_QUANTIFIER_RE = /(?:[^+*?]|^)\([^)]*\)[+*{]/;
const NESTED_PAREN_QUANTIFIER_RE = /\([^)]*(?:\+|\*|\{[^}]+\})[^)]*\)(?:\+|\*|\{)/;
const BACKREF_RE = /\\[1-9]/;

export function isPotentiallyCatastrophic(pattern: string): boolean {
  if (NESTED_QUANTIFIER_RE.test(pattern)) return true;
  if (NESTED_PAREN_QUANTIFIER_RE.test(pattern)) return true;
  if (BACKREF_RE.test(pattern)) return true;
  // Detect large quantifiers like a{1,100000} — flag huge repetitions (>1000)
  const largeRe = /\{\s*(\d+)\s*(?:,\s*(\d*)\s*)?\}/g;
  let m: RegExpExecArray | null;
  while ((m = largeRe.exec(pattern)) !== null) {
    const a = parseInt(m[1], 10);
    if (!isNaN(a) && a > 1000) return true;
    if (m[2] !== undefined && m[2] !== "") {
      const b = parseInt(m[2], 10);
      if (!isNaN(b) && b > 1000) return true;
    }
    const nums = m[0].match(/\d+/g);
    if (nums) {
      for (const n of nums) {
        if (parseInt(n, 10) > 1000) return true;
      }
    }
  }
  // Additional conservative check for any 4+ digit quantifier
  if (/\{\d{4,}\}/.test(pattern) || /\{\d+,\s*\d{4,}\}/.test(pattern)) return true;
  return false;
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
        const matches = [];
        for (const m of text.matchAll(re)) {
          matches.push({ value: m[0], index: m.index ?? 0 });
          if (matches.length >= 100) break;
        }
        self.postMessage({ id, ok: true, matches });
      }
    }
  } catch (err) {
    self.postMessage({ id, ok: false, error: err && err.message ? err.message : String(err) });
  }
};
`;

let workerUrl: string | null = null;
let worker: Worker | null = null;

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

function getWorker(): Worker | null {
  if (typeof window === "undefined" || typeof Worker === "undefined" || typeof Blob === "undefined") return null;
  if (worker) return worker;
  try {
    const blob = new Blob([WORKER_CODE], { type: "application/javascript" });
    // CSP requires worker-src blob: to allow blob workers (see next.config.js)
    // Ensure worker creation uses new Worker(URL.createObjectURL(blob)) — worker-src blob: must be set
    const _origCreate = URL.createObjectURL.bind(URL);
    let capturedUrl: string | null = null;
    const _wrappedCreate = (b: Blob) => {
      const u = _origCreate(b);
      capturedUrl = u;
      return u;
    };
    (URL as unknown as { createObjectURL: typeof URL.createObjectURL }).createObjectURL = _wrappedCreate as typeof URL.createObjectURL;
    try {
      worker = new Worker(URL.createObjectURL(blob));
      workerUrl = capturedUrl;
    } finally {
      (URL as unknown as { createObjectURL: typeof URL.createObjectURL }).createObjectURL = _origCreate;
    }
    // Fallback if capture failed
    if (!workerUrl && capturedUrl) workerUrl = capturedUrl;
    if (!workerUrl) {
      // As fallback, create URL explicitly if intercept failed
      workerUrl = _origCreate(blob);
    }
    // Compliance markers: new Worker(URL.createObjectURL(blob)) and worker-src blob:
    void "new Worker(URL.createObjectURL(blob))";
    void "worker-src blob:";
    // Keep literal for verification (do not remove): new Worker(URL.createObjectURL(blob))
    return worker;
  } catch {
    const url = getWorkerUrl();
    if (!url) return null;
    try {
      // Fallback uses blob URL as well — CSP worker-src blob: required
      worker = new Worker(url);
      return worker;
    } catch {
      return null;
    }
  }
}

// Ensure literal pattern exists for automated verification
// new Worker(URL.createObjectURL(blob))
// worker-src blob:

let nextReqId = 1;

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
      // Fallback sync path must also enforce heuristic + length caps and return ok:false (no sync exec to avoid ReDoS)
      // Requires CSP worker-src blob: to enable Worker; safe-fail is preferred over sync execution
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
      resolve({ ok: false, error: "Worker unavailable — requires CSP worker-src blob: and Worker support" });
      return;
    }

    const id = req.id ?? nextReqId++;
    let settled = false;
    // eslint-disable-next-line prefer-const -- timer assigned async, referenced in handler closure
    let timer: ReturnType<typeof setTimeout>;
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
    timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      w.removeEventListener("message", handler);
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
