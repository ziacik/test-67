import { describe, expect, it, vi } from "vitest";
import { physicsTopics } from "./physicsBank";
import { physicsGroups, physicsGroupIds } from "./physicsGenerator";
import { topics } from "./topics";
import { generateRoundQuestion, isCorrect } from "./quizGenerator";
import type { PhysicsTopicId } from "./types";

describe("Fyzika 6. ročník — témy podľa učebnice", () => {
  it("has all nineteen separate subjects and a mixed mode", () => {
    expect(physicsTopics).toHaveLength(19);
    expect(topics.filter((item) => item.subject === "physics").map((item) => item.id))
      .toEqual(["fy-mixed", ...physicsGroupIds]);
  });

  it("keeps distinct, answerable banks with four valid choices", () => {
    const all = Object.values(physicsGroups).flat();
    expect(all.length).toBeGreaterThan(500);
    for (const group of physicsGroupIds) {
      const bank = physicsGroups[group];
      expect(bank.length).toBeGreaterThanOrEqual(20);
      expect(new Set(bank.map((q) => q.prompt)).size).toBe(bank.length);
      for (const q of bank) {
        expect(q.prompt.length).toBeGreaterThan(12);
        expect(q.explanation.length).toBeGreaterThan(10);
        expect(q.choices).toHaveLength(4);
        expect(new Set(q.choices).size).toBe(4);
        expect(q.choices.filter((choice) => choice === q.answer)).toHaveLength(1);
      }
    }
  });

  it.each(["fy-mixed", ...physicsGroupIds] as PhysicsTopicId[])(
    "creates ten unique answerable questions in topic %s", (topic) => {
      for (let attempt = 0; attempt < 12; attempt++) {
        const questions = Array.from({ length: 10 }, (_, index) => generateRoundQuestion(topic, index));
        expect(new Set(questions.map((q) => q.prompt)).size).toBe(10);
        expect(new Set(questions.map((q) => q.id)).size).toBe(10);
        for (const question of questions) {
          expect(question.choices).toHaveLength(4);
          expect(question.choices).toContain(question.answer);
          expect(isCorrect(question, question.answer)).toBe(true);
        }
        if (topic === "fy-mixed") {
          expect(new Set(questions.map((q) => q.topic)).size).toBe(10);
        } else {
          expect(questions.every((q) => q.topic === topic)).toBe(true);
        }
      }
    },
  );

  it("does not repeat a question in two back-to-back lessons", async () => {
    vi.resetModules();
    const { generatePhysicsRoundQuestion } = await import("./physicsGenerator");
    for (const topic of physicsGroupIds) {
      const prompts: string[] = [];
      for (let round = 0; round < 2; round++) {
        for (let index = 0; index < 10; index++) {
          prompts.push(generatePhysicsRoundQuestion(topic, index).prompt);
        }
      }
      expect(new Set(prompts).size).toBe(20);
    }
  });

  it("covers all nineteen lessons across two mixed rounds", async () => {
    vi.resetModules();
    const { generatePhysicsRoundQuestion } = await import("./physicsGenerator");
    const covered = new Set<string>();
    for (let round = 0; round < 2; round++) {
      for (let i = 0; i < 10; i++) covered.add(generatePhysicsRoundQuestion("fy-mixed", i).topic);
    }
    expect(covered.size).toBe(19);
  });

  it("does not repeat prompts between adjacent mixed rounds", async () => {
    vi.resetModules();
    const { generatePhysicsRoundQuestion } = await import("./physicsGenerator");
    let previous = new Set<string>();
    for (let round = 0; round < 30; round++) {
      const current = new Set<string>();
      for (let i = 0; i < 10; i++) {
        const prompt = generatePhysicsRoundQuestion("fy-mixed", i).prompt;
        expect(previous.has(prompt)).toBe(false);
        current.add(prompt);
      }
      expect(current.size).toBe(10);
      previous = current;
    }
  });

  it("includes practical measurements, conversions and density calculations", () => {
    expect(physicsGroups["fy-solid-volume"].some((q) => q.prompt.includes("Kváder má rozmery"))).toBe(true);
    expect(physicsGroups["fy-length-units"].some((q) => q.prompt.includes("Premeň"))).toBe(true);
    expect(physicsGroups["fy-solid-density"].some((q) => q.prompt.includes("Aká je jeho hustota"))).toBe(true);
    expect(physicsGroups["fy-liquid-measure"].some((q) => q.prompt.includes("dielikov"))).toBe(true);
  });
});
