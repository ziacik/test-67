import { describe, expect, it } from "vitest";
import {
	isBossQuestion,
	levelForXp,
	multiplierForStreak,
	pointsForAnswer,
	reactionForAnswer,
} from "./game";

describe("arcade game rules", () => {
	it("raises the multiplier as the streak grows", () => {
		expect(multiplierForStreak(1)).toBe(1);
		expect(multiplierForStreak(3)).toBe(2);
		expect(multiplierForStreak(6)).toBe(3);
	});

	it("gives double points for a boss question", () => {
		expect(pointsForAnswer({ correct: true, streakAfter: 3, hintUsed: false, boss: false, correctAnswer: "42" })).toBe(200);
		expect(pointsForAnswer({ correct: true, streakAfter: 3, hintUsed: false, boss: true, correctAnswer: "42" })).toBe(400);
	});

	it("reduces the reward after using a hint", () => {
		expect(pointsForAnswer({ correct: true, streakAfter: 1, hintUsed: true, boss: false, correctAnswer: "42" })).toBe(60);
	});

	it("adds a 67 easter-egg bonus", () => {
		expect(pointsForAnswer({ correct: true, streakAfter: 1, hintUsed: false, boss: false, correctAnswer: "67" })).toBe(167);
	});

	it("awards no points for a wrong answer", () => {
		expect(pointsForAnswer({ correct: false, streakAfter: 8, hintUsed: false, boss: true, correctAnswer: "67" })).toBe(0);
	});

	it("marks only the last question as the boss", () => {
		expect(isBossQuestion(8, 10)).toBe(false);
		expect(isBossQuestion(9, 10)).toBe(true);
	});

	it("levels up every 2000 XP", () => {
		expect(levelForXp(0)).toBe(1);
		expect(levelForXp(1999)).toBe(1);
		expect(levelForXp(2000)).toBe(2);
	});

	it("uses a special reaction for a correct 67", () => {
		expect(reactionForAnswer({ correct: true, streakAfter: 1, correctAnswer: "67" })).toContain("67");
	});
});
