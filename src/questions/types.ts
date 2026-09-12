export type TopicId = "numbers" | "arithmetic" | "geometry" | "mixed";

export type Question = {
	id: string;
	topic: Exclude<TopicId, "mixed">;
	prompt: string;
	answer: string;
	choices?: string[];
	hint?: string;
	explanation: string;
};

export type Topic = {
	id: TopicId;
	name: string;
	description: string;
	icon: string;
};
