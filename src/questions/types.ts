export type TopicId = "numbers" | "arithmetic" | "geometry" | "mixed";

export type QuestionInteraction =
	| { kind: "input" }
	| { kind: "number-line"; values: number[] }
	| { kind: "sort"; values: number[] }
	| { kind: "equation-tiles"; expression: string; options: number[] }
	| { kind: "story-choice"; icon: string; options: string[] }
	| { kind: "number-filter"; values: number[]; correctValues: number[] }
	| {
		kind: "grid-area";
		columns: number;
		rows: number;
		filledColumns: number;
		filledRows: number;
		options: number[];
	};

export type Question = {
	id: string;
	topic: Exclude<TopicId, "mixed">;
	kind?: "story";
	prompt: string;
	answer: string;
	choices?: string[];
	interaction?: QuestionInteraction;
	hint?: string;
	explanation: string;
};

export type Topic = {
	id: TopicId;
	name: string;
	description: string;
	icon: string;
};
