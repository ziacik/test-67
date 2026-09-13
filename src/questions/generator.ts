import type { Question, TopicId } from "./types";

const integer = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

const pick = <T,>(values: readonly T[]): T => values[integer(0, values.length - 1)];

const shuffle = <T,>(values: readonly T[]): T[] => {
	const copy = [...values];
	for (let i = copy.length - 1; i > 0; i -= 1) {
		const j = integer(0, i);
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
};

const id = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const sk = (value: number) => new Intl.NumberFormat("sk-SK").format(value);
const decimal = (cents: number) => (cents / 100).toFixed(2).replace(".", ",");
const decimalTrim = (value: number) => String(value).replace(".", ",");

function roundingQuestion(): Question {
	const step = pick([10, 100, 1_000, 10_000] as const);
	const value = integer(step * 12, Math.min(step * 999, 9_999_999));
	const rounded = Math.round(value / step) * step;
	const labels: Record<number, string> = {
		10: "desiatky",
		100: "stovky",
		1_000: "tisícky",
		10_000: "desaťtisícky",
	};
	return {
		id: id(),
		topic: "numbers",
		prompt: `Zaokrúhli ${sk(value)} na ${labels[step]}.`,
		answer: String(rounded),
		hint: "Pozri sa na číslicu hneď napravo od rádu, na ktorý zaokrúhľuješ.",
		explanation: `${sk(value)} zaokrúhlené na ${labels[step]} je ${sk(rounded)}.`,
	};
}

function compareQuestion(): Question {
	let a = integer(10_000, 5_000_000);
	let b = integer(10_000, 5_000_000);
	if (a === b) b += 1;
	const answer = a < b ? "<" : ">";
	return {
		id: id(),
		topic: "numbers",
		prompt: `Doplň správny znak: ${sk(a)}  ?  ${sk(b)}`,
		answer,
		choices: ["<", ">", "="],
		explanation: `${sk(a)} ${answer} ${sk(b)}.`,
	};
}

function parityQuestion(): Question {
	const value = integer(100, 999_999);
	const answer = value % 2 === 0 ? "párne" : "nepárne";
	return {
		id: id(),
		topic: "numbers",
		prompt: `Číslo ${sk(value)} je…`,
		answer,
		choices: ["párne", "nepárne"],
		explanation: `Posledná číslica je ${value % 10}, preto je číslo ${answer}.`,
	};
}

function additionQuestion(): Question {
	const a = integer(1_000, 999_999);
	const b = integer(1_000, 999_999);
	return {
		id: id(),
		topic: "addition",
		prompt: `${sk(a)} + ${sk(b)} = ?`,
		answer: String(a + b),
		hint: "Ak treba, počítaj písomne po rádoch.",
		explanation: `${sk(a)} + ${sk(b)} = ${sk(a + b)}.`,
	};
}

function subtractionQuestion(): Question {
	const a = integer(20_000, 999_999);
	const b = integer(1_000, a - 1);
	return {
		id: id(),
		topic: "addition",
		prompt: `${sk(a)} − ${sk(b)} = ?`,
		answer: String(a - b),
		explanation: `${sk(a)} − ${sk(b)} = ${sk(a - b)}.`,
	};
}

function multiplicationQuestion(): Question {
	const a = integer(12, 999);
	const b = integer(2, 99);
	return {
		id: id(),
		topic: "multiplication",
		prompt: `${sk(a)} × ${b} = ?`,
		answer: String(a * b),
		hint: "Rozlož si druhý činiteľ na desiatky a jednotky.",
		explanation: `${sk(a)} × ${b} = ${sk(a * b)}.`,
	};
}

function divisionQuestion(): Question {
	const divisor = integer(2, 25);
	const quotient = integer(11, 250);
	const dividend = divisor * quotient;
	return {
		id: id(),
		topic: "multiplication",
		prompt: `${sk(dividend)} ÷ ${divisor} = ?`,
		answer: String(quotient),
		explanation: `${sk(dividend)} ÷ ${divisor} = ${sk(quotient)}, pretože ${quotient} × ${divisor} = ${sk(dividend)}.`,
	};
}

function orderQuestion(): Question {
	const a = integer(2, 20);
	const b = integer(2, 12);
	const c = integer(2, 12);
	const answer = a + b * c;
	return {
		id: id(),
		topic: "multiplication",
		prompt: `${a} + ${b} × ${c} = ?`,
		answer: String(answer),
		hint: "Násobenie má prednosť pred sčítaním.",
		explanation: `Najprv ${b} × ${c} = ${b * c}, potom ${a} + ${b * c} = ${answer}.`,
	};
}

function perimeterQuestion(): Question {
	const a = integer(2, 30);
	const b = integer(2, 30);
	const answer = 2 * (a + b);
	return {
		id: id(),
		topic: "measurement",
		prompt: `Obdĺžnik má strany ${a} cm a ${b} cm. Aký má obvod?`,
		answer: String(answer),
		explanation: `Obvod obdĺžnika je 2 × (${a} + ${b}) = ${answer} cm.`,
	};
}

function areaQuestion(): Question {
	const a = integer(2, 20);
	const b = integer(2, 20);
	const answer = a * b;
	return {
		id: id(),
		topic: "measurement",
		prompt: `Obdĺžnik v štvorcovej sieti má ${a} štvorčekov na dĺžku a ${b} na šírku. Koľko štvorčekov tvorí jeho obsah?`,
		answer: String(answer),
		explanation: `${a} × ${b} = ${answer} štvorčekov.`,
	};
}

function unitsQuestion(): Question {
	const meters = integer(2, 90);
	const centimeters = integer(1, 99);
	const total = meters * 100 + centimeters;
	return {
		id: id(),
		topic: "measurement",
		prompt: `${meters} m ${centimeters} cm = koľko centimetrov?`,
		answer: String(total),
		hint: "1 meter = 100 centimetrov.",
		explanation: `${meters} × 100 + ${centimeters} = ${total} cm.`,
	};
}

function storyChoice(
	topic: Exclude<TopicId, "mixed">,
	icon: string,
	prompt: string,
	answer: string,
	options: string[],
	hint: string,
	explanation: string,
): Question {
	return {
		id: id(),
		topic,
		kind: "story",
		prompt,
		answer,
		interaction: { kind: "story-choice", icon, options: shuffle(options) },
		hint,
		explanation,
	};
}

export function compoundStoryQuestion(): Question {
	const base = integer(4, 9);
	const factor = integer(5, 9);
	const multiplied = base * factor;
	const total = base + multiplied;
	return {
		id: id(),
		topic: "multiplication",
		kind: "story",
		prompt: `Na hospodárstve je ${base} kôz. Somárov je ${factor}-krát toľko ako kôz. Koľko kôz a somárov je spolu?`,
		answer: String(total),
		choices: shuffle([String(total), String(multiplied), String(base + factor), String(multiplied - base)]),
		hint: "Najprv zisti počet somárov, až potom počet všetkých zvierat.",
		explanation: `${base} × ${factor} = ${multiplied}; ${base} + ${multiplied} = ${total}.`,
	};
}

export function overlapStoryQuestion(): Question {
	const total = integer(20, 30);
	const both = integer(5, Math.floor(total / 2));
	const firstOnly = integer(3, total - both - 3);
	const secondOnly = total - both - firstOnly;
	const first = firstOnly + both;
	const second = secondOnly + both;
	const options = [...new Set([both, Math.abs(first - second), first + second, total - both])];
	while (options.length < 4) options.push(options[options.length - 1] + 1);
	return storyChoice(
		"applications",
		"🗣️",
		`V triede je ${total} detí. Angličtinu sa učí ${first} detí a nemčinu ${second} detí. Každé dieťa sa učí aspoň jeden z týchto jazykov. Koľko detí sa učí oba jazyky?`,
		String(both),
		options.slice(0, 4).map(String),
		"Keď oba počty sčítaš, deti učiace sa oba jazyky si započítal dvakrát.",
		`${first} + ${second} − ${total} = ${both}.`,
	);
}

export function differenceStoryQuestion(): Question {
	const shortest = integer(140, 260);
	const middle = shortest + integer(30, 100);
	const longest = middle + integer(40, 120);
	const difference = longest - shortest;
	const options = [...new Set([difference, longest - middle, middle - shortest, longest + shortest])];
	while (options.length < 4) options.push(options[0] + options.length * 10);
	return storyChoice(
		"measurement",
		"🚇",
		`Tri tunely majú dĺžky ${shortest} m, ${middle} m a ${longest} m. O koľko metrov je najdlhší tunel dlhší ako najkratší?`,
		String(difference),
		options.slice(0, 4).map(String),
		"Porovnaj najväčšiu a najmenšiu dĺžku.",
		`${longest} − ${shortest} = ${difference} m.`,
	);
}

export function divisionStoryQuestion(): Question {
	const perItem = pick([6, 7, 8, 9] as const);
	const count = integer(8, 18);
	const total = perItem * count;
	const options = [...new Set([count, count - 1, count + 1, perItem])];
	while (options.length < 4) options.push(options[0] + options.length + 1);
	return storyChoice(
		"multiplication",
		"🦔",
		`Na výrobu jedného papierového ježka treba ${perItem} špáradiel. V krabičke je ${total} špáradiel. Na koľko ježkov vystačia?`,
		String(count),
		options.slice(0, 4).map(String),
		"Zisti, koľkokrát sa počet špáradiel na jedného ježka zmestí do celkového počtu.",
		`${total} ÷ ${perItem} = ${count}, takže zo špáradiel sa dá vyrobiť ${count} ježkov.`,
	);
}

export function financeStoryQuestion(): Question {
	const cheapest = integer(42, 50);
	const totals = shuffle([cheapest, cheapest + 2, cheapest + 4, cheapest + 7]);
	const offers = totals.map((total) => {
		const shipping = integer(0, Math.min(10, total - 30));
		return { price: total - shipping, shipping, total };
	});
	const best = offers.findIndex((offer) => offer.total === cheapest);
	const labels = offers.map((offer, index) => `Ponuka ${index + 1}: ${offer.price} € + doprava ${offer.shipping} €`);
	return storyChoice(
		"applications",
		"🛒",
		`E-shop ponúka rovnaký výrobok v štyroch ponukách. Ktorá vyjde po započítaní dopravy najlacnejšie? ${labels.join(" · ")}`,
		labels[best],
		labels,
		"Pri každej ponuke pripočítaj cenu dopravy.",
		`${offers.map((offer, index) => `${index + 1}. ${offer.total} €`).join("; ")}. Najlacnejšia je ponuka ${best + 1}.`,
	);
}
export function numberFilterQuestion(): Question {
	const threshold = integer(3_000, 8_000);
	const correctValues = new Set<number>();
	while (correctValues.size < 2) {
		const candidate = integer(1_000, threshold - 1);
		correctValues.add(candidate % 2 === 0 ? candidate : candidate - 1);
	}
	const otherValues = new Set<number>();
	while (otherValues.size < 7) {
		const belowOdd = integer(1_000, threshold - 1);
		const aboveAny = integer(threshold, 9_999);
		otherValues.add(belowOdd % 2 === 1 ? belowOdd : belowOdd + 1);
		if (otherValues.size < 7) otherValues.add(aboveAny);
	}
	const answerValues = [...correctValues].sort((a, b) => a - b);
	const values = [...new Set([...answerValues, ...otherValues])].slice(0, 9);
	return {
		id: id(),
		topic: "numbers",
		prompt: `Vyber všetky čísla, ktoré sú párne a zároveň menšie ako ${sk(threshold)}.`,
		answer: answerValues.join(","),
		interaction: { kind: "number-filter", values: shuffle(values), correctValues: answerValues },
		hint: "Číslo musí spĺňať obe podmienky naraz.",
		explanation: `Obe podmienky spĺňajú: ${answerValues.map(sk).join(", ")}.`,
	};
}

function decompositionQuestion(): Question {
	const digits = Array.from({ length: 6 }, (_, index) => index === 0 ? integer(1, 9) : integer(0, 9));
	const value = digits[0] * 100_000 + digits[1] * 10_000 + digits[2] * 1_000 + digits[3] * 100 + digits[4] * 10 + digits[5];
	const target = digits[2] * 1_000 + digits[4] * 10;
	return {
		id: id(),
		topic: "numbers",
		prompt: `V čísle ${sk(value)} sčítaj hodnotu tisícok a desiatok. Aké číslo dostaneš?`,
		answer: String(target),
		choices: shuffle([String(target), String(digits[2] + digits[4]), String(digits[2] * 1_000), String(digits[4] * 10)]),
		hint: "Rozlišuj číslicu od jej hodnoty podľa miesta v čísle.",
		explanation: `${digits[2]} tisícok je ${sk(digits[2] * 1_000)} a ${digits[4]} desiatok je ${digits[4] * 10}; spolu ${sk(target)}.`,
	};
}

function toRoman(value: number): string {
	const table = [
		[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
		[50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
	] as const;
	let remaining = value;
	let result = "";
	for (const [amount, symbol] of table) {
		while (remaining >= amount) {
			result += symbol;
			remaining -= amount;
		}
	}
	return result;
}

function romanQuestion(): Question {
	const answerNumber = integer(11, 2026);
	const roman = toRoman(answerNumber);
	const answer = String(answerNumber);
	const options = new Set([answerNumber, Math.max(1, answerNumber - 10), answerNumber + 10, answerNumber + 100]);
	return {
		id: id(),
		topic: "numbers",
		prompt: `Aké číslo zapisuje rímsky zápis ${roman}?`,
		answer,
		choices: shuffle([...options].slice(0, 4).map(String)),
		hint: "I=1, V=5, X=10, L=50, C=100, D=500, M=1000.",
		explanation: `${roman} = ${answer}.`,
	};
}

function shapePropertyQuestion(): Question {
	const variants = [
		{ prompt: "Ktorý útvar má práve 4 vrcholy a všetky štyri strany rovnako dlhé?", answer: "štvorec", options: ["štvorec", "obdĺžnik", "trojuholník", "päťuholník"] },
		{ prompt: "Ktorý útvar nemá žiadny vrchol?", answer: "kruh", options: ["kruh", "trojuholník", "štvorec", "obdĺžnik"] },
		{ prompt: "Ktorý útvar má práve 3 vrcholy?", answer: "trojuholník", options: ["trojuholník", "štvorec", "kruh", "obdĺžnik"] },
	] as const;
	const q = pick(variants);
	return { id: id(), topic: "geometry", prompt: q.prompt, answer: q.answer, choices: shuffle([...q.options]), explanation: `Správna odpoveď je ${q.answer}.` };
}

function lineRelationQuestion(): Question {
	const perpendicular = Math.random() < 0.5;
	const answer = perpendicular ? "kolmé" : "rovnobežné";
	return {
		id: id(),
		topic: "geometry",
		prompt: perpendicular ? "Dve priamky sa pretínajú pod pravým uhlom. Aké sú?" : "Dve rôzne priamky v rovine sa nikdy nepretnú. Aké sú?",
		answer,
		choices: ["kolmé", "rovnobežné", "totožné", "rôznobežné"],
		explanation: perpendicular ? "Priamky zvierajúce pravý uhol sú kolmé." : "Dve rôzne priamky, ktoré sa v rovine nepretínajú, sú rovnobežné.",
	};
}

function circleQuestion(): Question {
	const radius = integer(2, 12);
	return {
		id: id(),
		topic: "geometry",
		prompt: `Kružnica má polomer ${radius} cm. Aký dlhý je jej priemer?`,
		answer: String(radius * 2),
		choices: shuffle([String(radius * 2), String(radius), String(radius + 2), String(radius * 4)]),
		explanation: `Priemer je dvojnásobok polomeru: 2 × ${radius} = ${radius * 2} cm.`,
	};
}

function cubeFactsQuestion(): Question {
	const variants = [
		["Koľko vrcholov má kocka?", "8", ["6", "8", "10", "12"]],
		["Koľko hrán má kocka?", "12", ["6", "8", "10", "12"]],
		["Koľko stien má kocka?", "6", ["4", "6", "8", "12"]],
	] as const;
	const [prompt, answer, options] = pick(variants);
	return { id: id(), topic: "geometry", prompt, answer, choices: shuffle([...options]), explanation: `Správna odpoveď je ${answer}.` };
}

function quadrilateralQuestion(): Question {
	const square = Math.random() < 0.5;
	const answer = square ? "štvorec" : "obdĺžnik";
	return {
		id: id(),
		topic: "geometry",
		prompt: square
			? "Ktorý štvoruholník má všetky strany rovnako dlhé a štyri pravé uhly?"
			: "Ktorý štvoruholník má protiľahlé strany rovnako dlhé a štyri pravé uhly, pričom susedné strany nemusia byť rovnako dlhé?",
		answer,
		choices: ["štvorec", "obdĺžnik", "trojuholník", "kruh"],
		explanation: `Je to ${answer}.`,
	};
}


function missingAddendQuestion(): Question {
	const a = integer(100, 900);
	const missing = integer(100, 900);
	const sum = a + missing;
	const options = [...new Set([missing, missing + 10, Math.max(1, missing - 10), a])];
	while (options.length < 4) options.push(options[0] + options.length * 10);
	return {
		id: id(),
		topic: "addition",
		prompt: "Doplň chýbajúce číslo.",
		answer: String(missing),
		interaction: { kind: "equation-tiles", expression: `${a} + □ = ${sum}`, options: shuffle(options.slice(0, 4)) },
		explanation: `${sum} − ${a} = ${missing}.`,
	};
}

function differenceComparisonQuestion(): Question {
	const smaller = integer(1_000, 20_000);
	const difference = integer(500, 5_000);
	const larger = smaller + difference;
	return {
		id: id(),
		topic: "addition",
		prompt: `${sk(larger)} je o koľko viac ako ${sk(smaller)}?`,
		answer: String(difference),
		choices: shuffle([String(difference), String(larger + smaller), String(smaller), String(difference + 100)]),
		explanation: `${sk(larger)} − ${sk(smaller)} = ${sk(difference)}.`,
	};
}

function estimateSumQuestion(): Question {
	const a = integer(1_200, 9_800);
	const b = integer(1_200, 9_800);
	const ar = Math.round(a / 1_000) * 1_000;
	const br = Math.round(b / 1_000) * 1_000;
	const estimate = ar + br;
	return {
		id: id(),
		topic: "addition",
		prompt: `Odhadni súčet ${sk(a)} + ${sk(b)} zaokrúhlením oboch čísel na tisícky.`,
		answer: String(estimate),
		choices: shuffle([String(estimate), String(estimate + 1_000), String(Math.max(0, estimate - 1_000)), String(a + b)]),
		explanation: `${sk(a)} ≈ ${sk(ar)} a ${sk(b)} ≈ ${sk(br)}, teda približne ${sk(estimate)}.`,
	};
}

function additionStoryQuestion(): Question {
	const first = integer(120, 480);
	const second = integer(100, 420);
	const absent = integer(40, Math.min(150, first + second - 1));
	const answer = first + second - absent;
	return storyChoice(
		"addition",
		"🎫",
		`Na podujatie predali dopoludnia ${first} lístkov a popoludní ${second}. ${absent} návštevníkov nakoniec neprišlo. Koľko návštevníkov prišlo?`,
		String(answer),
		[String(answer), String(first + second), String(Math.abs(first - second)), String(answer + absent)],
		"Najprv spočítaj predané lístky a potom odčítaj tých, ktorí neprišli.",
		`${first} + ${second} − ${absent} = ${answer}.`,
	);
}

function axisCountQuestion(): Question {
	const variants = [["štvorec", "4"], ["obdĺžnik, ktorý nie je štvorcom", "2"], ["rovnostranný trojuholník", "3"]] as const;
	const [shape, answer] = pick(variants);
	return {
		id: id(),
		topic: "symmetry",
		prompt: `Koľko osí súmernosti má ${shape}?`,
		answer,
		choices: shuffle([answer, "0", "1", "2", "3", "4"].filter((value, index, values) => values.indexOf(value) === index).slice(0, 4)),
		explanation: `${shape} má ${answer} osí súmernosti.`,
	};
}

function symmetryTypeQuestion(): Question {
	const axial = Math.random() < 0.5;
	const answer = axial ? "osová" : "stredová";
	return {
		id: id(),
		topic: "symmetry",
		prompt: axial ? "Pri zrkadlení útvaru podľa priamky vzniká aká súmernosť?" : "Útvar sa pri otočení o 180° okolo jedného bodu prekryje so svojím obrazom. O akú súmernosť ide?",
		answer,
		choices: ["osová", "stredová", "žiadna", "kolmá"],
		explanation: `Ide o ${answer} súmernosť.`,
	};
}

function mirrorDistanceQuestion(): Question {
	const distance = integer(1, 8);
	const answer = `${distance} vpravo`;
	return {
		id: id(),
		topic: "symmetry",
		prompt: `Bod A leží ${distance} štvorčekov vľavo od zvislej osi súmernosti. Kde bude jeho obraz A′?`,
		answer,
		choices: shuffle([answer, `${distance} vľavo`, `${distance * 2} vpravo`, "na osi"]),
		explanation: `Obraz leží v rovnakej vzdialenosti na opačnej strane osi: ${distance} štvorčekov vpravo.`,
	};
}

function centralSymmetryQuestion(): Question {
	const rectangle = Math.random() < 0.5;
	const answer = rectangle ? "áno" : "nie";
	return {
		id: id(),
		topic: "symmetry",
		prompt: rectangle ? "Má obdĺžnik stred súmernosti?" : "Má bežný trojuholník stred súmernosti?",
		answer,
		choices: ["áno", "nie"],
		explanation: rectangle ? "Priesečník uhlopriečok obdĺžnika je jeho stredom súmernosti." : "Trojuholník nemá stredovú súmernosť.",
	};
}

function noAxisSymmetryQuestion(): Question {
	return {
		id: id(),
		topic: "symmetry",
		prompt: "Ktorý z útvarov nemusí mať žiadnu os súmernosti?",
		answer: "rôznostranný trojuholník",
		choices: ["štvorec", "obdĺžnik", "rovnostranný trojuholník", "rôznostranný trojuholník"],
		explanation: "Všeobecný rôznostranný trojuholník nemá os súmernosti.",
	};
}


function divisionRemainderQuestion(): Question {
	const divisor = integer(3, 12);
	const quotient = integer(5, 25);
	const remainder = integer(1, divisor - 1);
	const dividend = divisor * quotient + remainder;
	const answer = `${quotient} zvyšok ${remainder}`;
	return {
		id: id(),
		topic: "multiplication",
		prompt: `${dividend} ÷ ${divisor} = ?`,
		answer,
		choices: shuffle([answer, `${quotient} zvyšok ${Math.max(0, remainder - 1)}`, `${quotient + 1} zvyšok ${remainder}`, String(quotient)]),
		explanation: `${dividend} = ${divisor} × ${quotient} + ${remainder}.`,
	};
}

function xylophoneQuestion(): Question {
	const first = integer(20, 40);
	const step = pick([3, 4, 5, 6] as const);
	const position = integer(4, 8);
	const answer = first + (position - 1) * step;
	return storyChoice(
		"measurement",
		"🎵",
		`Doštičky xylofónu sú zoradené od najkratšej. Prvá má ${first} mm a každá ďalšia je o ${step} mm dlhšia. Akú dĺžku má ${position}. doštička?`,
		String(answer),
		[String(answer), String(first + position * step), String(first + step), String(answer - step)],
		"Medzi prvou a hľadanou doštičkou je o jeden krok menej, než je jej poradové číslo.",
		`${first} + ${position - 1} × ${step} = ${answer} mm.`,
	);
}

function possibleDiceSumQuestion(): Question {
	const dice = integer(3, 5);
	const min = dice;
	const max = dice * 6;
	const possible = integer(min, max);
	return {
		id: id(),
		topic: "applications",
		prompt: `Hádžeme ${dice} kockami s číslami 1 až 6. Ktorý z týchto súčtov môžeme dostať?`,
		answer: String(possible),
		choices: shuffle([String(possible), String(max + 1), String(max + integer(2, 5)), String(Math.max(0, min - 1))]),
		explanation: `Súčet musí byť od ${min} do ${max}. ${possible} do tohto intervalu patrí.`,
	};
}

function chartDataQuestion(): Question {
	const values = shuffle([integer(8, 11), integer(12, 15), integer(16, 20)]);
	const [karol, milan, ondrej] = values;
	const max = Math.max(...values);
	const answer = karol === max ? "Karol" : milan === max ? "Milan" : "Ondrej";
	return {
		id: id(),
		topic: "applications",
		prompt: `Údaje zo stĺpcového grafu: Karol ${karol} km, Milan ${milan} km, Ondrej ${ondrej} km. Kto prešiel najviac?`,
		answer,
		choices: ["Karol", "Milan", "Ondrej"],
		explanation: `Najväčšia hodnota je ${max} km, teda ${answer}.`,
	};
}

function halfCollectionQuestion(): Question {
	const total = pick([8, 10, 12, 14, 16] as const);
	const filled = integer(1, total / 2 - 1);
	const answer = total / 2 - filled;
	return {
		id: id(),
		topic: "applications",
		prompt: `Je tu ${total} pohárov, z toho ${filled} sú plné. Koľko treba ešte naplniť, aby bola plná presne polovica?`,
		answer: String(answer),
		choices: shuffle([String(answer), String(total / 2), String(answer + 1), String(Math.max(0, answer - 1))]),
		explanation: `Polovica z ${total} je ${total / 2}. Už sú plné ${filled}, takže treba ešte ${answer}.`,
	};
}

function pathsQuestion(): Question {
	const width = pick([2, 3] as const);
	const height = pick([2, 3] as const);
	const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);
	const count = factorial(width + height) / (factorial(width) * factorial(height));
	return {
		id: id(),
		topic: "applications",
		prompt: `Na mriežke sa z bodu X do Y musíš posunúť presne ${width}× doprava a ${height}× hore. Koľko rôznych najkratších ciest existuje?`,
		answer: String(count),
		choices: shuffle([String(count), String(count + 1), String(Math.max(1, count - 1)), String(width * height)]),
		explanation: `Rôzne poradia ${width} krokov doprava a ${height} krokov hore dávajú ${count} ciest.`,
	};
}

export function generateStoryQuestion(topic: TopicId, group?: "a" | "b"): Question {
	if (topic === "addition") return additionStoryQuestion();
	if (topic === "multiplication") return group === "b" ? divisionStoryQuestion() : compoundStoryQuestion();
	if (topic === "measurement") return group === "b" ? xylophoneQuestion() : differenceStoryQuestion();
	if (topic === "applications") return group === "b" ? financeStoryQuestion() : overlapStoryQuestion();
	if (topic === "mixed") return generateStoryQuestion(pick(["addition", "multiplication", "measurement", "applications"] as const), group);
	return generateQuestion(topic);
}

export function numberLineQuestion(): Question {
	const start = integer(0, 40) * 10;
	const step = pick([5, 10, 20, 25, 50] as const);
	const values = Array.from({ length: 5 }, (_, index) => start + index * step);
	const target = pick(values.slice(1, 4));

	return {
		id: id(),
		topic: "numbers",
		prompt: `Kde na číselnej osi leží číslo ${sk(target)}?`,
		answer: String(target),
		interaction: { kind: "number-line", values },
		hint: "Pozri si rozostupy medzi susednými bodmi.",
		explanation: `Číslo ${sk(target)} patrí presne na označený bod ${sk(target)}.`,
	};
}

export function sortNumbersQuestion(): Question {
	const values = new Set<number>();
	while (values.size < 4) values.add(integer(100, 9_999));
	const shuffled = shuffle([...values]);
	const sorted = [...shuffled].sort((a, b) => a - b);

	return {
		id: id(),
		topic: "numbers",
		prompt: "Ťukaj čísla od najmenšieho po najväčšie.",
		answer: sorted.join(","),
		interaction: { kind: "sort", values: shuffled },
		hint: "Najprv porovnaj tisícky, potom stovky.",
		explanation: `Správne poradie je ${sorted.map(sk).join(" < ")}.`,
	};
}

export function missingFactorQuestion(): Question {
	const factor = integer(2, 12);
	const answer = integer(2, 12);
	const product = factor * answer;
	const candidates = new Set<number>([answer]);
	while (candidates.size < 4) {
		candidates.add(Math.max(1, answer + pick([-3, -2, -1, 1, 2, 3] as const)));
	}

	return {
		id: id(),
		topic: "multiplication",
		prompt: "Doplň chýbajúce číslo.",
		answer: String(answer),
		interaction: {
			kind: "equation-tiles",
			expression: `□ × ${factor} = ${product}`,
			options: shuffle([...candidates]),
		},
		hint: `Pýtaj sa: koľkokrát sa ${factor} zmestí do ${product}?`,
		explanation: `${answer} × ${factor} = ${product}.`,
	};
}

export function gridAreaQuestion(): Question {
	const columns = integer(4, 8);
	const rows = integer(4, 7);
	const filledColumns = integer(2, columns);
	const filledRows = integer(2, rows);
	const area = filledColumns * filledRows;
	const candidates = new Set<number>([area]);
	while (candidates.size < 4) {
		const delta = pick([-4, -3, -2, -1, 1, 2, 3, 4] as const);
		candidates.add(Math.max(1, area + delta));
	}

	return {
		id: id(),
		topic: "measurement",
		prompt: "Koľko štvorčekov tvorí vyfarbenú plochu?",
		answer: String(area),
		interaction: {
			kind: "grid-area",
			columns,
			rows,
			filledColumns,
			filledRows,
			options: shuffle([...candidates]),
		},
		hint: "Nemusíš ich rátať po jednom. Riadky × stĺpce.",
		explanation: `${filledColumns} × ${filledRows} = ${area} štvorčekov.`,
	};
}


function decimalMoneyQuestion(): Question {
	const first = integer(125, 8_500);
	const second = integer(75, 4_500);
	const total = first + second;
	return {
		id: id(),
		topic: "decimals",
		prompt: `${decimal(first)} € + ${decimal(second)} € = ? €`,
		answer: decimal(total),
		hint: "Sčítaj eurá s eurami a centy s centami.",
		explanation: `${decimal(first)} € + ${decimal(second)} € = ${decimal(total)} €.`,
	};
}

function decimalSubtractionQuestion(): Question {
	const second = integer(50, 3_500);
	const difference = integer(100, 4_500);
	const first = second + difference;
	return {
		id: id(),
		topic: "decimals",
		prompt: `${decimal(first)} − ${decimal(second)} = ?`,
		answer: decimal(difference),
		explanation: `${decimal(first)} − ${decimal(second)} = ${decimal(difference)}.`,
	};
}

function decimalCompareQuestion(): Question {
	let a = integer(10, 9_999);
	let b = integer(10, 9_999);
	if (a === b) b += 1;
	const answer = a < b ? "<" : ">";
	return {
		id: id(),
		topic: "decimals",
		prompt: `Doplň správny znak: ${decimal(a)} ? ${decimal(b)}`,
		answer,
		choices: ["<", ">", "="],
		explanation: `${decimal(a)} ${answer} ${decimal(b)}.`,
	};
}

function decimalRoundingQuestion(): Question {
	const tenths = integer(11, 999);
	const value = tenths / 10;
	const rounded = Math.round(value);
	return {
		id: id(),
		topic: "decimals",
		prompt: `Zaokrúhli ${decimalTrim(value)} na celé číslo.`,
		answer: String(rounded),
		choices: shuffle([String(rounded), String(Math.floor(value)), String(Math.ceil(value)), String(rounded + 1)]),
		hint: "Pozri sa na číslicu na mieste desatín.",
		explanation: `${decimalTrim(value)} ≈ ${rounded}.`,
	};
}

function decimalPowerQuestion(): Question {
	const power = pick([10, 100, 1_000] as const);
	const baseTenths = integer(11, 250);
	const base = baseTenths / 10;
	const result = baseTenths * (power / 10);
	return {
		id: id(),
		topic: "decimals",
		prompt: `${decimalTrim(base)} × ${power} = ?`,
		answer: String(result),
		choices: shuffle([String(result), String(result / 10), String(result * 10), String(base + power)]),
		hint: "Pri násobení 10, 100, 1000 sa desatinná čiarka posúva doprava.",
		explanation: `${decimalTrim(base)} × ${power} = ${sk(result)}.`,
	};
}

function fractionGridQuestion(): Question {
	const parts = pick([2, 3, 4, 6, 8] as const);
	const filled = integer(1, parts - 1);
	const answer = `${filled}/${parts}`;
	const options = new Set([answer, `${parts - filled}/${parts}`, `1/${parts}`, `${filled}/${parts + 1}`]);
	return {
		id: id(),
		topic: "fractions",
		prompt: "Aký zlomok obrázka je vyfarbený?",
		answer,
		interaction: { kind: "fraction-grid", parts, filled, options: shuffle([...options].slice(0, 4)) },
		explanation: `Vyfarbených je ${filled} z ${parts} rovnakých častí, teda ${answer}.`,
	};
}

function fractionOfCollectionQuestion(): Question {
	const denominator = pick([2, 3, 4, 5] as const);
	const numerator = integer(1, denominator - 1);
	const onePart = integer(2, 12);
	const total = denominator * onePart;
	const answer = numerator * onePart;
	return {
		id: id(),
		topic: "fractions",
		prompt: `Koľko je ${numerator}/${denominator} z ${total}?`,
		answer: String(answer),
		choices: shuffle([String(answer), String(onePart), String(total - answer), String(answer + onePart)]),
		hint: `Najprv zisti 1/${denominator} z ${total}.`,
		explanation: `1/${denominator} z ${total} je ${onePart}; ${numerator}/${denominator} je ${numerator} × ${onePart} = ${answer}.`,
	};
}

function fractionCompareQuestion(): Question {
	const denominator = pick([4, 5, 6, 8, 10] as const);
	let a = integer(1, denominator - 1);
	let b = integer(1, denominator - 1);
	if (a === b) b = b === denominator - 1 ? b - 1 : b + 1;
	const answer = a < b ? "<" : ">";
	return {
		id: id(),
		topic: "fractions",
		prompt: `Doplň znak: ${a}/${denominator} ? ${b}/${denominator}`,
		answer,
		choices: ["<", ">", "="],
		explanation: `Pri rovnakom menovateli je väčší zlomok s väčším čitateľom: ${a}/${denominator} ${answer} ${b}/${denominator}.`,
	};
}

function bracketQuestion(): Question {
	const a = integer(2, 12);
	const b = integer(2, 20);
	const d = integer(2, 15);
	const multiplyOutside = Math.random() < 0.5;
	const answer = multiplyOutside ? a * (b + d) : (a + b) * d;
	const expression = multiplyOutside ? `${a} × (${b} + ${d})` : `(${a} + ${b}) × ${d}`;
	return {
		id: id(),
		topic: "multiplication",
		prompt: `${expression} = ?`,
		answer: String(answer),
		choices: shuffle([String(answer), String(answer + a), String(Math.max(1, answer - a)), String(a + b + d)]),
		hint: "Najprv vypočítaj to, čo je v zátvorke.",
		explanation: `${expression} = ${answer}.`,
	};
}

function multiDigitMultiplicationQuestion(): Question {
	const a = integer(101, 999);
	const b = integer(12, 999);
	const answer = a * b;
	return {
		id: id(),
		topic: "multiplication",
		prompt: `${a} × ${b} = ?`,
		answer: String(answer),
		hint: "Rozlož druhý činiteľ na stovky, desiatky a jednotky alebo násob písomne.",
		explanation: `${a} × ${b} = ${sk(answer)}.`,
	};
}

function powerOfTenQuestion(): Question {
	const mode = pick(["multiply", "divide"] as const);
	const power = pick([10, 100, 1_000] as const);
	const base = integer(12, 900);
	const left = mode === "multiply" ? base : base * power;
	const answer = mode === "multiply" ? base * power : base;
	return {
		id: id(),
		topic: "multiplication",
		prompt: mode === "multiply" ? `${sk(base)} × ${power} = ?` : `${sk(left)} ÷ ${power} = ?`,
		answer: String(answer),
		choices: shuffle([String(answer), String(answer * 10), String(Math.max(1, answer / 10)), String(base + power)]),
		explanation: mode === "multiply" ? `${sk(base)} × ${power} = ${sk(answer)}.` : `${sk(left)} ÷ ${power} = ${sk(answer)}.`,
	};
}

function solidQuestion(): Question {
	const variants = [
		{ prompt: "Ktoré teleso má 6 obdĺžnikových stien, 12 hrán a 8 vrcholov?", answer: "kváder" },
		{ prompt: "Ktoré teleso nemá žiadnu hranu ani vrchol?", answer: "guľa" },
		{ prompt: "Ktoré teleso má dve kruhové podstavy?", answer: "valec" },
		{ prompt: "Ktoré teleso má jednu kruhovú podstavu a jeden vrchol?", answer: "kužeľ" },
		{ prompt: "Ktoré teleso má podstavu a bočné trojuholníkové steny stretávajúce sa vo vrchole?", answer: "ihlan" },
	] as const;
	const q = pick(variants);
	return {
		id: id(),
		topic: "geometry",
		prompt: q.prompt,
		answer: q.answer,
		choices: shuffle([q.answer, ...shuffle(["kocka", "kváder", "valec", "kužeľ", "ihlan", "guľa"].filter((value) => value !== q.answer)).slice(0, 3)]),
		explanation: `Je to ${q.answer}.`,
	};
}

function cubeStackQuestion(): Question {
	const columns = Array.from({ length: integer(3, 5) }, () => integer(1, 4));
	const answer = columns.reduce((sum, value) => sum + value, 0);
	const options = new Set([answer, answer + 1, Math.max(1, answer - 1), columns.length]);
	return {
		id: id(),
		topic: "geometry",
		prompt: "Koľko kociek je spolu v tejto stavbe?",
		answer: String(answer),
		interaction: { kind: "cube-stack", columns, options: shuffle([...options]) },
		explanation: `Stĺpce majú ${columns.join(", ")} kociek; spolu ${answer}.`,
	};
}

function scaleGridQuestion(): Question {
	const width = integer(2, 5);
	const height = integer(2, 4);
	const scale = pick([2, 3] as const);
	const answer = `${width * scale} × ${height * scale}`;
	return {
		id: id(),
		topic: "geometry",
		prompt: `Obdĺžnik v štvorcovej sieti má rozmery ${width} × ${height} štvorčekov. Zväčšíme ho ${scale}-krát v oboch smeroch. Aké budú nové rozmery?`,
		answer,
		choices: shuffle([answer, `${width + scale} × ${height + scale}`, `${width * scale} × ${height}`, `${width} × ${height * scale}`]),
		explanation: `${width} × ${scale} = ${width * scale} a ${height} × ${scale} = ${height * scale}.`,
	};
}

function constructionQuestion(): Question {
	const variants = [
		{
			prompt: "Ktorý postup správne zostrojí kružnicu s polomerom 4 cm?",
			answer: "Kružidlo nastavím na 4 cm a opíšem kružnicu.",
			wrong: ["Nakreslím úsečku dlhú 8 cm.", "Odmeriam 4 cm iba pravítkom.", "Nakreslím ľubovoľný kruh."],
			explanation: "Polomer sa nastaví ako vzdialenosť hrotu kružidla od ceruzky.",
		},
		{
			prompt: "Ako zostrojíš priamku kolmú na danú priamku?",
			answer: "Pomocou pravítka s ryskou alebo trojuholníka vytvorím pravý uhol.",
			wrong: ["Nakreslím dve čiary, ktoré sa nepretínajú.", "Stačí odmerať rovnakú dĺžku.", "Nakreslím kružnicu."],
			explanation: "Kolmé priamky sa pretínajú pod uhlom 90°.",
		},
		{
			prompt: "Ako zostrojíš rovnobežku s danou priamkou?",
			answer: "Posuniem pravítko bez zmeny smeru a vediem druhú priamku.",
			wrong: ["Vytvorím pravý uhol.", "Obe priamky musia mať spoločný bod.", "Stačí nakresliť ľubovoľnú čiaru."],
			explanation: "Rovnobežné priamky majú rovnaký smer a nepretínajú sa.",
		},
		{
			prompt: "Máš narysovať štvorec so stranou 5 cm. Čo musí platiť?",
			answer: "Všetky štyri strany majú 5 cm a všetky uhly sú pravé.",
			wrong: ["Stačí, aby dve strany mali 5 cm.", "Všetky strany sú rôzne dlhé.", "Musí mať iba dva pravé uhly."],
			explanation: "Štvorec má štyri rovnako dlhé strany a štyri pravé uhly.",
		},
		{
			prompt: "Máš narysovať trojuholník so stranami 4 cm, 5 cm a 6 cm. Čím odmeriaš dĺžky strán?",
			answer: "Pravítkom; jednotlivé vrcholy spojím úsečkami danej dĺžky.",
			wrong: ["Iba kružidlom bez merania.", "Stačí odhadnúť dĺžky.", "Strany nemusia mať zadané dĺžky."],
			explanation: "Pri konštrukcii treba dodržať zadané dĺžky strán.",
		},
	] as const;
	const q = pick(variants);
	return {
		id: id(),
		topic: "geometry",
		prompt: q.prompt,
		answer: q.answer,
		choices: shuffle([q.answer, ...q.wrong]),
		explanation: q.explanation,
	};
}

function unitConversionQuestion(): Question {
	const units = [
		{ name: "mm", mm: 1 },
		{ name: "cm", mm: 10 },
		{ name: "dm", mm: 100 },
		{ name: "m", mm: 1_000 },
		{ name: "km", mm: 1_000_000 },
	] as const;
	let source = pick(units);
	let target = pick(units);
	while (source.name === target.name) target = pick(units);
	const ratio = source.mm / target.mm;
	let sourceValue: number;
	let answer: number;
	if (ratio >= 1) {
		sourceValue = integer(2, 250);
		answer = sourceValue * ratio;
	} else {
		const inverse = target.mm / source.mm;
		answer = integer(2, 80);
		sourceValue = answer * inverse;
	}
	return {
		id: id(),
		topic: "measurement",
		prompt: `${sk(sourceValue)} ${source.name} = koľko ${target.name}?`,
		answer: String(answer),
		choices: shuffle([String(answer), String(answer * 10), String(Math.max(1, answer / 10)), String(sourceValue)]),
		hint: "mm → cm → dm → m → km. Sleduj, o koľko miest sa posúvaš.",
		explanation: `${sk(sourceValue)} ${source.name} = ${sk(answer)} ${target.name}.`,
	};
}

function compoundLengthQuestion(): Question {
	const meters = integer(1, 25);
	const centimeters = integer(1, 99);
	const total = meters * 100 + centimeters;
	return {
		id: id(),
		topic: "measurement",
		prompt: `${total} cm zapíš v metroch a centimetroch.`,
		answer: `${meters} m ${centimeters} cm`,
		choices: shuffle([
			`${meters} m ${centimeters} cm`,
			`${meters + 1} m ${centimeters} cm`,
			`${meters} m ${100 - centimeters} cm`,
			`${Math.floor(total / 10)} m ${total % 10} cm`,
		]),
		explanation: `${total} cm = ${meters} m ${centimeters} cm.`,
	};
}

function compareLengthQuestion(): Question {
	const leftCm = integer(100, 2_000);
	let rightCm = integer(100, 2_000);
	if (leftCm === rightCm) rightCm += 10;
	const answer = leftCm < rightCm ? "<" : ">";
	const leftM = Math.floor(leftCm / 100);
	const leftRest = leftCm % 100;
	return {
		id: id(),
		topic: "measurement",
		prompt: `Doplň znak: ${leftM} m ${leftRest} cm ? ${rightCm} cm`,
		answer,
		choices: ["<", ">", "="],
		explanation: `${leftM} m ${leftRest} cm = ${leftCm} cm, teda ${leftCm} ${answer} ${rightCm}.`,
	};
}

function squarePerimeterQuestion(): Question {
	const side = integer(2, 40);
	const answer = 4 * side;
	return {
		id: id(),
		topic: "measurement",
		prompt: `Štvorec má stranu ${side} cm. Aký má obvod?`,
		answer: String(answer),
		choices: shuffle([String(answer), String(side * side), String(side * 2), String(answer + side)]),
		explanation: `4 × ${side} = ${answer} cm.`,
	};
}

function trianglePerimeterQuestion(): Question {
	const a = integer(3, 20);
	const b = integer(3, 20);
	const c = integer(Math.abs(a - b) + 1, Math.min(25, a + b - 1));
	const answer = a + b + c;
	return {
		id: id(),
		topic: "measurement",
		prompt: `Trojuholník má strany ${a} cm, ${b} cm a ${c} cm. Aký má obvod?`,
		answer: String(answer),
		explanation: `${a} + ${b} + ${c} = ${answer} cm.`,
	};
}

function probabilityQuestion(): Question {
	const red = integer(2, 12);
	let blue = integer(2, 12);
	if (red === blue) blue += 1;
	const answer = red > blue ? "červenú" : "modrú";
	return {
		id: id(),
		topic: "applications",
		prompt: `Vo vrecku je ${red} červených a ${blue} modrých guľôčok. Bez pozerania vytiahneš jednu. Ktorú farbu je pravdepodobnejšie vytiahnuť?`,
		answer,
		choices: ["červenú", "modrú", "obe rovnako", "nedá sa určiť"],
		explanation: `Viac je ${answer === "červenú" ? red : blue} guľôčok tejto farby, preto je jej vytiahnutie pravdepodobnejšie.`,
	};
}

function barChartQuestion(): Question {
	const labels = ["Po", "Ut", "St", "Št"];
	const values = shuffle([integer(3, 5), integer(6, 8), integer(9, 11), integer(12, 14)]);
	const max = Math.max(...values);
	const maxIndex = values.indexOf(max);
	const answer = labels[maxIndex];
	return {
		id: id(),
		topic: "applications",
		prompt: "V ktorý deň ukazuje graf najvyššiu hodnotu?",
		answer,
		interaction: { kind: "bar-chart", labels, values, options: labels },
		explanation: `Najvyšší stĺpec má ${max}; patrí dňu ${answer}.`,
	};
}


function directedRoundingQuestion(): Question {
	const step = pick([10, 100, 1_000, 10_000] as const);
	const value = integer(step + 1, Math.min(9_999_999, step * 999));
	const down = Math.floor(value / step) * step;
	const up = Math.ceil(value / step) * step;
	const roundUp = Math.random() < 0.5;
	const answer = roundUp ? up : down;
	return {
		id: id(),
		topic: "numbers",
		prompt: `Zaokrúhli ${sk(value)} ${roundUp ? "nahor" : "nadol"} na násobok ${sk(step)}.`,
		answer: String(answer),
		choices: shuffle([String(answer), String(roundUp ? down : up), String(value), String(answer + step)]),
		explanation: `Pri zaokrúhlení ${roundUp ? "nahor" : "nadol"} dostaneme ${sk(answer)}.`,
	};
}

function negativeIntroQuestion(): Question {
	const value = integer(1, 12);
	const contexts = [
		{ prompt: `Teplota je ${value} °C pod nulou. Ako ju zapíšeme číslom?`, answer: -value },
		{ prompt: `Výťah je ${value} podlaží pod prízemím označeným 0. Aké číslo označuje jeho polohu?`, answer: -value },
	] as const;
	const q = pick(contexts);
	return {
		id: id(),
		topic: "numbers",
		prompt: q.prompt,
		answer: String(q.answer),
		choices: shuffle([String(q.answer), String(value), "0", String(-(value + 1))]),
		explanation: `Hodnoty pod nulou zapisujeme záporným číslom: ${q.answer}.`,
	};
}

function decimalSortQuestion(): Question {
	const raw = new Set<number>();
	while (raw.size < 4) raw.add(integer(101, 999));
	const values = [...raw].map((value) => value / 100);
	const shuffled = shuffle(values);
	const sorted = [...values].sort((a, b) => a - b);
	return {
		id: id(),
		topic: "decimals",
		prompt: "Ťukaj desatinné čísla od najmenšieho po najväčšie.",
		answer: sorted.join(","),
		interaction: { kind: "sort", values: shuffled },
		explanation: `Správne poradie je ${sorted.map(decimalTrim).join(" < ")}.`,
	};
}

function decimalDirectedRoundingQuestion(): Question {
	const hundredths = integer(101, 9_999);
	const value = hundredths / 100;
	const upward = Math.random() < 0.5;
	const answer = upward ? Math.ceil(value) : Math.floor(value);
	return {
		id: id(),
		topic: "decimals",
		prompt: `Zaokrúhli ${decimalTrim(value)} ${upward ? "nahor" : "nadol"} na celé číslo.`,
		answer: String(answer),
		choices: shuffle([String(answer), String(upward ? Math.floor(value) : Math.ceil(value)), String(Math.round(value)), String(answer + 1)]),
		explanation: `Pri zaokrúhlení ${upward ? "nahor" : "nadol"} na celé číslo dostaneme ${answer}.`,
	};
}

function multiAddendQuestion(): Question {
	const values = Array.from({ length: integer(3, 5) }, () => integer(100, 9_999));
	const answer = values.reduce((sum, value) => sum + value, 0);
	return {
		id: id(),
		topic: "addition",
		prompt: `${values.map(sk).join(" + ")} = ?`,
		answer: String(answer),
		hint: "Môžeš si sčítance vhodne preskupiť.",
		explanation: `Súčet je ${sk(answer)}.`,
	};
}

function quotientComparisonQuestion(): Question {
	const smaller = integer(2, 20);
	const factor = integer(2, 12);
	const larger = smaller * factor;
	return {
		id: id(),
		topic: "multiplication",
		prompt: `${larger} je koľkokrát viac ako ${smaller}?`,
		answer: String(factor),
		choices: shuffle([String(factor), String(larger - smaller), String(smaller), String(factor + 1)]),
		explanation: `${larger} ÷ ${smaller} = ${factor}.`,
	};
}

function distributiveQuestion(): Question {
	const factor = integer(2, 12);
	const tens = integer(2, 9) * 10;
	const units = integer(1, 9);
	const answer = factor * (tens + units);
	return {
		id: id(),
		topic: "multiplication",
		prompt: `${factor} × (${tens} + ${units}) = ?`,
		answer: String(answer),
		choices: shuffle([String(answer), String(factor * tens + units), String(factor + tens + units), String(factor * tens)]),
		hint: `Môžeš použiť ${factor} × ${tens} + ${factor} × ${units}.`,
		explanation: `${factor} × ${tens} + ${factor} × ${units} = ${answer}.`,
	};
}

function repeatedOperationQuestion(): Question {
	const factor = integer(3, 8);
	const value = integer(4, 15);
	const product = factor * value;
	const multiplicationMode = Math.random() < 0.5;
	return {
		id: id(),
		topic: "multiplication",
		prompt: multiplicationMode
			? `Ktorý zápis znamená ${factor} × ${value}?`
			: `Ktorý zápis ukazuje ${product} ÷ ${value} ako postupné odčítanie?`,
		answer: multiplicationMode
			? Array.from({ length: factor }, () => String(value)).join(" + ")
			: Array.from({ length: factor }, (_, index) => String(product - (index + 1) * value)).join(", "),
		choices: multiplicationMode
			? shuffle([
				Array.from({ length: factor }, () => String(value)).join(" + "),
				`${factor} + ${value}`,
				`${factor} + ${factor} + ${value}`,
				`${value} − ${factor}`,
			])
			: shuffle([
				Array.from({ length: factor }, (_, index) => String(product - (index + 1) * value)).join(", "),
				`${product - value}, ${product - value * 2}`,
				`${product + value}, ${product + value * 2}`,
				`${product}, ${product - 1}, ${product - 2}`,
			]),
		explanation: multiplicationMode
			? "Násobenie možno chápať ako opakované sčítanie rovnakého čísla."
			: "Pri delení postupne odčítavame deliteľa, až kým sa dostaneme na nulu.",
	};
}

function rulerQuestion(): Question {
	const millimeters = integer(12, 87);
	const options = new Set([millimeters, millimeters + 5, Math.max(1, millimeters - 5), millimeters + 10]);
	return {
		id: id(),
		topic: "measurement",
		prompt: "Odmeraj dĺžku úsečky na pravítku. Koľko má milimetrov?",
		answer: String(millimeters),
		interaction: { kind: "ruler", millimeters, options: shuffle([...options]) },
		explanation: `Úsečka siaha od 0 po ${millimeters} mm.`,
	};
}

function estimateDistanceQuestion(): Question {
	const variants = [
		{ prompt: "Aká je rozumná dĺžka bežnej triedy?", answer: "8 m", options: ["8 mm", "8 cm", "8 m", "8 km"] },
		{ prompt: "Aká je rozumná výška dverí?", answer: "2 m", options: ["2 mm", "2 cm", "2 m", "2 km"] },
		{ prompt: "Aká je približná dĺžka ceruzky?", answer: "18 cm", options: ["18 mm", "18 cm", "18 m", "18 km"] },
	] as const;
	const q = pick(variants);
	return {
		id: id(),
		topic: "measurement",
		prompt: q.prompt,
		answer: q.answer,
		choices: shuffle([...q.options]),
		explanation: `${q.answer} je primeraný odhad.`,
	};
}

function areaUnitQuestion(): Question {
	const unit = pick(["cm²", "mm²"] as const);
	const a = integer(2, 12);
	const b = integer(2, 12);
	const answer = a * b;
	return {
		id: id(),
		topic: "measurement",
		prompt: `Obdĺžnik má rozmery ${a} ${unit === "cm²" ? "cm" : "mm"} × ${b} ${unit === "cm²" ? "cm" : "mm"}. Aký je jeho obsah?`,
		answer: `${answer} ${unit}`,
		choices: shuffle([`${answer} ${unit}`, `${2 * (a + b)} ${unit}`, `${a + b} ${unit}`, `${answer} ${unit === "cm²" ? "cm" : "mm"}`]),
		explanation: `${a} × ${b} = ${answer} ${unit}.`,
	};
}

function cuboidUnitCubesQuestion(): Question {
	const a = integer(2, 5);
	const b = integer(2, 4);
	const d = integer(2, 4);
	const answer = a * b * d;
	return {
		id: id(),
		topic: "geometry",
		prompt: `Kváder je postavený z jednotkových kociek: ${a} na dĺžku, ${b} na šírku a ${d} na výšku. Koľko kociek obsahuje?`,
		answer: String(answer),
		choices: shuffle([String(answer), String(a + b + d), String(a * b), String(2 * (a + b + d))]),
		explanation: `${a} × ${b} × ${d} = ${answer} jednotkových kociek.`,
	};
}

function symmetryGridQuestion(): Question {
	const mode = pick(["axis", "center"] as const);
	let x = integer(-4, 4);
	let y = integer(-4, 4);
	if (x === 0) x = 2;
	if (mode === "center" && y === 0) y = 2;
	const targetX = -x;
	const targetY = mode === "axis" ? y : -y;
	const answer = `(${targetX};${targetY})`;
	const options = new Set([answer, `(${x};${-y})`, `(${x};${y})`, `(${targetX};${-targetY})`]);
	let optionOffset = 1;
	while (options.size < 4) {
		options.add(`(${targetX + 10 + optionOffset};${targetY + optionOffset})`);
		optionOffset += 1;
	}
	return {
		id: id(),
		topic: "symmetry",
		prompt: mode === "axis"
			? "Kde bude obraz bodu A pri osovej súmernosti podľa zvislej osi?"
			: "Kde bude obraz bodu A pri stredovej súmernosti podľa bodu O?",
		answer,
		interaction: { kind: "symmetry-grid", mode, x, y, options: shuffle([...options]) },
		explanation: mode === "axis"
			? `Pri zrkadlení podľa zvislej osi sa zmení znamienko x: ${answer}.`
			: `Pri stredovej súmernosti sa zmenia obe znamienka: ${answer}.`,
	};
}

function directProportionQuestion(): Question {
	const price = integer(2, 9);
	const count = integer(3, 8);
	const answer = price * count;
	return storyChoice(
		"applications",
		"🥤",
		`Jeden nápoj stojí ${price} €. Koľko stoja ${count} rovnaké nápoje?`,
		String(answer),
		[String(answer), String(price + count), String(answer - price), String(answer + price)],
		"Viac rovnakých kusov znamená cenu násobiť počtom kusov.",
		`${price} × ${count} = ${answer} €.`,
	);
}

function inverseProportionQuestion(): Question {
	const workers = pick([2, 3, 4] as const);
	const days = pick([6, 8, 12] as const);
	const doubledWorkers = workers * 2;
	const answer = days / 2;
	return storyChoice(
		"applications",
		"🧱",
		`Ak ${workers} rovnako rýchli pracovníci urobia jednoduchú prácu za ${days} dní, za koľko dní ju pri rovnakom tempe urobí ${doubledWorkers} pracovníkov?`,
		String(answer),
		[String(answer), String(days), String(days * 2), String(Math.max(1, answer + 2))],
		"Keď je pracovníkov dvojnásobok, potrebný čas je polovičný.",
		`${doubledWorkers} je dvojnásobok ${workers}, preto ${days} ÷ 2 = ${answer} dní.`,
	);
}

function dataTableQuestion(): Question {
	const headers = ["Deň", "Knihy"];
	const labels = ["Po", "Ut", "St", "Št"];
	const values = shuffle([4, 7, 10, 13]);
	const rows = labels.map((label, index) => [label, String(values[index])]);
	const sorted = labels.map((label, index) => ({ label, value: values[index] })).sort((a, b) => a.value - b.value);
	const answer = sorted.map((item) => item.label).join(" → ");
	const alternatives = [
		answer,
		[...sorted].reverse().map((item) => item.label).join(" → "),
		labels.join(" → "),
		shuffle(labels).join(" → "),
	];
	const options = [...new Set(alternatives)];
	while (options.length < 4) options.push(shuffle(labels).join(" → "));
	return {
		id: id(),
		topic: "applications",
		prompt: "Zoraď dni podľa údajov v tabuľke od najmenšej hodnoty po najväčšiu.",
		answer,
		interaction: { kind: "data-table", headers, rows, options: options.slice(0, 4) },
		explanation: `Poradie hodnôt je ${sorted.map((item) => item.value).join(" < ")}, teda ${answer}.`,
	};
}

function chartFromTableQuestion(): Question {
	const headers = ["Tím", "Body"];
	const rows = [["A", "3"], ["B", "6"], ["C", "9"]];
	const answer = "A: 3, B: 6, C: 9";
	return {
		id: id(),
		topic: "applications",
		prompt: "Ktoré výšky stĺpcov správne znázorňujú údaje z tabuľky?",
		answer,
		interaction: {
			kind: "data-table",
			headers,
			rows,
			options: shuffle([answer, "A: 9, B: 6, C: 3", "A: 3, B: 9, C: 6", "A: 6, B: 3, C: 9"]),
		},
		explanation: "Stĺpce musia mať rovnaké hodnoty ako príslušné riadky tabuľky.",
	};
}


function numberWordQuestion(): Question {
	const pairs = [
		["jedenásť", 11],
		["dvadsaťpäť", 25],
		["štyridsaťosem", 48],
		["stosedem", 107],
		["dvestopätnásť", 215],
		["deväťstodeväťdesiatdeväť", 999],
		["tisíc", 1_000],
		["päťtisíc", 5_000],
		["dvanásťtisíc", 12_000],
		["dvadsaťpäťtisíc", 25_000],
		["stotisíc", 100_000],
	] as const;
	const [words, value] = pick(pairs);
	const wordsToNumber = Math.random() < 0.5;
	if (wordsToNumber) {
		const options = new Set([value, value + 10, Math.max(1, value - 10), value * 10]);
		return {
			id: id(),
			topic: "numbers",
			prompt: `Ktoré číslo je zapísané slovom „${words}“?`,
			answer: String(value),
			choices: shuffle([...options].map(String)),
			explanation: `${words} = ${sk(value)}.`,
		};
	}
	const distractors = shuffle(pairs.filter((item) => item[1] !== value)).slice(0, 3).map((item) => item[0]);
	return {
		id: id(),
		topic: "numbers",
		prompt: `Ako slovom zapíšeme číslo ${sk(value)}?`,
		answer: words,
		choices: shuffle([words, ...distractors]),
		explanation: `${sk(value)} sa zapíše „${words}“.`,
	};
}

function placeValueComposeQuestion(): Question {
	const hundredThousands = integer(1, 8);
	const tenThousands = integer(0, 9);
	const thousands = integer(0, 9);
	const hundreds = integer(0, 9);
	const tens = integer(0, 9);
	const ones = integer(0, 9);
	const value =
		hundredThousands * 100_000 +
		tenThousands * 10_000 +
		thousands * 1_000 +
		hundreds * 100 +
		tens * 10 +
		ones;
	const answer = String(value);
	return {
		id: id(),
		topic: "numbers",
		prompt: `Zlož číslo: ${hundredThousands} stotisícok + ${tenThousands} desaťtisícok + ${thousands} tisícok + ${hundreds} stoviek + ${tens} desiatok + ${ones} jednotiek.`,
		answer,
		choices: shuffle([
			answer,
			String(value + 1_000),
			String(Math.max(1, value - 10_000)),
			String(hundredThousands * 100_000 + thousands * 10_000 + tenThousands * 1_000 + hundreds * 100 + tens * 10 + ones),
		]),
		explanation: `Po sčítaní hodnôt rádov dostaneme ${sk(value)}.`,
	};
}

function numberLineTargetQuestion(): Question {
	const step = pick([10, 100, 1_000, 10_000] as const);
	const start = integer(1, 40) * step;
	const count = 6;
	const targetIndex = integer(1, count - 2);
	const answer = start + targetIndex * step;
	return {
		id: id(),
		topic: "numbers",
		prompt: "Aké číslo označuje zvýraznený bod na číselnej osi?",
		answer: String(answer),
		interaction: {
			kind: "number-line-target",
			start,
			step,
			count,
			targetIndex,
			options: shuffle([answer, answer - step, answer + step, start + (count - 1) * step]),
		},
		explanation: `Rozostup bodov je ${sk(step)}, preto zvýraznený bod označuje ${sk(answer)}.`,
	};
}

function zeroEndingOperationQuestion(): Question {
	const multiplicationMode = Math.random() < 0.5;
	if (multiplicationMode) {
		const a = integer(2, 9) * 10;
		const b = integer(2, 9) * 100;
		const answer = a * b;
		return {
			id: id(),
			topic: "multiplication",
			prompt: `${a} × ${b} = ?`,
			answer: String(answer),
			choices: shuffle([String(answer), String(answer / 10), String(answer * 10), String(a * (b / 10))]),
			hint: "Najprv násob číslice bez núl, potom doplň nuly.",
			explanation: `${a} × ${b} = ${sk(answer)}.`,
		};
	}
	const divisor = integer(2, 9);
	const quotient = integer(2, 90) * 1_000;
	const dividend = divisor * quotient;
	return {
		id: id(),
		topic: "multiplication",
		prompt: `${sk(dividend)} ÷ ${divisor} = ?`,
		answer: String(quotient),
		choices: shuffle([String(quotient), String(quotient / 10), String(quotient * 10), String(dividend - divisor)]),
		explanation: `${sk(dividend)} ÷ ${divisor} = ${sk(quotient)}.`,
	};
}

function operationPropertyQuestion(): Question {
	const multiplicationMode = Math.random() < 0.5;
	if (multiplicationMode) {
		const a = integer(3, 30);
		const b = integer(3, 30);
		const answer = `${b} × ${a}`;
		return {
			id: id(),
			topic: "multiplication",
			prompt: `Ktorý výraz má určite rovnakú hodnotu ako ${a} × ${b}?`,
			answer,
			choices: shuffle([answer, `${a} + ${b}`, `${a} × (${b} + 1)`, `${b} − ${a}`]),
			explanation: "Pri násobení môžeme činitele vymeniť: a × b = b × a.",
		};
	}
	const a = integer(10, 60);
	const b = 100 - a;
	const cValue = integer(5, 80);
	const answer = `(${a} + ${b}) + ${cValue}`;
	return {
		id: id(),
		topic: "addition",
		prompt: `Ktorý zápis je najvýhodnejší pre ${a} + ${cValue} + ${b}?`,
		answer,
		choices: shuffle([answer, `${a} + (${cValue} + ${b})`, `${a} − ${cValue} + ${b}`, `${a} × ${b} + ${cValue}`]),
		explanation: `${a} + ${b} = 100, preto je výhodné spojiť tieto dva sčítance.`,
	};
}

function mixedOrderQuestion(): Question {
	const a = integer(12, 40);
	const b = integer(2, 8);
	const cValue = integer(2, 8);
	const d = integer(2, 8);
	const mode = integer(0, 2);
	let expression: string;
	let answer: number;
	if (mode === 0) {
		expression = `${a} − ${b} × ${cValue} + ${d}`;
		answer = a - b * cValue + d;
	} else if (mode === 1) {
		const product = b * cValue;
		expression = `(${a} + ${product}) ÷ ${b}`;
		answer = (a + product) / b;
		if (!Number.isInteger(answer)) return mixedOrderQuestion();
	} else {
		const dividend = b * cValue * d;
		expression = `${dividend} ÷ ${b} − ${cValue} + ${a}`;
		answer = dividend / b - cValue + a;
	}
	return {
		id: id(),
		topic: "multiplication",
		prompt: `${expression} = ?`,
		answer: String(answer),
		choices: shuffle([String(answer), String(answer + b), String(answer - d), String(Math.abs(a - b - cValue - d))]),
		hint: "Najprv zátvorky, potom násobenie a delenie, nakoniec sčítanie a odčítanie.",
		explanation: `Pri správnom poradí operácií vyjde ${answer}.`,
	};
}

function ratioQuestion(): Question {
	const firstPart = integer(1, 5);
	const secondPart = integer(1, 5);
	const multiplier = integer(2, 8);
	const first = firstPart * multiplier;
	const second = secondPart * multiplier;
	const divisor = (() => {
		let a = first;
		let b = second;
		while (b !== 0) [a, b] = [b, a % b];
		return a;
	})();
	const simplified = `${first / divisor} : ${second / divisor}`;
	return {
		id: id(),
		topic: "applications",
		prompt: `V krabici je ${first} červených a ${second} modrých dielikov. Aký je pomer červených k modrým v základnom tvare?`,
		answer: simplified,
		choices: shuffle([simplified, `${second / divisor} : ${first / divisor}`, `${first} : 1`, `1 : ${second}`]),
		explanation: `${first} : ${second} po skrátení je ${simplified}.`,
	};
}

function mapSchemeQuestion(): Question {
	const labels = ["Dom", "Park", "Škola", "Ihrisko"];
	const edges: Array<[number, number, number]> = [
		[0, 1, 3],
		[1, 2, 4],
		[0, 3, 5],
		[3, 2, 3],
		[1, 3, 2],
	];
	const answer = "Dom → Park → Škola";
	return {
		id: id(),
		topic: "applications",
		prompt: "Ktorá z ponúkaných trás z domu do školy je podľa mapky najkratšia?",
		answer,
		interaction: {
			kind: "route-map",
			labels,
			edges,
			options: shuffle([
				answer,
				"Dom → Ihrisko → Škola",
				"Dom → Park → Ihrisko → Škola",
				"Dom → Ihrisko → Park → Škola",
			]),
		},
		explanation: "Dom → Park → Škola má dĺžku 3 + 4 = 7; ostatné ponúknuté trasy sú dlhšie.",
	};
}

function unitConversionStoryQuestion(): Question {
	const meters = integer(1, 8);
	const extraCm = integer(20, 95);
	const secondCm = integer(80, 350);
	const total = meters * 100 + extraCm + secondCm;
	return storyChoice(
		"measurement",
		"🧵",
		`Prvý kus stuhy má ${meters} m ${extraCm} cm a druhý ${secondCm} cm. Koľko centimetrov majú spolu?`,
		String(total),
		[String(total), String(total - 100), String(total + 100), String(meters + extraCm + secondCm)],
		"Najprv premeň metre na centimetre.",
		`${meters} m ${extraCm} cm = ${meters * 100 + extraCm} cm; spolu ${total} cm.`,
	);
}

function cubeCodeQuestion(): Question {
	const columns = [integer(1, 4), integer(1, 4), integer(1, 4), integer(1, 4)];
	const answer = columns.join("-");
	const alternatives = [
		[...columns].reverse().join("-"),
		columns.map((value, index) => index === 1 ? Math.min(4, value + 1) : value).join("-"),
		columns.map((value, index) => index === 2 ? Math.max(1, value - 1) : value).join("-"),
	];
	const options = [...new Set([answer, ...alternatives])];
	while (options.length < 4) options.push(columns.map((value) => Math.max(1, 5 - value)).join("-"));
	return {
		id: id(),
		topic: "geometry",
		prompt: "Ak kód udáva výšku stĺpcov kociek zľava doprava, ktorý kód opisuje stavbu?",
		answer,
		interaction: { kind: "cube-code", columns, options: shuffle(options.slice(0, 4)) },
		explanation: `Výšky stĺpcov zľava doprava sú ${columns.join(", ")}, teda kód ${answer}.`,
	};
}

function cubeCodeToBuildQuestion(): Question {
	const code = [integer(1, 4), integer(1, 4), integer(1, 4)];
	const answer = `${code[0]}, ${code[1]}, ${code[2]}`;
	return {
		id: id(),
		topic: "geometry",
		prompt: `Kód stavby je ${code.join("-")}. Ktorý opis výšok stĺpcov zľava doprava je správny?`,
		answer,
		choices: shuffle([
			answer,
			`${code[2]}, ${code[1]}, ${code[0]}`,
			`${code[0]}, ${Math.min(4, code[1] + 1)}, ${code[2]}`,
			`${Math.max(1, code[0] - 1)}, ${code[1]}, ${code[2]}`,
		]),
		explanation: "Každá číslica kódu udáva výšku príslušného stĺpca.",
	};
}

function axisFromPointPairQuestion(): Question {
	const y = integer(-3, 3);
	let x = integer(1, 4);
	const answer = "zvislá os x = 0";
	return {
		id: id(),
		topic: "symmetry",
		prompt: `Body A(${-x}; ${y}) a A′(${x}; ${y}) sú navzájom osovo súmerné. Kde leží os súmernosti?`,
		answer,
		choices: shuffle([answer, "vodorovná os y = 0", `zvislá os x = ${x}`, `vodorovná os y = ${y}`]),
		explanation: "Os súmernosti leží presne v polovici medzi bodmi, teda na x = 0.",
	};
}

function centerFromPointPairQuestion(): Question {
	const x = integer(1, 4);
	const y = integer(1, 4);
	const answer = "O(0; 0)";
	return {
		id: id(),
		topic: "symmetry",
		prompt: `Body A(${x}; ${y}) a A′(${-x}; ${-y}) sú stredovo súmerné. Kde je stred súmernosti?`,
		answer,
		choices: shuffle([answer, `O(${x}; 0)`, `O(0; ${y})`, `O(${x}; ${y})`]),
		explanation: "Stred súmernosti je stred úsečky AA′, teda O(0; 0).",
	};
}

function symmetryShapeQuestion(): Question {
	const mode = pick(["axis", "center"] as const);
	const points: Array<[number, number]> = [[1, 1], [3, 1], [2, 3]];
	const correctPoints = points.map(([x, y]) => mode === "axis" ? [-x, y] as [number, number] : [-x, -y] as [number, number]);
	const wrong1 = points.map(([x, y]) => [x, -y] as [number, number]);
	const wrong2 = points.map(([x, y]) => [x + 1, y] as [number, number]);
	const wrong3 = points.map(([x, y]) => mode === "axis" ? [-x, -y] as [number, number] : [-x, y] as [number, number]);
	const answer = "A";
	return {
		id: id(),
		topic: "symmetry",
		prompt: mode === "axis"
			? "Ktorý obrázok je správnym obrazom trojuholníka v osovej súmernosti podľa zvislej osi?"
			: "Ktorý obrázok je správnym obrazom trojuholníka v stredovej súmernosti podľa bodu O?",
		answer,
		interaction: {
			kind: "symmetry-shape",
			mode,
			points,
			options: shuffle([
				{ answer: "A", points: correctPoints },
				{ answer: "B", points: wrong1 },
				{ answer: "C", points: wrong2 },
				{ answer: "D", points: wrong3 },
			]),
		},
		explanation: mode === "axis" ? "Pri osovej súmernosti podľa zvislej osi sa zmení znamienko x." : "Pri stredovej súmernosti sa zmenia znamienka x aj y.",
	};
}

function chartChoiceQuestion(): Question {
	const labels = ["A", "B", "C"];
	const targetValues = shuffle([3, 6, 9]);
	const correct = { answer: "A", values: targetValues };
	const reversed = { answer: "B", values: [...targetValues].reverse() };
	const swapped = { answer: "C", values: [targetValues[1], targetValues[0], targetValues[2]] };
	const shifted = { answer: "D", values: targetValues.map((value) => value + 2) };
	return {
		id: id(),
		topic: "applications",
		prompt: `Tabuľka hovorí: A = ${targetValues[0]}, B = ${targetValues[1]}, C = ${targetValues[2]}. Ktorý graf ju znázorňuje správne?`,
		answer: "A",
		interaction: {
			kind: "chart-choice",
			labels,
			targetValues,
			options: shuffle([correct, reversed, swapped, shifted]),
		},
		explanation: "Správny graf má pri každom označení presne výšku uvedenú v tabuľke.",
	};
}

function enumeratePossibilitiesQuestion(): Question {
	const answer = "červené tričko + rifle; červené tričko + šortky; modré tričko + rifle; modré tričko + šortky; zelené tričko + rifle; zelené tričko + šortky";
	return {
		id: id(),
		topic: "applications",
		prompt: "Máš 3 tričká (červené, modré, zelené) a 2 nohavice (rifle, šortky). Ktorý zoznam obsahuje všetky možné kombinácie a žiadnu navyše?",
		answer,
		choices: shuffle([
			answer,
			"červené tričko + rifle; modré tričko + šortky; zelené tričko + rifle",
			"červené tričko + rifle; červené tričko + šortky; modré tričko + rifle; zelené tričko + šortky",
			"červené tričko + rifle; modré tričko + rifle; zelené tričko + rifle; šortky",
		]),
		explanation: "Ku každému z 3 tričiek patria obe možnosti nohavíc, spolu 3 × 2 = 6 kombinácií.",
	};
}

function classificationQuestion(): Question {
	const answer = "12, 18, 24";
	return {
		id: id(),
		topic: "applications",
		prompt: "Ktorá skupina obsahuje iba čísla deliteľné 6?",
		answer,
		choices: shuffle([answer, "10, 18, 24", "12, 20, 30", "6, 14, 24"]),
		explanation: "12, 18 aj 24 sú násobky čísla 6.",
	};
}


const numbers = [roundingQuestion, directedRoundingQuestion, compareQuestion, parityQuestion, negativeIntroQuestion, numberLineQuestion, numberLineTargetQuestion, numberFilterQuestion, decompositionQuestion, placeValueComposeQuestion, numberWordQuestion, romanQuestion] as const;
const decimals = [decimalMoneyQuestion, decimalSubtractionQuestion, decimalCompareQuestion, decimalSortQuestion, decimalRoundingQuestion, decimalDirectedRoundingQuestion, decimalPowerQuestion] as const;
const fractions = [fractionGridQuestion, fractionOfCollectionQuestion, fractionCompareQuestion] as const;
const geometry = [shapePropertyQuestion, lineRelationQuestion, circleQuestion, cubeFactsQuestion, quadrilateralQuestion, solidQuestion, cubeStackQuestion, cubeCodeQuestion, cubeCodeToBuildQuestion, cuboidUnitCubesQuestion, scaleGridQuestion, constructionQuestion] as const;
const addition = [additionQuestion, subtractionQuestion, multiAddendQuestion, operationPropertyQuestion, missingAddendQuestion, differenceComparisonQuestion, estimateSumQuestion, additionStoryQuestion] as const;
const symmetry = [axisCountQuestion, symmetryTypeQuestion, mirrorDistanceQuestion, symmetryGridQuestion, axisFromPointPairQuestion, centerFromPointPairQuestion, symmetryShapeQuestion, centralSymmetryQuestion, noAxisSymmetryQuestion] as const;
const multiplication = [multiplicationQuestion, multiDigitMultiplicationQuestion, zeroEndingOperationQuestion, divisionQuestion, orderQuestion, mixedOrderQuestion, bracketQuestion, powerOfTenQuestion, operationPropertyQuestion, quotientComparisonQuestion, distributiveQuestion, repeatedOperationQuestion, missingFactorQuestion, divisionRemainderQuestion, compoundStoryQuestion, divisionStoryQuestion] as const;
const measurement = [perimeterQuestion, squarePerimeterQuestion, trianglePerimeterQuestion, areaQuestion, areaUnitQuestion, rulerQuestion, estimateDistanceQuestion, unitsQuestion, unitConversionQuestion, compoundLengthQuestion, compareLengthQuestion, unitConversionStoryQuestion, gridAreaQuestion, differenceStoryQuestion, xylophoneQuestion] as const;
const applications = [overlapStoryQuestion, financeStoryQuestion, ratioQuestion, directProportionQuestion, inverseProportionQuestion, mapSchemeQuestion, possibleDiceSumQuestion, probabilityQuestion, chartDataQuestion, barChartQuestion, dataTableQuestion, chartFromTableQuestion, chartChoiceQuestion, enumeratePossibilitiesQuestion, classificationQuestion, halfCollectionQuestion, pathsQuestion] as const;

export const generators = { numbers, decimals, fractions, geometry, addition, symmetry, multiplication, measurement, applications };

export const curriculumCoverage = [
	"number-reading-writing",
	"place-value-decompose-compose",
	"even-odd",
	"compare-order-natural-numbers",
	"round-nearest-up-down",
	"number-line-place-and-read",
	"roman-numerals-and-years",
	"decimals-compare-order-round-arithmetic-powers-of-ten",
	"fractions-as-part-of-whole",
	"add-subtract-multiple-addends-difference",
	"multiply-divide-written-and-remainder",
	"two-and-three-digit-multiplication",
	"two-digit-division",
	"powers-of-ten-and-zero-ending-operations",
	"increase-decrease-by-and-times",
	"compare-by-difference-and-quotient",
	"operation-properties-and-distributivity",
	"operation-order-and-parentheses",
	"negative-number-introduction",
	"ratio-direct-and-inverse-proportion",
	"length-units-conversion-and-applied-stories",
	"measure-to-millimeter-and-estimate-distance",
	"perimeter-triangle-square-rectangle",
	"area-grid-and-square-units",
	"scale-figures-in-grid",
	"solid-properties",
	"cube-build-count-and-code",
	"axis-and-central-symmetry-points-pairs-shapes",
	"read-sort-and-classify-data",
	"tables-diagrams-maps-and-schemes",
	"choose-correct-chart-from-data",
	"probability-more-less-likely",
	"systematic-enumeration-of-possibilities",
	"strategy-and-real-world-word-problems",
] as const;


const curriculumTopics = ["numbers", "decimals", "fractions", "geometry", "addition", "symmetry", "multiplication", "measurement", "applications"] as const;

export function generateQuestion(topic: TopicId): Question {
	if (topic === "mixed") {
		return generateQuestion(pick(curriculumTopics));
	}
	const factory = pick(generators[topic]);
	return factory();
}

const interactiveGenerators = {
	numbers: [compareQuestion, parityQuestion, negativeIntroQuestion, numberLineQuestion, numberLineTargetQuestion, numberFilterQuestion, placeValueComposeQuestion, numberWordQuestion, romanQuestion],
	decimals: [decimalCompareQuestion, decimalSortQuestion, decimalRoundingQuestion, decimalDirectedRoundingQuestion, decimalPowerQuestion],
	fractions: [fractionGridQuestion, fractionOfCollectionQuestion, fractionCompareQuestion],
	geometry: [shapePropertyQuestion, lineRelationQuestion, circleQuestion, cubeFactsQuestion, quadrilateralQuestion, solidQuestion, cubeStackQuestion, cubeCodeQuestion, cubeCodeToBuildQuestion, cuboidUnitCubesQuestion, scaleGridQuestion, constructionQuestion],
	addition: [operationPropertyQuestion, missingAddendQuestion, differenceComparisonQuestion, estimateSumQuestion],
	symmetry: [axisCountQuestion, symmetryTypeQuestion, mirrorDistanceQuestion, symmetryGridQuestion, axisFromPointPairQuestion, centerFromPointPairQuestion, symmetryShapeQuestion, centralSymmetryQuestion, noAxisSymmetryQuestion],
	multiplication: [zeroEndingOperationQuestion, mixedOrderQuestion, operationPropertyQuestion, missingFactorQuestion, divisionRemainderQuestion, bracketQuestion, powerOfTenQuestion, quotientComparisonQuestion, distributiveQuestion, repeatedOperationQuestion, compoundStoryQuestion, divisionStoryQuestion],
	measurement: [gridAreaQuestion, rulerQuestion, estimateDistanceQuestion, areaUnitQuestion, unitConversionQuestion, compoundLengthQuestion, compareLengthQuestion, unitConversionStoryQuestion, differenceStoryQuestion, xylophoneQuestion],
	applications: [overlapStoryQuestion, financeStoryQuestion, ratioQuestion, directProportionQuestion, inverseProportionQuestion, mapSchemeQuestion, possibleDiceSumQuestion, probabilityQuestion, barChartQuestion, dataTableQuestion, chartFromTableQuestion, chartChoiceQuestion, enumeratePossibilitiesQuestion, classificationQuestion, chartDataQuestion, halfCollectionQuestion, pathsQuestion],
} as const;

const storyTopics = ["addition", "multiplication", "measurement", "applications"] as const;

export function generateRoundQuestion(topic: TopicId, index: number): Question {
	const resolvedTopic = topic === "mixed" ? pick(curriculumTopics) : topic;

	if ((index === 4 || index === 8) && (topic === "mixed" || storyTopics.includes(resolvedTopic as typeof storyTopics[number]))) {
		return generateStoryQuestion(topic === "mixed" ? pick(storyTopics) : resolvedTopic, index === 4 ? "a" : "b");
	}
	if (index % 2 === 0) return generateQuestion(topic);

	const factory = pick(interactiveGenerators[resolvedTopic]);
	return factory();
}

export function normalizeAnswer(value: string): string {
	return value.trim().replaceAll(" ", "").replace(",", ".").toLocaleLowerCase("sk");
}

export function isCorrect(question: Question, answer: string): boolean {
	const actual = normalizeAnswer(answer);
	const expected = normalizeAnswer(question.answer);
	if (actual === expected) return true;

	const numericPattern = /^-?\d+(?:\.\d+)?$/;
	if (numericPattern.test(actual) && numericPattern.test(expected)) {
		return Number(actual) === Number(expected);
	}

	return false;
}

export { shuffle };
