import { describe, expect, it } from "vitest";
import { biologyBankSize, biologyGroups } from "./biologyBank";
import { generateBiologyRoundQuestion } from "./biologyGenerator";
import { generateRoundQuestion, isCorrect } from "./quizGenerator";
import { topics } from "./topics";

const plan = { základy: 1, baktérie: 2, potraviny: 2, plesne: 2, kvasinky: 2, situácie: 1 } as const;

describe("Biológia – Mikroorganizmy žijúce s človekom", () => {
	it("is available from the biology subject on the home screen", () => {
		expect(topics.find((topic) => topic.id === "bio-microbes")?.subject).toBe("biology");
	});

	it("contains at least 100 different textbook-based questions", () => {
		const all = Object.values(biologyGroups).flat();
		expect(biologyBankSize).toBeGreaterThanOrEqual(100);
		expect(new Set(all.map((item) => item.prompt)).size).toBe(all.length);
		for (const item of all) {
			expect(item.prompt.length).toBeGreaterThan(10);
			expect(item.explanation.length).toBeGreaterThan(10);
			expect(item.choices).toHaveLength(4);
			expect(new Set(item.choices).size).toBe(4);
			expect(item.choices.filter((choice) => choice === item.answer)).toHaveLength(1);
		}
	});

	it("builds complete rounds of ten unique and correctly answerable questions", () => {
		for (let attempt = 0; attempt < 30; attempt++) {
			const round = Array.from({ length: 10 }, (_, index) => generateRoundQuestion("bio-microbes", index));
			expect(new Set(round.map((question) => question.prompt)).size).toBe(10);
			expect(new Set(round.map((question) => question.id)).size).toBe(10);
			for (const question of round) {
				expect(question.topic).toBe("bio-microbes");
				expect(question.choices).toContain(question.answer);
				expect(isCorrect(question, question.answer)).toBe(true);
			}
			for (const [group, count] of Object.entries(plan)) {
				const prompts = new Set(biologyGroups[group as keyof typeof biologyGroups].map((item) => item.prompt));
				expect(round.filter((question) => prompts.has(question.prompt))).toHaveLength(count);
			}
		}
	});

	it("does not recycle questions during the first five rounds", () => {
		const all: string[] = [];
		for (let attempt = 0; attempt < 5; attempt++) {
			for (let index = 0; index < 10; index++) {
				all.push(generateBiologyRoundQuestion(index).prompt);
			}
		}
		expect(new Set(all).size).toBe(50);
	});
});
