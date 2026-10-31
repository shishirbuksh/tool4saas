
import { useEffect, type ReactNode } from "react";

type ScriptProps = {
  id?: string;
  src?: string;
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload" | "worker";
  async?: boolean;
  defer?: boolean;
  crossOrigin?: "anonymous" | "use-credentials" | "";
  nonce?: string;
  children?: ReactNode;
  dangerouslySetInnerHTML?: { __html: string };
};

// next/script replacement: append the tag once on mount. Consent-gated loaders
// only render this component after consent, so the effect order is the gate.
export default function Script({
  id,
  src,
  async,
  defer,
  crossOrigin,
  nonce,
  children,
  dangerouslySetInnerHTML,
}: ScriptProps) {
  useEffect(() => {
    if (id && document.getElementById(id)) return;
    const script = document.createElement("script");
    if (id) script.id = id;
    if (src) script.src = src;
    if (async) script.async = true;
    if (defer) script.defer = true;
    if (crossOrigin) script.crossOrigin = crossOrigin;
    if (nonce) script.nonce = nonce;
    if (dangerouslySetInnerHTML?.__html) script.text = dangerouslySetInnerHTML.__html;
    else if (typeof children === "string") script.text = children;
    document.head.appendChild(script);
  }, [id, src, async, defer, crossOrigin, nonce, children, dangerouslySetInnerHTML]);

  return null;
}
