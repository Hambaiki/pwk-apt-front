"use client";

import { Button, Card } from "@/components/ui";
import { cn } from "@/libs/utils/cn";
import Link from "next/link";
import {
  getExpectedAnswer,
  normalizeAnswer,
  ReadBackQuestion,
  RESPONSE_MODE_SHORT_LABEL,
} from "./types";

interface ReadBackMemorySummaryProps {
  questions: ReadBackQuestion[];
  answers: Record<number, string>;
  results: Record<number, boolean>;
  stats: { total: number; correct: number };
  onReset: () => void;
  hideActions?: boolean;
}

const ReadBackMemorySummary = ({
  questions,
  answers,
  results,
  stats,
  onReset,
  hideActions = false,
}: ReadBackMemorySummaryProps) => {
  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Summary</h2>
          <p className="text-sm text-muted-foreground">
            Review your performance for each sequence.
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
          const rawAnswer = answers[question.id] ?? "";
          const userAnswer = normalizeAnswer(rawAnswer);
          const expected = getExpectedAnswer(question);
          const isCorrect = results[question.id] ?? false;

          return (
            <Card key={question.id} className="space-y-1 bg-surface p-3 md:p-4">
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

              <p className="text-xs text-muted-foreground md:text-sm">
                Mode:{" "}
                <span className="font-medium">
                  {RESPONSE_MODE_SHORT_LABEL[question.mode]}
                </span>
              </p>

              <p className="text-xs md:text-sm">
                Original sequence: <code>{question.sequence.join(" ")}</code>
              </p>

              <p className="text-xs md:text-sm">
                Your answer: <code>{userAnswer || "<no answer provided>"}</code>
              </p>

              <p className="text-xs md:text-sm">
                Expected answer: <code>{expected}</code>
              </p>
            </Card>
          );
        })}
      </div>

      {!hideActions && (
        <div className="flex justify-end gap-3 pt-2">
          <Link href="/read-back-memory/end">
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

export default ReadBackMemorySummary;
