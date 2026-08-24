# 02. CRM update agent (posle sastanka)

> **Grupa:** BizDev · **Radionica:** R1 · **Status:** draft
> **Šta agent radi (1 rečenica):** Iz beleški ili mejl-threada sa sastanka izvuče kontakt, temu, fazu deala i sledeći korak, pa upiše ili ažurira red u CRM-u.

## Blueprint

```
OKIDAČ:      završen sastanak (nalepimo beleške ili uputimo na mejl thread)
IZVOR:       beleške sa sastanka / email thread
OBRADA:      izvuci kontakt, firmu, fazu, sledeći korak → nađi postojeći red → upiši/ažuriraj
DESTINACIJA: red u CRM-u (Notion baza ili Google Sheet)
```

## Zašto je ovo dobra vežba

- Pretvaranje nestruktuiranog teksta u struktuiran zapis (polja baze).
- Rad sa bazom: pretraga postojećeg zapisa pre nego što se pravi novi (bez duplikata).
- Osnova svake CRM automatizacije.

## Preduslovi i konektori

- **Notion** connector (preporučeno, baza kao CRM) — ili **Google Sheets** varijanta.
- Pripremljena CRM baza sa poljima: `Kontakt`, `Firma`, `Faza` (Novo / Kvalifikovan / Ponuda / Zatvoreno), `Poslednji kontakt` (datum), `Sledeći korak`, `Beleške`.

> 📸 **SCREENSHOT [S1]:** povezan Notion connector.
> 📸 **SCREENSHOT [S2]:** prazna CRM baza u Notion-u sa kolonama (šablon).

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

### Korak 1 — Izvuci strukturu iz beleški

Prvo samo pretvaramo tekst u polja — ništa još ne upisujemo u bazu.

> 🖱️ Klik po klik:
> 1. **New chat**.
> 2. Nalepi svoje beleške sa sastanka (ili prilepi/uputi na mejl thread).
> 3. Nalepi prompt ispod.

**Prompt — kopiraj:**
```
Iz ovih beleški sa sastanka izvuci i vrati kao tabelu:
- Kontakt (ime i prezime)
- Firma
- Faza deala (Novo / Kvalifikovan / Ponuda / Zatvoreno) — proceni iz konteksta
- Sledeći korak (konkretna akcija + rok ako je pomenut)
- Kratke beleške (3–4 tačke najbitnijeg)

Beleške:
[ovde nalepi beleške sa sastanka]
```

> 📸 **SCREENSHOT [S3]:** izvučena struktura (tabela sa poljima).

### Korak 2 — Proveri da li kontakt već postoji u CRM-u

**Prompt — kopiraj:**
```
Pogledaj moju Notion CRM bazu i proveri da li već postoji red za ovog kontakta ili
firmu. Ako postoji, pokaži mi trenutne vrednosti tog reda. Ako ne postoji, reci da je
nov kontakt.
```

> 📸 **SCREENSHOT [S4]:** rezultat pretrage (postoji / nov kontakt).

### Korak 3 — Upiši ili ažuriraj red

**Prompt — kopiraj:**
```
Ažuriraj CRM:
- Ako kontakt postoji: ažuriraj „Faza", „Poslednji kontakt" (današnji datum),
  „Sledeći korak" i dopiši nove beleške (ne briši stare).
- Ako je nov: napravi novi red sa svim poljima.
Pre upisa mi pokaži šta ćeš tačno da izmeniš i traži potvrdu.
```

> 📸 **SCREENSHOT [S5]:** Claude pokazuje izmene + potvrda, pa ažuriran red u Notion bazi.

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] Struktura iz beleški je tačna (faza i sledeći korak imaju smisla).
- [ ] Pretraga nalazi postojeći kontakt (nema duplikata).
- [ ] Red u bazi je upisan/ažuriran, stare beleške sačuvane.

---

## Deo B — Automatizacija (jedan prompt + opcioni scheduled task)

Ovaj agent je prirodno „na zahtev" (posle svakog sastanka). Prvo ga spajamo u **jedan
prompt** koji uradi ceo posao iz beleški; zatim opciono pravimo scheduled task koji
svako veče pokupi beleške iz foldera.

### Korak 4 — Pun prompt (spoj koraka 1–3)

**Prompt — kopiraj ceo:**
```
Zavedi ovaj sastanak u CRM. Radi ovako:
1. Iz teksta ispod izvuci: Kontakt, Firma, Faza, Sledeći korak, Beleške.
2. Pretraži Notion CRM bazu za tog kontakta/firmu.
3. Ako postoji — ažuriraj Faza, Poslednji kontakt (danas), Sledeći korak i DOPIŠI
   beleške. Ako ne postoji — napravi nov red.
4. Javi mi u jednoj rečenici šta si uradio (nov/ažuriran red + sledeći korak).

Beleške sa sastanka:
[nalepi ovde]
```

### Korak 5 — (Opciono) Scheduled task iz foldera beleški

Ako tim beleške sa sastanaka snima u folder (npr. Drive `/Sastanci`), možemo automatski:

**Agent-prompt — kopiraj ceo:**
```
Svako veče u 19h obradi nove beleške sa sastanaka iz foldera /Sastanci (fajlovi od
danas koje još nisi obradio). Za svaku: izvuci Kontakt, Firma, Faza, Sledeći korak,
Beleške; pretraži Notion CRM; ažuriraj postojeći ili napravi nov red. Ne pravi
duplikate. Na kraju mi daj listu: koje kontakte si dodao/ažurirao i koji su sledeći
koraci. Ako folder nema novih fajlova, javi to i završi.
```

> 🖱️ **Scheduled → New task** → nalepi agent-prompt → izaberi folder `/Sastanci` → **Skip** → **Frequency:** radnim danima 19h → **Save**.

> 📸 **SCREENSHOT [S6]:** popunjen scheduled task dijalog (sa izabranim folderom).
> 📸 **SCREENSHOT [S7]:** run + lista ažuriranih kontakata.

### ✅ Checkpoint B — agent je spreman kad…

- [ ] Jedan prompt iz beleški korektno zavede sastanak (nov ili ažuriran red).
- [ ] (Opciono) Scheduled task obrađuje folder bez duplikata.
- [ ] Rezime jasno kaže šta je promenjeno i koji su sledeći koraci.

---

## Human-in-the-loop

- **Autonomno:** čitanje beleški, ekstrakcija, upis u internu bazu (reverzibilno).
- **Čovek:** provera pre nego što se sledeći korak pretvori u akciju (mejl/poziv).

## Ideje za primenu (za diskusiju na radionici)

- Umesto Notion-a — Google Sheet CRM (isti koraci, drugi connector).
- Automatski „Sledeći korak" da kreira zadatak/podsetnik (veza sa vežbom 04).
- Bodovanje faze po ključnim rečima iz razgovora („budžet", „ugovor", „odlažemo").

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | Povezan Notion connector |
| S2 | Prazna CRM baza sa kolonama |
| S3 | Izvučena struktura iz beleški |
| S4 | Pretraga postojećeg kontakta |
| S5 | Potvrda + ažuriran red u bazi |
| S6 | Scheduled task dijalog sa folderom |
| S7 | Run + lista ažuriranih kontakata |
