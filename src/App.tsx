import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnswerArea } from "./components/AnswerArea";
import {
	isBossQuestion,
	levelForXp,
	multiplierForStreak,
	pointsForAnswer,
	reactionForAnswer,
} from "./game";
import { generateRoundQuestion, isCorrect } from "./questions/generator";
import { topics } from "./questions/topics";
import type { Question, TopicId } from "./questions/types";
import "./styles.css";

const ROUND_SIZE = 10;
const XP_PER_LEVEL = 2000;

type Stats = {
	bestStreak: number;
	totalCorrect: number;
	totalAnswered: number;
	totalXp: number;
	highScore: number;
};

const emptyStats: Stats = {
	bestStreak: 0,
	totalCorrect: 0,
	totalAnswered: 0,
	totalXp: 0,
	highScore: 0,
};

function readStats(): Stats {
	try {
		return { ...emptyStats, ...JSON.parse(localStorage.getItem("test-67-stats") ?? "{}") };
	} catch {
		return emptyStats;
	}
}

function App() {
	const [topic, setTopic] = useState<TopicId | null>(null);
	const [question, setQuestion] = useState<Question | null>(null);
	const [answer, setAnswer] = useState("");
	const [index, setIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [roundPoints, setRoundPoints] = useState(0);
	const [streak, setStreak] = useState(0);
	const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
	const [showHint, setShowHint] = useState(false);
	const [hintUsed, setHintUsed] = useState(false);
	const [lastReward, setLastReward] = useState(0);
	const [reaction, setReaction] = useState("");
	const [finished, setFinished] = useState(false);
	const [startingHighScore, setStartingHighScore] = useState(0);
	const [stats, setStats] = useState<Stats>(readStats);
	const inputRef = useRef<HTMLInputElement>(null);

	const activeTopic = useMemo(() => topics.find((item) => item.id === topic), [topic]);
	const boss = isBossQuestion(index, ROUND_SIZE);
	const level = levelForXp(stats.totalXp);
	const xpInLevel = stats.totalXp % XP_PER_LEVEL;
	const xpProgress = (xpInLevel / XP_PER_LEVEL) * 100;
	const multiplier = multiplierForStreak(streak);

	useEffect(() => {
		localStorage.setItem("test-67-stats", JSON.stringify(stats));
	}, [stats]);

	const start = (nextTopic: TopicId) => {
		setStartingHighScore(stats.highScore);
		setTopic(nextTopic);
		setQuestion(generateRoundQuestion(nextTopic, 0));
		setAnswer("");
		setIndex(0);
		setScore(0);
		setRoundPoints(0);
		setStreak(0);
		setFeedback(null);
		setShowHint(false);
		setHintUsed(false);
		setLastReward(0);
		setReaction("");
		setFinished(false);
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	const next = () => {
		if (!topic) return;

		if (index + 1 >= ROUND_SIZE) {
			setStats((value) => ({ ...value, highScore: Math.max(value.highScore, roundPoints) }));
			setFinished(true);
			return;
		}

		const nextIndex = index + 1;
		setIndex(nextIndex);
		setQuestion(generateRoundQuestion(topic, nextIndex));
		setAnswer("");
		setFeedback(null);
		setShowHint(false);
		setHintUsed(false);
		setLastReward(0);
		setReaction("");
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	const checkAnswer = (candidate: string) => {
		if (!question || feedback || !candidate.trim()) return;

		setAnswer(candidate);
		const correct = isCorrect(question, candidate);
		const nextStreak = correct ? streak + 1 : 0;
		const reward = pointsForAnswer({
			correct,
			streakAfter: nextStreak,
			hintUsed,
			boss,
			correctAnswer: question.answer,
		});

		setFeedback(correct ? "correct" : "wrong");
		setStreak(nextStreak);
		setLastReward(reward);
		setReaction(
			reactionForAnswer({
				correct,
				streakAfter: nextStreak,
				correctAnswer: question.answer,
			}),
		);

		if (correct) {
			setScore((value) => value + 1);
			setRoundPoints((value) => value + reward);
		}

		setStats((value) => ({
			...value,
			bestStreak: Math.max(value.bestStreak, nextStreak),
			totalCorrect: value.totalCorrect + (correct ? 1 : 0),
			totalAnswered: value.totalAnswered + 1,
			totalXp: value.totalXp + reward,
		}));
	};

	const submit = (event?: FormEvent) => {
		event?.preventDefault();
		checkAnswer(answer);
	};

	const useHint = () => {
		setShowHint(true);
		setHintUsed(true);
	};

	if (!topic) {
		const success = stats.totalAnswered ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0;

		return (
			<main className="shell home-shell">
				<header className="hero">
					<div className="brand-row">
						<div className="brand">TEST <b>67</b></div>
						<div className="level-chip">LVL {level}</div>
					</div>
					<h1>Matika.<br /><em>Ale nech to žije.</em></h1>
					<p>Vyber si mód, zbieraj XP, drž combo a na konci zlož bossa. Áno, stále je to učenie. Len menej podozrivé.</p>
				</header>

				<section className="player-card">
					<div className="player-topline">
						<div>
							<span>LEVEL {level}</span>
							<strong>{stats.totalXp.toLocaleString("sk-SK")} XP</strong>
						</div>
						<small>{XP_PER_LEVEL - xpInLevel} XP do ďalšieho levelu</small>
					</div>
					<div className="xp-bar"><span style={{ width: String(xpProgress) + "%" }} /></div>
				</section>

				<section className="stats arcade-stats" aria-label="Štatistiky">
					<div><span>HIGH SCORE</span><strong>{stats.highScore}</strong></div>
					<div><span>BEST COMBO</span><strong>×{stats.bestStreak}</strong></div>
					<div><span>ACCURACY</span><strong>{success}%</strong></div>
				</section>

				<section className="topic-grid">
					{topics.map((item, topicIndex) => (
						<button className="topic-card" key={item.id} onClick={() => start(item.id)}>
							<span className="topic-index">0{topicIndex + 1}</span>
							<span className="topic-icon">{item.icon}</span>
							<span className="topic-copy">
								<strong>{item.name}</strong>
								<small>{item.description}</small>
							</span>
							<span className="play-label">PLAY →</span>
						</button>
					))}
				</section>

				<div className="home-note">BOSS na 10. otázke · ×2 XP · odpoveď 67 má vlastný bonus</div>
			</main>
		);
	}

	if (finished) {
		const great = score >= 8;
		const newRecord = roundPoints > startingHighScore;

		return (
			<main className="shell result-shell">
				<div className="result-kicker">{newRecord ? "NOVÝ HIGH SCORE" : "KOLO HOTOVÉ"}</div>
				<div className="result-score">{roundPoints}</div>
				<div className="result-xp">XP</div>
				<h1>{score} / {ROUND_SIZE}</h1>
				<p>
					{great
						? "Boss padol. Toto už vyzerá, že vieš čo robíš."
						: score >= 5
							? "Celkom slušné. Ešte jedno kolo a možno z toho bude skill."
							: "Dobre. Máme aspoň presný zoznam vecí, ktoré treba rozbiť."}
				</p>
				<div className="result-meta">
					<span>LVL {level}</span>
					<span>BEST ×{stats.bestStreak}</span>
					{newRecord && <span className="record-tag">RECORD</span>}
				</div>
				<div className="result-actions">
					<button className="primary big-button" onClick={() => start(topic)}>REMATCH</button>
					<button className="secondary big-button" onClick={() => setTopic(null)}>INÝ MÓD</button>
				</div>
			</main>
		);
	}

	if (!question) return null;

	return (
		<main className="shell play-shell">
			<header className="play-header">
				<button className="back" onClick={() => setTopic(null)} aria-label="Späť">←</button>
				<div className="mode-info">
					<strong>{activeTopic?.icon} {activeTopic?.name}</strong>
					<span>{index + 1} / {ROUND_SIZE}</span>
				</div>
				<div className="hud-score">
					<small>SCORE</small>
					<strong>{roundPoints}</strong>
				</div>
			</header>

			<div className="hud-row">
				<div className={streak >= 3 ? "combo hot" : "combo"}>
					<span>COMBO</span>
					<strong>×{streak}</strong>
				</div>
				<div className="multiplier">
					<span>MULTI</span>
					<strong>×{multiplier}</strong>
				</div>
				<div className="round-level">
					<span>LEVEL</span>
					<strong>{level}</strong>
				</div>
			</div>

			<div className="progress"><span style={{ width: String(((index + 1) / ROUND_SIZE) * 100) + "%" }} /></div>

			<section className={["question-card", feedback ?? "", boss ? "boss" : ""].filter(Boolean).join(" ")}>
				{boss && <div className="boss-banner"><span>⚠ BOSS</span><strong>×2 XP</strong></div>}
				<div className="question-topline">
					<p className="eyebrow">{boss ? "POSLEDNÁ PREKÁŽKA" : "ÚLOHA " + (index + 1)}</p>
					{streak >= 3 && <div className="combo-badge">×{multiplier} COMBO</div>}
				</div>
				<h2>{question.prompt}</h2>

				<form onSubmit={submit}>
					<AnswerArea
						question={question}
						answer={answer}
						disabled={Boolean(feedback)}
						onAnswer={checkAnswer}
						onInputChange={setAnswer}
						inputRef={inputRef}
					/>

					{!feedback && !question.interaction && !question.choices && (
						<div className="answer-actions">
							{question.hint && (
								<button type="button" className="hint" onClick={useHint} disabled={showHint}>
									{showHint ? "Nápoveda použitá" : "Nápoveda · −40 % XP"}
								</button>
							)}
							<button className="primary" type="submit" disabled={!answer.trim()}>SKONTROLOVAŤ</button>
						</div>
					)}

					{!feedback && (question.interaction || question.choices) && question.hint && (
						<div className="choice-hint-row">
							<button type="button" className="hint" onClick={useHint} disabled={showHint}>
								{showHint ? "Nápoveda použitá" : "Nápoveda · −40 % XP"}
							</button>
						</div>
					)}
				</form>

				{showHint && !feedback && <div className="hint-box">💡 {question.hint}</div>}

				{feedback && (
					<div className="feedback">
						<div className="reaction-line">
							<strong>{reaction}</strong>
							<span className={lastReward > 0 ? "reward positive" : "reward"}>+{lastReward} XP</span>
						</div>
						<p className="answer-result">
							{feedback === "correct" ? "✓ Správne." : "✕ Správna odpoveď: " + question.answer}
							{feedback === "correct" && question.answer.trim() === "67" && <b className="bonus67"> +67 BONUS</b>}
						</p>
						<p>{question.explanation}</p>
						<button className="primary next-button" onClick={next}>
							{boss ? "DOKONČIŤ" : "ĎALEJ →"}
						</button>
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
