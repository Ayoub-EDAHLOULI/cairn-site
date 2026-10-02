// The Field Guide's link-preview image, written to out/guide/og.png (see src/app/og.png/route.tsx).
import { guideMeta } from "@/content/meta";
import { renderOgImage } from "@/lib/ogImage";

export const dynamic = "force-static";

export function GET() {
  return renderOgImage({ headline: guideMeta.headline, subline: guideMeta.subline });
}
