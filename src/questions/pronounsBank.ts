// Otázky podľa prezentácie „Osobné základné a privlastňovacie zámená“ (6. ročník).
// Skupiny pokrývajú všetkých 15 snímok, každá tvorí jednu otázku v 10-otázkovom kole.
export type PronounSpec = { prompt: string; answer: string; choices: string[]; explanation: string; hint?: string };

export const pronounGroups = {
  "zaklady": [
    {
      "prompt": "Aký slovný druh sú zámená?",
      "answer": "ohybný a plnovýznamový",
      "choices": [
        "ohybný a plnovýznamový",
        "neohybný a plnovýznamový",
        "ohybný a neplnovýznamový",
        "neohybný a neplnovýznamový"
      ],
      "explanation": "Prezentácia zaraďuje zámená medzi ohybné a plnovýznamové slovné druhy."
    },
    {
      "prompt": "Čo zámená vo vete robia?",
      "answer": "zastupujú iné slovné druhy alebo na ne odkazujú",
      "choices": [
        "zastupujú iné slovné druhy alebo na ne odkazujú",
        "vždy označujú iba vlastnosti",
        "vždy označujú iba množstvo",
        "iba spájajú vety"
      ],
      "explanation": "Zámená zastupujú podstatné a prídavné mená, číslovky či príslovky alebo na ne odkazujú."
    },
    {
      "prompt": "Na ktoré slovné druhy môžu zámená odkazovať?",
      "answer": "podstatné mená, prídavné mená, číslovky a príslovky",
      "choices": [
        "podstatné mená, prídavné mená, číslovky a príslovky",
        "iba slovesá a spojky",
        "iba podstatné mená",
        "iba častice a citoslovcia"
      ],
      "explanation": "Zámená môžu zastupovať alebo odkazovať na tieto štyri slovné druhy."
    },
    {
      "prompt": "Ktorá možnosť obsahuje gramatické kategórie zámen?",
      "answer": "osoba, rod, číslo a pád",
      "choices": [
        "osoba, rod, číslo a pád",
        "rod, vzor, stupeň a vid",
        "čas, spôsob, vid a osoba",
        "druh, čas, spôsob a rod"
      ],
      "explanation": "Pri zámenách podľa prezentácie určujeme osobu, rod, číslo a pri sklonných aj pád."
    },
    {
      "prompt": "Pri ktorých zámenách určujeme pád?",
      "answer": "pri sklonných",
      "choices": [
        "pri sklonných",
        "pri všetkých bez výnimky",
        "iba pri privlastňovacích nesklonných",
        "iba pri bezrodových"
      ],
      "explanation": "Pád má význam pri sklonných zámenách."
    },
    {
      "prompt": "Aké sú dve skupiny osobných zámen z prezentácie?",
      "answer": "základné a privlastňovacie",
      "choices": [
        "základné a privlastňovacie",
        "akostné a vzťahové",
        "určité a neurčité",
        "zvratné a násobné"
      ],
      "explanation": "Učivo rozlišuje osobné základné a osobné privlastňovacie zámená."
    },
    {
      "prompt": "Čím sa vyznačujú osobné základné zámená?",
      "answer": "majú samostatné skloňovanie",
      "choices": [
        "majú samostatné skloňovanie",
        "všetky sú nesklonné",
        "skloňujú sa podľa vzoru pekný",
        "vždy privlastňujú predmet"
      ],
      "explanation": "Osobné základné zámená majú vlastné tvary v jednotlivých pádoch."
    },
    {
      "prompt": "Čo vyjadrujú osobné privlastňovacie zámená?",
      "answer": "komu osoba alebo vec patrí",
      "choices": [
        "komu osoba alebo vec patrí",
        "iba kedy sa dej odohral",
        "iba počet osôb",
        "iba miesto deja"
      ],
      "explanation": "Privlastňovacie zámená vyjadrujú vlastnícky alebo príslušnostný vzťah."
    },
    {
      "prompt": "Ktorá otázka pomáha rozpoznať osobné privlastňovacie zámeno?",
      "answer": "čí? čia? čie?",
      "choices": [
        "čí? čia? čie?",
        "kde? kam?",
        "kedy? odkedy?",
        "prečo? načo?"
      ],
      "explanation": "Pri privlastňovacích zámenách sa pýtame čí, čia, čie."
    },
    {
      "prompt": "Ako sa pýtame na osobné základné zámená?",
      "answer": "pádovými otázkami",
      "choices": [
        "pádovými otázkami",
        "výhradne otázkou čí?",
        "výhradne otázkou koľko?",
        "výhradne otázkou aký? sati? "
      ],
      "explanation": "Na osobné základné zámená sa pýtame otázkami príslušného pádu (kto, koho, komu...)."
    },
    {
      "prompt": "Ktoré osobné zámená sú bezrodové?",
      "answer": "ja, ty, my, vy",
      "choices": [
        "ja, ty, my, vy",
        "on, ona, ono",
        "oni, ony, ona",
        "môj, tvoj, náš"
      ],
      "explanation": "Bezrodové osobné základné zámená sú ja, ty, my, vy."
    },
    {
      "prompt": "Ktoré osobné základné zámená sú rodové?",
      "answer": "on, ona, ono, oni, ony",
      "choices": [
        "on, ona, ono, oni, ony",
        "ja, ty, my, vy",
        "ja, ona, my, vy",
        "môj, tvoj, svoj"
      ],
      "explanation": "Rodové osobné základné zámená sú on, ona, ono, oni a ony."
    },
    {
      "prompt": "Ktorá možnosť obsahuje iba osobné privlastňovacie zámená?",
      "answer": "môj, tvoj, jeho, jej, náš, váš, ich",
      "choices": [
        "môj, tvoj, jeho, jej, náš, váš, ich",
        "ja, ty, on, ona, my",
        "kto, čo, aký, ktorý",
        "tu, tam, vtedy, tak"
      ],
      "explanation": "Osobné privlastňovacie zámená pomenúva prezentácia ako môj, tvoj, jeho, jej, náš, váš, ich."
    },
    {
      "prompt": "Ktorá možnosť obsahuje iba osobné základné zámená?",
      "answer": "ja, ty, on, ona, ono, my, vy, oni, ony",
      "choices": [
        "ja, ty, on, ona, ono, my, vy, oni, ony",
        "môj, tvoj, náš, váš",
        "kto, čo, ktorý, aký",
        "môj, ja, tvoj, ty"
      ],
      "explanation": "Základné osobné zámená odkazujú priamo na osoby alebo ich zastupujú."
    },
    {
      "prompt": "Čím sa líšia rodové a bezrodové zámená?",
      "answer": "rodové rozlišujú gramatický rod",
      "choices": [
        "rodové rozlišujú gramatický rod",
        "bezrodové sa nikdy neskloňujú",
        "rodové sa používajú len v množnom čísle",
        "bezrodové vždy označujú veci"
      ],
      "explanation": "Zámená on, ona, ono, oni a ony rozlišujú rod, ja, ty, my, vy nie."
    }
  ],
  "triedenie": [
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Ja som prišiel včas.“ (zámeno Ja).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Ty si to vedela.“ (zámeno Ty).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „On už odišiel.“ (zámeno On).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Ona sa usmieva.“ (zámeno Ona).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Ono sa stratilo.“ (zámeno Ono).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „My sa vraciame.“ (zámeno My).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Vy ste pripravení.“ (zámeno Vy).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Oni sú v škole.“ (zámeno Oni).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Ony ešte čakajú.“ (zámeno Ony).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Videla som ho.“ (zámeno ho).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Zavolám jej.“ (zámeno jej).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Zavolaj mi.“ (zámeno mi).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Bez neho nepôjdeme.“ (zámeno neho).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „S nami to zvládneš.“ (zámeno nami).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh zvýrazneného zámena vo vete: „Počujem ich.“ (zámeno ich).",
      "answer": "osobné základné",
      "choices": [
        "osobné základné",
        "osobné privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Zámeno tu zastupuje osobu; pýtame sa pádovou otázkou."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Môj zošit zostal doma.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Môj zošit zostal doma.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Tvoj pes je veselý.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Tvoj pes je veselý.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Jeho bicykel je nový.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Jeho bicykel je nový.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Jej mikina je modrá.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Jej mikina je modrá.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Naša škola vyhrala.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Naša škola vyhrala.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Váš dom je pekný.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Váš dom je pekný.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Ich tašky ležia pri dverách.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Ich tašky ležia pri dverách.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Na mojom stole leží mapa.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Na mojom stole leží mapa.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Pre tvoju sestru mám dar.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Pre tvoju sestru mám dar.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Za vaším domom je záhrada.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Za vaším domom je záhrada.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Vidím jej knihu.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Vidím jej knihu.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Poznáme ich rodičov.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Poznáme ich rodičov.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Hľadám svoju bundu.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Hľadám svoju bundu.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „Naše deti spievajú.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „Naše deti spievajú.“ zámeno vyjadruje, čí je predmet alebo osoba."
    },
    {
      "prompt": "Urči druh privlastňovacieho zámena vo vete: „S mojím kamarátom sa učím.“",
      "answer": "osobné privlastňovacie",
      "choices": [
        "osobné privlastňovacie",
        "osobné základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Vo vete „S mojím kamarátom sa učím.“ zámeno vyjadruje, čí je predmet alebo osoba."
    }
  ],
  "sklonovanie": [
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ja“ v nominatívee? (nominatív)",
      "answer": "ja",
      "choices": [
        "ja",
        "mňa",
        "mne",
        "mnou"
      ],
      "explanation": "Zámeno „ja“ má v páde nominatív tvar „ja“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ja“ v genitívee? (genitív)",
      "answer": "mňa",
      "choices": [
        "mňa",
        "mne",
        "mnou",
        "ja"
      ],
      "explanation": "Zámeno „ja“ má v páde genitív tvar „mňa“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ja“ v datívee? (datív)",
      "answer": "mne",
      "choices": [
        "mne",
        "mnou",
        "ja",
        "mňa"
      ],
      "explanation": "Zámeno „ja“ má v páde datív tvar „mne“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ja“ v akuzatívee? (akuzatív)",
      "answer": "mňa",
      "choices": [
        "mňa",
        "ja",
        "mne",
        "mnou"
      ],
      "explanation": "Zámeno „ja“ má v páde akuzatív tvar „mňa“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ja“ v lokále? (lokál)",
      "answer": "mne",
      "choices": [
        "mne",
        "ja",
        "mňa",
        "mnou"
      ],
      "explanation": "Zámeno „ja“ má v páde lokál tvar „mne“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ja“ v inštrumentále? (inštrumentál)",
      "answer": "mnou",
      "choices": [
        "mnou",
        "mňa",
        "mne",
        "ja"
      ],
      "explanation": "Zámeno „ja“ má v páde inštrumentál tvar „mnou“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ty“ v nominatívee? (nominatív)",
      "answer": "ty",
      "choices": [
        "ty",
        "tebe",
        "tebou",
        "teba"
      ],
      "explanation": "Zámeno „ty“ má v páde nominatív tvar „ty“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ty“ v genitívee? (genitív)",
      "answer": "teba",
      "choices": [
        "teba",
        "tebou",
        "ty",
        "tebe"
      ],
      "explanation": "Zámeno „ty“ má v páde genitív tvar „teba“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ty“ v datívee? (datív)",
      "answer": "tebe",
      "choices": [
        "tebe",
        "ty",
        "teba",
        "tebou"
      ],
      "explanation": "Zámeno „ty“ má v páde datív tvar „tebe“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ty“ v akuzatívee? (akuzatív)",
      "answer": "teba",
      "choices": [
        "teba",
        "ty",
        "tebe",
        "tebou"
      ],
      "explanation": "Zámeno „ty“ má v páde akuzatív tvar „teba“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ty“ v lokále? (lokál)",
      "answer": "tebe",
      "choices": [
        "tebe",
        "teba",
        "tebou",
        "ty"
      ],
      "explanation": "Zámeno „ty“ má v páde lokál tvar „tebe“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ty“ v inštrumentále? (inštrumentál)",
      "answer": "tebou",
      "choices": [
        "tebou",
        "tebe",
        "ty",
        "teba"
      ],
      "explanation": "Zámeno „ty“ má v páde inštrumentál tvar „tebou“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „on“ v nominatívee? (nominatív)",
      "answer": "on",
      "choices": [
        "on",
        "ňom",
        "ním",
        "jeho"
      ],
      "explanation": "Zámeno „on“ má v páde nominatív tvar „on“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „on“ v genitívee? (genitív)",
      "answer": "jeho",
      "choices": [
        "jeho",
        "ním",
        "on",
        "jemu"
      ],
      "explanation": "Zámeno „on“ má v páde genitív tvar „jeho“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „on“ v datívee? (datív)",
      "answer": "jemu",
      "choices": [
        "jemu",
        "on",
        "jeho",
        "ňom"
      ],
      "explanation": "Zámeno „on“ má v páde datív tvar „jemu“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „on“ v akuzatívee? (akuzatív)",
      "answer": "jeho",
      "choices": [
        "jeho",
        "on",
        "jemu",
        "ňom"
      ],
      "explanation": "Zámeno „on“ má v páde akuzatív tvar „jeho“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „on“ v lokále? (lokál)",
      "answer": "ňom",
      "choices": [
        "ňom",
        "jeho",
        "jemu",
        "ním"
      ],
      "explanation": "Zámeno „on“ má v páde lokál tvar „ňom“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „on“ v inštrumentále? (inštrumentál)",
      "answer": "ním",
      "choices": [
        "ním",
        "jemu",
        "ňom",
        "on"
      ],
      "explanation": "Zámeno „on“ má v páde inštrumentál tvar „ním“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ona“ v nominatívee? (nominatív)",
      "answer": "ona",
      "choices": [
        "ona",
        "ňou",
        "jej",
        "ju"
      ],
      "explanation": "Zámeno „ona“ má v páde nominatív tvar „ona“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ona“ v genitívee? (genitív)",
      "answer": "jej",
      "choices": [
        "jej",
        "ona",
        "ju",
        "nej"
      ],
      "explanation": "Zámeno „ona“ má v páde genitív tvar „jej“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ona“ v datívee? (datív)",
      "answer": "jej",
      "choices": [
        "jej",
        "ona",
        "ju",
        "nej"
      ],
      "explanation": "Zámeno „ona“ má v páde datív tvar „jej“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ona“ v akuzatívee? (akuzatív)",
      "answer": "ju",
      "choices": [
        "ju",
        "jej",
        "nej",
        "ňou"
      ],
      "explanation": "Zámeno „ona“ má v páde akuzatív tvar „ju“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ona“ v lokále? (lokál)",
      "answer": "nej",
      "choices": [
        "nej",
        "ju",
        "ňou",
        "ona"
      ],
      "explanation": "Zámeno „ona“ má v páde lokál tvar „nej“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ona“ v inštrumentále? (inštrumentál)",
      "answer": "ňou",
      "choices": [
        "ňou",
        "nej",
        "ona",
        "jej"
      ],
      "explanation": "Zámeno „ona“ má v páde inštrumentál tvar „ňou“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „my“ v nominatívee? (nominatív)",
      "answer": "my",
      "choices": [
        "my",
        "nás",
        "nám",
        "nami"
      ],
      "explanation": "Zámeno „my“ má v páde nominatív tvar „my“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „my“ v genitívee? (genitív)",
      "answer": "nás",
      "choices": [
        "nás",
        "nám",
        "nami",
        "my"
      ],
      "explanation": "Zámeno „my“ má v páde genitív tvar „nás“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „my“ v datívee? (datív)",
      "answer": "nám",
      "choices": [
        "nám",
        "nami",
        "my",
        "nás"
      ],
      "explanation": "Zámeno „my“ má v páde datív tvar „nám“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „my“ v akuzatívee? (akuzatív)",
      "answer": "nás",
      "choices": [
        "nás",
        "my",
        "nám",
        "nami"
      ],
      "explanation": "Zámeno „my“ má v páde akuzatív tvar „nás“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „my“ v lokále? (lokál)",
      "answer": "nás",
      "choices": [
        "nás",
        "my",
        "nám",
        "nami"
      ],
      "explanation": "Zámeno „my“ má v páde lokál tvar „nás“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „my“ v inštrumentále? (inštrumentál)",
      "answer": "nami",
      "choices": [
        "nami",
        "nás",
        "nám",
        "my"
      ],
      "explanation": "Zámeno „my“ má v páde inštrumentál tvar „nami“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „vy“ v nominatívee? (nominatív)",
      "answer": "vy",
      "choices": [
        "vy",
        "vám",
        "vami",
        "vás"
      ],
      "explanation": "Zámeno „vy“ má v páde nominatív tvar „vy“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „vy“ v genitívee? (genitív)",
      "answer": "vás",
      "choices": [
        "vás",
        "vami",
        "vy",
        "vám"
      ],
      "explanation": "Zámeno „vy“ má v páde genitív tvar „vás“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „vy“ v datívee? (datív)",
      "answer": "vám",
      "choices": [
        "vám",
        "vy",
        "vás",
        "vami"
      ],
      "explanation": "Zámeno „vy“ má v páde datív tvar „vám“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „vy“ v akuzatívee? (akuzatív)",
      "answer": "vás",
      "choices": [
        "vás",
        "vy",
        "vám",
        "vami"
      ],
      "explanation": "Zámeno „vy“ má v páde akuzatív tvar „vás“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „vy“ v lokále? (lokál)",
      "answer": "vás",
      "choices": [
        "vás",
        "vám",
        "vami",
        "vy"
      ],
      "explanation": "Zámeno „vy“ má v páde lokál tvar „vás“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „vy“ v inštrumentále? (inštrumentál)",
      "answer": "vami",
      "choices": [
        "vami",
        "vám",
        "vy",
        "vás"
      ],
      "explanation": "Zámeno „vy“ má v páde inštrumentál tvar „vami“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „oni“ v nominatívee? (nominatív)",
      "answer": "oni",
      "choices": [
        "oni",
        "im",
        "nich",
        "nimi"
      ],
      "explanation": "Zámeno „oni“ má v páde nominatív tvar „oni“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „oni“ v genitívee? (genitív)",
      "answer": "ich",
      "choices": [
        "ich",
        "nich",
        "nimi",
        "oni"
      ],
      "explanation": "Zámeno „oni“ má v páde genitív tvar „ich“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „oni“ v datívee? (datív)",
      "answer": "im",
      "choices": [
        "im",
        "nimi",
        "oni",
        "ich"
      ],
      "explanation": "Zámeno „oni“ má v páde datív tvar „im“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „oni“ v akuzatívee? (akuzatív)",
      "answer": "ich",
      "choices": [
        "ich",
        "oni",
        "im",
        "nich"
      ],
      "explanation": "Zámeno „oni“ má v páde akuzatív tvar „ich“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „oni“ v lokále? (lokál)",
      "answer": "nich",
      "choices": [
        "nich",
        "oni",
        "ich",
        "im"
      ],
      "explanation": "Zámeno „oni“ má v páde lokál tvar „nich“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „oni“ v inštrumentále? (inštrumentál)",
      "answer": "nimi",
      "choices": [
        "nimi",
        "ich",
        "im",
        "nich"
      ],
      "explanation": "Zámeno „oni“ má v páde inštrumentál tvar „nimi“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ony“ v nominatívee? (nominatív)",
      "answer": "ony",
      "choices": [
        "ony",
        "nich",
        "nimi",
        "ich"
      ],
      "explanation": "Zámeno „ony“ má v páde nominatív tvar „ony“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ony“ v genitívee? (genitív)",
      "answer": "ich",
      "choices": [
        "ich",
        "nimi",
        "ony",
        "im"
      ],
      "explanation": "Zámeno „ony“ má v páde genitív tvar „ich“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ony“ v datívee? (datív)",
      "answer": "im",
      "choices": [
        "im",
        "ony",
        "ich",
        "nich"
      ],
      "explanation": "Zámeno „ony“ má v páde datív tvar „im“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ony“ v akuzatívee? (akuzatív)",
      "answer": "ich",
      "choices": [
        "ich",
        "ony",
        "im",
        "nich"
      ],
      "explanation": "Zámeno „ony“ má v páde akuzatív tvar „ich“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ony“ v lokále? (lokál)",
      "answer": "nich",
      "choices": [
        "nich",
        "ich",
        "im",
        "nimi"
      ],
      "explanation": "Zámeno „ony“ má v páde lokál tvar „nich“."
    },
    {
      "prompt": "Ktorý uvedený tvar môže mať zámeno „ony“ v inštrumentále? (inštrumentál)",
      "answer": "nimi",
      "choices": [
        "nimi",
        "im",
        "nich",
        "ony"
      ],
      "explanation": "Zámeno „ony“ má v páde inštrumentál tvar „nimi“."
    }
  ],
  "dlhe_kratke": [
    {
      "prompt": "Ktorý je kratší tvar zámena „ja“ v páde genitív?",
      "answer": "ma",
      "choices": [
        "ma",
        "vami",
        "nami",
        "tebou"
      ],
      "explanation": "Krátky tvar zámena „ja“ je „ma“."
    },
    {
      "prompt": "Ktorý dlhší tvar zámena „ja“ možno použiť v páde genitív?",
      "answer": "mňa",
      "choices": [
        "mňa",
        "teba",
        "jeho",
        "jemu"
      ],
      "explanation": "Dlhý tvar v páde genitív je „mňa“."
    },
    {
      "prompt": "Ktorý je kratší tvar zámena „ja“ v páde datív?",
      "answer": "mi",
      "choices": [
        "mi",
        "vami",
        "nami",
        "tebou"
      ],
      "explanation": "Krátky tvar zámena „ja“ je „mi“."
    },
    {
      "prompt": "Ktorý dlhší tvar zámena „ja“ možno použiť v páde datív?",
      "answer": "mne",
      "choices": [
        "mne",
        "jeho",
        "jemu",
        "ňu"
      ],
      "explanation": "Dlhý tvar v páde datív je „mne“."
    },
    {
      "prompt": "Ktorý je kratší tvar zámena „ja“ v páde akuzatív?",
      "answer": "ma",
      "choices": [
        "ma",
        "vami",
        "nami",
        "tebou"
      ],
      "explanation": "Krátky tvar zámena „ja“ je „ma“."
    },
    {
      "prompt": "Ktorý dlhší tvar zámena „ja“ možno použiť v páde akuzatív?",
      "answer": "mňa",
      "choices": [
        "mňa",
        "teba",
        "jeho",
        "jemu"
      ],
      "explanation": "Dlhý tvar v páde akuzatív je „mňa“."
    },
    {
      "prompt": "Ktorý je kratší tvar zámena „ty“ v páde genitív?",
      "answer": "ťa",
      "choices": [
        "ťa",
        "vami",
        "nami",
        "tebou"
      ],
      "explanation": "Krátky tvar zámena „ty“ je „ťa“."
    },
    {
      "prompt": "Ktorý dlhší tvar zámena „ty“ možno použiť v páde genitív?",
      "answer": "teba",
      "choices": [
        "teba",
        "jeho",
        "jemu",
        "ňu"
      ],
      "explanation": "Dlhý tvar v páde genitív je „teba“."
    },
    {
      "prompt": "Ktorý je kratší tvar zámena „ty“ v páde datív?",
      "answer": "ti",
      "choices": [
        "ti",
        "vami",
        "nami",
        "tebou"
      ],
      "explanation": "Krátky tvar zámena „ty“ je „ti“."
    },
    {
      "prompt": "Ktorý dlhší tvar zámena „ty“ možno použiť v páde datív?",
      "answer": "tebe",
      "choices": [
        "tebe",
        "teba",
        "jeho",
        "jemu"
      ],
      "explanation": "Dlhý tvar v páde datív je „tebe“."
    },
    {
      "prompt": "Ktorý je kratší tvar zámena „ty“ v páde akuzatív?",
      "answer": "ťa",
      "choices": [
        "ťa",
        "vami",
        "nami",
        "tebou"
      ],
      "explanation": "Krátky tvar zámena „ty“ je „ťa“."
    },
    {
      "prompt": "Ktorý dlhší tvar zámena „ty“ možno použiť v páde akuzatív?",
      "answer": "teba",
      "choices": [
        "teba",
        "jeho",
        "jemu",
        "ňu"
      ],
      "explanation": "Dlhý tvar v páde akuzatív je „teba“."
    },
    {
      "prompt": "Ktorý je kratší tvar zámena „on“ v páde genitív?",
      "answer": "ho",
      "choices": [
        "ho",
        "vami",
        "nami",
        "tebou"
      ],
      "explanation": "Krátky tvar zámena „on“ je „ho“."
    },
    {
      "prompt": "Ktorý dlhší tvar zámena „on“ možno použiť v páde genitív?",
      "answer": "jeho",
      "choices": [
        "jeho",
        "teba",
        "jemu",
        "ňu"
      ],
      "explanation": "Dlhý tvar v páde genitív je „jeho“."
    },
    {
      "prompt": "Ktorý je kratší tvar zámena „on“ v páde datív?",
      "answer": "mu",
      "choices": [
        "mu",
        "vami",
        "nami",
        "tebou"
      ],
      "explanation": "Krátky tvar zámena „on“ je „mu“."
    },
    {
      "prompt": "Ktorý dlhší tvar zámena „on“ možno použiť v páde datív?",
      "answer": "jemu",
      "choices": [
        "jemu",
        "teba",
        "jeho",
        "ňu"
      ],
      "explanation": "Dlhý tvar v páde datív je „jemu“."
    },
    {
      "prompt": "Ktorý je kratší tvar zámena „on“ v páde akuzatív?",
      "answer": "ho",
      "choices": [
        "ho",
        "vami",
        "nami",
        "tebou"
      ],
      "explanation": "Krátky tvar zámena „on“ je „ho“."
    },
    {
      "prompt": "Ktorý dlhší tvar zámena „on“ možno použiť v páde akuzatív?",
      "answer": "jeho",
      "choices": [
        "jeho",
        "teba",
        "jemu",
        "ňu"
      ],
      "explanation": "Dlhý tvar v páde akuzatív je „jeho“."
    },
    {
      "prompt": "Ktorý je kratší tvar zámena „ona“ v páde genitív?",
      "answer": "jej",
      "choices": [
        "jej",
        "nami",
        "tebou",
        "neho"
      ],
      "explanation": "Krátky tvar zámena „ona“ je „jej“."
    },
    {
      "prompt": "Ktorý dlhší tvar zámena „ona“ možno použiť v páde genitív?",
      "answer": "jej",
      "choices": [
        "jej",
        "jeho",
        "jemu",
        "ňu"
      ],
      "explanation": "Dlhý tvar v páde genitív je „jej“."
    },
    {
      "prompt": "Ktorý je kratší tvar zámena „ona“ v páde akuzatív?",
      "answer": "ju",
      "choices": [
        "ju",
        "vami",
        "nami",
        "tebou"
      ],
      "explanation": "Krátky tvar zámena „ona“ je „ju“."
    },
    {
      "prompt": "Ktorý dlhší tvar zámena „ona“ možno použiť v páde akuzatív?",
      "answer": "ňu",
      "choices": [
        "ňu",
        "teba",
        "jeho",
        "jemu"
      ],
      "explanation": "Dlhý tvar v páde akuzatív je „ňu“."
    },
    {
      "prompt": "Môže krátky neprízvučný tvar zámena stáť na začiatku vety?",
      "answer": "nie, nikdy",
      "choices": [
        "nie, nikdy",
        "áno, vždy",
        "iba v otázke",
        "iba po bodke"
      ],
      "explanation": "Podľa prezentácie krátke tvary (ma, mi, mu, ťa, ti, ho) nikdy nestoja na začiatku vety."
    },
    {
      "prompt": "Kedy typicky používame dlhý tvar osobného zámena?",
      "answer": "po predložke, na začiatku vety alebo pri zdôraznení",
      "choices": [
        "po predložke, na začiatku vety alebo pri zdôraznení",
        "iba na konci súvetia",
        "iba po číslovke",
        "iba pred slovesom"
      ],
      "explanation": "Dlhé tvary sa používajú s predložkami, na začiatku vety a pri zdôraznení."
    },
    {
      "prompt": "Ktorá dvojica obsahuje iba krátke tvary osobných zámen?",
      "answer": "mi, ti",
      "choices": [
        "mi, ti",
        "mne, tebe",
        "mnou, tebou",
        "mňa, teba"
      ],
      "explanation": "Mi a ti sú krátke neprízvučné tvary."
    },
    {
      "prompt": "Ktorá dvojica obsahuje iba dlhé tvary osobných zámen?",
      "answer": "mňa, teba",
      "choices": [
        "mňa, teba",
        "ma, ťa",
        "mi, ti",
        "ho, mu"
      ],
      "explanation": "Mňa a teba sú dlhé tvary osobných zámen."
    },
    {
      "prompt": "V ktorej vete je správne použité krátke zámeno?",
      "answer": "Učiteľ mi to povedal.",
      "choices": [
        "Učiteľ mi to povedal.",
        "Mi to učiteľ povedal.",
        "Mu som dal pero.",
        "Ťa videli v škole."
      ],
      "explanation": "Krátke tvary sú neprízvučné a nezačínajú vetu."
    },
    {
      "prompt": "Čo platí o krátkych tvaroch ma, mi, mu, ťa, ti, ho?",
      "answer": "sú neprízvučné",
      "choices": [
        "sú neprízvučné",
        "vždy sú prízvučné",
        "vždy stoja po predložke",
        "nikdy sa nevyskytujú uprostred vety"
      ],
      "explanation": "Krátke tvary sa vyslovujú spolu s predchádzajúcim slovom."
    },
    {
      "prompt": "Ktorá veta správne zdôrazňuje osobu?",
      "answer": "Vyvolala mňa, nie teba!",
      "choices": [
        "Vyvolala mňa, nie teba!",
        "Vyvolala ma, nie teba!",
        "Mi povedala pravdu.",
        "Mu dala lístok."
      ],
      "explanation": "Pri zdôraznení prezentácia používa dlhé tvary zámen."
    }
  ],
  "nho_n": [
    {
      "prompt": "Vyber správny tvar spojený s predložkou „po“ pri slove „chlapca“.",
      "answer": "poňho",
      "choices": [
        "poňho",
        "poň",
        "po ňho",
        "poňu"
      ],
      "explanation": "Slovo „chlapca“ označuje životný mužský rod, preto používame -ňho: poňho."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „za“ pri slove „brata“.",
      "answer": "zaňho",
      "choices": [
        "zaňho",
        "zaň",
        "za ňho",
        "zaňu"
      ],
      "explanation": "Slovo „brata“ označuje životný mužský rod, preto používame -ňho: zaňho."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „do“ pri slove „spolužiaka“.",
      "answer": "doňho",
      "choices": [
        "doňho",
        "doň",
        "do ňho",
        "doňu"
      ],
      "explanation": "Slovo „spolužiaka“ označuje životný mužský rod, preto používame -ňho: doňho."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „pre“ pri slove „kamaráta“.",
      "answer": "preňho",
      "choices": [
        "preňho",
        "preň",
        "pre ňho",
        "preňu"
      ],
      "explanation": "Slovo „kamaráta“ označuje životný mužský rod, preto používame -ňho: preňho."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „na“ pri slove „žiaka“.",
      "answer": "naňho",
      "choices": [
        "naňho",
        "naň",
        "na ňho",
        "naňu"
      ],
      "explanation": "Slovo „žiaka“ označuje životný mužský rod, preto používame -ňho: naňho."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „po“ pri slove „syna“.",
      "answer": "poňho",
      "choices": [
        "poňho",
        "poň",
        "po ňho",
        "poňu"
      ],
      "explanation": "Slovo „syna“ označuje životný mužský rod, preto používame -ňho: poňho."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „za“ pri slove „učiteľa“.",
      "answer": "zaňho",
      "choices": [
        "zaňho",
        "zaň",
        "za ňho",
        "zaňu"
      ],
      "explanation": "Slovo „učiteľa“ označuje životný mužský rod, preto používame -ňho: zaňho."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „pre“ pri slove „suseda“.",
      "answer": "preňho",
      "choices": [
        "preňho",
        "preň",
        "pre ňho",
        "preňu"
      ],
      "explanation": "Slovo „suseda“ označuje životný mužský rod, preto používame -ňho: preňho."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „do“ pri slove „zošit“.",
      "answer": "doň",
      "choices": [
        "doň",
        "doňho",
        "do ň",
        "doňu"
      ],
      "explanation": "Slovo „zošit“ je neživotné alebo stredného rodu, preto používame -ň: doň."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „na“ pri slove „obraz“.",
      "answer": "naň",
      "choices": [
        "naň",
        "naňho",
        "na ň",
        "naňu"
      ],
      "explanation": "Slovo „obraz“ je neživotné alebo stredného rodu, preto používame -ň: naň."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „pre“ pri slove „darček“.",
      "answer": "preň",
      "choices": [
        "preň",
        "preňho",
        "pre ň",
        "preňu"
      ],
      "explanation": "Slovo „darček“ je neživotné alebo stredného rodu, preto používame -ň: preň."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „po“ pri slove „chlieb“.",
      "answer": "poň",
      "choices": [
        "poň",
        "poňho",
        "po ň",
        "poňu"
      ],
      "explanation": "Slovo „chlieb“ je neživotné alebo stredného rodu, preto používame -ň: poň."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „za“ pri slove „hrad“.",
      "answer": "zaň",
      "choices": [
        "zaň",
        "zaňho",
        "za ň",
        "zaňu"
      ],
      "explanation": "Slovo „hrad“ je neživotné alebo stredného rodu, preto používame -ň: zaň."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „do“ pri slove „dom“.",
      "answer": "doň",
      "choices": [
        "doň",
        "doňho",
        "do ň",
        "doňu"
      ],
      "explanation": "Slovo „dom“ je neživotné alebo stredného rodu, preto používame -ň: doň."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „na“ pri slove „stôl“.",
      "answer": "naň",
      "choices": [
        "naň",
        "naňho",
        "na ň",
        "naňu"
      ],
      "explanation": "Slovo „stôl“ je neživotné alebo stredného rodu, preto používame -ň: naň."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „po“ pri slove „mlieko“.",
      "answer": "poň",
      "choices": [
        "poň",
        "poňho",
        "po ň",
        "poňu"
      ],
      "explanation": "Slovo „mlieko“ je neživotné alebo stredného rodu, preto používame -ň: poň."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „pre“ pri slove „auto“.",
      "answer": "preň",
      "choices": [
        "preň",
        "preňho",
        "pre ň",
        "preňu"
      ],
      "explanation": "Slovo „auto“ je neživotné alebo stredného rodu, preto používame -ň: preň."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „na“ pri slove „okno“.",
      "answer": "naň",
      "choices": [
        "naň",
        "naňho",
        "na ň",
        "naňu"
      ],
      "explanation": "Slovo „okno“ je neživotné alebo stredného rodu, preto používame -ň: naň."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „po“ pri slove „pero“.",
      "answer": "poň",
      "choices": [
        "poň",
        "poňho",
        "po ň",
        "poňu"
      ],
      "explanation": "Slovo „pero“ je neživotné alebo stredného rodu, preto používame -ň: poň."
    },
    {
      "prompt": "Vyber správny tvar spojený s predložkou „do“ pri slove „divadlo“.",
      "answer": "doň",
      "choices": [
        "doň",
        "doňho",
        "do ň",
        "doňu"
      ],
      "explanation": "Slovo „divadlo“ je neživotné alebo stredného rodu, preto používame -ň: doň."
    }
  ],
  "dvojice": [
    {
      "prompt": "Vyber správne slovo: „___ sme v triede prví.“",
      "answer": "my",
      "choices": [
        "my",
        "ju",
        "ma",
        "ich"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „___ vám pomôžeme.“",
      "answer": "my",
      "choices": [
        "my",
        "ju",
        "mňa",
        "oni"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „___ pôjdeme pešo.“",
      "answer": "my",
      "choices": [
        "my",
        "ju",
        "mne",
        "ňou"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „___ ešte nekončíme.“",
      "answer": "my",
      "choices": [
        "my",
        "ju",
        "jemu",
        "napadlo"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „Daj ___ prosím loptu. (ja)“",
      "answer": "mi",
      "choices": [
        "mi",
        "ju",
        "ona",
        "vy"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „Napíš ___ správu. (ja)“",
      "answer": "mi",
      "choices": [
        "mi",
        "ju",
        "teba",
        "on"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „Povedz ___ tajomstvo. (ja)“",
      "answer": "mi",
      "choices": [
        "mi",
        "ju",
        "ti",
        "nám"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „Pošli ___ pozdrav. (ja)“",
      "answer": "mi",
      "choices": [
        "mi",
        "ju",
        "ty",
        "vás"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „___ si to vedel.“",
      "answer": "ty",
      "choices": [
        "ty",
        "ju",
        "ma",
        "ich"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „___ prídeš večer.“",
      "answer": "ty",
      "choices": [
        "ty",
        "ju",
        "mňa",
        "oni"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „___ si vyhrala.“",
      "answer": "ty",
      "choices": [
        "ty",
        "ju",
        "mne",
        "ňou"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „___ sa rozhodneš.“",
      "answer": "ty",
      "choices": [
        "ty",
        "ju",
        "jemu",
        "napadlo"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „Poviem ___ pravdu. (ty)“",
      "answer": "ti",
      "choices": [
        "ti",
        "ju",
        "ona",
        "vy"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „Dám ___ druhú šancu. (ty)“",
      "answer": "ti",
      "choices": [
        "ti",
        "ju",
        "my",
        "on"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „Pošlem ___ odkaz. (ty)“",
      "answer": "ti",
      "choices": [
        "ti",
        "ju",
        "teba",
        "nám"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „Poradím ___ s príkladom. (ty)“",
      "answer": "ti",
      "choices": [
        "ti",
        "ju",
        "teba",
        "vás"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „___ mi výborný nápad. (myšlienka)“",
      "answer": "napadla",
      "choices": [
        "napadla",
        "ju",
        "ma",
        "ich"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „Včera ma ___ nepriateľ.“",
      "answer": "napadol",
      "choices": [
        "napadol",
        "ju",
        "mňa",
        "oni"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „Zrazu mi ___ dobrá myšlienka.“",
      "answer": "napadla",
      "choices": [
        "napadla",
        "ju",
        "mne",
        "ňou"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    },
    {
      "prompt": "Vyber správne slovo: „V lese ma ___ diviak.“",
      "answer": "napadol",
      "choices": [
        "napadol",
        "ju",
        "jemu",
        "napadlo"
      ],
      "explanation": "Rozhoduje osoba, pád a význam vety. My a ty sú základné tvary, mi a ti sú datívové krátke tvary; napadla mi myšlienka, ale napadol ma niekto."
    }
  ],
  "oni_ony": [
    {
      "prompt": "Ktorým zámenom nahradíš výraz „chlapci“?",
      "answer": "oni",
      "choices": [
        "oni",
        "ony",
        "on",
        "ona"
      ],
      "explanation": "Výraz „chlapci“ obsahuje mužský životný rod, preto oni."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „žiaci“?",
      "answer": "oni",
      "choices": [
        "oni",
        "ony",
        "on",
        "ona"
      ],
      "explanation": "Výraz „žiaci“ obsahuje mužský životný rod, preto oni."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „otcovia“?",
      "answer": "oni",
      "choices": [
        "oni",
        "ony",
        "on",
        "ona"
      ],
      "explanation": "Výraz „otcovia“ obsahuje mužský životný rod, preto oni."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „bratia“?",
      "answer": "oni",
      "choices": [
        "oni",
        "ony",
        "on",
        "ona"
      ],
      "explanation": "Výraz „bratia“ obsahuje mužský životný rod, preto oni."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „učitelia“?",
      "answer": "oni",
      "choices": [
        "oni",
        "ony",
        "on",
        "ona"
      ],
      "explanation": "Výraz „učitelia“ obsahuje mužský životný rod, preto oni."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „futbalisti“?",
      "answer": "oni",
      "choices": [
        "oni",
        "ony",
        "on",
        "ona"
      ],
      "explanation": "Výraz „futbalisti“ obsahuje mužský životný rod, preto oni."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „kamarát a kamarátka“?",
      "answer": "oni",
      "choices": [
        "oni",
        "ony",
        "on",
        "ona"
      ],
      "explanation": "Výraz „kamarát a kamarátka“ obsahuje mužský životný rod, preto oni."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „chlapec a dievča“?",
      "answer": "oni",
      "choices": [
        "oni",
        "ony",
        "on",
        "ona"
      ],
      "explanation": "Výraz „chlapec a dievča“ obsahuje mužský životný rod, preto oni."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „žiaci a žiačky“?",
      "answer": "oni",
      "choices": [
        "oni",
        "ony",
        "on",
        "ona"
      ],
      "explanation": "Výraz „žiaci a žiačky“ obsahuje mužský životný rod, preto oni."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „muži“?",
      "answer": "oni",
      "choices": [
        "oni",
        "ony",
        "on",
        "ona"
      ],
      "explanation": "Výraz „muži“ obsahuje mužský životný rod, preto oni."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „dievčatá“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „dievčatá“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „ženy“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „ženy“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „učiteľky“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „učiteľky“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „knihy“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „knihy“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „domy“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „domy“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „autá“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „autá“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „stromy“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „stromy“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „okná“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „okná“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „mamy“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „mamy“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „lavice“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „lavice“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „stoličky“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „stoličky“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Ktorým zámenom nahradíš výraz „mestá“?",
      "answer": "ony",
      "choices": [
        "ony",
        "oni",
        "on",
        "ona"
      ],
      "explanation": "Výraz „mestá“ tu patrí medzi ženský, stredný alebo mužský neživotný rod, preto ony."
    },
    {
      "prompt": "Pre koho sa používa zámeno „oni“?",
      "answer": "mužský rod životný",
      "choices": [
        "mužský rod životný",
        "mužský rod neživotný",
        "iba ženský rod",
        "iba stredný rod"
      ],
      "explanation": "Oni používame pri mužskom životnom rode."
    },
    {
      "prompt": "Pri ktorých rodoch sa používa zámeno „ony“?",
      "answer": "ženský, stredný a mužský neživotný",
      "choices": [
        "ženský, stredný a mužský neživotný",
        "iba mužský životný",
        "iba mužský neživotný",
        "iba ženský rod"
      ],
      "explanation": "Ony používame pri ženských, stredných a mužských neživotných podstatných menách."
    }
  ],
  "predlozky": [
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 1).",
      "answer": "so mnou",
      "choices": [
        "so mnou",
        "somnou",
        "s mnou",
        "zo mnou"
      ],
      "explanation": "Správne píšeme „so mnou“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 2).",
      "answer": "s tebou",
      "choices": [
        "s tebou",
        "stebou",
        "z tebou",
        "zo tebou"
      ],
      "explanation": "Správne píšeme „s tebou“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 3).",
      "answer": "s nami",
      "choices": [
        "s nami",
        "snami",
        "z nami",
        "so nami"
      ],
      "explanation": "Správne píšeme „s nami“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 4).",
      "answer": "s vami",
      "choices": [
        "s vami",
        "svami",
        "z vami",
        "so vami"
      ],
      "explanation": "Správne píšeme „s vami“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 5).",
      "answer": "ku mne",
      "choices": [
        "ku mne",
        "kumne",
        "k mne",
        "gu mne"
      ],
      "explanation": "Správne píšeme „ku mne“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 6).",
      "answer": "ku tebe",
      "choices": [
        "ku tebe",
        "kutebe",
        "k tebe",
        "gu tebe"
      ],
      "explanation": "Správne píšeme „ku tebe“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 7).",
      "answer": "k nám",
      "choices": [
        "k nám",
        "knám",
        "g nám",
        "ku náš"
      ],
      "explanation": "Správne píšeme „k nám“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 8).",
      "answer": "k vám",
      "choices": [
        "k vám",
        "kvám",
        "g vám",
        "ku váš"
      ],
      "explanation": "Správne píšeme „k vám“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 9).",
      "answer": "k nej",
      "choices": [
        "k nej",
        "knej",
        "g nej",
        "ku jej"
      ],
      "explanation": "Správne píšeme „k nej“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 10).",
      "answer": "so svojím",
      "choices": [
        "so svojím",
        "sosvojím",
        "zo svojím",
        "s svojím"
      ],
      "explanation": "Správne píšeme „so svojím“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 11).",
      "answer": "s vaším",
      "choices": [
        "s vaším",
        "svaším",
        "z vaším",
        "zo vaším"
      ],
      "explanation": "Správne píšeme „s vaším“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 12).",
      "answer": "s mojím",
      "choices": [
        "s mojím",
        "smojím",
        "z mojím",
        "so mojím"
      ],
      "explanation": "Správne píšeme „s mojím“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 13).",
      "answer": "so mnou",
      "choices": [
        "so mnou",
        "s mnou",
        "z mnou",
        "so mňou"
      ],
      "explanation": "Správne píšeme „so mnou“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 14).",
      "answer": "ku mne",
      "choices": [
        "ku mne",
        "k mne",
        "g mne",
        "ku mňa"
      ],
      "explanation": "Správne píšeme „ku mne“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 15).",
      "answer": "s tebou",
      "choices": [
        "s tebou",
        "so tebou",
        "z tebou",
        "s tebo"
      ],
      "explanation": "Správne píšeme „s tebou“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Vyber pravopisne správne spojenie predložky s osobným zámenom (príklad 16).",
      "answer": "k nám",
      "choices": [
        "k nám",
        "ku nám",
        "g nám",
        "k náš"
      ],
      "explanation": "Správne píšeme „k nám“. Pri s/so a k/ku pred osobnými zámenami sa pri výslovnosti neuplatňuje spodobovanie; vokalizácia uľahčuje výslovnosť."
    },
    {
      "prompt": "Čo znamená vokalizácia predložiek?",
      "answer": "pridanie samohlásky o alebo u",
      "choices": [
        "pridanie samohlásky o alebo u",
        "zámena predložky za zámeno",
        "vypustenie celej predložky",
        "písanie všetkých predložiek spolu"
      ],
      "explanation": "Pri predložkách s, z, v, k môže vokalizácia uľahčiť výslovnosť."
    },
    {
      "prompt": "Aké pravidlo platí pri výslovnosti s, so, k, ku pred osobným zámenom?",
      "answer": "neuplatní sa spodobovanie",
      "choices": [
        "neuplatní sa spodobovanie",
        "vždy zmeníme s na z aj v písme",
        "predložky sa nikdy nevyslovujú",
        "vždy sa píšu spolu so zámenom"
      ],
      "explanation": "Pri osobných zámenách sa predložky s/so a k/ku nespodobujú."
    },
    {
      "prompt": "Ako píšeme spojenie s privlastňovacím zámenom „vaším“?",
      "answer": "s vaším",
      "choices": [
        "s vaším",
        "z vaším",
        "svaším",
        "so vašímm"
      ],
      "explanation": "Predložku píšeme s, aj keď pri výslovnosti môže znieť ako z."
    }
  ],
  "privlast_skl": [
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný jednotné, nominatív.",
      "answer": "môj",
      "choices": [
        "môj",
        "moja",
        "moje",
        "moji"
      ],
      "explanation": "V spojení mužský životný jednotné a v páde nominatív má zámeno „môj“ tvar „môj“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný jednotné, genitív.",
      "answer": "môjho",
      "choices": [
        "môjho",
        "moja",
        "moje",
        "moji"
      ],
      "explanation": "V spojení mužský životný jednotné a v páde genitív má zámeno „môj“ tvar „môjho“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný jednotné, datív.",
      "answer": "môjmu",
      "choices": [
        "môjmu",
        "moje",
        "moji",
        "môjho"
      ],
      "explanation": "V spojení mužský životný jednotné a v páde datív má zámeno „môj“ tvar „môjmu“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný jednotné, akuzatív.",
      "answer": "môjho",
      "choices": [
        "môjho",
        "moji",
        "môjmu",
        "mojej"
      ],
      "explanation": "V spojení mužský životný jednotné a v páde akuzatív má zámeno „môj“ tvar „môjho“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný jednotné, lokál.",
      "answer": "mojom",
      "choices": [
        "mojom",
        "môjho",
        "môjmu",
        "mojej"
      ],
      "explanation": "V spojení mužský životný jednotné a v páde lokál má zámeno „môj“ tvar „mojom“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný jednotné, inštrumentál.",
      "answer": "mojím",
      "choices": [
        "mojím",
        "môjmu",
        "mojej",
        "moju"
      ],
      "explanation": "V spojení mužský životný jednotné a v páde inštrumentál má zámeno „môj“ tvar „mojím“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský neživotný jednotné, nominatív.",
      "answer": "môj",
      "choices": [
        "môj",
        "moju",
        "mojom",
        "mojím"
      ],
      "explanation": "V spojení mužský neživotný jednotné a v páde nominatív má zámeno „môj“ tvar „môj“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský neživotný jednotné, genitív.",
      "answer": "môjho",
      "choices": [
        "môjho",
        "mojom",
        "mojím",
        "mojou"
      ],
      "explanation": "V spojení mužský neživotný jednotné a v páde genitív má zámeno „môj“ tvar „môjho“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský neživotný jednotné, datív.",
      "answer": "môjmu",
      "choices": [
        "môjmu",
        "mojím",
        "mojou",
        "mojich"
      ],
      "explanation": "V spojení mužský neživotný jednotné a v páde datív má zámeno „môj“ tvar „môjmu“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský neživotný jednotné, akuzatív.",
      "answer": "môj",
      "choices": [
        "môj",
        "mojou",
        "mojich",
        "mojim"
      ],
      "explanation": "V spojení mužský neživotný jednotné a v páde akuzatív má zámeno „môj“ tvar „môj“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský neživotný jednotné, lokál.",
      "answer": "mojom",
      "choices": [
        "mojom",
        "mojich",
        "mojim",
        "mojimi"
      ],
      "explanation": "V spojení mužský neživotný jednotné a v páde lokál má zámeno „môj“ tvar „mojom“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský neživotný jednotné, inštrumentál.",
      "answer": "mojím",
      "choices": [
        "mojím",
        "mojim",
        "mojimi",
        "môj"
      ],
      "explanation": "V spojení mužský neživotný jednotné a v páde inštrumentál má zámeno „môj“ tvar „mojím“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: stredný jednotné, nominatív.",
      "answer": "moje",
      "choices": [
        "moje",
        "mojimi",
        "môj",
        "moja"
      ],
      "explanation": "V spojení stredný jednotné a v páde nominatív má zámeno „môj“ tvar „moje“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: stredný jednotné, genitív.",
      "answer": "môjho",
      "choices": [
        "môjho",
        "môj",
        "moja",
        "moje"
      ],
      "explanation": "V spojení stredný jednotné a v páde genitív má zámeno „môj“ tvar „môjho“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: stredný jednotné, datív.",
      "answer": "môjmu",
      "choices": [
        "môjmu",
        "moja",
        "moje",
        "moji"
      ],
      "explanation": "V spojení stredný jednotné a v páde datív má zámeno „môj“ tvar „môjmu“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: stredný jednotné, akuzatív.",
      "answer": "moje",
      "choices": [
        "moje",
        "moji",
        "môjho",
        "môjmu"
      ],
      "explanation": "V spojení stredný jednotné a v páde akuzatív má zámeno „môj“ tvar „moje“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: stredný jednotné, lokál.",
      "answer": "mojom",
      "choices": [
        "mojom",
        "moji",
        "môjho",
        "môjmu"
      ],
      "explanation": "V spojení stredný jednotné a v páde lokál má zámeno „môj“ tvar „mojom“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: stredný jednotné, inštrumentál.",
      "answer": "mojím",
      "choices": [
        "mojím",
        "môjho",
        "môjmu",
        "mojej"
      ],
      "explanation": "V spojení stredný jednotné a v páde inštrumentál má zámeno „môj“ tvar „mojím“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ženský jednotné, nominatív.",
      "answer": "moja",
      "choices": [
        "moja",
        "mojej",
        "moju",
        "mojom"
      ],
      "explanation": "V spojení ženský jednotné a v páde nominatív má zámeno „môj“ tvar „moja“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ženský jednotné, genitív.",
      "answer": "mojej",
      "choices": [
        "mojej",
        "moju",
        "mojom",
        "mojím"
      ],
      "explanation": "V spojení ženský jednotné a v páde genitív má zámeno „môj“ tvar „mojej“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ženský jednotné, datív.",
      "answer": "mojej",
      "choices": [
        "mojej",
        "mojom",
        "mojím",
        "mojou"
      ],
      "explanation": "V spojení ženský jednotné a v páde datív má zámeno „môj“ tvar „mojej“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ženský jednotné, akuzatív.",
      "answer": "moju",
      "choices": [
        "moju",
        "mojím",
        "mojou",
        "mojich"
      ],
      "explanation": "V spojení ženský jednotné a v páde akuzatív má zámeno „môj“ tvar „moju“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ženský jednotné, lokál.",
      "answer": "mojej",
      "choices": [
        "mojej",
        "mojou",
        "mojich",
        "mojim"
      ],
      "explanation": "V spojení ženský jednotné a v páde lokál má zámeno „môj“ tvar „mojej“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ženský jednotné, inštrumentál.",
      "answer": "mojou",
      "choices": [
        "mojou",
        "mojich",
        "mojim",
        "mojimi"
      ],
      "explanation": "V spojení ženský jednotné a v páde inštrumentál má zámeno „môj“ tvar „mojou“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný množné, nominatív.",
      "answer": "moji",
      "choices": [
        "moji",
        "mojim",
        "mojimi",
        "môj"
      ],
      "explanation": "V spojení mužský životný množné a v páde nominatív má zámeno „môj“ tvar „moji“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný množné, genitív.",
      "answer": "mojich",
      "choices": [
        "mojich",
        "mojimi",
        "môj",
        "moja"
      ],
      "explanation": "V spojení mužský životný množné a v páde genitív má zámeno „môj“ tvar „mojich“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný množné, datív.",
      "answer": "mojim",
      "choices": [
        "mojim",
        "môj",
        "moja",
        "moje"
      ],
      "explanation": "V spojení mužský životný množné a v páde datív má zámeno „môj“ tvar „mojim“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný množné, akuzatív.",
      "answer": "mojich",
      "choices": [
        "mojich",
        "moja",
        "moje",
        "moji"
      ],
      "explanation": "V spojení mužský životný množné a v páde akuzatív má zámeno „môj“ tvar „mojich“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný množné, lokál.",
      "answer": "mojich",
      "choices": [
        "mojich",
        "moje",
        "moji",
        "môjho"
      ],
      "explanation": "V spojení mužský životný množné a v páde lokál má zámeno „môj“ tvar „mojich“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: mužský životný množné, inštrumentál.",
      "answer": "mojimi",
      "choices": [
        "mojimi",
        "moji",
        "môjho",
        "môjmu"
      ],
      "explanation": "V spojení mužský životný množné a v páde inštrumentál má zámeno „môj“ tvar „mojimi“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ostatné rody množné, nominatív.",
      "answer": "moje",
      "choices": [
        "moje",
        "môjmu",
        "mojej",
        "moju"
      ],
      "explanation": "V spojení ostatné rody množné a v páde nominatív má zámeno „môj“ tvar „moje“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ostatné rody množné, genitív.",
      "answer": "mojich",
      "choices": [
        "mojich",
        "môjmu",
        "mojej",
        "moju"
      ],
      "explanation": "V spojení ostatné rody množné a v páde genitív má zámeno „môj“ tvar „mojich“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ostatné rody množné, datív.",
      "answer": "mojim",
      "choices": [
        "mojim",
        "mojej",
        "moju",
        "mojom"
      ],
      "explanation": "V spojení ostatné rody množné a v páde datív má zámeno „môj“ tvar „mojim“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ostatné rody množné, akuzatív.",
      "answer": "moje",
      "choices": [
        "moje",
        "mojom",
        "mojím",
        "mojou"
      ],
      "explanation": "V spojení ostatné rody množné a v páde akuzatív má zámeno „môj“ tvar „moje“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ostatné rody množné, lokál.",
      "answer": "mojich",
      "choices": [
        "mojich",
        "mojom",
        "mojím",
        "mojou"
      ],
      "explanation": "V spojení ostatné rody množné a v páde lokál má zámeno „môj“ tvar „mojich“."
    },
    {
      "prompt": "Doplň správny tvar zámena „môj“: ostatné rody množné, inštrumentál.",
      "answer": "mojimi",
      "choices": [
        "mojimi",
        "mojím",
        "mojou",
        "mojich"
      ],
      "explanation": "V spojení ostatné rody množné a v páde inštrumentál má zámeno „môj“ tvar „mojimi“."
    },
    {
      "prompt": "Vyber tvar do vety: „S ___ kamarátom sa učím. (môj)“",
      "answer": "mojím",
      "choices": [
        "mojím",
        "mojim",
        "môjim",
        "môjím"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „mojím“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „S ___ bratom idem domov. (tvoj)“",
      "answer": "tvojím",
      "choices": [
        "tvojím",
        "tvojim",
        "tvôjim",
        "tvojom"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „tvojím“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „S ___ otcom sa porozprávam. (náš)“",
      "answer": "naším",
      "choices": [
        "naším",
        "našim",
        "nášim",
        "náším"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „naším“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „S ___ učiteľom sme spokojní. (váš)“",
      "answer": "vaším",
      "choices": [
        "vaším",
        "vašim",
        "vášim",
        "váším"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „vaším“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „O ___ kamarátovi hovoríme. (môj)“",
      "answer": "mojom",
      "choices": [
        "mojom",
        "mojím",
        "môjom",
        "mojim"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „mojom“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „Bez ___ knihy nikam nejdem. (moja)“",
      "answer": "mojej",
      "choices": [
        "mojej",
        "moju",
        "môjej",
        "mojim"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „mojej“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „Vidím ___ sestru. (moja)“",
      "answer": "moju",
      "choices": [
        "moju",
        "mojej",
        "moja",
        "mojim"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „moju“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „S ___ sestrou ideme na výlet. (moja)“",
      "answer": "mojou",
      "choices": [
        "mojou",
        "mojej",
        "moju",
        "moja"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „mojou“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „Počúvam ___ kamarátov. (môj)“",
      "answer": "mojich",
      "choices": [
        "mojich",
        "mojim",
        "mojimi",
        "moji"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „mojich“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „Rozprávam sa s ___ kamarátmi. (môj)“",
      "answer": "mojimi",
      "choices": [
        "mojimi",
        "mojim",
        "mojich",
        "moji"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „mojimi“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „Pomáham ___ spolužiakom. (môj)“",
      "answer": "mojim",
      "choices": [
        "mojim",
        "mojím",
        "mojimi",
        "moji"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „mojim“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „___ kamaráti dnes prídu. (môj)“",
      "answer": "moji",
      "choices": [
        "moji",
        "moje",
        "mojich",
        "moja"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „moji“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „___ knihy sú v taške. (môj)“",
      "answer": "moje",
      "choices": [
        "moje",
        "moji",
        "moju",
        "mojej"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „moje“; rozhoduje rod, číslo a pád."
    },
    {
      "prompt": "Vyber tvar do vety: „Hovoríme o ___ úlohách. (môj)“",
      "answer": "mojich",
      "choices": [
        "mojich",
        "mojim",
        "mojimi",
        "moji"
      ],
      "explanation": "Správny tvar privlastňovacieho zámena je „mojich“; rozhoduje rod, číslo a pád."
    }
  ],
  "vyznam": [
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Jeho som včera stretla.“ je osobné...",
      "answer": "základné",
      "choices": [
        "základné",
        "privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa pádovou otázkou (koho? komu?)."
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Jeho bunda je modrá.“ je osobné...",
      "answer": "privlastňovacie",
      "choices": [
        "privlastňovacie",
        "základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa čí? čia? čie?"
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Dala som jej list.“ je osobné...",
      "answer": "základné",
      "choices": [
        "základné",
        "privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa pádovou otázkou (koho? komu?)."
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Jej list je na stole.“ je osobné...",
      "answer": "privlastňovacie",
      "choices": [
        "privlastňovacie",
        "základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa čí? čia? čie?"
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Videla som ich.“ je osobné...",
      "answer": "základné",
      "choices": [
        "základné",
        "privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa pádovou otázkou (koho? komu?)."
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Ich bicykle stoja pri dome.“ je osobné...",
      "answer": "privlastňovacie",
      "choices": [
        "privlastňovacie",
        "základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa čí? čia? čie?"
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Pozdravili sme ho.“ je osobné...",
      "answer": "základné",
      "choices": [
        "základné",
        "privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa pádovou otázkou (koho? komu?)."
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „O jeho veci sa nestaraj.“ je osobné...",
      "answer": "privlastňovacie",
      "choices": [
        "privlastňovacie",
        "základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa čí? čia? čie?"
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Požičal som jej pero.“ je osobné...",
      "answer": "základné",
      "choices": [
        "základné",
        "privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa pádovou otázkou (koho? komu?)."
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Jej pero sa stratilo.“ je osobné...",
      "answer": "privlastňovacie",
      "choices": [
        "privlastňovacie",
        "základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa čí? čia? čie?"
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Videl si ich pri škole.“ je osobné...",
      "answer": "základné",
      "choices": [
        "základné",
        "privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa pádovou otázkou (koho? komu?)."
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Ich škola je nová.“ je osobné...",
      "answer": "privlastňovacie",
      "choices": [
        "privlastňovacie",
        "základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa čí? čia? čie?"
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Pomôžeme jej zajtra.“ je osobné...",
      "answer": "základné",
      "choices": [
        "základné",
        "privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa pádovou otázkou (koho? komu?)."
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Jej mama je doma.“ je osobné...",
      "answer": "privlastňovacie",
      "choices": [
        "privlastňovacie",
        "základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa čí? čia? čie?"
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Stretol som jeho.“ je osobné...",
      "answer": "základné",
      "choices": [
        "základné",
        "privlastňovacie",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa pádovou otázkou (koho? komu?)."
    },
    {
      "prompt": "Zámeno „jeho“, „jej“ alebo „ich“ vo vete „Jeho mama nás zavolala.“ je osobné...",
      "answer": "privlastňovacie",
      "choices": [
        "privlastňovacie",
        "základné",
        "ukazovacie",
        "opytovacie"
      ],
      "explanation": "Pýtame sa čí? čia? čie?"
    },
    {
      "prompt": "Ktoré privlastňovacie zámená sú nesklonné?",
      "answer": "jeho, jej, ich",
      "choices": [
        "jeho, jej, ich",
        "môj, tvoj, náš",
        "ja, ty, my",
        "náš, váš, svoj"
      ],
      "explanation": "Jeho, jej a ich sa podľa prezentácie neskloňujú."
    },
    {
      "prompt": "Ktorý vzor používame pri skloňovaní „tvoj“, „náš“, „váš“ a „svoj“?",
      "answer": "môj",
      "choices": [
        "môj",
        "pekný",
        "cudzí",
        "otcov"
      ],
      "explanation": "Podľa prezentácie sa tieto privlastňovacie zámená skloňujú podľa vzoru môj."
    },
    {
      "prompt": "Ako píšeme zámená Vy, Ty, Váš a Tvoj v osobnom liste pri úctivom oslovení?",
      "answer": "s veľkým začiatočným písmenom",
      "choices": [
        "s veľkým začiatočným písmenom",
        "vždy malým písmenom",
        "iba kurzívou",
        "vždy s pomlčkou"
      ],
      "explanation": "V listoch sa pri úctivom oslovení píšu Vy, Ty, Váš a Tvoj s veľkým začiatočným písmenom."
    },
    {
      "prompt": "Čo je typické pre prípony vzoru môj podľa prezentácie?",
      "answer": "väčšina prípon je krátka, okrem vyznačených dlhých tvarov",
      "choices": [
        "väčšina prípon je krátka, okrem vyznačených dlhých tvarov",
        "všetky prípony sú dlhé",
        "všetky prípony sú bez samohlások",
        "všetky tvary sú nesklonné"
      ],
      "explanation": "Pri vzore môj si treba zapamätať najmä dlhé í v inštrumentáli jednotného čísla: mojím."
    },
    {
      "prompt": "Ktorá veta obsahuje nesklonné privlastňovacie zámeno?",
      "answer": "Ich kniha je na stole.",
      "choices": [
        "Ich kniha je na stole.",
        "Jeho som pozdravil.",
        "Ich sme stretli.",
        "Povedal som jej pravdu."
      ],
      "explanation": "V spojení „ich kniha“ je „ich“ privlastňovacie a zostáva nesklonné."
    },
    {
      "prompt": "Ktorá veta obsahuje osobné základné zámeno v datíve?",
      "answer": "Poviem jej to.",
      "choices": [
        "Poviem jej to.",
        "Jej kabát je modrý.",
        "Jeho dom stojí pri rieke.",
        "Ich auto je červené."
      ],
      "explanation": "V spojení „poviem jej“ sa pýtame komu?; ide o osobné základné zámeno."
    },
    {
      "prompt": "Ktorá veta obsahuje privlastňovacie zámeno „jeho“?",
      "answer": "Jeho sestra je doma.",
      "choices": [
        "Jeho sestra je doma.",
        "Jeho som videl.",
        "Bez neho neodídem.",
        "Počkám naňho."
      ],
      "explanation": "Pri „jeho sestra“ sa pýtame čia sestra?"
    },
    {
      "prompt": "Ktorá otázka odlišuje „jej“ v spojení „jej fotka“ od „jej“ vo vete „Poviem jej to“?",
      "answer": "čí/čia/čie oproti komu?",
      "choices": [
        "čí/čia/čie oproti komu?",
        "kedy oproti kde?",
        "koľko oproti koľký?",
        "prečo oproti ako?"
      ],
      "explanation": "„Jej fotka“ vyjadruje vlastnícky vzťah; „poviem jej“ datív."
    }
  ]
} satisfies Record<string, PronounSpec[]>;

export type PronounGroupId = keyof typeof pronounGroups;
export const pronounBank: PronounSpec[] = Object.values(pronounGroups).flat();
export const pronounBankSize = pronounBank.length;
