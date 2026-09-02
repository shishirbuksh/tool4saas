"use client";

import dynamic from "next/dynamic";

const AdSlotInner = dynamic(() => import("./AdSlot"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  slot: string;
  format?: "auto" | "rectangle" | "leaderboard" | "inline";
  className?: string;
  label?: string;
};

export default function AdSlotLazy(props: Props) {
  return <AdSlotInner {...props} />;
}
