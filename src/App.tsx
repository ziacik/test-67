import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { generateQuestion, isCorrect } from "./questions/generator";
import { topics } from "./questions/topics";
import type { Question, TopicId } from "./questions/types";
import "./styles.css";

const ROUND_SIZE = 10;

type Stats = {
	bestStreak: number;
	totalCorrect: number;
	totalAnswered: number;
};

const emptyStats: Stats = { bestStreak: 0, totalCorrect: 0, totalAnswered: 0 };

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
	const [streak, setStreak] = useState(0);
	const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
	const [showHint, setShowHint] = useState(false);
	const [finished, setFinished] = useState(false);
	const [stats, setStats] = useState<Stats>(readStats);
	const inputRef = useRef<HTMLInputElement>(null);

	const activeTopic = useMemo(() => topics.find((item) => item.id === topic), [topic]);

	useEffect(() => {
		localStorage.setItem("test-67-stats", JSON.stringify(stats));
	}, [stats]);

	const start = (nextTopic: TopicId) => {
		setTopic(nextTopic);
		setQuestion(generateQuestion(nextTopic));
		setAnswer("");
		setIndex(0);
		setScore(0);
		setStreak(0);
		setFeedback(null);
		setShowHint(false);
		setFinished(false);
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	const next = () => {
		if (!topic) return;
		if (index + 1 >= ROUND_SIZE) {
			setFinished(true);
			return;
		}
		setIndex((value) => value + 1);
		setQuestion(generateQuestion(topic));
		setAnswer("");
		setFeedback(null);
		setShowHint(false);
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	const submit = (event?: FormEvent) => {
		event?.preventDefault();
		if (!question || feedback || !answer.trim()) return;
		const correct = isCorrect(question, answer);
		setFeedback(correct ? "correct" : "wrong");
		const nextStreak = correct ? streak + 1 : 0;
		setStreak(nextStreak);
		if (correct) setScore((value) => value + 1);
		setStats((value) => ({
			bestStreak: Math.max(value.bestStreak, nextStreak),
			totalCorrect: value.totalCorrect + (correct ? 1 : 0),
			totalAnswered: value.totalAnswered + 1,
		}));
	};

	if (!topic) {
		const success = stats.totalAnswered ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0;
		return (
			<main className="shell">
				<header className="hero">
					<div className="brand">Test 67 <span>Matematika 5</span></div>
					<h1>10 príkladov.<br />Žiadna nuda navyše.</h1>
					<p>Vyber si tréning. Za správne odpovede rastie séria, chybu hneď vysvetlíme.</p>
				</header>

				<section className="stats" aria-label="Štatistiky">
					<div><strong>{stats.bestStreak}</strong><span>najlepšia séria</span></div>
					<div><strong>{stats.totalCorrect}</strong><span>správne spolu</span></div>
					<div><strong>{success}%</strong><span>úspešnosť</span></div>
				</section>

				<section className="topic-grid">
					{topics.map((item) => (
						<button className="topic-card" key={item.id} onClick={() => start(item.id)}>
							<span className="topic-icon">{item.icon}</span>
							<span className="topic-copy"><strong>{item.name}</strong><small>{item.description}</small></span>
							<span className="arrow">→</span>
						</button>
					))}
				</section>
				<footer>Obsah: matematika, 5. ročník ZŠ · Slovensko</footer>
			</main>
		);
	}

	if (finished) {
		const great = score >= 8;
		return (
			<main className="shell result-shell">
				<div className="result-badge">{great ? "🏆" : score >= 5 ? "✨" : "🧠"}</div>
				<p className="eyebrow">Kolo hotové</p>
				<h1>{score} / {ROUND_SIZE}</h1>
				<p>{great ? "Toto bolo fakt dobré." : score >= 5 ? "Fajn. Ešte jedno kolo a bude to lepšie." : "Aspoň už vieme, čo treba potrénovať."}</p>
				<div className="result-actions">
					<button className="primary" onClick={() => start(topic)}>Ešte raz</button>
					<button className="secondary" onClick={() => setTopic(null)}>Iná téma</button>
				</div>
			</main>
		);
	}

	if (!question) return null;

	return (
		<main className="shell play-shell">
			<header className="play-header">
				<button className="back" onClick={() => setTopic(null)} aria-label="Späť">←</button>
				<div>
					<strong>{activeTopic?.icon} {activeTopic?.name}</strong>
					<span>{index + 1} / {ROUND_SIZE}</span>
				</div>
				<div className="streak">🔥 {streak}</div>
			</header>

			<div className="progress"><span style={{ width: `${((index + 1) / ROUND_SIZE) * 100}%` }} /></div>

			<section className={`question-card ${feedback ?? ""}`}>
				<p className="eyebrow">Úloha {index + 1}</p>
				<h2>{question.prompt}</h2>

				<form onSubmit={submit}>
					{question.choices ? (
						<div className="choices">
							{question.choices.map((choice) => (
								<button
									type="button"
									key={choice}
									className={answer === choice ? "selected" : ""}
									onClick={() => !feedback && setAnswer(choice)}
								>{choice}</button>
							))}
						</div>
					) : (
						<input
							ref={inputRef}
							inputMode="numeric"
							autoComplete="off"
							value={answer}
							onChange={(event) => setAnswer(event.target.value)}
							disabled={Boolean(feedback)}
							placeholder="Tvoja odpoveď"
						/>
					)}

					{!feedback && (
						<div className="answer-actions">
							{question.hint && <button type="button" className="hint" onClick={() => setShowHint(true)}>Nápoveda</button>}
							<button className="primary" type="submit" disabled={!answer.trim()}>Skontrolovať</button>
						</div>
					)}
				</form>

				{showHint && !feedback && <div className="hint-box">💡 {question.hint}</div>}

				{feedback && (
					<div className="feedback">
						<strong>{feedback === "correct" ? "✓ Správne" : `✕ Správna odpoveď: ${question.answer}`}</strong>
						<p>{question.explanation}</p>
						<button className="primary" onClick={next}>Ďalej →</button>
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
