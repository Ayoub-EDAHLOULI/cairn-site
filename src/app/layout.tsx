import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionReady } from "@/components/layout/MotionReady";
import { ScrollTopButton } from "@/components/layout/ScrollTopButton";
import { SITE_URL } from "@/content/links";
import { SITE_NAME, landingMeta } from "@/content/meta";
import { motionHeadScript } from "@/lib/motion";
import "@/styles/globals.css";

// Downloaded at build time and served from this site: visitors never contact Google.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  // Not preloaded: the first screen's large text (the LCP) is Geist; the mono font isn't needed to
  // paint it, so it shouldn't compete for bandwidth. It still loads with the CSS, with a metric-matched fallback.
  preload: false,
});

// Defaults for every page; each page sets its own title, description, canonical URL and preview.
// Absolute URLs (canonical, Open Graph) resolve against SITE_URL.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: landingMeta.title,
  description: landingMeta.description,
  applicationName: SITE_NAME,
  authors: [{ name: "Ayoub Edahlouli", url: "https://ayoubedahlouli.com" }],
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the head script adds `motion-ok` to <html> before React hydrates.
    <html lang="en" className={`${geist.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionHeadScript }} />
      </head>
      <body>
        <MotionReady />
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ScrollTopButton />
      </body>
    </html>
  );
}
