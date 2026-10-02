import type { MetadataRoute } from "next";
import { landingAlternates } from "@/content/i18n";
import { SITE_URL } from "@/content/links";

// Static export: the sitemap is generated once at build time.
export const dynamic = "force-static";

const absolute = (path: string) => `${SITE_URL}${path}`;

/** Both landing pages list each other as language alternates (hreflang). The guide is English-only. */
const landingLanguages = Object.fromEntries(
  Object.entries(landingAlternates).map(([lang, path]) => [lang, absolute(path)]),
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absolute("/"), changeFrequency: "monthly", priority: 1, alternates: { languages: landingLanguages } },
    { url: absolute("/fr/"), changeFrequency: "monthly", priority: 0.9, alternates: { languages: landingLanguages } },
    { url: absolute("/guide/"), changeFrequency: "monthly", priority: 0.8 },
  ];
}
