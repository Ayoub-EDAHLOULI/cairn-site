import { Hero } from "@/components/landing/Hero";
import { IntentSection } from "@/components/landing/IntentSection";
import { KindsSection } from "@/components/landing/KindsSection";
import { KeyboardSection } from "@/components/landing/KeyboardSection";
import { OfflineSection } from "@/components/landing/OfflineSection";

export default function Home() {
  return (
    <>
      <Hero />
      <IntentSection />
      <KindsSection />
      <KeyboardSection />
      <OfflineSection />
    </>
  );
}
