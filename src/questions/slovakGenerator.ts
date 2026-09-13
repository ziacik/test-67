import type { Question, SlovakTopicId } from "./types";

type SlovakConcreteTopicId = Exclude<SlovakTopicId, "sk-mixed">;

type ChoiceSpec = {
	prompt: string;
	answer: string;
	choices: string[];
	explanation: string;
	hint?: string;
};

function pick<T>(values: readonly T[]): T {
	return values[Math.floor(Math.random() * values.length)];
}

function shuffle<T>(values: readonly T[]): T[] {
	const result = [...values];
	for (let index = result.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(Math.random() * (index + 1));
		[result[index], result[swapIndex]] = [result[swapIndex], result[index]];
	}
	return result;
}

function questionId() {
	return "sk-" + Math.random().toString(36).slice(2, 10);
}

function fromSpec(topic: SlovakConcreteTopicId, spec: ChoiceSpec): Question {
	return {
		id: questionId(),
		topic,
		prompt: spec.prompt,
		answer: spec.answer,
		choices: shuffle(spec.choices),
		hint: spec.hint,
		explanation: spec.explanation,
	};
}

const spelling: ChoiceSpec[] = [
	{
		prompt: "Doplň správne písmeno: b__strý chlapec",
		answer: "y",
		choices: ["i", "í", "y", "ý"],
		explanation: "Slovo bystrý patrí medzi vybrané slová po b, preto píšeme y.",
	},
	{
		prompt: "Doplň správne písmeno: m__dlo",
		answer: "y",
		choices: ["i", "í", "y", "ý"],
		explanation: "Mydlo je vybrané slovo po m.",
	},
	{
		prompt: "Doplň správne písmeno: p__tať sa",
		answer: "ý",
		choices: ["i", "í", "y", "ý"],
		explanation: "Pýtať sa patrí medzi vybrané slová po p a píše sa s dlhým ý.",
	},
	{
		prompt: "Doplň správne písmeno: r__chly vlak",
		answer: "ý",
		choices: ["i", "í", "y", "ý"],
		explanation: "Rýchly je vybrané slovo po r.",
	},
	{
		prompt: "Doplň správne písmeno: v__dra pláva",
		answer: "y",
		choices: ["i", "í", "y", "ý"],
		explanation: "Vydra je vybrané slovo po v.",
	},
	{
		prompt: "Doplň správne písmeno: l__žica",
		answer: "y",
		choices: ["i", "í", "y", "ý"],
		explanation: "Lyžica sa píše s y.",
	},
	{
		prompt: "Doplň správne písmeno: t__chý hlas",
		answer: "i",
		choices: ["i", "í", "y", "ý"],
		explanation: "V slove tichý píšeme po t mäkké i.",
	},
	{
		prompt: "Doplň správne písmeno: š__roká cesta",
		answer: "i",
		choices: ["i", "í", "y", "ý"],
		explanation: "Slovo široký sa píše s i.",
	},
	{
		prompt: "Doplň správne písmeno: cudz__ človek",
		answer: "í",
		choices: ["i", "í", "y", "ý"],
		explanation: "Prídavné meno cudzí má v základnom tvare dlhé í.",
	},
	{
		prompt: "Doplň správne písmeno: mal__ chlapci",
		answer: "í",
		choices: ["i", "í", "y", "ý"],
		explanation: "V množnom čísle pri mužskom životnom rode píšeme malí chlapci.",
	},
	{
		prompt: "Doplň správne písmeno: dobr__ kamarát",
		answer: "ý",
		choices: ["i", "í", "y", "ý"],
		explanation: "V jednotnom čísle mužského rodu je správny tvar dobrý.",
	},
	{
		prompt: "Doplň správne písmeno: dobr__ kamaráti",
		answer: "í",
		choices: ["i", "í", "y", "ý"],
		explanation: "Pri mužskom životnom rode v množnom čísle je správny tvar dobrí.",
	},
	{
		prompt: "Ktorý tvar je napísaný správne?",
		answer: "krásny",
		choices: ["krásny", "krásný", "krásni", "krásní"],
		explanation: "Po dlhej slabike sa v tomto tvare uplatňuje rytmické krátenie: krásny.",
	},
	{
		prompt: "Ktorý tvar je napísaný správne?",
		answer: "biely",
		choices: ["biely", "bielý", "bieli", "bielí"],
		explanation: "Správny základný tvar je biely.",
	},
	{
		prompt: "Ktoré slovo je napísané správne?",
		answer: "myšlienka",
		choices: ["myšlienka", "mišlienka", "myšlianka", "mišlianka"],
		explanation: "Slovo myšlienka je odvodené od vybraného slova myslieť.",
	},
	{
		prompt: "Pri spodobovaní môže znieť spoluhláska inak, než sa píše. Ktorý zápis je správny?",
		answer: "prosba",
		choices: ["prosba", "prozba", "prospa", "prozpa"],
		explanation: "Píšeme prosba podľa stavby slova, hoci vo výslovnosti sa spoluhlásky prispôsobujú.",
	},
];

const nouns: ChoiceSpec[] = [
	{
		prompt: "Podstatné meno učiteľ je...",
		answer: "mužský rod, životné",
		choices: ["mužský rod, životné", "mužský rod, neživotné", "ženský rod", "stredný rod"],
		explanation: "Učiteľ označuje osobu mužského rodu, preto je životné podstatné meno.",
	},
	{
		prompt: "Ktorý vzor má podstatné meno žiak?",
		answer: "chlap",
		choices: ["chlap", "hrdina", "dub", "stroj"],
		explanation: "Žiak je mužské životné podstatné meno zakončené na spoluhlásku a skloňuje sa podľa vzoru chlap.",
	},
	{
		prompt: "Ktorý vzor má podstatné meno futbalista?",
		answer: "hrdina",
		choices: ["chlap", "hrdina", "dub", "stroj"],
		explanation: "Futbalista je mužské životné podstatné meno zakončené na -a, preto má vzor hrdina.",
	},
	{
		prompt: "Ktorý vzor má podstatné meno počítač?",
		answer: "stroj",
		choices: ["chlap", "hrdina", "dub", "stroj"],
		explanation: "Počítač je mužské neživotné podstatné meno a skloňuje sa podľa vzoru stroj.",
	},
	{
		prompt: "Ktorý vzor má podstatné meno hrad?",
		answer: "dub",
		choices: ["chlap", "hrdina", "dub", "stroj"],
		explanation: "Hrad je mužské neživotné podstatné meno a skloňuje sa podľa vzoru dub.",
	},
	{
		prompt: "Ktorý vzor má podstatné meno stanica?",
		answer: "ulica",
		choices: ["žena", "ulica", "dlaň", "kosť"],
		explanation: "Stanica je ženského rodu a skloňuje sa podľa vzoru ulica.",
	},
	{
		prompt: "Ktorý vzor má podstatné meno pieseň?",
		answer: "dlaň",
		choices: ["žena", "ulica", "dlaň", "kosť"],
		explanation: "Pieseň sa skloňuje podľa vzoru dlaň.",
	},
	{
		prompt: "Ktorý vzor má podstatné meno radosť?",
		answer: "kosť",
		choices: ["žena", "ulica", "dlaň", "kosť"],
		explanation: "Radosť sa skloňuje podľa vzoru kosť.",
	},
	{
		prompt: "Ktorý vzor má podstatné meno námestie?",
		answer: "vysvedčenie",
		choices: ["mesto", "srdce", "vysvedčenie", "dievča"],
		explanation: "Námestie je stredného rodu a skloňuje sa podľa vzoru vysvedčenie.",
	},
	{
		prompt: "Urči pád zvýrazneného spojenia: Prišiel som ZO ŠKOLY.",
		answer: "genitív",
		choices: ["nominatív", "genitív", "datív", "lokál"],
		explanation: "Pýtame sa: z koho, z čoho? Zo školy — genitív.",
	},
	{
		prompt: "Urči pád zvýrazneného spojenia: Hovoríme O ŠKOLE.",
		answer: "lokál",
		choices: ["akuzatív", "datív", "lokál", "inštrumentál"],
		explanation: "Pýtame sa: o kom, o čom? O škole — lokál.",
	},
	{
		prompt: "Urči pád zvýrazneného spojenia: Idem SO SESTROU.",
		answer: "inštrumentál",
		choices: ["genitív", "datív", "akuzatív", "inštrumentál"],
		explanation: "Pýtame sa: s kým, s čím? So sestrou — inštrumentál.",
	},
	{
		prompt: "Prídavné meno školský je...",
		answer: "vzťahové",
		choices: ["akostné", "vzťahové", "privlastňovacie", "zámeno"],
		explanation: "Školský vyjadruje vzťah ku škole, preto je vzťahové prídavné meno.",
	},
	{
		prompt: "Prídavné meno pekný je...",
		answer: "akostné",
		choices: ["akostné", "vzťahové", "privlastňovacie", "číslovka"],
		explanation: "Pekný pomenúva vlastnosť, ktorú možno stupňovať.",
	},
	{
		prompt: "Ktorý tvar je 3. stupeň prídavného mena vysoký?",
		answer: "najvyšší",
		choices: ["vysoký", "vyšší", "najvyšší", "vysokejší"],
		explanation: "Stupňovanie je vysoký — vyšší — najvyšší.",
	},
	{
		prompt: "Podľa ktorého vzoru sa skloňuje prídavné meno svieži?",
		answer: "cudzí",
		choices: ["pekný", "cudzí", "páví", "otcov"],
		explanation: "Svieži má mäkké zakončenie ako vzor cudzí.",
	},
];

const vocabulary: ChoiceSpec[] = [
	{
		prompt: "Ktorá dvojica sú synonymá?",
		answer: "pekný – krásny",
		choices: ["pekný – krásny", "pekný – škaredý", "rýchly – pomaly", "malý – veľký"],
		explanation: "Synonymá sú slová s rovnakým alebo veľmi podobným významom.",
	},
	{
		prompt: "Ktorá dvojica sú antonymá?",
		answer: "odvážny – bojazlivý",
		choices: ["odvážny – bojazlivý", "odvážny – smelý", "dom – obydlie", "hovoriť – rozprávať"],
		explanation: "Antonymá majú opačný význam.",
	},
	{
		prompt: "Ktoré slovo je viacvýznamové?",
		answer: "koruna",
		choices: ["koruna", "žirafa", "semafor", "pondelok"],
		explanation: "Koruna môže byť napríklad časť stromu, kráľovská koruna aj názov meny.",
	},
	{
		prompt: "Ktorá dvojica obsahuje spisovné slovo a jeho nárečový variant?",
		answer: "zemiaky – krumple",
		choices: ["zemiaky – krumple", "stôl – stolička", "okno – dvere", "bežať – chodiť"],
		explanation: "Zemiaky je spisovné pomenovanie, krumple je nárečové.",
	},
	{
		prompt: "Ktoré spojenie je prirovnanie?",
		answer: "biely ako sneh",
		choices: ["biely ako sneh", "biely sneh", "sneh padá", "snehová guľa"],
		explanation: "Prirovnanie porovnáva dve veci, často pomocou slov ako alebo sťa.",
	},
	{
		prompt: "Ktorá veta je pranostika?",
		answer: "Medardova kvapka štyridsať dní kvapká.",
		choices: [
			"Medardova kvapka štyridsať dní kvapká.",
			"Bez práce nie sú koláče.",
			"Kto neskoro chodí, sám sebe škodí.",
			"Ráno som zaspal do školy.",
		],
		explanation: "Pranostiky sú ľudové výroky spojené najmä s počasím, prírodou a hospodárskym rokom.",
	},
	{
		prompt: "Ktoré spojenie je ustálené slovné spojenie?",
		answer: "mať hlavu v oblakoch",
		choices: ["mať hlavu v oblakoch", "mať novú čiapku", "pozerať na oblohu", "nakresliť oblak"],
		explanation: "Mať hlavu v oblakoch sa nepoužíva doslovne, ale ako ustálené obrazné spojenie.",
	},
	{
		prompt: "Čo najlepšie vystihuje slovnú zásobu človeka?",
		answer: "súbor slov, ktoré pozná a používa",
		choices: [
			"súbor slov, ktoré pozná a používa",
			"iba slová v pravopisnom slovníku",
			"iba vybrané slová",
			"všetky písmená abecedy",
		],
		explanation: "Slovná zásoba je súbor slov, ktoré človek pozná a používa.",
	},
];

const sentences: ChoiceSpec[] = [
	{
		prompt: "Aký druh vety podľa obsahu je: Kedy príde autobus?",
		answer: "opytovacia",
		choices: ["oznamovacia", "opytovacia", "rozkazovacia", "želacia"],
		explanation: "Veta sa na niečo pýta a končí otáznikom.",
	},
	{
		prompt: "Aký druh vety podľa obsahu je: Zavri, prosím, okno.",
		answer: "rozkazovacia",
		choices: ["oznamovacia", "opytovacia", "rozkazovacia", "zvolacia"],
		explanation: "Veta vyjadruje príkaz alebo výzvu.",
	},
	{
		prompt: "Aký druh vety podľa obsahu je: Kiež by zajtra svietilo slnko!",
		answer: "želacia",
		choices: ["oznamovacia", "opytovacia", "želacia", "rozkazovacia"],
		explanation: "Veta vyjadruje želanie.",
	},
	{
		prompt: "Ktorá veta má prirodzený a zrozumiteľný slovosled?",
		answer: "Oli dnes číta novú knihu.",
		choices: [
			"Oli dnes číta novú knihu.",
			"Novú dnes knihu Oli číta.",
			"Číta knihu dnes Oli novú.",
			"Dnes novú Oli knihu číta.",
		],
		explanation: "Slovosled má byť zrozumiteľný a má prirodzene usporiadať význam vety.",
	},
	{
		prompt: "Ktoré interpunkčné znamienko patrí na koniec vety: Prídeš zajtra",
		answer: "?",
		choices: [".", "?", "!", ","],
		explanation: "Je to otázka, preto patrí na koniec otáznik.",
	},
	{
		prompt: "Ktorá veta je oznamovacia?",
		answer: "V sobotu ideme na výlet.",
		choices: [
			"V sobotu ideme na výlet.",
			"Ideme v sobotu na výlet?",
			"Poď v sobotu na výlet!",
			"Kiež by sme išli na výlet!",
		],
		explanation: "Oznamovacia veta podáva informáciu.",
	},
	{
		prompt: "Ktorý zápis priamej reči je správny?",
		answer: "Mama povedala: „Príď načas.“",
		choices: [
			"Mama povedala: „Príď načas.“",
			"Mama povedala „Príď načas“.",
			"Mama povedala, „Príď načas.“",
			"Mama povedala. „Príď načas“",
		],
		explanation: "Po uvádzacej vete je dvojbodka a priama reč je v úvodzovkách.",
	},
];

const reading: ChoiceSpec[] = [
	{
		prompt: "Prečítaj: „Nina našla pri chodníku malé mača. Tráslo sa od zimy, preto ho zabalila do mikiny a odniesla domov.“ Aká je hlavná myšlienka?",
		answer: "Nina pomohla opustenému mačaťu.",
		choices: [
			"Nina pomohla opustenému mačaťu.",
			"Nina si kúpila novú mikinu.",
			"Mača ušlo z domu.",
			"Na chodníku bolo veľa ľudí.",
		],
		explanation: "Hlavná myšlienka vystihuje najdôležitejšie posolstvo celého textu.",
	},
	{
		prompt: "Prečítaj: „Ráno pršalo, poobede sa vyjasnilo a večer sa znova spustil lejak.“ Aká je téma textu?",
		answer: "zmeny počasia počas dňa",
		choices: ["zmeny počasia počas dňa", "školský výlet", "ročné obdobia", "predpoveď na celý týždeň"],
		explanation: "Téma stručne pomenúva, o čom text je.",
	},
	{
		prompt: "Ktorý útvar je najvhodnejší, keď sa pýtame hosťa pripravené otázky a zapisujeme jeho odpovede?",
		answer: "interview",
		choices: ["interview", "recept", "pozvánka", "báseň"],
		explanation: "Cielený rozhovor — interview — je založený na otázkach a odpovediach.",
	},
	{
		prompt: "Ktoré poradie patrí do opisu pracovného postupu pri príprave čaju?",
		answer: "zovrieť vodu → zaliať čaj → nechať vylúhovať",
		choices: [
			"zovrieť vodu → zaliať čaj → nechať vylúhovať",
			"nechať vylúhovať → zovrieť vodu → zaliať čaj",
			"zaliať čaj → vypiť ho → zovrieť vodu",
			"vypiť čaj → zaliať čaj → zovrieť vodu",
		],
		explanation: "Pracovný postup musí zachytiť jednotlivé kroky v logickom poradí.",
	},
	{
		prompt: "Ktorá ukážka je rozprávanie s prvkami opisu?",
		answer: "Vošiel som do tmavej, úzkej chodby. Dvere za mnou buchli a ja som sa rozbehol.",
		choices: [
			"Vošiel som do tmavej, úzkej chodby. Dvere za mnou buchli a ja som sa rozbehol.",
			"Chodba je miestnosť spájajúca ostatné izby.",
			"Najprv otvor dvere, potom prejdi chodbou.",
			"Chodba má dĺžku päť metrov.",
		],
		explanation: "Ukážka rozvíja dej a zároveň opisuje prostredie.",
	},
	{
		prompt: "Ktorý nadpis najlepšie vystihuje text: „Včely opeľujú rastliny a bez nich by mnohé plodiny prinášali omnoho menej úrody.“",
		answer: "Prečo sú včely dôležité",
		choices: ["Prečo sú včely dôležité", "Ako postaviť úľ", "Najväčší hmyz sveta", "Dejiny medu"],
		explanation: "Dobrý nadpis stručne a presne pomenúva jadro textu.",
	},
];

const literature: ChoiceSpec[] = [
	{
		prompt: "Ktorý literárny žáner rozpráva o živote svätcov a spája reálne prvky so zázračnými?",
		answer: "legenda",
		choices: ["legenda", "bájka", "povesť", "komiks"],
		explanation: "Legenda je príbeh spätý najmä so životom svätcov a náboženskou tradíciou.",
	},
	{
		prompt: "Ako sa nazýva povesť, ktorá vznikala medzi ľuďmi a nemá známeho autora?",
		answer: "ľudová povesť",
		choices: ["ľudová povesť", "autorská povesť", "román", "anekdota"],
		explanation: "Ľudová povesť sa tradovala ústne a jej autor nie je známy.",
	},
	{
		prompt: "Ktorá veta obsahuje personifikáciu?",
		answer: "Vietor si pospevoval medzi stromami.",
		choices: [
			"Vietor si pospevoval medzi stromami.",
			"Vietor bol veľmi silný.",
			"Stromy sa ohýbali vo vetre.",
			"Na kopci fúkal vietor.",
		],
		explanation: "Personifikácia pripisuje neživej veci alebo prírode ľudskú vlastnosť či činnosť.",
	},
	{
		prompt: "Ktoré spojenie je epiteton — básnický prívlastok?",
		answer: "strieborný mesiac",
		choices: ["strieborný mesiac", "mesiac svieti", "veľký stôl", "tri mesiace"],
		explanation: "Epiteton je obrazný, umelecky pôsobiaci prívlastok.",
	},
	{
		prompt: "Ako sa nazýva opakujúca sa časť piesne?",
		answer: "refrén",
		choices: ["refrén", "kapitola", "odsek", "scenár"],
		explanation: "Refrén sa v piesni pravidelne opakuje.",
	},
	{
		prompt: "Kto v literárnom texte sprostredkúva príbeh čitateľovi?",
		answer: "rozprávač",
		choices: ["rozprávač", "režisér", "divák", "ilustrátor"],
		explanation: "Rozprávač je ten, cez koho je príbeh podaný.",
	},
	{
		prompt: "Ako sa nazýva text určený pre film alebo divadelnú inscenáciu, v ktorom sú repliky a pokyny?",
		answer: "scenár",
		choices: ["scenár", "refrén", "encyklopédia", "povesť"],
		explanation: "Scenár obsahuje dej, repliky a pokyny pre realizáciu filmu či predstavenia.",
	},
	{
		prompt: "Ktorá kniha patrí medzi náučnú literatúru?",
		answer: "encyklopédia zvierat",
		choices: ["encyklopédia zvierat", "zbierka rozprávok", "komiks", "básnická zbierka"],
		explanation: "Náučná literatúra prináša vecné poznatky; typickým príkladom je encyklopédia.",
	},
	{
		prompt: "Čo je typické pre nonsens v literatúre?",
		answer: "zámerná nezmyselnosť a hra s logikou",
		choices: [
			"zámerná nezmyselnosť a hra s logikou",
			"presný pracovný postup",
			"iba historicky overené fakty",
			"vždy smutný záver",
		],
		explanation: "Nonsens zámerne narúša bežnú logiku a využíva absurdnosť či slovnú hru.",
	},
	{
		prompt: "Čo odlišuje pieseň od bežnej básne?",
		answer: "je určená na spievanie a spája text s melódiou",
		choices: [
			"je určená na spievanie a spája text s melódiou",
			"nemôže mať rým",
			"nemá verše",
			"musí byť vždy ľudová",
		],
		explanation: "Pieseň spája slovesnú a hudobnú zložku.",
	},
];

const banks: Record<SlovakConcreteTopicId, readonly ChoiceSpec[]> = {
	"sk-spelling": spelling,
	"sk-nouns": nouns,
	"sk-vocabulary": vocabulary,
	"sk-sentences": sentences,
	"sk-reading": reading,
	"sk-literature": literature,
};

const concreteTopics = Object.keys(banks) as SlovakConcreteTopicId[];

export const slovakCurriculumCoverage = [
	"spelling-i-y-selected-words-and-derived-words",
	"rhythmic-shortening-and-voicing",
	"noun-gender-number-case-life-and-declension-patterns",
	"adjective-quality-relation-grading-and-patterns",
	"vocabulary-synonyms-antonyms-polysemy-standard-language-and-dialects",
	"proverb-pranostika-comparison-and-fixed-expressions",
	"sentence-types-word-order-and-punctuation",
	"main-idea-topic-notes-and-reading-comprehension",
	"narration-with-description-work-procedure-and-interview",
	"song-legend-folk-and-authored-tale",
	"narrator-dialogue-personification-epithet-nonsense",
	"rhythm-and-refrain",
] as const;

export function generateSlovakQuestion(topic: SlovakTopicId): Question {
	const resolved = topic === "sk-mixed" ? pick(concreteTopics) : topic;
	return fromSpec(resolved, pick(banks[resolved]));
}

export function generateSlovakRoundQuestion(topic: SlovakTopicId, _index: number): Question {
	return generateSlovakQuestion(topic);
}
