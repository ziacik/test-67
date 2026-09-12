import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AnswerArea } from "./AnswerArea";
import type { Question } from "../questions/types";

const noop = () => undefined;

function render(question: Question) {
	return renderToStaticMarkup(
		<AnswerArea
			question={question}
			answer=""
			disabled={false}
			onAnswer={noop}
			onInputChange={noop}
		/>,
	);
}

describe("AnswerArea", () => {
	it("uses the mini-game renderer instead of an input", () => {
		const html = render({
			id: "line",
			topic: "numbers",
			prompt: "line",
			answer: "20",
			explanation: "x",
			interaction: { kind: "number-line", values: [0, 10, 20, 30, 40] },
		});

		expect(html).toContain("mini-number-line");
		expect(html).not.toContain("<input");
	});

	it("keeps a numeric input for classic calculation questions", () => {
		const html = render({
			id: "input",
			topic: "addition",
			prompt: "2 + 2",
			answer: "4",
			explanation: "x",
		});

		expect(html).toContain("<input");
	});

	it("renders old choice questions as tap cards", () => {
		const html = render({
			id: "choice",
			topic: "numbers",
			prompt: "pick",
			answer: ">",
			choices: ["<", ">", "="],
			explanation: "x",
		});

		expect(html).toContain("choice-cards");
		expect(html).not.toContain("<input");
	});
});
