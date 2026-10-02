import { RootDocument } from "@/components/layout/RootDocument";
import { baseMetadata } from "@/lib/siteMetadata";

// Root layout of the French pages ("/fr/"), so they get <html lang="fr">.
export const metadata = baseMetadata("fr");
export { viewport } from "@/lib/siteMetadata";

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="fr">{children}</RootDocument>;
}
