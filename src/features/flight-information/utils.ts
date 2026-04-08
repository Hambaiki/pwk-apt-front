import {
  FlightScenario,
  QuestionKey,
  ScenarioAnswer,
  ScenarioResult,
} from "./types";

// ─── Display constants ────────────────────────────────────────────────────────

export const QUESTION_CONFIG: Record<
  QuestionKey,
  { label: string; placeholder: string; helper: string }
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

export const MODE_LABEL: Record<"arrival" | "duration", string> = {
  arrival: "Compute arrival time",
  duration: "Compute flight duration",
};

// ─── Time / duration helpers ──────────────────────────────────────────────────

export const normalizeMinutesOfDay = (minutes: number): number => {
  const m = minutes % (24 * 60);
  return m < 0 ? m + 24 * 60 : m;
};

export const formatTime = (minutes: number): string => {
  const normalized = normalizeMinutesOfDay(minutes);
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
};

export const formatDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours === 0) return `${mins} minute${mins === 1 ? "" : "s"}`;
  if (mins === 0) return `${hours} hour${hours === 1 ? "" : "s"}`;
  return `${hours} hour${hours === 1 ? "" : "s"} ${mins} minute${mins === 1 ? "" : "s"}`;
};

export const formatSeconds = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// ─── Input parsers (used for grading) ────────────────────────────────────────

export const parseTimeInput = (value: string): number | null => {
  const raw = value.trim();
  if (!raw) return null;
  const colonMatch = raw.match(/^(\d{1,2})\s*:\s*(\d{1,2})$/);
  if (colonMatch) {
    const hours = Number(colonMatch[1]);
    const mins = Number(colonMatch[2]);
    if (hours >= 0 && hours < 24 && mins >= 0 && mins < 60)
      return hours * 60 + mins;
  }
  const digitsMatch = raw.match(/^(\d{3,4})$/);
  if (digitsMatch) {
    const digits = digitsMatch[1];
    const mins = Number(digits.slice(-2));
    const hours = Number(digits.slice(0, digits.length - 2));
    if (hours >= 0 && hours < 24 && mins >= 0 && mins < 60)
      return hours * 60 + mins;
  }
  const hourOnlyMatch = raw.match(/^(\d{1,2})$/);
  if (hourOnlyMatch) {
    const hours = Number(hourOnlyMatch[1]);
    if (hours >= 0 && hours < 24) return hours * 60;
  }
  return null;
};

export const parseDurationInput = (value: string): number | null => {
  const raw = value.trim();
  if (!raw) return null;
  const colonMatch = raw.match(/^(\d{1,2})\s*:\s*(\d{1,2})$/);
  if (colonMatch) {
    const hours = Number(colonMatch[1]);
    const mins = Number(colonMatch[2]);
    if (hours >= 0 && mins >= 0 && mins < 60) return hours * 60 + mins;
  }
  const textMatch =
    raw.match(
      /^(?:(\d+)\s*h(?:ours?)?)?(?:\s*(\d+)\s*m(?:in(?:utes?)?)?)?$/i,
    ) || raw.match(/^(\d+)\s*m(?:in(?:utes?)?)?$/i);
  if (textMatch) {
    const h = textMatch[1] ? Number(textMatch[1]) : 0;
    const m = textMatch[2] ? Number(textMatch[2]) : 0;
    if (h >= 0 && m >= 0 && m < 60 && (h > 0 || m > 0)) return h * 60 + m;
  }
  const minsMatch = raw.match(/^(\d{1,3})$/);
  if (minsMatch) {
    const mins = Number(minsMatch[1]);
    if (mins > 0 && mins < 12 * 60) return mins;
  }
  return null;
};

export const normalizeFlightLevelInput = (value: string): number | null => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  const level = Number(digits);
  if (level >= 50 && level <= 450) return level;
  if (level >= 5000 && level <= 45000) return Math.round(level / 100);
  return null;
};

export const normalizeDistanceInput = (value: string): number | null => {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return null;
  const distance = Number(digits);
  if (!Number.isFinite(distance) || distance <= 0) return null;
  return distance;
};

// ─── Scenario helpers ─────────────────────────────────────────────────────────

export const questionKeysForScenario = (
  scenario: FlightScenario,
): QuestionKey[] => {
  if (scenario.mode === "arrival")
    return ["arrivalTime", "flightLevel", "distance"];
  return ["duration", "flightLevel", "distance"];
};

export const buildPassage = (scenario: FlightScenario): string => {
  const departure = formatTime(scenario.departureMinutes);
  const arrival = formatTime(scenario.arrivalMinutes);
  const durationText = formatDuration(scenario.durationMinutes);
  const levelText = `FL${scenario.flightLevel}`;
  if (scenario.mode === "arrival") {
    return `Flight ${scenario.flightNumber} from ${scenario.origin} to ${scenario.destination} departed at ${departure} local time, cruising at flight level ${levelText}. The flight was planned to last ${durationText} and cover a distance of ${scenario.distanceNm} nautical miles.`;
  }
  return `Flight ${scenario.flightNumber} from ${scenario.origin} to ${scenario.destination} departed at ${departure} local time and landed at ${arrival} local time, cruising at flight level ${levelText} and covering a distance of ${scenario.distanceNm} nautical miles.`;
};

export const getExpectedAnswerText = (
  scenario: FlightScenario,
  key: QuestionKey,
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

export const evaluateScenarioAnswers = (
  scenario: FlightScenario,
  answer: ScenarioAnswer,
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
        result[key] = parsed !== null && parsed === scenario.durationMinutes;
        break;
      }
      case "flightLevel": {
        const parsed = normalizeFlightLevelInput(raw);
        result[key] = parsed !== null && parsed === scenario.flightLevel;
        break;
      }
      case "distance": {
        const parsed = normalizeDistanceInput(raw);
        result[key] = parsed !== null && parsed === scenario.distanceNm;
        break;
      }
      default:
        break;
    }
  });
  return result;
};
