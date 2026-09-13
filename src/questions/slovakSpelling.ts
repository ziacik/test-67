export type SpellingLetter = "i" | "í" | "y" | "ý";

export type SpellingWord = {
	word: string;
	note?: string;
};

export type SpellingQuestionSpec = {
	prompt: string;
	answer: SpellingLetter;
	choices: SpellingLetter[];
	explanation: string;
};

export const selectedCoreWords: SpellingWord[] = [
	{
		"word": "by"
	},
	{
		"word": "aby"
	},
	{
		"word": "byľ"
	},
	{
		"word": "bystrý"
	},
	{
		"word": "Bystrica"
	},
	{
		"word": "Bytča"
	},
	{
		"word": "byť",
		"note": "existovať"
	},
	{
		"word": "nábytok"
	},
	{
		"word": "bývať"
	},
	{
		"word": "byt"
	},
	{
		"word": "bydlisko"
	},
	{
		"word": "príbytok"
	},
	{
		"word": "dobytok"
	},
	{
		"word": "kobyla"
	},
	{
		"word": "obyčaj"
	},
	{
		"word": "býk"
	},
	{
		"word": "bylina"
	},
	{
		"word": "bydlo",
		"note": "bývanie"
	},
	{
		"word": "dobyť",
		"note": "zmocniť sa"
	},
	{
		"word": "odbyt"
	},
	{
		"word": "byvol"
	},
	{
		"word": "bytosť"
	},
	{
		"word": "bývalý"
	},
	{
		"word": "úbytok"
	},
	{
		"word": "prebytok"
	},
	{
		"word": "zbytočný"
	},
	{
		"word": "my"
	},
	{
		"word": "mykať sa"
	},
	{
		"word": "mýliť sa"
	},
	{
		"word": "myslieť"
	},
	{
		"word": "myšlienka"
	},
	{
		"word": "myseľ"
	},
	{
		"word": "umývať sa"
	},
	{
		"word": "mydlo"
	},
	{
		"word": "myš"
	},
	{
		"word": "šmýkať sa"
	},
	{
		"word": "hmyz"
	},
	{
		"word": "žmýkať"
	},
	{
		"word": "priemysel"
	},
	{
		"word": "Myjava"
	},
	{
		"word": "mýto"
	},
	{
		"word": "mys",
		"note": "výbežok pevniny"
	},
	{
		"word": "zamykať"
	},
	{
		"word": "pomykov"
	},
	{
		"word": "hmýriť sa"
	},
	{
		"word": "šmyk"
	},
	{
		"word": "priesmyk"
	},
	{
		"word": "omyl"
	},
	{
		"word": "zmysel"
	},
	{
		"word": "pomyje"
	},
	{
		"word": "pýcha"
	},
	{
		"word": "pýtať sa"
	},
	{
		"word": "pýr"
	},
	{
		"word": "kopyto"
	},
	{
		"word": "prepych"
	},
	{
		"word": "pysk",
		"note": "papuľa"
	},
	{
		"word": "pykať"
	},
	{
		"word": "pýšiť sa"
	},
	{
		"word": "pytliak"
	},
	{
		"word": "dopyt"
	},
	{
		"word": "zapýriť sa"
	},
	{
		"word": "pyré"
	},
	{
		"word": "pyžamo"
	},
	{
		"word": "pytač"
	},
	{
		"word": "ryba"
	},
	{
		"word": "rýchly"
	},
	{
		"word": "ryť"
	},
	{
		"word": "rýpať"
	},
	{
		"word": "hrýzť"
	},
	{
		"word": "kryť"
	},
	{
		"word": "skryť"
	},
	{
		"word": "koryto"
	},
	{
		"word": "korytnačka"
	},
	{
		"word": "strýc"
	},
	{
		"word": "ryčať"
	},
	{
		"word": "ryža"
	},
	{
		"word": "bryndza"
	},
	{
		"word": "rys",
		"note": "šelma"
	},
	{
		"word": "rysovať"
	},
	{
		"word": "Korytnica"
	},
	{
		"word": "rýdzi"
	},
	{
		"word": "rýdzik"
	},
	{
		"word": "brýzgať"
	},
	{
		"word": "rytier"
	},
	{
		"word": "trýzniť"
	},
	{
		"word": "rým"
	},
	{
		"word": "ryha"
	},
	{
		"word": "kryha"
	},
	{
		"word": "poryv"
	},
	{
		"word": "úryvok"
	},
	{
		"word": "Torysa"
	},
	{
		"word": "ryšavý"
	},
	{
		"word": "prýštiť"
	},
	{
		"word": "trysk"
	},
	{
		"word": "kryštál"
	},
	{
		"word": "rýľ"
	},
	{
		"word": "rytmus"
	},
	{
		"word": "syn"
	},
	{
		"word": "syr"
	},
	{
		"word": "sýty"
	},
	{
		"word": "sypať"
	},
	{
		"word": "syseľ"
	},
	{
		"word": "syčať"
	},
	{
		"word": "sýkorka"
	},
	{
		"word": "sychravý"
	},
	{
		"word": "vysychať"
	},
	{
		"word": "osýpky"
	},
	{
		"word": "sypký"
	},
	{
		"word": "sykať"
	},
	{
		"word": "vysoký"
	},
	{
		"word": "zvyk"
	},
	{
		"word": "vy",
		"note": "zámeno"
	},
	{
		"word": "vykať"
	},
	{
		"word": "výr",
		"note": "sova"
	},
	{
		"word": "výskať"
	},
	{
		"word": "vyť",
		"note": "vlk vydáva zvuk"
	},
	{
		"word": "vy-",
		"note": "predpona"
	},
	{
		"word": "vyžla"
	},
	{
		"word": "vydra"
	},
	{
		"word": "vyhňa"
	},
	{
		"word": "výsosť"
	},
	{
		"word": "zvyšok"
	},
	{
		"word": "výskyt"
	},
	{
		"word": "výživa"
	},
	{
		"word": "výťah"
	},
	{
		"word": "vyučovanie"
	},
	{
		"word": "výpočet"
	},
	{
		"word": "výraz"
	},
	{
		"word": "vyrážka"
	},
	{
		"word": "výskum"
	},
	{
		"word": "výstava"
	},
	{
		"word": "jazyk"
	},
	{
		"word": "nazývať sa"
	},
	{
		"word": "ozývať sa"
	},
	{
		"word": "prezývať"
	},
	{
		"word": "vyzývať"
	},
	{
		"word": "pozývať"
	},
	{
		"word": "vzývať"
	}
];

export const relatedSelectedWords: SpellingWord[] = [
	{
		"word": "býčí"
	},
	{
		"word": "bystrina"
	},
	{
		"word": "bystrosť"
	},
	{
		"word": "bystrický"
	},
	{
		"word": "bytie"
	},
	{
		"word": "živobytie"
	},
	{
		"word": "blahobyt"
	},
	{
		"word": "bytostný"
	},
	{
		"word": "obývať"
	},
	{
		"word": "obyvateľ"
	},
	{
		"word": "prebývať"
	},
	{
		"word": "obytný"
	},
	{
		"word": "vydobyť"
	},
	{
		"word": "výdobytok"
	},
	{
		"word": "dobývať"
	},
	{
		"word": "dobyvateľ"
	},
	{
		"word": "nadbytočný"
	},
	{
		"word": "neodbytný"
	},
	{
		"word": "prvobytný"
	},
	{
		"word": "obyčajný"
	},
	{
		"word": "neobyčajný"
	},
	{
		"word": "myknúť"
	},
	{
		"word": "odmykať"
	},
	{
		"word": "mylný"
	},
	{
		"word": "premýšľať"
	},
	{
		"word": "úmysel"
	},
	{
		"word": "výmysel"
	},
	{
		"word": "mýtnik"
	},
	{
		"word": "šmykľavka"
	},
	{
		"word": "šmyknúť sa"
	},
	{
		"word": "mydlový"
	},
	{
		"word": "mydlina"
	},
	{
		"word": "umývadlo"
	},
	{
		"word": "umývačka"
	},
	{
		"word": "pyšný"
	},
	{
		"word": "pyšnieť"
	},
	{
		"word": "pyskatý"
	},
	{
		"word": "pyštek"
	},
	{
		"word": "spytovať sa"
	},
	{
		"word": "opytovať sa"
	},
	{
		"word": "rybník"
	},
	{
		"word": "rybár"
	},
	{
		"word": "rybina"
	},
	{
		"word": "ryk"
	},
	{
		"word": "zrýchliť"
	},
	{
		"word": "zrýchľovať"
	},
	{
		"word": "rozrývať"
	},
	{
		"word": "pokryť"
	},
	{
		"word": "pokrývka"
	},
	{
		"word": "prikryť"
	},
	{
		"word": "prikrývka"
	},
	{
		"word": "skrýša"
	},
	{
		"word": "úkryt"
	},
	{
		"word": "strýko"
	},
	{
		"word": "stryná"
	},
	{
		"word": "rýmovať"
	},
	{
		"word": "rytmický"
	},
	{
		"word": "sykot"
	},
	{
		"word": "sykavý"
	},
	{
		"word": "sýpka"
	},
	{
		"word": "syrový"
	},
	{
		"word": "nasýtiť"
	},
	{
		"word": "nenásytný"
	},
	{
		"word": "výskot"
	},
	{
		"word": "výška"
	},
	{
		"word": "výšina"
	},
	{
		"word": "zvýšiť"
	},
	{
		"word": "zvyšovať"
	},
	{
		"word": "zvykať"
	},
	{
		"word": "zvyknúť"
	},
	{
		"word": "zvyčajný"
	},
	{
		"word": "návyk"
	},
	{
		"word": "vysokánsky"
	},
	{
		"word": "jazyčný"
	},
	{
		"word": "nazývať"
	},
	{
		"word": "prizývať"
	},
	{
		"word": "prezývka"
	}
];

export const lYWords: SpellingWord[] = [
	{
		"word": "lyko"
	},
	{
		"word": "lysý"
	},
	{
		"word": "lýtko"
	},
	{
		"word": "lyžica"
	},
	{
		"word": "mlyn"
	},
	{
		"word": "plyn"
	},
	{
		"word": "plytký"
	},
	{
		"word": "slýchať"
	},
	{
		"word": "lyže"
	},
	{
		"word": "pomaly"
	},
	{
		"word": "plyš"
	},
	{
		"word": "blýskať sa"
	},
	{
		"word": "vzlykať"
	},
	{
		"word": "lýra"
	},
	{
		"word": "lyrika"
	},
	{
		"word": "lýceum"
	},
	{
		"word": "oplývať"
	},
	{
		"word": "plynúť"
	},
	{
		"word": "splývať"
	},
	{
		"word": "zlyhať"
	}
];

export const nonSelectedWords: SpellingWord[] = [
	{
		"word": "biť"
	},
	{
		"word": "bitka"
	},
	{
		"word": "bitkár"
	},
	{
		"word": "bič"
	},
	{
		"word": "bičík"
	},
	{
		"word": "bičovať"
	},
	{
		"word": "bicykel"
	},
	{
		"word": "bicyklovať"
	},
	{
		"word": "biely"
	},
	{
		"word": "bielizeň"
	},
	{
		"word": "bieda"
	},
	{
		"word": "biedny"
	},
	{
		"word": "biskup"
	},
	{
		"word": "bizón"
	},
	{
		"word": "bingo"
	},
	{
		"word": "bistro"
	},
	{
		"word": "bifľovať"
	},
	{
		"word": "bilancia"
	},
	{
		"word": "bitúnok"
	},
	{
		"word": "biológia"
	},
	{
		"word": "milý"
	},
	{
		"word": "milovať"
	},
	{
		"word": "minúta"
	},
	{
		"word": "misa"
	},
	{
		"word": "miska"
	},
	{
		"word": "minca"
	},
	{
		"word": "miesto"
	},
	{
		"word": "mier"
	},
	{
		"word": "miešať"
	},
	{
		"word": "mikina"
	},
	{
		"word": "mikrofón"
	},
	{
		"word": "milión"
	},
	{
		"word": "minimum"
	},
	{
		"word": "minister"
	},
	{
		"word": "mimoriadny"
	},
	{
		"word": "minulosť"
	},
	{
		"word": "minúť"
	},
	{
		"word": "misia"
	},
	{
		"word": "mixér"
	},
	{
		"word": "miera"
	},
	{
		"word": "písať"
	},
	{
		"word": "písmeno"
	},
	{
		"word": "pichnúť"
	},
	{
		"word": "pichať"
	},
	{
		"word": "pilník"
	},
	{
		"word": "pilot"
	},
	{
		"word": "pirát"
	},
	{
		"word": "piatok"
	},
	{
		"word": "pieseň"
	},
	{
		"word": "piecť"
	},
	{
		"word": "piesok"
	},
	{
		"word": "piť"
	},
	{
		"word": "pivo"
	},
	{
		"word": "pivnica"
	},
	{
		"word": "pískať"
	},
	{
		"word": "píla"
	},
	{
		"word": "pílka"
	},
	{
		"word": "pilina"
	},
	{
		"word": "pinzeta"
	},
	{
		"word": "pizza"
	},
	{
		"word": "riad"
	},
	{
		"word": "riadiť"
	},
	{
		"word": "riadok"
	},
	{
		"word": "rieka"
	},
	{
		"word": "riedky"
	},
	{
		"word": "riešiť"
	},
	{
		"word": "riekanka"
	},
	{
		"word": "riziko"
	},
	{
		"word": "ríbezle"
	},
	{
		"word": "ríša"
	},
	{
		"word": "rifle"
	},
	{
		"word": "ring"
	},
	{
		"word": "rituál"
	},
	{
		"word": "riasa"
	},
	{
		"word": "rikša"
	},
	{
		"word": "Rím"
	},
	{
		"word": "riasy"
	},
	{
		"word": "riadiaci"
	},
	{
		"word": "riešenie"
	},
	{
		"word": "riečny"
	},
	{
		"word": "sila"
	},
	{
		"word": "silný"
	},
	{
		"word": "sito"
	},
	{
		"word": "sitko"
	},
	{
		"word": "sídlo"
	},
	{
		"word": "síce"
	},
	{
		"word": "sivý"
	},
	{
		"word": "sirup"
	},
	{
		"word": "signál"
	},
	{
		"word": "sirota"
	},
	{
		"word": "siláž"
	},
	{
		"word": "sifón"
	},
	{
		"word": "sinica"
	},
	{
		"word": "situácia"
	},
	{
		"word": "Sibír"
	},
	{
		"word": "sivieť"
	},
	{
		"word": "silnieť"
	},
	{
		"word": "siatie"
	},
	{
		"word": "sieť"
	},
	{
		"word": "siedmy"
	},
	{
		"word": "vidieť"
	},
	{
		"word": "víno"
	},
	{
		"word": "vina"
	},
	{
		"word": "vinný"
	},
	{
		"word": "vidlička"
	},
	{
		"word": "vidina"
	},
	{
		"word": "visieť"
	},
	{
		"word": "víťaz"
	},
	{
		"word": "víla"
	},
	{
		"word": "víkend"
	},
	{
		"word": "vietor"
	},
	{
		"word": "viera"
	},
	{
		"word": "viečko"
	},
	{
		"word": "viezť"
	},
	{
		"word": "vila"
	},
	{
		"word": "visutý"
	},
	{
		"word": "viróza"
	},
	{
		"word": "vitamín"
	},
	{
		"word": "video"
	},
	{
		"word": "vizitka"
	},
	{
		"word": "zima"
	},
	{
		"word": "zimný"
	},
	{
		"word": "zips"
	},
	{
		"word": "zinok"
	},
	{
		"word": "zívať"
	},
	{
		"word": "zisk"
	},
	{
		"word": "získať"
	},
	{
		"word": "zistiť"
	},
	{
		"word": "zízať"
	},
	{
		"word": "zimnica"
	},
	{
		"word": "zimomriavky"
	},
	{
		"word": "zirkón"
	},
	{
		"word": "zipsovať"
	},
	{
		"word": "zinkový"
	},
	{
		"word": "zívačka"
	},
	{
		"word": "ziapať"
	},
	{
		"word": "ziskový"
	},
	{
		"word": "zinkovať"
	},
	{
		"word": "zinkáreň"
	},
	{
		"word": "zigota"
	}
];

function targetLetter(word: string, wanted: readonly SpellingLetter[]): { index: number; letter: SpellingLetter } {
	for (let index = 0; index < word.length; index += 1) {
		const letter = word[index].toLocaleLowerCase("sk") as SpellingLetter;
		if (wanted.includes(letter)) return { index, letter };
	}
	throw new Error(`No target letter found in spelling word: ${word}`);
}

function mask(word: string, index: number): string {
	return word.slice(0, index) + "_" + word.slice(index + 1);
}

function makeQuestion(
	entry: SpellingWord,
	wanted: readonly SpellingLetter[],
	explanationPrefix: string,
): SpellingQuestionSpec {
	const { index, letter } = targetLetter(entry.word, wanted);
	const note = entry.note ? ` (${entry.note})` : "";
	return {
		prompt: `Doplň správne písmeno: ${mask(entry.word, index)}${note}`,
		answer: letter,
		choices: ["i", "í", "y", "ý"],
		explanation: `${explanationPrefix} Správny zápis je „${entry.word}“.`,
	};
}

export const selectedWordQuestions = selectedCoreWords.map((entry) =>
	makeQuestion(entry, ["y", "ý"], "Ide o vybrané slovo alebo školsky zaužívaný tvar s y/ý."),
);

export const relatedSelectedWordQuestions = relatedSelectedWords.map((entry) =>
	makeQuestion(entry, ["y", "ý"], "Ide o príbuzné alebo odvodené slovo, v ktorom zostáva y/ý."),
);

export const lYQuestions = lYWords.map((entry) =>
	makeQuestion(entry, ["y", "ý"], "V tomto zaužívanom slove po l píšeme y/ý."),
);

export const nonSelectedWordQuestions = nonSelectedWords.map((entry) =>
	makeQuestion(entry, ["i", "í"], "Toto nie je vybrané slovo; v tomto mieste píšeme i/í."),
);

export const spellingQuestions: SpellingQuestionSpec[] = [
	...selectedWordQuestions,
	...relatedSelectedWordQuestions,
	...nonSelectedWordQuestions,
	...lYQuestions,
];
