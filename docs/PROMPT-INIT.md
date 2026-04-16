# Prompt d'initialisation — Nouveau site depuis 10min-template

Copier-coller ce prompt à Claude Code connecté au nouveau repo (fork de 10min-template).

---

## Le prompt

```
Tu vas initialiser ce site à partir du template 10min.

## Instructions

1. Lis `docs/TEMPLATE-SPEC.md` pour comprendre l'architecture
2. Lis `docs/CMS-SPEC.md` pour comprendre le CMS
3. Lis `docs/SEO-GEO-REDACTION.md` pour les règles SEO
4. Pose-moi les questions ci-dessous UNE PAR UNE
5. Remplis `niche.config.ts` avec mes réponses
6. Applique la DA (palette, fonts, effets) à tout le site
7. Rédige le premier article
8. Commit et push

## Questions à poser (dans cet ordre)

### Bloc 0 — Technique
Détecter automatiquement le repo GitHub (via `git remote -v`) et la branche principale.
Si la détection échoue, demander :
1. Quel est le repo GitHub ? (ex: mon-org/10minutesvoyage)
2. Quelle est la branche principale ? (ex: main, master, production)

**IMPORTANT** : Le CMS utilise cette branche pour lire/écrire le contenu via l'API GitHub.
Mettre à jour `niche.config.ts` (champs `repo` et `branch`) ET vérifier que `cms.config.ts` les propage.

### Bloc 1 — Identité & Langue
1. Quel est le sujet/niche du site ? (ex: voyage, cartes de crédit, aspirateurs, crypto)
2. Quel nom de domaine ? (ex: 10minutesvoyage.com)
3. Tagline en une phrase ? (ex: "Trouvez votre destination en 10 minutes")
4. Quelle langue principale ? (ex: FR, EN)
   Le site sera-t-il multilingue à terme ? Si oui, quelles langues ?

**Si la langue principale n'est pas FR** :
- Mettre à jour `niche.defaultLocale` (ex: `'en'`)
- Les textes UI (nav, footer, boutons, labels) s'adaptent automatiquement
  via `content/translations/[locale].json`
- Le contenu éditorial (articles, pages YAML) doit être rédigé dans la langue choisie
- Les textes dans `niche.config.ts` (tagline, subtitle, heroPrefix, etc.) doivent être
  dans la langue principale

**Si multilingue prévu** :
- Ajouter les locales dans `niche.locales` (ex: `['fr', 'en']`)
- Le hreflang se configure automatiquement dans layout.tsx
- Les fichiers de traduction existent déjà : `content/translations/fr.json` et `en.json`
- Le routing `[locale]` sera ajouté plus tard (session dédiée)

### Bloc 2 — Vocabulaire
Sur base de la niche, propose-moi et demande validation :
- entity / entities (ex: "destination" / "destinations")
- entityVerb (ex: "explorer", "acheter", "souscrire")
- dealWord (ex: "bons plans", "deals", "offres")
- rotatingWords pour le hero (ex: ["vol", "hôtel", "road trip", "croisière"])
- subtitle du hero

### Bloc 3 — Catégories
4. Quelles catégories pour ce site ? (ex: Europe, Asie, Amériques)
   Pour chaque catégorie je proposerai une couleur accent.

### Bloc 4 — Outils
5. Quels outils activer ?
   - Quiz : quelle question principale ? quels critères ?
   - Comparateur : quels critères de comparaison ?
   - Simulateur : quel calcul ?

### Bloc 5 — Auteur
6. Qui rédige ?
   - Prénom
   - Titre/rôle
   - Bio (2 phrases)
   - Ton (3 adjectifs)
   - Formulations récurrentes (ex: "Honnêtement,")
   - No-go (formulations interdites)

### Bloc 6 — DA & Branding (AUTONOME)

**La question** : "As-tu une ambiance en tête ? (3 mots-clés, ou laisse-moi décider)"

Si l'utilisateur donne des mots-clés → les utiliser comme input.
Si l'utilisateur dit "décide" / "je te fais confiance" → Claude décide TOUT seul.

**AVANT de proposer** :
1. Lire `docs/DA-PRESETS.md` — base de 161 palettes, 72 fonts, 75 styles, 161 règles
2. Lire `docs/DA-ANTI-IA.md` — guide anti-IA avec signature et patterns interdits
3. Utiliser les helpers de `lib/da-presets` :

```ts
import { composePreset, findPalettes } from '@/lib/da-presets'
const preset = composePreset('Healthcare App', ['calm', 'modern'])
// ou
const matches = findPalettes(['robot', 'tech', 'home', 'appliance'], 5)
```

**Claude Code compose TOUT et présente en bloc.** Ne pas poser de sous-questions
sur la palette, les fonts, ou les effets. Tout proposer d'un coup.

#### Ce que Claude Code décide seul :

**Style structurel** :
- mode : `dark` ou `light` — dark pour tech/gaming/premium, light pour santé/cuisine/lifestyle
- hero : `split` (texte + nav catégories), `centered` (tout centré), `minimal` (titre + 1 CTA)
- effects : `aurora` (gradient animé bold), `subtle` (noise léger), `none` (minimal)
- cards : `bordered` (border-top accent + watermark), `filled` (fond accent), `minimal` (texte pur)

**Logo** : texte libre. `·` = séparateur visuel (ex: "10min·voyage"). Sinon, gras.

**Ordre sections home** : adapté à la niche.
Options : `ticker`, `deals`, `articles`, `categories`, `tools`, `author`

**Palette complète** (11 couleurs) :
- accent1 → couleur principale (CTAs, liens, éléments actifs)
- accent2 → couleur secondaire (badges, highlights)
- accent3 → couleur tertiaire (succès, validation)
- accent4 → couleur quaternaire (quiz, éléments interactifs)
- accent5 → couleur quinaire (liens secondaires)
- bgPrimary → fond principal (dark: noir teinté, JAMAIS #000000 ; light: off-white, JAMAIS #FFFFFF)
- bgSurface → fond cartes
- bgSurface2 → fond cartes secondaire
- textPrimary / textSecondary / textMuted

**Fonts** (2 familles, contraste obligatoire) :
- display : titres (ex: Unbounded, Syne, Outfit, Manrope, Plus Jakarta Sans)
- body : texte courant (ex: Space Grotesk, Inter, DM Sans, Geist)
IMPORTANT : uniquement Google Fonts compatibles next/font.

**Effets visuels** (si effects != 'none') :
- Aurora : 3 couleurs du gradient (accent1 + accent4 + accent3)
- Noise : opacité 0.03–0.05

**Signature anti-IA** (voir `docs/DA-ANTI-IA.md`) :
- `anchor` : choisir l'élément éditorial distinctif
- `oneRule` : choisir 1 règle contrariante
- `inspiration` : choisir 2-3 magazines/sites de référence
- `forbidden` : patterns IA interdits (min 3)
- `components` : activer les composants signature pertinents

#### Format de présentation à l'utilisateur :

```
Voici la DA que je propose pour [siteName] :

■ Style : [mode] / [hero] hero / effets [effects] / cards [cards]
■ Logo : [logo]
■ Sections home : [liste ordonnée]

■ Palette :
  accent1 [hex] — [usage]
  accent2 [hex] — [usage]
  ... (les 11 couleurs en tableau)

■ Fonts : [display] (titres) + [body] (texte)

■ Signature anti-IA :
  · Ancre : [anchor]
  · Règle : [oneRule]
  · Inspirations : [inspiration]
  · Composants : [components]
  · Interdits : [forbidden]

Raisonnement : [2 phrases max — pourquoi ces choix pour cette niche]

Tu valides ou tu ajustes ?
```

### Bloc 7 — Affiliation
8. Tag affilié Amazon ? (ex: monsite-21)
9. Autres boutiques affiliées ? (Fnac, Booking, etc.)

### Bloc 8 — Premier article
10. Quel sujet pour le premier article ? (calibre le template blog)

## Après les réponses — workflow page par page

**Principe** : on avance typologie par typologie. Chaque étape se termine par une validation
de l'utilisateur AVANT de passer à la suivante. Si l'utilisateur n'est pas satisfait, on ajuste.
Ne jamais tout générer d'un coup — itérer page par page.

### Étape 1 — Config + DA + Style UI
1. Remplir `niche.config.ts` avec TOUTES les valeurs
2. **`app/globals.css`** — Réécrire TOUTES les variables CSS :
   - Palette (11 couleurs)
   - Aurora (si effects = aurora)
   - Light mode overrides
   - **STYLE UI** — c'est le plus important. Lire le style trouvé via `findUIStyles()`
     et appliquer les modifications CSS concrètes décrites dans `docs/DA-ANTI-IA.md`
     section "APPLICATION CSS CONCRÈTE PAR STYLE UI" :
     - `--radius-*` : 0 pour brutalism/editorial, 12-16px pour glass, etc.
     - `--shadow` : dure (brutalism), diffuse (glass), double (neumorphism), aucune (minimal)
     - Transitions, borders, spacing, backdrop-filter, glow
     - Section `/* ── Style UI ── */` avec les variables custom du style
3. **Composants** — Adapter le CSS des cards, boutons, hero selon le style UI :
   - Brutalism → border-radius: 0, border 2-3px, shadow dure, typo massive
   - Glassmorphism → backdrop-blur, borders rgba, shadow diffuse, radius 12px+
   - Editorial → serif display, grille asymétrique, filets, lettrine
   - Neumorphism → double shadow raised/inset, pas de borders
   - Etc. — voir DA-ANTI-IA.md pour chaque style
4. **`app/layout.tsx`** — Remplacer les fonts
5. **`public/icons/brand/`** — Régénérer logo.svg, favicon.svg, og-default.svg
6. **`app/opengraph-image.tsx`** — Mettre à jour les couleurs
7. **Admin CMS** — Mettre à jour les couleurs aurora sidebar si besoin

**IMPORTANT** : ne pas se limiter à remplir les 4 variantes (`hero`, `cards`,
`effects`, `mode`). Le style UI va plus loin — il modifie la FORME du site,
pas seulement sa couleur. Deux sites "split hero + dark mode" mais l'un en
Brutalism et l'autre en Glassmorphism doivent avoir un aspect radicalement différent.

**→ Lancer `npm run dev` et montrer le résultat à l'utilisateur.**
**→ "Voici la DA appliquée : style [nom du style UI], palette [nom], fonts [display+body]. Les formes, les ombres, la densité te conviennent ?"**
**→ Attendre validation avant de continuer.**

**Si multilingue** : vérifier que `content/translations/[locale].json` est complet pour la locale
principale. Si EN, relire `en.json` et s'assurer que chaque clé a un texte naturel (pas une
traduction mot-à-mot). Adapter le ton au marché cible.

### Étape 3 — Images structurelles

**IMPORTANT** : les prompts IA du registre d'images (`lib/image-slots.ts`) sont des templates
génériques qui utilisent `[niche]` et `[nicheEn]` comme placeholders. À l'init, Claude Code
**DOIT** réécrire chaque prompt pour qu'il reflète exactement :
- La **niche** choisie au Bloc 1 (ex: "CBD", "aspirateurs robots", "cartes de crédit")
- L'**ambiance visuelle** choisie au Bloc 6 (ex: "moody", "clean", "warm", "premium")
- La **palette** choisie (mentionner les couleurs dominantes dans les prompts)
- Le **style** choisi (dark/light, editorial/tech/playful)

Exemple de prompt AVANT init (générique) :
```
Cinematic editorial hero background photo, [niche] theme, moody atmospheric lighting...
```

Exemple de prompt APRÈS init (adapté à un site CBD) :
```
Cinematic editorial photo of premium CBD oil bottles and hemp leaves on a textured
wooden surface, warm amber and sage green tones, shallow depth of field, soft natural
lighting with dramatic shadows, magazine-quality still life composition --ar 2:1 --style raw
```

Les prompts doivent être utilisables directement dans Midjourney/DALL-E/Flux sans modification.

7. Réécrire chaque `prompt` dans `lib/image-slots.ts` pour la niche + ambiance + palette
8. Lister les images à générer à l'utilisateur avec les prompts finaux

**Si `GEMINI_API_KEY` ou `BFL_API_KEY` est configuré** :
9. Proposer de générer les images automatiquement via `npx tsx scripts/generate-images.ts`
   Le script lit les slots, appelle le provider disponible, et stocke sur Vercel Blob.
   On peut aussi générer slot par slot : `--slot home-hero-background`

**→ "Voici les emplacements d'images avec les prompts IA adaptés à ta niche."**
**→ "Tu veux que je lance la génération automatique ? (nécessite GEMINI_API_KEY ou BFL_API_KEY dans les env vars Vercel)"**
**→ "Sinon, tu peux copier les prompts et les utiliser dans Midjourney/DALL-E. On continue ?"**
**→ Attendre validation.**

### Étape 3 — Home
9. Mettre à jour `content/settings.yaml` (nav avec les catégories)
10. Mettre à jour `content/pages/home.yaml` (rotating_words, subtitle, CTAs)
11. Vérifier que le hero, les sections catégories, les outils et l'auteur s'affichent correctement

**→ Si multilingue** : vérifier que tous les textes visibles sur la home viennent de `t()` et
sont corrects dans la locale cible. Montrer les textes clés traduits à l'utilisateur.
**→ "Voici la home. Le hero, les sections, les outils te conviennent ? Les textes sont corrects ?"**
**→ Attendre validation.**

### Étape 4 — Hub blog + article type
12. Vérifier que `/blog` affiche le hub magazine (featured + grille + filtres + promo outils)
13. Créer `docs/AUTHOR-[slug].md` (profil auteur)
14. Supprimer `content/articles/_example.mdx` et `content/produits/_example.yaml`
15. Rédiger le premier article (800+ mots, 6+ FAQ, composants MDX)
    Lire `docs/SEO-GEO-REDACTION.md` et `docs/AUTHOR-[slug].md` AVANT de rédiger.
    Composants dispo : `<ArticleImage>`, `<ProductCTA>`, `<ProductCarousel>`,
    `<CompareBar>`, `<Tip>`, `<Warning>`, `<Verdict>`, `<ProConTable>`,
    `<PullQuote>`, `<StatCard>`, `<StatRow>`
    ATTENTION : les props MDX sont des STRINGS uniquement.
    Ex: `<ProConTable pros="Avantage 1|Avantage 2" cons="Inconvénient 1" />`
16. Vérifier le rendu de l'article : hero cinématique, sidebar, composants MDX, FAQ, related articles

**→ Si multilingue** : vérifier les labels du hub (filtres, eyebrow, promo outils), de la sidebar
(TOC, CTA, auteur), et les textes récurrents (byline, reading time, dates).
**→ "Voici le hub blog + l'article. Layout, sidebar, traductions — tout est bon ?"**
**→ Attendre validation.**

### Étape 5 — Pages outils (une par une)

**Chaque page outil est traitée séparément avec validation.**

Pour chaque outil activé (comparateur → quiz → simulateur → deals) :

17. **Remplir les données** de l'outil :
    - Comparateur : `lib/comparateur.ts` avec 5+ modèles par catégorie
    - Quiz : `content/pages/quiz.yaml` avec questions + recommandations
    - Simulateur : calculateur adapté
    - Deals : offres réelles ou placeholders CMS

18. **Ajouter le contenu éditorial** autour :
    - Intro H2 interrogative — réponse directe < 60 mots
    - Verdict H2 après l'outil — recommandation concrète
    - FAQ spécifique (4-6 questions, pas les mêmes que les articles)

19. **Ajouter les JSON-LD** enrichis (ItemList, HowTo, Offer)

20. **Vérifier la DA** — même palette/fonts/effets que le reste

**→ Si multilingue** : vérifier le contenu éditorial de l'outil (intro, verdict, FAQ) dans la
bonne langue. Pas de mélange FR/EN dans une même page.
**→ "Voici la page [comparateur]. Le tableau, le contenu SEO, les traductions — ça te va ?"**
**→ Attendre validation avant de passer à l'outil suivant.**

### Étape 6 — Pages légales + finitions
21. Mettre à jour les pages légales (mentions-legales + confidentialité)
22. Remplir `lib/choisir-content.ts` (contenu éditorial /choisir/)

**→ "Mentions légales et confidentialité à jour. Tout est bon ?"**

### Étape 7 — Vérification finale
23. `tsc --noEmit` + `next lint`
24. Vérifier le contraste WCAG AA pour chaque couleur accent sur les fonds
25. Vérifier chaque page outil a du contenu textuel (pas juste un widget nu)
26. Vérifier les margins/paddings sur mobile
27. Commit et push
```

---

## Exemple de session

**Claude Code** : Quel est le sujet du site ?
**Toi** : Les meilleurs aspirateurs robots
**Claude Code** : Quel nom de domaine ?
**Toi** : 10minutesaspirateur.com
**Claude Code** : Tagline ?
**Toi** : Trouvez le meilleur aspirateur robot en 10 minutes

**Claude Code** : Sur base de "aspirateurs robots", je propose :
- entity : "aspirateur" / entities : "aspirateurs"
- entityVerb : "acheter"
- dealWord : "bons plans"
- rotatingWords : ["Roomba", "Roborock", "Dreame", "Ecovacs", "Dyson"]
- subtitle : "Comparateur indépendant, quiz personnalisé et simulateur de budget — tout pour choisir le bon aspirateur robot."
Tu valides ou tu modifies ?

**Toi** : Valide

**Claude Code** : Quelles catégories ?
**Toi** : Roomba, Roborock, Dreame, Ecovacs, Dyson

**Claude Code** : Ambiance visuelle ?
**Toi** : Tech, propre, moderne

**Claude Code** : Sur base de "tech, propre, moderne" + aspirateurs robots, je propose :

**Style :**
- mode : `dark` — univers tech/gadget
- hero : `centered` — focus sur le message, pas de nav latérale
- effects : `subtle` — noise léger, pas d'aurora (plus clean)
- cards : `filled` — cartes avec fond coloré subtil
- logo : `ASPIRO·guide` (bold + séparateur + light)
- sections home : `['articles', 'categories', 'tools', 'deals', 'author']`

**Palette :**
| Variable | Hex | Usage |
|---|---|---|
| accent1 | `#00D4AA` | CTA principal — vert tech |
| accent2 | `#FF8C42` | Badges, deals — orange warm |
| accent3 | `#4ECDC4` | Succès — teal |
| accent4 | `#6C63FF` | Quiz — indigo |
| accent5 | `#45B7D1` | Liens secondaires — sky |
| bgPrimary | `#0B0F14` | Fond — bleu-noir profond |
| bgSurface | `#111820` | Cartes |
| bgSurface2 | `#1A2230` | Cartes secondaires |
| textPrimary | `#F0F4F8` | Texte |
| textSecondary | `#8899AA` | Texte secondaire |
| textMuted | `#556677` | Texte discret |

**Fonts :**
- display : **Outfit** (géométrique, tech)
- body : **DM Sans** (lisible, moderne)

**Effets :** noise 0.03 (subtil, pas d'aurora)

Tu valides ou tu modifies ?

*(Autre exemple : un site cuisine light-first)*
- mode : `light`, hero : `minimal`, effects : `none`, cards : `minimal`
- logo : `LaCuisine` (pas de séparateur)
- Palette claire : bgPrimary #FAFBFC, accents chauds

*(etc.)*

---

## Résultat attendu

Après la session (~15 min de questions + ~30 min de code), le site est :
- Buildable (`next build` passe)
- Déployable sur Vercel
- CMS fonctionnel sur `/admin`
- 1 article publié
- **DA unique** appliquée (palette, fonts, effets, logo, OG)
- Outils configurés (quiz, comparateur, simulateur)
- SEO prêt (sitemap, robots, JSON-LD, auteur)

## Env vars à configurer sur Vercel après déploiement

```
CMS_SECRET=<openssl rand -hex 32>
CMS_GITHUB_TOKEN=<PAT GitHub>
BLOB_READ_WRITE_TOKEN=<auto via Vercel Blob>
GITHUB_CMS_CLIENT_ID=<OAuth App>
GITHUB_CMS_CLIENT_SECRET=<OAuth App secret>
GEMINI_API_KEY=<Google AI Studio — génération images Gemini>
BFL_API_KEY=<Flux — fallback si pas de Gemini>
```

**Images** : le système détecte automatiquement le provider disponible (Gemini prioritaire, Flux en fallback).
Pour générer les images structurelles en batch : `npx tsx scripts/generate-images.ts`
Options : `--section home`, `--slot home-hero-background`, `--provider gemini`, `--dry-run`
