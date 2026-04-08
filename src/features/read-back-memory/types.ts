export type ResponseMode = "forward" | "backward" | "sorted";

export interface Config {
  questionCount: number;
  minLength: number;
  maxLength: number;
}

export interface ReadBackQuestion {
  id: number;
  sequence: string[];
  mode: ResponseMode;
}

export const RESPONSE_MODE_SHORT_LABEL: Record<ResponseMode, string> = {
  forward: "Same order",
  backward: "Backwards",
  sorted: "Sorted (numbers → letters)",
};

export const normalizeAnswer = (answer: string): string =>
  answer.replace(/[^0-9a-z]/gi, "").toUpperCase();

export const getExpectedAnswer = (question: ReadBackQuestion): string => {
  const sequence = question.sequence.map((s) => s.toUpperCase());
  if (question.mode === "forward") return sequence.join("");
  if (question.mode === "backward") return [...sequence].reverse().join("");
  // sorted
  const numbers = sequence
    .filter((ch) => /[0-9]/.test(ch))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  const letters = sequence.filter((ch) => /[A-Z]/.test(ch)).sort();
  return [...numbers, ...letters].join("");
};
