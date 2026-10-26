import { describe, expect, it, vi } from "vitest";
import { germanBankSize, germanLessonIds, germanLessons } from "./germanBank";
import { germanQuestionBanks } from "./germanGenerator";
import { topics } from "./topics";
import { generateRoundQuestion, isCorrect } from "./quizGenerator";
import type { GermanTopicId } from "./types";

describe("Nemčina – Wir 1", () => {
  it("offers 12 selectable lessons and the mixed mode", () => {
    const ids = topics.filter(topic => topic.subject === "german").map(topic => topic.id);
    expect(ids).toEqual(["de-mixed", ...germanLessonIds]);
  });

  it("contains 602 answerable questions with different choices", () => {
    expect(germanBankSize).toBe(602);
    for (const lesson of germanLessonIds) {
      const bank = germanQuestionBanks[lesson];
      expect(bank.length).toBe(germanLessons[lesson].words.length * 2 + germanLessons[lesson].tasks.length);
      expect(bank.length).toBeGreaterThanOrEqual(40);
      expect(new Set(bank.map(question => question.prompt)).size).toBe(bank.length);
      for (const question of bank) {
        expect(question.prompt.length).toBeGreaterThan(5);
        expect(question.explanation.length).toBeGreaterThan(10);
        expect(question.choices).toHaveLength(4);
        expect(new Set(question.choices).size).toBe(4);
        expect(question.choices.filter(choice => choice === question.answer)).toHaveLength(1);
      }
    }
  });

  it.each(["de-mixed", ...germanLessonIds] as GermanTopicId[])("%s serves ten distinct, correctly answerable questions", topic => {
    for (let attempt = 0; attempt < 12; attempt++) {
      const round = Array.from({ length: 10 }, (_, i) => generateRoundQuestion(topic, i));
      expect(new Set(round.map(question => question.prompt)).size).toBe(10);
      expect(new Set(round.map(question => question.id)).size).toBe(10);
      for (const question of round) {
        expect(question.choices).toContain(question.answer);
        expect(isCorrect(question, question.answer)).toBe(true);
      }
      if (topic === "de-mixed") {
        expect(new Set(round.map(question => question.topic)).size).toBe(10);
      } else {
        expect(round.every(question => question.topic === topic)).toBe(true);
      }
    }
  });

  it.each(germanLessonIds)("does not repeat questions across the first 3 rounds of %s", async topic => {
    vi.resetModules();
    const { generateGermanRoundQuestion } = await import("./germanGenerator");
    const prompts: string[] = [];
    for (let round = 0; round < 3; round++) {
      for (let i = 0; i < 10; i++) prompts.push(generateGermanRoundQuestion(topic, i).prompt);
    }
    expect(new Set(prompts).size).toBe(30);
  });

  it("does not reuse a prompt in adjacent mixed rounds", async () => {
    vi.resetModules();
    const { generateGermanRoundQuestion } = await import("./germanGenerator");
    let last = new Set<string>();
    for (let attempt = 0; attempt < 20; attempt++) {
      const round = Array.from({ length: 10 }, (_, i) => generateGermanRoundQuestion("de-mixed", i));
      const current = new Set(round.map(question => question.prompt));
      expect(current.size).toBe(10);
      for (const prompt of current) expect(last.has(prompt)).toBe(false);
      last = current;
    }
  });
});
