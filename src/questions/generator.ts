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
		topic: "geometry",
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
		topic: "geometry",
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
		topic: "geometry",
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
		"geometry",
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
		"arithmetic",
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
function geometryStoryQuestion(): Question {
	return differenceStoryQuestion();
}

export function generateStoryQuestion(topic: TopicId, group?: "a" | "b"): Question {
	if (topic === "geometry") return group === "b" ? differenceStoryQuestion() : geometryStoryQuestion();
	if (topic === "numbers") {
		return group === "b" ? financeStoryQuestion() : pick([compoundStoryQuestion, overlapStoryQuestion])();
	}
	if (topic === "arithmetic") {
		return group === "b"
			? pick([overlapStoryQuestion, financeStoryQuestion, differenceStoryQuestion])()
			: pick([compoundStoryQuestion, divisionStoryQuestion])();
	}
	return group === "b"
		? pick([overlapStoryQuestion, financeStoryQuestion, differenceStoryQuestion])()
		: pick([compoundStoryQuestion, divisionStoryQuestion])();
}
function decompositionQuestion(): Question {\n	const millions = integer(0, 8);\n	const hundredThousands = integer(1, 9);\n	const tenThousands = integer(0, 9);\n	const thousands = integer(0, 9);\n	const hundreds = integer(0, 9);\n	const tens = integer(0, 9);\n	const ones = integer(0, 9);\n	const value = millions * 1_000_000 + hundredThousands * 100_000 + tenThousands * 10_000 + thousands * 1_000 + hundreds * 100 + tens * 10 + ones;\n	const target = hundreds * 100 + tens * 10;\n	return {\n		id: id(),\n		topic: "numbers",\n		prompt: `V čísle ${sk(value)} sčítaj hodnotu stoviek a desiatok. Aké číslo dostaneš?`,\n		answer: String(target),\n		choices: shuffle([String(target), String(hundreds + tens), String(hundreds * 100), String(tens * 10)]),\n		hint: "Číslica a jej hodnota nie sú to isté.",\n		explanation: `${hundreds} stoviek je ${hundreds * 100} a ${tens} desiatok je ${tens * 10}; spolu ${target}.`,\n	};\n}\n\nfunction romanQuestion(): Question {\n	const pairs = [\n		["XIV", "14"], ["XIX", "19"], ["XXIV", "24"], ["XXXVI", "36"],\n		["XLII", "42"], ["XLIX", "49"], ["LVIII", "58"], ["LXIV", "64"],\n	] as const;\n	const [roman, answer] = pick(pairs);\n	const n = Number(answer);\n	const options = [...new Set([n, n - 2, n + 2, n + 10])].map(String);\n	return {\n		id: id(),\n		topic: "numbers",\n		prompt: `Aké číslo zapisuje rímsky zápis ${roman}?`,\n		answer,\n		choices: shuffle(options),\n		explanation: `${roman} = ${answer}.`,\n	};\n}\n\nfunction shapePropertyQuestion(): Question {\n	const variants = [\n		{ prompt: "Ktorý útvar má práve 4 vrcholy a všetky strany rovnako dlhé?", answer: "štvorec", options: ["štvorec", "obdĺžnik", "trojuholník", "päťuholník"] },\n		{ prompt: "Ktorý útvar má práve 3 vrcholy?", answer: "trojuholník", options: ["štvorec", "kruh", "trojuholník", "obdĺžnik"] },\n		{ prompt: "Ktorý útvar nemá žiadny vrchol?", answer: "kruh", options: ["kruh", "trojuholník", "štvorec", "päťuholník"] },\n	] as const;\n	const q = pick(variants);\n	return { id: id(), topic: "geometry", prompt: q.prompt, answer: q.answer, choices: shuffle(q.options), explanation: `Správna odpoveď je ${q.answer}.` };\n}\n\nfunction lineRelationQuestion(): Question {\n	const perpendicular = Math.random() < 0.5;\n	return {\n		id: id(),\n		topic: "geometry",\n		prompt: perpendicular ? "Dve priamky sa pretínajú pod pravým uhlom. Aké sú?" : "Dve priamky v rovine sa nikdy nepretnú. Aké sú?",\n		answer: perpendicular ? "kolmé" : "rovnobežné",\n		choices: ["kolmé", "rovnobežné", "totožné", "rôznobežné"],\n		explanation: perpendicular ? "Priamky zvierajúce pravý uhol sú kolmé." : "Priamky, ktoré sa v rovine nepretínajú, sú rovnobežné.",\n	};\n}\n\nfunction circleQuestion(): Question {\n	const radius = integer(2, 12);\n	return {\n		id: id(),\n		topic: "geometry",\n		prompt: `Kružnica má polomer ${radius} cm. Aký dlhý je jej priemer?`,\n		answer: String(radius * 2),\n		choices: shuffle([String(radius * 2), String(radius), String(radius + 2), String(radius * 4)]),\n		explanation: `Priemer je dvojnásobok polomeru: 2 × ${radius} = ${radius * 2} cm.`,\n	};\n}\n\nfunction cubeFactsQuestion(): Question {\n	const variants = [\n		["Koľko vrcholov má kocka?", "8", ["6", "8", "10", "12"]],\n		["Koľko hrán má kocka?", "12", ["6", "8", "10", "12"]],\n		["Koľko stien má kocka?", "6", ["4", "6", "8", "12"]],\n	] as const;\n	const [prompt, answer, options] = pick(variants);\n	return { id: id(), topic: "geometry", prompt, answer, choices: shuffle(options), explanation: `Správna odpoveď je ${answer}.` };\n}\n\nfunction quadrilateralQuestion(): Question {\n	const answer = pick(["štvorec", "obdĺžnik"] as const);\n	return {\n		id: id(),\n		topic: "geometry",\n		prompt: answer === "štvorec" ? "Ktorý štvoruholník má všetky štyri strany rovnako dlhé a štyri pravé uhly?" : "Ktorý štvoruholník má protiľahlé strany rovnako dlhé a štyri pravé uhly?",\n		answer,\n		choices: ["štvorec", "obdĺžnik", "trojuholník", "kruh"],\n		explanation: `Je to ${answer}.`,\n	};\n}\n\nfunction missingAddendQuestion(): Question {\n	const a = integer(100, 900);\n	const missing = integer(100, 900);\n	const sum = a + missing;\n	return {\n		id: id(), topic: "addition", prompt: "Doplň chýbajúce číslo.", answer: String(missing),\n		interaction: { kind: "equation-tiles", expression: `${a} + □ = ${sum}`, options: shuffle([missing, missing + 10, Math.max(1, missing - 10), a]) },\n		explanation: `${sum} − ${a} = ${missing}.`,\n	};\n}\n\nfunction differenceComparisonQuestion(): Question {\n	const smaller = integer(1_000, 20_000);\n	const difference = integer(500, 5_000);\n	const larger = smaller + difference;\n	return {\n		id: id(), topic: "addition",\n		prompt: `${sk(larger)} je o koľko viac ako ${sk(smaller)}?`,\n		answer: String(difference),\n		choices: shuffle([String(difference), String(larger + smaller), String(smaller), String(difference + 100)]),\n		explanation: `${sk(larger)} − ${sk(smaller)} = ${sk(difference)}.`,\n	};\n}\n\nfunction estimateSumQuestion(): Question {\n	const a = integer(1_200, 9_800);\n	const b = integer(1_200, 9_800);\n	const estimate = Math.round(a / 1000) * 1000 + Math.round(b / 1000) * 1000;\n	return {\n		id: id(), topic: "addition",\n		prompt: `Odhadni súčet ${sk(a)} + ${sk(b)} zaokrúhlením oboch čísel na tisícky.`,\n		answer: String(estimate),\n		choices: shuffle([String(estimate), String(estimate + 1000), String(Math.max(0, estimate - 1000)), String(a + b)]),\n		explanation: `${sk(a)} ≈ ${sk(Math.round(a/1000)*1000)} a ${sk(b)} ≈ ${sk(Math.round(b/1000)*1000)}, teda približne ${sk(estimate)}.`,\n	};\n}\n\nfunction additionStoryQuestion(): Question {\n	const first = integer(120, 480);\n	const second = integer(100, 420);\n	const left = integer(40, Math.min(150, first + second - 1));\n	const answer = first + second - left;\n	return storyChoice("addition", "🎫", `Na podujatie predali dopoludnia ${first} lístkov a popoludní ${second}. ${left} návštevníkov nakoniec neprišlo. Koľko návštevníkov prišlo?`, String(answer), [String(answer), String(first + second), String(Math.abs(first-second)), String(answer + left)], "Najprv spočítaj predané lístky a potom odčítaj tých, ktorí neprišli.", `${first} + ${second} − ${left} = ${answer}.`);\n}\n\nfunction axisCountQuestion(): Question {\n	const variants = [\n		["štvorec", "4"], ["obdĺžnik, ktorý nie je štvorcom", "2"], ["kruh", "nekonečne veľa"], ["rovnostranný trojuholník", "3"],\n	] as const;\n	const [shape, answer] = pick(variants);\n	return { id: id(), topic: "symmetry", prompt: `Koľko osí súmernosti má ${shape}?`, answer, choices: shuffle([answer, "0", "1", "2", "3", "4", "nekonečne veľa"].filter((v,i,a)=>a.indexOf(v)===i).slice(0,4)), explanation: `${shape} má ${answer} osí súmernosti.` };\n}\n\nfunction symmetryTypeQuestion(): Question {\n	const variants = [\n		{ prompt: "Pri zrkadlení podľa priamky vzniká aká súmernosť?", answer: "osová" },\n		{ prompt: "Keď sa útvar otočí o 180° okolo bodu a prekryje svoj obraz, ide o akú súmernosť?", answer: "stredová" },\n	] as const;\n	const q = pick(variants);\n	return { id: id(), topic: "symmetry", prompt: q.prompt, answer: q.answer, choices: ["osová", "stredová", "rotačná", "žiadna"], explanation: `Ide o ${q.answer} súmernosť.` };\n}\n\nfunction mirrorDistanceQuestion(): Question {\n	const distance = integer(1, 8);\n	return { id: id(), topic: "symmetry", prompt: `Bod A leží ${distance} štvorčekov vľavo od zvislej osi súmernosti. Kde bude jeho obraz A′?`, answer: `${distance} vpravo`, choices: shuffle([`${distance} vpravo`, `${distance} vľavo`, `${distance*2} vpravo`, "na osi"]), explanation: `Obraz leží v rovnakej vzdialenosti na opačnej strane osi: ${distance} štvorčekov vpravo.` };\n}\n\nfunction centralSymmetryQuestion(): Question {\n	const answer = pick(["áno", "nie"] as const);\n	return { id: id(), topic: "symmetry", prompt: answer === "áno" ? "Má obdĺžnik stred súmernosti?" : "Má bežný trojuholník stred súmernosti?", answer, choices: ["áno", "nie"], explanation: answer === "áno" ? "Stred obdĺžnika je jeho stredom súmernosti." : "Trojuholník nemá stredovú súmernosť." };\n}\n\nfunction divisionRemainderQuestion(): Question {\n	const divisor = integer(3, 12);\n	const quotient = integer(5, 25);\n	const remainder = integer(1, divisor - 1);\n	const dividend = divisor * quotient + remainder;\n	const answer = `${quotient} zvyšok ${remainder}`;\n	return { id: id(), topic: "multiplication", prompt: `${dividend} ÷ ${divisor} = ?`, answer, choices: shuffle([answer, `${quotient} zvyšok ${Math.max(0,remainder-1)}`, `${quotient+1} zvyšok ${remainder}`, `${quotient}`]), explanation: `${dividend} = ${divisor} × ${quotient} + ${remainder}.` };\n}\n\nfunction xylophoneQuestion(): Question {\n	const first = integer(20, 40);\n	const step = pick([3, 4, 5, 6] as const);\n	const position = integer(4, 8);\n	const answer = first + (position - 1) * step;\n	return { id: id(), topic: "measurement", kind: "story", prompt: `Doštičky xylofónu sú zoradené od najkratšej. Prvá má ${first} mm a každá ďalšia je o ${step} mm dlhšia. Akú dĺžku má ${position}. doštička?`, answer: String(answer), choices: shuffle([String(answer), String(first + position*step), String(first + step), String(answer-step)]), explanation: `${first} + ${position-1} × ${step} = ${answer} mm.` };\n}\n\nfunction possibleDiceSumQuestion(): Question {\n	const dice = integer(3, 5);\n	const min = dice;\n	const max = dice * 6;\n	const possible = integer(min, max);\n	const options = shuffle([possible, max + 1, max + integer(2,5), Math.max(0,min-1)]);\n	return { id: id(), topic: "applications", prompt: `Hádžeme ${dice} kockami s číslami 1 až 6. Ktorý z týchto súčtov môžeme dostať?`, answer: String(possible), choices: options.map(String), explanation: `Súčet musí byť od ${min} do ${max}. ${possible} je v tomto intervale.` };\n}\n\nfunction chartDataQuestion(): Question {\n	const a = integer(8, 20), b = integer(8, 20), c = integer(8, 20);\n	const maxName = a >= b && a >= c ? "Karol" : b >= c ? "Milan" : "Ondrej";\n	return { id: id(), topic: "applications", prompt: `Grafové údaje: Karol ${a} km, Milan ${b} km, Ondrej ${c} km. Kto prešiel najviac?`, answer: maxName, choices: ["Karol", "Milan", "Ondrej"], explanation: `Najväčšia hodnota je ${Math.max(a,b,c)} km, teda ${maxName}.` };\n}\n\nfunction halfCollectionQuestion(): Question {\n	const total = pick([8, 10, 12, 14, 16] as const);\n	const filled = integer(1, total/2 - 1);\n	const answer = total/2 - filled;\n	return { id: id(), topic: "applications", prompt: `Je tu ${total} pohárov, z toho ${filled} sú plné. Koľko treba ešte naplniť, aby bola plná presne polovica?`, answer: String(answer), choices: shuffle([String(answer), String(total/2), String(answer+1), String(Math.max(0,answer-1))]), explanation: `Polovica z ${total} je ${total/2}. Už sú plné ${filled}, takže treba ešte ${answer}.` };\n}\n\nfunction pathsQuestion(): Question {\n	const width = pick([2,3] as const);\n	const height = pick([2,3] as const);\n	const factorial = (n: number) => n <= 1 ? 1 : n * factorial(n - 1);\n	const count = factorial(width + height) / (factorial(width) * factorial(height));\n	return { id: id(), topic: "applications", prompt: `Na mriežke sa z bodu X do Y musíš posunúť presne ${width}× doprava a ${height}× hore. Koľko rôznych najkratších ciest existuje?`, answer: String(count), choices: shuffle([String(count), String(count+1), String(Math.max(1,count-1)), String(width*height)]), explanation: `Rôzne poradia ${width} krokov doprava a ${height} krokov hore dávajú ${count} ciest.` };\n}\n\nexport function numberLineQuestion(): Question {
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

const numbers = [roundingQuestion, compareQuestion, parityQuestion, numberLineQuestion, numberFilterQuestion] as const;
const arithmetic = [additionQuestion, subtractionQuestion, multiplicationQuestion, divisionQuestion, orderQuestion, missingFactorQuestion, missingFactorQuestion] as const;
const geometry = [perimeterQuestion, areaQuestion, unitsQuestion, gridAreaQuestion] as const;

export const generators = { numbers, arithmetic, geometry };

export function generateQuestion(topic: TopicId): Question {
	if (topic === "mixed") {
		return generateQuestion(pick(["numbers", "arithmetic", "geometry"] as const));
	}
	const factory = pick(generators[topic]);
	return factory();
}

const interactiveGenerators = {
	numbers: [compareQuestion, parityQuestion, numberLineQuestion, numberFilterQuestion],
	arithmetic: [missingFactorQuestion],
	geometry: [gridAreaQuestion],
} as const;

export function generateRoundQuestion(topic: TopicId, index: number): Question {
	if (index === 4) return generateStoryQuestion(topic, "a");
	if (index === 8) return generateStoryQuestion(topic, "b");
	if (index % 2 === 0) return generateQuestion(topic);

	const interactiveTopic =
		topic === "mixed"
			? pick(["numbers", "arithmetic", "geometry"] as const)
			: topic;
	const factory = pick(interactiveGenerators[interactiveTopic]);
	return factory();
}

export function normalizeAnswer(value: string): string {
	return value.trim().replaceAll(" ", "").replace(",", ".").toLocaleLowerCase("sk");
}

export function isCorrect(question: Question, answer: string): boolean {
	return normalizeAnswer(answer) === normalizeAnswer(question.answer);
}

export { shuffle };
