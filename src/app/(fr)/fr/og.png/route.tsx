// The French landing page's link-preview image, written to out/fr/og.png (see src/app/og.png/route.tsx).
import { dictionaries } from "@/content/i18n";
import { renderOgImage } from "@/lib/ogImage";

export const dynamic = "force-static";

export function GET() {
  const { meta } = dictionaries.fr;
  return renderOgImage({ headline: meta.ogHeadline, subline: meta.ogSubline });
}
