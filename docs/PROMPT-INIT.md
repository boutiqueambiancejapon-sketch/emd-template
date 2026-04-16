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

### Bloc 6 — DA & Branding
7. Ambiance visuelle ? (3 adjectifs, ex: premium, sombre, tech)
   2–3 sites de référence pour l'ambiance ? (optionnel)

**AVANT de proposer**, lire `docs/DA-PRESETS.md` et utiliser les helpers de `lib/da-presets`.
Le template embarque une base de 161 palettes par niche, 72 paires typographiques, 75 styles UI
et 161 règles de raisonnement par niche. Ne pas inventer une palette sans avoir d'abord cherché
dans cette base. Exemple :

```ts
import { composePreset, findPalettes } from '@/lib/da-presets'

// Soit on connaît la niche exacte ("Healthcare App", "E-commerce Luxury", etc.)
const preset = composePreset('Healthcare App', ['calm', 'modern'])

// Soit on cherche par mots-clés
const matches = findPalettes(['robot', 'tech', 'home', 'appliance'], 5)
```

Ensuite, sur base du preset trouvé + de l'ambiance demandée, proposer ET demander validation :

**Style structurel** (ce qui différencie visuellement les sites entre eux) :
- mode : `dark` ou `light` — dark pour tech/gaming/premium, light pour santé/cuisine/lifestyle
- hero : `split` (texte + nav catégories), `centered` (tout centré), `minimal` (titre + 1 CTA, épuré)
- effects : `aurora` (gradient animé bold), `subtle` (noise léger seulement), `none` (propre et minimal)
- cards : `bordered` (border-top accent + watermark), `filled` (fond accent subtil), `minimal` (texte pur)

**Logo** : texte libre. Si contient `·`, le point sert de séparateur visuel (ex: "10min·voyage").
Sinon, le nom s'affiche en gras (ex: "ASPIRO", "MonSite").

**Ordre des sections home** : proposer un ordre adapté.
Options : `ticker`, `deals`, `articles`, `categories`, `tools`, `author`
Ex: un site deals-first → `['deals', 'articles', 'categories', 'tools', 'author']`
Ex: un site contenu-first → `['articles', 'categories', 'tools', 'deals', 'author']`

**Palette complète** (11 couleurs) :
- accent1 → couleur principale (CTAs, liens, éléments actifs)
- accent2 → couleur secondaire (badges, highlights)
- accent3 → couleur tertiaire (succès, validation)
- accent4 → couleur quaternaire (quiz, éléments interactifs)
- accent5 → couleur quinaire (liens secondaires)
- bgPrimary → fond principal (dark: #0A0A0F, light: #FAFAFA)
- bgSurface → fond cartes (dark: #13131A, light: #FFFFFF)
- bgSurface2 → fond cartes secondaire (dark: #1C1C26, light: #F0F0F5)
- textPrimary → texte principal
- textSecondary → texte secondaire
- textMuted → texte discret

**Fonts** (2 familles max) :
- display : pour les titres (ex: Unbounded, Syne, Plus Jakarta Sans, Outfit, Manrope)
- body : pour le texte courant (ex: Space Grotesk, Inter, DM Sans, Geist)
IMPORTANT : uniquement des fonts Google Fonts compatibles next/font.

**Effets visuels** (si effects != 'none') :
- Aurora : 3 couleurs du gradient animé (généralement accent1 + accent4 + accent3)
- Noise : opacité (0.03–0.05, 0 pour désactiver)

Présenter la proposition comme un tableau visuel avec les hex et demander validation.

### Bloc 7 — Affiliation
8. Tag affilié Amazon ? (ex: monsite-21)
9. Autres boutiques affiliées ? (Fnac, Booking, etc.)

### Bloc 8 — Premier article
10. Quel sujet pour le premier article ? (calibre le template blog)

## Après les réponses — workflow page par page

**Principe** : on avance typologie par typologie. Chaque étape se termine par une validation
de l'utilisateur AVANT de passer à la suivante. Si l'utilisateur n'est pas satisfait, on ajuste.
Ne jamais tout générer d'un coup — itérer page par page.

### Étape 1 — Config + DA
1. Remplir `niche.config.ts` avec TOUTES les valeurs
2. **`app/globals.css`** — Réécrire TOUTES les variables CSS (palette, aurora, light mode)
3. **`app/layout.tsx`** — Remplacer les fonts
4. **`public/icons/brand/`** — Régénérer logo.svg, favicon.svg, og-default.svg
5. **`app/opengraph-image.tsx`** — Mettre à jour les couleurs
6. **Admin CMS** — Mettre à jour les couleurs aurora sidebar si besoin

**→ Lancer `npm run dev` et montrer le résultat à l'utilisateur.**
**→ "Voici la DA appliquée. Les couleurs, fonts et effets te conviennent ? Si non, dis-moi quoi ajuster."**
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

**→ "Voici les emplacements d'images avec les prompts IA. Tu peux les générer maintenant ou plus tard. On continue ?"**
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
BFL_API_KEY=<Flux pour génération images>
```
