import { LandingPage } from "@/components/landing/LandingPage";
import { landingMetadata } from "@/lib/siteMetadata";

export const metadata = landingMetadata("en");

export default function Home() {
  return <LandingPage locale="en" />;
}
