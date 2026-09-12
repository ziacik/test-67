import { describe, expect, it } from "vitest";
import { generators } from "./generator";
import { topics } from "./topics";

const expectedTopics = [
	"mixed",
	"numbers",
	"geometry",
	"addition",
	"symmetry",
	"multiplication",
	"measurement",
	"applications",
] as const;

describe("fifth-grade curriculum bank", () => {
	it("exposes the real fifth-grade curriculum areas", () => {
		expect(topics.map((topic) => topic.id)).toEqual(expectedTopics);
	});

	it("has a non-trivial task bank for every curriculum area", () => {
		expect(generators.numbers.length).toBeGreaterThanOrEqual(5);
		expect(generators.geometry.length).toBeGreaterThanOrEqual(4);
		expect(generators.addition.length).toBeGreaterThanOrEqual(4);
		expect(generators.symmetry.length).toBeGreaterThanOrEqual(3);
		expect(generators.multiplication.length).toBeGreaterThanOrEqual(5);
		expect(generators.measurement.length).toBeGreaterThanOrEqual(4);
		expect(generators.applications.length).toBeGreaterThanOrEqual(5);
	});
});
