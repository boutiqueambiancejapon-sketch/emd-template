# Progression — emd-template

## Architecture actuelle

Le template est prêt à être réutilisé sur de nouveaux sites. Workflow par défaut :

1. **Use this template** sur GitHub → nouveau repo.
2. `npm install && npm run dev`.
3. Soit coller les outputs Claude Design dans `design-incoming/` et demander à Claude Code de les intégrer (voir `design-incoming/READ-FIRST.md`), soit remplir `niche.config.ts` à la main.

Plus de « prompt d'init » en 10 questions — voir `docs/PROMPT-INIT.md` (deprecated).

## Invariants du template

- `niche.config.ts` est l'unique fichier de configuration éditable par site.
- `packages/cms/` est portable tel quel entre sites.
- Le `CategorySection` générique remplace les sections hardcodées.
- Tout ce qui touche aux fonts, couleurs et vocabulaire passe par variables CSS / config — jamais en dur dans le JSX.

## Historique

- Nettoyage complet du contenu Apple d'origine (articles, sections, configs hardcodées).
- Abstraction des composants (`Hero`, `Nav`, `Footer`, `FeaturedTools`, `DealsStrip`, `AuthorTeaser`).
- Création de `niche.config.ts` comme source de vérité.
- Bascule du workflow init-prompt vers le workflow Claude Design + `design-incoming/`.
