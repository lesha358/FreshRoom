import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    forceSwcTransforms: false,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
