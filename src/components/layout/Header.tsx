import Link from "next/link";
import { homeAnchor, type Dictionary } from "@/content/i18n";
import { links } from "@/content/links";
import { Button } from "@/components/ui/Button";
import { CairnMark } from "@/components/ui/CairnMark";
import { LanguageSwitch } from "./LanguageSwitch";
import styles from "./Header.module.css";

export function Header({ t }: { t: Dictionary }) {
  const { nav } = t.header;
  // Anchors point at this language's landing page, so the nav also works from /guide/.
  const items = [
    { label: nav.features, href: homeAnchor(t.locale, "features") },
    { label: nav.privacy, href: homeAnchor(t.locale, "offline") },
    { label: nav.roadmap, href: homeAnchor(t.locale, "roadmap") },
    { label: nav.faq, href: homeAnchor(t.locale, "faq") },
    { label: nav.guide, href: links.guide, englishOnly: Boolean(t.guideInEnglish) },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href={homeAnchor(t.locale, "top")} className={styles.brand}>
          <CairnMark size={28} />
          Cairn
        </Link>
        <nav aria-label={t.a11y.mainNav} className={styles.nav}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              hrefLang={item.englishOnly ? "en" : undefined}
            >
              {item.label}
              {item.englishOnly && <span className="visually-hidden"> {t.guideInEnglish}</span>}
            </Link>
          ))}
          <a href={links.repo} className={styles.navLink}>
            {nav.github}
          </a>
        </nav>
        <LanguageSwitch current={t.locale} label={t.a11y.languageNav} className={styles.languages} />
        {/* Cairn is Windows-only: phones get GitHub instead of the installer. */}
        <Button href={links.download} size="sm" className={`${styles.cta} desktop-only`}>
          {t.header.download}
        </Button>
        <Button href={links.repo} size="sm" className={`${styles.cta} phone-only`}>
          {t.header.github}
        </Button>
      </div>
    </header>
  );
}
