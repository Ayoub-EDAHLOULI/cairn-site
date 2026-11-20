import type { Metadata } from "next";
import { dictionaries } from "@/content/i18n";
import { SITE_NAME, ogImage, privacyMeta } from "@/content/meta";
import { PrivacyPolicy } from "@/components/privacy/PrivacyPolicy";

// No preview image of its own: reuse the English landing page's.
const image = ogImage("/og.png", dictionaries.en.meta.ogHeadline);

export const metadata: Metadata = {
  title: { absolute: privacyMeta.title },
  description: privacyMeta.description,
  alternates: { canonical: "/privacy/" },
  openGraph: {
    siteName: SITE_NAME,
    type: "article",
    url: "/privacy/",
    title: privacyMeta.title,
    description: privacyMeta.description,
    images: [image],
  },
  twitter: { card: "summary_large_image", images: [image] },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
