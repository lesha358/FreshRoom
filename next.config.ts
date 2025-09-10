import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    forceSwcTransforms: false,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
