import { describe, expect, it } from "vitest";
import {
	generateRoundQuestion,
	generateStoryQuestion,
} from "./generator";

const topics = ["addition", "multiplication", "measurement", "applications", "mixed"] as const;

describe("word problems", () => {
	it.each(topics)("builds a substantial %s story problem", (topic) => {
		for (let i = 0; i < 50; i += 1) {
			const question = generateStoryQuestion(topic);
			expect(question.prompt.length).toBeGreaterThan(45);
			expect(question.explanation.length).toBeGreaterThan(15);
			expect(question.answer.length).toBeGreaterThan(0);
		}
	});

	it("can ask for the correct calculation instead of a typed result", () => {
		let found = false;

		for (let i = 0; i < 100; i += 1) {
			const question = generateStoryQuestion("applications");
			if (question.interaction?.kind === "story-choice") {
				found = true;
				expect(question.interaction.options).toHaveLength(4);
				expect(question.interaction.options).toContain(question.answer);
				break;
			}
		}

		expect(found).toBe(true);
	});

	it.each(topics)("guarantees two story problems in every %s round", (topic) => {
		for (const index of [4, 8]) {
			const question = generateRoundQuestion(topic, index);
			expect(question.kind).toBe("story");
		}
	});
});
