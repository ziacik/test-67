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
		description: "Rozklad, číselná os, porovnávanie, zaokrúhľovanie a rímske čísla.",
		icon: "🔢",
	},
	{
		id: "decimals",
		name: "Desatinné čísla",
		description: "Peniaze, porovnávanie, zaokrúhľovanie, sčítanie a násobenie 10, 100, 1000.",
		icon: "🔟",
	},
	{
		id: "fractions",
		name: "Zlomky",
		description: "Časť celku, polovice, tretiny, štvrtiny a jednoduché porovnávanie.",
		icon: "🍕",
	},
	{
		id: "geometry",
		name: "Geometria",
		description: "Útvary, kružnica, kolmice, rovnobežky, telesá a stavby z kociek.",
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
		description: "Viacciferné násobenie, delenie, zvyšok, zátvorky a násobky 10, 100, 1000.",
		icon: "✖️",
	},
	{
		id: "measurement",
		name: "Jednotky, obvod & obsah",
		description: "Premeny mm–km, obvody trojuholníka/štvorca/obdĺžnika a obsah v sieti.",
		icon: "📏",
	},
	{
		id: "applications",
		name: "Dáta & logika",
		description: "Slovné úlohy, peniaze, skutočné grafy, pravdepodobnosť a kombinatorika.",
		icon: "🧠",
	},
];
