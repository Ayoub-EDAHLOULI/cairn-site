import { dictionaries, type Locale } from "@/content/i18n";
import { FaqSection } from "./FaqSection";
import { FinalCta } from "./FinalCta";
import { Hero } from "./Hero";
import { IntentSection } from "./IntentSection";
import { KeyboardSection } from "./KeyboardSection";
import { KindsSection } from "./KindsSection";
import { OfflineSection } from "./OfflineSection";
import { RoadmapSection } from "./RoadmapSection";

/** The landing page, in one language: "/" (English) or "/fr/" (French). */
export function LandingPage({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  return (
    <>
      <Hero t={t} />
      <IntentSection t={t} />
      <KindsSection t={t} />
      <KeyboardSection t={t} />
      <OfflineSection t={t} />
      <RoadmapSection t={t} />
      <FaqSection t={t} />
      <FinalCta t={t} />
    </>
  );
}
