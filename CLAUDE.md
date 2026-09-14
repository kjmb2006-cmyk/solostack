# CLAUDE.md — SoloStack Editorial & Engineering Governance

Ce fichier régit tout travail effectué sur ce dépôt, humain ou agent IA. Il doit être lu
intégralement avant toute rédaction d'article ou modification de code. Toute session (planifiée
ou manuelle) qui génère du contenu pour ce site DOIT s'y conformer.

## 1. Ce qu'est SoloStack

SoloStack (solostack.io) est un site de contenu en anglais qui compare et recommande des outils
IA/automatisation/productivité pour les consultants indépendants et les petites entreprises de
service (1 à 5 personnes). Monétisation : liens d'affiliation SaaS à commission récurrente, avec
publicité display en complément une fois le trafic significatif.

Ce N'EST PAS un site généraliste "meilleurs outils IA". L'angle éditorial constant est : *"est-ce
que ça aide concrètement une personne qui gère son cabinet de conseil toute seule ?"* Tout sujet
qui ne se rattache pas clairement à cet ICP (indie hacker solo, freelance, petit cabinet de
conseil, coach/consultant B2B) est hors périmètre.

## 2. Standards éditoriaux (non négociables)

- **Langue** : anglais américain, ton direct et concret, zéro remplissage marketing.
- **Longueur** : 1200–2000 mots pour un article de comparaison ou tutoriel, 1500–2500 pour un
  "best-of" à plusieurs outils.
- **Structure obligatoire** : titre H1, intro qui pose le problème réel (pas de généralités),
  au moins un tableau comparatif ou une liste structurée, un encart CTA d'affiliation par outil
  central (`<CTA tool="..." href="..." />`), une section FAQ de 2 à 4 questions en fin d'article.
- **Frontmatter obligatoire** (voir `src/content/config.ts`) : `title`, `description` (150–160
  caractères, orienté recherche), `pubDate`, `category` (`comparisons` | `tool-lists` |
  `tutorials`), `tags`, `draft: false` une fois validé.
- **Exactitude des prix** : ne JAMAIS inventer un prix, une limite de plan ou un taux de
  commission d'affiliation. Toujours vérifier via recherche web (page de tarification officielle
  en priorité) avant publication. Si une information ne peut pas être vérifiée avec confiance,
  l'écrire en des termes non chiffrés ("free tier available", "paid plans start in the low
  double digits") plutôt que de risquer un chiffre faux.
- **Honnêteté produit** : ne jamais présenter un outil comme supérieur uniquement parce qu'il a
  un programme d'affiliation. Mentionner au moins une limite ou un inconvénient réel par outil
  recommandé.
- **Divulgation d'affiliation** : chaque article en contient une automatiquement via
  `ArticleLayout.astro` — ne pas la supprimer ni la contourner.
- **Liens d'affiliation** : utiliser le composant `<CTA />`, jamais un lien brut en plein texte
  pour un outil monétisé. Les liens doivent porter `rel="sponsored noopener"` (déjà géré par le
  composant).

## 3. Processus de génération d'un article (pour l'agent automatisé)

1. Lire `content-calendar.json` à la racine du dépôt et choisir le premier sujet au statut
   `"queued"` dont la date cible (`targetDate`) est atteinte ou dépassée.
2. Effectuer une recherche web réelle pour vérifier : prix actuels des outils cités, changements
   de fonctionnalités, et — si pertinent — un nouvel outil concurrent apparu depuis la dernière
   mise à jour du calendrier.
3. Rédiger l'article au format `.mdx` dans `src/content/blog/`, nom de fichier = `slug` du
   calendrier, en respectant strictement la section 2.
4. Mettre à jour l'entrée correspondante dans `content-calendar.json` : `status: "drafted"`,
   ajouter `draftedDate`.
5. Ne jamais mettre `draft: false` ni `status: "published"` sans validation humaine explicite,
   sauf si la session a reçu l'instruction explicite d'auto-publier (piste d'automatisation
   avancée via GitHub Actions, voir `README.md`).

## 4. Cadence de sprint (préférence de Jean-Marc : sprints gouvernés, MVP-first)

- **Sprint = 1 semaine.** Un article par sprint minimum tant que le site est en phase de
  lancement (0–6 mois).
- **Definition of Done d'un sprint contenu** : article rédigé, frontmatter complet, build Astro
  (`npm run build`) qui passe sans erreur, liens d'affiliation présents pour les outils
  monétisables, sitemap à jour automatiquement (généré dynamiquement, rien à faire).
- **Priorité MVP** : ne pas ajouter de nouvelle fonctionnalité (newsletter embarquée, comparateur
  interactif, etc.) tant que le site n'a pas au moins 15 articles publiés et un premier mois de
  données Search Console.
- **Revue mensuelle** : vérifier quels articles génèrent des clics d'affiliation (via les
  dashboards des programmes d'affiliation) et réorienter le calendrier éditorial vers ce qui
  convertit.

## 5. Ce que l'agent ne doit jamais faire

- Ne jamais inventer une statistique, un témoignage client ou un cas d'usage attribué à une
  personne réelle.
- Ne jamais publier un article non sourcé sur les prix/fonctionnalités sans l'avoir vérifié dans
  la même session (pas de réutilisation de connaissances non datées pour des prix).
- Ne jamais modifier `astro.config.mjs`, la structure des pages légales, ou la politique de
  confidentialité sans le signaler explicitement à Jean-Marc.
