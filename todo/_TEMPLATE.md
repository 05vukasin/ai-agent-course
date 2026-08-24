# [BROJ]. [Naziv agenta]

> **Grupa:** BizDev / Finansije · **Radionica:** Rx · **Status:** draft
> **Šta agent radi (1 rečenica):** …

## Blueprint

```
OKIDAČ:      …
IZVOR:       …
OBRADA:      …
DESTINACIJA: …
```

## Zašto je ovo dobra vežba

- Koje veštine polaznik uči (2–4 stavke).

## Preduslovi i konektori

- Plaćeni plan (za scheduled task, ako se koristi).
- [connector 1], [connector 2] …

> 📸 **SCREENSHOT [S1]:** Settings → Connectors, povezan [connector] (kvačica na Status).

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

Cilj: dokazati da svaki pojedinačni korak radi rukom, pre automatizacije.

### Korak 1 — [naziv]

Šta radimo i zašto (kratko).

> 🖱️ Klik po klik:
> 1. …
> 2. Nalepi prompt ispod.

**Prompt — kopiraj:**
```
[tačan prompt za ovaj jedan korak]
```

> 📸 **SCREENSHOT [S2]:** rezultat ovog koraka u chatu.

### Korak 2 — [naziv]
… (isti obrazac: objašnjenje → prompt → 📸)

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] …
- [ ] …

---

## Deo B — Automatizacija (sve spajamo u jedan scheduled task)

### Korak N — Pun agent-prompt (spoj svih koraka)

Sada korake 1…(N-1) spajamo u JEDNU instrukciju, potpuno specifikovanu unapred
(šta ako izvor ne postoji, gde je fajl, kome ide rezultat).

**Agent-prompt — kopiraj ceo:**
```
[kompletan, samostalan prompt]
```

### Korak N+1 — Create scheduled task

> 🖱️ Klik po klik: Scheduled → New task → Name/Description → nalepi agent-prompt →
> izaberi folder (pristup fajlovima) → Permissions: Skip → Frequency → Save.

> 📸 **SCREENSHOT [Sx]:** popunjen „Create scheduled task" dijalog.

### Korak N+2 — Run now i pregled

> 🖱️ Run now → prati Progress checklist → proveri rezultat na destinaciji.

> 📸 **SCREENSHOT [Sx]:** prvi run + krajnji rezultat.

### ✅ Checkpoint B — agent je spreman kad…

- [ ] …

---

## Human-in-the-loop

- Šta je autonomno (research, draft), a šta traži čoveka (slanje, plaćanje, potvrda).

## Ideje za primenu (za diskusiju na radionici)

- 2–3 varijacije kako polaznici mogu da prilagode agenta svom poslu.

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | … |
| S2 | … |
