# Test 67

Krátke interaktívne testy pre 5. ročník ZŠ. Prvá verzia obsahuje matematiku podľa slovenského vzdelávacieho štandardu.

## Čo funguje

- 10-otázkové kolá
- mix alebo samostatné témy
- veľké prirodzené čísla, porovnávanie, párne/nepárne, zaokrúhľovanie
- sčítanie, odčítanie, násobenie, delenie, poradie operácií a slovné úlohy
- geometria: obvod, obsah v štvorcovej sieti, jednotky dĺžky
- okamžitá spätná väzba a nápovedy
- streak a dlhodobé štatistiky v `localStorage`
- generované príklady + automatické testy generátora


## Fyzika – 6. ročník

Fyzika je samostatný predmet: 19 tém a mix, v ktorom dve nasledujúce kolá pokryjú všetky témy.
Otázky pokrývajú vlastnosti kvapalín, plynov a tuhých látok, meranie dĺžky, hmotnosti
a objemu, prevody jednotiek, plávanie telies, hustotu a vplyv teploty.

- Podklad: Viera Lapitková a kol., *Fyzika pre 6. ročník ZŠ* (Expol Pedagogika,
  ISBN 978-80-8091-540-7), https://www.expolpedagogika.sk/zakladna-skola-a-osemrocne-gymnazium/fyzika-pre-6-rocnik-zakladnej-skoly-a-1-rocnik-gymnazia-s-osemrocnym-studiom
- Podrobnejší rozpis tém: https://www.smartbooks.sk/fyzika-temy-6-rocnik-zs/
- Autorsky vytvorené otázky podľa týchto tematických okruhov, nie doslovný prepis učebnice
- Vyše 600 otázok a príkladov vrátane generovaných prevodov a výpočtov
- V rámci každého 10-otázkového kola sa rovnaká otázka neopakuje

## Spustenie

```bash
npm install
npm run dev
```

Testy:

```bash
npm test
```

Production build:

```bash
npm run build
```

## Ďalšie rozumné kroky

- delenie so zvyškom
- rímske čísla a číselná os
- osová/stredová súmernosť a vizuálne geometrické úlohy
- tabuľky, grafy a kombinatorika
- adaptívna obtiažnosť podľa chýb
- rodičovský prehľad slabších tém
- ďalšie predmety cez spoločný `Question` model
