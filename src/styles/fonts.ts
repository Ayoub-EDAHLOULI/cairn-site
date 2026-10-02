// The site's fonts, shared by every root layout. Downloaded at build time and served from this site:
// visitors never contact Google.
import { Geist, JetBrains_Mono } from "next/font/google";

export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  // Not preloaded: the first screen's large text (the LCP) is Geist; the mono font isn't needed to
  // paint it, so it shouldn't compete for bandwidth. It still loads with the CSS, with a metric-matched fallback.
  preload: false,
});

export const fontVariables = `${geist.variable} ${jetbrainsMono.variable}`;
