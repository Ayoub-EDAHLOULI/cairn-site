import { VERSION, links } from "@/content/links";
import { Button } from "@/components/ui/Button";
import { GitHubIcon, WindowsIcon } from "@/components/ui/icons";
import { DemoLauncher } from "./DemoLauncher";
import { TrailBackdrop } from "./TrailBackdrop";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <TrailBackdrop />
      <div className={`container ${styles.inner}`}>
        <a href="#roadmap" className={styles.pill}>
          <span className={styles.pillDot} aria-hidden="true" />
          Version {VERSION} is out. Free and open source.
        </a>
        <h1 className={styles.title}>Find the command you already figured out.</h1>
        <p className={styles.subtitle}>
          Cairn keeps your commands, scripts and snippets with the reason you saved them, and finds them by what
          you remember. A keystroke away, fully offline.
        </p>
        {/* On phones (CSS only), GitHub becomes primary and comes first: the installer is Windows-only. */}
        <div className={styles.actions}>
          <Button href={links.download} variant="primary" phoneVariant="secondary" className={styles.download}>
            <WindowsIcon />
            Download for Windows
          </Button>
          <Button href={links.repo} variant="secondary" phoneVariant="primary" className={styles.github}>
            <GitHubIcon />
            View on GitHub
          </Button>
        </div>
        <p className={styles.smallPrint}>
          <span className="desktop-only">Windows 10 and 11. No account needed.</span>
          <span className="phone-only">Cairn runs on Windows 10 and 11.</span>
        </p>

        <div className={styles.demo}>
          <DemoLauncher />
          <p className={styles.caption}>
            This is the real search, running in your browser. Try <span className={styles.tryQuery}>port in use</span>{" "}
            or <span className={styles.tryQuery}>git history</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
