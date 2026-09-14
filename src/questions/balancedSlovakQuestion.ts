import type { Question, SlovakTopicId } from "./types";
import { buildBalancedSlovakRound, type SlovakRoundItem } from "./slovakRoundBuilder";

function rotate<T>(values: readonly T[], offset: number): T[] {
	const index = values.length === 0 ? 0 : offset % values.length;
	return [...values.slice(index), ...values.slice(0, index)];
}

function toQuestion(item: SlovakRoundItem, index: number): Question {
	return {
		id: item.topic + "-" + index,
		topic: item.topic,
		prompt: item.spec.prompt,
		answer: item.spec.answer,
		choices: rotate(item.spec.choices, index),
		hint: item.spec.hint,
		explanation: item.spec.explanation,
	};
}

const rounds = new Map<SlovakTopicId, SlovakRoundItem[]>();

export function generateBalancedSlovakQuestion(topic: SlovakTopicId, index: number): Question {
	if (index === 0 || !rounds.has(topic)) {
		rounds.set(topic, buildBalancedSlovakRound(topic));
	}
	const round = rounds.get(topic) ?? buildBalancedSlovakRound(topic);
	return toQuestion(round[index % round.length], index);
}
