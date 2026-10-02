import Link from "next/link";
import { links } from "@/content/links";
import { CairnMark } from "@/components/ui/CairnMark";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.brand}>
          <CairnMark size={22} />
          Cairn
        </span>
        <p className={styles.credit}>
          MIT licensed. Made by <a href={links.author}>Ayoub Edahlouli</a>.
        </p>
        <nav aria-label="Footer" className={styles.nav}>
          <a href={links.repo}>GitHub</a>
          <a href={links.releases}>Releases</a>
          <Link href={links.guide}>Field Guide</Link>
        </nav>
      </div>
    </footer>
  );
}
