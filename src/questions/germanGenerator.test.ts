import { describe, expect, it, vi } from "vitest";
import { germanBankSize, germanLessonIds } from "./germanBank";
import { germanQuestionBanks } from "./germanGenerator";
import { topics } from "./topics";
import { generateRoundQuestion, isCorrect } from "./quizGenerator";
import type { GermanTopicId, Question } from "./types";

describe("Nemčina – Wir 1, náročnejšie cvičenia", () => {
  it("offers all 12 lessons and the mixed mode", () => {
    expect(topics.filter(topic => topic.subject === "german").map(topic => topic.id))
      .toEqual(["de-mixed", ...germanLessonIds]);
  });

  it("does not serve primitive standalone vocabulary translations", () => {
    expect(germanBankSize).toBe(602); // pôvodný slovník zostáva podkladom pre budúce lekcie
    for (const lesson of germanLessonIds) {
      const questions = germanQuestionBanks[lesson];
      expect(questions.length).toBeGreaterThanOrEqual(40);
      expect(new Set(questions.map(item => item.prompt)).size).toBe(questions.length);
      for (const item of questions) {
        expect(item.prompt).not.toMatch(/^Prelož do nemčiny:|^Čo znamená po nemecky/);
        expect(item.explanation.length).toBeGreaterThan(10);
        if (item.choices) {
          expect(item.choices).toHaveLength(4);
          expect(new Set(item.choices).size).toBe(4);
          expect(item.choices.filter(choice => choice === item.answer)).toHaveLength(1);
        }
      }
    }
  });

  it("starts with contextual grammar, dialogues, syntax, comprehension and writing", () => {
    const round = Array.from({ length: 10 }, (_, index) => generateRoundQuestion("de-01", index));
    const skills = round.map(item => germanQuestionBanks["de-01"].find(spec => spec.prompt === item.prompt)?.skill);
    expect(skills.sort()).toEqual(["dialog", "dialog", "forms", "forms", "numbers", "reading", "reading", "syntax", "syntax", "writing"].sort());
    expect(round.filter(item => item.choices === undefined)).toHaveLength(1);
  });

  it.each(["de-mixed", ...germanLessonIds] as GermanTopicId[])("creates full non-repeating rounds for %s", topic => {
    for (let attempt = 0; attempt < 15; attempt++) {
      const round = Array.from({ length: 10 }, (_, index) => generateRoundQuestion(topic, index));
      expect(new Set(round.map(item => item.prompt)).size).toBe(10);
      for (const q of round) {
        if (q.choices) expect(q.choices).toContain(q.answer);
        expect(isCorrect(q, q.answer)).toBe(true);
      }
      if (topic === "de-mixed") {
        expect(new Set(round.map(question => question.topic)).size).toBe(10);
      } else {
        expect(round.every(question => question.topic === topic)).toBe(true);
      }
    }
  });

  it("does not repeat any first-lesson question during four consecutive rounds", async () => {
    vi.resetModules();
    const { generateGermanRoundQuestion } = await import("./germanGenerator");
    const all = new Set<string>();
    for (let round = 0; round < 4; round++) {
      for (let index = 0; index < 10; index++) {
        const prompt = generateGermanRoundQuestion("de-01", index).prompt;
        expect(all.has(prompt)).toBe(false);
        all.add(prompt);
      }
    }
    expect(all.size).toBe(40);
  });

  it("accepts German umlaut substitutes and harmless punctuation in written answers", () => {
    const question: Question = {
      id: "example", topic: "de-01", prompt: "Oprav vetu", answer: "Ich heiße Mia", explanation: "ich heiße",
    };
    expect(isCorrect(question, "ich heisse mia.")).toBe(true);
    expect(isCorrect(question, "Ich heißt Mia")).toBe(false);
  });

  it("does not recycle identical questions in neighbouring mixed rounds", async () => {
    vi.resetModules();
    const { generateGermanRoundQuestion } = await import("./germanGenerator");
    let previous = new Set<string>();
    for (let round = 0; round < 20; round++) {
      const current = new Set<string>();
      for (let i = 0; i < 10; i++) {
        const prompt = generateGermanRoundQuestion("de-mixed", i).prompt;
        expect(previous.has(prompt)).toBe(false);
        current.add(prompt);
      }
      expect(current.size).toBe(10);
      previous = current;
    }
  });
});