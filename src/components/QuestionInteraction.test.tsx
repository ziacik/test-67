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
			topic: "arithmetic",
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
			topic: "arithmetic",
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

	it("renders the area question as an SVG grid with answer cards", () => {
		const html = render({
			id: "grid",
			topic: "geometry",
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
});
