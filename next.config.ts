import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only — fast to encode on a Starter instance (AVIF is CPU-heavy).
    formats: ["image/webp"],
    qualities: [60, 70, 80],
    minimumCacheTTL: 2_592_000, // 30 days — cache optimized images, fewer re-encodes
  },
};

export default nextConfig;
