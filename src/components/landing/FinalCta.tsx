import { links } from "@/content/links";
import { Button } from "@/components/ui/Button";
import { CairnMark } from "@/components/ui/CairnMark";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./FinalCta.module.css";

export function FinalCta() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className="container">
        <Reveal className={styles.card}>
          {/* Its three stones stack bottom-up on entering view (CSS, under .motion-ok). */}
          <CairnMark size={56} variant="plain" className={styles.mark} />
          <h2 id="cta-title" className={styles.title}>
            Leave a stone for your future self.
          </h2>
          <p className={styles.text}>Free, open source and offline. Windows 10 and 11.</p>
          {/* On phones (CSS only), the Field Guide becomes primary and comes first. */}
          <div className={styles.actions}>
            <Button href={links.download} variant="primary" phoneVariant="outline" className={styles.download}>
              Download for Windows
            </Button>
            <Button href={links.guide} variant="outline" phoneVariant="primary" className={styles.guide}>
              Read the Field Guide
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
