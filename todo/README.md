# TODO — nove vežbe za kurs

Radni folder u kome razvijamo nove vežbe pre nego što ih pretvorimo u zvanične
vežbe na sajtu (`src/content/exercises/...`). Svaki `.md` je kompletan scenario
radionice: svi koraci rada + tačne oznake gde treba napraviti screenshot.

## Grupe i radionice

Dve grupe: **BizDev** i **Finansije**. Po grupi ide **6 projekata** = **2 radionice × 3 projekta**.

| Grupa | Radionica | Projekti |
|---|---|---|
| BizDev (hibridno) | R1 | 01 Zakazivanje sastanaka · 02 CRM update · 03 Kvalifikacija leada |
| BizDev (hibridno) | R2 | 04 Follow-up nudger · 05 Meeting prep brief · 06 Analiza konkurencije (rezerva/dodatna) |
| Finansije (uživo) | R1 | 06 EU fondovi ⭐ · 07 Fakture i troškovi · 08 Finansijski digest |
| Finansije (uživo) | R2 | 09 Budžet vs. stvarno · 10 Naplata potraživanja · (+1 rezerva: Asistent za EU prijavu) |

> Rezerve su označene jer trenutno imamo 10 razrađenih; za pun raspored (6+6) dodajemo
> po jednu po grupi kad se dogovori pravac. RaisingStars (4 dodatne radionice) — poseban dogovor.

## Način rada (za svaku radionicu)

1. **Predavanje** + uživo izrada projekta iz materijala.
2. **Individualni prolazak** sa svim učesnicima.
3. **Diskusija**: kako bi svako primenio agenta na svoj slučaj (sekcija „Ideje za primenu" u svakom fajlu).
4. **Konsultacije**: 30-min call svaki dan te nedelje za pomoć oko sopstvenog agenta.

## Pedagoški princip (isti u svakom fajlu)

**Od najprostijeg ka najtežem — prvo ručno, pa automatizuj:**

1. **Preduslovi i konektori** — ako nešto treba povezati (Gmail, Calendar, Sheets, Notion…), radimo to prvo. 📸 screenshot povezivanja.
2. **Deo A — ručni prototip u chatu**: pitamo Claude-a **stavku po stavku**, svaki korak zaseban prompt. 📸 screenshot rezultata svakog koraka.
3. **Deo B — automatizacija**: tek kad svaki korak ručno radi, **spajamo sve u jedan agent-prompt** i stavljamo u **scheduled task**. 📸 screenshot dijaloga + prvog run-a.

## Pretpostavljeni stack (zameni po potrebi)

- **Mejl:** Gmail connector (ako je tim na Outlook/M365 → zameni odgovarajućim connectorom).
- **Kalendar:** Google Calendar.
- **Baza/CRM/tabela:** Notion (baza) ili Google Sheets — u fajlovima nudimo obe varijante gde je bitno.
- **Fajlovi:** Google Drive.
- **Ostalo:** web research, Claude Design (vizuelni izveštaji), scheduled tasks.
- **Plan:** scheduled tasks traže plaćeni plan (Pro/Max/Team/Enterprise).
- **Firma-primer:** koristimo izmišljenu **„Horizont Digital"** (i njen finansijski tim) radi doslednosti — zameni svojom.

## Konvencija za screenshot-ove

U tekstu, na mestu gde treba slika, stoji:

> 📸 **SCREENSHOT [Sx]:** šta tačno treba da se vidi na slici.

Na dnu svakog fajla je tabela **„Slike koje treba napraviti"** sa svim `Sx` oznakama — to je lista za snimanje ekrana kad pravimo materijal.

## Status

Svaki fajl ima zaglavlje sa `Status:` — `draft` (skica spremna za pregled) →
`za-snimanje` (tekst ok, treba slike) → `spremno` (prebacujemo u `src/content/exercises`).
