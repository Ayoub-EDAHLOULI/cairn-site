import type { Kind } from "@/content/kinds";

/**
 * A kind's glyph. The Idea star (✦) is not in the bundled font subsets, so it is drawn as an SVG
 * to look the same on every OS. Decorative: the caller's wrapper is aria-hidden.
 */
export function KindGlyph({ kind }: { kind: Kind }) {
  if (kind.id === "idea") {
    return (
      <svg width="1.1em" height="1.1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M12 2C12.8 8.5 15.5 11.2 22 12C15.5 12.8 12.8 15.5 12 22C11.2 15.5 8.5 12.8 2 12C8.5 11.2 11.2 8.5 12 2Z" />
      </svg>
    );
  }
  return kind.glyph;
}
