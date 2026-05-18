# skills/

Skills locaux au template — chargés automatiquement par Claude Code (et tout client compatible : Codex CLI, Gemini CLI, Cursor, etc.) quand leurs triggers correspondent à la requête utilisateur.

Chaque skill suit la convention Anthropic : un sous-dossier en kebab-case contenant un `SKILL.md` avec frontmatter YAML (`name`, `description`, etc.), plus éventuellement `scripts/`, `references/`, `assets/`.

## Skills inclus dans le template

| Skill | Rôle | Triggers principaux |
|---|---|---|
| [`humaniser-fr`](./humaniser-fr/SKILL.md) | Détecte et corrige les marqueurs IA en français, avec section spécifique sites affiliés / SEO / blog d'autorité | « humanise ce texte », « ça sonne IA », « retire les tics ChatGPT », « relis cet article SEO » |

## Ajouter un skill

1. Créer un sous-dossier en kebab-case (`mon-skill/`).
2. Y écrire `SKILL.md` avec un frontmatter YAML clair : `name`, `description` (QUOI + QUAND, avec phrases de déclenchement concrètes).
3. L'ajouter au tableau ci-dessus.

Référence : [Guide officiel Anthropic — Building Skills for Claude](https://github.com/anthropics/skills).
