"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Button, Card, Input, Badge } from "@/components/ui";

type ResponseMode = "forward" | "backward" | "sorted";

interface Question {
  id: number;
  sequence: string[];
  mode: ResponseMode;
}

interface ExerciseConfig {
  questionCount: number;
  minLength: number;
  maxLength: number;
}

const defaultConfig: ExerciseConfig = {
  questionCount: 10,
  minLength: 5,
  maxLength: 8,
};

const DIGITS = "0123456789".split("");
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const RESPONSE_MODE_LABEL: Record<ResponseMode, string> = {
  forward: "Repeat the sequence in the same order",
  backward: "Repeat the sequence backwards",
  sorted: "Sort the sequence (numbers ascending first, then letters A–Z)",
};

const RESPONSE_MODE_SHORT_LABEL: Record<ResponseMode, string> = {
  forward: "Same order",
  backward: "Backwards",
  sorted: "Sorted (numbers → letters)",
};

const generateRandomSequence = (minLength = 5, maxLength = 8): string[] => {
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  // Balance numbers and letters: half/half, with numbers getting the extra one if odd
  const numberCount = Math.ceil(length / 2);
  const letterCount = length - numberCount;

  const sequence: string[] = [];

  // Pick numbers
  for (let i = 0; i < numberCount; i++) {
    const digit = DIGITS[Math.floor(Math.random() * DIGITS.length)];
    sequence.push(digit);
  }

  // Pick letters
  for (let i = 0; i < letterCount; i++) {
    const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    sequence.push(letter);
  }

  // Shuffle so numbers/letters are mixed
  for (let i = sequence.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
  }

  return sequence;
};

const generateQuestions = (
  count: number,
  minLength: number,
  maxLength: number
): Question[] => {
  const modes: ResponseMode[] = ["forward", "backward", "sorted"];

  return Array.from({ length: count }).map((_, index) => {
    const sequence = generateRandomSequence(minLength, maxLength);
    const mode = modes[index % modes.length];

    return {
      id: index,
      sequence,
      mode,
    };
  });
};

const normalizeAnswer = (answer: string): string =>
  answer.replace(/[^0-9a-z]/gi, "").toUpperCase();

const getExpectedAnswer = (question: Question): string => {
  const sequence = question.sequence.map((s) => s.toUpperCase());

  if (question.mode === "forward") {
    return sequence.join("");
  }

  if (question.mode === "backward") {
    return [...sequence].reverse().join("");
  }

  // sorted
  const numbers = sequence
    .filter((ch) => /[0-9]/.test(ch))
    .sort((a, b) => {
      return parseInt(a, 10) - parseInt(b, 10);
    });
  const letters = sequence.filter((ch) => /[A-Z]/.test(ch)).sort();

  return [...numbers, ...letters].join("");
};

const ReadBackMemoryExercise = () => {
  const [stage, setStage] = useState<"config" | "exercise" | "summary">(
    "config"
  );

  const [config, setConfig] = useState<ExerciseConfig>(defaultConfig);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const [isPlaying, setIsPlaying] = useState(false);
  const [playIndex, setPlayIndex] = useState<number | null>(null);
  const [isSequenceVisible, setIsSequenceVisible] = useState(false);

  const playTimeoutRef = useRef<number | null>(null);
  const hasAutoPlayedRef = useRef(false);

  const hasCurrentQuestion =
    questions.length > 0 &&
    currentIndex >= 0 &&
    currentIndex < questions.length;

  const currentQuestion = hasCurrentQuestion ? questions[currentIndex] : null;
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id] ?? ""
    : "";

  const expectedAnswer = useMemo(
    () => (currentQuestion ? getExpectedAnswer(currentQuestion) : ""),
    [currentQuestion]
  );

  const isCurrentCorrect =
    currentQuestion && currentQuestion.id in results
      ? results[currentQuestion.id]
      : null;

  const stats = useMemo(() => {
    const total = questions.length;
    const attempted = Object.keys(answers).length;
    const correct = Object.values(results).filter(Boolean).length;
    return { total, attempted, correct };
  }, [questions.length, answers, results]);

  const stopPlayback = () => {
    setIsPlaying(false);
    setPlayIndex(null);
    setIsSequenceVisible(false);
    if (playTimeoutRef.current !== null) {
      window.clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }
  };

  const playSequence = () => {
    if (!currentQuestion) return;

    stopPlayback();

    const sequence = currentQuestion.sequence;
    setIsPlaying(true);
    setIsSequenceVisible(true);

    const playAtIndex = (index: number) => {
      if (index >= sequence.length) {
        setIsSequenceVisible(false);
        stopPlayback();
        return;
      }

      const char = sequence[index];
      setPlayIndex(index);

      // Optional: use browser speech synthesis if available
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          const utterance = new SpeechSynthesisUtterance(char);
          window.speechSynthesis.speak(utterance);
        } catch {
          // fail silently if speech synthesis causes issues
        }
      }

      playTimeoutRef.current = window.setTimeout(() => {
        setPlayIndex(null);
        playAtIndex(index + 1);
      }, 1000);
    };

    playAtIndex(0);
  };

  useEffect(() => {
    return () => {
      stopPlayback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      stage === "exercise" &&
      questions.length > 0 &&
      currentIndex === 0 &&
      !hasAutoPlayedRef.current
    ) {
      hasAutoPlayedRef.current = true;
      playSequence();
    }
  }, [stage, questions, currentIndex]);

  const startExercise = () => {
    const newQuestions = generateQuestions(
      config.questionCount,
      config.minLength,
      config.maxLength
    );

    setQuestions(newQuestions);
    setAnswers({});
    setResults({});
    setRevealed({});
    setCurrentIndex(0);
    setStage("exercise");
    setIsSequenceVisible(false);
    hasAutoPlayedRef.current = false;
  };

  const handleCheckAnswer = () => {
    if (!currentQuestion) return;

    const normalized = normalizeAnswer(currentAnswer);
    const expected = expectedAnswer;

    const isCorrect = normalized.length > 0 && normalized === expected;

    setResults((prev) => ({
      ...prev,
      [currentQuestion.id]: isCorrect,
    }));
  };

  const handleChangeQuestion = (direction: "prev" | "next") => {
    stopPlayback();
    setCurrentIndex((prev) => {
      if (direction === "prev") {
        return Math.max(0, prev - 1);
      }
      return Math.min(questions.length - 1, prev + 1);
    });
  };

  const handleReset = () => {
    stopPlayback();
    setStage("config");
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setResults({});
    setRevealed({});
    setIsSequenceVisible(false);
    hasAutoPlayedRef.current = false;
  };

  const handleEndTest = () => {
    stopPlayback();

    // Ensure every question has a correctness result
    setResults((prev) => {
      const updated: Record<number, boolean> = { ...prev };

      questions.forEach((question) => {
        if (question.id in updated) return;

        const rawAnswer = answers[question.id] ?? "";
        const normalized = normalizeAnswer(rawAnswer);
        const expected = getExpectedAnswer(question);
        updated[question.id] = normalized.length > 0 && normalized === expected;
      });

      return updated;
    });

    setStage("summary");
    setIsSequenceVisible(false);
  };

  const handleRevealAnswer = () => {
    if (!currentQuestion) return;

    const normalized = normalizeAnswer(currentAnswer);
    const expected = expectedAnswer;
    const isCorrect = normalized.length > 0 && normalized === expected;

    setResults((prev) => ({
      ...prev,
      [currentQuestion.id]: isCorrect,
    }));

    setRevealed((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
  };

  return (
    <div className="space-y-6">
      {stage === "config" && (
        <Card className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              Read Back Memory – Configuration
            </h2>
            <p className="text-sm text-muted-foreground">
              Adjust the difficulty of the exercise, then press{" "}
              <strong>Start</strong>. The first sequence will automatically be
              played for you.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">Number of questions</label>
              <Input
                type="number"
                min={1}
                max={30}
                value={config.questionCount}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    questionCount: Math.min(
                      30,
                      Math.max(1, Number(e.target.value) || 1)
                    ),
                  }))
                }
              />
              <p className="text-xs text-muted-foreground">
                Total sequences you will practice in this run.
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">Min length</label>
              <Input
                type="number"
                min={3}
                max={config.maxLength}
                value={config.minLength}
                onChange={(e) => {
                  const value = Number(e.target.value) || 3;
                  setConfig((prev) => ({
                    ...prev,
                    minLength: Math.min(value, prev.maxLength),
                  }));
                }}
              />
              <p className="text-xs text-muted-foreground">
                Shortest length of each sequence (digits and letters combined).
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">Max length</label>
              <Input
                type="number"
                min={config.minLength}
                max={10}
                value={config.maxLength}
                onChange={(e) => {
                  const value = Number(e.target.value) || 8;
                  setConfig((prev) => ({
                    ...prev,
                    maxLength: Math.max(value, prev.minLength),
                  }));
                }}
              />
              <p className="text-xs text-muted-foreground">
                Longest length of each sequence. Increase for a harder test.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setConfig(defaultConfig)}
            >
              Reset config
            </Button>
            <Button onClick={startExercise}>Start</Button>
          </div>
        </Card>
      )}

      {stage === "exercise" && currentQuestion && (
        <>
          <Card className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  Question {currentIndex + 1} of {questions.length}
                </p>
                <h2 className="text-xl font-semibold">
                  Read Back Memory – Mixed Numbers & Letters
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-info-50 text-info-800 border border-info-200">
                  Attempted:{" "}
                  <span className="font-semibold">{stats.attempted}</span> /{" "}
                  {stats.total}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Correct:{" "}
                  <span className="font-semibold">{stats.correct}</span>
                </span>
              </div>
            </div>

            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{
                  width:
                    questions.length > 0
                      ? `${((currentIndex + 1) / questions.length) * 100}%`
                      : "0%",
                }}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Instruction for this item
                  </p>
                  <Badge variant="info" className="w-fit">
                    {RESPONSE_MODE_SHORT_LABEL[currentQuestion.mode]}
                  </Badge>
                  <p className="text-base">
                    {RESPONSE_MODE_LABEL[currentQuestion.mode]}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    Sequence (played one by one)
                  </p>
                  {isSequenceVisible ? (
                    <div className="flex flex-wrap gap-2">
                      {currentQuestion.sequence.map((char, index) => (
                        <div
                          key={`${currentQuestion.id}-${index}-${char}`}
                          className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg font-semibold transition-all ${
                            playIndex === index
                              ? "bg-primary-500 text-white border-primary scale-110 shadow-md"
                              : "bg-muted text-foreground border-muted-foreground/20"
                          }`}
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">
                      Sequence hidden. Click <strong>Replay</strong> to see and
                      hear it again, or <strong>Reveal answer</strong> to view
                      the correct response.
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={playSequence}
                      disabled={isPlaying}
                      variant="primary"
                    >
                      {isPlaying ? "Playing..." : "Play sequence"}
                    </Button>
                    <Button
                      onClick={playSequence}
                      variant="outline"
                      disabled={isPlaying}
                    >
                      Replay
                    </Button>
                    <Button variant="outline" onClick={handleRevealAnswer}>
                      Reveal answer
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    The sequence will be highlighted one character at a time
                    and, if supported by your browser, read aloud using
                    synthesized speech.
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-2 pt-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Your answer
                </label>
                <Input
                  value={currentAnswer}
                  onChange={(e) =>
                    setAnswers((prev) =>
                      currentQuestion
                        ? {
                            ...prev,
                            [currentQuestion.id]: e.target.value,
                          }
                        : prev
                    )
                  }
                  placeholder="Type the sequence here, e.g. 3G9AD"
                  disabled={isPlaying}
                />

                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleCheckAnswer} disabled={!currentAnswer}>
                    Check answer
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      currentQuestion &&
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: "",
                      }))
                    }
                    disabled={!currentAnswer}
                  >
                    Clear answer
                  </Button>
                </div>

                {isCurrentCorrect !== null && (
                  <div
                    className={`mt-1 rounded-md border px-3 py-2 text-sm ${
                      isCurrentCorrect
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                        : "border-red-300 bg-red-50 text-red-800"
                    }`}
                  >
                    {isCurrentCorrect ? (
                      <span>Correct! Great job remembering this sequence.</span>
                    ) : (
                      <span>
                        Not quite. The expected answer for this instruction is{" "}
                        <code className="font-semibold">{expectedAnswer}</code>.
                      </span>
                    )}
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Your input is compared without spaces and is not
                  case-sensitive.
                </p>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => handleChangeQuestion("prev")}
              disabled={currentIndex === 0}
            >
              Previous question
            </Button>

            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleReset}>
                Back to configuration
              </Button>
              <Button onClick={handleEndTest}>End & view summary</Button>
              <Button
                variant="outline"
                onClick={() => handleChangeQuestion("next")}
                disabled={currentIndex === questions.length - 1}
              >
                Next question
              </Button>
            </div>
          </div>
        </>
      )}

      {stage === "summary" && (
        <Card className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Summary</h2>
              <p className="text-sm text-muted-foreground">
                Review your performance for each sequence.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-info-50 text-info-800 border border-info-200">
                Questions: <span className="font-semibold">{stats.total}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Correct: <span className="font-semibold">{stats.correct}</span>
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {questions.map((question, index) => {
              const rawAnswer = answers[question.id] ?? "";
              const userAnswer = normalizeAnswer(rawAnswer);
              const expected = getExpectedAnswer(question);
              const isCorrect = results[question.id] ?? false;

              return (
                <Card
                  key={question.id}
                  className="p-3 md:p-4 space-y-1 bg-background-secondary"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm md:text-base">
                      Question {index + 1}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        isCorrect
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground">
                    Mode:{" "}
                    <span className="font-medium">
                      {RESPONSE_MODE_SHORT_LABEL[question.mode]}
                    </span>
                  </p>

                  <p className="text-xs md:text-sm">
                    Original sequence:{" "}
                    <code>{question.sequence.join(" ")}</code>
                  </p>

                  <p className="text-xs md:text-sm">
                    Your answer:{" "}
                    <code>{rawAnswer || "<no answer provided>"}</code>
                  </p>

                  <p className="text-xs md:text-sm">
                    Expected answer: <code>{expected}</code>
                  </p>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={handleReset}>
              Back to configuration
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReadBackMemoryExercise;
