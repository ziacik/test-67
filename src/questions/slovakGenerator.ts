import type { Question, SlovakTopicId } from "./types";
import { slovakQuestionBanks, type ChoiceSpec } from "./slovakBanks";

type SlovakConcreteTopicId = Exclude<SlovakTopicId, "sk-mixed">;

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

const concreteTopics = Object.keys(slovakQuestionBanks) as SlovakConcreteTopicId[];

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
	return fromSpec(resolved, pick(slovakQuestionBanks[resolved]));
}

type RoundItem = { topic: SlovakConcreteTopicId; spec: ChoiceSpec };
const roundCache = new Map<SlovakTopicId, RoundItem[]>();

function questionSignature(spec: ChoiceSpec): string {
	return [spec.prompt, spec.answer, [...spec.choices].sort().join("|")].join("::");
}

function uniqueItems(items: RoundItem[]): RoundItem[] {
	const seen = new Set<string>();
	return items.filter(({ spec }) => {
		const signature = questionSignature(spec);
		if (seen.has(signature)) return false;
		seen.add(signature);
		return true;
	});
}

function buildRound(topic: SlovakTopicId): RoundItem[] {
	if (topic === "sk-mixed") {
		const all = concreteTopics.flatMap((resolved) =>
			slovakQuestionBanks[resolved].map((spec) => ({ topic: resolved, spec })),
		);
		return shuffle(uniqueItems(all)).slice(0, 10);
	}

	const items = slovakQuestionBanks[topic].map((spec) => ({ topic, spec }));
	return shuffle(uniqueItems(items)).slice(0, 10);
}

export function generateSlovakRoundQuestion(topic: SlovakTopicId, index: number): Question {
	if (index === 0 || !roundCache.has(topic)) {
		roundCache.set(topic, buildRound(topic));
	}
	const round = roundCache.get(topic) ?? buildRound(topic);
	const item = round[index % round.length];
	return fromSpec(item.topic, item.spec);
}
