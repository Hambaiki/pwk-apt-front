"use client";

import { useEffect, useMemo, useState } from "react";

import { Badge, Button, Card, Input, Select, Checkbox } from "@/components/ui";

type Stage = "config" | "exercise" | "summary";

type ScenarioMode = "arrival" | "duration";

type QuestionKey = "arrivalTime" | "duration" | "flightLevel" | "distance";

interface ExerciseConfig {
  questionCount: number;
  mode: ScenarioMode | "mixed";
  timed?: boolean;
  timePerPassageSec?: number;
  autoPlayAudio?: boolean;
}

interface FlightScenario {
  id: number;
  mode: ScenarioMode;
  flightNumber: string;
  origin: string;
  destination: string;
  departureMinutes: number;
  arrivalMinutes: number;
  durationMinutes: number;
  flightLevel: number;
  distanceNm: number;
}

type ScenarioAnswer = Partial<Record<QuestionKey, string>>;
type ScenarioResult = Partial<Record<QuestionKey, boolean>>;

const defaultConfig: ExerciseConfig = {
  questionCount: 8,
  mode: "mixed",
  timed: false,
  timePerPassageSec: 60,
  autoPlayAudio: false,
};

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

const QUESTION_CONFIG: Record<
  QuestionKey,
  {
    label: string;
    placeholder: string;
    helper: string;
  }
> = {
  arrivalTime: {
    label: "When was the arrival time?",
    placeholder: "e.g. 11:05 or 1105",
    helper: "Use 24-hour time, such as 09:30 or 2135.",
  },
  duration: {
    label: "What was the flight duration?",
    placeholder: "e.g. 1:45 or 1h 45m",
    helper: "Answer in hours and minutes, such as 1:45 or 1 h 45 min.",
  },
  flightLevel: {
    label: "What was the flight level?",
    placeholder: "e.g. FL350 or 350",
    helper: "You can type FL350 or just 350.",
  },
  distance: {
    label: "What was the distance flown (in nautical miles)?",
    placeholder: "e.g. 820",
    helper: "Answer in whole nautical miles (Nm).",
  },
};

const MODE_LABEL: Record<ScenarioMode, string> = {
  arrival: "Compute arrival time",
  duration: "Compute flight duration",
};

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pickRandom = <T,>(arr: T[]): T => arr[randomInt(0, arr.length - 1)];

const generateFlightNumber = (): string => {
  const prefix = pickRandom(FLIGHT_PREFIXES);
  const number = randomInt(100, 999);
  return `${prefix}${number}`;
};

const normalizeMinutesOfDay = (minutes: number): number => {
  const m = minutes % (24 * 60);
  return m < 0 ? m + 24 * 60 : m;
};

const formatTime = (minutes: number): string => {
  const normalized = normalizeMinutesOfDay(minutes);
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

const formatDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  if (hours === 0) {
    return `${mins} minute${mins === 1 ? "" : "s"}`;
  }

  if (mins === 0) {
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  }

  return `${hours} hour${hours === 1 ? "" : "s"} ${mins} minute${
    mins === 1 ? "" : "s"
  }`;
};

const formatSeconds = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const parseTimeInput = (value: string): number | null => {
  const raw = value.trim();
  if (!raw) return null;

  // 09:30, 9:30
  const colonMatch = raw.match(/^(\d{1,2})\s*:\s*(\d{1,2})$/);
  if (colonMatch) {
    const hours = Number(colonMatch[1]);
    const mins = Number(colonMatch[2]);
    if (hours >= 0 && hours < 24 && mins >= 0 && mins < 60) {
      return hours * 60 + mins;
    }
  }

  // 4-digit or 3-digit number like 0930 or 930
  const digitsMatch = raw.match(/^(\d{3,4})$/);
  if (digitsMatch) {
    const digits = digitsMatch[1];
    const mins = Number(digits.slice(-2));
    const hours = Number(digits.slice(0, digits.length - 2));
    if (hours >= 0 && hours < 24 && mins >= 0 && mins < 60) {
      return hours * 60 + mins;
    }
  }

  // Whole hour like "9" -> 09:00
  const hourOnlyMatch = raw.match(/^(\d{1,2})$/);
  if (hourOnlyMatch) {
    const hours = Number(hourOnlyMatch[1]);
    if (hours >= 0 && hours < 24) {
      return hours * 60;
    }
  }

  return null;
};

const parseDurationInput = (value: string): number | null => {
  const raw = value.trim();
  if (!raw) return null;

  // 1:45, 0:50
  const colonMatch = raw.match(/^(\d{1,2})\s*:\s*(\d{1,2})$/);
  if (colonMatch) {
    const hours = Number(colonMatch[1]);
    const mins = Number(colonMatch[2]);
    if (hours >= 0 && mins >= 0 && mins < 60) {
      return hours * 60 + mins;
    }
  }

  // 1h 45m, 2 hr, 50 min, etc.
  const textMatch =
    raw.match(
      /^(?:(\d+)\s*h(?:ours?)?)?(?:\s*(\d+)\s*m(?:in(?:utes?)?)?)?$/i
    ) || raw.match(/^(\d+)\s*m(?:in(?:utes?)?)?$/i);

  if (textMatch) {
    const h = textMatch[1] ? Number(textMatch[1]) : 0;
    const m = textMatch[2] ? Number(textMatch[2]) : 0;
    if (h >= 0 && m >= 0 && m < 60 && (h > 0 || m > 0)) {
      return h * 60 + m;
    }
  }

  // Just minutes like "90"
  const minsMatch = raw.match(/^(\d{1,3})$/);
  if (minsMatch) {
    const mins = Number(minsMatch[1]);
    if (mins > 0 && mins < 12 * 60) {
      return mins;
    }
  }

  return null;
};

const normalizeFlightLevelInput = (value: string): number | null => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  const level = Number(digits);
  if (level >= 50 && level <= 450) return level;
  if (level >= 5000 && level <= 45000) return Math.round(level / 100);
  return null;
};

const normalizeDistanceInput = (value: string): number | null => {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return null;
  const distance = Number(digits);
  if (!Number.isFinite(distance) || distance <= 0) return null;
  return distance;
};

const createScenario = (id: number, mode: ScenarioMode): FlightScenario => {
  const pair = pickRandom(AIRPORT_PAIRS);
  const flightNumber = generateFlightNumber();

  // Departure between 05:00 and 22:00, in 5-minute increments
  const depHour = randomInt(5, 22);
  const depMinute = randomInt(0, 11) * 5;
  const departureMinutes = depHour * 60 + depMinute;

  // Flight duration between 45 minutes and 4 hours (in 5-minute steps)
  const durationMinutes = randomInt(9, 48) * 5;
  const arrivalMinutes = departureMinutes + durationMinutes;

  // Typical jet flight levels between FL180 and FL410
  const flightLevel = randomInt(18, 41) * 10;

  // Rough distance in Nm
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
  mode: ScenarioMode | "mixed"
): FlightScenario[] => {
  const modes: ScenarioMode[] =
    mode === "mixed" ? ["arrival", "duration"] : [mode];

  return Array.from({ length: count }).map((_, index) => {
    const scenarioMode = modes[index % modes.length];
    return createScenario(index, scenarioMode);
  });
};

const buildPassage = (scenario: FlightScenario): string => {
  const departure = formatTime(scenario.departureMinutes);
  const arrival = formatTime(scenario.arrivalMinutes);
  const durationText = formatDuration(scenario.durationMinutes);
  const levelText = `FL${scenario.flightLevel}`;

  if (scenario.mode === "arrival") {
    return `Flight ${scenario.flightNumber} from ${scenario.origin} to ${
      scenario.destination
    } departed at ${departure} local time, cruising at flight level ${levelText}. The flight was planned to last ${durationText} and cover a distance of ${
      scenario.distanceNm
    } nautical miles.`;
  }

  return `Flight ${scenario.flightNumber} from ${scenario.origin} to ${
    scenario.destination
  } departed at ${departure} local time and landed at ${arrival} local time, cruising at flight level ${levelText} and covering a distance of ${
    scenario.distanceNm
  } nautical miles.`;
};

const questionKeysForScenario = (scenario: FlightScenario): QuestionKey[] => {
  if (scenario.mode === "arrival") {
    return ["arrivalTime", "flightLevel", "distance"];
  }
  return ["duration", "flightLevel", "distance"];
};

const getExpectedAnswerText = (
  scenario: FlightScenario,
  key: QuestionKey
): string => {
  switch (key) {
    case "arrivalTime":
      return formatTime(scenario.arrivalMinutes);
    case "duration":
      return formatDuration(scenario.durationMinutes);
    case "flightLevel":
      return `FL${scenario.flightLevel}`;
    case "distance":
      return `${scenario.distanceNm} Nm`;
    default:
      return "";
  }
};

const evaluateScenarioAnswers = (
  scenario: FlightScenario,
  answer: ScenarioAnswer
): ScenarioResult => {
  const result: ScenarioResult = {};

  const keys = questionKeysForScenario(scenario);

  keys.forEach((key) => {
    const raw = (answer[key] ?? "").trim();
    if (!raw) {
      result[key] = false;
      return;
    }

    switch (key) {
      case "arrivalTime": {
        const parsed = parseTimeInput(raw);
        result[key] =
          parsed !== null &&
          normalizeMinutesOfDay(parsed) ===
            normalizeMinutesOfDay(scenario.arrivalMinutes);
        break;
      }
      case "duration": {
        const parsed = parseDurationInput(raw);
        result[key] =
          parsed !== null && parsed === scenario.durationMinutes;
        break;
      }
      case "flightLevel": {
        const parsed = normalizeFlightLevelInput(raw);
        result[key] =
          parsed !== null && parsed === scenario.flightLevel;
        break;
      }
      case "distance": {
        const parsed = normalizeDistanceInput(raw);
        result[key] =
          parsed !== null && parsed === scenario.distanceNm;
        break;
      }
      default:
        break;
    }
  });

  return result;
};

const FlightInformationExercise = () => {
  const [stage, setStage] = useState<Stage>("config");
  const [config, setConfig] = useState<ExerciseConfig>(defaultConfig);

  const [scenarios, setScenarios] = useState<FlightScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<number, ScenarioAnswer>>({});
  const [results, setResults] = useState<Record<number, ScenarioResult>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [autoPlayed, setAutoPlayed] = useState<Record<number, boolean>>({});

  const currentScenario =
    scenarios.length > 0 &&
    currentIndex >= 0 &&
    currentIndex < scenarios.length
      ? scenarios[currentIndex]
      : null;

  const currentAnswers: ScenarioAnswer = currentScenario
    ? answers[currentScenario.id] ?? {}
    : {};

  const currentResults: ScenarioResult = currentScenario
    ? results[currentScenario.id] ?? {}
    : {};

  const stats = useMemo(() => {
    const total = scenarios.length;

    let attempted = 0;
    let allCorrect = 0;

    scenarios.forEach((scenario) => {
      const scenarioAnswers = answers[scenario.id] ?? {};
      const keys = questionKeysForScenario(scenario);

      const hasAnyAnswer = keys.some(
        (key) => (scenarioAnswers[key] ?? "").trim().length > 0
      );
      if (hasAnyAnswer) {
        attempted += 1;
      }

      const scenarioResults = results[scenario.id] ?? {};
      const isAllCorrect =
        keys.length > 0 &&
        keys.every((key) => scenarioResults[key] === true);
      if (isAllCorrect) {
        allCorrect += 1;
      }
    });

    return { total, attempted, allCorrect };
  }, [scenarios, answers, results]);

  const stopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    setIsPlaying(false);
  };

  const handlePlayPassage = () => {
    if (!currentScenario) return;

    const text = buildPassage(currentScenario);

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    try {
      stopAudio();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timed = config.timed ?? false;

    if (!timed || stage !== "exercise") {
      return;
    }

    if (remainingSeconds === null) {
      return;
    }

    if (remainingSeconds <= 0) {
      if (!currentScenario) return;

      stopAudio();

      const scenarioResult = evaluateScenarioAnswers(
        currentScenario,
        currentAnswers
      );

      setResults((prev) => ({
        ...prev,
        [currentScenario.id]: {
          ...(prev[currentScenario.id] ?? {}),
          ...scenarioResult,
        },
      }));

      if (currentIndex < scenarios.length - 1) {
        setCurrentIndex((prev) =>
          Math.min(prev + 1, scenarios.length - 1)
        );
        setRemainingSeconds(config.timePerPassageSec ?? 60);
      } else {
        setRemainingSeconds(null);
        handleEnd();
      }

      return;
    }

    const timeoutId = window.setTimeout(() => {
      setRemainingSeconds((prev) =>
        prev !== null && prev > 0 ? prev - 1 : prev
      );
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    remainingSeconds,
    stage,
    config.timed,
    config.timePerPassageSec,
    currentScenario,
    currentIndex,
    scenarios.length,
  ]);

  useEffect(() => {
    const autoPlay = config.autoPlayAudio ?? false;

    if (!autoPlay || stage !== "exercise") {
      return;
    }

    if (!currentScenario) return;

    if (autoPlayed[currentScenario.id]) return;

    handlePlayPassage();

    setAutoPlayed((prev) => ({
      ...prev,
      [currentScenario.id]: true,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, currentScenario, config.autoPlayAudio]);

  const handleStart = () => {
    const newScenarios = generateScenarios(
      config.questionCount,
      config.mode
    );
    setScenarios(newScenarios);
    setCurrentIndex(0);
    setAnswers({});
    setResults({});
    setRevealed({});
    setAutoPlayed({});
    setStage("exercise");
    stopAudio();
    const timed = config.timed ?? false;
    setRemainingSeconds(timed ? config.timePerPassageSec ?? 60 : null);
  };

  const handleChangeScenario = (direction: "prev" | "next") => {
    stopAudio();
    setCurrentIndex((prev) => {
      if (direction === "prev") {
        return Math.max(0, prev - 1);
      }
      return Math.min(scenarios.length - 1, prev + 1);
    });

    const timed = config.timed ?? false;
    if (timed) {
      setRemainingSeconds(config.timePerPassageSec ?? 60);
    }
  };

  const handleCheckAnswers = () => {
    if (!currentScenario) return;

    const scenarioResult = evaluateScenarioAnswers(
      currentScenario,
      currentAnswers
    );

    setResults((prev) => ({
      ...prev,
      [currentScenario.id]: {
        ...(prev[currentScenario.id] ?? {}),
        ...scenarioResult,
      },
    }));
  };

  const handleRevealAnswers = () => {
    if (!currentScenario) return;

    const scenarioResult = evaluateScenarioAnswers(
      currentScenario,
      currentAnswers
    );

    setResults((prev) => ({
      ...prev,
      [currentScenario.id]: {
        ...(prev[currentScenario.id] ?? {}),
        ...scenarioResult,
      },
    }));

    setRevealed((prev) => ({
      ...prev,
      [currentScenario.id]: true,
    }));
  };

  const handleEnd = () => {
    // Ensure every scenario has a result, even if not checked
    const updatedResults: Record<number, ScenarioResult> = {
      ...results,
    };

    scenarios.forEach((scenario) => {
      const existing = updatedResults[scenario.id] ?? {};
      const scenarioAnswers = answers[scenario.id] ?? {};

      const evaluated = evaluateScenarioAnswers(
        scenario,
        scenarioAnswers
      );

      updatedResults[scenario.id] = {
        ...existing,
        ...evaluated,
      };
    });

    setResults(updatedResults);
    setStage("summary");
    stopAudio();
    setRemainingSeconds(null);
  };

  const handleReset = () => {
    setStage("config");
    setScenarios([]);
    setCurrentIndex(0);
    setAnswers({});
    setResults({});
    setRevealed({});
    setAutoPlayed({});
    setConfig(defaultConfig);
    stopAudio();
    setRemainingSeconds(null);
  };

  return (
    <div className="space-y-6">
      {stage === "config" && (
        <Card className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              Flight Information Memory – Configuration
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure how many flight passages you want to practice
              with, then press <strong>Start</strong>. For each
              passage, read the briefing and answer the questions from
              memory.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">
                Number of passages
              </label>
              <Input
                type="number"
                min={1}
                max={20}
                value={config.questionCount}
                onChange={(e) => {
                  const value = Number(e.target.value) || 1;
                  setConfig((prev) => ({
                    ...prev,
                    questionCount: Math.min(
                      20,
                      Math.max(1, value)
                    ),
                  }));
                }}
              />
              <p className="text-xs text-muted-foreground">
                Each passage describes one flight with 2–3 questions.
              </p>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">
                Computation focus
              </label>
              <Select
                value={config.mode}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    mode: e.target.value as ExerciseConfig["mode"],
                  }))
                }
              >
                <option value="mixed">Mixed (arrival &amp; duration)</option>
                <option value="arrival">
                  Arrival time (given start time and duration)
                </option>
                <option value="duration">
                  Flight duration (given start and end time)
                </option>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose whether you want to mainly compute arrival time,
                duration, or a mix of both.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <Checkbox
              checked={config.timed ?? false}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  timed: e.target.checked,
                }))
              }
              label="Enable timed mode (auto-advance after time runs out)"
            />

            <div className="flex flex-col space-y-1 max-w-xs">
              <label className="text-sm font-medium">
                Time per passage (seconds)
              </label>
              <Input
                type="number"
                min={10}
                max={300}
                value={config.timePerPassageSec ?? defaultConfig.timePerPassageSec!}
                disabled={!(config.timed ?? false)}
                onChange={(e) => {
                  const raw = Number(e.target.value) || 10;
                  const clamped = Math.min(300, Math.max(10, raw));
                  setConfig((prev) => ({
                    ...prev,
                    timePerPassageSec: clamped,
                  }));
                }}
              />
              <p className="text-xs text-muted-foreground">
                When timed mode is on, each passage will automatically move on
                after this amount of time.
              </p>
            </div>

            <Checkbox
              checked={config.autoPlayAudio ?? false}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  autoPlayAudio: e.target.checked,
                }))
              }
              label="Auto-play audio when a passage appears"
            />
            <p className="text-xs text-muted-foreground">
              Note: some browsers may require a user interaction before audio
              can play automatically.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setConfig(defaultConfig)}
            >
              Reset config
            </Button>
            <Button onClick={handleStart}>Start</Button>
          </div>
        </Card>
      )}

      {stage === "exercise" && currentScenario && (
        <>
          <Card className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  Passage {currentIndex + 1} of {scenarios.length}
                </p>
                <h2 className="text-xl font-semibold">
                  Flight Information Memory
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-info-50 text-info-800 border border-info-200">
                  Attempted:{" "}
                  <span className="font-semibold">
                    {stats.attempted}
                  </span>{" "}
                  / {stats.total}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  All correct:{" "}
                  <span className="font-semibold">
                    {stats.allCorrect}
                  </span>
                </span>
                {config.timed && remainingSeconds !== null && (
                  <span className="px-3 py-1 rounded-full bg-warning-50 text-warning-800 border border-warning-200">
                    Time left:{" "}
                    <span className="font-semibold">
                      {formatSeconds(remainingSeconds)}
                    </span>
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="info">
                  {MODE_LABEL[currentScenario.mode]}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Read the passage carefully once, then answer from
                  memory.
                </p>
              </div>

              <div className="space-y-2">
                <div className="rounded-lg border border-secondary-200 bg-secondary-50 px-4 py-3 text-sm leading-relaxed">
                  {buildPassage(currentScenario)}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handlePlayPassage}
                    disabled={isPlaying}
                    variant="primary"
                  >
                    {isPlaying ? "Playing passage..." : "Play passage"}
                  </Button>
                  <Button
                    onClick={handlePlayPassage}
                    variant="outline"
                    disabled={isPlaying}
                  >
                    Replay passage
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  The passage will be read aloud using your browser&apos;s speech
                  synthesis (if supported), similar to an ATC or briefing call.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-base font-semibold">
                Questions for this flight
              </h3>

              <div className="space-y-4">
                {questionKeysForScenario(currentScenario).map((key) => {
                  const configItem = QUESTION_CONFIG[key];
                  const value = currentAnswers[key] ?? "";
                  const isCorrect = currentResults[key];
                  const showReveal = revealed[currentScenario.id];
                  const expected = getExpectedAnswerText(
                    currentScenario,
                    key
                  );

                  return (
                    <div
                      key={key}
                      className="flex flex-col space-y-1"
                    >
                      <label className="text-sm font-medium">
                        {configItem.label}
                      </label>
                      <Input
                        value={value}
                        placeholder={configItem.placeholder}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentScenario.id]: {
                              ...(prev[currentScenario.id] ?? {}),
                              [key]: e.target.value,
                            },
                          }))
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        {configItem.helper}
                      </p>

                      {isCorrect !== undefined && (
                        <div
                          className={`mt-1 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                            isCorrect
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-red-50 text-red-800 border border-red-200"
                          }`}
                        >
                          {isCorrect
                            ? "Correct"
                            : "Not quite. Check again or reveal the answer."}
                        </div>
                      )}

                      {showReveal && (
                        <p className="text-xs text-muted-foreground">
                          Correct answer:{" "}
                          <code className="font-semibold">
                            {expected}
                          </code>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button onClick={handleCheckAnswers}>
                  Check answers
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    currentScenario &&
                    setAnswers((prev) => ({
                      ...prev,
                      [currentScenario.id]: {},
                    }))
                  }
                >
                  Clear answers
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRevealAnswers}
                >
                  Reveal all answers
                </Button>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => handleChangeScenario("prev")}
              disabled={currentIndex === 0}
            >
              Previous passage
            </Button>

            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleReset}>
                Back to configuration
              </Button>
              <Button onClick={handleEnd}>End &amp; view summary</Button>
              <Button
                variant="outline"
                onClick={() => handleChangeScenario("next")}
                disabled={currentIndex === scenarios.length - 1}
              >
                Next passage
              </Button>
            </div>
          </div>
        </>
      )}

      {stage === "summary" && (
        <Card className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Summary</h2>
              <p className="text-sm text-muted-foreground">
                Review your performance on each flight passage and
                question.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-info-50 text-info-800 border border-info-200">
                Passages:{" "}
                <span className="font-semibold">{stats.total}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                All-correct passages:{" "}
                <span className="font-semibold">
                  {stats.allCorrect}
                </span>
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
                <Card
                  key={scenario.id}
                  className="p-3 md:p-4 space-y-2 bg-background-secondary"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm md:text-base">
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

                  <p className="text-xs md:text-sm text-muted-foreground">
                    Mode:{" "}
                    <span className="font-medium">
                      {MODE_LABEL[scenario.mode]}
                    </span>
                  </p>

                  <p className="text-xs md:text-sm leading-relaxed">
                    {buildPassage(scenario)}
                  </p>

                  <div className="mt-2 space-y-2">
                    {keys.map((key) => {
                      const configItem = QUESTION_CONFIG[key];
                      const raw = (scenarioAnswers[key] ?? "").trim();
                      const expected = getExpectedAnswerText(
                        scenario,
                        key
                      );
                      const isCorrect =
                        scenarioResults[key] === true;

                      return (
                        <div
                          key={key}
                          className="rounded-md border border-secondary-200 bg-background-primary px-3 py-2 text-xs md:text-sm"
                        >
                          <p className="font-medium">
                            {configItem.label}
                          </p>
                          <p className="mt-1">
                            Your answer:{" "}
                            <code>
                              {raw || "<no answer provided>"}
                            </code>
                          </p>
                          <p>
                            Correct answer:{" "}
                            <code>{expected}</code>
                          </p>
                          <p
                            className={`mt-1 font-medium ${
                              isCorrect
                                ? "text-emerald-700"
                                : "text-red-700"
                            }`}
                          >
                            {isCorrect
                              ? "Correct"
                              : "Incorrect or missing"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={handleReset}>
              Back to configuration
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FlightInformationExercise;

