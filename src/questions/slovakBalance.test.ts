import { describe, expect, it } from "vitest";
import { generateRoundQuestion } from "./quizGenerator";
import type { SlovakTopicId } from "./types";

function round(topic: SlovakTopicId) {
	return Array.from({ length: 10 }, (_, index) =>
		generateRoundQuestion(topic, index),
	);
}

describe("balanced Slovak quiz rounds", () => {
	it("balances spelling forms", () => {
		for (let attempt = 0; attempt < 30; attempt += 1) {
			const questions = round("sk-spelling");
			const soft = questions.filter((q) => q.answer === "i" || q.answer === "í");
			const hard = questions.filter((q) => q.answer === "y" || q.answer === "ý");
			expect(soft).toHaveLength(4);
			expect(hard).toHaveLength(6);
		}
	});

	it("balances noun and adjective skills", () => {
		for (let attempt = 0; attempt < 30; attempt += 1) {
			const questions = round("sk-nouns");
			expect(questions.filter((q) => q.prompt.startsWith("Ktorý vzor má")).length).toBe(3);
			expect(questions.filter((q) => q.prompt.startsWith("Urči pád")).length).toBe(2);
			expect(questions.filter((q) => q.prompt.includes("stupeň prídavného mena")).length).toBe(2);
		}
	});

	it("balances sentence skills", () => {
		for (let attempt = 0; attempt < 30; attempt += 1) {
			const questions = round("sk-sentences");
			expect(questions.filter((q) => q.prompt.startsWith("Aký druh vety podľa obsahu")).length).toBe(4);
			expect(questions.filter((q) => q.prompt.startsWith("Ktorá veta má prirodzený")).length).toBe(2);
			expect(questions.filter((q) => q.prompt.startsWith("Ktorý zápis priamej reči")).length).toBe(2);
			expect(questions.filter((q) => q.prompt.startsWith("Ktoré znamienko patrí")).length).toBe(2);
		}
	});

	it("balances reading, procedures and sloh", () => {
		for (let attempt = 0; attempt < 30; attempt += 1) {
			const questions = round("sk-reading");
			const comprehension = questions.filter((q) =>
				q.prompt.includes("Prečítaj:") || q.prompt.startsWith("Ktorý nadpis"),
			);
			const procedures = questions.filter((q) => q.prompt.startsWith("Ktoré poradie patrí"));
			expect(comprehension).toHaveLength(5);
			expect(procedures).toHaveLength(3);
			expect(questions.length - comprehension.length - procedures.length).toBe(2);
		}
	});

	it("balances literature", () => {
		for (let attempt = 0; attempt < 30; attempt += 1) {
			const questions = round("sk-literature");
			expect(questions.filter((q) => q.prompt.startsWith("Ktorá veta obsahuje personifikáciu")).length).toBe(2);
			expect(questions.filter((q) => q.prompt.startsWith("Ktoré spojenie je epiteton")).length).toBe(2);
		}
	});

	it("balances mixed rounds by topic", () => {
		for (let attempt = 0; attempt < 30; attempt += 1) {
			const questions = round("sk-mixed");
			const count = (topic: string) =>
				questions.filter((q) => q.topic === topic).length;
			expect(count("sk-spelling")).toBe(2);
			expect(count("sk-nouns")).toBe(2);
			expect(count("sk-vocabulary")).toBe(2);
			expect(count("sk-sentences")).toBe(2);
			expect(count("sk-reading")).toBe(1);
			expect(count("sk-literature")).toBe(1);
		}
	});
});
