// Fyzika 6. ročník: učivo podľa V. Lapitkovej a kol. (Expol Pedagogika).
// Detailné témy: https://www.smartbooks.sk/fyzika-temy-6-rocnik-zs/
// Nejde o doslovné prepisy otázok z učebnice; úlohy sú pôvodné.
export const physicsTopics = [
  { id: "fy-matter", name: "Telesá a látky", description: "Rozlíšenie telesa, látky, materiálu a fyzikálnej vlastnosti.", icon: "🧱" },
  { id: "fy-liquids", name: "Vlastnosti kvapalín", description: "Tekutosť, deliteľnosť, nestlačiteľnosť a voľná hladina.", icon: "💧" },
  { id: "fy-liquid-use", name: "Využitie vlastností kvapalín", description: "Spojené nádoby, tlak v kvapaline a bežné využitia.", icon: "🚰" },
  { id: "fy-liquid-measure", name: "Meranie objemu kvapalín", description: "Odmerný valec, stupnica, meniskus a postup merania.", icon: "🧪" },
  { id: "fy-volume-units", name: "Jednotky objemu", description: "ml, l, cm³, dm³, m³ a prevody jednotiek.", icon: "🥛" },
  { id: "fy-gases", name: "Vlastnosti plynov", description: "Rozpínavosť, stlačiteľnosť, tekutosť a deliteľnosť.", icon: "🎈" },
  { id: "fy-fluids", name: "Kvapaliny a plyny", description: "Spoločné a rozdielne vlastnosti tekutín.", icon: "🌬️" },
  { id: "fy-solids", name: "Vlastnosti tuhých látok", description: "Tvrdosť, pružnosť, krehkosť, deliteľnosť.", icon: "🪨" },
  { id: "fy-mass-measure", name: "Meranie hmotnosti", description: "Váhy, postup merania a rozdiel medzi hmotnosťou a objemom.", icon: "⚖️" },
  { id: "fy-mass-units", name: "Jednotky hmotnosti", description: "mg, g, kg, t a prevody v praktických úlohách.", icon: "🏋️" },
  { id: "fy-length", name: "Dĺžka a odhad dĺžky", description: "Meranie, presnosť, odhady a postup merania.", icon: "📏" },
  { id: "fy-length-units", name: "Jednotky dĺžky", description: "mm, cm, dm, m, km a prevody.", icon: "📐" },
  { id: "fy-solid-volume", name: "Objem pevných telies", description: "Kocka, kváder a vytláčanie vody nepravidelným telesom.", icon: "🧊" },
  { id: "fy-states", name: "Porovnanie vlastností látok", description: "Kvapaliny, plyny a tuhé látky v pokusoch.", icon: "🔬" },
  { id: "fy-floating", name: "Plávanie a potápanie", description: "Vplyv hmotnosti, objemu a vztlaku na správanie telies.", icon: "⛵" },
  { id: "fy-solid-density", name: "Hustota pevných látok", description: "Hustota, meranie, výpočty a porovnávanie telies.", icon: "🧮" },
  { id: "fy-liquid-density", name: "Hustota kvapalín", description: "Vrstvenie, plávanie, meranie a výpočty hustoty.", icon: "🫗" },
  { id: "fy-temp-density", name: "Teplota a hustota", description: "Vplyv ohrievania a ochladzovania na hustotu.", icon: "🌡️" },
  { id: "fy-gas-density", name: "Hustota plynov", description: "Vzduch, hélium, balón a pôsobenie vztlaku.", icon: "🎈" },
] as const;

export type PhysicsGroupId = (typeof physicsTopics)[number]["id"];
export type PhysicsSpec = {
  prompt: string;
  answer: string;
  choices: string[];
  explanation: string;
};

export function physicsChoice(prompt: string, answer: string, wrong: readonly string[], explanation: string): PhysicsSpec {
  if (new Set([answer, ...wrong]).size !== 4 || wrong.length !== 3) {
    throw new Error("Neplatné možnosti fyzikálnej otázky: " + prompt);
  }
  return { prompt, answer, choices: [answer, ...wrong], explanation };
}

export function parsePhysicsBank(rows: string): PhysicsSpec[] {
  return rows.trim().split("\n").filter(Boolean).map((line) => {
    const fields = line.split("|").map((part) => part.trim());
    if (fields.length !== 6) throw new Error("Neplatná fyzikálna otázka: " + line);
    const [prompt, answer, wrong1, wrong2, wrong3, explanation] = fields;
    if (!prompt || !answer || !explanation) throw new Error("Neúplná fyzikálna otázka: " + line);
    return physicsChoice(prompt, answer, [wrong1, wrong2, wrong3], explanation);
  });
}
