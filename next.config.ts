import type { NextConfig } from "next";
import { SITE_URL } from "./src/content/links";

// Guard: SITE_URL must never be the placeholder in a deploy. Local builds warn, deploy builds
// (CI=true on GitHub Actions) fail, so a placeholder can't reach canonical URLs, previews or the sitemap.
if (SITE_URL.includes("example")) {
  const message = `SITE_URL is still the placeholder (${SITE_URL}). Set the real domain in src/content/links.ts.`;
  if (process.env.CI) throw new Error(message);
  console.warn(`⚠ ${message}`);
}

const nextConfig: NextConfig = {
  // Pure static site: `next build` writes the whole site to `out/`.
  output: "export",
  // Every page is exported as <path>/index.html and linked as "<path>/". Static hosts (GitHub Pages)
  // then serve /guide/ correctly; without it, /guide can hit the exported guide/ data folder instead.
  trailingSlash: true,
  images: {
    // The image optimizer needs a server; a static export has none.
    unoptimized: true,
  },
};

export default nextConfig;
