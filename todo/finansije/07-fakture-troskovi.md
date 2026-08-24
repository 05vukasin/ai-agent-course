# 07. Agent za prijem faktura i troškova

> **Grupa:** Finansije · **Radionica:** R1 · **Status:** draft
> **Šta agent radi (1 rečenica):** Kad faktura stigne mejlom, izvuče dobavljača, iznos, PDV, rok i kategoriju, upiše red u tabelu i napravi podsetnik za rok plaćanja.

## Blueprint

```
OKIDAČ:      nova faktura u mejlu (ili u Drive folderu) — ili dnevni pregled
IZVOR:       Gmail/Drive (PDF ili telo mejla)
OBRADA:      izvuci dobavljača, iznos, PDV, datum, rok, kategoriju
DESTINACIJA: red u Google Sheet „Troškovi" + podsetnik u Google Calendar za rok
```

## Zašto je ovo dobra vežba

- Ekstrakcija podataka iz nestruktuiranog dokumenta (PDF/mejl) u tabelu.
- Kategorizacija troškova po pravilima.
- Automatski podsetnici — praktičan, merljiv efekat (nema propuštenih rokova).

## Preduslovi i konektori

- **Gmail** connector (fakture stižu mejlom) — ili **Google Drive** (folder `/Fakture`).
- **Google Sheets** — tabela „Troškovi".
- **Google Calendar** — za podsetnike o rokovima.

> 📸 **SCREENSHOT [S1]:** povezani Gmail + Google Sheets + Calendar.
> 📸 **SCREENSHOT [S2]:** prazna tabela „Troškovi": Datum, Dobavljač, Opis, Iznos, PDV, Ukupno, Kategorija, Rok plaćanja, Status.

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

### Korak 1 — Nađi fakturu u mejlu

> 🖱️ **New chat** → nalepi prompt.

**Prompt — kopiraj:**
```
Pretraži moj Gmail za poslednju poruku koja sadrži fakturu (prilog PDF ili „faktura/
račun/invoice" u temi). Prikaži pošiljaoca, temu i da li ima PDF prilog.
```

> 📸 **SCREENSHOT [S3]:** pronađena poruka sa fakturom.

### Korak 2 — Izvuci podatke sa fakture

**Prompt — kopiraj:**
```
Iz te fakture (prilog/telo) izvuci i vrati kao tabelu:
- Dobavljač
- Datum izdavanja
- Opis (šta je nabavljeno, kratko)
- Iznos bez PDV
- PDV
- Ukupno
- Rok plaćanja (datum)
Ako neko polje nije čitljivo, napiši „proveriti" — ne pogađaj iznose.
```

> 📸 **SCREENSHOT [S4]:** izvučeni podaci fakture.

### Korak 3 — Kategoriši trošak

**Prompt — kopiraj:**
```
Dodeli kategoriju troška iz liste: [Softver/alati, Marketing, Kancelarija, Honorari,
Putovanja, Ostalo]. Kratko obrazloži izbor u 1 rečenici.
```

> 📸 **SCREENSHOT [S5]:** predložena kategorija.

### Korak 4 — Upiši red i napravi podsetnik

**Prompt — kopiraj:**
```
1. Dodaj red u Google Sheet „Troškovi" sa svim poljima (Status = „Za plaćanje").
2. Napravi događaj u Google Calendar-u na dan „Rok plaćanja − 2 dana”:
   naslov „Plaćanje: [Dobavljač] — [Ukupno]", ceo dan.
Pre upisa mi pokaži red i podsetnik radi potvrde.
```

> 📸 **SCREENSHOT [S6]:** upisan red u tabeli + kreiran podsetnik u kalendaru.

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] Faktura je nađena, iznosi tačno izvučeni (ili „proveriti").
- [ ] Kategorija ima smisla.
- [ ] Red je u tabeli i podsetnik u kalendaru pre roka.

---

## Deo B — Automatizacija (dnevni scheduled task)

### Korak 5 — Pun agent-prompt (spoj koraka 1–4)

**Agent-prompt — kopiraj ceo:**
```
Svakog radnog dana u 18h obradi nove fakture. Radi samostalno; ako nešto ne uspe,
preskoči i navedi u rezimeu.

1. Nađi u Gmail-u NEPROČITANE poruke iz poslednja 24h sa fakturom (PDF prilog ili
   „faktura/račun/invoice"). Ako ih nema, javi to i završi.
2. Za svaku izvuci: Dobavljač, Datum, Opis, Iznos, PDV, Ukupno, Rok plaćanja.
   Ako iznos nije jasan — upiši „proveriti", ne pogađaj.
3. Dodeli kategoriju [Softver/alati, Marketing, Kancelarija, Honorari, Putovanja, Ostalo].
4. Dodaj red u Google Sheet „Troškovi" (Status „Za plaćanje") i napravi Calendar podsetnik
   2 dana pre roka.
5. Rezime: koliko faktura obrađeno, ukupan iznos, i koje zahtevaju „proveriti".
NE plaćaj i ne šalji ništa — samo evidentiraj i podseti.
```

### Korak 6 — Create scheduled task

> 🖱️ **Scheduled → New task** → „Prijem faktura" → nalepi agent-prompt → pristup Sheet/Calendar
> → **Skip** → **Frequency:** radnim danima 18h → **Save**.

> 📸 **SCREENSHOT [S7]:** popunjen scheduled task dijalog.

### Korak 7 — Run now i pregled

> 📸 **SCREENSHOT [S8]:** run + novi redovi u tabeli i podsetnici.

### ✅ Checkpoint B — agent je spreman kad…

- [ ] Task hvata nove fakture i evidentira ih tačno.
- [ ] Podsetnici se prave pre roka.
- [ ] Sumnjivi iznosi su označeni „proveriti", ništa nije plaćeno automatski.

---

## Human-in-the-loop

- **Autonomno:** čitanje mejla, ekstrakcija, upis u tabelu, podsetnik.
- **Čovek:** provera iznosa i samo plaćanje (nikad automatski).

## Ideje za primenu (za diskusiju na radionici)

- Iz Drive foldera umesto mejla (skenirane fakture).
- Mesečni izveštaj troškova po kategoriji (veza sa vežbom 08).
- Označavanje neuobičajeno visokih iznosa (anomalija) za dodatnu proveru.

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | Povezani Gmail + Sheets + Calendar |
| S2 | Prazna tabela „Troškovi" |
| S3 | Pronađena faktura u mejlu |
| S4 | Izvučeni podaci fakture |
| S5 | Predložena kategorija |
| S6 | Upisan red + podsetnik |
| S7 | Scheduled task dijalog |
| S8 | Run + redovi i podsetnici |
