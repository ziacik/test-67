import {
	generateRoundQuestion as generateMathRoundQuestion,
	isCorrect,
	normalizeAnswer,
} from "./generator";
import { generateBalancedSlovakQuestion } from "./balancedSlovakQuestion";
import { generateBiologyRoundQuestion } from "./biologyGenerator";
import { generateHistoryRoundQuestion } from "./historyGenerator";
import type { AnyTopicId, HistoryTopicId, SlovakTopicId } from "./types";

function isSlovakTopic(topic: AnyTopicId): topic is SlovakTopicId {
	return topic.startsWith("sk-");
}

export function generateRoundQuestion(topic: AnyTopicId, index: number) {
	if (topic === "bio-microbes") return generateBiologyRoundQuestion(index);
	if (topic.startsWith("hist-")) return generateHistoryRoundQuestion(topic as HistoryTopicId, index);
	return isSlovakTopic(topic)
		? generateBalancedSlovakQuestion(topic, index)
		: generateMathRoundQuestion(topic, index);
}

export { isCorrect, normalizeAnswer };
