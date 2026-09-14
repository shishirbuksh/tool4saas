import { describe, it, expect } from "vitest";
import { money, fmtBytes, fmt0, fmt1, fmt2, fmtNumber, MS_PER_DAY, WPM_READING } from "./format";

describe("format – money locale (en-US USD)", () => {
  it("formats money in en-US USD locale", () => {
    // money uses explicit en-US currency USD – must contain $ and comma
    expect(money(1234.56)).toBe("$1,234.56");
    expect(money(0)).toBe("$0.00");
    expect(money(1000000)).toMatch(/\$/);
    expect(money(1000000)).toMatch(/1,000,000/);
  });

  it("handles negative money locale", () => {
    const out = money(-500);
    expect(out).toContain("$");
    expect(out).toContain("500");
  });

  it("money handles Infinity and NaN via String(n)", () => {
    expect(money(Infinity)).toBe("Infinity");
    expect(money(-Infinity)).toBe("-Infinity");
    expect(money(NaN)).toBe("NaN");
  });

  it("money formats large and fractional amounts", () => {
    expect(money(536.82)).toBe("$536.82");
    expect(money(1199.1)).toBe("$1,199.10");
  });

  it("fmtBytes handles 10MB and boundaries", () => {
    expect(fmtBytes(0)).toBe("0 B");
    expect(fmtBytes(-1)).toBe("0 B");
    expect(fmtBytes(512)).toBe("512 B");
    expect(fmtBytes(1023)).toBe("1023 B");
    expect(fmtBytes(1024)).toBe("1.0 KB");
    expect(fmtBytes(10 * 1024 * 1024)).toBe("10.00 MB");
    expect(fmtBytes(Infinity)).toBe("Infinity");
  });

  it("fmt0/ fmt1/ fmt2 handle locale formatting", () => {
    // fmt0 rounds and no fraction
    expect(fmt0(1234.6)).toMatch(/1,235/);
    expect(fmt1(1.26)).toMatch(/1\.3/);
    expect(fmt2(1234.5)).toMatch(/1,234\.50/);
  });

  it("fmtNumber and constants sanity", () => {
    expect(fmtNumber(1234.5)).toBeDefined();
    expect(MS_PER_DAY).toBe(86_400_000);
    expect(WPM_READING).toBe(200);
  });

  it("money golden via mortgage EMI context", () => {
    // EMI golden 536.82 should format as $536.82
    const emi = 536.82;
    expect(money(emi)).toBe("$536.82");
  });
});
