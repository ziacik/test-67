import type { Question } from "./types";
import { physicsTopics, physicsChoice, type PhysicsGroupId, type PhysicsSpec } from "./physicsBank";
import { physicsQuestionsA } from "./physicsQuestionsA";
import { physicsQuestionsB } from "./physicsQuestionsB";
import { physicsQuestionsC } from "./physicsQuestionsC";

export const physicsGroupIds = physicsTopics.map((topic) => topic.id);
const extras: Partial<Record<PhysicsGroupId, PhysicsSpec[]>> = {};

function fmt(n: number): string {
  return Number(n.toFixed(3)).toLocaleString("sk-SK", { useGrouping: false, maximumFractionDigits: 3 });
}

function add(group: PhysicsGroupId, spec: PhysicsSpec): void {
  (extras[group] ??= []).push(spec);
}

function addNum(
  group: PhysicsGroupId, prompt: string, value: number, unit: string,
  candidates: number[], explanation: string,
): void {
  const answer = fmt(value) + " " + unit;
  const wrong: string[] = [];
  for (const candidate of [...candidates, value * 10, value / 10, value + 1, value + 2]) {
    const text = fmt(candidate) + " " + unit;
    if (text !== answer && !wrong.includes(text)) wrong.push(text);
    if (wrong.length === 3) break;
  }
  add(group, physicsChoice(prompt, answer, wrong, explanation));
}

// Stupnice odmerných valcov a vytlačený objem.
for (const start of [10, 20, 35, 50, 75, 100]) {
  for (const step of [2, 5, 10, 20]) {
    const end = start + step * 5, value = start + step * 3;
    addNum("fy-liquid-measure",
      "Medzi ryskami " + start + " a " + end + " ml je päť rovnakých dielikov. Hladina je na treťom dieliku nad " + start + " ml. Aký je objem?",
      value, "ml", [start + step * 2, start + step * 4, end],
      "Jeden dielik je " + step + " ml; " + start + " + 3 × " + step + " = " + value + " ml.");
  }
}
for (const start of [25, 40, 60, 75, 100, 125, 150, 180, 210, 250]) {
  const displacement = Math.round(start / 5) + 7;
  addNum("fy-liquid-measure",
    "Pred vložením telesa bolo vo valci " + start + " ml, po vložení " + (start + displacement) + " ml. Koľko ml vody teleso vytlačilo?",
    displacement, "ml", [start, start + displacement, displacement + 10],
    "Rozdiel: " + (start + displacement) + " − " + start + " = " + displacement + " ml.");
}

// Prevody objemu, aj kombinované.
for (const ml of [120, 175, 240, 350, 450, 600, 720, 850, 950, 1250, 1450, 1750, 2350, 2750, 3400]) {
  addNum("fy-volume-units", "Premeň " + ml + " ml na litre.", ml / 1000, "l",
    [ml / 100, ml / 10000, ml / 10], ml + " : 1000 = " + fmt(ml / 1000) + " l.");
}
for (const liters of [0.15, 0.35, 0.45, 0.65, 0.8, 1.2, 1.75, 2.35, 3.6, 4.25, 5.5, 6.75]) {
  addNum("fy-volume-units", "Premeň " + fmt(liters) + " l na mililitre.", liters * 1000, "ml",
    [liters * 100, liters * 10000, liters * 10], "V litri je tisíc mililitrov.");
}
for (const [a, b] of [[250, 750], [400, 600], [125, 375], [850, 300], [900, 650], [120, 980], [350, 450], [225, 625], [300, 1250], [750, 1750]] as const) {
  addNum("fy-volume-units", "Zmiešaš " + a + " ml a " + b + " ml vody. Koľko litrov je spolu?",
    (a + b) / 1000, "l", [a / 1000, b / 1000, (a + b) / 100],
    "(" + a + " + " + b + ") : 1000 = " + fmt((a + b) / 1000) + " l.");
}

// Váženie nádob, sčítanie hmotností.
for (const vessel of [35, 50, 65, 80, 90, 110, 125, 140, 175, 220, 250, 315]) {
  const contents = vessel * 2 + 15;
  addNum("fy-mass-measure", "Prázdna nádoba váži " + vessel + " g, plná " + (vessel + contents) + " g. Koľko váži jej obsah?",
    contents, "g", [vessel, vessel + contents, contents - vessel], "Odváženú nádobu treba odpočítať: " + contents + " g.");
}
for (const [a, b] of [[120, 230], [250, 175], [450, 65], [75, 125], [180, 340], [110, 285]] as const) {
  addNum("fy-mass-measure", "Na váhu položíš predmety s hmotnosťami " + a + " g a " + b + " g. Koľko ukáže?",
    a + b, "g", [a, b, a + b + 100], "Hmotnosti sa sčítajú: " + (a + b) + " g.");
}

// Jednotky hmotnosti.
for (const grams of [75, 125, 250, 375, 425, 650, 825, 950, 1250, 1750, 2300, 2650, 3750, 4250, 5900]) {
  addNum("fy-mass-units", "Premeň " + grams + " g na kilogramy.", grams / 1000, "kg",
    [grams / 100, grams / 10000, grams / 10], "Gramy na kilogramy delíme 1000.");
}
for (const kg of [0.08, 0.125, 0.25, 0.45, 0.8, 1.2, 1.35, 1.75, 2.25, 3.5, 4.75, 5.25]) {
  addNum("fy-mass-units", "Premeň " + fmt(kg) + " kg na gramy.", kg * 1000, "g",
    [kg * 100, kg * 10, kg * 10000], "Kilogramy na gramy násobíme 1000.");
}
for (const tonnes of [0.2, 0.35, 0.45, 0.75, 1.25, 2.3, 3.45, 4.5]) {
  addNum("fy-mass-units", "Koľko kg je " + fmt(tonnes) + " t?", tonnes * 1000, "kg",
    [tonnes * 100, tonnes * 10, tonnes * 10000], "Jedna tona je 1000 kg.");
}

// Meranie dĺžky a chôdza krokmi.
for (const [steps, stepCm] of [[35, 60], [48, 75], [60, 65], [72, 80], [84, 75], [90, 70], [100, 65], [110, 80], [125, 72], [150, 60]] as const) {
  const m = steps * stepCm / 100;
  addNum("fy-length", "Prejdeš " + steps + " krokov s priemernou dĺžkou " + stepCm + " cm. Aká je približná dĺžka trasy?",
    m, "m", [m * 10, m / 10, steps + stepCm], steps + " × " + stepCm + " : 100 = " + fmt(m) + " m.");
}
for (const [first, last] of [[2, 13], [3, 19], [6, 27], [11, 36], [4, 32], [12, 45]] as const) {
  addNum("fy-length", "Predmet siaha od rysky " + first + " cm po rysku " + last + " cm. Aká je jeho dĺžka?",
    last - first, "cm", [last, last + first, last - first + 1],
    "Odpočítame začiatok: " + last + " − " + first + " = " + (last - first) + " cm.");
}

// Jednotky dĺžky.
for (const cm of [15, 24, 38, 45, 65, 75, 120, 135, 175, 240, 325, 475]) {
  addNum("fy-length-units", "Premeň " + cm + " cm na metre.", cm / 100, "m",
    [cm / 10, cm / 1000, cm * 10], "Centimetre na metre delíme 100.");
}
for (const km of [0.25, 0.4, 0.75, 1.25, 2.35, 3.5, 4.75, 5.6, 6.25, 7.8, 8.45]) {
  addNum("fy-length-units", "Koľko metrov je " + fmt(km) + " km?", km * 1000, "m",
    [km * 100, km * 10, km * 10000], "Kilometre na metre násobíme 1000.");
}
for (const mm of [25, 38, 44, 65, 72, 95, 125, 155, 245, 385]) {
  addNum("fy-length-units", "Premeň " + mm + " mm na centimetre.", mm / 10, "cm",
    [mm, mm / 100, mm * 10], "Milimetre na centimetre delíme desiatimi.");
}

// Objem kocky, kvádra a nepravidelného telesa.
for (const [a, b, c] of [[2, 4, 6], [3, 5, 8], [4, 6, 9], [5, 7, 8], [2, 9, 12], [6, 8, 10], [3, 7, 11], [4, 9, 13], [5, 6, 12], [7, 8, 9], [8, 9, 10], [6, 7, 12], [4, 5, 15], [10, 12, 15]] as const) {
  const volume = a * b * c;
  addNum("fy-solid-volume", "Kváder má rozmery " + a + " cm × " + b + " cm × " + c + " cm. Aký má objem?",
    volume, "cm³", [a * b + c, 2 * (a * b + a * c + b * c), volume / 2],
    a + " × " + b + " × " + c + " = " + volume + " cm³.");
}
for (const edge of [3, 4, 6, 7, 8, 9, 10, 12, 15, 20]) {
  addNum("fy-solid-volume", "Kocka má hranu " + edge + " cm. Aký má objem?",
    edge ** 3, "cm³", [edge ** 2, edge * 6, edge ** 3 * 2],
    "V = a³ = " + edge ** 3 + " cm³.");
}
for (const before of [35, 45, 60, 80, 95, 115, 135, 150, 180, 225]) {
  const increase = before / 5 + 17;
  addNum("fy-solid-volume",
    "Pred vložením kameňa je vo valci " + before + " ml, potom " + (before + increase) + " ml. Aký objem má kameň?",
    increase, "cm³", [before, before + increase, increase * 2],
    "Objem je rozdiel hladín " + increase + " ml = " + increase + " cm³.");
}

// Plávanie: spoločná práca s hmotnosťou a objemom.
for (const [mass, volume] of [[120, 150], [240, 300], [350, 500], [375, 250], [600, 400], [420, 700], [900, 600], [880, 1100], [1050, 1500], [540, 300]] as const) {
  const density = mass / volume;
  const answer = density < 1 ? "Stúpa k hladine" : "Klesá ku dnu";
  add("fy-floating", physicsChoice(
    "Teleso má hmotnosť " + mass + " g a objem " + volume +
      " cm³. Po úplnom ponorení do vody s hustotou 1 g/cm³ ho uvoľníme. Čo sa stane?",
    answer, [density < 1 ? "Klesá ku dnu" : "Stúpa k hladine",
      "Vznáša sa bez ohľadu na hustotu", "Vztlak naň vôbec nepôsobí"],
    "ρ = " + mass + " : " + volume + " = " + fmt(density) + " g/cm³.",
  ));
}

// Hustota pevných látok, m = ρV a V = m/ρ.
for (const [density, volume] of [[2, 40], [2.5, 60], [2.7, 100], [4, 35], [5, 80], [6, 45], [7, 150], [7.8, 50], [8, 90], [8.9, 100], [10, 35], [11.3, 40], [3, 125], [1.5, 120]] as const) {
  const mass = density * volume;
  addNum("fy-solid-density", "Kov má objem " + volume + " cm³ a hmotnosť " + fmt(mass) + " g. Aká je jeho hustota?",
    density, "g/cm³", [density / 10, density * 2, volume / mass], "ρ = m/V = " + fmt(density) + " g/cm³.");
  addNum("fy-solid-density", "Hustota látky je " + fmt(density) + " g/cm³. Aká je hmotnosť " + volume + " cm³ tejto látky?",
    mass, "g", [mass / 10, mass + volume, mass / 2], "m = ρV = " + fmt(mass) + " g.");
  addNum("fy-solid-density", "Teleso má hustotu " + fmt(density) + " g/cm³ a hmotnosť " + fmt(mass) + " g. Aký je jeho objem?",
    volume, "cm³", [mass, density, volume * 10], "V = m/ρ = " + volume + " cm³.");
}

// Hustota kvapalín.
for (const [density, volume] of [[0.75, 80], [0.8, 120], [0.85, 200], [0.9, 250], [0.95, 300], [1, 450], [1.05, 200], [1.1, 150], [1.2, 100], [1.25, 240], [1.3, 300], [1.4, 150], [0.92, 500], [0.88, 250]] as const) {
  const mass = density * volume;
  addNum("fy-liquid-density", "Kvapalina s objemom " + volume + " ml má hmotnosť " + fmt(mass) + " g. Aká je jej hustota?",
    density, "g/cm³", [volume / mass, density * 10, mass / 10], "ρ = m/V = " + fmt(density) + " g/cm³.");
  addNum("fy-liquid-density", "Akú hmotnosť má " + volume + " ml kvapaliny s hustotou " + fmt(density) + " g/cm³?",
    mass, "g", [volume / density, mass / 10, mass + volume], "m = ρV = " + fmt(mass) + " g.");
}

// Teplota: úlohy s rovnakou hmotnosťou a rastúcim objemom.
for (const before of [100, 120, 150, 200, 225, 250, 300, 400, 500, 600, 750, 800]) {
  const after = before * 1.1;
  add("fy-temp-density", physicsChoice(
    "Po zahriatí má kvapalina namiesto " + before + " ml objem " + fmt(after) +
    " ml. Hmotnosť sa nezmenila. Aká je zmena hustoty?",
    "Hustota sa znížila", ["Hustota sa zvýšila", "Hustota sa nezmenila", "Hustota je nulová"],
    "Pri väčšom objeme a rovnakej hmotnosti klesne hustota, pretože ρ = m/V.",
  ));
}

// Hustota plynov a hmotnosť plynu.
for (const [density, volume] of [[0.2, 2], [0.5, 4], [0.8, 3], [1, 5], [1.2, 2], [1.3, 4], [1.5, 6], [1.8, 5], [2, 3], [2.4, 4], [2.5, 8], [3, 6]] as const) {
  const mass = density * volume;
  addNum("fy-gas-density", "V objeme " + volume + " m³ plynu je " + fmt(mass) + " kg. Aká je jeho hustota?",
    density, "kg/m³", [density / 10, density * volume, volume / mass],
    "ρ = m/V = " + fmt(density) + " kg/m³.");
  addNum("fy-gas-density", "Plyn má hustotu " + fmt(density) + " kg/m³. Akú hmotnosť má " + volume + " m³?",
    mass, "kg", [mass / 10, volume / density, mass + volume],
    "m = ρV = " + fmt(mass) + " kg.");
}

export const physicsGroups = Object.fromEntries(physicsGroupIds.map((id) => [
  id,
  [...(physicsQuestionsA[id] ?? []), ...(physicsQuestionsB[id] ?? []),
   ...(physicsQuestionsC[id] ?? []), ...(extras[id] ?? [])],
])) as Record<PhysicsGroupId, PhysicsSpec[]>;

for (const group of physicsGroupIds) {
  const bank = physicsGroups[group];
  if (bank.length < 20 || new Set(bank.map((spec) => spec.prompt)).size !== bank.length) {
    throw new Error("Duplicitná alebo krátka banka fyziky: " + group);
  }
}

function shuffle<T>(values: readonly T[]): T[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const bags = new Map<PhysicsGroupId, PhysicsSpec[]>();
const previousRounds = new Map<PhysicsGroupId, Set<PhysicsSpec>>();
let activeTopic: PhysicsGroupId | "fy-mixed" | null = null;
let activeRound: Array<{ group: PhysicsGroupId; spec: PhysicsSpec }> = [];
let roundIndex = 0;
let mixedCursor = 0;
const mixedOrder = shuffle(physicsGroupIds);

function draw(group: PhysicsGroupId, usedInRound: ReadonlySet<PhysicsSpec>): PhysicsSpec {
  let bag = bags.get(group) ?? [];
  if (bag.length === 0) {
    // Pri vyčerpaní zásobníka nesmieme zopakovať nič z aktuálneho ani predošlého kola.
    const eligible = physicsGroups[group].filter((q) => !usedInRound.has(q));
    const previous = previousRounds.get(group) ?? new Set<PhysicsSpec>();
    bag = [...shuffle(eligible.filter((q) => !previous.has(q))),
           ...shuffle(eligible.filter((q) => previous.has(q)))];
  }
  const chosen = bag.shift();
  if (!chosen || usedInRound.has(chosen)) {
    throw new Error("Fyzika: nepodarilo sa vybrať jedinečnú otázku pre " + group);
  }
  bags.set(group, bag);
  return chosen;
}

function buildRound(topic: PhysicsGroupId | "fy-mixed"): Array<{ group: PhysicsGroupId; spec: PhysicsSpec }> {
  const groups: PhysicsGroupId[] = [];
  if (topic === "fy-mixed") {
    // Dve po sebe idúce zmiešané kolá zahŕňajú všetkých 19 tém.
    for (let i = 0; i < 10; i++) groups.push(mixedOrder[(mixedCursor + i) % mixedOrder.length]);
    mixedCursor = (mixedCursor + 10) % mixedOrder.length;
  } else {
    for (let i = 0; i < 10; i++) groups.push(topic);
  }
  const used = new Map<PhysicsGroupId, Set<PhysicsSpec>>();
  const round = groups.map((group) => {
    const selected = used.get(group) ?? new Set<PhysicsSpec>();
    const spec = draw(group, selected);
    selected.add(spec);
    used.set(group, selected);
    return { group, spec };
  });
  for (const [group, selected] of used) previousRounds.set(group, selected);
  roundIndex++;
  return shuffle(round);
}

export function generatePhysicsRoundQuestion(topic: PhysicsGroupId | "fy-mixed", index: number): Question {
  if (index === 0 || activeRound.length === 0 || activeTopic !== topic) {
    activeRound = buildRound(topic);
    activeTopic = topic;
  }
  const { group, spec } = activeRound[index % activeRound.length];
  return {
    id: "fy-" + roundIndex + "-" + index,
    topic: group,
    prompt: spec.prompt,
    answer: spec.answer,
    choices: shuffle(spec.choices),
    explanation: spec.explanation,
  };
}
