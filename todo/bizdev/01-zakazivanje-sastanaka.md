# 01. Agent za zakazivanje sastanaka

> **Grupa:** BizDev · **Radionica:** R1 · **Status:** draft
> **Šta agent radi (1 rečenica):** Iz dolaznog mejla prepozna zahtev za sastanak, proveri slobodne termine u kalendaru, ponudi 2–3 opcije i po potvrdi napravi događaj sa pozivnicom.

## Blueprint

```
OKIDAČ:      dolazni mejl sa zahtevom za sastanak (ili jutarnji pregled inboxa)
IZVOR:       Gmail (poruka) + Google Calendar (slobodni termini)
OBRADA:      pročitaj zahtev → nađi slobodne termine → predloži 2–3 → napravi event
DESTINACIJA: Gmail draft sa predlogom termina + (po potvrdi) Google Calendar event
```

## Zašto je ovo dobra vežba

- Orkestracija dva konektora: mejl → kalendar → mejl.
- Rad sa vremenom, trajanjem i vremenskim zonama.
- Human-in-the-loop na jedinoj „spoljašnjoj" akciji (slanje / kreiranje pozivnice).

## Preduslovi i konektori

- Plaćeni plan (za scheduled task u Delu B).
- **Gmail** connector povezan.
- **Google Calendar** connector povezan.

> 📸 **SCREENSHOT [S1]:** Settings → Connectors — povezani **Gmail** i **Google Calendar** (kvačice na Status).

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

Cilj: prvo rukom prođemo ceo tok za jedan konkretan zahtev, da vidimo da svaki korak radi.

### Korak 1 — Pronađi i pročitaj zahtev za sastanak

Prvo naučimo Claude-a da nađe pravu poruku u inboxu.

> 🖱️ Klik po klik:
> 1. Otvori **New chat**.
> 2. Nalepi prompt ispod (zameni ime pošiljaoca stvarnim primerom iz svog inboxa).

**Prompt — kopiraj:**
```
Pretraži moj Gmail za poslednju poruku u kojoj neko traži da zakažemo sastanak
(termini poput „poziv", „sastanak", „call", „da se čujemo"). Prikaži: pošiljaoca,
datum poruke, i u 2 rečenice šta osoba traži (tema, željeno trajanje ako je navedeno).
```

> 📸 **SCREENSHOT [S2]:** Claude prikazuje pronađenu poruku (pošiljalac + sažetak zahteva).

### Korak 2 — Proveri slobodne termine

Sada gledamo kalendar, i dalje samo čitamo (ništa ne menjamo).

**Prompt — kopiraj:**
```
Pogledaj moj Google Calendar za sledećih 5 radnih dana i predloži 3 slobodna
termina od po 30 minuta, u radno vreme 10–17h, sa bar 15 minuta pauze pre i posle
postojećih obaveza. Izlistaj ih kao datum + vreme (npr. „uto 12.03, 11:00–11:30").
```

> 📸 **SCREENSHOT [S3]:** predložena 3 slobodna termina.

### Korak 3 — Sastavi odgovor sa predlogom termina (draft)

**Prompt — kopiraj:**
```
Napravi Gmail draft kao odgovor na tu poruku:
- primalac: pošiljalac originalne poruke
- ton: ljubazno, kratko, na „ti/Vi" kako je pisao pošiljalac
- ponudi ona 3 termina i zamoli ga da izabere jedan
- potpiši se kao „Horizont Digital"
Ostavi kao DRAFT, nemoj slati.
```

> 📸 **SCREENSHOT [S4]:** kreiran draft odgovora u Gmail-u (Drafts), vidi se da nije poslat.

### Korak 4 — Napravi događaj kad klijent izabere termin

Ovo je jedina akcija „u svet" — radimo je tek na izričitu potvrdu.

**Prompt — kopiraj:**
```
Klijent je izabrao [uto 12.03, 11:00]. Napravi događaj u Google Calendar-u:
- naslov: „Horizont Digital × [ime firme] — uvodni poziv"
- vreme: izabrani termin, 30 min
- gost: mejl klijenta
- opis: kratak dnevni red (2–3 tačke)
Pre kreiranja mi pokaži kako će izgledati i traži potvrdu.
```

> 📸 **SCREENSHOT [S5]:** Claude traži potvrdu pre kreiranja događaja, pa kreiran event u kalendaru.

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] Claude tačno nalazi zahtev za sastanak u inboxu.
- [ ] Predlaže realne slobodne termine (bez preklapanja).
- [ ] Draft odgovora izgleda kako treba i **nije** poslat.
- [ ] Događaj se kreira tek posle potvrde, sa gostom i opisom.

---

## Deo B — Automatizacija (sve spajamo u jedan scheduled task)

Pošto je zakazivanje reaktivno, automatizujemo ga kao **jutarnjeg asistenta**: svako
jutro pregleda inbox, i za svaki zahtev pripremi draft odgovor sa terminima — čovek
samo pregleda i pošalje.

### Korak 5 — Pun agent-prompt (spoj koraka 1–3)

**Agent-prompt — kopiraj ceo:**
```
Svakog radnog jutra pripremi predloge za zakazivanje. Radi samostalno, bez pitanja;
ako nešto ne uspe, preskoči i navedi u rezimeu.

1. Pretraži Gmail za NEPROČITANE poruke iz poslednja 24h u kojima neko traži sastanak
   ili poziv. Ako ih nema, javi „nema novih zahteva" i završi.
2. Za svaku takvu poruku pogledaj Google Calendar i nađi 3 slobodna termina od 30 min
   u sledećih 5 radnih dana (radno vreme 10–17h, 15 min pauze oko obaveza).
3. Napravi Gmail DRAFT odgovora sa ta 3 termina, ljubazno i kratko, potpis „Horizont
   Digital". Ostavi kao draft — NE šalji.
4. Na kraju mi daj rezime: koliko zahteva, od koga, i da su draftovi spremni u Gmail-u.
   NE kreiraj događaje automatski — to radim ja kad klijent potvrdi.
```

### Korak 6 — Create scheduled task

> 🖱️ Klik po klik: **Scheduled → New task** → **Name:** „Zakazivanje — jutarnji asistent"
> → **Description:** „Pregled inboxa i draft termina" → nalepi agent-prompt →
> **Permissions: Skip** → **Frequency:** radnim danima u 8:30 → **Save**.

> 📸 **SCREENSHOT [S6]:** popunjen „Create scheduled task" dijalog.

### Korak 7 — Run now i pregled

> 🖱️ **Run now** → prati Progress → otvori Gmail **Drafts** i proveri predložene termine.

> 📸 **SCREENSHOT [S7]:** rezime run-a + spremni draftovi u Gmail-u.

### ✅ Checkpoint B — agent je spreman kad…

- [ ] Task se pojavljuje u „Scheduled" sa tačnom kadencom.
- [ ] Prvi run nađe zahteve i napravi draft-ove sa realnim terminima.
- [ ] Nijedan mejl nije poslat i nijedan event nije kreiran automatski.
- [ ] Rezime jasno kaže šta je spremno za pregled.

---

## Human-in-the-loop

- **Autonomno:** čitanje inboxa, provera kalendara, pisanje draft-a.
- **Čovek:** slanje odgovora i kreiranje događaja (pozivnica ide klijentu — nepovratno).

## Ideje za primenu (za diskusiju na radionici)

- Različiti tipovi sastanaka (uvodni 30 min vs. demo 60 min) sa različitim pravilima.
- Vremenske zone za inostrane klijente (agent nudi termine u zoni klijenta).
- „Buffer" pravila (nikad dva poziva zaredom, ne pre 10h, blokiran petak popodne).

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | Povezani Gmail + Google Calendar konektori |
| S2 | Pronađen zahtev za sastanak u chatu |
| S3 | Predložena 3 slobodna termina |
| S4 | Draft odgovora u Gmail-u (nije poslat) |
| S5 | Potvrda + kreiran događaj u kalendaru |
| S6 | Popunjen scheduled task dijalog |
| S7 | Rezime run-a + draftovi spremni |
