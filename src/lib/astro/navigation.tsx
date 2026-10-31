
import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

// Astro is an MPA: links are real anchors. These shims keep the existing React
// components (which were written against next/link + next/navigation) working
// without pulling Next.js back in. Client-side transitions are intentionally
// not emulated; a full navigation is correct and cache-friendly here.

const PathnameContext = createContext<string>("/");

export function PathnameProvider({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  return <PathnameContext.Provider value={value}>{children}</PathnameContext.Provider>;
}

export function usePathname(): string {
  return useContext(PathnameContext);
}

type Router = {
  push: (href: string | URL) => void;
  replace: (href: string | URL) => void;
  back: () => void;
  forward: () => void;
  refresh: () => void;
  prefetch: (href: string | URL) => void;
};

export function useRouter(): Router {
  return useMemo(
    () => ({
      push: (href) => {
        window.location.href = String(href);
      },
      replace: (href) => {
        window.location.replace(String(href));
      },
      back: () => window.history.back(),
      forward: () => window.history.forward(),
      refresh: () => window.location.reload(),
      prefetch: () => {},
    }),
    [],
  );
}

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  locale?: string | false;
  passHref?: boolean;
  legacyBehavior?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, prefetch: _prefetch, replace: _replace, scroll: _scroll, locale: _locale, passHref: _passHref, legacyBehavior: _legacyBehavior, ...rest },
  ref,
) {
  return <a ref={ref} href={href} {...rest} />;
});

export default Link;
