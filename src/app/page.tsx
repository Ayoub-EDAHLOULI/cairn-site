import type { Metadata } from "next";
import { SITE_NAME, landingImage, landingMeta } from "@/content/meta";
import { Hero } from "@/components/landing/Hero";
import { IntentSection } from "@/components/landing/IntentSection";
import { KindsSection } from "@/components/landing/KindsSection";
import { KeyboardSection } from "@/components/landing/KeyboardSection";
import { OfflineSection } from "@/components/landing/OfflineSection";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";

export const metadata: Metadata = {
  title: { absolute: landingMeta.title },
  description: landingMeta.description,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: "/",
    title: landingMeta.title,
    description: landingMeta.description,
    images: [landingImage],
  },
  twitter: { card: "summary_large_image", images: [landingImage] },
};

export default function Home() {
  return (
    <>
      <Hero />
      <IntentSection />
      <KindsSection />
      <KeyboardSection />
      <OfflineSection />
      <RoadmapSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
