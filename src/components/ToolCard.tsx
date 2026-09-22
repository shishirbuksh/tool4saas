"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import Link from "next/link";

const LinkWrapper = React.forwardRef<HTMLAnchorElement, any>((props, ref) => (
  // @ts-expect-error - MUI passes href dynamically
  <Link ref={ref} {...props} />
));

import AbcIcon from "@mui/icons-material/Abc";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import CakeIcon from "@mui/icons-material/Cake";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CasinoIcon from "@mui/icons-material/Casino";
import CodeIcon from "@mui/icons-material/Code";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ContrastIcon from "@mui/icons-material/Contrast";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DescriptionIcon from "@mui/icons-material/Description";
import DifferenceIcon from "@mui/icons-material/Difference";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import GradientIcon from "@mui/icons-material/Gradient";
import HtmlIcon from "@mui/icons-material/Html";
import HttpIcon from "@mui/icons-material/Http";
import ImageIcon from "@mui/icons-material/Image";
import KeyIcon from "@mui/icons-material/Key";
import LinkIcon from "@mui/icons-material/Link";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import NotesIcon from "@mui/icons-material/Notes";
import NumbersIcon from "@mui/icons-material/Numbers";
import PaletteIcon from "@mui/icons-material/Palette";
import PercentIcon from "@mui/icons-material/Percent";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PublicIcon from "@mui/icons-material/Public";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ReplayIcon from "@mui/icons-material/Replay";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SearchIcon from "@mui/icons-material/Search";
import SellIcon from "@mui/icons-material/Sell";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import StraightenIcon from "@mui/icons-material/Straighten";
import SubjectIcon from "@mui/icons-material/Subject";
import TableChartIcon from "@mui/icons-material/TableChart";
import TagIcon from "@mui/icons-material/Tag";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TimerIcon from "@mui/icons-material/Timer";
import TollIcon from "@mui/icons-material/Toll";
import TransformIcon from "@mui/icons-material/Transform";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import type { SxProps } from "@mui/material";
import type { Tool, IconName } from "@/lib/tools";

// Static imports (tree-shaken via next.config optimizePackageImports for
// @mui/icons-material): icons ride shared chunks — no 57x dynamic() waterfall.
// IconFallback reserves 34px for unknown-icon / future lazy paths → no CLS on card grids.
function IconFallback() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        width: 34,
        height: 34,
        borderRadius: "12px",
        bgcolor: "rgba(0,0,0,0.06)",
      }}
    />
  );
}


const ICONS: Record<IconName, React.ComponentType<{ sx?: SxProps }>> = {
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

function Icon({ name }: { name: IconName }) {
  const Cmp = ICONS[name] ?? ICONS.BuildOutlined;
  // IconFallback retained as 34px CLS guard (unknown-icon / future lazy paths).
  if (!Cmp) return <IconFallback />;
  return <Cmp sx={{ fontSize: 34 }} />;
}

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

export default function ToolCard({ tool }: { tool: Tool }) {
  const tint = CATEGORY_TINTS[tool.category] ?? DEFAULT_TINT;
  return (
    <Card
      sx={{
        height: "100%",
        // Perf: offscreen cards skip rendering; intrinsic size reserves layout (no CLS).
        // NOTE: no loading="lazy"/fetchpriority here — Card has no <img>; icons are
        // static imports (shared chunks) and card navigation uses Next <Link> prefetch.
        // No rel="prefetch" — Next.js <Link> prefetches in-viewport routes by default.
        contentVisibility: "auto",
        containIntrinsicSize: "0 280px",
        transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1), border-color 200ms cubic-bezier(0.16,1,0.3,1)",
        "&:hover": {
          // --motion-hover-lift: -2px + scale(1.01) spring (theme token — not -6px)
          transform: "translateY(-2px) scale(1.01)",
          borderColor: "rgba(0,0,0,0.12)",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.06), 0 12px 32px rgba(34,29,29,0.08), 0 4px 12px rgba(34,29,29,0.05)",
          'html[data-theme="dark"] &': {
            borderColor: "rgba(255,255,255,0.15)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
          },
        },
        "&:active": { transform: "scale(0.99)", transitionDuration: "100ms" },
      }}
    >
      <CardActionArea
        component={LinkWrapper}
        href={`/${tool.slug}`}
        aria-label={`Open ${tool.title} tool`}
        sx={{
          height: "100%",
          borderRadius: "16px",
          "&:focus-visible": {
            outline: "3px solid",
            outlineColor: "primary.main",
            outlineOffset: 2,
            boxShadow: "0 0 0 5px var(--focus-ring-offset, #FCFCF9), 0 0 0 8px var(--focus-ring, #111111)",
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            aria-hidden="true"
            sx={{
              width: 56,
              height: 56,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: tint.bg,
              color: tint.fg,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
              "& > *": { color: tint.fg },
              mb: { xs: 1.5, sm: 2 },
            }}
          >
            <Icon name={tool.icon} />
          </Box>
          <Typography
            component="h3"
            variant="h5"
            sx={{
              mb: 1,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              fontWeight: 600,
              textWrap: "balance",
            }}
          >
            {tool.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
              letterSpacing: "-0.015em",
              textWrap: "pretty",
              fontVariantNumeric: "tabular-nums",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {tool.short}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
