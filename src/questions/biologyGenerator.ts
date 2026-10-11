import type { Question } from "./types";
import { biologyGroups, type BiologyGroupId, type BiologySpec } from "./biologyBank";

// V každom kole je rovnomerne zastúpené celé učivo.
const plan: ReadonlyArray<readonly [BiologyGroupId, number]> = [
	["základy", 1],
	["baktérie", 2],
	["potraviny", 2],
	["plesne", 2],
	["kvasinky", 2],
	["situácie", 1],
];

function shuffle<T>(items: readonly T[]): T[] {
	const result = [...items];
	for (let i = result.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

// Shuffle-bag: kým sa nevyčerpá jedna oblasť, otázka sa v nej neopakuje.
// Po doplnení zásoby sa otázky z predošlého kola odsúvajú na koniec.
const bags = new Map<BiologyGroupId, BiologySpec[]>();
let previousRound = new Set<BiologySpec>();
let activeRound: BiologySpec[] = [];
let roundNumber = 0;

function draw(group: BiologyGroupId, count: number): BiologySpec[] {
	const selected: BiologySpec[] = [];
	let bag = bags.get(group) ?? [];
	while (selected.length < count) {
		if (bag.length === 0) {
			const available = biologyGroups[group].filter((spec) => !selected.includes(spec));
			bag = [
				...shuffle(available.filter((spec) => !previousRound.has(spec))),
				...shuffle(available.filter((spec) => previousRound.has(spec))),
			];
		}
		const item = bag.shift();
		if (item && !selected.includes(item)) selected.push(item);
	}
	bags.set(group, bag);
	return selected;
}

function createRound(): BiologySpec[] {
	const items = shuffle(plan.flatMap(([group, count]) => draw(group, count)));
	previousRound = new Set(items);
	roundNumber += 1;
	return items;
}

export function generateBiologyRoundQuestion(index: number): Question {
	if (index === 0 || activeRound.length === 0) activeRound = createRound();
	const spec = activeRound[index % activeRound.length];
	return {
		id: "bio-microbes-" + roundNumber + "-" + index,
		topic: "bio-microbes",
		prompt: spec.prompt,
		answer: spec.answer,
		choices: shuffle(spec.choices),
		explanation: spec.explanation,
	};
}
