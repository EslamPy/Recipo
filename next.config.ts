import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    nodeMiddleware: true,
  },
  // Skip static generation for dynamic routes during build
  output: 'standalone',
  // Disable static optimization to prevent build-time database calls
  trailingSlash: false,
};

export default nextConfig;
