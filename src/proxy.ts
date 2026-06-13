import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has("admin_session");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (isLoginPage && !hasSession) {
    return NextResponse.next();
  }

  if (!hasSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginPage && hasSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
