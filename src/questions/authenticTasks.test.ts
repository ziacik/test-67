import { describe, expect, it } from "vitest";
import {
	compoundStoryQuestion,
	differenceStoryQuestion,
	divisionStoryQuestion,
	financeStoryQuestion,
	numberFilterQuestion,
	overlapStoryQuestion,
} from "./generator";

describe("Testovanie 5 inspired task archetypes", () => {
	it("generates a compound multiplicative + additive story", () => {
		const q = compoundStoryQuestion();
		expect(q.kind).toBe("story");
		expect(q.prompt.length).toBeGreaterThan(50);
		expect(q.explanation).toMatch(/[×+]/);
	});

	it("generates an overlap/intersection story", () => {
		const q = overlapStoryQuestion();
		expect(q.kind).toBe("story");
		expect(q.explanation).toContain("−");
	});

	it("generates a difference-from-comparison story", () => {
		const q = differenceStoryQuestion();
		expect(q.kind).toBe("story");
		expect(q.explanation).toContain("−");
	});

	it("generates a division story", () => {
		const q = divisionStoryQuestion();
		expect(q.kind).toBe("story");
		expect(q.explanation).toContain("÷");
	});

	it("generates a financial comparison problem", () => {
		const q = financeStoryQuestion();
		expect(q.kind).toBe("story");
		expect(q.prompt).toContain("€");
		expect(q.interaction?.kind).toBe("story-choice");
	});

	it("classifies numbers by two simultaneous conditions instead of plain sorting", () => {
		const q = numberFilterQuestion();
		expect(q.interaction?.kind).toBe("number-filter");
		if (q.interaction?.kind !== "number-filter") return;
		expect(q.interaction.values.length).toBeGreaterThanOrEqual(7);
		expect(q.interaction.correctValues.length).toBeGreaterThan(0);
	});
});
