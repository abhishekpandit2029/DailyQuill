import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/auth/login/email" ||
    path === "/auth/login/otp" ||
    path === "/auth/login/password" ||
    path === "/auth/signup/email" ||
    path === "/auth/signup/otp" ||
    path === "/auth/signup/password" ||
    path === "/auth/home" ||
    path === "/auth/forgot-password";

  const token = request.cookies.get("token")?.value || "";

  if (path === "/") {
    return NextResponse.redirect(new URL("/auth/home", request.nextUrl));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/auth/home", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login/email", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/auth/login/:path*",
    "/auth/signup/:path*",
    "/auth/forgot-password",
    "/dashboard/:path*",
    "/settings/:path*",
    "/profile/:path*",
  ],
};
