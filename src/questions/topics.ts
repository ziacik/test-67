import type { Topic } from "./types";

export const topics: Topic[] = [
	{
		id: "mixed",
		name: "Mix",
		description: "Kolo naprieč celým piatackym učivom.",
		icon: "⚡",
	},
	{
		id: "numbers",
		name: "Prirodzené čísla",
		description: "Rozklad, číselná os, porovnávanie, zaokrúhľovanie, rímske čísla.",
		icon: "🔢",
	},
	{
		id: "geometry",
		name: "Geometria",
		description: "Útvary, kružnica, kolmice, rovnobežky a telesá.",
		icon: "📐",
	},
	{
		id: "addition",
		name: "Sčítanie & odčítanie",
		description: "Spamäti, písomne, rozdielom, odhad a chýbajúce čísla.",
		icon: "➕",
	},
	{
		id: "symmetry",
		name: "Súmernosť",
		description: "Osová a stredová súmernosť, zrkadlenie a osi súmernosti.",
		icon: "◫",
	},
	{
		id: "multiplication",
		name: "Násobenie & delenie",
		description: "Násobenie, delenie, zvyšok, zátvorky a chýbajúci činiteľ.",
		icon: "✖️",
	},
	{
		id: "measurement",
		name: "Meranie, obvod & obsah",
		description: "Jednotky dĺžky, obvod a obsah v štvorcovej sieti.",
		icon: "📏",
	},
	{
		id: "applications",
		name: "Dáta & logika",
		description: "Slovné úlohy, peniaze, diagramy, pravdepodobnosť a možnosti.",
		icon: "🧠",
	},
];
