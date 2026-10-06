import { auth } from "@/auth";
import { NextResponse } from "next/server";

const publicPaths = ["/", "/login", "/api/auth"];

function registrationEnabled() {
  return process.env.ALLOW_REGISTRATION !== "false";
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/register") && !registrationEnabled()) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  const isPublic =
    publicPaths.some((p) => pathname.startsWith(p)) ||
    (pathname.startsWith("/register") && registrationEnabled());
  const isLoggedIn = !!req.auth?.user?.id;

  if (!isLoggedIn && !isPublic) {
    const url = new URL("/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    const role = req.auth?.user?.role;
    return NextResponse.redirect(
      new URL(role === "ADMIN" ? "/admin" : "/employee", req.nextUrl.origin),
    );
  }

  if (isLoggedIn && pathname.startsWith("/admin") && req.auth?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/employee", req.nextUrl.origin));
  }

  if (isLoggedIn && pathname.startsWith("/employee") && req.auth?.user?.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
