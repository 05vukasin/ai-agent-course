# 03. Agent za kvalifikaciju i „enrichment" leada

> **Grupa:** BizDev · **Radionica:** R1 · **Status:** draft
> **Šta agent radi (1 rečenica):** Za novog leada istraži firmu na webu, oceni koliko odgovara vašem idealnom klijentu (ICP) i predloži pristup, pa to upiše u CRM.

## Blueprint

```
OKIDAČ:      nov lead (ime firme/kontakt) — ručno ili nov red u „Novi leadovi"
IZVOR:       web research (sajt firme, vesti, LinkedIn) + vaši ICP kriterijumi
OBRADA:      istraži firmu → oceni fit (score 1–5) → predloži pristup
DESTINACIJA: obogaćen red u CRM-u (sažetak + score + predlog pristupa + prioritet)
```

## Zašto je ovo dobra vežba

- Web research sa naznakom izvora + filtriranje šuma.
- Pretvaranje „osećaja" u ponovljiv kriterijum (ICP score).
- Priprema koja štedi sate ručnog guglanja pre prvog kontakta.

## Preduslovi i konektori

- **Web research** (ugrađeno).
- **Notion** (ili Google Sheets) — CRM/„Novi leadovi" baza.
- Definisan **ICP** (idealni profil klijenta) — kriterijumi ispod se koriste u promptu.

> 📸 **SCREENSHOT [S1]:** „Novi leadovi" baza sa poljima: Firma, Kontakt, Score, Sažetak, Predlog pristupa, Prioritet.

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

### Korak 1 — Istraži firmu

> 🖱️ **New chat** → nalepi prompt (zameni firmu stvarnim leadom).

**Prompt — kopiraj:**
```
Istraži firmu „[Ime firme]" (sajt: [ako imaš URL]). Vrati kratko:
- čime se bave (1–2 rečenice)
- veličina / delatnost / tržište
- skorašnji signali (rast, nova runda, otvorene pozicije, vesti) — sa linkom na izvor
Koristi samo proverljive izvore; ako nešto ne nađeš, reci „nepoznato". Ne izmišljaj.
```

> 📸 **SCREENSHOT [S2]:** sažetak istraživanja firme sa izvorima.

### Korak 2 — Oceni fit po ICP kriterijumima

**Prompt — kopiraj:**
```
Oceni koliko ova firma odgovara našem idealnom klijentu. Naš ICP:
- delatnost: [npr. e-commerce, SaaS, agencije]
- veličina: [npr. 10–100 zaposlenih]
- signal potrebe: [npr. ulažu u marketing / imaju sopstveni sajt / skaliraju]
Daj: Score 1–5 (5 = savršen fit), jednu rečenicu obrazloženja, i „crvene zastavice"
ako postoje (razlozi zašto možda nije za nas).
```

> 📸 **SCREENSHOT [S3]:** ICP score + obrazloženje.

### Korak 3 — Predloži pristup i upiši u CRM

**Prompt — kopiraj:**
```
Na osnovu istraživanja predloži pristup za prvi kontakt:
- „kuka" (konkretan povod baš za ovu firmu, 1 rečenica)
- kanal (mejl / LinkedIn / poziv) i zašto
- prioritet (Visok / Srednji / Nizak) na osnovu score-a
Zatim upiši nov red u Notion „Novi leadovi": Firma, Kontakt, Score, Sažetak,
Predlog pristupa, Prioritet. Pokaži mi red pre upisa.
```

> 📸 **SCREENSHOT [S4]:** upisan obogaćen red u bazi.

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] Istraživanje ima proverljive izvore (bez izmišljenih podataka).
- [ ] Score je obrazložen i doslednо prati ICP.
- [ ] Red u CRM-u sadrži sažetak, score, predlog pristupa i prioritet.

---

## Deo B — Automatizacija (obrada svih novih leadova odjednom)

### Korak 4 — Pun agent-prompt (spoj koraka 1–3)

**Agent-prompt — kopiraj ceo:**
```
Obradi sve NOVE leadove. Radi samostalno; ako nešto ne uspe, preskoči i navedi u rezimeu.

1. U Notion bazi „Novi leadovi" nađi redove sa statusom „Nov" (ili prazan Score).
2. Za svaki: istraži firmu na webu (čime se bave, veličina, skorašnji signali) —
   samo proverljivi izvori, bez izmišljanja.
3. Oceni fit po našem ICP-u: delatnost [...], veličina [...], signal [...]. Daj Score 1–5.
4. Predloži pristup (kuka + kanal) i prioritet.
5. Upiši u red: Sažetak, Score, Predlog pristupa, Prioritet; promeni status u „Obrađen".
6. Rezime: koliko leadova obrađeno, top 3 po score-u sa kukom za svaki.
```

### Korak 5 — Create scheduled task

> 🖱️ **Scheduled → New task** → „Kvalifikacija leadova" → nalepi agent-prompt →
> folder/baza pristup → **Skip** → **Frequency:** svaki dan 9h (ili Manual + Run now) → **Save**.

> 📸 **SCREENSHOT [S5]:** popunjen scheduled task dijalog.

### Korak 6 — Run now i pregled

> 📸 **SCREENSHOT [S6]:** run + rezime sa top 3 leada.

### ✅ Checkpoint B — agent je spreman kad…

- [ ] Obradi sve „Nove" leadove i označi ih „Obrađen".
- [ ] Score-ovi su dosledni i obrazloženi.
- [ ] Rezime izdvaja prioritetne leadove sa konkretnom kukom.

---

## Human-in-the-loop

- **Autonomno:** istraživanje, scoring, upis u internu bazu.
- **Čovek:** odluka koga zaista kontaktirati i slanje prve poruke.

## Ideje za primenu (za diskusiju na radionici)

- Povezati sa vežbom 04: prioritetni leadovi automatski dobijaju draft prve poruke.
- Različiti ICP-ovi po segmentima (npr. mala vs. velika firma).
- „Disqualify" pravila (npr. konkurencija, van regiona) → status „Odbačen".

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | „Novi leadovi" baza sa poljima |
| S2 | Istraživanje firme sa izvorima |
| S3 | ICP score + obrazloženje |
| S4 | Obogaćen red u bazi |
| S5 | Scheduled task dijalog |
| S6 | Run + top 3 leada |
