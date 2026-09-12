import { useEffect, useState } from "react";
import type { Question } from "../questions/types";

type Props = {
	question: Question;
	disabled: boolean;
	onAnswer: (answer: string) => void;
};

const sk = (value: number) => new Intl.NumberFormat("sk-SK").format(value);

export function QuestionInteraction({ question, disabled, onAnswer }: Props) {
	const [sortPicks, setSortPicks] = useState<number[]>([]);
	const interaction = question.interaction;

	useEffect(() => {
		setSortPicks([]);
	}, [question.id]);

	if (!interaction) return null;

	if (interaction.kind === "number-line") {
		return (
			<div className="mini-number-line" aria-label="Číselná os">
				<div className="number-line-track" />
				<div className="number-line-points">
					{interaction.values.map((value, index) => (
						<button
							type="button"
							key={value}
							data-line-value={value}
							disabled={disabled}
							onClick={() => onAnswer(String(value))}
						>
							<span className="line-dot" />
							<span className="line-label">{index === 0 || index === interaction.values.length - 1 ? sk(value) : "\u00A0"}</span>
						</button>
					))}
				</div>
			</div>
		);
	}

	if (interaction.kind === "sort") {
		const remaining = interaction.values.filter((value) => !sortPicks.includes(value));

		const choose = (value: number) => {
			if (disabled) return;
			const next = [...sortPicks, value];
			setSortPicks(next);
			if (next.length === interaction.values.length) {
				onAnswer(next.join(","));
			}
		};

		return (
			<div className="sort-board">
				<div className="sort-slots" aria-label="Tvoje poradie">
					{interaction.values.map((_, index) => (
						<div className={sortPicks[index] === undefined ? "sort-slot" : "sort-slot filled"} key={index}>
							<span>{index + 1}</span>
							<strong>{sortPicks[index] === undefined ? "?" : sk(sortPicks[index])}</strong>
						</div>
					))}
				</div>
				<div className="sort-pool">
					{remaining.map((value) => (
						<button type="button" key={value} disabled={disabled} onClick={() => choose(value)}>
							{sk(value)}
						</button>
					))}
				</div>
				{sortPicks.length > 0 && !disabled && (
					<button
						type="button"
						className="sort-undo"
						onClick={() => setSortPicks((values) => values.slice(0, -1))}
					>
						↶ posledné späť
					</button>
				)}
			</div>
		);
	}


	if (interaction.kind === "equation-tiles") {
		return (
			<div className="equation-game">
				<div className="equation-stage" aria-label="Rovnica s chýbajúcim číslom">
					{interaction.expression}
				</div>
				<div className="equation-options">
					{interaction.options.map((option) => (
						<button type="button" key={option} disabled={disabled} onClick={() => onAnswer(String(option))}>
							{option}
						</button>
					))}
				</div>
			</div>
		);
	}

	if (interaction.kind === "story-choice") {
		return (
			<div className="story-game">
				<div className="story-scene" aria-hidden="true">
					<div className="story-orbit story-orbit-one" />
					<div className="story-orbit story-orbit-two" />
					<span>{interaction.icon}</span>
					<small>{interaction.icon} {interaction.icon}</small>
				</div>
				<div className="story-options">
					{interaction.options.map((option) => (
						<button type="button" key={option} disabled={disabled} onClick={() => onAnswer(option)}>
							{option}
						</button>
					))}
				</div>
			</div>
		);
	}

	if (interaction.kind === "grid-area") {
		const cell = 44;
		const width = interaction.columns * cell;
		const height = interaction.rows * cell;

		return (
			<div className="grid-area-game">
				<div className="grid-visual">
					<svg
						viewBox={`0 0 ${width} ${height}`}
						role="img"
						aria-label="Štvorcová sieť s vyfarbenou plochou"
					>
						{Array.from({ length: interaction.rows }, (_, row) =>
							Array.from({ length: interaction.columns }, (_, column) => {
								const filled = column < interaction.filledColumns && row < interaction.filledRows;
								return (
									<rect
										key={`${row}-${column}`}
										x={column * cell + 2}
										y={row * cell + 2}
										width={cell - 4}
										height={cell - 4}
										rx="6"
										className={filled ? "grid-cell grid-cell-filled" : "grid-cell"}
									/>
								);
							}),
						)}
					</svg>
				</div>
				<div className="visual-answer-cards">
					{interaction.options.map((option) => (
						<button type="button" key={option} disabled={disabled} onClick={() => onAnswer(String(option))}>
							{option}
						</button>
					))}
				</div>
			</div>
		);
	}

	return null;
}
