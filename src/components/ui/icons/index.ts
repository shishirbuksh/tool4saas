import React from "react";
import * as Lucide from "lucide-react";

/**
 * Universal Icon factory that renders a Lucide icon or clean SVG fallback.
 * Accepts standard MUI icon props (fontSize, className, style, sx).
 */
export function createIcon(LucideIcon: React.ComponentType<any> | undefined, fallbackName = "Icon") {
  return function IconWrapper({ fontSize, className = "", style, sx, ...props }: any) {
    let size = 20;
    if (fontSize === "small") size = 16;
    else if (fontSize === "large") size = 28;
    else if (fontSize === "inherit") size = 18;

    if (LucideIcon) {
      return React.createElement(LucideIcon, {
        size,
        className: `inline-block ${className}`,
        style,
        ...props,
      });
    }
    return React.createElement(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: `inline-block ${className}`,
        style,
        ...props,
      },
      React.createElement("circle", { cx: "12", cy: "12", r: "10" })
    );
  };
}

// All 91 icons mapped to Lucide or SVG fallback
export const Abc = createIcon(Lucide.CaseSensitive, "Abc");
export const AccountBalance = createIcon(Lucide.Landmark, "AccountBalance");
export const Add = createIcon(Lucide.Plus, "Add");
export const ArrowDropDown = createIcon(Lucide.ChevronDown, "ArrowDropDown");
export const AttachFile = createIcon(Lucide.Paperclip, "AttachFile");
export const AttachMoney = createIcon(Lucide.DollarSign, "AttachMoney");
export const AutoFixHigh = createIcon(Lucide.Wand2, "AutoFixHigh");
export const BarChart = createIcon(Lucide.BarChart3, "BarChart");
export const Brightness4 = createIcon(Lucide.Moon, "Brightness4");
export const Brightness7 = createIcon(Lucide.Sun, "Brightness7");
export const BuildOutlined = createIcon(Lucide.Wrench, "BuildOutlined");
export const Cake = createIcon(Lucide.Cake, "Cake");
export const Calculate = createIcon(Lucide.Calculator, "Calculate");
export const CalendarToday = createIcon(Lucide.Calendar, "CalendarToday");
export const Cancel = createIcon(Lucide.XCircle, "Cancel");
export const Casino = createIcon(Lucide.Dices, "Casino");
export const Check = createIcon(Lucide.Check, "Check");
export const CheckCircle = createIcon(Lucide.CheckCircle2, "CheckCircle");
export const ChevronRight = createIcon(Lucide.ChevronRight, "ChevronRight");
export const Clear = createIcon(Lucide.X, "Clear");
export const Close = createIcon(Lucide.X, "Close");
export const CloudUpload = createIcon(Lucide.UploadCloud, "CloudUpload");
export const Code = createIcon(Lucide.Code, "Code");
export const ColorLens = createIcon(Lucide.Palette, "ColorLens");
export const Compress = createIcon(Lucide.Minimize2, "Compress");
export const ContentCopy = createIcon(Lucide.Copy, "ContentCopy");
export const Contrast = createIcon(Lucide.Contrast, "Contrast");
export const CreditCard = createIcon(Lucide.CreditCard, "CreditCard");
export const DataObject = createIcon(Lucide.FileJson, "DataObject");
export const DateRange = createIcon(Lucide.CalendarRange, "DateRange");
export const Delete = createIcon(Lucide.Trash2, "Delete");
export const Description = createIcon(Lucide.FileText, "Description");
export const Difference = createIcon(Lucide.Diff, "Difference");
export const Download = createIcon(Lucide.Download, "Download");
export const EmailOutlined = createIcon(Lucide.Mail, "EmailOutlined");
export const EmojiEmotions = createIcon(Lucide.Smile, "EmojiEmotions");
export const ExpandLess = createIcon(Lucide.ChevronUp, "ExpandLess");
export const ExpandMore = createIcon(Lucide.ChevronDown, "ExpandMore");
export const FindReplace = createIcon(Lucide.Replace, "FindReplace");
export const Fingerprint = createIcon(Lucide.Fingerprint, "Fingerprint");
export const FitnessCenter = createIcon(Lucide.Dumbbell, "FitnessCenter");
export const FormatListNumbered = createIcon(Lucide.ListOrdered, "FormatListNumbered");
export const Gradient = createIcon(Lucide.Layers, "Gradient");
export const Html = createIcon(Lucide.FileCode, "Html");
export const Http = createIcon(Lucide.Globe, "Http");
export const Image = createIcon(Lucide.Image, "Image");
export const Key = createIcon(Lucide.Key, "Key");
export const Link = createIcon(Lucide.Link, "Link");
export const LocalOffer = createIcon(Lucide.Tag, "LocalOffer");
export const Markunread = createIcon(Lucide.Mail, "Markunread");
export const Menu = createIcon(Lucide.Menu, "Menu");
export const Mic = createIcon(Lucide.Mic, "Mic");
export const Notes = createIcon(Lucide.FileText, "Notes");
export const Numbers = createIcon(Lucide.Hash, "Numbers");
export const Palette = createIcon(Lucide.Palette, "Palette");
export const Percent = createIcon(Lucide.Percent, "Percent");
export const PhotoSizeSelectLarge = createIcon(Lucide.Maximize2, "PhotoSizeSelectLarge");
export const PictureAsPdf = createIcon(Lucide.FileText, "PictureAsPdf");
export const Print = createIcon(Lucide.Printer, "Print");
export const Public = createIcon(Lucide.Globe, "Public");
export const QrCode2 = createIcon(Lucide.QrCode, "QrCode2");
export const ReceiptLong = createIcon(Lucide.Receipt, "ReceiptLong");
export const Refresh = createIcon(Lucide.RotateCw, "Refresh");
export const Replay = createIcon(Lucide.RotateCcw, "Replay");
export const Restaurant = createIcon(Lucide.Utensils, "Restaurant");
export const Schedule = createIcon(Lucide.Clock, "Schedule");
export const Search = createIcon(Lucide.Search, "Search");
export const Sell = createIcon(Lucide.Tag, "Sell");
export const Shuffle = createIcon(Lucide.Shuffle, "Shuffle");
export const Spellcheck = createIcon(Lucide.SpellCheck, "Spellcheck");
export const Star = createIcon(Lucide.Star, "Star");
export const StarBorder = createIcon(Lucide.Star, "StarBorder");
export const Stop = createIcon(Lucide.Square, "Stop");
export const Straighten = createIcon(Lucide.Ruler, "Straighten");
export const Subject = createIcon(Lucide.AlignLeft, "Subject");
export const SwapHoriz = createIcon(Lucide.ArrowLeftRight, "SwapHoriz");
export const SwapVert = createIcon(Lucide.ArrowUpDown, "SwapVert");
export const TableChart = createIcon(Lucide.Table2, "TableChart");
export const TableView = createIcon(Lucide.Table, "TableView");
export const Tag = createIcon(Lucide.Tag, "Tag");
export const TextSnippet = createIcon(Lucide.FileText, "TextSnippet");
export const Timer = createIcon(Lucide.Timer, "Timer");
export const Toll = createIcon(Lucide.Coins, "Toll");
export const Transform = createIcon(Lucide.ArrowLeftRight, "Transform");
export const Translate = createIcon(Lucide.Languages, "Translate");
export const UnfoldLess = createIcon(Lucide.ChevronsDownUp, "UnfoldLess");
export const UnfoldMore = createIcon(Lucide.ChevronsUpDown, "UnfoldMore");
export const VerifiedUser = createIcon(Lucide.ShieldCheck, "VerifiedUser");
export const VolumeUp = createIcon(Lucide.Volume2, "VolumeUp");
export const VpnKey = createIcon(Lucide.Key, "VpnKey");
export const Warning = createIcon(Lucide.AlertTriangle, "Warning");

const all = {
  Abc, AccountBalance, Add, ArrowDropDown, AttachFile, AttachMoney, AutoFixHigh,
  BarChart, Brightness4, Brightness7, BuildOutlined, Cake, Calculate, CalendarToday,
  Cancel, Casino, Check, CheckCircle, ChevronRight, Clear, Close, CloudUpload,
  Code, ColorLens, Compress, ContentCopy, Contrast, CreditCard, DataObject,
  DateRange, Delete, Description, Difference, Download, EmailOutlined, EmojiEmotions,
  ExpandLess, ExpandMore, FindReplace, Fingerprint, FitnessCenter, FormatListNumbered,
  Gradient, Html, Http, Image, Key, Link, LocalOffer, Markunread, Menu, Mic,
  Notes, Numbers, Palette, Percent, PhotoSizeSelectLarge, PictureAsPdf, Print,
  Public, QrCode2, ReceiptLong, Refresh, Replay, Restaurant, Schedule, Search,
  Sell, Shuffle, Spellcheck, Star, StarBorder, Stop, Straighten, Subject,
  SwapHoriz, SwapVert, TableChart, TableView, Tag, TextSnippet, Timer, Toll,
  Transform, Translate, UnfoldLess, UnfoldMore, VerifiedUser, VolumeUp, VpnKey, Warning
};

export default all;
