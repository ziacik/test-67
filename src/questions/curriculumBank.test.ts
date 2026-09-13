import { describe, expect, it } from "vitest";
import { curriculumCoverage, generators } from "./generator";
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
		expect(
			topics
				.filter((topic) => topic.subject === "math")
				.map((topic) => topic.id),
		).toEqual(expectedTopics);
	});

	it("has a non-trivial task bank for every curriculum area", () => {
		expect(generators.numbers.length).toBeGreaterThanOrEqual(12);
		expect(generators.decimals.length).toBeGreaterThanOrEqual(7);
		expect(generators.fractions.length).toBeGreaterThanOrEqual(3);
		expect(generators.geometry.length).toBeGreaterThanOrEqual(12);
		expect(generators.addition.length).toBeGreaterThanOrEqual(8);
		expect(generators.symmetry.length).toBeGreaterThanOrEqual(9);
		expect(generators.multiplication.length).toBeGreaterThanOrEqual(16);
		expect(generators.measurement.length).toBeGreaterThanOrEqual(15);
		expect(generators.applications.length).toBeGreaterThanOrEqual(17);
	});
	it("tracks every non-drawing fifth-grade performance type explicitly", () => {
		expect(curriculumCoverage).toEqual([
			"number-reading-writing",
			"place-value-decompose-compose",
			"even-odd",
			"compare-order-natural-numbers",
			"round-nearest-up-down",
			"number-line-place-and-read",
			"roman-numerals-and-years",
			"decimals-compare-order-round-arithmetic-powers-of-ten",
			"fractions-as-part-of-whole",
			"add-subtract-multiple-addends-difference",
			"multiply-divide-written-and-remainder",
			"two-and-three-digit-multiplication",
			"two-digit-division",
			"powers-of-ten-and-zero-ending-operations",
			"increase-decrease-by-and-times",
			"compare-by-difference-and-quotient",
			"operation-properties-and-distributivity",
			"operation-order-and-parentheses",
			"negative-number-introduction",
			"ratio-direct-and-inverse-proportion",
			"length-units-conversion-and-applied-stories",
			"measure-to-millimeter-and-estimate-distance",
			"perimeter-triangle-square-rectangle",
			"area-grid-and-square-units",
			"scale-figures-in-grid",
			"solid-properties",
			"cube-build-count-and-code",
			"axis-and-central-symmetry-points-pairs-shapes",
			"read-sort-and-classify-data",
			"tables-diagrams-maps-and-schemes",
			"choose-correct-chart-from-data",
			"probability-more-less-likely",
			"systematic-enumeration-of-possibilities",
			"strategy-and-real-world-word-problems",
		]);
	});
});
