import Link from "next/link";
import type { Dictionary } from "@/content/i18n";
import { links } from "@/content/links";
import { CairnMark } from "@/components/ui/CairnMark";
import { LanguageSwitch } from "./LanguageSwitch";
import styles from "./Footer.module.css";

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.brand}>
          <CairnMark size={22} />
          Cairn
        </span>
        <p className={styles.credit}>
          {t.footer.madeByBefore} <a href={links.author}>Ayoub Edahlouli</a>
          {t.footer.madeByAfter}
        </p>
        <nav aria-label={t.a11y.footerNav} className={styles.nav}>
          <a href={links.repo}>{t.footer.github}</a>
          <a href={links.releases}>{t.footer.releases}</a>
          <Link href={links.guide} hrefLang={t.guideInEnglish ? "en" : undefined}>
            {t.footer.guide}
            {t.guideInEnglish && <span className={styles.note}> {t.guideInEnglish}</span>}
          </Link>
        </nav>
        <LanguageSwitch current={t.locale} label={t.a11y.languageNav} />
      </div>
    </footer>
  );
}
