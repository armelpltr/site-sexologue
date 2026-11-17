# Site vitrine : cabinet de sexologie

Site statique sobre et rassurant, construit avec **Astro** et **Tailwind CSS**.
Priorités : confidentialité, accessibilité (AA), aucun traceur tiers, polices auto-hébergées.

> Tous les textes entre crochets `[…]` sont des **placeholders** à valider avec le ou la praticien·ne.
> Les visuels fournis sont des illustrations neutres provisoires.

## Sommaire

- [Lancer le site en local](#lancer-le-site-en-local)
- [Modifier les informations du cabinet](#modifier-les-informations-du-cabinet)
- [Modifier les tarifs](#modifier-les-tarifs)
- [Écrire un article](#écrire-un-article)
- [Modifier un motif de consultation](#modifier-un-motif-de-consultation)
- [Témoignages](#témoignages)
- [Mesure d'audience (optionnelle)](#mesure-daudience-optionnelle)
- [Déployer](#déployer)
- [Checklist à valider avec le client](#checklist-à-valider-avec-le-client)

## Lancer le site en local

Prérequis : Node.js 22 ou plus récent.

```bash
npm install
npm run dev        # http://localhost:4321
```

| Commande          | Rôle                                         |
| ----------------- | -------------------------------------------- |
| `npm run build`   | Génère le site statique dans `dist/`         |
| `npm run preview` | Sert `dist/` en local pour vérifier le build |
| `npm run check`   | Vérifie les types et le schéma du contenu    |

## Modifier les informations du cabinet

Tout est centralisé dans [`src/config/site.ts`](src/config/site.ts) :

- `nom`, `titre`, `titreCourt`, `accroche`, `description` ;
- `contact` : téléphone, e-mail, **lien de prise de rendez-vous** (`lienRdv`) et nom de la plateforme ;
- `adresse` : rue, complément, ville, **coordonnées GPS** (pour la carte et le SEO local), infos d'accès ;
- `horaires` (affichés et repris dans les données structurées) ;
- `tarifs`, `moyensPaiement`, `remboursement` ;
- `legal` : SIRET, ADELI / RPPS, ordre, assurance RC pro, hébergeur.

Les coordonnées GPS s'obtiennent sur [openstreetmap.org](https://www.openstreetmap.org) : clic droit sur
l'adresse, « Afficher l'adresse ».

L'URL définitive du site se règle dans [`astro.config.mjs`](astro.config.mjs) (`SITE_URL`).
Les textes longs (présentation, formations, valeurs) sont dans `src/pages/praticien.astro` ; le
déroulement des séances dans `src/pages/seance.astro` ; la FAQ dans `src/pages/faq.astro`.

Photos : remplacer `src/assets/cabinet.jpg` et `src/assets/praticien.jpg` (même nom de fichier) et
`public/og-cabinet.jpg` (1200 × 630 px, image d'aperçu sur les réseaux sociaux).

## Modifier les tarifs

Dans `src/config/site.ts`, bloc `tarifs` :

```ts
tarifs: [
  { prestation: 'Consultation individuelle', duree: '50 min', prix: '70 €' },
  { prestation: 'Consultation de couple', duree: '1 h 15', prix: '90 €' },
],
```

Ajouter, supprimer ou réordonner des lignes suffit : le tableau de la page « Tarifs & accès » se met à
jour. Le texte sur le remboursement est dans `remboursement` (il est aussi repris dans la FAQ).

## Écrire un article

1. Créer un fichier dans `src/content/blog/`, par exemple `premiere-consultation.md`. Le nom du fichier
   devient l'adresse : `/blog/premiere-consultation`.
2. Copier ce modèle :

   ```markdown
   ---
   titre: "Titre de l'article"
   description: "Résumé en une ou deux phrases (200 caractères max.), affiché dans la liste et sur Google."
   date: 2026-12-01
   image: ../../assets/mon-visuel.jpg     # facultatif, à placer dans src/assets/
   imageAlt: "Description du visuel"
   brouillon: false                       # true = non publié
   ---

   Texte de l'article en Markdown. Intertitres avec `## Mon intertitre`.
   ```

3. Vérifier avec `npm run dev`, puis publier : `git add . && git commit -m "Article : …" && git push`.

Règles éditoriales : ton pédagogique et neutre, pas de promesse de résultat, pas de vocabulaire médical
trompeur, aucune image explicite ou suggestive. Les 3 articles fournis sont des **exemples à relire**.

## Modifier un motif de consultation

Chaque motif est un fichier de `src/content/motifs/`. Champs : `titre`, `resume` (180 caractères max.),
`icone` (`couple`, `desir`, `douleur`, `identite`, `fonction`, `parcours`) et `ordre`. Ajouter un fichier
crée automatiquement une carte et sa page de détail.

## Témoignages

La section est **désactivée par défaut** (`temoignages.actif: false`). Ne l'activer qu'avec des avis
**réels**, recueillis avec un **consentement écrit**, anonymisés, et seulement si la déontologie liée au
titre du praticien l'autorise (elle l'interdit en pratique pour les médecins).

## Mesure d'audience (optionnelle)

Aucun outil n'est chargé par défaut : ni Google Analytics, ni pixel Meta, ni Google Fonts. Si le client
souhaite des statistiques, utiliser un outil **sans cookies**, qui ne nécessite pas de bandeau :

- **Plausible** : `audience.outil: 'plausible'` et `plausibleDomaine: 'mon-domaine.fr'` ;
- **Umami** : `audience.outil: 'umami'`, `umamiScript` et `umamiWebsiteId`.

La politique de confidentialité s'adapte automatiquement.

## Déployer

### GitHub Pages (aperçu en ligne, actif)

Chaque push sur `main` publie le site sur **https://armelpltr.github.io/site-sexologue/** via
`.github/workflows/pages.yml`. Le workflow construit le site avec `SITE_URL` et `BASE_PATH`, puis
`scripts/prefixer-base.mjs` ajoute le sous-dossier `/site-sexologue/` aux liens internes et aux URL absolues.

Limite : GitHub Pages est un hébergement statique, **le formulaire Netlify Forms n'y fonctionne pas**.
Pour un formulaire fonctionnel sur Pages, passer sur Formspree (`formulaire.service: 'formspree'`).

Rien n'est déployé. Les configurations sont prêtes :

- **Netlify** (recommandé, le formulaire fonctionne sans service tiers) : importer le dépôt sur
  app.netlify.com ; réglages lus dans `netlify.toml`. Garder `formulaire.service: 'netlify'` et activer
  une notification e-mail dans l'onglet **Forms**.
- **Vercel** : importer le dépôt ; réglages lus dans `vercel.json`. Créer un formulaire Formspree et
  passer `formulaire.service: 'formspree'` avec `formspreeId`.

Ensuite : brancher le domaine, mettre à jour `SITE_URL`, déclarer le sitemap dans Google Search Console
et créer ou mettre à jour la fiche Google Business Profile du cabinet.

## Checklist à valider avec le client

### Titre et déontologie (prioritaire)

- [ ] **Titre exact** : sexologue, psychologue-sexologue ou médecin sexologue (`titre` et `titreCourt`).
- [ ] **Si médecin** : le Code de déontologie médicale (art. R.4127-19 et suivants du Code de la santé
      publique) encadre la communication. Information loyale, pas de témoignages, pas de comparaison,
      pas de publicité. Faire relire le site au regard des recommandations du Conseil national de l'Ordre.
- [ ] **Si psychologue** : respecter le Code de déontologie des psychologues ; mentionner le n° ADELI /
      RPPS ; vérifier l'usage du titre « psychologue » (titre protégé).
- [ ] **Si sexologue non médecin ni psychologue** : ne pas laisser croire à un statut médical. Éviter
      « docteur », « traitement », « thérapie » au sens médical ; vérifier chaque texte de motif.
- [ ] Diplômes et formations exacts (page « Le cabinet »).
- [ ] Remboursement : formulation exacte selon le titre (Assurance maladie, mutuelles).
- [ ] Accueil des mineurs : oui ou non, et conditions (FAQ).

### Contenus

- [ ] Relire et valider les 6 motifs de consultation et les 3 articles d'exemple.
- [ ] Valider toutes les réponses de la FAQ.
- [ ] Texte de présentation, approche et valeurs.
- [ ] Photos réelles : cabinet (sans patient), portrait (facultatif).

### Informations pratiques

- [ ] Adresse, complément, coordonnées GPS, accès (transports, parking, PMR).
- [ ] Téléphone, e-mail, horaires.
- [ ] Lien de prise de RDV (Doctolib ou autre).
- [ ] Tarifs, durée, moyens de paiement, politique d'annulation, visio (plateforme utilisée).

### Mentions légales et RGPD

- [ ] Statut, SIRET, ADELI / RPPS, ordre, assurance RC pro.
- [ ] Hébergeur définitif.
- [ ] Durée de conservation des messages.
- [ ] Mesure d'audience souhaitée ou non.

### Avant la mise en ligne

- [ ] Plus aucun `[…]` dans le site : `grep -rn "\[" src/config src/pages src/content`.
- [ ] `SITE_URL` renseignée, formulaire testé une fois déployé.
