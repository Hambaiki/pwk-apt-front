export interface Config {
  key?: string; // unique key for each config instance
  exerciseDuration: number; // in seconds
  totalQuestions: number;
  questionTime: number; // in seconds
  symbolMode: boolean;
}

export type DualTaskQuestionStatus = "expired" | "ended";

export interface DualTaskQuestionHistoryItem {
  id: number;
  prompt: string;
  status: DualTaskQuestionStatus;
}
