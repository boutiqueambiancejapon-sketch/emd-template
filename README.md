# emd-template

Template Next.js pour sites éditoriaux « 10 minutes » — comparateur, quiz, simulateur, deals, blog. Toute la configuration passe par `niche.config.ts`. CMS intégré sur `/admin`.

## Démarrage

```bash
# 1. "Use this template" sur GitHub → nouveau repo, clone-le
cp .env.example .env.local
npm install
npm run dev

# 2. Colle les outputs Claude Design dans design-incoming/
# 3. Ouvre Claude Code → « intègre ce qui est dans design-incoming/ »
```

Pas d'outputs Claude Design ? Remplis `niche.config.ts` à la main, c'est le seul fichier obligatoire.

Voir [`design-incoming/READ-FIRST.md`](design-incoming/READ-FIRST.md) pour la procédure d'intégration détaillée.

## Stack

| Outil | Version |
|---|---|
| Next.js | ~16.2.1 (patch auto) |
| TypeScript | strict |
| Tailwind CSS | v4 |
| Hébergement | Vercel — région fra1 |
| CMS | Custom (packages/cms/) |

## Composants MDX

Disponibles dans les articles :

| Composant | Usage |
|---|---|
| `<ArticleImage>` | Image optimisée inline (`src`, `alt`, `caption`) |
| `<ProductCTA>` | Carte produit affilié (`name`, `price`, `url`, `image?`, `badge?`, `hook?`) |
| `<ProductCarousel>` | Carousel horizontal de produits (`products="slug-1,slug-2"`) |
| `<CompareBar>` | Barre comparaison visuelle (`label`, `left`, `right`, `leftName`, `rightName`) |
| `<CompareBarGroup>` | Wrapper pour grouper les CompareBar |
| `<Tip>` | Bloc conseil |
| `<Warning>` | Bloc avertissement |
| `<Verdict>` | Verdict avec note (`note`, `label`) |
| `<ProConTable>` | Tableau avantages/inconvénients (`pros`, `cons`) |
| `<PullQuote>` | Citation mise en avant (`author`) |
| `<StatCard>` | Statistique (`value`, `label`) |
| `<StatRow>` | Wrapper pour grouper les StatCard |

## CMS (`/admin`)

- Editeur WYSIWYG TipTap (tables, images, formatage)
- Import intelligent (copier-coller texte brut)
- Sidebar SEO compacte
- FAQ preview en temps réel
- Upload images + génération IA (Flux)
- Gestion auteurs avec vue articles
- Display name utilisateurs
- Éditeurs enrichis par page (home, quiz)

## Pages incluses

| Route | Type |
|---|---|
| `/` | Home dynamique |
| `/blog` | Hub articles |
| `/blog/[categorie]/[slug]` | Article MDX |
| `/comparer` | Comparateur |
| `/comparer/[produit]` | Comparateur par catégorie |
| `/quiz` | Quiz interactif (questions éditables via CMS) |
| `/simulateur` | Simulateur |
| `/deals` | Deals |
| `/choisir/[produit]` | Guide d'achat |
| `/auteurs/[slug]` | Page auteur (JSON-LD Person) |
| `/mentions-legales` | Mentions légales |
| `/confidentialite` | Politique de confidentialité |
| `/admin/*` | CMS complet |

## SEO

- JSON-LD (Article, Person, BreadcrumbList, FAQPage, WebSite)
- OG dynamique par page
- Sitemap + robots.ts
- hreflang prêt (ajouter `'en'` dans `niche.locales` pour activer)
- `docs/SEO-GEO-REDACTION.md` — guide permanent

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run lint` | ESLint |
| `npm run type-check` | Vérification TypeScript |
| `npm run test` | Tests unitaires (Vitest) |

## Documentation

- [`design-incoming/READ-FIRST.md`](design-incoming/READ-FIRST.md) — Workflow d'intégration Claude Design
- [`docs/TEMPLATE-SPEC.md`](docs/TEMPLATE-SPEC.md) — Architecture du template
- [`docs/CMS-SPEC.md`](docs/CMS-SPEC.md) — Documentation CMS
- [`docs/SEO-GEO-REDACTION.md`](docs/SEO-GEO-REDACTION.md) — Guide SEO/GEO rédaction
- [`docs/DA-PRESETS.md`](docs/DA-PRESETS.md) — Presets DA
- [`docs/DA-ANTI-IA.md`](docs/DA-ANTI-IA.md) — Patterns visuels anti-IA
- [`DECISIONS.md`](DECISIONS.md) — Décisions d'architecture
- [`PROGRESS.md`](PROGRESS.md) — Progression

## Variables Vercel

```
CMS_SECRET=<openssl rand -hex 32>
CMS_GITHUB_TOKEN=<PAT GitHub>
BLOB_READ_WRITE_TOKEN=<auto via Vercel Blob>
GITHUB_CMS_CLIENT_ID=<OAuth App>       # optionnel
GITHUB_CMS_CLIENT_SECRET=<OAuth App>   # optionnel
BFL_API_KEY=<Flux — génération images> # optionnel
```
