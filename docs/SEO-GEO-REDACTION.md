# Guide SEO & GEO — Rédaction

Ce fichier est la référence unique pour tout contenu rédigé sur le site.
Lire AVANT la première ligne de tout article ou page de contenu.

---

## 1. Avant de rédiger

### Analyse concurrentielle (obligatoire)
- Identifier les 3 premiers résultats Google sur le mot-clé cible
- Noter : angle, structure H2, longueur, FAQ, données structurées
- Trouver l'angle manquant ou l'info que personne ne donne

### Intention de recherche
| Type | Signal | Réponse attendue |
|---|---|---|
| Informationnelle | "qu'est-ce que", "comment", "pourquoi" | Réponse directe dès le premier paragraphe |
| Transactionnelle | "meilleur", "comparatif", "acheter" | Tableau comparatif + CTA affilié |
| Navigationnelle | nom de marque, nom de produit | Fiche produit ou guide d'achat |
| Locale | "près de moi", ville | Non applicable (site national) |

---

## 2. Structure d'article

### Squelette obligatoire
```
H1 — mot-clé principal + année dynamique si "édition courante"
  Chapô — réponse directe en 2-3 phrases (position zéro)
  TL;DR — 3 bullets max (si article > 600 mots)

H2 — sous-thème 1 (question si possible)
  Réponse directe dès la première phrase
  Développement, données, exemples
  Lien interne contextuel

H2 — sous-thème 2
  ...

H2 — FAQ (6 questions minimum)
  JSON-LD FAQPage généré automatiquement

AuthorCard en bas d'article
```

### Longueur cible
| Type | Mots | FAQ min |
|---|---|---|
| Article blog | 800 – 1 200 | 6 |
| Page pilier / guide | 1 500 – 2 500 | 8 |
| Fiche produit | 300 – 600 | 4 |

---

## 3. Règles SEO on-page

### Titres et meta
- `title` : mot-clé + angle + site — max 60 caractères
- `description` : réponse directe à l'intention — max 155 caractères
- H1 unique par page, cohérent avec le `title`
- Hiérarchie stricte : H1 > H2 > H3, jamais de saut

### Années dynamiques
| Type | Exemple | Traitement |
|---|---|---|
| Edition courante | "Guide 2026", "Meilleur X 2026" | `currentYear()` côté serveur |
| Date historique | "Fondé en 2012", "Sorti le 14/03/2024" | String littérale — jamais remplacée |

### Mots-clés
- Mot-clé principal dans : H1, premier paragraphe, 1 H2, meta description, alt image
- Variantes sémantiques (LSI) dans les autres H2/H3
- Densité naturelle — jamais de bourrage

### Images
- `alt` descriptif obligatoire (pas "image de..." mais description du contenu)
- Nommage fichier : `slug-descriptif.webp`
- `next/image` uniquement — jamais de `<img>` nu
- `priority` uniquement sur l'image LCP above-fold

---

## 4. Maillage interne

### Règles
- Chaque article contient 2-4 liens internes contextuels
- Lien vers la page pilier de la catégorie
- Lien vers 1-2 articles de la même catégorie
- Lien vers 1 article d'une autre catégorie (maillage transversal)
- Ancres descriptives — jamais "cliquez ici" ou "lire la suite"

### Pages piliers
Les pages `/comparer/[categorie]` et `/choisir/[categorie]` sont les pages piliers.
Tout article de la catégorie doit pointer vers sa page pilier.

### Breadcrumbs
Format : Accueil > Catégorie > Article
JSON-LD BreadcrumbList sur toutes les pages sauf Home.

---

## 5. Liens externes et sources

### Règles de sourcing
- Chiffres et statistiques : toujours sourcés avec lien vers la source
- Préférer les sources primaires (études, rapports officiels, sites constructeurs)
- Sources d'autorité : sites gouvernementaux, études publiées, médias reconnus
- Liens externes en `target="_blank" rel="noopener"` (sauf liens affiliés → `rel="nofollow noopener sponsored"`)

### Liens affiliés
- Tous les liens Amazon passent par `addAffiliateTag()` ou `<AffiliateLink>`
- Tag affilié configuré dans `niche.config.ts`
- Attribut `rel="nofollow noopener sponsored"` obligatoire
- Disclosure visible sur chaque page contenant des liens affiliés

---

## 6. Données structurées (JSON-LD)

| Page | Schemas obligatoires |
|---|---|
| Home | WebSite |
| Article | Article + Person (author) + BreadcrumbList + FAQPage |
| Page auteur | Person |
| Page pilier | BreadcrumbList |
| FAQ | FAQPage |

### Article
```json
{
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "...", "url": "/auteurs/..." },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "publisher": { "@type": "Organization", "name": "..." }
}
```

### Person (page auteur)
```json
{
  "@type": "Person",
  "name": "...",
  "jobTitle": "...",
  "url": "https://domain/auteurs/slug",
  "description": "...",
  "sameAs": ["URL_LINKEDIN"]
}
```

---

## 7. Listes et tableaux

### Quand utiliser un tableau
- Comparaison de 3+ items sur 3+ critères
- Données chiffrées (prix, specs, scores)
- Toujours un header row descriptif

### Quand utiliser une liste
- Enumération de points sans comparaison
- Étapes d'un processus (liste ordonnée)
- Avantages/inconvénients (listes parallèles)

### Format featured snippet
- Listes à puces pour les "top X" et "comment faire"
- Tableaux pour les comparatifs
- Paragraphe court (40-60 mots) pour les définitions

---

## 8. FAQ

### Règles
- 6 questions minimum par article, 8 pour les pages piliers
- Questions formulées comme les utilisateurs les tapent (langage naturel)
- Réponse directe en première phrase, développement ensuite
- JSON-LD FAQPage généré côté serveur
- Pas de FAQ générique — chaque question doit apporter une info unique

### Sources de questions
1. Google "People Also Ask" sur le mot-clé cible
2. Autocomplétion Google
3. Forums et commentaires (Reddit, forums spécialisés)
4. Questions réelles des utilisateurs du site

---

## 9. Checklist avant publication

### SEO technique
- [ ] Meta title unique, < 60 chars, mot-clé présent
- [ ] Meta description unique, < 155 chars, réponse directe
- [ ] H1 unique, cohérent avec le title
- [ ] Hiérarchie H1 > H2 > H3 stricte
- [ ] JSON-LD Article + Person + BreadcrumbList + FAQPage
- [ ] Canonical défini
- [ ] Images : alt descriptif, next/image, format WebP

### Contenu
- [ ] Réponse directe dès le premier paragraphe
- [ ] 2-4 liens internes contextuels
- [ ] Sources externes d'autorité citées
- [ ] FAQ 6+ questions, JSON-LD serveur
- [ ] Aucune année hardcodée pour "édition courante"
- [ ] Liens affiliés via addAffiliateTag() / AffiliateLink

### EEAT
- [ ] AuthorByline en haut d'article (nom + date + temps lecture)
- [ ] AuthorCard en bas d'article
- [ ] Page /auteurs/[slug] publiée et indexable
- [ ] Author JSON-LD dans l'article

### Rendu
- [ ] `curl` retourne le H1 sans JS
- [ ] Pas de contenu dans useEffect/useState
