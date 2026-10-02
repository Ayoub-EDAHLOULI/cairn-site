"use client";

import { useEffect } from "react";
import s from "./guide.module.css";

/**
 * "Save as PDF": opens the browser's print dialog, where the guide's print styles apply and the
 * reader picks the paper size. Also opens every closed <details> while printing (Ctrl P included),
 * so troubleshooting answers aren't missing on paper, and closes them again afterwards.
 */
export function SavePdfButton() {
  useEffect(() => {
    let opened: HTMLDetailsElement[] = [];
    const beforePrint = () => {
      opened = Array.from(document.querySelectorAll<HTMLDetailsElement>("details:not([open])"));
      opened.forEach((details) => (details.open = true));
    };
    const afterPrint = () => {
      opened.forEach((details) => (details.open = false));
      opened = [];
    };
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);

  return (
    <button type="button" className={s.printButton} onClick={() => window.print()}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
      </svg>
      Save as PDF
    </button>
  );
}
