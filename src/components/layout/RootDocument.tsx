import type { ReactNode } from "react";
import { dictionaries, type Locale } from "@/content/i18n";
import { motionHeadScript } from "@/lib/motion";
import { fontVariables } from "@/styles/fonts";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MotionReady } from "./MotionReady";
import { ScrollTopButton } from "./ScrollTopButton";
import { SkipLink } from "./SkipLink";
import "@/styles/globals.css";

/**
 * The page shell shared by each language's root layout (app/(en)/layout.tsx, app/(fr)/layout.tsx), so
 * every page gets the right <html lang>. Moving between languages is a full page load (two root layouts).
 */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = dictionaries[locale];
  return (
    // suppressHydrationWarning: the head script adds `motion-ok` to <html> before React hydrates.
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes
          to <body> before React loads. It only covers <body>'s own attributes, not its children. */}
      <body suppressHydrationWarning>
        {/* First thing in <body>: runs before anything is painted, so motion pre-states never flash. */}
        <script dangerouslySetInnerHTML={{ __html: motionHeadScript }} />
        <MotionReady />
        <SkipLink label={t.a11y.skipLink} />
        <Header t={t} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer t={t} />
        <ScrollTopButton label={t.a11y.backToTop} />
      </body>
    </html>
  );
}
