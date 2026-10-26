import {
	generateRoundQuestion as generateMathRoundQuestion,
	isCorrect as isMathCorrect,
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


function normalizedGermanAnswer(value: string): string {
  return value
    .toLocaleLowerCase("de-DE")
    .replace(/[.!?¡¿]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

export function isCorrect(question: import("./types").Question, answer: string): boolean {
  if (question.topic.startsWith("de-")) {
    return normalizedGermanAnswer(question.answer) === normalizedGermanAnswer(answer);
  }
  return isMathCorrect(question, answer);
}

export { normalizeAnswer };
