import type { SpellingQuestionSpec } from "./slovakSpelling";
import { spellingQuestions } from "./slovakSpelling";

export type ChoiceSpec = {
	prompt: string;
	answer: string;
	choices: string[];
	explanation: string;
	hint?: string;
};

function choice(prompt: string, answer: string, choices: string[], explanation: string): ChoiceSpec {
	return { prompt, answer, choices, explanation };
}

const nounPatternWords = {
	"chlap": [
		"žiak",
		"učiteľ",
		"chlapec",
		"lekár",
		"sused",
		"kamarát",
		"brat",
		"otec",
		"syn",
		"žiak"
	],
	"hrdina": [
		"futbalista",
		"hokejista",
		"huslista",
		"turista",
		"kolega",
		"predseda",
		"sudca",
		"hrdina"
	],
	"dub": [
		"dub",
		"hrad",
		"dom",
		"strom",
		"vlak",
		"stôl",
		"most",
		"dvor",
		"hrad"
	],
	"stroj": [
		"stroj",
		"počítač",
		"kľúč",
		"meč",
		"nôž",
		"dážď",
		"koberec",
		"ovládač"
	],
	"žena": [
		"žena",
		"mama",
		"škola",
		"kniha",
		"izba",
		"mapa",
		"lopta",
		"záhrada"
	],
	"ulica": [
		"ulica",
		"stanica",
		"lavica",
		"pivnica",
		"nemocnica",
		"knižnica",
		"hranica",
		"polica"
	],
	"dlaň": [
		"dlaň",
		"pieseň",
		"tvár",
		"myseľ",
		"posteľ"
	],
	"kosť": [
		"kosť",
		"radosť",
		"mladosť",
		"noc",
		"múdrosť",
		"starosť"
	],
	"mesto": [
		"mesto",
		"auto",
		"pero",
		"okno",
		"divadlo",
		"jablko"
	],
	"srdce": [
		"srdce",
		"vajce",
		"pole",
		"more",
		"plece"
	],
	"vysvedčenie": [
		"vysvedčenie",
		"námestie",
		"lístie",
		"prútie",
		"poschodie"
	],
	"dievča": [
		"dievča",
		"mláďa",
		"teľa",
		"žriebä",
		"mača"
	]
} as const;
const nounPatterns = Object.keys(nounPatternWords);

const nounPatternQuestions: ChoiceSpec[] = Object.entries(nounPatternWords).flatMap(([pattern, words]) =>
	words.map((word) => choice(
		`Ktorý vzor má podstatné meno „${word}“?`,
		pattern,
		[pattern, ...nounPatterns.filter((item) => item !== pattern).slice(0, 3)],
		`Podstatné meno „${word}“ sa skloňuje podľa vzoru ${pattern}.`,
	)),
);

const nounGenderQuestions: ChoiceSpec[] = [
	...["žiak","učiteľ","chlapec","lekár","sused","kamarát","brat","otec","syn","futbalista","turista","kolega"].map((word) =>
		choice(`Podstatné meno „${word}“ je...`, "mužský rod, životné", ["mužský rod, životné","mužský rod, neživotné","ženský rod","stredný rod"], `„${word}“ označuje osobu mužského rodu, preto je životné.`)
	),
	...["hrad","dom","strom","vlak","stôl","most","dvor","počítač","kľúč","meč","nôž","koberec"].map((word) =>
		choice(`Podstatné meno „${word}“ je...`, "mužský rod, neživotné", ["mužský rod, životné","mužský rod, neživotné","ženský rod","stredný rod"], `„${word}“ je mužského rodu a neoznačuje osobu ani zviera.`)
	),
	...["žena","mama","škola","kniha","izba","mapa","ulica","pieseň","radosť","noc"].map((word) =>
		choice(`Urči rod podstatného mena „${word}“.`, "ženský rod", ["mužský rod","ženský rod","stredný rod","nedá sa určiť"], `„${word}“ je ženského rodu.`)
	),
	...["mesto","auto","pero","okno","srdce","vajce","pole","more","dievča","mača"].map((word) =>
		choice(`Urči rod podstatného mena „${word}“.`, "stredný rod", ["mužský rod","ženský rod","stredný rod","nedá sa určiť"], `„${word}“ je stredného rodu.`)
	),
];

const caseQuestions: ChoiceSpec[] = [
	[
		"Prišiel som ZO ŠKOLY.",
		"genitív",
		"z koho, z čoho?"
	],
	[
		"Dal som darček SESTRE.",
		"datív",
		"komu, čomu?"
	],
	[
		"Vidím VYSOKÝ STROM.",
		"akuzatív",
		"koho, čo?"
	],
	[
		"Hovoríme O VÝLETE.",
		"lokál",
		"o kom, o čom?"
	],
	[
		"Idem SO SESTROU.",
		"inštrumentál",
		"s kým, s čím?"
	],
	[
		"KAMARÁT prišiel načas.",
		"nominatív",
		"kto, čo?"
	],
	[
		"Vraciame sa Z IHRISKA.",
		"genitív",
		"z koho, z čoho?"
	],
	[
		"Pomáham KAMARÁTOVI.",
		"datív",
		"komu, čomu?"
	],
	[
		"Čítam NOVÚ KNIHU.",
		"akuzatív",
		"koho, čo?"
	],
	[
		"Rozprávame sa O FILME.",
		"lokál",
		"o kom, o čom?"
	],
	[
		"Píšem CERUZKOU.",
		"inštrumentál",
		"s kým, s čím?"
	],
	[
		"MAČKA spí na kresle.",
		"nominatív",
		"kto, čo?"
	],
	[
		"Bez VODY dlho nevydržíme.",
		"genitív",
		"bez koho, bez čoho?"
	],
	[
		"Verím UČITEĽOVI.",
		"datív",
		"komu, čomu?"
	],
	[
		"Pozerám TELEVÍZIU.",
		"akuzatív",
		"koho, čo?"
	],
	[
		"Bývame V BRATISLAVE.",
		"lokál",
		"v kom, v čom?"
	],
	[
		"Cestujem AUTOBUSOM.",
		"inštrumentál",
		"s kým, s čím?"
	],
	[
		"PES hlasno šteká.",
		"nominatív",
		"kto, čo?"
	]
].map(([sentence, answer, question]) =>
	choice(`Urči pád zvýrazneného výrazu: ${sentence}`, answer, ["nominatív","genitív","datív","akuzatív","lokál","inštrumentál"].filter((item) => item === answer || item !== answer).slice(0, 4).includes(answer) ? ["nominatív",answer,"akuzatív","inštrumentál"].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4) : [answer,"genitív","lokál","datív"], `Pýtame sa ${question} Preto ide o ${answer}.`)
);

const adjectiveTypeQuestions: ChoiceSpec[] = [
	...["pekný","rýchly","malý","veľký","silný","slabý","múdry","tichý","veselý","smutný","teplý","studený"].map((word) => choice(`Prídavné meno „${word}“ je...`, "akostné", ["akostné","vzťahové","privlastňovacie","nie je prídavné meno"], `„${word}“ pomenúva vlastnosť, ktorú možno stupňovať, preto je akostné.`)),
	...["školský","mestský","zimný","drevený","kovový","papierový","rodinný","športový","lesný","cestný","vodný","slnečný"].map((word) => choice(`Prídavné meno „${word}“ je...`, "vzťahové", ["akostné","vzťahové","privlastňovacie","nie je prídavné meno"], `„${word}“ vyjadruje vzťah k veci alebo oblasti, preto je vzťahové.`)),
];

const gradingQuestions: ChoiceSpec[] = [
	[
		"vysoký",
		"vyšší",
		"najvyšší"
	],
	[
		"nízky",
		"nižší",
		"najnižší"
	],
	[
		"dobrý",
		"lepší",
		"najlepší"
	],
	[
		"zlý",
		"horší",
		"najhorší"
	],
	[
		"malý",
		"menší",
		"najmenší"
	],
	[
		"veľký",
		"väčší",
		"najväčší"
	],
	[
		"rýchly",
		"rýchlejší",
		"najrýchlejší"
	],
	[
		"pomalý",
		"pomalší",
		"najpomalší"
	],
	[
		"silný",
		"silnejší",
		"najsilnejší"
	],
	[
		"slabý",
		"slabší",
		"najslabší"
	],
	[
		"pekný",
		"krajší",
		"najkrajší"
	],
	[
		"mladý",
		"mladší",
		"najmladší"
	]
].flatMap(([first, second, third]) => [
	choice(`Ktorý tvar je 2. stupeň prídavného mena „${first}“?`, second, [first,second,third,`${first}ší`].filter((v,i,a)=>a.indexOf(v)===i), `Stupňovanie je ${first} – ${second} – ${third}.`),
	choice(`Ktorý tvar je 3. stupeň prídavného mena „${first}“?`, third, [first,second,third,`naj${first}`].filter((v,i,a)=>a.indexOf(v)===i), `Stupňovanie je ${first} – ${second} – ${third}.`)
]);

export const nounQuestions: ChoiceSpec[] = [
	...nounPatternQuestions,
	...nounGenderQuestions,
	...caseQuestions,
	...adjectiveTypeQuestions,
	...gradingQuestions,
];

const synonymPairs = [
	[
		"pekný",
		"krásny"
	],
	[
		"smelý",
		"odvážny"
	],
	[
		"hovoriť",
		"rozprávať"
	],
	[
		"dom",
		"obydlie"
	],
	[
		"rýchly",
		"svižný"
	],
	[
		"múdry",
		"rozumný"
	],
	[
		"veselý",
		"radostný"
	],
	[
		"smutný",
		"zarmútený"
	],
	[
		"malý",
		"drobný"
	],
	[
		"veľký",
		"obrovský"
	],
	[
		"začať",
		"započať"
	],
	[
		"skončiť",
		"ukončiť"
	],
	[
		"pomoc",
		"podpora"
	],
	[
		"chyba",
		"omyl"
	],
	[
		"cesta",
		"chodník"
	],
	[
		"ticho",
		"mlčky"
	],
	[
		"hneď",
		"okamžite"
	],
	[
		"dar",
		"darček"
	],
	[
		"úloha",
		"zadanie"
	],
	[
		"odmena",
		"výhra"
	],
	[
		"práca",
		"robota"
	],
	[
		"zrak",
		"videnie"
	],
	[
		"chlapec",
		"chlap"
	],
	[
		"dievča",
		"dievčina"
	],
	[
		"obava",
		"strach"
	]
];
const antonymPairs = [
	[
		"veľký",
		"malý"
	],
	[
		"rýchly",
		"pomalý"
	],
	[
		"teplý",
		"studený"
	],
	[
		"svetlo",
		"tma"
	],
	[
		"deň",
		"noc"
	],
	[
		"veselý",
		"smutný"
	],
	[
		"múdry",
		"hlúpy"
	],
	[
		"silný",
		"slabý"
	],
	[
		"blízko",
		"ďaleko"
	],
	[
		"hore",
		"dole"
	],
	[
		"otvoriť",
		"zatvoriť"
	],
	[
		"prísť",
		"odísť"
	],
	[
		"začiatok",
		"koniec"
	],
	[
		"pravda",
		"lož"
	],
	[
		"plný",
		"prázdny"
	],
	[
		"nový",
		"starý"
	],
	[
		"čistý",
		"špinavý"
	],
	[
		"ťažký",
		"ľahký"
	],
	[
		"vysoký",
		"nízky"
	],
	[
		"odvážny",
		"bojazlivý"
	],
	[
		"hlasný",
		"tichý"
	],
	[
		"suchý",
		"mokrý"
	],
	[
		"mäkký",
		"tvrdý"
	],
	[
		"široký",
		"úzky"
	],
	[
		"bohatý",
		"chudobný"
	]
];

const synonymQuestions = synonymPairs.map(([a,b], index) => {
	const wrong = [antonymPairs[index % antonymPairs.length].join(" – "), synonymPairs[(index + 7) % synonymPairs.length].join(" – "), antonymPairs[(index + 11) % antonymPairs.length].join(" – ")];
	const answer = `${a} – ${b}`;
	return choice("Ktorá dvojica sú synonymá?", answer, [answer, ...wrong], "Synonymá sú slová s rovnakým alebo veľmi podobným významom.");
});

const antonymQuestions = antonymPairs.map(([a,b], index) => {
	const wrong = [synonymPairs[index % synonymPairs.length].join(" – "), antonymPairs[(index + 7) % antonymPairs.length].join(" – "), synonymPairs[(index + 11) % synonymPairs.length].join(" – ")];
	const answer = `${a} – ${b}`;
	return choice("Ktorá dvojica sú antonymá?", answer, [answer, ...wrong], "Antonymá sú slová s opačným významom.");
});

const polysemy = [
	[
		"koruna",
		"časť stromu, kráľovská ozdoba aj mena"
	],
	[
		"list",
		"časť rastliny aj písomná správa"
	],
	[
		"oko",
		"orgán zraku aj očko na sieti či ihle"
	],
	[
		"jazyk",
		"orgán v ústach aj systém dorozumievania"
	],
	[
		"kľúč",
		"predmet na odomykanie aj riešenie úlohy"
	],
	[
		"zámok",
		"stavba aj mechanizmus na zamykanie"
	],
	[
		"pero",
		"vtáčie pero aj pomôcka na písanie"
	],
	[
		"myš",
		"zviera aj počítačové zariadenie"
	],
	[
		"rameno",
		"časť tela aj časť stroja alebo rieky"
	],
	[
		"hlava",
		"časť tela aj vedúci človek či vrchná časť predmetu"
	],
	[
		"koreň",
		"časť rastliny aj základ slova"
	],
	[
		"sieť",
		"rybárska sieť aj počítačová sieť"
	]
];
const polysemyQuestions = polysemy.map(([word, meaning], index) => {
	const distractors = polysemy.filter((_, i) => i !== index).slice(index % 4, index % 4 + 3).map(([other]) => other);
	return choice("Ktoré slovo je viacvýznamové?", word, [word, ...distractors], `„${word}“ môže znamenať ${meaning}.`);
});

const dialectPairs = [
	["zemiaky", "krumple"],
	["zemiaky", "grule"],
	["zemiaky", "bandurky"],
	["zástera", "fertucha"],
];
const dialectQuestions = dialectPairs.map(([standard, dialect], index) => {
	const answer = `${standard} – ${dialect}`;
	const wrong = synonymPairs.slice(index, index + 3).map((pair) => pair.join(" – "));
	return choice("Ktorá dvojica obsahuje spisovné slovo a jeho nárečový variant?", answer, [answer, ...wrong], `„${standard}“ je spisovné pomenovanie; „${dialect}“ je nárečový variant.`);
});

const idioms = [
	[
		"mať hlavu v oblakoch",
		"byť zasnený"
	],
	[
		"držať jazyk za zubami",
		"mlčať"
	],
	[
		"mať srdce na dlani",
		"byť otvorený a dobrosrdečný"
	],
	[
		"hádzať flintu do žita",
		"vzdať sa"
	],
	[
		"mať maslo na hlave",
		"byť sám vinný"
	],
	[
		"byť ako ryba vo vode",
		"cítiť sa veľmi dobre"
	],
	[
		"robiť z komára somára",
		"zveličovať"
	],
	[
		"mať hlboko do vrecka",
		"mať málo peňazí"
	],
	[
		"ísť ako po masle",
		"ísť veľmi ľahko"
	],
	[
		"mať oči na stopkách",
		"pozorne sledovať"
	],
	[
		"byť jednou nohou dnu",
		"byť veľmi blízko úspechu"
	],
	[
		"chytiť druhý dych",
		"znovu získať energiu"
	],
	[
		"vziať nohy na plecia",
		"rýchlo utiecť"
	],
	[
		"mať plné zuby",
		"mať niečoho dosť"
	],
	[
		"loviť v pamäti",
		"usilovať sa spomenúť si"
	]
];
const idiomQuestions = idioms.flatMap(([phrase, meaning], index) => {
	const wrongMeanings = idioms.filter((_, i)=>i!==index).slice(index % 5, index % 5 + 3).map(([,m])=>m);
	return [
		choice(`Čo znamená ustálené spojenie „${phrase}“?`, meaning, [meaning, ...wrongMeanings], `Spojenie „${phrase}“ má obrazný význam „${meaning}“.`),
		choice("Ktoré spojenie je ustálené obrazné spojenie?", phrase, [phrase, `mať nové ${index+1} tričko`, "pozerať z okna", "čítať učebnicu"], "Ustálené spojenie má prenesený, nie doslovný význam.")
	];
});

const comparisonQuestions = [
	"biely ako sneh",
	"rýchly ako vietor",
	"tichý ako myš",
	"hladný ako vlk",
	"usilovný ako včela",
	"slobodný ako vták",
	"silný ako býk",
	"prefíkaný ako líška",
	"pomalý ako slimák",
	"červený ako mak",
	"studený ako ľad",
	"ľahký ako pierko",
	"tvrdý ako kameň",
	"rovný ako svieca",
	"čierny ako uhoľ"
].map((answer, index) =>
	choice("Ktoré spojenie je prirovnanie?", answer, [answer, answer.replace(" ako ", " a "), `veľmi ${answer.split(" ako ")[0]}`, `${answer.split(" ako ")[1]} je ${answer.split(" ako ")[0]}`], "Prirovnanie porovnáva dva javy, často pomocou slova „ako“.")
);

const proverbQuestions = [
	"Bez práce nie sú koláče.",
	"Kto druhému jamu kope, sám do nej padne.",
	"Ráno múdrejšie večera.",
	"Dvakrát meraj a raz rež.",
	"Kto neskoro chodí, sám sebe škodí.",
	"Aká práca, taká pláca.",
	"Tichá voda brehy myje.",
	"Darovanému koňovi na zuby nepozeraj.",
	"Komu sa nelení, tomu sa zelení.",
	"Všade dobre, doma najlepšie."
].map((answer, index) =>
	choice("Ktorá veta je príslovie?", answer, [answer, ["Medardova kvapka štyridsať dní kvapká.","Katarína na ľade, Vianoce na blate.","Na Hromnice o hodinu více.","Studený máj, v stodole raj.","Aký január, taký júl.","Keď na Mateja sneží, jar sa dlho zdrží.","Svätá Anna, chladná zrána.","Martin prichádza na bielom koni.","Aprílové počasie je ako ženské srdce.","Mokrý apríl sľubuje dobrú úrodu."][index % 10], "Včera sme boli v kine.", "Otvor okno, prosím."], "Príslovie je ustálený ľudový výrok so všeobecným poučením.")
);
const pranostikaQuestions = [
	"Medardova kvapka štyridsať dní kvapká.",
	"Katarína na ľade, Vianoce na blate.",
	"Na Hromnice o hodinu více.",
	"Studený máj, v stodole raj.",
	"Aký január, taký júl.",
	"Keď na Mateja sneží, jar sa dlho zdrží.",
	"Svätá Anna, chladná zrána.",
	"Martin prichádza na bielom koni.",
	"Aprílové počasie je ako ženské srdce.",
	"Mokrý apríl sľubuje dobrú úrodu."
].map((answer, index) =>
	choice("Ktorá veta je pranostika?", answer, [answer, ["Bez práce nie sú koláče.","Kto druhému jamu kope, sám do nej padne.","Ráno múdrejšie večera.","Dvakrát meraj a raz rež.","Kto neskoro chodí, sám sebe škodí.","Aká práca, taká pláca.","Tichá voda brehy myje.","Darovanému koňovi na zuby nepozeraj.","Komu sa nelení, tomu sa zelení.","Všade dobre, doma najlepšie."][index % 10], "Dnes ráno pršalo.", "Poďme už domov."], "Pranostika je ľudový výrok spojený najmä s počasím a prírodou.")
);

export const vocabularyQuestions: ChoiceSpec[] = [
	...synonymQuestions,
	...antonymQuestions,
	...polysemyQuestions,
	...dialectQuestions,
	...idiomQuestions,
	...comparisonQuestions,
	...proverbQuestions,
	...pranostikaQuestions,
];

const sentenceTypeGroups = {
	"oznamovacia": [
		"Dnes svieti slnko.",
		"V sobotu ideme na výlet.",
		"Oli číta novú knihu.",
		"Autobus prišiel načas.",
		"Na stole leží zošit.",
		"V záhrade kvitnú tulipány.",
		"Ráno sme mali matematiku.",
		"Pes spí pri dverách.",
		"Večer budeme pozerať film.",
		"Vlak odchádza o šiestej.",
		"Na ihrisku hrajú deti.",
		"Mamka varí polievku.",
		"Voda v hrnci vrie.",
		"Na kopci stojí hrad.",
		"V triede je ticho."
	],
	"opytovacia": [
		"Kedy príde autobus?",
		"Kde býva tvoja babka?",
		"Čo bude dnes na obed?",
		"Prečo si meškal?",
		"Kto otvoril okno?",
		"Ako sa volá táto kniha?",
		"Koľko stojí lístok?",
		"Kam idete cez víkend?",
		"Máš hotovú úlohu?",
		"Ktorý film si vyberieme?",
		"Kedy začína tréning?",
		"Kde je moja ceruzka?",
		"Čítaš rád detektívky?",
		"Prečo prší?",
		"S kým ideš domov?"
	],
	"rozkazovacia": [
		"Zavri, prosím, okno.",
		"Sadni si na miesto.",
		"Prines mi pohár vody.",
		"Nezabudni si úlohu.",
		"Poď sem.",
		"Otvor si učebnicu.",
		"Napíš svoje meno.",
		"Dávaj pozor na cestu.",
		"Uprataj si stôl.",
		"Počkaj na mňa.",
		"Prečítaj prvý odsek.",
		"Vypni svetlo.",
		"Podaj mi loptu.",
		"Zastav pri priechode.",
		"Skontroluj výsledok."
	],
	"želacia": [
		"Kiež by zajtra svietilo slnko!",
		"Keby už boli prázdniny!",
		"Nech sa ti darí!",
		"Bodaj by sme vyhrali!",
		"Kiež by prestalo pršať!",
		"Nech si čoskoro zdravý!",
		"Keby som tak našiel ten kľúč!",
		"Nech máme šťastnú cestu!",
		"Bodaj by prišla jar!",
		"Kiež by som mal viac času!",
		"Nech sa vám výlet vydarí!",
		"Keby bol víkend dlhší!",
		"Nech dnes neprší!",
		"Kiež by som vedel lietať!",
		"Bodaj by sa to podarilo!"
	]
} as const;
const sentenceTypeQuestions: ChoiceSpec[] = Object.entries(sentenceTypeGroups).flatMap(([kind, items]) =>
	items.map((sentence) => choice(
		`Aký druh vety podľa obsahu je: ${sentence}`,
		kind,
		["oznamovacia","opytovacia","rozkazovacia","želacia"],
		`Táto veta je ${kind}.`
	))
);

const punctuationQuestions: ChoiceSpec[] = [
	...sentenceTypeGroups.opytovacia.map((sentence) => choice(`Ktoré znamienko patrí na koniec vety bez posledného znamienka: ${sentence.slice(0,-1)}`, "?", [".","?","!",","], "Odpoveď je otáznik, pretože ide o otázku.")),
	...sentenceTypeGroups.oznamovacia.map((sentence) => choice(`Ktoré znamienko patrí na koniec oznamovacej vety: ${sentence.slice(0,-1)}`, ".", [".","?","!",","], "Oznamovacia veta sa bežne končí bodkou.")),
];

const wordOrderQuestions = [
	[
		"Oli dnes číta novú knihu.",
		"Novú dnes knihu Oli číta."
	],
	[
		"Ráno sme išli autobusom do školy.",
		"Autobusom do ráno školy sme išli."
	],
	[
		"Na záhrade kvitnú červené ruže.",
		"Červené na kvitnú ruže záhrade."
	],
	[
		"Môj brat hrá večer futbal.",
		"Futbal môj večer hrá brat."
	],
	[
		"Včera sme videli dobrý film.",
		"Dobrý sme včera film videli."
	],
	[
		"Malý pes hlasno štekal pri bráne.",
		"Pri hlasno malý bráne pes štekal."
	],
	[
		"Po obede pôjdeme spolu von.",
		"Spolu pôjdeme obede po von."
	],
	[
		"Na stole leží modrá ceruzka.",
		"Modrá leží stole ceruzka na."
	],
	[
		"Deti sa cez prestávku hrali na dvore.",
		"Na cez deti dvore prestávku sa hrali."
	],
	[
		"V sobotu navštívime starých rodičov.",
		"Starých v navštívime sobotu rodičov."
	]
].map(([correct, wrong]) =>
	choice("Ktorá veta má prirodzený a zrozumiteľný slovosled?", correct, [
		correct,
		wrong,
		wrong.split(" ").reverse().join(" "),
		correct.split(" ").slice(1).concat(correct.split(" ")[0]).join(" "),
	], "Správny slovosled má byť prirodzený a zrozumiteľný.")
);

const directSpeechQuestions = [
	[
		"Mama povedala: „Príď načas.“",
		"Mama povedala „Príď načas“.",
		"Mama povedala, „Príď načas.“",
		"Mama povedala. „Príď načas“"
	],
	[
		"Otec sa spýtal: „Máš hotovú úlohu?“",
		"Otec sa spýtal „Máš hotovú úlohu?“",
		"Otec sa spýtal, „Máš hotovú úlohu?“",
		"Otec sa spýtal. „Máš hotovú úlohu?“"
	],
	[
		"Učiteľ povedal: „Otvorte si zošity.“",
		"Učiteľ povedal „Otvorte si zošity“.",
		"Učiteľ povedal, „Otvorte si zošity.“",
		"Učiteľ povedal. „Otvorte si zošity.“"
	],
	[
		"Oli zvolala: „To je super!“",
		"Oli zvolala „To je super!“",
		"Oli zvolala, „To je super!“",
		"Oli zvolala. „To je super!“"
	],
	[
		"Tomáš sa opýtal: „Kedy vyrážame?“",
		"Tomáš sa opýtal „Kedy vyrážame?“",
		"Tomáš sa opýtal, „Kedy vyrážame?“",
		"Tomáš sa opýtal. „Kedy vyrážame?“"
	],
	[
		"Babka povedala: „Koláč je hotový.“",
		"Babka povedala „Koláč je hotový“.",
		"Babka povedala, „Koláč je hotový.“",
		"Babka povedala. „Koláč je hotový.“"
	],
	[
		"Tréner zakričal: „Bež rýchlejšie!“",
		"Tréner zakričal „Bež rýchlejšie!“",
		"Tréner zakričal, „Bež rýchlejšie!“",
		"Tréner zakričal. „Bež rýchlejšie!“"
	],
	[
		"Lekár sa spýtal: „Kde ťa to bolí?“",
		"Lekár sa spýtal „Kde ťa to bolí?“",
		"Lekár sa spýtal, „Kde ťa to bolí?“",
		"Lekár sa spýtal. „Kde ťa to bolí?“"
	],
	[
		"Sestra povedala: „Počkám ťa vonku.“",
		"Sestra povedala „Počkám ťa vonku“.",
		"Sestra povedala, „Počkám ťa vonku.“",
		"Sestra povedala. „Počkám ťa vonku.“"
	],
	[
		"Dedko zvolal: „Pozri na tú dúhu!“",
		"Dedko zvolal „Pozri na tú dúhu!“",
		"Dedko zvolal, „Pozri na tú dúhu!“",
		"Dedko zvolal. „Pozri na tú dúhu!“"
	]
].map((options) =>
	choice("Ktorý zápis priamej reči je správny?", options[0], options, "Po uvádzacej vete je dvojbodka a priama reč je v úvodzovkách.")
);

export const sentenceQuestionGroups = {
	types: sentenceTypeQuestions,
	punctuation: punctuationQuestions,
	wordOrder: wordOrderQuestions,
	directSpeech: directSpeechQuestions,
} as const;

export const sentenceQuestions: ChoiceSpec[] = [
	...sentenceQuestionGroups.types,
	...sentenceQuestionGroups.punctuation,
	...sentenceQuestionGroups.wordOrder,
	...sentenceQuestionGroups.directSpeech,
];

const readings = [
	[
		"Nina našla pri chodníku malé mača. Tráslo sa od zimy, preto ho zabalila do mikiny a odniesla do bezpečia.",
		"Nina pomohla opustenému mačaťu.",
		"pomoc zvieraťu",
		"Záchrana mačaťa"
	],
	[
		"Ráno pršalo, poobede sa vyjasnilo a večer sa znova spustil lejak.",
		"Počasie sa počas dňa viackrát zmenilo.",
		"zmeny počasia počas dňa",
		"Premenlivý deň"
	],
	[
		"Včely prenášajú peľ z kvetu na kvet. Vďaka tomu môžu mnohé rastliny vytvoriť plody a semená.",
		"Včely sú dôležité pre opeľovanie rastlín.",
		"význam včiel pre rastliny",
		"Prečo sú včely dôležité"
	],
	[
		"Marek si večer pripravil tašku, skontroloval rozvrh a nastavil budík. Ráno preto nemusel nič hľadať a prišiel načas.",
		"Večerná príprava pomohla Marekovi zvládnuť ráno bez stresu.",
		"príprava do školy",
		"Pripravený večer, pokojné ráno"
	],
	[
		"Na sídlisku pribudli nové stromy. V lete dávajú tieň a počas dažďa zadržia časť vody, ktorá by inak odtiekla po chodníkoch.",
		"Stromy v meste prinášajú viacero praktických výhod.",
		"význam stromov v meste",
		"Prečo mesto potrebuje stromy"
	],
	[
		"Oli chcela dočítať knihu ešte pred spaním. Keď zistila, že jej zostáva päťdesiat strán, rozdelila si čítanie na dva večery.",
		"Oli si rozumne rozdelila veľkú úlohu na menšie časti.",
		"plánovanie čítania",
		"Ako si rozdeliť veľkú úlohu"
	],
	[
		"Voda sa pri ochladení pod nulu mení na ľad. Keď sa oteplí, ľad sa opäť roztopí na kvapalnú vodu.",
		"Teplota môže meniť skupenstvo vody.",
		"zmeny skupenstva vody",
		"Keď voda zamrzne a roztopí sa"
	],
	[
		"Pes v útulku sa najskôr ľudí bál. Dobrovoľníci k nemu chodili pokojne každý deň a po čase im začal dôverovať.",
		"Trpezlivý prístup pomohol psovi získať dôveru.",
		"starostlivosť o psa v útulku",
		"Dôvera potrebuje čas"
	],
	[
		"Na bicykli treba mať správne nahustené pneumatiky a funkčné brzdy. Pred dlhšou jazdou je dobré skontrolovať aj reťaz a svetlá.",
		"Pred jazdou na bicykli treba skontrolovať jeho technický stav.",
		"bezpečná príprava bicykla",
		"Kontrola pred jazdou"
	],
	[
		"Stará mama pestuje na balkóne bylinky. Bazalku používa do cestovín, mätu do limonády a pažítku na chlieb.",
		"Aj malý balkón môže slúžiť na pestovanie užitočných byliniek.",
		"pestovanie byliniek na balkóne",
		"Bylinky na balkóne"
	],
	[
		"Keď sa deti stratili na turistickom chodníku, nešli náhodným smerom. Vrátili sa k poslednej značke a podľa mapy našli správnu cestu.",
		"Pri zablúdení pomohlo deťom pokojne sa vrátiť k známemu bodu a použiť mapu.",
		"orientácia pri turistike",
		"Keď sa stratí značka"
	],
	[
		"Mesto zaviedlo triedenie kuchynského odpadu. Zvyšky jedla sa spracujú na kompost alebo bioplyn namiesto toho, aby skončili na skládke.",
		"Triedenie kuchynského odpadu umožňuje jeho ďalšie využitie.",
		"spracovanie bioodpadu",
		"Kam putujú zvyšky jedla"
	],
	[
		"Sova loví najmä v noci. Má citlivý sluch a perie prispôsobené na tichý let, takže sa ku koristi dokáže priblížiť nenápadne.",
		"Sova má vlastnosti, ktoré jej pomáhajú pri nočnom love.",
		"sova a nočný lov",
		"Tichý nočný lovec"
	],
	[
		"V knižnici sa konala burza kníh. Každý mohol priniesť prečítanú knihu a odniesť si inú bez toho, aby kupoval novú.",
		"Burza umožnila ľuďom vymeniť si knihy a dať im ďalšie využitie.",
		"výmena kníh",
		"Knihy dostali druhú šancu"
	],
	[
		"Po silnom daždi zostali na lúke mláky. O dva dni neskôr boli menšie, hoci nepršalo ani ich nikto nevylial.",
		"Voda z mlák sa postupne odparovala.",
		"odparovanie vody",
		"Kam miznú mláky"
	],
	[
		"Školský tím prehrával po prvom polčase o dva góly. Hráči sa však nevzdali, zlepšili spoluprácu a zápas nakoniec remizovali.",
		"Vytrvalosť a lepšia spolupráca pomohli tímu zvrátiť nepriaznivý vývoj.",
		"tímová spolupráca v zápase",
		"Nevzdali sa"
	],
	[
		"Na výlete si Lea všimla odpadky pri jazere. Namiesto sťažovania vytiahla vrecko a spolu s kamarátmi ich pozbierala.",
		"Lea s kamarátmi aktívne pomohli vyčistiť okolie jazera.",
		"ochrana prírody",
		"Čistejšie jazero"
	],
	[
		"Keď električka náhle zastala, vodič oznámil poruchu. Cestujúci vystúpili a použili náhradný autobus, ktorý pristavili o pár minút.",
		"Po poruche električky bola doprava vyriešená náhradným autobusom.",
		"náhradná doprava pri poruche",
		"Keď električka nepokračuje"
	],
	[
		"Tomáš piekol muffiny podľa receptu. Najprv si odvážil suroviny, potom ich zmiešal a až nakoniec zapol rúru na správnu teplotu.",
		"Pri pečení Tomáš postupoval podľa jednotlivých krokov receptu.",
		"postup pri pečení",
		"Muffiny krok za krokom"
	],
	[
		"V zime vtáky ťažšie hľadajú potravu. Do kŕmidla preto dávame vhodné semená, nie slané ani pokazené jedlo.",
		"V zime môžeme vtákom pomôcť vhodným prikrmovaním.",
		"zimné prikrmovanie vtákov",
		"Ako pomôcť vtákom v zime"
	]
];
const readingQuestions: ChoiceSpec[] = readings.flatMap(([text, mainIdea, topic, title], index) => {
	const other = [1,2,3].map((offset) => readings[(index + offset) % readings.length]);
	return [
		choice(`Prečítaj: „${text}“ Aká je hlavná myšlienka?`, mainIdea, [mainIdea, ...other.map((item)=>item[1])], "Hlavná myšlienka vystihuje najdôležitejšie posolstvo celého textu."),
		choice(`Prečítaj: „${text}“ Aká je téma textu?`, topic, [topic, ...other.map((item)=>item[2])], "Téma stručne pomenúva, o čom text je."),
		choice(`Ktorý nadpis najlepšie vystihuje text: „${text}“`, title, [title, ...other.map((item)=>item[3])], "Dobrý nadpis stručne a presne vystihuje jadro textu."),
	];
});

const procedureQuestions = [
	[
		"príprave čaju",
		"zovrieť vodu → zaliať čaj → nechať vylúhovať",
		"nechať vylúhovať → zovrieť vodu → zaliať čaj",
		"zaliať čaj → vypiť ho → zovrieť vodu",
		"vypiť čaj → zaliať čaj → zovrieť vodu"
	],
	[
		"umytí rúk",
		"namočiť ruky → použiť mydlo → opláchnuť a osušiť",
		"osušiť ruky → použiť mydlo → namočiť ruky",
		"použiť mydlo → osušiť → namočiť",
		"opláchnuť → namočiť → použiť mydlo"
	],
	[
		"príprave cestovín",
		"zovrieť vodu → vložiť cestoviny → uvariť a scediť",
		"scediť cestoviny → zovrieť vodu → vložiť cestoviny",
		"vložiť cestoviny → scediť → zovrieť vodu",
		"uvariť cestoviny → vložiť ich do studenej vody → zovrieť"
	],
	[
		"čistení zubov",
		"naniesť pastu → vyčistiť zuby → vypláchnuť ústa",
		"vypláchnuť ústa → naniesť pastu → čistiť",
		"vyčistiť zuby → naniesť pastu → zobrať kefku",
		"odložiť kefku → naniesť pastu → čistiť"
	],
	[
		"zasadení semienka",
		"naplniť črepník zeminou → vložiť semienko → zahrnúť a poliať",
		"poliať prázdny črepník → vložiť semienko → nasypať zeminu",
		"vložiť semienko na stôl → poliať → nasypať zeminu",
		"zahrnúť zeminu → vybrať semienko → poliať"
	],
	[
		"príprave sendviča",
		"pripraviť pečivo → pridať náplň → prikryť druhou časťou",
		"pridať náplň → zjesť ju → pripraviť pečivo",
		"prikryť sendvič → rozrezať pečivo → pridať náplň",
		"zjesť pečivo → pridať náplň → prikryť"
	],
	[
		"odoslaní listu",
		"napísať list → vložiť ho do obálky → nalepiť známku a odoslať",
		"odoslať obálku → napísať list → nalepiť známku",
		"nalepiť známku → odoslať prázdnu obálku → napísať list",
		"vložiť známku do obálky → napísať adresu → napísať list"
	],
	[
		"praní trička",
		"skontrolovať štítok → vložiť tričko do práčky → zvoliť program",
		"zvoliť program → skontrolovať štítok po praní → vložiť tričko",
		"vyvesiť tričko → vložiť do práčky → skontrolovať štítok",
		"vložiť tričko → vybrať ho suché → zapnúť práčku"
	],
	[
		"príprave kakaa",
		"zohriať mlieko → pridať kakao → premiešať",
		"pridať kakao → vypiť → zohriať mlieko",
		"premiešať prázdny hrnček → zohriať kakao → pridať mlieko",
		"vypiť mlieko → pridať kakao → premiešať"
	],
	[
		"skladaní papierovej lodičky",
		"preložiť papier → vytvoriť záhyby → roztiahnuť výsledný tvar",
		"roztiahnuť papier → zahodiť ho → vytvoriť záhyby",
		"vytvoriť loďku → preložiť čistý papier → narovnať záhyby",
		"roztrhnúť papier → preložiť → zlepiť náhodne"
	]
].map(([name, correct, ...wrong]) =>
	choice(`Ktoré poradie patrí do opisu pracovného postupu pri ${name}?`, correct, [correct, ...wrong], "Pracovný postup zachytáva kroky v logickom poradí.")
);

const slohQuestions: ChoiceSpec[] = [
	choice("Ktorý útvar je založený na pripravených otázkach a odpovediach hosťa?", "interview", ["interview","recept","pozvánka","báseň"], "Cielený rozhovor s otázkami a odpoveďami je interview."),
	choice("Ktorý útvar opisuje, ako niečo krok za krokom urobiť?", "pracovný postup", ["pracovný postup","povesť","správa o počasí","báseň"], "Pracovný postup uvádza kroky v správnom poradí."),
	choice("Ktorá ukážka je rozprávanie s prvkami opisu?", "Vošiel som do tmavej chodby. Dvere za mnou buchli a ja som sa rozbehol.", ["Vošiel som do tmavej chodby. Dvere za mnou buchli a ja som sa rozbehol.","Chodba je miestnosť spájajúca izby.","Najprv otvor dvere, potom prejdi chodbou.","Chodba má dĺžku päť metrov."], "Ukážka rozvíja dej a zároveň opisuje prostredie."),
	choice("Čo má obsahovať stručný konspekt textu?", "hlavné myšlienky a dôležité body", ["hlavné myšlienky a dôležité body","každé slovo z textu","iba názov autora","iba poslednú vetu"], "Konspekt zachytáva hlavné myšlienky a dôležité body."),
	choice("Na čo slúžia poznámky pri čítaní alebo učení?", "na stručné zachytenie dôležitých informácií", ["na stručné zachytenie dôležitých informácií","na prepis celého textu slovo za slovom","iba na kreslenie obrázkov","na náhodné vety bez súvisu"], "Poznámky pomáhajú vybrať a zapamätať podstatné informácie."),
];

export const readingQuestionsBank: ChoiceSpec[] = [
	...readingQuestions,
	...procedureQuestions,
	...slohQuestions,
];

const personifications = [
	"Vietor si pospevoval medzi stromami.",
	"Slnko sa usmialo spoza mrakov.",
	"Mesiac strážil spiace mesto.",
	"Dážď klopal na okno.",
	"Rieka sa ponáhľala do údolia.",
	"Stromy si šepkali vo vetre.",
	"Budík na mňa ráno kričal.",
	"Hmla objala celé údolie.",
	"Jeseň namaľovala listy na zlato.",
	"Zima zaklopala na dvere.",
	"Hviezdy žmurkali na cestu.",
	"More sa hnevalo na útesy.",
	"Oheň tancoval v krbe.",
	"Cesta sa kľukatila a volala nás ďalej.",
	"Noc prikryla mesto tmavou dekou.",
	"Búrka zúrila nad horami.",
	"Kniha ma pozývala do iného sveta.",
	"Čas utekal ako splašený.",
	"Ticho sedelo v prázdnej triede.",
	"Jar zobudila záhradu."
];
const personificationQuestions = personifications.map((answer) =>
	choice("Ktorá veta obsahuje personifikáciu?", answer, [answer, "Vietor bol dnes silný.", "Strom stojí pri ceste.", "Na oblohe sú oblaky."], "Personifikácia pripisuje neživej veci alebo prírode ľudské vlastnosti alebo činnosť.")
);

const epithets = [
	"strieborný mesiac",
	"zlaté slnko",
	"tichá noc",
	"smaragdová lúka",
	"ohnivé nebo",
	"čierna tma",
	"ľadový vietor",
	"spiace mesto",
	"perlové kvapky",
	"zamatová obloha",
	"smutný dážď",
	"veselý potok",
	"modré diaľky",
	"čarovný les",
	"voňavé ráno",
	"nežný vánok",
	"kamenné srdce",
	"žiarivá hviezda",
	"zlatisté pole",
	"tajomná hmla"
];
const epithetQuestions = epithets.map((answer) =>
	choice("Ktoré spojenie je epiteton – básnický prívlastok?", answer, [answer, "veľký predmet", "tri stoly", "okno je otvorené"], "Epiteton je obrazný, umelecky pôsobiaci prívlastok.")
);

const literatureDefinitions = [
	[
		"legenda",
		"príbeh spätý najmä so životom svätcov, často so zázračnými prvkami"
	],
	[
		"ľudová povesť",
		"povesť tradovaná medzi ľuďmi bez známeho autora"
	],
	[
		"autorská povesť",
		"povesť, pri ktorej poznáme autora"
	],
	[
		"refrén",
		"opakujúca sa časť piesne"
	],
	[
		"rozprávač",
		"ten, kto v literárnom texte sprostredkúva príbeh"
	],
	[
		"scenár",
		"text s replikami a pokynmi určený na realizáciu filmu alebo predstavenia"
	],
	[
		"personifikácia",
		"pripisovanie ľudských vlastností neživým veciam alebo prírode"
	],
	[
		"epiteton",
		"obrazný básnický prívlastok"
	],
	[
		"nonsens",
		"zámerná nezmyselnosť a hra s logikou"
	],
	[
		"rytmus",
		"pravidelné alebo vnímateľné usporiadanie zvukov a prízvukov vo veršoch"
	],
	[
		"verš",
		"jeden riadok básne"
	],
	[
		"strofa",
		"skupina veršov oddelená od ďalšej skupiny"
	],
	[
		"pieseň",
		"text určený na spievanie, spojený s melódiou"
	],
	[
		"encyklopédia",
		"náučná kniha prinášajúca vecné informácie"
	],
	[
		"dialóg",
		"rozhovor dvoch alebo viacerých postáv"
	]
];
const definitionQuestions = literatureDefinitions.flatMap(([term, definition], index) => {
	const otherTerms = literatureDefinitions.filter((_,i)=>i!==index).slice(index % 5, index % 5 + 3).map(([t])=>t);
	const otherDefs = literatureDefinitions.filter((_,i)=>i!==index).slice(index % 5, index % 5 + 3).map(([,d])=>d);
	return [
		choice(`Ako sa nazýva: ${definition}?`, term, [term, ...otherTerms], `Správny pojem je „${term}“.`),
		choice(`Čo znamená pojem „${term}“?`, definition, [definition, ...otherDefs], `„${term}“ znamená: ${definition}.`)
	];
});

const extraLiterature: ChoiceSpec[] = [
	choice("Čo odlišuje pieseň od bežnej básne?", "je určená na spievanie a spája text s melódiou", ["je určená na spievanie a spája text s melódiou","nemôže mať rým","nemá verše","musí byť vždy ľudová"], "Pieseň spája slovesnú a hudobnú zložku."),
	choice("Ktorá kniha patrí medzi náučnú literatúru?", "encyklopédia zvierat", ["encyklopédia zvierat","zbierka rozprávok","komiks","básnická zbierka"], "Encyklopédia prináša vecné poznatky."),
	choice("Čo je typické pre nonsens?", "zámerná nezmyselnosť a hra s logikou", ["zámerná nezmyselnosť a hra s logikou","presný pracovný postup","iba historické fakty","vždy smutný záver"], "Nonsens zámerne narúša bežnú logiku."),
	choice("Ako sa nazýva opakujúca sa časť piesne?", "refrén", ["refrén","kapitola","odsek","scenár"], "Refrén sa v piesni pravidelne opakuje."),
	choice("Kto v literárnom texte sprostredkúva príbeh čitateľovi?", "rozprávač", ["rozprávač","režisér","divák","ilustrátor"], "Príbeh čitateľovi sprostredkúva rozprávač."),
];

export const literatureQuestions: ChoiceSpec[] = [
	...personificationQuestions,
	...epithetQuestions,
	...definitionQuestions,
	...extraLiterature,
];

export const slovakQuestionBanks = {
	"sk-spelling": spellingQuestions as ChoiceSpec[],
	"sk-nouns": nounQuestions,
	"sk-vocabulary": vocabularyQuestions,
	"sk-sentences": sentenceQuestions,
	"sk-reading": readingQuestionsBank,
	"sk-literature": literatureQuestions,
} as const;

export const slovakBankSizes = Object.fromEntries(
	Object.entries(slovakQuestionBanks).map(([topic, bank]) => [topic, bank.length]),
) as Record<keyof typeof slovakQuestionBanks, number>;
