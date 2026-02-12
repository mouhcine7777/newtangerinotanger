/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'export', // Enables static export
  images: {
    unoptimized: true, // Disables Image Optimization API
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during build
  },
};

module.exports = nextConfig;