# 06. Agent za analizu konkurencije

> **Grupa:** BizDev · **Radionica:** R2 (rezerva/dodatna) · **Status:** draft
> **Šta agent radi (1 rečenica):** Održava tabelu konkurenata, sam pronalazi nove, radi research skorašnjih vesti za sve, i šalje ti sažet PDF izveštaj na mejl — samo ono najvažnije.

## Blueprint

```
OKIDAČ:      raspored (npr. ponedeljak 8h, weekly)
IZVOR:       Google Sheet „Konkurenti" + web (vesti, sajtovi, novi igrači)
OBRADA:      research vesti za postojeće → nađi nove konkurente → dodaj u tabelu → sažmi
DESTINACIJA: tabela ažurirana + sažet PDF izveštaj poslat na tvoj mejl (sa tvog na tvoj)
```

## Zašto je ovo dobra vežba

- Agent koji **piše u bazu i sam je proširuje** (dodaje nove redove, ne samo čita).
- Spoj više alata: tabela ↔ web research ↔ PDF ↔ mejl.
- Filtriranje šuma — izveštaj sadrži samo ono što je bitno, sumirano.
- Realan „market intelligence" tok koji štedi sate ručnog praćenja.

## Preduslovi i konektori

- Plaćeni plan (scheduled task).
- **Google Sheets** — tabela „Konkurenti".
- **Web research** (ugrađeno).
- **Gmail** connector (slanje izveštaja na svoj mejl).
- (Opciono) **Google Drive** — za čuvanje PDF izveštaja i deljenje linka.

Tabela „Konkurenti" — kolone: `Konkurent`, `Sajt`, `Kategorija`, `Zašto je konkurent`,
`Poslednja provera` (datum), `Poslednje vesti`, `Status` (Aktivan / Nov / Za proveru).

> 📸 **SCREENSHOT [S1]:** povezani Google Sheets + Gmail (i Drive ako se koristi).
> 📸 **SCREENSHOT [S2]:** tabela „Konkurenti" sa 3–5 „seed" konkurenata (početno popunjena rukom).

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

Cilj: prvo rukom prođemo ceo ciklus za tabelu sa par konkurenata, da zaključamo šta i kako agent radi.

### Korak 1 — Research vesti za postojeće konkurente

Prvo naučimo Claude-a da pročita tabelu i za svakog nađe skorašnje vesti.

> 🖱️ Klik po klik:
> 1. Otvori **New chat**.
> 2. Nalepi prompt ispod.

**Prompt — kopiraj:**
```
Pročitaj Google Sheet „Konkurenti". Za SVAKOG konkurenta iz tabele pretraži web za
vesti iz poslednjih 30 dana (nov proizvod, cena, kampanja, partnerstvo, runda, ključno
zapošljavanje). Za svakog vrati 1–2 NAJVAŽNIJE stavke, svaku sa linkom na izvor.
Preskoči nebitno (obične blog objave, reklame). Ako za nekog nema ničeg vrednog, reci to.
```

> 📸 **SCREENSHOT [S3]:** vesti po konkurentu sa izvorima.

### Korak 2 — Pronađi nove konkurente

Sada tražimo firme kojih još NEMA u tabeli.

**Prompt — kopiraj:**
```
Naš profil: [ukratko šta radimo / proizvod / tržište / region].
Na osnovu toga pronađi 3–5 firmi koje su nam konkurenti ili alternativa, a KOJIH NEMA
u tabeli „Konkurenti". Za svaku: naziv, sajt, kategorija, i jedna rečenica zašto je
konkurent. Uključi samo stvarne firme sa proverljivim sajtom — ne izmišljaj.
```

> 📸 **SCREENSHOT [S4]:** predlog novih konkurenata (sa sajtovima).

### Korak 3 — Dodaj nove u tabelu i istraži ih

**Prompt — kopiraj:**
```
Dodaj te nove konkurente kao nove redove u Sheet „Konkurenti" (Status = „Nov",
Poslednja provera = danas). Zatim za svakog novog uradi isti research kao u koraku 1
(1–2 najvažnije vesti sa izvorom) i upiši u kolonu „Poslednje vesti".
Pre upisa mi pokaži šta ćeš dodati.
```

> 📸 **SCREENSHOT [S5]:** tabela sa dodatim novim konkurentima + popunjene vesti.

### Korak 4 — Napravi sažet izveštaj i pretvori u PDF

**Prompt — kopiraj:**
```
Napravi kratak izveštaj o konkurenciji (da se pročita za 2 minuta):
- 1 rečenica: najvažnije ove nedelje
- po konkurentu SAMO ako ima nešto vredno: 1–2 stavke + link (bez praznog nabrajanja)
- sekcija „Novi konkurenti": ko je dodat i zašto je bitan
- na kraju: 1–2 stvari na koje da obratimo pažnju
Zatim od ovog izveštaja napravi uredan PDF (naslov „Analiza konkurencije — [datum]",
čist, minimalan). Sačuvaj PDF u Google Drive folder /Izvestaji.
```

> ⚠️ **Napomena o PDF-u i attachmentu:** Gmail connector ne mora da podržava kačenje
> fajlova. Zato je najpouzdaniji tok: **sažetak ide kao lep HTML u telu mejla** (da čitaš
> odmah, bez otvaranja), a **PDF se sačuva u Drive** i u mejl ubacimo link na njega.
> Ako tvoja verzija podržava attachment, agent može i direktno da zakači PDF.

> 📸 **SCREENSHOT [S6]:** gotov izveštaj + sačuvan PDF u Drive-u.

### Korak 5 — Pošalji izveštaj na svoj mejl

Šaljemo sa tvog Gmail-a na tvoju istu adresu (self-send).

**Prompt — kopiraj:**
```
Pošalji mejl sa mog Gmail-a na moju adresu [tvoj-mejl@firma.com]:
- subject: „Analiza konkurencije — [datum]"
- telo: ceo sažetak kao uredan HTML (najvažnije prvo)
- dodaj link na PDF iz /Izvestaji (ili zakači PDF ako je moguće)
Pošalji ga (ide samo meni).
```

> 📸 **SCREENSHOT [S7]:** primljen mejl sa sažetkom + link/attachment PDF-a.

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] Za postojeće konkurente izvučene su tačne, skorašnje vesti sa izvorima.
- [ ] Bar jedan nov konkurent je pronađen, dodat u tabelu i istražen.
- [ ] Izveštaj je sažet (bez praznog nabrajanja) i pretvoren u PDF.
- [ ] Mejl sa sažetkom je stigao na tvoju adresu.

---

## Deo B — Automatizacija (nedeljni scheduled task)

Sada ceo ciklus spajamo u jedan samostalan zadatak koji radi svake nedelje.

### Korak 6 — Pun agent-prompt (spoj koraka 1–5)

**Agent-prompt — kopiraj ceo:**
```
Svakog ponedeljka u 8h uradi analizu konkurencije za „Horizont Digital"
(profil: [šta radimo / proizvod / tržište / region]). Radi samostalno; ako neki korak
ne uspe, preskoči ga i navedi u rezimeu.

1. POSTOJEĆI: pročitaj Google Sheet „Konkurenti" i za svakog nađi 1–2 najvažnije vesti
   iz poslednjih 30 dana (proizvod, cena, kampanja, partnerstvo, runda, ključno
   zapošljavanje), svaku sa proverljivim linkom. Preskoči nebitno. Ažuriraj „Poslednje
   vesti" i „Poslednja provera" (danas).
2. NOVI: pronađi 3–5 firmi koje su nam konkurenti a nisu u tabeli. Dodaj ih kao nove
   redove (Status „Nov") i istraži ih isto kao postojeće. Koristi samo stvarne firme sa
   proverljivim sajtom — ne izmišljaj.
3. IZVEŠTAJ: napravi sažet izveštaj (2 min čitanja): najvažnije ove nedelje, po
   konkurentu samo ako ima nešto vredno (1–2 stavke + link), sekcija „Novi konkurenti",
   i 1–2 stvari za pažnju. Napravi PDF i sačuvaj u Drive /Izvestaji.
4. MEJL: pošalji sa mog Gmail-a na [tvoj-mejl@firma.com], subject „Analiza konkurencije —
   [datum]", telo = ceo sažetak kao HTML, plus link na PDF (ili attachment ako je moguće).
   Pošalji (ide samo meni).
5. REZIME: koliko konkurenata provereno, koliko novih dodato, i da je izveštaj poslat.
```

### Korak 7 — Create scheduled task

> 🖱️ Klik po klik: **Scheduled → New task** → **Name:** „Analiza konkurencije" →
> **Description** obavezno → nalepi agent-prompt → daj pristup Sheet-u/Drive-u →
> **Permissions: Skip** → **Frequency:** ponedeljak 8h → **Save**.
>
> 💡 Prvo **Manual** + **Run now** da vidiš prvi rezultat, pa prebaci na weekly.

> 📸 **SCREENSHOT [S8]:** popunjen „Create scheduled task" dijalog.

### Korak 8 — Run now, verifikacija i pregled

> 🖱️ **Run now** → prati Progress → proveri: tabela ažurirana, novi konkurenti dodati,
> mejl stigao. **Otvori bar 2 linka** iz izveštaja da potvrdiš da vode na stvarne vesti.

> 📸 **SCREENSHOT [S9]:** prvi run: ažurirana tabela + primljen mejl sa izveštajem.

### ✅ Checkpoint B — agent je spreman kad…

- [ ] Task radi ponedeljkom i sam ažurira tabelu (postojeći + novi).
- [ ] Izveštaj je sažet, sa proverljivim linkovima (proveriti bar 2).
- [ ] Mejl sa PDF-om/linkom stiže na tvoju adresu.
- [ ] Pregledana bar 2 uzastopna run-a (izvori se menjaju — prati drift i duplikate).

---

## Human-in-the-loop

- **Autonomno:** research, upis u tabelu, dodavanje novih konkurenata, pravljenje izveštaja.
- **Slanje mejla je auto** — ali samo zato što ide **isključivo tebi** (low-stakes, self-send).
  Ako bi ikad slao izveštaj timu ili napolje, prebaci na **draft** i pregledaj pre slanja.
- Verifikacija linkova ostaje na čoveku (model ume da promaši ili zastari izvor).

## Ideje za primenu (za diskusiju na radionici)

- „Alert" varijanta: ako konkurent snizi cenu ili lansira proizvod → poseban hitan mejl odmah.
- Praćenje po kategoriji (direktni vs. indirektni konkurenti) i poseban score „pretnje".
- Kvartalni trend: čuvanje starih izveštaja u Drive-u i poređenje kroz vreme.
- Uместо mejla — upis sažetka u Notion „Konkurencija" stranicu za ceo tim.

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | Povezani Google Sheets + Gmail (+ Drive) |
| S2 | Tabela „Konkurenti" sa seed konkurentima |
| S3 | Vesti po konkurentu sa izvorima |
| S4 | Predlog novih konkurenata |
| S5 | Tabela sa dodatim novim + popunjene vesti |
| S6 | Gotov izveštaj + PDF u Drive-u |
| S7 | Primljen mejl sa sažetkom + PDF/link |
| S8 | Scheduled task dijalog |
| S9 | Prvi run: ažurirana tabela + mejl |
