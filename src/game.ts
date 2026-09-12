export type RewardInput = {
	correct: boolean;
	streakAfter: number;
	hintUsed: boolean;
	boss: boolean;
	correctAnswer: string;
};

export function multiplierForStreak(streak: number): number {
	if (streak >= 6) return 3;
	if (streak >= 3) return 2;
	return 1;
}

export function pointsForAnswer(input: RewardInput): number {
	if (!input.correct) return 0;

	const base = input.hintUsed ? 60 : 100;
	const multiplier = multiplierForStreak(input.streakAfter);
	const bossMultiplier = input.boss ? 2 : 1;
	const bonus67 = input.correctAnswer.trim() === "67" ? 67 : 0;

	return base * multiplier * bossMultiplier + bonus67;
}

export function isBossQuestion(index: number, roundSize: number): boolean {
	return index === roundSize - 1;
}

export function levelForXp(xp: number): number {
	return Math.floor(Math.max(0, xp) / 2000) + 1;
}

export function reactionForAnswer({
	correct,
	streakAfter,
	correctAnswer,
}: {
	correct: boolean;
	streakAfter: number;
	correctAnswer: string;
}): string {
	if (!correct) return "Au. Toto ušlo.";
	if (correctAnswer.trim() === "67") return "67. Samozrejme.";
	if (streakAfter >= 6) return "🔥 Toto už je podozrivé.";
	if (streakAfter >= 3) return "Combo ide.";
	return "Nice.";
}
