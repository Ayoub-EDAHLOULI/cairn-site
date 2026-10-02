// The landing page's link-preview image, written to out/og.png at build time. A route handler (not
// opengraph-image.tsx) so the exported file keeps its .png extension: static hosts pick the content
// type from the extension, and preview crawlers ignore images served as application/octet-stream.
import { landingMeta } from "@/content/meta";
import { renderOgImage } from "@/lib/ogImage";

export const dynamic = "force-static";

export function GET() {
  return renderOgImage({
    headline: landingMeta.headline,
    subline: "Free and open source · Fully offline · Windows 10 and 11",
  });
}
