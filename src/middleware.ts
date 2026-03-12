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
  "/simulations/v1(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    const { userId } = await auth();
    const { pathname } = req.nextUrl;
    const hostname = req.nextUrl.hostname;

    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

    if (userId && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isProtectedRoute(req) && !isPublicRoute(req) && !isLocalhost) {
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
