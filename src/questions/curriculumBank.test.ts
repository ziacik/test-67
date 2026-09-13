import { describe, expect, it } from "vitest";
import { generators } from "./generator";
import { topics } from "./topics";

const expectedTopics = [
	"mixed",
	"numbers",
	"decimals",
	"fractions",
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
		expect(generators.numbers.length).toBeGreaterThanOrEqual(9);
		expect(generators.decimals.length).toBeGreaterThanOrEqual(7);
		expect(generators.fractions.length).toBeGreaterThanOrEqual(3);
		expect(generators.geometry.length).toBeGreaterThanOrEqual(10);
		expect(generators.addition.length).toBeGreaterThanOrEqual(7);
		expect(generators.symmetry.length).toBeGreaterThanOrEqual(6);
		expect(generators.multiplication.length).toBeGreaterThanOrEqual(13);
		expect(generators.measurement.length).toBeGreaterThanOrEqual(14);
		expect(generators.applications.length).toBeGreaterThanOrEqual(12);
	});
});
