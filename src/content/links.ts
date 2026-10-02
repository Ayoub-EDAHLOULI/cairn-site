// Every external link, the site's own URL and the current version live here, so they change in one place.

/** The released version (the installer's file name uses it). Update on every release. */
export const RELEASE = "0.1.0";
/** The version as shown in copy: "Version 0.1". */
export const VERSION = RELEASE.split(".").slice(0, 2).join(".");

/** Production URL (GitHub Pages, custom domain; see public/CNAME). No trailing slash. */
export const SITE_URL = "https://cairn.ayoubedahlouli.com";

export const links = {
  repo: "https://github.com/Ayoub-EDAHLOULI/cairn",
  /** Always the newest installer; never link a specific version file. */
  download: "https://github.com/Ayoub-EDAHLOULI/cairn/releases/latest",
  releases: "https://github.com/Ayoub-EDAHLOULI/cairn/releases",
  author: "https://ayoubedahlouli.com",
  /** With `trailingSlash: true`, every page URL ends in "/". */
  guide: "/guide/",
} as const;
