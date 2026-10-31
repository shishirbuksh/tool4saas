
import { useEffect, useState, type ComponentType } from "react";

type DynamicOptions = {
  ssr?: boolean;
  loading?: ComponentType<Record<string, unknown>>;
};

// Minimal next/dynamic replacement: render the loading placeholder during SSR
// and the first client render, then swap in the real component after the
// module resolves. Used for browser-only widgets (QR canvas, menus, embeds).
export default function dynamic<P = any>(
  loader: () => Promise<any>,
  options: DynamicOptions = {},
) {
  function DynamicComponent(props: P) {
    const [Component, setComponent] = useState<ComponentType<P> | null>(null);

    useEffect(() => {
      let alive = true;
      loader().then((mod) => {
        if (!alive) return;
        const resolved = (
          typeof mod === "function" ? mod : (mod as { default?: ComponentType<P> }).default
        ) as ComponentType<P> | undefined;
        if (resolved) setComponent(() => resolved);
      });
      return () => {
        alive = false;
      };
    }, []);

    if (!Component) {
      const Loading = options.loading;
      return Loading ? <Loading {...(props as Record<string, unknown>)} /> : null;
    }
    return <Component {...(props as any)} />;
  }

  DynamicComponent.displayName = "DynamicComponent";
  return DynamicComponent;
}
