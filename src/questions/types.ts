export type TopicId =
	| "numbers"
	| "decimals"
	| "fractions"
	| "geometry"
	| "addition"
	| "symmetry"
	| "multiplication"
	| "measurement"
	| "applications"
	| "mixed";

export type QuestionInteraction =
	| { kind: "input" }
	| { kind: "number-line"; values: number[] }
	| { kind: "sort"; values: number[] }
	| { kind: "equation-tiles"; expression: string; options: number[] }
	| { kind: "story-choice"; icon: string; options: string[] }
	| { kind: "number-filter"; values: number[]; correctValues: number[] }
	| { kind: "fraction-grid"; parts: number; filled: number; options: string[] }
	| { kind: "bar-chart"; labels: string[]; values: number[]; options: string[] }
	| { kind: "cube-stack"; columns: number[]; options: number[] }
	| { kind: "ruler"; millimeters: number; options: number[] }
	| { kind: "symmetry-grid"; mode: "axis" | "center"; x: number; y: number; options: string[] }
	| { kind: "data-table"; headers: string[]; rows: string[][]; options: string[] }
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
