// French copy, reviewed by the owner (native speaker) before release. Same keys as en.ts (enforced by
// the Dictionary type). Typography: a narrow no-break space (U+202F, written  ) before ? ! : ;
// Key names (Enter, Ctrl K, Alt Space), commands and kind names stay English, like the app.

import { VERSION } from "@/content/links";
import type { Dictionary } from "./types";

export const fr: Dictionary = {
  locale: "fr",
  ogLocale: "fr_FR",
  languageName: "Français",

  meta: {
    title: "Cairn : retrouvez la commande que vous aviez déjà trouvée",
    description:
      "Cairn garde vos commandes, scripts et extraits de code avec la raison pour laquelle vous les avez enregistrés, et les retrouve à partir de ce dont vous vous souvenez. À une touche, entièrement hors ligne. Gratuit et open source, pour Windows 10 et 11.",
    ogHeadline: "Retrouvez la commande que vous aviez déjà trouvée.",
    ogSubline: "Gratuit et open source · Entièrement hors ligne · Windows 10 et 11",
  },

  a11y: {
    skipLink: "Aller au contenu",
    backToTop: "Retour en haut",
    pauseAnimation: "Mettre en pause l’animation d’arrière-plan",
    resumeAnimation: "Reprendre l’animation d’arrière-plan",
    mainNav: "Navigation principale",
    footerNav: "Pied de page",
    languageNav: "Langue",
  },

  header: {
    nav: {
      features: "Fonctionnalités",
      privacy: "Confidentialité",
      roadmap: "Feuille de route",
      faq: "FAQ",
      guide: "Guide",
      github: "GitHub",
    },
    download: "Télécharger",
    github: "GitHub",
  },

  guideInEnglish: "(en anglais)",

  hero: {
    pill: `La version ${VERSION} est disponible. Gratuite et open source.`,
    title: "Retrouvez la commande que vous aviez déjà trouvée.",
    subtitle:
      "Cairn garde vos commandes, scripts et extraits de code avec la raison pour laquelle vous les avez enregistrés, et les retrouve à partir de ce dont vous vous souvenez. À une touche, entièrement hors ligne.",
    download: "Télécharger pour Windows",
    github: "Voir sur GitHub",
    smallPrint: "Windows 10 et 11. Aucun compte requis.",
    smallPrintPhone: "Cairn fonctionne sous Windows 10 et 11.",
    captionBefore: "C’est la vraie recherche, qui tourne dans votre navigateur. Essayez",
    captionOr: "ou",
    captionAfter: ".",
  },

  intent: {
    title: "Cherchez avec ce dont vous vous souvenez, pas avec ce que vous aviez tapé.",
    paragraph1:
      "Chaque entrée porte une phrase : pourquoi vous l’avez enregistrée. Cairn cherche dans cette phrase aussi sérieusement que dans la commande elle-même, si bien que les mots dont vous vous souvenez des mois plus tard suffisent.",
    paragraph2:
      "Les mots partiels fonctionnent, les accents ne comptent pas, et si aucune entrée ne contient tous les mots, Cairn affiche les plus proches plutôt que rien.",
    tableCaption: "Exemples de recherches et ce que Cairn trouve",
    youType: "Vous tapez",
    cairnFinds: "Cairn trouve",
  },

  kinds: {
    title: "Cinq types de choses à garder.",
    lead: "Aucun dossier à entretenir. Choisissez un type, ajoutez quelques tags et filtrez d’une touche.",
    descriptions: {
      command: "Les commandes d’une ligne que vous recherchez toutes les deux semaines.",
      script: "Du PowerShell ou du cmd sur plusieurs lignes, à exécuter d’un bloc.",
      code: "Le hook ou la requête que vous finissez toujours par réécrire.",
      note: "La solution trouvée après une heure de recherche.",
      idea: "Des idées à peine formées, gardées avant qu’elles ne s’envolent.",
    },
  },

  keyboard: {
    title: "Ne quittez jamais le clavier.",
    lead: "Ouvrez Cairn depuis n’importe où, tapez, puis appuyez sur Enter pour copier. Ctrl Enter colle directement dans la fenêtre d’où vous venez. Ctrl K affiche toutes les actions avec leur raccourci : vous apprenez en chemin.",
    figcaption: "Le panneau d’actions de Cairn pour l’entrée sélectionnée, ouvert avec Ctrl K.",
  },

  offline: {
    title: "Hors ligne par conception. Vos notes ne quittent jamais votre machine.",
    lead: "Les commandes contiennent des noms de serveurs, des chemins et parfois des mots de passe. Cairn ne fait aucune requête réseau : tout tient dans un seul fichier SQLite que vous pouvez copier, sauvegarder ou supprimer.",
    pathLabel: "Emplacement de la base de données",
    facts: [
      { title: "Aucun compte", text: "Installez-le et commencez à taper. Rien à créer, jamais." },
      {
        title: "Aucune télémétrie",
        text: "Aucune statistique, aucun rapport de plantage envoyé où que ce soit. Même les polices sont intégrées.",
      },
      { title: "Open source", text: "Chaque ligne est sur GitHub : inutile de nous croire sur parole." },
    ],
  },

  roadmap: {
    title: "La suite du sentier.",
    lead: `La version ${VERSION} en est la base. Voici la suite, dans l’ordre.`,
    stops: [
      {
        label: "Disponible",
        title: `Version ${VERSION}`,
        text: "Recherche par intention, actions, éditeur, thèmes, exécution et collage.",
      },
      {
        label: "Ensuite",
        title: "Une recherche plus intelligente",
        text: "Tolérance aux fautes de frappe, et ce que vous utilisez souvent remonte en tête.",
      },
      {
        label: "Puis",
        title: "La recherche par le sens",
        text: "Retrouvez une entrée par idée, grâce à un modèle qui tourne sur votre ordinateur.",
      },
      {
        label: "Puis",
        title: "Une capture plus rapide",
        text: "Capture rapide, paramètres à remplir et import depuis l’historique du shell.",
      },
      {
        label: "Plus tard",
        title: "Des assistants IA locaux",
        text: "Un pourquoi suggéré, des tags automatiques, des questions sur vos entrées.",
      },
    ],
  },

  faq: {
    title: "Questions",
    items: [
      {
        question: "Cairn est-il gratuit ?",
        answer: "Oui. Cairn est gratuit et open source sous licence MIT, sans offre payante et sans compte.",
      },
      {
        question: "Pourquoi Windows m’avertit-il à l’installation ?",
        answer: `La version ${VERSION} n’est pas encore signée numériquement, donc Windows SmartScreen ne reconnaît pas l’éditeur. Cliquez sur Informations complémentaires, puis sur Exécuter quand même. Le code source et la compilation sont sur GitHub si vous préférez vérifier d’abord.`,
      },
      {
        question: "Fonctionne-t-il sur macOS ou Linux ?",
        answer: `Pas encore. Cairn est construit avec Tauri, qui fonctionne sur les trois, mais la version ${VERSION} n’est testée et publiée que pour Windows 10 et 11.`,
      },
      {
        question: "Où sont stockées mes données ?",
        answer:
          "Dans un seul fichier SQLite sur votre ordinateur, sous %LOCALAPPDATA%. Cairn ne l’envoie jamais nulle part. Pour le sauvegarder, quittez Cairn et copiez cairn.db, ainsi que cairn.db-wal et cairn.db-shm s’ils sont encore à côté.",
      },
      {
        question: "Et si Alt Space est déjà utilisé ?",
        answer:
          "Si une autre application, comme PowerToys Run, utilise Alt Space, Cairn se rabat sur Ctrl Shift Space. L’info-bulle de l’icône dans la zone de notification indique toujours le raccourci qui fonctionne.",
      },
    ],
  },

  cta: {
    title: "Laissez une pierre pour votre futur vous.",
    text: "Gratuit, open source et hors ligne. Windows 10 et 11.",
    download: "Télécharger pour Windows",
    guide: "Lire le guide",
  },

  footer: {
    madeByBefore: "Licence MIT. Créé par",
    madeByAfter: ".",
    github: "GitHub",
    releases: "Versions",
    guide: "Guide",
  },
};
