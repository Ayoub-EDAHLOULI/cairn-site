import Link from "next/link";
import { links } from "@/content/links";
import { Button } from "@/components/ui/Button";
import { CairnMark } from "@/components/ui/CairnMark";
import styles from "./Header.module.css";

// Root-relative anchors so the nav also works from /guide.
const nav = [
  { label: "Features", href: "/#features" },
  { label: "Privacy", href: "/#offline" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "FAQ", href: "/#faq" },
  { label: "Guide", href: links.guide },
  { label: "GitHub", href: links.repo },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/#top" className={styles.brand}>
          <CairnMark size={28} />
          Cairn
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          {nav.map((item) =>
            item.href.startsWith("/") ? (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ) : (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ),
          )}
        </nav>
        {/* Cairn is Windows-only: phones get GitHub instead of the installer. */}
        <Button href={links.download} size="sm" className={`${styles.cta} desktop-only`}>
          Download
        </Button>
        <Button href={links.repo} size="sm" className={`${styles.cta} phone-only`}>
          GitHub
        </Button>
      </div>
    </header>
  );
}
