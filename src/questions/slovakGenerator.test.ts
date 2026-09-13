import { describe, expect, it } from "vitest";
import {
	generateSlovakQuestion,
	generateSlovakRoundQuestion,
	slovakCurriculumCoverage,
} from "./slovakGenerator";
import {
	nonSelectedWords,
	selectedCoreWords,
	spellingQuestions,
} from "./slovakSpelling";

const topics = [
	"sk-spelling",
	"sk-nouns",
	"sk-vocabulary",
	"sk-sentences",
	"sk-reading",
	"sk-literature",
	"sk-mixed",
] as const;

describe("Slovak question generator", () => {
	it.each(topics)("generates valid %s questions", (topic) => {
		for (let index = 0; index < 250; index += 1) {
			const question = generateSlovakQuestion(topic);
			expect(question.prompt.length).toBeGreaterThan(5);
			expect(question.answer.length).toBeGreaterThan(0);
			expect(question.explanation.length).toBeGreaterThan(5);
			expect(question.choices).toContain(question.answer);
		}
	});

	it.each(topics)("keeps every round question directly answerable", (topic) => {
		for (let index = 0; index < 10; index += 1) {
			const question = generateSlovakRoundQuestion(topic, index);
			expect(question.choices).toContain(question.answer);
		}
	});

	it.each(topics.filter((topic) => topic !== "sk-mixed"))("keeps questions in selected topic %s", (topic) => {
		for (let index = 0; index < 100; index += 1) {
			expect(generateSlovakQuestion(topic).topic).toBe(topic);
		}
	});

	it("has the complete large selected-word bank plus at least as many non-selected words", () => {
		expect(selectedCoreWords.length).toBeGreaterThanOrEqual(130);
		expect(nonSelectedWords.length).toBeGreaterThanOrEqual(selectedCoreWords.length);
		expect(spellingQuestions.length).toBeGreaterThanOrEqual(300);
	});

	it("uses exactly one underscore for a one-letter spelling blank", () => {
		for (const question of spellingQuestions) {
			expect(question.prompt).not.toContain("__");
			expect((question.prompt.match(/_/g) ?? []).length).toBe(1);
		}
	});

	it("does not repeat spelling questions inside a ten-question round", () => {
		const prompts = Array.from({ length: 10 }, (_, index) =>
			generateSlovakRoundQuestion("sk-spelling", index).prompt,
		);
		expect(new Set(prompts).size).toBe(10);
	});

	it("tracks the main fifth-grade curriculum areas covered by the bank", () => {
		expect(slovakCurriculumCoverage.length).toBeGreaterThanOrEqual(10);
		expect(slovakCurriculumCoverage).toContain("spelling-i-y-selected-words-and-derived-words");
		expect(slovakCurriculumCoverage).toContain("noun-gender-number-case-life-and-declension-patterns");
		expect(slovakCurriculumCoverage).toContain("narration-with-description-work-procedure-and-interview");
	});
});
