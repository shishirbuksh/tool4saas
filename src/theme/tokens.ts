// Theme tokens: fonts, breakpoints, shape, transitions, shadows.
// Pure values (no createTheme) — composed in src/app/theme.ts.
// Numerics/hexes must stay identical to the original single-file theme.

export const displayFont =
  'var(--font-display), "Fraunces", Georgia, "Times New Roman", serif';
export const bodyFont =
  'var(--font-inter), "Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export const breakpoints = {
  values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1320 },
};

export const shape = { borderRadius: 12 };

export const transitions = {
  duration: { shortest: 150, shorter: 200, short: 250, standard: 300 },
  easing: { easeInOut: "cubic-bezier(0.65,0,0.35,1)", easeOut: "cubic-bezier(0.16,1,0.3,1)", easeIn: "cubic-bezier(0.4,0,1,1)", sharp: "cubic-bezier(0.4,0,0.6,1)" },
};

export const lightShadows: string[] = [
  "none",
  "0 1px 2px rgba(0,0,0,0.04)",
  "0 2px 4px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
  "0 4px 8px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.03)",
  "0 6px 16px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)",
  "0 8px 24px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.03)",
  "0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
  "0 16px 40px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.04)",
  "0 24px 48px rgba(0,0,0,0.07), 0 12px 24px rgba(0,0,0,0.04)",
  "0 28px 56px rgba(0,0,0,0.07), 0 14px 28px rgba(0,0,0,0.05)",
  "0 32px 64px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.05)",
  "0 36px 72px rgba(0,0,0,0.08), 0 18px 36px rgba(0,0,0,0.055)",
  "0 40px 80px rgba(0,0,0,0.09), 0 20px 40px rgba(0,0,0,0.06)",
  "0 44px 88px rgba(0,0,0,0.09), 0 22px 44px rgba(0,0,0,0.06)",
  "0 48px 96px rgba(0,0,0,0.10), 0 24px 48px rgba(0,0,0,0.065)",
  "0 52px 104px rgba(0,0,0,0.10), 0 26px 52px rgba(0,0,0,0.07)",
  "0 56px 112px rgba(0,0,0,0.11), 0 28px 56px rgba(0,0,0,0.07)",
  "0 60px 120px rgba(0,0,0,0.11), 0 30px 60px rgba(0,0,0,0.075)",
  "0 64px 128px rgba(0,0,0,0.12), 0 32px 64px rgba(0,0,0,0.08)",
  "0 68px 136px rgba(0,0,0,0.12), 0 34px 68px rgba(0,0,0,0.08)",
  "0 72px 144px rgba(0,0,0,0.13), 0 36px 72px rgba(0,0,0,0.085)",
  "0 76px 152px rgba(0,0,0,0.13), 0 38px 76px rgba(0,0,0,0.09)",
  "0 80px 160px rgba(0,0,0,0.14), 0 40px 80px rgba(0,0,0,0.09)",
  "0 84px 168px rgba(0,0,0,0.14), 0 42px 84px rgba(0,0,0,0.095)",
  "0 88px 176px rgba(0,0,0,0.15), 0 44px 88px rgba(0,0,0,0.10)",
];

export const darkShadows: string[] = [
  "none",
  "0 1px 2px rgba(0,0,0,0.4)",
  "0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
  "0 4px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)",
  "0 6px 16px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
  "0 8px 24px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)",
  "0 12px 32px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)",
  "0 16px 40px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4)",
  "0 24px 48px rgba(0,0,0,0.7), 0 12px 24px rgba(0,0,0,0.4)",
  "0 28px 56px rgba(0,0,0,0.70), 0 14px 28px rgba(0,0,0,0.45)",
  "0 32px 64px rgba(0,0,0,0.71), 0 16px 32px rgba(0,0,0,0.46)",
  "0 36px 72px rgba(0,0,0,0.72), 0 18px 36px rgba(0,0,0,0.47)",
  "0 40px 80px rgba(0,0,0,0.73), 0 20px 40px rgba(0,0,0,0.48)",
  "0 44px 88px rgba(0,0,0,0.74), 0 22px 44px rgba(0,0,0,0.49)",
  "0 48px 96px rgba(0,0,0,0.75), 0 24px 48px rgba(0,0,0,0.50)",
  "0 52px 104px rgba(0,0,0,0.76), 0 26px 52px rgba(0,0,0,0.51)",
  "0 56px 112px rgba(0,0,0,0.77), 0 28px 56px rgba(0,0,0,0.52)",
  "0 60px 120px rgba(0,0,0,0.78), 0 30px 60px rgba(0,0,0,0.53)",
  "0 64px 128px rgba(0,0,0,0.79), 0 32px 64px rgba(0,0,0,0.54)",
  "0 68px 136px rgba(0,0,0,0.80), 0 34px 68px rgba(0,0,0,0.55)",
  "0 72px 144px rgba(0,0,0,0.81), 0 36px 72px rgba(0,0,0,0.56)",
  "0 76px 152px rgba(0,0,0,0.82), 0 38px 76px rgba(0,0,0,0.57)",
  "0 80px 160px rgba(0,0,0,0.83), 0 40px 80px rgba(0,0,0,0.58)",
  "0 84px 168px rgba(0,0,0,0.84), 0 42px 84px rgba(0,0,0,0.59)",
  "0 88px 176px rgba(0,0,0,0.85), 0 44px 88px rgba(0,0,0,0.60)",
];
