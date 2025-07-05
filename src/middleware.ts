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
    path === "/auth/forgot-password/email" ||
    path === "/auth/forgot-password/otp" ||
    path === "/auth/forgot-password/password" ||
    path === "/auth/reset-password/email" ||
    path === "/auth/reset-password/otp" ||
    path === "/auth/reset-password/password" ||
    path === "/auth/home";

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
    "/auth/forgot-password/:path*",
    "/auth/reset-password/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/profile/:path*",
  ],
};
