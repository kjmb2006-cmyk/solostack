# SoloStack — Plan d'affaires et guide de lancement

*Préparé pour Jean-Marc — septembre 2026*

## 1. Le concept en une phrase

Un site de contenu en anglais qui compare et recommande des outils IA/automatisation/productivité
pour les consultants indépendants et petites entreprises de service, monétisé par des commissions
d'affiliation récurrentes sur des abonnements SaaS, et géré au quotidien par un agent IA qui
recherche et rédige les articles selon un calendrier éditorial et des règles de gouvernance
strictes (`CLAUDE.md`).

Ce n'est déjà rien à voir avec AFRIK'LEARN, AFRIK'SANTÉ, PHAKTS/SPAD ou tes autres projets santé
publique — public différent (anglophone, indépendants tech/consulting), modèle différent
(contenu + affiliation, pas SaaS propriétaire), infrastructure différente.

## 2. Pourquoi cette niche

- **Marché anglophone = programmes d'affiliation qui paient réellement.** Les outils SaaS visés
  (Notion, ClickUp, Make, Kit, Zapier, Semrush, Apollo, Descript, Reclaim.ai...) ont des
  programmes d'affiliation établis, souvent à commission récurrente (20-50 % du montant payé par
  le client, parfois pendant 12 mois ou à vie).
- **Audience ICP claire et étroite** : consultants et freelances solos qui gèrent leur activité
  seuls. Ça permet un angle éditorial cohérent ("est-ce que ça aide une personne qui gère son
  cabinet toute seule ?") plutôt qu'un site généraliste noyé dans la concurrence.
- **Contenu evergreen** : les comparatifs d'outils restent pertinents des mois, avec des mises à
  jour de prix périodiques plutôt qu'une réécriture complète — bon ratio effort/durée de vie.
- **Coût de démarrage quasi nul** et infrastructure 100 % automatisable (voir section 5).

## 3. Ce qui a déjà été construit (livré aujourd'hui)

- Site Astro fonctionnel, buildé et testé (`npm run build` passe sans erreur), pages légales
  incluses (mentions, politique de confidentialité, divulgation d'affiliation).
- 5 articles fondateurs rédigés, sourcés sur des données réelles de tarification et de
  commissions d'affiliation (septembre 2026) :
  1. Zapier vs Make pour consultants solos
  2. La stack IA du consultant solo (9 outils)
  3. Automatiser l'onboarding client avec Make (tutoriel pas-à-pas)
  4. ClickUp vs Notion pour consultants solos
  5. Meilleurs outils d'email marketing pour consultants (Kit)
- Calendrier éditorial de 12 sujets supplémentaires, un par semaine jusqu'à début décembre 2026.
- `CLAUDE.md` : règles éditoriales strictes (pas de prix inventés, structure obligatoire,
  honnêteté produit) que tout agent ou contributeur doit suivre.
- **Automatisation niveau 1** : une tâche planifiée sur ta session Claude, déclenchée chaque
  lundi, qui recherche et rédige le prochain article puis te l'envoie prêt à intégrer — sans
  coût additionnel, sans clé API à gérer.
- **Automatisation niveau 2** (prête, à activer quand tu veux) : un workflow GitHub Actions +
  API Anthropic qui fait la même chose de façon entièrement automatique, avec Pull Request de
  relecture avant publication.

## 4. Ce que ça n'est PAS (pour être honnête avec toi)

Ce n'est pas un business qui génère un revenu significatif dès le premier mois. Un site de
contenu affilié suit un cycle assez prévisible :

- **Mois 1-3** : quasiment aucun trafic organique (Google met du temps à indexer et faire
  confiance à un nouveau domaine — le fameux "sandbox" de démarrage). C'est la phase où on
  publie régulièrement sans juger les résultats.
- **Mois 3-6** : premières positions sur des mots-clés de longue traîne peu concurrentiels, un
  filet de trafic, éventuellement les premiers clics d'affiliation (pas forcément des ventes).
- **Mois 6-12** : si la cadence de publication et la qualité tiennent, trafic et premières
  commissions régulières commencent à apparaître — très variable selon la concurrence réelle du
  mot-clé et la qualité des backlinks.
- **Au-delà de 12 mois** : c'est la fenêtre où un site de niche bien exécuté peut devenir un
  vrai revenu passif secondaire. Rien ne le garantit — ça dépend de l'exécution, de la
  concurrence, et de facteurs hors de notre contrôle (algorithmes de recherche).

Je ne suis pas en mesure de te garantir un chiffre de revenu — personne d'honnête ne le peut pour
un site qui n'a pas encore un seul visiteur. Ce plan est construit pour minimiser le risque
financier (budget quasi nul) pendant que le seul vrai coût — le temps — travaille pour toi.

## 5. Budget recommandé

Objectif : coût de démarrage minimal, aucune dépense récurrente obligatoire.

**Décision prise avec Jean-Marc (sept. 2026)** : SoloStack est hébergé en sous-domaine de
`afriklearn-consulting.com` (`solostack.afriklearn-consulting.com`), via la zone DNS LWS —
0 $ de nouveau domaine. Compromis assumé : l'URL relie visiblement SoloStack à la marque
AFRIK'LEARN CONSULTING, alors que le projet visait au départ une séparation totale. À revoir si,
une fois du trafic généré, la marque veut être découplée (migration vers un domaine propre,
~10-15 $/an, à tout moment — voir section 8).

| Poste | Recommandation | Coût |
|---|---|---|
| Nom de domaine | Sous-domaine `solostack.afriklearn-consulting.com` (zone DNS LWS existante) | 0 $ |
| Hébergement | Vercel, Netlify ou Cloudflare Pages, offre gratuite | 0 $/mois |
| Analytics | Google Analytics 4 ou Cloudflare Web Analytics (gratuits) plutôt que Plausible (payant) au démarrage | 0 $/mois |
| Email marketing | Kit, offre gratuite jusqu'à 10 000 abonnés | 0 $/mois |
| Automatisation niveau 1 | Tâche planifiée Claude (déjà en place) | 0 $ additionnel |
| Automatisation niveau 2 (optionnel) | Clé API Anthropic pour publication 100 % automatique | ~5-10 $/mois si activé |
| **Total minimal pour lancer** | | **0 $ une fois, 0 $/mois** |

Pas besoin de budget publicitaire : la stratégie repose sur le SEO organique, pas sur du trafic
payant, precisément parce que l'objectif est un revenu passif avec un minimum de dépenses
continues.

## 6. Checklist de lancement (ordre recommandé)

1. **Créer un dépôt GitHub** et y pousser le code livré (voir `README.md` pour les commandes).
2. **Déployer sur Vercel** (gratuit, ~5 minutes), obtenir l'URL `xxx.vercel.app` temporaire.
3. **Ajouter `solostack.afriklearn-consulting.com`** dans Vercel → Settings → Domains, copier la
   valeur CNAME propre à ton projet affichée par Vercel.
4. **Créer l'enregistrement CNAME dans la zone DNS LWS** de `afriklearn-consulting.com` (hôte
   `solostack`, cible = la valeur copiée à l'étape 3). Détail complet dans `README.md`.
   Propagation : ~2h en général, jusqu'à 24-48h possible.
5. **Vérifier `site:` dans `astro.config.mjs`** — déjà réglé sur
   `https://solostack.afriklearn-consulting.com` dans ce dépôt.
6. **S'inscrire aux programmes d'affiliation** des outils déjà recommandés dans les articles —
   remplacer chaque `YOUR_AFFILIATE_ID` par ton vrai lien :
   - Zapier — programme d'affiliation via leur page partenaires
   - Make — programme d'affiliation officiel Make
   - ClickUp, Notion — programmes d'affiliation officiels (Notion suspend parfois les nouvelles
     inscriptions — vérifie la disponibilité actuelle)
   - Kit (ex-ConvertKit) — 30 % de commission récurrente, un des meilleurs programmes du secteur
   - Descript, Reclaim.ai, Grammarly, Writesonic, Semrush, Apollo — programmes cités dans les
     articles, tous vérifiables sur leurs pages "Affiliates" ou "Partners"
7. **Configurer Google Search Console** avec le sous-domaine + soumettre `sitemap.xml`
   (Search Console traite un sous-domaine comme une propriété distincte de
   `afriklearn-consulting.com` — à ajouter séparément).
8. **Configurer les analytics** (GA4 ou Cloudflare).
9. **Décider du niveau d'automatisation** : garder juste la tâche planifiée (zéro config), ou
   activer aussi le workflow GitHub Actions (clé API à ajouter dans les secrets du dépôt).
10. **Premier partage** : LinkedIn (tu as déjà un réseau professionnel actif), communautés de
    consultants indépendants, Reddit (r/consulting, r/freelance) en respectant les règles de
    chaque communauté sur l'auto-promotion.

## 7. Comment mesurer si ça marche

- **Mois 1-2** : indexation Google effective (vérifiable dans Search Console), 0 attente de
  trafic significatif.
- **Mois 3** : premiers clics organiques dans Search Console, même faibles.
- **Mois 6** : objectif indicatif — quelques centaines de visites/mois cumulées, premiers clics
  sur les liens d'affiliation.
- **Mois 12** : objectif indicatif — premières commissions récurrentes mensuelles régulières
  (même modestes). C'est le signal que le modèle fonctionne et mérite qu'on y consacre plus de
  sujets/budget.

Si à 6 mois il n'y a ni indexation correcte ni le moindre frémissement de trafic malgré une
publication régulière, c'est le signal de revoir soit la niche, soit la stratégie de mots-clés —
pas d'attendre passivement plus longtemps.

## 8. Prochaines étapes suggérées après le lancement (pas maintenant, plus tard)

- Une fois 15+ articles publiés : ajouter une page "meilleurs outils" pilier qui lie tous les
  comparatifs entre eux (renforce le maillage interne, bon pour le SEO).
- Une fois la liste email à quelques centaines d'abonnés : envisager un petit produit numérique
  (ex. un gabarit de tarification consultant, un audit-stack en PDF) comme deuxième source de
  revenu.
- Ne pas ajouter de nouvelles fonctionnalités techniques avant d'avoir des données de trafic
  réelles à mois 3 — c'est le principe MVP-first : le calendrier éditorial et la structure
  actuelle suffisent largement pour tester l'hypothèse.
- **Migration éventuelle vers un domaine propre** : si SoloStack décolle (trafic, revenus, ou
  simplement l'envie de découpler la marque d'AFRIK'LEARN CONSULTING), la migration d'un
  sous-domaine vers un domaine indépendant est possible à tout moment — redirections 301 par
  article, mise à jour de `site` dans `astro.config.mjs`, nouveau `sitemap.xml`. Prévoir une
  perte temporaire de positionnement SEO le temps que Google réindexe (quelques semaines), donc
  à planifier plutôt qu'à faire dans l'urgence.
