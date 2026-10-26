import { germanLessonIds, germanLessons, type GermanLessonId } from "./germanBank";
import { germanChallenges, type GermanChallenge } from "./germanChallenges";
import type { GermanTopicId, Question } from "./types";

type GermanSpec = GermanChallenge;
type RoundItem = { lesson: GermanLessonId; spec: GermanSpec };
type Skill = "dialog" | "syntax" | "forms" | "reading" | "numbers" | "writing";

function shuffle<T>(values: readonly T[]): T[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

// V dvoch gramatických úlohách musí žiak použiť dva samostatné poznatky.
// Jednoslovné preklady, vrátane otázok na čísla a pozdravy, už nie sú v hre.
function createSpecs(lesson: GermanLessonId): GermanSpec[] {
  const challenges = germanChallenges[lesson] ?? [];
  if (lesson === "de-01") return challenges;

  const tasks = germanLessons[lesson].tasks;
  const pairs: GermanSpec[] = [];
  for (let i = 0; i < tasks.length; i++) {
    for (let j = i + 1; j < tasks.length; j++) {
      const first = tasks[i];
      const second = tasks[j];
      const answer = first[1] + " / " + second[1];
      pairs.push({
        prompt: "Vyrieš obe časti. Vyber dvojicu správnych odpovedí.\n① " + first[0] + "\n② " + second[0],
        answer,
        choices: [
          answer,
          first[2] + " / " + second[1],
          first[1] + " / " + second[3],
          first[3] + " / " + second[2],
        ],
        explanation: "① " + first[5] + " ② " + second[5],
        skill: "paired-grammar",
        concept: lesson + ":pair:" + i + "-" + j,
      });
    }
  }
  return [...challenges, ...pairs];
}

export const germanQuestionBanks: Record<GermanLessonId, GermanSpec[]> = Object.fromEntries(
  germanLessonIds.map(lesson => [lesson, createSpecs(lesson)]),
) as Record<GermanLessonId, GermanSpec[]>;

const usedByLesson = new Map<GermanLessonId, Set<string>>();
const previousByTopic = new Map<GermanTopicId, Set<string>>();
let activeRound: RoundItem[] = [];
let activeTopic: GermanTopicId | null = null;
let roundNumber = 0;

// First-round questions are drawn from the unseen pool. After exhaustion,
// the pool restarts, keeping previously used concepts out of adjacent rounds.
function draw(lesson: GermanLessonId, allowedSkills: string[] | null, blocked: Set<string>): GermanSpec {
  const bank = germanQuestionBanks[lesson];
  const candidates = bank.filter(spec =>
    !blocked.has(spec.concept) && (!allowedSkills || allowedSkills.includes(spec.skill))
  );
  if (!candidates.length) throw new Error("Nedostatok rôznych otázok pre " + lesson);
  const used = usedByLesson.get(lesson) ?? new Set<string>();
  let fresh = candidates.filter(spec => !used.has(spec.concept));
  if (fresh.length === 0) {
    used.clear();
    fresh = candidates;
  }
  usedByLesson.set(lesson, used);
  const chosen = shuffle(fresh)[0];
  used.add(chosen.concept);
  blocked.add(chosen.concept);
  return chosen;
}

function createRound(topic: GermanTopicId): RoundItem[] {
  const blocked = new Set(previousByTopic.get(topic) ?? []);
  const result: RoundItem[] = [];
  if (topic === "de-mixed") {
    // Mix rotuje všetkých 12 lekcií, každá z 10 úloh je z inej lekcie.
    const lessons = Array.from({ length: 10 }, (_, i) => germanLessonIds[(roundNumber * 10 + i) % germanLessonIds.length]);
    for (const lesson of lessons) result.push({ lesson, spec: draw(lesson, null, blocked) });
  } else if (topic === "de-01") {
    // Prvá lekcia: najmä gramatika a porozumenie. Čísla iba v kontexte.
    const plan: Skill[] = shuffle(["dialog", "dialog", "syntax", "syntax", "forms", "forms", "reading", "reading", "writing", "numbers"]);
    for (const skill of plan) result.push({ lesson: topic, spec: draw(topic, [skill], blocked) });
  } else {
    // Striedať viac typov úloh; rovnakú otázku neopakovať.
    const availableSkills = [...new Set(germanQuestionBanks[topic].map(spec => spec.skill))];
    for (let i = 0; i < 10; i++) {
      const preferred = availableSkills[i % availableSkills.length];
      const hasAvailable = germanQuestionBanks[topic].some(spec => spec.skill === preferred && !blocked.has(spec.concept));
      const spec = draw(topic, hasAvailable ? [preferred] : null, blocked);
      result.push({ lesson: topic, spec });
    }
  }
  previousByTopic.set(topic, new Set(result.map(item => item.spec.concept)));
  roundNumber++;
  return shuffle(result);
}

export function generateGermanRoundQuestion(topic: GermanTopicId, index: number): Question {
  if (index === 0 || activeRound.length === 0 || activeTopic !== topic) {
    activeRound = createRound(topic);
    activeTopic = topic;
  }
  const { lesson, spec } = activeRound[index % activeRound.length];
  return {
    id: "de-" + roundNumber + "-" + index,
    topic: lesson,
    prompt: spec.prompt,
    answer: spec.answer,
    choices: spec.choices ? shuffle(spec.choices) : undefined,
    explanation: spec.explanation,
  };
}
