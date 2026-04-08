"use client";

import { Card } from "@/components/ui";
import { useExerciseResult } from "@/libs/exercise-result-store";
import { useSearchParams } from "next/navigation";
import { Color, SequenceQuestion } from "../types";
import SequenceMemorySummary from "./SequenceMemorySummary";

interface SequenceEndPayload {
  questions: SequenceQuestion[];
  answers: Record<number, Color[]>;
  results: Record<number, boolean>;
  stats: { total: number; correct: number };
}

const SequenceMemoryEndResultClient = ({ resultId }: { resultId?: string }) => {
  const searchParams = useSearchParams();
  const activeResultId = resultId ?? searchParams.get("resultId") ?? undefined;
  const payload = useExerciseResult<SequenceEndPayload>(
    "sequence-memory",
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
    <SequenceMemorySummary
      questions={payload.questions}
      answers={payload.answers}
      results={payload.results}
      stats={payload.stats}
      onReset={() => {}}
      hideActions
    />
  );
};

export default SequenceMemoryEndResultClient;
