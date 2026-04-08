"use client";

import { Button, Card } from "@/components/ui";
import { cn } from "@/libs/utils/cn";
import Link from "next/link";
import { Color, COLOR_CLASS_MAP, SequenceQuestion } from "../types";

interface SequenceMemorySummaryProps {
  questions: SequenceQuestion[];
  answers: Record<number, Color[]>;
  results: Record<number, boolean>;
  stats: { total: number; correct: number };
  onReset: () => void;
  hideActions?: boolean;
}

const SequenceMemorySummary = ({
  questions,
  answers,
  results,
  stats,
  onReset,
  hideActions = false,
}: SequenceMemorySummaryProps) => {
  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Summary</h2>
          <p className="text-sm text-muted-foreground">
            Review your sequence recall performance across all questions.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border border-info-200 bg-info-50 px-3 py-1 text-info-800">
            Questions: <span className="font-semibold">{stats.total}</span>
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-800">
            Correct: <span className="font-semibold">{stats.correct}</span>
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {questions.map((question, index) => {
          const answer = answers[question.id] ?? [];
          const isCorrect = results[question.id] ?? false;

          return (
            <Card key={question.id} className="space-y-3 bg-surface p-3 md:p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold md:text-base">
                  Question {index + 1}
                </p>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                    isCorrect
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800",
                  )}
                >
                  {isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Correct sequence
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {question.sequence.map((color, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-6 w-6 rounded-full border border-white/30",
                        COLOR_CLASS_MAP[color],
                      )}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Your answer
                </p>
                {answer.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {answer.map((color, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-6 w-6 rounded-full border border-white/30",
                          COLOR_CLASS_MAP[color],
                        )}
                        title={color}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs italic text-muted-foreground">
                    No answer provided
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {!hideActions && (
        <div className="flex justify-end gap-3 pt-2">
          <Link href="/sequence-memory/end">
            <Button>Continue</Button>
          </Link>
          <Button variant="outline" onClick={onReset}>
            Back to configuration
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SequenceMemorySummary;
