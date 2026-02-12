import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: 'export', // Enables static export
  images: {
    unoptimized: true, // Disables Image Optimization API
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during build
  }
};

export default nextConfig;