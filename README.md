# SoloStack

Site de contenu (Astro, statique) qui compare des outils IA/automatisation/productivité pour les
consultants indépendants et petites entreprises de service. Monétisation par affiliation SaaS.
Voir `CLAUDE.md` pour les règles éditoriales et `business-plan.md` pour le plan d'affaires complet.

## Démarrage local

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # build de production dans dist/
npm run preview   # sert le build de production localement
```

## Déploiement (recommandé : Vercel, gratuit) — en sous-domaine LWS de afriklearn-consulting.com

Le site est configuré pour vivre sur `solostack.afriklearn-consulting.com`, un sous-domaine de
ton domaine AFRIK'LEARN CONSULTING existant chez LWS (0 $ additionnel, pas de nouveau domaine à
acheter).

1. Pousse ce dépôt sur GitHub (dépôt privé ou public, peu importe).
2. Sur [vercel.com](https://vercel.com), "Add New Project" → importe le dépôt → framework
   détecté automatiquement (Astro) → Deploy. Tu obtiens d'abord une URL `xxx.vercel.app`
   temporaire.
3. Dans le projet Vercel → Settings → Domains → Add → entre `solostack.afriklearn-consulting.com`.
   Vercel affiche alors un enregistrement **CNAME** à créer, avec une valeur cible propre à ton
   projet (du type `xxxxxxxx.vercel-dns-xxx.com`) — copie cette valeur exacte, elle est unique à
   ton déploiement.
4. Dans ton espace client LWS : ouvre le domaine `afriklearn-consulting.com` → **Gérer** →
   **Zone DNS** → ajoute un enregistrement **CNAME** :
   - Sous-domaine / hôte : `solostack`
   - Cible : la valeur copiée à l'étape 3 (pas `cname.vercel-dns.com` — LWS/Vercel donnent une
     valeur spécifique à ton projet, utilise celle affichée dans ton tableau de bord Vercel)
   - Enregistre.
5. Propagation DNS : généralement sous 2h chez LWS, parfois jusqu'à 24-48h. Vercel détecte
   automatiquement le domaine une fois propagé et génère le certificat SSL (gratuit, automatique,
   aucune action de ta part).
6. Vérifie que `astro.config.mjs` contient bien `site: 'https://solostack.afriklearn-consulting.com'`
   (déjà fait dans ce dépôt) — sans quoi sitemap.xml et rss.xml pointeraient vers la mauvaise
   adresse.

Si tu préfères Netlify ou Cloudflare Pages à la place de Vercel, le principe est identique : le
service te donnera une cible CNAME à coller dans la même zone DNS LWS.

## Le pipeline éditorial automatisé

Deux niveaux d'automatisation sont livrés avec ce dépôt. Ils ne s'excluent pas : commence par le
niveau 1 (aucune configuration), passe au niveau 2 quand tu veux zéro intervention.

### Niveau 1 — tâche planifiée Claude (déjà configurée, coût additionnel nul)

Une tâche planifiée a été créée sur ta session Claude : elle se déclenche chaque semaine,
recherche et rédige le prochain article du calendrier éditorial (`content-calendar.json`), et te
l'envoie en fichier prêt à coller dans `src/content/blog/`. Il te suffit de copier le fichier,
vérifier les liens d'affiliation, et pousser sur GitHub. ~2 minutes par semaine.

Pour la modifier ou l'arrêter, demande-le simplement dans ta conversation Claude ("modifie/arrête
la tâche planifiée SoloStack").

### Niveau 2 — GitHub Actions + API Anthropic (automatisation complète, ~5-10 $/mois)

Le fichier `.github/workflows/weekly-content.yml` fait tourner `scripts/generate-article.mjs`
chaque lundi : il choisit le prochain sujet du calendrier, fait une vraie recherche web (outil de
recherche natif de l'API Claude), rédige l'article en respectant `CLAUDE.md`, vérifie que le site
build toujours, puis ouvre une Pull Request pour ta revue. Tu merges → le déploiement (Vercel)
se fait automatiquement.

Pour l'activer :
1. Crée une clé API sur [console.anthropic.com](https://console.anthropic.com).
2. Dans GitHub : Settings → Secrets and variables → Actions → New repository secret →
   `ANTHROPIC_API_KEY`.
3. C'est tout — le workflow se déclenche automatiquement chaque lundi (ou lance-le à la main via
   l'onglet Actions → "Weekly content generation" → "Run workflow").

Coût réel : la recherche web facturée par l'API Anthropic coûte environ 0,01 $ par recherche, et
la génération d'un article de ~1800 mots avec quelques recherches revient à quelques centimes à
quelques dizaines de centimes selon le nombre de recherches — largement sous 5 $/mois pour un
article hebdomadaire. Prévois plutôt 5-10 $/mois de marge si le pipeline effectue beaucoup de
recherches.

Une fois que tu fais confiance au pipeline, tu peux supprimer l'étape de Pull Request dans le
workflow et pousser directement sur `main` pour une publication 100 % automatique — voir les
commentaires dans `weekly-content.yml`.

## Checklist avant le premier vrai visiteur

Voir `business-plan.md`, section "Checklist de lancement" — domaine, comptes d'affiliation,
Search Console, analytics.
