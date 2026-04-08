"use client";

import { Card } from "@/components/ui";
import { useExerciseResult } from "@/libs/exercise-result-store";
import { useSearchParams } from "next/navigation";
import {
  ExerciseStats,
  FlightScenario,
  ScenarioAnswer,
  ScenarioResult,
} from "../types";
import FlightInformationSummary from "./FlightInformationSummary";

interface FlightInformationEndPayload {
  scenarios: FlightScenario[];
  answers: Record<number, ScenarioAnswer>;
  results: Record<number, ScenarioResult>;
  stats: ExerciseStats;
}

const FlightInformationEndResultClient = ({
  resultId,
}: {
  resultId?: string;
}) => {
  const searchParams = useSearchParams();
  const activeResultId = resultId ?? searchParams.get("resultId") ?? undefined;

  const payload = useExerciseResult<FlightInformationEndPayload>(
    "flight-information",
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
    <FlightInformationSummary
      scenarios={payload.scenarios}
      answers={payload.answers}
      results={payload.results}
      stats={payload.stats}
      hideActions
    />
  );
};

export default FlightInformationEndResultClient;
