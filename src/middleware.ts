import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Canonical-host slash normalization: redirect trailing-slash page URLs
// (e.g. /about/ → /about) with 308 so crawlers see one 200 per page.
// Canonicals/sitemap all use slashless form; without this both variants 200.
// Skips files (with extensions), API routes and _next internals.
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (
    pathname.length > 1 &&
    pathname.endsWith("/") &&
    !pathname.includes(".")
  ) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    url.search = search;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
