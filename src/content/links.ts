// Every external link, the site's own URL and the current version live here, so they change in one place.

/** The released version (the installer's file name uses it). Update on every release. */
export const RELEASE = "0.1.0";
/** The version as shown in copy: "Version 0.1". */
export const VERSION = RELEASE.split(".").slice(0, 2).join(".");

/** Production URL. The domain is still undecided: update this before the SEO step. */
export const SITE_URL = "https://cairn.example";

export const links = {
  repo: "https://github.com/Ayoub-EDAHLOULI/cairn",
  /** Always the newest installer; never link a specific version file. */
  download: "https://github.com/Ayoub-EDAHLOULI/cairn/releases/latest",
  releases: "https://github.com/Ayoub-EDAHLOULI/cairn/releases",
  author: "https://ayoubedahlouli.com",
  guide: "/guide",
} as const;
