import { describe, expect, it } from "vitest";
import { generateQuestion, isCorrect } from "./generator";

const topics = ["numbers", "arithmetic", "geometry", "mixed"] as const;

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
});
