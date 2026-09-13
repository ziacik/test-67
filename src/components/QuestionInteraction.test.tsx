import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuestionInteraction } from "./QuestionInteraction";
import type { Question } from "../questions/types";

function render(question: Question) {
	return renderToStaticMarkup(
		<QuestionInteraction
			question={question}
			disabled={false}
			onAnswer={() => undefined}
		/>,
	);
}

describe("QuestionInteraction", () => {
	it("renders five clickable markers for a number line", () => {
		const html = render({
			id: "line",
			topic: "numbers",
			prompt: "line",
			answer: "20",
			explanation: "x",
			interaction: { kind: "number-line", values: [0, 10, 20, 30, 40] },
		});

		expect(html).toContain("mini-number-line");
		expect(html.match(/data-line-value=/g)).toHaveLength(5);
	});

	it("renders a tap-to-order board", () => {
		const html = render({
			id: "sort",
			topic: "numbers",
			prompt: "sort",
			answer: "10,20,30,40",
			explanation: "x",
			interaction: { kind: "sort", values: [30, 10, 40, 20] },
		});

		expect(html).toContain("sort-board");
		expect(html).toContain("30");
		expect(html).toContain("10");
	});

	it("renders a missing-number equation as large tap tiles", () => {
		const html = render({
			id: "equation",
			topic: "multiplication",
			prompt: "missing",
			answer: "7",
			explanation: "x",
			interaction: {
				kind: "equation-tiles",
				expression: "□ × 8 = 56",
				options: [6, 7, 8, 9],
			},
		});

		expect(html).toContain("equation-stage");
		expect(html).toContain("□ × 8 = 56");
		expect(html).toContain(">7<");
	});

	it("renders a word problem as a visual story choice", () => {
		const html = render({
			id: "story",
			topic: "multiplication",
			kind: "story",
			prompt: "Na výlete...",
			answer: "6 × 24 + 17",
			explanation: "x",
			interaction: {
				kind: "story-choice",
				icon: "📦",
				options: ["6 × 24 + 17", "6 + 24 + 17", "6 × (24 + 17)", "6 × 24 − 17"],
			},
		});

		expect(html).toContain("story-game");
		expect(html).toContain("📦");
		expect(html).toContain("6 × 24 + 17");
	});

	it("renders a multi-select number filtering task", () => {
		const html = render({
			id: "filter",
			topic: "numbers",
			prompt: "Vyber čísla",
			answer: "1750,2016",
			explanation: "x",
			interaction: {
				kind: "number-filter",
				values: [1371, 2585, 2108, 3074, 2317, 1965, 2016, 1750],
				correctValues: [2016, 1750],
			},
		});

		expect(html).toContain("number-filter-game");
		expect(html).toContain("1 750");
		expect(html).toContain("2 016");
		expect(html).toContain("HOTOVO");
	});

	it("renders the area question as an SVG grid with answer cards", () => {
		const html = render({
			id: "grid",
			topic: "measurement",
			prompt: "grid",
			answer: "12",
			explanation: "x",
			interaction: {
				kind: "grid-area",
				columns: 6,
				rows: 5,
				filledColumns: 4,
				filledRows: 3,
				options: [8, 10, 12, 15],
			},
		});

		expect(html).toContain("<svg");
		expect(html).toContain("grid-cell-filled");
		expect(html).toContain(">12<");
	});

	it("renders a visual fraction task", () => {
		const html = render({
			id: "fraction",
			topic: "fractions",
			prompt: "fraction",
			answer: "3/4",
			explanation: "x",
			interaction: { kind: "fraction-grid", parts: 4, filled: 3, options: ["1/4", "2/4", "3/4", "4/4"] },
		});

		expect(html).toContain("fraction-visual");
		expect(html.match(/fraction-part filled/g)).toHaveLength(3);
		expect(html).toContain("3/4");
	});

	it("renders a real bar chart", () => {
		const html = render({
			id: "chart",
			topic: "applications",
			prompt: "chart",
			answer: "St",
			explanation: "x",
			interaction: { kind: "bar-chart", labels: ["Po", "Ut", "St", "Št"], values: [3, 6, 9, 4], options: ["Po", "Ut", "St", "Št"] },
		});

		expect(html).toContain("bar-chart");
		expect(html).toContain("St");
		expect(html).toContain("9");
	});

	it("renders a cube construction", () => {
		const html = render({
			id: "cubes",
			topic: "geometry",
			prompt: "cubes",
			answer: "6",
			explanation: "x",
			interaction: { kind: "cube-stack", columns: [1, 2, 3], options: [5, 6, 7, 8] },
		});

		expect(html).toContain("cube-stack");
		expect(html.match(/class="cube"/g)).toHaveLength(6);
		expect(html).toContain(">6<");
	});


	it("renders a millimeter ruler", () => {
		const html = render({
			id: "ruler",
			topic: "measurement",
			prompt: "ruler",
			answer: "37",
			explanation: "x",
			interaction: { kind: "ruler", millimeters: 37, options: [32, 37, 42, 47] },
		});

		expect(html).toContain("ruler-visual");
		expect(html).toContain("measured-segment");
		expect(html).toContain("37 mm");
	});

	it("renders a symmetry construction grid", () => {
		const html = render({
			id: "symmetry-grid",
			topic: "symmetry",
			prompt: "symmetry",
			answer: "(2;3)",
			explanation: "x",
			interaction: { kind: "symmetry-grid", mode: "axis", x: -2, y: 3, options: ["(2;3)", "(-2;-3)", "(-2;3)", "(2;-3)"] },
		});

		expect(html).toContain("symmetry-grid-visual");
		expect(html).toContain("sym-point");
		expect(html).toContain("(2;3)");
	});

	it("renders a real data table", () => {
		const html = render({
			id: "table",
			topic: "applications",
			prompt: "table",
			answer: "Po → Ut",
			explanation: "x",
			interaction: {
				kind: "data-table",
				headers: ["Deň", "Počet"],
				rows: [["Po", "3"], ["Ut", "7"]],
				options: ["Po → Ut", "Ut → Po"],
			},
		});

		expect(html).toContain("<table>");
		expect(html).toContain("Deň");
		expect(html).toContain("Po → Ut");
	});

});
