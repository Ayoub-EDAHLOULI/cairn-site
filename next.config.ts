import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static site: `next build` writes the whole site to `out/`.
  output: "export",
  images: {
    // The image optimizer needs a server; a static export has none.
    unoptimized: true,
  },
};

export default nextConfig;
