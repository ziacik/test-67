import { describe, expect, it } from "vitest";
import { generateQuestion, generateRoundQuestion, isCorrect } from "./generator";

const topics = ["numbers", "decimals", "fractions", "geometry", "addition", "symmetry", "multiplication", "measurement", "applications", "mixed"] as const;

describe("question generator", () => {
	it.each(topics)("generates valid %s questions", (topic) => {
		for (let i = 0; i < 500; i += 1) {
			const question = generateQuestion(topic);
			expect(question.prompt.length).toBeGreaterThan(3);
			expect(question.answer.length).toBeGreaterThan(0);
			expect(question.explanation.length).toBeGreaterThan(3);
			expect(isCorrect(question, question.answer)).toBe(true);
		}
	});

	it.each(topics)("forces an interactive question every second slot for %s", (topic) => {
		for (const index of [1, 3, 5, 7, 9]) {
			const question = generateRoundQuestion(topic, index);
			expect(Boolean(question.interaction || question.choices)).toBe(true);
		}
	});

	it("ignores spaces in numeric answers", () => {
		const question = {
			id: "x",
			topic: "numbers" as const,
			prompt: "x",
			answer: "123456",
			explanation: "x",
		};
		expect(isCorrect(question, "123 456")).toBe(true);
	});
	it("accepts equivalent decimal forms", () => {
		const question = {
			id: "decimal",
			topic: "decimals" as const,
			prompt: "x",
			answer: "2,50",
			explanation: "x",
		};
		expect(isCorrect(question, "2,5")).toBe(true);
		expect(isCorrect(question, "2.500")).toBe(true);
	});

});
