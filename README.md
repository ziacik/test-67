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
