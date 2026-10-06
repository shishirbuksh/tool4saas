"use client";

import React from "react";
import Link, { type LinkProps } from "next/link";

type MuiNextLinkProps = LinkProps & {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Single shared MUI-compatible Next.js link wrapper.
 * Replaces 4 verbatim forwardRef copies (Header/ToolCard/error/not-found).
 */
const MuiNextLink = React.forwardRef<HTMLAnchorElement, MuiNextLinkProps>((props, ref) => (
  <Link ref={ref} {...props} />
));
MuiNextLink.displayName = "MuiNextLink";

export default MuiNextLink;
