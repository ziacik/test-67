import type { SlovakTopicId } from "./types";
import {
	literatureQuestionGroups,
	nounQuestionGroups,
	readingQuestionGroups,
	sentenceQuestionGroups,
	slovakQuestionBanks,
	spellingQuestionGroups,
	type ChoiceSpec,
	vocabularyQuestionGroups,
} from "./slovakBanks";

export type SlovakConcreteTopicId = Exclude<SlovakTopicId, "sk-mixed">;
export type SlovakRoundItem = { topic: SlovakConcreteTopicId; spec: ChoiceSpec };

function shuffle<T>(values: readonly T[]): T[] {
	const result = [...values];
	for (let index = result.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(Math.random() * (index + 1));
		[result[index], result[swapIndex]] = [result[swapIndex], result[index]];
	}
	return result;
}

function signature(spec: ChoiceSpec): string {
	return [spec.prompt, spec.answer, [...spec.choices].sort().join("|")].join("::");
}

function unique(items: SlovakRoundItem[]): SlovakRoundItem[] {
	const seen = new Set<string>();
	return items.filter(({ spec }) => {
		const key = signature(spec);
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

function take(topic: SlovakConcreteTopicId, group: readonly ChoiceSpec[], count: number): SlovakRoundItem[] {
	return shuffle(group).slice(0, count).map((spec) => ({ topic, spec }));
}

function spellingRound(): SlovakRoundItem[] {
	const topic: SlovakConcreteTopicId = "sk-spelling";
	return shuffle(unique([
		...take(topic, spellingQuestionGroups.selected, 3),
		...take(topic, spellingQuestionGroups.related, 2),
		...take(topic, spellingQuestionGroups.nonSelected, 4),
		...take(topic, spellingQuestionGroups.afterL, 1),
	]));
}

function nounRound(): SlovakRoundItem[] {
	const topic: SlovakConcreteTopicId = "sk-nouns";
	return shuffle(unique([
		...take(topic, nounQuestionGroups.patterns, 3),
		...take(topic, nounQuestionGroups.gender, 2),
		...take(topic, nounQuestionGroups.cases, 2),
		...take(topic, nounQuestionGroups.adjectiveTypes, 1),
		...take(topic, nounQuestionGroups.grading, 2),
	]));
}

function vocabularyRound(): SlovakRoundItem[] {
	const topic: SlovakConcreteTopicId = "sk-vocabulary";
	return shuffle(unique([
		...take(topic, vocabularyQuestionGroups.synonyms, 1),
		...take(topic, vocabularyQuestionGroups.antonyms, 1),
		...take(topic, vocabularyQuestionGroups.polysemy, 1),
		...take(topic, vocabularyQuestionGroups.dialects, 1),
		...take(topic, vocabularyQuestionGroups.idioms, 3),
		...take(topic, vocabularyQuestionGroups.comparisons, 1),
		...take(topic, vocabularyQuestionGroups.proverbs, 1),
		...take(topic, vocabularyQuestionGroups.pranostikas, 1),
	]));
}

function sentenceRound(): SlovakRoundItem[] {
	const topic: SlovakConcreteTopicId = "sk-sentences";
	return shuffle(unique([
		...take(topic, sentenceQuestionGroups.types, 4),
		...take(topic, sentenceQuestionGroups.wordOrder, 2),
		...take(topic, sentenceQuestionGroups.directSpeech, 2),
		...take(topic, sentenceQuestionGroups.punctuation, 2),
	]));
}

function readingRound(): SlovakRoundItem[] {
	const topic: SlovakConcreteTopicId = "sk-reading";
	return shuffle(unique([
		...take(topic, readingQuestionGroups.comprehension, 5),
		...take(topic, readingQuestionGroups.procedures, 3),
		...take(topic, readingQuestionGroups.sloh, 2),
	]));
}

function literatureRound(): SlovakRoundItem[] {
	const topic: SlovakConcreteTopicId = "sk-literature";
	return shuffle(unique([
		...take(topic, literatureQuestionGroups.personification, 2),
		...take(topic, literatureQuestionGroups.epithet, 2),
		...take(topic, literatureQuestionGroups.definitions, 4),
		...take(topic, literatureQuestionGroups.extra, 2),
	]));
}

function mixedRound(): SlovakRoundItem[] {
	const plan: Array<[SlovakConcreteTopicId, number]> = [
		["sk-spelling", 2],
		["sk-nouns", 2],
		["sk-vocabulary", 2],
		["sk-sentences", 2],
		["sk-reading", 1],
		["sk-literature", 1],
	];
	return shuffle(plan.flatMap(([topic, count]) => take(topic, slovakQuestionBanks[topic], count)));
}

export function buildBalancedSlovakRound(topic: SlovakTopicId): SlovakRoundItem[] {
	switch (topic) {
		case "sk-spelling": return spellingRound();
		case "sk-nouns": return nounRound();
		case "sk-vocabulary": return vocabularyRound();
		case "sk-sentences": return sentenceRound();
		case "sk-reading": return readingRound();
		case "sk-literature": return literatureRound();
		case "sk-mixed": return mixedRound();
	}
}
