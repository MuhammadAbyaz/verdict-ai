import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ["/", "/login", "/register"];

// Define routes that should redirect if user is already authenticated
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is authenticated by looking for the auth cookie
  const authToken = request.cookies.get("auth_token")?.value;
  const isAuthenticated = !!authToken;

  // Case 1: User is trying to access auth routes (login/register) while already logged in
  if (isAuthenticated && authRoutes.some((route) => pathname === route)) {
    // Redirect to main app page if already logged in
    return NextResponse.redirect(new URL("/courses", request.url));
  }

  // Case 2: User is trying to access a protected route without being authenticated
  if (!isAuthenticated && !publicRoutes.some((route) => pathname === route)) {
    // Store the original url to redirect back after login
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g. robots.txt, images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico)).*)",
  ],
};
