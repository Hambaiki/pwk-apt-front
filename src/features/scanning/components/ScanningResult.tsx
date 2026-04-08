"use client";

import Score from "@/components/exercise/Score";
import { Card } from "@/components/ui";
import { cn } from "@/libs/utils/cn";
import {
  Config,
  QuestionFormat,
  ScanningQuestionSet,
  ShapeGridItem,
} from "../types";
import ShapeItem from "./ShapeItem";

interface ScanningResultProps {
  questionSets: ScanningQuestionSet[];
  answers: Record<number, string>;
  score: number;
  config: Config;
}

const renderMiniGrid = (items: ShapeGridItem[], isMonotone?: boolean) => (
  <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white p-2">
    <div className="relative mx-auto h-[180px] w-[300px]">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute flex items-center justify-center font-bold text-sm text-white"
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
            isMonotoneMode={isMonotone}
            size={Math.max(38, Math.floor(item.size * 0.44))}
            fontSize={Math.max(9, Math.floor(item.size / 11))}
          />
        </div>
      ))}
    </div>
  </div>
);

const ScanningResult = ({
  questionSets,
  answers,
  score,
  config,
}: ScanningResultProps) => {
  return (
    <div className="space-y-4">
      <Score
        answerCount={Object.keys(answers).length}
        correctCount={score}
        totalCount={questionSets.length}
        score={score}
        maxScore={questionSets.length}
      />

      <Card className="bg-surface p-4 sm:p-5">
        <div className="mb-4">
          <p className="text-sm font-semibold text-neutral-700">
            Answer Review
          </p>
          <p className="text-xs text-neutral-500">
            Green = correct, Red = incorrect or missing
          </p>
        </div>

        {/* Shared reference grid (read-only) */}
        {config.questionFormat !== QuestionFormat.PerQuestionGrid && (
          <div className="mb-6">
            <p className="mb-2 text-xs font-medium text-neutral-500">
              Reference Grid
            </p>
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4">
              <div className="relative mx-auto h-[380px] w-[640px] sm:h-[440px] sm:w-[760px] lg:h-[520px] lg:w-[900px]">
                {(questionSets[0]?.items ?? []).map((item) => (
                  <div
                    key={item.id}
                    className="absolute flex items-center justify-center font-bold text-sm text-white"
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
                      size={item.size}
                      fontSize={Math.max(14, item.size / 6)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-y-2">
          {questionSets.map((questionSet, index) => {
            const { question, items } = questionSet;
            const userAnswer = answers[questionSet.id] || "";
            const isCorrect = userAnswer === question.letter;

            return (
              <div
                key={questionSet.id}
                className={cn(
                  "flex flex-col gap-3 rounded-xl border p-3 transition-colors",
                  isCorrect
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50",
                )}
              >
                {config.questionFormat === QuestionFormat.PerQuestionGrid && (
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-neutral-500">
                      Grid for question {index + 1}
                    </p>
                    {renderMiniGrid(items, config.isMonotoneMode)}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold text-neutral-600">
                    {index + 1}
                  </span>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-white">
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
                      Number{" "}
                      <span className="font-medium text-neutral-700">
                        {question.number}
                      </span>
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-center gap-0.5 text-center">
                    <span className="text-xs font-medium text-neutral-500">
                      You
                    </span>
                    <span
                      className={cn(
                        "text-lg font-bold",
                        userAnswer
                          ? isCorrect
                            ? "text-green-700"
                            : "text-red-700"
                          : "text-neutral-400",
                      )}
                    >
                      {userAnswer || "—"}
                    </span>
                  </div>

                  <div className="flex shrink-0 flex-col items-center gap-0.5 text-center">
                    <span className="text-xs font-medium text-neutral-500">
                      Correct
                    </span>
                    <span className="text-lg font-bold text-green-700">
                      {question.letter}
                    </span>
                  </div>

                  <span
                    className={cn(
                      "shrink-0 text-xl font-bold",
                      isCorrect ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {isCorrect ? "✓" : "✗"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ScanningResult;
