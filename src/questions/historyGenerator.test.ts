import { describe, expect, it, vi } from "vitest";
import { historyBankSize, historyGroups, type HistoryGroupId } from "./historyBank";
import { topics } from "./topics";
import { generateRoundQuestion, isCorrect } from "./quizGenerator";
import type { HistoryTopicId } from "./types";

const groups = Object.keys(historyGroups) as HistoryGroupId[];
const concreteTopics = groups.map((group) => `hist-${group}` as HistoryTopicId);

describe("Dejepis – pravek podľa učebnice", () => {
	it("has six selectable lessons and one mixed lesson", () => {
		const available = topics.filter((topic) => topic.subject === "history");
		expect(available.map((topic) => topic.id)).toEqual(["hist-mixed", ...concreteTopics]);
	});

	it("has 132 unique textbook questions with four different choices", () => {
		const all = Object.values(historyGroups).flat();
		expect(historyBankSize).toBe(132);
		expect(new Set(all.map((item) => item.prompt)).size).toBe(all.length);
		for (const group of groups) expect(historyGroups[group].length).toBeGreaterThanOrEqual(20);
		for (const item of all) {
			expect(item.prompt.length).toBeGreaterThan(10);
			expect(item.explanation.length).toBeGreaterThan(10);
			expect(item.choices).toHaveLength(4);
			expect(new Set(item.choices).size).toBe(4);
			expect(item.choices.filter((choice) => choice === item.answer)).toHaveLength(1);
		}
	});

	it.each(["hist-mixed", ...concreteTopics] as HistoryTopicId[])("serves unique answerable rounds for %s", (topic) => {
		for (let attempt = 0; attempt < 12; attempt++) {
			const round = Array.from({ length: 10 }, (_, index) => generateRoundQuestion(topic, index));
			expect(new Set(round.map((item) => item.prompt)).size).toBe(10);
			expect(new Set(round.map((item) => item.id)).size).toBe(10);
			for (const question of round) {
				expect(question.choices).toContain(question.answer);
				expect(isCorrect(question, question.answer)).toBe(true);
			}
			if (topic !== "hist-mixed") {
				expect(round.every((question) => question.topic === topic)).toBe(true);
			} else {
				const distribution = groups.map((group) =>
					round.filter((question) => question.topic === `hist-${group}`).length,
				);
				expect([...distribution].sort()).toEqual([1, 1, 2, 2, 2, 2]);
			}
		}
	});

	it("does not repeat a mixed-mode question in the first eight rounds", async () => {
		vi.resetModules();
		const { generateHistoryRoundQuestion } = await import("./historyGenerator");
		const all: string[] = [];
		for (let round = 0; round < 8; round++) {
			for (let index = 0; index < 10; index++) {
				all.push(generateHistoryRoundQuestion("hist-mixed", index).prompt);
			}
		}
		expect(new Set(all).size).toBe(80);
	});

	it.each(concreteTopics)("does not repeat an individual lesson in its first two rounds: %s", async (topic) => {
		vi.resetModules();
		const { generateHistoryRoundQuestion } = await import("./historyGenerator");
		const all: string[] = [];
		for (let round = 0; round < 2; round++) {
			for (let index = 0; index < 10; index++) {
				all.push(generateHistoryRoundQuestion(topic, index).prompt);
			}
		}
		expect(new Set(all).size).toBe(20);
	});
});
