import { describe, expect, it } from "vitest";
import {
	gridAreaQuestion,
	numberLineQuestion,
	sortNumbersQuestion,
} from "./generator";

describe("visual mini-game questions", () => {
	it("builds a number-line question with five clickable points", () => {
		const question = numberLineQuestion();
		const interaction = question.interaction;

		expect(interaction?.kind).toBe("number-line");
		if (!interaction || interaction.kind !== "number-line") return;
		expect(interaction.values).toHaveLength(5);
		expect(interaction.values.map(String)).toContain(question.answer);
	});

	it("builds a tap-to-order question", () => {
		const question = sortNumbersQuestion();
		const interaction = question.interaction;

		expect(interaction?.kind).toBe("sort");
		if (!interaction || interaction.kind !== "sort") return;
		expect(interaction.values).toHaveLength(4);
		const sorted = [...interaction.values].sort((a, b) => a - b);
		expect(question.answer).toBe(sorted.join(","));
	});

	it("builds a visual grid-area question with answer choices", () => {
		const question = gridAreaQuestion();
		const interaction = question.interaction;

		expect(interaction?.kind).toBe("grid-area");
		if (!interaction || interaction.kind !== "grid-area") return;
		expect(interaction.columns).toBeGreaterThanOrEqual(3);
		expect(interaction.rows).toBeGreaterThanOrEqual(3);
		expect(interaction.options.map(String)).toContain(question.answer);
	});
});
