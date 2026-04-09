"use client";

import { Card } from "@/components/ui";
import { useExerciseResult } from "@/libs/exercise-result-store";
import { useSearchParams } from "next/navigation";
import { Config, ScanningQuestionSet } from "../types";
import ScanningResult from "./ScanningResult";

interface ScanningEndPayload {
  questionSets: ScanningQuestionSet[];
  answers: Record<number, string>;
  score: number;
  config: Config;
}

const ScanningEndResultClient = ({ resultId }: { resultId?: string }) => {
  const searchParams = useSearchParams();
  const activeResultId = resultId ?? searchParams.get("resultId") ?? undefined;
  const payload = useExerciseResult<ScanningEndPayload>(
    "scanning",
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
    <ScanningResult
      questionSets={payload.questionSets}
      answers={payload.answers}
      config={payload.config}
    />
  );
};

export default ScanningEndResultClient;
