---
name: seo-geo-redaction
version: 1.0.0
description: Applique les règles SEO et GEO (Generative Engine Optimization) à toute rédaction de contenu éditorial français. Couvre la structure d'article, l'enrichissement sémantique, la citabilité par les LLM, les données structurées JSON-LD, le maillage interne, et les gabarits par format. À utiliser AVANT la rédaction de tout contenu publié — article de blog, page pilier, fiche produit, comparatif, guide, tutoriel. Triggers : « rédige un article », « écris une fiche produit », « crée un guide », « génère le texte SEO de », « produis un brief », « rédige le comparatif », « écris la page pilier », « rédige le tutoriel », « fais-moi un article SEO ». Gabarits complets, checklist exhaustive et doctrine d'usage des formats dans references/full-guide.md (à charger uniquement si besoin du détail).
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
---

# seo-geo-redaction — Procédure de rédaction SEO + GEO

Avant la première phrase de tout contenu éditorial, applique cette procédure. Elle couvre les contraintes SEO classiques ET GEO (citabilité par les moteurs génératifs).

## Philosophie

Le contenu répond à une seule question : *pourquoi lire cette page plutôt qu'une autre ?* Trois mots :

- **Expertise** — chaque affirmation traçable (source, expérience, raisonnement).
- **Preuve** — données chiffrées, exemples concrets, cas réels.
- **Utilité** — chaque paragraphe fait avancer vers une décision ou une compréhension.

Posture : un expert qui parle à un pair légèrement moins avancé. Direct, parfois opinioné, jamais neutre au point d'être creux.

## Étape 1 — Pré-rédaction (obligatoire)

1. **Analyser les 3 premiers résultats Google** sur le mot-clé cible. Noter : angle, structure H2, longueur, FAQ, données structurées.
2. **Identifier le content gap** — l'info que personne ne donne. C'est l'angle de l'article.
3. **Qualifier l'intention de recherche** :
   - Informationnelle (« qu'est-ce que », « comment », « pourquoi ») → réponse directe dès le 1ᵉʳ paragraphe.
   - Transactionnelle (« meilleur », « comparatif », « acheter ») → tableau + CTA affilié.
   - Navigationnelle (nom de marque/produit) → fiche produit ou guide d'achat.

## Étape 2 — Structure obligatoire

```
H1 — mot-clé principal + année dynamique si édition courante
  Chapô — réponse directe en 2-3 phrases (position zéro)
  TL;DR — 3 bullets max (si article > 600 mots)

H2 — sous-thème 1 (formulé en question si possible)
  Réponse directe < 60 mots
  Développement, données, exemples
  Lien interne contextuel

H2 — FAQ (6 questions minimum)
  JSON-LD FAQPage généré automatiquement

AuthorCard en bas d'article
```

Longueurs cibles :

| Type | Mots | FAQ min |
|---|---|---|
| Article blog | 800–1 200 | 6 |
| Page pilier / guide | 1 500–2 500 | 8 |
| Fiche produit | 300–600 | 4 |

## Étape 3 — Les 6 critères GEO

Les moteurs génératifs cherchent **la source qui mérite d'être citée**, pas la page qui match. À respecter pour chaque article :

1. **Citabilité directe** — chaque H2 contient au moins une phrase autonome qui répond complètement à une question, sans contexte externe.
2. **Autorité de source** — citer des sources datées : `Selon [Source] ([année]), [stat]`.
3. **Structuration Q&R** — H2/H3 formulés en questions, réponse dans les 50 premiers mots.
4. **Définition opérationnelle** — pour tout concept central, une définition courte et originale dans les 200 premiers mots.
5. **Données originales** — au moins un tableau, une comparaison ou une statistique mise en contexte.
6. **Fraîcheur signalée** — date de rédaction/maj visible + `dateModified` en JSON-LD.

Règle clé : chaque H2 doit pouvoir exister comme réponse standalone à sa propre question de titre. Pas de phrases-ponts génériques entre H2 (« maintenant que nous avons vu X, passons à Y »).

## Étape 4 — On-page essentiel

- `title` : mot-clé principal en début + différenciateur, max 60 caractères.
- `description` : réponse directe à l'intention, max 155 caractères.
- H1 unique, **variante naturelle** du title (jamais identique).
- Hiérarchie stricte H1 > H2 > H3, jamais de saut.
- Densité mot-clé principal : 0,5 % à 1,5 %.
- Paragraphes 3-5 phrases, phrases 15-25 mots.
- Ratio prose / listes : ≥ 70 % texte courant.
- Images : `next/image`, alt descriptif, 1 visuel tous les 400-500 mots minimum.
- Années « édition courante » → `currentYear()` côté serveur, jamais en dur.

## Étape 5 — Maillage et liens

- 2-4 liens internes contextuels par article (ancres descriptives, jamais « cliquez ici »).
- 1 lien vers la page pilier de la catégorie.
- 1 lien transversal vers une autre catégorie.
- Max 1 lien externe par 500 mots (sources d'autorité uniquement).
- Tous les liens Amazon passent par `addAffiliateTag()` ou `<AffiliateLink>`.

## Étape 6 — Données structurées (JSON-LD)

| Page | Schemas obligatoires |
|---|---|
| Article | Article + Person + BreadcrumbList + FAQPage |
| Page auteur | Person |
| Comparatif | BreadcrumbList + ItemList |
| Guide | Article (+ HowTo si applicable) |

Champs Article : `headline`, `datePublished`, `dateModified`, `author` (Person), `publisher` (Organization), `description`.

## Étape 7 — Audit final avant livraison

Mini-checklist à passer en silence avant de livrer :

- [ ] Réponse directe dans les 60 premiers mots
- [ ] Chaque H2 contient une phrase citable standalone
- [ ] Au moins 3 phrases citables par article
- [ ] FAQ 6+ questions, réponses < 80 mots
- [ ] Sources datées et identifiables
- [ ] Tableau ou statistique chiffrée
- [ ] 2-4 liens internes contextuels
- [ ] Aucune année hardcodée pour édition courante
- [ ] Densité mot-clé 0,5-1,5 %

## Pour aller plus loin

Gabarits par format (informatif, comparatif, tutoriel, fiche produit), checklist exhaustive de publication, doctrine d'usage des composants MDX, anti-patterns IA détaillés, matrice format × intention → voir [`references/full-guide.md`](references/full-guide.md). À charger seulement quand tu as besoin du détail — le SKILL.md ci-dessus suffit dans 80 % des cas.

## Compatibilité avec les autres skills

Sur les triggers de rédaction, trois skills se chargent en parallèle. Pas de conflit :

- **ton-of-voice** — définit qui parle et comment (voix éditoriale spécifique au site).
- **seo-geo-redaction** (ce skill) — structure pour Google + LLM.
- **humaniser-fr** — garde-fous anti-IA pendant l'écriture.
