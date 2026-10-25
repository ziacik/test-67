import { describe, expect, it, vi } from "vitest";
import { pronounBank, pronounBankSize, pronounGroups, type PronounGroupId } from "./pronounsBank";
import { topics } from "./topics";
import { generateRoundQuestion, isCorrect } from "./quizGenerator";

const groups = Object.keys(pronounGroups) as PronounGroupId[];

describe("Osobné základné a privlastňovacie zámená", () => {
	it("appears as a selectable Slovak topic", () => {
		const topic = topics.find((entry) => entry.id === "sk-pronouns");
		expect(topic?.subject).toBe("slovak");
		expect(topic?.name).toBe("Osobné zámená");
	});

	it("covers all ten areas of the 15-slide presentation with a substantial bank", () => {
		expect(groups).toHaveLength(10);
		expect(pronounBankSize).toBeGreaterThanOrEqual(200);
		expect(new Set(pronounBank.map((q) => q.prompt)).size).toBe(pronounBankSize);
		for (const group of groups) expect(pronounGroups[group].length).toBeGreaterThanOrEqual(12);
		for (const q of pronounBank) {
			expect(q.prompt.length).toBeGreaterThan(12);
			expect(q.explanation.length).toBeGreaterThan(10);
			expect(q.choices).toHaveLength(4);
			expect(new Set(q.choices).size).toBe(4);
			expect(q.choices.filter((choice) => choice === q.answer)).toHaveLength(1);
		}
	});

	it("samples exactly one question from every learning area per round", () => {
		for (let round = 0; round < 20; round += 1) {
			const questions = Array.from({ length: 10 }, (_, index) => generateRoundQuestion("sk-pronouns", index));
			expect(new Set(questions.map((q) => q.prompt)).size).toBe(10);
			for (const q of questions) {
				expect(q.topic).toBe("sk-pronouns");
				expect(q.choices).toContain(q.answer);
				expect(isCorrect(q, q.answer)).toBe(true);
			}
			for (const group of groups) {
				const belonging = new Set(pronounGroups[group].map((q) => q.prompt));
				expect(questions.filter((q) => belonging.has(q.prompt))).toHaveLength(1);
			}
		}
	});

	it("does not repeat exact pronoun questions for the first ten rounds", async () => {
		vi.resetModules();
		const { generateBalancedSlovakQuestion } = await import("./balancedSlovakQuestion");
		const all: string[] = [];
		for (let round = 0; round < 10; round += 1) {
			for (let index = 0; index < 10; index += 1) {
				all.push(generateBalancedSlovakQuestion("sk-pronouns", index).prompt);
			}
		}
		expect(new Set(all).size).toBe(100);
	});

	it("has both personal and possessive meanings for jeho, jej and ich", () => {
		for (const pronoun of ["jeho", "jej", "ich"]) {
			const items = pronounBank.filter((q) => q.prompt.toLowerCase().includes(pronoun));
			expect(items.length).toBeGreaterThan(2);
			expect(items.some((q) => q.answer === "základné")).toBe(true);
			expect(items.some((q) => q.answer === "privlastňovacie")).toBe(true);
		}
	});
});
