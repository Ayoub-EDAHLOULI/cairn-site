import type { Dictionary } from "@/content/i18n";
import { links } from "@/content/links";
import { Button } from "@/components/ui/Button";
import { GitHubIcon, WindowsIcon } from "@/components/ui/icons";
import { BackdropPauseButton } from "./BackdropPauseButton";
import { DemoLauncher } from "./DemoLauncher";
import { TrailBackdrop } from "./TrailBackdrop";
import styles from "./Hero.module.css";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section id="top" className={styles.hero}>
      <TrailBackdrop />
      <BackdropPauseButton pauseLabel={t.a11y.pauseAnimation} resumeLabel={t.a11y.resumeAnimation} />
      <div className={`container ${styles.inner}`}>
        <a href="#roadmap" className={styles.pill}>
          <span className={styles.pillDot} aria-hidden="true" />
          {t.hero.pill}
        </a>
        <h1 className={styles.title}>{t.hero.title}</h1>
        <p className={styles.subtitle}>{t.hero.subtitle}</p>
        {/* On phones (CSS only), GitHub becomes primary and comes first: the installer is Windows-only. */}
        <div className={styles.actions}>
          <Button href={links.download} variant="primary" phoneVariant="secondary" className={styles.download}>
            <WindowsIcon />
            {t.hero.download}
          </Button>
          <Button href={links.repo} variant="secondary" phoneVariant="primary" className={styles.github}>
            <GitHubIcon />
            {t.hero.github}
          </Button>
        </div>
        <p className={styles.smallPrint}>
          <span className="desktop-only">{t.hero.smallPrint}</span>
          <span className="phone-only">{t.hero.smallPrintPhone}</span>
        </p>

        <div className={styles.demo}>
          <DemoLauncher />
          {/* The example queries are English, like the demo's entries. */}
          <p className={styles.caption}>
            {t.hero.captionBefore}{" "}
            <span className={styles.tryQuery} lang="en">
              port in use
            </span>{" "}
            {t.hero.captionOr}{" "}
            <span className={styles.tryQuery} lang="en">
              git history
            </span>
            {t.hero.captionAfter}
          </p>
        </div>
      </div>
    </section>
  );
}
