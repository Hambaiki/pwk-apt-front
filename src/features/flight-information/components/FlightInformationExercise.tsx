"use client";

import ExerciseQuestionContentCard from "@/components/exercise/ExerciseQuestionContentCard";
import ExerciseQuestionRunLayout from "@/components/exercise/ExerciseQuestionRunLayout";
import { Badge, Button, Card } from "@/components/ui";
import { FormInput } from "@/components/ui/form";
import {
  createResultId,
  saveExerciseResult,
} from "@/libs/exercise-result-store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { defaultConfig } from "../constants";
import {
  ExerciseConfig,
  ExerciseStats,
  FlightScenario,
  ScenarioAnswer,
  ScenarioMode,
  ScenarioResult,
} from "../types";
import {
  MODE_LABEL,
  QUESTION_CONFIG,
  buildPassage,
  evaluateScenarioAnswers,
  formatSeconds,
  questionKeysForScenario,
} from "../utils";

const AIRPORT_PAIRS: Array<{ origin: string; destination: string }> = [
  { origin: "Bangkok", destination: "Singapore" },
  { origin: "Bangkok", destination: "Chiang Mai" },
  { origin: "Bangkok", destination: "Phuket" },
  { origin: "Bangkok", destination: "Hong Kong" },
  { origin: "Bangkok", destination: "Kuala Lumpur" },
  { origin: "Bangkok", destination: "Tokyo" },
  { origin: "Bangkok", destination: "Seoul" },
  { origin: "Singapore", destination: "Bangkok" },
  { origin: "Singapore", destination: "Jakarta" },
  { origin: "Singapore", destination: "Hong Kong" },
  { origin: "Kuala Lumpur", destination: "Bangkok" },
  { origin: "Hong Kong", destination: "Bangkok" },
  { origin: "Chiang Mai", destination: "Bangkok" },
  { origin: "Phuket", destination: "Bangkok" },
];

const FLIGHT_PREFIXES = ["TG", "PG", "FD", "SQ", "QH", "VN", "CX", "AK"];

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pickRandom = <T,>(arr: T[]): T => arr[randomInt(0, arr.length - 1)];

const generateFlightNumber = (): string => {
  const prefix = pickRandom(FLIGHT_PREFIXES);
  const number = randomInt(100, 999);
  return `${prefix}${number}`;
};

const createScenario = (id: number, mode: ScenarioMode): FlightScenario => {
  const pair = pickRandom(AIRPORT_PAIRS);
  const flightNumber = generateFlightNumber();
  const depHour = randomInt(5, 22);
  const depMinute = randomInt(0, 11) * 5;
  const departureMinutes = depHour * 60 + depMinute;
  const durationMinutes = randomInt(9, 48) * 5;
  const arrivalMinutes = departureMinutes + durationMinutes;
  const flightLevel = randomInt(18, 41) * 10;
  const distanceNm = randomInt(200, 2500);

  return {
    id,
    mode,
    flightNumber,
    origin: pair.origin,
    destination: pair.destination,
    departureMinutes,
    arrivalMinutes,
    durationMinutes,
    flightLevel,
    distanceNm,
  };
};

const generateScenarios = (
  count: number,
  mode: ScenarioMode | "mixed",
): FlightScenario[] => {
  const modes: ScenarioMode[] =
    mode === "mixed" ? ["arrival", "duration"] : [mode];

  return Array.from({ length: count }).map((_, index) => {
    const scenarioMode = modes[index % modes.length];
    return createScenario(index, scenarioMode);
  });
};

const calculateStats = (
  scenarios: FlightScenario[],
  answers: Record<number, ScenarioAnswer>,
  results: Record<number, ScenarioResult>,
): ExerciseStats => {
  const total = scenarios.length;
  let attempted = 0;
  let allCorrect = 0;

  scenarios.forEach((scenario) => {
    const scenarioAnswers = answers[scenario.id] ?? {};
    const keys = questionKeysForScenario(scenario);
    const hasAnyAnswer = keys.some(
      (key) => (scenarioAnswers[key] ?? "").trim().length > 0,
    );

    if (hasAnyAnswer) attempted += 1;

    const scenarioResults = results[scenario.id] ?? {};
    const isAllCorrect =
      keys.length > 0 && keys.every((key) => scenarioResults[key] === true);
    if (isAllCorrect) allCorrect += 1;
  });

  return { total, attempted, allCorrect };
};

const calculateRunStats = (
  scenarios: FlightScenario[],
  answers: Record<number, ScenarioAnswer>,
) => {
  const total = scenarios.length;
  let attempted = 0;

  scenarios.forEach((scenario) => {
    const scenarioAnswers = answers[scenario.id] ?? {};
    const keys = questionKeysForScenario(scenario);
    const hasAnyAnswer = keys.some(
      (key) => (scenarioAnswers[key] ?? "").trim().length > 0,
    );

    if (hasAnyAnswer) attempted += 1;
  });

  return { total, attempted };
};

const FlightInformationExercise = ({
  initialConfig = defaultConfig,
}: {
  initialConfig?: ExerciseConfig;
}) => {
  const router = useRouter();
  const config = initialConfig;

  const [scenarios, setScenarios] = useState<FlightScenario[]>([]);
  const [answers, setAnswers] = useState<Record<number, ScenarioAnswer>>({});
  const [playingScenarioId, setPlayingScenarioId] = useState<number | null>(
    null,
  );

  const stats = useMemo(
    () => calculateRunStats(scenarios, answers),
    [scenarios, answers],
  );

  const stopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    setPlayingScenarioId(null);
  };

  const resetExercise = () => {
    const newScenarios = generateScenarios(config.questionCount, config.mode);
    setScenarios(newScenarios);
    setAnswers({});
    stopAudio();
  };

  useEffect(() => {
    resetExercise();
    return () => {
      stopAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToNextPassage = (currentIndex: number) => {
    const nextScenario = scenarios[currentIndex + 1];
    if (!nextScenario) return;

    const nextElement = document.getElementById(
      `flight-passage-${nextScenario.id}`,
    );
    nextElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePlayPassage = (scenario: FlightScenario) => {
    const text = buildPassage(scenario);
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      stopAudio();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setPlayingScenarioId(null);
      utterance.onerror = () => setPlayingScenarioId(null);
      setPlayingScenarioId(scenario.id);
      window.speechSynthesis.speak(utterance);
    } catch {
      setPlayingScenarioId(null);
    }
  };

  const handleEnd = () => {
    const updatedResults: Record<number, ScenarioResult> = {};

    scenarios.forEach((scenario) => {
      const scenarioAnswers = answers[scenario.id] ?? {};
      const evaluated = evaluateScenarioAnswers(scenario, scenarioAnswers);
      updatedResults[scenario.id] = evaluated;
    });

    const endStats = calculateStats(scenarios, answers, updatedResults);
    const resultId = createResultId();

    saveExerciseResult("flight-information", resultId, {
      scenarios,
      answers,
      results: updatedResults,
      stats: endStats,
    });

    stopAudio();
    router.push(
      `/flight-information/end?score=${endStats.allCorrect}&total=${endStats.total}&attempted=${endStats.attempted}&resultId=${resultId}`,
    );
  };

  if (scenarios.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <ExerciseQuestionRunLayout
        panelTitle="Flight Information Memory"
        panelMeta={
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-info-200 bg-info-50 px-3 py-1 text-info-800">
              Attempted: <span className="font-semibold">{stats.attempted}</span> / {stats.total}
            </span>
            {config.timed && (
              <span className="rounded-full border border-warning-200 bg-warning-50 px-3 py-1 text-warning-800">
                Suggested limit: <span className="font-semibold">{formatSeconds(config.timePerPassageSec ?? 60)}</span> per passage
              </span>
            )}
          </div>
        }
        navigatorTitle="Passage Navigator"
        navigatorItems={scenarios.map((scenario, index) => {
          const keys = questionKeysForScenario(scenario);
          const scenarioAnswers = answers[scenario.id] ?? {};
          const hasAnyAnswer = keys.some((key) =>
            Boolean((scenarioAnswers[key] ?? "").trim()),
          );

          return {
            id: String(scenario.id),
            label: `P${index + 1}`,
            targetId: `flight-passage-${scenario.id}`,
            isCompleted: hasAnyAnswer,
            completedLabel: "Started",
            pendingLabel: "Pending",
          };
        })}
      >
        {scenarios.map((scenario, index) => {
          const scenarioAnswers = answers[scenario.id] ?? {};
          const isPlaying = playingScenarioId === scenario.id;
          const scenarioKeys = questionKeysForScenario(scenario);
          const isScenarioComplete = scenarioKeys.every((questionKey) =>
            Boolean((scenarioAnswers[questionKey] ?? "").trim()),
          );

          return (
            <ExerciseQuestionContentCard
              key={scenario.id}
              id={`flight-passage-${scenario.id}`}
              questionLabel={`Passage ${index + 1} of ${scenarios.length}`}
              title="Read the passage carefully once, then answer from memory."
              badge={<Badge variant="info">{MODE_LABEL[scenario.mode]}</Badge>}
            >
              <div className="space-y-2">
                <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-relaxed">
                  {buildPassage(scenario)}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => handlePlayPassage(scenario)}
                    disabled={playingScenarioId !== null}
                    variant="primary"
                  >
                    {isPlaying ? "Playing passage..." : "Play passage"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-base font-semibold">Questions for this flight</h3>

                <div className="space-y-4">
                  {questionKeysForScenario(scenario).map((key) => {
                    const configItem = QUESTION_CONFIG[key];
                    const value = scenarioAnswers[key] ?? "";

                    return (
                      <div key={key} className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">{configItem.label}</label>
                        <FormInput
                          value={value}
                          placeholder={configItem.placeholder}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [scenario.id]: {
                                ...(prev[scenario.id] ?? {}),
                                [key]: e.target.value,
                              },
                            }))
                          }
                        />
                        <p className="text-xs text-muted-foreground">{configItem.helper}</p>
                      </div>
                    );
                  })}
                </div>

                {index < scenarios.length - 1 && (
                  <div className="flex justify-end pt-1">
                    <Button
                      variant="outline"
                      disabled={!isScenarioComplete}
                      onClick={() => scrollToNextPassage(index)}
                    >
                      Next passage
                    </Button>
                  </div>
                )}
              </div>
            </ExerciseQuestionContentCard>
          );
        })}
      </ExerciseQuestionRunLayout>

      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => router.push("/flight-information")}
        >
          Back to setup
        </Button>
        <Button variant="ghost" onClick={resetExercise}>
          Restart run
        </Button>
        <Button onClick={handleEnd}>Finish Exercise</Button>
      </div>
    </div>
  );
};

export default FlightInformationExercise;
