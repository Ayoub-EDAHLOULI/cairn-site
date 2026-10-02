// Page titles, descriptions and link-preview text. The domain comes from SITE_URL in links.ts.

import { VERSION } from "./links";

export const SITE_NAME = "Cairn";

/** Link-preview images (src/app/og.png and src/app/guide/og.png), 1200×630. */
const ogImage = (url: string, alt: string) => ({ url, width: 1200, height: 630, alt, type: "image/png" });

export const landingMeta = {
  title: "Cairn: find the command you already figured out",
  description:
    "Cairn keeps your commands, scripts and snippets with the reason you saved them, and finds them by what you remember. A keystroke away, fully offline. Free and open source, for Windows 10 and 11.",
  /** The big line on the link-preview image. */
  headline: "Find the command you already figured out.",
};

export const landingImage = ogImage("/og.png", landingMeta.headline);

export const guideMeta = {
  title: "The Cairn Field Guide",
  description:
    "Everything Cairn does, in thirteen short chapters: install it, find what you saved by what you remember, save new entries, every shortcut, your data, and troubleshooting.",
  headline: "The Cairn Field Guide",
  subline: `Every feature and shortcut of Cairn ${VERSION}, in thirteen short chapters.`,
};

export const guideImage = ogImage("/guide/og.png", guideMeta.headline);
