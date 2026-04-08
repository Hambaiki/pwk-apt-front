"use client";

import ExerciseQuestionContentCard from "@/components/exercise/ExerciseQuestionContentCard";
import ExerciseQuestionRunLayout from "@/components/exercise/ExerciseQuestionRunLayout";
import { Button, Card } from "@/components/ui";
import {
  createResultId,
  saveExerciseResult,
} from "@/libs/exercise-result-store";
import { cn } from "@/libs/utils/cn";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, COLOR_CLASS_MAP, SequenceQuestion } from "../types";

interface ExerciseConfig {
  questionCount: number;
  minLength: number;
  maxLength: number;
}

const defaultConfig: ExerciseConfig = {
  questionCount: 8,
  minLength: 4,
  maxLength: 7,
};

const SequenceMemoryExercise = ({
  initialConfig = defaultConfig,
}: {
  initialConfig?: ExerciseConfig;
}) => {
  const router = useRouter();
  const config = initialConfig;

  const [questions, setQuestions] = useState<SequenceQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, Color[]>>({});

  const [playingQuestionId, setPlayingQuestionId] = useState<number | null>(
    null,
  );
  const [visibleQuestionId, setVisibleQuestionId] = useState<number | null>(
    null,
  );
  const [playIndex, setPlayIndex] = useState<number | null>(null);
  const playTimeoutRef = useRef<number | null>(null);

  const colors: Color[] = [
    Color.RED,
    Color.BLUE,
    Color.GREEN,
    Color.YELLOW,
    Color.PURPLE,
    Color.ORANGE,
  ];

  const generateSequence = (minLength: number, maxLength: number): Color[] => {
    const sequenceLength =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const newSequence: Color[] = [];

    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    return newSequence;
  };

  const generateQuestions = (
    count: number,
    minLength: number,
    maxLength: number,
  ): SequenceQuestion[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      sequence: generateSequence(minLength, maxLength),
    }));
  };

  const stats = useMemo(() => {
    const total = questions.length;
    const attempted = Object.keys(answers).filter((key) => {
      return (answers[Number(key)] ?? []).length > 0;
    }).length;
    return { total, attempted };
  }, [questions.length, answers]);

  const stopPlayback = () => {
    setPlayingQuestionId(null);
    setVisibleQuestionId(null);
    setPlayIndex(null);
    if (playTimeoutRef.current !== null) {
      window.clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }
  };

  const playSequence = (question: SequenceQuestion) => {
    if (!question) return;

    stopPlayback();
    setPlayingQuestionId(question.id);
    setVisibleQuestionId(question.id);

    const sequence = question.sequence;

    const playAt = (index: number) => {
      if (index >= sequence.length) {
        setPlayingQuestionId(null);
        setVisibleQuestionId(null);
        setPlayIndex(null);
        return;
      }

      setPlayIndex(index);
      playTimeoutRef.current = window.setTimeout(() => {
        playAt(index + 1);
      }, 700);
    };

    playAt(0);
  };

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  const startExercise = () => {
    stopPlayback();

    const newQuestions = generateQuestions(
      config.questionCount,
      config.minLength,
      config.maxLength,
    );

    setQuestions(newQuestions);
    setAnswers({});
  };

  useEffect(() => {
    startExercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToNextQuestion = (currentIndex: number) => {
    const nextQuestion = questions[currentIndex + 1];
    if (!nextQuestion) return;

    const nextElement = document.getElementById(
      `sequence-question-${nextQuestion.id}`,
    );
    nextElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleColorClick = (questionId: number, color: Color) => {
    setAnswers((prev) => {
      const current = prev[questionId] ?? [];
      const targetLength =
        questions.find((question) => question.id === questionId)?.sequence
          .length ?? 0;

      if (current.length >= targetLength) return prev;

      const nextAnswer = [...current, color];

      return {
        ...prev,
        [questionId]: nextAnswer,
      };
    });
  };

  const handleBackspace = (questionId: number) => {
    setAnswers((prev) => {
      const current = prev[questionId] ?? [];
      if (current.length === 0) return prev;

      return {
        ...prev,
        [questionId]: current.slice(0, -1),
      };
    });
  };

  const handleClear = (questionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: [],
    }));
  };

  const handleEnd = () => {
    const computed: Record<number, boolean> = {};

    questions.forEach((question) => {
      const current = answers[question.id] ?? [];
      computed[question.id] =
        current.length === question.sequence.length &&
        current.every((color, index) => color === question.sequence[index]);
    });

    const correct = Object.values(computed).filter(Boolean).length;
    const attempted = Object.keys(answers).filter((key) => {
      return (answers[Number(key)] ?? []).length > 0;
    }).length;
    const resultId = createResultId();
    saveExerciseResult("sequence-memory", resultId, {
      questions,
      answers,
      results: computed,
      stats: {
        total: questions.length,
        correct,
      },
    });
    stopPlayback();
    router.push(
      `/sequence-memory/end?score=${correct}&total=${questions.length}&attempted=${attempted}&resultId=${resultId}`,
    );
  };

  const resetExercise = () => {
    startExercise();
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <>
        <ExerciseQuestionRunLayout
          panelTitle="Sequence Memory"
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
            targetId: `sequence-question-${question.id}`,
            isCompleted: (answers[question.id] ?? []).length > 0,
            completedLabel: "Started",
            pendingLabel: "Pending",
          }))}
        >
          {questions.map((question, index) => {
            const answer = answers[question.id] ?? [];
            const isPlaying = playingQuestionId === question.id;
            const isVisible = visibleQuestionId === question.id;
            const isQuestionComplete = answer.length === question.sequence.length;

            return (
              <ExerciseQuestionContentCard
                key={question.id}
                id={`sequence-question-${question.id}`}
                questionLabel={`Question ${index + 1}`}
                title="Replay the sequence, then click colors in the same order."
              >
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Sequence preview
                  </p>
                  {isVisible ? (
                    <div className="flex flex-wrap gap-2">
                      {question.sequence.map((color, colorIndex) => (
                        <div
                          key={`${question.id}-${colorIndex}`}
                          className={cn(
                            "h-10 w-10 rounded-full border transition-all",
                            COLOR_CLASS_MAP[color],
                            isPlaying && playIndex === colorIndex
                              ? "scale-110 ring-4 ring-white shadow-lg"
                              : "opacity-90",
                          )}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">
                      Sequence hidden. Click Play sequence to view it.
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="primary"
                      onClick={() => playSequence(question)}
                      disabled={playingQuestionId !== null}
                    >
                      {isPlaying ? "Playing..." : "Play sequence"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Your input
                  </p>
                  <div className="flex min-h-12 flex-wrap gap-2 rounded-lg border border-border bg-surface p-2">
                    {answer.length > 0 ? (
                      answer.map((color, answerIndex) => (
                        <div
                          key={`${question.id}-answer-${answerIndex}`}
                          className={cn(
                            "h-8 w-8 rounded-full border",
                            COLOR_CLASS_MAP[color],
                          )}
                        />
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No colors selected yet.
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {colors.map((color) => (
                      <button
                        key={`${question.id}-${color}`}
                        type="button"
                        onClick={() => handleColorClick(question.id, color)}
                        disabled={
                          playingQuestionId !== null ||
                          answer.length >= question.sequence.length
                        }
                        className={cn(
                          "h-10 rounded-lg border border-neutral-200 transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60",
                          COLOR_CLASS_MAP[color],
                        )}
                        aria-label={`Select ${color}`}
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {index < questions.length - 1 && (
                      <Button
                        variant="outline"
                        onClick={() => scrollToNextQuestion(index)}
                        disabled={!isQuestionComplete}
                      >
                        Next question
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => handleBackspace(question.id)}
                      disabled={answer.length === 0}
                    >
                      Undo
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleClear(question.id)}
                      disabled={answer.length === 0}
                    >
                      Clear
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Tip: answers are graded after you finish the run.
                  </p>
                </div>
              </ExerciseQuestionContentCard>
            );
          })}
        </ExerciseQuestionRunLayout>

        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => router.push("/sequence-memory")}
          >
            Back to setup
          </Button>
          <Button variant="ghost" onClick={resetExercise}>
            Restart run
          </Button>
          <Button onClick={handleEnd}>Finish Exercise</Button>
        </div>
      </>
    </div>
  );
};

export default SequenceMemoryExercise;
