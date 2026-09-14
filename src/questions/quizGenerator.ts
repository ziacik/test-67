import {
	generateRoundQuestion as generateMathRoundQuestion,
	isCorrect,
	normalizeAnswer,
} from "./generator";
import { generateBalancedSlovakQuestion } from "./balancedSlovakQuestion";
import type { AnyTopicId, SlovakTopicId } from "./types";

function isSlovakTopic(topic: AnyTopicId): topic is SlovakTopicId {
	return topic.startsWith("sk-");
}

export function generateRoundQuestion(topic: AnyTopicId, index: number) {
	return isSlovakTopic(topic)
		? generateBalancedSlovakQuestion(topic, index)
		: generateMathRoundQuestion(topic, index);
}

export { isCorrect, normalizeAnswer };
