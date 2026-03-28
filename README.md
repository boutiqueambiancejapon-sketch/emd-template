# 10min-template

Template pour créer un site "10 minutes" — comparateur, quiz, simulateur, deals et blog.
Fork, lance le prompt d'init, réponds à 10 questions, le site est prêt.

## Démarrage

```bash
# 1. Fork ce repo
# 2. Cloner et installer
cp .env.example .env.local
npm install
npm run dev

# 3. Initialiser avec Claude Code : donner le prompt de docs/PROMPT-INIT.md
```

## Configuration

Tout le site est configuré via **un seul fichier** : `niche.config.ts`

Le prompt d'init pose les questions et remplit automatiquement ce fichier.

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

- [`docs/PROMPT-INIT.md`](docs/PROMPT-INIT.md) — Prompt d'initialisation
- [`docs/TEMPLATE-SPEC.md`](docs/TEMPLATE-SPEC.md) — Architecture du template
- [`docs/CMS-SPEC.md`](docs/CMS-SPEC.md) — Documentation CMS
- [`docs/SEO-GEO-REDACTION.md`](docs/SEO-GEO-REDACTION.md) — Guide SEO/GEO rédaction
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
