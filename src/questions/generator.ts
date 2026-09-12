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
		topic: "arithmetic",
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
		topic: "arithmetic",
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
		topic: "arithmetic",
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
		topic: "arithmetic",
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
		topic: "arithmetic",
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
		topic: "arithmetic",
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
		"arithmetic",
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
		"arithmetic",
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
		topic: "arithmetic",
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
		topic: "geometry",
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
