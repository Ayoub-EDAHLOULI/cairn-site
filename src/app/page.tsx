import { Hero } from "@/components/landing/Hero";
import { IntentSection } from "@/components/landing/IntentSection";
import { KindsSection } from "@/components/landing/KindsSection";
import { KeyboardSection } from "@/components/landing/KeyboardSection";
import { OfflineSection } from "@/components/landing/OfflineSection";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";

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
