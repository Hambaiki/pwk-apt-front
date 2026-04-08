"use client";

import ExerciseQuestionContentCard from "@/components/exercise/ExerciseQuestionContentCard";
import ExerciseQuestionRunLayout from "@/components/exercise/ExerciseQuestionRunLayout";
import ExerciseSessionControls from "@/components/exercise/ExerciseSessionControls";
import { Card, Modal, ModalBody, ModalHeader } from "@/components/ui";
import {
  createResultId,
  saveExerciseResult,
} from "@/libs/exercise-result-store";
import { cn } from "@/libs/utils/cn";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { defaultConfig } from "../constants";
import {
  Config,
  QuestionFormat,
  ScanningQuestionSet,
  ShapeGridItem,
} from "../types";
import HowToCard from "./HowToCard";
import ShapeItem from "./ShapeItem";

interface ScanningExerciseProps extends React.HTMLAttributes<HTMLDivElement> {
  questionSets: ScanningQuestionSet[];
  config?: Config;
}

const ScanningExercise = ({
  questionSets,
  config = defaultConfig,
  className,
  ...props
}: ScanningExerciseProps) => {
  const router = useRouter();

  // Question and item state
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Timer state (in seconds)
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Misc state
  const [isViewingHelp, setIsViewingHelp] = useState(false);

  // Handle answer input
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value.toUpperCase(),
    }));
  };

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    questionSets.forEach((questionSet) => {
      if (answers[questionSet.id] === questionSet.question.letter) {
        correct++;
      }
    });
    return correct;
  };

  const endExercise = () => {
    const correct = calculateScore();
    const attempted = Object.keys(answers).length;
    const resultId = createResultId();
    saveExerciseResult("scanning", resultId, {
      questionSets,
      answers,
      score: correct,
      config,
    });
    router.push(
      `/scanning/end?score=${correct}&total=${questionSets.length}&attempted=${attempted}&resultId=${resultId}`,
    );
  };

  // Reset exercise
  const resetExercise = () => {
    setIsTimerActive(true);
    setAnswers({});
  };

  const exitExercise = () => {
    router.push("/scanning");
  };

  const renderShapeGrid = (
    items: ShapeGridItem[],
    options?: {
      compact?: boolean;
      blur?: boolean;
    },
  ) => {
    const compact = options?.compact ?? false;
    const shouldBlur = options?.blur ?? false;

    return (
      <div
        className={cn(
          "overflow-x-auto rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4",
          shouldBlur ? "blur" : "",
        )}
      >
        <div
          className={cn(
            "relative mx-auto",
            compact
              ? "h-55 w-90 sm:h-60 sm:w-95"
              : "h-95 w-160 sm:h-110 sm:w-190 lg:h-130 lg:w-225",
          )}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute flex items-center justify-center text-white font-bold text-sm"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: "translate(-50%, -50%)",
                rotate: `${item.rotation}deg`,
              }}
            >
              <ShapeItem
                shape={item.shape.name}
                color={item.color}
                number={item.number}
                letter={item.letter}
                isMonotoneMode={config.isMonotoneMode}
                size={
                  compact
                    ? Math.max(40, Math.floor(item.size * 0.48))
                    : item.size
                }
                fontSize={
                  compact
                    ? Math.max(10, Math.floor(item.size / 10))
                    : Math.max(14, item.size / 6)
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div {...props} className={cn("flex flex-col gap-y-6", className)}>
      <ExerciseSessionControls
        isRunning={isTimerActive}
        isComplete={false}
        timerLimit={config.timeLimit}
        onEnd={endExercise}
        onPause={() => setIsTimerActive((prev) => !prev)}
        onHelp={() => setIsViewingHelp(true)}
        onRestart={resetExercise}
        onExit={exitExercise}
      />

      <>
        {config.questionFormat !== QuestionFormat.PerQuestionGrid && (
          <Card className="bg-surface p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-neutral-700">
                Reference Grid
              </p>
              <p className="text-xs text-neutral-500">
                Scroll sideways on small screens
              </p>
            </div>
            {renderShapeGrid(questionSets[0]?.items ?? [], {
              blur: !isTimerActive,
            })}
          </Card>
        )}

        <ExerciseQuestionRunLayout
          panelTitle="Answer Panel"
          panelMeta={
            <p className="text-xs text-neutral-500">
              Enter the letter for each target shape
            </p>
          }
          navigatorTitle="Question Navigator"
          blocked={!isTimerActive}
          navigatorItems={questionSets.map((questionSet, index) => ({
            id: String(questionSet.id),
            label: `Q${index + 1}`,
            targetId: `scanning-question-${questionSet.id}`,
            isCompleted: Boolean(answers[questionSet.id]),
            completedLabel: "Answered",
            pendingLabel: "Pending",
          }))}
        >
          {questionSets.map((questionSet, index) => {
            const { question, items } = questionSet;

            return (
              <ExerciseQuestionContentCard
                key={questionSet.id}
                id={`scanning-question-${questionSet.id}`}
                questionLabel={`Question ${index + 1}`}
                title="Enter the matching letter for the target shape."
                className="border border-neutral-200 bg-white"
                contentClassName="space-y-3"
              >
                {config.questionFormat === QuestionFormat.PerQuestionGrid && (
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-neutral-500">
                      Grid for question {index + 1}
                    </p>
                    {renderShapeGrid(items, { compact: true })}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold text-neutral-600">
                    {index + 1}
                  </span>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50">
                    <ShapeItem
                      shape={question.shape.name}
                      color={question.color}
                      number={question.number}
                      isMonotoneMode={config.isMonotoneMode}
                      size={52}
                      fontSize={12}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold capitalize text-neutral-800">
                      {question.shape.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Number&nbsp;
                      <span className="font-medium text-neutral-700">
                        {question.number}
                      </span>
                    </p>
                  </div>

                  <input
                    id={`scan-answer-${questionSet.id}`}
                    type="text"
                    inputMode="text"
                    autoCapitalize="characters"
                    maxLength={1}
                    value={answers[questionSet.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(questionSet.id, e.target.value)
                    }
                    className="h-12 w-14 shrink-0 rounded-xl border border-neutral-300 bg-white text-center text-xl font-bold tracking-widest text-neutral-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="A"
                  />
                </div>
              </ExerciseQuestionContentCard>
            );
          })}
        </ExerciseQuestionRunLayout>
      </>

      <Modal
        open={isViewingHelp}
        onClose={() => setIsViewingHelp(false)}
        size="2xl"
        scrollable
      >
        <ModalHeader
          title="How to Complete the Exercise"
          onClose={() => setIsViewingHelp(false)}
        />
        <ModalBody>
          <HowToCard />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ScanningExercise;
