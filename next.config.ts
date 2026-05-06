import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
