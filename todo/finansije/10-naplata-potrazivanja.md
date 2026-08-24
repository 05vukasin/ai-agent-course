# 10. Agent za naplatu potraživanja (receivables chaser)

> **Grupa:** Finansije · **Radionica:** R2 · **Status:** draft
> **Šta agent radi (1 rečenica):** Nađe dospele neplaćene fakture i napiše učtive podsetnike za plaćanje kao draftove, sa eskalacijom tona po dužini kašnjenja.

## Blueprint

```
OKIDAČ:      raspored (npr. utorak i četvrtak 10h)
IZVOR:       Google Sheet „Izlazne fakture" (kupac, iznos, rok, status, dana kašnjenja, mejl)
OBRADA:      nađi dospele neplaćene → izaberi ton po kašnjenju → napiši podsetnik
DESTINACIJA: Gmail draftovi podsetnika (po jedan po kupcu) + lista u poruci
```

## Zašto je ovo dobra vežba

- Scheduled + čitanje tabele + generisanje više draftova.
- Uslovna logika (ton zavisi od dana kašnjenja) — pravila u promptu.
- Osetljiva komunikacija: zašto uvek ide kao draft, ne automatski mejl.

## Preduslovi i konektori

- **Google Sheets** — „Izlazne fakture": Kupac, Broj fakture, Iznos, Datum roka, Status (Plaćeno/Neplaćeno), Mejl.
- **Gmail** connector.

> 📸 **SCREENSHOT [S1]:** povezani Sheets + Gmail.
> 📸 **SCREENSHOT [S2]:** tabela „Izlazne fakture" (primer sa neplaćenim stavkama).

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

### Korak 1 — Nađi dospele neplaćene fakture

> 🖱️ **New chat** → nalepi prompt.

**Prompt — kopiraj:**
```
Pogledaj Google Sheet „Izlazne fakture". Izlistaj sve gde je Status = „Neplaćeno" a
Datum roka je prošao. Za svaku prikaži: Kupac, Broj fakture, Iznos, koliko dana kašnjenja,
Mejl. Poređaj po najdužem kašnjenju.
```

> 📸 **SCREENSHOT [S3]:** lista dospelih neplaćenih faktura.

### Korak 2 — Napiši podsetnik za jednu (ton po kašnjenju)

**Prompt — kopiraj:**
```
Za prvu fakturu napiši podsetnik za plaćanje. Pravila tona po kašnjenju:
- 1–7 dana: prijateljski podsetnik („možda vam je promaklo")
- 8–20 dana: učtivo ali direktno, sa brojem fakture i iznosom
- 20+ dana: formalno, traži konkretan datum plaćanja
Uvek profesionalno i bez pretnji. Prikaži mi tekst pre draft-a.
```

> 📸 **SCREENSHOT [S4]:** predlog teksta podsetnika (za taj nivo kašnjenja).

### Korak 3 — Napravi draftove za sve

**Prompt — kopiraj:**
```
Za svaku dospelu neplaćenu fakturu napravi Gmail DRAFT (primalac = „Mejl", odgovarajući
ton po danima kašnjenja, u temi broj fakture i iznos, potpis „Horizont Digital —
finansije"). Ostavi kao DRAFT — NE šalji. Na kraju daj listu: kupac, iznos, dana kašnjenja, ton.
```

> 📸 **SCREENSHOT [S5]:** draftovi u Gmail-u + lista.

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] Lista tačno hvata dospele neplaćene (preskače plaćene i one u roku).
- [ ] Ton odgovara dužini kašnjenja.
- [ ] Draftovi postoje i nijedan nije poslat.

---

## Deo B — Automatizacija (scheduled task 2× nedeljno)

### Korak 4 — Pun agent-prompt (spoj koraka 1–3)

**Agent-prompt — kopiraj ceo:**
```
Utorkom i četvrtkom u 10h pripremi podsetnike za naplatu. Radi samostalno; ako nešto ne
uspe, preskoči i navedi u rezimeu.

1. U Google Sheet „Izlazne fakture" nađi sve Status = „Neplaćeno" sa prošlim rokom.
   Ako nema takvih, javi to i završi.
2. Za svaku izračunaj dana kašnjenja i izaberi ton: 1–7 prijateljski, 8–20 direktno,
   20+ formalno (traži datum plaćanja). Uvek profesionalno.
3. Napravi Gmail DRAFT za svaku (primalac = „Mejl", tema = broj fakture + iznos,
   potpis „Horizont Digital — finansije"). NE šalji.
4. Rezime: koliko podsetnika, ukupan dospeli iznos, i lista (kupac / iznos / dana / ton).
Ni u kom slučaju ne šalji mejlove automatski.
```

### Korak 5 — Create scheduled task

> 🖱️ **Scheduled → New task** → „Naplata — podsetnici" → nalepi agent-prompt → pristup Sheet-u
> → **Skip** → **Frequency:** uto i čet 10h → **Save**.

> 📸 **SCREENSHOT [S6]:** popunjen scheduled task dijalog.

### Korak 6 — Run now i pregled

> 📸 **SCREENSHOT [S7]:** run + draftovi podsetnika + rezime dospelog iznosa.

### ✅ Checkpoint B — agent je spreman kad…

- [ ] Task hvata sve dospele neplaćene i ništa u roku.
- [ ] Ton se ispravno menja po danima kašnjenja.
- [ ] Sve ide kao draft; ništa nije poslato automatski.

---

## Human-in-the-loop

- **Autonomno:** čitanje tabele, izbor tona, pisanje draftova.
- **Čovek:** pregleda i šalje (naročito za 20+ dana i velike kupce).

## Ideje za primenu (za diskusiju na radionici)

- Posle plaćanja — agent menja Status na „Plaćeno" (veza sa vežbom 07).
- Eskalacija: posle 30 dana obavesti direktora umesto slanja kupcu.
- Sedmični izveštaj o naplati (koliko dospelo, koliko naplaćeno).

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | Povezani Sheets + Gmail |
| S2 | Tabela „Izlazne fakture" |
| S3 | Lista dospelih neplaćenih |
| S4 | Predlog teksta podsetnika |
| S5 | Draftovi + lista |
| S6 | Scheduled task dijalog |
| S7 | Run + draftovi + dospeli iznos |
