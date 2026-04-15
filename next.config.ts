import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "img.logo.dev" },
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
