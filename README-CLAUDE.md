# Ce que j'ai réellement fait — et ce que je n'ai pas pu faire

Tu m'as demandé d'aller voir moi-même si je pouvais appliquer les correctifs. Voici exactement ce que j'ai trouvé et fait.

## Ce que j'ai découvert

Cette session a un accès **lecture** au vrai dépôt `kjmb2006-cmyk/solostack` (clone Git fonctionnel, authentifié en tant que toi via un token GitHub injecté par la session). J'ai donc pu lire le code source réel — pas seulement le site déployé — vérifier mes hypothèses, et **construire le site en local avec `npm run build`** pour tester chaque correctif avant de te le livrer.

L'accès **écriture** (push) est explicitement bloqué au niveau de l'infrastructure de la session, pas par manque d'essai de ma part. Le message d'erreur exact quand j'ai tenté un `git push` :

> access denied by the git proxy: kjmb2006-cmyk/solostack is not in this session's authorized repository set... add the repository to the session's sources.

Ça ressemble à un réglage côté Cowork/Claude (connecteur GitHub, accès dépôt par session) que toi seul peux activer, pas quelque chose que je peux débloquer depuis ici. Si tu veux que je pousse directement des branches/PR à l'avenir, dis-moi où se trouve ce réglage et active-le — sinon je continue à te livrer des fichiers prêts à coller, comme ici.

## Correction importante : j'avais fait une erreur dans l'audit initial

En lisant le vrai fichier source (`src/content/blog/zapier-vs-make-solo-consultants.mdx`), le lien Make.com utilise déjà `pc=solostackhq` — **il n'y a jamais eu de bug sur ce lien**. Les 3 liens Make.com du site (zapier-vs-make, ai-stack, automate-client-onboarding) utilisent tous le bon code. Mon audit du 25/09 avait mal lu la page rendue sur ce point précis — désolé pour la fausse alerte, ignore ce point de la checklist précédente.

Le seul lien encore en `YOUR_AFFILIATE_ID` sur `zapier-vs-make` est celui de **Zapier**, ce qui est normal et attendu : Zapier n'a pas de vrai programme d'affiliation public (déjà noté précédemment).

## Ce que j'ai construit, testé, et qui est prêt à coller tel quel

Tous les fichiers de ce dossier reproduisent l'arborescence réelle du repo — copie-colle chaque fichier au même chemin relatif. `npm run build` passe sans erreur avec l'ensemble de ces fichiers en place (testé dans un clone local avant livraison).

**Nouveau fichier :**
- `src/components/StructuredData.astro` — génère le JSON-LD Article + FAQPage

**Fichiers modifiés (diffs minimes, le reste du fichier est inchangé) :**
- `src/content/config.ts` — ajoute le champ optionnel `faq`
- `src/layouts/ArticleLayout.astro` — appelle `<StructuredData />` avec les données de l'article
- `src/layouts/BaseLayout.astro` — ajoute `og:image` / `twitter:image` par défaut
- `src/pages/blog/[...slug].astro` — passe `faq={post.data.faq}` au layout

**Nouvel asset :**
- `public/og-default.png` — image par défaut 1200×630 que j'ai générée (simple, avec le nom du site) ; à remplacer par ton propre visuel de marque quand tu en as un, ce n'est qu'un point de départ correct.

**Les 6 articles**, avec `faq:` en frontmatter (validé JSON-LD sur les 6 au build), maillage interne ajouté entre eux, et les 6 liens sortants manquants ajoutés sur AI Stack (ClickUp, Notion, Reclaim.ai, Grammarly, Descript, Apollo) :
- `src/content/blog/ai-stack-solo-consultants.mdx` — corps original conservé, faq + liens ajoutés
- `src/content/blog/automate-client-onboarding-make.mdx` — idem
- `src/content/blog/zapier-vs-make-solo-consultants.mdx` — idem
- `src/content/blog/clickup-vs-notion-solo-consultants.mdx` — ma version réécrite (~1280 mots), tags corrigés au format du site (minuscules, tirets)
- `src/content/blog/best-email-newsletter-tools-consultants.mdx` — ma version réécrite (~1220 mots) ; **catégorie corrigée en `tool-lists`** (j'avais mis `comparisons` par erreur la dernière fois — la vraie catégorie du fichier original est `tool-lists`), tags corrigés
- `src/content/blog/best-crm-solo-consultants.mdx` — l'article de la semaine dernière, tags corrigés, un lien interne ajouté

**`content-calendar.json`** — mis à jour : `best-crm-solo-consultants` passe de `"queued"` à `"drafted"` avec `draftedDate: "2026-09-21"`, conformément au processus décrit dans ton `CLAUDE.md` section 3 (que je n'avais pas suivi jusqu'ici puisque je n'avais pas accès au fichier réel).

## Ce qui reste à vérifier de ton côté

Rien de bloquant — tout est testé — mais deux points restent des décisions humaines : l'image `og-default.png` est fonctionnelle mais générique, à remplacer par ta vraie identité visuelle quand tu veux ; et l'email de contact `hello@solostack.io` dans `src/pages/about.astro` (toujours pas vérifié si cette boîte est active).

Une fois collé, `npm run build` puis `git push` comme d'habitude — le déploiement Vercel se charge du reste.
