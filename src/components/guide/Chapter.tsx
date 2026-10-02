import type { ReactNode } from "react";
import { guideChapters, type GuideChapterId } from "@/content/guideChapters";
import s from "./guide.module.css";

/** A numbered chapter. Its number and title come from guideChapters, so the trail always matches. */
export function Chapter({ id, children }: { id: GuideChapterId; children: ReactNode }) {
  const index = guideChapters.findIndex((chapter) => chapter.id === id);
  const titleId = `${id}-title`;
  return (
    <section id={id} className={s.chapter} aria-labelledby={titleId}>
      <div className={s.chapterHead}>
        <span className={s.chapterNumber}>{index + 1}</span>
        <h2 id={titleId}>{guideChapters[index].title}</h2>
      </div>
      {children}
    </section>
  );
}
