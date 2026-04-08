"use client";

import { Card } from "@/components/ui";
import { useExerciseResult } from "@/libs/exercise-result-store";
import { Choice } from "@/types/exercies";
import { useSearchParams } from "next/navigation";
import { ComparisonItem } from "../types";
import ComparisonResult from "./ComparisonResult";

interface ComparisonEndPayload {
  items: ComparisonItem[];
  answers: Record<number, Choice>;
  correctAnswerCount: number;
}

const ComparisonEndResultClient = ({ resultId }: { resultId?: string }) => {
  const searchParams = useSearchParams();
  const activeResultId = resultId ?? searchParams.get("resultId") ?? undefined;
  const payload = useExerciseResult<ComparisonEndPayload>(
    "comparison",
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
    <ComparisonResult
      items={payload.items}
      answers={payload.answers}
      correctAnswerCount={payload.correctAnswerCount}
    />
  );
};

export default ComparisonEndResultClient;
