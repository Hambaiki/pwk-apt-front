"use client";

import { Card } from "@/components/ui";
import { useExerciseResult } from "@/libs/exercise-result-store";
import { useSearchParams } from "next/navigation";

interface DualTaskEndPayload {
  completedQuestions: number;
  totalQuestions: number;
  durationSec: number;
  symbolMode: boolean;
}

const DualTaskEndResultClient = ({ resultId }: { resultId?: string }) => {
  const searchParams = useSearchParams();
  const activeResultId = resultId ?? searchParams.get("resultId") ?? undefined;
  const payload = useExerciseResult<DualTaskEndPayload>(
    "dual-task-coordination",
    activeResultId,
  );

  if (!payload) {
    return (
      <Card>
        <p className="text-sm text-neutral-600">
          Detailed session explanation is not available for this run.
        </p>
      </Card>
    );
  }

  return (
    <Card className="space-y-3">
      <h3 className="text-lg font-semibold">Session Breakdown</h3>
      <p className="text-sm text-neutral-600">
        This exercise focuses coordination rhythm and divided attention, so the
        detailed review is session-based instead of per-answer.
      </p>
      <ul className="list-disc list-inside text-sm text-neutral-700 space-y-1">
        <li>
          Completed questions: {payload.completedQuestions} /{" "}
          {payload.totalQuestions}
        </li>
        <li>Session duration: {payload.durationSec} seconds</li>
        <li>Mode: {payload.symbolMode ? "Symbol mode" : "Standard mode"}</li>
      </ul>
    </Card>
  );
};

export default DualTaskEndResultClient;
