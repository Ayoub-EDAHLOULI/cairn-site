import { LandingPage } from "@/components/landing/LandingPage";
import { landingMetadata } from "@/lib/siteMetadata";

export const metadata = landingMetadata("fr");

export default function Accueil() {
  return <LandingPage locale="fr" />;
}
