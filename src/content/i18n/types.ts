// The shape of a language's copy. Every language must provide every key: TypeScript rejects the
// build otherwise. What stays English everywhere (see CLAUDE.md "Languages") is NOT in here: the demo
// launcher, the "You type → Cairn finds" rows, kind names, the action panel, commands and shortcuts.

import type { KindId } from "@/content/kinds";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export type Dictionary = {
  locale: Locale;
  /** Open Graph locale, e.g. "en_US". */
  ogLocale: string;
  /** The language's own name, for the switcher ("English", "Français"). */
  languageName: string;

  meta: {
    title: string;
    description: string;
    /** Big line on the link-preview image. */
    ogHeadline: string;
    ogSubline: string;
  };

  a11y: {
    skipLink: string;
    backToTop: string;
    pauseAnimation: string;
    resumeAnimation: string;
    mainNav: string;
    footerNav: string;
    languageNav: string;
  };

  header: {
    nav: { features: string; privacy: string; roadmap: string; faq: string; guide: string; github: string };
    download: string;
    github: string;
  };

  /** Shown after links to the English-only Field Guide (empty in English). */
  guideInEnglish: string;

  hero: {
    pill: string;
    title: string;
    subtitle: string;
    download: string;
    github: string;
    smallPrint: string;
    smallPrintPhone: string;
    /** "This is the real search, running in your browser. Try <port in use> or <git history>." */
    captionBefore: string;
    captionOr: string;
    captionAfter: string;
  };

  intent: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    tableCaption: string;
    youType: string;
    cairnFinds: string;
  };

  kinds: {
    title: string;
    lead: string;
    descriptions: Record<KindId, string>;
  };

  keyboard: {
    title: string;
    lead: string;
    figcaption: string;
  };

  offline: {
    title: string;
    lead: string;
    pathLabel: string;
    facts: { title: string; text: string }[];
  };

  roadmap: {
    title: string;
    lead: string;
    /** Same order as the stops in roadmap data: version 0.1, then the coming ones. */
    stops: { label: string; title: string; text: string }[];
  };

  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };

  cta: {
    title: string;
    text: string;
    download: string;
    guide: string;
  };

  footer: {
    /** "MIT licensed. Made by" … author link … "." */
    madeByBefore: string;
    madeByAfter: string;
    github: string;
    releases: string;
    guide: string;
  };
};
