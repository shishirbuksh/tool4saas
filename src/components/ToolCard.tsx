import React from "react";
import { AlignLeftIcon, BarChart3Icon, CakeIcon, CalendarRangeIcon, CaseSensitiveIcon, ClockIcon, CodeIcon, CoinsIcon, ContrastIcon, CreditCardIcon, DiffIcon, DollarSignIcon, DumbbellIcon, FileCodeIcon, FileJsonIcon, FileTextIcon, FingerprintIcon, GlobeIcon, HashIcon, ImageIcon, KeyIcon, LandmarkIcon, LayersIcon, LinkIcon, ListOrderedIcon, MailIcon, Maximize2Icon, PaletteIcon, PaperclipIcon, PercentIcon, QrCodeIcon, ReceiptIcon, ReplaceIcon, RulerIcon, SearchIcon, ShieldCheckIcon, ShuffleIcon, SmileIcon, SpellCheckIcon, Table2Icon, TagIcon, TimerIcon, UtensilsIcon, Volume2Icon } from "@/components/ui/icons";
import { ICON_NAMES, type IconName } from "@/lib/tools/icons";
import type { LiteTool } from "@/lib/tools/catalog-lite";

type CardIcon = React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;

const ICONS: Record<IconName, CardIcon> = {
  AlignLeft: AlignLeftIcon,
  BarChart3: BarChart3Icon,
  Cake: CakeIcon,
  CalendarRange: CalendarRangeIcon,
  CaseSensitive: CaseSensitiveIcon,
  Clock: ClockIcon,
  Code: CodeIcon,
  Coins: CoinsIcon,
  Contrast: ContrastIcon,
  CreditCard: CreditCardIcon,
  Diff: DiffIcon,
  DollarSign: DollarSignIcon,
  Dumbbell: DumbbellIcon,
  FileCode: FileCodeIcon,
  FileJson: FileJsonIcon,
  FileText: FileTextIcon,
  Fingerprint: FingerprintIcon,
  Globe: GlobeIcon,
  Hash: HashIcon,
  Image: ImageIcon,
  Key: KeyIcon,
  Landmark: LandmarkIcon,
  Layers: LayersIcon,
  Link: LinkIcon,
  ListOrdered: ListOrderedIcon,
  Mail: MailIcon,
  Maximize2: Maximize2Icon,
  Palette: PaletteIcon,
  Paperclip: PaperclipIcon,
  Percent: PercentIcon,
  QrCode: QrCodeIcon,
  Receipt: ReceiptIcon,
  Replace: ReplaceIcon,
  Ruler: RulerIcon,
  Search: SearchIcon,
  ShieldCheck: ShieldCheckIcon,
  Shuffle: ShuffleIcon,
  Smile: SmileIcon,
  SpellCheck: SpellCheckIcon,
  Table2: Table2Icon,
  Tag: TagIcon,
  Timer: TimerIcon,
  Utensils: UtensilsIcon,
  Volume2: Volume2Icon,
};

const CATEGORY_TINTS: Record<string, { bg: string; fg: string }> = {
  "text-documents": { bg: "#EFF6FF", fg: "#1D4ED8" },
  business: { bg: "#F0FDF4", fg: "#15803D" },
  developer: { bg: "#F5F3FF", fg: "#6D28D9" },
  converters: { bg: "#FEFCE8", fg: "#A16207" },
  generators: { bg: "#FDF2F8", fg: "#BE185D" },
  "images-design": { bg: "#FFF7ED", fg: "#C2410C" },
  pdf: { bg: "#FEF2F2", fg: "#B91C1C" },
  calculators: { bg: "#ECFDF5", fg: "#0F766E" },
  finance: { bg: "#EFF6FF", fg: "#0C4A6E" },
  health: { bg: "#F0FDF4", fg: "#166534" },
  seo: { bg: "#FEFCE8", fg: "#92400E" },
  time: { bg: "#F5F3FF", fg: "#5B21B6" },
};

const DEFAULT_TINT = { bg: "#F5F5F5", fg: "#111111" };

export default function ToolCard({ tool, dense = false }: { tool: LiteTool; dense?: boolean }) {
  const tint = CATEGORY_TINTS[tool.category] ?? DEFAULT_TINT;
  const Icon = ICONS[tool.icon] ?? ICONS[ICON_NAMES[0]];

  return (
    <a
      href={`/${tool.slug}`}
      aria-label={`Open ${tool.title} tool`}
      className={`card group relative h-full overflow-hidden border border-base-300 bg-base-100 no-underline transition-all duration-150 hover:-translate-y-0.5 hover:border-base-content/25 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content active:scale-[0.99] rounded-xl flex flex-col`}
      style={{ contentVisibility: "auto", containIntrinsicSize: dense ? "0 96px" : "0 220px" }}
    >
      <div className={`card-body flex flex-col h-full ${dense ? "gap-2 p-3.5" : "gap-0 p-5"}`}>
        {dense ? (
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex shrink-0 items-center justify-center rounded-lg border border-black/5 bg-[var(--tint-bg)] text-[var(--tint-fg)] dark:border-white/10 dark:bg-white/5 dark:text-base-content"
              style={
                {
                  "--tint-bg": tint.bg,
                  "--tint-fg": tint.fg,
                  width: 38,
                  height: 38,
                } as React.CSSProperties
              }
            >
              <Icon size={20} />
            </span>
            <div className="min-w-0">
              <h3 className="m-0 line-clamp-1 font-semibold text-[0.9375rem] leading-[1.3] tracking-[-0.015em] text-base-content">
                {tool.title}
              </h3>
              <p className="m-0 mt-0.5 line-clamp-1 text-[0.8125rem] leading-[1.4] text-base-content/60">
                {tool.short}
              </p>
            </div>
          </div>
        ) : (
          <>
            <span
              aria-hidden="true"
              className="flex shrink-0 items-center justify-center rounded-lg border border-black/5 bg-[var(--tint-bg)] text-[var(--tint-fg)] dark:border-white/10 dark:bg-white/5 dark:text-base-content"
              style={
                {
                  "--tint-bg": tint.bg,
                  "--tint-fg": tint.fg,
                  width: 44,
                  height: 44,
                } as React.CSSProperties
              }
            >
              <Icon size={22} />
            </span>

            <div className="mt-3.5 min-w-0">
              <h3 className="m-0 line-clamp-2 text-balance font-semibold tracking-[-0.015em] text-base-content text-[1.0625rem] leading-[1.35]">
                {tool.title}
              </h3>
              <p className="m-0 mt-1.5 line-clamp-2 text-[0.84375rem] leading-[1.55] text-base-content/65">
                {tool.short}
              </p>
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between text-[11px] font-medium text-base-content/40 group-hover:text-base-content/75 transition-colors border-t border-base-200/80">
              <span className="uppercase tracking-[0.06em]">Free · In browser</span>
              <span className="text-xs font-semibold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-base-content" aria-hidden="true">→</span>
            </div>
          </>
        )}
      </div>
    </a>
  );
}
