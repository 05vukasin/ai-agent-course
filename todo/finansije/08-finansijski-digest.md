# 08. Nedeljni finansijski digest (cash-flow)

> **Grupa:** Finansije · **Radionica:** R1 · **Status:** draft
> **Šta agent radi (1 rečenica):** Iz tabele prihoda i troškova izračuna burn, runway i najveće troškove, pa pošalje kratak sažetak — i (mesečno) vizuelni one-pager.

## Blueprint

```
OKIDAČ:      raspored (petak 16h nedeljno; ili 1. u mesecu)
IZVOR:       Google Sheet „Prihodi/Troškovi"
OBRADA:      saberi prihode/troškove → burn, runway, top kategorije, trend vs. prošla nedelja
DESTINACIJA: email digest (draft) + mesečno vizuelni one-pager (Claude Design)
```

## Zašto je ovo dobra vežba

- Rad sa brojevima iz tabele (agregacija, prosti finansijski pokazatelji).
- Ponovljiv format izveštaja iz nedelje u nedelju.
- Veza „podaci → odluka" (runway = koliko meseci do nule pri trenutnom burn-u).

## Preduslovi i konektori

- **Google Sheets** — tabela sa kolonama: Datum, Tip (Prihod/Trošak), Kategorija, Iznos.
- **Gmail** (digest kao draft).
- **Claude Design** — za mesečni vizuelni one-pager (opciono).

> 📸 **SCREENSHOT [S1]:** tabela „Prihodi/Troškovi" (primer podataka).

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

### Korak 1 — Pročitaj i saberi

> 🖱️ **New chat** → nalepi prompt.

**Prompt — kopiraj:**
```
Pogledaj Google Sheet „Prihodi/Troškovi". Za tekuću nedelju izračunaj:
- ukupni prihod
- ukupni trošak
- neto (prihod − trošak)
Prikaži i iste brojeve za prošlu nedelju radi poređenja.
```

> 📸 **SCREENSHOT [S2]:** sažetak prihod/trošak/neto (ova vs. prošla nedelja).

### Korak 2 — Izračunaj burn, runway i top troškove

**Prompt — kopiraj:**
```
Na osnovu istih podataka izračunaj:
- prosečni mesečni burn (prosek troškova zadnja 3 meseca)
- runway = trenutni saldo / mesečni burn (saldo je [unesi] ili iz tabele „Stanje")
- top 3 kategorije troška ove nedelje sa iznosima i % učešća
Ako nema dovoljno podataka za neki pokazatelj, reci to jasno.
```

> 📸 **SCREENSHOT [S3]:** burn, runway i top 3 kategorije.

### Korak 3 — Sastavi digest

**Prompt — kopiraj:**
```
Napravi kratak finansijski digest (da se pročita za 1 minut):
- 1 rečenica: kako stojimo ove nedelje (neto + trend)
- ključni brojevi: prihod, trošak, neto, runway
- top 3 troška
- 1 „na šta obratiti pažnju" (npr. skok u nekoj kategoriji)
Ton: jasno, bez žargona.
```

> 📸 **SCREENSHOT [S4]:** gotov tekst digesta.

### Korak 4 — (Mesečno) vizuelni one-pager u Claude Design

> 🖱️ Otvori **Claude Design** → nalepi prompt → doteruj → **Share → Export** (HTML/PDF).
> Ovo se radi jednom da se napravi izgled; kasnije se puni novim brojevima.

**Prompt — kopiraj:**
```
Napravi čist finansijski one-pager: naslov „Horizont Digital — mesečni pregled",
4 velike „stat" kartice (Prihod, Trošak, Neto, Runway), i mali blok „Top troškovi".
Boje: crno-belo sa jednim akcentom, minimalno i profesionalno.
```

> 📸 **SCREENSHOT [S5]:** one-pager u Claude Design-u.

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] Brojevi se poklapaju sa tabelom (ručno proveri par).
- [ ] Runway i burn su tačno izračunati.
- [ ] Digest je kratak i razumljiv.

---

## Deo B — Automatizacija (nedeljni scheduled task)

### Korak 5 — Pun agent-prompt (spoj koraka 1–3)

**Agent-prompt — kopiraj ceo:**
```
Svakog petka u 16h napravi nedeljni finansijski digest za „Horizont Digital". Radi
samostalno; ako nešto ne uspe, preskoči i navedi u rezimeu.

1. Iz Google Sheet „Prihodi/Troškovi" saberi prihod, trošak i neto za tekuću nedelju,
   i isto za prošlu nedelju (poređenje).
2. Izračunaj mesečni burn (prosek 3 meseca), runway (saldo/burn) i top 3 kategorije troška.
3. Sastavi kratak digest: kako stojimo (1 rečenica) + ključni brojevi + top 3 troška +
   1 upozorenje ako neka kategorija naglo raste.
4. Napravi Gmail DRAFT „Finansijski pregled — [datum]" za [uprava@firma.rs]. Ostavi kao DRAFT.
5. Rezime: neto nedelje i runway u jednoj rečenici.
```

### Korak 6 — Create scheduled task

> 🖱️ **Scheduled → New task** → „Finansijski digest" → nalepi agent-prompt → pristup Sheet-u
> → **Skip** → **Frequency:** petak 16h → **Save**.

> 📸 **SCREENSHOT [S6]:** popunjen scheduled task dijalog.

### Korak 7 — Run now i pregled

> 📸 **SCREENSHOT [S7]:** run + digest draft u Gmail-u.

### ✅ Checkpoint B — agent je spreman kad…

- [ ] Digest stiže petkom sa tačnim brojevima.
- [ ] Runway/burn se poklapaju sa ručnom proverom.
- [ ] Ide kao draft (uprava pregleda pre deljenja).

---

## Human-in-the-loop

- **Autonomno:** čitanje tabele, računanje, pisanje digesta.
- **Čovek:** tumači brojeve i odlučuje; digest se šalje tek posle pregleda.

## Ideje za primenu (za diskusiju na radionici)

- Mesečni one-pager (Claude Design) uz nedeljni tekstualni digest.
- Alarmi: runway < 6 meseci → poseban „crveni" mejl.
- Segmentacija prihoda po klijentu/projektu.

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | Tabela „Prihodi/Troškovi" |
| S2 | Sažetak prihod/trošak/neto |
| S3 | Burn, runway, top kategorije |
| S4 | Gotov tekst digesta |
| S5 | One-pager u Claude Design |
| S6 | Scheduled task dijalog |
| S7 | Run + digest draft |
