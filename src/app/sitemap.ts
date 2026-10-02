import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/links";

// Static export: the sitemap is generated once at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/guide`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
