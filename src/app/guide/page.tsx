import type { Metadata } from "next";
import { SITE_NAME, guideImage, guideMeta } from "@/content/meta";
import { GuideHero } from "@/components/guide/GuideHero";
import { GuideTrail } from "@/components/guide/GuideTrail";
import { BeforeYouStart, FirstMinute, InstallCairn } from "@/components/guide/chapters/GettingStarted";
import { FindingThings, UsingWhatYouFound } from "@/components/guide/chapters/FindingAndUsing";
import { ActionPanel, EditingAndDeleting, SavingEntries } from "@/components/guide/chapters/Entries";
import {
  DataAndPrivacy,
  KeyboardCheatSheet,
  Settings,
  Troubleshooting,
  WhatsNext,
} from "@/components/guide/chapters/Reference";
import s from "@/components/guide/guide.module.css";

export const metadata: Metadata = {
  title: { absolute: guideMeta.title },
  description: guideMeta.description,
  alternates: { canonical: "/guide" },
  openGraph: {
    siteName: SITE_NAME,
    type: "article",
    url: "/guide",
    title: guideMeta.title,
    description: guideMeta.description,
    images: [guideImage],
  },
  twitter: { card: "summary_large_image", images: [guideImage] },
};

export default function GuidePage() {
  return (
    <div className={s.guide}>
      <GuideHero />
      <div className={`container ${s.shell}`}>
        <GuideTrail />
        {/* <article>, not <main>: the layout already provides <main id="main">. */}
        <article className={s.article}>
          <BeforeYouStart />
          <InstallCairn />
          <FirstMinute />
          <FindingThings />
          <UsingWhatYouFound />
          <SavingEntries />
          <EditingAndDeleting />
          <ActionPanel />
          <Settings />
          <KeyboardCheatSheet />
          <DataAndPrivacy />
          <Troubleshooting />
          <WhatsNext />
        </article>
      </div>
    </div>
  );
}
