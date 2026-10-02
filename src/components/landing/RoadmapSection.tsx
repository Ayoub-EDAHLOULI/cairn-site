import type { Dictionary } from "@/content/i18n";
import { roadmapStatuses } from "@/content/roadmap";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./RoadmapSection.module.css";

export function RoadmapSection({ t }: { t: Dictionary }) {
  return (
    <section id="roadmap" className={`section ${styles.section}`} aria-labelledby="roadmap-title">
      <div className="container">
        <h2 id="roadmap-title" className="section-title">
          {t.roadmap.title}
        </h2>
        <p className={`lead ${styles.lead}`}>{t.roadmap.lead}</p>
        <Reveal>
          <ol className={styles.trail}>
            {t.roadmap.stops.map((stop, index) => (
              <li
                key={stop.title}
                className={`${styles.stop} ${roadmapStatuses[index] === "available" ? styles.available : styles.upcoming}`}
              >
                <span className={styles.stone} aria-hidden="true" />
                <p className={styles.label}>{stop.label}</p>
                <h3 className={styles.title}>{stop.title}</h3>
                <p className={styles.text}>{stop.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
