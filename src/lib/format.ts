export const money = (n: number, currency = "USD"): string => {
  if (!isFinite(n)) return String(n);
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
};

export const fmtBytes = (b: number): string => {
  if (!isFinite(b)) return String(b);
  if (b <= 0) return "0 B";
  return b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`;
};

export const fmt0 = (n: number): string =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

export const fmt1 = (n: number): string =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(n);

export const fmt2 = (n: number): string =>
  new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export const fmtNumber = (n: number, options?: Intl.NumberFormatOptions): string =>
  new Intl.NumberFormat(undefined, options).format(n);

export const MS_PER_DAY = 86_400_000;
export const MS_PER_HOUR = 3_600_000;
export const MS_PER_MINUTE = 60_000;
export const MS_PER_SECOND = 1_000;
export const EPSILON_RATE = 1e-9;
export const UINT32_MAX_PLUS_ONE = 0x100000000; // 4294967296
export const WPM_READING = 200;
export const WPM_SPEAKING = 130;
export const BMI_UNDERWEIGHT = 18.5;
export const BMI_NORMAL = 25;
export const BMI_OVERWEIGHT = 30;
export const KG_PER_LB = 0.453592;
export const METERS_PER_INCH = 0.0254;
