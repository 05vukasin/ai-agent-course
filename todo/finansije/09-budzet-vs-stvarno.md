# 09. Agent „Budžet vs. stvarno" (variance)

> **Grupa:** Finansije · **Radionica:** R2 · **Status:** draft
> **Šta agent radi (1 rečenica):** Poredi planirani budžet sa stvarnim troškovima, ističe prekoračenja po kategorijama i pravi kratak izveštaj sa objašnjenjem.

## Blueprint

```
OKIDAČ:      mesečno (npr. 1. u mesecu za prethodni mesec) ili ručno
IZVOR:       Google Sheet „Budžet" (plan) + „Troškovi" (stvarno)
OBRADA:      po kategoriji uporedi plan vs. stvarno → odstupanje (iznos i %) → istakni prekoračenja
DESTINACIJA: izveštaj o odstupanjima (mejl/Notion) sa flagovanim stavkama
```

## Zašto je ovo dobra vežba

- Poređenje dva izvora podataka po ključu (kategorija).
- Računanje odstupanja i isticanje onoga što je bitno (ne cela tabela).
- „Zašto" objašnjenje uz brojeve — korak ka analizi, ne samo izveštaju.

## Preduslovi i konektori

- **Google Sheets**: tabela „Budžet" (Kategorija, Plan mesečno) i „Troškovi" (Datum, Kategorija, Iznos).
- **Gmail** ili **Notion** za izveštaj.

> 📸 **SCREENSHOT [S1]:** tabele „Budžet" i „Troškovi" (primer).

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

### Korak 1 — Učitaj plan i stvarno

> 🖱️ **New chat** → nalepi prompt.

**Prompt — kopiraj:**
```
Pogledaj Google Sheet-ove „Budžet" (plan po kategoriji) i „Troškovi" (stvarni troškovi).
Za prethodni pun mesec saberi stvarne troškove po kategoriji i prikaži uz planirani iznos
kao tabelu: Kategorija | Plan | Stvarno.
```

> 📸 **SCREENSHOT [S2]:** tabela Plan vs. Stvarno po kategoriji.

### Korak 2 — Izračunaj odstupanja

**Prompt — kopiraj:**
```
Dodaj kolone: Odstupanje (Stvarno − Plan) i Odstupanje % ((Stvarno−Plan)/Plan).
Poređaj po najvećem prekoračenju. Označi ▲ prekoračenja i ▼ uštede.
```

> 📸 **SCREENSHOT [S3]:** tabela sa odstupanjima (sortirana).

### Korak 3 — Sastavi izveštaj sa objašnjenjem

**Prompt — kopiraj:**
```
Napravi kratak izveštaj:
- 1 rečenica: da li smo u okviru budžeta ukupno (i za koliko)
- top 3 prekoračenja: kategorija, iznos, % i moguć razlog (iz stavki „Troškovi")
- 1–2 kategorije gde smo uštedeli
- 1 preporuka za sledeći mesec
Ton: jasno i konkretno.
```

> 📸 **SCREENSHOT [S4]:** gotov izveštaj o odstupanjima.

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] Zbir stvarnih troškova po kategoriji je tačan (proveri par).
- [ ] Odstupanja (iznos i %) su ispravna.
- [ ] Izveštaj ističe samo bitno + daje moguć razlog.

---

## Deo B — Automatizacija (mesečni scheduled task)

### Korak 4 — Pun agent-prompt (spoj koraka 1–3)

**Agent-prompt — kopiraj ceo:**
```
Prvog radnog dana u mesecu napravi izveštaj „Budžet vs. stvarno" za prethodni mesec.
Radi samostalno; ako nešto ne uspe, preskoči i navedi u rezimeu.

1. Iz „Budžet" uzmi plan po kategoriji; iz „Troškovi" saberi stvarno po kategoriji za
   prethodni pun mesec.
2. Izračunaj Odstupanje (iznos i %) po kategoriji; poređaj po prekoračenju.
3. Napravi izveštaj: ukupno stanje vs. budžet, top 3 prekoračenja sa mogućim razlogom,
   uštede, i 1 preporuka.
4. Napravi Gmail DRAFT „Budžet vs. stvarno — [mesec]" za [uprava@firma.rs] (ili upiši u
   Notion stranicu „Izveštaji"). Ostavi kao DRAFT.
5. Rezime: ukupno odstupanje i najveće prekoračenje.
```

### Korak 5 — Create scheduled task

> 🖱️ **Scheduled → New task** → „Budžet vs. stvarno" → nalepi agent-prompt → pristup Sheet-ovima
> → **Skip** → **Frequency:** mesečno, 1. u mesecu → **Save**.

> 📸 **SCREENSHOT [S5]:** popunjen scheduled task dijalog.

### Korak 6 — Run now i pregled

> 📸 **SCREENSHOT [S6]:** run + izveštaj (draft/Notion).

### ✅ Checkpoint B — agent je spreman kad…

- [ ] Izveštaj stiže mesečno sa tačnim odstupanjima.
- [ ] Top prekoračenja imaju moguć razlog iz stavki.
- [ ] Ide kao draft za pregled uprave.

---

## Human-in-the-loop

- **Autonomno:** čitanje tabela, računanje, pisanje izveštaja (interno).
- **Čovek:** validira razloge i donosi odluke o budžetu.

## Ideje za primenu (za diskusiju na radionici)

- Praćenje po projektu/klijentu, ne samo po kategoriji.
- Prag za „alarm" (prekoračenje > 20% → poseban mejl odmah).
- Kvartalni trend (3 meseca odstupanja jedno pored drugog).

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | Tabele „Budžet" i „Troškovi" |
| S2 | Plan vs. Stvarno po kategoriji |
| S3 | Tabela sa odstupanjima (sortirana) |
| S4 | Gotov izveštaj o odstupanjima |
| S5 | Scheduled task dijalog |
| S6 | Run + izveštaj |
