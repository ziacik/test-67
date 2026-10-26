// Pôvodné cvičenia podľa tematických okruhov Wir 1 (A1), bez prepisovania učebnice.
export type GermanLessonId = "de-01" | "de-02" | "de-03" | "de-04" | "de-05" | "de-06" | "de-07" | "de-08" | "de-09" | "de-10" | "de-11" | "de-12";
export type GermanGrammarRow = [prompt: string, answer: string, wrong1: string, wrong2: string, wrong3: string, explanation: string];
export type GermanLessonData = { words: [slovak: string, german: string][]; tasks: GermanGrammarRow[] };
export const germanLessonTitles: Record<GermanLessonId, string> = {
  "de-01": "Hallo!",
  "de-02": "Das ist meine Familie",
  "de-03": "Hast du Geschwister?",
  "de-04": "Wo wohnt ihr?",
  "de-05": "Das Haus von Familie Weigel",
  "de-06": "Ein Besuch",
  "de-07": "Mautzi, unsere Katze",
  "de-08": "Die Nachbarn von Familie Weigel",
  "de-09": "Was isst du in der Pause?",
  "de-10": "Meine Schulsachen",
  "de-11": "Was gibt es im Fernsehen?",
  "de-12": "Um wie viel Uhr stehst du auf?"
};
export const germanLessons: Record<GermanLessonId, GermanLessonData> = {
  "de-01": {
    "words": [
      [
        "ahoj",
        "hallo"
      ],
      [
        "dobré ráno",
        "guten Morgen"
      ],
      [
        "dobrý deň",
        "guten Tag"
      ],
      [
        "dobrý večer",
        "guten Abend"
      ],
      [
        "dobrú noc",
        "gute Nacht"
      ],
      [
        "čau (pri lúčení)",
        "tschüss"
      ],
      [
        "dovidenia",
        "auf Wiedersehen"
      ],
      [
        "ďakujem",
        "danke"
      ],
      [
        "prosím",
        "bitte"
      ],
      [
        "áno",
        "ja"
      ],
      [
        "nie",
        "nein"
      ],
      [
        "ja",
        "ich"
      ],
      [
        "ty",
        "du"
      ],
      [
        "kto",
        "wer"
      ],
      [
        "ako",
        "wie"
      ],
      [
        "volám sa",
        "ich heiße"
      ],
      [
        "jeden",
        "eins"
      ],
      [
        "dva",
        "zwei"
      ],
      [
        "tri",
        "drei"
      ],
      [
        "štyri",
        "vier"
      ],
      [
        "päť",
        "fünf"
      ],
      [
        "šesť",
        "sechs"
      ],
      [
        "sedem",
        "sieben"
      ],
      [
        "osem",
        "acht"
      ],
      [
        "deväť",
        "neun"
      ],
      [
        "desať",
        "zehn"
      ],
      [
        "jedenásť",
        "elf"
      ],
      [
        "dvanásť",
        "zwölf"
      ],
      [
        "dvadsať",
        "zwanzig"
      ]
    ],
    "tasks": [
      [
        "Ich ___ Anna.",
        "bin",
        "bist",
        "ist",
        "seid",
        "Po zámenе ich má sloveso sein tvar bin."
      ],
      [
        "Du ___ elf Jahre alt.",
        "bist",
        "bin",
        "ist",
        "sind",
        "Po du používame bist."
      ],
      [
        "Wie ___ du? – Ich heiße Lena.",
        "heißt",
        "heiße",
        "heißen",
        "heißt ihr",
        "Po du má heißen tvar heißt."
      ],
      [
        "___ heißt du? – Ich heiße Paul.",
        "Wie",
        "Wer",
        "Wo",
        "Was",
        "Na meno sa pýtame Wie heißt du?"
      ],
      [
        "___ bist du? – Ich bin Mia.",
        "Wer",
        "Wo",
        "Wann",
        "Wie viele",
        "Wer znamená kto."
      ],
      [
        "Wie alt bist du? – Ich ___ zwölf.",
        "bin",
        "bist",
        "ist",
        "sind",
        "Ich bin zwölf je správny spôsob vyjadrenia veku."
      ],
      [
        "Du heißt Max. Ktorá veta je správna otázka na meno?",
        "Wie heißt du?",
        "Wie alt bist du?",
        "Woher bist du?",
        "Wer heißt du?",
        "Na meno sa pýtame Wie heißt du?"
      ],
      [
        "Ktoré číslo je po nemecky „siebzehn“?",
        "17",
        "7",
        "70",
        "16",
        "Siebzehn znamená sedemnásť."
      ],
      [
        "Ktorý pozdrav sa hodí večer?",
        "Guten Abend!",
        "Guten Morgen!",
        "Gute Nacht!",
        "Auf Wiedersehen!",
        "Guten Abend je pozdrav večer."
      ],
      [
        "Akú odpoveď dáš na „Wie heißt du?“",
        "Ich heiße Tom.",
        "Ich bin elf.",
        "Ich wohne hier.",
        "Guten Abend.",
        "Na otázku o mene odpovieš Ich heiße..."
      ]
    ]
  },
  "de-02": {
    "words": [
      [
        "otec",
        "der Vater"
      ],
      [
        "matka",
        "die Mutter"
      ],
      [
        "brat",
        "der Bruder"
      ],
      [
        "sestra",
        "die Schwester"
      ],
      [
        "starý otec",
        "der Opa"
      ],
      [
        "stará mama",
        "die Oma"
      ],
      [
        "rodičia",
        "die Eltern"
      ],
      [
        "rodina",
        "die Familie"
      ],
      [
        "teta",
        "die Tante"
      ],
      [
        "strýko",
        "der Onkel"
      ],
      [
        "syn",
        "der Sohn"
      ],
      [
        "dcéra",
        "die Tochter"
      ],
      [
        "bratranec",
        "der Cousin"
      ],
      [
        "sesternica",
        "die Cousine"
      ],
      [
        "dieťa",
        "das Kind"
      ],
      [
        "deti",
        "die Kinder"
      ],
      [
        "môj",
        "mein"
      ],
      [
        "moja",
        "meine"
      ]
    ],
    "tasks": [
      [
        "Das ist ___ Vater.",
        "mein",
        "meine",
        "meinen",
        "deine",
        "Pred mužským Vater je mein."
      ],
      [
        "Das ist ___ Mutter.",
        "meine",
        "mein",
        "meinen",
        "dein",
        "Pred ženským Mutter je meine."
      ],
      [
        "Wie heißt ___ Schwester? – Sie heißt Eva.",
        "deine",
        "dein",
        "deinen",
        "deiner",
        "Schwester je ženského rodu, preto deine."
      ],
      [
        "Das ist ___ Onkel.",
        "der",
        "die",
        "das",
        "den",
        "Onkel má člen der."
      ],
      [
        "Das ist ___ Tante.",
        "die",
        "der",
        "das",
        "den",
        "Tante má člen die."
      ],
      [
        "Paul ist mein Bruder. ___ ist elf.",
        "Er",
        "Sie",
        "Es",
        "Wir",
        "Bruder nahradíme osobným zámenom er."
      ],
      [
        "Anna ist meine Schwester. ___ heißt Anna.",
        "Sie",
        "Er",
        "Es",
        "Du",
        "Schwester nahradíme osobným zámenom sie."
      ],
      [
        "Meine Eltern ___ zu Hause.",
        "sind",
        "ist",
        "bin",
        "bist",
        "Eltern je množné číslo: sie sind."
      ],
      [
        "Die Mutter ___ Laura.",
        "heißt",
        "heiße",
        "heißen",
        "heißt du",
        "Pri er/sie je tvar heißt."
      ],
      [
        "Das ist die Schwester ___ Max.",
        "von",
        "in",
        "bei",
        "aus",
        "Vyjadrenie príslušnosti: die Schwester von Max."
      ]
    ]
  },
  "de-03": {
    "words": [
      [
        "súrodenci",
        "die Geschwister"
      ],
      [
        "brat",
        "der Bruder"
      ],
      [
        "sestra",
        "die Schwester"
      ],
      [
        "jedináčik",
        "das Einzelkind"
      ],
      [
        "priateľ",
        "der Freund"
      ],
      [
        "priateľka",
        "die Freundin"
      ],
      [
        "telefón",
        "das Telefon"
      ],
      [
        "telefónne číslo",
        "die Telefonnummer"
      ],
      [
        "vek",
        "das Alter"
      ],
      [
        "rok",
        "das Jahr"
      ],
      [
        "mladý",
        "jung"
      ],
      [
        "starý",
        "alt"
      ],
      [
        "milý",
        "nett"
      ],
      [
        "sympatický",
        "sympathisch"
      ],
      [
        "vtipný",
        "lustig"
      ],
      [
        "dvadsaťjeden",
        "einundzwanzig"
      ],
      [
        "tridsať",
        "dreißig"
      ],
      [
        "štyridsať",
        "vierzig"
      ],
      [
        "päťdesiat",
        "fünfzig"
      ],
      [
        "sto",
        "hundert"
      ]
    ],
    "tasks": [
      [
        "Ich ___ einen Bruder.",
        "habe",
        "hast",
        "hat",
        "haben",
        "Ich habe znamená ja mám."
      ],
      [
        "___ du Geschwister? – Ja, eine Schwester.",
        "Hast",
        "Habe",
        "Hat",
        "Habt",
        "Pri du má haben tvar hast."
      ],
      [
        "Wir ___ zwei Schwestern.",
        "haben",
        "hast",
        "hat",
        "habe",
        "Po wir používame haben."
      ],
      [
        "Ich habe ___ Bruder. (Nemám brata.)",
        "keinen",
        "keine",
        "kein",
        "nicht einen",
        "Mužský rod v akuzatíve má zápor keinen."
      ],
      [
        "Ich habe ___ Schwester. (Nemám sestru.)",
        "keine",
        "kein",
        "keinen",
        "nicht",
        "Pri Schwester používame keine."
      ],
      [
        "Sie haben zwei Kinder. Koľko majú detí?",
        "Dve",
        "Jedno",
        "Tri",
        "Žiadne",
        "Zwei znamená dve."
      ],
      [
        "Ako slušne oslovíš dospelého?",
        "Sie",
        "du",
        "er",
        "es",
        "Zdvorilé Vy sa v nemčine píše Sie."
      ],
      [
        "Wie alt ___ Sie?",
        "sind",
        "bist",
        "ist",
        "bin",
        "Zdvorilostná forma Sie sa spája so sind."
      ],
      [
        "Er ___ fünfzehn Jahre alt.",
        "ist",
        "bin",
        "bist",
        "seid",
        "Po er má sein tvar ist."
      ],
      [
        "Ktoré číslo znamená 35?",
        "fünfunddreißig",
        "dreiundfünfzig",
        "fünfzehn",
        "dreizehn",
        "V nemčine najprv vyslovíme jednotky a potom desiatky."
      ]
    ]
  },
  "de-04": {
    "words": [
      [
        "bývať",
        "wohnen"
      ],
      [
        "bývam",
        "ich wohne"
      ],
      [
        "bývaš",
        "du wohnst"
      ],
      [
        "mesto",
        "die Stadt"
      ],
      [
        "dedina",
        "das Dorf"
      ],
      [
        "ulica",
        "die Straße"
      ],
      [
        "adresa",
        "die Adresse"
      ],
      [
        "dom",
        "das Haus"
      ],
      [
        "byt",
        "die Wohnung"
      ],
      [
        "krajina",
        "das Land"
      ],
      [
        "Nemecko",
        "Deutschland"
      ],
      [
        "Rakúsko",
        "Österreich"
      ],
      [
        "Slovensko",
        "die Slowakei"
      ],
      [
        "Bratislava",
        "Bratislava"
      ],
      [
        "kde",
        "wo"
      ],
      [
        "tu",
        "hier"
      ],
      [
        "tam",
        "dort"
      ],
      [
        "spolu",
        "zusammen"
      ],
      [
        "e-mailová adresa",
        "die E-Mail-Adresse"
      ]
    ],
    "tasks": [
      [
        "Wo ___ du? – In Berlin.",
        "wohnst",
        "wohne",
        "wohnt",
        "wohnen",
        "Pri du má wohnen tvar wohnst."
      ],
      [
        "Wir ___ in Bratislava.",
        "wohnen",
        "wohnt",
        "wohnst",
        "wohne",
        "Pri wir sa používa wohnen."
      ],
      [
        "Wo ___ ihr? – In Wien.",
        "wohnt",
        "wohnen",
        "wohnst",
        "wohne",
        "Pri ihr sa používa wohnt."
      ],
      [
        "Ich ___ in der Slowakei.",
        "wohne",
        "wohnt",
        "wohnst",
        "wohnen",
        "Po ich má wohnen tvar wohne."
      ],
      [
        "___ wohnst du? – In Košice.",
        "Wo",
        "Wer",
        "Wie alt",
        "Was",
        "Na miesto bývania sa pýtame Wo?"
      ],
      [
        "Wo wohnt ihr? Aká odpoveď sa hodí?",
        "Wir wohnen in Wien.",
        "Ich heiße Eva.",
        "Wir sind zwölf.",
        "Das ist mein Vater.",
        "Otázka je na miesto bývania."
      ],
      [
        "Ihr ___ drei Kinder.",
        "habt",
        "hat",
        "haben",
        "hast",
        "Po ihr má haben tvar habt."
      ],
      [
        "Wo liegt Wien? – ___ Österreich.",
        "In",
        "Von",
        "Bei dem",
        "Zu",
        "Mesto Wien leží in Österreich."
      ],
      [
        "Ktorá otázka zisťuje adresu?",
        "Wie ist deine Adresse?",
        "Wie alt bist du?",
        "Wer ist das?",
        "Hast du Geschwister?",
        "Na adresu sa pýtame Wie ist deine Adresse?"
      ],
      [
        "Du wohnst in Graz. Ktorá odpoveď na Wo wohnst du? je správna?",
        "In Graz.",
        "Ich heiße Graz.",
        "Ich bin Graz.",
        "Ja, Graz.",
        "Miesto vyjadríme in Graz."
      ]
    ]
  },
  "de-05": {
    "words": [
      [
        "kuchyňa",
        "die Küche"
      ],
      [
        "obývačka",
        "das Wohnzimmer"
      ],
      [
        "spálňa",
        "das Schlafzimmer"
      ],
      [
        "detská izba",
        "das Kinderzimmer"
      ],
      [
        "kúpeľňa",
        "das Badezimmer"
      ],
      [
        "chodba",
        "der Flur"
      ],
      [
        "záhrada",
        "der Garten"
      ],
      [
        "balkón",
        "der Balkon"
      ],
      [
        "posteľ",
        "das Bett"
      ],
      [
        "pohovka",
        "das Sofa"
      ],
      [
        "stôl",
        "der Tisch"
      ],
      [
        "stolička",
        "der Stuhl"
      ],
      [
        "skriňa",
        "der Schrank"
      ],
      [
        "lampa",
        "die Lampe"
      ],
      [
        "okno",
        "das Fenster"
      ],
      [
        "dvere",
        "die Tür"
      ],
      [
        "útulný",
        "gemütlich"
      ],
      [
        "veľký",
        "groß"
      ],
      [
        "malý",
        "klein"
      ]
    ],
    "tasks": [
      [
        "Das ist ___ Bett.",
        "ein",
        "eine",
        "einen",
        "einem",
        "Bett je stredného rodu: ein Bett."
      ],
      [
        "Das ist ___ Küche.",
        "eine",
        "ein",
        "einen",
        "einem",
        "Küche je ženského rodu: eine Küche."
      ],
      [
        "Das ist ___ Tisch.",
        "ein",
        "eine",
        "einen",
        "einem",
        "Tisch je mužského rodu: ein Tisch."
      ],
      [
        "Das ist ___ Sofa. (To nie je pohovka.)",
        "kein",
        "keine",
        "keinen",
        "nicht ein",
        "Sofa je stredného rodu: kein Sofa."
      ],
      [
        "Die Küche ist klein. ___ ist klein.",
        "Sie",
        "Er",
        "Es",
        "Ich",
        "Küche má ženský rod: sie."
      ],
      [
        "Das Wohnzimmer ist gemütlich. ___ ist gemütlich.",
        "Es",
        "Sie",
        "Er",
        "Du",
        "Wohnzimmer má stredný rod: es."
      ],
      [
        "Was ___ das? – Das ist ein Tisch.",
        "ist",
        "sind",
        "bin",
        "bist",
        "Po das je sloveso ist."
      ],
      [
        "Ktoré spojenie je správne?",
        "die Lampe",
        "der Lampe",
        "das Lampe",
        "den Lampe",
        "Lampe je ženského rodu."
      ],
      [
        "Ist das eine Küche? – Nein, das ist ___ Küche.",
        "keine",
        "kein",
        "keinen",
        "nicht eine",
        "Pri Küche použijeme keine."
      ],
      [
        "Ktorá otázka sa pýta na predmet?",
        "Was ist das?",
        "Wie alt bist du?",
        "Wo wohnst du?",
        "Wer wohnt dort?",
        "Was ist das? znamená Čo je to?"
      ]
    ]
  },
  "de-06": {
    "words": [
      [
        "návšteva",
        "der Besuch"
      ],
      [
        "hosť",
        "der Gast"
      ],
      [
        "voda",
        "das Wasser"
      ],
      [
        "mlieko",
        "die Milch"
      ],
      [
        "káva",
        "der Kaffee"
      ],
      [
        "čaj",
        "der Tee"
      ],
      [
        "džús",
        "der Saft"
      ],
      [
        "pohár",
        "das Glas"
      ],
      [
        "šálka",
        "die Tasse"
      ],
      [
        "koláč",
        "der Kuchen"
      ],
      [
        "cukor",
        "der Zucker"
      ],
      [
        "piť",
        "trinken"
      ],
      [
        "jesť",
        "essen"
      ],
      [
        "radšej",
        "lieber"
      ],
      [
        "ďakujem",
        "danke"
      ],
      [
        "prosím",
        "bitte"
      ],
      [
        "chcel by som",
        "ich möchte"
      ],
      [
        "dobrý",
        "gut"
      ],
      [
        "chutný",
        "lecker"
      ]
    ],
    "tasks": [
      [
        "Ich ___ Wasser trinken.",
        "möchte",
        "möchtest",
        "möchten",
        "möchtet",
        "Ich möchte znamená ja by som chcel/chcela."
      ],
      [
        "Was ___ du trinken?",
        "möchtest",
        "möchte",
        "möchten",
        "möchtet",
        "Po du má möchte tvar möchtest."
      ],
      [
        "Was ___ Sie trinken?",
        "möchten",
        "möchte",
        "möchtest",
        "möchtet",
        "Zdvorilé Sie sa spája s möchten."
      ],
      [
        "Wie geht es ___? – Mir geht es gut.",
        "dir",
        "du",
        "dich",
        "dein",
        "Wie geht es dir? znamená Ako sa máš?"
      ],
      [
        "Mir ___ es gut.",
        "geht",
        "gehen",
        "gehe",
        "gehst",
        "Ustálená odpoveď je Mir geht es gut."
      ],
      [
        "Ich trinke ___ Glas Milch.",
        "ein",
        "eine",
        "einen",
        "einem",
        "Glas je stredného rodu: ein Glas."
      ],
      [
        "Ich möchte ___ Tasse Tee.",
        "eine",
        "ein",
        "einen",
        "einem",
        "Tasse je ženského rodu: eine Tasse."
      ],
      [
        "Ich möchte ___ Kaffee. (šálku kávy, bez počítania)",
        "einen",
        "eine",
        "ein",
        "einem",
        "Kaffee je mužského rodu a v akuzatíve einen Kaffee."
      ],
      [
        "Ktorá odpoveď je zdvorilá po ponúknutí čaju?",
        "Ja, bitte.",
        "Ich heiße Eva.",
        "Ich bin zehn.",
        "Wo wohnst du?",
        "Na ponuku môžeme odpovedať Ja, bitte."
      ],
      [
        "Was trinkst du? – Ich ___ Milch.",
        "trinke",
        "trinkst",
        "trinkt",
        "trinken",
        "Po ich má trinken tvar trinke."
      ]
    ]
  },
  "de-07": {
    "words": [
      [
        "mačka",
        "die Katze"
      ],
      [
        "pes",
        "der Hund"
      ],
      [
        "králik",
        "das Kaninchen"
      ],
      [
        "škrečok",
        "der Hamster"
      ],
      [
        "zviera",
        "das Tier"
      ],
      [
        "vták",
        "der Vogel"
      ],
      [
        "ryba",
        "der Fisch"
      ],
      [
        "myš",
        "die Maus"
      ],
      [
        "korytnačka",
        "die Schildkröte"
      ],
      [
        "farba",
        "die Farbe"
      ],
      [
        "biely",
        "weiß"
      ],
      [
        "čierny",
        "schwarz"
      ],
      [
        "hnedý",
        "braun"
      ],
      [
        "sivý",
        "grau"
      ],
      [
        "malý",
        "klein"
      ],
      [
        "veľký",
        "groß"
      ],
      [
        "rýchly",
        "schnell"
      ],
      [
        "pomalý",
        "langsam"
      ],
      [
        "zlatý",
        "golden"
      ]
    ],
    "tasks": [
      [
        "Das ist ___ Katze.",
        "eine",
        "ein",
        "einen",
        "einem",
        "Katze je ženského rodu: eine Katze."
      ],
      [
        "Das ist ___ Hund.",
        "ein",
        "eine",
        "einen",
        "einem",
        "Hund je mužského rodu: ein Hund."
      ],
      [
        "Die Katze ___ schwarz.",
        "ist",
        "sind",
        "bin",
        "bist",
        "Katze je jednotné číslo: sie ist."
      ],
      [
        "Die Hunde ___ groß.",
        "sind",
        "ist",
        "bin",
        "bist",
        "Hunde je množné číslo: sie sind."
      ],
      [
        "Das Kaninchen ist klein. ___ ist klein.",
        "Es",
        "Sie",
        "Er",
        "Wir",
        "Kaninchen je stredný rod: es."
      ],
      [
        "Ktoré spojenie pomenúva psa?",
        "der Hund",
        "die Hund",
        "das Hund",
        "ein Hundin",
        "Hund je mužského rodu."
      ],
      [
        "Ich habe ___ Katze.",
        "eine",
        "ein",
        "einen",
        "einem",
        "Katze je ženského rodu aj v akuzatíve: eine Katze."
      ],
      [
        "Ich habe ___ Hund.",
        "einen",
        "ein",
        "eine",
        "einem",
        "Hund je mužského rodu a v akuzatíve einen Hund."
      ],
      [
        "Mautzi ist eine Katze. Welches Tier ist Mautzi?",
        "Eine Katze.",
        "Ein Hund.",
        "Ein Vogel.",
        "Ein Kaninchen.",
        "Katze znamená mačka."
      ],
      [
        "Die Katze ist weiß. Akú má farbu?",
        "Bielu",
        "Čiernu",
        "Hnedú",
        "Sivú",
        "Weiß znamená biely."
      ]
    ]
  },
  "de-08": {
    "words": [
      [
        "sused",
        "der Nachbar"
      ],
      [
        "susedka",
        "die Nachbarin"
      ],
      [
        "susedia",
        "die Nachbarn"
      ],
      [
        "priateľský",
        "freundlich"
      ],
      [
        "milý",
        "nett"
      ],
      [
        "hlasný",
        "laut"
      ],
      [
        "tichý",
        "leise"
      ],
      [
        "nový",
        "neu"
      ],
      [
        "starý",
        "alt"
      ],
      [
        "pomáhať",
        "helfen"
      ],
      [
        "rozprávať",
        "sprechen"
      ],
      [
        "bývať",
        "wohnen"
      ],
      [
        "rodinný dom",
        "das Einfamilienhaus"
      ],
      [
        "bytovka",
        "das Wohnhaus"
      ],
      [
        "poschodie",
        "der Stock"
      ],
      [
        "vchod",
        "der Eingang"
      ],
      [
        "výťah",
        "der Aufzug"
      ],
      [
        "záhrada",
        "der Garten"
      ],
      [
        "ulica",
        "die Straße"
      ]
    ],
    "tasks": [
      [
        "Der Nachbar ___ nett.",
        "ist",
        "sind",
        "bin",
        "bist",
        "Nachbar je jednotné číslo: er ist."
      ],
      [
        "Die Nachbarn ___ freundlich.",
        "sind",
        "ist",
        "bin",
        "bist",
        "Nachbarn je množné číslo: sie sind."
      ],
      [
        "___ wohnt neben uns? – Herr Müller.",
        "Wer",
        "Wo",
        "Was",
        "Wie viele",
        "Wer znamená kto."
      ],
      [
        "Die Nachbarin ___ Frau Koch.",
        "heißt",
        "heiße",
        "heißen",
        "heißt du",
        "Pri sie má heißen tvar heißt."
      ],
      [
        "Wir ___ nette Nachbarn.",
        "haben",
        "hat",
        "hast",
        "habe",
        "Po wir sa používa haben."
      ],
      [
        "Der Aufzug ist neu. ___ ist neu.",
        "Er",
        "Sie",
        "Es",
        "Wir",
        "Aufzug je mužský rod: er."
      ],
      [
        "Die Straße ist ruhig. ___ ist ruhig.",
        "Sie",
        "Er",
        "Es",
        "Ihr",
        "Straße má ženský rod: sie."
      ],
      [
        "Das Wohnhaus ___ groß.",
        "ist",
        "sind",
        "bin",
        "bist",
        "Wohnhaus je stredný rod, jednotné číslo."
      ],
      [
        "Ich wohne ___ einem Haus.",
        "in",
        "von",
        "mit",
        "zu",
        "Na vyjadrenie miesta bývania používame in."
      ],
      [
        "Ktorá odpoveď sedí na Wie ist dein Nachbar?",
        "Er ist freundlich.",
        "Er wohnt in Wien.",
        "Er heißt Paul.",
        "Er ist zwölf Jahre alt.",
        "Otázka Wie ist...? sa pýta na vlastnosť."
      ]
    ]
  },
  "de-09": {
    "words": [
      [
        "chlieb",
        "das Brot"
      ],
      [
        "rožok",
        "das Brötchen"
      ],
      [
        "maslo",
        "die Butter"
      ],
      [
        "syr",
        "der Käse"
      ],
      [
        "šunka",
        "der Schinken"
      ],
      [
        "jablko",
        "der Apfel"
      ],
      [
        "banán",
        "die Banane"
      ],
      [
        "pomaranč",
        "die Orange"
      ],
      [
        "sendvič",
        "das Sandwich"
      ],
      [
        "jogurt",
        "der Joghurt"
      ],
      [
        "voda",
        "das Wasser"
      ],
      [
        "mlieko",
        "die Milch"
      ],
      [
        "džús",
        "der Saft"
      ],
      [
        "hlad",
        "der Hunger"
      ],
      [
        "smäd",
        "der Durst"
      ],
      [
        "prestávka",
        "die Pause"
      ],
      [
        "jesť",
        "essen"
      ],
      [
        "piť",
        "trinken"
      ],
      [
        "cena",
        "der Preis"
      ]
    ],
    "tasks": [
      [
        "Ich ___ ein Brot.",
        "esse",
        "isst",
        "essen",
        "esst",
        "Po ich má essen tvar esse."
      ],
      [
        "Du ___ einen Apfel.",
        "isst",
        "esse",
        "essen",
        "esst",
        "Po du má essen nepravidelný tvar isst."
      ],
      [
        "Er ___ einen Joghurt.",
        "isst",
        "esse",
        "essen",
        "esst",
        "Po er má essen tvar isst."
      ],
      [
        "Was ___ du in der Pause?",
        "isst",
        "esse",
        "essen",
        "esst",
        "Po du má essen tvar isst."
      ],
      [
        "Ich nehme ___ Apfel.",
        "einen",
        "ein",
        "eine",
        "einem",
        "Apfel je mužského rodu: einen Apfel."
      ],
      [
        "Ich kaufe ___ Banane.",
        "eine",
        "ein",
        "einen",
        "einem",
        "Banane je ženského rodu: eine Banane."
      ],
      [
        "Ich habe ___ Hunger. (Nemám hlad.)",
        "keinen",
        "kein",
        "keine",
        "nicht",
        "Hunger je mužský rod v akuzatíve: keinen Hunger."
      ],
      [
        "Was kostet das? Čo tá otázka znamená?",
        "Koľko to stojí?",
        "Ako sa voláš?",
        "Kde bývaš?",
        "Koľko máš rokov?",
        "Was kostet das? sa pýta na cenu."
      ],
      [
        "Was trinkst du? – Ich ___ Wasser.",
        "trinke",
        "trinkst",
        "trinkt",
        "trinken",
        "Po ich má trinken tvar trinke."
      ],
      [
        "Ktorý člen má Wort „Käse“?",
        "der",
        "die",
        "das",
        "den",
        "Käse je mužského rodu."
      ]
    ]
  },
  "de-10": {
    "words": [
      [
        "škola",
        "die Schule"
      ],
      [
        "školská taška",
        "die Schultasche"
      ],
      [
        "peračník",
        "das Mäppchen"
      ],
      [
        "pero",
        "der Kugelschreiber"
      ],
      [
        "ceruzka",
        "der Bleistift"
      ],
      [
        "guma",
        "der Radiergummi"
      ],
      [
        "pravítko",
        "das Lineal"
      ],
      [
        "zošit",
        "das Heft"
      ],
      [
        "kniha",
        "das Buch"
      ],
      [
        "učebnica",
        "das Schulbuch"
      ],
      [
        "stôl",
        "der Tisch"
      ],
      [
        "tabuľa",
        "die Tafel"
      ],
      [
        "učiteľ",
        "der Lehrer"
      ],
      [
        "učiteľka",
        "die Lehrerin"
      ],
      [
        "nemčina",
        "Deutsch"
      ],
      [
        "matematika",
        "Mathe"
      ],
      [
        "pondelok",
        "Montag"
      ],
      [
        "utorok",
        "Dienstag"
      ],
      [
        "streda",
        "Mittwoch"
      ],
      [
        "štvrtok",
        "Donnerstag"
      ],
      [
        "piatok",
        "Freitag"
      ]
    ],
    "tasks": [
      [
        "Ich brauche ___ Bleistift.",
        "einen",
        "ein",
        "eine",
        "einem",
        "Bleistift je mužského rodu: einen Bleistift."
      ],
      [
        "Ich brauche ___ Heft.",
        "ein",
        "eine",
        "einen",
        "einem",
        "Heft je stredného rodu: ein Heft."
      ],
      [
        "Ich brauche ___ Schultasche.",
        "eine",
        "ein",
        "einen",
        "einem",
        "Schultasche je ženského rodu: eine Schultasche."
      ],
      [
        "Ich ___ Deutsch toll.",
        "finde",
        "findest",
        "findet",
        "finden",
        "Po ich má finden tvar finde."
      ],
      [
        "Du ___ Mathe gut.",
        "findest",
        "finde",
        "findet",
        "finden",
        "Po du je tvar findest."
      ],
      [
        "___ Montag habe ich Deutsch.",
        "Am",
        "Im",
        "Um",
        "Von",
        "Pri dňoch týždňa sa používa am."
      ],
      [
        "Heute ist Dienstag. Morgen ist ___.",
        "Mittwoch",
        "Montag",
        "Freitag",
        "Sonntag",
        "Po utorku je streda."
      ],
      [
        "Heute ist Donnerstag. Gestern war ___.",
        "Mittwoch",
        "Freitag",
        "Dienstag",
        "Samstag",
        "Pred štvrtkom je streda."
      ],
      [
        "Was brauchst du? – Ich brauche ___ Radiergummi.",
        "einen",
        "ein",
        "eine",
        "einem",
        "Radiergummi je mužského rodu."
      ],
      [
        "Die Bücher ___ neu.",
        "sind",
        "ist",
        "bin",
        "bist",
        "Množné číslo Bücher sa spája so sind."
      ]
    ]
  },
  "de-11": {
    "words": [
      [
        "televízia",
        "das Fernsehen"
      ],
      [
        "televízor",
        "der Fernseher"
      ],
      [
        "film",
        "der Film"
      ],
      [
        "správy",
        "die Nachrichten"
      ],
      [
        "seriál",
        "die Serie"
      ],
      [
        "kreslený film",
        "der Zeichentrickfilm"
      ],
      [
        "šport",
        "der Sport"
      ],
      [
        "futbal",
        "der Fußball"
      ],
      [
        "hudba",
        "die Musik"
      ],
      [
        "program",
        "das Programm"
      ],
      [
        "začiatok",
        "der Anfang"
      ],
      [
        "koniec",
        "das Ende"
      ],
      [
        "zaujímavý",
        "interessant"
      ],
      [
        "nudný",
        "langweilig"
      ],
      [
        "pozerať sa",
        "sehen"
      ],
      [
        "počúvať",
        "hören"
      ],
      [
        "dnes",
        "heute"
      ],
      [
        "zajtra",
        "morgen"
      ],
      [
        "večer",
        "der Abend"
      ]
    ],
    "tasks": [
      [
        "Was ___ es heute im Fernsehen?",
        "gibt",
        "geben",
        "gebt",
        "gebe",
        "Ustálená otázka je Was gibt es...?"
      ],
      [
        "Der Film ___ interessant.",
        "ist",
        "sind",
        "bin",
        "bist",
        "Film je jednotné číslo: er ist."
      ],
      [
        "Die Nachrichten ___ um acht.",
        "sind",
        "ist",
        "bin",
        "bist",
        "Nachrichten je množné číslo."
      ],
      [
        "Ich ___ gern Filme.",
        "sehe",
        "siehst",
        "sieht",
        "sehen",
        "Po ich má sehen tvar sehe."
      ],
      [
        "Du ___ gern fern.",
        "siehst",
        "sehe",
        "sehen",
        "sieht",
        "Po du má sehen tvar siehst."
      ],
      [
        "Wir ___ Musik.",
        "hören",
        "hört",
        "hörst",
        "höre",
        "Po wir má hören tvar hören."
      ],
      [
        "Was siehst du gern? – Ich sehe gern ___.",
        "Filme",
        "Schule",
        "Milch",
        "Bleistift",
        "Na otázku o sledovaní sa hodia Filme."
      ],
      [
        "Der Film ist langweilig. Aký je film?",
        "Nudný",
        "Zaujímavý",
        "Nový",
        "Hlasný",
        "Langweilig znamená nudný."
      ],
      [
        "___ Fernsehen gibt es einen Film.",
        "Im",
        "Am",
        "Um",
        "Von",
        "V televízii sa povie im Fernsehen."
      ],
      [
        "Sie ___ einen Film.",
        "sieht",
        "sehe",
        "siehst",
        "sehen",
        "Po sie v jednotnom čísle má sehen tvar sieht."
      ]
    ]
  },
  "de-12": {
    "words": [
      [
        "vstávať",
        "aufstehen"
      ],
      [
        "raňajkovať",
        "frühstücken"
      ],
      [
        "ísť do školy",
        "zur Schule gehen"
      ],
      [
        "učiť sa",
        "lernen"
      ],
      [
        "domáca úloha",
        "die Hausaufgabe"
      ],
      [
        "hrať sa",
        "spielen"
      ],
      [
        "spať",
        "schlafen"
      ],
      [
        "hodina",
        "die Stunde"
      ],
      [
        "minúta",
        "die Minute"
      ],
      [
        "polovica",
        "halb"
      ],
      [
        "štvrť",
        "das Viertel"
      ],
      [
        "ráno",
        "der Morgen"
      ],
      [
        "poludnie",
        "der Mittag"
      ],
      [
        "večer",
        "der Abend"
      ],
      [
        "noc",
        "die Nacht"
      ],
      [
        "vždy",
        "immer"
      ],
      [
        "niekedy",
        "manchmal"
      ],
      [
        "často",
        "oft"
      ],
      [
        "nikdy",
        "nie"
      ],
      [
        "hodiny",
        "die Uhr"
      ]
    ],
    "tasks": [
      [
        "Ich ___ um sieben Uhr auf.",
        "stehe",
        "stehst",
        "steht",
        "stehen",
        "Po ich má aufstehen tvar stehe ... auf."
      ],
      [
        "Du ___ um sechs Uhr auf.",
        "stehst",
        "stehe",
        "steht",
        "stehen",
        "Po du má aufstehen tvar stehst ... auf."
      ],
      [
        "Er ___ um acht Uhr auf.",
        "steht",
        "stehe",
        "stehst",
        "stehen",
        "Po er má aufstehen tvar steht ... auf."
      ],
      [
        "Um wie viel Uhr ___ du auf?",
        "stehst",
        "stehe",
        "stehen",
        "steht",
        "Pri du sa používa stehst ... auf."
      ],
      [
        "Ich ___ um sieben Uhr.",
        "frühstücke",
        "frühstückt",
        "frühstückst",
        "frühstücken",
        "Po ich má frühstücken tvar frühstücke."
      ],
      [
        "Um 7:30 je po nemecky...",
        "halb acht",
        "halb sieben",
        "acht Uhr dreißig",
        "Viertel vor sieben",
        "Halb acht znamená pol ôsmej (7:30)."
      ],
      [
        "Um 6:15 je po nemecky...",
        "Viertel nach sechs",
        "Viertel vor sechs",
        "halb sechs",
        "Viertel nach sieben",
        "Viertel nach sechs znamená štvrť po šiestej."
      ],
      [
        "Um 9:45 je po nemecky...",
        "Viertel vor zehn",
        "Viertel nach neun",
        "halb zehn",
        "Viertel vor neun",
        "Viertel vor zehn znamená trištvrte na desať."
      ],
      [
        "___ Montag stehe ich früh auf.",
        "Am",
        "Um",
        "Im",
        "Von",
        "Pri dňoch týždňa používame am."
      ],
      [
        "___ sieben Uhr stehe ich auf.",
        "Um",
        "Am",
        "Im",
        "Zu",
        "Presný čas sa vyjadruje predložkou um."
      ]
    ]
  }
};
export const germanLessonIds = Object.keys(germanLessons) as GermanLessonId[];
export const germanBankSize = Object.values(germanLessons).reduce((sum, lesson) => sum + lesson.words.length * 2 + lesson.tasks.length, 0);
