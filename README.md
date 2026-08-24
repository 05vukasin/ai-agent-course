# AI Agent Kurs — Vežbe

Statičan sajt: galerija praktičnih vežbi za pravljenje AI agenata. Svaka vežba je
vodič korak-po-korak (šta agent radi → koraci sa promptovima i slikama).

## Pokretanje

```bash
bun install
bun run dev      # http://localhost:3001
```

## Build (statičan export)

```bash
bun run build    # generiše statičan sajt u ./out
```

Sajt je Next.js sa `output: "export"` — hostuje se na Vercelu (detektuje se sam) ili
bilo kom statičnom hostingu.

## Struktura

```
src/
  app/                      # rute (/, /vezbe/[slug]) + globalni stilovi
  components/               # UI + MDX komponente (Prompt, Korak, Slika, …)
  content/exercises/        # jedan folder = jedna vežba (meta + content.mdx + images)
    _template/              # skelet za novu vežbu (+ README sa procedurom)
    newsletter-agent/       # prva vežba
  lib/                      # registry vežbi (exercises.ts)
mdx-components.tsx          # globalni mapping MDX komponenti
```

## Dodavanje nove vežbe

Kopiraj `src/content/exercises/_template/`, popuni `meta.ts` i `content.mdx`, dodaj
slike u `images/`, i registruj vežbu u `src/lib/exercises.ts`. Detaljna procedura:
[`src/content/exercises/_template/README.md`](src/content/exercises/_template/README.md).
