# 06. Agent za praćenje EU fondova ⭐

> **Grupa:** Finansije · **Radionica:** R1 · **Status:** draft
> **Šta agent radi (1 rečenica):** Svake nedelje prati otvorene EU i nacionalne pozive za sredstva relevantne vašem sektoru, filtrira po uslovima i roku, i puni tracker + šalje digest.

> **Napomena:** ovo je obavezan projekat za grupu Finansije. Poseban naglasak na
> **verifikaciji linkova i rokova** — pogrešan rok ili mrtav link je skup propust.

## Blueprint

```
OKIDAČ:      raspored (npr. ponedeljak 8h, weekly)
IZVOR:       web (EU Funding & Tenders portal, nacionalni fondovi, sektorski pozivi)
OBRADA:      pronađi otvorene pozive → filtriraj po sektoru/uslovima/roku → sažmi + proveri link
DESTINACIJA: tracker (Notion baza / Google Sheet) sa rokovima + nedeljni email digest
```

## Zašto je ovo dobra vežba

- Monitoring iz nedelje u nedelju (ponovljiv output, praćenje drifta izvora).
- Strogi kriterijumi eligibility + rok (filtriranje šuma).
- Obavezna verifikacija: svaki poziv mora imati stvaran, otvoren link i tačan rok.

## Preduslovi i konektori

- Plaćeni plan (scheduled task).
- **Web research** (ugrađeno).
- **Notion** (baza „EU fondovi") ili **Google Sheets** kao tracker.
- **Gmail** connector (za digest).
- Definisan **profil firme**: sektor, veličina, region, tip projekta (koristi se u promptu).

> 📸 **SCREENSHOT [S1]:** tracker baza „EU fondovi" sa poljima: Naziv poziva, Program, Ko finansira, Iznos/stopa, Rok, Eligibility (kratko), Link, Status (Nov/Za pregled/Odbačeno).

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

Cilj: prvo rukom sastavimo jednu tačnu nedeljnu listu, da zaključamo kriterijume i format.

### Korak 1 — Definiši profil i pronađi otvorene pozive

> 🖱️ **New chat** → nalepi prompt (popuni profil firme).

**Prompt — kopiraj:**
```
Tražim otvorene pozive za (su)finansiranje za našu firmu.
Profil: sektor [npr. digitalni marketing / IT], veličina [npr. mikro/MSP, 25 ljudi],
region [npr. Srbija / EU], tip projekta [npr. digitalizacija, izvoz, inovacija, obuke].

Pronađi AKTUELNO OTVORENE pozive iz ovih izvora (i sličnih):
- EU Funding & Tenders portal (Horizon Europe, Digital Europe, Interreg)
- nacionalni/regionalni fondovi i razvojne agencije
- sektorski grantovi i programi podrške MSP

Za svaki poziv daj: naziv, program/ko finansira, i link na zvaničnu stranicu poziva.
Uključi SAMO pozive za koje imaš stvaran, proverljiv link. Ne izmišljaj.
```

> 📸 **SCREENSHOT [S2]:** lista pronađenih otvorenih poziva sa linkovima.

### Korak 2 — Filtriraj po uslovima i roku

**Prompt — kopiraj:**
```
Iz gornje liste zadrži samo pozive koji ispunjavaju:
- eligibilan je naš profil (sektor/veličina/region)
- rok za prijavu JOŠ NIJE prošao
Za odbačene ukratko reci zašto (npr. „samo za javni sektor", „rok istekao 01.03").
```

> 📸 **SCREENSHOT [S3]:** filtrirana lista + razlozi odbacivanja.

### Korak 3 — Sažmi i proveri svaki poziv

**Prompt — kopiraj:**
```
Za svaki preostali poziv otvori zvaničnu stranicu i izvuci:
- Iznos / stopa sufinansiranja
- Rok za prijavu (tačan datum)
- Ko može da se prijavi (eligibility, 1 rečenica)
- Šta se finansira (1 rečenica)
- Link (direktan na poziv)
Ako se rok ili iznos ne vide jasno na stranici, napiši „proveriti" umesto da pogađaš.
```

> 📸 **SCREENSHOT [S4]:** detaljan sažetak 1–2 poziva (rok, iznos, eligibility, link).

### Korak 4 — Upiši u tracker

**Prompt — kopiraj:**
```
Upiši sve proverene pozive u Notion bazu „EU fondovi": Naziv, Program, Ko finansira,
Iznos/stopa, Rok, Eligibility, Link, Status = „Nov". Ne dupliraj pozive koji već postoje
(proveri po Nazivu/Linku).
```

> 📸 **SCREENSHOT [S5]:** popunjen tracker sa nekoliko poziva.

### Korak 5 — Napravi email digest (draft)

**Prompt — kopiraj:**
```
Napravi Gmail DRAFT „EU fondovi — nedeljni pregled [datum]" za [tim@firma.rs]:
- kratak uvod (1 rečenica)
- lista poziva sortirana po ROKU (najbliži prvo): naziv — iznos — rok — link
- na kraju istakni pozive čiji je rok za manje od 14 dana („HITNO")
Ostavi kao DRAFT, ne šalji.
```

> 📸 **SCREENSHOT [S6]:** draft digesta u Gmail-u (nije poslat).

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] Svaki poziv na listi ima stvaran, otvoren link (proveren klikom).
- [ ] Rokovi su tačni i nijedan istekli poziv nije uključen.
- [ ] Tracker je popunjen bez duplikata.
- [ ] Digest sortira po roku i ističe hitne pozive.

---

## Deo B — Automatizacija (nedeljni scheduled task)

### Korak 6 — Pun agent-prompt (spoj koraka 1–5)

**Agent-prompt — kopiraj ceo:**
```
Svakog ponedeljka u 8h pripremi nedeljni pregled EU/nacionalnih fondova za firmu
„Horizont Digital" (sektor: digitalni marketing/IT; veličina: MSP; region: [Srbija/EU];
tip: digitalizacija, izvoz, inovacija, obuke). Radi samostalno; ako nešto ne uspe,
preskoči i navedi u rezimeu.

1. PRETRAGA: nađi AKTUELNO OTVORENE pozive iz: EU Funding & Tenders portal (Horizon
   Europe, Digital Europe, Interreg), nacionalni/regionalni fondovi i razvojne agencije,
   sektorski programi za MSP. Koristi samo pozive sa stvarnim, proverljivim linkom.
2. FILTER: zadrži samo one gde smo eligibilni i gde rok NIJE prošao.
3. PROVERA: za svaki otvori zvaničnu stranicu i izvuci Iznos/stopa, tačan Rok,
   Eligibility, Link. Ako nešto nije jasno — napiši „proveriti", ne pogađaj.
4. TRACKER: upiši u Notion bazu „EU fondovi" (Naziv, Program, Ko finansira, Iznos,
   Rok, Eligibility, Link, Status=Nov). Ne dupliraj postojeće.
5. DIGEST: napravi Gmail DRAFT „EU fondovi — nedeljni pregled [datum]" za [tim@firma.rs],
   sortiran po roku, sa „HITNO" oznakom za rokove < 14 dana. Ostavi kao DRAFT.
6. REZIME: koliko novih poziva, koliko hitnih, i da je digest spreman u Gmail-u.
```

### Korak 7 — Create scheduled task

> 🖱️ **Scheduled → New task** → „EU fondovi — nedeljni pregled" → **Description** obavezno →
> nalepi agent-prompt → izaberi folder/bazu → **Permissions: Skip** → **Frequency:** ponedeljak 8h → **Save**.
>
> 💡 Savet: prvo **Manual** + **Run now** da vidiš prvi rezultat, pa prebaci na weekly.

> 📸 **SCREENSHOT [S7]:** popunjen „Create scheduled task" dijalog.

### Korak 8 — Run now, verifikacija i pregled

> 🖱️ **Run now** → prati Progress → **otvori bar 2–3 linka** iz trackera da potvrdiš da
> vode na stvarne, otvorene pozive → pregledaj digest draft.

> 📸 **SCREENSHOT [S8]:** prvi run: tracker popunjen + digest draft + rezime.

### ✅ Checkpoint B — agent je spreman kad…

- [ ] Task radi ponedeljkom i puni tracker novim, proverenim pozivima.
- [ ] Rokovi tačni; nema mrtvih linkova (proveriti bar 2–3 ručno).
- [ ] Digest draft je spreman, sortiran po roku, hitni istaknuti.
- [ ] Pregledan bar 2 uzastopna run-a (izvori se menjaju — prati drift).

---

## Human-in-the-loop

- **Autonomno:** pretraga, filtriranje, upis u tracker, pisanje digesta.
- **Čovek:** verifikuje rokove/linkove i odlučuje na koji poziv se zaista prijavljuje.
- Digest ide kao **draft** (ništa se ne šalje timu bez pregleda).

## Ideje za primenu (za diskusiju na radionici)

- Uži fokus po programu (samo Horizon Europe, ili samo nacionalni fondovi).
- „Rok se bliži" podsetnik: agent 7 dana pre roka pravi poseban alert.
- Veza sa „Asistentom za prijavu" (rezervni projekat): izabran poziv → draft sekcija prijave.
- Različiti profili za više firmi/klijenata agencije.

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | Tracker baza „EU fondovi" sa poljima |
| S2 | Lista pronađenih otvorenih poziva |
| S3 | Filtrirana lista + razlozi odbacivanja |
| S4 | Detaljan sažetak poziva (rok/iznos/link) |
| S5 | Popunjen tracker |
| S6 | Digest draft u Gmail-u |
| S7 | Scheduled task dijalog |
| S8 | Prvi run: tracker + digest + rezime |
