import type { Dictionary } from "@/content/i18n";
import { links } from "@/content/links";
import { Button } from "@/components/ui/Button";
import { CairnMark } from "@/components/ui/CairnMark";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./FinalCta.module.css";

export function FinalCta({ t }: { t: Dictionary }) {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className="container">
        <Reveal className={styles.card}>
          {/* Its three stones stack bottom-up on entering view (CSS, under .motion-ok). */}
          <CairnMark size={56} variant="plain" className={styles.mark} />
          <h2 id="cta-title" className={styles.title}>
            {t.cta.title}
          </h2>
          <p className={styles.text}>{t.cta.text}</p>
          {/* On phones (CSS only), the Field Guide becomes primary and comes first. */}
          <div className={styles.actions}>
            <Button href={links.download} variant="primary" phoneVariant="outline" className={styles.download}>
              {t.cta.download}
            </Button>
            <Button
              href={links.guide}
              variant="outline"
              phoneVariant="primary"
              className={styles.guide}
              hrefLang={t.guideInEnglish ? "en" : undefined}
            >
              {t.cta.guide}
              {t.guideInEnglish && <span className={styles.note}>{t.guideInEnglish}</span>}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
