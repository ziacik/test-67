import { describe, expect, it } from "vitest";
import {
	gridAreaQuestion,
	numberLineQuestion,
	sortNumbersQuestion,
} from "./generator";

describe("visual mini-game questions", () => {
	it("builds a number-line question with five clickable points", () => {
		const question = numberLineQuestion();

		expect(question.interaction.kind).toBe("number-line");
		if (question.interaction.kind !== "number-line") return;
		expect(question.interaction.values).toHaveLength(5);
		expect(question.interaction.values.map(String)).toContain(question.answer);
	});

	it("builds a tap-to-order question", () => {
		const question = sortNumbersQuestion();

		expect(question.interaction.kind).toBe("sort");
		if (question.interaction.kind !== "sort") return;
		expect(question.interaction.values).toHaveLength(4);
		const sorted = [...question.interaction.values].sort((a, b) => a - b);
		expect(question.answer).toBe(sorted.join(","));
	});

	it("builds a visual grid-area question with answer choices", () => {
		const question = gridAreaQuestion();

		expect(question.interaction.kind).toBe("grid-area");
		if (question.interaction.kind !== "grid-area") return;
		expect(question.interaction.columns).toBeGreaterThanOrEqual(3);
		expect(question.interaction.rows).toBeGreaterThanOrEqual(3);
		expect(question.interaction.options.map(String)).toContain(question.answer);
	});
});
