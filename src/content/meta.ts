// The site name, the link-preview image helper and the Field Guide's (English) meta. The landing
// pages' titles and descriptions are per language: src/content/i18n.

import { VERSION } from "./links";

export const SITE_NAME = "Cairn";

/** A link-preview image entry (1200×630 PNG). */
export const ogImage = (url: string, alt: string) => ({ url, width: 1200, height: 630, alt, type: "image/png" });

export const guideMeta = {
  title: "The Cairn Field Guide",
  description:
    "Everything Cairn does, in thirteen short chapters: install it, find what you saved by what you remember, save new entries, every shortcut, your data, and troubleshooting.",
  headline: "The Cairn Field Guide",
  subline: `Every feature and shortcut of Cairn ${VERSION}, in thirteen short chapters.`,
};

export const guideImage = ogImage("/guide/og.png", guideMeta.headline);
