// Languages: English at "/", French under "/fr/". Only the landing page is translated; the Field Guide
// is English-only for now (step 12), so French links to it say "(en anglais)".

import { en } from "./en";
import { fr } from "./fr";
import type { Dictionary, Locale } from "./types";

export { locales, type Dictionary, type Locale } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, fr };

/** URL prefix of each language's pages ("" for English, the default). */
const prefixes: Record<Locale, string> = { en: "", fr: "/fr" };

/** The landing page of a language, with its trailing slash: "/" or "/fr/". */
export function homePath(locale: Locale): string {
  return `${prefixes[locale]}/`;
}

/** An in-page section of a language's landing page, e.g. homeAnchor("fr", "faq") → "/fr/#faq". */
export function homeAnchor(locale: Locale, id: string): string {
  return `${homePath(locale)}#${id}`;
}

/** hreflang alternates of the landing pages, for metadata and the sitemap. */
export const landingAlternates = { en: "/", fr: "/fr/", "x-default": "/" } as const;
