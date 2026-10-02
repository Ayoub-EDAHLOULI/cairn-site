import { links } from "@/content/links";
import { Button } from "@/components/ui/Button";
import { CairnMark } from "@/components/ui/CairnMark";
import styles from "./FinalCta.module.css";

export function FinalCta() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className="container">
        <div className={styles.card}>
          <CairnMark size={56} variant="plain" />
          <h2 id="cta-title" className={styles.title}>
            Leave a stone for your future self.
          </h2>
          <p className={styles.text}>Free, open source and offline. Windows 10 and 11.</p>
          {/* Class hooks so the phone layout (step 6) can reorder and restyle with CSS only. */}
          <div className={styles.actions}>
            <Button href={links.download} variant="primary" className={styles.download}>
              Download for Windows
            </Button>
            <Button href={links.guide} variant="outline" className={styles.guide}>
              Read the Field Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
