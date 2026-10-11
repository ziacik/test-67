import { historyGroups, type HistoryGroupId, type HistorySpec } from "./historyBank";
import type { HistoryTopicId, Question } from "./types";

const groups: HistoryGroupId[] = ["obdobia", "archeologia", "vyvoj", "paleolit", "neolit", "kovy"];
const bags = new Map<HistoryGroupId, HistorySpec[]>();
let previousRound = new Set<HistorySpec>();
let activeRound: Array<{ group: HistoryGroupId; spec: HistorySpec }> = [];
let activeTopic: HistoryTopicId | null = null;
let roundNumber = 0;

function shuffle<T>(values: readonly T[]): T[] {
	const result = [...values];
	for (let index = result.length - 1; index > 0; index -= 1) {
		const swap = Math.floor(Math.random() * (index + 1));
		[result[index], result[swap]] = [result[swap], result[index]];
	}
	return result;
}

// Shuffle-bag: otázky sa v jednej téme neopakujú, kým neprejdeme jej zásobu.
// Pri opätovnom naplnení uprednostníme otázky, ktoré neboli v poslednom kole.
function draw(group: HistoryGroupId, count: number): HistorySpec[] {
	const selected: HistorySpec[] = [];
	let bag = bags.get(group) ?? [];
	while (selected.length < count) {
		if (bag.length === 0) {
			const available = historyGroups[group].filter((spec) => !selected.includes(spec));
			bag = [
				...shuffle(available.filter((spec) => !previousRound.has(spec))),
				...shuffle(available.filter((spec) => previousRound.has(spec))),
			];
		}
		const next = bag.shift();
		if (next && !selected.includes(next)) selected.push(next);
	}
	bags.set(group, bag);
	return selected;
}

function buildRound(topic: HistoryTopicId): Array<{ group: HistoryGroupId; spec: HistorySpec }> {
	// Každý Mix obsahuje všetkých šesť oblastí; dvojnásobné zastúpenie rotuje.
	const distribution: Array<[HistoryGroupId, number]> = topic === "hist-mixed"
		? groups.map((group, index): [HistoryGroupId, number] => [group, ((index - (roundNumber % groups.length) + groups.length) % groups.length) < 4 ? 2 : 1])
		: [[topic.slice(5) as HistoryGroupId, 10]];
	const chosen = distribution.flatMap(([group, count]) =>
		draw(group, count).map((spec) => ({ group, spec })),
	);
	previousRound = new Set(chosen.map(({ spec }) => spec));
	roundNumber += 1;
	return shuffle(chosen);
}

export function generateHistoryRoundQuestion(topic: HistoryTopicId, index: number): Question {
	if (index === 0 || activeRound.length === 0 || activeTopic !== topic) {
		activeRound = buildRound(topic);
		activeTopic = topic;
	}
	const { group, spec } = activeRound[index % activeRound.length];
	return {
		id: "hist-" + roundNumber + "-" + index,
		topic: `hist-${group}`,
		prompt: spec.prompt,
		answer: spec.answer,
		choices: shuffle(spec.choices),
		explanation: spec.explanation,
	};
}
