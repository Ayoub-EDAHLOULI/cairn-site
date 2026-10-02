"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MOTION_CLASS } from "@/lib/motion";

/** Tells the head script's safety net that the app hydrated, and ends landing motion once the visitor leaves "/". */
export function MotionReady() {
  const pathname = usePathname();

  useEffect(() => {
    window.__cairnReady = true;
  }, []);

  useEffect(() => {
    // Motion plays once per visit: after leaving the landing page, returning shows final states.
    if (pathname !== "/") document.documentElement.classList.remove(MOTION_CLASS);
  }, [pathname]);

  return null;
}
