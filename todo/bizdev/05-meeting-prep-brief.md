# 05. Agent za pripremu sastanka (meeting prep brief)

> **Grupa:** BizDev · **Radionica:** R2 · **Status:** draft
> **Šta agent radi (1 rečenica):** Pre svakog sastanka spoji kalendar, istraživanje učesnika i prošle CRM beleške u jednostrani brief — ko je s druge strane, kontekst i pitanja.

## Blueprint

```
OKIDAČ:      jutarnji raspored (za današnje sastanke) ili ručno pre poziva
IZVOR:       Google Calendar + web research (učesnik/firma) + CRM beleške
OBRADA:      spoji izvore → jednostrani brief (ko, kontekst, ciljevi, pitanja)
DESTINACIJA: kratak brief (mejl sebi / Notion stranica) pre sastanka
```

## Zašto je ovo dobra vežba

- Spajanje 3 izvora u jedan koristan dokument.
- „Nikad nespreman" na sastanak bez ručnog kopanja.
- Pokazuje kako agent čita raspored i sam bira šta je relevantno.

## Preduslovi i konektori

- **Google Calendar** connector.
- **Web research** (ugrađeno).
- **Notion** (CRM beleške) — opciono ako se koristi CRM iz vežbe 02.

> 📸 **SCREENSHOT [S1]:** povezani Google Calendar (+ Notion) konektori.

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

### Korak 1 — Pogledaj današnje sastanke

> 🖱️ **New chat** → nalepi prompt.

**Prompt — kopiraj:**
```
Izlistaj moje sastanke iz Google Calendar-a za danas: vreme, naslov, i gosti (mejlovi).
Označi koji su eksterni (gost van naše firme).
```

> 📸 **SCREENSHOT [S2]:** lista današnjih sastanaka sa gostima.

### Korak 2 — Istraži učesnika / firmu

**Prompt — kopiraj:**
```
Za sastanak „[naziv]" istraži drugu stranu na osnovu mejl domena gosta / imena firme:
- čime se firma bavi (1–2 rečenice)
- uloga osobe ako je javno dostupna
- skorašnji signal (vest, objava) sa linkom
Samo proverljivo; ako ne nađeš, reci „nepoznato".
```

> 📸 **SCREENSHOT [S3]:** istraživanje učesnika sa izvorom.

### Korak 3 — Povuci prošle CRM beleške

**Prompt — kopiraj:**
```
Pretraži Notion CRM za ovog kontakta/firmu i sažmi našu istoriju: faza deala,
poslednji kontakt, dogovoreni sledeći korak i otvorena pitanja iz beleški.
Ako nema zapisa, reci da je prvi kontakt.
```

> 📸 **SCREENSHOT [S4]:** sažetak istorije iz CRM-a.

### Korak 4 — Sastavi jednostrani brief

**Prompt — kopiraj:**
```
Napravi jednostrani brief za ovaj sastanak:
- KO: osoba + firma (1 red)
- KONTEKST: gde smo stali (iz CRM-a)
- ZAŠTO SAD: skorašnji signal / povod
- CILJ SASTANKA: 1 rečenica
- 3 PITANJA koja treba da postavim
- 1 RIZIK / na šta da pazim
Kratko, „skenljivo", bez uvoda.
```

> 📸 **SCREENSHOT [S5]:** gotov brief.

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] Kalendar se čita tačno (eksterni sastanci označeni).
- [ ] Istraživanje je proverljivo, CRM istorija povučena.
- [ ] Brief staje na jedan ekran i zaista je koristan.

---

## Deo B — Automatizacija (jutarnji brief za sve sastanke)

### Korak 5 — Pun agent-prompt (spoj koraka 1–4)

**Agent-prompt — kopiraj ceo:**
```
Svakog radnog jutra u 7:30 pripremi brifove za današnje sastanke. Radi samostalno;
ako nešto ne uspe, preskoči i navedi u rezimeu.

1. Uzmi iz Google Calendar-a sve današnje sastanke sa bar jednim EKSTERNIM gostom.
2. Za svaki: istraži firmu/osobu na webu (kratko, proverljivo) i povuci istoriju iz
   Notion CRM-a (faza, poslednji kontakt, sledeći korak).
3. Sastavi jednostrani brief po strukturi: KO / KONTEKST / ZAŠTO SAD / CILJ / 3 PITANJA / RIZIK.
4. Sve brifove spoji u jednu poruku (ili Notion stranicu „Brief — [datum]") poređane po
   vremenu sastanka. Ako danas nema eksternih sastanaka, javi to i završi.
```

### Korak 6 — Create scheduled task

> 🖱️ **Scheduled → New task** → „Jutarnji brief" → nalepi agent-prompt → pristup kalendaru/CRM
> → **Skip** → **Frequency:** radnim danima 7:30 → **Save**.

> 📸 **SCREENSHOT [S6]:** popunjen scheduled task dijalog.

### Korak 7 — Run now i pregled

> 📸 **SCREENSHOT [S7]:** run + spojeni brifovi za dan.

### ✅ Checkpoint B — agent je spreman kad…

- [ ] Ujutro stigne brief za svaki eksterni sastanak.
- [ ] Svaki brief ima kontekst iz CRM-a i skorašnji signal.
- [ ] Sve staje u jednu preglednu poruku/stranicu.

---

## Human-in-the-loop

- **Autonomno:** čitanje kalendara, istraživanje, pisanje briefa (interno).
- **Čovek:** koristi brief; ništa se ne šalje spolja.

## Ideje za primenu (za diskusiju na radionici)

- Brief i za interne sastanke (dnevni red umesto istraživanja).
- Slanje briefa na Slack/mejl tima umesto sebi.
- „Posle sastanka" varijanta: agent iz beleški ažurira CRM (veza sa vežbom 02).

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | Povezani Calendar (+Notion) |
| S2 | Lista današnjih sastanaka |
| S3 | Istraživanje učesnika |
| S4 | CRM istorija kontakta |
| S5 | Gotov jednostrani brief |
| S6 | Scheduled task dijalog |
| S7 | Run + brifovi za dan |
