import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack: dramatically faster HMR and compilation in dev.
  // Replaces the default webpack dev compiler — no config changes needed.
  turbopack: {},

  compress: true,
  poweredByHeader: false,

  images: {
    // Serve AVIF first (smallest), fallback to WebP. Skips JPEG/PNG on modern browsers.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // NOTE: experimental.optimizeCss was removed.
  // It requires the `critters` package (a Vercel-only build tool) which is NOT
  // installed. Having it enabled without critters causes a silent dev-server
  // crash / extremely slow startup (Next.js falls back to webpack's slow path).
};

export default nextConfig;
