import { germanLessonIds, germanLessons, type GermanLessonId } from "./germanBank";
import type { GermanTopicId, Question } from "./types";

type GermanSpec = { prompt: string; answer: string; choices: string[]; explanation: string };

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Lexikálne otázky sa skúšajú v oboch smeroch, s relevantnými možnosťami zo spoločnej lekcie.
function createSpecs(lesson: GermanLessonId): GermanSpec[] {
  const { words, tasks } = germanLessons[lesson];
  const result: GermanSpec[] = [];
  for (const [slovak, german] of words) {
    for (const direction of ["sk-de", "de-sk"] as const) {
      const answer = direction === "sk-de" ? german : slovak;
      const pool = [...new Set(words.map(([sk, de]) => direction === "sk-de" ? de : sk))].filter(value => value !== answer);
      result.push({
        prompt: direction === "sk-de" ? "Prelož do nemčiny: „" + slovak + "“." : "Čo znamená po nemecky „" + german + "“?",
        answer,
        choices: [answer, ...shuffle(pool).slice(0, 3)],
        explanation: "„" + german + "“ znamená „" + slovak + "“.",
      });
    }
  }
  for (const [prompt, answer, wrong1, wrong2, wrong3, explanation] of tasks) {
    result.push({ prompt, answer, choices: [answer, wrong1, wrong2, wrong3], explanation });
  }
  return result;
}

export const germanQuestionBanks: Record<GermanLessonId, GermanSpec[]> = Object.fromEntries(
  germanLessonIds.map(lesson => [lesson, createSpecs(lesson)]),
) as Record<GermanLessonId, GermanSpec[]>;

// Shuffle-bag zamedzí opakovaniu až do vyčerpania zásoby danej lekcie.
// Podobne ako pri dejepise ponechá naposledy použité otázky na koniec zásoby.
const bags = new Map<GermanLessonId, GermanSpec[]>();
let previousRound = new Set<GermanSpec>();
let activeRound: Array<{ lesson: GermanLessonId; spec: GermanSpec }> = [];
let activeTopic: GermanTopicId | null = null;
let roundNumber = 0;

function draw(lesson: GermanLessonId, count: number): GermanSpec[] {
  const selected: GermanSpec[] = [];
  let bag = bags.get(lesson) ?? [];
  while (selected.length < count) {
    if (bag.length === 0) {
      const available = germanQuestionBanks[lesson].filter(spec => !selected.includes(spec));
      bag = [
        ...shuffle(available.filter(spec => !previousRound.has(spec))),
        ...shuffle(available.filter(spec => previousRound.has(spec))),
      ];
    }
    const spec = bag.shift();
    if (spec && !selected.includes(spec)) selected.push(spec);
  }
  bags.set(lesson, bag);
  return selected;
}

function createRound(topic: GermanTopicId): Array<{ lesson: GermanLessonId; spec: GermanSpec }> {
  // Mix pokrýva 10 z 12 lekcií v každom kole, vynechané lekcie sa pravidelne striedajú.
  const chosen: GermanLessonId[] = topic === "de-mixed"
    ? Array.from({ length: 10 }, (_, i) => germanLessonIds[(roundNumber * 10 + i) % germanLessonIds.length])
    : [topic];
  const items = chosen.flatMap(lesson => draw(lesson, topic === "de-mixed" ? 1 : 10).map(spec => ({ lesson, spec })));
  previousRound = new Set(items.map(item => item.spec));
  roundNumber++;
  return shuffle(items);
}

export function generateGermanRoundQuestion(topic: GermanTopicId, index: number): Question {
  if (index === 0 || activeTopic !== topic || activeRound.length === 0) {
    activeRound = createRound(topic);
    activeTopic = topic;
  }
  const { lesson, spec } = activeRound[index % activeRound.length];
  return {
    id: "de-" + roundNumber + "-" + index,
    topic: lesson,
    prompt: spec.prompt,
    answer: spec.answer,
    choices: shuffle(spec.choices),
    explanation: spec.explanation,
  };
}
