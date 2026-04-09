"use client";

import ExerciseQuestionContentCard from "@/components/exercise/ExerciseQuestionContentCard";
import ExerciseQuestionRunLayout from "@/components/exercise/ExerciseQuestionRunLayout";
import { Badge, Button, Card } from "@/components/ui";
import { FormInput } from "@/components/ui/form";
import {
  createResultId,
  saveExerciseResult,
} from "@/libs/exercise-result-store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getExpectedAnswer,
  normalizeAnswer,
  ReadBackQuestion as Question,
  RESPONSE_MODE_SHORT_LABEL,
  ResponseMode,
} from "./types";

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

const generateRandomSequence = (minLength = 5, maxLength = 8): string[] => {
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  const numberCount = Math.ceil(length / 2);
  const letterCount = length - numberCount;

  const sequence: string[] = [];

  for (let i = 0; i < numberCount; i++) {
    const digit = DIGITS[Math.floor(Math.random() * DIGITS.length)];
    sequence.push(digit);
  }

  for (let i = 0; i < letterCount; i++) {
    const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    sequence.push(letter);
  }

  for (let i = sequence.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
  }

  return sequence;
};

const generateQuestions = (
  count: number,
  minLength: number,
  maxLength: number,
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

const ReadBackMemoryExercise = ({
  initialConfig = defaultConfig,
}: {
  initialConfig?: ExerciseConfig;
}) => {
  const router = useRouter();
  const config = initialConfig;

  const [questions, setQuestions] = useState<Question[]>([]);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [playingQuestionId, setPlayingQuestionId] = useState<number | null>(
    null,
  );
  const [playIndex, setPlayIndex] = useState<number | null>(null);
  const [visibleQuestionId, setVisibleQuestionId] = useState<number | null>(
    null,
  );

  const playTimeoutRef = useRef<number | null>(null);
  const hasAutoPlayedRef = useRef(false);

  const stats = useMemo(() => {
    const total = questions.length;
    const attempted = Object.keys(answers).length;
    return { total, attempted };
  }, [questions.length, answers]);

  const stopPlayback = () => {
    setPlayingQuestionId(null);
    setPlayIndex(null);
    setVisibleQuestionId(null);
    if (playTimeoutRef.current !== null) {
      window.clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }
  };

  const playSequence = (question: Question) => {
    if (!question) return;

    stopPlayback();

    const sequence = question.sequence;
    setPlayingQuestionId(question.id);
    setVisibleQuestionId(question.id);

    const playAtIndex = (index: number) => {
      if (index >= sequence.length) {
        setVisibleQuestionId(null);
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
  }, []);

  useEffect(() => {
    if (questions.length > 0 && !hasAutoPlayedRef.current) {
      hasAutoPlayedRef.current = true;
      playSequence(questions[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const startExercise = () => {
    const newQuestions = generateQuestions(
      config.questionCount,
      config.minLength,
      config.maxLength,
    );

    setQuestions(newQuestions);
    setAnswers({});
    setVisibleQuestionId(null);
    hasAutoPlayedRef.current = false;
  };

  useEffect(() => {
    startExercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    startExercise();
  };

  const handleEndTest = () => {
    stopPlayback();

    const updatedResults: Record<number, boolean> = {};
    questions.forEach((question) => {
      const rawAnswer = answers[question.id] ?? "";
      const normalized = normalizeAnswer(rawAnswer);
      const expected = getExpectedAnswer(question);
      updatedResults[question.id] =
        normalized.length > 0 && normalized === expected;
    });

    const correct = Object.values(updatedResults).filter(Boolean).length;
    const attempted = Object.keys(answers).filter((key) => {
      return Boolean((answers[Number(key)] ?? "").trim());
    }).length;
    const resultId = createResultId();
    saveExerciseResult("read-back-memory", resultId, {
      questions,
      answers,
      results: updatedResults,
      stats: {
        total: questions.length,
        correct,
      },
    });
    setVisibleQuestionId(null);
    router.push(
      `/read-back-memory/end?score=${correct}&total=${questions.length}&attempted=${attempted}&resultId=${resultId}`,
    );
  };

  const scrollToNextQuestion = (currentIndex: number) => {
    const nextQuestion = questions[currentIndex + 1];
    if (!nextQuestion) return;

    const nextElement = document.getElementById(
      `readback-question-${nextQuestion.id}`,
    );
    nextElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-6">
      {questions.length > 0 && (
        <>
          <ExerciseQuestionRunLayout
            panelTitle="Read Back Memory"
            panelMeta={
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="rounded-full border border-info-200 bg-info-50 px-3 py-1 text-info-800">
                  Attempted: <span className="font-semibold">{stats.attempted}</span> / {stats.total}
                </span>
              </div>
            }
            navigatorTitle="Question Navigator"
            navigatorItems={questions.map((question, index) => ({
              id: String(question.id),
              label: `Q${index + 1}`,
              targetId: `readback-question-${question.id}`,
              isCompleted: Boolean((answers[question.id] ?? "").trim()),
              completedLabel: "Started",
              pendingLabel: "Pending",
            }))}
          >
            {questions.map((question, index) => {
              const currentAnswer = answers[question.id] ?? "";
              const isAnswered = Boolean(currentAnswer.trim());
              const isSequenceVisible = visibleQuestionId === question.id;
              const isPlaying = playingQuestionId === question.id;

              return (
                <ExerciseQuestionContentCard
                  key={question.id}
                  id={`readback-question-${question.id}`}
                  questionLabel={`Question ${index + 1}`}
                  title="Listen to the sequence, then answer from memory."
                  badge={
                    <Badge variant="info" className="w-fit">
                      {RESPONSE_MODE_SHORT_LABEL[question.mode]}
                    </Badge>
                  }
                >
                  <div className="space-y-3">
                    <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-relaxed">
                      <p className="mb-2 font-medium text-brand-800">
                        {RESPONSE_MODE_LABEL[question.mode]}
                      </p>
                      {isSequenceVisible ? (
                        <div className="flex flex-wrap gap-2">
                          {question.sequence.map((char, charIndex) => (
                            <div
                              key={`${question.id}-${charIndex}-${char}`}
                              className={`flex h-9 w-9 items-center justify-center rounded-md border text-base font-semibold transition-all ${
                                isPlaying && playIndex === charIndex
                                  ? "bg-brand-500 text-white border-primary scale-105"
                                  : "bg-white text-neutral-700 border-neutral-200"
                              }`}
                            >
                              {char}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="italic text-brand-700/80">
                          Sequence is hidden until playback starts.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => playSequence(question)}
                        disabled={playingQuestionId !== null}
                        variant="primary"
                      >
                        {isPlaying ? "Playing sequence..." : "Play sequence"}
                      </Button>
                    </div>

                    <div className="space-y-2 pt-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Your answer
                      </label>
                      <FormInput
                        value={currentAnswer}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [question.id]: e.target.value,
                          }))
                        }
                        placeholder="Type your recalled sequence (e.g. 3G9AD)"
                        disabled={playingQuestionId !== null}
                      />

                      <p className="text-xs text-muted-foreground">
                        Answers ignore spaces and letter casing.
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {index < questions.length - 1 && (
                          <Button
                            variant="outline"
                            onClick={() => scrollToNextQuestion(index)}
                            disabled={!isAnswered}
                          >
                            Next question
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [question.id]: "",
                            }))
                          }
                          disabled={!isAnswered}
                        >
                          Clear answer
                        </Button>
                      </div>
                    </div>
                  </div>
                </ExerciseQuestionContentCard>
              );
            })}
          </ExerciseQuestionRunLayout>

          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/read-back-memory")}
            >
              Back to setup
            </Button>
            <Button variant="ghost" onClick={handleReset}>
              Restart run
            </Button>
            <Button onClick={handleEndTest}>Finish Exercise</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReadBackMemoryExercise;
