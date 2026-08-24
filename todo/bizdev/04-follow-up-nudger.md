# 04. Follow-up „nudger" (buđenje zaglavljenih dealova)

> **Grupa:** BizDev · **Radionica:** R2 · **Status:** draft
> **Šta agent radi (1 rečenica):** Svake nedelje nađe dealove bez kontakta duže od X dana i napiše personalizovane follow-up mejlove kao draftove — čovek samo pošalje.

## Blueprint

```
OKIDAČ:      raspored (npr. ponedeljak 9h)
IZVOR:       CRM (dealovi: faza, poslednji kontakt, beleške)
OBRADA:      nađi „zaglavljene" (poslednji kontakt > X dana, faza ≠ Zatvoreno) → napiši follow-up
DESTINACIJA: Gmail draftovi (po jedan za svaki deal) + lista u poruci
```

## Zašto je ovo dobra vežba

- Scheduled task + čitanje baze + generisanje više izlaza odjednom.
- Personalizacija iz beleški (ne generički „samo proveravam").
- Klasičan primer gde draft (ne slanje) štiti odnos sa klijentom.

## Preduslovi i konektori

- Plaćeni plan (scheduled task).
- **Notion** (ili Sheets) CRM sa poljima `Faza`, `Poslednji kontakt`, `Sledeći korak`, `Beleške`, `Mejl`.
- **Gmail** connector.

> 📸 **SCREENSHOT [S1]:** povezani Notion + Gmail.

---

## Deo A — Ručni prototip (radimo u chatu, stavku po stavku)

### Korak 1 — Nađi zaglavljene dealove

> 🖱️ **New chat** → nalepi prompt.

**Prompt — kopiraj:**
```
Pogledaj moju Notion CRM bazu i izlistaj sve dealove kod kojih je „Poslednji kontakt"
stariji od 10 dana, a „Faza" nije „Zatvoreno". Za svaki prikaži: Firma, Kontakt,
Faza, koliko dana od poslednjeg kontakta, i Sledeći korak. Poređaj od najstarijeg.
```

> 📸 **SCREENSHOT [S2]:** lista zaglavljenih dealova.

### Korak 2 — Napiši personalizovan follow-up za jedan deal

**Prompt — kopiraj:**
```
Za prvi deal sa liste napiši kratak follow-up mejl (4–6 rečenica):
- pozovi se na konkretan detalj iz „Beleške" (ne generički „samo proveravam")
- podseti na „Sledeći korak" i predloži konkretnu sitnicu (poziv 15 min / materijal)
- ton: prijateljski, bez pritiska
Prikaži mi tekst pre nego što napravimo draft.
```

> 📸 **SCREENSHOT [S3]:** predlog teksta follow-up mejla.

### Korak 3 — Napravi draftove za sve

**Prompt — kopiraj:**
```
Za svaki deal sa liste napravi Gmail DRAFT (primalac = polje „Mejl", personalizovano
iz beleški, potpis „Horizont Digital"). Ostavi kao draft — NE šalji. Na kraju mi daj
listu: za koga je draft napravljen i koja je „kuka" u svakom.
```

> 📸 **SCREENSHOT [S4]:** draftovi u Gmail-u + lista u chatu.

### ✅ Checkpoint A — ručni deo je gotov kad…

- [ ] Lista tačno hvata dealove starije od praga (i preskače zatvorene).
- [ ] Follow-up se poziva na konkretan detalj iz beleški.
- [ ] Draftovi postoje i nijedan nije poslat.

---

## Deo B — Automatizacija (nedeljni scheduled task)

### Korak 4 — Pun agent-prompt (spoj koraka 1–3)

**Agent-prompt — kopiraj ceo:**
```
Svakog ponedeljka u 9h probudi zaglavljene dealove. Radi samostalno; ako nešto ne
uspe, preskoči i navedi u rezimeu.

1. U Notion CRM nađi dealove gde je „Poslednji kontakt" > 10 dana, a „Faza" ≠ „Zatvoreno".
2. Za svaki napiši kratak, personalizovan follow-up (pozovi se na „Beleške" i „Sledeći
   korak"; prijateljski ton, bez pritiska).
3. Napravi Gmail DRAFT za svaki (primalac = „Mejl", potpis „Horizont Digital"). NE šalji.
4. Rezime: koliko dealova, za koga su draftovi, i „kuka" svakog. Ako nema zaglavljenih,
   javi to i završi.
```

### Korak 5 — Create scheduled task

> 🖱️ **Scheduled → New task** → „Follow-up nudger" → nalepi agent-prompt → izbor baze/foldera
> → **Skip** → **Frequency:** ponedeljak 9h → **Save**.

> 📸 **SCREENSHOT [S5]:** popunjen scheduled task dijalog.

### Korak 6 — Run now i pregled

> 📸 **SCREENSHOT [S6]:** run + draftovi spremni.

### ✅ Checkpoint B — agent je spreman kad…

- [ ] Task radi ponedeljkom i hvata prave dealove.
- [ ] Draftovi su personalizovani i nijedan nije poslat.
- [ ] Rezime je pregledan (ko, kuka).

---

## Human-in-the-loop

- **Autonomno:** čitanje CRM-a, pisanje draftova.
- **Čovek:** čita i šalje (ili ne šalje) svaki follow-up.

## Ideje za primenu (za diskusiju na radionici)

- Različiti pragovi po fazi (Ponuda 5 dana, Kvalifikovan 14 dana).
- Eskalacija tona posle 2. i 3. neodgovorenog follow-up-a.
- Nakon slanja — agent ažurira „Poslednji kontakt" (veza sa vežbom 02).

## Slike koje treba napraviti

| Oznaka | Šta prikazuje |
|---|---|
| S1 | Povezani Notion + Gmail |
| S2 | Lista zaglavljenih dealova |
| S3 | Predlog follow-up teksta |
| S4 | Draftovi u Gmail-u + lista |
| S5 | Scheduled task dijalog |
| S6 | Run + spremni draftovi |
