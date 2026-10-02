"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollTopButton.module.css";

/** Shown once the visitor is this many viewport heights down the page. */
const SHOW_AFTER_VIEWPORTS = 1.5;

/** A floating "Back to top" button for long pages (the landing page and the Field Guide). */
export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * SHOW_AFTER_VIEWPORTS);
    };
    // At most one check per frame.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function scrollToTop() {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // The button is about to hide: move focus to the start of the content instead of losing it.
    document.getElementById("main")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      className={styles.button}
      data-visible={visible}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
