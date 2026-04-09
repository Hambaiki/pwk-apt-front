"use client";

import { Card } from "@/components/ui";
import { DualTaskQuestionHistoryItem } from "@/features/dual-task-coordination/types";
import { useExerciseResult } from "@/libs/exercise-result-store";
import { useSearchParams } from "next/navigation";

interface DualTaskEndPayload {
  completedQuestions: number;
  totalQuestions: number;
  durationSec: number;
  symbolMode: boolean;
  questionHistory?: DualTaskQuestionHistoryItem[];
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

      <div className="space-y-2 pt-1">
        <h4 className="text-sm font-semibold text-neutral-800">
          Question History
        </h4>
        {payload.questionHistory && payload.questionHistory.length > 0 ? (
          <div className="space-y-2">
            {payload.questionHistory.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-neutral-200 bg-neutral-50 p-3"
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-neutral-800">
                    Q{item.id}
                  </p>
                  <span className="inline-flex rounded-full border border-neutral-200 bg-white px-2 py-0.5 text-xs font-medium text-neutral-700">
                    {item.status === "expired" ? "Timed Out" : "Session Ended"}
                  </span>
                </div>
                <p className="text-sm text-neutral-700">{item.prompt}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-600">
            No question history was captured for this session.
          </p>
        )}
      </div>
    </Card>
  );
};

export default DualTaskEndResultClient;
