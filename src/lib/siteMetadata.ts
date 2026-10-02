// Metadata shared by both root layouts, and the landing pages' per-language metadata.
import type { Metadata, Viewport } from "next";
import { dictionaries, homePath, landingAlternates, type Locale } from "@/content/i18n";
import { SITE_URL } from "@/content/links";
import { SITE_NAME, ogImage } from "@/content/meta";

/** Defaults for every page. Absolute URLs (canonical, Open Graph) resolve against SITE_URL. */
export function baseMetadata(locale: Locale): Metadata {
  const t = dictionaries[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: SITE_NAME,
    authors: [{ name: "Ayoub Edahlouli", url: "https://ayoubedahlouli.com" }],
    openGraph: { siteName: SITE_NAME, type: "website", locale: t.ogLocale },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
  };
}

export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "dark",
};

/** A landing page's metadata: its own title, canonical URL, language alternates and preview image. */
export function landingMetadata(locale: Locale): Metadata {
  const t = dictionaries[locale];
  const path = homePath(locale);
  const image = ogImage(`${path}og.png`, t.meta.ogHeadline);
  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    alternates: { canonical: path, languages: landingAlternates },
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      locale: t.ogLocale,
      alternateLocale: Object.values(dictionaries)
        .filter((d) => d.locale !== locale)
        .map((d) => d.ogLocale),
      url: path,
      title: t.meta.title,
      description: t.meta.description,
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}
