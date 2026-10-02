import Link from "next/link";
import { dictionaries, homePath, locales, type Locale } from "@/content/i18n";
import styles from "./LanguageSwitch.module.css";

/**
 * "EN · FR": links to each language's landing page (only the landing page is translated; the guide is
 * English-only). Static links, no client JS. The current language is marked, not linked.
 */
export function LanguageSwitch({ current, label, className }: { current: Locale; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={`${styles.switch} ${className ?? ""}`}>
      {locales.map((locale, index) => {
        const name = dictionaries[locale].languageName;
        return (
          <span key={locale} className={styles.item}>
            {index > 0 && (
              <span className={styles.dot} aria-hidden="true">
                ·
              </span>
            )}
            {locale === current ? (
              <span className={styles.current} aria-current="true" lang={locale}>
                <abbr title={name}>{locale.toUpperCase()}</abbr>
              </span>
            ) : (
              <Link href={homePath(locale)} hrefLang={locale} lang={locale} className={styles.link} title={name}>
                {locale.toUpperCase()}
                <span className="visually-hidden"> ({name})</span>
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
