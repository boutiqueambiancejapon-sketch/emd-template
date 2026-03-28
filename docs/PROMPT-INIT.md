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

### Bloc 1 — Identité
1. Quel est le sujet/niche du site ? (ex: voyage, cartes de crédit, aspirateurs, crypto)
2. Quel nom de domaine ? (ex: 10minutesvoyage.com)
3. Tagline en une phrase ? (ex: "Trouvez votre destination en 10 minutes")

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

Sur base de la niche et de l'ambiance, proposer ET demander validation :

**Palette complète** (11 couleurs) :
- accent1 → couleur principale (CTAs, liens, éléments actifs)
- accent2 → couleur secondaire (badges, highlights)
- accent3 → couleur tertiaire (succès, validation)
- accent4 → couleur quaternaire (quiz, éléments interactifs)
- accent5 → couleur quinaire (liens secondaires)
- bgPrimary → fond principal (#0A0A0F par défaut dark, adapter si light)
- bgSurface → fond cartes (#13131A par défaut)
- bgSurface2 → fond cartes secondaire (#1C1C26 par défaut)
- textPrimary → texte principal
- textSecondary → texte secondaire
- textMuted → texte discret

**Fonts** (2 familles max) :
- display : pour les titres (ex: Unbounded, Syne, Plus Jakarta Sans, Outfit, Manrope)
- body : pour le texte courant (ex: Space Grotesk, Inter, DM Sans, Geist)
IMPORTANT : uniquement des fonts Google Fonts compatibles next/font.

**Effets visuels** :
- Aurora : 3 couleurs du gradient animé (généralement accent1 + accent4 + accent3)
- Noise : opacité (0.03–0.05, 0 pour désactiver)
- Style général : dark bold / minimal clean / premium glossy / tech brutalist

Présenter la proposition comme un tableau visuel avec les hex et demander validation.

### Bloc 7 — Affiliation
8. Tag affilié Amazon ? (ex: monsite-21)
9. Autres boutiques affiliées ? (Fnac, Booking, etc.)

### Bloc 8 — Premier article
10. Quel sujet pour le premier article ? (calibre le template blog)

## Après les réponses

### Étape 1 — Config
1. Remplir `niche.config.ts` avec TOUTES les valeurs (identité, vocabulaire, catégories, outils, auteur, palette, fonts, affiliation, technique)

### Étape 2 — Appliquer la DA
**C'est l'étape critique.** Le template a une DA par défaut qui DOIT être remplacée.

2. **`app/globals.css`** — Réécrire TOUTES les variables CSS :
   - Les 5 accents + 3 backgrounds + 3 textes
   - Les 3 couleurs aurora (--aurora-1, --aurora-2, --aurora-3)
   - Les couleurs success/warning/error (basées sur la palette)
   - Les variantes light mode (accents assombris pour WCAG AA sur fond blanc)
   - Le --noise-opacity

3. **`app/layout.tsx`** — Remplacer les imports de fonts :
   - Importer les fonts choisies depuis `next/font/google`
   - Mettre à jour les variables `--next-font-primary` et `--next-font-display`
   - adjustFontFallback:true obligatoire

4. **`public/icons/brand/`** — Régénérer les SVGs :
   - `logo.svg` : "10min·[niche]" avec les bonnes fonts et couleurs
   - `favicon.svg` : "10" sur fond accent1
   - `og-default.svg` : tagline + domaine avec la nouvelle palette

5. **`app/opengraph-image.tsx`** — Mettre à jour les couleurs du gradient et du texte

6. **Admin CMS** (`app/admin/layout.tsx`) — Mettre à jour les couleurs aurora de la sidebar si la palette change significativement

### Étape 3 — Contenu
7. Mettre à jour `content/settings.yaml` (nav avec les catégories)
8. Mettre à jour `content/pages/home.yaml` (rotating_words, subtitle, CTAs)
9. Mettre à jour `content/pages/quiz.yaml` (questions et options du quiz)
10. Remplir `lib/comparateur.ts` (données produits pour le comparateur)
11. Remplir `lib/choisir-content.ts` (contenu éditorial des pages /choisir/)
12. Mettre à jour les pages légales (mentions-legales + confidentialité)
13. Créer `docs/AUTHOR-[slug].md` (profil auteur)

### Étape 4 — Premier article
14. Supprimer `content/articles/_example.mdx` et `content/produits/_example.yaml`
15. Rédiger le premier article (800+ mots, 6+ FAQ, composants MDX)
    Lire `docs/SEO-GEO-REDACTION.md` et `docs/AUTHOR-[slug].md` AVANT de rédiger.
    Composants dispo : `<ArticleImage>`, `<ProductCTA>`, `<ProductCarousel>`,
    `<CompareBar>`, `<Tip>`, `<Warning>`, `<Verdict>`, `<ProConTable>`,
    `<PullQuote>`, `<StatCard>`, `<StatRow>`
    ATTENTION : les props MDX sont des STRINGS uniquement.
    Ex: `<ProConTable pros="Avantage 1|Avantage 2" cons="Inconvénient 1" />`

### Étape 5 — Vérification
16. `tsc --noEmit` + `next lint`
17. Vérifier le contraste WCAG AA pour chaque couleur accent sur les fonds
18. Commit et push
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

**Palette :**
| Variable | Hex | Usage |
|---|---|---|
| accent1 | `#00D4AA` | CTA principal, liens — vert tech |
| accent2 | `#FF8C42` | Badges, deals — orange warm |
| accent3 | `#4ECDC4` | Succès, validation — teal |
| accent4 | `#6C63FF` | Quiz, interactif — indigo |
| accent5 | `#45B7D1` | Liens secondaires — sky blue |
| bgPrimary | `#0B0F14` | Fond principal — bleu-noir profond |
| bgSurface | `#111820` | Cartes |
| bgSurface2 | `#1A2230` | Cartes secondaires |
| textPrimary | `#F0F4F8` | Texte principal |
| textSecondary | `#8899AA` | Texte secondaire |
| textMuted | `#556677` | Texte discret |

**Fonts :**
- display : **Outfit** (géométrique, tech, propre)
- body : **DM Sans** (lisible, moderne)

**Effets :**
- Aurora : `#00D4AA` → `#6C63FF` → `#4ECDC4`
- Noise : 0.03 (subtil)
- Style : dark tech minimal

Tu valides ou tu modifies ?

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
