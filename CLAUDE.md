# Claude Code — 10min-template

Lis PROGRESS.md avant chaque session. Lis /docs/ selon ta tâche.
Article ou page de contenu → lire SEO-GEO-REDACTION.md ET le fichier AUTHOR correspondant avant la première ligne.

## Projet
Template générique "10 minutes" · Stack : Next.js ~16.2.1 + Tailwind v4 + TypeScript strict
Langue : FR uniquement · pas de [locale] · routes racine directes
Configuration centralisée dans `niche.config.ts`

## DA & images
DA : typographie configurable · effets aurora/noise CSS · SVG inline · composition dark bold
Toute section visuellement vide est un bug de DA. Claude Code a toute latitude — documenter dans DECISIONS.md.

## Assets autorisés
Images : `public/images/` — uploadées via le CMS ou commitées directement
Utiliser `next/image` avec `alt` descriptif pour toutes les images éditoriales
Icônes : lucide-react · SVG inline pour éléments décoratifs
OG : générées via app/opengraph-image.tsx
Jamais : picsum · unsplash · placeholder.com · images hotlinkées depuis un CDN tiers

## Fonts
Next.js variables : `--next-font-primary` (Space Grotesk) · `--next-font-display` (configurable) · `--next-font-mono` (JetBrains Mono)
Tailwind theme : `--font-primary` → `var(--next-font-primary)` · idem pour display et mono

## Liens affiliés
TOUT lien Amazon dans le code ou le contenu MDX doit passer par addAffiliateTag() ou le composant <AffiliateLink>.
Plugin remark actif sur tous les fichiers MDX.
Tag affilié configuré dans `niche.config.ts`.

## Configuration centralisée
`niche.config.ts` est le fichier maître. Tous les composants, configs et pages en dépendent.
Pour personnaliser un site : modifier uniquement `niche.config.ts`, pas les composants.

## Comportement
- Tâche 3+ étapes → plan tasks/todo.md avant
- Blocage → STOP + re-plan
- Correction → tasks/lessons.md immédiatement
- Done → prouver avant de marquer

## Filtre qualité — avant chaque commit
- [ ] tsc --noEmit · next lint · vitest run
- [ ] Images via next/image uniquement (pas de `<img>` nu) · alt obligatoire
- [ ] Variables CSS · zéro hardcode · composants < 150 lignes
- [ ] Secrets hors repo · CSP sans unsafe-eval
- [ ] zéro fonts.googleapis.com · adjustFontFallback:true
- [ ] Article : byline + AuthorCard + JSON-LD author (sans photo)
- [ ] Tous les liens Amazon passent par addAffiliateTag() ou <AffiliateLink>
- [ ] curl retourne H1 sans JS
- [ ] Chaque section a un fond traité documenté dans DECISIONS.md
- [ ] prefers-reduced-motion respecté sur toutes les animations
- [ ] Contraste texte/fond vérifié pour chaque effet DA (dark-only)
- [ ] middleware.ts présent et actif

## Git
Jamais direct sur main · feature = branche = PR · Conventional Commits anglais
Branches : feature/ · fix/ · content/

## Code
TS strict · HTML sémantique · params Promise await
Jamais 'use client' sur page.tsx · getData() serveur · fetch cache explicite
Jamais d'event handler (onXxx) dans un Server Component — CSS :hover ou extraire 'use client'

## Fin de session
git add PROGRESS.md DECISIONS.md && git commit -m "docs: update PROGRESS and DECISIONS"
Pusher branche courante — jamais main.
