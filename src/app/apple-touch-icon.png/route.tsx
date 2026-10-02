// The iOS home-screen icon (180×180), written to out/apple-touch-icon.png at build time: the path iOS
// also requests on its own. iOS rounds the corners itself, so the tile is full-bleed; at this size the
// faithful (detailed) stones read well.
import { ImageResponse } from "next/og";
import { STONES_DETAILED } from "@/lib/brand";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#6050DC" }}>
        <svg width={180} height={180} viewBox="0 0 100 100">
          {STONES_DETAILED.map((d) => (
            <path key={d} d={d} fill="#FFFFFF" />
          ))}
        </svg>
      </div>
    ),
    { width: 180, height: 180 },
  );
}
