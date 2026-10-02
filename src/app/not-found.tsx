import type { Metadata } from "next";
import { links } from "@/content/links";
import { Button } from "@/components/ui/Button";
import { CairnMark } from "@/components/ui/CairnMark";
import styles from "./not-found.module.css";

// Exported as 404.html, which GitHub Pages serves for any unknown path.
export const metadata: Metadata = {
  title: { absolute: "Off the trail · Cairn" },
  robots: { index: false },
};

export default function NotFound() {
  return (
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
    </section>
  );
}
