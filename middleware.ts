import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/resume-builder", "/resume-enhancer"];

  // Check if the request is for a protected route
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    // If no token is found, redirect to the login page
    if (!token) {
      const loginUrl = new URL("/auth?tab=login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}
