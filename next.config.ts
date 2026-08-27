import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  // This ensures your CSS and JS load correctly on GitHub Pages
  basePath: isProd ? '/RYM-Survey' : '',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;