export type ScenarioMode = "arrival" | "duration";

export type QuestionKey =
  | "arrivalTime"
  | "duration"
  | "flightLevel"
  | "distance";

export interface ExerciseConfig {
  questionCount: number;
  mode: ScenarioMode | "mixed";
  timed?: boolean;
  timePerPassageSec?: number;
  autoPlayAudio?: boolean;
}

export interface FlightScenario {
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

export type ScenarioAnswer = Partial<Record<QuestionKey, string>>;
export type ScenarioResult = Partial<Record<QuestionKey, boolean>>;

export interface ExerciseStats {
  total: number;
  attempted: number;
  allCorrect: number;
}
