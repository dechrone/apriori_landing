import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/simulations(.*)",
  "/audiences(.*)",
  "/product-context(.*)",
  "/assets(.*)",
  "/insights(.*)",
  "/settings(.*)",
  "/audit(.*)"
]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    const { userId } = await auth();
    const { pathname } = req.nextUrl;

    // Bypass authentication in development mode for local setup
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment) {
      // Allow access to all routes without authentication in development
      return NextResponse.next();
    }

    // Redirect authenticated users from landing page to dashboard
    if (userId && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Protect app routes
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  },
  {
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
