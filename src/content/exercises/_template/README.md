# Kako dodati novu vežbu

Vežba = jedan folder u kome je **sve** (tekst + meta + slike). Dodavanje ima 4 koraka.

## 1. Kopiraj ovaj folder

```
src/content/exercises/_template  →  src/content/exercises/<tvoj-slug>
```

`<tvoj-slug>` je URL vežbe (npr. `email-triage`). Vežba će biti na `/vezbe/<tvoj-slug>`.

## 2. Ubaci slike

Stavi slike u `<tvoj-slug>/images/`:

- `cover.png` — slika za karticu u galeriji (odnos 16:9).
- `banner.png` — (opciono) full-width baner na vrhu stranice.
- ostale screenshot-ove koje koristiš u koracima.

## 3. Popuni `meta.ts` i `content.mdx`

- **`meta.ts`** — `slug` (isti kao ime foldera), `title`, `summary`, `tags`, `cover`, `banner`.
- **`content.mdx`** — sadržaj vežbe. Slike se importuju na vrhu fajla, npr:

  ```mdx
  import s01 from "./images/01.png";
  ...
  <Slika src={s01} caption="Slika 1 — opis" />
  ```

  Gotove komponente (ne treba ih importovati):
  - `<Korak broj={1} naslov="…">…</Korak>` — jedan korak sa akcent-brojem
  - `<Klikni>…</Klikni>` — „klik po klik" lista (numerisana markdown lista unutra)
  - `<Prompt text={\`…\`} />` — blok prompta sa dugmetom „Kopiraj"
  - `<Slika src={…} caption="…" />` — slika sa opisom
  - `<Checkpoint naslov="…">…</Checkpoint>` — lista uslova
  - `<Callout tip="warn|info|tip">…</Callout>` — napomena
  - `<Blueprint rows={[["Okidač","…"], …]} />` — dijagram toka

  > Napomena: oko markdown sadržaja unutar komponenti ostavi **prazan red**
  > (tako MDX parsira liste i podebljanja).

## 4. Registruj vežbu

U `src/lib/exercises.ts` dodaj 2 importa i jednu stavku u niz `exercises`:

```ts
import { meta as mojaMeta } from "@/content/exercises/<tvoj-slug>/meta";
import MojaContent from "@/content/exercises/<tvoj-slug>/content.mdx";

export const exercises: Exercise[] = [
  { ...mojaMeta, Content: MojaContent },
  // … ostale vežbe
];
```

Gotovo — vežba se pojavi u galeriji i na svom URL-u.
