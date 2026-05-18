# design-incoming/

Zone d'atterrissage pour les **outputs livrés par Claude Design** (JSX, HTML, snippets Tailwind, mockups, descriptions de sections).

Ce dossier est volontairement vide sur le template. Sur un site enfant, il se remplit dès que tu as un livrable Claude Design à intégrer.

## Workflow par défaut sur un nouveau site

1. **Use this template** sur GitHub → nouveau repo, clone-le.
2. Colle ici tout ce que Claude Design t'a livré (un fichier par écran / section / composant suffit).
3. Ouvre Claude Code sur le repo et dis simplement : *« intègre ce qui est dans `design-incoming/` »*. Claude lit `READ-FIRST.md` (ce fichier) et applique la procédure ci-dessous.

## Ce que Claude Code doit faire quand ce dossier n'est pas vide

**Lire** chaque fichier avant toute action, puis :

- **Mapper** sur la structure du template :
  - pages complètes → `app/`
  - composants réutilisables → `components/`
  - tokens (couleurs, fonts, logo, vocabulaire) → `niche.config.ts` (jamais en dur dans le JSX)
  - contenus éditoriaux → `content/`
- **Convertir** systématiquement :
  - hex / fonts en dur → variables CSS (`var(--accent-1)`, `var(--font-display)`, etc.)
  - `<img>` → `next/image` avec `alt` descriptif
  - `'use client'` uniquement sur les composants réellement interactifs (event handlers, state)
  - syntaxe Tailwind v4 (pas v3 : interdire `text-opacity-*`, etc.)
- **Réutiliser** les composants MDX et UI déjà présents (`ProductCTA`, `CompareBar`, `Verdict`, `ProConTable`, `Tip`, `Warning`, `StatCard`, `PullQuote`…) plutôt que ré-inventer un équivalent depuis le JSX livré.
- **Respecter** le filtre qualité de `CLAUDE.md` (variables CSS uniquement, `addAffiliateTag()` sur tout lien Amazon, `prefers-reduced-motion`, contraste WCAG AA, etc.).
- **Supprimer ce dossier** une fois l'intégration committée. Si le dossier vient à se vider, le supprimer aussi.

## Ce qu'il NE faut PAS faire

- Lancer un « prompt d'init » qui pose 10 questions. Ce workflow est mort — voir `docs/PROMPT-INIT.md` (deprecated).
- Recopier du JSX tel quel sans le repasser au filtre qualité.
- Inventer des couleurs, fonts ou un nom de site si Claude Design ne les a pas fournis : demander à l'utilisateur ou laisser un `TODO` explicite dans `niche.config.ts`.
- Toucher à `packages/cms/`, `lib/`, `middleware.ts`, ou aux composants génériques (`Hero`, `Nav`, `Footer`, `CategorySection`) sans raison explicite.

## Si ce dossier est vide ou absent

Claude Code ne propose pas de questionnaire d'init. Il demande simplement à l'utilisateur ce qu'il veut faire (intégrer un livrable, rédiger un article, compléter `niche.config.ts` à la main, etc.) et attend des instructions claires.
