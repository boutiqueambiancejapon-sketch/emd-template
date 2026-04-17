# Prompt DA — Initialisation direction artistique

Copier-coller ce prompt à Claude Code après avoir répondu aux questions d'identité (Blocs 0-5).

---

```
Tu vas créer la direction artistique de ce site. Pas "changer les couleurs" — créer une VRAIE identité visuelle.

## Règles absolues

1. Tu ne touches PAS à niche.config.ts avant d'avoir terminé tout le processus DA ci-dessous
2. Tu ne dis JAMAIS "j'ai appliqué la palette" — tu montres le RÉSULTAT visuel
3. Chaque composant modifié doit avoir un AVANT/APRÈS visible
4. Si deux sites du template se ressemblent après ton travail, tu as échoué

## Étape 1 — Recherche (ne code rien encore)

Lis ces fichiers dans l'ordre :
- `docs/DA-ANTI-IA.md` (entier)
- `docs/DA-PRESETS.md` (entier)
- `lib/da-presets/index.ts` (comprendre les helpers)

Puis exécute ce code dans ta tête :

import { composePreset, findUIStyles, findNicheRules } from '@/lib/da-presets'
const preset = composePreset('[LA NICHE]', ['[MOT1]', '[MOT2]', '[MOT3]'])

Dis-moi :
- Quel `productType` matche le mieux
- Quel UI style (`preset.styles[0].category`) tu choisis et POURQUOI
- Quels `antiPatterns` de la niche rule tu dois respecter
- Le `cssKeywords` et `variables` du style UI choisi

N'invente rien. Cite les données de la base.

## Étape 2 — Brief créatif (ne code toujours rien)

Rédige un brief de 10 lignes MAX qui décrit :
1. **Le magazine/site de référence** dont on s'inspire pour le TON (pas le layout) — 1 seul, pas 3
2. **L'émotion** que le visiteur doit ressentir en 3 secondes sur la home
3. **La texture** du site : lisse/brut/texturé/aérien/dense/...
4. **Le geste signature** : 1 élément visuel qu'on ne voit sur aucun autre site du template
5. **Les 3 interdits** : ce que ce site ne fera JAMAIS (ex: "jamais de border-radius > 4px")

Présente-le moi. J'approuve ou j'ajuste avant que tu codes.

## Étape 3 — globals.css (TOUT réécrire, pas patcher)

Ouvre `app/globals.css`. Tu vas réécrire la section `:root` ET ajouter une section `/* ── Style UI: [nom] ── */`.

Ce que tu DOIS changer (pas optionnel) :
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full` → selon le style UI
- `--shadow` → nouvelle valeur cohérente avec le style (dure/diffuse/none/glow)
- `--border` → épaisseur et opacité selon le style
- Toutes les couleurs palette (11 variables)
- Aurora colors SI effects = aurora
- Light mode overrides SI mode = light
- Transitions : `--transition-fast`, `--transition-base` → durée selon le style

Ce que tu DOIS ajouter :
- Variables custom du style UI (ex: `--glass-bg`, `--glow`, `--shadow-raised`)
- Classes utilitaires spécifiques au style (ex: `.glass-card`, `.brutalist-border`)
- Hover states custom pour `.cms-card`, `.tool-card`, `.blog-grid li`

Quand c'est fait, montre-moi les 30 premières lignes du `:root` modifié.

## Étape 4 — Composants (modifier le code, pas juste le CSS)

Tu DOIS ouvrir et modifier ces fichiers. Pas "si nécessaire" — OBLIGATOIRE :

### a) `components/home/HeroSection.tsx`
- Modifier les `style={{}}` inline du hero choisi (split/centered/minimal)
- Appliquer le traitement typo du style UI (taille, weight, letter-spacing, text-transform)
- Modifier le CTA : flat/gradient/outline/glow selon le style UI
- Ajuster le spacing (padding, gap, margins)

### b) `components/blog/ArticleCard.tsx`
- Modifier le traitement des cards : border, shadow, radius, background
- Hover state : pas un simple `opacity` — un vrai effet cohérent avec le style

### c) `app/(site)/blog/[categorie]/[slug]/page.tsx`
- Modifier le hero article (le bandeau cinématique)
- Adapter la sidebar : borders, spacing, fond
- Vérifier que le style UI est cohérent dans l'article

### d) `app/admin/layout.tsx`
- Adapter les couleurs du sidebar admin à la nouvelle palette
- Le CMS doit refléter la DA du site, pas rester en default

### e) `app/opengraph-image.tsx`
- Couleurs, fonts, layout de l'image OG

Pour CHAQUE fichier modifié, dis-moi la modification principale en 1 phrase.

## Étape 5 — Vérification croisée

Avant de me montrer le résultat, vérifie :
- [ ] `border-radius` n'est PAS le même que le template par défaut
- [ ] `box-shadow` n'est PAS le même que le template par défaut
- [ ] La font display n'est PAS Unbounded (celle du template)
- [ ] La font body n'est PAS Space Grotesk (celle du template)
- [ ] Le hero a un élément visuel que le template par défaut n'a pas
- [ ] Les cards ont un traitement différent du template par défaut
- [ ] Au moins 1 composant signature est activé et visible
- [ ] L'admin CMS a les bonnes couleurs
- [ ] `tsc --noEmit` passe
- [ ] `next lint` passe

Si UN SEUL de ces points est "même chose que le défaut", tu corriges AVANT de me montrer.

## Étape 6 — Montre le résultat

Lance `npm run dev`. Ouvre la home, un article, et `/admin`.
Décris-moi ce que tu VOIS à l'écran en 5 phrases — pas ce que tu as codé, ce que tu VOIS.
```

---

## Notes d'utilisation

- Remplace `[LA NICHE]` par le sujet du site (ex: "aspirateurs robots", "CBD", "cartes de crédit")
- Remplace `[MOT1]`, `[MOT2]`, `[MOT3]` par 3 mots d'ambiance (ex: "tech", "premium", "dark")
- Ce prompt se lance APRÈS les Blocs 0-5 du PROMPT-INIT (identité, vocabulaire, catégories, outils, auteur)
- Il remplace le Bloc 6 (DA & Branding) et l'Étape 1 (Config + DA) du workflow standard
- L'utilisateur valide le brief créatif (Étape 2) AVANT que Claude ne code
