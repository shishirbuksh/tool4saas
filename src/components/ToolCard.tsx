"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import DescriptionIcon from "@mui/icons-material/Description";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import KeyIcon from "@mui/icons-material/Key";
import DataObjectIcon from "@mui/icons-material/DataObject";
import SubjectIcon from "@mui/icons-material/Subject";
import ImageIcon from "@mui/icons-material/Image";
import NotesIcon from "@mui/icons-material/Notes";
import StraightenIcon from "@mui/icons-material/Straighten";
import CakeIcon from "@mui/icons-material/Cake";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CodeIcon from "@mui/icons-material/Code";
import LinkIcon from "@mui/icons-material/Link";
import DifferenceIcon from "@mui/icons-material/Difference";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TransformIcon from "@mui/icons-material/Transform";
import TagIcon from "@mui/icons-material/Tag";
import PercentIcon from "@mui/icons-material/Percent";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HtmlIcon from "@mui/icons-material/Html";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import TableChartIcon from "@mui/icons-material/TableChart";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ContrastIcon from "@mui/icons-material/Contrast";
import ReplayIcon from "@mui/icons-material/Replay";
import BarChartIcon from "@mui/icons-material/BarChart";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import HttpIcon from "@mui/icons-material/Http";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import NumbersIcon from "@mui/icons-material/Numbers";
import GradientIcon from "@mui/icons-material/Gradient";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import AbcIcon from "@mui/icons-material/Abc";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PaletteIcon from "@mui/icons-material/Palette";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PublicIcon from "@mui/icons-material/Public";
import SellIcon from "@mui/icons-material/Sell";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";
import TimerIcon from "@mui/icons-material/Timer";
import CasinoIcon from "@mui/icons-material/Casino";
import TollIcon from "@mui/icons-material/Toll";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import type { SxProps } from "@mui/material";
import type { Tool } from "@/lib/tools";

const ICONS: Record<string, React.ComponentType<{ sx?: SxProps }>> = {
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

function Icon({ name }: { name: string }) {
  const Cmp = ICONS[name] ?? BuildOutlinedIcon;
  return <Cmp sx={{ fontSize: 34 }} />;
}

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
      <Card
      sx={{
        height: "100%",
        contentVisibility: "auto",
        containIntrinsicSize: "0 280px",
      }}
    >
      <CardActionArea component={Link} href={`/${tool.slug}`} sx={{ height: "100%" }}>
        <CardContent sx={{ p: 3 }}>
           <Box
            aria-hidden="true"
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "& > *": { color: "primary.contrastText" },
              mb: 2,
              boxShadow: "0 8px 20px rgba(99,102,241,0.35)",
            }}
          >
            <Icon name={tool.icon} />
          </Box>
          <Typography
            component="h3"
            variant="h5"
            sx={{
              mb: 1,
            }}
          >
            {tool.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              textWrap: "pretty",
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
