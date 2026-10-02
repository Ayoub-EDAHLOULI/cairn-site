"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { homePath, locales } from "@/content/i18n";
import { MOTION_CLASS } from "@/lib/motion";

/** The landing pages ("/", "/fr/"), with or without the trailing slash. */
const landingPaths = new Set(locales.flatMap((locale) => [homePath(locale), homePath(locale).replace(/\/$/, "") || "/"]));

/** Tells the head script's safety net that the app hydrated, and ends landing motion once the visitor leaves a landing page. */
export function MotionReady() {
  const pathname = usePathname();

  useEffect(() => {
    window.__cairnReady = true;
  }, []);

  useEffect(() => {
    // Motion plays once per visit: after leaving the landing page, returning shows final states.
    if (!landingPaths.has(pathname)) document.documentElement.classList.remove(MOTION_CLASS);
  }, [pathname]);

  return null;
}
