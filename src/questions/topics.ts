import type { Topic } from "./types";

export const topics: Topic[] = [
	{
		id: "mixed",
		name: "Mix",
		description: "Krátke kolo zo všetkého. Najlepšie na bežný tréning.",
		icon: "⚡",
	},
	{
		id: "numbers",
		name: "Veľké čísla",
		description: "Porovnávanie, párne/nepárne a zaokrúhľovanie.",
		icon: "🔢",
	},
	{
		id: "arithmetic",
		name: "Počítanie",
		description: "Sčítanie, odčítanie, násobenie, delenie a poradie operácií.",
		icon: "✖️",
	},
	{
		id: "geometry",
		name: "Geometria",
		description: "Obvod, obsah v štvorcovej sieti a jednotky dĺžky.",
		icon: "📐",
	},
];
