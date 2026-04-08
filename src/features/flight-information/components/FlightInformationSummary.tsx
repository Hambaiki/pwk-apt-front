"use client";

import { Button, Card } from "@/components/ui";
import {
  ExerciseStats,
  FlightScenario,
  ScenarioAnswer,
  ScenarioResult,
} from "../types";
import {
  MODE_LABEL,
  QUESTION_CONFIG,
  buildPassage,
  getExpectedAnswerText,
  questionKeysForScenario,
} from "../utils";

interface FlightInformationSummaryProps {
  scenarios: FlightScenario[];
  answers: Record<number, ScenarioAnswer>;
  results: Record<number, ScenarioResult>;
  stats: ExerciseStats;
  onReset?: () => void;
  hideActions?: boolean;
}

const FlightInformationSummary = ({
  scenarios,
  answers,
  results,
  stats,
  onReset,
  hideActions,
}: FlightInformationSummaryProps) => {
  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Summary</h2>
          <p className="text-sm text-muted-foreground">
            Review your performance on each flight passage and question.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border border-info-200 bg-info-50 px-3 py-1 text-info-800">
            Passages: <span className="font-semibold">{stats.total}</span>
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-800">
            All-correct passages:{" "}
            <span className="font-semibold">{stats.allCorrect}</span>
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {scenarios.map((scenario, index) => {
          const scenarioAnswers = answers[scenario.id] ?? {};
          const scenarioResults = results[scenario.id] ?? {};
          const keys = questionKeysForScenario(scenario);
          const isAllCorrect =
            keys.length > 0 &&
            keys.every((key) => scenarioResults[key] === true);

          return (
            <Card key={scenario.id} className="space-y-2 bg-surface p-3 md:p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold md:text-base">
                  Passage {index + 1} – Flight {scenario.flightNumber}
                </p>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    isAllCorrect
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {isAllCorrect
                    ? "All answers correct"
                    : "Some answers incorrect or missing"}
                </span>
              </div>

              <p className="text-xs text-muted-foreground md:text-sm">
                Mode:{" "}
                <span className="font-medium">{MODE_LABEL[scenario.mode]}</span>
              </p>

              <p className="text-xs leading-relaxed md:text-sm">
                {buildPassage(scenario)}
              </p>

              <div className="mt-2 space-y-2">
                {keys.map((key) => {
                  const configItem = QUESTION_CONFIG[key];
                  const raw = (scenarioAnswers[key] ?? "").trim();
                  const expected = getExpectedAnswerText(scenario, key);
                  const isCorrect = scenarioResults[key] === true;

                  return (
                    <div
                      key={key}
                      className="rounded-md border border-brand-200 bg-surface px-3 py-2 text-xs md:text-sm"
                    >
                      <p className="font-medium">{configItem.label}</p>
                      <p className="mt-1">
                        Your answer:{" "}
                        <code>{raw || "<no answer provided>"}</code>
                      </p>
                      <p>
                        Correct answer: <code>{expected}</code>
                      </p>
                      <p
                        className={`mt-1 font-medium ${
                          isCorrect ? "text-emerald-700" : "text-red-700"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect or missing"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {!hideActions && onReset && (
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onReset}>
            Back to configuration
          </Button>
        </div>
      )}
    </Card>
  );
};

export default FlightInformationSummary;
