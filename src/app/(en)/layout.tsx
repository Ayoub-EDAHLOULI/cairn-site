import { RootDocument } from "@/components/layout/RootDocument";
import { baseMetadata } from "@/lib/siteMetadata";

// Root layout of the English pages ("/", "/guide/"). French pages have their own: app/(fr)/layout.tsx.
export const metadata = baseMetadata("en");
export { viewport } from "@/lib/siteMetadata";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
