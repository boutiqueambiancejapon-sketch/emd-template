# Progression — 10min-template

## Complété — Template cleanup

### Nettoyage et abstraction
- [x] Suppression de tout le contenu Apple (articles, produits, blog)
- [x] Création de `niche.config.ts` — fichier de configuration central
- [x] Abstraction de tous les composants (Hero, Nav, Footer, FeaturedTools, DealsStrip, AuthorTeaser)
- [x] Remplacement des 5 sections Apple hardcodées par 1 `CategorySection` générique
- [x] Mise à jour configs (cms.config, layout, sitemap, robots, package.json)
- [x] Nettoyage content/ (settings.yaml, pages/*.yaml, exemples)
- [x] Fichiers exemples (_example.mdx, _example.yaml)
- [x] Nettoyage docs et SVGs

## Architecture

Le template est prêt à être forké. Pour initialiser un nouveau site :
1. Fork ce repo
2. Donner le prompt d'init (`docs/PROMPT-INIT.md`) à Claude Code
3. Répondre aux questions → `niche.config.ts` est rempli automatiquement
4. Le site est buildable et déployable
