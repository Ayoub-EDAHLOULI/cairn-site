"use client";

import { useSyncExternalStore } from "react";
import { backdropControl } from "@/lib/backdrop/control";
import styles from "./BackdropPauseButton.module.css";

/**
 * Pauses the hero backdrop's automatic comets (WCAG 2.2.2: anything that moves on its own for more
 * than 5 seconds needs a pause). Shown only while the canvas runs (CSS: `data-canvas="on"` on the hero);
 * cursor comets keep responding, since the visitor starts those. The choice lasts for the visit.
 */
export function BackdropPauseButton({ pauseLabel, resumeLabel }: { pauseLabel: string; resumeLabel: string }) {
  const paused = useSyncExternalStore(backdropControl.subscribe, backdropControl.isPaused, () => false);

  return (
    <button
      type="button"
      className={styles.button}
      aria-pressed={paused}
      // The name stays "Pause…" and aria-pressed carries the state; the tooltip says what a click does.
      aria-label={pauseLabel}
      title={paused ? resumeLabel : pauseLabel}
      onClick={() => backdropControl.setPaused(!paused)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        {paused ? <path d="M8 5.5v13l10-6.5z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
      </svg>
    </button>
  );
}
