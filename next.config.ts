import type { NextConfig } from "next";
import { SITE_URL } from "./src/content/links";

// The production domain is decided in step 10. Until then SITE_URL is a placeholder: local builds
// warn, deploy builds (CI sets CI=true, on GitHub Actions and Vercel alike) fail, so the placeholder
// can never reach canonical URLs, link previews or the sitemap.
if (SITE_URL.includes("example")) {
  const message = `SITE_URL is still the placeholder (${SITE_URL}). Set the real domain in src/content/links.ts.`;
  if (process.env.CI) throw new Error(message);
  console.warn(`⚠ ${message}`);
}

const nextConfig: NextConfig = {
  // Pure static site: `next build` writes the whole site to `out/`.
  output: "export",
  images: {
    // The image optimizer needs a server; a static export has none.
    unoptimized: true,
  },
};

export default nextConfig;
