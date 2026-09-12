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

function wordProblem(): Question {
	const boxes = integer(3, 12);
	const each = integer(12, 48);
	const extra = integer(5, 30);
	const answer = boxes * each + extra;
	return {
		id: id(),
		topic: "arithmetic",
		prompt: `Na školský turnaj priniesli ${boxes} balení po ${each} kartičiek a ešte ${extra} samostatných. Koľko kartičiek je spolu?`,
		answer: String(answer),
		hint: "Najprv zisti počet kartičiek v baleniach.",
		explanation: `${boxes} × ${each} + ${extra} = ${answer}.`,
	};
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

const numbers = [roundingQuestion, compareQuestion, parityQuestion, numberLineQuestion, sortNumbersQuestion] as const;
const arithmetic = [additionQuestion, subtractionQuestion, multiplicationQuestion, divisionQuestion, orderQuestion, wordProblem, missingFactorQuestion, missingFactorQuestion] as const;
const geometry = [perimeterQuestion, areaQuestion, unitsQuestion, gridAreaQuestion] as const;

export const generators = { numbers, arithmetic, geometry };

export function generateQuestion(topic: TopicId): Question {
	if (topic === "mixed") {
		return generateQuestion(pick(["numbers", "arithmetic", "geometry"] as const));
	}
	const factory = pick(generators[topic]);
	return factory();
}

export function normalizeAnswer(value: string): string {
	return value.trim().replaceAll(" ", "").replace(",", ".").toLocaleLowerCase("sk");
}

export function isCorrect(question: Question, answer: string): boolean {
	return normalizeAnswer(answer) === normalizeAnswer(question.answer);
}

export { shuffle };
