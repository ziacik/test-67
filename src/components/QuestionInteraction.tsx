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
	const [filterPicks, setFilterPicks] = useState<number[]>([]);
	const interaction = question.interaction;

	useEffect(() => {
		setSortPicks([]);
		setFilterPicks([]);
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

	if (interaction.kind === "number-filter") {
		const toggle = (value: number) => {
			if (disabled) return;
			setFilterPicks((values) =>
				values.includes(value) ? values.filter((item) => item !== value) : [...values, value],
			);
		};

		return (
			<div className="number-filter-game">
				<div className="number-filter-grid">
					{interaction.values.map((value) => (
						<button
							type="button"
							key={value}
							disabled={disabled}
							className={filterPicks.includes(value) ? "selected" : ""}
							onClick={() => toggle(value)}
						>
							{sk(value)}
						</button>
					))}
				</div>
				<button
					type="button"
					className="filter-submit"
					disabled={disabled || filterPicks.length === 0}
					onClick={() => onAnswer([...filterPicks].sort((a, b) => a - b).join(","))}
				>
					HOTOVO
				</button>
			</div>
		);
	}


	if (interaction.kind === "fraction-grid") {
		return (
			<div className="fraction-game">
				<div className="fraction-visual" role="img" aria-label={`${interaction.filled} z ${interaction.parts} častí je vyfarbených`}>
					{Array.from({ length: interaction.parts }, (_, index) => (
						<div key={index} className={index < interaction.filled ? "fraction-part filled" : "fraction-part"} />
					))}
				</div>
				<div className="visual-answer-cards">
					{interaction.options.map((option) => (
						<button type="button" key={option} disabled={disabled} onClick={() => onAnswer(option)}>
							{option}
						</button>
					))}
				</div>
			</div>
		);
	}

	if (interaction.kind === "bar-chart") {
		const max = Math.max(...interaction.values);
		return (
			<div className="chart-game">
				<div className="bar-chart" role="img" aria-label="Stĺpcový graf">
					{interaction.values.map((value, index) => (
						<div className="bar-column" key={interaction.labels[index]}>
							<span>{value}</span>
							<div className="bar" style={{ height: `${Math.max(18, (value / max) * 150)}px` }} />
							<strong>{interaction.labels[index]}</strong>
						</div>
					))}
				</div>
				<div className="visual-answer-cards">
					{interaction.options.map((option) => (
						<button type="button" key={option} disabled={disabled} onClick={() => onAnswer(option)}>
							{option}
						</button>
					))}
				</div>
			</div>
		);
	}

	if (interaction.kind === "cube-stack") {
		return (
			<div className="cube-game">
				<div className="cube-stack" role="img" aria-label="Stavba zo stĺpcov kociek">
					{interaction.columns.map((height, column) => (
						<div className="cube-column" key={column}>
							{Array.from({ length: height }, (_, index) => (
								<div className="cube" key={index} />
							))}
						</div>
					))}
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



	if (interaction.kind === "ruler") {
		const width = 520;
		const left = 20;
		const scale = 4.8;
		const endX = left + interaction.millimeters * scale;
		return (
			<div className="ruler-game">
				<div className="ruler-visual">
					<svg viewBox="0 0 540 120" role="img" aria-label="Úsečka na milimetrovom pravítku">
						<line x1={left} y1="35" x2={endX} y2="35" className="measured-segment" />
						<circle cx={left} cy="35" r="5" className="segment-end" />
						<circle cx={endX} cy="35" r="5" className="segment-end" />
						<line x1={left} y1="72" x2={width} y2="72" className="ruler-line" />
						{Array.from({ length: 101 }, (_, index) => {
							const x = left + index * scale;
							const major = index % 10 === 0;
							const medium = index % 5 === 0;
							return (
								<g key={index}>
									<line x1={x} y1="72" x2={x} y2={major ? 96 : medium ? 90 : 84} className="ruler-tick" />
									{major && <text x={x} y="112" textAnchor="middle" className="ruler-label">{index / 10}</text>}
								</g>
							);
						})}
					</svg>
					<small>cm</small>
				</div>
				<div className="visual-answer-cards">
					{interaction.options.map((option) => (
						<button type="button" key={option} disabled={disabled} onClick={() => onAnswer(String(option))}>
							{option} mm
						</button>
					))}
				</div>
			</div>
		);
	}

	if (interaction.kind === "symmetry-grid") {
		const size = 360;
		const cell = 40;
		const origin = size / 2;
		const pointX = origin + interaction.x * cell;
		const pointY = origin - interaction.y * cell;
		return (
			<div className="symmetry-grid-game">
				<div className="symmetry-grid-visual">
					<svg viewBox="0 0 360 360" role="img" aria-label="Súradnicová sieť pre súmernosť">
						{Array.from({ length: 10 }, (_, index) => (
							<g key={index}>
								<line x1={index * cell} y1="0" x2={index * cell} y2={size} className="sym-grid-line" />
								<line x1="0" y1={index * cell} x2={size} y2={index * cell} className="sym-grid-line" />
							</g>
						))}
						<line x1={origin} y1="0" x2={origin} y2={size} className="sym-axis" />
						{interaction.mode === "center" && <line x1="0" y1={origin} x2={size} y2={origin} className="sym-axis secondary-axis" />}
						{interaction.mode === "center" && <circle cx={origin} cy={origin} r="6" className="sym-center" />}
						{interaction.mode === "center" && <text x={origin + 10} y={origin - 10} className="sym-label">O</text>}
						<circle cx={pointX} cy={pointY} r="8" className="sym-point" />
						<text x={pointX + 11} y={pointY - 10} className="sym-label">A</text>
					</svg>
				</div>
				<div className="visual-answer-cards">
					{interaction.options.map((option) => (
						<button type="button" key={option} disabled={disabled} onClick={() => onAnswer(option)}>
							{option}
						</button>
					))}
				</div>
			</div>
		);
	}

	if (interaction.kind === "data-table") {
		return (
			<div className="data-table-game">
				<div className="data-table-wrap">
					<table>
						<thead>
							<tr>{interaction.headers.map((header) => <th key={header}>{header}</th>)}</tr>
						</thead>
						<tbody>
							{interaction.rows.map((row, rowIndex) => (
								<tr key={rowIndex}>
									{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="table-answer-cards">
					{interaction.options.map((option) => (
						<button type="button" key={option} disabled={disabled} onClick={() => onAnswer(option)}>
							{option}
						</button>
					))}
				</div>
			</div>
		);
	}



	if (interaction.kind === "number-line-target") {
		const values = Array.from({ length: interaction.count }, (_, index) => interaction.start + index * interaction.step);
		return (
			<div className="target-line-game">
				<div className="target-line-visual" role="img" aria-label="Číselná os so zvýrazneným bodom">
					<div className="target-line-track" />
					<div className="target-line-points">
						{values.map((value, index) => (
							<div key={value} className={index === interaction.targetIndex ? "target-line-point target" : "target-line-point"}>
								<span />
								<strong>{index === 0 || index === values.length - 1 ? sk(value) : index === interaction.targetIndex ? "?" : "·"}</strong>
							</div>
						))}
					</div>
				</div>
				<div className="visual-answer-cards">
					{interaction.options.map((option) => (
						<button type="button" key={option} disabled={disabled} onClick={() => onAnswer(String(option))}>
							{sk(option)}
						</button>
					))}
				</div>
			</div>
		);
	}

	if (interaction.kind === "route-map") {
		const positions = [[55, 55], [245, 45], [250, 205], [55, 215]] as const;
		return (
			<div className="route-map-game">
				<div className="route-map-visual">
					<svg viewBox="0 0 300 260" role="img" aria-label="Mapa so vzdialenosťami medzi miestami">
						{interaction.edges.map(([from, to, distance], index) => {
							const [x1, y1] = positions[from];
							const [x2, y2] = positions[to];
							return (
								<g key={index}>
									<line x1={x1} y1={y1} x2={x2} y2={y2} className="map-edge" />
									<text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 7} textAnchor="middle" className="map-distance">{distance} km</text>
								</g>
							);
						})}
						{interaction.labels.map((label, index) => {
							const [x, y] = positions[index];
							return (
								<g key={label}>
									<circle cx={x} cy={y} r="23" className="map-node" />
									<text x={x} y={y + 4} textAnchor="middle" className="map-node-label">{label.slice(0, 1)}</text>
									<text x={x} y={y + 39} textAnchor="middle" className="map-place-label">{label}</text>
								</g>
							);
						})}
					</svg>
				</div>
				<div className="table-answer-cards">
					{interaction.options.map((option) => (
						<button type="button" key={option} disabled={disabled} onClick={() => onAnswer(option)}>
							{option}
						</button>
					))}
				</div>
			</div>
		);
	}

	if (interaction.kind === "cube-code") {
		return (
			<div className="cube-code-game">
				<div className="cube-code-visual" role="img" aria-label="Stavba z kociek na zakódovanie">
					{interaction.columns.map((height, column) => (
						<div className="cube-column" key={column}>
							{Array.from({ length: height }, (_, index) => <div className="cube" key={index} />)}
						</div>
					))}
				</div>
				<div className="visual-answer-cards">
					{interaction.options.map((option) => (
						<button type="button" key={option} disabled={disabled} onClick={() => onAnswer(option)}>
							{option}
						</button>
					))}
				</div>
			</div>
		);
	}

	if (interaction.kind === "symmetry-shape") {
		const size = 180;
		const cell = 24;
		const origin = size / 2;
		const polygon = (points: Array<[number, number]>) =>
			points.map(([x, y]) => `${origin + x * cell},${origin - y * cell}`).join(" ");
		return (
			<div className="symmetry-shape-game">
				<div className="symmetry-source">
					<svg viewBox="0 0 180 180" role="img" aria-label="Pôvodný útvar a os alebo stred súmernosti">
						<line x1={origin} y1="0" x2={origin} y2={size} className="sym-axis" />
						{interaction.mode === "center" && <line x1="0" y1={origin} x2={size} y2={origin} className="sym-axis secondary-axis" />}
						{interaction.mode === "center" && <circle cx={origin} cy={origin} r="5" className="sym-center" />}
						<polygon points={polygon(interaction.points)} className="sym-polygon source" />
					</svg>
				</div>
				<div className="symmetry-option-grid">
					{interaction.options.map((option) => (
						<button type="button" key={option.answer} disabled={disabled} onClick={() => onAnswer(option.answer)}>
							<strong>{option.answer}</strong>
							<svg viewBox="0 0 180 180" aria-hidden="true">
								<line x1={origin} y1="0" x2={origin} y2={size} className="sym-axis" />
								{interaction.mode === "center" && <line x1="0" y1={origin} x2={size} y2={origin} className="sym-axis secondary-axis" />}
								<polygon points={polygon(option.points)} className="sym-polygon" />
							</svg>
						</button>
					))}
				</div>
			</div>
		);
	}

	if (interaction.kind === "chart-choice") {
		const max = Math.max(...interaction.options.flatMap((option) => option.values));
		return (
			<div className="chart-choice-game">
				<div className="chart-choice-grid">
					{interaction.options.map((option) => (
						<button type="button" key={option.answer} disabled={disabled} onClick={() => onAnswer(option.answer)}>
							<strong>{option.answer}</strong>
							<div className="mini-chart" aria-label={`Graf ${option.answer}`}>
								{option.values.map((value, index) => (
									<div className="mini-chart-column" key={interaction.labels[index]}>
										<div className="mini-bar" style={{ height: `${Math.max(12, (value / max) * 100)}px` }} />
										<span>{interaction.labels[index]}</span>
									</div>
								))}
							</div>
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
