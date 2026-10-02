// The link-preview (Open Graph) image, rendered at build time by next/og and written as a .png by the
// route handlers in src/app/**/og.png (static export: one file per page, no server).
// Dark background with faint topographic rings, the mark, a headline and a subline.
// next/og needs a TTF/OTF font file: Geist Bold lives in src/assets/fonts (with its OFL.txt) and is
// read at build time only; it is never sent to visitors.

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CONTOUR_CENTER, contours, scalePath } from "@/lib/backdrop/contours";
import { STONES_DETAILED, TILE_RADIUS } from "@/lib/brand";

export const ogSize = { width: 1200, height: 630 };

const BG = "#141414";
const TEXT = "#EDEDEC";
const MUTED = "#9B9A97";
const CONTOUR = "#2A2A2A";
const ACCENT = "#6050DC";

export async function renderOgImage({ headline, subline }: { headline: string; subline: string }) {
  const geistBold = await readFile(join(process.cwd(), "src/assets/fonts/Geist-Bold.ttf"));

  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: BG }}>
        {/* The hero's rings, cropped to the 1200×630 shape (the viewBox keeps the same aspect). */}
        <svg
          width={ogSize.width}
          height={ogSize.height}
          viewBox="0 135 1400 735"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {contours.map(({ scale, d }) => (
            <path
              key={scale}
              d={scalePath(d, scale)}
              transform={`translate(${CONTOUR_CENTER.x} ${CONTOUR_CENTER.y})`}
              fill="none"
              stroke={CONTOUR}
              strokeWidth={2}
            />
          ))}
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "72px 80px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg width={72} height={72} viewBox="0 0 100 100">
              <rect width="100" height="100" rx={TILE_RADIUS} fill={ACCENT} />
              {STONES_DETAILED.map((d) => (
                <path key={d} d={d} fill="#FFFFFF" />
              ))}
            </svg>
            <span style={{ color: TEXT, fontSize: 40, letterSpacing: -1 }}>Cairn</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ color: TEXT, fontSize: 76, lineHeight: 1.04, letterSpacing: -3, maxWidth: 940 }}>
              {headline}
            </div>
            <div style={{ color: MUTED, fontSize: 28, letterSpacing: -0.5 }}>{subline}</div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Geist", data: geistBold, weight: 700, style: "normal" }] },
  );
}
