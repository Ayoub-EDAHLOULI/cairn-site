import type { Metadata } from "next";
import Link from "next/link";
import { links } from "@/content/links";
import { RootDocument } from "@/components/layout/RootDocument";
import { Button } from "@/components/ui/Button";
import { CairnMark } from "@/components/ui/CairnMark";
import styles from "./global-not-found.module.css";

// The 404 for every URL, exported as 404.html (GitHub Pages serves it for unknown paths). With two root
// layouts (English, French) there's no single layout to wrap a not-found page, hence global-not-found
// (experimental.globalNotFound in next.config.ts). English, with a French line for /fr/ visitors.
export const metadata: Metadata = {
  title: { absolute: "Off the trail · Cairn" },
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <RootDocument locale="en">
      <section className={`container ${styles.page}`} aria-labelledby="not-found-title">
        <CairnMark size={56} variant="plain" />
        <p className={styles.code}>404</p>
        <h1 id="not-found-title" className={styles.title}>
          Off the trail.
        </h1>
        <p className={styles.text}>This page doesn&apos;t exist, or it has moved. The markers lead back from here:</p>
        <div className={styles.actions}>
          <Button href="/">Back to Cairn</Button>
          <Button href={links.guide} variant="outline">
            Read the Field Guide
          </Button>
        </div>
        <p className={styles.other} lang="fr">
          Page introuvable. <Link href="/fr/" hrefLang="fr">
            Retour à l’accueil en français
          </Link>
        </p>
      </section>
    </RootDocument>
  );
}
