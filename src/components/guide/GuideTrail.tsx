"use client";

import { useEffect, useState } from "react";
import { guideChapters } from "@/content/guideChapters";
import s from "./guide.module.css";

/** A chapter counts as current once its top passes this far below the viewport top (below the header). */
const CURRENT_OFFSET = 160;

/** The table of contents, drawn as a trail: the current chapter's stone is filled, passed ones tinted. */
export function GuideTrail() {
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let index = -1;
      guideChapters.forEach((chapter, i) => {
        const section = document.getElementById(chapter.id);
        if (section && section.getBoundingClientRect().top <= CURRENT_OFFSET) index = i;
      });
      // At the very bottom, the last (short) chapter may never reach the offset: it's still the current one.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setCurrent(atBottom ? guideChapters.length - 1 : index);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
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

  return (
    <nav className={s.trail} aria-labelledby="trail-title">
      <h2 id="trail-title" className={s.trailTitle}>
        On this trail
      </h2>
      <ol>
        {guideChapters.map((chapter, i) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className={i < current ? s.passed : undefined}
              aria-current={i === current ? "location" : undefined}
            >
              <span className={s.stone} aria-hidden="true" />
              {chapter.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
