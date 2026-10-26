import {
	generateRoundQuestion as generateMathRoundQuestion,
	isCorrect,
	normalizeAnswer,
} from "./generator";
import { generateBalancedSlovakQuestion } from "./balancedSlovakQuestion";
import { generateBiologyRoundQuestion } from "./biologyGenerator";
import { generateHistoryRoundQuestion } from "./historyGenerator";
import { generateGermanRoundQuestion } from "./germanGenerator";
import type { AnyTopicId, GermanTopicId, HistoryTopicId, SlovakTopicId } from "./types";

function isHistoryTopic(topic: AnyTopicId): topic is HistoryTopicId {
	return topic.startsWith("hist-");
}

function isGermanTopic(topic: AnyTopicId): topic is GermanTopicId {
	return topic.startsWith("de-");
}

function isSlovakTopic(topic: AnyTopicId): topic is SlovakTopicId {
	return topic.startsWith("sk-");
}

export function generateRoundQuestion(topic: AnyTopicId, index: number) {
	if (topic === "bio-microbes") return generateBiologyRoundQuestion(index);
	if (isHistoryTopic(topic)) return generateHistoryRoundQuestion(topic, index);
	if (isGermanTopic(topic)) return generateGermanRoundQuestion(topic, index);
	return isSlovakTopic(topic)
		? generateBalancedSlovakQuestion(topic, index)
		: generateMathRoundQuestion(topic, index);
}

export { isCorrect, normalizeAnswer };
