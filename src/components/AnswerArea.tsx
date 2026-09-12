import type { Ref } from "react";
import type { Question } from "../questions/types";
import { QuestionInteraction } from "./QuestionInteraction";

type Props = {
	question: Question;
	answer: string;
	disabled: boolean;
	onAnswer: (answer: string) => void;
	onInputChange: (answer: string) => void;
	inputRef?: Ref<HTMLInputElement>;
};

export function AnswerArea({
	question,
	answer,
	disabled,
	onAnswer,
	onInputChange,
	inputRef,
}: Props) {
	if (question.interaction && question.interaction.kind !== "input") {
		return (
			<QuestionInteraction
				key={question.id}
				question={question}
				disabled={disabled}
				onAnswer={onAnswer}
			/>
		);
	}

	if (question.choices) {
		return (
			<div className="choices choice-cards">
				{question.choices.map((choice) => (
					<button
						type="button"
						key={choice}
						className={answer === choice ? "selected" : ""}
						onClick={() => onAnswer(choice)}
						disabled={disabled}
					>
						{choice}
					</button>
				))}
			</div>
		);
	}

	return (
		<input
			ref={inputRef}
			inputMode="numeric"
			autoComplete="off"
			value={answer}
			onChange={(event) => onInputChange(event.target.value)}
			disabled={disabled}
			placeholder="Napíš odpoveď"
		/>
	);
}
