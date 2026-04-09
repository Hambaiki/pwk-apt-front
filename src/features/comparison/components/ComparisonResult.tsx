"use client";

import { Badge, Card } from "@/components/ui";
import { cn } from "@/libs/utils/cn";
import { Choice } from "@/types/exercies";
import { comparisonAnswers } from "../constants";
import { ComparisonItem, GenerationType } from "../types";

interface ComparisonResultProps {
  items: ComparisonItem[];
  answers: Record<number, Choice>;
}

type AnswerStatus = {
  label: string;
  badgeVariant: "success" | "error" | "info";
  rowClassName: string;
};

const getAnswerStatus = (
  answer: Choice | undefined,
  isCorrect: boolean,
): AnswerStatus => {
  if (!answer) {
    return {
      label: "Not Answered",
      badgeVariant: "info",
      rowClassName: "border-neutral-200 bg-neutral-50",
    };
  }

  if (isCorrect) {
    return {
      label: "Correct",
      badgeVariant: "success",
      rowClassName: "border-green-300 bg-green-50",
    };
  }

  return {
    label: "Incorrect",
    badgeVariant: "error",
    rowClassName: "border-red-300 bg-red-50",
  };
};

const ComparisonResult = ({ items, answers }: ComparisonResultProps) => {
  return (
    <div className="space-y-4">
      <Card className="bg-surface p-4 sm:p-5">
        <div className="mb-4">
          <p className="text-sm font-semibold text-neutral-700">Answer Review</p>
          <p className="text-xs text-neutral-500">
            Green = correct, Red = incorrect, Gray = not answered
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const question = item.mutations ? item : undefined;
            const answer: Choice | undefined = answers[index];
            const isCorrect = answer
              ? comparisonAnswers[answer]?.check(question?.mutationCount ?? 0)
              : false;
            const status = getAnswerStatus(answer, Boolean(isCorrect));
            const isWords = item.generationType === GenerationType.WORDS;

            return (
              <div
                key={index}
                className={cn(
                  "space-y-3 rounded-xl border p-4 transition-colors",
                  status.rowClassName,
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-neutral-800">
                      Question {index + 1}
                    </p>
                    <p className="text-sm text-neutral-600">
                      Your answer:{" "}
                      <span className="font-semibold">
                        {answer ?? "<no answer>"}
                      </span>
                    </p>
                    {answer && comparisonAnswers[answer] && (
                      <p className="text-sm text-neutral-600">
                        {comparisonAnswers[answer].description}
                      </p>
                    )}
                    <p className="text-sm text-neutral-600">
                      Mutations in total:{" "}
                      <span className="font-semibold">
                        {question?.mutationCount ?? 0}
                      </span>
                    </p>
                  </div>

                  <Badge variant={status.badgeVariant} className="shrink-0">
                    {status.label}
                  </Badge>
                </div>

                <div className="rounded-lg border border-neutral-200 bg-white p-3">
                  <p className="text-sm font-semibold text-neutral-700">
                    All mutations
                  </p>
                  <ul className="list-inside list-disc text-sm">
                    {question?.mutations.map((mutation, i) => (
                      <li key={i}>
                        {mutation.mutationType}{" "}
                        <code>
                          {isWords ? mutation.base.join(", ") : mutation.base}
                        </code>{" "}
                        to{" "}
                        <code>
                          {isWords
                            ? mutation.mutatedBase.join(", ")
                            : mutation.mutatedBase.join(" ")}
                        </code>
                      </li>
                    ))}
                    {question?.mutations.length === 0 && (
                      <li className="italic text-neutral-500">
                        No mutations (items were identical)
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ComparisonResult;
