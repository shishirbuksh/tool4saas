import React from "react";
import {
  Abc as AbcIcon,
  AccountBalance as AccountBalanceIcon,
  AttachFile as AttachFileIcon,
  AttachMoney as AttachMoneyIcon,
  BarChart as BarChartIcon,
  BuildOutlined as BuildOutlinedIcon,
  Cake as CakeIcon,
  CalendarToday as CalendarTodayIcon,
  Casino as CasinoIcon,
  Code as CodeIcon,
  ColorLens as ColorLensIcon,
  Contrast as ContrastIcon,
  CreditCard as CreditCardIcon,
  DataObject as DataObjectIcon,
  DateRange as DateRangeIcon,
  Description as DescriptionIcon,
  Difference as DifferenceIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  FindReplace as FindReplaceIcon,
  Fingerprint as FingerprintIcon,
  FitnessCenter as FitnessCenterIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Gradient as GradientIcon,
  Html as HtmlIcon,
  Http as HttpIcon,
  Image as ImageIcon,
  Key as KeyIcon,
  Link as LinkIcon,
  LocalOffer as LocalOfferIcon,
  Markunread as MarkunreadIcon,
  Notes as NotesIcon,
  Numbers as NumbersIcon,
  Palette as PaletteIcon,
  Percent as PercentIcon,
  PhotoSizeSelectLarge as PhotoSizeSelectLargeIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Public as PublicIcon,
  QrCode2 as QrCode2Icon,
  ReceiptLong as ReceiptLongIcon,
  Replay as ReplayIcon,
  Restaurant as RestaurantIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon,
  Sell as SellIcon,
  Shuffle as ShuffleIcon,
  Spellcheck as SpellcheckIcon,
  Straighten as StraightenIcon,
  Subject as SubjectIcon,
  TableChart as TableChartIcon,
  Tag as TagIcon,
  TextSnippet as TextSnippetIcon,
  Timer as TimerIcon,
  Toll as TollIcon,
  Transform as TransformIcon,
  VerifiedUser as VerifiedUserIcon,
  VolumeUp as VolumeUpIcon,
  VpnKey as VpnKeyIcon,
} from "@/components/ds/icons";
import type { IconName } from "@/lib/tools/icons";
import type { LiteTool } from "@/lib/tools/catalog-lite";

type CardIcon = React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;

const ICONS: Record<IconName, CardIcon> = {
  BuildOutlined: BuildOutlinedIcon,
  ReceiptLong: ReceiptLongIcon,
  QrCode2: QrCode2Icon,
  Description: DescriptionIcon,
  TextSnippet: TextSnippetIcon,
  Key: KeyIcon,
  DataObject: DataObjectIcon,
  Subject: SubjectIcon,
  Image: ImageIcon,
  Notes: NotesIcon,
  Straighten: StraightenIcon,
  Cake: CakeIcon,
  ColorLens: ColorLensIcon,
  Code: CodeIcon,
  Link: LinkIcon,
  Difference: DifferenceIcon,
  Fingerprint: FingerprintIcon,
  LocalOffer: LocalOfferIcon,
  Shuffle: ShuffleIcon,
  FormatListNumbered: FormatListNumberedIcon,
  Transform: TransformIcon,
  Tag: TagIcon,
  Percent: PercentIcon,
  Schedule: ScheduleIcon,
  Html: HtmlIcon,
  FindReplace: FindReplaceIcon,
  VpnKey: VpnKeyIcon,
  TableChart: TableChartIcon,
  DateRange: DateRangeIcon,
  FitnessCenter: FitnessCenterIcon,
  Restaurant: RestaurantIcon,
  Contrast: ContrastIcon,
  Replay: ReplayIcon,
  BarChart: BarChartIcon,
  VolumeUp: VolumeUpIcon,
  Http: HttpIcon,
  Spellcheck: SpellcheckIcon,
  Numbers: NumbersIcon,
  Gradient: GradientIcon,
  Markunread: MarkunreadIcon,
  Abc: AbcIcon,
  AttachFile: AttachFileIcon,
  EmojiEmotions: EmojiEmotionsIcon,
  Palette: PaletteIcon,
  AccountBalance: AccountBalanceIcon,
  Public: PublicIcon,
  Sell: SellIcon,
  CreditCard: CreditCardIcon,
  VerifiedUser: VerifiedUserIcon,
  PhotoSizeSelectLarge: PhotoSizeSelectLargeIcon,
  Timer: TimerIcon,
  Casino: CasinoIcon,
  Toll: TollIcon,
  AttachMoney: AttachMoneyIcon,
  CalendarToday: CalendarTodayIcon,
  Search: SearchIcon,
  PictureAsPdf: PictureAsPdfIcon,
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
  const Icon = ICONS[tool.icon] ?? ICONS.BuildOutlined;

  return (
    <a
      href={`/${tool.slug}`}
      aria-label={`Open ${tool.title} tool`}
      className={`card group relative h-full overflow-hidden border border-base-300 bg-base-100 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-base-content/20 hover:shadow-[0_12px_32px_rgba(17,17,17,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content active:scale-[0.99] ${
        dense ? "rounded-xl" : "rounded-xl"
      }`}
      style={{ contentVisibility: "auto", containIntrinsicSize: dense ? "0 96px" : "0 220px" }}
    >
      <div className={`card-body flex ${dense ? "flex-row items-center gap-3 p-3.5" : "flex-col gap-0 p-5 sm:p-6"}`}>
        <span
          aria-hidden="true"
          className="flex shrink-0 items-center justify-center rounded-xl border border-black/5 bg-[var(--tint-bg)] text-[var(--tint-fg)] dark:border-white/10 dark:bg-white/5 dark:text-base-content"
          style={
            {
              "--tint-bg": tint.bg,
              "--tint-fg": tint.fg,
              width: dense ? 38 : 52,
              height: dense ? 38 : 52,
            } as React.CSSProperties
          }
        >
          <Icon size={dense ? 20 : 26} />
        </span>

        <div className={dense ? "min-w-0" : "mt-4"}>
          <h3
            className={`m-0 line-clamp-2 text-balance font-semibold tracking-[-0.015em] text-base-content ${
              dense ? "text-[0.9375rem] leading-[1.3]" : "text-[1.0625rem] leading-[1.35] sm:text-[1.1875rem]"
            }`}
          >
            {tool.title}
          </h3>
          <p
            className={`m-0 text-base-content/60 ${
              dense
                ? "mt-0.5 line-clamp-1 text-[0.8125rem] leading-[1.4] max-sm:hidden"
                : "mt-1.5 line-clamp-2 text-[0.875rem] leading-[1.5]"
            }`}
          >
            {tool.short}
          </p>
        </div>
      </div>
    </a>
  );
}
