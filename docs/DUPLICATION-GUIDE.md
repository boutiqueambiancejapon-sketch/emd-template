# Guide de personnalisation par site

Checklist des modifications à faire sur un nouveau repo forké du template `emd-template`. La plupart du travail éditorial passe par les Skills (auto-déclenchés) ; ce qui reste manuel est ci-dessous.

Le workflow officiel :

1. **Use this template** sur GitHub (pas un fork) → nouveau repo propre.
2. Cloner localement, `npm install`, `npm run dev`.
3. Suivre la checklist ci-dessous.
4. À la première demande de rédaction, laisser le skill `ton-of-voice` conduire l'interview de 8 questions.

---

## Étape 1 — Configuration technique (`niche.config.ts`)

C'est le SEUL fichier de configuration technique éditable. Remplir au minimum :

- `siteName`, `domain`, `tagline`
- `entity`, `entities`, `entityVerb`, `dealWord` (vocabulaire de la niche)
- `heroPrefix`, `heroSuffix`, `rotatingWords`, `subtitle`
- `categories` (1 à 5 catégories minimum)
- `palette` (5 accents + 3 backgrounds + 3 textes) ou les laisser et les écraser via Claude Design
- `fonts.display`, `fonts.body` (Google Fonts)
- `logo` (texte du logo)
- `affiliateTag` (tag Amazon)
- `repo` (« org/repo » du nouveau site)
- `branch` (en général `main`)
- `signature` (anchor, oneRule, inspiration, forbidden — clé anti-IA visuelle)

Les champs `author.*` peuvent rester vides si tu utilises `content/ton-of-voice.md` (voix générique du site).

## Étape 2 — Voix éditoriale

Deux niveaux possibles :

- **Voix site** (obligatoire) : `content/ton-of-voice.md`. Rempli automatiquement par le skill `ton-of-voice` lors de la première demande de rédaction (interview 8 questions). Ne pas éditer à la main sauf raison spécifique.
- **Voix auteur** (optionnel) : `docs/AUTHOR-[slug].md` par auteur signé. Suivre le template `docs/AUTHOR-template.md`. Créer aussi la fiche `content/authors/[slug].yaml` côté CMS.

## Étape 3 — Contenu d'amorçage (via CMS ou à la main dans `content/`)

- `content/settings.yaml` : `siteName`, `siteDescription`, `siteUrl`, structure de navigation.
- `content/pages/home.yaml` : eyebrow, h1_prefix/suffix, rotating_words, subtitle, CTAs, tools section.
- `content/pages/deals.yaml` : titres + bandeau défilant + disclaimer affiliation.
- `content/pages/comparer.yaml` : titres.
- Au moins 1 article de test dans `content/articles/` pour valider le build blog.

## Étape 4 — Identité visuelle (si pas de Claude Design)

Si tu as des outputs Claude Design à intégrer : les coller dans `design-incoming/` et lancer le skill `integrate-claude-design`.

Sinon, modifier à la main :

- `app/layout.tsx` : fonts Google (`next/font`), `metadataBase`, `title.default`, `description`.
- `app/globals.css` : variables `:root` (couleurs, radii, shadows). Voir `docs/DA-PRESETS.md` pour les helpers.
- `app/admin/layout.tsx` : couleurs du sidebar admin pour matcher la palette.
- `components/layout/Nav.tsx` et `components/layout/Footer.tsx` : logo, liens.

## Étape 5 — Affiliation

- `niche.config.ts` → `affiliateTag` : tag Amazon du site.
- Vérifier que `lib/utils/affiliate.ts` lit bien ce tag (devrait être auto).
- Disclosure affiliation : champ `affiliate_disclaimer` dans `content/pages/*.yaml` (à reformuler pour CHAQUE site, anti-footprint SEO — le skill `humaniser-fr` catégorie G5 gère ça).

## Étape 6 — SEO technique par site

- `app/sitemap.ts` : domaine.
- `app/robots.ts` : domaine.
- `app/opengraph-image.tsx` : couleurs et fonts si custom.
- Vérifier que `niche.config.ts → vercelRegion` est sur la bonne région (fra1 par défaut).

## Étape 7 — Variables d'environnement Vercel

```
CMS_SECRET=<openssl rand -hex 32>
CMS_GITHUB_TOKEN=<PAT GitHub avec accès au nouveau repo>
BLOB_READ_WRITE_TOKEN=<auto via Vercel Blob store>
GITHUB_CMS_CLIENT_ID=<OAuth App du site (optionnel)>
GITHUB_CMS_CLIENT_SECRET=<secret OAuth (optionnel)>
CMS_ALLOWED_USERS=<username GitHub admin>
BFL_API_KEY=<clé Flux pour génération d'images (optionnel)>
```

Créer aussi un Vercel Blob store (Storage > Blob > Public access) — le `BLOB_READ_WRITE_TOKEN` se crée automatiquement.

## Étape 8 — Vérifications avant premier déploiement

- [ ] `npm run build` passe sans erreur.
- [ ] `npm run type-check` passe.
- [ ] Au moins 1 article test build correctement et est affiché sur `/blog`.
- [ ] CMS accessible sur `/admin`.
- [ ] `content/ton-of-voice.md` est rempli (plus de TODO).
- [ ] Aucune mention résiduelle du domaine ou du nom du site source dans le code (sauf `content/`).
- [ ] Liens affiliés Amazon testés : clic via `<AffiliateLink>` retourne le bon tag.

## Ce qu'on NE touche PAS

Ces dossiers sont identiques pour tous les sites enfants :

```
packages/cms/              ← CMS complet (auth, CRUD, media, users, WYSIWYG)
app/admin/                 ← Pages admin (sauf couleurs layout)
app/api/cms/               ← API routes CMS
scripts/upload-blob.ts     ← Script upload images
middleware.ts              ← Passthrough CSP / headers
lib/cms-pages.ts           ← Helper lecture pages YAML
skills/                    ← Skills auto-déclenchés (sauf si tu en ajoutes des spécifiques au site)
```

Des modifications dans ces dossiers cassent la portabilité entre sites du réseau.
