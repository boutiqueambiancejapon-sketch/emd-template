# 10min-template

Template générique pour créer un site "10 minutes" — comparateur, quiz, simulateur et deals.

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

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run lint` | ESLint |
| `npm run type-check` | Vérification TypeScript |
| `npm run test` | Tests unitaires (Vitest) |

## Documentation

- [`docs/TEMPLATE-SPEC.md`](docs/TEMPLATE-SPEC.md) — Architecture du template
- [`docs/CMS-SPEC.md`](docs/CMS-SPEC.md) — Documentation CMS
- [`docs/PROMPT-INIT.md`](docs/PROMPT-INIT.md) — Prompt d'initialisation
- [`DECISIONS.md`](DECISIONS.md) — Décisions d'architecture
- [`PROGRESS.md`](PROGRESS.md) — Progression

## Variables Vercel

```
CMS_SECRET=<openssl rand -hex 32>
CMS_GITHUB_TOKEN=<PAT GitHub>
BLOB_READ_WRITE_TOKEN=<auto via Vercel Blob>
GITHUB_CMS_CLIENT_ID=<OAuth App>
GITHUB_CMS_CLIENT_SECRET=<OAuth App secret>
```
