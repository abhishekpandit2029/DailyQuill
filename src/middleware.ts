import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/home" || path === "/forgot-password";

  const token = request.cookies.get("token")?.value || "";
  // const isSubscribed = request.cookies.get("isSubscribed")?.value || "";

  if (path === "/") {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/forgot-password", "/dashboard/:path*", "/settings/:path*", "/profile/:path*", "/payment/:path*", "/payment/checkout"],
};
