import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the Turbopack workspace root to this app's directory (landing/). The
  // repo is a polyglot monorepo (backend/ + landing/); without an explicit
  // root, a stray lockfile elsewhere makes Next infer the wrong root and fail
  // to resolve workspace-local deps like `tailwindcss` ("Can't resolve
  // 'tailwindcss'"). process.cwd() is the landing/ dir for the `npm run
  // dev|build` scripts, which always run from this package.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "img.logo.dev" },
      // Supabase Storage public URLs follow `{project-ref}.supabase.co/storage/v1/object/public/...`.
      // The wildcard whitelists every project ref so dev / staging / prod all work.
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async redirects() {
    return [
      { source: "/signup", destination: "/joinwaitlist?from=signup", permanent: false },
      { source: "/signup/:path*", destination: "/joinwaitlist?from=signup", permanent: false },
      { source: "/sign-up", destination: "/joinwaitlist?from=signup", permanent: false },
      { source: "/sign-up/:path*", destination: "/joinwaitlist?from=signup", permanent: false },
    ];
  },
};

export default nextConfig;
