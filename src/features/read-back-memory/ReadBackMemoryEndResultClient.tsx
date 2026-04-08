"use client";

import { Card } from "@/components/ui";
import { useExerciseResult } from "@/libs/exercise-result-store";
import { useSearchParams } from "next/navigation";
import ReadBackMemorySummary from "./ReadBackMemorySummary";
import { ReadBackQuestion } from "./types";

interface ReadBackEndPayload {
  questions: ReadBackQuestion[];
  answers: Record<number, string>;
  results: Record<number, boolean>;
  stats: { total: number; correct: number };
}

const ReadBackMemoryEndResultClient = ({ resultId }: { resultId?: string }) => {
  const searchParams = useSearchParams();
  const activeResultId = resultId ?? searchParams.get("resultId") ?? undefined;
  const payload = useExerciseResult<ReadBackEndPayload>(
    "read-back-memory",
    activeResultId,
  );

  if (!payload) {
    return (
      <Card>
        <p className="text-sm text-neutral-600">
          Detailed answer review is not available for this session.
        </p>
      </Card>
    );
  }

  return (
    <ReadBackMemorySummary
      questions={payload.questions}
      answers={payload.answers}
      results={payload.results}
      stats={payload.stats}
      onReset={() => {}}
      hideActions
    />
  );
};

export default ReadBackMemoryEndResultClient;
