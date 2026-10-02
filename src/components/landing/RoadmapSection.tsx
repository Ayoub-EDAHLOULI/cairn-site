import { VERSION } from "@/content/links";
import { roadmap } from "@/content/roadmap";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./RoadmapSection.module.css";

export function RoadmapSection() {
  return (
    <section id="roadmap" className={`section ${styles.section}`} aria-labelledby="roadmap-title">
      <div className="container">
        <h2 id="roadmap-title" className="section-title">
          On the trail ahead.
        </h2>
        <p className={`lead ${styles.lead}`}>Version {VERSION} is the foundation. Here&apos;s what comes next, in order.</p>
        <Reveal>
          <ol className={styles.trail}>
            {roadmap.map((stop) => (
              <li
                key={stop.title}
                className={`${styles.stop} ${stop.status === "available" ? styles.available : styles.upcoming}`}
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
