export type RoundGroup<T> = {
	values: readonly T[];
	count: number;
};

export class RoundBank<T> extends Array<T> {
	private cursor = 0;
	private readonly groups: readonly RoundGroup<T>[];

	constructor(full: readonly T[], groups: readonly RoundGroup<T>[]) {
		super(...full);
		this.groups = groups;
	}

	override map<U>(
		callback: (value: T, index: number, array: T[]) => U,
		thisArg?: unknown,
	): U[] {
		const cursor = this.cursor++;
		const round = this.groups.flatMap(({ values, count }, groupIndex) => {
			const start = (cursor * count + groupIndex) % values.length;
			return Array.from(
				{ length: count },
				(_, index) => values[(start + index) % values.length],
			);
		});
		return Array.prototype.map.call(round, callback, thisArg) as U[];
	}
}
